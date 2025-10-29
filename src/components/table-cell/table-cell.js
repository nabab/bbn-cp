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
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-table-cell',
  definition: cpDef,
  template: cpHtml,
  //lang: cpLang
};
