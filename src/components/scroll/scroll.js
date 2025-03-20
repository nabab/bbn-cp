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
     * @prop {Number} [400] duration
     */
    duration: {
      type: Number,
      default: 400
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
     * @prop {Boolean|String} [false] invisible
     */
    invisible: {
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
     * Will scroll page by page
     * @prop {Boolean} [true] fullPage
     */
    fullPage: {
      type: Boolean,
      default: false
    },
    /**
     * no scroll no functionality, no container
     * @prop {Boolean} [true] disabled
     */
    disabled: {
      type: Boolean,
      default: false
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
    afterScrollDelay: {
      type: Number,
      default: 500
    },
    /**
     * Still show the scrollbar when no activity
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
       * Defines if the scroll has to be hidden basing on the prop invisible
       * @data {Boolean} hiddenX
       */
      hiddenX: (this.invisible === true) || ((this.invisible === 'x')),
      /**
       * @todo not used
       * Defines if the scroll has to be hidden basing on the prop invisible
       * @data {Boolean} hiddenY
       */
      hiddenY: (this.invisible === true) || ((this.invisible === 'y')),
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
      currentStepX: this.stepX instanceof HTMLElement ? this.stepX.clientHeight : this.stepX,
      currentStepY: this.stepY instanceof HTMLElement ? this.stepY.clientHeight : this.stepY,
      inFloater: null
    };
  },
  computed: {
    hasX() {
      return this.scrollable && ['both', 'x'].includes(this.axis);
    },
    hasY() {
      return this.scrollable && ['both', 'y'].includes(this.axis);
    },
    resizerObserved() {
      return this.getRef('scrollContent');
    },
    /**
     * Based on the prop fixedFooter and fullScreen, a string is returned containing the classes for the form template.
     *
     * @computed currentClass
     * @return {String}
     */
    elementClass() {
      let st = this.componentClass.join(' ');
      if (!this.scrollable) {
        st = bbn.fn.replaceAll('bbn-resize-emitter', '', st);
        st += ' bbn-no-scrollbar';
      }
      else {
        st += ' bbn-scroll-scrollable';
      }

      if (this.disabled) {
        st += ' bbn-scroll-disabled';
      }

      if (this.hasX) {
        st += ' bbn-scroll-x';
      }
      if (this.hasY) {
        st += ' bbn-scroll-y';
      }

      return st;
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
    rgbaColor() {
      const rgb = bbn.fn.hex2rgb(bbn.fn.getCssVar('primary-background'));
      return rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.2';
    },
    currentOffsetX() {
      return bbn.fn.isArray(this.offsetX) ? this.offsetX : [this.offsetX, this.offsetX];
    },
    currentOffsetY() {
      return bbn.fn.isArray(this.offsetY) ? this.offsetY : [this.offsetY, this.offsetY];
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
      if (!this.scrollable) {
        return;
      }

      let ct = this.getRef('scrollContent');
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
          if (this.hasScrollX && this.$refs.xScroller && bbn.fn.isNumber(this.$refs.xScroller.nextLevel) && (Math.abs(this.currentX-this.$refs.xScroller.nextLevel) < 2)) {
            return;
          }
          // Not acting for events sent by scrollTo (scrollbars will write in nextLevel)
          if (this.hasScrollY && this.$refs.yScroller && bbn.fn.isNumber(this.$refs.yScroller.nextLevel) && (Math.abs(this.currentY-this.$refs.yScroller.nextLevel) < 2)) {
            return;
          }
          if (!this.scrollInitial) {
            this.scrollInitial = {x: this.currentX, y: this.currentY};
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
            this.$refs.xScroller.axisScrollTo(left, true).then(() => {
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
            this.$refs.yScroller.axisScrollTo(top, true).then(() => {
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
      if (!this.scrollable) {
        return;
      }

      bbn.fn.log('axisSmoothScrollTo', arguments);
      return new Promise((resolve, reject) => {
        const content = this.getRef('scrollContent');
        const start = content['scroll' + (vertical ? 'Top' : 'Left')];
        const distance = end - start;
        const startTime = new Date().getTime();
        if (!duration) {
          duration = this.duration;
        }

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
          content['scroll' + (vertical ? 'Top' : 'Left')] = Math.round(newPos);
        }, 1000 / 60); // 60 fps
      });
    },
    /**
     * Scrolls to the given position using the given animation.
     * @method scrollTo
     * @fires adjustFromContainer
     */
    axisScrollTo(val, anim, vertical) {
      if (!this.scrollable) {
        return;
      }

      this.onResize();
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

        const content = this.getRef('scrollContent');
        const contentSize = content['scroll' + (vertical ? 'Height' : 'Width')];
        const containerSize = this['offset' + (vertical ? 'Height' : 'Width')];
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
          bbn.fn.log("scrollTo part 1", num);

          if ( num < 0 ){
            num = 0;
          }
          else if (num > (contentSize - containerSize + 100)) {
            num = contentSize - containerSize;
          }

          if (anim) {
            this.axisSmoothScrollTo(num, null, vertical).then(() => {
              resolve();
            });
          }
          else {
            content['scroll' + (vertical ? 'Top' : 'Left')] = num;
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
      const containerSize = this['offset' + (vertical ? 'Height' : 'Width')];
      if (containerSize) {
        let movement = containerSize;
        if (before) {
          movement = -movement;
        }

        this.scrollSet(this['scroll' + (vertical ? 'Top' : 'Left')] + movement, anim, vertical);
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
    scrollSet(x, y, anim) {
      return new Promise(resolve => {
        if (!this.hasScroll || !this.ready) {
          resolve();
        }

        const promises = [];
        if (this.hasScrollX
          && (x !== undefined)
          && (x !== null)
          && this.getRef('xScroller')
        ) {
          promises.push(this.getRef('xScroller').axisScrollTo(x, anim));
        }

        if (this.hasScrollY
          && (y !== undefined)
          && (y !== null)
          && this.getRef('yScroller')
        ) {
          promises.push(this.getRef('yScroller').axisScrollTo(y, anim, true));
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
          || !this.getRef('xScroller')
        ) {
          resolve();
        }

        this.this.getRef('xScroller').axisScrollTo(x, anim).then(d => {
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
          || !this.getRef('yScroller')
        ) {
          resolve();
        }

        this.getRef('yScroller').axisScrollTo(y, anim, true).then(d => {
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
      this.scrollSet(null, this.currentY + y)
      this.$emit('scrolly', this.currentY);
    },
    addHorizontal(x) {
      this.scrollSet(this.currentX + x)
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
    /* scrollBefore(anim) {
      this.scrollBeforeX(anim);
      this.scrollBeforeY(anim);
    }, */
    /**
     * @method scrollAfter
     * @fires scrollAfterX
     * @fires scrollAfterY
     */
    /* scrollAfter(anim) {
      this.scrollAfterX(anim);
      this.scrollAfterY(anim);
    }, */
    /**
     * Scroll the x axis to the position 0
     * @method scrollStartX
     */
    scrollStartX(anim) {
      this.axisScrollTo(0, anim);
    },
    /**
     * Scroll the y axis to the position 0
     * @method scrollStartY
     */
    scrollStartY(anim) {
      this.axisScrollTo(0, anim, true);
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
      this.axisScrollTo(this.getRef('scrollContent').scrollWidth - this.offsetWidth, anim);
    },
    /**
    * Scroll the y axis to the end
    * @method scrollEndY
    */
    scrollEndY(anim) {
      this.axisScrollTo(this.getRef('scrollContent').scrollHeight - this.offsetHeight, anim, true);
    },
    /**
     * Handles the resize of the scroll
     * @method onResize
     * @fires keepCool
     * @emits resize
     * @returns Promise
     */
    onResize() {
      const content = this.getRef('scrollContent');
      if (this.scrollable) {
        this.hasScrollX = ((this.axis === 'both') || (this.axis === 'x'))
          && (content.scrollWidth > this.offsetWidth);
        this.hasScrollY = ((this.axis === 'both') || (this.axis === 'y'))
          && (content.scrollHeight > this.offsetHeight);
        this.hasScroll = this.hasScrollY || this.hasScrollX;
        this.$emit('resize');
        return new Promise((resolve) => {
          resolve();
        });
      }
    },
    /**
     * @method initSize
     * @fires onResize
     */
    async initSize() {
      this.scrollReady = true;
      this.onResize(true);
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
            && (this.scrollWidth !== contentWidth)
            && (
              !this.scrollWidth
              || (Math.abs(contentWidth - this.scrollWidth) > 1)
            )
          )
          || (
            contentHeight
            && (this.scrollHeight !== contentHeight)
            && (
              !this.scrollHeight
              || (Math.abs(contentHeight - this.scrollHeight) > 1)
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
        let ct = this.getRef('scrollContent');
        if (ct && ct.scrollHeight && (y + ct.offsetHeight >= ct.scrollHeight - 10)) {
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
  },
  components: {
    scrollbar: {
      template: `
<div :class="[componentClass, 'bbn-radius', {
        vertical: isVertical,
        horizontal: !isVertical
      }]"
      :style="barStyle"
      bbn-show="isVisible"
      @click="jump($event)"
      @dblclick="jump($event, true)"
      @mouseenter="isOverSlider = true"
      @mouseleave="isOverSlider = false">
  <div :class="{
        'bbn-scroll-slider': true,
        'bbn-primary': true,
        'bbn-scroll-not-dragged': !dragging
  }"
        :style="sliderStyle"
        ref="scrollSlider"
        @touchstart="startDrag"
        @mousedown="startDrag">
  </div>
</div>
      `,
      mixins:
      [
        bbn.cp.mixins.basic,
        bbn.cp.mixins.keepCool
      ],
      props: {
        /**
         * The orientation of the scrollbar (required).
         * @prop {String} orientation
         */
        orientation: {
          required: true,
          type: String
        },
        /**
         * The instance of bbn-scroll.
         * @prop {htmlElement} scroller
         */
        scroller: {
          type: HTMLElement,
          default(){
            return this.$parent?.$options?._componentTag === 'bbn-scroll' ? this.$parent : null;
          }
        },
        /**
         * The rail.
         * @prop {HTMLElement|Object} container
         */
        container: {
          type: HTMLElement
        },
        /**
         * Says if the scrollbar is shown, hidden, or shown when needed (auto).
         * @prop {String|Boolean} ['auto'] invisible
         */
        invisible: {
          type: [String, Boolean],
          default: 'auto'
        },
        /**
         * @prop {Number} [2] tolerance
         */
        tolerance: {
          type: Number,
          default: 2
        },
        /**
         * @prop {Number} [0] scrolling
         */
        scrolling: {
          type: Number,
          default: 0
        },
        /**
         * @prop {(HTMLElement|Array|Function)} [[]] scrollAlso
         */
        scrollAlso: {
          type: [HTMLElement, Array, Function],
          default(){
            return [];
          }
        },
        /**
         * @prop {(Number|Object)} [0] initial
         */
        initial: {
          type: [Number, Object],
          default: 0
        },
        /**
         * The color of the scrollbar.
         * @prop {String} color
         */
        color: {
          type: String
        },
        /**
         * The minimum size in pixel of the scrollbar.
         * @prop {Number} minSize
         */
        minSize: {
          type: Number,
          default: 20
        },
        /**
         * @prop {(Number|Array)} offset
         */
        offset: {
          type: [Number, Array],
          default(){
            return [0, 0];
          }
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
           * The container of the scrollbar or the ref scrol.
           * @data {HTMLElement} realContainer
           */
          realContainer: this.container ?
            this.container :
            (this.scroller ? this.scroller.getRef('scrollContent') : false),
          /**
           * The container's size.
           * @data {Number} [0] containerSize
           */
          containerSize: 0,
          /**
           * The content size.
           * @data {Number} [0] contentSize
           */
          contentSize: 0,
          /**
           * The container posiion.
           * @data {Number} [0] containerPos
           */
          containerPos: 0,
          /**
           * The slider position.
           * @data {Number} [0] sliderPos
           */
          sliderPos: 0,
          /**
           * @data {Boolean} [false] dragging
           */
          dragging: false,
          /**
           * The size.
           * @data {Number} [100] size
           */
          size: 100,
          /**
           * The start.
           * @data {Number} [0] start
           */
          start: 0,
          /**
           * The position.
           * @data {Number} [0] position
           */
          position: this.scrolling,
          /**
           * @data {Number} [0] currentScroll
           */
          currentScroll: 0,
          /**
           * The move timeout.
           * @data {Number} [0] moveTimeout
           */
          moveTimeout: 0,
          /**
           * True if the scrollbar is shown.
           * @data {Boolean} show
           */
          show: this.invisible === 'auto' ? false : !this.invisible,
          /**
           * @data {Number|Object} scroll
           */
          initialScroll: this.initial,
          /**
           * @data {Boolean} [false] isReaching
           */
          isReaching: false,
          /**
           * @data {Boolean} [false] isActive
           */
          isActive: false,
          /**
           * @data {Boolean} [false] isOverSlider
           */
          isOverSlider: false,
          animationInterval: false,
          nextLevel: false,
          adjustTimeout: false
        };
      },
      computed: {
        /**
         * @computed showBother
         * @returns Boolean
         */
        shouldBother(){
          return this.contentSize > this.containerSize;
        },
        /**
         * @computed ratio
         * @returns {Number}
         */
        ratio(){
          if ( this.shouldBother ){
            return (this.containerSize - this.offsetStart - this.offsetEnd) / this.contentSize;
          }
          return 1;
        },
        /**
         * @computed sliderSize
         * @return {Number}
         */
        sliderSize(){
          if ( this.shouldBother ){
            let size = Math.round(this.containerSize * this.ratio);
            if (size < this.minSize) {
              size = this.minSize;
            }
            return size;
          }
          return 0;
        },
        /**
         * @computed maxSliderPos
         * @return {Number}
         */
        maxSliderPos(){
          return this.shouldBother ? this.containerSize - this.sliderSize - this.offsetStart - this.offsetEnd : 0;
        },
        offsetStart() {
          return (bbn.fn.isArray(this.offset) ? this.offset[0] : this.offset);
        },
        offsetEnd() {
          return (bbn.fn.isArray(this.offset) ? this.offset[1] : this.offset);
        },
        /**
         * @computed barStyle
         * @returns {Object}
         */
        barStyle(){
          return {
            opacity: (this.show || this.keepVisible) && this.shouldBother ? 1 : 0,
            [this.isVertical ? 'top' : 'left'] : this.offsetStart + 'px',
            [this.isVertical ? 'right' : 'bottom']: this.offsetEnd + 'px'
          }
        },
        /**
         * @computed sliderStyle
         * @returns {Object}
         */
        sliderStyle(){
          let res = {};
          if ( this.shouldBother ){
            res[this.isVertical ? 'height' : 'width'] = this.sliderSize + 'px';
            res[this.isVertical ? 'top' : 'left'] = this.sliderPos + 'px';
            if ( this.color ){
              res.backgroundColor = this.color;
            }
          }
          return res;
        },
        /**
         * @computed isVertical
         * @returns {Boolean}
         */
        isVertical(){
          return this.orientation !== 'horizontal';
        },
        /**
         * @computed realSize
         * @returns {Number}
         */
        realSize(){
          return this.containerSize ? this.containerSize / 100 * this.size : 0;
        },
        /**
         * @computed isVisible
         * @returns {Boolean}
         */
        isVisible(){
          return (this.invisible !== true) && ((this.scroller && this.scroller.isFocused) && this.isActive || this.isActive);
        },
      },
      methods: {
        /**
         * @method startDrag
         * @param {Event} e
         */
        startDrag(e) {
          if ( this.realContainer ){
            e.preventDefault();
            e.stopPropagation();
            e = e.changedTouches ? e.changedTouches[0] : e;
            this.dragging = true;
            // Start in pixels
            this.start = this.isVertical ? e.pageY : e.pageX;
          }
        },
        /**
         * @method onDrag
         * @param {Event} e
         */
        onDrag(e) {
          if ( this.realContainer && this.dragging && this.containerSize ){
            this.keepCool(() => {
              e = e.changedTouches ? e.changedTouches[0] : e;
              // Movement in pixel
              let newStart = this.isVertical ? e.pageY : e.pageX;
              let movement = newStart - this.start;
              if ( movement && this.setSliderPos(this.sliderPos + movement)) {
                this.adjustFromBar();
              }
              this.start = newStart;
            })
          }
        },
        /**
         * @method stopDrag
         */
        stopDrag() {
          this.dragging = false;
        },
        setSliderPos(pos) {
          if (bbn.fn.isNumber(pos)) {
            if (pos < 0) {
              pos = 0;
            }

            if (pos > this.maxSliderPos) {
              pos = this.maxSliderPos;
            }

            if (this.sliderPos !== pos) {
              this.sliderPos = pos;
              return true;
            }
          }

          return false;
        },
        /**
         * @method adjustFromContainer
         * @param {HTMLElement} container
         */
        adjustFromContainer(container){
          if (this.shouldBother && !this.dragging) {
            let prop = this.isVertical ? 'scrollTop' : 'scrollLeft';
            let ok = false;
            if (!container) {
              container = this.realContainer;
              if (this.scroller) {
                this.containerPos = this.scroller['current' + (this.isVertical ? 'Y' : 'X')];
                ok = true;
              }
            }
            if (!ok) {
              this.containerPos = container[prop];
            }
            this.setSliderPos(this.containerPos * this.ratio);
            /*
            if ( container !== this.realContainer ){
              this.realContainer[prop] = this.containerPos;
            }
            */
            bbn.fn.each(this.scrollableElements(), a => {
              if ( a !== container ){
                a[prop] = this.containerPos;
              }
            });
            this.overContent();
          }
        },
        /**
         * @method adjustFromBar
         */
        adjustFromBar(anim){
          if ( this.shouldBother ){
            this.$nextTick(() => {
              this.containerPos = (this.sliderPos / this.ratio);
              let prop = this.isVertical ? 'scrollTop' : 'scrollLeft';
              if (this.scroller) {
                this.axisScrollTo(this.containerPos, anim);
              }
              else {
                this.realContainer[prop] = this.containerPos;
                bbn.fn.each(this.scrollableElements(), a => {
                  a[prop] = this.containerPos;
                });
              }

              let e = new Event('scroll');
              this.$emit('scroll' + (this.isVertical ? 'y' : 'x'), e, this.containerPos);
            })
          }
        },
        /**
         * When the users jumps by clicking the scrollbar while a double click will activate tillEnd.
         * @method jump
         * @param {Event} e
         * @param {Boolean} precise
         */
        jump(e, precise) {
          if ( this.realContainer ){
            let isRail = e.target === this.$el;
            if ( isRail ){
              let position = this.$position(this.getRef('scrollSlider'));
              // Calculate the Movement
              let clickPoint = this.isVertical ? e.pageY : e.pageX;
              let isBefore = clickPoint < position[this.isVertical ? 'top' : 'left'];
              let isAfter = clickPoint > position[this.isVertical ? 'bottom' : 'right'];
              if ( isBefore || isAfter ){
                let movement = isBefore ? - (
                        position[this.isVertical ? 'top' : 'left'] - clickPoint) :
                        clickPoint - (position[this.isVertical ? 'top' : 'left']) - (position[this.isVertical ? 'height' : 'width']);
                if ( !precise ){
                  if ( isBefore ){
                    this.scrollBefore(true);
                  }
                  else{
                    this.scrollAfter(true);
                  }
                }
                else {
                  this.axisScrollTo(Math.round((this.sliderPos + movement) / this.ratio));
                }
              }
            }
          }
        },
        /**
         * @method scrollLevel
         * @param {Boolean} before
         */
        scrollLevel(before, anim) {
          if ( this.sliderSize ){
            let movement = Math.round(this.sliderSize - (this.sliderSize * 0.1));
            if ( before ){
              movement = -movement;
            }

            this.axisScrollTo(Math.round((this.sliderPos + movement) / this.ratio), anim);
          }
        },
        /**
         * @method scrollBefore
         * @fires scrollLevel
         */
        scrollBefore(anim) {
          return this.scrollLevel(true, anim);
        },
        /**
         * @method scrollAfter
         * @fires scrollLevel
         */
        scrollAfter(anim) {
          return this.scrollLevel(false, anim);
        },
        /**
         * Gets the array of scrollable elements according to scrollAlso attribute.
         * @method scrollableElements
         * @returns {Array}
         */
        scrollableElements(){
          let tmp = this.scrollAlso;
          if (bbn.fn.isFunction(tmp) ){
            tmp = tmp();
          }
          else if ( !Array.isArray(tmp) ){
            tmp = [tmp];
          }
          let res = [];
          if ( bbn.fn.isArray(tmp) ){
            bbn.fn.each(tmp, a => {
              if ( a ){
                res.push(a)
              }
            })
          }
          return res;
        },
        /**
         * Calculates all the proportions based on content.
         * @method onResize
         */
        onResize(){
          if (this.scroller) {
            let tmp1 = this.scroller[this.isVertical ? 'offsetHeight' : 'offsetWidth'];
            let tmp2 = this.realContainer[this.isVertical ? 'scrollHeight' : 'scrollWidth'];
            if ( tmp1 < 20 ){
              this.containerSize = 0;
              this.contentSize = 0;
              this.size = 0;
              this.isActive = false;
              return;
            }
            if ( (tmp1 !== this.containerSize) || (tmp2 !== this.contentSize) ){
              this.containerSize = tmp1 || 0;
              this.contentSize = tmp2 || 0;
            }
            this.isActive = this.contentSize > this.containerSize + 2;
          }
        },
        /**
         * Sets all event listeners.
         * @method initContainer
         */
        initContainer(){
          if (this.scroller && !this.isInit) {
            this.onResize();
            if ( !this.container && this.scroller ){
              this.scroller.$on("resize", this.onResize);
              this.axisScrollTo(this.initialScroll);
              this.scroller.$on("scroll", () => this.adjustFromContainer());
              this.scroller.$on("mousemove", this.overContent);
            }
            else{
              this.container.addEventListener("mousemove", this.overContent);
              this.container.addEventListener('scroll', () => this.adjustFromContainer());
            }
            bbn.fn.each(this.scrollableElements(), a => {
              a.addEventListener('scroll', () => this.adjustFromContainer(), {passive: true});
              a.addEventListener('scroll', this.overContent)
            });

            this.isInit = true;
          }
        },
        /**
         * When the mouse is over the content.
         * @method overContent
         */
        overContent(){
          this.keepCool(() => {
            clearTimeout(this.moveTimeout);
            if ( !this.show ){
              this.show = true;
            }
            this.moveTimeout = setTimeout(() => {
              if (!this.isOverSlider) {
                this.hideSlider();
              }
            }, 500);
          }, 'overContent', 250)
        },
        /**
         * @method showSlider
         */
        showSlider() {
          clearTimeout(this.moveTimeout);
          if ( !this.show ){
            this.show = true;
          }
        },
        /**
         * @method hideSlider
         */
        hideSlider() {
          if ( !this.dragging && this.show ){
            this.show = false;
          }
        },
        /**
         * Animates the bar.
         * @method animateBar
         */
        animateBar(){
          return;
          if ( this.$refs.scrollSlider ){
            //this.dragging = true;
            let anim = {};
            if ( this.isVertical ){
              anim.height = this.size + '%';
              anim.top = this.position + '%';
            }
            else{
              anim.width = this.size + '%';
              anim.left = this.position + '%';
            }
          }
        },
        /**
         * Smooth scroll animation
         * @param {int} endX: destination x coordinate
         * @param {int} endY: destination y coordinate
         * @param {int} duration: animation duration in ms
         */
        smoothScrollTo(end, duration) {
          return new Promise((resolve, reject) => {
            const start = this.realContainer['scroll' + (this.isVertical ? 'Top' : 'Left')];
            const distance = end - start;
            const startTime = new Date().getTime();

            duration = typeof duration !== 'undefined' ? duration : this.scroller.duration || 400;

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
              this.nextLevel = Math.round(newPos);
              this.realContainer['scroll' + (this.isVertical ? 'Top' : 'Left')] = this.nextLevel;
            }, 1000 / 60); // 60 fps
          });
        },
        /**
         * Scrolls to the given position using the given animation.
         * @method scrollTo
         * @fires adjustFromContainer
         */
        axisScrollTo(val, anim) {
          return new Promise(resolve => {
            if (this.shouldBother) {
              if (this.animationInterval) {
                clearInterval(this.animationInterval);
              }

              let num = 0;
              let ele = false;
              if (val) {
                if (this.$isComponent(val) && val.$el) {
                  ele = val.$el;
                }
                else if (bbn.fn.isDom(val)){
                  ele = val;
                }
              }

              if (ele) {
                let container = ele.offsetParent;
                // The position is equal to the offset of the target
                // minus the size of the viewport, which isn't scrolled,
                // plus half the size of the viewport to center it
                // therefore removing half of the viewport does the trick
                num = ele[this.isVertical ? 'offsetTop' : 'offsetLeft']
                      - Math.round(this.containerSize/2);
                while (container && (container !== this.scroller.$el)) {
                  if (container.contains(this.scroller.$el)) {
                    break;
                  }
                  else{
                    num += container[this.isVertical ? 'offsetTop' : 'offsetLeft'];
                    container = container.offsetParent;
                  }
                }
              }
              else if ( bbn.fn.isPercent(val) ){
                num = Math.round(parseFloat(val) * this.contentSize / 100);
              }
              else if (bbn.fn.isNumber(val)) {
                num = val;
              }

              if (bbn.fn.isNumber(num)){
                //bbn.fn.log("scrollTo part 1", num);
                if ( num < 0 ){
                  num = 0;
                }
                else if (num > (this.contentSize - this.containerSize + 100)) {
                  num = this.contentSize - this.containerSize;
                }

                //bbn.fn.log("scrollTo part 2", num);
                this.containerPos = num;
                if (anim) {
                  this.smoothScrollTo(num).then(() => {
                    resolve();
                  });
                }
                else {
                  this.sliderPos = this.containerPos * this.ratio;
                  this.nextLevel = Math.round(num);
                  this.realContainer['scroll' + (this.isVertical ? 'Top' : 'Left')] = num;
                  resolve();
                }
              }
            }
          });
        },
        /**
         * Moves the scrollbar to the position 0.
         * @method scrollStart
         * @fires scrollTo
         */
        scrollStart(anim){
          this.axisScrollTo(0, anim);
        },
         /**
         * Moves the scrollbar to the end position.
         * @method scrollEnd
         * @fires scrollTo
         */
        scrollEnd(anim){
          this.axisScrollTo(this.contentSize - this.containerSize, anim);
        }
      },
      watch: {
        /**
         * @watch isOverSlider
         * @fires initContainer
         */
        isOverSlider(v){
          if (!this.dragging) {
            if (!v) {
              this.overContent();
            }
            else if (!this.show) {
              this.showSlider();
            }
          }
        },
        /**
         * @watch container
         * @fires initContainer
         */
        container(){
          this.initContainer();
        },
        /**
         * @watch show
         * @fires onResize
         */
        show(v){
          if (v) {
            this.onResize();
          }
        },
        /**
         * @watch sliderPos
         * @fires showSlider
         */
        sliderPos(){
          this.showSlider();
        },
        dragging(v) {
          if (this.scroller) {
            this.scroller.isDragging = v
          }
        }
      },
      /**
       * Adds the css class for the orientation of the scrollbar.
       * @event created
       */
      created(){
        this.componentClass.push(this.orientation);
      },
      /**
       * Adds the events listener and launch the resize of the scrollbar.
       * @event mounted
       */
      mounted() {
        this.initContainer();
        document.addEventListener("mousemove", this.onDrag);
        document.addEventListener("touchmove", this.onDrag);
        document.addEventListener("mouseup", this.stopDrag);
        document.addEventListener("touchend", this.stopDrag);
        this.onResize();
        this.overContent();
      },
      /**
       * Removes the events listener.
       * @event beforeDestroy
       */
      beforeDestroy() {
        if ( this.realContainer && this.isInit ){
          if ( !this.container && this.scroller ){
            this.scroller.$off("resize", this.onResize);
            this.scroller.$off("scroll", () => this.adjustFromContainer());
            this.scroller.$off("mousemove", this.overContent);
          }
          else{
            this.container.removeEventListener('mousemove', this.overContent);
            this.container.removeEventListener('scroll', () => this.adjustFromContainer);
          }
          bbn.fn.each(this.scrollableElements(), a => {
            a.removeEventListener('scroll', () => this.adjustFromContainer(), {passive: true});
            a.removeEventListener('mousemove', this.overContent);
          });
        }
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("touchmove", this.onDrag);
        document.removeEventListener("mouseup", this.stopDrag);
        document.removeEventListener("touchend", this.stopDrag);
      },
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
