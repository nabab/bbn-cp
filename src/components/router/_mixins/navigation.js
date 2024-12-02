import bbn from "@bbn/bbn";

export default {
  props: {
    /**
     * Set it to true if you want to see the navigation bar (tabs, breadcrumb, or visual).
     * @prop {Boolean} [false] nav
     */
    nav: {
      type: Boolean,
      default: false
    },
    /**
     * Routes automatically after mount.
     * @prop {Boolean} [true] auto
     */
    auto: {
      type: Boolean,
      default: true
    },
    /**
     * The URL on which the router will be initialized.
     * @prop {String} ['] url
     */
    url: {
      type: String,
      default: ''
    },
    /**
     * Defines if the container will be automatically loaded based on URLs.
     * @prop {Boolean} [true] autoload
     */
    autoload: {
      type: Boolean,
      default: true
    },
    /**
     * The root URL of the router, will be only taken into account for the top parents' router, will be automatically calculated for the children.
     * @prop {String} ['] root
     */
    root: {
      type: String,
      default: ''
    },
    /**
     * @prop {String} def
     */
    def: {
      type: String
    },
    /**
     * @prop {Boolean} [false] single
     */
    single: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [true] urlNavigation
     */
    urlNavigation: {
      type: Boolean,
      default: true
    },
    /**
     * Set it to true if you want to send the variable _baseUrl.
     * @prop {Boolean} [true] postBaseUrl
     */
    postBaseUrl: {
      type: Boolean,
      default: true
    },
    /**
     * The max length of the history.
     * @prop {Number} [10] historyMaxLength
     */
    historyMaxLength: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {
      /**
       * IndexedDb connection (Used by containers)
       * @return {Object} 
       */
      db: null,
      /**
       * The index of the currently selected view.
       * @data {Number} [null] selected
       */
      selected: null,
      /**
       * Set to true each time the router is loading (can only load once at a time).
       * @data {Boolean} [false] isLoading
       */
      isLoading: false,
      /**
       * This will remain false until the first routing.
       * @data {Boolean} [false] routed
       */
      routed: false,
      /**
       * True while the component is in the action of routing.
       * @data {Boolean} [false] isRouting
       */
      isRouting: false,
      /**
       * True if one of the initial containers' URL is an empty string.
       * @data {Boolean} [false] hasEmptyURL
       */
      hasEmptyURL: false,
      /**
       * All the URLS of the views.
       * @data {Object} [{}] urls
       */
      urls: {},
      /**
       * Current URL of the router.
       * @data {String} currentURL
       */
      currentURL: this.url || '',
      /**
       * Relative root of the router (set by user or by parent router).
       * @data {String} baseURL
       */
      baseURL: this.formatBaseURL(this.root),
      /**
       * The currently visible container.
       * @data {bbnCp} [null] activeContainer
       */
      activeContainer: null,
      /**
       * The navigation history.
       * @data {Array} [[]] history
       */
      history: [],
      /**
       * The current title of the selected tab
       * @data {String} [''] currentTitle
       */
      currentTitle: '',
      /**
      * An array of the parents router.
      * @data {Array} [[]] parents
      */
      parents: [],
      /**
     * The direct parent router if there is one.
     * @data {bbnCp} [null] parent
     */
      parent: null,
      /**
       * The root router or the current one it's the same.
       * @data {bbnCp} [null] router
       */
      router: null,
      /**
       * The container having the router in if there is one.
       * @data {bbnCp} [null] parentContainer
       */
      parentContainer: null,
      /**
       * False until the first routing.
       * @data {Boolean} [false] isInit
       */
      isInit: false,
    }
  },
  computed: {
    /**
     * The tab index, which might be different from the view index
     */
    selectedTab: {
      get() {
        return bbn.fn.search(this.tabsList, { idx: this.selected })
      },
      set(v) {
        //bbn.fn.log("SETING SELECTED TAB");
        let done = false;
        let i = v;
        while (i > -1) {
          if (this.tabsList[i]) {
            this.selected = this.tabsList[i].idx;
            done = true;
            break;
          }
          i--;
        }

        if (!done) {
          i = v;
          while (i < this.tabsList.length) {
            if (this.tabsList[i]) {
              this.selected = this.tabsList[i].idx;
              done = true;
              break;
            }
            i++;
          }
        }

        if (!done) {
          this.selected = null;
        }
      }
    },
    /**
     * Not only the baseURL but a combination of all the parent's baseURLs.
     * @computed fullBaseURL
     * @return {String}
     */
    fullBaseURL() {
      let vm = this,
        base = '',
        tmp;
      while (tmp = vm.baseURL) {
        base = tmp + base;
        if (!vm.parents.length) {
          break;
        }
        vm = vm.parents[0];
      }
      return base;
    },
    currentView() {
      if (this.views[this.selected]) {
        return this.views[this.selected];
      }

      return false;
    },
  },
  methods: {
    async init(url) {
      if (!this.isInit && this.ready) {
        this.isInit = true;
        if (!this.views[this.selected] && this.auto) {
          /*
          bbn.fn.log([
            "AUTO ROUTING",
            "sent URL: " + url,
            "Default URL: " + this.getDefaultURL(),
            "currentURL: " + this.currentURL,
            "Env path: " + bbn.env.path,
            "baseURL: " + this.baseURL,
            "fullBaseURL: " + this.fullBaseURL,
            "Number of views: " + this.views.length
          ]);*/
          await this.route(url || this.getDefaultURL(), true);
        }
      }
    },

    async load(url, force) {
      return await this.route(this.parseURL(url), force);
    },


    /**
     * @method getDefaultURL
     * @fires parseURL
     * @return {String}
     */
    getDefaultURL() {
      let url;
      if (!this.routed) {
        url = this.parseURL(bbn.env.path);
      }

      const row = bbn.fn.getRow(this.views, { selected: true });
      if (row && !url) {
        url = row.current;
      }

      if (!url) {
        url = this.parseURL(bbn.env.path);
      }

      if (!url && this.parentContainer && (this.parentContainer.currentURL !== this.parentContainer.currentCurrent) && !this.parentContainer.currentCurrent.indexOf(this.parentContainer.currentURL)) {
        url = bbn.fn.substr(this.parentContainer.currentCurrent, this.parentContainer.currentURL.length + 1);
      }


      if (!url && this.url) {
        url = this.url;
      }  

      // If there is a parent router we automatically give the proper baseURL
      if (!url && this.def) {
        url = this.def;
      }

      if (!url && this.views.length) {
        url = this.views[0].url;
      }

      bbn.fn.log("DEFAULT URL: " + url + ' FROM ' + this.fullBaseURL);
      return url;
    },


    /**
     * Given a URL returns the existing path of a corresponding view or false, or the default view if forced.
     * @method getRoute
     * @param {String} url
     * @param {Boolean} force
     * @fires parseURL
     * @returns {String|false}
     */
    getRoute(url, force) {
      if (!bbn.fn.isString(url)) {
        throw new Error(bbn._('The bbn-container must have a valid URL defined'));
      }

      if (!url && this.hasEmptyURL) {
        return '';
      }

      if (!url && !this.parent) {
        url = this.parseURL(bbn.env.path);
      }

      if (!url && force && this.parent) {
        url = this.parseURL(this.router.getFullCurrentURL());
      }

      if (url) {
        //bbn.fn.log("getRoute with URL", url, this.baseURL, this)
        let bits = url.split('/');
        while (bits.length) {
          let st = bits.join('/');
          let idx = this.search(st);
          if ((idx !== false) && this.urls[this.views[idx].uid]) {
            //bbn.fn.log("really getRoute", this.views[idx].url)
            return this.urls[this.views[idx].uid].disabled ? '' : this.views[idx].url;
          }

          bits.pop();
        }
      }

      if (this.def && force) {
        return this.def
      }

      if (this.views.length && force) {
        return this.views[0].url;
      }

      return false;
    },

    /**
    * Formats a baseURL correctly (without 1st slash and with end slash.
    * @method formatBaseURL
    * @param {String} baseURL
    * @returns {String}
    */
    formatBaseURL(baseURL) {
      while (bbn.fn.substr(baseURL, -1) === '/') {
        baseURL = bbn.fn.substr(baseURL, 0, baseURL.length - 1);
      }
      while (bbn.fn.substr(baseURL, 0, 1) === '/') {
        baseURL = bbn.fn.substr(baseURL, 1);
      }
      return baseURL ? baseURL + '/' : '';
    },

    /**
    * Sends event beforeRoute (cancellable) and launch real routing.
    * @method route
    * @param {String} url
    * @param {Boolean} force
    * @fires navigate
    * @fires getRoute
    * @fires load
    * @emit beforeRoute
    * @returns {void}
    */
    async route(url, force) {
      //bbn.fn.warning("ROUTING " + url + ' / CURRENT: ' + this.currentURL);
      if (!bbn.fn.isString(url)) {
        throw new Error(bbn._('The component bbn-container must have a valid URL defined (URL is not a string)'));
      }

      /** @var {Boolean} ok Will prevent the route to happen if false */
      let ok = true;
      // Looking first in the opened panes if splittable
      if (this.splittable) {
        bbn.fn.each(this.currentPanes, a => {
          bbn.fn.each(a.tabs, (v, i) => {
            if (url.indexOf(v.url) === 0) {
              /** @var {bbnCp} container The bbn-container component for the given URL if it's in a pane] */
              let container = this.urls[v.uid];
              if (!container) {
                ok = false;
              }

              if (a.selected !== i) {
                a.selected = i;
                ok = false;
              }

              if (v.current !== url) {
                v.current = url;
                if (container) {
                  container.setCurrent(url);
                }
              }

              return false;
            }
          })

          if (!ok) {
            return false;
          }
        });
      }

      if (ok && !this.isInit && this.ready) {
        return await this.init(url);
      }

      if (ok && this.isInit && (force || !this.activeContainer || (url !== this.currentURL))) {
        let event = new CustomEvent(
          "beforeroute",
          {
            bubbles: false,
            cancelable: true
          }
        );
        this.$emit("beforeroute", event, url);
        if (!event.defaultPrevented) {
          let bits = url.split('#');
          url = bits[0];
          if ((url === '') && this.hasEmptyURL) {
            let viewIdx = this.search('');
            if (viewIdx !== false) {
              this.selected = viewIdx;
              return;
            }
          }


          let st = url ? this.getRoute(url) : '';
          //bbn.fn.warning("ROUTING 2 " + st + " (" + url + " FROM " + this.baseURL + ")");
          /** @todo There is asomething to do here */
          if (!url || (!force && (this.currentURL === url))) {
            /** @todo Add the anchor / named href */
            if (bits[1]) {
              document.location.hash = bits[1];
            }
            else {
              bbn.fn.log(bbn._("SAME URL %s NO ROUTING", url));
            }

            return;
          }
          else if (url && !st && this.autoload) {
            //bbn.fn.log("ADDING NEW VIEW IN " + this.baseURL, url);
            //bbn.fn.log("NUM VIEWS 1: " + this.views.length)
            const uid = await this.add({
              url: url,
              title: bbn._('Loading'),
              load: true,
              loading: false,
              real: false,
              pane: false,
              scrollable: !this.single,
              current: url,
              error: false,
              loaded: false,
              hidden: false,
              last: bbn.fn.timestamp(),
              selected: true
            });
            //bbn.fn.log("NUM VIEWS 2: " + this.views.length)
          }
          else {
            const viewIdx = this.search(st);
            if (viewIdx !== false) {
              if (!this.urls[this.views[viewIdx].uid]?.subrouter) {
                if (this.views[viewIdx].current.indexOf(url) !== 0) {
                  this.views[viewIdx].current = url;
                }
                if (this.selected !== viewIdx) {
                  this.selected = viewIdx;
                }
              }

              this.activate(url, this.urls[this.views[viewIdx].uid]);
            }
            // Otherwise the container is activated ie made visible
            else {
              throw new Error(bbn._("Impossible to find the container for URL %s", url));
            }
          }
        }
      }
    },
    /**
    * Routes the router.
    * @method navigate
    * @emit route1
    */
    async navigate() {
      const v = this.views[this.selected];
      if (!v) {
        return;
      }

      const uid = v?.uid;
      const url = v?.current || v?.url;

      if (!bbn.fn.isString(url) && !bbn.fn.isNumber(url)) {
        throw new Error(bbn._('The component bbn-container must have a valid URL defined (URL given to route is not a string)'));
      }

      if (!this.isValidIndex(this.selected)) {
        throw new Error(bbn._('The selected index in bbn-router is not valid for navigation'));
      }

      if (this.urls[uid] && (url !== this.currentURL)) {
        //bbn.fn.log(bbn._("NAVIGATE FOR %s IN %s", url, this.baseURL || "root"));
        // First routing, triggered only once
        if (this.urls[uid].currentView.pane) {
          let pane = bbn.fn.getRow(this.currentPanes, { id: this.urls[uid].currentView.pane });
          if (pane && pane.tabs) {
            let idx = bbn.fn.search(pane.tabs, { url: st });
            if (pane.tabs[idx] && (pane.selected === idx)) {
              this.activate(url, this.urls[uid]);
            }
            if (pane.tabs[idx]) {
              this.activate(url, this.urls[uid]);
            }
          }
        }
        else {
          this.currentURL = url;
          if (!this.routed) {
            this.routed = true;
            this.$emit("route1", this);
            this.$nextTick(this.onResize)
          }

          //await this.activate(url, this.urls[uid]);
        }

        if (this.urls[uid] && this.urls[uid].isLoaded) {
          this.urls[uid].currentCurrent = url;
          let child = this.urls[uid].find('bbn-router');
          //bbn.fn.log(["IN ROUTER", url, this.getFullBaseURL(), child]);
          //bbn.fn.log("LOOKING FOR CHILD", child);
          if (child) {
            child.route(bbn.fn.substr(url, v.url.length + 1));
          }
          else {
            let ifr = this.urls[uid].find('bbn-frame');
            if (ifr) {
              ifr.route(bbn.fn.substr(url, v.url.length + 1));
            }
          }
        }
      }
    },
    /**
    * Routes to the next view if any.
    * @method next
    * @fires activateIndex
    */
    next(force) {
      let next = this.selected + 1;
      if (!this.views[next] && force) {
        next = 0;
      }
      if (this.views[next]) {
        this.activateIndex(next);
      }
    },
    /**
    * Routes to the previous view if any.
    * @method prev
    * @fires activateIndex
    */
    prev(force) {
      let prev = this.selected - 1;
      if (!this.views[prev] && force) {
        prev = this.views.length - 1;
      }
      if (this.views[prev]) {
        this.activateIndex(prev);
      }
    },
    /**
    * Shows the container with the corresponding URL and hide all others.
    * @method activate
    * @param url
    * @param container
    */
    activate(url, container) {
      if (!bbn.fn.isString(url)) {
        throw new Error(bbn._('The component bbn-container must have a valid URL defined (activate)'));
      }
      if (!container) {
        let row = this.views.filter(a => (a.url === url) || !url.indexOf(a.url));
        if (!row.length) {
          throw new Error(bbn._("Impossible to find a container for the URL %s", url));
        }

        row = row[0];
        if (!this.urls[row.uid]) {
          throw new Error(bbn._("The container for the URL %s is not registered", row.url));
        }
        container = this.urls[row.uid];
      }

      //bbn.fn.log("ACTIVATING " + url + " AND SENDING FOLLOWING CONTAINER:", container);
      if (this.selected !== container.currentIndex) {
        this.$emit('activate', url);
        container.setCurrent(url);
        if (!container.isPane) {
          this.activeContainer = container;
        }

        container.show();
        // Scrolling tabs
        if (this.scrollable && this.nav && !this.breadcrumb && !this.isVisual) {
          let scroll = this.getRef('horizontal-scroll');
          let tab = this.getRef('tab-' + container.currentIndex);
          if (scroll?.ready) {
            scroll.scrollTo(tab);
          }
          else if (scroll) {
            scroll.$on('ready', sc => {
              setTimeout(() => {
                sc.scrollTo(this.getRef('tab-' + container.currentIndex));
              }, 100);
            })
          }
        }
      }
      else if (url !== container.currentCurrent) {
        if (container.subrouter) {
          //bbn.fn.log("SUBROUTER THROUGH ROUTER")
          container.subrouter.route(
            url.indexOf(container.subrouter.baseURL) === 0 ? 
                bbn.fn.substr(url, container.subrouter.baseURL.length) 
                : ''
          );
        }
        else {
          container.setCurrent(url);
        }
      }
      //bbn.fn.log("ACTIVATED " + url + " AND ACTIVATED CONTAINER BELOW:", this.activeContainer);
    },
    /**
    * @method changeURL
    * @param {String} url
    * @param {String} title
    * @param {Boolean} replace
    * @fires getFullBaseURL
    */
    changeURL(url, title, replace) {
      if (!bbn.fn.isString(url)) {
        throw new Error(bbn._('The component bbn-container must have a valid URL defined (change URL)'));
      }
      if (!bbn.env.isInit) {
        return;
      }
      if (title && (title !== this.currentTitle)) {
        this.currentTitle = title;
      }
      if (url !== this.currentURL) {
        this.currentURL = url;
        // Will fire again
        return;
      }

      /*
      bbn.fn.log([
        "changeURL",
        url,
        title,
        this,
        this.parentContainer ? 
          ["FROM PQARENT", this.parentContainer.currentTitle, this.parentContainer.title]
          : this.currentTitle
      ]);
      */
      // Changing the current property of the view cascades on the container's currentURL
      if (
        this.views[this.selected] &&
        (
          (url.indexOf(this.views[this.selected].url + '/') === 0) ||
          (url === this.views[this.selected].url)
        )
      ) {
        this.$set(this.views[this.selected], 'current', url);
      }
      if (this.urlNavigation) {
        if (this.parentContainer) {
          //this.parentContainer.currentTitle = title + ' < ' + this.parentContainer.title;
          if (!this.parentContainer.isPane) {
            this.parent.currentURL = this.baseURL + url;
          }
          else {
            this.parentContainer.currentView.current = this.baseURL + url;
          }
        }
        else if (replace || (url !== bbn.env.path)) {
          if (!replace) {
            //bbn.fn.log("NO REPLAACE", this.getFullBaseURL() + url, bbn.env.path);
          }
          if (!replace && ((this.getFullBaseURL() + url).indexOf(bbn.env.path) === 0)) {
            //bbn.fn.log("REPLACING");
            replace = true;
          }
          bbn.fn.setNavigationVars(this.getFullBaseURL() + url, this.currentTitle, {}, replace);
        }
      }
    },
    /**
    * Returns the baseURL property.
    * @method getBaseURL
    * @returns {String}
    */
    getBaseURL() {
      return this.baseURL;
    },
    /**
    * Returns a string of all the baseURL properties till root.
    * @method getFullBaseURL
    * @returns {String}
    */
    getFullBaseURL() {
      return this.fullBaseURL;
    },
    /**
    * Returns the full URL from the root router (without the hostname).
    * @method getFullURL
    * @fires getFullBaseURL
    * @returns {String}
    */
    getFullURL() {
      if (this.currentView) {
        return this.getFullBaseURL() + this.currentView.url;
      }

      return '';
    },
    /**
    * Returns the current URL of the current router.
    * @method getCurrentURL
    * @returns {String}
    */
    getCurrentURL() {
      return this.currentURL;
    },
    /**
    * Returns the full current URL from the root router (without the hostname).
    * @method getFullCurrentURL
    * @fires getCurrentURL
    * @fires getFullBaseURL
    * @returns {String|Boolean}
    */
    getFullCurrentURL() {
      if (this.currentView) {
        return this.getFullBaseURL() + this.currentView.current;
      }

      return false;
    },
    /**
    * Returns the url relative to the current tabNav from the given url.
    * @method parseURL
    * @param fullURL
    * @returns {String}
    */
    parseURL(fullURL) {
      if (fullURL === undefined) {
        return '';
      }
      if (!bbn.fn.isString(fullURL)) {
        fullURL = fullURL.toString();
      }
      if (fullURL.indexOf(bbn.env.root) === 0) {
        fullURL = bbn.fn.substr(fullURL, bbn.env.root.length);
      }
      fullURL = bbn.fn.removeTrailingChars(fullURL, '/');
      if (this.fullBaseURL === (fullURL + '/')) {
        return '';
      }
      if (this.fullBaseURL) {
        if (fullURL.indexOf(this.fullBaseURL) === 0) {
          fullURL = bbn.fn.substr(fullURL, this.fullBaseURL.length);
        }
        else {
          fullURL = '';
        }
      }
      return fullURL;
    },
    /**
    * @method isValidIndex
    * @return {Boolean}
    */
    isValidIndex(idx) {
      return (typeof idx === 'number') && (this.views[idx] !== undefined);
    },
    /**
    * Activates the default view, or the first one if no default.
    * @method activateDefault
    * @fires getIndex
    * @fires isValidIndex
    * @fires activate
    */
    activateDefault() {
      let idx = this.getIndex('', true);
      if (this.isValidIndex(idx)) {
        this.activate(this.views[idx].current ? this.views[idx].current : this.views[idx].url);
      }
    },
    /**
    * @method activateIndex
    * @param {Number} idx
    * @fires isValidIndex
    * @fires route
    */
    activateIndex(idx) {
      if (this.isValidIndex(idx) && !this.views[idx].selected) {
        //bbn.fn.log("ACTIVATE INDEX");
        this.route(
          this.urls[this.views[idx].uid] ? this.urls[this.views[idx].uid].currentURL
            : this.views[idx].current
        );
      }
    },


    /**
    * @method callRouter
    * @param {String} url
    * @param st
    * @fires getFullBaseURL
    * @fires navigate
    */
    async callRouter(url, st) {
      if (!bbn.fn.isString(url)) {
        throw new Error(bbn._('The component bbn-container must have a valid URL defined (from callRouter)'));
      }
      if (this.parent) {
        let containers = this.ancestors('bbn-container');
        url = bbn.fn.substr(this.getFullBaseURL(), this.router.baseURL.length) + url;
        //bbn.fn.log("CALL ROOT ROUTER WITH URL " + url);
        // The URL of the last bbn-container as index of the root router
        await this.router.navigate(url, containers[containers.length - 1].routerUid, true);
      }
      else {
        await this.navigate(url, st, true);
      }
    },

    updateBaseURL() {
      if (this.parentContainer || this.root) {
        let uri = this.parentContainer?.currentURL || '';
        if (this.root && (uri !== this.root) && (this.root.indexOf(uri) === 0)) {
          uri = this.root;
        }
        const baseURL = this.formatBaseURL(uri);
        if (this.baseURL !== baseURL) {
          //bbn.fn.warning("ROUTING: UPDATING BASE URL FROM " + this.baseURL + " TO " + baseURL);
          this.baseURL = baseURL;
        }
      }
    },

    navigationInit() {
      // All routers above (which constitute the fullBaseURL)
      this.parents = this.ancestors('bbn-router');
      // The closest
      this.parent = this.parents.length ? this.parents[0] : false;
      // The root
      this.router = this.parents.length ? this.parents[this.parents.length - 1] : this;
      // Case where the rooter is not at the root level

      if (this.parent) {
        this.parentContainer = this.closest('bbn-container');
        this.parentContainer.registerRouter(this);
        this.updateBaseURL();
        //bbn.fn.log(['updateBaseURL', this.baseURL, this.getFullBaseURL(), this.parentContainer.currentView, this.parentContainer.currentURL, this.root]);
      }
      // Case where the rooter is at root level
      else {
        // Opening the database for the visual mode multiview
        if (!this.single && bbnRouterCp.db) {
          bbn.db.open('bbn').then(r => {
            this.db = r;
          }, err => {
            bbn.fn.log("Connection error in router", err);
          });
        }

        bbn.fn.log(["SETTING EVENT ON BEFORE UNLOAD", this]);
        if (!window.onbeforeunload) {
          window.onbeforeunload = e => {
            bbn.fn.log(["BEFORE UNLOAD", this.isDirty]);
            if (this.isDirty) {
              e.preventDefault();
            }
          };
        }

      }
    },

    navigationCreated() {
      /**
       * @event route
       * @fires setconfig
       */
      this.$on('route', url => {
        if (this.nav) {
          this.setConfig();
          let i = this.history.indexOf(url);
          if (i > -1) {
            this.history.splice(i, 1);
          }
          this.history.unshift(url);
          while (this.history.length > this.historyMaxLength) {
            this.history.pop();
          }
        }
      });
    },
  },
  watch: {
    currentTitle(v) {
      if (!this.parent) {
        document.title = v + ' - ' + bbn.env.siteTitle;
      }
    },
    selected(idx) {
      if ((idx !== false) && !this.views[idx]) {
        throw new Error("The view with index " + idx + " doesn't exist");
      }

      bbn.fn.map(bbn.fn.filter(this.views, { selected: true }), a => {
        if (a.selected && (a.idx !== idx)) {
          a.selected = false;
        }
      });

      if (this.views[idx]) {
        if (!this.views[idx].selected && !this.views[idx].pane) {
          this.views[idx].selected = true;
        }

        if (this.urls[this.views[idx].uid]) {
          this.activeContainer = this.urls[this.views[idx].uid];
        }

        this.views[idx].last = bbn.fn.timestamp();
      }

      //this.move(idx, this.views.length - 1);

      //bbn.fn.log("In selected watcher " + idx, bbn.fn.filter(this.views, {selected: true}), bbn.fn.filter(this.views, {idx}), this.views);
    },
    /**
     * @watch currentURL
     * @fires changeURL
     * @fires search
     * @emit change
     * @emit route
     */
    currentURL(newVal, oldVal) {
      if (this.ready) {
        let idx = this.search(newVal);
        if (idx !== false) {
          let v = this.views[idx];
          let ct = this.urls[v.uid];
          if (!v.pane) {
            this.selected = idx;
            if (ct) {
              this.changeURL(newVal, ct.title);
            }
            else if (this.isLoading) {
              this.changeURL(newVal, bbn._("Loading"));
            }
          }
        }

        this.$emit('change', newVal);
        this.$emit('route', newVal);
      }
    },
    /**
     * @watch url
     * @fires route
     */
    url(newVal) {
      if (this.ready && newVal && (newVal !== this.currentURL)) {
        //bbn.fn.log("URL CHANGED FROM WATCHER TO " + newVal);
        this.route(newVal);
      }
    },
  },
}
