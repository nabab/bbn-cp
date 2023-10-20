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
        currentContent: this.content || '',
        isLoading: this.loading || false,
        isNotFound: false
      }
    },
    computed: {
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
          o.width = 'auto';
          o.height = 'auto';
          o.maxHeight = '100% !important';
          o.maxWidth = '100% !important';
          o.minWidth = '4rem';
        }

        return o;
      }
    }
  };

import cpHtml from './icon.html';
import cpStyle from './icon.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./icon.${bbn.env.lang}.lang`);
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
