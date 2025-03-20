"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-group-js"],{

/***/ "./src/components/table/_mixins/group.js":
/*!***********************************************!*\
  !*** ./src/components/table/_mixins/group.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Set to true allows the table to be groupable according to the props groupBy.\n     * @prop {Boolean} [false] groupable\n     */\n    groupable: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * In case of Ajax table, set to true will make an Ajax call to group the table by a field.\n     * @prop {Boolean} [true] serverGrouping\n     */\n    serverGrouping: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Set to false will make an Ajax call for the grouping.\n     * @prop {Boolean} [true] localGrouping\n     */\n    localGrouping: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * The index of the property to group by the table referred to the object of data of the row.\n     * @prop {Number} groupBy\n     */\n    groupBy: {\n      type: Number\n    },\n    /**\n     * Defines the footer for a group of rows.\n     * Allowed values ​​are the name or the object of a component or a function (to inject custom html)\n     * @prop {String|Object|Function} groupFooter\n     */\n    groupFooter: {\n      type: [String, Object, Function]\n    }\n  },\n  data() {\n    return {\n      /**\n       * @data {Boolean|Number} [false] group\n       */\n      group: this.groupBy === undefined ? false : this.groupBy\n    };\n  },\n  computed: {\n    isGroupActive() {\n      return this.groupable && this.group !== false && this.cols[this.group] && this.cols[this.group].field;\n    }\n  },\n  methods: {\n    /**\n     * Returns wheter or not the cell is grouped.\n     * @method isGroupedCell\n     * @param {Number} groupIndex\n     * @param {Object} row\n     * @returns {Boolean}\n     */\n    isGroupedCell(groupIndex, row) {\n      if (this.groupable && row.group) {\n        if (this.groupCols[0].width > 200) {\n          return groupIndex === 0;\n        } else {\n          return groupIndex === 1;\n        }\n      }\n      return false;\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/table/_mixins/group.js?");

/***/ })

}]);