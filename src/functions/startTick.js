import bbn from '@bbn/bbn';
import bbnConditionAttr from '../lib/Attr/Condition.js';
import bbnComputed from '../lib/Computed/Computed.js';
import initResults from '../lib/Cp/private/initResults.js';

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

async function treatQueue(num = 0) {
  let isDebug = false;
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

    let tmp = bbn.cp.queue.splice(0);
    const nums = bbn.fn.unique(tmp.map(q => q.num)).sort();
    let oneDone = false;
    for (let i = 0; i < nums.length; i++) {
      let lastElement = null;
      let cps = bbn.fn.createObject();
      let done = [];
      let fns = [];
      let removed = [];
      let forgotten = [];
      const queue = tmp.filter(q => q.num === nums[i]);
      const attrs = [];
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

        if (queueElement.element && (lastElement?.element === queueElement.element)) {
          continue;
        }

        if (queueElement?.element instanceof bbnComputed) {
          if (isDebug) {
            bbn.fn.log("StartTick: " + cp.$options.name + ' - ' + queueElement.element.name + ' - ' + cp.$cid + ' - ' + bbn.cp.numTicks + ' - ' + bbn.cp.propagation.length);
          }

          await queueElement.element.computedUpdate();
        }
        else if (queueElement?.element instanceof bbnAttr) {
          attrs.push(queueElement.element);
        }
        else if (bbn.fn.isFunction(queueElement?.fn)) {
          if (isDebug) {
            bbn.fn.log(cp.$options.name + ' - Fn - ' + cp.$cid + ' - ' + bbn.cp.numTicks + ' - ' + queueElement.fn.toString());
          }

          const hash = queueElement.component.$cid + '-' + queueElement.hash;
          if (fns.includes(hash)) {
            // If on dropdown don't work
            //bbn.fn.log(["ALREADY DONE", hash, queueElement, queueElement.fn.toString()]);
            //continue;
          }

          fns.push(hash);
          await queueElement.fn();
        }
        else {
          bbn.fn.log(["Data in queue", queueElement]);
          throw new Error("DATA IN QUEUE");
          //await queueElement.data.update(true);
        }

        lastElement = queueElement;
      }

      if (attrs.length) {
        attrs.sort(sorter);
        for (const attr of attrs) {
          if (isDebug) {
            bbn.fn.log("StartTick: " + cp.$options.name + ' - ' + attr.id + ' - ' + attr.node.hash + ' - ' + bbn.cp.numTicks);
          }

          if (!(attr instanceof bbnConditionAttr) && attr.node.condition && !attr.node.condition.attrGetValue()) {
            continue;
          }
    
          const id = attr.node.id;
          if (!(attr instanceof bbnConditionAttr) && !(attr instanceof bbnForgetAttr) && forgotten.includes(attr.node)) {
            continue;
          }
    
          if (!(attr instanceof bbnConditionAttr) && (removed.includes(attr.node) || removed.filter(a => !id.indexOf(a.id + '-') && !a.hash.indexOf(attr.node.hash || '')).length)) {
            continue;
          }

          await attr.attrUpdate();
          //bbn.fn.log(queueElement.node.component.$cid + ' ' + queueElement.id + '     ' + bbn.fn.shorten(bbn.fn.removeExtraSpaces(queueElement.exp), 50) + ' (' + bbn.fn.cast(queueElement.value) + ')');
          const attrValue = attr.attrGetValue();
          if (attr instanceof bbnConditionAttr && !attrValue) {
            removed.push(attr.node);
          }
          else if (attr instanceof bbnForgetAttr && attrValue) {
            forgotten.push(attr.node);
          }
        }
      }

      for (let n in cps) {
        cps[n].$lastBuild = nums[i];
      }
    }

    //bbn.cp.numTicks++;

    if (oneDone) {
      //bbn.fn.log(["TREATING QUEUE: " + bbn.cp.queue.length + ' (' + num + ')', bbn.cp.queue]);
      //await treatQueue(num + 1);
    }
  }

  if (!num && bbn.cp.nextQueue.length) {
    bbn.cp.queue.push(...bbn.cp.nextQueue.splice(0).map(a => {
      if (!a.num) {
        a.num = bbn.cp.numTicks;
      }

      return a;
    }));
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

  // Set an interval to periodically check and update components.
  bbn.cp.interval = setInterval(
    async function() {
      // Skip if an update is currently running.
      if (bbn.cp.isRunning || (!bbn.cp.queue.length && !bbn.cp.nextQueue.length)) {
        return;
      }

      bbn.cp.isRunning = true;

      await requestAnimationFrame(async () => {
        await treatQueue();
        bbn.cp.isRunning = false;
      });

      // Indicate that the current update cycle is complete.
    },
    // Interval defined by the tick delay.
    bbn.cp.tickDelay
  );
}
