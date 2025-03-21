/**
 * @file bbn-toolbar component
 * @description bbn-toolbar is an horizontal or vertical layout containing elements or components performing actions defined by the user.
 * Very useful for applications, simplifying navigation. Bbn-toolbar is responsive to its container.
 * A separator beetwen elements can be created by giving to empty div inside the toolbar the class 'toolbar-horizontal-separator' or 'toolbar-separator'
 * @copyright BBN Solutions
 * @author BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
      /**
       * The toolbat elements
       * @prop {Array} [[]] source
       */
      source: {
        type: Array,
        default(){
          return []
        }
      },
      /**
       * If true there will be a small margin between buttons
       * @prop {String} [true] slotBefore
       */
       buttonSpace: {
        type: Boolean,
        default: true
      },
      /**
       * If true the content of the slot is placed before the content generated by the configuration.
       * @prop {String} [true] slotBefore
       */
      slotBefore: {
        type: Boolean,
        default: true
      },
      /**
       * The orientation of the bar.
       * @prop {String} ['horizontal'] orientation
       */
      orientation: {
        type: String,
        default: 'horizontal'
      },
      /**
       * The size of the toolbar, height for horizontal toolbar and width for vertical toolbar.
       * @prop {String|Number} size
       */
      size: {
        type: [Number, String],
      },
      /**
       * @prop {Boolean} [false] disabled
       */
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data: function(){
      return {
        /**
         * The real size of the toolbar basing on the props size and orientation.
         * @data {String} [''] currentSize
         */
        currentSize: '',
        /**
         * The style of the toolbar.
         * @data {String} [''] currentStyle
         */
        currentStyle: ''
      }
    },
    computed: {
      hasElementInEnd() {
        if (this.source?.length) {
          for (let i = 0; i < this.source.length; i++) {
            if (this.source[i].end) {
              return true;
            }
          }
        }

        return false;
      },
      hasElementInStart() {
        if (this.source?.length) {
          for (let i = 0; i < this.source.length; i++) {
            if (!this.source[i].end) {
              return true;
            }
          }
        }

        return false;
      },
    },
    methods: {
      updateSlot(){
        if (this.$slots.default) {
          for (let node of this.$slots.default) {
            if (node.classList && (node.bbnSchema?.tag === 'div') && !node.childNodes.length) {
              node.classList.add('bbn-toolbar-separator');
            }
          }
        }
      },
    },
    /**
     * Defines the current size of the bar basing on its style.
     * @event mounted
     */
    mounted() {
      this.updateSlot();
      if ( this.orientation ){
        if ( this.orientation === 'horizontal' ){
          if ( this.size ){
            if ( bbn.fn.isString(this.size) ){
              this.currentSize = this.size;
            }
            else if ( bbn.fn.isNumber(this.size) ){
              this.currentSize = this.size + 'px'
            }
            this.currentStyle += 'height:' + this. currentSize + ';';
          }
          else{
            this.currentStyle += ''
          }
        }
        else if ( this.orientation === 'vertical' ){
          if ( this.size ){
            if ( bbn.fn.isString(this.size) ){
              this.currentSize = this.size;
            }
            else if ( bbn.fn.isNumber(this.size) ){
              this.currentSize = this.size + 'px'
            }
            this.currentStyle += 'width:' + this. currentSize + ';';
          }
          else{
            this.currentStyle += 'width:inherit;'
          }
        }
      }
    }
  };

import cpHtml from './toolbar.html';
import cpStyle from './toolbar.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/toolbar.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-toolbar',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
