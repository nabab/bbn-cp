import treatArgument from "./treatArgument.js";
import setInternalResult from "./setInternalResult.js";

/**
 * A shorthand function for setting internal results in the context of a web component.
 * It processes the provided attribute object, evaluates its arguments, and sets the result
 * using the component's $_setInternalResult method.
 * 
 * @param {bbnCp} cp - The context provider (component instance) containing methods and properties for state management.
 * @param {Object} attr - The attribute object containing the id, function (fn), and arguments (args) to be processed.
 * @param {string} hash - A unique identifier used in conjunction with cp for state management.
 * @param {Object} data - Additional data that might be required for processing the arguments.
 * @returns {*} The result of the processed function call, stored internally in the component's state.
 */
export default function sr(cp, attr, hash, data) {
  // Call $_setInternalResult with the processed result of the attribute's function.
  return setInternalResult(
    cp, 
    attr.id,
    // Bind the function to the context provider and evaluate it with processed arguments.
    attr.fn.bind(cp)(...attr.args.map(a => {
      let r;
      try {
        // Process each argument using treatArgument.
        r = treatArgument(cp, a, hash, data);
      }
      catch(e) {
        // Log and rethrow any errors encountered during argument processing.
        bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, cp, hash, attr, data]);
        throw e;
      }
      return r; // Return the processed argument.
    })),
    hash // Pass the hash for internal state management.
  );
}
