export default {
  props: {
    /**
     * An array of objects with at least the property 'field' that can replace the html '<bbns-column></bbns-column>' or extend them.
     * @prop {Array} [[]] columns
     */
    columns: {
      type: Array,
      default: function () {
        return [];
      }
    },
  },
  data() {
    const groupColsTemplate = [
      {
        name: 'left',
        width: 0,
        visible: 0,
        cols: []
      },
      {
        name: 'main',
        width: 0,
        visible: 0,
        cols: []
      },
      {
        name: 'right',
        width: 0,
        visible: 0,
        cols: []
      }
    ];
    return {
      groupColsTemplate,
      /**
       * The group of columns.
       * @data {Object} [[{name: 'left',width: 0,visible: 0,cols: []},{name: 'main',width: 0,visible: 0,cols: []},{name: 'right',width: 0,visible: 0,cols: []}]] groupCols
       */
      groupCols: bbn.fn.clone(groupColsTemplate),
      /**
       * @data {Array} [[]] cols
       */
      cols: [],
      shownCols: [],
      firstColumnVisible: 0,
      lastColumnVisible: false,
      tmpFirstColumnVisible: 0,
      tmpLastColumnVisible: false,
      tmpColumnVisible: 0,
      rowSizeObserver: null,
      scrollIsMounted: false,
      scrollIntersection: null,
      scrollCurrentX: null,
      scrollCurrentY: null,
      scrollXTimeout: 0,
      scrollYTimeout: 0,
    }
  },
  computed: {
    /**
     * Return an array of shown fields (the hidden ones are excluded).
     * @computed shownFields
     * @returns {Array}
     */
    shownFields() {
      let r = [];
      bbn.fn.each(this.cols, a => {
        if (!a.invisible) {
          r.push(a.field);
        }
      });
      return r;
    },
    allFields() {
      const res = [];
      for (let i = 0; i < this.cols.length; i++) {
        if (this.cols[i].field && !res.includes(this.cols[i].field)) {
          res.push(this.cols[i].field);
        }
      }

      return res;
    },
    /**
     * The current columns of the table.
     * @computed currentColumns
     * @returns {Array}
     */
    currentColumns() {
      let r = [];
      bbn.fn.each(this.groupCols, (a, i) => {
        bbn.fn.each(a.cols, b => {
          r.push(bbn.fn.extend(true, {}, b, {
            fixed: i !== 1,
            isLeft: i === 0,
            isRight: i === 2,
            realWidth: b.realWidth ? b.realWidth + 'px' : 'auto'
          }));
        });
      });

      return r;
    },
    hasScrollX() {
      const cc = this.currentColumns;
      return (cc.length > 15) 
      && (cc[cc.length - 1].leftWidth + parseInt(cc[cc.length - 1].realWidth) > (this.lastKnownWidth * 2));
    },
  },
  methods: {
    updateShownCols() {
      if (!this.hasScrollX) {
        const shownCols = this.groupCols[1].cols.map((a, i) => i);
        if (!this.groupCols[0].cols.length) {
          shownCols.shift();
        }

        this.shownCols = shownCols;
        return;
      }

      const cols = [];
      let first = this.hasScrollX ? this.firstColumnVisible : 0;
      if (!first && !this.groupCols[1].cols.length) {
        first = 1;
      }
      const last = this.hasScrollX ? this.lastColumnVisible : this.groupCols[1].cols.length - 1;
      if (last > first) {
        for (let i = first; i <= last; i++) {
          cols.push(i);
        }
      }

      this.shownCols = cols;
    },
    updateScrollCurrentY() {
      if (this.$refs.scroll?.$refs) {
        this.scrollCurrentY = Math.round(this.$refs.scroll.currentY);
      }
      else {
        this.scrollCurrentY = bbn._("Unknown");
      }
    },
    onScrollX(v) {
      /*
      clearTimeout(this.scrollXTimeout);  
      this.scrollXTimeout = setTimeout(() => {
        if (Math.abs(v - this.$refs.scroll.currentX) < 50) {
          this.setColumnsVisibility(v);
        }
      }, 100);
      */
    },
    onScrollMounted() {
      this.setScrollIntersection();
      this.scrollIsMounted = true;
      this.$emit('scroll-mounted');
    },
    onScrollBeforeDestroy() {
      bbn.fn.log("ON SCROLL BEFORE DESTROY");
      this.scrollIsMounted = false;
      if (this.scrollIntersection) {
        this.scrollIntersection.disconnect();
        this.scrollIntersection = null;
        this.scrollCurrentX = null;
      }
    },
    setScrollIntersection() {
      const hasScrollX = this.hasScrollX;
      const scrollable = this.scrollable;
      if (!this.scrollIntersection && (hasScrollX || scrollable)) {
        this.scrollIntersection = new IntersectionObserver(entries => {
          const cols = this.groupCols[1].cols;
          if ((this.scrollCurrentX === null) && hasScrollX) {
            this.scrollCurrentX = this.$refs.scroll.currentX;
          }

          const currentScrollX = hasScrollX ? this.$refs.scroll.$refs.scrollContent.scrollLeft : 0;
          const isLeft = currentScrollX < this.scrollCurrentX;

          entries.forEach(entry => {
            // Going in
            if (entry.intersectionRatio > 0) {
              // Row
              if (scrollable && entry.target instanceof HTMLTableRowElement) {
                entry.target.tmpReady = true;
              }
              // Title cells (columns)
              else if (hasScrollX && entry.target instanceof HTMLTableCellElement) {
                if (entry.target.groupIndex === 1) {
                  // Init
                  if (entry.target.visible === null) {
                    if (!this.tmpColumnVisible || (this.tmpColumnVisible < (entry.target.index + 5))) {
                      this.tmpColumnVisible = Math.min(entry.target.index + 5, cols.length - 1);
                    }
                    if (entry.target.index === (cols.length - 1)) {
                      this.lastColumnVisible = this.tmpColumnVisible;
                      this.tmpLastColumnVisible = this.tmpColumnVisible;
                      this.updateShownCols();
                    }
                  }
                  else {
                    // Going left
                    if (isLeft) {
                      this.tmpFirstColumnVisible = Math.max(0, entry.target.index - 5);
                    }
                    // Going right
                    else {
                      this.tmpLastColumnVisible = Math.min(entry.target.index + 5, cols.length - 1);
                    }
                  }
                  entry.target.visible = true;
                }
              }
            }
            // Going out
            else {
              // Row
              if (scrollable && entry.target instanceof HTMLTableRowElement) {
                entry.target.tmpReady = false;
              }
              // Title cells (columns)
              else if (hasScrollX && entry.target instanceof HTMLTableCellElement) {
                if (entry.target.groupIndex === 1) {
                  // Init
                  if (entry.target.visible === null) {
                    if (entry.target.index === (cols.length - 1)) {
                      this.lastColumnVisible = this.tmpColumnVisible;
                      this.updateShownCols();
                    }
                  }
                  else {
                    // Going left
                    if (isLeft) {
                      this.tmpLastColumnVisible = Math.min(entry.target.index + 5, cols.length - 1);
                    }
                    // Going right
                    else {
                      this.tmpFirstColumnVisible = Math.max(0, entry.target.index - 5);
                    }
                  }
                  entry.target.visible = false;
                }
              }
            }
          });
          this.scrollCurrentX = currentScrollX;
        }, {
          root: this.$refs.scroll.$refs.scrollContent,
          threshold: 0.0
        });
        this.rowSizeObserver = new ResizeObserver(entries => {
          for (const e of entries) {
            if (e.target.ready && (!e.target.rowHeight || (e.target.rowHeight < e.contentRect.height))) {
              const ele = e.target;
              const h = e.contentRect.height;
              setTimeout(() => {
                if (ele?.ready && (ele.getBoundingClientRect().height === h) && (!ele.rowHeight || (ele.rowHeight < h))) {
                  ele.rowHeight = h;
                  //bbn.fn.log("ROW " + e.target.index + " SET TO " + e.target.rowHeight);
                }
              }, 250);
              //bbn.fn.log("ROW " + e.target.index + " SET TO " + e.target.rowHeight);
            }
          }
        });
      }
    },
    /**
     * Returns the configuration for the cells of the titles of grouped columns.
     * @method titleGroupsCells
     * @param {Number} groupIndex
     * @returns {Array}
     */
    titleGroupsCells(groupIndex) {
      if (this.titleGroups) {
        let cells = [],
          group = null,
          corresp = {},
          beforeWidth = 0;
        bbn.fn.each(this.groupCols, (c, i) => {
          if (i === groupIndex) {
            return false;
          }

          beforeWidth += c.width;
        });
        bbn.fn.each(this.groupCols[groupIndex].cols, a => {
          if (!a.invisible) {
            if (a.group === group) {
              cells[cells.length - 1].colspan++;
              cells[cells.length - 1].width += a.realWidth;
              if (a.left !== undefined) {
                if ((cells[cells.length - 1].left === undefined)
                  || (a.left < cells[cells.length - 1].left)
                ) {
                  cells[cells.length - 1].left = a.left;
                }
              }
              if (a.right !== undefined) {
                if ((cells[cells.length - 1].right === undefined)
                  || (a.right < cells[cells.length - 1].right)
                ) {
                  cells[cells.length - 1].right = a.right;
                }
              }
            }
            else {
              if (corresp[a.group] === undefined) {
                let idx = bbn.fn.search(this.titleGroups, 'value', a.group);
                if (idx > -1) {
                  corresp[a.group] = idx;
                }
              }
              if (corresp[a.group] !== undefined) {
                cells.push({
                  text: this.titleGroups[corresp[a.group]].text || '&nbsp;',
                  style: this.titleGroups[corresp[a.group]].style || {},
                  cls: this.titleGroups[corresp[a.group]].cls || '',
                  colspan: 1,
                  width: a.realWidth,
                  left: a.left !== undefined ? a.left : undefined,
                  right: a.right !== undefined ? a.right : undefined,
                  contentLeft: beforeWidth
                });
              }
              /*
              else if ( this.titleGroups.default ){
                cells.push({
                  text: this.titleGroups.default.text || '&nbsp;',
                  style: this.titleGroups.default.style || {},
                  cls: this.titleGroups.default.cls || '',
                  colspan: 1,
                  width: a.realWidth
                });
              }
              */
              else {
                cells.push({
                  text: '&nbsp;',
                  style: '',
                  cls: '',
                  colspan: 1,
                  width: a.realWidth,
                  left: a.left !== undefined ? a.left : undefined,
                  right: a.right !== undefined ? a.right : undefined,
                  contentLeft: beforeWidth
                });
              }
              group = a.group;
            }
          }
        });
        return cells;
      }
    },
    initColumns() {
      const groupCols = bbn.fn.clone(this.groupColsTemplate);
      this.groupCols = bbn.fn.clone(this.groupColsTemplate);
      let isAggregated = false;
      let aggregatedColIndex = false;
      let aggregatedColTitle = false;
      let aggregatedColumns = [];
      const parentStyle = this.$el.offsetParent ? window.getComputedStyle(this.$el.offsetParent) : {};
      const parentPadding = Math.floor(parseFloat(parentStyle?.paddingLeft || 0) + parseFloat(parentStyle?.paddingRight || 0));
      const parentWidth = Math.floor(this.$el.offsetParent ? this.$el.offsetParent.getBoundingClientRect().width : this.lastKnownCtWidth) - parentPadding;
      let leftWidth = 0;
      const cols = bbn.fn.map(this.cols, (a, i) => {
        a = bbn.fn.clone(a);
        a.realWidth = 0;
        if (!a.invisible && (!this.groupable || (this.group !== i))) {
          let minWidth = null;
          let maxWidth = null;
          if (a.minWidth) {
            minWidth = this.getDimensionWidth(a.minWidth)
          }
          if (a.maxWidth) {
            maxWidth = this.getDimensionWidth(a.maxWidth)
          }
          a.index = i;
          if (a.invisible) {
            a.realWidth = 0;
          }
          else {
            if (this.aggregate && a.aggregate) {
              if (aggregatedColIndex === false) {
                aggregatedColIndex = i;
                isAggregated = true;
              }
              aggregatedColumns.push(a);
            }
            if (a.width) {
              if (bbn.fn.isString(a.width) && (bbn.fn.substr(a.width, -1) === '%')) {
                a.realWidth = Math.floor(parentWidth * this.getDimensionWidth(a.width) / 100);
                if (a.realWidth < (bbn.fn.isMobile() ? this.minimumColumnWidthMobile : this.minimumColumnWidth)) {
                  a.realWidth = bbn.fn.isMobile() ? this.minimumColumnWidthMobile : this.minimumColumnWidth;
                }
              }
              else {
                a.realWidth = this.getDimensionWidth(a.width);
              }
            }
            else {
              a.realWidth = bbn.fn.isMobile()
                ? this.defaultColumnWidthMobile
                : this.defaultColumnWidth;
            }
            if (minWidth && (a.realWidth < minWidth)) {
              a.realWidth = minWidth;
            }
            if (maxWidth && (a.realWidth > maxWidth)) {
              a.realWidth = maxWidth;
            }
            if (a.buttons !== undefined) {
              this.colButtons = i;
            }
            if (a.fixed) {
              if ((a.fixed === 'left')
                || ((a.fixed !== 'right') && (this.fixedDefaultSide === 'left'))
              ) {
                if (a.buttons !== undefined) {
                  //colButtons = groupCols[0].cols.length;
                }
                groupCols[0].cols.push(a);
                if (!a.invisible) {
                  groupCols[0].visible++;
                }
              }
              else {
                if (a.buttons !== undefined) {
                  //colButtons = groupCols[0].cols.length + groupCols[1].cols.length + groupCols[2].cols.length;
                }
                groupCols[2].cols.push(a);
                if (!a.invisible) {
                  groupCols[2].visible++;
                }
              }
            }
            else {
              if (groupCols[1].cols.length) {
                leftWidth += groupCols[1].cols[groupCols[1].cols.length-1].realWidth;
              }

              a.leftWidth = leftWidth;
              if (a.buttons !== undefined) {
                //colButtons = groupCols[0].cols.length + groupCols[1].cols.length;
              }
              groupCols[1].cols.push(a);
              if (!a.invisible) {
                groupCols[1].visible++;
              }
            }
          }
        }

        return a;
      });
      let firstGroup = groupCols[0].visible ? 0 : 1;
      if (this.selection) {
        let o = {
          isExpander: false,
          isSelection: true,
          label: ' ',
          filterable: false,
          width: 40,
          realWidth: 40
        };
        if (firstGroup === 0) {
          o.fixed = true;
          o.isLeft = true;
        }
        groupCols[firstGroup].cols.unshift(o);
        groupCols[firstGroup].visible++;
      }
      if (this.hasExpander) {
        let o = {
          isExpander: true,
          isSelection: false,
          label: ' ',
          filterable: false,
          width: 30,
          realWidth: 30
        };
        if (firstGroup === 0) {
          o.fixed = true;
          o.isLeft = true;
        }
        groupCols[firstGroup].cols.unshift(o);
        groupCols[firstGroup].visible++;
      }

      bbn.fn.each(groupCols, a => {
        a.sum = bbn.fn.sum(a.cols, 'realWidth');
      });
      bbn.fn.warning("BEFORE")
      this.cols = cols;
      this.groupCols = groupCols;
      this.$nextTick(() => {
        if (!this.hasScrollX) {
          this.updateShownCols();
        }
      });
      bbn.fn.warning("AFTER")
    },
    /**
     * Returns the columns configuration.
     * @method getColumnsConfig
     * @returns {Array}
     */
    getColumnsConfig() {
      return JSON.parse(JSON.stringify(this.cols));
    },
    /**
     * Adds the given column to table's configuration
     * @method addColumn
     * @param {Object} obj
     */
    addColumn(obj) {
      if (!obj) {
        return;
      }

      let def = this.defaultObject();
      if (obj.aggregate && !Array.isArray(obj.aggregate)) {
        obj.aggregate = [obj.aggregate];
      }
      for (let n in obj) {
        def[bbn.fn.camelize(n)] = obj[n];
      }
      if (obj.buttons) {
        def.filterable = false;
        def.sortable = false;
      }

      this.cols.push(def);
    },
    getColOptions(data, col, idx) {
      if (col.options) {
        return bbn.fn.isFunction(col.options) ?
          col.options(data, col, idx) : col.options;
      }

      return {};
    },

  },
  watch: {
    tmpFirstColumnVisible(v) {
      setTimeout(() => {
        if ((v >= this.tmpFirstColumnVisible) && (v <= this.tmpLastColumnVisible)) {
          this.firstColumnVisible = this.tmpFirstColumnVisible;
          this.lastColumnVisible = this.tmpLastColumnVisible;
          this.updateShownCols();
        }
      }, 100);
    },
    columns() {
      bbn.fn.log("WATCH COLUMNS");
      if (this.ready) {
        this.cols.splice(0, this.cols.length);
        if (this.columns.length) {
          bbn.fn.each(this.columns, a => this.addColumn(a))
        }
        if (this.defaultConfig.invisible === null) {
          let tmp = [];
          let initColumn = [];
          bbn.fn.each(this.cols, (a, i) => {
            if (a.invisible) {
              tmp.push(a.field || i);
            }
            else if (initColumn.length <= 10) {
              initColumn.push(i);
            }
          });
          this.defaultConfig.invisible = tmp;
        }

        this.init();
      }
    },

  }
}

