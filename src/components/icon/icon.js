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
        return this.content && !this.content.indexOf('<svg');
      },
      currentStyle() {
        let o = {
          background: 'none'
        };
        let props = ['width', 'height'];
        bbn.fn.each(props, (p, i) => {
          if (this[p]) {
            o[p] = this[p];
            if (bbn.fn.isNumber(this[p])) {
              o[p] += 'px';
            }
            if (!this[props[i === 1 ? 0 : 1]]) {
              o[props[i === 1 ? 0 : 1]] = 'auto';
              o['max' + bbn.fn.correctCase(props[i === 1 ? 0 : 1])] = '100%';
            }
          }
        });
        if (!this.width && !this.height) {
          o.height = this.defaultSize || 'auto';
          o.width = 'auto';
        }

        o.minWidth = this.min + 'px';
        return o;
      }
    },
    mounted() {
      if (!this.width && !this.height) {
        this.defaultSize = getComputedStyle(this.$el.parentNode)['font-size'];
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
