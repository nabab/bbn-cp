"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-2change-js"],{

/***/ "./src/components/container/_mixins/2change.js":
/*!*****************************************************!*\
  !*** ./src/components/container/_mixins/2change.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * Initializes the component.\n     * \n     * @method init\n     */\n    init() {\n      if (this.isVisible && (this.real || this.isLoaded && !this.ready)) {\n        //bbn.fn.log(\"INIT \" + this.currentURL, this.real,this.currentScript, this.currentView )\n        let res;\n        if (this.currentScript) {\n          //bbn.fn.log(this.currentScript);\n          res = typeof this.currentScript === 'string' ? eval(this.currentScript) : this.currentScript;\n          //bbn.fn.log(\"************************************\", res);\n          // if evaluating the script property returns a function that will be onMount\n          if (bbn.fn.isFunction(res)) {\n            this.onMount = res;\n            this.isComponent = false;\n          }\n          // Otherwise if it's an object we assume it is a component\n          else if (res && typeof res === 'object') {\n            if (!res.props) {\n              res.props = bbn.fn.createObject();\n            }\n            if (!res.props.source) {\n              res.props.source = {\n                type: Object\n              };\n            }\n            if (!res.mixins) {\n              res.mixins = [];\n            }\n            if (!res.mixins.includes(bbn.cp.mixins.basic)) {\n              res.mixins.push(bbn.cp.mixins.basic);\n            }\n            this.componentDefinition = bbn.cp.normalizeComponent(res, 'bbn-container-' + this.getFullURL());\n\n            //bbn.fn.log(\"YUUUU\", res, this.componentDefinition, this.currentContent)\n            this.componentDefinition.template = this.currentContent;\n            this.isComponent = true;\n          }\n        } else if (this.currentContent) {\n          this.isComponent = false;\n        }\n        if (this.isComponent) {\n          // We create a local component with a random name,\n          // the content as template\n          // and the object returned as component definition\n          // Adding also a few funciton to interact with the tab\n          let cont = this;\n          const definition = bbn.fn.extend(true, res ? res : {}, {\n            template: '<div class=\"' + (this.router.scrollContent ? '' : 'bbn-w-100') + '\">' + this.currentView.content + '</div>',\n            methods: {\n              getContainer() {\n                if (!this._bbn_container) {\n                  this._bbn_container = this.closest('bbn-container');\n                }\n                return this._bbn_container;\n              },\n              getTab() {\n                return this.getContainer();\n              },\n              addMenu() {\n                return this.getContainer().addMenu.apply(this.router, arguments);\n              },\n              deleteMenu() {\n                return this.getContainer().deleteMenu.apply(this.router, arguments);\n              }\n            },\n            props: {\n              source: {\n                type: Object\n              }\n            }\n          });\n          if (!definition.props) {\n            definition.props = bbn.fn.createObject();\n          }\n          if (!definition.props.source) {\n            definition.props.source = {\n              type: Object\n            };\n          }\n          if (!definition.mixins) {\n            definition.mixins = [];\n          }\n          if (!definition.mixins.includes(bbn.cp.mixins.basic)) {\n            definition.mixins.push(bbn.cp.mixins.basic);\n          }\n          this.$el.bbnCfg = bbn.cp.normalizeComponent(definition, 'bbn-container-' + this.getFullURL());\n          // The local anon component gets defined\n          this.$options.components[this.componentName] = this.$el.bbnCfg;\n        } else {\n          this.isComponent = false;\n        }\n        if (bbn.env.url.indexOf('#')) {\n          let scroll = this.getRef('scroll');\n          /**\n           * @todo  Does it mean the scroll manage the hash? Check it out\n           */\n          if (scroll && (scroll.currentY || scroll.currentX)) {\n            return;\n          }\n          let hash = bbn.env.url.split('#')[1];\n          if (hash) {\n            hash = '#' + hash;\n            location.hash = null;\n            location.hash = hash;\n          }\n        }\n        if (this.visual) {\n          this.setScreenshot();\n        }\n        this.ready = true;\n      }\n    },\n    /**\n     * Fires the parent's method reload.\n     * \n     * @method reload\n     * @fires router.reload\n     */\n    reload() {\n      this.popups.splice(0);\n      this.$nextTick(() => {\n        this.router.reload(this.currentIndex);\n      });\n    },\n    /**\n     * @method registerRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    registerRouter(router) {\n      this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)] = router;\n      this.router.registerRouter(router);\n    },\n    /**\n     * @method unregisterRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    unregisterRouter(router) {\n      delete this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)];\n      this.router.unregisterRouter(router);\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/2change.js?");

/***/ })

}]);