export default {
  props: {
    /**
     * Shows the footer's arrows as buttons
     * @prop {Boolean} [true] footerButtons
     */
    footerButtons: {
      type: Boolean,
      default() {
        return !bbn.fn.isMobile() || bbn.fn.isTabletDevice();
      }
    },
    /**
     * The way `buttons` should be displayed, either as buttons, dropdown or as a menu.
     * @prop {String} ['buttons'] buttonMode
     */
    buttonMode: {
      type: String,
      default: 'buttons',
      validator(v) {
        return ['buttons', 'dropdown', 'menu'].includes(v);
      }
    },
    /**
     * The name of the `record` word as used in the pager interface.
     * @prop {String} ['nf nf-md-dots_vertical'] buttonIcon
     */
    buttonIcon: {
      type: String,
      default: 'nf nf-md-dots_vertical'
    },
  },
  data() {
    return {
      /**
       * @data {Boolean} [false] colButtons
       */
      colButtons: false,
    };
  },
  computed: {
    realButtons() {
      if (this.cols.length && this.cols[this.colButtons] && this.cols[this.colButtons].buttons) {
        if (bbn.fn.isFunction(this.cols[this.colButtons].buttons)) {
          return this.cols[this.colButtons].buttons.bind(this.$origin);
        }
        else if (bbn.fn.isArray(this.cols[this.colButtons].buttons)) {
          let res = [];
          bbn.fn.each(this.cols[this.colButtons].buttons, a => {
            if (bbn.fn.isString(a)) {
              switch (a) {
                case 'edit':
                  res.push({
                    text: bbn._('Edit'),
                    action: 'edit',
                    icon: 'nf nf-fa-edit'
                  })
                  break;
                case 'copy':
                  res.push({
                    text: bbn._("Copy"),
                    action: 'copy',
                    icon: 'nf nf-fa-copy'
                  });
                  break;
                case 'delete':
                  res.push({
                    text: bbn._("Delete"),
                    action: 'remove',
                    icon: 'nf nf-md-close_thick'
                  });
                  break;
              }
            }
            else {
              if (bbn.fn.isFunction(a.action)) {
                a.action = a.action.bind(this.$origin);
              }

              res.push(a)
            }
          });
          if (this.cols[this.colButtons].notext) {
            bbn.fn.each(res, a => {
              a.notext = true;
              return a;
            });
          }

          return res;
        }
      }

      return [];
    },
  },
  methods: {
    buttonSource() {
      if (bbn.fn.isFunction(this.realButtons)) {
        return this.realButtons(...arguments);
      }

      if (bbn.fn.isArray(this.realButtons)) {
        return this.realButtons;
      }

      return [];
    },
  }
}

