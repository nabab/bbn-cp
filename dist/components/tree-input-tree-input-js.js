/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/tree-input-tree-input-js"],{

/***/ "./src/components/tree-input/_i18n lazy recursive ^\\.\\/tree\\-input\\..*\\.lang$":
/*!***************************************************************************************************!*\
  !*** ./src/components/tree-input/_i18n/ lazy ^\.\/tree\-input\..*\.lang$ strict namespace object ***!
  \***************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./tree-input.fr.lang\": [\n\t\t\"./src/components/tree-input/_i18n/tree-input.fr.lang\",\n\t\t\"src_components_tree-input__i18n_tree-input_fr_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/tree-input/_i18n lazy recursive ^\\\\.\\\\/tree\\\\-input\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/tree-input/_i18n/_lazy_^\\.\\/tree\\-input\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/tree-input/tree-input.html":
/*!***************************************************!*\
  !*** ./src/components/tree-input/tree-input.html ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[{'bbn-iblock':true}, componentClass]\"\r\n     tabindex=\"-1\">\r\n  <input :value=\"ivalue\"\r\n         ref=\"element\"\r\n         class=\"bbn-textbox\"\r\n         :disabled=\"isDisabled\"\r\n         :required=\"required\"\r\n         readonly=\"readonly\">\r\n  <input type=\"hidden\"\r\n         :value=\"value\"\r\n         :name=\"name\"\r\n         ref=\"hinput\"> &nbsp;\r\n  <bbn-button ref=\"button\"\r\n              @click=\"build()\"\r\n              :tabindex=\"currentTabIndex\"\r\n              class=\"bbn-no-vborder\"\r\n              icon=\"nf nf-fa-search\"/>\r\n</div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/tree-input/tree-input.html?");

/***/ }),

/***/ "./src/components/tree-input/tree-input.js":
/*!*************************************************!*\
  !*** ./src/components/tree-input/tree-input.js ***!
  \*************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _tree_input_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree-input.html */ \"./src/components/tree-input/tree-input.html\");\n/**\r\n * @file bbn-tree-oinput component\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author BBN Solutions\r\n * \r\n * @created 15/02/2017\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.input\r\n   * @mixin bbn.cp.mixins.events\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.input, bbn.cp.mixins.events],\n  props: {\n    /**\r\n     * @prop {Array} extensions\r\n     */\n    extensions: {\n      type: Array\n      // default: [\"dnd\"]\n    },\n    /**\r\n     * @prop {Number} autoExpandMS\r\n     */\n    autoExpandMS: {\n      type: Number\n    },\n    /**\r\n     * @prop {(String|Array|Object)} source\r\n     */\n    source: {\n      type: [String, Array, Object]\n    },\n    /**\r\n     * @prop {Object} [extensions: ['dnd'], autoExpandedMS: 400, source: [], disabled: false] cfg\r\n     */\n    cfg: {\n      type: Object,\n      default() {\n        return {\n          extensions: [\"dnd\"],\n          auoExpandedMS: 400,\n          source: [],\n          disabled: false\n        };\n      }\n    }\n  },\n  data() {\n    return {\n      widgetName: \"fancytree\",\n      ivalue: this.currentSelection ? this.currentSelection : ''\n    };\n  },\n  methods: {},\n  mounted() {\n    this.ready = true;\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/tree-input/_i18n lazy recursive ^\\\\.\\\\/tree\\\\-input\\\\..*\\\\.lang$\")(`./tree-input.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-tree-input',\n  definition: cpDef,\n  template: _tree_input_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/tree-input/tree-input.js?");

/***/ })

}]);