"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-selection-js"],{

/***/ "./src/components/container/_mixins/selection.js":
/*!*******************************************************!*\
  !*** ./src/components/container/_mixins/selection.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bbn/bbn */ \"./node_modules/@bbn/bbn/dist/index.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * The index of the container\n     * @prop {Number} idx\n     */\n    idx: {\n      type: Number\n    },\n    /**\n     * The timestamp of the last activation\n     * @prop {Number} last\n     */\n    last: {\n      type: Number\n    },\n    /**\n     * A unique id for the container that will ben used as index by the router\n     * @prop {String} uid\n     */\n    uid: {\n      type: String\n    },\n    /**\n     * Defines if the component has to be selected.\n     * @prop {Boolean|Number} [false] selected\n     */\n    selected: {\n      type: [Boolean, Number],\n      default: false\n    }\n  },\n  methods: {\n    /**\n     * Shows the container.\n     * \n     * @method show\n     */\n    show() {\n      if (!this.isPane) {\n        this.router.selected = this.currentIndex;\n        if (this.visual && this.router.visualShowAll) {\n          this.router.visualShowAll = false;\n        }\n      }\n    },\n    close() {\n      if (!this.isPane) {\n        this.router.close(this.currentIndex);\n      }\n    },\n    onShow() {\n      if (this.isVisible && this.router) {\n        if (!this.isLoaded && !this.isLoading) {\n          this.getView(this.currentURL, true);\n        } else if (!this.ready) {\n          this.$nextTick(() => {\n            this.onResize();\n            this.init();\n          });\n        }\n        this.router.navigate();\n      }\n    },\n    /**\n     * @method load\n     * @param {String} url\n     * @param {Boolean} force\n     * @fires search\n     * @fires add\n     * @fires parseURL\n     * @fires callRouter\n     * @fires navigate\n     * @fires activate\n     * @emit update\n    */\n    async getView(url, force, index) {\n      if (!url) {\n        throw Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._(\"Impossible to get the view without an URL\"));\n      }\n      let finalURL = this.router.fullBaseURL + url;\n      this.isLoading = true;\n      if (!this.currentView.pane) {\n        this.currentURL = this.router.parseURL(url);\n      }\n      this.router.$emit('update', this.router.views);\n      this.router.$emit(\"load\", finalURL);\n      let dataObj = this.router.postBaseUrl ? {\n        _bbn_baseURL: this.router.fullBaseURL\n      } : {};\n      let response;\n      try {\n        response = await this.post(finalURL, dataObj);\n      }\n      // Abort\n      catch (e) {\n        _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.warning(\"ABORTED\");\n        this.isLoading = false;\n        /*\n        let idx = this.search(this.parseURL(finalURL));\n        if (idx !== false) {\n          let url = this.currentView.url;\n          if (this.urls[url]) {\n            this.callRouter(finalURL, url);\n            this.$nextTick(() => {\n              this.close(idx);\n            });\n            return;\n          }\n        }\n        */\n      }\n      if (response?.status === 200) {\n        const d = response.data;\n        let callRealInit = true;\n        if (!d.title || d.title === _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('Loading')) {\n          let title = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('Untitled');\n          let num = 0;\n          while (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.search(this.router.views, a => a.title.indexOf(title) === 0) > -1) {\n            num++;\n            title = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('Untitled') + ' ' + num;\n          }\n          d.title = title;\n        }\n        this.currentTitle = d.title;\n        if (d.url && d.url !== this.currentURL) {\n          this.currentURL = d.url;\n          this.router.updateBaseURL();\n          _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.log(\"CHANGING URL TO \" + d.url + ' / ' + this.router.baseURL);\n          if (this.currentCurrent.indexOf(d.url)) {\n            this.currentCurrent = d.url;\n          }\n        }\n        if (Object.hasOwn(d, 'data')) {\n          this.currentSource = d.data;\n        }\n        if (Object.hasOwn(d, 'script')) {\n          this.currentScript = d.script;\n        }\n        if (Object.hasOwn(d, 'css')) {\n          this.currentCss = d.css;\n        }\n        if (Object.hasOwn(d, 'content')) {\n          this.currentContent = d.content;\n        }\n        if (Object.hasOwn(d, 'bcolor')) {\n          this.currentBcolor = d.bcolor;\n        }\n        if (Object.hasOwn(d, 'fcolor')) {\n          this.currentFcolor = d.fcolor;\n        }\n        if (Object.hasOwn(d, 'icon')) {\n          this.currentIcon = d.icon;\n        }\n        if (Object.hasOwn(d, 'options')) {\n          this.currentOptions = d.options;\n        }\n        if (Object.hasOwn(d, 'scrollable')) {\n          this.currentScrollable = d.scrollable;\n        }\n        if (Object.hasOwn(d, 'component')) {\n          this.currentComponent = d.component;\n        }\n        if (Object.hasOwn(d, 'notext')) {\n          this.currentNotext = d.notext;\n        }\n        if (Object.hasOwn(d, 'menu')) {\n          this.currentMenu = d.menu;\n        }\n        if (Object.hasOwn(d, 'advert')) {\n          this.currentAdvcert = d.advert;\n        }\n        if (Object.hasOwn(d, 'help')) {\n          this.currentHelp = d.help;\n        }\n        if (Object.hasOwn(d, 'imessages')) {\n          this.currentImessages = d.imessages;\n        }\n        this.isLoaded = true;\n        this.init();\n\n        /*\n        if (d.url) {\n          d.url = this.parseURL(d.url);\n        }\n        if (!d.url) {\n          d.url = url;\n        }\n        //bbn.fn.warning(\"URLS\", url, d.url);\n        if (url.indexOf(d.url) === 0) {\n          d.current = url;\n          //bbn.fn.warning(\"CURRENT DEFINED AS \" + d.current);\n        }\n        else {\n          bbn.fn.warning(url + ' != ' + d.url);\n          let searchIdx = this.search(url);\n          if (searchIdx !== false) {\n            idx = searchIdx;\n            bbn.fn.log(\"REMOVED\");\n            this.remove(searchIdx, true);\n          }\n        }\n         if (d.data && bbn.fn.numProperties(d.data)) {\n          d.source = d.data;\n          delete d.data;\n        }\n         if ((d.url !== d.current) && this.urls[d.current]) {\n          let currentIndex = this.urls[d.current].currentIndex;\n          //bbn.fn.warning(\"DELETING VIEW CASE.... \" + d.url + ' / ' + d.current + ' ' + currentIndex);\n          //bbn.fn.log([d.url, this.urls[d.current], this.urls[d.url], Object.keys(this.urls), bbn.fn.search(this.views, {idx: this.urls[d.current].idx})]);\n          this.remove(currentIndex, true).then(() => {\n            const onRegister = url => {\n              //bbn.fn.log([\"REGISTERED\", url]);\n              if (url === d.url) {\n                this.$off('registered', onRegister);\n                let view = bbn.fn.getRow(this.views, { url: url });\n                if ((this.selected === view.idx) || view.pane) {\n                  this.realInit(url);\n                }\n              }\n            };\n            this.$on('registered', onRegister);\n            let o = bbn.fn.extend(view || bbn.fn.createObject(), d, { loading: false, load: true, real: view?.real || false, loaded: true });\n            //bbn.fn.log([\"BEFORE\", this.views.length, Object.keys(this.urls)]);\n            this.add(o, currentIndex).then(() => {\n              //bbn.fn.log(this.search(o.url), o);\n              let searchIndex = this.search(o.url);\n              //bbn.fn.log(\"Looking for \" + o.url);\n              if (searchIndex !== false) {\n                //this.activateIndex(searchIndex);\n                this.selected = searchIndex;\n              }\n            });\n          })\n          //callRealInit = false;\n         }\n        else {\n          this.$forceUpdate().then(() => {\n            let o = bbn.fn.extend(view || bbn.fn.createObject(), d, { loading: false, load: true, real: view?.real || false, loaded: true });\n            let searchIndex = this.search(o.url);\n            //bbn.fn.log(\"Looking for \" + o.url);\n            if ((searchIndex !== false) && this.urls[this.views[searchIndex].url]) {\n              //this.remove(searchIndex);\n              bbn.fn.warning(\"FOUND AND NOT REMOVED \" + searchIndex);\n              idx = searchIndex;\n              this.urls[this.currentView.url].isLoaded = true;\n              this.urls[this.currentView.url].dirty = false;\n              this.urls[this.currentView.url].ready = false;\n              this.urls[this.currentView.url].init();\n             }\n            else {\n              //bbn.fn.warning(\"ADDEDD \" + idx);\n              //bbn.fn.log(\"ADDING AFTER LOAD\");\n              this.add(o, idx);\n            }\n             if (o.title && !o.pane) {\n              this.currentTitle = o.title;\n            }\n            //this.$forceUpdate();\n            this.$nextTick(() => {\n              if (callRealInit) {\n                this.realInit(d.url);\n              }\n            })\n          })\n         }\n        */\n      } else {\n        this.isLoading = false;\n        /*\n        let idx = this.search(this.parseURL(finalURL));\n        if (idx !== false) {\n          let url = this.currentView.url;\n          if (this.urls[url]) {\n            this.urls[url].errorStatus = response?.status || 500;\n            this.urls[url].setTitle(bbn._(\"Error\"));\n            this.urls[url].setIcon(\"nf nf-fa-warning\");\n            if (this.selected === idx) {\n              await this.callRouter(finalURL, url);\n            }\n          }\n        }\n        */\n      }\n    },\n    async selectionMounted() {\n      if (!this.router.ready) {\n        _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.warning(\"ROUTER NOT READY\");\n        this.router.$on('ready', () => {\n          _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.warning(\"ROUTER INITING\");\n          if (this.currentSelected) {\n            this.show();\n          }\n          this.init();\n        });\n      } else {\n        _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.warning(\"ROUTER REGISTERING FOR \" + this.url);\n        this.router.register(this);\n        await this.$nextTick();\n        if (this.currentSelected) {\n          this.show();\n          this.onShow();\n        }\n        this.init();\n      }\n    },\n    /**\n     * Initializes the component.\n     * \n     * @method init\n     */\n    init() {\n      if (this.isVisible && (this.real || this.isLoaded && !this.ready)) {\n        //bbn.fn.log(\"INIT \" + this.currentURL, this.real,this.currentScript, this.currentView )\n        let res;\n        if (this.currentScript) {\n          //bbn.fn.log(this.currentScript);\n          res = typeof this.currentScript === 'string' ? eval(this.currentScript) : this.currentScript;\n          //bbn.fn.log(\"************************************\", res);\n          // if evaluating the script property returns a function that will be onMount\n          if (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isFunction(res)) {\n            this.onMount = res;\n            this.isComponent = false;\n          }\n          // Otherwise if it's an object we assume it is a component\n          else if (res && typeof res === 'object') {\n            if (!res.props) {\n              res.props = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.createObject();\n            }\n            if (!res.props.source) {\n              res.props.source = {\n                type: Object\n              };\n            }\n            if (!res.mixins) {\n              res.mixins = [];\n            }\n            if (!res.mixins.includes(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.basic)) {\n              res.mixins.push(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.basic);\n            }\n            this.componentDefinition = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.normalizeComponent(res, 'bbn-container-' + this.getFullURL());\n\n            //bbn.fn.log(\"YUUUU\", res, this.componentDefinition, this.currentContent)\n            this.componentDefinition.template = this.currentContent;\n            this.isComponent = true;\n          }\n        } else if (this.currentContent) {\n          this.isComponent = false;\n        }\n        if (this.isComponent) {\n          // We create a local component with a random name,\n          // the content as template\n          // and the object returned as component definition\n          // Adding also a few funciton to interact with the tab\n          let cont = this;\n          const definition = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.extend(true, res ? res : {}, {\n            template: '<div class=\"' + (this.router.scrollContent ? '' : 'bbn-w-100') + '\">' + this.currentView.content + '</div>',\n            methods: {\n              getContainer() {\n                if (!this._bbn_container) {\n                  this._bbn_container = this.closest('bbn-container');\n                }\n                return this._bbn_container;\n              },\n              getTab() {\n                return this.getContainer();\n              },\n              addMenu() {\n                return this.getContainer().addMenu.apply(this.router, arguments);\n              },\n              deleteMenu() {\n                return this.getContainer().deleteMenu.apply(this.router, arguments);\n              }\n            },\n            props: {\n              source: {\n                type: Object\n              }\n            }\n          });\n          if (!definition.props) {\n            definition.props = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.createObject();\n          }\n          if (!definition.props.source) {\n            definition.props.source = {\n              type: Object\n            };\n          }\n          if (!definition.mixins) {\n            definition.mixins = [];\n          }\n          if (!definition.mixins.includes(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.basic)) {\n            definition.mixins.push(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.basic);\n          }\n          this.$el.bbnCfg = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.normalizeComponent(definition, 'bbn-container-' + this.getFullURL());\n          // The local anon component gets defined\n          this.$options.components[this.componentName] = this.$el.bbnCfg;\n        } else {\n          this.isComponent = false;\n        }\n        if (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.url.indexOf('#')) {\n          let scroll = this.getRef('scroll');\n          /**\n           * @todo  Does it mean the scroll manage the hash? Check it out\n           */\n          if (scroll && (scroll.currentY || scroll.currentX)) {\n            return;\n          }\n          let hash = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.url.split('#')[1];\n          if (hash) {\n            hash = '#' + hash;\n            location.hash = null;\n            location.hash = hash;\n          }\n        }\n        if (this.visual) {\n          this.setScreenshot();\n        }\n        this.ready = true;\n      }\n    },\n    /**\n     * Fires the parent's method reload.\n     * \n     * @method reload\n     * @fires router.reload\n     */\n    reload() {\n      this.popups.splice(0);\n      this.$nextTick(() => {\n        this.router.reload(this.currentIndex);\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/selection.js?");

/***/ })

}]);