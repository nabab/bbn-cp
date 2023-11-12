import bbnCp from "../Cp.js";

/**
 * (Re)generates the whole component's vDOM and DOM if needed, picking the right root, shadow or not
 * - Updates the component element based on its own schema ($el.bbnSchema)
 * - Updates the schema
 * - Generates/update the DOM when needed
 * 
 * @param {Boolean} shadow The content will go to the shadow DOM if true
 * @returns {Promise}
 */
bbnCp.prototype.$updateComponent = async function (shadow) {
  if (!this.$isCreated || !this.$el.isConnected) {
    return;
  }

  if (this.$isUpdating === null) {
    Object.defineProperty(this, '$isCreating', {
      writable: false,
      configurable: true,
      value: true
    });
  }
  else if (this.$isBusy) {
    // Will add to the queue in priority
    return this.$forceUpdate();
  }
  else {
    this.$isUpdating = true;
  }

  // The HTML component's root in the DOM
  let root = this.$el;
  if (shadow) {
    root = this.$el.attachShadow({ mode: "open" });
  }

  const t1 = (new Date()).getTime();
  this.$lastLaunch = t1;
  this.$updateProps();
  if (!this.$numBuild) {
    // Init watchers
    bbn.fn.iterate(this.$watcher, (a, n) => {
      this.$updateWatcher(n, bbn.fn.getProperty(this, n), true);
    });
  }

  //bbn.fn.log(["EVALUATING", this.$options.name, this.$cid]);
  if (this.$options.name === 'bbn-table') {
    //debugger;
  }
  const e = await this.$eval(this);
  const t2 = (new Date()).getTime();
  this.$numBuild++;
  this.$lastLaunch = t2;
  if (this.$isCreating) {
    Object.defineProperty(this, '$isCreating', {
      writable: false,
      configurable: false,
      value: false
    });
    this.$emit('domcreated');
  }

  this.$isUpdating = false;
  //bbn.fn.log("UPDATED COMPONENT " + this.$options.name + ' / ' + this.$cid + ' / ' + this.$numBuild + ' / ' + (t2 - t1) + 'ms', this);

}