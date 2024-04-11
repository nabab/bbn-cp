/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/terminal-terminal-js"],{

/***/ "./src/components/terminal/terminal.html":
/*!***********************************************!*\
  !*** ./src/components/terminal/terminal.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[componentClass, 'bbn-overlay']\\\"></div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/terminal/terminal.html?");

/***/ }),

/***/ "./src/components/terminal/_i18n lazy recursive ^\\.\\/terminal\\..*\\.lang$":
/*!**********************************************************************************************!*\
  !*** ./src/components/terminal/_i18n/ lazy ^\.\/terminal\..*\.lang$ strict namespace object ***!
  \**********************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/terminal/_i18n lazy recursive ^\\\\.\\\\/terminal\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/terminal/_i18n/_lazy_^\\.\\/terminal\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/terminal/terminal.js":
/*!*********************************************!*\
  !*** ./src/components/terminal/terminal.js ***!
  \*********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _terminal_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terminal.html */ \"./src/components/terminal/terminal.html\");\n/**\n * @file bbn-textarea component\n *\n * @description bbn-textarea is an easy to configure component, it represents a multiline text field, in which it is possible to assign an initial value among the various configurations, validate the content and provide a maximum number of characters that can be inserted.\n * You can define actions on the events activated on it.\n *\n * @copyright BBN Solutions\n * \n * @author BBN Solutions\n */\nconst cpDef = {\n  mixins: [bbn.cp.mixins.basic],\n  props: {},\n  data() {\n    return {\n      widget: false,\n      fitter: false,\n      searcher: false\n    };\n  },\n  methods: {\n    clear() {},\n    write(st) {\n      this.widget.write(st);\n    },\n    resize() {\n      //this.fitter.fit(300, 300);\n    }\n  },\n  mounted() {\n    this.ready = true;\n    this.widget = new Terminal();\n    this.fitter = new FitAddon.FitAddon();\n    this.widget.loadAddon(this.fitter);\n    //this.widget.loadAddon(new WebLinksAddon.WebLinksAddon());\n    //this.searcher = new SearchAddon.SearchAddon();\n    //this.widget.loadAddon(this.searcher);\n    this.widget.open(this.$el);\n    this.fitter.fit();\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/terminal/_i18n lazy recursive ^\\\\.\\\\/terminal\\\\..*\\\\.lang$\")(`./terminal.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-terminal',\n  definition: cpDef,\n  template: _terminal_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/terminal/terminal.js?");

/***/ })

}]);