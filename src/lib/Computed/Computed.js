import bbn from "@bbn/bbn";
import propagateDependencyChanges from "../Cp/private/propagateDependencyChanges.js";
import updateWatcher from "../Cp/private/updateWatcher.js";

/**
 * Class representing a computed property.
 */
export default class bbnComputed {
  #old;
  #val;
  #component;
  #name;
  #getter;
  #setter = false;
  #data = false;
  #num = 0;

  static queue = [];

  /**
   * Creates an instance of bbnComputed.
   * @param {Object} cp - The component to which the computed property belongs.
   * @param {string} name - The name of the computed property.
   * @param {Function} getter - The getter function for the computed property.
   * @param {Function} [setter] - The optional setter function for the computed property.
   */
  constructor(cp, name, getter, setter) {
    // Check if cp is an instance of bbnCp.
    bbn.fn.checkType(cp, bbnCp);
    this.#component = cp;
    // Check if name is a string.
    bbn.fn.checkType(name, String);
    this.#name = name;
    // Check if getter is a function.
    bbn.fn.checkType(getter, Function);
    // Bind the getter function to the component.
    this.#getter = getter.bind(this.#component);

    if (setter) {
      bbn.fn.checkType(setter, Function);
      // Bind the setter function to the component.
      this.#setter = setter.bind(this.#component); 
    }

    // Set the computed property on the component.
    this.#setOnComponent();
  }

  /**
   * @returns {boolean} Whether the computed property has a setter.
   */
  get hasSetter() {
    return this.#setter !== false;
  }

  /**
   * @returns {*} The old value of the computed property.
   */
  get old() {
    return this.#old;
  }

  /**
   * @returns {*} The current value of the computed property.
   */
  get val() {
    return this.#val;
  }

  /**
   * @returns {string} The name of the computed property.
   */
  get name() {
    return this.#name;
  }

  /**
   * @returns {number} The update count of the computed property.
   */
  get num() {
    return this.#num;
  }

  /**
   * @returns {Object} The component to which the computed property belongs.
   */
  get component() {
    return this.#component;
  }

