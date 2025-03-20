export default {
  data() {
    return {
      /**
       * @data {Boolean} [false] isTableDataUpdating Will be set to true during the whole update process
       */
      isTableDataUpdating: false,
      /**
       * @data {Boolean} [false] _observerReceived
       */
      _observerReceived: false,
    }
  },
  computed: {
    /**
     * Return an array of objects containing the data of the row and other information about the current view of the table.
     * @computed items
     * @fires _checkConditionsOnValue
     * @fires expandedValues
     * @fires isExpanded
     * @returns {Array}
     */
    items() {
      if (!this.cols.length) {
        return [];
      }
      // The final result
      const cp = this;
      let res = [],
        isGroup = this.groupable && (this.group !== false) && this.cols[this.group] && this.cols[this.group].field,
        groupField = isGroup ? this.cols[this.group].field : false,
        // The group value will change each time a row has a different value on the group's column
        currentGroupValue,
        /* @todo Not sure of what it does ! */
        currentLink,
        // the data is put in a new array with its original index
        o,
        rowIndex = 0,
        end = this.pageable ? this.currentLimit : this.currentData.length,
        aggregates = {},
        aggregateModes = [],
        aggIndex = 0,
        i = 0,
        data = this.filteredData;
      // Aggregated
      // Paging locally
      if (this.pageable && (!this.isAjax || !this.serverPaging)) {
        i = this.start;
        end = this.start + this.currentLimit > data.length ? data.length : this.start + this.currentLimit;
      }
      // Grouping (and sorting) locally
      let pos;
      if (
        isGroup &&
        ((this.isAjax && this.serverGrouping) || (!this.isAjax && this.localGrouping)) &&
        ((pos = bbn.fn.search(this.currentOrder, {
          field: this.cols[this.group].field
        })) !== 0)
      ) {
        // First ordering the data
        let orders = [{
          field: this.cols[this.group].field,
          dir: (pos > 0 ? this.currentOrder[pos].dir : 'asc')
        }];
        if (this.sortable && this.currentOrder.length) {
          orders = orders.concat(JSON.parse(JSON.stringify(this.currentOrder)))
        }
        data = bbn.fn.multiorder(data, orders.map(item => {
          item.field = 'data.' + item.field;
          return item;
        }));
      }
      // Sorting locally
      else if (this.sortable && this.currentOrder.length && (!this.serverSorting || !this.isAjax)) {
        // If there is a source, we sort based on the text (not the value), so we replace temporary the values
        // with the text + a boundary + the value just the time of sorting
        if (bbn.fn.count(this.cols, {
          source: undefined
        }, '!==')) {
          /** @var will contain the original value of the column to reset it once the array is sorted */
          let tmpData = {};
          bbn.fn.each(this.cols, col => {
            if (col.source && col.field) {
              tmpData[col.field] = {};
              bbn.fn.each(data, d => {
                tmpData[col.field][d.index] = this.getProp(d.data, col.field);
                //d.data[col.field] = d.data[col.field] ? bbn.fn.getField(col.source, col.sourceText ? col.sourceText : 'text', col.sourceValue ? col.sourceValue : 'value', d.data[col.field]) || '' : '';
              })
            }
          });
          data = bbn.fn.multiorder(data, JSON.parse(JSON.stringify(this.currentOrder)).map(item => {
            item.field = 'data.' + item.field;
            return item;
          }));
          bbn.fn.each(this.cols, col => {
            if (col.source && col.field) {
              bbn.fn.each(data, (d, i) => {
                //d.data[col.field] = tmpData[col.field][d.index];
              });
            }
          });
        } else {
          data = bbn.fn.multiorder(data, JSON.parse(JSON.stringify(this.currentOrder)).map(item => {
            item.field = 'data.' + item.field;
            return item;
          }));
        }
      }

      return data;
    },
  },
  methods: {
    isRowVisible(row, index) {
      if (this.isGroupActive) {
        
      }
    },
    /**
     * Refresh the current data set.
     *
     * @method updateData
     * @param withoutOriginal
     * @fires _removeTmp
     * @fires init
     */
    updateData(withoutOriginal) {
      /** Mini reset?? */
      this.isTableDataUpdating = true;
      this.allRowsChecked = false;
      this.currentExpanded = [];
      this.editedRow = false;
      this.editedIndex = false;
      this.$forceUpdate();
      //bbn.fn.log('forceupdate4');
      return bbn.cp.mixins.list.methods.updateData.apply(this, [withoutOriginal]).then(() => {
        if (this.currentData.length && this.selection && this.currentSelected.length && !this.uid) {
          this.currentSelected = [];
        }

        if (this.editable) {
          this.originalData = JSON.parse(JSON.stringify(this.currentData.map(a => {
            return a.data;
          })));
        }

        this.isTableDataUpdating = false;
      });
    },

  },
  watch: {
    /**
     * Updates the data.
     * @watch observerDirty
     * @fires updateData
     */
    observerDirty(v) {
      bbn.fn.log("WATCH OBSDIRY");
      if (v && !this.editedRow) {
        this.confirm(_("The data has been modified outside, do you want to reload it?"), () => {
          this.observerDirty = false;
          this.updateData();
        });
      }
    },
    /**
     * @watch group
     * @fires init
     */
    group() {
      this.currentExpandedValues = [];
      this.currentExpanded = [];
      this.init();
    },
    items(val){
      if (this.expanded && !this.currentExpanded.length) {
        this.currentExpanded = val.map(a => a.index);
      }
    }
  }
}

