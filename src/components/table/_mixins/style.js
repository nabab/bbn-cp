export default {
  props: {
    /**
     * Set to true shows a button at the bottom right of the table that opens a column picker for the table.
     * @prop {Boolean} [false] showable
     */
    showable: {
      type: Boolean,
      default: false
    },
    /**
     * A function to define css class(es) for each row.
     * @prop {Function} trClass
     */
    trClass: {
      type: [String, Function, Object]
    },
    /**
     * A function to define css style(s) for each row.
     * @prop {Function} trStyle
     */
    trStyle: {
      type: [String, Function, Object]
    },
    titleClass: {
      type: [String, Function, Object, Array]
    }
  },
  data() {
    return {
      /**
       * @data {Array} currentHidden
       */
      currentHidden: this.invisible || [],
      /**
       * @data {String} [bbn.fn.randomString().toLowerCase()] cssRuleName
       */
      cssRuleName: bbn.fn.randomString().toLowerCase(),
      /**
       * @data {String} containerPadding
       */
      containerPadding: (bbn.fn.getScrollBarSize() ? bbn.fn.getScrollBarSize() : '0') + 'px',
      /**
       * The current scroll top position.
       * @data {Number} [0] currentScrollTop
       */
      currentScrollTop: 0,
      /**
       * @data {Number} [0] borderLeft
       */
      borderLeft: 0,
      /**
       * @data {Number} [0] borderRight
       */
      borderRight: 0,
      tableStyle: ''
    }
  },
  computed: {
    /**
     * Return the number of visible columns of the table.
     * @computed numVisible
     * @returns {number}
     */
    numVisible() {
      return this.cols.length - bbn.fn.count(this.cols, {
        invisible: true
      }) + (this.hasExpander ? 1 : 0) + (this.selection ? 1 : 0);
    },
  },
  methods: {
    updateStyle() {
      let style = `
.bbn-table table.bbn-table-${this.cssRuleName} {
  width: ${this.totalWidth};
}
.bbn-table table.bbn-table-${this.cssRuleName} > tbody > tr {
  maxHeight: ${this.currentMaxRowHeight};
}
      `;
      const headRowIndex = this.titleGroups ? 2 : 1;
      bbn.fn.each(this.currentColumns, (a, i) => {
        style += `
.bbn-table table.bbn-table-${this.cssRuleName} > thead > tr:nth-of-type(${headRowIndex}) > th:nth-of-type(${i + 1}):not([colspan]),
.bbn-table table.bbn-table-${this.cssRuleName} > tbody > tr > td:nth-of-type(${i + 1}):not([colspan]) {
  width: ${a.realWidth};`;
        if (bbn.fn.isNumber(a.left)) {
          style += `
  left: ${a.left}px;
  position: sticky`;
        }
        else if (bbn.fn.isNumber(a.right)) {
          style += `
  right: ${a.right}px;
  position: sticky`;
        }
        style += `
}`;
      });

      if (style !== this.tableStyle) {
        this.tableStyle = style;
        let css = document.getElementById('bbn-table-' + this.cssRuleName);
        if (!css) {
          css = document.createElement('style');
          css.id = 'bbn-table-' + this.cssRuleName;
          document.head.appendChild(css);
        }

        css.textContent = style;
      }
    },
  },
  watch: {
    /**
     * Forces the update of the component.
     * @watch currentHidden
     * @fires setConfig
     */
    currentHidden: {
      deep: true,
      handler() {
        bbn.fn.log("WATCH HIDDDEN");
        if (this.ready) {
          this.setConfig(true);
          this.$forceUpdate();
          //bbn.fn.log('forceupdate2');
        }
      }
    },
  },
  beforeDestroy() {
    const css = document.getElementById('bbn-table-' + this.cssRuleName);
    if (css) {
      document.head.removeChild(css);
    }
  }
}

