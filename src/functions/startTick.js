import bbnComputed from '../lib/Computed/Computed.js';
import initResults from '../lib/Cp/private/initResults.js';
import updateWatcher from '../lib/Cp/private/updateWatcher.js';
import bbnInternalNode from '../lib/Node/Internal.js';

const sorter = (a, b) => {
  if (!(a instanceof bbnAttr)) {
    bbn.fn.log(a);
    throw new Error("NOT AN ATTR");
  }
  if (!(b instanceof bbnAttr)) {
    bbn.fn.log(b);
    throw new Error("NOT AN ATTR");
  }

  const tmpA = a.id.match(/^([0-9-]+)-([A-z]{1}[A-z0-9-_]+)$/);
  const tmpB = b.id.match(/^([0-9-]+)-([A-z]{1}[A-z0-9-_]+)$/);
  if ((tmpA?.length !== 3) || (tmpB?.length !== 3)) {
    throw new Error("Invalid ID");
  }

  const idA = tmpA[1];
  const idB = tmpB[1];
  const atA = tmpA[2];
  const atB = tmpB[2];
  if (idA !== idB) {
    return idA < idB ? -1 : 1;
  }
  if (atA === atB) {
    return 0;
  }
  if (atA === 'loop') {
    return -1;
  }
  if (atB === 'loop') {
    return 1;
  }
  if (atA === 'condition') {
    return -1;
  }
  if (atB === 'condition') {
    return 1;
  }
  if (atA === 'forget') {
    return -1;
  }
  if (atB === 'forget') {
    return 1;
  }

  return atA < atB ? -1 : 1;
};
async function treatQueue() {
  const cps = bbn.fn.createObject();

  const done = [];
  if (bbn.cp.queue.length) {
    let queue = bbn.cp.queue.splice(0);
    // Process each component in the queue.
    let oneDone = false;
    const attrQueue = [];
    while (queue.length) {
      const queueElement = queue.shift();
      const cp = queueElement.node?.component || queueElement.component;
      if (!cps[cp.$cid]) {
        cps[cp.$cid] = cp;
        initResults(cp);
      }
      // Doing all elements but attributes
      oneDone = true;
      // Launch the update process for the component.

      //bbn.fn.log("ATTR " + (queueElement.exp || queueElement.value || (queueElement.fn ? queueElement.fn.toString() : queueElement)), queueElement);
      if (queueElement instanceof bbnComputed) {
        await queueElement.update();
      }
      else if (queueElement instanceof bbnAttr) {
        if (!attrQueue.includes(queueElement)) {
          await queueElement.update();
          //attrQueue.push(queueElement);
        }
      }
      else if (bbn.fn.isFunction(queueElement?.fn)) {
        await queueElement.fn();
      }
      else {
        bbn.fn.log(["Data in queue", queueElement]);
        throw new Error("DATA IN QUEUE");
        //await queueElement.data.update(true);
      }
    }

    // Doing all attributes
    if (attrQueue.length) {
      // Sorting attributes
      const q = attrQueue.sort(sorter);
      await requestAnimationFrame(async tst => {
        while (q.length) {
          const queueElement = q.shift();
          await queueElement.update();
          if (queueElement instanceof bbnConditionAttr && !queueElement.value) {
            const id = queueElement.node.id;
            for (let i = 0; i < q.length; i++) {
              if (q[i].id.indexOf(id + '-') === 0) {
                q.splice(i, 1);
                i--;
              }
            }
          }
          else if (queueElement instanceof bbnForgetAttr && queueElement.value) {
            const id = queueElement.node.id;
            for (let i = 0; i < q.length; i++) {
              if (q[i].node.id === id) {
                q.splice(i, 1);
                i--;
              }
            }
          }
        }
      });
    }

    if (oneDone) {
      await treatQueue(done);
    }

    const time = bbn.fn.microtimestamp();
    for (let n in cps) {
      cps[n].$lastBuild = time;
    }
  }
}
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

      bbn.cp.isRunning = true;

      // Using requestAnimationFrame for smooth UI updates.
      //requestAnimationFrame(async tst => {
        // Check if there are updates since the last frame and if the queue has items.
        //if (tst !== lastUpdate) {
          //lastUpdate = tst;

          await treatQueue();

          // Indicate that the current update cycle is complete.
          bbn.cp.isRunning = false;
        //}
      //});
    },
    // Interval defined by the tick delay.
    bbn.cp.tickDelay
  );
}
