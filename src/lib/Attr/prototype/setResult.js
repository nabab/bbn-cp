import bbn from "@bbn/bbn";
import initResults from "../../Cp/private/initResults.js";
import bbnAttr from "../Attr.js";
import bbnConditionAttr from "../Condition.js";
import bbnModelAttr from "../Model.js";

/**
 * Updates the dependency sequence for a given result and attribute.
 * @param {Object} result - The result object containing state and sequence information.
 * @param {Object} attr - The attribute being processed.
 */
const updateSequence = function (result, attr) {
  if (result.seq.length && (result.state !== 'OK')) {
    // Iterate through the sequence of actions in the result.
    for (let i = 0; i < result.seq.length; i++) {
      let a = result.seq[i];
      // If the action's data is an instance of bbnData.
      if (a.data instanceof bbnData) {
        if (a.name) {
          if (!a.data.deps[a.name]) {
            a.data.deps[a.name] = [];
          }
          if (!a.data.deps[a.name].includes(attr)) {
            a.data.deps[a.name].push(attr);
          }
        }
        // Add the attribute to the data dependencies if not already present.
        else if (!a.data.deps.__bbnRoot.includes(attr)) {
          a.data.deps.__bbnRoot.push(attr);
        }
      }
      else {
        // Add the attribute to the component dependencies if not already present.
        if (!a.component.$deps[a.name]) {
          a.component.$deps[a.name] = [];
        }

        if (!a.component.$deps[a.name].includes(attr)) {
          a.component.$deps[a.name].push(attr);
        }
      }
    }
  }
}

// Extend the bbnAttr prototype with the attrSetResult method.
bbnAttr.prototype.attrSetResult = function() {
  if (!this.fn) {
    return this.value;
  }

  const node = this.node;
  const r = node.component.$expResults;
  const hash = node.hash || '_root'; // Default hash to '_root' if not provided.

  // Ensure the result object exists for the given hash.
  if (!r[this.id]) {
    r[this.id] = bbn.fn.createObject();
  }

  // Check if the result needs to be updated.
  if (!(this instanceof bbnModelAttr) && ((r[this.id][hash]?.num || 0) > node.component.$numBuild) && !Object.hasOwn(arguments, 0)) {
    if (this.value !== r[this.id][hash].value) {
      this.state = r[this.id][hash].state;
      this.value = r[this.id][hash].value;
      updateSequence(r[this.id][hash], this);
    }

    return this.value;
  }

  const res = Object.hasOwn(arguments, 0) ? {val: arguments[0], seq: []} : this.attrExec();
  let expValue = res.val;
  if (this instanceof bbnConditionAttr || this instanceof bbnForgetAttr) {
    expValue = !!expValue;
    //bbn.fn.log([this.exp, this.id, expValue, this.node.element])
  }

  let isChanged = false;

  // Update the value if it has changed.
  if (this.value !== expValue) {
    this.value = expValue;
    isChanged = true;
  }

  // Create or update the result object based on its state.
  if (!r[this.id][hash]) {
    r[this.id][hash] = bbn.fn.createObject({
      state: 'NEW', // New state.
      value: expValue,
    });
  }
  else if (r[this.id][hash].state === 'DEL') {
    r[this.id][hash].value = expValue;
    r[this.id][hash].state = 'NEW';
  }
  else if (r[this.id][hash].state === 'TMP') {
    if (r[this.id][hash].value !== expValue) {
      r[this.id][hash].value = expValue;
      r[this.id][hash].state = 'MOD'; // Modified state.
    }
    else {
      const dataObj = bbnData.getObject(expValue);
      if (dataObj && (this.node.component.$lastBuild < dataObj.lastUpdate)) {
        r[this.id][hash].state = 'MOD'; // Modified state.
      }
      else {
        r[this.id][hash].state = 'OK'; // Unchanged state.
      }
    }
  }
  else if (isChanged) {
    if (r[this.id][hash].value !== expValue) {
      r[this.id][hash].value = expValue;
    }

    r[this.id][hash].state = 'MOD'; // Modified state.
  }

  this.state = r[this.id][hash].state;

  r[this.id][hash].seq = res.seq;
  r[this.id][hash].num = node.component.$numBuild + 1;
  updateSequence(r[this.id][hash], this);

  // Return the updated result value.
  return this.value;
};
