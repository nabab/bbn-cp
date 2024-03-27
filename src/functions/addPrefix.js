import {bbn} from "@bbn/bbn";

/**
 * Adds a prefix to the list of known prefixes for component names.
 * Each prefix can have an associated handler function and an array of mixins.
 *
 * Handles component prefixes within the framework. 
 * It allows the registration of prefixes along with associated handlers and mixins. 
 * The sorting by prefix length ensures that when resolving component names, 
 * the most specific prefix is considered first, which is important for accurately 
 * identifying components and applying the correct behavior and mixins.
 * 
 * Considerations:
 * - Error Handling: Ensure robust error handling, especially if the prefix or handler does not meet the expected criteria.
 * - Performance: Consider the impact of repeatedly sorting the knownPrefixes array, especially if addPrefix is called frequently.
 * - Namespace Pollution: Be cautious of potential namespace pollution or conflicts, especially in a large application with many prefixes.
 * - Mixins Integration: If mixins are a core part of the framework, ensure their integration with prefixes is seamless and well-documented.
 * 
 * @param {string} prefix - The prefix to be added.
 * @param {Function} [handler] - Optional handler function associated with the prefix.
 * @param {Array} [mixins] - Optional array of mixins to be used with the prefix.
 */
export default function addPrefix(prefix, handler, mixins){
// Ensure the prefix is a string.
  bbn.fn.checkType(prefix, String, bbn._("Prefix must be a string"));

  // If a handler is provided, ensure it's a function.
  if (handler) {
    bbn.fn.checkType(handler, Function, bbn._("The addPrefix handler must be a function"));
  }

  // Ensure the prefix ends with a hyphen for standardization.
  if (!prefix.endsWith('-')) {
    prefix += '-';
  }

  // Push the new prefix along with its handler and mixins into the known prefixes array.
  bbn.cp.knownPrefixes.push({
    prefix,
    handler,
    mixins: mixins || []
  });
  
  // Sort the known prefixes array by length in descending order.
  // This ensures that the most specific (longest) prefix is matched first.
  bbn.cp.knownPrefixes.sort((a, b) => {
    return b.prefix.length - a.prefix.length;
  });
}
