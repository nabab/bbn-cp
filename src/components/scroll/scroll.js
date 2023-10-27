/**
 * @file bbn-scroll component
 *
 * @description bbn-scroll is a component consisting of horizontal and vertical bars that allow the flow of content in both directions, if the container its smaller than the content, inserts and removes reactively vertical, horizontal bar or both.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 *
 * @created 10/02/2017
 */
import '../../cp.js';

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.keepCool
   * @mixin bbn.cp.mixins.events
   */
  mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.keepCool,
      bbn.cp.mixins.events
    ],
  props: {
    /**
     * @prop {(String|Number)} maxWidth 
     */
    maxWidth: {
      type: [String, Number]
    },
    /**
     * @prop {(String|Number)} maxHeight
     */
    maxHeight: {
      type: [String, Number]
    },
    /**
     * @prop {(String|Number)} minWidth 
     */
    minWidth: {
      type: [String, Number]
    },
    /**
     * @prop {(String|Number)} maxHeight 
     */
    minHeight: {
      type: [String, Number]
    },
    /**
     * The width of the scroll, if not defined the scroll container will have the class 'bbn-overlay'
     * @prop {(Number|Number)} width
     */
    width: {
      type: [String, Number]
    },
    /**
     * @todo not used defines currentheight never used
     * @prop {(String|Number)} height
     */
    height: {
      type: [String, Number]
    },
    /**
     * @todo not used
     * @prop {Number} [50] speed
     */
    speed: {
      type: Number,
      default: 50
    },
    /**
     * The axis where the scroll is applied ( 'x', 'y', 'both')
     * @prop {String} ['both'] axis
     */
    axis: {
      type: String,
      default: "both"
    },
    /**
     * @todo not used
     */
    scrollAlso: {
      type: [HTMLElement, Array, Function],
      default() {
        return [];
      }
    },
    /**
     * Defines the position of the x axis
     * @prop {Number} [0] x
     */
    x: {
      type: Number,
      default: 0
    },
    /**
     * Defines the position of the y axis
     * @prop {Number} [0] y
     */
    y: {
      type: Number,
      default: 0
    },
    /**
     * Defines if the scroll has to be hidden for one of the axis or both
     * @prop {Boolean|String} [false] hidden
     */
    hidden: {
      type: [Boolean, String],
      default: false
    },
    /**
     * Defines the color of the scroll
     * @prop {String} barColor
     */
    barColor: {
      type: String
    },
    /**
     * The time of latency of the scroll
     * @prop {Number} [25] latency
     */
    latency: {
      type: Number,
      default: 25
    },
    /**
     * @prop {Boolean} [true] scrollable
     */
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Boolean} [true] fullPage
     */
    fullPage: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [true] disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {(Number|Array)} [0] offsetX
     */
    offsetX: {
      type: [Number, Array],
      default: 0
    },
    /**
     * @prop {(Number|Array)} [0] offsetY
     */
    offsetY: {
      type: [Number, Array],
      default: 0
    },
    /**
     * @prop {Number|HTMLElement} stepX
     */
    stepX: {
      type: [Number, HTMLElement]
    },
    /**
     * @prop {Number|HTMLElement} stepY
     */
    stepY: {
      type: [Number, HTMLElement]
    },
    afterScrollDelay: {
      type: Number,
      default: 500
    },
    /**
     * @prop {Boolean} [false] keepVisible
     */
    keepVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /**
       * @data {Boolean} [false] readyDelay
       */
      readyDelay: false,
      /**
       * @todo not used
       */
      show: false,
      /**
       * The position on the x axis basing on the prop x
       * @data {Number} [0] currentX
       */
      currentX: this.x || null,
      /**
       * The position on the y axis basing on the prop y
       * @data {Number} [0] currentY
       */
      currentY: this.y || null,
      /**
       * Defines the position ofthe scroll container
       * @data {String} scrollPos
       */
      scrollPos: '0px',
      /**
       * Defines the padding of the scroll container
       * @data {String} containerPadding
       */
      containerPadding: '0px',
      /**
       * Defines if the scroll has to be hidden basing on the prop hidden
       * @data {Boolean} hiddenX
       */
      hiddenX: (this.hidden === true) || ((this.hidden === 'x')),
      /**
       * @todo not used
       * Defines if the scroll has to be hidden basing on the prop hidden
       * @data {Boolean} hiddenY
       */
      hiddenY: (this.hidden === true) || ((this.hidden === 'y')),
      /**
       * Defines if the scroll container must have the class 'bbn-overlay'
       * @data {Number} currentWidth 
       */
      currentWidth: this.width || null,
      /**
       * @todo not used 
       */
      currentHeight: this.height || null,
      /**
       * @data {Number} [0] naturalWidth
       */
      naturalWidth: 0,
      /**
       * @data {Number} [0] naturalHeight
       */
      naturalHeight: 0,
      /**
       * @data {Number} [0] containerWidth
       */
      containerWidth: 0,
      /**
       * @data {Number} [0] containerHeight
       */
      containerHeight: 0,
      /**
       * @data {Number} [0] contentWidth
       */
      contentWidth: 0,
      /**
       * @data {Number} [0] contentHeight
       */
      contentHeight: 0,
      /**
       * @data {Boolean} [false] hasScroll
       */
      hasScroll: false,
      /**
       * @data {Boolean} [false] hasScrollX
       */
      hasScrollX: false,
      /**
       * @data {Boolean} [false] hasScrollY
       */
      hasScrollY: false,
      promise: false,
      isScrolling: false,
      isDragging: false,
      isFocused: false,
      previousTouch: { x: null, y: null },
      lastResize: null,
      scrollReady: false,
      touchX: false,
      touchY: false,
      scrollInitial: false,
      touchDirection: null,
      scrollTimeout: null,
      currentStepX: bbn.fn.isDom(this.stepX) ? this.stepX.clientHeight : this.stepX,
      currentStepY: bbn.fn.isDom(this.stepY) ? this.stepY.clientHeight : this.stepY
    };
  },
  computed: {
    resizerObserved() {
      return this.scrollable ? this.getRef('scrollContainer') : this.$el;
    },
    /**
     * Based on the prop fixedFooter and fullScreen, a string is returned containing the classes for the form template.
     *
     * @computed currentClass
     * @return {String}
     */
    elementClass() {
      let st = this.componentClass.join(' ');
      if (!this.ready) {
        st += ' bbn-invisible';
      }

      if (!this.scrollable) {
        st = bbn.fn.replaceAll('bbn-resize-emitter', '', st) + ' bbn-w-100';
      }
      else {
        st += ' bbn-overlay';
      }

      return st;
    },
    /**
     * @computed elementStyle
     * @return {Object}
     */
    elementStyle() {
      let cfg = {
        maxWidth: this.maxWidth ? bbn.fn.formatSize(this.maxWidth) : '100%',
        maxHeight: this.maxHeight ? bbn.fn.formatSize(this.maxHeight) : '100%',
        minWidth: this.minWidth ? bbn.fn.formatSize(this.minWidth) : '',
        minHeight: this.minHeight ? bbn.fn.formatSize(this.minHeight) : '',
      };

      if (this.currentWidth) {
        cfg.width = bbn.fn.formatSize(this.currentWidth);
      }

      if (this.currentHeight) {
        cfg.height = bbn.fn.formatSize(this.currentHeight);
      }

      return cfg;
    },
    containerClass() {
      let cls = 'bbn-scroll-container bbn-no-scrollbar';
      if (!this.scrollable) {
        cls += ' bbn-w-100';
        return cls;
      }

      if (this.disabled) {
        cls += ' bbn-scroll-disabled';
      }
      if (this.ready && !this.isDragging) {
        cls += ' bbn-scroll-not-dragged';
      }
      if (!this.scrollable) {
        cls += ' bbn-overlay';
      }
      if (this.hasX()) {
        cls += ' bbn-scroll-x';
      }
      if (this.hasY()) {
        cls += ' bbn-scroll-y';
      }
      return cls;
    },
    /**
     * @todo not used
     */
    contentStyle() {
      let cfg = {};
      if (this.minWidth) {
        cfg.minWidth = this.minWidth;
      }
      if (this.minHeight) {
        cfg.minHeight = this.minHeight;
      }
      if (this.maxWidth) {
        cfg.maxWidth = this.maxWidth;
      }
      if (this.maxHeight) {
        cfg.maxHeight = this.maxHeight;
      }
      if (!this.scrollable) {
        return cfg;
      }

      cfg.width = (this.axis === 'x') || (this.axis === 'both') ? 'auto' : '100%';
      cfg.height = (this.axis === 'y') || (this.axis === 'both') ? 'auto' : '100%';
      return cfg;
    }
  },
  methods: {
    hashJustChanged(length = 600) {
      if (document.location.hash) {
        let now = (new Date()).getTime();
        if (bbn.env.hashChanged >= (now - length)) {
          return true;
        }
      }
      return false;
    },
    onTouchstart(e) {
      if (!this.scrollable || this.disabled) {
        return;
      }
      if (e.targetTouches && e.targetTouches.length) {
        let ev = e.targetTouches[0];
        if (this.hasScrollX) {
          this.touchX = ev.clientX;
        }
        if (this.hasScrollY) {
          this.touchY = ev.clientY;
        }
        this.scrollInitial = { x: this.currentX, y: this.currentY, touched: true };
      }
    },
    onTouchend(e) {
      if (!this.scrollInitial) {
        return;
      }
      if (!this.scrollable || this.disabled) {
        return;
      }
      this.scrollInitial.touched = 'finished';
      this.setScrollDelay();
    },
    onTouchmove(e) {
      this.$emit('touchmove', e);
    },
    /**
     * @method onScroll
     * @param {Event} e 
     * @emits scroll
     */
    onScroll(e) {
      let ct = this.getRef('scrollContainer');
      if (ct) {
        if (this.disabled) {
          e.preventDefault();
          return;
        }

        if (this.hasScrollX && (ct.scrollLeft < 0)) {
          ct.scrollLeft = 0;
          e.preventDefault();
          return;
        }

        if (this.hasScrollY && (ct.scrollTop < 0)) {
          ct.scrollTop = 0;
          e.preventDefault();
          return;
        }
        this.currentX = ct.scrollLeft;
        this.currentY = ct.scrollTop;
        this.$emit('scroll', e);
        if (!e.defaultPrevented) {
          // Leaving touchscroll act normally
          if (this.scrollInitial && (this.scrollInitial.touched === true)) {
            // Removing the finishing delay in case it was pre-recorded
            clearTimeout(this.scrollTimeout);
            return;
          }
          // Not acting for events sent by scrollTo (scrollbars will write in nextLevel)
          if (this.hasScrollX && this.$refs.xScroller && bbn.fn.isNumber(this.$refs.xScroller.nextLevel) && (Math.abs(this.currentX - this.$refs.xScroller.nextLevel) < 2)) {
            return;
          }
          // Not acting for events sent by scrollTo (scrollbars will write in nextLevel)
          if (this.hasScrollY && this.$refs.yScroller && bbn.fn.isNumber(this.$refs.yScroller.nextLevel) && (Math.abs(this.currentY - this.$refs.yScroller.nextLevel) < 2)) {
            return;
          }
          if (!this.scrollInitial) {
            this.scrollInitial = { x: this.currentX, y: this.currentY };
          }
          this.setScrollDelay();
        }
      }
      if (this.scrollable && e) {
        e.stopImmediatePropagation();
      }
    },
    setScrollDelay() {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.afterScroll();
      }, this.scrollInitial.touched === 'finished' ? 100 : this.afterScrollDelay);
    },
    afterScroll() {
      if (this.fullPage && this.scrollInitial) {
        if (this.hasScrollX && (this.currentX !== this.scrollInitial.x)) {
          let m = this.currentStepX || this.containerWidth;
          let r1 = this.scrollInitial.x ? Math.round(this.scrollInitial.x / m) : 0;
          let r2 = this.currentX ? Math.round(this.currentX / m) : 0;
          let left;
          if (r1 !== r2) {
            left = r2 * m;
          }
          else if (this.scrollInitial.x < this.currentX) {
            left = (r1 + 1) * m;
          }
          else if (this.scrollInitial.x > this.currentX) {
            left = (r1 - 1) * m;
          }
          if (bbn.fn.isNumber(left) && (left !== this.currentX)) {
            this.$refs.xScroller.scrollTo(left, true).then(() => {
              this.$emit('afterscroll');
            });
          }
        }
        else if (this.hasScrollY && (this.currentY !== this.scrollInitial.y)) {
          let m = this.currentStepY || this.containerHeight;
          let r1 = this.scrollInitial.y ? Math.round(this.scrollInitial.y / m) : 0;
          let r2 = this.currentY ? Math.round(this.currentY / m) : 0;
          let top;
          if (r1 !== r2) {
            top = r2 * m;
          }
          else if (this.scrollInitial.y < this.currentY) {
            top = (r1 + 1) * m;
          }
          else if (this.scrollInitial.y > this.currentY) {
            top = (r1 - 1) * m;
          }
          if (bbn.fn.isNumber(top) && (top !== this.currentY)) {
            this.$refs.yScroller.scrollTo(top, true).then(() => {
              this.$emit('afterscroll');
            });
          }
          else {
            this.$emit('afterscroll');
          }
        }
        this.scrollInitial = false;
      }
    },
    /**
     * Scrolls to the given coordinates of x and y using the given animation
     * @method scrollTo
     * @param {Number} x 
     * @param {Number} y 
     * @fires $refs.xScroller.scrollTo
     * @fires $refs.yScroller.scrollTo
     */
    scrollTo(x, y, anim) {
      return new Promise(resolve => {
        if (!this.hasScroll || !this.ready) {
          return;
        }

        if (
          this.hasScrollX &&
          (x !== undefined) &&
          (x !== null) &&
          this.$refs.xScroller
        ) {
          this.$refs.xScroller.scrollTo(x, anim).then(() => {
            if (
              this.hasScrollY &&
              (y !== undefined) &&
              (y !== null) &&
              this.$refs.yScroller
            ) {
              this.$refs.yScroller.scrollTo(y, anim).then(() => {
                try {
                  resolve();
                }
                catch (e) {

                }
              });
            }
            else {
              try {
                resolve();
              }
              catch (e) {

              }
            }
          });
        }

        else if (
          this.hasScrollY &&
          (y !== undefined) &&
          (y !== null) &&
          this.$refs.yScroller
        ) {
          this.$refs.yScroller.scrollTo(y, anim).then(() => {
            try {
              resolve();
            }
            catch (e) {

            }
          });
        }
      })
    },
    /**
     * @method scrollHorizontal
     * @param {Event} ev 
     * @param {Number} left 
     * @emits scrollx
     */
    scrollHorizontal(ev, left) {
      this.currentX = left;
      this.$emit('scrollx', left);
    },
    /**
     * @method scrollVertical
     * @param {Event} ev 
     * @param {Number} top 
     * @emits scrolly
     */
    scrollVertical(ev, top) {
      this.currentY = top;
      this.$emit('scrolly', top);
    },
    addVertical(y) {
      this.scrollTo(null, this.currentY + y)
      this.$emit('scrolly', this.currentY);
    },
    addHorizontal(x) {
      this.scrollTo(this.currentX + x)
      this.$emit('scrollx', this.currentX);
    },
    /**
     * @method scrollStart
     * @fires scrollStartX
     * @fires scrollStartY
     */
    scrollStart(anim) {
      this.scrollStartX(anim);
      this.scrollStartY(anim);
    },
    /**
     * @method scrollEnd
     * @fires scrollEndX
     * @fires scrollEndY
     */
    scrollEnd(anim) {
      this.scrollEndX(anim);
      this.scrollEndY(anim);
    },
    /**
     * @method scrollBefore
     * @fires scrollBeforeX
     * @fires scrollBeforeY
     */
    scrollBefore(anim) {
      this.scrollBeforeX(anim);
      this.scrollBeforeY(anim);
    },
    /**
     * @method scrollAfter
     * @fires scrollAfterX
     * @fires scrollAfterY
     */
    scrollAfter(anim) {
      this.scrollAfterX(anim);
      this.scrollAfterY(anim);
    },
    /**
     * Scroll the x axis to the position 0
     * @method scrollStartX
     * @fires this.$refs.xScroller.scrollTo
     */
    scrollStartX(anim) {
      if (this.hasScrollX) {
        let x = this.getRef('xScroller');
        if (x) {
          x.scrollStart(anim);
        }
      }
    },
    /**
     * Scroll the y axis to the position 0
     * @method scrollStartY
     * @fires this.$refs.yScroller.scrollTo
     */
    scrollStartY(anim) {
      if (this.hasScrollY) {
        let y = this.getRef('yScroller');
        if (y) {
          y.scrollStart(anim);
        }
      }
    },
    /**
     * Scroll the x axis to the previous page
     * @method scrollBeforeX
     * @fires this.$refs.xScroller.scrollBefore
     */
    scrollBeforeX(anim) {
      if (this.hasScrollX) {
        let x = this.getRef('xScroller');
        if (x) {
          x.scrollBefore(anim);
        }
      }
    },
    /**
     * Scroll the y axis to the previous page
     * @method scrollBeforeY
     * @fires this.$refs.yScroller.scrollBefore
     */
    scrollBeforeY(anim) {
      if (this.hasScrollY) {
        let y = this.getRef('yScroller');
        if (y) {
          y.scrollBefore(anim);
        }
      }
    },
    /**
     * Scroll the x axis to the next page
     * @method scrollBeforeX
     * @fires this.$refs.xScroller.scrollBefore
     */
    scrollAfterX(anim) {
      if (this.hasScrollX) {
        let x = this.getRef('xScroller');
        if (x) {
          x.scrollAfter(anim);
        }
      }
    },
    /**
     * Scroll the y axis to the next page
     * @method scrollBeforeY
     * @fires this.$refs.yScroller.scrollBefore
     */
    scrollAfterY(anim) {
      if (this.hasScrollY) {
        let y = this.getRef('yScroller');
        if (y) {
          y.scrollAfter(anim);
        }
      }
    },
    /**
     * Scroll the x axis to the end
     * @method scrollEndX
     * @thisfires this.getRef('xScroller').scrollTo
     */
    scrollEndX(anim) {
      if (this.hasScrollX) {
        let x = this.getRef('xScroller');
        if (x) {
          x.scrollEnd(anim);
        }
      }
    },
    /**
    * Scroll the y axis to the end
    * @method scrollEndY
    * @thisfires this.getRef('yScroller').scrollTo
    */
    scrollEndY(anim) {
      if (this.hasScrollY) {
        let y = this.getRef('yScroller');
        if (y) {
          y.scrollEnd(anim);
        }
      }
    },
    /**
     * Gets the dimensions after a resize
     * @method getNaturalDimensions
     * @fires getNaturalDimensions
     */
    getNaturalDimensions() {
      let sc = this.find('bbn-scroll');
      //bbn.fn.log(sc ? "THERE IS A SCROLL" : "THERE IS NO SCROLL");
      const old = {
        width: this.naturalWidth,
        height: this.naturalHeight
      }

      if (this.isResizing) {
        return;
      }

      if (this.scrollable) {
        const content = this.getRef('scrollContent');
        if (!content) {
          return;
        }

        this.isResizing = true;
        let oldWidth = this.$el.style.width;
        let oldHeight = this.$el.style.height;
        let oldcWidth = content.style.width;
        let oldcHeight = content.style.height;
        let oldVisibility = this.$el.style.visibility;
        this.$el.style.width = this.maxWidth ? bbn.fn.formatSize(this.maxWidth) : '100%';
        this.$el.style.height = this.maxHeight ? bbn.fn.formatSize(this.maxHeight) : '100%';
        content.style.width = 'auto';
        content.style.height = 'auto';
        content.classList.add('resizing');
        this.$el.style.visibility = 'hidden';
        let hasOverlay = this.getRef('scrollContainer').classList.contains('bbn-overlay');
        if (hasOverlay) {
          this.getRef('scrollContainer').classList.remove('bbn-overlay');
        }

        let d = { width: content.offsetWidth, height: content.offsetHeight };
        //bbn.fn.log(["NAT DIM " + JSON.stringify(d)])
        if (!d.width || !d.height) {
          if (sc && (sc.$el.clientWidth === this.$el.clientWidth) && (sc.$el.clientHeight === this.$el.clientHeight)) {
            sc.getNaturalDimensions();
            this.naturalWidth = sc.naturalWidth;
            this.naturalHeight = sc.naturalHeight;
          }
          else {
            this.naturalWidth = 0;
            this.naturalHeight = 0;
          }
        }
        else {
          this.naturalWidth = d.width;
          this.naturalHeight = d.height;
        }
        this.$el.style.width = oldWidth;
        this.$el.style.height = oldHeight;
        this.$el.style.visibility = oldVisibility;
        content.style.width = oldcWidth;
        content.style.height = oldcHeight;
        content.classList.remove('resizing');
        if (hasOverlay) {
          this.getRef('scrollContainer').classList.add('bbn-overlay');
        }
        this.isResizing = false;
      }
      else {
        if (sc && (sc.$el.clientWidth === this.$el.clientWidth) && (sc.$el.clientHeight === this.$el.clientHeight)) {
          sc.getNaturalDimensions();
          this.naturalWidth = sc.naturalWidth;
          this.naturalHeight = sc.naturalHeight;
        }
        else {
          this.naturalWidth = this.$el.offsetWidth;
          this.naturalHeight = this.$el.offsetHeight;
        }

        //this.$forceUpdate();
        if ((old.width !== this.naturalWidth) || (old.height !== this.naturalHeight)) {
          if (old.width || old.height) {
            this.$emit('resizecontent');
            bbn.fn.log({ w: this.naturalWidth, h: this.naturalHeight });
          }
        }
      }
    },
    hasX() {
      return this.scrollable && ((this.axis === 'both') || (this.axis === 'x'));
    },
    hasY() {
      return this.scrollable && ((this.axis === 'both') || (this.axis === 'y'));
    },
    /**
     * @method initSize
     * @fires getNaturalDimensions
     * @fires onResize
     */
    async initSize() {
      //await this.$forceUpdate();
      //throw new Error("BOOOOOO");
      this.getNaturalDimensions();
      if (!this.naturalWidth && !this.disabled) {
        return this.waitReady();
      }
      //bbn.fn.log(bbn._("Init size from %s with ID %s", this.$options.name, this.$cid));
      this.scrollReady = true;
      await this.onResize(true);
      this.ready = true;
      this.$emit('resizecontent');
      return this.$forceUpdate();
    },
    /**
     * Handles the resize of the scroll
     * @method onResize
     * @fires keepCool
     * @fires getNaturalDimensions
     * @emits resize
     * @returns Promise
     */
    onResize(force) {
      let res = bbn.cp.mixins.resizer.methods.onResize.apply(this);
      // If the container measures have changed
      if (!this.isResizing && (res || force)) {
        // Setting up the element's measures
        // getting current measures of element and scrollable container
        let container = this.$el;
        let content = this.getRef('scrollContent');
        let ct = this.getRef('scrollContainer');
        if (!this.scrollable || !content || !container.clientWidth || !container.clientHeight) {
          return;
        }
        let x = ct.scrollLeft;
        let y = ct.scrollTop;
        let sendResizeContent = false;
        if ((content.clientWidth !== this.contentWidth) || (content.clientHeight !== this.contentHeight)) {
          sendResizeContent = true;
        }

        this.contentWidth = content.scrollWidth;
        this.contentHeight = content.scrollHeight;
        this.containerWidth = container.clientWidth;
        this.containerHeight = container.clientHeight;
        // With scrolling on we check the scrollbars
        if (this.scrollable) {
          if (((this.axis === 'both') || (this.axis === 'x')) && (this.contentWidth > this.containerWidth)) {
            this.hasScrollX = true;
            this.$nextTick(() => {
              if (this.$refs.xScroller) {
                this.$refs.xScroller.onResize();
              }
            })
          }
          else {
            this.hasScrollX = false;
          }
          if (((this.axis === 'both') || (this.axis === 'y')) && (this.contentHeight > this.containerHeight)) {
            this.hasScrollY = true;
            this.$nextTick(() => {
              if (this.$refs.yScroller) {
                this.$refs.yScroller.onResize();
              }
            })
          }
          else {
            this.hasScrollY = false;
          }
          this.hasScroll = this.hasScrollY || this.hasScrollX;
          /** @todo Check if this shouldn't be with - (minus) containerSize */
          if (this.currentX > this.contentWidth) {
            // this.currentX = 0;
            x = this.contentWidth - this.containerWidth;
          }
          if (this.currentY > this.contentHeight) {
            // this.currentY = 0;
            y = this.contentHeight - this.containerHeight;
          }
          if (this.fullPage) {
            if (this.hasScrollX) {
              let tot = Math.round(x / this.containerWidth);
              x = this.containerWidth * tot;
            }
            if (this.hasScrollY) {
              let tot = Math.round(y / this.containerHeight);
              y = this.containerHeight * tot;
            }
          }
          if (this.currentX > this.contentWidth) {
            this.currentX = x;
          }
          if (this.currentY > this.contentHeight) {
            this.currentY = y;
          }
          // if (x !== this.currentX) {
          //   this.currentX = x;
          // }
          // if (y !== this.currentY) {
          //   this.currentY = y;
          // }

          if (this.scrollReady && bbn.fn.isNumber(this.currentX) && (this.currentX !== ct.scrollLeft)) {
            ct.scrollLeft = this.currentX;
          }
          if (this.scrollReady && bbn.fn.isNumber(this.currentY) && (this.currentY !== ct.scrollTop)) {
            ct.scrollTop = this.currentY;
          }

        }
        this.$emit('resize');
      }
    },
    /**
     * Creates a delay to set the scroll as ready
     * @method waitReady
     * @fires keepCool
     * @fires onResize
     */
    waitReady(ev) {
      if (this.isResizing || !this.$el.clientWidth || !bbn.fn.isInViewport(this.$el)) {
        return;
      }


      clearTimeout(this.readyTimeout);
      this.readyTimeout = setTimeout(() => {
        this.initSize();
      }, this.latency)
    },
    setObserver() {
      if (!this.scrollObserver) {
        this.scrollObserver = new MutationObserver(mutations_list => {
          let mutated = false;
          mutations_list.forEach(mutation => {
            if (mutation.addedNodes) {
              this.waitReady();
            }
          });
        });
      }
      this.scrollObserver.observe(this.getRef('scrollContent'), { subtree: true, childList: true });
    },
    unsetObserver() {
      if (this.scrollObserver) {
        this.scrollObserver.disconnect();
      }
    },
    preResize() {
      /*
      if (this.scrollable && this.$el.offsetParent && this.isActiveResizer()) {
        let container = this.getRef('scrollContent');
        let contentWidth = Math.max(container.scrollWidth, container.clientWidth);
        let contentHeight = Math.max(container.scrollHeight, container.clientHeight);
        if (
          (
            contentWidth
            && (this.contentWidth !== contentWidth)
            && (
              !this.contentWidth
              || (Math.abs(contentWidth - this.contentWidth) > 1)
            )
          )
          || (
            contentHeight
            && (this.contentHeight !== contentHeight)
            && (
              !this.contentHeight
              || (Math.abs(contentHeight - this.contentHeight) > 1)
            )
          )
        ) {
          let e = new Event('resizecontent', {
            cancelable: true
          });
          this.$emit('resizecontent', e, {
            width: contentWidth,
            height: contentHeight
          });

          if (!e.defaultPrevented) {
            this.onResize(true);
          }
        }
      }
      */
    }
  },
  created() {
    this.componentClass.push('bbn-resize-emitter');
  },
  /**
   * @event mounted
   * @fires waitReady
   */
  mounted() {
    this.setObserver();
    this.waitReady();
    /*
    this.initSize().then(() => {
      this.scrollReady = true;
      bbn.fn.log("PARENT", this.$parent);
      if ((typeof bbnFloaterCp === 'function') && (this.$parent instanceof bbnFloaterCp)) {
        throw new Error("BOOOOOO");
      }
    });
    //cp.$emit('resizecontent');
    */
  },
  beforeDestroy() {
    this.unsetObserver();
  },
  watch: {
    /**
     * @watch ready
     * @param newVal 
     * @fires setInterval
     */
    /*
    ready(newVal){
      if (newVal) {
        this.preResize();
        this.$emit('ready');
        this.scrollReady = true;
      }
    },
    */
    /**
     * @watch scrollable
     * @param newVal 
     * @fires onResize
     */
    scrollable(newVal) {
      if (newVal) {
        this.initSize();
      }
      else {
        this.hasScroll = false;
        this.hasScrollX = false;
        this.hasScrollY = false;
      }
    },
    /**
     * @watch containerWidth
     * @param newVal 
     */
    containerWidth() {
      let x = this.getRef('xScroller');
      if (x) {
        x.onResize();
      }
    },
    /**
     * @watch containerHeight
     * @param newVal 
     */
    containerHeight() {
      let y = this.getRef('yScroller');
      if (y) {
        y.onResize();
      }
    },
    currentX(x) {
      if (!x) {
        this.$emit('reachleft');
      }
      else {
        let ct = this.getRef('scrollContainer');
        if (ct && (x + ct.clientWidth >= ct.scrollWidth)) {
          this.$emit('reachright');
        }
      }
      this.$emit('scrollx', x);
    },
    currentY(y) {
      if (!y) {
        this.$emit('reachtop');
      }
      else {
        let ct = this.getRef('scrollContainer');
        if (ct && (y + ct.clientHeight >= ct.scrollHeight)) {
          this.$emit('reachbottom');
        }
      }
      this.$emit('scrolly', y);
    },
    stepX(val) {
      this.currentStepX = bbn.fn.isDom(val) ? val.clientHeight : val;
    },
    stepY(val) {
      this.currentStepY = bbn.fn.isDom(val) ? val.clientHeight : val;
    }
  }
};

import cpHtml from './scroll.html';
import cpStyle from './scroll.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./scroll.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
    
  }
  catch (err) {}
}

export default {
  name: 'bbn-scroll',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
