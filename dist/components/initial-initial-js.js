/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/initial-initial-js"],{

/***/ "./src/components/initial/initial.html":
/*!*********************************************!*\
  !*** ./src/components/initial/initial.html ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<span :class=\\\"['bbn-iblock', 'bbn-unselectable', componentClass]\\\"\\n      :title=\\\"currentName\\\"\\n      :style=\\\"currentStyle\\\">\\n  <div class=\\\"bbn-100 bbn-middle\\\">\\n    <div class=\\\"bbn-block\\\"\\n         :style=\\\"fontStyle\\\"\\n         bbn-text=\\\"currentLetters\\\"/>\\n  </div>\\n</span>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/initial/initial.html?");

/***/ }),

/***/ "./src/components/initial/_i18n lazy recursive ^\\.\\/initial\\..*\\.lang$":
/*!********************************************************************************************!*\
  !*** ./src/components/initial/_i18n/ lazy ^\.\/initial\..*\.lang$ strict namespace object ***!
  \********************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/initial/_i18n lazy recursive ^\\\\.\\\\/initial\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/initial/_i18n/_lazy_^\\.\\/initial\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/initial/initial.js":
/*!*******************************************!*\
  !*** ./src/components/initial/initial.js ***!
  \*******************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _initial_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial.html */ \"./src/components/initial/initial.html\");\n/**\r\n * Based on https://github.com/judesfernando/initial.js\r\n */\n\n/**\r\n * @file bbn-initial component\r\n *\r\n * @description bbn-initial is a component that represents the initials of a name as an avatar for a profile.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author BBN Solutions\r\n *\r\n * @created 28/03/2017\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   */\n  mixins: [bbn.cp.mixins.basic],\n  props: {\n    /**\r\n     * The user id whose initials will be represented.\r\n     * @prop {(String|Number)} userId\r\n     */\n    userId: {\n      type: [String, Number]\n    },\n    /**\r\n     * The username whose initials will be represented.\r\n     * @prop {String} userName\r\n     */\n    userName: {\n      type: String\n    },\n    /**\r\n     * The width of the rectangle containing the initials.\r\n     * @prop {(String|Number)} width\r\n     */\n    width: {\n      type: [String, Number]\n    },\n    /**\r\n     * The height of the rectangle containing the initials.\r\n     * @prop {(String|Number)} height\r\n     */\n    height: {\n      type: [String, Number]\n    },\n    /**\r\n     * The dimensions given to the component as width and height.\r\n     * @prop {Number} [36] defaultSize\r\n     */\n    defaultSize: {\n      type: Number,\n      default: 36\n    },\n    /**\r\n     * The number of characters shown if the property 'letter' is not specified.\r\n     * @prop {Number} [2] charCount\r\n     */\n    charCount: {\n      type: Number,\n      default: 2\n    },\n    /**\r\n     * The color of the text.\r\n     * @prop {String} ['#FFF'] textColor\r\n     */\n    textColor: {\n      type: [String],\n      default: '#FFF'\n    },\n    /**\r\n     * The text's font family.\r\n     * @prop {String} fontFamily\r\n     */\n    fontFamily: {\n      type: String\n    },\n    /**\r\n     * The rectangle's background color.\r\n     * @prop {String} color\r\n     */\n    color: {\n      type: String\n    },\n    /**\r\n     * The font-size of the initials.\r\n     * @prop {(Number|String)} fontSize\r\n     */\n    fontSize: {\n      type: [Number, String]\n    },\n    /**\r\n     * The font-weight of the initials.\r\n     * @prop {(String|Number)} [400] fontWeight\r\n     */\n    fontWeight: {\n      type: [Number, String],\n      default: 400\n    },\n    /**\r\n     * The letters shown in the component if neither the userName or the userId are given.\r\n     * @prop {String} letters\r\n     */\n    letters: {\n      type: String\n    },\n    /**\r\n     * The border-radius of the main container.\r\n     * @prop {(Number|String)} [3] radius\r\n     */\n    radius: {\n      type: [Number, String],\n      default: 3\n    },\n    /**\r\n     * The array of users.\r\n     * @prop {Array} source\r\n     */\n    source: {\n      type: Array,\n      default() {\n        return window.appui?.app?.users || [];\n      }\n    },\n    /**\r\n     * The name of the property containing the user's name in the array source.\r\n     * @prop {String} nameField\r\n     */\n    nameField: {\n      type: String,\n      default() {\n        return window.appui?.app?.users ? 'text' : 'name';\n      }\n    },\n    /**\r\n     * The name of the property containing the user's id in the array source.\r\n     * @prop {String} idField\r\n     */\n    idField: {\n      type: String,\n      default() {\n        return window.appui?.app?.users ? 'value' : 'id';\n      }\n    },\n    /**\r\n     * The background colors palette\r\n     * @prop {Array} [['#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#9b59b6', '#8e44ad', '#bdc3c7', '#34495e', '#2c3e50', '#95a5a6', '#7f8c8d', '#ec87bf', '#d870ad', '#f69785', '#9ba37e', '#b49255', '#b49255', '#a94136']] colors\r\n     */\n    colors: {\n      type: Array,\n      default() {\n        return ['#1abc9c', '#16a085', '#f1c40f', '#f39c12', '#2ecc71', '#27ae60', '#e67e22', '#d35400', '#3498db', '#2980b9', '#e74c3c', '#c0392b', '#9b59b6', '#8e44ad', '#bdc3c7', '#34495e', '#2c3e50', '#95a5a6', '#7f8c8d', '#ec87bf', '#d870ad', '#f69785', '#9ba37e', '#b49255', '#b49255', '#a94136'];\n      }\n    }\n  },\n  computed: {\n    currentStyle() {\n      const res = {\n        width: this.currentWidth,\n        height: this.currentHeight,\n        borderRadius: this.currentRadius\n      };\n      if (this.currentColor) {\n        res.backgroundColor = this.currentColor;\n      }\n      return res;\n    },\n    /**\r\n     * Defines the style of the text based on the properties 'textColor', 'fontWeight', 'fontSize' and 'fontFamily'.\r\n     * @computed fontStyle\r\n     * @return {Object}\r\n     */\n    fontStyle() {\n      let o = {\n        color: this.textColor,\n        'font-weight': this.fontWeight,\n        'font-size': this.currentFontSize\n      };\n      if (this.fontFamily) {\n        o['font-family'] = this.fontFamily;\n      }\n      return o;\n    },\n    /**\r\n     * The current name\r\n     * @computed currentName\r\n     * @return {String}\r\n     */\n    currentName() {\n      let name = this.userName;\n      if (!name && this.userId && this.source) {\n        name = bbn.fn.getField(this.source, this.nameField, this.idField, this.userId);\n      }\n      return name;\n    },\n    /**\r\n     * The letters that will be shown in the component.\r\n     * @computed currentLetters\r\n     * @return {String}\r\n     */\n    currentLetters() {\n      let currentLetters = '';\n      if (this.letters) {\n        currentLetters = this.letters;\n      }\n      if (!this.letters && this.currentName) {\n        let tmp = bbn.fn.removeEmpty(this.currentName.split(' '));\n        while (tmp.length > this.charCount && tmp[0].length <= 3) {\n          tmp.shift();\n        }\n        for (let i = 0; i < tmp.length; i++) {\n          if (!this.charCount || currentLetters.length <= this.charCount) {\n            currentLetters += bbn.fn.substr(tmp[i], 0, 1);\n          }\n        }\n      }\n      return this.charCount && !this.letters ? bbn.fn.substr(currentLetters, 0, this.charCount) : currentLetters;\n    },\n    /**\r\n     * The color of the text.\r\n     * @computed currentColor\r\n     * @return {String}\r\n     */\n    currentColor() {\n      let name = this.userName,\n        col = this.color;\n      if (!col) {\n        let sum = 0;\n        this.currentLetters.split('').forEach(a => {\n          sum += a.charCodeAt();\n        });\n        sum += name ? bbn.fn.substr(this.userName, -1).charCodeAt() : bbn.fn.substr(this.currentLetters, 0, 1).charCodeAt();\n        let colorIndex = Math.floor(sum % this.colors.length);\n        col = this.colors[colorIndex];\n      }\n      return col ? col : null;\n    },\n    /**\r\n     * The font-size.\r\n     * @computed currentFontSize\r\n     * @return string\r\n     */\n    currentFontSize() {\n      let currentFontSize = this.fontSize;\n      if (!this.fontSize) {\n        let baseSize = parseInt(this.height) / this.charCount;\n        currentFontSize = Math.round(baseSize + bbn.fn.percent(15 * this.charCount, baseSize));\n      }\n      return bbn.fn.isNumber(currentFontSize) ? currentFontSize + 'px' : currentFontSize;\n    },\n    /**\r\n     * The final width of the component.\r\n     * @computed currentWidth\r\n     * @return {String}\r\n     */\n    currentWidth() {\n      let w = this.width || this.height || this.defaultSize;\n      return bbn.fn.isNumber(w) ? w + 'px' : w;\n    },\n    /**\r\n     * The final height of the component.\r\n     * @computed currentHeight\r\n     * @return {String}\r\n     */\n    currentHeight() {\n      let h = this.height || this.width || this.defaultSize;\n      return bbn.fn.isNumber(h) ? h + 'px' : h;\n    },\n    /**\r\n     * The final border-radius that will be applied to the component.\r\n     * @computed currentRadius\r\n     * @return {String}\r\n     */\n    currentRadius() {\n      return bbn.fn.isNumber(this.radius) ? this.radius + 'px' : this.radius;\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/initial/_i18n lazy recursive ^\\\\.\\\\/initial\\\\..*\\\\.lang$\")(`./initial.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-initial',\n  definition: cpDef,\n  template: _initial_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/initial/initial.js?");

/***/ })

}]);