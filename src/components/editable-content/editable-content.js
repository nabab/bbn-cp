/**
 * @file bbn-icon component
 *
 * @description 
 *
 * @copyright BBN Solutions
 *
 * @author Mirko Argentino
 */
const cpDef = {
    name: 'bbn-editable-content',
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.field
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.input, 
      bbn.cp.mixins.field
    ],
    props: {
      /**
       * @prop {String} ['nf nf-fa-edit'] editIcon
       */
      editIcon: {
        type: String,
        default: 'nf nf-fa-edit'
      },
      /**
       * @prop {String} ['nf nf-fa-save'] saveIcon
       */
      saveIcon: {
        type: String,
        default: 'nf nf-fa-save'
      },
      /**
       * @prop {String} ['nf nf-mdi-cancel'] cancelIcon
       */
      cancelIcon: {
        type: String,
        default: 'nf nf-mdi-cancel'
      },
      /**
       * @prop {(String|Function)} help
       */
      help: {
        type: [String, Function]
      },
      /**
       * @prop {String} type
       */
      type: {
        type: String
      },
      /**
       * @prop {} editor
       */
      editor: {

      },
      /**
       * @prop {} editorOptions
       */
      editorOptions: {

      },
      /**
       * @prop {Boolean} [true] editable
       */
      editable: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        isEditing: false,
        currentValue: this.value
      }
    },
    methods: {
      save() {
        this.emitInput(this.currentValue);
        this.isEditing = false;
      },
      cancel() {
        this.emitInput(this.originalValue);
        this.currentValue = this.value;
        this.isEditing = false;
      }
    }
  };

import cpHtml from './editable-content.html';
import cpStyle from './editable-content.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./editable-content.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-editable-content',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
