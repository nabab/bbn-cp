/**
 * @file bbn-tree-oinput component
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 * 
 * @created 15/02/2017
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.input
   * @mixin bbn.cp.mixins.events
   */
  mixins: 
  [
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.input, 
    bbn.cp.mixins.events
  ],
  props: {
    /**
     * @prop {Array} extensions
     */
    extensions:{
      type: Array,
      // default: ["dnd"]
    },
    /**
     * @prop {Number} autoExpandMS
     */
    autoExpandMS:{
      type: Number
    },
    /**
     * @prop {(String|Array|Object)} source
     */
    source: {
      type: [String, Array, Object]
    },
    /**
     * @prop {Object} [extensions: ['dnd'], autoExpandedMS: 400, source: [], disabled: false] cfg
     */
    cfg: {
      type: Object,
      default(){
        return {
          extensions: ["dnd"],
          auoExpandedMS: 400,
          source: [],
          disabled: false
        };
      }
    }
  },
  data(){
    return {
      widgetName: "fancytree",
      ivalue: this.currentSelection ? this.currentSelection : ''
    };
  },
  methods: {
  },
  mounted(){
    this.ready = true;
  }
};

import cpHtml from './tree-input.html';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/tree-input.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-tree-input',
  definition: cpDef,
  template: cpHtml,
  lang: cpLang
};
