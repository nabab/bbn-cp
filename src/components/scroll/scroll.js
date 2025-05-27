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
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.keepCool
   * @mixin bbn.cp.mixins.events
   */
  mixins: [
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
      inFloater: null,
      bounding: null
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
      if (bbn.fn.isArray(this.offsetX)) {
        return [this.offsetX[0], this.offsetX[1] + (this.hasScrollY ? 10 : 0)];
      }
      else {
        return [this.offsetX, this.offsetX + (this.hasScrollY ? 10 : 0)];
      }
    },
    currentOffsetY() {
      return bbn.fn.isArray(this.offsetY) ? this.offsetY : [this.offsetY, this.offsetY];
    }
  },
  methods: {
    isVisibleInScroll(element, margin = 0) {
      bbn.fn.checkType(element, HTMLElement);
      bbn.fn.checkType(margin, Number);
      const bounding = this.$position(element);
      if ((bounding.bottom >= this.bounding.top - margin)
        && (bounding.right >= this.bounding.left - margin)
        && (bounding.top <= this.bounding.bottom + margin)
        && (bounding.left <= this.bounding.right + margin)
      ) {
        return true;
      }

      return false;
    },
    isXInScroll(element, margin = 0) {
      bbn.fn.checkType(element, HTMLElement);
      bbn.fn.checkType(margin, Number);
      const bounding = this.$position(element);
      return (bounding.right >= this.bounding.left - margin)
        && (bounding.left <= this.bounding.right + margin);
    },
    isYInScroll(element, margin = 0) {
      bbn.fn.checkType(element, HTMLElement);
      bbn.fn.checkType(margin, Number);
      const bounding = this.$position(element);
      return (bounding.bottom >= this.bounding.top - margin)
        && (bounding.top <= this.bounding.bottom + margin);
    },
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
        this.scrollHorizontal(e, ct.scrollLeft);
        this.scrollVertical(e, ct.scrollTop);
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
      const scrollbar = this.getRef(vertical ? 'yScroller' : 'xScroller');
      if (scrollbar) {
        scrollbar.scrollLevel(before, anim);
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
      if (this.currentX !== left) {
        this.currentX = left;
      }
    },
    /**
     * @method scrollVertical
     * @param {Event} ev 
     * @param {Number} top 
     * @emits scrolly
     */
    scrollVertical(ev, top) {
      if (this.currentY !== top) {
        this.currentY = top;
      }
    },
    addVertical(y) {
      this.scrollSet(null, this.currentY + y)
    },
    addHorizontal(x) {
      this.scrollSet(this.currentX + x)
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
      this.bounding = this.$position();
      if (content && this.scrollable) {
        this.hasScrollX = ((this.axis === 'both') || (this.axis === 'x'))
          && (content.scrollWidth > this.offsetWidth);
        this.currentX = content.scrollLeft || this.x || 0;
        this.hasScrollY = ((this.axis === 'both') || (this.axis === 'y'))
          && (content.scrollHeight > this.offsetHeight);
        this.currentY = content.scrollTop || this.y || 0;
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
    currentX(x, ox) {
      if (!x) {
        this.$emit('reachleft');
      }
      else {
        let ct = this.$el;
        if (ct && (x + ct.clientWidth >= ct.scrollWidth)) {
          this.$emit('reachright');
        }
      }
      this.$emit('scrollx', x, ox);
    },
    currentY(y, oy) {
      if (!y) {
        this.$emit('reachtop');
      }
      else {
        let ct = this.getRef('scrollContent');
        if (ct && ct.scrollHeight && (y + ct.offsetHeight >= ct.scrollHeight - 10)) {
          this.$emit('reachbottom');
        }
      }
      this.$emit('scrolly', y, oy);
    },
    stepX(val) {
      this.currentStepX = bbn.fn.isDom(val) ? val.clientHeight : val;
    },
    stepY(val) {
      this.currentStepY = bbn.fn.isDom(val) ? val.clientHeight : val;
    }
  },
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
