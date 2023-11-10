const resizer = {
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
      ResizerObserver: null,
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
      return this.$el;
    }
  },
  methods: {
    isActiveResizer() {
      let ct = this.closest('bbn-container');
      if (ct) {
        return ct.isVisible;
      }

      return true;
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
      if (this.$el.style.display !== 'none') {
        // Setting initial dimensions
        let ms2 = this.setContainerMeasures();
        let ms1 = this.setResizeMeasures();
        if (ms1 || ms2) {
          //bbn.fn.log(["DEFAULT ONRESIZE FN FROM " + this.$options.name, ms1, ms2]);
          res = true;
          this.$tick();
        }
      }

      return res;
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
        h = Math.round(ele.clientHeight);
        w = Math.round(ele.clientWidth);
        if (h && w) {
          this.setComputedStyle();
        }
      }
      
      //bbn.fn.log(ele, h, Math.round(ele.clientHeight), ele.clientHeight, '----');
      if (this.lastKnownHeight !== h) {
        this.lastKnownHeight = h;
        resize = true;
      }
      if (this.lastKnownWidth !== w) {
        this.lastKnownWidth = w;
        resize = true;
      }

      return resize;
    },


    setContainerMeasures() {
      let resize = false;
      let isAbsolute = this.computedStyle ? ['absolute', 'fixed'].includes(this.computedStyle.position) : false;
      let offsetParent = this.$el.offsetParent;
      let ctH;
      let ctW;
      if (this.parentResizer && this.parentResizer.lastKnownHeight) {
        ctH = this.parentResizer.lastKnownHeight;
        ctW = this.parentResizer.lastKnownWidth;
      }
      else if (offsetParent) {
        ctH = isAbsolute ? bbn.fn.outerHeight(offsetParent) : Math.round(offsetParent.clientHeight);
        ctW = isAbsolute ? bbn.fn.outerWidth(offsetParent) : Math.round(offsetParent.clientWidth);
      }
      else {
        ctH = bbn.env.height;
        ctW = bbn.env.width;
      }
      if (this.lastKnownCtHeight !== ctH) {
        this.lastKnownCtHeight = ctH;
        resize = true;
      }
      if (this.lastKnownCtWidth !== ctW) {
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


    /**
     * Defines the resize emitter and launches process when it resizes.
     * @method setResizeEvent
     * @fires onParentResizerEmit
     * @memberof resizerComponent
     */
    setResizeEvent() {
      if (!this.resizerObserver && this.resizerObserved) {
        this.resizerObserver = new ResizeObserver((entries) => {
          if (!this.isResizing) {
            for (const entry of entries) {
              if (entry.contentBoxSize?.[0]) {
                this.onResize();
              }
              //bbn.fn.log(bbn._("RESIZEOBS from %s", this.$options.name), entry.contentBoxSize);
            }
          }
        });
        this.resizerObserver.observe(this.resizerObserved);
      }
    },
    /**
     * Unsets the resize emitter.
     * @method unsetResizeEvent
     * @memberof resizerComponent
     */
    unsetResizeEvent() {
      if (this.resizerObserver) {
        this.resizerObserver.disconnect();
        this.resizerObserver = null;
      }
    },
    /**
     * Emits the event resize on the closest parent resizer.
     * @method selfEmit
     * @memberof resizerComponent
     * @param {Boolean} force 
     */  
    selfEmit(force){
      /*
      if ( this.parentResizer ){
        this.parentResizer.$emit("resize", force);
      }
      */
    },
    formatSize(...args) {
      return bbn.fn.formatSize(...args);
    },
    setComputedStyle(){
      if (!this.computedStyle && this.$el && this.$el.clienttWidth) {
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
   * @fires setResizeEvent
   * @emits ready
   * @memberof resizerComponent
   */
  mounted() {
    if (!this.ready) {
      this.$on('ready', this.setResizeEvent);
    }
    else {
      this.setResizeEvent();
    }
  },
  /**
   * Unsets the resize emitter.
   * @event beforeDestroy
   * @fires unsetResizeEvent
   * @memberof resizerComponent
   */
  beforeDestroy(){
    this.unsetResizeEvent();
  }
};

export default resizer;
