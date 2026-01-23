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
      items: [],
      lastVisibleShown: null
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
    setItems() {
      if (!this.cols.length || !this.currentData?.length) {
        return [];
      }
      // The final result
      let data = this.filteredData.slice().map(a => {
        a.tr = null;
        a.visible = !!(!this.scrollable || (this.groupable && this.isGroupActive));
        a.sequences = this.setSequences();
        return a;
      });
      let isGroup = this.groupable && (this.group !== false) && this.cols[this.group] && this.cols[this.group].field;
      let end = this.pageable ? this.currentLimit : this.currentData.length;
      let i = 0;
      // Aggregated
      // Paging locally
      // Grouping (and sorting) locally
      if (
        isGroup &&
        ((this.isAjax && !this.serverGrouping) || (!this.isAjax && this.localGrouping))
      ) {
        let pos;
        if ((pos = bbn.fn.search(this.currentOrder, {
          field: this.cols[this.group].field
        })) !== 0) {
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
        let group = this.cols[this.group].field;
        let groupIndex = -1;
        let currentGroup;
        data.map(a => {
          if (a.data[group] !== currentGroup) {
            currentGroup = a.data[group];
            groupIndex++;
          }

          a.groupIndex = groupIndex;
        });
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

      if (this.pageable && (!this.isAjax || !this.serverPaging)) {
        i = this.currentStart;
        end = (this.currentStart + this.currentLimit) > data.length ? data.length : (this.currentStart + this.currentLimit);
        data = data.slice(i, end);
      }

      this.items = data;
    },
    /**
     * Refresh the current data set.
     *
     * @method updateData
     * @param withoutOriginal
     * @fires _removeTmp
     * @fires init
     */
    async updateData(withoutOriginal) {
      /** Mini reset?? */

      this.isTableDataUpdating = true;
      this.allRowsChecked = false;
      this.currentExpanded = [];
      this.editedRow = false;
      this.editedIndex = false;
      this.visibleRows.splice(0);
      this.items = [];
      this.numRowsCreated = 0;
      this.rowsShownFinished = !this.scrollable || this.groupable;
      await bbn.cp.nextFrame();
      //bbn.fn.log('forceupdate4');
      await bbn.cp.mixins.list.methods.updateData.apply(this, [withoutOriginal]);
      if (this.currentData?.length && this.selection && this.currentSelected.length && !this.uid) {
        this.currentSelected = [];
      }

      if (this.editable && this.currentData) {
        this.originalData = JSON.parse(JSON.stringify(this.currentData.map(a => {
          return a.data;
        })));
      }

      await bbn.cp.nextFrame();
      this.isTableDataUpdating = false;
      this.setItems();
      if (!this.currentData?.length) {
        this.rowsShownFinished = true;
      }
    }
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
    /*
    items(val){
      if (this.expanded && !this.currentExpanded.length) {
        this.currentExpanded = val.map(a => a.index);
      }
    }*/
  }
}

