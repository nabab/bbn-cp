/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/phone-phone-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/phone/phone.less":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/phone/phone.less ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-phone .bbn-phone-dropdown {\n  width: 6em;\n  text-align: center;\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.bbn-phone .bbn-phone-dropdown .bbn-input {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n.bbn-phone .bbn-phone-dropdown .bbn-input .bbn-button-right {\n  border-radius: 0;\n  border-right-width: var(--default-border-width) !important;\n}\n.bbn-phone .bbn-phone-input {\n  width: calc(100% - 6em - var(--xsspace));\n}\n.bbn-phone .bbn-phone-input > div {\n  height: 100%;\n}\n.bbn-phone.bbn-phone-prefix-readonly .bbn-phone-dropdown {\n  width: unset;\n}\n.bbn-phone.bbn-phone-prefix-readonly .bbn-phone-dropdown .bbn-button-right {\n  display: none;\n}\n.bbn-phone.bbn-phone-prefix-readonly .bbn-phone-dropdown input {\n  cursor: default;\n}\n.bbn-phone .bbn-phone-input {\n  width: 100%;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/phone/phone.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./src/components/phone/phone.html":
/*!*****************************************!*\
  !*** ./src/components/phone/phone.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[componentClass, 'bbn-iflex', 'bbn-textbox', {\n       'bbn-disabled': !!isDisabled,\n       'bbn-phone-prefix-readonly': prefixReadonly\n     }]\">\n  <bbn-dropdown :source=\"countryCodes\"\n                bbn-model=\"currentPrefix\"\n                :disabled=\"isDisabled\"\n                :readonly=\"readonly || prefixReadonly\"\n                :required=\"required\"\n                :placeholder=\"placeholder ? '+...' : ''\"\n                :native=\"native\"\n                source-value=\"prefix\"\n                selected-text=\"prefix\"\n                :clear-html=\"true\"\n                class=\"bbn-phone-dropdown bbn-no-border\"\n                tabindex=\"prefixReadonly ? -1 : 0\"\n                :autosize=\"prefixReadonly\"/>\n  <bbn-input tabindex=\"0\"\n             autocomplete=\"off\"\n             bbn-model=\"currentNumber\"\n             :name=\"name\"\n             ref=\"element\"\n             :disabled=\"isDisabled\"\n             :readonly=\"readonly\"\n             :required=\"required\"\n             :inputmode=\"inputmode\"\n             :placeholder=\"placeholder\"\n             class=\"bbn-phone-input bbn-no-border\"\n             :pattern=\"currentPattern\"\n             :maxlength=\"currentMaxlength\"\n             type=\"tel\"\n             :nullable=\"nullable\"/>\n  <input type=\"hidden\"\n          :value=\"value\">\n</div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/phone/phone.html?");

/***/ }),

/***/ "./src/components/phone/phone.less":
/*!*****************************************!*\
  !*** ./src/components/phone/phone.less ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_phone_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./phone.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/phone/phone.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_phone_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_phone_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_phone_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_phone_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/phone/phone.less?");

/***/ }),

/***/ "./src/components/phone/_i18n lazy recursive ^\\.\\/phone\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/phone/_i18n/ lazy ^\.\/phone\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/phone/_i18n lazy recursive ^\\\\.\\\\/phone\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/phone/_i18n/_lazy_^\\.\\/phone\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/phone/phone.js":
/*!***************************************!*\
  !*** ./src/components/phone/phone.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _codes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_codes.js */ \"./src/components/phone/_codes.js\");\n/* harmony import */ var _node_modules_flag_icons_css_flag_icons_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/flag-icons/css/flag-icons.min.css */ \"./node_modules/flag-icons/css/flag-icons.min.css\");\n/* harmony import */ var _phone_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./phone.html */ \"./src/components/phone/phone.html\");\n/* harmony import */ var _phone_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./phone.less */ \"./src/components/phone/phone.less\");\n/**\n * @file bbn-phone component\n * @description bbn-phone allows to enter a phone number and its international prefix.\n * @copyright BBN Solutions\n * @author BBN Solutions\n * @created 25/09/2024\n */\n\n\n\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   * @mixin bbn.cp.mixins.events\n   * @mixin bbn.cp.mixins.input\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.events, bbn.cp.mixins.input],\n  props: {\n    /**\n     * The default country code.\n     * @prop {String} ['FR'] defaultCode\n     */\n    defaultCode: {\n      type: String,\n      default: 'FR'\n    },\n    /**\n     * Using the browser native render\n     * @prop {Boolean} [false] native\n     */\n    native: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Show the icons on the left of the input\n     * @prop {Boolean} [true] icons\n     */\n    icons: {\n      type: Boolean,\n      default: true\n    },\n    prefixReadonly: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {\n      countryCodes: bbn.fn.map(_codes_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], c => {\n        c.text = `${c.name} (${c.prefix})`;\n        if (this.icons) {\n          c.icon = `fi fi-${c.code.toLowerCase()}`;\n          //c.text = `<i class=\"${icon}\"></i><span>${c.text}</span>`;\n        }\n        return c;\n      }),\n      currentPrefix: this.getPrefixFromValue(),\n      currentNumber: this.getNumberFromValue()\n    };\n  },\n  computed: {\n    currentValue() {\n      if (!this.currentNumber.length) {\n        return '';\n      }\n      return this.currentPrefix + this.currentNumber;\n    },\n    currentCountry() {\n      return bbn.fn.getField(this.countryCodes, 'code', 'prefix', this.currentPrefix);\n    },\n    currentMaxlength() {\n      return this.currentCountry === 'FR' ? 9 : this.maxlength > -1 ? this.maxlength : 0;\n    },\n    currentPattern() {\n      let m = this.currentMaxlength || '';\n      if (m && this.currentCountry !== 'FR') {\n        m = '4,' + m;\n      }\n      return `[0-9]${m ? '{' + m + '}' : ''}`;\n    }\n  },\n  methods: {\n    getPrefixFromValue() {\n      if (this.value?.length) {\n        let p = '';\n        bbn.fn.each(_codes_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], c => {\n          if (this.value.startsWith(c.prefix) && c.prefix.length > p.length) {\n            p = c.prefix;\n          }\n        });\n        if (p.length) {\n          return p;\n        }\n      }\n      return this.defaultCode ? bbn.fn.getField(_codes_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], 'prefix', 'code', this.defaultCode) : '';\n    },\n    getNumberFromValue() {\n      if (this.value) {\n        const prefix = this.getPrefixFromValue();\n        return this.value.replace(prefix, '');\n      }\n      return '';\n    }\n  },\n  watch: {\n    /**\n     * @watch value\n     * @fires getPrefix\n     * @fires getNumberFromValue\n     */\n    value(newVal) {\n      const prefix = this.getPrefixFromValue();\n      if (this.currentPrefix !== prefix) {\n        this.currentPrefix = prefix;\n      }\n      const number = this.getNumberFromValue();\n      if (this.currentNumber !== number) {\n        this.currentNumber = number;\n      }\n    },\n    currentValue(newVal) {\n      this.emitInput(!newVal.length && this.nullable ? this.nullValue : newVal);\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/phone/_i18n lazy recursive ^\\\\.\\\\/phone\\\\..*\\\\.lang$\")(`./phone.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-phone',\n  definition: cpDef,\n  template: _phone_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  style: _phone_less__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/phone/phone.js?");

/***/ })

}]);