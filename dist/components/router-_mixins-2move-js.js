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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bbn/bbn */ \"./node_modules/@bbn/bbn/dist/index.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * The confirm message when you close an unsaved container.\n     * @prop {(Boolean|String|Function)} ['Are you sure you want to discard the changes you made in this tab?'] confirmLeave\n     */\n    confirmLeave: {\n      type: [Boolean, String, Function],\n      default() {\n        return _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._(\"Are you sure you want to discard the changes you made in this page?\");\n      }\n    }\n  },\n  methods: {\n    checkLoaded(idx) {\n      return this.views[idx] &&\n      //!this.views[idx].real &&\n      this.views[idx].load && this.urls[this.views[idx].uid] && this.urls[this.views[idx].uid].isLoaded;\n    },\n    /**\n    * @method reload\n    * @param {Number} idx\n    * @fires route\n    */\n    async reload(idx, force) {\n      if (this.isValidIndex(idx) && this.views[idx].load) {\n        const item = this.views[idx];\n        let url = this.views[idx].current;\n        let rurl = this.views[idx].url;\n        //bbn.fn.log([\"RELOAD\", idx, url, rurl, this.baseURL]);\n        const obj = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.createObject({\n          load: true,\n          loaded: false\n        });\n        const take = ['url', 'current', 'selected', 'bcolor', 'fcolor', 'scrollable', 'icon', 'pane', 'label', 'fixed', 'pinned'];\n        take.forEach(n => {\n          if (n in item) {\n            obj[n] = item[n];\n          }\n        });\n        if (!force && !this.ignoreDirty && this.isDirty && item.dirty) {\n          this.confirm(this.confirmLeave, () => {\n            if (this.checkLoaded(idx)) {\n              // Looking for dirty ones in registered forms of each container\n              let forms = this.urls[item.uid].forms;\n              if (Array.isArray(forms) && forms.length) {\n                _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.each(forms, (f, k) => {\n                  f.reset();\n                });\n              }\n              if (this.urls[item.uid].popups?.length) {\n                this.urls[item.uid].popups.splice(0);\n              }\n              this.removeItem(idx, true, obj);\n            }\n          });\n        } else {\n          this.removeItem(idx, true, obj);\n        }\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/2move.js?");

/***/ })

}]);