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
  },
  methods: {
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
      if (!!obj.buttons) {
        def.filterable = false;
        def.sortable = false;
      }
      def.ready = false;
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

