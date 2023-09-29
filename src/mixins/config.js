(bbn => {
  "use strict";
    /**
     * Close component.
     * @component close
     */
  Object.defineProperty(bbn.cp.mixins, 'config', {
    configurable: false,
    writable: false,
    value: {
      statics(iface) {
        if (!iface.config || !iface.config.name || !iface.config.props || !iface.config.data) {
          throw new Error(bbn._("The component must have a configName and a configSource returned by its interface function"));
        }

        bbn.cp.define(iface.config.name, {props: iface.config.props}, '', iface.config.name + ' { display: none; }');
        return iface;
      },
      beforeCreate() {
        if (this.$slots.default) {
          bbn.fn.each(this.$slots.default, a => {
            if ((a.tagName === this.constructor.config.name.toUpperCase()) && a.bbnSchema) {
              this[this.constructor.config.data].push(a.bbnSchema.props);
            }
          });
        }
      }
    }
  });
})(bbn);

