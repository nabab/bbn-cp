import bbn from '@bbn/bbn';
import bbnConditionAttr from '../lib/Attr/Condition.js';
import bbnComputed from '../lib/Computed/Computed.js';
import initResults from '../lib/Cp/private/initResults.js';
import queueUpdate from './queueUpdate.js';

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

async function treatQueue(num = 0) {
  let isDebug = false;
  if (bbn.cp.queue.length) {
    if (bbn.cp.queue.length > 100000) {
      if (!isDebug) {
        isDebug = bbn.cp.numTicks;
        bbn.fn.log("SETTING DEBUG MODE", bbn.cp.queue);
        //debugger;
      }
    }
    else if (isDebug) {
      isDebug = false;
    }

    let queue = bbn.fn.order(bbn.cp.queue.splice(0), 'num');
    // Process each component in the queue.
    let oneDone = false;

    let lastElement;
    let lastNum;
    let cps;
    let done;
    let fns;
    let unconditioned = [];
    let forgotten = [];
    const rnd = bbn.fn.randomString();
    bbn.fn.startChrono(rnd);
    if (queue.length === 210) {
      bbn.fn.log(queue.slice());
    }
    bbn.fn.log("TREATING QUEUE: " + queue.length + '"' + rnd + '" (' + num + ' / ' + bbn.cp.numTicks + ')');
    while (queue.length) {
      if (isDebug) {
        if (bbn.cp.numTicks - isDebug > 1000) {
          throw new Error("Too many ticks");
        }
      }
      const queueElement = queue.shift();
      //bbn.fn.log("TREATING QUEUE: ", queueElement, queueElement.element?.name);
      const cp = queueElement.element?.node?.component || queueElement.element?.component || queueElement.component;
      if (!cp.$el.isConnected) {
        continue;
      }

      // If number is different from the previous we reinitialize
      if (lastNum !== queueElement.num) {
        unconditioned = [];
        forgotten = [];
        cps = bbn.fn.createObject();
        lastNum = queueElement.num;

        /*
        if (done?.length) {
          bbn.fn.log(done.slice());
        }*/

        done = [];
        lastElement = null;
        fns = [];
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
          bbn.fn.log("StartTick: " + cp.$options.name + ' - ' + queueElement.element.name + ' - ' + cp.$cid + ' - ' + bbn.cp.numTicks + ' - ' + bbn.cp.propagation.length);
        }

        await queueElement.element.computedUpdate();
      }
      else if (queueElement?.element instanceof bbnAttr) {
        const attr = queueElement.element;
        if (isDebug) {
          bbn.fn.log("StartTick: " + cp.$options.name + ' - ' + attr.id + ' - ' + attr.node.hash + ' - ' + bbn.cp.numTicks);
        }

        const id = attr.node.id;
        if (!(attr instanceof bbnConditionAttr) && !(attr instanceof bbnForgetAttr) && forgotten.includes(attr.node)) {
          continue;
        }

        if (!(attr instanceof bbnConditionAttr) && (unconditioned.includes(attr.node) || unconditioned.filter(a => !a.id.indexOf(id + '-') && !a.hash.indexOf(attr.node.hash || '')).length)) {
          //bbn.fn.log("SKIPPING");
          continue;
        }

        await attr.attrUpdate();
        //bbn.fn.log(queueElement.node.component.$cid + ' ' + queueElement.id + '     ' + bbn.fn.shorten(bbn.fn.removeExtraSpaces(queueElement.exp), 50) + ' (' + bbn.fn.cast(queueElement.value) + ')');
        const attrValue = attr.attrGetValue();
        if (attr instanceof bbnConditionAttr) {
          if (attrValue && unconditioned.includes(attr.node)) {
            unconditioned.splice(unconditioned.indexOf(attr.node), 1);
          }
          else if (!attrValue && !unconditioned.includes(attr.node)) {
            for (let i = 0; i < unconditioned.length; i++) {
              if (unconditioned[i].id.indexOf(id + '-') === 0) {
                unconditioned.splice(i, 1);
                i--;
              }
            }
            unconditioned.push(attr.node);
          }
        }
        else if (attr instanceof bbnForgetAttr) {
          if (!attrValue && forgotten.includes(attr.node)) {
            forgotten.splice(forgotten.indexOf(attr.node), 1);
          }
          else if (attrValue && !forgotten.includes(attr.node)) {
            forgotten.push(attr.node);
          }
        }
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

    if (oneDone) {
      //bbn.fn.log(["TREATING QUEUE: " + bbn.cp.queue.length + ' (' + num + ')', bbn.cp.queue]);
      await treatQueue(num + 1);
    }

    for (let n in cps) {
      cps[n].$lastBuild = bbn.cp.numTicks;
    }

    const duration = bbn.fn.stopChrono(rnd);
    if (duration > 1000) {
      bbn.fn.log("TREATING QUEUE DURATION: " + duration + '"' + rnd + '" (' + num + ' / ' + bbn.cp.numTicks + ')');
    }
  }

  if (!num && bbn.cp.nextQueue.length) {
    while (bbn.cp.nextQueue.length) {
      if (!bbn.cp.nextQueue[0].num) {
        bbn.cp.nextQueue[0].num = bbn.cp.numTicks;
      }
      queueUpdate(bbn.cp.nextQueue.shift());
    }
  }

  //bbn.fn.log("FINISHED FN (" + num + ") WITH " +bbn.cp.queue.length);

}
/**
 * Starts the ticking process for component updates.
 * Throws an error if the tick process is already running.
 */
export default async function startTick() {
  // Check if the tick process is already initiated.
  if (bbn.cp.interval) {
    throw Error(bbn._("The tick is already started"));
  }

  // Skip if an update is currently running.
  if (bbn.cp.isRunning) {
    if (bbn.cp.to) {
      clearTimeout(bbn.cp.to);
    }
    bbn.cp.to = setTimeout(() => {
      startTick();
    }, 5);

    return;
  }

  bbn.cp.isRunning = true;
  await requestAnimationFrame(async () => {
    await treatQueue();
    bbn.cp.isRunning = false;
  });
//  );
}
