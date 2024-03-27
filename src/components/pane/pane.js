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
       * The current resizable state.
       * @data {Boolean} isResizable
       */
      isResizable: this.resizable,
      /**
       * The splitter to which the pane belongs.
       * @data {bbnCp} splitter
       */
      splitter: null
    };
  },
  computed: {
    isHorizontal() {
      return this.splitter && this.splitter.isHorizontal;
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
      if (this.resizable === undefined) {
        this.isResizable = this.splitter.resizable;
      }

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
    cpLang = await import(`./pane.${bbn.env.lang}.lang`);
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
