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
   * @mixin bbn.cp.mixins.componentInside
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.cell,
    bbn.cp.mixins.componentInside
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

import cpHtml from './table-cell-aggregate.html';
import cpStyle from './table-cell-aggregate.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-table-cell-aggregate',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
