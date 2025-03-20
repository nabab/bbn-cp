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
   * @mixin bbn.cp.mixins.table
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.cell
  ],
  tag: 'td',
  props: {
    col: {
      type: Object
    }
  },
  data() {
    return {
      table: null,
      tr: null
    }
  },
  mounted() {
    this.tr = this.closest('bbn-table-row');
    this.table = this.tr.table;
  }
};

import cpHtml from './table-cell-menu.html';
import cpStyle from './table-cell-menu.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-cell-menu.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-cell-menu',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
