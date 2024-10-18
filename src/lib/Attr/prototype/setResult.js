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
        // If it's a given property and not the whole object
        if (a.name) {
          // we create a specific dep
          if (!a.data.deps[a.name]) {
            a.data.deps[a.name] = [];
          }
          if (!a.data.deps[a.name].includes(attr)) {
            a.data.deps[a.name].push(attr);
          }
          const subData = bbnData.getObject(a.data.value[a.name]);
          if (subData) {
            if (!subData.deps.__bbnRoot.includes(attr)) {
              subData.deps.__bbnRoot.push(attr);
            }
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
  // Check if the result needs to be updated.
  if (!(this instanceof bbnModelAttr) && ((this.result?.num || 0) > node.component.$numBuild) && !Object.hasOwn(arguments, 0)) {
    if (this.value !== this.result.value) {
      this.value = this.result.value;
      updateSequence(this.result, this);
    }

    return this.value;
  }

  let res;
  try {
    res = Object.hasOwn(arguments, 0) ? {val: arguments[0], seq: []} : this.attrExec();
  }
  catch (e) {
    if (this.node.isCommented) {
      return;
    }

    throw e;
  }

  let expValue = res.val;
  if (this instanceof bbnConditionAttr || this instanceof bbnForgetAttr) {
    expValue = !!expValue;
    //bbn.fn.log([this.exp, this.id, expValue, this.node.element])
  }

  //const hash = '';
  //bbn.fn.log(["SET RESULT", this.exp, this.id, expValue, hash, this.node.element]);
  let isChanged = false;

  // Update the value if it has changed.
  if (this.result.value !== expValue) {
    this.result.value = expValue;
    //this.result.hash = hash;
    isChanged = true;
  }
/*
  else if (hash !== this.result.hash) {
    this.result.hash = hash;
    isChanged = true;
  }*/

  // Create or update the result object based on its state.
  if (!this.result.num) {
    this.result.state = 'NEW';
  }
  else if (this.result.state === 'DEL') {
    this.result.state = 'NEW';
  }
  else if (this.result.state === 'TMP') {

    if (isChanged) {
      this.result.state = 'MOD'; // Modified state.
    }
    else {
      const dataObj = bbnData.getObject(expValue);
      if (dataObj?.root?.component?.$computed?.[dataObj?.root?.path]?.isChanged) {
        this.result.state = 'MOD'; // <Modified> state.
      }
      else if (dataObj && (this.node.component.$lastBuild < dataObj.lastUpdate)) {
        this.result.state = 'MOD'; // Modified state.
      }
      else if (isChanged) {
        this.result.state = 'MOD'; // <Modified> state.
      }
      else {
        this.result.state = 'OK'; // Unchanged state.
      }
    }
  }
  else if (isChanged) {
    this.result.state = 'MOD'; // Modified state.
  }

  if (this.value !== this.result.value) {
    this.value = this.result.value;
  }
  
  this.result.seq = res.seq;
  this.result.num = node.component.$numBuild + 1;
  updateSequence(this.result, this);

  // Return the updated result value.
  return this.value;
};
