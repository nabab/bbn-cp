/**
 * @file bbn-tooltip component
 *
 * @description the bbn-tooltip represents a display of information that is related to an element and which is displayed when is focused or clicked.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.toggle
     */
    mixins: [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.toggle
    ],
    props: {
      /**
       * @prop {(String|Object|HTMLElement)} component
       */
      component: {
        type: [String, Object, HTMLElement]
      },
      /**
       * The source of the component tooltip.
       * @prop {Function|Array} source
       */
      source: {
        type: [Function, String]
      },
      /**
       * @prop {String|Boolean} ['nf nf-md-information_outline'] icon
       */
      icon: {
        type: [String, Boolean],
        default: 'nf nf-md-information_outline'
      },
      /**
       * The html tag.
       * @prop {String} ['span'] tag
       */
      tag: {
        type: String,
        default: 'span'
      },
      /**
       * If an element is given this will force the position.
       * @prop {String} ['bottom'] position
       */
      position: {
        type: String,
        validator: p => ['', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'top', 'bottom', 'left', 'right'].includes(p),
        default: 'bottom'
      },
      /**
        * Tooltip offset from the element
        * @prop {Number} [10] distance
      */
      distance: {
        type: Number,
        default: 10
      },
      /**
       * The HTML element to which the floater must bind
       * @prop {HTMLElement} element
       */
      element: {
        type: HTMLElement
      },
      raw: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        /**
         * @data {Boolean} [false] currentVisible
         */
        currentVisible: false,
      };
    },
    methods: {
      /**
       * Returns the items of the component from the source.
       * @method getContent
       * @return {String}
       */
      getContent() {
        let st = bbn.fn.isFunction(this.source) ? this.source() : this.source;
        if (!this.raw && st?.length) {
          st = '<div class="bbn-vxspadding bbn-hspadding">' + st + '</div>';
        }

        return st;
      },
      /**
       * The method called when the floater closes.
       * @method onFloaterClose
       * @emits close
       */
      onFloaterClose(){
        this.currentVisible = false;
        this.$emit('close');
      }
    }
  };

import cpHtml from './tooltip.html';
import cpStyle from './tooltip.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/tooltip.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-tooltip',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
