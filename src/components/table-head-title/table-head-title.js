/**
 * @file bbn-table component
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.cell
   */
  mixins: [
    bbn.cp.mixins.componentInside
  ],
  tag: 'th',
  props: {
    source: {
      type: Object
    },
    dead: {
      type: Boolean,
      default: false
    },
    groupIndex: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    const table = this.$origin;
    return {
      table,
      to: null,
      observer: null,
      visible: null,
      ready: false,
    }
  },
  computed: {
    groupCol() {
      return this.table.groupCols[this.groupIndex]
    },
    realIndex() {
      let num = this.index;
      for (let i = 0; i < this.groupIndex; i++) {
        num += this.table.groupCols[i].cols.length;
      }
      return num;
    }
  },
  watch: {
    ready() {
      this.setReady();
    }
  },
  mounted() {
    if (this.table.scrollIntersection) {
      this.table.scrollIntersection.observe(this);
    }
  },
  beforeDestroy(e) {
    if (this.table.scrollIntersection) {
      this.table.scrollIntersection.unobserve(this);
    }
  },
};

import cpHtml from './table-head-title.html';
import cpStyle from './table-head-title.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-table-head-title',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
