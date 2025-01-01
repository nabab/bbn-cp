import bbn from "@bbn/bbn";
import bbnAttr from "../../Attr.js";
import bbnConditionAttr from "../Condition.js";
import bbnModelAttr from "../Model.js";
import bbnShowAttr from "../Show.js";

const checkDeps = function (data, name) {
  let i = 0;
  while (i < data.deps[name].length) {
    if ((data.deps[name][i] instanceof bbnAttr)) {
      data.deps[name].splice(i, 1);
    }
    else {
      i++;
    }
  }
};

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
        if (!a.data.targetData) {
          continue;
        }

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
          attr.ownDeps.push({component: a.component, name: a.name});
          //bbn.fn.log("PUSH " + a.name + " " + a.component.$deps[a.name].length)
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
  const component = node.component;
  const result = this.result;
  // Check if the result needs to be updated.
  if (!(this instanceof bbnModelAttr) && ((this.result?.num || 0) > node.component.$numBuild) && !Object.hasOwn(arguments, 0)) {
    return this.value;
  }

  result.num = component.$numBuild + 1;
  let res;
  try {
    res = Object.hasOwn(arguments, 0) ? {val: arguments[0], seq: []} : this.attrExec();
  }
  catch (e) {
    if (node.isCommented) {
      return;
    }

    throw e;
  }

  let expValue = res.val;
  if (this instanceof bbnConditionAttr || this instanceof bbnForgetAttr || this instanceof bbnShowAttr) {
    expValue = !!expValue;
    //bbn.fn.log([this.exp, this.id, expValue, this.node.element])
  }

  //const hash = '';
  //bbn.fn.log(["SET RESULT", this.exp, this.id, expValue, hash, this.node.element]);
  let isChanged = false;

  // Update the value if it has changed.
  if (result.value !== expValue) {
    /*
    const o = bbnData.recognize(expValue, result.value, component, this);
    if (result.value !== o.value) {
      result.value = o.value;
    }
    //result.hash = hash;
    isChanged = o.changed;
    */
    result.value = expValue;
    isChanged = true;
  }
/*
  else if (hash !== this.result.hash) {
    this.result.hash = hash;
    isChanged = true;
  }*/

  // Create or update the result object based on its state.
  if (result.num === 1) {
    result.state = 'NEW';
  }
  else if (result.state === 'DEL') {
    result.state = 'NEW';
  }
  else if (isChanged) {
    result.state = 'MOD'; // Modified state.
  }
  else {
    if (isChanged) {
      result.state = 'MOD'; // Modified state.
    }
    else {
      const dataObj = bbnData.getObject(expValue);
      if (dataObj?.root?.component?.$computed?.[dataObj?.root?.path]?.isChanged) {
        result.state = 'MOD'; // <Modified> state.
      }
      else if (dataObj && (component.$lastBuild < dataObj.lastUpdate)) {
        result.state = 'MOD'; // Modified state.
      }
      else if (isChanged) {
        result.state = 'MOD'; // <Modified> state.
      }
      else {
        result.state = 'OK'; // Unchanged state.
      }
    }
  }

  if (this.value !== result.value) {
    this.value = result.value;
  }
  
  result.seq = res.seq;
  updateSequence(result, this);

  // Return the updated result value.
  return this.value;
};
