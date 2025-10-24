export default {
  props: {
    alt: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    selection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      rowsDesc: [],
      rowHeight: null,
      intersectionTimeout: null,
    };

    return o;
  },
  methods: {
    isSelected(row) {
      if (this.selection) {
        const i = this.uid ? row.data[this.uid] : row.index;
        return this.currentSelected.includes(i);
      }
      return false;
    },
    setSelected(row, v) {
      if (this.selection) {
        const i = this.uid ? row.data[this.uid] : row.index;
        if (v) {
          if (!this.currentSelected.includes(i)) {
            this.currentSelected.push(i);
          }
        }
        else {
          const idx = this.currentSelected.indexOf(i);
          if (idx > -1) {
            this.currentSelected.splice(idx, 1);
          }
        }
      }
    },
    rowClass(row, i) {
      const cls = [];
      if (i % 2) {
        if (this.table.alt) {
          cls.push('bbn-alt');
        }
      }

      if (this.selection && this.isSelected(row)) {
        cls.push('bbn-row-selected');
      }

      if (this.trClass) {
        if (bbn.fn.isFunction(this.trClass)) {
          cls.push(this.trClass(row.data));
        }
        else {
          cls.push(this.trClass);
        }
      }

      return cls;
    },
    rowStyle(row) {
      let res = '';
      if (this.trStyle) {
        if (bbn.fn.isFunction(this.trStyle)) {
          res = this.trStyle(row.data);
        }
        else {
          res = this.trStyle;
        }
      }

      return res;
    },
    intersectionEnter() {
      clearTimeout(this.intersectionTimeout);
      this.intersectionTimeout = setTimeout(() => {
        this.table.visibleRows.push(this);
        if (this.ready) {
          if (this.$namespaces.updateSequences === 'method') {
            this.updateSequences();
          }
        }
        else {
          this.setReady();
        }
      }, 250);

    },
    intersectionExit() {
      clearTimeout(this.intersectionTimeout);
      const idx = this.table.visibleRows.indexOf(this);
      if (idx > -1) {
        this.table.visibleRows.splice(idx, 1);
      }
    },
    setReady() {
      let ready = this.table.$refs.scroll.isYInScroll(this.$el, 0);
      if (ready !== this.ready) {
        this.ready = ready;
      }
    },
  },
  watch: {
    ready(v) {
      if (v) {
        const h = this.getBoundingClientRect().height;
        if (h > this.rowHeight) {
          this.rowHeight = h;
        }
      }
    }
  },
  mounted() {
    if (!this.table.scrollable || this.table.groupable) {
      this.ready = true;
    }
    else {
      setTimeout(() => this.setReady(), 50);
    }

    if (this.table.scrollIntersection) {
      this.table.scrollIntersection.observe(this);
    }

    if (this.table.rowSizeObserver) {
      this.table.rowSizeObserver.observe(this);
    }
  },
  beforeDestroy() {
    if (this.table.scrollIntersection) {
      this.table.scrollIntersection.unobserve(this);
    }
    if (this.table.rowSizeObserver) {
      this.table.rowSizeObserver.unobserve(this);
    }
  },
};
