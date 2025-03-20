export default {
  methods: {
    /**
     * Prepares the data to export the table to CSV.
     * @method _export
     * @returns {Array}
     */
    _export() {
      let span = window.document.createElement('span');
      let cols = {};
      let res = [];
      bbn.fn.each(this.currentData, a => {
        let o = bbn.fn.clone(a.data);
        let row = [];
        bbn.fn.each(this.cols, b => {
          if (!b.invisible && !b.buttons && b.field) {
            const val = this.getProp(o, b.field);
            if (typeof val === 'string') {
              span.innerHTML = val;
              row.push(span.textContent.trim());
            } else {
              row.push(val);
            }
          }
        });
        res.push(row);
      });
      return res;
    },
    /**
     * Exports to csv and download the given filename.
     * @method exportCSV
     * @param {String} filename
     * @param {String} valSep
     * @param {String} rowSep
     * @param {String} valEsc
     * @fires _export
     */
    exportCSV(filename, valSep, rowSep, valEsc) {
      let data = bbn.fn.toCSV(this._export(), valSep, rowSep, valEsc);
      if (!filename) {
        filename = 'export-' + bbn.fn.dateSQL().replace('/:/g', '-') + '.csv';
      }
      bbn.fn.downloadContent(filename, data, 'csv');
    },
    /**
     * Exports to excel.
     * @method exportExcel
     * @fires getPostData
     */
    exportExcel() {
      if (this.isAjax && !this.isLoading) {
        if (this.pageable) {
          this.getPopup({
            label: bbn._('Warning'),
            content: '<div class="bbn-padding bbn-c">' + bbn._('What do you want to export?') + '</div>',
            buttons: [{
              label: bbn._('Cancel'),
              action: () => {
                this.getPopup().close();
              }
            }, {
              label: bbn._('This view'),
              action: () => {
                bbn.fn.postOut(this.source, this.getExcelPostData(true));
                this.getPopup().close();
              }
            }, {
              label: bbn._('All'),
              action: () => {
                bbn.fn.postOut(this.source, this.getExcelPostData());
                this.getPopup().close();
              }
            }],
            width: 300
          });
        }
        else {
          this.confirm(bbn._('Are you sure you want to export to Excel?'), () => {
            bbn.fn.postOut(this.source, this.getExcelPostData());
          });
        }
      }
    },
    /**
     * @method getExcelPostData
     * @param {Boolean} currentView 
     * @returns {Object}
     */
    getExcelPostData(currentView) {
      let cols = bbn.fn.filter(bbn.fn.extend(true, [], this.cols), c => {
        return (this.shownFields.includes(c.field) && ((c.export === undefined) || !c.export.excluded)) || (c.export && !c.export.excluded);
      }),
        data = {
          excel: {
            fields: bbn.fn.map(cols, c => {
              return {
                field: c.field,
                // check if is present a custom 'title' on column's export property
                title: c.export?.title || (c.label || ''),
                // check if is present a custom 'type' on column's export property
                type: c.export?.type || (c.type || 'string'),
                hidden: (c.export?.hidden !== undefined) ? c.export.hidden : (!this.shownFields.includes(c.field) ? 1 : 0),
                format: c.export?.format || null
              }
            })
          },
          // the current fields
          fields: bbn.fn.map(cols.slice(), f => {
            return f.field
          }),
          limit: currentView ? this.currentLimit : 50000,
          start: currentView ? this.start : 0,
          data: this.getPostData()
        };
      if (this.sortable) {
        data.order = this.currentOrder;
      }
      if (this.isFilterable) {
        data.filters = this.currentFilters;
      }
      return data;
    },

  }
}

