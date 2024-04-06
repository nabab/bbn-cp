"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-elements-js"],{

/***/ "./src/components/router/_mixins/elements.js":
/*!***************************************************!*\
  !*** ./src/components/router/_mixins/elements.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * @method getVue\n     * @fires isValidIndex\n     * @return {Vue|Boolean}\n     */\n    getVue(idx) {\n      return this.getContainer(idx);\n    },\n    /**\n     * Returns the corresponding container's component's DOM element.\n     * @method getContainer\n     * @param {Number} idx\n     * @return {bbnCp}\n     */\n    getContainer(idx) {\n      if (idx === undefined) {\n        idx = this.selected;\n      }\n      return this.urls[this.views[idx]?.uid];\n    },\n    /**\n     * Returns the corresponding container's component's DOM element.\n     * @method getDOMContainer\n     * @param {Number} idx\n     * @fires getContainer\n     * @return {HTMLElement|Boolean}\n     */\n    getDOMContainer(idx) {\n      if (idx === undefined) {\n        idx = this.selected;\n      }\n      let c = this.getContainer(idx);\n      return c ? c.$el : false;\n    },\n    /**\n     * @method getFinalContainer\n     * @param misc\n     * @fires getIndex\n     * @fires getSubRouter\n     * @fires getContainer\n     * @return {bbnCp}\n     */\n    getFinalContainer(misc) {\n      let idx = this.getIndex(misc);\n      if (idx === undefined) {\n        idx = this.selected;\n      }\n      let router = this.urrls[this.views[idx].uid].subRouter;\n      if (router) {\n        return router.getFinalContainer();\n      }\n      return this.getContainer(idx);\n    },\n    /**\n     * @method getRealVue\n     * @param misc\n     * @fires getFinalContainer\n     * @return {bbnCp}\n     */\n    getRealVue(misc) {\n      return this.getFinalContainer(misc);\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/elements.js?");

/***/ })

}]);