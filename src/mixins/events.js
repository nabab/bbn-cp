const events = {
  props: {
    /**
     * @memberof eventsComponent
     * @prop {Number} [1000] touchHoldTolerance
     */
    touchHoldTolerance: {
      type: Number,
      default: 1000
    },
    /**
     * @memberof eventsComponent
     * @prop {Number} [10] touchTapTolerance
     */
    touchTapTolerance: {
      type: Number,
      default: 10
    },
    /**
     * @memberof eventsComponent
     * @prop {Number} [30] touchSwipeolerance
     */
    touchSwipeTolerance: {
      type: Number,
      default: 30
    }
  },
  data(){
    return {
      /**
       * Defines if the component has been changed since its mount.
       * @memberof eventsComponent
       * @data {Boolean} [false] isTouched
       */
      isTouched: false,
      /**
       * True if the component is focused.
       * @memberof eventsComponent
       * @data {Boolean} [false] isFocused
       */
      isFocused: false,
      /**
       * @memberof eventsComponent
       * @data {Boolean|Event} [false] touchStarted
       */
      touchStarted: false,
      /**
       * @memberof eventsComponent
       * @data {Boolean|Event} [false] touchMoved
       */
      touchMoved: false,
      /**
       * @memberof eventsComponent
       * @data {Number} [0] touchHoldTimer
       */
      touchHoldTimer: 0
    }
  },
  methods: {
    /**
     * Emits the click event.
     * @method click
     * @param {Event} e 
     * @emit click
     * @memberof eventsComponent
     */
    onClick(e) {
      if (bbn.fn.isEvent(e)) {
        e.stopImmediatePropagation();
      }

      this.$emit('click', e);
    },
    /**
     * Emits the blur event.
     * @method blur
     * @param {Event} e
     * @emit blur
     * @memberof eventsComponent
     */
    onBlur(e) {
      this.isFocused = false;
      if (bbn.fn.isEvent(e)) {
        e.stopImmediatePropagation();
      }

      this.$emit('blur', e);
    },
    /**
     * Emits the event focus
     * @method focus
     * @param {Event} e
     * @return {Function}
     * @memberof basicComponent
     */
    onFocus(e) {
      let ele = this.getRef('element');
      if ( ele && !this.isFocused ){
        ele.focus();
        this.isFocused = true;
      }

      if (bbn.fn.isEvent(e)) {
        e.stopImmediatePropagation();
      }

      this.$emit('focus', e);
    },
    /**
     * Emits the keyup event.
     * @method keyup
     * @param {Event} e
     * @memberof eventsComponent
     * @emit keyup
     */
    onKeyup(e) {
      if (bbn.fn.isEvent(e)) {
        e.stopImmediatePropagation();
      }

      this.$emit('keyup', e);
    },
    /**
     * Emits the keydown event.
     * @method keydown
     * @param {Event} e
     * @memberof eventsComponent
     * @emit keydown
     */
    onKeydown(e) {
      if (bbn.fn.isEvent(e)) {
        e.stopImmediatePropagation();
      }

      this.$emit('keydown', e)
    },
    /**
     * Emits the over event.
     * @method over
     * @param {Event} e
     * @memberof eventsComponent
     * @emit over
     */
    over(e) {
      this.$emit('over', e);
      this.$emit('hover', true, e);
    },
    /**
     * Emits the out event.
     * @method out
     * @param {Event} e
     * @emit out
     * @memberof eventsComponent
     * @emit over
     */
    out(e) {
      this.$emit('out', e);
      this.$emit('hover', false, e);
    },
    /**
     * Sets the prop isTouched to true
     * @method touchstart
     * @memberof eventsComponent
     */
    touchstart(ev) {
      this.$emit('touchstart', ev, this);
      if (!ev.defaultPrevented) {
        this.isTouched = true;
        this.touchStarted = ev;
        clearTimeout(this.touchHoldTimer);
        this.touchHoldTimer = setTimeout(() => {
          if (this.isTouched && !this.touchMoved && !ev.defaultPrevented){
            ev.preventDefault();
            let event = new Event('contextmenu');
            this.$el.dispatchEvent(event);
            this.isTouched = false;
          }
        }, this.touchHoldTolerance);
      }
    },
    /**
     * Sets the prop isTouched to false.
     * @method touchmove
     * @memberof eventsComponent
     */
    touchmove(ev){
      this.$emit('touchmove', ev, this);
      if (!ev.defaultPrevented) {
        //this.isTouched = false;
        if ((Math.abs(this.touchStarted.touches[0].clientX - ev.touches[0].clientX) > this.touchTapTolerance)
          || (Math.abs(this.touchStarted.touches[0].clientY - ev.touches[0].clientY) > this.touchTapTolerance)
        ) {
          clearTimeout(this.touchHoldTimer);
          this.touchMoved = ev;
        }
      }
    },
    /**
     * Sets the prop isTouched to false.
     * @method touchend
     * @memberof eventsComponent
     */
    touchend(ev){
      this.$emit('touchend', ev, this);
      if (!ev.defaultPrevented) {
        if (this.touchStarted && this.touchMoved) {
          let direction = false,
              diffY = Math.abs(this.touchStarted.touches[0].clientY - this.touchMoved.touches[0].clientY),
              diffX = Math.abs(this.touchStarted.touches[0].clientX - this.touchMoved.touches[0].clientX),
              axisX = diffX > diffY;
          if (axisX && (diffX > this.touchSwipeTolerance)) {
            direction = this.touchStarted.touches[0].clientX > this.touchMoved.touches[0].clientX ? 'left' : 'right';
          }
          else if (!axisX && (diffY > this.touchSwipeTolerance)) {
            direction = this.touchStarted.touches[0].clientY > this.touchMoved.touches[0].clientY ? 'top' : 'bottom';
          }
          if (!!direction) {
            this.$emit('swipe', ev, this, direction)
            this.$emit('swipe' + direction, ev, this)
          }
        }
        this.isTouched = false;
        this.touchMoved = false;
        this.touchStarted = false;
      }
    },
    /**
     * Sets the prop isTouched to false.
     * @method touchcancel
     * @memberof eventsComponent
     */
    touchcancel(ev){
      clearTimeout(this.touchHoldTimer);
      this.isTouched = false;
      this.touchStarted = false;
      this.touchMoved = false;
      this.$emit('touchcancel', ev, this);
    }
  },
  /**
   * Adds the class 'bbn-events-component' to the component.
   * @event created
   * @memberof eventsComponent
   */
  created(){
    this.componentClass.push('bbn-events-component');
  },
};

export default events;

