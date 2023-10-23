/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/loadicon-loadicon-js"],{

/***/ "./src/components/loadicon/loadicon.html":
/*!***********************************************!*\
  !*** ./src/components/loadicon/loadicon.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<span :class=\\\"componentClass\\\">\\n  <svg xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n       version=\\\"1.0\\\"\\n       :width=\\\"currentSize\\\"\\n       :height=\\\"currentSize\\\"\\n       viewBox=\\\"0 0 128 128\\\"\\n       xml:space=\\\"preserve\\\">\\n    <g>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"1\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.2\\\" transform=\\\"rotate(30 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.2\\\" transform=\\\"rotate(60 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.2\\\" transform=\\\"rotate(90 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.2\\\" transform=\\\"rotate(120 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.3\\\" transform=\\\"rotate(150 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.4\\\" transform=\\\"rotate(180 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.5\\\" transform=\\\"rotate(210 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.6\\\" transform=\\\"rotate(240 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.7\\\" transform=\\\"rotate(270 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.8\\\" transform=\\\"rotate(300 64 64)\\\"/>\\n      <path d=\\\"M59.6 0h8v40h-8V0z\\\" fill=\\\"inherit\\\" fill-opacity=\\\"0.9\\\" transform=\\\"rotate(330 64 64)\\\"/>\\n      <animateTransform attributeName=\\\"transform\\\" type=\\\"rotate\\\" values=\\\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\\\" calcMode=\\\"discrete\\\" dur=\\\"1080ms\\\" repeatCount=\\\"indefinite\\\"></animateTransform>\\n    </g>\\n  </svg>\\n</span>\\n\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadicon/loadicon.html?");

/***/ }),

/***/ "./src/components/loadicon lazy recursive ^\\.\\/loadicon\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/loadicon/ lazy ^\.\/loadicon\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/loadicon lazy recursive ^\\\\.\\\\/loadicon\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadicon/_lazy_^\\.\\/loadicon\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/loadicon/loadicon.js":
/*!*********************************************!*\
  !*** ./src/components/loadicon/loadicon.js ***!
  \*********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _loadicon_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadicon.html */ \"./src/components/loadicon/loadicon.html\");\n/**\r\n * @file bbn-loadicon component\r\n *\r\n * @description bbn-loadicon is a simple implementation component, which represents an icon displaying a waiting state.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author  BBN Solutions\r\n * \r\n * @created 07/01/2017\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic \r\n   */\n  mixins: [bbn.cp.mixins.basic],\n  props: {\n    /**\r\n     * The size of the icon container\r\n     * @prop {Number|String} [16] size\r\n     */\n    size: {\n      type: [Number, String],\n      default: 16\n    }\n  },\n  data() {\n    return {\n      currentSize: bbn.fn.formatSize(this.size)\n    };\n  },\n  watch: {\n    size(v) {\n      this.currentSize = bbn.fn.formatSize(v);\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/loadicon lazy recursive ^\\\\.\\\\/loadicon\\\\..*\\\\.lang$\")(`./loadicon.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-loadicon',\n  definition: cpDef,\n  template: _loadicon_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadicon/loadicon.js?");

/***/ })

}]);