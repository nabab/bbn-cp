export default {
  props: {
    /**
     * Defines the expander of the rows.
     * @prop  {Object|String|Function} expander
     */
    expander: {
      type: [Object, String, Function]
    },
    /**
     * The list of expanded rows based on a specific value (ex. group field) and not on the row index
     * @prop {Array|Function} expandedValues
     */
    expandedValues: {
      type: [Array, Function]
    },
    /**
     * In a grouped table, if set to true defines that all rows will be expanded. If an array is given defines which row(s) of the table will be expanded.
     * @prop {Boolean|Array} [[]] expanded
     */
    expanded: {
      type: [Boolean, Array],
      default() {
        return [];
      }
    },
  },
  data() {
    return {
      /**
       * @data {Boolean} allExpanded
       */
      allExpanded: this.expanded === true ? true : false,
      /**
       * @data {Array} currentExpanded
       */
      currentExpanded: Array.isArray(this.expanded) ? this.expanded : [],
      /**
       * @data {Array} currentExpandedValues
       */
      currentExpandedValues: Array.isArray(this.expandedValues) ? this.expandedValues : [],
    }
  },
  computed: {
    /**
     * Returns true if an expander is defined or if the table is groupable and the group is 'number'.
     * @computed hasExpander
     * @returns {Boolean}
     */
    hasExpander() {
      return this.expander || (
        this.groupable &&
        (typeof this.group === 'number') &&
        this.cols[this.group]
      );
    },
    /**
     * Indicates whether the column for the expander should be shown
     * @computed expanderColumnVisible
     * @returns {Boolean}
     */
    expanderColumnVisible() {
      if (this.items && this.items.length) {
        return !!this.items.filter(i => !!i.expander).length
      }
      return false
    },
  },
  methods: {
    /**
     * Returns if the given row is expanded.
     * @method isExpanded
     * @param {Object} d
     * @returns {boolean}
     */
    isExpanded(d, index) {
      if (!this.expander && ((this.group === false) || !this.groupable)) {
        return true;
      }
      if (this.expander && !this.groupable) {
        return this.currentExpanded.includes(index);
      }
      if (
        this.groupable &&
        (this.group !== false) &&
        this.cols[this.group] &&
        this.cols[this.group].field
      ) {
        if (this.getProp(d, this.cols[this.group].field) !== undefined) {
          return this.currentExpandedValues.includes(this.getProp(d, this.cols[this.group].field));
        }
        return true;
      }
      if ((d.isGrouped || d.groupAggregated)
        && this.currentExpanded.includes(d.link)
      ) {
        return true;
      }
      return false;
    },
    /**
     * Toggles the expander of the row corresponding to the given idx.
     * @method toggleExpanded
     * @param {Number} idx
     */
    toggleExpanded(rowIdx) {
      if (this.items[rowIdx]) {
        const idx = this.items[rowIdx].index;
        if (
          this.groupable &&
          (this.group !== false) &&
          this.cols[this.group] &&
          this.cols[this.group].field &&
          (this.getProp(this.currentData[idx].data, this.cols[this.group].field) !== undefined)
        ) {
          let groupValue = this.getProp(this.currentData[idx].data, this.cols[this.group].field);
          let groupIndex = this.currentExpandedValues.indexOf(groupValue);
          if (groupIndex > -1) {
            this.currentExpandedValues.splice(groupIndex, 1);
          } else {
            this.currentExpandedValues.push(groupValue);
          }
        }
        else {
          let i = this.currentExpanded.indexOf(idx);
          if (i > -1) {
            this.currentExpanded.splice(i, 1);
          } else {
            this.currentExpanded.push(idx);
          }
        }
      }
    },
    /**
     * Returns wheter or not the given row has the expander.
     * @method rowHasExpander
     * @param d
     * @returns {Boolean}
     */
    rowHasExpander(d) {
      if (this.hasExpander) {
        if (!bbn.fn.isFunction(this.expander)) {
          return true;
        }
        return !!this.expander(d);
      }
      return false;
    },

  }
}

