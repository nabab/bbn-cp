/**
 * @file bbn-context component
 *
 * @description bbn-context is a menu that can be activated with a right click.
 * The source of the menu can have a tree structure.
 *
 * @copyright BBN Solutions
 *
 * @created 15/02/2017.
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.list
     * @mixin bbn.cp.mixins.dimensions
     * @mixin bbn.cp.mixins.componentInside
     * @mixin bbn.cp.mixins.events
     */
    mixins: 
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.list,
      bbn.cp.mixins.dimensions,
      bbn.cp.mixins.componentInside,
      bbn.cp.mixins.events
    ],
    props: {
      /**
       * @prop {Boolean} [false] autobind
       */
      autobind: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {Boolean} [false] disabled
       */
      disabled: {
        type: Boolean,
        default: false
      },
      /**
       * Will force the position.
       * @prop {String} [''] position
       */
      position: {
        type: String,
        default: ''
      },
      /**
       * The html tag used to render the property content.
       * @prop {String} ['span'] tag
       */
       tag: {
        type: String,
        default: 'span'
      },
      /**
       * If defined it will be show at the top of the list.
       * @prop {String} [false] floaterTitle
       */
       floaterTitle: {
        type: [Boolean, String],
        default: false
      },
      /**
       * Set to true to show the floating element containing the menu.
       * @prop {Boolean} [false] context
       * ì
       */
      context: {
        type: Boolean,
        default: false
      },
      /**
       * The content of the context menu.
       * @prop {String} content
       */
      content: {
        type: String
      },
      /**
       * Selection mode.
       * @prop {String} ['free'] mode
       */
      mode: {
        type: String,
        default: 'free'
      },
      /**
       * The component used by list's items.
       * @prop {Object|String} itemComponent
       */
      itemComponent: {
        type: [Object, String]
      },
      /**
       * The HTMLElement to bind to.
       * @props {HTMLElement} attach
       */
      attach: {
        type: HTMLElement
      },
      /**
       * The name of the property to be used as action to execute when selected.
       * @prop {String} sourceAction
       * @memberof listComponent
       */
      sourceAction: {
        type: [String, Function, Boolean],
        default: 'action'
      },
      /**
       * The HTML element to be used as portal
       * @prop {HTMLElement} portal
       */
      portal: {
        type: HTMLElement
      }
    },
    data(){
      return {
        /**
         * True if the floating element of the menu is opened.
         * @data {Boolean} [false] showFloater
         */
        showFloater: false,
        /**
         * @data {Boolean} [false] docEvent
         */
        docEvent: false,
        currentLeft: null,
        currentTop: null,
        currentRight: null,
        currentBottom: null,
        currentMinWidth: this.minWidth || 0,
        currentMaxWidth: this.maxWidth || bbn.env.width,
        currentMinHeight: this.minHeight || 0,
        currentMaxHeight: this.maxHeight || bbn.env.height
      };
    },
    methods: {
      select(item, idx, dataIndex, ev) {
        return;
        const ev2 = this.$emit('select', item, idx, dataIndex);
        if (!ev2.defaultPrevented && this.sourceAction) {
          const action = bbn.fn.isFunction(this.sourceAction) ? this.sourceAction(item) : this.sourceAction;
          if (action && item[action]) {
            const fn = item[action];
            if (bbn.fn.isFunction(fn)) {
              bbn.fn.log(['select on context', item.action.toString(), this.$origin, item, idx, dataIndex, ev])
              fn.bind(this.$origin)(item, idx, dataIndex, ev);
              bbn.fn.log(['after select on context'])
            }
          }
        }
        else {
          this.getRef('floater').closeAll();
        }
      },
      doubleClickItem(e) {
        this.$emit('dblclick', e);
      },
      /**
       * Based on the type of event and on the property context, shows or hides the floating element of the menu.
       * @method clickItem
       * @param {Event} e ì
       * @fires updateData
       */
      clickItem(e){
        if (
          !this.disabled
          && (
            (e.type === 'keydown') ||
            ((e.type === 'contextmenu') && this.context) ||
            ((e.type === 'click') && !this.context)
          )
        ) {
          bbn.fn.log("CLICK ITEM", e, e.target, this.currentData);
          // Don't execute if in the floater
          if (!e.target.closest('.bbn-floater-context-' + this.bbnUid)) {
            if (e.preventDefault) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (!this.showFloater && !this.attach) {
              if (e.pageX > bbn.env.width / 2) {
                this.currentLeft = null;
                this.currentRight = bbn.env.width - e.pageX + 5;
              }
              else {
                this.currentLeft = e.pageX - 5;
                this.currentRight = null;
              }

              if (e.pageY > bbn.env.height / 2) {
                this.currentTop = null;
                this.currentBottom = bbn.env.height - e.pageY + 5;
              }
              else {
                this.currentTop = e.pageY - 5;
                this.currentBottom = null;
              }
            }

            this.toggle();
          }
        }
      },
      /**
       * @method clickOut
       * @param e
       */
      clickOut(e){
        if (!e.target.closest('.bbn-floater-context-' + this.bbnUid) && this.showFloater) {
          this.showFloater = false;
          if (e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      },
      /**
       * @method toggle
       */
      toggle(){
        //bbn.fn.log("CONTEXT TOGGLE")
        if (!this.showFloater) {
          if (this.source && !this.component) {
            this.updateData().then(() => {
              this.showFloater = !this.showFloater;
            });
          }
          else {
            this.showFloater = !this.showFloater;
          }
        }
        else {
          this.showFloater = !this.showFloater;
        }
      },
      onMouseDown(e) {
        /*
        if (!(e instanceof CustomEvent)) {
          let event = new CustomEvent('mousedown', {
            cancelable: true,
            detail: e
          });
          this.$emit('mousedown', event);
          if (!event.defaultPrevented) {
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
        }
        */
      }
    },
    /**
     * @method beforeDestroy
     */
    beforeDestroy() {
      if (this.docEvent) {
        document.removeEventListener('click', this.clickout)
      }
    },
    watch: {
      source(v, ov) {
        if (this.showFloater && !this.disabled) {
          this.updateData();
        }
      },
      filters() {
        if (this.showFloater && !this.disabled) {
          this.updateData();
        }
      },
      showFloater(v){
        if (v) {
          document.addEventListener('click', this.clickOut, true)
          this.docEvent = true;
        }
        else {
          document.removeEventListener('click', this.clickout)
          this.docEvent = false;
        }
      }
    }
  };

import cpHtml from './context.html';
import cpStyle from './context.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/context.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-context',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
