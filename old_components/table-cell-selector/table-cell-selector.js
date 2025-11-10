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
    selected: {
      type: Boolean,
      default: false
    },
    selection: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isSelectable() {
      return this.table.selection && (!bbn.fn.isFunction(this.table.selection) || this.table.selection(this.$origin.source));
    }
  }
};

import cpHtml from './table-cell-selector.html';
import cpStyle from './table-cell-selector.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-table-cell-selector',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
