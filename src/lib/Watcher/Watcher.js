import bbn from "@bbn/bbn";
import bbnCp from "../Cp/Cp.js";

/**
 * Class representing a computed property watcher.
 * This class is responsible for monitoring changes in a computed property 
 * and triggering corresponding handlers when updates occur.
 */
export default class bbnWatcher {
  // Stores the previous value of the computed property
  #old;
  
  // Stores the current value of the computed property
  #val;
  
  // Reference to the component owning the computed property
  #component;
  
  // Name of the computed property being watched
  #name;
  
  // Array of handlers associated with the computed property
  #handlers;
  
  // Counter to keep track of handler executions
  #num = 0;
  
  // Timestamp of the last update
  #lastUpdate = 0;

  /**
   * Sets up a watcher for a computed property and adds a handler.
   * 
   * @param {Object} cp - The component to which the computed property belongs.
   * @param {string} name - The name of the computed property.
   * @param {Function} handler - The function to be executed when the computed property changes.
   * @param {Object} options - Optional settings for the handler.
   * @returns {Function} A function to remove the handler.
   * @static
   */
  static setUp(cp, name, handler, options) {
    // Validates the types of input arguments
    bbn.fn.checkType(cp, bbnCp);
    bbn.fn.checkType(name, String);
    bbn.fn.checkType(handler, Function);

    // Creates a new watcher instance if it doesn't exist
    if (!cp.$watcher?.[name]) {
      cp.$watcher[name] = new bbnWatcher(cp, name);
    }

    // Adds the handler to the watcher
    return cp.$watcher[name].addHandler(handler, options);
  }

  /**
   * Creates an instance of bbnComputed.
   * 
   * @param {Object} cp - The component to which the computed property belongs.
   * @param {string} name - The name of the computed property.
   * @param {Function} handler - The getter function for the computed property.
   * @param {Function} [setter] - The optional setter function for the computed property.
   */
  constructor(cp, name) {
    // Validates the types of input arguments
    bbn.fn.checkType(cp, bbnCp);
    bbn.fn.checkType(name, String);

    // Assigns component and property name
    this.#component = cp;
    this.#name = name;
    
    // Initializes the handlers array
    this.#handlers = [];
  }

  get name() {
    return this.#name;
  }

  get num() {
    return this.#num;
  }

  get lastUpdate() {
    return this.#lastUpdate;
  }

  /**
   * Removes a handler from the list of handlers.
   * 
   * @param {string} uid - Unique identifier of the handler to remove.
   */
  removeHandler(uid) {
    // Finds the index of the handler by its unique identifier
    const idx = bbn.fn.search(this.#handlers, { uid });

    // Removes the handler if found
    if (idx > -1) {
      this.#handlers.splice(idx, 1);
    }
  }

  /**
   * Adds a new handler to the list of handlers.
   * 
   * @param {Function} handler - The handler function to be added.
   * @param {Object} options - Optional settings for the handler.
   * @returns {Function} A function to remove the handler.
   */
  addHandler(handler, options) {
    // Validates the handler type
    bbn.fn.checkType(handler, Function);

    // Checks for an existing handler with the same function
    let uid = bbn.fn.getField(this.#handlers, 'uid', { fn: handler });

    // If no existing handler is found, create a new one
    if (!uid) {
      uid = bbn.fn.randomString();
      this.#handlers.push({
        fn: handler,
        immediate: options?.immediate || false,
        deep: options?.deep || false,
        uid,
        isInit: false
      });

      // Triggers an immediate update if needed
      this.watcherUpdate(true);
    }

    // Returns a function to remove the added handler
    return () => this.removeHandler(uid);
  }

  /**
   * Updates the value of the computed property and executes handlers as needed.
   * 
   * @param {boolean} init - Indicates whether this is an initial update.
   * @param {number} level - The depth level of the update (used for deep watchers).
   */
  async watcherUpdate(init, level) {
    const last = bbn.cp.numTicks;
    // Retrieves the component reference
    const cp = this.#component;

    // Stores the previous value
    this.#old = this.#val;

    // Updates the current value of the computed property
    this.#val = bbn.fn.getProperty(cp, this.#name);

    // Retrieves data object of the current value
    const dataObj = bbnData.getObject(this.#val);

    // Logs for debugging purposes (commented out)
    // bbn.fn.log(["UPDATE WATCHER", this.#component.$options.name, this.#name, this.#val, init, level, dataObj?.lastUpdate, this.#lastUpdate]);

    // Checks if the value has changed or if the last update is newer
    if ((this.#old !== this.#val) || (dataObj?.lastUpdate > this.#lastUpdate)) {
      for (let i = 0; i < this.#handlers.length; i++) {
        const a = this.#handlers[i];
        
        // Determines if the handler should be executed
        if (cp.$isMounted && (init && a.immediate && !a.isInit) || (!init && cp.$numBuild && ((level < 2) || a.deep))) {
          a.isInit = true;

          // Executes the handler function with the new and old values
          await a.fn.apply(cp, [this.#val, this.#old]);
          this.#num++;

          // Logs for debugging purposes (commented out)
          // bbn.fn.log(["EXECUTE WATCHER ON " +  this.#name + " IN " + this.#component.$options.name, init, level]);
        }
      }
    }

    // Updates the lastUpdate timestamp
    this.#lastUpdate = last;
  }
}
