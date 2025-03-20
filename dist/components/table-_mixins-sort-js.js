"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-sort-js"],{

/***/ "./src/components/table/_mixins/sort.js":
/*!**********************************************!*\
  !*** ./src/components/table/_mixins/sort.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * Returns true if the given column is sorted.\n     * @method isSorted\n     * @param {Object} col\n     */\n    isSorted(col) {\n      if (this.sortable && col.sortable !== false && !col.buttons && col.field) {\n        let idx = bbn.fn.search(this.currentOrder, {\n          field: col.field\n        });\n        if (idx > -1) {\n          return this.currentOrder[idx];\n        }\n      }\n      return false;\n    },\n    /**\n     * Sorts the given column.\n     * @method sort\n     * @param {Object} col\n     * @fires updateData\n     */\n    sort(col) {\n      if (!this.isLoading && this.sortable && col.field && col.sortable !== false) {\n        let f = col.field,\n          pos = bbn.fn.search(this.currentOrder, {\n            field: f\n          });\n        if (pos > -1) {\n          if (this.currentOrder[pos].dir.toUpperCase() === 'ASC') {\n            this.currentOrder[pos].dir = 'DESC';\n          } else {\n            this.currentOrder.splice(0, this.currentOrder.length);\n          }\n        } else {\n          this.currentOrder.splice(0, this.currentOrder.length);\n          this.currentOrder.push({\n            field: f,\n            dir: 'ASC'\n          });\n        }\n        if (this.isAjax) {\n          this.updateData();\n        }\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/table/_mixins/sort.js?");

/***/ })

}]);