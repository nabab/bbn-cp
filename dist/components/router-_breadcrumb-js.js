"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_breadcrumb-js"],{

/***/ "./src/components/router/_breadcrumb.js":
/*!**********************************************!*\
  !*** ./src/components/router/_breadcrumb.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getBreadcrumbs: () => (/* binding */ getBreadcrumbs),\n/* harmony export */   registerBreadcrumb: () => (/* binding */ registerBreadcrumb),\n/* harmony export */   unregisterBreadcrumb: () => (/* binding */ unregisterBreadcrumb)\n/* harmony export */ });\n//Breadcrumb\n/**\n * @method registerBreadcrumb\n * @param {bbnCp} bc\n * @param {String} url\n */\nfunction registerBreadcrumb(bc) {\n  let url = bbn.fn.substr(bc.baseURL, 0, bc.baseURL.length - 1);\n  this.breadcrumbsList.push(bc);\n  if (this.itsMaster && !this.master) {\n    this.itsMaster.breadcrumbsList.push(bc);\n  }\n}\n\n/**\n * @method unregisterBreadcrumb\n * @param {bbnCp} bc\n * @param {String} url\n */\nfunction unregisterBreadcrumb(bc) {\n  if (this.breadcrumbsList) {\n    let idx = bbn.fn.search(this.breadcrumbsList, {\n      baseURL: bc.baseURL\n    });\n    if (idx !== -1) {\n      this.breadcrumbsList.splice(idx, 1);\n    }\n    if (this.itsMaster && !this.master) {\n      idx = bbn.fn.search(this.itsMaster.breadcrumbsList, {\n        baseURL: bc.baseURL\n      });\n      if (idx !== -1) {\n        this.itsMaster.breadcrumbsList.splice(idx, 1);\n      }\n    }\n  }\n}\nfunction getBreadcrumbs(idx) {\n  let ret = [];\n  if (bbn.fn.isNumber(idx) && this.views[idx]) {\n    let url = this.views[idx].url,\n      bc = bbn.fn.getRow(this.breadcrumbsList, {\n        baseURL: url + '/'\n      });\n    if (this.urls[url] && bc) {\n      ret.push(...bc.breadcrumbs);\n    }\n  }\n  return ret;\n}\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_breadcrumb.js?");

/***/ })

}]);