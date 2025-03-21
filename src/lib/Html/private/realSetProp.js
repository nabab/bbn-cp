import updateWatcher from "./updateWatcher.js";
import propagateDependencyChanges from "./propagateDependencyChanges.js";
/**
 * Updates a property of a component with a new value, managing data binding and event emission.
 * 
 * @param {HTMLElement} cp - The component instance on which the property will be set.
 * @param {String} name - The name of the property to be set. It will be converted to camelCase if not already.
 * @param {any} value - The new value to be set for the property.
 */
export default function realSetProp(cp, name, value) {
  // Convert the property name to camelCase if it's not already.
  if (!/[A-Z]/.test(name)) {
    name = bbn.fn.camelize(name);
  }

  // Retrieve the original value of the property.
  const original = cp.$propsCfg[name].value;

  // Get data objects associated with the original and new values.
  const oldObj = bbnData.getObject(original);
  value = cp.$treatValue(value, name);
  const newObj = bbnData.getObject(value);

  // If the original value is a data object.
  if (oldObj && (newObj !== oldObj)) {
    // If the old object is associated with the component, remove the association.
    if (oldObj.hasComponent(cp, name)) {
      oldObj.removeComponent(cp, name);
    }
  }

  // If the original value is different from the new value, update the property.
  if (original !== value) {
    cp.$propsCfg[name].value = value;
    // Update any watchers that might be observing this property.
    propagateDependencyChanges(cp, name);
    updateWatcher(cp, name);
  }

  // If the component is already mounted, emit a 'propchange' event.
  if (cp.$isMounted) {
    cp.$emit('propchange', name, value, original);
  }
}
