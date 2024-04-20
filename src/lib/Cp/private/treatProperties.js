import setExpResult from "./setExpResult.js";
import getExpState from "./getExpState.js";
import bbn from "@bbn/bbn";

/**
 * Processes and resolves properties for a given node in the context of a web component.
 * It handles dynamic expressions, bindings, and special cases like 'class' and 'style' attributes.
 * 
 * @param {Object} cp - The context provider (component instance) containing methods and properties.
 * @param {Object} props - Object to store processed properties.
 * @param {string} id - The identifier of the node whose properties are being processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {Object} data - Additional data that might be required for processing the properties.
 * @param {boolean} [go=false] - A flag indicating whether the element needs to be updated.
 * @returns {Object} An object containing the flag 'go' and the processed properties 'props'.
 */
export default function treatProperties(cp, node, hash, data, go = false) {
  if (!node.props) {
    node.props = bbn.fn.createObject();
  }

  const props = node.props; // Initialize the properties object for the node.

  // Process the node's attributes if any are defined.
  if (bbn.fn.numProperties(node.attr)) {
    let bindValue;

    // Handle 'bbn-bind' attribute which allows binding multiple attributes.
    if (node.attr['bbn-bind']) {
      const attr = node.attr['bbn-bind'];
      bindValue = setExpResult(cp, attr, hash, data); // Resolve the binding value.

      // Check if the binding's internal state is not 'OK', indicating an update is needed.
      if (getExpState(cp, attr.hash, hash) !== 'OK') {
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
        let attrValue = setExpResult(cp, attr, hash, data); // Resolve the attribute value.
        if (attrValue !== props[n]) {
          props[n] = attrValue; // Assign the resolved value to the properties object.
        }

        // Check if the attribute's internal state is not 'OK', indicating an update is needed.
        if (getExpState(cp, attr.hash, hash) !== 'OK') {
          go = true;
        }
      }
      else if (props[n] !== attr.value) {
        // Directly assign static attribute values.
        props[n] = attr.value;
      }
    }

    // If 'bbn-bind' is used, extend the properties with the resolved binding value.
    if (bindValue) {
      bbn.fn.iterate(bindValue, (v, p) => {
        if (!Object.hasOwn(node.attr, p) && (props[p] !== v)) {
          props[p] = v;
        }
      });
    }

    // Special handling for 'class' attribute to merge classes properly.
    if (Object.hasOwn(props, 'class')) {
      const v = bbn.cp.convertClasses(
        bindValue?.['class'] && (props['class'] !== bindValue['class']) ? 
            [bindValue['class'], props['class']]
            : props['class']
      );
      if (v !== props['class']) {
        props['class'] = v;
      }
    }

    // Special handling for 'style' attribute to merge styles properly.
    if (Object.hasOwn(props, 'style')) {
      const v = bbn.cp.convertStyles(
        bindValue?.style && props.style !== bindValue.style ? 
            [bindValue.style, props.style]
            : props.style
      );
      if (v !== props.style) {
        props.style = v;
      }
    }
  }

  if (node.model) {
    bbn.fn.iterate(node.model, (m, name) => {
      props[name] = setExpResult(cp, m, hash, data);
      if (!go && (getExpState(cp, m.hash, hash) !== "OK")) {
        go = true;
      }
    });
  }

  if (bbn.fn.numProperties(node.directives)) {
    for (let n in node.directives) {
      if (node.directives[n].exp) {
        setExpResult(cp, node.directives[n], hash, data);
        if (!go && (getExpState(cp, node.directives[n].hash, hash, data) !== "OK")) {
          go = true;
        }
      }
    }
  }

  // Return the flag indicating if an update is needed and the processed properties.
  return go;
}
