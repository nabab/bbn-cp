/**
 * @file the bbn-pane component
 *
 * @description the bbn-pane is a component created to be operated by "bbn-splitter".
 * It represents the portion of the single area of ​​the splitter that will contain what the user desires.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 *
 * @created 15/02/2017
 */

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   */
  mixins: 
  [
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.resizer
  ],
  props: {
    /**
     * @prop {String} ['hidden'] overflow
     */
    overflow: {
      type: String,
      default: 'hidden'
    },
    /**
     * @prop {String} label
     */
    label: {
      type: String
    },
    /**
     * @prop {(String|Number)} [''] size
     */
    size: {
      type: [String, Number],
      default: ''
    },
    /**
     * @prop {Boolean} resizable
     */
    resizable: {
      type: Boolean
    },
    /**
     * @prop {Boolean} collapsible
     */
    collapsible: {
      type: Boolean
    },
    /**
     * @prop {Boolean} [false] collapsed
     */
    collapsed: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] invisible
     */
    invisible: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] scrollable
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Number} [20] min
     */
    min: {
      type: Number,
      default: 20
    },
    /**
     * @prop {Number} [10000] min
     */
    max: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      /**
       * The current collapsed state.
       * @data {Boolean} isCollapsed
       */
      isCollapsed: this.collapsed,
      /**
       * The splitter to which the pane belongs.
       * @data {HTMLElement} splitter
       */
      splitter: null
    };
  },
  computed: {
    isResizable() {
      return this.resizable || (this.splitter && this.splitter.resizable && (this.resizable !== false));
    },
    isCollapsible() {
      return this.collapsible || (this.splitter && this.splitter.collapsible && (this.collapsible !== false));
    },
    currentConfig() {
      if (!this.splitter) {
        return {};
      }

      return bbn.fn.getRow(this.splitter.panes, {pane: this});
    },
    componentStyle() {
      if (this.currentConfig?.value) {
        return {
          [this.isHorizontal ? 'minWidth' : 'minHeight']: this.currentConfig.value
        }
      }

      return {};
    },
    resizerStyle() {
      if (this.splitter) {
        return {
          [this.isHorizontal ? 'width' : 'height']: this.splitter.resizerSize + (bbn.fn.isInt(this.splitter.resizerSize) ? 'px' : '')
        };
      }
    },
    isHorizontal() {
      return this.splitter?.isHorizontal;
    },
    prevResizable() {
      if (this.splitter
        && (this.currentConfig.prevResizable !== false)
      ) {
        return this.splitter.panes[this.currentConfig.prevResizable];
      }

      return false;
    },
    prevCollapsible() {
      if (this.splitter
        && (this.currentConfig.prevCollapsible !== false)
      ) {
        return this.splitter.panes[this.currentConfig.prevCollapsible];
      }

      return false;
    },
    nextCollapsible() {
      if (this.splitter
        && (this.currentConfig.nextCollapsible !== false)
      ) {
        return this.splitter.panes[this.currentConfig.nextCollapsible];
      }

      return false;
    },
    prevVisible(){
      if (this.splitter && this.currentConfig) {
        let idx = this.currentConfig.index - 1;
        while (idx >= 0) {
          if (!this.splitter.panes[idx].invisible) {
            return this.splitter.panes[idx];
          }

          idx--;
        }

        return false;
      }
    },
    nextVisible(){
      if (this.splitter && this.currentConfig) {
        let idx = this.currentConfig.index + 1;
        while (idx < this.splitter.panes.length) {
          if (!this.splitter.panes[idx].invisible) {
            return this.splitter.panes[idx];
          }

          idx++;
        }

        return false;
      }
    },
    isPrevVisibleCollapsible(){
      return this.prevVisible
        && this.prevCollapsible
        && (this.prevVisible.index === this.prevCollapsible.index);
    },
    isNextVisibleCollapsible(){
      return this.nextVisible
        && this.nextCollapsible
        && (this.nextVisible.index === this.nextCollapsible.index);
    },
    isTopLeftCollapseVisible(){
      return (this.isPrevVisibleCollapsible && !this.prevVisible.collapsed)
        || (this.isCollapsible && this.isCollapsed && !this.nextVisible);
    },
    isBottomRightCollapseVisible(){
      return (this.isCollapsible && !this.isCollapsed)
        || (this.isPrevVisibleCollapsible
          && this.prevVisible?.collapsed
          && this.nextVisible);
    },
    isTopLeftFullCollapseVisible(){
      let idx = this.currentConfig.index - 1;
      let panesNotCollapsed = 0;
      let panesCollapsible = 0;
      while (idx >= 0) {
        if (!this.splitter.panes[idx].invisible) {
          if (!this.splitter.panes[idx].collapsible) {
            break;
          }

          panesCollapsible++;
          if (!this.splitter.panes[idx].collapsed) {
            panesNotCollapsed++;
          }
        }

        idx--;
      }

      return this.isPrevVisibleCollapsible
        && (panesCollapsible >= 2)
        && ((!this.isCollapsed && (panesNotCollapsed > 1))
          || (this.isCollapsed && panesNotCollapsed));
    },
    isBottomRightFullCollapseVisible(){
      let idx = this.currentConfig.index;
      let panesNotCollapsed = 0;
      let panesCollapsible = 0;
      while (idx < this.splitter.panes.length) {
        if (!this.splitter.panes[idx].invisible) {
          if (!this.splitter.panes[idx].collapsible) {
            break;
          }

          panesCollapsible++;
          if (!this.splitter.panes[idx].collapsed) {
            panesNotCollapsed++;
          }
        }

        idx++;
      }

      return this.isCollapsible
        && (panesCollapsible >= 2)
        && ((!this.isCollapsed && (panesNotCollapsed > 1))
          || (this.isCollapsed && panesNotCollapsed));
    },
  },
  methods: {
    topLeftCollapse(){
      if (this.isTopLeftCollapseVisible) {
        if (this.isCollapsed) {
          this.currentConfig.collapsed = false;
          this.isCollapsed = false;
          if (this.prevVisible
            && (!this.splitter.hasVisiblePaneAuto(this.prevVisible.index) || this.currentConfig.isAuto)
            && this.prevVisible.forceAuto
          ) {
            this.prevVisible.forceAuto = false;
          }
        }
        else if (this.isPrevVisibleCollapsible) {
          this.prevVisible.collapsed = true;
          this.prevVisible.pane.isCollapsed = true;
          if (!this.splitter.hasVisiblePaneAuto(this.prevVisible.index)) {
            this.currentConfig.forceAuto = true;
          }
        }
      }
    },
    bottomRightCollapse(){
      if (this.isBottomRightCollapseVisible) {
        if (this.isPrevVisibleCollapsible
          && this.prevVisible.collapsed
        ) {
          this.prevVisible.collapsed = false;
          this.prevVisible.pane.isCollapsed = false;
          if (!this.splitter.hasVisiblePaneAuto()
            && this.currentConfig.forceAuto
          ) {
            this.currentConfig.forceAuto = false;
          }
        }
        else {
          this.currentConfig.collapsed = true;
          this.isCollapsed = true;
          if (!this.splitter.hasVisiblePaneAuto(this.currentConfig.index)
            && this.prevVisible
          ) {
            this.prevVisible.forceAuto = true;
          }
        }
      }
    },
    topLeftFullCollapse(){
      if (this.isCollapsible) {
        this.currentConfig.collapsed = false;
        this.isCollapsed = false;
      }

      if (this.isPrevVisibleCollapsible) {
        this.topLeftFullCollapseRec();
      }

      if (!this.splitter.hasVisiblePaneAuto(this.currentConfig.index)) {
        this.currentConfig.forceAuto = true;
      }
    },
    bottomRightFullCollapse(){
      if (this.isCollapsible) {
        this.bottomRightFullCollapseRec();
        if (this.isPrevVisibleCollapsible) {
          this.prevVisible.forceAuto = !this.splitter.hasVisiblePaneAuto();
        }

        if (!this.splitter.hasVisiblePaneAuto(this.currentConfig.index)
          && this.currentConfig.forceAuto
        ) {
          this.currentConfig.forceAuto = false;
        }
      }
    },
    topLeftFullCollapseRec(){
      if (this.isPrevVisibleCollapsible) {
        this.prevVisible.collapsed = true;
        this.prevVisible.pane.isCollapsed = true;
        this.prevVisible.pane.topLeftFullCollapseRec();
      }
    },
    bottomRightFullCollapseRec(){
      if (this.isCollapsible) {
        this.currentConfig.collapsed = true;
        this.isCollapsed = true;
        if (this.isNextVisibleCollapsible) {
          this.nextVisible.pane.bottomRightFullCollapseRec();
        }
      }
    }
  },
  watch:{
    collapsed(val){
      this.isCollapsed = val;
    },
    invisible(val) {
      this.currentHidden = val;
      this.splitter.init();
    },
    isCollapsed(val){
      if (this.currentConfig) {
        this.currentConfig.collapsed = val;
      }
    },
    isCollapsible(val){
      if (this.currentConfig) {
        this.currentConfig.collapsible = val;
      }
    }
  },
  created(){
    this.componentClass.push('bbn-resize-emitter');
  },
  mounted(){
    this.splitter = this.closest('bbn-splitter');
    if (this.splitter){
      this.selfEmit(true);
      this.splitter.init();
      setTimeout(() => {
        this.ready = true;
      }, 40)
    }
  },
};


import cpHtml from './pane.html';
import cpStyle from './pane.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/pane.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-pane',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
