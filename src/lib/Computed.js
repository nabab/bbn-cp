import propagateDependencyChanges from "./Html/private/propagateDependencyChanges.js";
import updateWatcher from "./Html/private/updateWatcher.js";

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
  #changed = false;

  static queue = [];

  /**
   * Creates an instance of bbnComputed.
   * @param {Object} cp - The component to which the computed property belongs.
   * @param {string} name - The name of the computed property.
   * @param {Function} getter - The getter function for the computed property.
   * @param {Function} [setter] - The optional setter function for the computed property.
   */
  constructor(cp, name, getter, setter) {
    // Check if cp is an instance of HTMLElement.
    bbn.fn.checkType(cp, HTMLElement);
    this.#component = cp;
    // Check if name is a string.
    bbn.fn.checkType(name, String);
    if (cp.$isPropNative(name)) {
      if (cp.tagName === 'BBN-ANON') {
        bbn.fn.log(cp);
      }

      throw new Error(`The computed ${name} is already defined in the HTML prototype of the component ${cp.tagName}`);
    }

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
   * @returns {*} The current state.
   */
  get isChanged() {
    return this.#changed;
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
  computedUpdate(force = false) {
    // If the component is destroyed, return.
    if (this.#component.$isDestroyed) {
      return;
    }

    // If not forced and the computed property has been updated more recently than the component, return.
    if (!force && (this.#num > this.#component.$numBuild)) {
      return;
    }

    let forceUpdate = false;
    //bbn.fn.log("UPDATNG COMPUTED " + this.#name + ' ' + this.#component.$cid);

    // Start watching the process before executing the getter.
    bbnData.startWatching();
    // Get the new value using the getter.
    let v = this.#getter();
    // Stop watching the process, and gets the array of all data used to get the value
    const deps = bbnData.stopWatching();

    // Only if the new value is different
    // Adding this in the dependencies of each elements from the watching sequence
    let hasChanged = false;
    if (this.#val !== v) {
      // Taking care of data (object or array)
      if (!bbn.fn.isPrimitive(v)) {
        if (![undefined, Object, Array].includes(v.constructor)) {
          //bbn.fn.log("INSIDE " + this.#name)
          if (this.#data) {
            this.#data.removeComponent(this.#component, this.#name);
            this.#data = false;
          }
        }
        // Case where the result has not been treated and a data object already exists
        else if (this.#data && (this.#data.root?.component === this.#component) && (this.#data.root?.path === this.#name) && !v.__bbnData) {
          const o = bbnData.recognize(v, this.#val, this.#component, this.#name);
          v = o.value;
          hasChanged = o.changed;
          if (v?.__bbnData && (v.__bbnData !== this.#data)) {
            this.#data = v.__bbnData;
          }
        }
        // Case where the result is already treated (by another property and/or another component)
        else if ((v.__bbnData?.root?.component === this.#component) && (v.__bbnData?.root?.path === this.#name)){
          const data = v.__bbnData;
          if (data !== this.#data) {
            // Existing different data object
            if (this.#data) {
              // Remove the old data object from the component.
              this.#data.removeComponent(this.#component, this.#name);
              this.#data = false;
            }

            // Retrieve the new data object.
            if (data) {
              this.#data = data;
              // Add the new data object to the component.
              data.addComponent(this.#component, this.#name);
              hasChanged = true;
            }
          }

        }
        else {
          if (this.#data) {
            // Remove the old data object from the component.
            this.#data.removeComponent(this.#component, this.#name);
            this.#data = false;
          }

          // Treat the value and get the data object.
          v = this.#component.$treatValue(v, this.#name);
          this.#data = bbnData.getObject(v);
          hasChanged = true;
        }
      }

      if (hasChanged || (this.#val !== v)) {
        // Taking care of dependencies only if the result has changed
        /*
        let prev = false;
        for (let i = 0; i < deps.length; i++) {
          const a = deps[i];
          if (a.data instanceof bbnData) {
            if (!a.data.targetData) {
              continue;
            }

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
            if (!a.data.deps.__bbnRoot.includes(this)) {
              a.data.deps.__bbnRoot.push(this);
            }
          }
          else if (a.component && a.name && a.component.$namespaces[a.name] && ((a.component !== this.#component) || (a.name !== this.#name))) {
            if (!a.component.$deps[a.name]) {
              a.component.$deps[a.name] = [];
            }
    
            if (!a.component.$deps[a.name].includes(this)) {
              a.component.$deps[a.name].push(this); // Add this computed property to the component's dependencies.
            }
          }
    
          prev = a;
        }*/

        this.#changed = true;
        //bbn.fn.log(["UPDATING COMPUTED " + this.#name + " ON " + this.#component.$options.name, bbn.fn.diffObj(this.#val, v)]);
        if (this.#num) {
          // Update the component with the new value.
          this.#updateComponent(v, forceUpdate || hasChanged);
        }
        else {
          this.#val = v;
        }
      }
      else {
        this.#changed = false;
      }
    }
    else {
      this.#changed = false;
    }

    let prev = false;
    for (let i = 0; i < deps.length; i++) {
      const a = deps[i];
      if (a.data instanceof bbnData) {
        if (!a.data.value) {
          continue;
        }

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
        if (!a.data.deps.__bbnRoot.includes(this)) {
          a.data.deps.__bbnRoot.push(this);
        }
      }
      else if (a.component && a.name && a.component.$namespaces[a.name] && ((a.component !== this.#component) || (a.name !== this.#name))) {
        if (!a.component.$deps[a.name]) {
          a.component.$deps[a.name] = [];
        }

        if (!a.component.$deps[a.name].includes(this)) {
          a.component.$deps[a.name].push(this); // Add this computed property to the component's dependencies.
        }
      }

      prev = a;
    }

    // Update the build number.
    this.#num = this.#component.$numBuild + 1;
    //bbn.fn.log("FINISHED UPDATNG COMPUTED " + this.#name + ' ' + this.#component.$cid);
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
        if (!_t.num) {
          // Update the computed property's value.
          _t.computedUpdate();
          // Initialize the watcher for the computed property.
          updateWatcher(this, name, true);
        }
        else if (bbn.cp.queue.includes(_t)) {
          let idx = bbn.cp.queue.indexOf(_t);
          bbn.cp.queue.splice(idx, 1);
          _t.computedUpdate(true);
        }


        //if (!this.$computed[name].val?.__bbnData) {
          // Add the computed property to the sequence.
          bbnData.addSequence(this, name);
        //}

        // Return the value of the computed property.
        return _t.val;
      }
    };
    /* Maybe a setter */
    if (setter) {
      def.set = function (v) {
        const res = setter(v);
        _t.computedUpdate();
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

  setData(data) {
    if (!data) {
      this.#data = false;
    }

    if (data instanceof bbnData) {
      this.#data = data;
    }
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
    let go = this.#changed;

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
