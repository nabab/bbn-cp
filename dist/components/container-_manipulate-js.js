"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_manipulate-js"],{

/***/ "./src/components/container/_manipulate.js":
/*!*************************************************!*\
  !*** ./src/components/container/_manipulate.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   close: () => (/* binding */ close),\n/* harmony export */   pin: () => (/* binding */ pin),\n/* harmony export */   show: () => (/* binding */ show),\n/* harmony export */   unpin: () => (/* binding */ unpin)\n/* harmony export */ });\n/**\n * Shows the container.\n * \n * @method show\n */\nfunction show() {\n  if (!this.isPane) {\n    this.router.selected = this.currentIndex;\n    if (this.visual && this.router.visualShowAll) {\n      this.router.visualShowAll = false;\n    }\n  }\n}\nfunction close() {\n  if (!this.isPane) {\n    this.router.close(this.currentIndex);\n  }\n}\nfunction pin() {\n  this.router.pin(this.currentIndex);\n}\nfunction unpin() {\n  this.router.unpin(this.currentIndex);\n}\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_manipulate.js?");

/***/ })

}]);