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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * The index of the container\n     * @prop {Number} idx\n     */\n    idx: {\n      type: Number\n    },\n    /**\n     * The timestamp of the last activation\n     * @prop {Number} last\n     */\n    last: {\n      type: Number\n    },\n    /**\n     * A unique id for the container that will ben used as index by the router\n     * @prop {String} uid\n     */\n    uid: {\n      type: String,\n      default() {\n        return bbn.fn.randomString();\n      }\n    },\n    /**\n     * Defines if the component has to be selected.\n     * @prop {Boolean|Number} [false] selected\n     */\n    selected: {\n      type: [Boolean, Number],\n      default: false\n    }\n  },\n  methods: {\n    /**\n     * Shows the container.\n     * \n     * @method show\n     */\n    show() {\n      if (!this.isPane) {\n        this.router.selected = this.currentIndex;\n        if (this.visual && this.router.visualShowAll) {\n          this.router.visualShowAll = false;\n        }\n      }\n    },\n    close() {\n      if (!this.isPane) {\n        this.router.close(this.currentIndex);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/selection.js?");

/***/ })

}]);