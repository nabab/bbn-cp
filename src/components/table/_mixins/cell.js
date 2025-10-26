export default {
  methods: {
    cellClass(row, col) {
      const cls = [this.componentClass, {
        [this.$options.name]: true,
        'bbn-table-fixed-cell': !!col.fixed,
        'bbn-table-fixed-cell-left': col.isLeft,
        'bbn-table-fixed-cell-left-last': col.isLeft && !this.currentColumns[col.index+1]?.isLeft,
        'bbn-table-fixed-cell-right': col.isRight,
        'bbn-spadding': !col.component,
        'bbn-table-cell-first': !col.isLeft && !col.isRight && ((col.index === 0) || (!!this.currentColumns[this.index-1].isLeft)),
      }];

      if (col.cls) {
        cls.push(bbn.fn.isFunction(col.cls) ? col.cls(this.source, this.index, col) : col.cls);
      }

      return cls;
    },
    onCellCreated() {
      this.$on('click', e => {
        bbn.fn.log(e.target);
        this.clickCell(col, this.index, this.rowIndex);
      })
      this.$on('doubleclick', e => {
        this.dbclickCell(col, this.source, this.rowIndex);
      })
      this.$on('focusin', e => {
        this.focusin(this.rowIndex, e, this.index);
      })
    },
  },
}

