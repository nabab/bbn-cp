/**
 * @file bbn-grid-configuration component
 *
 * @description 
 *
 * @copyright BBN Solutions
 *
 * @author Mirko Argentino
 */
const cpDef = {
  name: 'bbn-grid-configuration',
  /**
   * @mixin bbn.cp.mixins.basic
   */
  mixins: [bbn.cp.mixins.basic],
  props: {
    rows: {
      type: Number,
      default: 20
    },
    cols: {
      type: Number,
      default: 20
    },
    cellSize: {
      type: [String, Number],
      default: '1rem'
    }
  },
  data() {
    return {
      showWindow: false,
      currentRow: -1,
      currentCol: -1
    }
  },
  computed: {
    realCellSize() {
      return bbn.fn.isNumber(this.cellSize) ? this.cellSize + 'px' : this.cellSize;
    },
    numGrids() {
      return this.cols * this.rows;
    },
    buttonElement() {
      let btn = this.getRef("button");
      if (btn) {
        return btn.$el;
      }
      return null;
    }
  },
  methods: {
    mouseEnter(colidx, rowidx) {
      this.currentRow = rowidx;
      this.currentCol = colidx;
    },
    mouseLeave() {
      this.currentRow = -1;
      this.currentCol = -1;
    }
  }
};


import cpHtml from './grid-configuration.html';
import cpStyle from './grid-configuration.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/grid-configuration.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-grid-configuration',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
