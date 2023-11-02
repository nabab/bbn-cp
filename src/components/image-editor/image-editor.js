/**
 * @file bbn-markdown component
 *
 * @description bbn-markdown is a component that allows you to easily format the Markdown text.
 * It's an editor that enable you to create textual content, to insert lists, image management and hyperlinks.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 */

import tui from 'tui-image-editor';
//Markdown editor use simpleMDe
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic 
   */
  mixins: [bbn.cp.mixins.basic],
  props: {
    /**
     * @prop {String} source²
     */
    source: {
      type: String
    },
    /**
     * @prop {String} name
     */
    name: {
      type: String
    }
  },
  data(){
    return {
      widget: null
    };
  },
  methods: {
  },
  watch: {
  },
  mounted(){
    this.widget = new tui.ImageEditor(this.$refs.element, {
      includeUI: {
        locale: 'fr',
        initMenu: 'filter',
        menuBarPosition: 'bottom',
      },
      cssMaxWidth: 700,
      cssMaxHeight: 500,
    });
    this.widget.loadImageFromURL(this.source, this.name);

    this.ready = true;
  },

};

import cpHtml from './image-editor.html';
import cpStyle from './image-editor.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./image-editor.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-image-editor',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
