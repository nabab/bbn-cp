/**
 * @file bbn-window component
 *
 * @description The bbn-window is a component that represents a modal window in which it is possible to show the content.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 *
 * @created 15/02/2017
 */
const cpDef = {
    name: 'bbn-window',
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.resizer
     * @mixin bbn.cp.mixins.dimensions
     */
    mixins: [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.dimensions
    ],
    props: {
      /**
       * @prop {Boolean} [true] maximazable
       */
      maximizable: {
        type: Boolean,
        default: true
      },
      /**
       * @prop {Boolean} [true] closable
       */
      closable: {
        type: Boolean,
        default: true
      },
      /**
       * @prop {Boolean} [true] scrollable
       */
      scrollable: {
        type: Boolean,
        default: true
      },
      /**
       * @prop {Boolean} [false] drag
       */
      drag: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {Boolean} [true] resizable
       */
      resizable: {
        type: Boolean,
        default: true
      },
      /**
       * @prop {Boolean} [false] maximized
       */
      maximized: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {Function} onOpen
       */
      onOpen: {
        type: Function
      },
      /**
       * @prop {Function} beforeClose
       */
      beforeClose: {
        type: Function
      },
      /**
       * @prop {Function} onClose
       */
      onClose: {
        type: Function
      },
      /**
       * @prop {Function} afterClose
       */
      afterClose: {
        type: Function
      },
      /**
       * @prop {Function|String|Object} footer
       */
      footer: {
        type: [Function, String, Object]
      },
      /**
       * @prop {Array} [[]] buttons
       */
      buttons: {
        type: Array,
        default(){
          return [];
        }
      },
      /**
       * @prop {Function|Array|Object} [{}] source
       */
      source: {
        type: [Function, Array, Object],
        default(){
          return {};
        }
      },
      /**
       * @prop {String|Function|Object} component
       */
       component: {
        type: [String, Function, Object]
      },
      /**
       * @prop {String|Boolean} ['Untitled'] label
       */
      label: {
        type: [String, Boolean],
        default: bbn._("Untitled")
      },
      /**
       * @prop {String} uid
       */
      uid: {
        type: String
      },
      /**
       * @prop {String} content
       */
      content: {
        type: String
      },
      /**
       * @prop {String} mode
       */
      mode: {
        type: String,
        default: "free",
        validator: mode => ['free', 'options', 'selection'].includes(mode)
      }
    },
    data(){
      let fns = [];
      if ( this.onClose ){
        fns.push(this.onClose);
      }
      return {
        /**
         * @data {Boolean} isMaximized
         */
        isMaximized: this.maximized,
        /**
         * @data {String} widthUnit
         */
        widthUnit: (typeof this.width === 'string') && (bbn.fn.substr(this.width, -1) === '%') ? '%' : 'px',
        /**
         * @data {Number|String|Boolean} currentWidth
         */
        currentWidth: this.width,
        /**
         * @data {String} heightUnit
         */
        heightUnit: (typeof this.height === 'string') && (bbn.fn.substr(this.height, -1) === '%') ? '%' : 'px',
        /**
         * @data {Number|String|Boolean} currentHeight
         */
        currentHeight: this.height,
        /**
         * @data {Array} closingFunctions
         */
        closingFunctions: fns,
        /**
         * @data {Boolean} [false] showContent
         */
        showContent: false,
        /**
         * @data {Boolean|HTMLElement} [false] popup
         */
        popup: false,
        /**
         * @data {Object} [{opacity: 0}] containerCss
         */
        containerCSS: {
          opacity: 0
        }
      }
    },
    computed: {
      /**
       * @computed realWidth
       * @returns {String}
       */
      realWidth(){
        if ( !this.currentWidth ){
          return 'auto';
        }
        if ( typeof this.currentWidth === 'number' ){
          return this.currentWidth.toString() + 'px'
        }
        return this.currentWidth;
      },
      /**
       * @computed realHeight
       * @returns {String}
       */
      realHeight(){
        if ( !this.currentHeight ){
          return 'auto';
        }
        if ( typeof this.currentHeight === 'number' ){
          return this.currentHeight.toString() + 'px'
        }
        return this.currentHeight;
      }
    },
    methods: {
      /**
       * @method getContainerPosition
       * @returns {Object}
       */
      getContainerPosition(){
        return this.$el ? this.$el.parentNode.getBoundingClientRect() : {};
      },
      /**
       * @method onResize
       * @fires getContainerPosition
       */
      onResize(){
        let o = this.getContainerPosition();
        this.containerCSS = {
          opacity: 1,
          top: o.top + 'px',
          left: o.left + 'px',
          width: o.width + 'px',
          height: o.height + 'px',
        }
      },
      /**
       * @method addClose
       * @param {Function} fn
       */
      addClose(fn){
        for ( let i = 0; i < arguments.length; i++ ){
          if ( typeof arguments[i] === 'function' ){
            this.closingFunctions.push(arguments[i])
          }
        }
      },
      /**
       * @method removeClose
       * @param {Function} fn
       */
      removeClose(fn){
        if (!fn) {
          this.closingFunctions = [];
        }
        else {
          this.closingFunctions = bbn.fn.filter(this.closingFunctions, f => {
            return fn !== f;
          })
        }
      },
      /**
       * @method floaterClose
       * @param {Event} e
       * @fires close
       */
      floaterClose(e){
        this.close(false, e);
      },
      /**
       * @method close
       * @param {Boolean} force
       * @param {Event} ev
       * @emits {beforeClose}
       * @fires beforeClose
       * @fires $nextTick
       * @fires afterClose
       * @emits close
       */
      close(force, ev){
        let ok = true;
        if ( !ev ){
          ev = new Event('beforeclose', {cancelable: true});
        }
        if ( !force ){
          if ( this.popup ){
            this.popup.$emit('beforeclose', ev, this);
          }
          else{
            this.$emit('beforeclose', ev, this);
          }
          if ( this.beforeClose && (this.beforeClose(this) === false) ){
            return;
          }
        }
        /*
        bbn.fn.each(this.closingFunctions, a => {
          if (!ev.defaultPrevented) {
            a(this, ev);
          }
        });
        */
        if (!force && bbn.fn.isObject(ev) && ev.defaultPrevented) {
          return;
        }
        let closeEvent = new Event('close', {cancelable: true});
        this.$el.style.display = 'block';
        this.$nextTick(() => {
          this.$emit("close", this, closeEvent);
          if ( this.afterClose ){
            this.afterClose(this);
          }
        })
      }
    },
    /**
     * @event created
     * @fires closest
     */
    created(){
      this.popup = this.closest('bbn-popup');
    },
    /**
     * @event mounted
     * @fires onResize
     */
    mounted(){
      this.ready = true;
      this.onResize();
    },
    watch: {
      /**
       * @watch isMaximized
       * @fires $nextTick
       * @fires selfEmit
       */
      isMaximized(){
        this.$nextTick(() => {
          this.selfEmit(true);
        })
      },
    }
  };

import cpHtml from './window.html';
import cpStyle from './window.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/window.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-window',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
