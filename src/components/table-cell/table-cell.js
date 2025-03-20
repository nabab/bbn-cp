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
    bbn.cp.mixins.cell,
    bbn.cp.mixins.componentInside
  ],
  tag: 'td',
  props: {
  },
  data() {
    return {
    }
  },
  mounted() {
  }
};

import cpHtml from './table-cell.html';
import cpStyle from './table-cell.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-cell.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-cell',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
