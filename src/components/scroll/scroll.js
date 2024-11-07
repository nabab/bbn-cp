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
import bbn from '@bbn/bbn';
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
    },
    autoresize: {
      type: Boolean,
      default: true
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
      currentStepY: bbn.fn.isDom(this.stepY) ? this.stepY.clientHeight : this.stepY,
      inFloater: null
    };
  },
  computed: {
    /**
     * Based on the prop fixedFooter and fullScreen, a string is returned containing the classes for the form template.
     *
     * @computed currentClass
     * @return {String}
     */
    elementClass() {
      let st = this.componentClass.join(' ');
      if (!this.scrollable) {
        st = bbn.fn.replaceAll('bbn-resize-emitter', '', st) + ' bbn-w-100';
      }

      if (this.disabled) {
        st += ' bbn-scroll-disabled';
      }

      if (this.hasX()) {
        st += ' bbn-scroll-x';
      }
      if (this.hasY()) {
        st += ' bbn-scroll-y';
      }

      return st;
    },
    /**
     * @computed elementStyle
     * @return {Object}
     */
    elementStyle() {
      let cfg = {
        maxWidth: '100%',
        maxHeight: '100%',
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
    contentClass() {
      let cls = 'bbn-scroll-content bbn-no-scrollbar';
      if (!this.scrollable) {
        cls += ' bbn-w-100';
        return cls;
      }

      if (this.ready && !this.isDragging) {
        cls += ' bbn-scroll-not-dragged';
      }
      if (!this.scrollable) {
        cls += ' bbn-overlay';
      }
      return cls;
    },
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
      if (!this.scrollable) {
        return;
      }

      const ct = this.$el;
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
      if (!e.defaultPrevented) {
        this.setScrollDelay();
      }

      return true;

      /* useful?
      if (this.scrollable && e) {
        e.stopImmediatePropagation();
      }
        */
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
            this.scrollTo(left, null, true).then(() => {
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
            this.scrollTo(null, top, true).then(() => {
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
     * Smooth scroll animation
     * @param {int} endX: destination x coordinate
     * @param {int} endY: destination y coordinate
     * @param {int} duration: animation duration in ms
     */
    axisSmoothScrollTo(end, duration, vertical) {
      return new Promise((resolve, reject) => {
        const start = this.$el['scroll' + (vertical ? 'Top' : 'Left')];
        const distance = end - start;
        const startTime = new Date().getTime();

        duration = typeof duration !== 'undefined' ? duration : 400;

        // Easing function
        const easeInOutQuart = (time, from, distance, duration) => {
          if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
          return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
        };

        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }
        this.animationInterval = setInterval(() => {
          const time = new Date().getTime() - startTime;
          let newPos = easeInOutQuart(time, start, distance, duration);
          if (time >= duration) {
            clearInterval(this.animationInterval);
            newPos = end;
            resolve();
          }
          this.$el['scroll' + (vertical ? 'Top' : 'Left')] = Math.round(newPos);
        }, 1000 / 60); // 60 fps
      });
    },

    /**
     * Scrolls to the given position using the given animation.
     * @method scrollTo
     * @fires adjustFromContainer
     */
    axisScrollTo(val, anim, vertical) {
      return new Promise(resolve => {
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
        }

        let num = 0;
        let ele = false;
        if (bbn.cp.isComponent(val) && val.$el) {
          ele = val.$el;
        }
        else if (bbn.fn.isDom(val)){
          ele = val;
        }

        const contentSize = this['content' + (vertical ? 'Height' : 'Width')];
        const containerSize = this['container' + (vertical ? 'Height' : 'Width')];

        if (ele) {
          let container = ele.offsetParent;
          // The position is equal to the offset of the target
          // minus the size of the viewport, which isn't scrolled,
          // plus half the size of the viewport to center it
          // therefore removing half of the viewport does the trick
          num = ele[vertical ? 'offsetTop' : 'offsetLeft']
                - Math.round(containerSize / 2);
          while (container && (container !== this.$el)) {
            if (container.contains(this.$el)) {
              break;
            }
            else{
              num += container[vertical ? 'offsetTop' : 'offsetLeft'];
              container = container.offsetParent;
            }
          }
        }
        else if ( bbn.fn.isPercent(val) ){
          num = Math.round(parseFloat(val) * contentSize / 100);
        }
        else if (bbn.fn.isNumber(val)) {
          num = val;
        }

        if (bbn.fn.isNumber(num)){
          //bbn.fn.log("scrollTo part 1", num);

          if ( num < 0 ){
            num = 0;
          }
          else if (num > (contentSize - containerSize + 100)) {
            num = contentSize - containerSize;
          }

          if (anim) {
            this.axisSmoothScrollTo(num).then(() => {
              resolve();
            });
          }
          else {
            this.$el['scroll' + (vertical ? 'Top' : 'Left')] = num;
            resolve();
          }
        }
      });
    },
    /**
     * @method scrollLevel
     * @param {Boolean} before 
     */
    scrollLevel(before, anim, vertical) {
      const containerSize = this['container' + (vertical ? 'Height' : 'Width')];
      if (containerSize) {
        let movement = containerSize;
        if (before) {
          movement = -movement;
        }

        this.scrollTo(this.$el['scroll' + (vertical ? 'Top' : 'Left')] + movement, anim, vertical);
      }
    },
    /**
     * @method scrollBefore
     * @fires scrollLevel
     */
    scrollBefore(anim, vertical) {
      return this.scrollLevel(true, anim, vertical);
    },
    
    /**
     * @method scrollAfter
     * @fires scrollLevel
     */
    scrollAfter(anim, vertical) {
      return this.scrollLevel(false, anim, vertical);
    },


    /**
     * Scrolls to the given coordinates of x and y using the given animation
     * @method scrollTo
     * @param {Number} x 
     * @param {Number} y 
     */
    scrollTo(x, y, anim) {
      return new Promise(resolve => {
        if (!this.hasScroll || !this.ready) {
          resolve();
        }

        const promises = [];
        if (this.hasScrollX
          && (x !== undefined)
          && (x !== null)
        ) {
          promises.push(this.axisScrollTo(x, anim));
        }

        if (this.hasScrollY
          && (y !== undefined)
          && (y !== null)
        ) {
          promises.push(this.axisScrollTo(y, anim, true));
        }

        Promise.all(promises).then(res => {
          resolve();
        });
      })
    },
    scrollToX(x, anim) {
      return new Promise(resolve => {
        if (!this.hasScrollX
          || !this.ready
          || (x === undefined)
          || (x === null)
        ) {
          resolve();
        }

        this.axisScrollTo(x, anim).then(d => {
          resolve();
        });
      });
    },
    scrollToY(y, anim) {
      return new Promise(resolve => {
        if (!this.hasScrollY
          || !this.ready
          || (y === undefined)
          || (y === null)
        ) {
          resolve();
        }

        this.axisScrollTo(y, anim, true).then(d => {
          resolve();
        });
      });
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
     */
    scrollStartX(anim) {
      if (this.hasScrollX) {
        this.axisScrollTo(0, anim);
      }
    },
    /**
     * Scroll the y axis to the position 0
     * @method scrollStartY
     */
    scrollStartY(anim) {
      if (this.hasScrollY) {
        this.axisScrollTo(0, anim, true);
      }
    },
    /**
     * Scroll the x axis to the previous page
     * @method scrollBeforeX
     */
    scrollBeforeX(anim) {
      if (this.hasScrollX) {
        this.scrollLevel(true, anim);
      }
    },
    /**
     * Scroll the y axis to the previous page
     * @method scrollBeforeY
     */
    scrollBeforeY(anim) {
      if (this.hasScrollY) {
        this.scrollLevel(true, anim, true);
      }
    },
    /**
     * Scroll the x axis to the next page
     * @method scrollBeforeX
     */
    scrollAfterX(anim) {
      if (this.hasScrollX) {
        this.scrollLevel(false, anim);
      }
    },
    /**
     * Scroll the y axis to the next page
     * @method scrollBeforeY
     */
    scrollAfterY(anim) {
      if (this.hasScrollY) {
        this.scrollLevel(false, anim, true);
      }
    },
    /**
     * Scroll the x axis to the end
     * @method scrollEndX
     */
    scrollEndX(anim) {
      if (this.hasScrollX) {
        this.axisScrollTo(this.contentWidth - this.containerWidth, anim);
      }
    },
    /**
    * Scroll the y axis to the end
    * @method scrollEndY
    */
    scrollEndY(anim) {
      if (this.hasScrollY) {
        this.axisScrollTo(this.contentWidth - this.containerWidth, anim, true);
      }
    },
    hasX() {
      return this.scrollable && ((this.axis === 'both') || (this.axis === 'x'));
    },
    hasY() {
      return this.scrollable && ((this.axis === 'both') || (this.axis === 'y'));
    },
    /**
     * Handles the resize of the scroll
     * @method onResize
     * @fires keepCool
     * @emits resize
     * @returns Promise
     */
    async onResize(force) {
      let res = bbn.cp.mixins.resizer.methods.onResize.apply(this);
      const content = this.getRef('scrollContent');
      let sendResizeContent = false;
      if (content
        && ((content.clientWidth !== this.contentWidth)
          || (content.scrollWidth !== this.contentWidth)
          || (content.clientHeight !== this.contentHeight)
          || (content.scrollHeight !== this.contentHeight))
      ) {
        sendResizeContent = true;
      }

      // If the container measures have changed
      if (!this.isResizing && (res || force || sendResizeContent)) {
        // Setting up the element's measures
        // getting current measures of element and scrollable container
        let container = this.$el;
        if (!this.scrollable || !content || !container.clientWidth || !container.clientHeight) {
          return;
        }

        this.isResizing = true;
        await this.$forceUpdate();
        let x = container.scrollLeft;
        let y = container.scrollTop;

        this.contentWidth = content.scrollWidth || content.offsetWidth;
        this.contentHeight = content.scrollHeight || content.offsetHeight;
        this.containerWidth = container.clientWidth;
        this.containerHeight = container.clientHeight;
        // With scrolling on we check the scrollbars
        if (this.scrollable) {
          this.hasScrollX = ((this.axis === 'both') || (this.axis === 'x'))
            && (this.contentWidth > this.containerWidth);
          this.hasScrollY = ((this.axis === 'both') || (this.axis === 'y'))
            && (this.contentHeight > this.containerHeight);
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
          //
          // if (y !== this.currentY) {
          //   this.currentY = y;
          // }

          if (this.scrollReady
            && bbn.fn.isNumber(this.currentX)
            && (this.currentX !== container.scrollLeft)
          ) {
            container.scrollLeft = this.currentX;
          }

          if (this.scrollReady
            && bbn.fn.isNumber(this.currentY)
            && (this.currentY !== container.scrollTop)
          ) {
            container.scrollTop = this.currentY;
          }
        }

        this.isResizing = false;
        this.$emit('resize');
      }
    },
    /**
     * @method initSize
     * @fires onResize
     */
    async initSize() {
      this.scrollReady = true;
      await this.onResize(true);
      this.ready = true;
      this.$emit('resizecontent');
      return this.$forceUpdate();
    },
    /**
     * Creates a delay to set the scroll as ready
     * @method waitReady
     * @fires keepCool
     * @fires onResize
     */
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
    this.initSize();
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
    currentX(x) {
      if (!x) {
        this.$emit('reachleft');
      }
      else {
        let ct = this.$el;
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
        let ct = this.$el;
        if (ct && ct.scrollHeight && (y + ct.clientHeight >= ct.scrollHeight - 10)) {
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
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/scroll.${lang}.lang`);
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
