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
     */
    mixins: [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.keynav
    ],
    props: {
      uid: {
        type: String
      },
      /**
       * The source of the floater.
       * @prop {Function|Array|String|Object} source
       */
      source: {
        type: [Function, Array, String, Object]
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
        items: this.flatten(this.source),
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
        maxDepth: 0,
        waiter: 0
      };
    },
    computed: {
      lastSelectedIndex() {
        return this.currentSelected[this.currentSelected.length - 1];
      },
      lastSelecteList() {
        const lastItemSelected = this.lastSelectedIndex;
        let row = bbn.fn.getRow(this.items, {id: lastItemSelected});
        if (!row) {
          const bits = lastItemSelected.split('-');
          bits.pop();
          row = bbn.fn.getRow(this.items, {id: bits.join('-')});
        }
        return row;
      },
      lastSelectedItem() {
        const lastItemSelected = this.lastSelectedIndex;
        let row = bbn.fn.getRow(this.items, {id: lastItemSelected});
        if (!row) {
          const bits = lastItemSelected.split('-');
          const idx = bits.pop();
          row = bbn.fn.getRow(this.items, {id: bits.join('-')});
          return row ? row.data[idx] : false;
        }

        return row;
      },
      allSelected() {
        return this.currentSelected.map((a, i) => {
          return bbn.fn.getRow(this.items, {id: a});
        });
      }
      /**
       * @computed items
       * @returns {Array}
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
          sel += a + '.' + this.sourceItems;
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
            if (a[this.sourceItems] && a[this.sourceItems].length) {
              if (!hasChildren) {
                hasChildren = true;
                depth++;
              }
              res.push({
                data: a[this.sourceItems],
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
       */
    },
    methods: {
      flatten(items, parent = null, depth = 1, index = '0') {
        const cp = this;
        const res = [{
          data: items,
          parent,
          selected: false,
          visible: false,
          depth,
          id: parent ? parent + '-' + index : index,
          get style() {
            let left = '100%';
            let display = 'none';
            if (cp.currentSelected[cp.currentSelected.length - 1] === this.id) {
              left = '0px';
              display = 'block';
            }
            else if (cp.currentSelected.includes(this.id)) {
              let idx = cp.currentSelected.indexOf(this.id);
              left = bbn.fn.getRow(cp.items, {id: cp.currentSelected[idx + 1]}) ? '-100%' : '0px';
              display = 'block';
            }
            else if ((cp.currentSelected.length === 1) && (this.depth <= 2)) {
              display = 'block';
            }
            else if (this.parent === cp.currentSelected[cp.currentSelected.length - 1]) {
              display = 'block';
            }

            return {
              left,
              display
            }
          }
        }];
        bbn.fn.each(items, (a, i) => {
          if (a.items?.length) {
            res.push(...this.flatten(a.items, res[0].id, depth + 1, i.toString()));
          }
        });

        return res;
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
      removeItem(idx){
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
      select(itemIdx, dataIdx) {
        const lastBits = this.currentSelected[this.currentSelected.length - 1].split('-');
        const thisBits = this.items[itemIdx].id.split('-');

        if (thisBits.length + 1 === lastBits.length) {
          bbn.fn.log("POPPING");
          this.currentSelected.pop();
        }

        this.currentSelected.push(this.items[itemIdx].id + '-' + dataIdx);
        this.selectedIndex = dataIdx;
        bbn.fn.log(["SELECT", this.items[itemIdx].data[dataIdx], itemIdx, dataIdx, this.items[itemIdx].depth]);
        this.$emit('select', this.items[itemIdx].data[dataIdx]);
      },
      /**
       * @method unselect
       * @emits unselect
       */
      unselect(depth){
        this.selectedIndex = false;
        let last = this.currentSelected.pop();
        if (!bbn.fn.getRow(this.items, {id: last})) {
          last = this.currentSelected.pop();
        }

        this.$emit('unselect', this.currentSelected)
      },
      /**
       * @method reset
       */
      reset(){
        bbn.fn.log("RESET START")
        this.selectedIndex = false;
        this.currentSelected.splice(0, this.currentSelected.length, '0');
        this.items = this.flatten(this.source);
        bbn.fn.log("END RESET START")
      },
      waitReady() {
       clearTimeout(this.waiter);
       this.waiter = setTimeout(() => {
          this.ready = true;
       }, 100);
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.$parent.$options && (this.$parent.$options._componentTag === 'bbn-scroll')) {
          this.hasScroll = true;
        }
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
