export default {
  props: {
    /**
     * Set to true allows the table to be groupable according to the props groupBy.
     * @prop {Boolean} [false] groupable
     */
    groupable: {
      type: Boolean,
      default: false
    },
    /**
     * In case of Ajax table, set to true will make an Ajax call to group the table by a field.
     * @prop {Boolean} [true] serverGrouping
     */
    serverGrouping: {
      type: Boolean,
      default: true
    },
    /**
     * Set to false will make an Ajax call for the grouping.
     * @prop {Boolean} [true] localGrouping
     */
    localGrouping: {
      type: Boolean,
      default: true
    },
    /**
     * The index of the property to group by the table referred to the object of data of the row.
     * @prop {Number} groupBy
     */
    groupBy: {
      type: Number
    },
    /**
     * Defines the footer for a group of rows.
     * Allowed values ​​are the name or the object of a component or a function (to inject custom html)
     * @prop {String|Object|Function} groupFooter
     */
    groupFooter: {
      type: [String, Object, Function]
    },
  },
  data() {
    return {
      /**
       * @data {Boolean|Number} [false] group
       */
      group: this.groupBy === undefined ? false : this.groupBy,
    }
  },
  computed: {
    isGroupActive() {
      return this.groupable && (this.group !== false) && this.cols[this.group] && this.cols[this.group].field;
    }
  },
  methods: {
    /**
     * Returns wheter or not the cell is grouped.
     * @method isGroupedCell
     * @param {Number} groupIndex
     * @param {Object} row
     * @returns {Boolean}
     */
    isGroupedCell(groupIndex, row) {
      if (this.groupable && row.group) {
        if (this.groupCols[0].width > 200) {
          return groupIndex === 0;
        } else {
          return groupIndex === 1;
        }
      }
      return false;
    },

  }
};

