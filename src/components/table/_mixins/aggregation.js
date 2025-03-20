import bbn from "@bbn/bbn";

export default {
  props: {
    /**
     * @todo desc
     * @prop {Object} [{tot: 'Total',med: 'Average',num: 'Count',max: 'Maximum',min: 'Minimum'}] aggregateExp
     */
    aggregateExp: {
      type: Object,
      default() {
        return {
          tot: bbn._('Total'),
          med: bbn._('Average'),
          num: bbn._('Count'),
          max: bbn._('Maximum'),
          min: bbn._('Minimum'),
        };
      }
    },
    /**
     * @prop {String|Array} aggregate
     */
    aggregate: {
      type: [String, Array]
    },
  },
  data() {
    return {
      /**
       * @data {Boolean} [false] isAggregated
       */
      isAggregated: false,
      /**
       * @data {Array} [[]] aggregatedColumns
       */
      aggregatedColumns: [],
      aggregationResult: null
    }
  },
  methods: {
    /**
     * Return true if the cell is before aggregated cells.
     * @method isBeforeAggregated
     * @param {Number} groupIndex
     * @param {Number} idx
     * @returns {Boolean}
     */
    isBeforeAggregated(groupIndex, idx) {
      return this.isAggregated && ((
        this.groupCols[groupIndex].cols[idx + 1] &&
        (this.groupCols[groupIndex].cols[idx + 1].field === this.isAggregated)
      ) ||
        (
          !this.groupCols[groupIndex].cols[idx + 1] &&
          this.groupCols[groupIndex + 1] &&
          this.groupCols[groupIndex + 1].cols[0] &&
          (this.groupCols[groupIndex + 1].cols[0].field === this.isAggregated)
        ));
    },
    updateAggregation() {
      // Aggregated
      if (this.isAggregated) {
        const aggregates = {};
        const aggregateModes = [];
        let aggIndex = 0;
        let i = 0;
        const data = this.filteredData;
        aggregateModes = bbn.fn.isArray(this.aggregate) ? this.aggregate : [this.aggregate];
        bbn.fn.each(this.aggregatedColumns, a => {
          aggregates[a.field] = {
            tot: bbn.fn.sum(data, a.field),
            num: data.length,
            min: bbn.fn.min(data, a.field),
            max: bbn.fn.max(data, a.field),
            groups: []
          };
          const uniqueValues = bbn.fn.unique(data.map(d => d.data[a.field]));
          bbn.fn.each(uniqueValues, uv => {
            const filteredData = data.filter(d => d.data[a.field] === uv);
            aggregates[a.field].groups.push({
              value: uv,
              tot: bbn.fn.sum(filteredData, a.field),
              num: filteredData.length,
              min: bbn.fn.min(filteredData, a.field),
              max: bbn.fn.max(filteredData, a.field),
            });
          });
        });
        this.aggregationResult = aggregates;
      }
    }

  }
}

