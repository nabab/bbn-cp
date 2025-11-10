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
    mode: {
      type: String,
      default: 'buttons'
    }
  },
  data() {
    return {
      menuIconElement: null
    }
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
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-table-cell-buttons',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
