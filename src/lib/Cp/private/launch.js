import bbn from "@bbn/bbn";
import treatItems from "./treatItems.js";
import treatProperties from "./treatProperties.js";
import applySchemaOnComponent from "./applySchemaOnComponent.js";
import updateWatcher from "./updateWatcher.js";
import updateProps from "./updateProps.js";

/**
 * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
 * - Updates the component element based on its own schema ($el.bbnSchema)
 * - Updates the schema
 * - Generates/update the DOM when needed
 * 
 * @param {Boolean} shadow The content will go to the shadow DOM if true
 * @returns {Promise}
 */
export default async function launch (cp, shadow) {
  if (!cp.$isCreated || !cp.$el.isConnected) {
    return;
  }

  if (cp.$isUpdating === null) {
    Object.defineProperty(cp, '$isCreating', {
      writable: false,
      configurable: true,
      value: true
    });
  }
  else if (cp.$isBusy) {
    // Will add to the queue in priority
    return cp.$forceUpdate();
  }
  else {
    cp.$isUpdating = true;
  }

  // The HTML component's root in the DOM
  let root = cp.$el;
  if (shadow) {
    root = cp.$el.attachShadow({ mode: "open" });
  }

  const t1 = (new Date()).getTime();
  cp.$lastLaunch = t1;
  updateProps(cp);
  bbn.fn.log(["ON LAUNCH", cp.$el.bbnSchema, cp.$props]);
  const {props} = treatProperties(cp, '0');
  applySchemaOnComponent(cp, props);
  if (!cp.$numBuild) {
    // Init watchers
    bbn.fn.iterate(cp.$watcher, (a, n) => {
      updateWatcher(cp, n, bbn.fn.getProperty(cp, n), true);
    });
  }

  // Setting the state of each element in $currentResult to TMP except DEL state, which remains
  bbn.fn.iterate(cp.$currentResult, a => {
    bbn.fn.iterate(a, b => {
      if (b.state !== 'DEL') {
        b.state = 'TMP';
      }
    });
  });
  bbn.fn.warning("EVALUATING " + cp.$options.name);
  const e = await treatItems(cp, cp.$tpl[0].items, cp.$hash, cp.$el);
  const t2 = (new Date()).getTime();
  cp.$numBuild++;
  cp.$lastLaunch = t2;
  if (cp.$isCreating) {
    Object.defineProperty(cp, '$isCreating', {
      writable: false,
      configurable: false,
      value: false
    });
    cp.$emit('domcreated');
  }

  cp.$isUpdating = false;
  //bbn.fn.log("UPDATED COMPONENT " + cp.$options.name + ' / ' + cp.$cid + ' / ' + cp.$numBuild + ' / ' + (t2 - t1) + 'ms', cp);

}