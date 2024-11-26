import bbn from "@bbn/bbn"

export default {
  props: {
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
      default(){
        return bbn._("Untitled");
      }
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
     * Defines the uid.
     * @prop {String} url
     */
    uid: {
      type: String
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
  },
  data() {
    return {
      /**
       * True if the data changes and is unsaved.
       * @data {Boolan} [false] dirty
       */
      dirty: false,
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
       * @data {Boolean} isFixed
       */
      isFixed: this.fixed,
      /**
       * The container UID given by the router.
       * @data {String} currentURL
       */
      routerUid: this.uid
    }
  },
  computed: {
    currentIndex() {
      return this.currentView?.idx;
    },
    currentView() {
      if (!this.router) {
        this.router = this.closest('bbn-router');
      }

      if (this.router) {
        const o = {};
        if (this.routerUid) {
          o.uid = this.routerUid;
        }
        else {
          o.url = this.url;
        }

        return bbn.fn.getRow(this.router.views, o)
      }

      return null;
    },
    /**
      * The current url.
      * @data {String} currentURL
      */
    currentURL: {
      get(){
        return this.currentView?.url || '';
      },
      set(v){
        if (this.currentView && (this.currentView.url !== v)) {
          if (bbn.fn.getRow(this.router.views, {url: v})) {
            throw new Error(bbn._("The URL already exists"));
          }

          this.currentView.url = v;
        }
      }
    },
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
      set(v) {
        if ( this.currentView?.source !== v) {
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
     * The selected prop
     * @prop {Object} cfg
     */
    currentSelected: {
      get() {
        return this.currentView?.selected;
      },
      set(v) {
        if (this.currentView && (this.currentView.selected !== v)) {
          this.currentView.selected = v;
          if (v) {
            this.show();
          }
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

  },
  methods: {
    pin() {
      this.router.pin(this.currentIndex);
    },


    unpin() {
      this.router.unpin(this.currentIndex);
    },
    /**
     * Sets the current url.
     * 
     * @method setCurrent
     * @param {String} url 
     */
    setCurrent(url){
      if ( url.indexOf(this.url) === 0 ){
        this.currentCurrent = url;
        return true;
      }

      return false;
    },


    /**
     * Sets the title of the container.
     * 
     * @method setTitle
     * @param {String} title 
     */
    setTitle(title){
      if ( this.router ){
        if (!this.real) {
          this.router.views[this.currentIndex].title = title;
        }
        else {
          this.currentTitle = title;
        }
      }
    },


    /**
     * Sets the icon of the container.
     * 
     * @method setIcon
     * @param {String} title 
     */
    setIcon(icon){
      if ( this.router ){
        if (!this.real) {
          this.router.views[this.currentIndex].icon = icon;
        }
        else {
          this.currentIcon = icon;
        }
      }
    },


    /**
     * Sets the color.
     * 
     * @method setColor
     * @param {String} bcolor 
     * @param {String} fcolor 
     */
    setColor(bcolor, fcolor){
      if ( this.router ){
        let view = this.currentView;
        if (view) {
          if ( bcolor ){
            this.router.$set(view, "bcolor", bcolor);
          }
          if ( fcolor ){
            this.router.$set(view, "fcolor", fcolor);
          }
        }
      }
    },
    /**
     * Sets the value of the property loaded to the given val.
     * 
     * @method setLoaded
     * @param {Boolean} val 
     */
    setLoaded(val){
      this.isLoaded = !!val;
    }
  },
  watch: {
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
    /**
     * @watch content
     * @param {Boolean} newVal 
     * @param {Boolean} oldVal 
     */
    content(newVal, oldVal){
      if ( newVal ){
        this.currentView.content = newVal;
        //bbn.fn.log("CONTAINER CONTENT WATCH", newVal)
  
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
    loaded(v) {
      this.isLoaded = v;
    },
    loading(v) {
      this.isLoading = v;
    },
    current(v){
      if (v.indexOf(this.url) === 0){
        this.currentCurrent = v;
      }
      if (this.real) {
        this.currentView.current = v;
      }
    },
    /**
     * @watch currentCurrent
     * @param {String} newVal 
     * @param {String} oldVal 
    currentCurrent(v) {
      if (this.subrouter && v) {
        //bbn.fn.log("currentCurrent", this.currentView, v);
        this.subrouter.route(this.subrouter.parseURL(this.getFullURL()));
      }
  /*
      // Auto cancelling if it does not correspond to the url
      if ( !newVal || (newVal.indexOf(this.url) !== 0) ){
        this.currentURL = this.url;
      }
      // Routing if the router has different info
      else if (this.router && this.router.$isInit && this.currentView && (this.currentView.current !== newVal)) {
        this.router.route(newVal)
      }
    },
    */
    dirty(v){
      if (this.currentView) {
        this.currentView.dirty = v;
        this.router.retrieveDirtyContainers();
      }
    },
  }
}
