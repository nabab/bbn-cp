/**
 * @file bbn-container component
 *
 * @description bbn-container is a uniquely identified container component that can be used by bbn-tabnav.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 *
 * @created 15/02/2017
 */

import {
  setCurrent,
  setTitle,
  setIcon,
  setColor,
  setLoaded,
} from './_setters.js';

import {
  show,
  close,
  pin,
  unpin,
} from './_manipulate.js';

import {
  setScreenshot,
  unsetScreenshot,
  saveScreenshot,
  takeScreenshot,
  updateScreenshot,
} from './_screenshot.js';

import {
  addMenu,
  deleteMenu,
  showMenu,
} from './_menu.js';

import {
  init,
  reload,
  registerRouter,
  unregisterRouter,
} from './_2change.js';

import {
  getFullCurrentURL,
  getFullURL,
  randomName,
  popup,
  getComponent,
  enter,
  onResize
} from './_misc.js';

/**
 * @component
 * @param {string} url - The URL on which the tabNav will be initialized.
 * @param {boolean} autoload - Defines if the tab will be automatically loaded based on URLs. False by default
 * except if it is true for the parent.
 * @param {string} orientation - The position of the tabs' titles: top (default) or bottom.
 * @param {string} root - The root URL of the tabNav, will be only taken into account for the top parents'
 * tabNav, will be automatically calculated for the children.
 * @param {boolean} scrollable - Sets if the tabs' titles will be scrollable in case they have a greater width
 * than the page (true), or if they will be shown multilines (false, default).
 * @param {array} source - The tabs shown at init.
 * @param {string} current - The URL to which the tabnav currently corresponds (its selected tab).
 * @param {string} baseURL - The parent TabNav's URL (if any) on top of which the tabNav has been built.
 * @param {array} parents - The tabs shown at init.
 * @param {array} tabs - The tabs configuration and state.
 * @param {boolean} parentTab - If the tabNav has a tabNav parent, the tab Vue object in which it stands, false
 * otherwise.
 * @param {boolean|number} selected - The index of the currently selected tab, and false otherwise.
 */

