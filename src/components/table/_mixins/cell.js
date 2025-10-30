export default {
  data() {
    return {
      menuIconElement: {},
    }
  },
  methods: {
    cellClass(col, row, c) {
      if (!col) {
        col = {};
      }
      //bbn.fn.log(['cellClass', col, row, c]);

      const isExpanded = this.isExpanded(row.data, 'groupIndex' in row ? row.groupIndex : row.index);
      const cls = ['bbn-table-cell', {
        'bbn-table-fixed-cell': !!col.fixed,
        'bbn-table-fixed-cell-left': col.isLeft,
        'bbn-table-fixed-cell-left-last': col.isLeft && !this.currentColumns[col.index+1]?.isLeft,
        'bbn-table-fixed-cell-right': col.isRight,
        'bbn-spadding': !col.component,
        'bbn-table-cell-first': !col.isLeft && !col.isRight && ((col.index === 0) || (!!this.currentColumns[this.index-1]?.isLeft)),
        'bbn-table-cell-expander': col.isExpander,
        'bbn-border-left': col && isExpanded && (col.index === 1),
        'bbn-table-dirty': col ? this.isDirty(col, row.index) : false,
      }];
      if (col.isExpander && isExpanded) {
        cls.push('bbn-table-cell-expander-opened');
      }

      if (col.cls) {
        cls.push(bbn.fn.isFunction(col.cls) ? col.cls(row, this.index, col) : col.cls);
      }

      return cls;
    },
  },
}

