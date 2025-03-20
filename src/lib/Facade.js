// Class representing a data facade that interacts with a node's data and allows access to it through proxy methods.
export default class bbnFacade {
  __bbn_node; // The node associated with this data facade.
  __bbn_data; // The data object stored in this facade.
  __bbn_keys; // The keys of the data object.
  __bbn_deps;

  // Constructor initializing the node and data. Optionally accepts data and initializes keys.
  constructor(node, data) {
    this.__bbn_node = node; // Assign the node to the class instance.
     // Initialize data object.
    this.__bbn_deps = bbn.fn.createObject(); // Initialize dependencies object.

    // If data is provided, assign it and set the keys from the data object.
    if (data && !(data instanceof bbnFacade)) {
      this.__bbn_data = data;
      this.__bbn_keys = Object.keys(data);
    }
    else {
      // If no data, initialize an empty keys array.
      this.__bbn_data = bbn.fn.createObject();
      this.__bbn_keys = [];
    }

    // Return a Proxy to intercept get, set, and has operations on this instance.
    return new Proxy(this, {
      // Intercept get operations and call the `get` method.
      get(target, key) {
        return target.get(key);
      },
      // Intercept set operations and call the `set` method.
      set(target, key, value) {
        target.set(key, value);
        return true;
      },
      // Intercept has operations and call the `has` method.
      has(target, key) {
        return target.has(key);
      }
    });
  }

  // Retrieves the value for the given key, checking the node's data and its parents.
  get(key) {
    // If the key is a private class key, return its corresponding value directly.
    if (key.indexOf('__bbn_') === 0) {
      return this[key];
    }

    // Start from the current node and traverse up through parent nodes.
    let node = this.__bbn_node;
    while (node) {
      // If node has data and the key exists in its data, return the value.
      if (node.hasData && (node.data.__bbn_keys.indexOf(key) > -1)) {
        const dataObj = bbnData.getObject(node.data.__bbn_data[key]);

        // If the value is a data object, add it to the sequence for the component.
        if (dataObj) {
          bbnData.addSequence(node.component, '', dataObj);
        }

        if (node.loopIndex?.exp === key) {
          if (bbnData.currentWatchers.length) {
            if (!node.data.__bbn_deps[key]) {
              node.data.__bbn_deps[key] = [];
            }
    
            if (!node.data.__bbn_deps[key].includes(bbnData.currentWatchers[0])) {
              node.data.__bbn_deps[key].push(bbnData.currentWatchers[0]);
            }
          }
        }
    
        return node.data.__bbn_data[key];
      }

      // Move to the parent node.
      node = node.parent;
    }

    // If key is not found, return undefined.
    return undefined;
  }

  // Sets the value for the given key, updating the value in the current node and its parents.
  set(key, value) {
    let node = this.__bbn_node;
    let firstData; // To store the first data object encountered while traversing parent nodes.
    while (node) {
      // If this is the first node with data, store its data object.
      if (!firstData && node.hasData) {
        firstData = node.data.__bbn_data;
      }

      // If the node has data and the key exists, update the value.
      if (node.hasData && (node.data.__bbn_keys.indexOf(key) > -1)) {
        node.data.__bbn_data[key] = value;
        if (node.data.__bbn_deps[key]) {
          node.data.__bbn_deps[key].forEach(a => a.attrUpdate());
        }

        break;
      }

      // Move to the parent node.
      node = node.parent;
    }

    // If a data object was found in the ancestors, update its value.
    if (firstData) {
      firstData[key] = value;
    }
  }

  // Checks if the given key exists in the current data or in any parent nodes.
  has(key) {
    // If the key is in the current data, return true.
    if (this.__bbn_keys.indexOf(key) > -1) {
      return true;
    }

    // Start from the parent node and traverse up through the parent nodes.
    let node = this.__bbn_node.parent;
    while (node) {
      // If the node has data and contains the key, return true.
      if (node.hasData && (key in node.data)) {
        return true;
      }

      // Move to the parent node.
      node = node.parent;
    }

    // If key is not found, return false.
    return false;
  }
}
