import {bbn} from "@bbn/bbn";

/**
 * Dynamically fetches and defines UI components based on provided component names.
 * Components are grouped and fetched according to known prefixes.
 *
 * @param {Array<string>} toDefine - Array of component names to fetch and define.
 * @returns {Object} Defined components keyed by their names.
 */
export default async function fetchComponent(tag) {
  bbn.fn.checkType(tag, String, bbn._("fetchComponent requires an array of component names"));

  if (!tag.length) {
    throw new Error(bbn._("No components to fetch"));
  }

  //bbn.fn.log("FETCHING COMPONENT " + tag);
  const definedComponents = {};

  // Group component names by their matching known prefix
  bbn.fn.checkType(tag, String);

  let handler = null;
  let mixins = [];

  // Find the longest matching prefix and its handler
  bbn.fn.each(bbn.cp.knownPrefixes, prefixRule => {
    if (prefixRule.prefix && tag.startsWith(prefixRule.prefix)) {
      if (!handler) {
        handler = prefixRule.handler;
      }

      if (prefixRule.mixins) {
        mixins.unshift(...prefixRule.mixins);
      }
    }
  });

  if (!handler) {
    throw new Error(bbn._("No handler found for component '%s'", tag));
  }

  const res = await handler(tag);

  // Process fetched component definitions
  res.components.forEach(comp => {
    if (!comp.definition || !comp.name) {
      throw new Error(bbn._("Incomplete definition for component '%s'", comp.name || 'unknown'));
    }

    // Translate if language pack provided
    if (comp.lang) {
      bbn.fn.translate(comp.lang);
    }

    // Include group's mixins in component definition
    comp.definition.mixins = comp.definition.mixins || [];
    mixins.forEach(mixin => {
      if (!comp.definition.mixins.includes(mixin)) {
        comp.definition.mixins.push(mixin);
      }
    });

    // Define component
    definedComponents[comp.name] = bbn.cp.define(comp.name, comp.definition, comp.template, comp.css);
  });

  return definedComponents;
}
