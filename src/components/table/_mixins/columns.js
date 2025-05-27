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
    return {
      /**
       * The group of columns.
       * @data {Object} [[{name: 'left',width: 0,visible: 0,cols: []},{name: 'main',width: 0,visible: 0,cols: []},{name: 'right',width: 0,visible: 0,cols: []}]] groupCols
       */
      groupCols: [
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
      ],
      /**
       * @data {Array} [[]] cols
       */
      cols: [],
      firstColumnVisible: 0,
      lastColumnVisible: false,
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
      bbn.fn.each([].concat(this.groupCols), (a, i) => {
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
      return this.currentColumns[this.currentColumns.length - 1].leftWidth + parseInt(this.currentColumns[this.currentColumns.length - 1].realWidth) > (this.clientWidth * 2);
    },
  },
  methods: {
    updateScrollCurrentY() {
      if (this.$refs.scroll?.$refs) {
        this.scrollCurrentY = Math.round(this.$refs.scroll.currentY);
      }
      else {
        this.scrollCurrentY = bbn._("Unknown");
      }
    },
    onScrollX(v) {
      clearTimeout(this.scrollXTimeout);
      this.scrollXTimeout = setTimeout(() => {
        if (Math.abs(v - this.$refs.scroll.currentX) < 50) {
          this.setColumnsVisibility(v);
        }
      }, 100);
    },
    onScrollMounted() {
      this.setScrollVertical();
      this.setColumnsVisibility(0);
      this.scrollIsMounted = true;
      this.$emit('scroll-mounted');
    },
    onColCreate(e) {
      if (e.target.getAttribute('data=group-index') == 1) {
        this.scrollIntersection.observe(e.target);
      }
      else {
        bbn.fn.log(e.target)
      }
    },
    setScrollVertical() {
      if (this.scrollable && !this.scrollIntersection) {
        this.scrollIntersection = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
              if (entry.target instanceof HTMLTableRowElement) {
                entry.target.ready = true;
              }
              else if (entry.target instanceof HTMLTableColElement) {
                bbn.fn.log("COL IN " + entry.target.getAttribute('data-index'), entry.target);
              }
            }
            else {
              if (entry.target instanceof HTMLTableRowElement) {
                entry.target.ready = false;
              }
              else if (entry.target instanceof HTMLTableColElement) {
                bbn.fn.log("COL OUT " + entry.target.getAttribute('data-index'), entry.target);
              }
            }
          });
        }, {
          root: this.$refs.scroll.$refs.scrollContainer,
          rootMargin: this.clientHeight + 'px 0px ' + this.clientHeight + 'px 0px',
          threshold: 0.01
        });
        this.rowSizeObserver = new ResizeObserver(entries => {
          for (const e of entries) {
            if (e.target.ready && (!e.target.rowHeight || (e.target.rowHeight < e.contentRect.height))) {
              e.target.rowHeight = e.contentRect.height;
              bbn.fn.log("ROW " + e.target.index + " SET TO " + e.target.rowHeight);
            }
          }
        });
      }
    },
    setColumnsVisibility(v) {
      if (this.hasScrollX) {
        let first = this.firstColumnVisible;
        let last = this.lastColumnVisible;
        const ov = this.scrollCurrentX || 0;
        const w = this.clientWidth;
        const min = v - 300 > 0 ? v - 300 : 0;
        const max = v + w + 300;
        const cols = this.groupCols[1].cols;
        bbn.fn.warning("setColumnsVisibility");
        bbn.fn.log([v, min, max])
        if (!v) {
          first = 0;
          bbn.fn.each(cols, (a, i) => {
            if (a.leftWidth <= max) {
              last = i;
            }
            else {
              return false;
            }
          });
        }
        else {
          // Scrolling left
          if (v < ov) {
            for (let i = last; i > 0; i--) {
              if ((cols[i].leftWidth + parseInt(cols[i].realWidth)) <= max) {
                last = i;
                break;
              }
            }

            for (let i = Math.min(first, last); i >= 0; i--) {
              if (cols[i].leftWidth < min) {
                first = i + 1;
                break;
              }
            }
          }
          // Scrolling right
          else if (v > ov) {
            for (let i = first; i < cols.length - 1; i++) {
              if (cols[i].leftWidth >= min) {
                first = i;
                break;
              }
            }

            for (let i = Math.max(first, last); i < cols.length - 1; i++) {
              if ((cols[i].leftWidth + parseInt(cols[i].realWidth)) > max) {
                last = i - 1;
                break;
              }
            }
          }
        }

        // Waiting to stop
        if (v !== this.$refs.scroll.currentX) {
          return;
        }

        this.scrollCurrentX = v;
        if ((!v && !ov) || (v > ov)) {
          if (first !== this.firstColumnVisible) {
            this.firstColumnVisible = first;
          }
          if (last !== this.lastColumnVisible) {
            this.lastColumnVisible = last;
          }
        }
        else if (v <= ov) {
          if (last !== this.lastColumnVisible) {
            this.lastColumnVisible = last;
          }
          if (first !== this.firstColumnVisible) {
            this.firstColumnVisible = first;
          }
        }
      }
      else {
        this.firstColumnVisible = 0;
        this.lastColumnVisible = this.groupCols[1].cols.length - 1;
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
      const groupCols = [
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
      let isAggregated = false;
      let aggregatedColIndex = false;
      let aggregatedColTitle = false;
      let aggregatedColumns = [];
      const parentStyle = this.$el.offsetParent ? window.getComputedStyle(this.$el.offsetParent) : {};
      const parentPadding = Math.floor(parseFloat(parentStyle?.paddingLeft || 0) + parseFloat(parentStyle?.paddingRight || 0));
      const parentWidth = Math.floor(this.$el.offsetParent ? this.$el.offsetParent.getBoundingClientRect().width : this.lastKnownCtWidth) - parentPadding;
      this.cols.map(a => {
        a.realWidth = 0;
      });
      let leftWidth = 0;
      bbn.fn.each(this.cols, (a, i) => {
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
      
      this.groupCols.splice(0, this.groupCols.length, ...groupCols);
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

