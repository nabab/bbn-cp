export default {
  props: {
    /**
     * Defines the toolbar of the table.
     * @prop {Array|Object|String|Function} toolbar
     */
    toolbar: {
      type: [Array, Object, String, Function]
    },
    /**
     * If one or more columns have the property fixed set to true it defines the side of the fixed column(s).
     * @prop {String} ['left'] fixedDefaultSide
     */
    fixedDefaultSide: {
      type: String,
      default: 'left'
    },
    /**
     * Defines the behaviour of the table about the scroll.
     * @prop {Boolean} [true] scrollable
     */
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * Defines the message to show in the confirm when an action is made on the row.
     * @prop {String|Function|Boolean} confirmMessage
     */
    confirmMessage: {
      type: [String, Function, Boolean],
      default: bbn._('Are you sure you want to delete this row?')
    },
    /**
     * Customize the loading text or hide it
     * @prop {String|Boolean} [true] loader
     */
    loader: {
      type: [String, Boolean],
      default: true
    },
    /**
     * Defines the footer of the table.
     * Allowed values ​​are the name or the object of a component, a boolean or a function (to inject custom html)
     * @prop {String|Object|Boolean|Function} footer
     */
    footer: {
      type: [String, Object, Boolean, Function],
      default: true
    },
    /**
     * The name of the `page` word as used in the pager interface.
     * @prop {String} ['Page'] pageName
     */
    pageName: {
      type: String,
      default: bbn._("page")
    },
    /**
     * The name of the `record` word as used in the pager interface.
     * @prop {String} ['Record(s)'] itemName
     */
    itemName: {
      type: String,
      default: bbn._("rows")
    },
    /**
     * Allows you to see the contents of a cell in a popup
     * @prop {Boolean} [false] zoomable
     */
    zoomable: {
      type: Boolean,
      default: false
    },
    /**
     * Property sloBefore for the toolbar
     * @prop {Boolean} toolbarSlotBefore
     */
    toolbarSlotBefore: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      /**
       * @data {} [null] scrollableContainer
       */
      scrollableContainer: null,
      /**
       * @data {Boolean} [true] hiddenScroll
       */
      hiddenScroll: true,
      /**
       * @data {Array} [[]] popups
       */
      popups: [],
      /**
       * @data {Boolean} [false] hasScrollX 
       */
      hasScrollX: false,
      /**
       * @data {Boolean} [false] hasScrollY
       */
      hasScrollY: false,
      /**
       * The text shown during loading
       * @data {String} ['Loading...'] currentLoaderText
       */
      currentLoaderText: bbn.fn.isString(this.loader) ? this.loader : bbn._('Loading') + '...',
      /**
       * The portal element for the buttons' floater (menu mode)
       * @data {HTMLElement} [document.body] portalElement
       */
      portalElement: document.body,
      /**
       * @data {HTMLElement} [null] container
       */
      container: null,
      isTable: null,
      /**
       * @data [null] inTable
       */
      inTable: null,
    }
  },
  computed: {
    /**
     * Return true if the table has the prop toolbar defined.
     * @computed hasToolbar
     * @returns {Boolean}
     */
    hasToolbar() {
      return this.toolbarButtons.length || bbn.fn.isObject(this.toolbar) || bbn.fn.isFunction(this.toolbar) || bbn.fn.isString(this.toolbar);
    },
    /**
     * @computed hasPager
     * @return {Boolean}
     */
    hasPager() {
      return (this.pageable
        || this.saveable
        || this.filterable
        || this.isAjax
        || this.showable)
        && (this.footer === true);
    },
    /**
     * Return an array with the object(s) button for the toolbar.
     * @computed toolbarButtons
     * @returns {Array}
     */
    toolbarButtons() {
      let r = [],
        ar = [];
      if (this.toolbar) {
        ar = bbn.fn.isFunction(this.toolbar) ?
          this.toolbar() : (
            Array.isArray(this.toolbar) ? this.toolbar.slice() : []
          );
        if (!Array.isArray(ar)) {
          ar = [];
        }
        bbn.fn.each(ar, a => {
          let o;
          if (bbn.fn.isString(a)) {
            switch (a) {
              case 'insert':
                o = {
                  text: bbn._('Add'),
                  action: this.insert,
                  icon: 'nf nf-fa-plus'
                };
                break;
              case 'export':
                o = {

                };
                break;
              case 'print':
                o = {

                };
                break;
              // separator or other toolbar param
              default:
                o = a;
            }
          }
          else if (bbn.fn.isObject(a)) {
            o = bbn.fn.clone(a);
          }
          if (o && bbn.fn.isObject(o) && bbn.fn.isString(o.action)) {
            o.action = () => {
              this._execCommand(a);
            }
          }

          if (!o) {
            throw new Error(bbn._("Wrong parameter for toolbar"))
          }

          r.push(o);
        });
      }
      return r;
    },
    /**
     * Return the object scroller.
     * @computed scroller
     * @returns {Object}
     */
    scroller() {
      return bbn.cp.isComponent(this.$refs.scroller) ? this.$refs.scroller : null;
    },
    lastFixedIndex() {
      let idx = -1;
      bbn.fn.each(this.currentColumns, (a, i) => {
        if (a.fixed && a.isLeft) {
          idx = i;
        }
      });
      return idx;
    },

  },
  methods: {
    /**
     * Executes the action of the button.
     *
     * @method _execCommand
     * @param {Object} button
     * @param {Object} data
     * @param {Object} col
     * @param {Number} index
     * @param {Event} ev
     * @returns {Function|Boolean}
     */
    _execCommand(button, data, col, index, ev) {
      if (ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      }
      //bbn.fn.log("EXEC COMMAND");
      if (button.action) {
        if (bbn.fn.isFunction(button.action)) {
          return button.action.bind(this.table.bbnComponent)(data, col, index);
        }
        else if (typeof (button.action) === 'string') {
          switch (button.action) {
            case 'csv':
              return this.exportCSV();
            case 'excel':
              return this.exportExcel();
            case 'insert':
              return this.insert(data, {
                label: bbn._('New row creation')
              }, -1);
            case 'select':
              return this.select(index);
            case 'edit':
              return this.edit(data, {
                label: bbn._('Row edition')
              }, index)
            case 'add':
              return this.add(data);
            case 'copy':
              return this.copy(data, {
                label: bbn._('Row copy')
              }, index);
            case 'delete':
              return this.removeItem(index);
          }
        }
      }
      return false;
    },
    /**
     * Opens a popup showing the database query.
     * @method showQuery 
     */
    showQuery() {
      if (this.currentQuery) {
        this.getPopup({
          label: bbn._('Database query and parameters'),
          scrollable: true,
          component: {
            template: `
<div class="bbn-block bbn-spadding">
  <h3 @click="showValues = !showValues"
      bbn-text="showValues ? _('Hide the values') : _('Show the values')"
      class="bbn-p"></h3>
  <ol class="bbn-space-bottom" bbn-if="showValues">
    <li bbn-for="v in source.values" bbn-text="v"></li>
  </ol>
  <pre bbn-text="source.query"></pre>
</div>
              `,
            props: ['source'],
            data() {
              return {
                showValues: false
              }
            }
          },
          closable: true,
          source: {
            query: this.currentQuery,
            values: this.currentQueryValues
          }
        })
      }
    },
    /**
     * Renders a cell according to column's config.
     * @method render
     * @param {Object} data
     * @param {Object} column
     * @param {Number} index
     * @fires renderData
     * @returns {Function}
     */
    render(data, column, index) {
      let value = data && this.isValidField(column.field) ? this.getProp(data, column.field) : undefined;
      if (column.render) {
        return column.render(data, column, index, value) || '';
      }

      return this.renderData(data, column, index) || '';
    },
    /**
     * Returns the html element of the given row index.
     * @method getTr
     * @param {Number} i
     * @returns {String}
     */
    getTr(i) {
      return this.getRef('rows')?.[i];
    },
    /**
     * Returns true if the given row has td.
     *
     * @method hasTd
     * @param {Object} data
     * @param {Number} colIndex
     * @param {Number} groupIndex
     */
    hasTd(data, colIndex, groupIndex) {
      let tdIndex = colIndex;
      for (let i = 0; i < groupIndex; i++) {
        tdIndex += this.groupCols[groupIndex].cols.length;
      }
      if (data.selection) {
        if (tdIndex === 0) {
          return false;
        } else if (data.group || data.expander) {
          if (tdIndex === 1) {
            return false;
          }
        }
      }
      if (data.group || data.expander) {
        if (tdIndex === 0) {
          return false;
        }
      }
      if (data.group || data.expansion) {
        return false;
      }
      if (data.invisible) {
        return false;
      }
      return true;
    },
    loseViewport(ele, data) {
      if ((ele instanceof Comment) && !ele.bbnSchema.isCommented) {
        const tmp = Array.from(ele.parentNode.childNodes).filter(a => a.tagName && !a.bbnId.indexOf(ele.bbnId + '-') && !a.bbnHash.indexOf(ele.bbnHash));
        if (tmp.length) {
          ele = tmp[0];
        }
      }

      if (!(ele instanceof Comment)) {
        const inVP = bbn.fn.isInViewport(ele);
        if (!inVP) {
          return true;
        }
      }
    }

  },
}