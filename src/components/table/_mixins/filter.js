export default {
  data() {
    return {
      /**
       * @data {Boolean} [false] editedFilter
       */
      editedFilter: false,
      /**
       * @data {Number} [0] floatingFilterX
       */
      floatingFilterX: 0,
      /**
       * @data {Number} [0] floatingFilterY
       */
      floatingFilterY: 0,
      /**
       * @data {Number} [0] floatingFilterTimeOut
       */
      floatingFilterTimeOut: 0,
      /**
       * @data [null] filterElement
       */
      filterElement: null,
    }
  },
  methods: {
    /**
     * Returns true if the table has currentFilters defined for the given column.
     * @method hasFilter
     * @param {Object} col The column
     * @returns {Boolean}
     */
    hasFilter(col) {
      if (col.field) {
        for (let i = 0; i < this.currentFilters.conditions.length; i++) {
          if (this.currentFilters.conditions[i].field === col.field) {
            return true;
          }
        }
      }
      return false;
    },
    /**
     * Handles the floatingFilterTimeOut.
     * @method checkFilterWindow
     * @param {Event} e
     */
    checkFilterWindow(e) {
      if (this.currentFilter) {
        if (this.floatingFilterTimeOut) {
          clearTimeout(this.floatingFilterTimeOut);
        }
        if (
          (e.clientX < this.floatingFilterX) ||
          (e.clientX > this.floatingFilterX + 600) ||
          (e.clientY < this.floatingFilterY) ||
          (e.clientY > this.floatingFilterY + 200)
        ) {
          if (!this.floatingFilterTimeOut) {
            this.floatingFilterTimeOut = setTimeout(() => {
              this.currentFilter = false;
              this.editedFilter = false;
            }, 500);
          }
        } else {
          this.floatingFilterTimeOut = 0;
        }
      }
    },
    /**
     * Returns the options for the bind of the table filter.
     *
     * @method getFilterOptions
     * @fires getColFilters
     * @returns {Object}
     */
    getFilterOptions() {
      if (this.currentFilter) {
        let o = this.editorGetComponentOptions(this.currentFilter);
        if (o.field) {
          o.conditions = this.getColFilters(this.currentFilter);
        }
        if (o.conditions.length) {
          o.value = o.conditions[0].value;
          o.operator = o.conditions[0].operator;
          this.editedFilter = o.conditions[0];
        }
        o.multi = false;
        return o;
      }
    },
    /**
     * Opens the popup containing the multifilter.
     * @method openMultiFilter
     */
    openMultiFilter() {
      this.currentFilter = false;
      let table = this;
      this.getPopup({
        label: bbn._('Multiple filters'),
        component: {
          template: `<bbn-scroll><bbn-filter bbn-bind="source" @change="changeConditions" :multi="true"></bbn-filter></bbn-scroll>`,
          props: ['source'],
          methods: {
            changeConditions(o) {
              table.currentFilters.logic = o.logic;
              table.currentFilters.conditions = o.conditions;
            }
          },
        },
        width: '90%',
        height: '90%',
        source: {
          fields: bbn.fn.filter(this.cols, a => {
            return (a.filterable !== false) && !a.buttons;
          }),
          conditions: this.currentFilters.conditions,
          logic: this.currentFilters.logic
        }
      });
    },
    /**
     * Returns the filter of the given column.
     * @method getColFilters
     * @param {Object} col
     * @returns {Object}
     */
    getColFilters(col) {
      let r = [];
      if (col.field) {
        bbn.fn.each(this.currentFilters.conditions, a => {
          if (a.field === col.field) {
            r.push(a);
          }
        })
      }
      return r;
    },
    /**
     * Shows the filter of the column.
     * @method showFilter
     * @param {Object} col
     * @param {Event} ev
     */
    showFilter(col, ev) {
      //bbn.fn.log(ev);
      this.filterElement = ev.target
      this.floatingFilterX = (ev.pageX - 10) < 0
        ? 0
        : ((ev.pageX - 10 + 600) > this.$el.clientWidth
          ? this.$el.clientWidth - 600
          : ev.pageX - 10);
      this.floatingFilterY = (ev.pageY - 10) < 0
        ? 0
        : ((ev.pageY - 10 + 200) > this.$el.clientHeight
          ? this.$el.clientHeight - 200
          : ev.pageY - 10);
      this.currentFilter = col;
    },
    /**
     * Returns true if the filter should be shown on the given column.
     * @method showFilterOnColumn
     * @param {Object} col
     * @returns {Boolean}
     */
    showFilterOnColumn(col) {
      if (!this.filterable || (col.filterable === false) || col.hideFilter) {
        return false;
      }

      if (col.filterable === true) {
        return true;
      }

      return !col.buttons && col.field;
    },

  }
}

