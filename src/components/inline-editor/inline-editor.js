/**
 * @file bbn-cms-block component
 * @description bbn-cms-block 
 * @copyright BBN Solutions
 * @author Loredana Bruno
 * @created 09/11/2020.
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.input
    ],
    props: {
      /**
       * @prop {String} value
       */
      value: {
        type: String
      }
    },
    data(){
      return {
      }
    },
    computed: {
    },
    methods: {
      onInlineInput(ev) {
        this.emitInput(ev.target.innerText);
      },
      updateEditor(){
        this.getRef('divEditor').innerText = this.value;
      }
    },
    mounted(){
      this.updateEditor();
    },
    watch: {
      currentValue(v) {
        this.emitInput(v);
        this.updateEditor();
      },
      value(v){
        if (v !== this.currentValue) {
          this.currentValue = v;
        }
      },
    }, 
 
  };

import cpHtml from './inline-editor.html';
import cpStyle from './inline-editor.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./inline-editor.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-inline-editor',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
