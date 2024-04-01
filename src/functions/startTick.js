import launch from '../lib/Cp/private/launch.js';

/**
 * Starts the ticking process for component updates.
 * Throws an error if the tick process is already running.
 */
export default function startTick() {
  // Check if the tick process is already initiated.
  if (bbn.cp.interval) {
    throw Error(bbn._("The tick is already started"));
  }

  let lastUpdate;

  // Set an interval to periodically check and update components.
  bbn.cp.interval = setInterval(
    async function() {
      // Skip if an update is currently running.
      if (bbn.cp.isRunning) {
        return;
      }

      // Using requestAnimationFrame for smooth UI updates.
      requestAnimationFrame(tst => {
        // Check if there are updates since the last frame and if the queue has items.
        if ((tst !== lastUpdate) && bbn.cp.queue.length) {
          lastUpdate = tst;
          bbn.cp.isRunning = true;

          // Create a copy of the current queue and clear the original queue.
          const queue = bbn.cp.queue.splice(0, bbn.cp.queue.length);
          let i = 0;
          let time = bbn.fn.timestamp();
          const todo = [];

          // Process each component in the queue.
          while (queue[i]) {
            // Check if the component is not busy and if it's time to update it.
            if (!queue[i].cp.$isBusy && (queue[i].force || (time - queue[i].cp.$lastLaunch > bbn.cp.tickDelay))) {
              // Launch the update process for the component.
              const queueElement = queue.splice(i, 1)[0];
              launch(queueElement.cp).then(() => {
                // Execute any functions associated with the update.
                queueElement.fns.forEach(fn => {
                  if (fn) {
                    fn.bind(queueElement.cp)();
                  }
                });
              });
            }
            else {
              // If the component is busy or not yet due for an update, re-queue it.
              const queueElement = bbn.fn.getRow(bbn.cp.queue, {cp: queue[i].cp});
              if (queueElement) {
                queueElement.fns.unshift(...queue[i].fns);
              }
              else {
                todo.push(queue[i]);
              }
              i++;
            }
          }

          // Re-add any items that couldn't be processed to the front of the queue.
          if (todo.length) {
            bbn.cp.queue.unshift(...todo);
          }

          // Indicate that the current update cycle is complete.
          bbn.cp.isRunning = false;
        }
      });
    },
    // Interval defined by the tick delay.
    bbn.cp.tickDelay
  );
}
