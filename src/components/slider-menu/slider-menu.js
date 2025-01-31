/**
 * @file bbn-slider-menu component
 *
 * @description bbn-slider-menu component
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.list
     * @mixin bbn.cp.mixins.keynav
     * @mixin bbn.cp.mixins.resizer
     */
    mixins: [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.list,
      bbn.cp.mixins.keynav,
      bbn.cp.mixins.resizer
    ],
    props: {
      /**
       * The source of the floater.
       * @prop {Function|Array|String|Object} source
       */
      source: {
        type: [Function, Array, String, Object]
      },
      /**
       * The array containings the tree's children.
       * @prop {String} ['items'] children
       */
      children: {
        type: String,
        default: 'items'
      },
      /**
       * @prop {Array} [[]] selected
       */
      selected: {
        type: Array,
        default(){
          return []
        }
      },
      /**
       * @prop {String|Object|Function} component
       */
      component: {
        type: [String, Object, Function]
      }
    },
    data(){
      return {
        /**
         * @data {Array} [[]] currentSelected
         */
        currentSelected: this.selected.slice(),
        /**
         * The index (on filteredData) on which is the mouse cursor or the keyboard navigation
         * @data {Number} overIdx
         */
        overIdx: this.suggest ? 0 : null,
        /**
         * @data {Number|Boolean} [false] mouseLeaveTimeout
         */
        mouseLeaveTimeout: false,
        /**
         * @data {String|Object|Function} currentComponent
         */
        currentComponent: this.component,
        /**
         * @data {Number|Boolean} [false] selectedIndex
         */
        selectedIndex: false,
        /**
         * @data {Number} [0] maxDepth
         */
        maxDepth: 0
      };
    },
    computed: {
      /**
       * @computed items
       * @returns {Array}
       */
      items(){
        let depth = 0;
        let res = [{
          data: this.source,
          selected: true,
          visible: this.currentSelected.length === 0,
          last: false,
          depth: depth
        }];
        let sel = '';
        let list = this.source;
        bbn.fn.each(this.currentSelected, (a, i) => {
          if (sel) {
            sel += '.';
          }
          sel += a + '.' + this.children;
          let tmp = bbn.fn.getProperty(this.source, sel);
          list = tmp
          if (tmp && tmp.length ) {
            depth++;
            res.push({
              data: list,
              selected: true,
              visible: i === this.currentSelected.length - 1,
              last: i === this.currentSelected.length - 1,
              depth: depth
            });
          }
          else {
            res[res.length-1].visible = true;
            res[res.length-1].selected = true;
            res[res.length-1].last = true;
          }
        });
        if (list && list.length) {
          let hasChildren = false;
          bbn.fn.each(list, a => {
            if (a[this.children] && a[this.children].length) {
              if (!hasChildren) {
                hasChildren = true;
                depth++;
              }
              res.push({
                data: a[this.children],
                selected: false,
                visible: false,
                last: true,
                depth: depth
              });
            }
          })
        }
        else if (!res[res.length - 1].visible) {

        }
        this.maxDepth = depth;
        return res;
      }
    },
    methods: {
      /**
       * @method getStyle
       * @param {Object} item
       * @returns {Object}
       */
      getStyle(item){
        let left = '100%';
        if (item.visible) {
          left = '0px';
        }
        else if (item.selected) {
          left = '-100%';
        }
        return {
          left: left
        }
      },
      /**
       * @method mouseleave
       */
      mouseleave(){
        this.isOver = false;
        this.overIdx = this.suggest ? 0 : null;
      },
      /**
       * @method remove
       * @param {Number} idx
       * @fires realDelete
       */
      remove(idx){
        //bbn.fn.log(this.currentData, idx);
        this.realDelete(idx);
      },
      /**
       * Handles the selection of the floater's items.
       * @method select
       * @param {Number} itemIdx
       * @param {Number} dataIdx
       * @emits select
       */
      select(itemIdx, dataIdx){
        if ((this.items[itemIdx].depth < this.maxDepth) && this.items[itemIdx].data && this.items[itemIdx].data.length) {
          this.currentSelected.push(dataIdx)
          this.selectedIndex = false;
        }
        else {
          this.selectedIndex = dataIdx;
        }
        this.$emit('select', this.items[itemIdx].data[dataIdx]);
      },
      /**
       * @method unselect
       * @emits unselect
       */
      unselect(){
        this.selectedIndex = false;
        this.currentSelected.pop();
        this.$emit('unselect', this.currentSelected)
      },
      /**
       * @method reset
       */
      reset(){
        this.selectedIndex = false;
        this.currentSelected.splice(0, this.currentSelected.length);
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.$parent.$options && (this.$parent.$options._componentTag === 'bbn-scroll')) {
          this.hasScroll = true;
        }
        this.ready = true;
      });
    },
    watch: {
      /**
       * @watch source
       * @fires reset
       */
      source(){
        this.reset()
      }
    }

  };

import cpHtml from './slider-menu.html';
import cpStyle from './slider-menu.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/slider-menu.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-slider-menu',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
