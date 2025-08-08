/**
 * @file bbn-menu component
 * @description The bbn menu with a simple implementation shows a hierarchical list of elements grouped in boxes that when clicked perform an action defined by the user .
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 10/02/2017
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.list
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.list
    ],
    props: {
      /**
       * @prop orientation
       */
      orientation: {},
      /**
       * @prop direction
       */
      direction: {},
      /**
       * @prop opened
       */
      opened: {},
      /**
       * @prop {Number} [-1] selectedIndex
       */
      selectedIndex: {
        type: Number,
        default: -1
      },
      /**
       * The name of the property to be used as text.
       * @prop {String} ['label'] sourceText
       */
      sourceText: {
        type: String,
        default: 'text'
      },
      /**
       * * The name of the property to be used as value.
       * @prop {String} ['text'] sourceValue
       */
       sourceValue: {
        type: String,
        default: 'text'
      },
      /**
       * The name of the property to be used as icon.
       * @prop {String} ['icon'] sourceIcon
       */
      sourceIcon: {
        type: String,
        default: 'icon'
      },
      /**
       * The name of the property to be used as action to execute when selected.
       * @prop {String} ['action'] sourceAction
       */
      sourceAction: {
        type: [String, Function],
        default: 'action'
      },
      /**
       * The name of the property to be used as action to execute when selected.
       * @prop {String} ['action'] sourceAction
       */
      sourceSeparator: {
        type: String,
        default: 'separator'
      },
    },
    data() {
      return {
        currentSelectedIndex: this.selectedIndex,
        overIdx: -1,
        activeIdx: -1,
        isChanging: false
      };
    },
    methods: {
      _enterLi(idx) {
        //bbn.fn.log("ENTER LI");
        if ((idx > -1) && (this.overIdx !== idx)) {
          this.overIdx = idx;
          this.activeIdx = idx;
          this.getRef('li' + idx).focus();
        }
      },
      _exitLi(idx) {
        //bbn.fn.log("ENTER LI");
        if ((idx > -1) && (this.overIdx === idx)) {
          this.activeIdx = -1;
          setTimeout(() => {
            if (this.activeIdx === -1) {
              this.overIdx = -1;
            }
          }, 50)
        }
      },
      clickLi(idx, ev) {
        //bbn.fn.log("clickLi", idx, this.overIdx);
        if (this.filteredData[idx]) {
          if (this.filteredData[idx].data[this.sourceItems] && this.filteredData[idx].data[this.sourceItems].length) {
            this.overIdx = this.overIdx === idx ? -1 : idx;
          }
          else if (this.sourceUrl && this.filteredData[idx].data[this.sourceUrl]) {
            bbn.fn.link(this.filteredData[idx].data[this.sourceUrl]);
          }
          else {
            this.select(this.filteredData[idx].data, idx, idx, ev);
          }

          this.currentSelectedIndex = idx;
        }
      },
      onKeyDown(idx, ev) {
        //bbn.fn.log(ev);
        let floater = this.getRef('floater');
        if (floater) {
          let list = floater.getRef('list');
          if (list) {
            list.keynav(ev);
          }
        }
        else if ((ev.key === ' ') || (ev.key === 'Enter')) {
          this.clickLi(idx, ev);
        }
      },
      onFocus(idx) {
        if (this.filteredData[this.overIdx] && this.filteredData[idx]) {
          this.overIdx = idx;
        }
      },
      onClose() {
        //getRef('li' + selectedElement).blur(); selectedElement = -1;
      },
      select(item, idx, idx2, ev) {
        if (this.selection) {
          let selected = this.currentSelected.includes(this.filteredData[idx].index);
          if (!this.multiple) {
            this.currentSelected.splice(0);
          }
          if (!selected) {
            this.currentSelected.push(this.filteredData[idx].index);
          }
          else if (!!this.multiple) {
            this.currentSelected.splice(this.currentSelected.indexOf(this.filteredData[idx].index), 1);
          }
        }

        if (item[this.sourceAction]) {
          if (typeof (item[this.sourceAction]) === 'string') {
            if (bbn.fn.isFunction(this[item[this.sourceAction]])) {
              this[item[this.sourceAction]]();
            }
          }
          else if (bbn.fn.isFunction(item[this.sourceAction])) {
            if (this.actionArguments) {
              item[this.sourceAction](...this.actionArguments);
            }
            else {
              item[this.sourceAction](item);
            }
          }
        }
        else if (this.sourceUrl && item[this.sourceUrl]) {
          bbn.fn.link(item[this.sourceUrl]);
        }

        this.$emit('select', item, idx, idx2, ev);
      }
      /*onDataLoaded(){         
        this.$emit('ondataloaded', this);
      }*/
    },
    watch: {
      source: {
        deep: true,
        handler() {
          this.updateData();
        }
      },
      filteredData: {
        deep: true,
        handler() {
          //bbn.fn.log("FILTERED DATA IN MENU");
          this.isChanging = true;
          this.$forceUpdate().then(() => {
            setTimeout(() => {
              this.isChanging = false;
              this.$forceUpdate().then(() => {
                const floater = this.getRef('floater');
                if (floater) {
                  floater.updateData();
                  floater.onResize(true);
                }
              }, 50);
            })
          });
        }
      },
      overIdx(nv, ov) {
        if ((nv > -1) && (ov > -1)) {
          this.isChanging = true;
          this.$forceUpdate().then(() => {
            setTimeout(() => {
              this.isChanging = false;
              this.$forceUpdate().then(() => {
                const floater = this.getRef('floater');
                if (floater?.$isMounted) {
                  floater.updateData();
                  floater.onResize(true);
                  floater.updatePosition();
                }
              }, 50);
            })
          });
        }
      }
    },
    mounted() {
      this.ready = true;
    }
  };

import cpHtml from './menu.html';
import cpStyle from './menu.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-menu',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
