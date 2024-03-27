import updateWatcher from "./updateWatcher.js";
import handleElement from "./handleElement.js";
import handleComponent from "./handleComponent.js";
import updateProps from "./updateProps.js";
import bbn from "@bbn/bbn";
/**
 * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
 * - Updates the component element based on its own schema ($el.bbnSchema)
 * - Updates the schema
 * - Generates/update the DOM when needed
 * 
 * @param {bbnCp} cp The component
 * @returns {Promise}
 */
export default async function launch (cp, id, hash) {
  // It cannot be launched if the creation has not been completed or if the component is not in the DOM
  if (!cp.$isCreated || !cp.$el.isConnected) {
    return;
  }

  // If isUpdating is null it means that the component is not yet created
  if (cp.$isUpdating === null) {
    // It will set a new property telling that the component is being created
    Object.defineProperty(cp, '$isCreating', {
      writable: false,
      configurable: true,
      value: true
    });
  }
  // If the component is already updating it will be added to the queue
  else if (cp.$isBusy) {
    // Will add to the queue in priority
    return await cp.$forceUpdate();
  }
  else {
    // Setting the component as being updated
    cp.$isUpdating = true;
  }

  // The HTML component's root in the DOM
  let root = cp.$el;
  // Attaching shadow should be defined in the config
  if (cp.$cfg.shadow) {
    root = cp.$el.attachShadow({ mode: "open" });
  }

  // The first launch must be for the whole component
  if (id && ((id === '0') || cp.$isCreating)) {
    id = false;
  }

  // Setting the state of each element in $expResults to TMP except DEL state, which remains
  for (let n1 in cp.$expResults) {
    for (let n2 in cp.$expResults[n1]) {
      if (!['DEL', 'TMP'].includes(cp.$expResults[n1][n2].state) && (cp.$expResults[n1][n2].num <= cp.$numBuild)) {
        cp.$expResults[n1][n2].state = 'TMP';
      }
    }
  }

  if (id) {
    bbn.fn.log("element in " + cp.$options.name)
    await handleElement(cp, id, hash);
  }
  else {
    //bbn.fn.log("From launch number " + cp.$numBuild + ": component " + cp.$options.name)
    await handleComponent(cp);
  }

  if (!cp.$numBuild) {
    // Init watchers
    bbn.fn.iterate(cp.$watcher, (a, n) => {
      updateWatcher(cp, n, bbn.fn.getProperty(cp, n), true);
    });
  }

  while(cp.$connectors.length) {
    let ele = cp.$connectors.shift();
    if (ele.bbn && ele.isConnected) {
      ele.bbn.$connected();
    }
    else {
      ele.bbnConnected = true;
    }
  }

  if (!id) {
    cp.$numBuild++;
  }

  if (cp.$isCreating) {
    // $isCreating will remain false from now on
    Object.defineProperty(cp, '$isCreating', {
      writable: false,
      configurable: false,
      value: false
    });
    // Emitted only at the component's creation
    cp.$emit('domcreated');
  }

  // For the first launch $isUpdating is null, otherwise true
  // setting it to false will make $isBusy false and allow to launch again
  cp.$isUpdating = false;
}
