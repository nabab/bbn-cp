"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-view-js"],{

/***/ "./src/components/container/_mixins/view.js":
/*!**************************************************!*\
  !*** ./src/components/container/_mixins/view.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * The source of the component.\n     * @prop {Object|Function} source\n     */\n    source: {\n      type: [Array, Object, String, Function]\n    },\n    /**\n     * The title of the component.\n     * @prop {String|Number} ['Untitled'] title\n     */\n    title: {\n      type: [String, Number],\n      default: bbn._(\"Untitled\")\n    },\n    /**\n     * The options object of the component.\n     * @prop {Object} options\n     */\n    options: {\n      type: Object,\n      default() {\n        return {};\n      }\n    },\n    /**\n     * Defines the icon.\n     * @prop {String|Boolean} icon\n     */\n    icon: {\n      type: [String, Boolean]\n    },\n    /**\n     * Defines if the component can have a text.\n     * @prop {Boolean} [false] notext\n     */\n    notext: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Defines the component's content.\n     * @prop {String} [''] content\n     */\n    content: {\n      type: String,\n      default: \"\"\n    },\n    /**\n     * Defines the menu.\n     * @prop {Array|Function} menu\n     */\n    menu: {\n      type: [Array, Function, Boolean]\n    },\n    /**\n     * Defines if the component is loaded.\n     * @prop {Boolean} loaded\n     */\n    loaded: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Tells if the component is currently loading.\n     * @prop {Boolean} loading\n     */\n    loading: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Defines the component's fcolor.\n     * @prop {String} fcolor\n     */\n    fcolor: {\n      type: String\n    },\n    /**\n     * Defines the component's bcolor.\n     * @prop {String} bcolor\n     */\n    bcolor: {\n      type: String\n    },\n    /**\n     * @prop {Boolean} [false] load\n     */\n    load: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Defines the css string for the component.\n     * @prop {String} [''] css\n     */\n    css: {\n      type: String,\n      default: \"\"\n    },\n    /**\n     * @prop {String|Object} advert\n     */\n    advert: {\n      type: [String, Object]\n    },\n    /**\n     * @prop {String} help\n     */\n    help: {\n      type: String\n    },\n    /**\n     * @prop {Array} imessages\n     */\n    imessages: {\n      type: [Array, Function],\n      default() {\n        return [];\n      }\n    },\n    /**\n     * @prop script\n     */\n    script: {},\n    /**\n     * Defines if the component has to be fixed.\n     * @prop {Boolean|Number} [false] fixed\n     */\n    fixed: {\n      type: [Boolean, Number],\n      default: false\n    },\n    /**\n     * Defines\n     if the component has to be pinned.\n      * @prop {Boolean|Number} [false] pinned\n        */\n    pinned: {\n      type: [Boolean, Number],\n      default: false\n    },\n    /**\n     * Defines the url.\n     * @prop {String|Number} url\n     */\n    url: {\n      type: [String, Number]\n    },\n    /**\n     * @prop current\n     * @prop {String|Number} current\n     */\n    current: {\n      type: [String, Number]\n    },\n    /**\n     * @prop {Boolean} [true] real\n     */\n    real: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * The object of configuration for the component\n     * @prop {Object} cfg\n     */\n    cfg: {\n      type: Object\n    },\n    /**\n     * @prop {Object} events\n     */\n    events: {\n      type: Object,\n      default() {\n        return {};\n      }\n    }\n  },\n  data() {\n    return {\n      /**\n       * True if the data changes and is unsaved.\n       * @data {Boolan} [false] dirty\n       */\n      dirty: false,\n      /**\n       * True when the component finishes loading.\n       * @data {Boolean} isLoaded\n       */\n      isLoaded: !this.load || this.loaded,\n      /**\n       * True if the container is pinned.\n       * @data {Boolean} isPinned\n       */\n      isPinned: this.pinned,\n      /**\n       * True if the container is fixed.\n       * @data {Boolean} isStatic\n       */\n      isFixed: this.fixed,\n      /**\n       * The current url.\n       * @data {String} currentURL\n       */\n      currentURL: this.current || this.url,\n      currentIndex: this.idx || null\n    };\n  },\n  computed: {\n    currentView() {\n      if (!this.router) {\n        this.router = this.closest('bbn-router');\n      }\n      if (this.router) {\n        return bbn.fn.getRow(this.router.views, {\n          idx: this.currentIndex\n        });\n      }\n      return null;\n    },\n    /**\n     * Defines the css string for the component.\n     * @prop {String} [''] css\n     */\n    currentCss: {\n      get() {\n        return this.currentView?.css || '';\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.css = v;\n        }\n      }\n    },\n    /**\n     * The source of the component.\n     * @prop {Object|Function} source\n     */\n    currentSource: {\n      get() {\n        return this.currentView?.source || undefined;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.source = v;\n        }\n      }\n    },\n    /**\n     * The title of the component.\n     * @prop {String|Number} ['Untitled'] title\n     */\n    currentTitle: {\n      get() {\n        return this.currentView?.title || bbn._('Untitled');\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.title = v;\n        }\n      }\n    },\n    /**\n     * The options object of the component.\n     * @prop {Object} options\n     */\n    currentOptions: {\n      get() {\n        return this.currentView?.options || {};\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.options = v;\n        }\n      }\n    },\n    /**\n     * Defines if the component has to be cached.\n     * @prop {Boolean} [false] cached\n     */\n    currentCached: {\n      get() {\n        return this.currentView?.cached || false;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.cached = v;\n        }\n      }\n    },\n    /**\n     * Defines if the component has to be scrollable.\n     * @prop {Boolean} [true] scrollable\n     */\n    currentScrollable: {\n      get() {\n        return this.currentView?.scrollable || true;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.scrollable = v;\n        }\n      }\n    },\n    /**\n     * Defines the component to use.\n     * @prop component\n     */\n    currentComponent: {\n      get() {\n        return this.currentView?.component || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.component = v;\n        }\n      }\n    },\n    /**\n     * Defines the icon.\n     * @prop {String|Boolean} icon\n     */\n    currentIcon: {\n      get() {\n        return this.currentView?.icon || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.icon = v;\n        }\n      }\n    },\n    /**\n     * Defines if the component can have a text.\n     * @prop {Boolean} [false] notext\n     */\n    currentNotext: {\n      get() {\n        return this.currentView?.notext || false;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.notext = v;\n        }\n      }\n    },\n    /**\n     * Defines the component's content.\n     * @prop {String} [''] content\n     */\n    currentContent: {\n      get() {\n        return this.currentView?.content || '';\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.content = v;\n        }\n      }\n    },\n    /**\n     * Defines the menu.\n     * @prop {Array|Function} menu\n     */\n    currentMenu: {\n      get() {\n        return this.currentView?.menu || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.menu = v;\n        }\n      }\n    },\n    /**\n     * Defines the component's fcolor.\n     * @prop {String} fcolor\n     */\n    currentFcolor: {\n      get() {\n        return this.currentView?.fcolor || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.fcolor = v;\n        }\n      }\n    },\n    /**\n     * Defines the component's bcolor.\n     * @prop {String} bcolor\n     */\n    currentBcolor: {\n      get() {\n        return this.currentView?.bcolor || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.bcolor = v;\n        }\n      }\n    },\n    /**\n     * @prop {String|Object} advert\n     */\n    currentAdvert: {\n      get() {\n        return this.currentView?.advert || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.advert = v;\n        }\n      }\n    },\n    /**\n     * @prop {String} help\n     */\n    currentHelp: {\n      get() {\n        return this.currentView?.help || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.help = v;\n        }\n      }\n    },\n    /**\n     * @prop {Array} imessages\n     */\n    currentImessages: {\n      get() {\n        return this.currentView?.imessages || [];\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.imessages = v;\n        }\n      }\n    },\n    /**\n     * @prop script\n     */\n    currentScript: {\n      get() {\n        return this.currentView?.script || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.script = v;\n        }\n      }\n    },\n    /**\n     * @prop current\n     * @prop {String|Number} current\n     */\n    currentCurrent: {\n      get() {\n        return this.currentView?.current || null;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.current = v;\n        }\n      }\n    },\n    /**\n     * The object of configuration for the component\n     * @prop {Object} cfg\n     */\n    currentCfg: {\n      get() {\n        return this.currentView?.cfg || {};\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.cfg = v;\n        }\n      }\n    },\n    /**\n     * @prop {Object} events\n     */\n    currentEvents: {\n      get() {\n        return this.currentView?.events || {};\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.events = v;\n        }\n      }\n    },\n    /**\n     * Defines if the component is disabled.\n     * @prop {Boolean} [false] disabled\n     */\n    currentDisabled: {\n      get() {\n        return this.currentView?.disabled || false;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.disabled = v;\n        }\n      }\n    },\n    /**\n     * Defines if the component is hidden.\n     * @prop {Boolean} [false] hidden\n     */\n    currentHidden: {\n      get() {\n        return this.currentView?.hidden || false;\n      },\n      set(v) {\n        if (this.currentView) {\n          this.currentView.hidden = v;\n        }\n      }\n    }\n  },\n  methods: {\n    pin() {\n      this.router.pin(this.currentIndex);\n    },\n    unpin() {\n      this.router.unpin(this.currentIndex);\n    },\n    /**\n     * Sets the current url.\n     * \n     * @method setCurrent\n     * @param {String} url \n     */\n    setCurrent(url) {\n      if (url.indexOf(this.url) === 0) {\n        this.currentURL = url;\n        return true;\n      }\n      return false;\n    },\n    /**\n     * Sets the title of the container.\n     * \n     * @method setTitle\n     * @param {String} title \n     */\n    setTitle(title) {\n      if (this.router) {\n        if (!this.real) {\n          this.router.views[this.currentIndex].title = title;\n        } else {\n          this.currentTitle = title;\n        }\n      }\n    },\n    /**\n     * Sets the icon of the container.\n     * \n     * @method setIcon\n     * @param {String} title \n     */\n    setIcon(icon) {\n      if (this.router) {\n        if (!this.real) {\n          this.router.views[this.currentIndex].icon = icon;\n        } else {\n          this.currentIcon = icon;\n        }\n      }\n    },\n    /**\n     * Sets the color.\n     * \n     * @method setColor\n     * @param {String} bcolor \n     * @param {String} fcolor \n     */\n    setColor(bcolor, fcolor) {\n      if (this.router) {\n        let view = this.router.getView(this.url);\n        if (view) {\n          if (bcolor) {\n            this.router.$set(view, \"bcolor\", bcolor);\n          }\n          if (fcolor) {\n            this.router.$set(view, \"fcolor\", fcolor);\n          }\n        }\n      }\n    },\n    /**\n     * Sets the value of the property loaded to the given val.\n     * \n     * @method setLoaded\n     * @param {Boolean} val \n     */\n    setLoaded(val) {\n      this.isLoaded = !!val;\n    }\n  },\n  watch: {\n    currentView: {\n      deep: true,\n      handler(v, ov) {\n        if (v || ov) {\n          //bbn.fn.log(\"DEEP HANDLER ON VIEW\", v, ov);\n          this.$tick();\n        }\n      }\n      /*\n      bbn.fn.iterate(v, (a, n) => {\n        let name = 'c' + bbn.fn.correctCase(n);\n        if (Object.hasOwn(this, name) && !bbn.fn.isSame(this[name], a)) {\n          this[name] = a;\n          bbn.fn.log(\"***************** CHANGING \" + name + \" IN CURRENT VIEW FOR \" + this.url + \" *****************\")\n        }\n      });\n      */\n    },\n    /**\n     * The source of the component.\n     * @prop {Object|Function} source\n     */\n    source(v) {\n      if (this.real) {\n        this.currentView.source = v;\n      }\n    },\n    /**\n     * The options object of the component.\n     * @prop {Object} options\n     */\n    options(v) {\n      if (this.real) {\n        this.currentView.options = v;\n      }\n    },\n    /**\n     * Defines if the component has to be cached.\n     * @prop {Boolean} [false] cached\n     */\n    cached(v) {\n      if (this.real) {\n        this.currentView.cached = v;\n      }\n    },\n    /**\n     * Defines if the component has to be scrollable.\n     * @prop {Boolean} [true] scrollable\n     */\n    scrollable(v) {\n      if (this.real) {\n        this.currentView.scrollable = v;\n      }\n    },\n    /**\n     * Defines the component to use.\n     * @prop component\n     */\n    component(v) {\n      if (this.real) {\n        this.currentView.component = v;\n      }\n    },\n    /**\n     * Defines the icon.\n     * @prop {String|Boolean} icon\n     */\n    icon(v) {\n      if (this.real) {\n        this.currentView.icon = v;\n      }\n    },\n    /**\n     * Defines if the component can have a text.\n     * @prop {Boolean} [false] notext\n     */\n    notext(v) {\n      if (this.real) {\n        this.currentView.notext = v;\n      }\n    },\n    /**\n     * Defines the component's content.\n     * @prop {String} [''] content\n     */\n    content(v) {\n      if (this.real) {\n        this.currentView.content = v;\n      }\n    },\n    /**\n     * Defines the menu.\n     * @prop {Array|Function} menu\n     */\n    menu(v) {\n      if (this.real) {\n        this.currentView.menu = v;\n      }\n    },\n    /**\n     * Defines the component's fcolor.\n     * @prop {String} fcolor\n     */\n    fcolor(v) {\n      if (this.real) {\n        this.currentView.fcolor = v;\n      }\n    },\n    /**\n     * Defines the component's bcolor.\n     * @prop {String} bcolor\n     */\n    bcolor(v) {\n      if (this.real) {\n        this.currentView.bcolor = v;\n      }\n    },\n    /**\n     * Defines the css string for the component.\n     * @prop {String} [''] css\n     */\n    css(v) {\n      if (this.real) {\n        this.currentView.css = v;\n      }\n    },\n    /**\n     * @prop {String|Object} advert\n     */\n    advert(v) {\n      if (this.real) {\n        this.currentView.advert = v;\n      }\n    },\n    /**\n     * @prop {String} help\n     */\n    help(v) {\n      if (this.real) {\n        this.currentView.help = v;\n      }\n    },\n    /**\n     * @prop {Array} imessages\n     */\n    imessages(v) {\n      if (this.real) {\n        this.currentView.imessages = v;\n      }\n    },\n    /**\n     * @prop script\n     */\n    script(v) {\n      if (this.real) {\n        this.currentView.script = v;\n      }\n    },\n    /**\n     * The object of configuration for the component\n     * @prop {Object} cfg\n     */\n    cfg(v) {\n      if (this.real) {\n        this.currentView.cfg = v;\n      }\n    },\n    /**\n     * @prop {Object} events\n     */\n    events(v) {\n      if (this.real) {\n        this.currentView.events = v;\n      }\n    },\n    /**\n     * Defines if the component is disabled.\n     * @prop {Boolean} [false] disabled\n     */\n    disabled(v) {\n      if (this.real) {\n        this.currentView.disabled = v;\n      }\n    },\n    /**\n     * Defines if the component is hidden.\n     * @prop {Boolean} [false] hidden\n     */\n    hidden(v) {\n      if (this.real) {\n        this.currentView.hidden = v;\n      }\n    },\n    title(v) {\n      if (this.real) {\n        this.currentView.title = v;\n      }\n    },\n    /**\n     * @watch content\n     * @param {Boolean} newVal \n     * @param {Boolean} oldVal \n     */\n    content(newVal, oldVal) {\n      if (newVal) {\n        this.currentView.content = newVal;\n        bbn.fn.log(\"GT CONTENT\");\n\n        /*\n        setTimeout(() => {\n          this.onMount = () => {\n            return false;\n          };\n          let res;\n          if ( this.script ){\n            res = typeof this.script === 'string' ? eval(this.script) : this.script;\n            if (bbn.fn.isFunction(res) ){\n              this.onMount = res;\n              this.isComponent = false;\n            }\n            else if ( typeof(res) === 'object' ){\n              this.isComponent = true;\n            }\n          }\n          else if ( this.source && this.content ){\n            bbn.fn.extend(res ? res : {}, {\n              name: this.name,\n              template: '<div class=\"bbn-overlay\">' + this.content + '</div>',\n              props: ['source']\n            });\n          }\n          else{\n            this.isComponent = false;\n          }\n          this.isComponentActive = true;\n        }, oldVal ? 200 : 0)\n        */\n      }\n    },\n    loaded(v) {\n      this.isLoaded = v;\n    },\n    loading(v) {\n      this.isLoading = v;\n    },\n    current(newVal) {\n      if (newVal.indexOf(this.url) === 0) {\n        this.currentURL = newVal;\n      }\n      if (this.real) {\n        this.currentView.current = v;\n      }\n    },\n    /**\n     * @watch currentUrl\n     * @param {String} newVal \n     * @param {String} oldVal \n     */\n    currentURL(newVal, oldVal) {\n      // Auto cancelling if it does not correspond to the url\n      if (!newVal || newVal.indexOf(this.url) !== 0) {\n        this.currentURL = this.url;\n      }\n      // Routing if the router has different info\n      else if (this.router && this.router.$isInit && this.currentView && this.currentView.current !== newVal) {\n        this.router.route(newVal);\n      }\n    },\n    dirty(v) {\n      let view = this.router.getView(this.url);\n      if (view) {\n        view.dirty = v;\n        this.router.retrieveDirtyContainers();\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/view.js?");

/***/ })

}]);