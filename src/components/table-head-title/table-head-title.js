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
    bbn.cp.mixins.basic,
    bbn.cp.mixins.componentInside
  ],
  tag: 'th',
  props: {
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
      observer: null
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
};

import cpHtml from './table-head-title.html';
import cpStyle from './table-head-title.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-head-title.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-head-title',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
