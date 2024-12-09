export default {
  props: {
    error: {},
    /**
     * Defines if the component has to be cached.
     * @prop {Boolean} [false] cached
     */
    cached: {
      type: Boolean,
      default: false
    },
    /**
     * Defines if the component has to be scrollable.
     * @prop {Boolean} [true] scrollable
     */
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * Defines if the component is disabled.
     * @prop {Boolean} [false] disabled
     */
    disabled: {
      type: [Boolean, Function],
      default: false
    },
  },
  data(){
    return {
      /**
       * The router which the container belongs to if it exists.
       * @data [null] router
       */
      router: null,
      /**
       * The array containing popup objects.
       * @data {Array} [[]] popups
       */
      popups: [],
        /**
       * An object with each mounted children router.
       * @data {Object} [{}] routers
       */
      subrouter: null,
      /**
       * Reacts to mouse movements.
       * @data {Boolean} isOver
       */
      isOver: false,
      /**
       * The closest bbn-container if any.
       * @data {Object|null} _bbn_container
       */
      _bbn_container: null,
      /**
       * A list of form components contained in this container
       * @data {Array} [[]] forms
       */
      forms: [],
      /**
       * The error status if loading goes bad.
       * @data {null|Object} errorStatus
       */
      errorStatus: null,
    };
  },
  computed: {
    args() {
      return bbn.fn.removeEmpty((this.currentView ? bbn.fn.substr(this.currentCurrent, this.currentURL.length) : '').split('/'));
    }
  },
  methods: {
    setRouter() {
      this.router = this.closest('bbn-router');
    },
    /**
     * Returns the full current url.
     * 
     * @method getFullCurrentURL
     * @return {String}
     */
    getFullCurrentURL(){
      return this.router.getFullBaseURL() + this.currentCurrent;
    },


    /**
     * Returns the full url.
     * 
     * @method getFullURL
     * @return {String}
     */
    getFullURL(){
      return this.router.getFullBaseURL() + this.currentURL;
    },


    /**
     * Generates a random name used for the component.
     * 
     * @method randomName
     * @return {String}
     */
    randomName(){
      let n = bbn.fn.randomString(20, 15).toLowerCase();
      while (bbnContainerCp.componentsList.indexOf(n) > -1 ){
        n = bbn.fn.randomString(20, 15).toLowerCase();
      }
      return n;
    },


    /**
     * Gets the popup object.
     *  
     * @method popup
     * @return {Object}
     */
    popup() {
      let popup = this.getPopup();
      return arguments.length ? popup.open.apply(popup, arguments) : popup;
    },


    /**
     * Gets the child component.
     * 
     * @method getComponent
     * @return {Object|Boolean}
     */
    getComponent() {
      return this.getRef('component');
    },


    /**
     * Fires the parent's method enter.
     * 
     * @method enter
     * @fires router.enter
     */
    enter() {
      this.router.enter(this);
    },

    hasArguments(num = 1) {
      return this.args.length >= num;
    },

    onResize() {
      if (this.isVisible && this.ready) {
        return bbn.cp.mixins.resizer.methods.onResize.apply(this);
      }
    },

  }
}
