import bbnAttr from '../lib/Attr.js';
import initResults from '../lib/Html/private/initResults.js';
import queueUpdate from './queueUpdate.js';
import elements from '../components/router/_mixins/elements.js';

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

let fullQueueLength = 0;
let numAttr = 0;
let numRepeat = 0;
let numNodeDest = 0;
let numNodeOff = 0;
let numCpDest = 0;
let numWatcher = 0;
let numCpu  = 0;
let numFn  = 0;
let numDone  = 0;
async function treatQueue(num = 0, cps) {
  if (!cps) {
    cps = bbn.fn.createObject();
  }
  let isDebug = true;
  if (!num) {
    fullQueueLength = 0;
    numAttr = 0;
    numRepeat = 0;
    numNodeDest = 0;
    numNodeOff = 0;
    numCpDest = 0;
    numWatcher = 0;
    numCpu  = 0;
    numFn  = 0;
    numDone  = 0;
  }
  fullQueueLength += bbn.cp.queue.length;
  let queueLength = bbn.cp.queue.length;
  if (queueLength) {
    if (fullQueueLength > 100000) {
      if (!isDebug) {
        isDebug = bbn.cp.numTicks;
        bbn.fn.log("SETTING DEBUG MODE", bbn.cp.queue);
        debugger;
      }
    }
    else if (isDebug) {
      isDebug = false;
    }

    let queue = bbn.cp.queue.splice(0);
    // Process each component in the queue.
    let oneDone = false;

    let lastElement;
    let lastNum;
    let done = new Map();
    let fns = [];
    let unconditioned = [];
    let elementsDone = [];
    let forgotten = [];
    let chronoDiff = 0;
    const rnd = bbn.fn.randomString();
    bbn.fn.startChrono(rnd);
    queueLength = queue.length;
    //bbn.fn.log("TREATING QUEUE: " + queue.length + '"' + rnd + '" (' + num + ' / ' + bbn.cp.numTicks + ')');
    while (queue.length) {
      if (isDebug) {
        if (bbn.cp.numTicks - isDebug > 1000) {
          throw new Error("Too many ticks");
        }
      }
      if (queue.length % 20 === 0) {
        let currentChrono = bbn.fn.getChrono(rnd) - chronoDiff;
        if (currentChrono > 50) {
          chronoDiff += currentChrono;
          await bbn.fn.yieldToBrowser();
          //await bbn.cp.nextFrame();
        }
      }


      const queueElement = queue.shift();
      if (!bbn.cp.componentsIndex.has(queueElement.component?.$cid)) {
        continue;
      }

      if (queueElement.element) {
        if (elementsDone.includes(queueElement.element)) {
          continue;
        }

        elementsDone.push(queueElement.element);
      }

      const isAttr = queueElement.element instanceof bbnAttr;
      if (isAttr) {
        numAttr++;
      }
      if (isAttr && queueElement.element.node.off) {
        numNodeOff++;
        //bbn.fn.log("ELEMENT IS DESTROYED");
        continue;
      }
      const isComputed = queueElement.element?.constructor?.name === 'bbnComputed';
      const isWatcher = queueElement.element?.constructor?.name === 'bbnWatcher';
      if (isComputed) {
        numCpu++;
      }
      else if (isWatcher) {
        numWatcher++;
      }
      else if (!isAttr) {
        numFn++;
      }
      //bbn.fn.log("TREATING QUEUE: ", queueElement, queueElement.element?.name);
      const cp = queueElement.component;
      if (isAttr && queueElement.element.node.isDestroyed) {
        numNodeDest++;
        //bbn.fn.log("ATTR IS DESTROYED: " + queueElement.element.id);
        continue;
      }

      if (cp?.$isDestroyed) {
        numCpDest++;
        //bbn.fn.log("CP IS DESTROYED IsAttr ? " + isAttr + " isDestroyed ? " + (isAttr ? queueElement.element.node.isDestroyed : false));
        continue;
      }

      // If number is different from the previous we reinitialize
      if (lastNum !== queueElement.num) {
        unconditioned = [];
        forgotten = [];
        done = new Map();
        lastElement = null;
        elementsDone = [];
        fns = [];
        lastNum = queueElement.num;
      }

      if (queueElement.element) {
        if (done.get(queueElement.element) >= queueElement.num) {
          numDone++;
          continue;
          
        }
        else {
          done.set(queueElement.element, queueElement.num);
        }
      }

      if (!cps[cp.$cid]) {
        cps[cp.$cid] = cp;
        initResults(cp);
      }

      // Doing all elements but attributes
      oneDone = true;
      // Launch the update process for the component.


      if (isComputed) {
        if (lastElement?.element === queueElement.element) {
          numRepeat++;
          //bbn.fn.log("LAST IS DONE");
          continue;
        }

        if (isDebug) {
          bbn.fn.log("StartTick: " + cp.$options.name + ' - ' + queueElement.element.name + ' - ' + cp.$cid + ' - ' + bbn.cp.numTicks);
        }

        queueElement.element.computedUpdate();
      }
      else if (isAttr) {
        const attr = queueElement.element;
        if (attr.node.isOut) {
          continue;
        }

        if (isDebug) {
          bbn.fn.log("StartTick: " + cp.$options.name + ' - ' + attr.id + ' - ' + attr.node.hash + ' - ' + bbn.cp.numTicks);
        }

        const id = attr.node.id;
        if (attr.constructor.name !== 'bbnConditionAttr') {
          if ((attr.constructor.name !== 'bbnForgetAttr') && forgotten.includes(attr.node)) {
            continue;
          }

          if (unconditioned.includes(attr.node) || unconditioned.filter(a => !id.indexOf(a.id + '-') && !(attr.node.hash || '').indexOf(a.hash)).length) {
            //bbn.fn.log(["UNCONDITIONED", unconditioned, unconditioned.includes(attr.node), unconditioned.filter(a => !a.id.indexOf(id + '-') && !a.hash.indexOf(attr.node.hash || '')).length]);
            continue;
          }
        }


        attr.attrUpdate();
        //bbn.fn.log(queueElement.node.component.$cid + ' ' + queueElement.id + '     ' + bbn.fn.shorten(bbn.fn.removeExtraSpaces(queueElement.exp), 50) + ' (' + bbn.fn.cast(queueElement.value) + ')');
        const attrValue = attr.attrGetValue();
        if (attr.constructor.name === 'bbnConditionAttr') {
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
        else if (attr.constructor.name === 'bbnForgetAttr') {
          if (!attrValue && forgotten.includes(attr.node)) {
            forgotten.splice(forgotten.indexOf(attr.node), 1);
          }
          else if (attrValue && !forgotten.includes(attr.node)) {
            forgotten.push(attr.node);
          }
        }
      }
      else if (isWatcher) {
        queueElement.element.watcherUpdate(false, queueElement.level);
      }
      else if (bbn.fn.isFunction(queueElement?.fn)) {
        if (isDebug) {
          bbn.fn.log(cp.$options.name + ' - Fn - ' + cp.$cid + ' - ' + bbn.cp.numTicks + ' - ' + queueElement.fn.toString());
        }

        const hash = queueElement.component.$cid + '-' + queueElement.hash;
        if (fns.includes(hash)) {
          // If on dropdown don't work
          //bbn.fn.log(["ALREADY DONE", hash, queueElement, queueElement.fn.toString()]);
          continue;
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

    if (oneDone && bbn.cp.queue.length) {
      //await bbn.cp.nextFrame();
      //bbn.fn.log(["TREATING QUEUE: " + bbn.cp.queue.length + ' (' + num + ')', bbn.cp.queue]);
      queueLength += await treatQueue(num + 1);
    }

    if (num) {
      return queueLength;
    }

    const duration = bbn.fn.stopChrono(rnd);
    if (duration > 1000) {//} || (fullQueueLength > 1000)) {
      bbn.fn.log(
        "TREATING QUEUE DURATION: " + duration 
        + " / NUMBER OF ELEMENTS IN QUEUE: " 
        + fullQueueLength + " / NUM TICKS: " + bbn.cp.numTicks
        + " | ATTRS: " + numAttr
        + " | COMPUTED: " + numCpu
        + " | WATCHERS: " + numWatcher
        + " | FUNCTIONS: " + numFn
        + " | REPEATS: " + numRepeat
        + " | DONE: " + numDone
        + " | NODE DESTROYED: " + numNodeDest
        + " | NODE OFF: " + numNodeOff
        + " | CP DESTROYED: " + numCpDest
      );
    }
  }

  if (!num && bbn.cp.nextQueue.length) {
    queueUpdate(...bbn.cp.nextQueue.splice(0));
  }

  ///bbn.fn.log("FINISHED FN (" + num + ") WITH " +bbn.cp.queue.length);
  return queueLength;

}
/**
 * Starts the ticking process for component updates.
 * Throws an error if the tick process is already running.
 */
export default async function startTick() {
  // Check if the tick process is already initiated.
  if (bbn.cp.interval) {
    throw new Error(bbn._("The tick is already started"));
  }

  // Skip if an update is currently running.
  if (bbn.cp.isRunning) {
    return;
  }

  bbn.cp.isRunning = true;
  return new Promise((resolve) => {
    setTimeout(async () => {
      await treatQueue();
      bbn.cp.isRunning = false;
      if (bbn.cp.queue.length || bbn.cp.nextQueue.length) {
        await bbn.cp.startTick();
      }
      else {
        resolve(true);
      }
  });
  }, 0);
}
