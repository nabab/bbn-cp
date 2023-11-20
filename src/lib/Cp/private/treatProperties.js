import bbn from "@bbn/bbn";
import sr from "./sr.js";
import getInternalState from "./getInternalState.js";

/**
 * Processes and resolves properties for a given node in the context of a web component.
 * It handles dynamic expressions, bindings, and special cases like 'class' and 'style' attributes.
 * 
 * @param {Object} cp - The context provider (component instance) containing methods and properties.
 * @param {string} id - The identifier of the node whose properties are being processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {Object} data - Additional data that might be required for processing the properties.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {Object} An object containing the flag 'go' and the processed properties 'props'.
 */
export default function treatProperties(cp, id, hash, data, go = false) {
  const props = bbn.fn.createObject(); // Object to store processed properties.
  const node = cp.$currentMap[id]; // Retrieve the node from the component's current map.

  // Process the node's attributes if any are defined.
  if (bbn.fn.numProperties(node.attr)) {
    let bindValue;

    // Handle 'bbn-bind' attribute which allows binding multiple attributes.
    if (node.attr['bbn-bind']) {
      const attr = node.attr['bbn-bind'];
      bindValue = sr(cp, attr, hash, data); // Resolve the binding value.

      // Check if the binding's internal state is not 'OK', indicating an update is needed.
      if (getInternalState(cp, attr.id, hash) !== 'OK') {
        go = true;
      }
    }

    // Iterate over each attribute of the node.
    for (let n in node.attr) {
      // Skip specific attributes that are handled separately.
      if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
        continue;
      }

      const attr = node.attr[n];
      // Process attributes with expressions.
      if (attr.exp) {
        let attrValue = sr(cp, attr, hash, data); // Resolve the attribute value.
        if (attrValue !== undefined) {
          props[n] = attrValue; // Assign the resolved value to the properties object.
        }

        // Check if the attribute's internal state is not 'OK', indicating an update is needed.
        if (getInternalState(cp, attr.id, hash) !== 'OK') {
          go = true;
        }
      }
      else {
        // Directly assign static attribute values.
        props[n] = attr.value;
      }
    }

    // If 'bbn-bind' is used, extend the properties with the resolved binding value.
    if (bindValue) {
      bbn.fn.extendOut(props, bindValue);
    }

    // Special handling for 'class' attribute to merge classes properly.
    if (Object.hasOwn(props, 'class')) {
      props.class = bbn.cp.convertClasses(
        bindValue?.['class'] && props['class'] !== bindValue['class'] ? 
            [bindValue['class'], props['class']]
            : props['class']
      );
    }

    // Special handling for 'style' attribute to merge styles properly.
    if (Object.hasOwn(props, 'style')) {
      props.style = bbn.cp.convertStyles(
        bindValue?.style && props.style !== bindValue.style ? 
            [bindValue.style, props.style]
            : props.style
      );
    }
  }

  if (node.model) {
    bbn.fn.iterate(node.model, (m, name) => {
      props[name] = sr(cp, m, hash, data);
      if (!go && (getInternalState(cp, m.id, hash) !== "OK")) {
        go = true;
      }
    });
  }


  // Return the flag indicating if an update is needed and the processed properties.
  return {go, props};
}
