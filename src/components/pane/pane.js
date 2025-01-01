/**
 * @file the bbn-pane component
 *
 * @description the bbn-pane is a component created to be operated by "bbn-splitter".
 * It represents the portion of the single area of ​​the splitter that will contain what the user desires.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 *
 * @created 15/02/2017
 */

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   */
  mixins: 
  [
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.resizer
  ],
  props: {
    /**
     * @prop {String} ['hidden'] overflow
     */
    overflow: {
      type: String,
      default: 'hidden'
    },
    /**
     * @prop {String} title
     */
    title: {
      type: String
    },
    /**
     * @prop {(String|Number)} [''] size
     */
    size: {
      type: [String, Number],
      default: ''
    },
    /**
     * @prop {Boolean} resizable
     */
    resizable: {
      type: Boolean
    },
    /**
     * @prop {Boolean} collapsible
     */
    collapsible: {
      type: Boolean
    },
    /**
     * @prop {Boolean} [false] collapsed
     */
    collapsed: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] hidden
     */
    hidden: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] scrollable
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Number} [20] min
     */
    min: {
      type: Number,
      default: 20
    },
    /**
     * @prop {Number} [10000] min
     */
    max: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      /**
       * The current collapsed state.
       * @data {Boolean} isCollapsed
       */
      isCollapsed: this.collapsed,
      /**
       * The splitter to which the pane belongs.
       * @data {bbnCp} splitter
       */
      splitter: null
    };
  },
  computed: {
    isResizable() {
      return this.resizable || (this.splitter && this.splitter.resizable && (this.resizable !== false));
    },
    isCollapsible() {
      return this.collapsible || (this.splitter && this.splitter.collapsible && (this.collapsible !== false));
    },
    resizer() {
      if (this.splitter && this.currentConfig.index) {
        return this.splitter.resizers[this.currentConfig.index];
      }

      return null;
    },
    currentConfig() {
      if (!this.splitter) {
        return {};
      }

      return bbn.fn.getRow(this.splitter.panes, {pane: this});
    },
    componentStyle() {
      if (this.currentConfig?.size) {
        return {
          [this.isHorizontal ? 'minWidth' : 'minHeight']: this.currentConfig.size
        }
      }

      return {};

      
    },
    isHorizontal() {
      return this.splitter && this.splitter.isHorizontal;
    },
    prevResizable() {
      if (this.splitter && this.isResizable) {
        let i = this.currentConfig.index - 1;
        while (i >= 0) {
          if (this.splitter.panes[i].pane.isResizable && !this.splitter.panes[i].hidden) {
            return this.splitter.panes[i];
          }

          i--;
        }
      }

      return null;
    }
  },
  watch:{
    collapsed(val){
      this.isCollapsed = val;
      this.splitter.init();
    },
    hidden(val) {
      this.currentHidden = val;
      this.splitter.init();
    }
  },
  created(){
    this.componentClass.push('bbn-resize-emitter');
  },
  mounted(){
    this.splitter = this.closest('bbn-splitter');
    if (this.splitter){
      this.selfEmit(true);
      this.splitter.init();
      setTimeout(() => {
        this.ready = true;
      }, 40)
    }
  },
};


import bbn from '@bbn/bbn';
import cpHtml from './pane.html';
import cpStyle from './pane.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/pane.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-pane',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
