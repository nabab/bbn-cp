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
      table: this.closest('bbn-table')
    };

    return o;
  },
  computed: {
    selected: {
      get() {
        if (this.table.selection) {
          const i = this.table.uid ? this.table.currentData[this.source.index].data[this.table.uid] : this.source.index;
          return this.table.currentSelected.includes(i);
        }

        return false;
      },
      set(v) {
        if (this.table.selection) {
          const i = this.table.uid ? this.table.currentData[this.source.index].data[this.table.uid] : this.source.index;
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
        'bbn-invisible': !this.ready,
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
      if (this.table?.trStyle) {
        if (bbn.fn.isFunction(this.table.trStyle)) {
          return this.table.trStyle(this.source.data);
        }

        return this.table.trStyle;
      }

      return '';
    },
  },
  methods: {},
  watch: {
  },
  mounted() {
    this.ready = true;
  }
};
