const cell = {
  props: {
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
    const tr = this.closest('tr');
    return {
      table: tr.table,
      tr
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
  methods: {},
  watch: {
  },
  created() {
    this.$on('click', e => {
      this.table.clickCell(this.column, this.rowIndex, this.index);
    })
    this.$on('doubleclick', e => {
      this.table.dbclickCell(this.column, this.rowIndex, this.index, this.source);
    })
    this.$on('focusin', e => {
      this.table.focusin(this.index, e);
    })
  },
};

export default cell;
