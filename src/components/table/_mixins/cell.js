export default {
  methods: {
    cellClass(col, row) {
      bbn.fn.log("CELL CLASS", col, row);
      const cls = [{
        [this.$options.name]: true,
        'bbn-table-fixed-cell': !!col.fixed,
        'bbn-table-fixed-cell-left': col.isLeft,
        'bbn-table-fixed-cell-left-last': col.isLeft && !this.currentColumns[col.index+1]?.isLeft,
        'bbn-table-fixed-cell-right': col.isRight,
        'bbn-spadding': !col.component,
        'bbn-table-cell-first': !col.isLeft && !col.isRight && ((col.index === 0) || (!!this.currentColumns[this.index-1]?.isLeft)),
      }];

      if (col.cls) {
        cls.push(bbn.fn.isFunction(col.cls) ? col.cls(row, this.index, col) : col.cls);
      }

      return cls;
    },
    onCellCreated(data, col, rowIndex, index) {
      this.$on('click', e => {
        this.clickCell(col, index, rowIndex);
      })
      this.$on('doubleclick', e => {
        this.dbclickCell(col, data, rowIndex);
      })
      this.$on('focusin', e => {
        this.focusin(rowIndex, e, index);
      })
    },
  },
}