  /**
   * Updates the value of the computed property.
   * @param {boolean} [force=false] - Whether to force the update.
   */
  update(force = false) {
    // If the component is destroyed, return.
    if (this.#component.$isDestroyed) {
      return;
    }

    // If not forced and the computed property has been updated more recently than the component, return.
    if (!force && (this.#num > this.#component.$numBuild)) {
      return;
    }

    let forceUpdate = false;

    // Start watching the process before executing the getter.
    bbnData.startWatching();
    // Get the new value using the getter.
    let v = this.#getter();
    // Stop watching the process, and gets the array of all data used to get the value
    const deps = bbnData.stopWatching();
    //bbn.fn.log("UPDATNG COMPUTED " + this.#name + ' ' + this.#component.$cid);

    // Only if the new value is different
    // Adding this in the dependencies of each elements from the watching sequence
    let prev = false;
    for (let i = 0; i < deps.length; i++) {
      const a = deps[i];
      if (a.data instanceof bbnData) {
        bbn.fn.each(a.data.refs, r => {
          if (r.parent === prev) {
            deps.splice(i - 1, 1);
            i--;
            a = deps[i];
            return false;
          }
        });

        if (a.name) {
          if (!a.data.deps[a.name]) {
            a.data.deps[a.name] = [];
          }
          if (!a.data.deps[a.name].includes(this)) {
            a.data.deps[a.name].push(this);
          }
        }
        // Add the attribute to the data dependencies if not already present.
        else if (!a.data.deps.__bbnRoot.includes(this)) {
          a.data.deps.__bbnRoot.push(this);
        }
      }
      else if (a.component && a.name && a.component.$namespaces[a.name]) {
        if (!a.component.$deps[a.name]) {
          a.component.$deps[a.name] = [];
        }

        if (!a.component.$deps[a.name].includes(this)) {
          a.component.$deps[a.name].push(this); // Add this computed property to the component's dependencies.
        }
      }

      prev = a;
    }

    if (this.#val !== v) {
      // Taking care of data (object or array)
      if (!bbn.fn.isPrimitive(v)) {
        // Case where the result has not been treated and a data object already exists
        if (!v.__bbnData && this.#data) {
          if (!bbn.fn.numProperties(bbn.fn.diffObj(this.#val, v))) {
            v = this.#val;
          }
          // If both are arrays we mutate the old one into the new one
          else if (this.#data.isArray && bbn.fn.isArray(v)) {
            let hasChanged = false;
            for (let i = 0; i < v.length; i++) {
              if (v[i] !== this.#data.value[i]) {
                if (!v[i].__bbnData && Object.hasOwn(this.#data.value, i) && !bbn.fn.numProperties(bbn.fn.diffObj(v[i], this.#data.value[i]))) {
                  continue;
                }

                hasChanged = true;
                if (!Object.hasOwn(this.#data.value, i)) {
                  this.#data.value.push(v[i]);
                }
                else if (this.#data.value.includes(v[i])) {
                  bbn.fn.move(this.#data.value, this.#data.value.indexOf(v[i]), i);
                }
                else if (v[i].__bbnData) {
                  this.#data.value.splice(i, 0, v[i]);
                }
                else if (!bbn.fn.isSame(v[i], this.#data.value[i])) {
                  if (bbn.fn.isObject(v[i], this.#data.value[i])) {
                    bbn.fn.mutateObject(this.#data.value[i], v[i]);
                  }
                  else {
                    this.#data.value.splice(i, !Object.hasOwn() || v.includes(this.#data.value[i]) ? 0 : 1, v[i]);
                  }
                }
              }
            }
            if (this.#data.value.length > v.length) {
              this.#data.value.splice(v.length);
            }

            v = this.#data.value;
          }
          // If both are objects we mutate the old one into the new one
          else if (!this.#data.isArray && bbn.fn.isObject(v)) {
            bbn.fn.mutateObject(this.#data.value, v);
            //bbn.fn.log(["MUTATE OBJECT", this.#data.value, v]);
            v = this.#data.value;
          }
          else {
            // Remove the old data object from the component.
            this.#data.removeComponent(this.#component, this.#name);
            v = this.#component.$treatValue(v, this.#name);
            this.#data = bbnData.getObject(v);
          }

        }
        // Case where the result is already treated (by another property and/or another component)
        else if (v.__bbnData) {
          const data = bbnData.retrieve(v.__bbnData); 
          if (v.__bbnData !== this.#data?.id) {
            // Existing different data object
            if (this.#data) {
              // Remove the old data object from the component.
              this.#data.removeComponent(this.#component, this.#name);
              this.#data = false;
            }
          }

          // Retrieve the new data object.
          if (data) {
            // Add the new data object to the component.
            data.addComponent(this.#component, this.#name); 
          }
        }
        else {
          // Treat the value and get the data object.
          v = this.#component.$treatValue(v, this.#name);
          this.#data = bbnData.getObject(v);
        }
      }

      if (this.#val !== v) {
        //bbn.fn.log(["UPDATING COMPUTED " + this.#name + " ON " + this.#component.$options.name, bbn.fn.diffObj(this.#val, v)]);
        if (this.#num) {
          // Update the component with the new value.
          this.#updateComponent(v, forceUpdate);
        }
        else {
          this.#val = v;
        }
      }
    }

    // Update the build number.
    this.#num = this.#component.$numBuild + 1;

  }

  /**
   * Sets the computed property on the component that creates it.
   * @private
   */
  #setOnComponent() {
    const name = this.#name;
    const setter = this.#setter;
    const _t = this;
    const def = {
      /* Always a getter */
      get() {
        // If the data is not set yet, return undefined.
        if (!this.$isDataSet) {
          return undefined;
        }

        // If the computed property has not been updated yet, update it.
        if (!this.$computed[name].num) {
          // Update the computed property's value.
          this.$computed[name].update();
          // Initialize the watcher for the computed property.
          updateWatcher(this, name, true);
        }
        else if (bbn.cp.queue.includes(this.$computed[name])) {
          let idx = bbn.cp.queue.indexOf(this.$computed[name]);
          bbn.cp.queue.splice(idx, 1);
          _t.#num--;
          this.$computed[name].update();
        }

        //if (!this.$computed[name].val?.__bbnData) {
          // Add the computed property to the sequence.
          bbnData.addSequence(this, name);
        //}

        // Return the value of the computed property.
        return this.$computed[name].val;
      }
    };
    /* Maybe a setter */
    if (setter) {
      def.set = function (v) {
        const res = setter(v);
        this.$computed[name].update();
        return res;
      };
    }

    // The $computed property is this very object
    Object.defineProperty(this.#component.$computed, this.#name, {
      value: this,
      configurable: false,
      writable: false
    });
    // The computed property is defined on the component with the getter and setter.
    Object.defineProperty(this.#component, this.#name, def);
  }

  /**
   * Updates the component with the new value.
   * @param {*} value - The new value.
   * @private
   */
  #updateComponent(value, force) {
    // Get the old value and its hash from the computed property
    const oldValue = this.#val;
    // Flag to determine if the computed property needs to be updated
    let go = value !== oldValue;

    if (go || force) {
      // If the new value and old value are not the same
      // Remove the old data object from its component's list of data objects
      // Update the computed property's value and hash
      this.#old = oldValue;
      this.#val = value;

      // Update the computed property's watcher and propagate any dependency changes
      propagateDependencyChanges(this.#component, this.#name);
      updateWatcher(this.#component, this.#name);

    }

    return true;
  }
}
