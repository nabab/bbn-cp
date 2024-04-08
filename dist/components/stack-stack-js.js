/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/stack-stack-js"],{

/***/ "./src/components/stack/stack.html":
/*!*****************************************!*\
  !*** ./src/components/stack/stack.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[{'bbn-overlay':true}, componentClass]\\\" bbn-if=\\\"currentData.length\\\">\\n\\t<!--bbn-toolbar></bbn-toolbar-->\\n\\t<div class=\\\"bbn-block\\\" bbn-for=\\\"(c, i) in current\\\" @click=\\\"setCurrent(c)\\\" :key=\\\"i\\\">\\n\\t\\t<i class=\\\"bbn-xl nf nf-custom-folder\\\"></i>\\n\\t\\t<div bbn-text=\\\"c.text\\\"></div>\\n\\t</div>\\n</div>\\n\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/stack/stack.html?");

/***/ }),

/***/ "./src/components/stack/_i18n lazy recursive ^\\.\\/stack\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/stack/_i18n/ lazy ^\.\/stack\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/stack/_i18n lazy recursive ^\\\\.\\\\/stack\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/stack/_i18n/_lazy_^\\.\\/stack\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/stack/stack.js":
/*!***************************************!*\
  !*** ./src/components/stack/stack.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _stack_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stack.html */ \"./src/components/stack/stack.html\");\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.list\n   */\n  mixins: [bbn.cp.mixins.list, bbn.cp.mixins.basic],\n  props: {\n    /**\n     * @prop {Array} source\n     */\n    source: {\n      type: Array\n    }\n  },\n  data() {\n    return {\n      current: []\n    };\n  },\n  created() {\n    bbn.fn.log('mounted', this.source);\n    this.current = this.source;\n    //this.currentData = this.source;\n  },\n  methods: {\n    setCurrent(a) {\n      this.current = a;\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/stack/_i18n lazy recursive ^\\\\.\\\\/stack\\\\..*\\\\.lang$\")(`./stack.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-stack',\n  definition: cpDef,\n  template: _stack_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/stack/stack.js?");

/***/ })

}]);