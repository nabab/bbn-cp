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
    mode: {
      type: String,
      default: 'buttons'
    }
  },
  data() {
  },
  methods: {
    onButtonsMenuSelect(item, data, col, i, ev, floater) {
      ev.preventDefault();
      this.table._execCommand(item, data, col, i, ev);
      floater.closeAll();
    },

  }
};

import cpHtml from './table-cell-buttons.html';
import cpStyle from './table-cell-buttons.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-cell-buttons.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-cell-buttons',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
