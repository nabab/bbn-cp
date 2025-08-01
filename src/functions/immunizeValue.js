export default function immunizeValue(value, deep) {
  if (value && (typeof value === 'object') && [undefined, Object, Array].includes(value.constructor)) {
    // Removing data object if any
    if (value.__bbnData) {
      const dataObj = value.__bbnData;
      if (dataObj) {
        dataObj.unset();
      }
    }

    // Adding the special property
    Object.defineProperty(value, '__bbnNoData', {
      value: true,
      enumerable: false,
      configurable: false,
      writable: false
    });

    if (deep) {
      bbn.fn.iterate(value, (v, i) => {
        try {
          value[i] = immunizeValue(v, true);
        }
        catch (e) {
          bbn.fn.warning("ERROR IN IMMUNIZE");
          bbn.fn.log(e);
        }
      });
    }
  }
    

  return value;
}