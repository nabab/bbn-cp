/**
 * @file bbn-code component
 *
 * @description bbn-code is a text editor.
 * It specializes in editing the code of a supported language. 
 * Various tools are provided to the users, which can be configured to their liking.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
    },

    data(){
      return {
        /**
         * @todo not used
         */
        widget: null,
        /**
         * True if the editor is fullscreen.
         * @data {Boolan} [false] isFullScreen
         */
        isVisible: false
      };
    },

    computed: {
    },

    methods: {
    },
    /**
     * @event mounted
     * @fires initTern
     * @fires getRef
     * @emit  input
     */
    mounted(){
    },

    watch: {
    }
  };
  
import cpHtml from './map.html';
import cpStyle from './map.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/map.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-map',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
