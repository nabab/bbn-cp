/**
 * @file bbn-list component
 *
 * @description A fully customizable selectable list.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.list
     * @mixin bbn.cp.mixins.keynav
     * @mixin bbn.cp.mixins.input
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.list, 
      bbn.cp.mixins.keynav, 
      bbn.cp.mixins.input
    ],
    statics() {
      return {isClicked: false};
    },
    props: {
      //@todo not used.
      unique: {
        type: Boolean,
        default: true
      },
      /**
       * The mode of the component.
       * @prop {String} ['free'] mode
       */
      mode: {
        type: String,
        default: "free"
      },
      /**
       * @prop {Boolean} [false] suggest
       */
      suggest: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        
      };
    },
    computed: {
    },
    methods: {
    },
    /**
     * @event mounted
     */
    mounted(){
    }
  };

import cpHtml from './list-input.html';
import cpStyle from './list-input.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/list-input.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-list-input',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
