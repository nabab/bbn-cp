/**
 * @file bbn-list component
 *
 * @description A fully customizable selectable list.
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
   * @mixin bbn.cp.mixins.position
   * @mixin bbn.cp.mixins.keepCool
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.events
   * @mixin bbn.cp.mixins.componentInside
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.list,
    bbn.cp.mixins.keynav,
    bbn.cp.mixins.position,
    bbn.cp.mixins.keepCool,
    bbn.cp.mixins.resizer,
    bbn.cp.mixins.events,
    bbn.cp.mixins.componentInside
  ],
  statics() {
    return { isClicked: false };
  },
  props: {
    /**
     * @prop {} origin
     */
    origin: {},
    /**
     * The maximum width of the floater.
     * @prop {Number|String} maxWidth
     */
    maxWidth: {
      type: [Number, String]
    },
    /**
     * The maximum height of the floater.
     * @prop {Number|String} maxHeight
     */
    maxHeight: {
      type: [Number, String]
    },
    /**
     * The minimum width of the floater.
     * @prop {Number|String} minWidth
     */
    minWidth: {
      type: [Number, String]
    },
    /**
     * The minimum height of the floater.
     * @prop {Number|String} minHeight
     */
    minHeight: {
      type: [Number, String]
    },
    /**
     * The width of the floater.
     * @prop {(String|Number|Boolean)} width
     */
    width: {
      type: [String, Number, Boolean]
    },
    /**
     * The height of the floater.
     * @prop {(String|Number|Boolean)} height
     */
    height: {
      type: [String, Number, Boolean]
    },
    /**
     * The source of the floater.
     * @prop {(Function|Array|String|Object)} source
     */
    source: {
      type: [Function, Array, String, Object]
    },
    /**
     * Only one selection at a time if "true"
     * @prop {Boolean} [true] unique
     */
    unique: {
      type: Boolean,
      default: true
    },
    /**
     * The hierarchical level, root is 0, and for each generation 1 is added to the level.
     * @prop {Number} [0] level
     */
    level: {
      type: Number,
      default: 0
    },
    /**
     * @prop {(Boolean|Number)} [false] suggest
     */
    suggest: {
      type: [Boolean, Number],
      default: false
    },
    /**
     * Alternates the background color on the list
     * @prop {Boolean} [false] alternateBackground
     */
    alternateBackground: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] groupable
     */
    groupable: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {String} ['group'] sourceGroup
     */
    sourceGroup: {
      type: String,
      default: 'group'
    },
    /**
     * @prop {(String|Object|HTMLElement)} groupComponent
     */
    groupComponent: {
      type: [String, Object, HTMLElement]
    },
    /**
     * @prop {String} groupStyle
     */
    groupStyle: {
      type: String
    },
    /**
     * Whatever will be given as arguments to the function action.
     * @prop {Array} actionArguments
     */
    actionArguments: {
      type: Array
    },
    /**
     * The name of the property to be used as icon.
     * @prop {String} sourceIcon
     * @memberof listComponent
     */
    sourceIcon: {
      type: String,
      default: 'icon'
    },
    /**
     * The name of the property to be used as action to execute when selected.
     * @prop {String} sourceAction
     * @memberof listComponent
     */
    sourceAction: {
      type: [String, Function],
      default: 'action'
    },
    scrollHidden: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Function
    }
  },
  data() {
    return {
      /**
       * @data {Number} [0] currentIndex
       */
      currentIndex: 0,
      /**
       * @data [null] currentTop
       */
      currentTop: null,
      /**
       * @data [null] currentLeft
       */
      currentLeft: null,
      /**
       * @data [null] currentHeight
       */
      currentHeight: null,
      /**
       * @data [null] currentWidth
       */
      currentWidth: null,
      /**
       * @data {Boolean} [false] currentScroll
       */
      currentScroll: false,
      /**
       * @data {Number} [0] currentWidth
       */
      containerWidth: 0,
      /**
       * @data {Number} [0] currentHeight
       */
      containerHeight: 0,
      /**
       * @data {Boolean} focused
       */
      focused: bbn.env.focused || null,
      /**
       * @data {Number} [0] floaterHeight
       */
      floaterHeight: 0,
      /**
       * @data {Number} [0] floaterWidth
       */
      floaterWidth: 0,
      /**
       * @data {Boolean} [false] hasIcon
       */
      hasIcons: false,
      /**
       * @data {Number} [-1] currentSelected
       */
      currentSelected: -1,
      /**
       * @data {Boolean} [false] isMaximized
       */
      isMaximized: false,
      /**
       * @data {Boolean} [false] isOver
       */
      isOver: false,
      /**
       * The index (on filteredData) on which is the mouse cursor or the keyboard navigation
       * @data {Number} [-1] overItem
       * @memberof listComponent
       */
      overIdx: -1,
      /**
       * @data {Boolean} [true] isOpened
       */
      isOpened: true,
      /**
       * @data {Boolean} [false] hasScroll
       */
      hasScroll: false,
      /**
       * @data [null] currentComponent
       */
      currentComponent: null,
      /**
       * @data {Boolean} [false] tmpDisabled
       */
      tmpDisabled: false,
      /**
       * The main list in a hierarchical system
       * @data {Boolean|HTMLElement} [false] rootList
       */
      rootList: false,
      /**
       * The current list with the mouse over
       * @data {Boolean|HTMLElement} [false] overList
       */
      overList: false
    };
  },
  computed: {
    /**
     * Normalizes the property 'width'.
     * @computed formattedWidth
     * @return {String}
     */
    formattedWidth() {
      if (this.isMaximized) {
        return '100%';
      }
      if (this.width) {
        return this.width + (bbn.fn.isNumber(this.width) ? 'px' : '')
      }
      return this.currentWidth ? this.currentWidth + 'px' : '100%';
    },
    /**
     * Normalizes the property 'height'.
     * @computed formattedHeight
     * @return {String}
     */
    formattedHeight() {
      if (this.isMaximized) {
        return '100%';
      }
      if (this.height) {
        return this.height + (bbn.fn.isNumber(this.height) ? 'px' : '')
      }
      return this.currentHeight ? this.currentHeight + 'px' : 'auto';
    },
    /**
     * An object of css property to apply to the floater.
     * @computed currentStyle
     * @return {Object}
     */
    currentStyle() {
      let s = {
        overflow: 'hidden'
      };
      if (this.width || this.width) {
        s.width = this.formattedWidth;
      }
      if (this.height || this.isMaximized) {
        s.height = this.formattedHeight;
      }
      if (this.maxWidth) {
        s.maxWidth = this.maxWidth + (bbn.fn.isNumber(this.maxWidth) ? 'px' : '')
      }
      if (this.maxHeight) {
        s.maxHeight = this.maxHeight + (bbn.fn.isNumber(this.maxHeight) ? 'px' : '')
      }
      if (this.minWidth) {
        s.minWidth = this.minWidth + (bbn.fn.isNumber(this.minWidth) ? 'px' : '')
      }
      if (this.minHeight) {
        s.minHeight = this.minHeight + (bbn.fn.isNumber(this.minHeight) ? 'px' : '')
      }
      return s;
    },
    /**
     * @computed filteredData
     * @fires _checkConditionsOnItem
     * @returns {Array}
     */
    filteredData() {
      let data = this.currentData;
      if (this.currentData.length
        && this.currentFilters
        && this.currentFilters.conditions
        && this.currentFilters.conditions.length
        && (!this.serverFiltering || !this.isAjax)
      ) {
        data = bbn.fn.filter(data, a => {
          return this._checkConditionsOnItem(this.currentFilters, a.data);
        });
      }
      if (this.groupable && this.sourceGroup) {
        let grouped = {},
          ungrouped = [];
        bbn.fn.each(data, d => {
          if (d.data[this.sourceGroup] !== undefined) {
            if (grouped[d.data[this.sourceGroup]] === undefined) {
              grouped[d.data[this.sourceGroup]] = [];
            }
            grouped[d.data[this.sourceGroup]].push(d);
          }
          else {
            ungrouped.push(d);
          }
        });
        data = [];
        bbn.fn.each(Object.values(grouped), g => data.push(...g));
        data.push(...ungrouped);
      }
      return data;
    },
    /**
     * The parent list in a hierarchical system
     * @computed parentList
     * @fires closest
     * @returns {HTMLElement|Boolean}
     */
    parentList() {
      let list = this.closest('bbn-list');
      return list ? (list.level < this.level ? list : false) : false;
    }
  },
  methods: {
    /**
     * Manages the icon of the items.
     * @method _updateIconSituation
     */
    _updateIconSituation() {
      let hasIcons = false;
      if (this.sourceIcon) {
        bbn.fn.each(this.filteredData, a => {
          if (a.data && a.data[this.sourceIcon]) {
            hasIcons = true;
            return false;
          }
        });
      }
      if (hasIcons !== this.hasIcons) {
        this.hasIcons = hasIcons;
      }
    },
    /**
     * The method called on the mouseenter event
     * @method mouseenter
     * @param {Event} e
     * @param {Number} idx
     */
    mouseenter(e, idx) {
      let list = e.target.closest('.bbn-list')
      if (list?.bbn === this) {
        this.overIdx = idx;
        this.isOver = true;
        this.rootList.overList = this;
        //this.filteredData[idx].opened = true;
      }
    },
    /**
     * @method resetOverIdx
     */
    resetOverIdx() {
      if (this.suggest === false) {
        this.overIdx = -1;
      }
      else if (this.suggest === true) {
        this.overIdx = 0;
      }
      else if (this.filteredData[this.suggest]) {
        this.overIdx = this.suggest;
      }
    },
    /**
     * The method called on mouseleave event
     * @method mouseleave
     * @fires resetOverIdx
     */
    mouseleave() {
      this.isOver = false;
      this.rootList.overList = false;
      this.resetOverIdx();
    },
    /**
     * @method isSelected
     * @param {Number} idx
     * @returns {Boolean}
     */
    isSelected(idx) {
      let r = false;
      if (this.filteredData[idx]) {
        if (this.selection) {
          if (this.filteredData[idx].selected && (this.mode !== 'options')) {
            r = true;
          }
        }
        else if (this.selected.length && this.sourceValue) {
          r = this.selected.includes(this.filteredData[idx].data[this.sourceValue]);
        }
      }
      return r;
    },
    /**
     * @method remove
     * @param {Number} idx
     * @fires realDelete
     */
    removeItem(idx) {
      //bbn.fn.log(this.currentData, idx);
      this.realDelete(idx);
    },
    /**
     * Handles the selection of the floater's items.
     * @method select
     * @param {Number} idx
     * @emits select
     */
    select(idx) {
      let item = this.filteredData[idx] || null;
      if (item && item.data && !item.data.disabled) {
        let ev = new CustomEvent('select', { cancelable: true });
        this.currentIndex = idx;
        if (item.data[this.sourceItems]?.length) {
          this.isOpened = !this.isOpened;
        }
        else {
          let v = item.data[this.sourceValue];
          this.$emit(this.isSelected(idx) ? "unselect" : "select", item.data, idx, item.index, ev);
          if (!ev.defaultPrevented) {
            if ((this.mode === 'selection') && !item.selected) {
              let prev = bbn.fn.getRow(this.filteredData, "selected", true);
              if (prev) {
                this.currentData[prev.index].selected = false;
              }
              item.selected = true;
            }
            else {
              item.selected = !this.isSelected(idx);
            }
            if (v !== undefined) {
              if (item.selected) {
                if (this.unique) {
                  this.selected.splice(0, this.selected.length);
                }
                if (!this.selected.includes(v)) {
                  this.selected.push(v);
                }

              }
              else if (this.selected.includes(v)) {
                this.selected.splice(this.selected.indexOf(v), 1);
              }
            }
            if (item.data[this.sourceAction]) {
              if (typeof (item.data[this.sourceAction]) === 'string') {
                if (bbn.fn.isFunction(this[item.data[this.sourceAction]])) {
                  this[item.data[this.sourceAction]]();
                }
              }
              else if (bbn.fn.isFunction(item.data[this.sourceAction])) {
                if (this.actionArguments) {
                  item.data[this.sourceAction](...this.actionArguments);
                }
                else {
                  item.data[this.sourceAction](idx, item.data);
                }
              }
            }
            else if (item.data[this.sourceUrl]) {
              bbn.fn.link(item.data[this.sourceUrl]);
            }
          }
        }
      }
    },
    /**
     * @method unselect
     */
    unselect() {
      bbn.fn.each(bbn.fn.filter(this.currentData, a => {
        return this.selected.includes(a.data[this.sourceValue]);
      }), a => {
        if (a.selected) {
          a.selected = false;
        }
      });
      this.selected.splice(0, this.selected.length);
    },
    overByString(st) {
      let idx = bbn.fn.search(this.filteredData, 'data.' + this.sourceText, st, 'startswith');
      bbn.fn.log("overByString", st, idx);
      this.overIdx = idx;
    }
  },
  /**
   * @event created
   * @fires _updateIconSituation
   * @fires closest
   */
  created() {
    this.$on('dataloaded', () => {
      this.$nextTick(() => {
        this._updateIconSituation();
      });
    });
    this.$once('dataloaded', () => {
      if (this.selected
        && this.selected.length
        && this.uid
      ) {
        this.$nextTick(() => {
          if (this.hasScroll) {
            let overIdx = bbn.fn.search(this.filteredData, 'data.' + this.uid, this.selected[0]),
              scroll = this.closest('bbn-scroll');
            if (scroll.ready) {
              this.isOver = false;
              this.overIdx = overIdx;
            }
            else {
              scroll.$once('ready', () => {
                this.$nextTick(() => {
                  setTimeout(() => {
                    this.isOver = false;
                    this.overIdx = overIdx;
                  }, 50)
                })
              });
            }
          }
        });
      }
    });
    if (!this.level) {
      this.rootList = this;
    }
    else {
      let cp = this.closest('bbn-list');
      if (!cp) {
        this.rootList = this;
      }
      else {
        while (cp && cp.level) {
          cp = cp.closest('bbn-list');
        }
        if (cp && !cp.level) {
          this.rootList = cp;
        }
      }
    }
  },
  /**
   * @event mounted
   * @fires $nextTick
   * @fires resetOverIdx
   */
  mounted() {
    this.$nextTick(() => {
      if (this.$parent?.$options?._componentTag === 'bbn-scroll') {
        this.hasScroll = true;
      }

      if (this.isConnected) {
        this.ready = true;
        setTimeout(() => {
          this.resetOverIdx();
        }, 50);
      }
    });
  },
  watch: {
    /**
     * @watch overIdx
     * @param {Number} newVal
     * @fires keepCool
     * @fires closest
     */
    overIdx(newVal) {
      this.keepCool(() => {
        if (this.hasScroll && (newVal !== -1) && !this.isOver) {
          const scroll = this.closest('bbn-scroll');
          if (scroll) {
            scroll.scrollSet(null, this.getRef('li' + newVal));
          }
        }
      }, 'overIdx', 50)
    },
    /**
     * @watch source
     * @fires updateData
     */
    source: {
      deep: true,
      handler() {
        if (this.isAutobind) {
          this.updateData();
        }
      }
    },
    filteredTotal(v, ov) {
      if (!ov) {
        this.$nextTick(() => {
          this.resetOverIdx();
        });
      }
      if (v < ov) {
        let fl = this.closest('bbn-scroll');
        if (fl) {
          fl.isResized = false;
          fl.onResize(true);
        }
      }

    }
    /*
    selected(){
      this.updateData();
    }
    */
  }

};

import cpHtml from './list.html';
import cpStyle from './list.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/list.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-list',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
