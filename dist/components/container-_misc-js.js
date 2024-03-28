"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_misc-js"],{

/***/ "./src/components/container/_misc.js":
/*!*******************************************!*\
  !*** ./src/components/container/_misc.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enter: () => (/* binding */ enter),\n/* harmony export */   getComponent: () => (/* binding */ getComponent),\n/* harmony export */   getFullCurrentURL: () => (/* binding */ getFullCurrentURL),\n/* harmony export */   getFullURL: () => (/* binding */ getFullURL),\n/* harmony export */   onResize: () => (/* binding */ onResize),\n/* harmony export */   popup: () => (/* binding */ popup),\n/* harmony export */   randomName: () => (/* binding */ randomName)\n/* harmony export */ });\n/**\n * Returns the full current url.\n * \n * @method getFullCurrentURL\n * @return {String}\n */\nfunction getFullCurrentURL() {\n  return this.router.getFullBaseURL() + this.currentURL;\n}\n\n/**\n * Returns the full url.\n * \n * @method getFullURL\n * @return {String}\n */\nfunction getFullURL() {\n  return this.router.getFullBaseURL() + this.url;\n}\n\n/**\n * Generates a random name used for the component.\n * \n * @method randomName\n * @return {String}\n */\nfunction randomName() {\n  let n = bbn.fn.randomString(20, 15).toLowerCase();\n  while (bbnContainerCp.componentsList.indexOf(n) > -1) {\n    n = bbn.fn.randomString(20, 15).toLowerCase();\n  }\n  return n;\n}\n\n/**\n * Gets the popup object.\n *  \n * @method popup\n * @return {Object}\n */\nfunction popup() {\n  let popup = this.getPopup();\n  return arguments.length ? popup.open.apply(popup, arguments) : popup;\n}\n\n/**\n * Gets the child component.\n * \n * @method getComponent\n * @return {Object|Boolean}\n */\nfunction getComponent() {\n  return this.getRef('component');\n}\n\n/**\n * Fires the parent's method enter.\n * \n * @method enter\n * @fires router.enter\n */\nfunction enter() {\n  this.router.enter(this);\n}\nfunction onResize() {\n  if (this.isVisible && this.ready) {\n    return bbn.cp.mixins.resizer.methods.onResize.apply(this);\n  }\n}\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_misc.js?");

/***/ })

}]);