const cpDef = {
  name: 'bbn-container',
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.observer
   */
  statics() {
    return {
      componentsList: []
    }
  },
  mixins: 
  [
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.resizer, 
    bbn.cp.mixins.observer
  ],
  props: {
    /**
     * The index of the container
     * @prop {Number} idx
     */
    idx: {
      type: Number
    },
    /**
     * The timestamp of the last activation
     * @prop {Number} last
     */
    last: {
      type: Number
    },
    /**
     * A unique id for the container that will ben used as index by the router
     * @prop {String} uid
     */
    uid: {
      type: String,
      default() {
        return bbn.fn.randomString();
      }
    },
    /**
     * A unique id for the container that will ben used as index by the router
     * @prop {String} uid
     */
    visual: {
      type: Boolean,
      default: false
    },
    /**
     * Time between 2 automatic screenshot in visual mode, in milliseconds
     * @prop {Number} [43200000] screenshotDelay (12 hours)
     */
    screenshotDelay: {
      type: Number,
      default: 43200000
    },
    pane: {},
    error: {},
    component: {},
    /**
     * The source of the component.
     * @prop {Object|Function} source
     */
    source: {
      type: [Array, Object, String, Function],
    },
    /**
     * The title of the component.
     * @prop {String|Number} ['Untitled'] title
     */
    title: {
      type: [String, Number],
      default: bbn._("Untitled")
    },
    /**
     * The options object of the component.
     * @prop {Object} options
     */
    options: {
      type: Object,
      default(){
        return {}
      }
    },
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
      default: false
    },
    /**
     * Defines the component to use.
     * @prop component
     */
    component: {
      type: [String, Object, Function]
    },
    /**
     * Defines the icon.
     * @prop {String|Boolean} icon
     */
    icon: {
      type: [String, Boolean],
    },
    /**
     * Defines if the component can have a text.
     * @prop {Boolean} [false] notext
     */
    notext: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the component's content.
     * @prop {String} [''] content
     */
    content: {
      type: String,
      default: ""
    },
    /**
     * Defines the menu.
     * @prop {Array|Function} menu
     */
    menu: {
      type: [Array, Function, Boolean]
    },
    /**
     * Defines if the component is loaded.
     * @prop {Boolean} loaded
     */
    loaded: {
      type: Boolean,
      default: false
    },
    /**
     * Tells if the component is currently loading.
     * @prop {Boolean} loading
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the component's fcolor.
     * @prop {String} fcolor
     */
    fcolor: {
      type: String
    },
    /**
     * Defines the component's bcolor.
     * @prop {String} bcolor
     */
    bcolor: {
      type: String
    },
    /**
     * @prop {Boolean} [false] load
     */
    load: {
      type: Boolean,
      default: false
    },
    /**
     * Defines if the component has to be selected.
     * @prop {Boolean|Number} [false] selected
     */
    selected: {
      type: [Boolean, Number],
      default: false
    },
    /**
     * Defines the css string for the component.
     * @prop {String} [''] css
     */
    css: {
      type: String,
      default: ""
    },
    /**
     * @prop {String|Object} advert
     */
    advert: {
      type: [String, Object]
    },
    /**
     * @prop {String} help
     */
    help: {
      type: String
    },
    /**
     * @prop {Array} imessages
     */
    imessages: {
      type: [Array, Function],
      default() {
        return []
      }
    },
    /**
     * @prop script
     */
    script: {},
    /**
     * Defines if the component has to be fixed.
     * @prop {Boolean|Number} [false] fixed
     */
    fixed: {
      type: [Boolean, Number],
      default: false
    },
    /**
     * Defines
     if the component has to be pinned.
      * @prop {Boolean|Number} [false] pinned
        */
    pinned: {
      type: [Boolean, Number],
      default: false
    },
    /**
     * Defines the url.
     * @prop {String|Number} url
     */
    url: {
      type: [String, Number]
    },
    /**
     * @prop current
     * @prop {String|Number} current
     */
    current: {
      type: [String, Number]
    },
    /**
     * @prop {Boolean} [true] real
     */
    real: {
      type: Boolean,
      default: true
    },
    /**
     * The object of configuration for the component
     * @prop {Object} cfg
     */
    cfg: {
      type: Object
    },
    /**
     * @prop {Object} events
     */
    events: {
      type: Object,
      default(){
        return {}
      }
    },
    /**
     * Defines if the component is disabled.
     * @prop {Boolean} [false] disabled
     */
    disabled: {
      type: [Boolean, Function],
      default: false
    },
    /**
     * Defines if the component is hidden.
     * @prop {Boolean} [false] hidden
     */
    hidden: {
      type: [Boolean, Function],
      default: false
    },
    portal: {
      type: [String, HTMLElement, Boolean],
      default: false
    }
  },
  data(){
    return {
      /**
       * The router which the container belongs to if it exists.
       * @data [null] router
       */
      router: null,
      /**
       * True if the data changes and is unsaved.
       * @data {Boolan} [false] dirty
       */
      dirty: false,
      /**
       * True if the container is a componenent.
       * @data [null] isComponent
       */
      isComponent: null,
      /**
       * True if the container is fullscreen.
       * @data {Boolean} [false] fullScreen
       */
      fullScreen: false,
      /**
       * A random unique component name.
       * @data {String} [this.randomName()] componentName
       */
      componentName: this.randomName(),
      /**
       * The array containing popup objects.
       * @data {Array} [[]] popups
       */
      popups: [],
        /**
       * An object with each mounted children router.
       * @data {Object} [{}] routers
       */
      routers: {},
        /**
       * Time between 2 automatic screenshot in visual mode, in milliseconds
       * @data {Number} currentScreenshotDelay
       */
      currentScreenshotDelay: this.screenshotDelay,
      /**
       * @todo not used
       */
      isComponentActive: false,
      /**
       * True when the component finishes loading.
       * @data {Boolean} isLoaded
       */
      isLoaded: !this.load || this.loaded,
      /**
       * True if the container is pinned.
       * @data {Boolean} isPinned
       */
      isPinned: this.pinned,
      /**
       * True if the container is fixed.
       * @data {Boolean} isStatic
       */
      isFixed: this.fixed,
      /**
       * The current url.
       * @data {String} currentURL
       */
      currentURL: this.current || this.url,
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
       * The base 64 encoded thumbnail image.
       * @data {String} thumbnail
       */
      thumbnail: false,
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
      componentDefinition: false,
      componentTemplate: false,
      componentCSS: false,
      currentIndex: this.idx || null
    };
  },
  computed: {
    /**
     * Defines the css string for the component.
     * @prop {String} [''] css
     */
    currentCss: {
      get(){
        return this.currentView?.css || '';
      },
      set(v){
        if ( this.currentView ){
          this.currentView.css = v;
        }
      }
    },
    /**
     * The source of the component.
     * @prop {Object|Function} source
     */
    currentSource: {
      get(){
        return this.currentView?.source || undefined;
      },
      set(v){
        if ( this.currentView ){
          this.currentView.source = v;
        }
      }
    },
    /**
     * The title of the component.
     * @prop {String|Number} ['Untitled'] title
     */
    currentTitle: {
      get() {
        return this.currentView?.title || bbn._('Untitled');
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.title = v;
        }
      }
    },
    /**
     * The options object of the component.
     * @prop {Object} options
     */
    currentOptions: {
      get() {
        return this.currentView?.options || {};
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.options = v;
        }
      }
    },
    /**
     * Defines if the component has to be cached.
     * @prop {Boolean} [false] cached
     */
    currentCached: {
      get() {
        return this.currentView?.cached || false;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.cached = v;
        }
      }
    },
    /**
     * Defines if the component has to be scrollable.
     * @prop {Boolean} [true] scrollable
     */
    currentScrollable: {
      get() {
        return this.currentView?.scrollable || true;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.scrollable = v;
        }
      }
    },
    /**
     * Defines the component to use.
     * @prop component
     */
    currentComponent: {
      get() {
        return this.currentView?.component || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.component = v;
        }
      }
    },
    /**
     * Defines the icon.
     * @prop {String|Boolean} icon
     */
    currentIcon: {
      get() {
        return this.currentView?.icon || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.icon = v;
        }
      }
    },
    /**
     * Defines if the component can have a text.
     * @prop {Boolean} [false] notext
     */
    currentNotext: {
      get() {
        return this.currentView?.notext || false;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.notext = v;
        }
      }
    },
    /**
     * Defines the component's content.
     * @prop {String} [''] content
     */
    currentContent: {
      get() {
        return this.currentView?.content || '';
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.content = v;
        }
      }
    },
    /**
     * Defines the menu.
     * @prop {Array|Function} menu
     */
    currentMenu: {
      get() {
        return this.currentView?.menu || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.menu = v;
        }
      }
    },
    /**
     * Defines the component's fcolor.
     * @prop {String} fcolor
     */
    currentFcolor: {
      get() {
        return this.currentView?.fcolor || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.fcolor = v;
        }
      }
    },
    /**
     * Defines the component's bcolor.
     * @prop {String} bcolor
     */
    currentBcolor: {
      get() {
        return this.currentView?.bcolor || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.bcolor = v;
        }
      }
    },
    /**
     * @prop {String|Object} advert
     */
    currentAdvert: {
      get() {
        return this.currentView?.advert || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.advert = v;
        }
      }
    },
    /**
     * @prop {String} help
     */
    currentHelp: {
      get() {
        return this.currentView?.help || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.help = v;
        }
      }
    },
    /**
     * @prop {Array} imessages
     */
    currentImessages: {
      get() {
        return this.currentView?.imessages || [];
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.imessages = v;
        }
      }
    },
    /**
     * @prop script
     */
    currentScript: {
      get() {
        return this.currentView?.script || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.script = v;
        }
      }
    },
    /**
     * @prop current
     * @prop {String|Number} current
     */
    currentCurrent: {
      get() {
        return this.currentView?.current || null;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.current = v;
        }
      }
    },
    /**
     * The object of configuration for the component
     * @prop {Object} cfg
     */
    currentCfg: {
      get() {
        return this.currentView?.cfg || {};
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.cfg = v;
        }
      }
    },
    /**
     * @prop {Object} events
     */
    currentEvents: {
      get() {
        return this.currentView?.events || {};
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.events = v;
        }
      }
    },
    /**
     * Defines if the component is disabled.
     * @prop {Boolean} [false] disabled
     */
    currentDisabled: {
      get() {
        return this.currentView?.disabled || false;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.disabled = v;
        }
      }
    },
    /**
     * Defines if the component is hidden.
     * @prop {Boolean} [false] hidden
     */
    currentHidden: {
      get() {
        return this.currentView?.hidden || false;
      },
      set(v) {
        if ( this.currentView ){
          this.currentView.hidden = v;
        }
      }
    },
    /**
     * True if the router configuration object has pane (ie is in a splitter pane).
     * @data {Boolean} [false] isVisible
     */
    isPane() {
      return !!this.currentView?.pane;
    },
    currentView() {
      if (!this.router) {
        this.router = this.closest('bbn-router');
      }

      if (this.router) {
        return bbn.fn.getRow(this.router.views, {idx: this.currentIndex})
      }

      return null;
    },
    /**
     * True if the container is shown.
     * @data {Boolean} [false] isVisible
     */
    isVisible() {
      if (this.router) {

        if (this.isPane) {
          if (!this.router.routed) {
            return false;
          }
          if (this.isLoaded) {
            return true;
          }

          let pane = bbn.fn.getRow(this.router.currentPanes, {id: this.currentView.pane});
          if (pane) {
            let idx = bbn.fn.search(pane.tabs, {url: this.currentView.url});
            if (pane.tabs[idx]) {
              return idx === pane.selected;
            }
          }
          return (this.router.routed && this.isPane) || (this.router.selected === this.currentIndex);
        }
        else {
          return this.router.selected === this.currentIndex;
        }
      }

      return false;
    },
    isVisualVisible() {
      if (this.router?.isVisual) {
        let row = bbn.fn.getRow(this.router.visualList, 'view.idx', this.currentIndex);
        if (row) {
          return row.visible;
        }
      }

      return false;
    },
    visualStyle() {
      let r = this.router;
      if (r && r.isVisual) {
        if ((r.numVisualReals > 0) && (!this.isVisible || r.visualShowAll) && (!this.ready || !this.isPane)) {
          return {
            zoom: 0.1,
            width: '100%',
            height: 'auto',
            overflow: 'hidden'
          };
        }

        let coord = [1, r.numVisualCols + 1, 1, r.numVisualRows + 1];
        if (r.numVisualReals > 0) {
          switch (r.visualOrientation) {
            case 'top':
              coord[2] = 2;
              break;
            case 'bottom':
              coord[3] = coord[3] - 1;
              break;
            case 'left':
              coord[0] = 2;
              break;
            case 'right':
              coord[1] = coord[1] - 1;
              break;
          }
        }

        return {
          gridColumnStart: coord[0],
          gridColumnEnd: coord[1],
          gridRowStart: coord[2],
          gridRowEnd: coord[3],
          zoom: 1
        };
      }

      return {};
    },
    anonComponent(){
      return this.$refs.component;
    }
  },

  methods: {
    setCurrent,
    setTitle,
    setIcon,
    setColor,
    setLoaded,

    show,
    close,
    pin,
    unpin,

    setScreenshot,
    unsetScreenshot,
    saveScreenshot,
    takeScreenshot,
    updateScreenshot,
  
    addMenu,
    deleteMenu,
    showMenu,

    init,
    reload,
    registerRouter,
    unregisterRouter,

    getFullCurrentURL,
    getFullURL,
    randomName,
    popup,
    getComponent,
    enter,
    onResize
  },
  /**
   * @event created 
   */
  created() {
    this.componentClass.push('bbn-resize-emitter');
    if ( this.isComponent ){
      bbnContainerCp.componentsList.push(this.componentName);
    }
    else if ( this.isComponent === null ){
      // The default onMount function is to do nothing.
      this.onMount = () => {
        return false;
      };
    }
  },
  beforeMount() {
    // The router is needed
    this.router = this.closest('bbn-router');
    //const cp = this.getRef('component');
  },
  /**
   * @event mounted
   * @fires router.register
   */
  mounted() {
    bbn.fn.log("MOUNTED CONTAINER " + this.url);
    if ( !this.router ){
      throw new Error(bbn._("bbn-container cannot be rendered without a bbn-router"));
    }

    this.updateScreenshot()
    this._screenshotInterval = false;
    if (!this.router.ready) {
      bbn.fn.warning("ROUTER NOT READY");
      this.router.$on('ready', () => {
        bbn.fn.warning("ROUTER INITING");
        this.init();
      });
    }
    else{
      bbn.fn.warning("ROUTER REGISTERING FOR " + this.url);
      this.router.register(this);
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.init();
        })
      })
    }
    this.$el.title = '';
    //
    // The container is registered
  },
  /**
   * @event beforeDestroy
   * @fires router.unregister
   */
  beforeDestroy() {
    if (this.router) {
      this.router.unregister(this);
    }

    if ( this.isComponent ){
      let idx = bbnContainerCp.componentsList.indexOf(this.componentName);
      if ( idx > -1 ){
        bbnContainerCp.componentsList.splice(idx, 1);
      }
    }
  },

  watch: {
    currentView: {
      deep: true,
      handler(v, ov) {
        if (v || ov) {
          //bbn.fn.log("DEEP HANDLER ON VIEW", v, ov);
          this.$tick();
        }
      }
      /*
      bbn.fn.iterate(v, (a, n) => {
        let name = 'c' + bbn.fn.correctCase(n);
        if (Object.hasOwn(this, name) && !bbn.fn.isSame(this[name], a)) {
          this[name] = a;
          bbn.fn.log("***************** CHANGING " + name + " IN CURRENT VIEW FOR " + this.url + " *****************")
        }
      });
      */
    },
    /**
     * The source of the component.
     * @prop {Object|Function} source
     */
    source(v) {
      if (this.real) {
        this.currentView.source = v;
      }
    },
    /**
     * The options object of the component.
     * @prop {Object} options
     */
    options(v) {
      if (this.real) {
        this.currentView.options = v;
      }
    },
    /**
     * Defines if the component has to be cached.
     * @prop {Boolean} [false] cached
     */
    cached(v) {
      if (this.real) {
        this.currentView.cached = v;
      }
    },
    /**
     * Defines if the component has to be scrollable.
     * @prop {Boolean} [true] scrollable
     */
    scrollable(v) {
      if (this.real) {
        this.currentView.scrollable = v;
      }
    },
    /**
     * Defines the component to use.
     * @prop component
     */
    component(v) {
      if (this.real) {
        this.currentView.component = v;
      }
    },
    /**
     * Defines the icon.
     * @prop {String|Boolean} icon
     */
    icon(v) {
      if (this.real) {
        this.currentView.icon = v;
      }
    },
    /**
     * Defines if the component can have a text.
     * @prop {Boolean} [false] notext
     */
    notext(v) {
      if (this.real) {
        this.currentView.notext = v;
      }
    },
    /**
     * Defines the component's content.
     * @prop {String} [''] content
     */
    content(v) {
      if (this.real) {
        this.currentView.content = v;
      }
    },
    /**
     * Defines the menu.
     * @prop {Array|Function} menu
     */
    menu(v) {
      if (this.real) {
        this.currentView.menu = v;
      }
    },
    /**
     * Defines the component's fcolor.
     * @prop {String} fcolor
     */
    fcolor(v) {
      if (this.real) {
        this.currentView.fcolor = v;
      }
    },
    /**
     * Defines the component's bcolor.
     * @prop {String} bcolor
     */
    bcolor(v) {
      if (this.real) {
        this.currentView.bcolor = v;
      }
    },
    /**
     * Defines the css string for the component.
     * @prop {String} [''] css
     */
    css(v) {
      if (this.real) {
        this.currentView.css = v;
      }
    },
    /**
     * @prop {String|Object} advert
     */
    advert(v) {
      if (this.real) {
        this.currentView.advert = v;
      }
    },
    /**
     * @prop {String} help
     */
    help(v) {
      if (this.real) {
        this.currentView.help = v;
      }
    },
    /**
     * @prop {Array} imessages
     */
    imessages(v) {
      if (this.real) {
        this.currentView.imessages = v;
      }
    },
    /**
     * @prop script
     */
    script(v) {
      if (this.real) {
        this.currentView.script = v;
      }
    },
    /**
     * The object of configuration for the component
     * @prop {Object} cfg
     */
    cfg(v) {
      if (this.real) {
        this.currentView.cfg = v;
      }
    },
    /**
     * @prop {Object} events
     */
    events(v) {
      if (this.real) {
        this.currentView.events = v;
      }
    },
    /**
     * Defines if the component is disabled.
     * @prop {Boolean} [false] disabled
     */
    disabled(v) {
      if (this.real) {
        this.currentView.disabled = v;
      }
    },
    /**
     * Defines if the component is hidden.
     * @prop {Boolean} [false] hidden
     */
    hidden(v) {
      if (this.real) {
        this.currentView.hidden = v;
      }
    },
    title(v) {
      if (this.real) {
        this.currentView.title = v;
      }
    },
    loaded(v) {
      this.isLoaded = v;
    },
    loading(v) {
      this.isLoading = v;
    },
    current(newVal){
      if (newVal.indexOf(this.url) === 0){
        this.currentURL = newVal;
      }
      if (this.real) {
        this.currentView.current = v;
      }
    },
    /**
     * @watch currentUrl
     * @param {String} newVal 
     * @param {String} oldVal 
     */
    currentURL(newVal, oldVal){
      // Auto cancelling if it does not correspond to the url
      if ( !newVal || (newVal.indexOf(this.url) !== 0) ){
        this.currentURL = this.url;
      }
      // Routing if the router has different info
      else if (this.router && this.router.$isInit && this.currentView && (this.currentView.current !== newVal)) {
        this.router.route(newVal)
      }
    },
    ready(v){
      if (v) {
        if (this.onMount) {
          this.onMount(this.$el, this.source);
        }
      }
    },
    /**
     * @watch visible
     * @param {Boolean} nv 
     * @param {Boolean} ov 
     * @fires selfEmit
     */
    isVisible(nv) {
      //bbn.fn.log("Changing isVisible for " + this.currentURL);
      let emit = true;

      if (!this.isPane && this.router?.isVisual) {
        if (nv) {
          this.setScreenshot()
        }
        else {
          this.unsetScreenshot();
        }
      }

      if (emit) {
        this.$emit(nv ? 'view' : 'unview', this);
      }

      if (nv && this.router) {
        if (!this.isLoaded && !this.isLoading) {
          this.router.load(this.currentURL, true)
        }

        if (!this.ready) {
          this.$nextTick(() => {
            this.onResize();
            this.init();
          }); 
        }
      }
    },
    /**
     * @watch content
     * @param {Boolean} newVal 
     * @param {Boolean} oldVal 
     */
    content(newVal, oldVal){
      if ( newVal ){
        this.currentView.content = newVal;
        bbn.fn.log("GT CONTENT")
  
        /*
        setTimeout(() => {
          this.onMount = () => {
            return false;
          };
          let res;
          if ( this.script ){
            res = typeof this.script === 'string' ? eval(this.script) : this.script;
            if (bbn.fn.isFunction(res) ){
              this.onMount = res;
              this.isComponent = false;
            }
            else if ( typeof(res) === 'object' ){
              this.isComponent = true;
            }
          }
          else if ( this.source && this.content ){
            bbn.fn.extend(res ? res : {}, {
              name: this.name,
              template: '<div class="bbn-overlay">' + this.content + '</div>',
              props: ['source']
            });
          }
          else{
            this.isComponent = false;
          }
          this.isComponentActive = true;
        }, oldVal ? 200 : 0)
        */
      }
    },
    /**
     * If true adds the event listener keydown, or else removes the event listener.
     * @watch fullScreen
     * @param {Boolean} newVal 
     * @fires selfEmit
     */
    fullScreen(newVal){
      let fn = e => {
        if ( e.keyCode === 27 ){
          this.fullScreen = false;
        }
      };
      if ( newVal ){
        document.body.addEventListener('keydown', fn);
      }
      else{
        document.body.removeEventListener('keydown', fn);
      }
      this.$nextTick(() => {
        this.selfEmit(true)
      })
    },
    dirty(v){
      let view = this.router.getView(this.url);
      if (view) {
        view.dirty = v;
        this.router.retrieveDirtyContainers();
      }
    }
  },

};

import cpHtml from './container.html';
import cpStyle from './container.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./container.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-container',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
