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
      type: Number
    },
    index: {
      type: Number
    },
  },
  data() {
    return {
      table: this.$origin,
      to: null,
      observer: null
    }
  },
};

import cpHtml from './table-head-group.html';
import cpStyle from './table-head-group.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-head-group.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-head-group',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
