 /**
  * @file bbn-switch component
  *
  * @description bbn-switch is a component with easy implementation and customization that allows the user to switch between selected and unselected states, defining the value and novalue in the appropriate properties.
  *
  * @copyright BBN Solutions
  *
  * @author BBN Solutions
  *
  * @created 13/02/2017
  */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     */
    mixins: 
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.input
    ],
    props: {
      noRouter: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true gives the component a rounded appearance.
       * @prop {Boolean} [false] radius
       */
      source: {
        type: Array,
        default() {
          return []
        }
      },
      scrollable: {
        type: Boolean,
        default: false
      },
      fill: {
        type: Boolean,
        default: false
      },
      closable: {
        type: Boolean,
        default: true
      },
      limit: {
        type: Number
      },
      maxTitleLength: {
        type: Number,
        default: 35
      },
      position: {
        type: String,
        default: 'top'
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        /**
         * The value of the component.
         * @data {Boolean} valueToSet
         */
        valueToSet: this.value,
        selectedBarColor: null,
        altTextColor: bbn.fn.getCssVar('alt-text')
      }
    },
    computed: {
      parentBackground() {
        const container = this.closest('bbn-container');
        if (container) {
          return container.currentView.bcolor || 'inherit';
        }

        return 'inherit';
      },
      /**
       * Returns the scroll configuration
       * @computed scrollCfg
       * @return {Object}
       */
       scrollCfg(){
        return this.scrollable ? {
          axis: 'x',
          container: true,
          invisible: true
        } : {};
      },
      isVertical(){
        return (this.position === 'left') || (this.position === 'right');
      }
    },
    methods: {
      numProperties: bbn.fn.numProperties,
      /**
       * Returns the title attribute for the tab.
       * 
       * @method getTabTitle
       * @param {Object} obj
       * @return {String|null}
       */
      getTabTitle(obj){
        let t = '';
        if ( obj.notext || (obj.label.length > this.maxTitleLength) ){
          t += obj.label;
        }
        if ( obj.flabel ){
          t += (t.length ? ' - ' : '') + obj.flabel;
        }
        return t || null;
      },
      /**
       * @method scrollTabs
       * @param {String} dir
       * @fires getRef
       */
       scrollTabs(dir){
        let scroll = this.getRef('horizontal-scroll');
        if ( scroll ){
          if ( dir === 'right' ){
            scroll.scrollAfter(true);
          }
          else{
            scroll.scrollBefore(true);
          }
        }
      },
      /**
       * Cuts the given string by 'maxTitleLength' property value
       * @method cutTitle
       * @param {String} title
       * @return {String}
       */
      cutTitle(title){
        return bbn.fn.shorten(title, this.maxTitleLength)
      },
      /**
       * @method getFontColor
       * @param {Number} idx
       * @fires getRef
       * @return {String}
       */
      getFontColor(idx){
        if (bbn.fn.isNumber(idx) && this.source[idx]) {
          if (this.source[idx].fcolor) {
            return this.source[idx].fcolor;
          }
          /*
          let el = this.getRef('title-' + idx);
          if (el) {
            return window.getComputedStyle(el.$el ? el.$el : el).color || '';
          }
          */
        }

        return '';
      },
      getMenuFn(idx) {
        if (this.source[idx]?.idx) {
          idx = this.source[idx].idx;
        }

        if (this.router) {
          return this.router.getMenuFn(idx);
        }
        else if (this.noRouter) {
          //bbn.fn.log("GET MENU FN", idx, this.source[idx].menu);
          return this.source[idx].menu || [];
        }

        return [];
      },
      clickLi(tabIndex) {
        const tab = this.source[tabIndex];
        if ( !tab.disabled && (tabIndex !== this.value)) {
          //bbn.fn.log("TABS CHANGING TO " + tabIndex);
          this.emitInput(tabIndex)
        }
      },
      onScrollReady() {
        //bbn.fn.log("on scroll, ready");
        setTimeout(() => {
          this.updateScroll();
        }, 1500);
      },
      updateScroll() {
        if (this.scrollable) {
          const scroll = this.getRef('horizontal-scroll');
          const tab = this.getRef('tab-' + this.value);
          if (scroll && tab) {
            const x = tab.offsetLeft;
            const scrollX = scroll.currentX || 0;
            if ((x < scrollX) || (x > (scrollX + scroll.offsetWidth))) {
              scroll.scrollSet(tab.offsetLeft, 0, true);
            }
          }
        }
      }
    },
    watch: {
      value(v) {
        this.selectedBarColor = this.source[v] ? this.getFontColor(v) : null;
        this.$nextTick(() => {
          this.updateScroll();
          this.$emit('change', v);
        })
      },
    },
    updated() {
      if (this.source[this.value]) {
        this.selectedBarColor = this.getFontColor(this.value);
      }

    },
    /**
     * Sets the initial state of the component.
     * @event mounted
     * @fires toggle
     * @emits input
     */
    mounted() {
      if (!this.noRouter) {
        this.router = this.closest('bbn-router');
      }

      this.ready = true;
      // If no timeout color won't work
      setTimeout(() => {
        if (this.source[this.value]) {
          this.selectedBarColor = this.getFontColor(this.value);
        }
      }, 500)
    }
  };

import cpHtml from './tabs.html';
import cpStyle from './tabs.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/tabs.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-tabs',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
