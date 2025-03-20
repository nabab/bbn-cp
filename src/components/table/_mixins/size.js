export default {
  props: {
    /**
     * Set to true allows the table to be resizable.
     * @prop {Boolean} [false] resizable
     */
    resizable: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the minimum columns width.
     * @prop {Number} [30] minimumColumnWidth
     */
    minimumColumnWidth: {
      type: Number,
      default: 20
    },
    /**
     * Defines the minimum columns width for mobile devices.
     * @prop {Number} [100] minimumColumnWidthMobile
     */
    minimumColumnWidthMobile: {
      type: Number,
      default: 100
    },
    /**
     * Defines the default columns width.
     * @prop {Number} [150] defaultColumnWidth
     */
    defaultColumnWidth: {
      type: Number,
      default: 150
    },
    /**
     * The max row height value
     * @prop {Number} maxRowHeight
     */
    maxRowHeight: {
      type: Number
    },
  },
  data() {
    return {
      /**
       * True if the table is resizing its width
       * @data {Boolean} [false] isResizingWidth
       */
      isResizingWidth: false,
      isResizing: false

    }
  },
  computed: {
    /**
     * The container width.
     * @computed containerWidth
     * @returns {String}
     */
    containerWidth() {
      if (!this.groupCols || !this.groupCols[1] || !this.groupCols[1].width || !this.offsetParent?.offsetWidth) {
        return '0px';
      }

      return (this.offsetParent.offsetWidth - this.groupCols[0].width - this.groupCols[2].width) + 'px';
    },

    /**
     * The total width.
     * @computed totalWidth
     * @returns {String}
     */
    totalWidth() {
      const sum = bbn.fn.sum(this.groupCols, 'width');
      if (sum) {
        return sum + 'px';
      } 

      return '100%';
    },

    currentMaxRowHeight() {
      return this.maxRowHeight ? this.maxRowHeight + 'px' : 'auto';
    }
  },
  methods: {
    onResize() {
      bbn.cp.mixins.resizer.methods.onResize.apply(this);
      if (this.$isMounted) {
        this.$nextTick(() => {
          this.resizeWidth();
        })
      }
    },
    /**
     * Returns an object of numbers as width and height based on whatever unit given.
     * 
     * @method getDimensions
     * @param {Number} width
     * @param {Number} height
     * @return {Number}
     */
    getDimensionWidth(width) {
      if (bbn.fn.isNumber(width) && width) {
        return parseInt(width);
      }

      let parent = this;
      let r = 0;

      if (parent && width) {
        if (!parent.insertAdjacentElement) {
          return 0;
        }

        let el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.opacity = 0;
        el.className = 'bbn-reset'
        el.style.width = this.formatSize(width);
        try {
          parent.insertAdjacentElement('beforeend', el);
        }
        catch (e) {
          bbn.fn.log("Error while inserting adjacent element for dimensioncalculation", e, this.$el);
          return 0;
        }
        r = el.offsetWidth || el.clientWidth || 0;
        el.parentNode.removeChild(el);
      }

      return r;
    },
    /**
     * Resizes the table.
     * @method resizeWidth
     * @returns {HTMLElement}
     */
    resizeWidth() {
      if (!this.checkVisibility()) {
        return;
      }

      const table = this.getRef('table');
      if (!table) {
        return;
      }

      let currentTot = this.groupCols[0].width + this.groupCols[1].width + this.groupCols[2].width;
      let parentWidth = this.$el.offsetParent ? this.$el.offsetParent.getBoundingClientRect().width : this.$el.offsetWidth;
      let parentStyle = this.$el.offsetParent ? window.getComputedStyle(this.$el.offsetParent) : {};
      let parentPadding = parseFloat(parentStyle?.paddingLeft || 0) + parseFloat(parentStyle?.paddingRight || 0);
      let diff = Math.floor(parentWidth - parentPadding - this.borderLeft - this.borderRight - currentTot);
      let numDynCols = this.currentColumns.filter(c => (c.width === undefined) && !c.isExpander && !c.isSelection && !c.invisible).length;
      let numStaticCols = this.currentColumns.filter(c => !!c.width && !c.isExpander && !c.isSelection && !c.invisible).length;
      let newWidth = numDynCols || numStaticCols ? Math.floor(diff / (numDynCols || numStaticCols)) : 0;
      if (newWidth) {
        this.getRef('table').style.width = (currentTot + newWidth) + 'px';
        this.isResizingWidth = true;
        bbn.fn.each(this.groupCols, (groupCol, groupIdx) => {
          let sum = 0,
            sumRight = 0,
            sumLeft = 0;
          bbn.fn.each((groupIdx !== 2) ? groupCol.cols : groupCol.cols.slice().reverse(), col => {
            if (!col.invisible) {
              if (!col.isExpander
                && !col.isSelection
                && ((!!numDynCols && (col.width === undefined))
                  || (!numDynCols && !!numStaticCols && !!col.width))
              ) {
                let tmp = col.realWidth + newWidth;
                if ((col.width !== undefined)
                  && (!bbn.fn.isString(col.width)
                    || bbn.fn.isNumber(bbn.fn.substr(col.width, -1)))
                ) {
                  tmp = col.realWidth;
                }
                else if (tmp < (bbn.fn.isMobile() ? this.minimumColumnWidthMobile : this.minimumColumnWidth)) {
                  tmp = bbn.fn.isMobile()
                    ? this.minimumColumnWidthMobile
                    : this.minimumColumnWidth;
                }
                let minWidth = this.getDimensionWidth(col.minWidth);
                let maxWidth = this.getDimensionWidth(col.maxWidth);
                if (col.minWidth && (tmp < minWidth)) {
                  tmp = minWidth;
                }
                if (col.maxWidth && (tmp > maxWidth)) {
                  tmp = maxWidth;
                }

                col.realWidth = Math.floor(tmp);
              }
              sum += col.realWidth;
              if (groupIdx === 0) {
                col.left = sumLeft;
                sumLeft += col.realWidth;
              }

              if (groupIdx === 2) {
                col.right = sumRight;
                sumRight += col.realWidth;
              }
            }
          })
          this.groupCols[groupIdx].width = sum;
          sum = 0;
          sumLeft = 0;
          sumRight = 0;
        });
        this.isResizingWidth = false;
      }
      this.updateStyle();

      return this;
    },
    /**
     * The method called on a column resize (by user)
     * @method onUserResize
     * @param {Event} e
     * @fires $forceUpdate
     */
    onUserResize(e) {
      if (e.target && e.detail) {
        let d = e.target._bbn.directives.resizable.options.data,
          nextCol = this.groupCols[d.groupColIndex].cols[d.columnIndex + 1],
          nextColSize = nextCol ? nextCol.realWidth + e.detail.movement : 0;
        if ((d.column.realWidth !== e.detail.size)
          && (e.detail.size >= this.defaultColumnWidth)
          && (!nextCol || (nextColSize >= this.defaultColumnWidth))
        ) {
          this.groupCols[d.groupColIndex].cols[d.columnIndex].realWidth = Math.floor(e.detail.size);
          if (nextCol) {
            this.groupCols[d.groupColIndex].cols[d.columnIndex + 1].realWidth = nextColSize;
          }
          this.$forceUpdate();
        }
      }
    },

  },
}

