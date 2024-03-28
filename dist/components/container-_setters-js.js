"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_setters-js"],{

/***/ "./src/components/container/_setters.js":
/*!**********************************************!*\
  !*** ./src/components/container/_setters.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   setColor: () => (/* binding */ setColor),\n/* harmony export */   setCurrent: () => (/* binding */ setCurrent),\n/* harmony export */   setIcon: () => (/* binding */ setIcon),\n/* harmony export */   setLoaded: () => (/* binding */ setLoaded),\n/* harmony export */   setTitle: () => (/* binding */ setTitle)\n/* harmony export */ });\n/**\n * Sets the current url.\n * \n * @method setCurrent\n * @param {String} url \n */\nfunction setCurrent(url) {\n  if (url.indexOf(this.url) === 0) {\n    this.currentURL = url;\n    return true;\n  }\n  return false;\n}\n\n/**\n * Sets the title of the container.\n * \n * @method setTitle\n * @param {String} title \n */\nfunction setTitle(title) {\n  if (this.router) {\n    if (!this.real) {\n      this.router.views[this.currentIndex].title = title;\n    } else {\n      this.currentTitle = title;\n    }\n  }\n}\n\n/**\n * Sets the icon of the container.\n * \n * @method setIcon\n * @param {String} title \n */\nfunction setIcon(icon) {\n  if (this.router) {\n    if (!this.real) {\n      this.router.views[this.currentIndex].icon = icon;\n    } else {\n      this.currentIcon = icon;\n    }\n  }\n}\n\n/**\n * Sets the color.\n * \n * @method setColor\n * @param {String} bcolor \n * @param {String} fcolor \n */\nfunction setColor(bcolor, fcolor) {\n  if (this.router) {\n    let view = this.router.getView(this.url);\n    if (view) {\n      if (bcolor) {\n        this.router.$set(view, \"bcolor\", bcolor);\n      }\n      if (fcolor) {\n        this.router.$set(view, \"fcolor\", fcolor);\n      }\n    }\n  }\n}\n/**\n * Sets the value of the property loaded to the given val.\n * \n * @method setLoaded\n * @param {Boolean} val \n */\nfunction setLoaded(val) {\n  this.isLoaded = !!val;\n}\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_setters.js?");

/***/ })

}]);