export default function startTick() {
  if (bbn.cp.interval) {
    throw new Error(bbn._("The tick is already started"));
  }

  let lastUpdate
  bbn.cp.interval = setInterval(
    async function() {
      if (bbn.cp.isRunning) {
        return;
      }

      requestAnimationFrame(tst => {
        if ((tst !== lastUpdate) && bbn.cp.queue.length) {
          lastUpdate = tst;
          bbn.cp.isRunning = true;
          const queue = bbn.cp.queue.splice(0, bbn.cp.queue.length);
          let i = 0;
          let time = bbn.fn.timestamp();
          const todo = [];
          while (queue[i]) {
            if (!queue[i].cp.$isBusy && (queue[i].force || (time - queue[i].cp.$lastLaunch > bbn.cp.tickDelay))) {
              //bbn.fn.log("UPDATING")
              const queueElement = queue.splice(i, 1)[0];
              queueElement.cp.$updateComponent().then(() => {
                queueElement.fns.forEach(fn => {
                  if (fn) {
                    fn.bind(queueElement.cp)();
                  }
                });
              });
              //await bbn.cp.repeatTick(queueElement.cp);
            }
            else {
              const queueElement = bbn.fn.getRow(bbn.cp.queue, {cp: queue[i].cp});
              if (queueElement) {
                queueElement.fns.unshift(...queue[i].fns);
              }
              else {
                todo.push(queue[i]);
              }
              //bbn.fn.log(["I++", i, queue[i].cp.$isBusy, queueElement, queue[i].cp]);
              i++;
            }
          }

          if (todo.length) {
            bbn.cp.queue.unshift(...todo);
          }

          bbn.cp.isRunning = false;
        }
      })
    },
    bbn.cp.tickDelay
  );
}
