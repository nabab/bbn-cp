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
    let o = {
      table: this.closest('bbn-table'),
      to: null,
      rowHeight: null,
    };

    return o;
  },
  computed: {
    selected: {
      get() {
        if (this.table.selection) {
          const i = this.table.uid ? this.source.data[this.table.uid] : this.source.index;
          return this.table.currentSelected.includes(i);
        }

        return false;
      },
      set(v) {
        if (this.table.selection) {
          const i = this.table.uid ? this.source.data[this.table.uid] : this.source.index;
          if (v) {
            if (!this.table.currentSelected.includes(i)) {
              this.table.currentSelected.push(i);
            }
          }
          else {
            const idx = this.table.currentSelected.indexOf(i);
            if (idx > -1) {
              this.table.currentSelected.splice(idx, 1);
            }
          }
        }
      }
    },
    cellClass() {
      const cls = [{
        'bbn-alt': this.alt,
      }];

      if (this.table?.trClass) {
        if (bbn.fn.isFunction(this.table.trClass)) {
          cls.push(this.table.trClass(this.source.data));
        }
        else {
          cls.push(this.trClass);
        }
      }

      return cls;
    },
    cellStyle() {
      let res = '';
      if (this.table?.trStyle) {
        if (bbn.fn.isFunction(this.table.trStyle)) {
          res = this.table.trStyle(this.source.data);
        }

        res = this.table.trStyle;
      }

      return res;
    },
  },
  methods: {
    setReady() {
      let ready = this.table.$refs.scroll.isYInScroll(this.$el, this.table.clientHeight);
      if (ready !== this.ready) {
        this.ready = ready;
      }
    },
  },
  watch: {
    ready(v) {
      if (!v) {
        const h = this.getBoundingClientRect().height;
        if (h > this.rowHeight) {
          this.rowHeight = h;
        }
      }
    }
  },
  mounted() {
    if (!this.table.scrollable) {
      this.ready = true;
    }
    else {
      this.$nextTick(this.setReady);
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
