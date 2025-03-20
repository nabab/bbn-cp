export default {
  data() {
    return {
      allRowsChecked: false,
    }
  },
  computed: {
    /**
     * The array of selected values if the table is selectable.
     * @computed selectedValues
     * @returns {Array}
     */
    selectedValues() {
      return this.currentSelected.map(a => {
        return this.uid ? this.currentData[a].data[this.uid] : this.currentData[a].data;
      })
    },

  },
  methods: {
    checkAll() {
      this.getRef('table').querySelectorAll(':scope > tbody > tr > td[is="bbn-table-cell-selector"] bbn-checkbox').forEach(a => a.check());
    },
    uncheckAll() {
      this.getRef('table').querySelectorAll(':scope > tbody > tr > td[is="bbn-table-cell-selector"] bbn-checkbox').forEach(a => a.uncheck());
    },
    /**
     * Returns true if the given index is selected.
     * @method isSelected
     * @param {Number} index
     * @returns {Boolean}
     */
    isSelected(index) {
      return this.selection
        && ((!this.uid && this.currentSelected.includes(index))
          || (this.uid && this.currentSelected.includes(this.currentData[index].data[this.uid]))
        );
    },
    /**
     * Emits 'select',  'unselect' or 'toggle' at change of checkbox of the row in a selectable table.
     * @method checkSelection
     * @param {Number}  index
     * @param {Boolean} index
     * @emit unselect
     * @emit select
     * @emit toggle
     */
    checkSelection(index, state) {
      if (this.cancelSelection) {
        this.cancelSelection = false;
        return;
      }


      // Obliged to add this otherwise there are 2 changes events canceling each other
      if (!this.isCheckingSelection) {
        this.isCheckingSelection = [];
      }

      if (!this.isCheckingSelection.includes(index)) {
        this.isCheckingSelection.push(index);
        const row = this.items[index];
        if (row) {
          if (this.groupable && row.group) {
            if (row.expanded) {
              bbn.fn.fori((d, i) => {
                if (d && d.selection && (this.getProp(d.data, this.cols[this.group].field) === row.value)) {
                  this.checkSelection(i, state)
                }
              }, this.items, index + row.num, index + 1)
            }
          }
          else if (row.selection ||
            (this.selection && (!bbn.fn.isFunction(this.selection) || this.selection(row)))
          ) {
            const idx = this.currentSelected.indexOf(this.uid ? this.currentData[row.index].data[this.uid] : row.index);
            const isSelected = !!state;
            let toggled = false;
            if (state && (idx > -1)) {
              this.$emit('select', row.data);
              toggled = true;
            }
            else if (!state && (idx === -1)) {
              this.$emit('unselect', row.data);
              toggled = true;
            }
            /* if (idx > -1) {
              if ([undefined, false].includes(state)) {
                toggled = true;
                this.$emit('unselect', row.data);
                this.currentSelected.splice(idx, 1);
              }
            }
            else if ([undefined, true].includes(state)) {
              toggled = true;
              this.$emit('select', row.data);
              this.currentSelected.push(this.uid ? this.currentData[row.index].data[this.uid] : row.index);
              isSelected = true;
            } */

            if (toggled) {
              this.$emit('toggle', isSelected, row.data);
            }
          }
        }

        this.$nextTick(() => {
          this.isCheckingSelection.splice(this.isCheckingSelection.indexOf(index), 1);
        })
      }
    },
    beforeSelect(index, ev, isSelected) {
      this.$emit('beforeselect', ev, index, this.items[index], isSelected);
    },
  },
  watch: {
    allRowsChecked(v) {
      if (v) {
        this.checkAll();
      }
      else if (!this.isTableDataUpdating) {
        this.uncheckAll();
      }
    },

  }
}

