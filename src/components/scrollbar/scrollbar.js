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
        [this.isVertical ? 'bottom' : 'right']: this.offsetEnd + 'px'
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
      if (typeof this.invisible === 'boolean') {
        return !this.invisible;
      }

      return this.scroller && this.scroller.isFocused && this.isActive;
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
        document.addEventListener("mousemove", this.onDrag);
        document.addEventListener("touchmove", this.onDrag);
        document.addEventListener("mouseup", this.stopDrag);
        document.addEventListener("touchend", this.stopDrag);
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
        }, 'onDrag', 25);
      }
    },
    /**
     * @method stopDrag
     */
    stopDrag() {
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("touchmove", this.onDrag);
      document.removeEventListener("mouseup", this.stopDrag);
      document.removeEventListener("touchend", this.stopDrag);
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
    adjustFromContainer(container) {
      this.keepCool(() => {
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
      }, 'adjustFromContainer', 50);
    },
    /**
     * @method adjustFromBar
     */
    adjustFromBar(anim){
      this.keepCool(() => {
        if (this.shouldBother) {
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
          this.$emit('scroll', e, this.containerPos);
        }
      }, 'adjustFromBar', 50);
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
      if (!this.isInit) {
        this.onResize();
        if ( !this.container && this.scroller ){
          this.scroller.$on("resize", this.onResize, false, this);
          this.axisScrollTo(this.initialScroll);
          this.scroller.$on("scroll", () => this.adjustFromContainer(), false, this);
          this.scroller.$on("mousemove", this.overContent, false, this);
        }
        else if (this.container) {
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
  },
};

import cpHtml from './scrollbar.html';
import cpStyle from './scrollbar.less';
//import cpLang from './_i18n/index.js';
export default {
  name: 'bbn-scrollbar',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
