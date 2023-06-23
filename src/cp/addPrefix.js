(() => {
  bbn.fn.autoExtend('cp', {
    /**
     * @method addPrefix
     * @memberof bbn.cp
     * @param {String} prefix 
     * @param {Function} handler
     * @param {Array} mixins
     */
    addPrefix(prefix, handler, mixins){
      bbn.fn.checkType(prefix, String, bbn._("Prefix must be a string"));
      if (handler) {
        bbn.fn.checkType(handler, Function, bbn._("The addPrefix handler must be a function"));
      }

      if (bbn.fn.substr(prefix, -1) !== '-') {
        prefix += '-';
      }

      //bbn.fn.log("ADD PREFIX", prefix, mixins);

      bbn.cp.knownPrefixes.push({
        prefix: prefix,
        handler: handler,
        mixins: mixins || []
      });
      // Ordering by length descending so going from more precise to less
      bbn.cp.knownPrefixes.sort((a, b) => {
        if (a.prefix.length > b.prefix.length) {
          return -1;
        }

        if (a.prefix.length < b.prefix.length) {
          return 1;
        }
        // a must be equal to b
        return 0;
      })
    }
  })
})();
