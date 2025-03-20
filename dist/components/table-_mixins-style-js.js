"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-style-js"],{

/***/ "./src/components/table/_mixins/style.js":
/*!***********************************************!*\
  !*** ./src/components/table/_mixins/style.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Set to true shows a button at the bottom right of the table that opens a column picker for the table.\n     * @prop {Boolean} [false] showable\n     */\n    showable: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * A function to define css class(es) for each row.\n     * @prop {Function} trClass\n     */\n    trClass: {\n      type: [String, Function, Object]\n    },\n    /**\n     * A function to define css style(s) for each row.\n     * @prop {Function} trStyle\n     */\n    trStyle: {\n      type: [String, Function, Object]\n    },\n    titleClass: {\n      type: [String, Function, Object, Array]\n    }\n  },\n  data() {\n    return {\n      /**\n       * @data {Array} currentHidden\n       */\n      currentHidden: this.invisible || [],\n      /**\n       * @data {String} [bbn.fn.randomString().toLowerCase()] cssRuleName\n       */\n      cssRuleName: bbn.fn.randomString().toLowerCase(),\n      /**\n       * @data {String} containerPadding\n       */\n      containerPadding: (bbn.fn.getScrollBarSize() ? bbn.fn.getScrollBarSize() : '0') + 'px',\n      /**\n       * The current scroll top position.\n       * @data {Number} [0] currentScrollTop\n       */\n      currentScrollTop: 0,\n      /**\n       * @data {Number} [0] borderLeft\n       */\n      borderLeft: 0,\n      /**\n       * @data {Number} [0] borderRight\n       */\n      borderRight: 0,\n      tableStyle: ''\n    };\n  },\n  computed: {\n    /**\n     * Return the number of visible columns of the table.\n     * @computed numVisible\n     * @returns {number}\n     */\n    numVisible() {\n      return this.cols.length - bbn.fn.count(this.cols, {\n        invisible: true\n      }) + (this.hasExpander ? 1 : 0) + (this.selection ? 1 : 0);\n    }\n  },\n  methods: {\n    updateStyle() {\n      let style = `\n.bbn-table table.bbn-table-${this.cssRuleName} {\n  width: ${this.totalWidth};\n}\n.bbn-table table.bbn-table-${this.cssRuleName} > tbody > tr {\n  maxHeight: ${this.currentMaxRowHeight};\n}\n      `;\n      const headRowIndex = this.titleGroups ? 2 : 1;\n      bbn.fn.each(this.currentColumns, (a, i) => {\n        style += `\n.bbn-table table.bbn-table-${this.cssRuleName} > thead > tr:nth-of-type(${headRowIndex}) > th:nth-of-type(${i + 1}):not([colspan]),\n.bbn-table table.bbn-table-${this.cssRuleName} > tbody > tr > td:nth-of-type(${i + 1}):not([colspan]) {\n  width: ${a.realWidth};`;\n        if (bbn.fn.isNumber(a.left)) {\n          style += `\n  left: ${a.left}px;\n  position: sticky`;\n        } else if (bbn.fn.isNumber(a.right)) {\n          style += `\n  right: ${a.right}px;\n  position: sticky`;\n        }\n        style += `\n}`;\n      });\n      if (style !== this.tableStyle) {\n        this.tableStyle = style;\n        let css = document.getElementById('bbn-table-' + this.cssRuleName);\n        if (!css) {\n          css = document.createElement('style');\n          css.id = 'bbn-table-' + this.cssRuleName;\n          document.head.appendChild(css);\n        }\n        css.textContent = style;\n      }\n    }\n  },\n  watch: {\n    /**\n     * Forces the update of the component.\n     * @watch currentHidden\n     * @fires setConfig\n     */\n    currentHidden: {\n      deep: true,\n      handler() {\n        bbn.fn.log(\"WATCH HIDDDEN\");\n        if (this.ready) {\n          this.setConfig(true);\n          this.$forceUpdate();\n          //bbn.fn.log('forceupdate2');\n        }\n      }\n    }\n  },\n  beforeDestroy() {\n    const css = document.getElementById('bbn-table-' + this.cssRuleName);\n    if (css) {\n      document.head.removeChild(css);\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/table/_mixins/style.js?");

/***/ })

}]);