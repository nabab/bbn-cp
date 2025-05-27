const cell = {
  props: {
    firstCell: {
      type: Boolean,
      default: false
    },
    rowIndex: {
      type: Number,
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    }
  },
  data() {
    const tr = this.$origin;
    return {
      table: tr.table,
      tr,
      ready: this.column.fixed ? true : false,
    }
  },
  computed: {
    cellClass() {
      const cls = [this.componentClass, {
        [this.$options.name]: true,
        'bbn-table-fixed-cell': !!this.column.fixed,
        'bbn-table-fixed-cell-left': this.column.isLeft,
        'bbn-table-fixed-cell-left-last': this.column.isLeft && !this.table.currentColumns[this.index+1]?.isLeft,
        'bbn-table-fixed-cell-right': this.column.isRight,
        'bbn-spadding': !this.column.component,
        'bbn-table-cell-first': !this.column.isLeft && !this.column.isRight && ((this.index === 0) || (!!this.table.currentColumns[this.index-1].isLeft)),
      }];

      if (this.column.cls) {
        cls.push(bbn.fn.isFunction(this.column.cls) ? this.column.cls(this.source, this.index, this.column) : this.column.cls);
      }

      return cls;
    },
  },
  created() {
    this.$on('click', e => {
      this.table.clickCell(this.column, this.index, this.rowIndex);
    })
    this.$on('doubleclick', e => {
      this.table.dbclickCell(this.column, this.source, this.rowIndex);
    })
    this.$on('focusin', e => {
      this.table.focusin(this.rowIndex, e);
    })
  },
  mounted() {
    if (this.column.fixed) {
      return;
    }

    /*
    if ([this.table.firstColumnVisible, this.table.lastColumnVisible].includes(this.index)) {
      const height = this.getBoundingClientRect().height;
      if (height > this.tr.rowHeight) {
        this.tr.rowHeight = height;
      }
    }
      */
  }
};

export default cell;
