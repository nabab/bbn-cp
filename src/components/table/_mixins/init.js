export default {
  data() {
    return {
      /**
       * @data {Boolean} [false] initReady
       */
      initReady: false,
      /**
       * @data {Boolean} [false] groupInit
       */
      groupInit: false,
      /**
       * @data {String} [false] initStarted
       */
      initStarted: false,
    }
  },
  computed: {},
  methods: {
    /**
     * Initializes the table.
     * @method init
     * @param {Boolean} with_data
     * @fires updateData
     */
    init(with_data) {
      //bbn.fn.warning("INIT TABLE");
      this.initStarted = true;
      //this.setContainerMeasures();
      //this.setResizeMeasures();
      let numUnknown = bbn.fn.count(this.cols, a => !a.invisible && !a.width);
      let isAggregated = false;
      let aggregatedColIndex = false;
      let aggregatedColTitle = false;
      let aggregatedColumns = [];
      const parentStyle = this.$el.offsetParent ? window.getComputedStyle(this.$el.offsetParent) : {};
      const parentPadding = parseFloat(parentStyle?.paddingLeft || 0) + parseFloat(parentStyle?.paddingRight || 0);
      const parentWidth = (this.$el.offsetParent ? this.$el.offsetParent.getBoundingClientRect().width : this.lastKnownCtWidth) - parentPadding;
      this.initColumns();
      const totalSumWidth = bbn.fn.sum(this.groupCols, 'sum');
      const styles = window.getComputedStyle(this.$el);
      const borderLeft = styles.getPropertyValue('border-left-width').slice(0, -2);
      const borderRight = styles.getPropertyValue('border-right-width').slice(0, -2);
      const toFill = parentWidth - borderLeft - borderRight - totalSumWidth;
      this.borderLeft = borderLeft;
      this.borderRight = borderRight;
      // We must arrive to 100% minimum
      if (toFill > 0) {
        if (numUnknown) {
          let newWidth = Math.floor(toFill / numUnknown);
          if (newWidth < (bbn.fn.isMobile() ? this.minimumColumnWidthMobile : this.minimumColumnWidth)) {
            newWidth = bbn.fn.isMobile() ? this.minimumColumnWidthMobile : this.minimumColumnWidth;
          }
          let maxPreAggregatedWidth = 0;
          bbn.fn.each(this.cols, (a, i) => {
            if (!a.invisible) {
              if (!a.width) {
                a.realWidth = newWidth + (bbn.fn.isMobile() ? this.defaultColumnWidthMobile : this.defaultColumnWidth);
              }
              if (isAggregated && (i < aggregatedColIndex) && (a.realWidth >= maxPreAggregatedWidth)) {
                maxPreAggregatedWidth = a.realWidth;
                aggregatedColTitle = a;
              }
            }
          });
        }
        // Otherwise we dispatch it through the existing column
        else {
          let num = this.numVisible;
          let ignore = 0;
          if (this.hasExpander) {
            num--;
            ignore++;
          }
          if (this.selection) {
            num--;
            ignore++;
          }
          //let bonus = Math.floor(toFill / num * 100) / 100;
          let bonus = toFill / num;
          let maxPreAggregatedWidth = 0;
          bbn.fn.each(this.cols, (a, i) => {
            if (!a.invisible && (i >= ignore)) {
              a.realWidth += bonus;
              if (isAggregated && (i < aggregatedColIndex) && (a.realWidth >= maxPreAggregatedWidth)) {
                maxPreAggregatedWidth = a.realWidth;
                aggregatedColTitle = a;
              }
            }
          });
        }
      }

      if (aggregatedColTitle) {
        aggregatedColTitle.isAggregatedTitle = true;
      }

      let sum = 0,
        sumLeft = 0,
        sumRight = 0;
      bbn.fn.each(this.groupCols, (a, i) => {
        bbn.fn.each((i !== 2) ? a.cols : a.cols.slice().reverse(), c => {
          if (!c.invisible) {
            sum += c.realWidth;
            if (i === 0) {
              c.left = sumLeft;
              sumLeft += c.realWidth;
            }
            else if (i === 2) {
              c.right = sumRight;
              sumRight += c.realWidth;
            }
          }
        });
        a.width = sum;
        sum = 0;
        sumLeft = 0;
        sumRight = 0;
      });
      this.isAggregated = isAggregated;
      this.aggregatedColumns = aggregatedColumns;
      this.resizeWidth();
      this.initReady = true;
      if (with_data) {
        this.$once('dataloaded', () => {
          this.initStarted = false;
          this.$emit('init', this);
          this.resizeWidth();
        });
        this.updateData();
      }
      else {
        this.$nextTick(() => {
          this.initStarted = false;
          this.resizeWidth();
          this.$emit('init', this);
        });
      }
      //bbn.fn.log('forceupdate5');
    },
  },
};