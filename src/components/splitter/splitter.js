/**
 * @file bbn-splitter component
 *
 * @description bbn-splitter is a component that can interact dynamically, allowing the division of a layout into resizable areas.
 * To do so it needs another component, the "bbn-pane" that represents the portion of the single area that the splitter contains.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 * 
 * @created 15/02/2017
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic 
   * @mixin bbn.cp.mixins.resizer
   */
  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.resizer],
  props: {
    /**
     * The orientation of the splitter ('horizontal', 'vertical', 'auto').
     * @prop {String} ['auto'] orientation
     */
    orientation: {
      type: String,
      default: 'auto'
    },
    /**
     * Set to true allows the splitter to be resizable. 
     * @prop {boolean} [false] resizable
     */
    resizable: {
      type: Boolean,
      default: false
    },
    /**
    * Set to true allows the panes inside the splitter to be collapsible. 
    * @prop {boolean} [false] collapsible
    */
    collapsible: {
      type: Boolean,
      default: false
    },
    // @todo not used
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the size of the resizer element, width if vertical, height if horizontal.
     * @prop {number} [15] resizerSize
     */
    resizerSize: {
      type: [Number, String],
      default: 15
    },
    /**
     * A class name to add on the resizer element.
     * @prop {String|Function} resizerClass
     */
    resizerClass: {
      type: [String, Function]
    },
    /**
     * The minimum size that can have a pane (non collapsed).
     * @prop {Number} [40] minPaneSize
     */
    minPaneSize: {
      type: Number,
      default: 40
    },
    fullSize: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      /**
       * The timeout used to launch the initial process (reset each time a new pane is added).
       * @data {Number} [0] initTimeout
       */
      initTimeout: 0,
      /**
       * Will be set to true once the splitter has been resized.
       * @data {Boolean} [false] isResized
       */
      isResized: false,
      /**
       * Will be set to true when the splitter is being resized by the user.
       * @data {Boolean} [false] isResizing
       */
      isResizing: false,
      /**
       * An object containing info about current user resizing when it occurs.
       * @data {Boolean} [null] resizeCfg
       */
      resizeCfg: null,
      /**
       * An array consisting of each resizer objects (the bars separating resizable panes).
       * @data {Array} [[]] resizers
       */
      resizers: [],
      /**
       * The content of the prop orientation.
       * @data {String} currentOrientation
       */
      currentOrientation: this.orientation,
      /**
       * The configuration of the panes.
       * @data {Array} [[]] panes
       */
      panes: [],
      /**
       * @data {Boolean} [false] isInitiating
       */
      isInitiating: false
    };
  },
  computed: {
    /**
     * @compued splitterStyle
     * @returns {Object}
     */
    splitterStyle() {
      return {
        gridTemplateColumns: this.columnsCfg,
        gridTemplateRows: this.rowsCfg,
      }
    },
    /**
     * @computed isHorizontal
     * @returns {Boolean}
     */
    isHorizontal() {
      return this.currentOrientation === 'horizontal';
    },
    /**
     * Return true if at least 2 panes are resizable - and so is the splitter.
     * @computed isResizable
     * @return {Boolean}
     */
    isResizable() {
      return (this.resizable || this.collapsible) && (bbn.fn.count(this.panes, { resizable: true }) >= 2)
    },
    /**
     * What will be actually in the CSS for grid-template-columns.
     * @computed columnsCfg
     * @return {String}
     */
    columnsCfg() {
      return this.panes.length && this.isHorizontal ? this.getFormatted() : '100%';
    },
    /**
     * What will be actually in the CSS for grid-template-rows.
     * @computed rowsCfg
     * @return {String}
     */
    rowsCfg() {
      return this.panes.length && !this.isHorizontal ? this.getFormatted() : '100%';
    },
    /**
     * X or y depending on the current orientation.
     * @computed currentAxis
     * @return {String}
     */
    currentAxis() {
      return this.isHorizontal ? 'x' : 'y'
    },
    /**
     * Width or height depending on the current orientation.
     * @computed currentSizeType
     * @return {String}
     */
    currentSizeType() {
      return this.isHorizontal ? 'Width' : 'Height';
    },
    /**
     * Width or height depending on the current orientation.
     * @computed currentOffsetType
     * @return {String}
     */
    currentOffsetType() {
      return this.isHorizontal ? 'left' : 'top';
    },
    /**
     * Size of the container as given by bbn.
     * @computed currentSize
     * @return {String}
     */
    currentSize() {
      return this['lastKnown' + this.currentSizeType];
    },
  },
  methods: {
    /**
     * Returns the calculated grid-template-rows or grid-template-columns as CSS string.
     * @method getFormatted
     * @return {String}
     */
    getFormatted() {
      /**
       * The position of the panes, starting at 1.
       * @type {Number}
       */
      let pos = 1;
      let lastVisibleResizer = false;
      let tmp = this.panes.map(a => {
        /**
         * The additions of the 3 differences:
         * - currentDiff is the current difference while resizing
         * - savedDiff is the original difference resulting from other resizings
         * - tmpDiff is the temporary difference applied from other(s) collapsed pane(s)
         * @type {number}
         */
        let diff = a.currentDiff + a.savedDiff + a.tmpDiff;
        /**
         * The resulting string for the CSS property.
         * @type {string}
         */
        let sz = '';
        // If position is not the one expected it means a resizer is before so it's added as a column
        while (a.position > pos) {
          lastVisibleResizer = true;
          pos++;
        }
        // If the pane is collapsed we just mark its size at 'max-content'
        if (a.collapsed) {
          sz += 'max-content';
        }
        // If it's a number it will be a sum with the existing diff
        else {
          lastVisibleResizer = false;
          if (a.forceAuto || (a.addedSize && (a.addedSize === 'auto'))) {
            sz += 'auto';
          }
          else if (a.value) {
            if (a.addedSize || diff) {
              sz += 'calc( ';
              sz += a.value + (a.isNumber ? 'px' : (a.isPercent ? '%' : ''));
              if (diff) {
                sz += ' + ' + diff + 'px';
              }
              if (a.addedSize) {
                sz += ' + ' + a.addedSize + (typeof a.addedSize === 'number' ? 'px' : a.addedSize);
              }
              sz += ')';
            }
            else if (a.value) {
              sz += a.value + (a.isNumber ? 'px' : (a.isPercent ? '%' : ''));
            }
          }
          else {
            sz += 'auto';
          }
        }
        pos++;
        return sz;
      });

      return tmp.join(' ');
    },
    /**
     * Returns the resizer's class according to its resizerClass prop.
     * @method realResizerClass
     * @param resizer
     * @return {String}
     */
    realResizerClass(resizer) {
      if (bbn.fn.isFunction(this.resizerClass)) {
        return this.resizerClass(resizer);
      }

      return this.resizerClass || '';
    },
    /**
     * Returns orientation based on the largest side.
     * @method getOrientation
     * @return {String}
     */
    getOrientation() {
      return this.lastKnownWidth > this.lastKnownHeight ? 'horizontal' : 'vertical';
    },
    /**
     * Handles the resize of the splitter
     * @method onResize
     * @fires getOrientation
     */
    onResize() {
      if (!this.isResizing) {
        this.isResizing = true;
        this.setContainerMeasures();
        this.setResizeMeasures();
        if (this.orientation === 'auto') {
          let o = this.getOrientation();
          if (o !== this.currentOrientation) {
            this.currentOrientation = o;
          }
        }

        /** @todo so far only fuckin way to make it re-render the right dimensions */
        window.requestAnimationFrame(() => {
          let w = this.$el.style.width;
          let h = this.$el.style.height;
          this.$el.style.width = '100%';
          this.$el.style.height = '100%';
          window.requestAnimationFrame(() => {
            this.$el.style.width = w;
            this.$el.style.height = h;
            this.isResizing = false;
            this.$emit('resize');
          })
        })
      }
    },
    /**
     * Gets the next resizable pane.
     * @method getNextResizable
     * @param {Number} idx 
     * @param {Array} arr 
     * @return {Boolean|Number}
     */
    getNextResizable(idx, arr) {
      for (let i = idx + 1; i < arr.length; i++) {
        if (this.resizable
          && (arr[i].resizable !== false)
          && !arr[i].invisible
        ) {
          return i;
        }
      }

      return false;
    },
    /**
     * Gets the previous resizable pane.
     * @method getPrevResizable
     * @param {Number} idx 
     * @param {Array} arr 
     * @return {Boolean|Number}
     */
    getPrevResizable(idx, arr) {
      for (let i = idx - 1; i >= 0; i--) {
        if (this.resizable
          && (arr[i].resizable !== false)
          && !arr[i].invisible
        ) {
          return i;
        }
      }

      return false;
    },
    /**
     * Gets the next collapsible pane.
     * @method getNextCollapsible
     * @param {Number} idx 
     * @param {Array} arr 
     * @return {Boolean|Number}
     */
    getNextCollapsible(idx, arr) {
      for (let i = idx + 1; i < arr.length; i++) {
        if (this.collapsible
          && (arr[i].collapsible !== false)
          && !arr[i].invisible
        ) {
          return i;
        }
      }

      return false;
    },
    /**
     * Gets the previous collassible pane.
     * @method getPrevCollapsible
     * @param {Number} idx 
     * @param {Array} arr 
     * @return {Boolean|Number}
     */
    getPrevCollapsible(idx, arr) {
      for (let i = idx - 1; i >= 0; i--) {
        if (this.collapsible
          && (arr[i].collapsible !== false)
          && !arr[i].invisible
        ) {
          return i;
        }
      }

      return false;
    },
    /**
     * Triggered by the panes being mounted, analyzes the splitter's content in order to define its panes.
     * @method init
     * @fires getPrevResizable
     * @fires getNextResizable
     * @fires getPrevCollapsible
     * @fires getNextCollapsible
     */
    async init() {
      // As we want to execute it only once and as it is triggered multiple times (by each pane)
      // We add a timeout which cancels the previous one so it should be only triggered once at mount
      clearTimeout(this.initTimeout);
      this.initTimeout = setTimeout(async () => {
        // Emptying the panes array if it's filled
        this.panes.splice(0, this.panes.length);
        const tmp = [];
        let hasAuto = false;
        let hasPercent = false;
        // If 1st pane is collapsible we add a resizer at the start
        this.$slots.default.forEach((paneEle, i) => {
          let pane = paneEle.bbn;
          // Defining the panes base on the content
          if (pane?.$options?.name === 'bbn-pane') {
            let isPercent = false;
            let isFixed = false;
            let isNumber = false;
            let isAuto = false;
            let props = bbn.fn.createObject({}, paneEle.bbnSchema.props);
            let resizable = (this.resizable || pane.resizable) && (props.resizable !== false);
            let collapsible = (this.collapsible || props.collapsible) && (props.collapsible !== false);
            let value = parseInt(props.size) || 0;
            if (props.size) {
              isFixed = true;
              if (props.size === 'auto') {
                props.size = false;
                isAuto = true;
                hasAuto = true;
              }
              else if ((typeof props.size === 'string') && (bbn.fn.substr(props.size, -1) === '%')) {
                isPercent = true;
                hasPercent = true;
              }
              else if ((typeof props.size === 'string') && (bbn.fn.substr(props.size, -2) === 'px')) {
                isNumber = true;
                props.size = parseInt(props.size);
              }
              else if ((typeof props.size === 'number')) {
                isNumber = true;
              }
            }
            else {
              isAuto = true;
              hasAuto = true;
            }
            let obj = bbn.fn.extend(props, {
              index: i,
              value,
              currentDiff: 0,
              savedDiff: 0,
              addedSize: '',
              tmpDiff: 0,
              isPercent,
              isFixed,
              isNumber,
              isAuto,
              forceAuto: false,
              resizable,
              collapsible,
              collapsed: pane.isCollapsed,
              isResizable: collapsible || resizable,
              pane: pane
            });
            tmp.push(obj);
          }
        });
        bbn.fn.each(tmp, (pane, idx) => {
          pane.prevResizable = this.getPrevResizable(idx, tmp);
          pane.nextResizable = this.getNextResizable(idx, tmp);
          pane.prevCollapsible = this.getPrevCollapsible(idx, tmp);
          pane.nextCollapsible = this.getNextCollapsible(idx, tmp);
          this.panes.push(pane);
        });
        const isResizable = bbn.fn.count(tmp, { isResizable: true }) >= 2;
        if (this.panes.length && hasPercent && isResizable && !hasAuto) {
          throw bbn._('In a resizable splitter, if a pane has a percentage measure, at least one pane must be meausreless or set at "auto"');
        }
        else {
          await this.$forceUpdate();
          this.ready = true;
          this.selfEmit(true);
        }
      }, 200);
    },
    /**
     * @ignore
     * @todo Remove this function.
     * Obliged to do that because of sliders (closing one with right orientation moves the splitter!)
     */
    preventScroll() {
      this.$el.scrollLeft = 0;
      this.$el.scrollTop = 0;
    },
    /**
     * Handles the resize of panes on dragging the resizer
     * @method resizeDrag
     * @param {Event} e 
     */
    resizeDrag(e) {
      if (this.isResizing && this.resizeCfg && this.resizeCfg.panes) {
        e.stopImmediatePropagation();
        let diff = (e['client' + this.currentAxis.toUpperCase()] || (e.touches.length ? e.touches[0] : e.changedTouches[0])['page' + this.currentAxis.toUpperCase()]) - this.resizeCfg[this.currentOffsetType];
        if (diff >= this.resizeCfg.max) {
          diff = this.resizeCfg.max;
        }
        else if (diff <= this.resizeCfg.min) {
          diff = this.resizeCfg.min;
        }
        this.resizeCfg.panes[0].currentDiff = diff;
        this.resizeCfg.panes[1].currentDiff = - diff;
      }
    },
    /**
     * Ends the resize
     * @method resizeEnd
     * @param {Event} e 
     */
    resizeEnd(e) {
      if (this.isResizing && this.resizeCfg && this.resizeCfg.panes) {
        let diff = (e['client' + this.currentAxis.toUpperCase()] || (e.touches.length ? e.touches[0] : e.changedTouches[0])['page' + this.currentAxis.toUpperCase()]) - this.resizeCfg[this.currentOffsetType];
        if (diff >= this.resizeCfg.max) {
          diff = this.resizeCfg.max;
        }
        else if (diff <= this.resizeCfg.min) {
          diff = this.resizeCfg.min;
        }
        this.resizeCfg.panes[0].currentDiff = 0;
        this.resizeCfg.panes[1].currentDiff = 0;
        this.resizeCfg.panes[0].savedDiff = this.resizeCfg.panes[0].savedDiff + diff;
        this.resizeCfg.panes[1].savedDiff = this.resizeCfg.panes[1].savedDiff - diff;
        this.isResizing = false;
        document.body.style.cursor = '';
        this.resizeCfg.resizer.style.pointerEvents = this.resizeCfg.pointerEvents;
        document.body.removeEventListener("touchmove", this.resizeDrag);
        document.body.removeEventListener("mousemove", this.resizeDrag);
        document.body.removeEventListener("touchend", this.resizeEnd);
        document.body.removeEventListener("touchcancel", this.resizeEnd);
        document.body.removeEventListener("mouseup", this.resizeEnd);
        document.body.removeEventListener("mouseleave", this.resizeEnd);
        this.resizeCfg.panes[0].pane.selfEmit(true);
        this.resizeCfg.panes[1].pane.selfEmit(true);
        this.resizeCfg = null;
      }
    },
    /**
     * Starts the resize.
     * @param {Event} e 
     * @param {Object} rs 
     */
    resizeStart(e, pane) {
      if (e.target.tagName.toLowerCase() === 'i') {
        e.target.click();
        return
      }
      if (this.isResizable
        && !this.isResizing
        && pane.prevResizable
      ) {
        this.isResizing = true;
        document.body.addEventListener("touchmove", this.resizeDrag, { passive: true });
        document.body.addEventListener("mousemove", this.resizeDrag, { passive: true });
        document.body.addEventListener("touchend", this.resizeEnd);
        document.body.addEventListener("touchcancel", this.resizeEnd);
        document.body.addEventListener("mouseup", this.resizeEnd);
        document.body.addEventListener("mouseleave", this.resizeEnd);
        let pane1 = pane.prevResizable.pane,
            pane2 = pane,
            pos = this.$position(e.target),
            pos1 = this.$position(pane1),
            pos2 = this.$position(pane2);
        if (!pane1.currentConfig.value && !pane2.currentConfig.value) {
          pane1.currentConfig.value = this.currentOrientation === 'horizontal' ? pos1.width : pos1.height;
          pane2.currentConfig.value = this.currentOrientation === 'horizontal' ? pos2.width : pos2.height;
          pane1.currentConfig.isNumber = true;
          pane2.currentConfig.isNumber = true;
          this.$forceUpdate();
        }
        this.resizeCfg = {
          resizer: e.target,
          panes: [pane1.currentConfig, pane2.currentConfig],
          min: -pos1[this.currentSizeType.toLowerCase()] + this.minPaneSize,
          max: pos2[this.currentSizeType.toLowerCase()] - this.minPaneSize - this.resizerSize,
          pointerEvents: window.getComputedStyle(e.target).pointerEvents
        };
        this.resizeCfg[this.currentOffsetType] = pos[this.currentOffsetType];
        document.body.style.cursor = this.currentOrientation === 'horizontal' ? 'ew-resize' : 'ns-resize';
        e.target.style.pointerEvents = 'none';
        //bbn.fn.log("START", this.resizeCfg, e, "------------");
      }
    },
    /**
     * Collapses a collapsible pane.
     * @param {Number} toCollapse 
     * @param {Number} toUpdate 
     * @param {Boolean} full 
     */
    collapse(toCollapse, toUpdate, full) {
      return;
      if (this.collapsible && this.panes[toCollapse] && this.panes[toUpdate]) {
        let collapsing = !this.panes[toCollapse].collapsed,
          smaller = collapsing ? toCollapse : toUpdate,
          bigger = collapsing ? toUpdate : toCollapse,
          diff1 = this.panes[smaller].savedDiff,
          diff2 = this.panes[bigger].savedDiff;
        //bbn.fn.log(toCollapse, toUpdate, smaller, bigger, diff1, diff2);
        // Not a full collapse (=- double) but with a already collapsed pane
        if (!full && (this.panes[toCollapse].collapsed || this.panes[toUpdate].collapsed)) {
          this.panes[smaller].addedSize = '';
          this.panes[bigger].addedSize = '';
          this.panes[smaller].tmpDiff = 0;
          this.panes[bigger].tmpDiff = 0;
          this.panes[smaller].collapsed = false;
          this.panes[smaller].pane.isCollapsed = false;
          this.panes[bigger].collapsed = false;
          this.panes[bigger].pane.isCollapsed = false;

        }
        // The other is also collapsed and the double arrow is clicked: switching
        else if (full && (this.panes[toUpdate].collapsed === collapsing)) {
          this.panes[bigger].tmpDiff = diff1 - this.resizerSize;
          this.panes[smaller].tmpDiff = 0;
          if (this.panes[smaller].size) {
            this.panes[bigger].addedSize = this.panes[smaller].size
          }
          this.panes[bigger].collapsed = false;
          this.panes[smaller].collapsed = true;
          this.panes[bigger].pane.isCollapsed = false;
          this.panes[smaller].pane.isCollapsed = true;
        }
        else {
          if (this.panes[toCollapse].size && this.panes[toUpdate].size) {
            this.panes[bigger].addedSize = this.panes[smaller].size;
          }
          else {
            this.panes[bigger].addedSize = 'auto';
          }
          this.panes[bigger].tmpDiff = diff1 - this.resizerSize;
          this.panes[smaller].tmpDiff = 0;
          this.panes[toCollapse].collapsed = collapsing;
          this.panes[toCollapse].pane.isCollapsed = collapsing;
        }
        this.$nextTick(() => {
          this.selfEmit();
        });
      }
    },
    /**
     * @method hasVisiblePaneAuto
     * @param {Number} indexToSkip
     * @returns {Boolean}
     */
    hasVisiblePaneAuto(indexToSkip){
      return bbn.fn.search(this.panes, p => {
        return p.isAuto
          && !p.invisible
          && !p.collapsed
          && (!bbn.fn.isNumber(indexToSkip)
            || (p.index !== parseInt(indexToSkip)));
      }) > -1;
    }
  },
  /**
   * Defines the current orientation and forces the update of the component.
   * @event mounted 
   * @fires getOrientation
   * @fires $forceUpdate
   */
  mounted() {
    if (this.currentOrientation === 'auto') {
      this.currentOrientation = this.getOrientation();
      this.$forceUpdate();
    }
  },
  watch: {
    /**
     * Reinitializes the component when the value of the prop orientation changes
     * @watch orientation
     * @param {String} newVal
     * @param {String} oldVal
     */
    orientation(newVal, oldVal) {
      if ((newVal !== oldVal) && (newVal !== this.currentOrientation)) {
        this.currentOrientation = newVal === 'auto' ? this.getOrientation() : newVal;
      }
    },
    /**
     * Reinitializes the component when the value of currentOrientation changes
     * @watch currentOrientation
     * @fires init
     */
    currentOrientation() {
      this.init();
    },
  },
};

import cpHtml from './splitter.html';
import cpStyle from './splitter.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/splitter.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-splitter',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
