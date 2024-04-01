"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-2move-js"],{

/***/ "./src/components/router/_mixins/2move.js":
/*!************************************************!*\
  !*** ./src/components/router/_mixins/2move.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * The confirm message when you close an unsaved container.\n     * @prop {(Boolean|String|Function)} ['Are you sure you want to discard the changes you made in this tab?'] confirmLeave\n     */\n    confirmLeave: {\n      type: [Boolean, String, Function],\n      default: bbn._(\"Are you sure you want to discard the changes you made in this page?\")\n    }\n  },\n  methods: {\n    realInit(url) {\n      bbn.fn.log(\"REAL INIT\", url, this.urls, this.views);\n      if (this.urls[url]) {\n        this.urls[url].setLoaded(true);\n        // Otherwise the changes we just did on the props wont be taken into account at container level\n        this.urls[url].init();\n        //bbn.fn.log(\"callRouter\", this.urls[url], this.urls[url].currentView);\n        this.callRouter(this.urls[url].currentURL || url, url);\n        this.$emit('update', this.views);\n      } else {\n        //bbn.fn.log(url, this.views[0].loading, this.views[0].url, JSON.stringify(Object.keys(this.urls), null, 2));\n        //throw Error(bbn._(\"Impossible to find the container for URL\") + ' ' + url);\n      }\n    },\n    checkLoaded(idx) {\n      return this.views[idx] &&\n      //!this.views[idx].real &&\n      this.views[idx].load && this.urls[this.views[idx].uid] && this.urls[this.views[idx].uid].isLoaded;\n    },\n    /**\n    * @method reload\n    * @param {Number} idx\n    * @fires route\n    */\n    async reload(idx, force) {\n      if (this.checkLoaded(idx)) {\n        let url = this.views[idx].current;\n        if (!force && !this.ignoreDirty && this.isDirty && this.views[idx].dirty) {\n          this.confirm(this.confirmLeave, () => {\n            if (this.checkLoaded(idx)) {\n              // Looking for dirty ones in registered forms of each container\n              let forms = this.urls[this.views[idx].uid].forms;\n              if (Array.isArray(forms) && forms.length) {\n                bbn.fn.each(forms, (f, k) => {\n                  f.reset();\n                });\n              }\n              if (this.urls[this.views[idx].uid] && this.urls[this.views[idx].uid].popups && this.urls[this.views[idx].uid].popups.length) {\n                this.urls[this.views[idx].uid].popups.splice(0);\n              }\n              this.load(url, true, idx);\n            }\n          });\n        } else {\n          this.load(url, true, idx);\n        }\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/2move.js?");

/***/ })

}]);