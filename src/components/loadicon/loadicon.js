/**
 * @file bbn-loadicon component
 *
 * @description bbn-loadicon is a simple implementation component, which represents an icon displaying a waiting state.
 *
 * @copyright BBN Solutions
 *
 * @author  BBN Solutions
 * 
 * @created 07/01/2017
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic 
   */
  mixins: [bbn.cp.mixins.basic],
  props: {
    /**
     * The size of the icon container
     * @prop {Number|String} [16] size
     */
    size: {
      type: [Number, String],
      default: 16
    },
  },
  data() {
    return {
      currentSize: bbn.fn.formatSize(this.size)
    }
  },
  watch: {
    size(v) {
      this.currentSize = bbn.fn.formatSize(v);
    }

  }
};

import cpHtml from './loadicon.html';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/loadicon.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-loadicon',
  definition: cpDef,
  template: cpHtml,
  lang: cpLang
};
