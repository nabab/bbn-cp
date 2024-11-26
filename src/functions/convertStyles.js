const treatStyleArguments = function (...args) {
  const final = bbn.fn.createObject();
  bbn.fn.each(args, arg => {
    if (bbn.fn.isArray(arg)) {
      bbn.fn.extend(final, treatStyleArguments(...arg));
    }
    else if (bbn.fn.isObject(arg) && bbn.fn.numProperties(arg)) {
      bbn.fn.extend(final, arg);
    }
    else if (bbn.fn.isString(arg)) {
      let arr = arg.split(';').map(a => a.trim().split(':').map(b => b.trim()));
      let css = bbn.fn.createObject();
      bbn.fn.each(arr, a => {
        if (a[0] && (a[1] !== undefined) && (a[1] !== '')) {
          css[bbn.fn.camelize(a[0])] = a[1];
        }
      });
      bbn.fn.extend(final, css);
    }
  });

  return final;
};

/**
 * Converts a variety of style formats into a single string for the 'style' attribute in HTML.
 * 
 * Considerations:
 * - Robustness and Flexibility: The functions handle a variety of input formats, making them versatile for different use cases.
 * - Performance: Ensure efficient handling, especially when processing large or complex style objects.
 * - Error Handling: Clear error messages and thorough validation can help developers quickly identify and fix issues.
 * - Documentation: Detailed documentation explaining the expected input formats and examples will be beneficial for developers using these functions.
 * - Consistency in Naming Conventions: The use of camelization for CSS property names ensures consistency but might require clear documentation, as it deviates from the standard CSS property naming convention.
 * 
 * @param {...(string|Object|Array)} args - Style properties in various formats.
 * @returns {string} A single string containing all style properties.
 */
export default function convertStyles(...args) {
  let st = '';
  // Treat the given arguments to consolidate them into a single object of style properties.
  const css = treatStyleArguments(...args);

  // Check if the consolidated styles object is valid.
  if (bbn.fn.isObject(css)) {
    // Iterate over each style property in the object.
    for (let n in css) {
      let prop = bbn.fn.camelToCss(n);  // Convert camelCase names to kebab-case for CSS.
      let value = css[n];

      // Process and append each style property and its value to the resulting string.
      if (![undefined, null, false, ''].includes(value)) {
        // Add 'px' to numeric values for certain properties.
        if (bbn.fn.isNumber(css[n]) && bbn.fn.isPropSize(prop)) {
          value = css[n] + 'px';
        }
        // Convert non-string values to string.
        else if (!bbn.fn.isString(value) && value.toString) {
          value = value.toString();
        }

        // Append the property and its value to the style string.
        st += ` ${prop}: ${value};`;
      }
    }
  }
  else if (css) {
    // If the styles object is not valid, log the object for debugging and throw an error.
    bbn.fn.log("convertStyles", css);
    throw new Error(bbn._("Can't understand style"));
  }

  // Return the consolidated style string.
  return st;
}
