import updateWatcher from "./updateWatcher.js";
/**
 * Updates a property of a component with a new value, managing data binding and event emission.
 * 
 * @param {bbnCp} cp - The component instance on which the property will be set.
 * @param {String} name - The name of the property to be set. It will be converted to camelCase if not already.
 * @param {any} value - The new value to be set for the property.
 */
export default function realSetProp(cp, name, value) {
  // Convert the property name to camelCase if it's not already.
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  // Retrieve the original value of the property.
  const original = cp.$props[name];

  // Get data objects associated with the original and new values.
  const oldObj = bbnData.getObject(original);
  const newObj = bbnData.getObject(value);

  // Flag to determine if further actions are needed.
  let todo = true;

  // If the original value is a data object.
  if (oldObj) {
    // If the new value is also a data object.
    if (newObj) {
      // If they are different objects.
      if (newObj !== oldObj) {
        // If the old object is associated with the component, remove the association.
        if (oldObj.hasComponent(cp, name)) {
          oldObj.removeComponent(cp, name);
        }

        // Add the new object's association with the component.
        newObj.addComponent(cp, name);
      }
    }
    else {
      // If the new value is not a data object, remove the old object's association.
      if (oldObj.hasComponent(cp, name)) {
        oldObj.removeComponent(cp, name);
      }

      // Treat the new value (possibly for reactivity or formatting).
      value = cp.$treatValue(value, name);
    }
  }
  // If the new value is a data object and different from the old value.
  else if (newObj) {
    newObj.addComponent(cp, name);
  }
  // If the new value is truthy and not a data object, treat it.
  else if (value) {
    value = cp.$treatValue(value, name);
  }

  // If the original value is different from the new value, update the property.
  if (original !== value) {
    Object.defineProperty(cp.$props, name, {
      value: value,
      writable: false,
      configurable: true
    });

    // Update any watchers that might be observing this property.
    updateWatcher(cp, name, value);
  }

  // If the component is already mounted, emit a 'propchange' event.
  if (cp.$isMounted) {
    cp.$emit('propchange', name, value, original);
  }
}
