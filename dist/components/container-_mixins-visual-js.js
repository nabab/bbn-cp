"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-visual-js"],{

/***/ "./src/components/container/_mixins/visual.js":
/*!****************************************************!*\
  !*** ./src/components/container/_mixins/visual.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * A unique id for the container that will ben used as index by the router\n     * @prop {String} uid\n     */\n    visual: {\n      type: Boolean,\n      default: false\n    },\n    portal: {\n      type: [String, HTMLElement, Boolean],\n      default: false\n    }\n  },\n  computed: {\n    isVisualVisible() {\n      if (this.router?.isVisual) {\n        let row = bbn.fn.getRow(this.router.visualList, 'view.idx', this.currentIndex);\n        if (row) {\n          return row.visible;\n        }\n      }\n      return false;\n    },\n    visualStyle() {\n      let r = this.router;\n      if (r && r.isVisual) {\n        if (r.numVisualReals > 0 && (!this.isVisible || r.visualShowAll) && (!this.ready || !this.isPane)) {\n          return {\n            zoom: 0.1,\n            width: '100%',\n            height: 'auto',\n            overflow: 'hidden',\n            display: bbn.fn.getRow(this.router.visualList, 'view.uid', this.currentView.uid) ? 'block' : 'none'\n          };\n        }\n        let coord = [1, r.numVisualCols + 1, 1, r.numVisualRows + 1];\n        if (r.numVisualReals > 0) {\n          switch (r.visualOrientation) {\n            case 'top':\n              coord[2] = 2;\n              break;\n            case 'bottom':\n              coord[3] = coord[3] - 1;\n              break;\n            case 'left':\n              coord[0] = 2;\n              break;\n            case 'right':\n              coord[1] = coord[1] - 1;\n              break;\n          }\n        }\n        return {\n          gridColumnStart: coord[0],\n          gridColumnEnd: coord[1],\n          gridRowStart: coord[2],\n          gridRowEnd: coord[3],\n          zoom: 1,\n          display: bbn.fn.getRow(this.router.visualList, 'view.uid', this.currentView.uid) ? 'block' : 'none'\n        };\n      }\n      return {};\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/visual.js?");

/***/ })

}]);