import { rectangularSelection } from "@codemirror/view";

const resizer = {
  statics() {
    if (!bbn.cp.resizeObserver) {
      bbn.cp.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cp = entry.target.onResize ? entry.target : entry.target.bbnComponent;
          if (!cp.checkVisibility()) {
            continue;
          }

          if (!cp.isResizing) {
            if (entry.contentBoxSize?.[0]) {
              entry.target.onResize ? entry.target.onResize() : entry.target.bbnComponent.onResize();
            }
          }
        }
      });
    }
  },
  data() {
    return {
      /**
       * The closest resizer parent.
       * @data {Boolean} [false] parentResizer
       * @memberof resizerComponent
       */
      parentResizer: false,
      /**
       * The listener on the closest resizer parent.
       * @data {Boolean} [false] onParentResizerEmit
       * @memberof resizerComponent
       */
      onParentResizerEmit: false,
      /**
       * The ResizeObserver
       * @data {ResizeObserver} [null] resizerObserver
       * @memberof resizerObserver
       */
      resizerObserver: null,
      /**
       * The height.
       * @data {Boolean} [false] lastKnownHeight
       * @memberof resizerComponent
       */
      lastKnownHeight: false,
      /**
       * The width.
       * @data {Boolean} [false] lastKnownWidth
       * @memberof resizerComponent
       */
      lastKnownWidth: false,
      /**
       * The container height.
       * @data {Boolean} [false] lastKnownCtHeight
       * @memberof resizerComponent
       */
      lastKnownCtHeight: false,
      /**
       * The container width.
       * @data {Boolean} [false] lastKnownCtWidth
       * @memberof resizerComponent
       */
      lastKnownCtWidth: false,
      /**
       * Should be set to true during the resize execution.
       * @data {Boolean} [false] isResizing
       * @memberof resizerComponent
       */
      isResizing: false,
      /**
       * The live computedStyle object for the element.
       * @data {Object} [null] computedStyle
       * @memberof resizerComponent
       */
      computedStyle: null
    };
  },
  computed: {
    resizerObserved() {
      return this;
    }
  },
  methods: {
    isActiveResizer() {
      return this.checkVisibility();
    },
    /**
     * A function that can be executed just before the resize event is emitted.
     * @method onResize
     * @emit resize
     * @memberof resizerComponent
     */
    onResize() {
      let res = false;
      //this.$forceUpdate();
      if (this.checkVisibility()) {
        // Setting initial dimensions
        let ms2 = this.setContainerMeasures();
        let ms1 = this.setResizeMeasures();
        if (ms1 || ms2) {
          //bbn.fn.log(["DEFAULT ONRESIZE FN FROM " + this.$options.name, ms1, ms2]);
          res = true;
          this.selfEmit();
        }
      }

      return res;
    },
    /**
     * Emits the event resize on the closest parent resizer.
     * @method selfEmit
     * @memberof resizerComponent
     * @param {Boolean} force 
     */  
    selfEmit() {
      this.$emit('resize');
    },
    /**
     * Sets the value of lastKnownHeight and lastKnownWidth basing on the current dimensions of width and height.
     * @method setResizeMeasures 
     * @returns {Boolean}
     */
    setResizeMeasures() {
      let resize = false;
      let w = 0;
      let h = 0;
      const ele = this.resizerObserved;
      if (ele) {
        h = Math.round(ele.offsetHeight);
        w = Math.round(ele.offsetWidth);
        if (h && w) {
          this.setComputedStyle();
        }
      }

      //bbn.fn.log(ele, h, Math.round(ele.clientHeight), ele.clientHeight, '----');
      if (Math.abs(this.lastKnownHeight - h) > 1) {
        this.lastKnownHeight = h;
        resize = true;
      }
      if (Math.abs(this.lastKnownWidth - w) > 1) {
        this.lastKnownWidth = w;
        resize = true;
      }

      return resize;
    },


    setContainerMeasures() {
      let resize = false;
      let ctH;
      let ctW;
      const isAbsolute = this.computedStyle?.position === 'absolute';
      const isFixed = this.computedStyle?.position === 'fixed';
      const offsetParent = this.$el.offsetParent;
      if (offsetParent) {
        ctH = isAbsolute || isFixed ? bbn.fn.outerHeight(offsetParent) : Math.round(offsetParent.clientHeight);
        ctW = isAbsolute || isFixed ? bbn.fn.outerWidth(offsetParent) : Math.round(offsetParent.clientWidth);
      }
      else if (!isFixed && this.parentResizer?.lastKnownHeight) {
        ctH = this.parentResizer.lastKnownHeight;
        ctW = this.parentResizer.lastKnownWidth;
      }
      else {
        ctH = bbn.env.height;
        ctW = bbn.env.width;
      }

      if (Math.abs(this.lastKnownCtHeight - ctH) > 1) {
        this.lastKnownCtHeight = ctH;
        resize = true;
      }
      if (Math.abs(this.lastKnownCtWidth - ctW) > 1) {
        this.lastKnownCtWidth = ctW;
        resize = true;
      }

      /*
      if (resize) {
        bbn.fn.log(["SET CONTAINER ONRESIZE MEASURES", this.$options.name, ctH, ctW, this.$parent]);
      }
      */

      return resize;
    },


    getParentResizer(){
      let parentResizer = this.closest(".bbn-resize-emitter");
      // In case we have 2 comnponents in one
      while (parentResizer && (parentResizer.onResize === undefined)) {
        parentResizer = parentResizer.$parent;
      }
      return parentResizer?.onResize !== undefined ? parentResizer : false;
    },


    formatSize(...args) {
      return bbn.fn.formatSize(...args);
    },
    setComputedStyle(){
      if (!this.computedStyle && this.$el && this.$el.clientWidth) {
        this.computedStyle = window.getComputedStyle(this.$el);
      }
    }
  },
  /**
   * Adds the class 'bbn-resizer-component' to the component.
   * @event created
   * @memberof resizerComponent
   */
  created(){
    this.componentClass.push('bbn-resizer-component');
  },
  /**
   * Defines the resize emitter and emits the event ready.
   * @event mounted
   * @emits ready
   * @memberof resizerComponent
   */
  mounted() {
    this.parentResizer = this.getParentResizer();
    this.onResize();
    this.$nextTick(() => {
      if (this.resizerObserved) {
        bbn.cp.resizeObserver.observe(this.resizerObserved);
      }

      if (this.parentResizer) {
        this.parentResizer.$on('resize', this.onResize, false, this);
      }
    });
  },
  /**
   * Unsets the resize emitter.
   * @event beforeDestroy
   * @memberof resizerComponent
   */
  beforeDestroy(){
    if (this.resizerObserved) {
      bbn.cp.resizeObserver.unobserve(this.resizerObserved);
    }
  }
};

export default resizer;
