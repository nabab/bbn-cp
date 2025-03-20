export default {
  methods: {
    /**
     * Returns true if the given column is sorted.
     * @method isSorted
     * @param {Object} col
     */
    isSorted(col) {
      if (
        this.sortable &&
        (col.sortable !== false) &&
        !col.buttons &&
        col.field
      ) {
        let idx = bbn.fn.search(this.currentOrder, {
          field: col.field
        });
        if (idx > -1) {
          return this.currentOrder[idx];
        }
      }
      return false;
    },
    /**
     * Sorts the given column.
     * @method sort
     * @param {Object} col
     * @fires updateData
     */
    sort(col) {
      if (
        !this.isLoading &&
        this.sortable &&
        col.field &&
        (col.sortable !== false)
      ) {
        let f = col.field,
          pos = bbn.fn.search(this.currentOrder, {
            field: f
          });
        if (pos > -1) {
          if (this.currentOrder[pos].dir.toUpperCase() === 'ASC') {
            this.currentOrder[pos].dir = 'DESC';
          } else {
            this.currentOrder.splice(0, this.currentOrder.length);
          }
        } else {
          this.currentOrder.splice(0, this.currentOrder.length);
          this.currentOrder.push({
            field: f,
            dir: 'ASC'
          });
        }
        if (this.isAjax) {
          this.updateData();
        }
      }
    },

  }
}

