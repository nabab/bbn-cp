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
    bbn.cp.mixins.cell
  ],
  tag: 'td',
  props: {
    expander: {}
  },
  data() {
    return {
    }
  },
  computed: {
    expanderRowspan() {
      if (this.isExpanded) {
        if (this.table.isGroupActive) {
          const field = this.table.cols[this.table.group].field;
          const num = bbn.fn.count(this.table.items, {['data.' + field]: this.source[field]});
          if (num) {
            return num + 1;
          }
        }
        else {
          return 2;
        }
      }

      return 1;
    },
    isExpanded(){
      return this.table.isExpanded(this.source, this.table.items[this.rowIndex].index);
    }
  },
  methods: {
    toggleExpanded() {
      this.table.toggleExpanded(this.rowIndex);
    }
  }
};

import cpHtml from './table-cell-expander.html';
import cpStyle from './table-cell-expander.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-cell-expander.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-cell-expander',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
