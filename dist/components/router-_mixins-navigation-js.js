"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-navigation-js"],{

/***/ "./src/components/router/_mixins/navigation.js":
/*!*****************************************************!*\
  !*** ./src/components/router/_mixins/navigation.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bbn/bbn */ \"./node_modules/@bbn/bbn/dist/index.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Set it to true if you want to see the navigation bar (tabs, breadcrumb, or visual).\n     * @prop {Boolean} [false] nav\n     */\n    nav: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Routes automatically after mount.\n     * @prop {Boolean} [true] auto\n     */\n    auto: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * The URL on which the router will be initialized.\n     * @prop {String} ['] url\n     */\n    url: {\n      type: String,\n      default: ''\n    },\n    /**\n     * Defines if the container will be automatically loaded based on URLs.\n     * @prop {Boolean} [true] autoload\n     */\n    autoload: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * The root URL of the router, will be only taken into account for the top parents' router, will be automatically calculated for the children.\n     * @prop {String} ['] root\n     */\n    root: {\n      type: String,\n      default: ''\n    },\n    /**\n     * @prop {String} def\n     */\n    def: {\n      type: String\n    },\n    /**\n     * @prop {Boolean} [false] single\n     */\n    single: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * @prop {Boolean} [true] urlNavigation\n     */\n    urlNavigation: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Set it to true if you want to send the variable _baseUrl.\n     * @prop {Boolean} [true] postBaseUrl\n     */\n    postBaseUrl: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * The max length of the history.\n     * @prop {Number} [10] historyMaxLength\n     */\n    historyMaxLength: {\n      type: Number,\n      default: 10\n    }\n  },\n  data() {\n    return {\n      /**\n       * IndexedDb connection (Used by containers)\n       * @return {Object} \n       */\n      db: null,\n      /**\n       * The index of the currently selected view.\n       * @data {Number} [null] selected\n       */\n      selected: null,\n      /**\n       * Set to true each time the router is loading (can only load once at a time).\n       * @data {Boolean} [false] isLoading\n       */\n      isLoading: false,\n      /**\n       * This will remain false until the first routing.\n       * @data {Boolean} [false] routed\n       */\n      routed: false,\n      /**\n       * True while the component is in the action of routing.\n       * @data {Boolean} [false] isRouting\n       */\n      isRouting: false,\n      /**\n       * True if one of the initial containers' URL is an empty string.\n       * @data {Boolean} [false] hasEmptyURL\n       */\n      hasEmptyURL: false,\n      /**\n       * All the URLS of the views.\n       * @data {Object} [{}] urls\n       */\n      urls: {},\n      /**\n       * Current URL of the router.\n       * @data {String} currentURL\n       */\n      currentURL: this.url || '',\n      /**\n       * Relative root of the router (set by user or by parent router).\n       * @data {String} baseURL\n       */\n      baseURL: this.formatBaseURL(this.root),\n      /**\n       * The currently visible container.\n       * @data {bbnCp} [null] activeContainer\n       */\n      activeContainer: null,\n      /**\n       * The navigation history.\n       * @data {Array} [[]] history\n       */\n      history: [],\n      /**\n       * The current title of the selected tab\n       * @data {String} [''] currentTitle\n       */\n      currentTitle: '',\n      /**\n      * An array of the parents router.\n      * @data {Array} [[]] parents\n      */\n      parents: [],\n      /**\n      * The direct parent router if there is one.\n      * @data {bbnCp} [null] parent\n      */\n      parent: null,\n      /**\n       * The root router or the current one it's the same.\n       * @data {bbnCp} [null] router\n       */\n      router: null,\n      /**\n       * The container having the router in if there is one.\n       * @data {bbnCp} [null] parentContainer\n       */\n      parentContainer: null,\n      /**\n       * False until the first routing.\n       * @data {Boolean} [false] isInit\n       */\n      isInit: false\n    };\n  },\n  computed: {\n    /**\n     * The tab index, which might be different from the view index\n     */\n    selectedTab: {\n      get() {\n        return _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.search(this.tabsList, {\n          idx: this.selected\n        });\n      },\n      set(v) {\n        //bbn.fn.log(\"SETING SELECTED TAB\");\n        let done = false;\n        let i = v;\n        while (i > -1) {\n          if (this.tabsList[i]) {\n            this.selected = this.tabsList[i].idx;\n            done = true;\n            break;\n          }\n          i--;\n        }\n        if (!done) {\n          i = v;\n          while (i < this.tabsList.length) {\n            if (this.tabsList[i]) {\n              this.selected = this.tabsList[i].idx;\n              done = true;\n              break;\n            }\n            i++;\n          }\n        }\n        if (!done) {\n          this.selected = null;\n        }\n      }\n    },\n    /**\n     * Not only the baseURL but a combination of all the parent's baseURLs.\n     * @computed fullBaseURL\n     * @return {String}\n     */\n    fullBaseURL() {\n      let vm = this,\n        base = '',\n        tmp;\n      while (tmp = vm.baseURL) {\n        base = tmp + base;\n        if (!vm.parents.length) {\n          break;\n        }\n        vm = vm.parents[0];\n      }\n      return base;\n    },\n    currentView() {\n      if (this.views[this.selected]) {\n        return this.views[this.selected];\n      }\n      return false;\n    }\n  },\n  methods: {\n    async init(url) {\n      if (!this.isInit && this.ready) {\n        this.isInit = true;\n        if (!this.views[this.selected] && this.auto) {\n          /*\n          bbn.fn.log([\n            \"AUTO ROUTING\",\n            \"sent URL: \" + url,\n            \"Default URL: \" + this.getDefaultURL(),\n            \"currentURL: \" + this.currentURL,\n            \"Env path: \" + bbn.env.path,\n            \"baseURL: \" + this.baseURL,\n            \"fullBaseURL: \" + this.fullBaseURL,\n            \"Number of views: \" + this.views.length\n          ]);*/\n          await this.route(url || this.getDefaultURL(), true);\n        }\n      }\n    },\n    async load(url, force) {\n      return await this.route(this.parseURL(url), force);\n    },\n    /**\n     * @method getDefaultURL\n     * @fires parseURL\n     * @return {String}\n     */\n    getDefaultURL() {\n      let url;\n      if (!this.routed) {\n        url = this.parseURL(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.path);\n      }\n      const row = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.getRow(this.views, {\n        selected: true\n      });\n      if (row && !url) {\n        url = row.current;\n      }\n      if (!url) {\n        url = this.parseURL(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.path);\n      }\n      if (!url && this.parentContainer && this.parentContainer.currentURL !== this.parentContainer.currentCurrent && !this.parentContainer.currentCurrent.indexOf(this.parentContainer.currentURL)) {\n        url = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(this.parentContainer.currentCurrent, this.parentContainer.currentURL.length + 1);\n      }\n      if (!url && this.url) {\n        url = this.url;\n      }\n\n      // If there is a parent router we automatically give the proper baseURL\n      if (!url && this.def) {\n        url = this.def;\n      }\n      if (!url && this.views.length) {\n        url = this.views[0].url;\n      }\n      return url;\n    },\n    /**\n     * Given a URL returns the existing path of a corresponding view or false, or the default view if forced.\n     * @method getRoute\n     * @param {String} url\n     * @param {Boolean} force\n     * @fires parseURL\n     * @returns {String|false}\n     */\n    getRoute(url, force) {\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isString(url)) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The bbn-container must have a valid URL defined'));\n      }\n      if (!url && this.hasEmptyURL) {\n        return '';\n      }\n      if (!url && !this.parent) {\n        url = this.parseURL(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.path);\n      }\n      if (!url && force && this.parent) {\n        url = this.parseURL(this.router.getFullCurrentURL());\n      }\n      if (url) {\n        //bbn.fn.log(\"getRoute with URL\", url, this.baseURL, this)\n        let bits = url.split('/');\n        while (bits.length) {\n          let st = bits.join('/');\n          let idx = this.search(st);\n          if (idx !== false && this.urls[this.views[idx].uid]) {\n            //bbn.fn.log(\"really getRoute\", this.views[idx].url)\n            return this.urls[this.views[idx].uid].disabled ? '' : this.views[idx].url;\n          }\n          bits.pop();\n        }\n      }\n      if (this.def && force) {\n        return this.def;\n      }\n      if (this.views.length && force) {\n        return this.views[0].url;\n      }\n      return false;\n    },\n    /**\n    * Formats a baseURL correctly (without 1st slash and with end slash.\n    * @method formatBaseURL\n    * @param {String} baseURL\n    * @returns {String}\n    */\n    formatBaseURL(baseURL) {\n      while (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(baseURL, -1) === '/') {\n        baseURL = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(baseURL, 0, baseURL.length - 1);\n      }\n      while (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(baseURL, 0, 1) === '/') {\n        baseURL = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(baseURL, 1);\n      }\n      return baseURL ? baseURL + '/' : '';\n    },\n    /**\n    * Sends event beforeRoute (cancellable) and launch real routing.\n    * @method route\n    * @param {String} url\n    * @param {Boolean} force\n    * @fires navigate\n    * @fires getRoute\n    * @fires load\n    * @emit beforeRoute\n    * @returns {void}\n    */\n    async route(url, force) {\n      //bbn.fn.warning(\"ROUTING \" + url + ' / CURRENT: ' + this.currentURL);\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isString(url)) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The component bbn-container must have a valid URL defined (URL is not a string)'));\n      }\n\n      /** @var {Boolean} ok Will prevent the route to happen if false */\n      let ok = true;\n      // Looking first in the opened panes if splittable\n      if (this.splittable) {\n        _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.each(this.currentPanes, a => {\n          _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.each(a.tabs, (v, i) => {\n            if (url.indexOf(v.url) === 0) {\n              /** @var {bbnCp} container The bbn-container component for the given URL if it's in a pane] */\n              let container = this.urls[v.uid];\n              if (!container) {\n                ok = false;\n              }\n              if (a.selected !== i) {\n                a.selected = i;\n                ok = false;\n              }\n              if (v.current !== url) {\n                v.current = url;\n                if (container) {\n                  container.setCurrent(url);\n                }\n              }\n              return false;\n            }\n          });\n          if (!ok) {\n            return false;\n          }\n        });\n      }\n      if (ok && !this.isInit && this.ready) {\n        return await this.init(url);\n      }\n      if (ok && this.isInit && (force || !this.activeContainer || url !== this.currentURL)) {\n        let event = new CustomEvent(\"beforeroute\", {\n          bubbles: false,\n          cancelable: true\n        });\n        this.$emit(\"beforeroute\", event, url);\n        if (!event.defaultPrevented) {\n          let bits = url.split('#');\n          url = bits[0];\n          if (url === '' && this.hasEmptyURL) {\n            let viewIdx = this.search('');\n            if (viewIdx !== false) {\n              this.selected = viewIdx;\n              return;\n            }\n          }\n          let st = url ? this.getRoute(url) : '';\n          //bbn.fn.warning(\"ROUTING 2 \" + st + \" (\" + url + \" FROM \" + this.baseURL + \")\");\n          /** @todo There is asomething to do here */\n          if (!url || !force && this.currentURL === url) {\n            /** @todo Add the anchor / named href */\n            if (bits[1]) {\n              document.location.hash = bits[1];\n            } else {\n              _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.log(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._(\"SAME URL %s NO ROUTING\", url));\n            }\n            return;\n          } else if (url && !st && this.autoload) {\n            //bbn.fn.log(\"ADDING NEW VIEW IN \" + this.baseURL, url);\n            //bbn.fn.log(\"NUM VIEWS 1: \" + this.views.length)\n            const uid = await this.add({\n              url: url,\n              title: _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('Loading'),\n              load: true,\n              loading: false,\n              real: false,\n              pane: false,\n              scrollable: !this.single,\n              current: url,\n              error: false,\n              loaded: false,\n              hidden: false,\n              last: _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.timestamp(),\n              selected: true\n            });\n            //bbn.fn.log(\"NUM VIEWS 2: \" + this.views.length)\n          } else {\n            const viewIdx = this.search(st);\n            if (viewIdx !== false) {\n              if (!this.urls[this.views[viewIdx].uid]?.subrouter) {\n                if (this.views[viewIdx].current.indexOf(url) !== 0) {\n                  this.views[viewIdx].current = url;\n                }\n                if (this.selected !== viewIdx) {\n                  this.selected = viewIdx;\n                }\n              }\n              this.activate(url, this.urls[this.views[viewIdx].uid]);\n            }\n            // Otherwise the container is activated ie made visible\n            else {\n              throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._(\"Impossible to find the container for URL %s\", url));\n            }\n          }\n        }\n      }\n    },\n    /**\n    * Routes the router.\n    * @method navigate\n    * @emit route1\n    */\n    async navigate() {\n      const v = this.views[this.selected];\n      if (!v) {\n        return;\n      }\n      const uid = v?.uid;\n      const url = v?.current || v?.url;\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isString(url) && !_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isNumber(url)) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The component bbn-container must have a valid URL defined (URL given to route is not a string)'));\n      }\n      if (!this.isValidIndex(this.selected)) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The selected index in bbn-router is not valid for navigation'));\n      }\n      if (this.urls[uid] && url !== this.currentURL) {\n        //bbn.fn.log(bbn._(\"NAVIGATE FOR %s IN %s\", url, this.baseURL || \"root\"));\n        // First routing, triggered only once\n        if (this.urls[uid].currentView.pane) {\n          let pane = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.getRow(this.currentPanes, {\n            id: this.urls[uid].currentView.pane\n          });\n          if (pane && pane.tabs) {\n            let idx = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.search(pane.tabs, {\n              url: st\n            });\n            if (pane.tabs[idx] && pane.selected === idx) {\n              this.activate(url, this.urls[uid]);\n            }\n            if (pane.tabs[idx]) {\n              this.activate(url, this.urls[uid]);\n            }\n          }\n        } else {\n          this.currentURL = url;\n          if (!this.routed) {\n            this.routed = true;\n            this.$emit(\"route1\", this);\n            this.$nextTick(this.onResize);\n          }\n\n          //await this.activate(url, this.urls[uid]);\n        }\n        if (this.urls[uid] && this.urls[uid].isLoaded) {\n          this.urls[uid].currentCurrent = url;\n          let child = this.urls[uid].find('bbn-router');\n          //bbn.fn.log([\"IN ROUTER\", url, this.getFullBaseURL(), child]);\n          //bbn.fn.log(\"LOOKING FOR CHILD\", child);\n          if (child) {\n            child.route(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(url, v.url.length + 1));\n          } else {\n            let ifr = this.urls[uid].find('bbn-frame');\n            if (ifr) {\n              ifr.route(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(url, v.url.length + 1));\n            }\n          }\n        }\n      }\n    },\n    /**\n    * Routes to the next view if any.\n    * @method next\n    * @fires activateIndex\n    */\n    next(force) {\n      let next = this.selected + 1;\n      if (!this.views[next] && force) {\n        next = 0;\n      }\n      if (this.views[next]) {\n        this.activateIndex(next);\n      }\n    },\n    /**\n    * Routes to the previous view if any.\n    * @method prev\n    * @fires activateIndex\n    */\n    prev(force) {\n      let prev = this.selected - 1;\n      if (!this.views[prev] && force) {\n        prev = this.views.length - 1;\n      }\n      if (this.views[prev]) {\n        this.activateIndex(prev);\n      }\n    },\n    /**\n    * Shows the container with the corresponding URL and hide all others.\n    * @method activate\n    * @param url\n    * @param container\n    */\n    activate(url, container) {\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isString(url)) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The component bbn-container must have a valid URL defined (activate)'));\n      }\n      if (!container) {\n        let row = this.views.filter(a => a.url === url || !url.indexOf(a.url));\n        if (!row.length) {\n          throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._(\"Impossible to find a container for the URL %s\", url));\n        }\n        row = row[0];\n        if (!this.urls[row.uid]) {\n          throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._(\"The container for the URL %s is not registered\", row.url));\n        }\n        container = this.urls[row.uid];\n      }\n\n      //bbn.fn.log(\"ACTIVATING \" + url + \" AND SENDING FOLLOWING CONTAINER:\", container);\n      if (this.selected !== container.currentIndex) {\n        this.$emit('activate', url);\n        container.setCurrent(url);\n        if (!container.isPane) {\n          this.activeContainer = container;\n        }\n        container.show();\n        // Scrolling tabs\n        if (this.scrollable && this.nav && !this.breadcrumb && !this.isVisual) {\n          let scroll = this.getRef('horizontal-scroll');\n          let tab = this.getRef('tab-' + container.currentIndex);\n          if (scroll?.ready) {\n            scroll.scrollTo(tab);\n          } else if (scroll) {\n            scroll.$on('ready', sc => {\n              setTimeout(() => {\n                sc.scrollTo(this.getRef('tab-' + container.currentIndex));\n              }, 100);\n            });\n          }\n        }\n      } else if (url !== container.currentCurrent) {\n        if (container.subrouter) {\n          //bbn.fn.log(\"SUBROUTER THROUGH ROUTER\")\n          container.subrouter.route(url.indexOf(container.subrouter.baseURL) === 0 ? _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(url, container.subrouter.baseURL.length) : '');\n        } else {\n          container.setCurrent(url);\n        }\n      }\n      //bbn.fn.log(\"ACTIVATED \" + url + \" AND ACTIVATED CONTAINER BELOW:\", this.activeContainer);\n    },\n    /**\n    * @method changeURL\n    * @param {String} url\n    * @param {String} title\n    * @param {Boolean} replace\n    * @fires getFullBaseURL\n    */\n    changeURL(url, title, replace) {\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isString(url)) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The component bbn-container must have a valid URL defined (change URL)'));\n      }\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.isInit) {\n        return;\n      }\n      if (title && title !== this.currentTitle) {\n        this.currentTitle = title;\n      }\n      if (url !== this.currentURL) {\n        this.currentURL = url;\n        // Will fire again\n        return;\n      }\n\n      /*\n      bbn.fn.log([\n        \"changeURL\",\n        url,\n        title,\n        this,\n        this.parentContainer ? \n          [\"FROM PQARENT\", this.parentContainer.currentTitle, this.parentContainer.title]\n          : this.currentTitle\n      ]);\n      */\n      // Changing the current property of the view cascades on the container's currentURL\n      if (this.views[this.selected] && (url.indexOf(this.views[this.selected].url + '/') === 0 || url === this.views[this.selected].url)) {\n        this.$set(this.views[this.selected], 'current', url);\n      }\n      if (this.urlNavigation) {\n        if (this.parentContainer) {\n          //this.parentContainer.currentTitle = title + ' < ' + this.parentContainer.title;\n          if (!this.parentContainer.isPane) {\n            this.parent.currentURL = this.baseURL + url;\n          } else {\n            this.parentContainer.currentView.current = this.baseURL + url;\n          }\n        } else if (replace || url !== _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.path) {\n          if (!replace) {\n            //bbn.fn.log(\"NO REPLAACE\", this.getFullBaseURL() + url, bbn.env.path);\n          }\n          if (!replace && (this.getFullBaseURL() + url).indexOf(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.path) === 0) {\n            //bbn.fn.log(\"REPLACING\");\n            replace = true;\n          }\n          _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.setNavigationVars(this.getFullBaseURL() + url, this.currentTitle, {}, replace);\n        }\n      }\n    },\n    /**\n    * Returns the baseURL property.\n    * @method getBaseURL\n    * @returns {String}\n    */\n    getBaseURL() {\n      return this.baseURL;\n    },\n    /**\n    * Returns a string of all the baseURL properties till root.\n    * @method getFullBaseURL\n    * @returns {String}\n    */\n    getFullBaseURL() {\n      return this.fullBaseURL;\n    },\n    /**\n    * Returns the full URL from the root router (without the hostname).\n    * @method getFullURL\n    * @fires getFullBaseURL\n    * @returns {String}\n    */\n    getFullURL() {\n      if (this.currentView) {\n        return this.getFullBaseURL() + this.currentView.url;\n      }\n      return '';\n    },\n    /**\n    * Returns the current URL of the current router.\n    * @method getCurrentURL\n    * @returns {String}\n    */\n    getCurrentURL() {\n      return this.currentURL;\n    },\n    /**\n    * Returns the full current URL from the root router (without the hostname).\n    * @method getFullCurrentURL\n    * @fires getCurrentURL\n    * @fires getFullBaseURL\n    * @returns {String|Boolean}\n    */\n    getFullCurrentURL() {\n      if (this.currentView) {\n        return this.getFullBaseURL() + this.currentView.current;\n      }\n      return false;\n    },\n    /**\n    * Returns the url relative to the current tabNav from the given url.\n    * @method parseURL\n    * @param fullURL\n    * @returns {String}\n    */\n    parseURL(fullURL) {\n      if (fullURL === undefined) {\n        return '';\n      }\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isString(fullURL)) {\n        fullURL = fullURL.toString();\n      }\n      if (fullURL.indexOf(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.root) === 0) {\n        fullURL = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(fullURL, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.root.length);\n      }\n      fullURL = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.removeTrailingChars(fullURL, '/');\n      if (this.fullBaseURL === fullURL + '/') {\n        return '';\n      }\n      if (this.fullBaseURL) {\n        if (fullURL.indexOf(this.fullBaseURL) === 0) {\n          fullURL = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(fullURL, this.fullBaseURL.length);\n        } else {\n          fullURL = '';\n        }\n      }\n      return fullURL;\n    },\n    /**\n    * @method isValidIndex\n    * @return {Boolean}\n    */\n    isValidIndex(idx) {\n      return typeof idx === 'number' && this.views[idx] !== undefined;\n    },\n    /**\n    * Activates the default view, or the first one if no default.\n    * @method activateDefault\n    * @fires getIndex\n    * @fires isValidIndex\n    * @fires activate\n    */\n    activateDefault() {\n      let idx = this.getIndex('', true);\n      if (this.isValidIndex(idx)) {\n        this.activate(this.views[idx].current ? this.views[idx].current : this.views[idx].url);\n      }\n    },\n    /**\n    * @method activateIndex\n    * @param {Number} idx\n    * @fires isValidIndex\n    * @fires route\n    */\n    activateIndex(idx) {\n      if (this.isValidIndex(idx) && !this.views[idx].selected) {\n        //bbn.fn.log(\"ACTIVATE INDEX\");\n        this.route(this.urls[this.views[idx].uid] ? this.urls[this.views[idx].uid].currentURL : this.views[idx].current);\n      }\n    },\n    /**\n    * @method callRouter\n    * @param {String} url\n    * @param st\n    * @fires getFullBaseURL\n    * @fires navigate\n    */\n    async callRouter(url, st) {\n      if (!_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isString(url)) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The component bbn-container must have a valid URL defined (from callRouter)'));\n      }\n      if (this.parent) {\n        let containers = this.ancestors('bbn-container');\n        url = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.substr(this.getFullBaseURL(), this.router.baseURL.length) + url;\n        //bbn.fn.log(\"CALL ROOT ROUTER WITH URL \" + url);\n        // The URL of the last bbn-container as index of the root router\n        await this.router.navigate(url, containers[containers.length - 1].routerUid, true);\n      } else {\n        await this.navigate(url, st, true);\n      }\n    },\n    updateBaseURL() {\n      if (this.parentContainer || this.root) {\n        let uri = this.parentContainer?.currentURL || '';\n        if (this.root && uri !== this.root && this.root.indexOf(uri) === 0) {\n          uri = this.root;\n        }\n        const baseURL = this.formatBaseURL(uri);\n        if (this.baseURL !== baseURL) {\n          //bbn.fn.warning(\"ROUTING: UPDATING BASE URL FROM \" + this.baseURL + \" TO \" + baseURL);\n          this.baseURL = baseURL;\n        }\n      }\n    },\n    navigationInit() {\n      // All routers above (which constitute the fullBaseURL)\n      this.parents = this.ancestors('bbn-router');\n      // The closest\n      this.parent = this.parents.length ? this.parents[0] : false;\n      // The root\n      this.router = this.parents.length ? this.parents[this.parents.length - 1] : this;\n      // Case where the rooter is not at the root level\n\n      if (this.parent) {\n        this.parentContainer = this.closest('bbn-container');\n        this.parentContainer.registerRouter(this);\n        this.updateBaseURL();\n        //bbn.fn.log(['updateBaseURL', this.baseURL, this.getFullBaseURL(), this.parentContainer.currentView, this.parentContainer.currentURL, this.root]);\n      }\n      // Case where the rooter is at root level\n      else {\n        // Opening the database for the visual mode multiview\n        if (!this.single && bbnRouterCp.db) {\n          _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].db.open('bbn').then(r => {\n            this.db = r;\n          }, err => {\n            _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.log(\"Connection error in router\", err);\n          });\n        }\n        _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.log([\"SETTING EVENT ON BEFORE UNLOAD\", this]);\n        if (!window.onbeforeunload) {\n          window.onbeforeunload = e => {\n            _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.log([\"BEFORE UNLOAD\", this.isDirty]);\n            if (this.isDirty) {\n              e.preventDefault();\n            }\n          };\n        }\n      }\n    },\n    navigationCreated() {\n      /**\n       * @event route\n       * @fires setconfig\n       */\n      this.$on('route', url => {\n        if (this.nav) {\n          this.setConfig();\n          let i = this.history.indexOf(url);\n          if (i > -1) {\n            this.history.splice(i, 1);\n          }\n          this.history.unshift(url);\n          while (this.history.length > this.historyMaxLength) {\n            this.history.pop();\n          }\n        }\n      });\n    }\n  },\n  watch: {\n    currentTitle(v) {\n      if (!this.parent) {\n        document.title = v + ' - ' + _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.siteTitle;\n      }\n    },\n    selected(idx) {\n      if (idx !== false && !this.views[idx]) {\n        throw Error(\"The view with index \" + idx + \" doesn't exist\");\n      }\n      _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.map(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.filter(this.views, {\n        selected: true\n      }), a => {\n        if (a.selected && a.idx !== idx) {\n          a.selected = false;\n        }\n      });\n      if (this.views[idx]) {\n        if (!this.views[idx].selected && !this.views[idx].pane) {\n          this.views[idx].selected = true;\n        }\n        if (this.urls[this.views[idx].uid]) {\n          this.activeContainer = this.urls[this.views[idx].uid];\n        }\n        this.views[idx].last = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.timestamp();\n      }\n\n      //this.move(idx, this.views.length - 1);\n\n      //bbn.fn.log(\"In selected watcher \" + idx, bbn.fn.filter(this.views, {selected: true}), bbn.fn.filter(this.views, {idx}), this.views);\n    },\n    /**\n     * @watch currentURL\n     * @fires changeURL\n     * @fires search\n     * @emit change\n     * @emit route\n     */\n    currentURL(newVal, oldVal) {\n      if (this.ready) {\n        let idx = this.search(newVal);\n        if (idx !== false) {\n          let v = this.views[idx];\n          let ct = this.urls[v.uid];\n          if (!v.pane) {\n            this.selected = idx;\n            if (ct) {\n              this.changeURL(newVal, ct.title);\n            } else if (this.isLoading) {\n              this.changeURL(newVal, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._(\"Loading\"));\n            }\n          }\n        }\n        this.$emit('change', newVal);\n        this.$emit('route', newVal);\n      }\n    },\n    /**\n     * @watch url\n     * @fires route\n     */\n    url(newVal) {\n      if (this.ready && newVal && newVal !== this.currentURL) {\n        //bbn.fn.log(\"URL CHANGED FROM WATCHER TO \" + newVal);\n        this.route(newVal);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/navigation.js?");

/***/ })

}]);