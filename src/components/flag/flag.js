/**
 * @file bbn-icon component
 *
 * @description 
 *
 * @copyright BBN Solutions
 *
 * @author Mirko Argentino
 */
import "flag-icons/css/flag-icons.min.css";

const cpDef = {
    name: 'bbn-flag',
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
      value: {
        type: String,
        required: true
      },
      width: {
        type: [Number, String]
      },
      height: {
        type: [Number, String]
      },
      square: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        dimensions: {
          xs: 16,
          s: 24,
          m: 32,
          l: 48,
          xl: 64,
          xxl: 128,
          xxxl: 256
        }
      }
    },
    computed: {
      currentFlag(){
        let code = this.value;
        if (code === 'en') {
          code = 'gb';
        }
        let st = 'fi fi-' + code;
        if (this.square) {
          st += ' fis';
        }

        return st;
      },
      currentWidth(){
        if (this.width) {
          if (bbn.fn.isNumber(this.width)) {
            return this.width + 'px';
          }

          if (this.dimensions[this.width]) {
            return this.dimensions[this.width] + 'px';
          }

          return this.width;
        }

        if (this.square && this.height) {
          return this.currentHeight;
        }

        if (this.height) {
          return 'auto';
        }

        return this.dimensions.m + 'px';
      },
      currentHeight(){
        if (this.height) {
          if (bbn.fn.isNumber(this.height)) {
            return this.height + 'px';
          }

          if (this.dimensions[this.height]) {
            return this.dimensions[this.height] + 'px';
          }

          return this.height;
        }

        if (this.square) {
          return this.currentWidth;
        }

        return 'auto';
      }
    }
  };

import cpHtml from './flag.html';
import cpStyle from './flag.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/flag.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-flag',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
