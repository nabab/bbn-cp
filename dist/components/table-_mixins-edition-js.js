"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-edition-js"],{

/***/ "./src/components/table/_mixins/edition.js":
/*!*************************************************!*\
  !*** ./src/components/table/_mixins/edition.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  data() {\n    return {\n      editedIndex: false\n    };\n  },\n  methods: {\n    /**\n     * Returns true if a column is editable.\n     * @method isEditable\n     * @param {Object} row\n     * @param {Object} col\n     * @param {Number} index\n     * @returns {Boolean}\n     */\n    isEditable(row, col, index) {\n      if (!this.editable) {\n        return false;\n      }\n      if (bbn.fn.isFunction(col.editable)) {\n        return col.editable(row, col, index);\n      }\n      return col.editable !== false;\n    },\n    /**\n     * Returns true if the given row is edited.\n     * @method isEdited\n     * @param {Object} data\n     * @param {Object} col\n     * @param {Number} idx\n     * @fires isEditable\n     * @returns {Boolean}\n     */\n    isEdited(data, col, idx) {\n      return this.isEditable(data, col, idx) && this.editMode === 'inline' && this.filteredData[idx].index === this.editedIndex;\n    },\n    /**\n     * Returns an object of the default values for the different types of fields.\n     * @method defaultObject\n     * @returns {Object}\n     */\n    defaultObject() {\n      let o = {};\n      bbn.fn.iterate(bbn.cp.mixins.field.props, (v, n) => {\n        if (v.default !== undefined) {\n          o[n] = bbn.fn.isFunction(v.default) ? v.default() : v.default;\n        }\n      });\n      return o;\n    },\n    /**\n     * Normalizes the row's data.\n     * @method _defaultRow\n     * @param initialData\n     * @returns {Object}\n     */\n    _defaultRow(initialData) {\n      let res = {},\n        data = initialData ? bbn.fn.clone(initialData) : {};\n      bbn.fn.each(this.cols, function (a) {\n        if (a.field) {\n          if (data[a.field] !== undefined) {\n            res[a.field] = data[a.field];\n          } else if (a.default !== undefined) {\n            res[a.field] = bbn.fn.isFunction(a.default) ? a.default() : a.default;\n          } else if (a.nullable) {\n            res[a.field] = null;\n          } else if (a.type) {\n            switch (a.type) {\n              case 'number':\n              case 'money':\n                res[a.field] = a.min > 0 ? a.min : 0;\n                break;\n              default:\n                res[a.field] = '';\n            }\n          } else {\n            res[a.field] = '';\n          }\n          if (bbn.fn.isArray(res[a.field])) {\n            res[a.field] = res[a.field].slice();\n          } else if (res[a.field] instanceof Date) {\n            res[a.field] = new Date(res[a.field].getTime());\n          } else if (null !== res[a.field] && typeof res[a.field] === 'object') {\n            res[a.field] = bbn.fn.clone(res[a.field]);\n          }\n        }\n      });\n      return res;\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/table/_mixins/edition.js?");

/***/ })

}]);