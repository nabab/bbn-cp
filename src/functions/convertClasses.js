/**
 * Converts a variety of class name formats into a single string of class names.
 * 
 * It is designed to process and combine class names provided in various formats 
 * (strings, objects, arrays) into a single string. 
 * This utility is particularly useful in scenarios where class names are dynamically 
 * determined and may come from different sources or formats. The function ensures 
 * that the resulting string contains unique, non-empty class names suitable for 
 * use in an HTML element's class attribute.
 * 
 * Considerations:
 * - Performance: Ensure that the function performs efficiently, especially when handling large arrays or deeply nested structures.
 * - Error Messages: Provide clear error messages to help developers quickly understand and fix issues.
 * - Input Validation: Robust input validation is essential to handle edge cases and prevent potential errors.
 * - Recursion: The recursive handling of arrays is a powerful feature, but ensure that it's well-tested to handle complex cases without leading to performance issues.
 * 
 * @param {...(string|Object|Array)} args - Class names in various formats (string, object, array).
 * @returns {string} A single string containing all class names.
 */
export default function convertClasses(...args) {
  let arr = [];

  // Iterate over each argument provided to the function.
  for (let i = 0; i < args.length; i++) {
    let css = args[i];
    if (!css) {
      continue;
    }

    // Handle string format: split class names by space and add to array.
    if (bbn.fn.isString(css)) {
      arr.push(...css.split(' '));
    }
    // Handle object format: add keys as class names if their values are truthy.
    else if (bbn.fn.isObject(css)) {
      for (let n in css) {
        if (css[n]) {
          arr.push(n);
        }
      }
    }
    // Handle array format: recursively process each item in the array.
    else if (bbn.fn.isArray(css)) {
      bbn.fn.each(css, cs => arr.push(...convertClasses(cs).split(' ')));
    }
    // If the format is not recognized, log the value and throw an error.
    else {
      bbn.fn.log(css);
      throw Error(bbn._("Can't understand classes"));
    }
  }

  // Remove duplicate and empty class names, then join them into a single string.
  return bbn.fn.removeEmpty(bbn.fn.unique(arr)).join(' ');
}
