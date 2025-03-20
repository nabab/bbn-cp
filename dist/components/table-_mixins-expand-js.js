"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-expand-js"],{

/***/ "./src/components/table/_mixins/expand.js":
/*!************************************************!*\
  !*** ./src/components/table/_mixins/expand.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Defines the expander of the rows.\n     * @prop  {Object|String|Function} expander\n     */\n    expander: {\n      type: [Object, String, Function]\n    },\n    /**\n     * The list of expanded rows based on a specific value (ex. group field) and not on the row index\n     * @prop {Array|Function} expandedValues\n     */\n    expandedValues: {\n      type: [Array, Function]\n    },\n    /**\n     * In a grouped table, if set to true defines that all rows will be expanded. If an array is given defines which row(s) of the table will be expanded.\n     * @prop {Boolean|Array} [[]] expanded\n     */\n    expanded: {\n      type: [Boolean, Array],\n      default() {\n        return [];\n      }\n    }\n  },\n  data() {\n    return {\n      /**\n       * @data {Boolean} allExpanded\n       */\n      allExpanded: this.expanded === true ? true : false,\n      /**\n       * @data {Array} currentExpanded\n       */\n      currentExpanded: Array.isArray(this.expanded) ? this.expanded : [],\n      /**\n       * @data {Array} currentExpandedValues\n       */\n      currentExpandedValues: Array.isArray(this.expandedValues) ? this.expandedValues : []\n    };\n  },\n  computed: {\n    /**\n     * Returns true if an expander is defined or if the table is groupable and the group is 'number'.\n     * @computed hasExpander\n     * @returns {Boolean}\n     */\n    hasExpander() {\n      return this.expander || this.groupable && typeof this.group === 'number' && this.cols[this.group];\n    },\n    /**\n     * Indicates whether the column for the expander should be shown\n     * @computed expanderColumnVisible\n     * @returns {Boolean}\n     */\n    expanderColumnVisible() {\n      if (this.items && this.items.length) {\n        return !!this.items.filter(i => !!i.expander).length;\n      }\n      return false;\n    }\n  },\n  methods: {\n    /**\n     * Returns if the given row is expanded.\n     * @method isExpanded\n     * @param {Object} d\n     * @returns {boolean}\n     */\n    isExpanded(d, index) {\n      if (!this.expander && (this.group === false || !this.groupable)) {\n        return true;\n      }\n      if (this.expander && !this.groupable) {\n        return this.currentExpanded.includes(index);\n      }\n      if (this.groupable && this.group !== false && this.cols[this.group] && this.cols[this.group].field) {\n        if (this.getProp(d, this.cols[this.group].field) !== undefined) {\n          return this.currentExpandedValues.includes(this.getProp(d, this.cols[this.group].field));\n        }\n        return true;\n      }\n      if ((d.isGrouped || d.groupAggregated) && this.currentExpanded.includes(d.link)) {\n        return true;\n      }\n      return false;\n    },\n    /**\n     * Toggles the expander of the row corresponding to the given idx.\n     * @method toggleExpanded\n     * @param {Number} idx\n     */\n    toggleExpanded(rowIdx) {\n      if (this.items[rowIdx]) {\n        const idx = this.items[rowIdx].index;\n        if (this.groupable && this.group !== false && this.cols[this.group] && this.cols[this.group].field && this.getProp(this.currentData[idx].data, this.cols[this.group].field) !== undefined) {\n          let groupValue = this.getProp(this.currentData[idx].data, this.cols[this.group].field);\n          let groupIndex = this.currentExpandedValues.indexOf(groupValue);\n          if (groupIndex > -1) {\n            this.currentExpandedValues.splice(groupIndex, 1);\n          } else {\n            this.currentExpandedValues.push(groupValue);\n          }\n        } else {\n          let i = this.currentExpanded.indexOf(idx);\n          if (i > -1) {\n            this.currentExpanded.splice(i, 1);\n          } else {\n            this.currentExpanded.push(idx);\n          }\n        }\n      }\n    },\n    /**\n     * Returns wheter or not the given row has the expander.\n     * @method rowHasExpander\n     * @param d\n     * @returns {Boolean}\n     */\n    rowHasExpander(d) {\n      if (this.hasExpander) {\n        if (!bbn.fn.isFunction(this.expander)) {\n          return true;\n        }\n        return !!this.expander(d);\n      }\n      return false;\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/table/_mixins/expand.js?");

/***/ })

}]);