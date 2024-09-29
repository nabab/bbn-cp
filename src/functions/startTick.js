import bbn from '@bbn/bbn';
import bbnConditionAttr from '../lib/Attr/Condition.js';
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

  const idCpA = a.node.component.$cid;
  const idCpB = b.node.component.$cid;

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

async function treatQueue(unconditioned = [], forgotten = []) {
  let isDebug = false;
  const done = [];
  if (bbn.cp.queue.length) {
    //bbn.fn.log("TREATING QUEUE: " + bbn.cp.queue.length);
    if (bbn.cp.queue.length > 100000) {
      if (!isDebug) {
        isDebug = bbn.cp.numTicks;
        bbn.fn.log("SETTING DEBUG MODE");
      }
    }
    else if (isDebug) {
      isDebug = false;
    }

    let queue = bbn.cp.queue.splice(0);
    //bbn.fn.log(queue.slice());
    // Process each component in the queue.
    let oneDone = false;
    const attrQueue = [];

    let lastElement;
    let lastNum;
    let cps;
    let done;
    const proms = [];
    /*
    bbn.fn.log(JSON.stringify(queue.map(a => {
      if (a instanceof bbnComputed) {
        return a.component.$cid + ' ' + a.name;
      }

      if (a instanceof bbnAttr) {
        if (a instanceof bbnClassAttr || a instanceof bbnStyleAttr) {
          return a.node.component.$cid + ' ' + a.id;
        }

        return a.node.component.$cid + ' ' + a.id + '     ' + bbn.fn.shorten(bbn.fn.removeExtraSpaces(a.exp), 50) + ' (' + bbn.fn.cast(a.value) + ')';
      }

      if (bbn.fn.isFunction(a?.fn)) {
        const fn = bbn.fn.analyzeFunction(a.fn);
        return a.component.$cid + ' Fn ' + fn?.hash;
      }

      return '';

    }), null, 2));
    */
    while (queue.length) {
      if (isDebug) {
        if (bbn.cp.numTicks - isDebug > 1000) {
          throw new Error("Too many ticks");
        }
      }
      const queueElement = queue.shift();
      const cp = queueElement.element?.node?.component || queueElement.element?.component || queueElement.component;
      if (!cp.$el.isConnected) {
        continue;
      }

      if (lastNum !== queueElement.num) {
        cps = bbn.fn.createObject();
        lastNum = queueElement.num;
        if (proms.length) {
          await Promise.all(proms);
          proms.splice(0);
        }

        /*
        if (done?.length) {
          bbn.fn.log(done.slice());
        }*/

        done = [];
        lastElement = null;
      }

      if (queueElement.element) {
        if (done.includes(queueElement.element)) {
          continue;
        }

        done.push(queueElement.element);
      }

      if (!cps[cp.$cid]) {
        cps[cp.$cid] = cp;
        initResults(cp);
      }

      // Doing all elements but attributes
      oneDone = true;
      // Launch the update process for the component.


      if (queueElement?.element instanceof bbnComputed) {
        if (lastElement?.element === queueElement.element) {
          continue;
        }

        if (isDebug) {
          bbn.fn.log(cp.$options.name + ' - ' + queueElement.element.name + ' - ' + cp.$cid + ' - ' + bbn.cp.numTicks);
        }

        proms.push(queueElement.element.update());
      }
      else if (queueElement?.element instanceof bbnAttr) {
        if (lastElement?.element === queueElement.element) {
          continue;
        }

        const attr = queueElement.element;
        if (isDebug) {
          bbn.fn.log(cp.$options.name + ' - ' + attr.id + ' - ' + attr.node.hash + ' - ' + bbn.cp.numTicks);
        }

        const id = attr.node.id;
        if (!(attr instanceof bbnConditionAttr) && !(attr instanceof bbnForgetAttr) && forgotten.includes(id)) {
          continue;
        }

        if (!(attr instanceof bbnConditionAttr) && (unconditioned.includes(id) || unconditioned.filter(a => id.indexOf(a + '-') === 0).length)) {
          continue;
        }

        proms.push(attr.attrUpdate());
        //bbn.fn.log(queueElement.node.component.$cid + ' ' + queueElement.id + '     ' + bbn.fn.shorten(bbn.fn.removeExtraSpaces(queueElement.exp), 50) + ' (' + bbn.fn.cast(queueElement.value) + ')');
        if (attr instanceof bbnConditionAttr) {
          if (attr.value && unconditioned.includes(id)) {
            unconditioned.splice(unconditioned.indexOf(id), 1);
          }
          else if (!attr.value && !unconditioned.includes(id)) {
            for (let i = 0; i < unconditioned.length; i++) {
              if (unconditioned[i].indexOf(id + '-') === 0) {
                unconditioned.splice(i, 1);
                i--;
              }
            }

            unconditioned.push(id);
          }
        }
        else if (attr instanceof bbnForgetAttr) {
          if (!attr.value && forgotten.includes(id)) {
            forgotten.splice(forgotten.indexOf(id), 1);
          }
          else if (attr.value && !forgotten.includes(id)) {
            forgotten.push(id);
          }
        }
      }
      else if (bbn.fn.isFunction(queueElement?.fn)) {
        if (isDebug) {
          bbn.fn.log(cp.$options.name + ' - Fn - ' + cp.$cid + ' - ' + bbn.cp.numTicks + ' - ' + queueElement.fn.toString());
        }

        proms.push(queueElement.fn());
      }
      else {
        bbn.fn.log(["Data in queue", queueElement]);
        throw new Error("DATA IN QUEUE");
        //await queueElement.data.update(true);
      }

      lastElement = queueElement;
    }

    if (proms.length) {
      await Promise.all(proms);
    }

    bbn.cp.numTicks++;
    if (oneDone) {
      //bbn.fn.log(["TREATING QUEUE: " + bbn.cp.queue.length + ' (' + num + ')', bbn.cp.queue]);
      await treatQueue(unconditioned, forgotten);
    }

    for (let n in cps) {
      cps[n].$lastBuild = bbn.cp.numTicks;
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
          bbn.cp.numTicks++;

          // Indicate that the current update cycle is complete.
          bbn.cp.isRunning = false;
        //}
      //});
    },
    // Interval defined by the tick delay.
    bbn.cp.tickDelay
  );
}
