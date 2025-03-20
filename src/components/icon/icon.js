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
    name: 'bbn-icon',
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
      min: {
        type: Number,
        default: 16
      },
      content: {
        type: String
      },
      loading: {
        type: Boolean,
        default: false
      },
      width: {
        type: [String, Number]
      },
      height: {
        type: [String, Number]
      },
      size: {
        type: [String, Number]
      }
    },
    data(){
      return {
        isLoading: this.loading || false,
        isNotFound: false,
        defaultSize: null
      }
    },
    computed: {
      isImage() {
        return this.content && !this.content.indexOf('data:image/');
      },
      isSVG() {
        return this.content && !this.content.trim().indexOf('<svg');
      },
      currentSize() {
        let sz = null;
        if (this.size) {
          sz = this.size;
          if (bbn.fn.isNumber(sz)) {
            if (sz < this.min) {
              sz = this.min;
            }
            sz += 'px';
          }
        }

        return sz;
      },
      currentStyle() {
        let o = {
          background: 'none',
          width: 'auto',
          height: 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
        };
        if (this.currentSize) {
          o.minWidth = this.currentSize;
        }
        else {
          o.minWidth = this.min + 'px';
        }

        return o;
      }
    },
    mounted() {
      if (!this.width && !this.height) {
        const def = parseFloat(getComputedStyle(this.$el.parentNode)['font-size']);
        this.defaultSize = (def < this.min ? this.min : def) + 'px';
      }
    }

  };

import cpHtml from './icon.html';
import cpStyle from './icon.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/icon.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-icon',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
