/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/radio-radio-js"],{

/***/ "./src/components/radio/radio.html":
/*!*****************************************!*\
  !*** ./src/components/radio/radio.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"['bbn-iblock', componentClass]\\\">\\r\\n  <input class=\\\"bbn-hidden\\\"\\r\\n         ref=\\\"element\\\"\\r\\n         :value=\\\"modelValue\\\"\\r\\n         :disabled=\\\"isDisabled\\\"\\r\\n         :required=\\\"required\\\">\\r\\n  <div :style=\\\"getStyle()\\\">\\r\\n    <div v-for=\\\"(d, idx) in source\\\"\\r\\n         :class=\\\"{\\r\\n            'bbn-iblock': !vertical,\\r\\n            'bbn-right-space': !vertical && !separator && source[idx+1],\\r\\n            'bbn-bottom-sspace': !!vertical && !separator && source[idx+1]\\r\\n         }\\\">\\r\\n      <input :value=\\\"d[sourceValue]\\\"\\r\\n             :name=\\\"name\\\"\\r\\n             class=\\\"bbn-radio\\\"\\r\\n             type=\\\"radio\\\"\\r\\n             :disabled=\\\"isDisabled || d.disabled\\\"\\r\\n             :required=\\\"required\\\"\\r\\n             :id=\\\"id + '_' + idx\\\"\\r\\n             @click=\\\"emitInput(d[sourceValue])\\\"\\r\\n             :checked=\\\"d[sourceValue] === modelValue ? 'checked' : false\\\"\\r\\n             style=\\\"display: none\\\">\\r\\n      <label class=\\\"bbn-radio-label bbn-iflex bbn-vmiddle\\\"\\r\\n             :for=\\\"id + '_' + idx\\\">\\r\\n        <component v-if=\\\"d.component\\\"\\r\\n                   :is=\\\"d.component\\\"\\r\\n                   v-bind=\\\"d.componentOptions\\\"\\r\\n                   class=\\\"bbn-left-sspace\\\"/>\\r\\n        <span v-else\\r\\n               class=\\\"bbn-left-sspace\\\"\\r\\n               v-html=\\\"render ? render(d) : d[sourceText]\\\"/>\\r\\n      </label>\\r\\n      <br v-if=\\\"!vertical && step && ((idx+1) % step === 0)\\\">\\r\\n      <div v-if=\\\"(source[idx+1] !== undefined) && !!separator\\\"\\r\\n           :class=\\\"{\\r\\n            'bbn-w-100': vertical,\\r\\n            'bbn-iblock': !vertical\\r\\n           }\\\"\\r\\n           v-html=\\\"separator\\\"/>\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/radio/radio.html?");

/***/ }),

/***/ "./src/components/radio lazy recursive ^\\.\\/radio\\..*\\.lang$":
/*!**********************************************************************************!*\
  !*** ./src/components/radio/ lazy ^\.\/radio\..*\.lang$ strict namespace object ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./radio.fr.lang\": [\n\t\t\"./src/components/radio/radio.fr.lang\",\n\t\t\"src_components_radio_radio_fr_lang\"\n\t],\n\t\"./radio.it.lang\": [\n\t\t\"./src/components/radio/radio.it.lang\",\n\t\t\"src_components_radio_radio_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/radio lazy recursive ^\\\\.\\\\/radio\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/radio/_lazy_^\\.\\/radio\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/radio/radio.js":
/*!***************************************!*\
  !*** ./src/components/radio/radio.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _radio_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./radio.html */ \"./src/components/radio/radio.html\");\n/**\r\n * @file bbn-radio component\r\n * @description bbn-radio is a component that can be used to select a particular choice from a range of options.\r\n * @copyright BBN Solutions\r\n * @author BBN Solutions\r\n * @created 13/02/2017\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.input\r\n   * @mixin bbn.cp.mixins.localStorage\r\n   * @mixin bbn.cp.mixins.events\r\n   *\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.input, bbn.cp.mixins.localStorage, bbn.cp.mixins.events],\n  props: {\n    /**\r\n     * The separator that can be inserted between the radio buttons.\r\n     * @prop {String} separator\r\n     */\n    separator: {\n      type: String\n    },\n    /**\r\n     * Set to true to arrange the radio buttons vertically.\r\n     * @prop {Boolean} [false] vertical\r\n     */\n    vertical: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * If the property vertical is set to false, defines the number of columns used to render the component.\r\n     * @prop {Number} step\r\n     */\n    step: {\n      type: Number\n    },\n    /**\r\n     * The id of the radio input.\r\n     * @prop {String} [bbn.fn.randomString(10, 25)]  id\r\n     */\n    id: {\n      type: String,\n      default() {\n        return bbn.fn.randomString(10, 25);\n      }\n    },\n    /**\r\n     * A function rendering each radio label.\r\n     * @prop {Function} render\r\n     */\n    render: {\n      type: Function\n    },\n    /**\r\n     * The name of the property in the item object used as a text.\r\n     * @prop {String} ['text'] sourceText\r\n     */\n    sourceText: {\n      type: String,\n      default: 'text'\n    },\n    /**\r\n     * The name of the property in the item object used as a value\r\n     * @prop {String} ['text'] sourceValue\r\n     */\n    sourceValue: {\n      type: String,\n      default: 'value'\n    },\n    /**\r\n     * The source of the component.\r\n     * @prop {Array} [[{text:'Yes', value:1},{text:'No', value:0}]] source\r\n     */\n    source: {\n      type: Array,\n      default() {\n        return [{\n          text: bbn._(\"Yes\"),\n          value: 1\n        }, {\n          text: bbn._(\"No\"),\n          value: 0\n        }];\n      }\n    },\n    /**\r\n     * The real value used in the input emit.\r\n     * @prop {String|Boolean|Number} [undefined] modelValue\r\n     */\n    modelValue: {\n      type: [String, Boolean, Number],\n      default: undefined\n    }\n  },\n  model: {\n    prop: 'modelValue',\n    event: 'input'\n  },\n  methods: {\n    /**\r\n     * @method changed\r\n     * @param val\r\n     * @param {Event} e\r\n     * @emits input\r\n     * @emits change\r\n     */\n    changed(val, d, e) {\n      bbn.fn.log(\"CHANGED\", val, d, e);\n      this.$emit('input', val);\n      this.$emit('change', val, d, e);\n    },\n    /**\r\n     * Returns the component's style based on the property 'step'.\r\n     * @method getStyle\r\n     */\n    getStyle() {\n      if (this.step && !this.vertical) {\n        return 'display: grid; grid-template-columns: ' + 'auto '.repeat(this.step) + ';';\n      } else {\n        return '';\n      }\n    }\n  },\n  beforeMount() {\n    if (this.hasStorage) {\n      let v = this.getStorage();\n      if (v && v !== this.modelValue) {\n        this.changed(v);\n      }\n    }\n  },\n  watch: {\n    /**\r\n     * @watch value\r\n     * @param {Mixed} v\r\n     */\n    modelValue(v) {\n      if (this.storage) {\n        if (v) {\n          this.setStorage(v);\n        } else {\n          this.unsetStorage();\n        }\n      }\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/radio lazy recursive ^\\\\.\\\\/radio\\\\..*\\\\.lang$\")(`./radio.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-radio',\n  definition: cpDef,\n  template: _radio_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/radio/radio.js?");

/***/ })

}]);