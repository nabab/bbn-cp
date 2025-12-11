export default {
  data() {
    return {
      allRowsChecked: false,
      currentMessage: false,
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
        return this.uid ? bbn.fn.getField(this.currentData, 'data', `data.${this.uid}`, a) : bbn.fn.getField(this.currentData, 'data', 'index', a);
      })
    },
  },
  methods: {
    isSelectable(row) {
      return this.selection && ((typeof this.selection !== 'function') || this.selection(row));
    },
    checkAll() {
      this.currentMessage = bbn._("Selecting all rows...");
      this.$nextTick(() => {
        bbn.fn.each(this.items, a => {
          if (this.isSelectable(a) && !this.currentSelected.includes(this.uid ? a.data[this.uid] : a.index)) {
            this.checkSelection(a.index, true);
          }
        });
        this.$nextTick(() => {
          this.currentMessage = false;
        })
      })
    },
    uncheckAll() {
      this.currentMessage = bbn._("Unselecting all rows...")
      this.$nextTick(() => {
        bbn.fn.each(this.items, a => {
          if (this.isSelectable(a) && this.currentSelected.includes(this.uid ? a.data[this.uid] : a.index)) {
            this.checkSelection(a.index, false);
          }
        })
        this.$nextTick(() => {
          this.currentMessage = false;
        })
      })
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
          if (state && (idx === -1)) {
            this.currentSelected.push(this.uid ? this.currentData[row.index].data[this.uid] : row.index);
            this.$emit('select', row.data);
            toggled = true;
          }
          else if (!state && (idx > -1)) {
            this.currentSelected.splice(idx, 1);
            this.$emit('unselect', row.data);
            toggled = true;
          }
          if (toggled) {
            this.$emit('toggle', isSelected, row.data);
          }
        }
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

