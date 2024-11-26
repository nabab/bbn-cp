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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bbn/bbn */ \"./node_modules/@bbn/bbn/dist/index.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * @method registerRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    registerRouter(router) {\n      if (this.subrouter && this.subrouter !== router) {\n        throw new Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The router %s already exists', router.getBaseURL() || '__root__'));\n      }\n      this.subrouter = router;\n    },\n    /**\n     * @method unregisterRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    unregisterRouter(router) {\n      if (!this.subrouter) {\n        throw new Error(_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"]._('The router %s was not registered', router.getBaseURL() || '__root__'));\n      }\n      this.subrouter = null;\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/2change.js?");

/***/ })

}]);