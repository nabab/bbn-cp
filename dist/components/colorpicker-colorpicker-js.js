/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/colorpicker-colorpicker-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/colorpicker/colorpicker.less":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/colorpicker/colorpicker.less ***!
  \**********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-colorpicker .bbn-colorpicker-input-hidden {\n  display: none;\n}\n.bbn-colorpicker .bbn-colorpicker-input {\n  padding: 0.15rem;\n  line-height: calc(var(--line-height) - 0.15rem);\n}\n.bbn-colorpicker .bbn-colorpicker-input .bbn-colorpicker-input-color {\n  width: 2rem;\n}\n.bbn-colorpicker .bbn-colorpicker-palette {\n  width: 2rem;\n  height: 2rem;\n}\n.bbn-colorpicker .bbn-colorpicker-details .bbn-colorpicker-preview {\n  height: 8rem;\n}\n.bbn-colorpicker .bbn-colorpicker-details .bbn-colorpicker-preview i {\n  font-size: 4rem;\n}\n.bbn-colorpicker .bbn-colorpicker-details .bbn-colorpicker-details-inputs {\n  grid-template-columns: minmax(auto, max-content) max-content auto;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/colorpicker/colorpicker.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./src/components/colorpicker/colorpicker.html":
/*!*****************************************************!*\
  !*** ./src/components/colorpicker/colorpicker.html ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<span :class=\"['bbn-iblock', componentClass, {'bbn-disabled': !!isDisabled}]\">\n  <input :value=\"value\"\n         class=\"bbn-colorpicker-input-hidden\"\n         :name=\"name\"\n         ref=\"element\"\n         :disabled=\"isDisabled\"\n         :readonly=\"readonly\"\n         :required=\"required\">\n  <div :class=\"['bbn-textbox', 'bbn-colorpicker-input', {'bbn-disabled': !!isDisabled}]\"\n       :tabindex=\"tabindex || '0'\"\n       ref=\"focuser\"\n       @click=\"click\"\n       @focus=\"focus\"\n       @blur=\"blur\"\n       @keydown=\"keydown\"\n       @keyup=\"keyup\">\n    <div :class=\"['bbn-flex-width', 'bbn-radius', {'bbn-p': !isDisabled && !readonly}]\"\n         @click=\"openCloseFloater\">\n      <div class=\"bbn-flex-fill bbn-right-xsspace bbn-radius bbn-colorpicker-input-color bbn-middle bbn-border\"\n           :style=\"{backgroundColor: value || ''}\">\n        <i bbn-if=\"!value\"\n           class=\"nf nf-fae-thin_close bbn-s bbn-red\"/>\n      </div>\n      <div class=\"bbn-colorpicker-icon\">\n        <i :class=\"{'nf nf-fa-caret_down': !readonly, 'nf nf-fa-lock': !!readonly}\"/>\n      </div>\n    </div>\n  </div>\n  <bbn-floater :scrollable=\"false\"\n               :element=\"\\$el\"\n               hpos=\"right\"\n               :auto-hide=\"200\"\n               bbn-if=\"!!showFloater && !isDisabled && !readonly\"\n               ref=\"floater\"\n               @close=\"showFloater = false\"\n               @hook:mounted=\"init\"\n               height=\"24rem\"\n               width=\"45rem\"\n               :min-width=\"450\"\n               :min-height=\"300\">\n    <bbn-splitter orientation=\"horizontal\">\n      <bbn-pane>\n        <div class=\"bbn-overlay bbn-middle\">\n          <div class=\"bbn-colorpicker-picker\"\n               ref=\"picker\"\n               @dblclick.prevent.stop=\"\"/>\n          <bbn-scroll bbn-if=\"showPalette || onlyPalette\"\n                      class=\"bbn-background\">\n            <div class=\"bbn-c bbn-vsmargin\">\n              <div bbn-for=\"p in palette\"\n                   class=\"bbn-iblock bbn-colorpicker-palette bbn-textbox bbn-smargin bbn-p\"\n                   tabindex=\"0\"\n                   @keydown.enter.space.stop.prevent=\"setColor(p)\"\n                   @keyup.escape=\"openCloseFloater\"\n                   :style=\"{backgroundColor: p}\"\n                   @click=\"setColor(p)\"/>\n            </div>\n          </bbn-scroll>\n        </div>\n      </bbn-pane>\n      <bbn-pane>\n        <div class=\"bbn-overlay bbn-middle\">\n          <div class=\"bbn-colorpicker-details\">\n            <div class=\"bbn-colorpicker-preview bbn-bottom-space bbn-box bbn-middle\"\n                 :style=\"{backgroundColor: currentValue}\">\n              <i bbn-if=\"!currentValue\"\n                 class=\"nf nf-fae-thin_close bbn-red\"/>\n            </div>\n            <div bbn-if=\"showCodes\"\n                 class=\"bbn-colorpicker-details-inputs bbn-grid bbn-bottom-space\">\n              <span class=\"bbn-vmiddle\">HEX</span>\n              <span class=\"bbn-vmiddle\">\n                <i class=\"nf nf-fa-long_arrow_right\"/>\n              </span>\n              <div>\n                <bbn-input :value=\"currentHex\"\n                           @change=\"fromInput\"\n                           @keydown.enter=\"save\"\n                           @keyup.escape=\"openCloseFloater\"/>\n              </div>\n              <span class=\"bbn-vmiddle\">RGB</span>\n              <span class=\"bbn-vmiddle\">\n                <i class=\"nf nf-fa-long_arrow_right\"/>\n              </span>\n              <div>\n                <bbn-input :value=\"currentRgb\"\n                           @keyup.escape=\"openCloseFloater\"\n                           @keydown.enter=\"save\"\n                           @change=\"fromInput\"/>\n              </div>\n              <span class=\"bbn-vmiddle\">RGBA</span>\n              <span class=\"bbn-vmiddle\">\n                <i class=\"nf nf-fa-long_arrow_right\"/>\n              </span>\n              <div>\n                <bbn-input :value=\"currentRgba\"\n                           @keyup.escape=\"openCloseFloater\"\n                           @keydown.enter=\"save\"\n                           @change=\"fromInput\"/>\n              </div>\n              <span class=\"bbn-vmiddle\">HSL</span>\n              <span class=\"bbn-vmiddle\">\n                <i class=\"nf nf-fa-long_arrow_right\"/>\n              </span>\n              <div>\n                <bbn-input :value=\"currentHsl\"\n                           @keyup.escape=\"openCloseFloater\"\n                           @keydown.enter=\"save\"\n                           @change=\"fromInput\"/>\n              </div>\n            </div>\n            <div class=\"bbn-flex-width\">\n              <div bbn-if=\"palette.length\">\n                <bbn-button :icon=\"!showPalette ? 'nf nf-fae-palette_color' : 'nf nf-fa-adjust'\"\n                            :notext=\"true\"\n                            :text=\"!showPalette ? _('Show palette') : _('Close palette')\"\n                            @keyup.escape=\"openCloseFloater\"\n                            @keydown.space=\"showPalette = !showPalette\"\n                            @click=\"showPalette = !showPalette\"\n                            bbn-if=\"!onlyPalette\"/>\n              </div>\n              <div class=\"bbn-flex-fill bbn-r\">\n                <bbn-button icon=\"nf nf-fa-close\"\n                            :notext=\"true\"\n                            :text=\"_('Close')\"\n                            @click=\"showFloater = false\"/>\n                <bbn-button icon=\"nf nf-oct-diff_ignored\"\n                            :notext=\"true\"\n                            :text=\"_('Empty')\"\n                            @click=\"empty\"\n                            bbn-if=\"emptyButton\"/>\n                <bbn-button icon=\"nf nf-fa-check\"\n                            :text=\"_('Confirm')\"\n                            @click=\"save\"/>\n              </div>\n            </div>\n          </div>\n        </div>\n      </bbn-pane>\n    </bbn-splitter>\n  </bbn-floater>\n</span>\n`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/colorpicker/colorpicker.html?");

/***/ }),

/***/ "./src/components/colorpicker/colorpicker.less":
/*!*****************************************************!*\
  !*** ./src/components/colorpicker/colorpicker.less ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_colorpicker_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./colorpicker.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/colorpicker/colorpicker.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_colorpicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_colorpicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_colorpicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_colorpicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/colorpicker/colorpicker.less?");

/***/ }),

/***/ "./src/components/colorpicker/_i18n lazy recursive ^\\.\\/colorpicker\\..*\\.lang$":
/*!****************************************************************************************************!*\
  !*** ./src/components/colorpicker/_i18n/ lazy ^\.\/colorpicker\..*\.lang$ strict namespace object ***!
  \****************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./colorpicker.fr.lang\": [\n\t\t\"./src/components/colorpicker/_i18n/colorpicker.fr.lang\",\n\t\t\"src_components_colorpicker__i18n_colorpicker_fr_lang\"\n\t],\n\t\"./colorpicker.it.lang\": [\n\t\t\"./src/components/colorpicker/_i18n/colorpicker.it.lang\",\n\t\t\"src_components_colorpicker__i18n_colorpicker_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/colorpicker/_i18n lazy recursive ^\\\\.\\\\/colorpicker\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/colorpicker/_i18n/_lazy_^\\.\\/colorpicker\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/colorpicker/colorpicker.js":
/*!***************************************************!*\
  !*** ./src/components/colorpicker/colorpicker.js ***!
  \***************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ def),\n/* harmony export */   iro: () => (/* reexport safe */ _jaames_iro__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _jaames_iro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jaames/iro */ \"./node_modules/@jaames/iro/dist/iro.es.js\");\n/* harmony import */ var _colorpicker_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorpicker.html */ \"./src/components/colorpicker/colorpicker.html\");\n/* harmony import */ var _colorpicker_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./colorpicker.less */ \"./src/components/colorpicker/colorpicker.less\");\n//* This component allows you to create an intuitive interface for color manipulations\n\n/**\n * @file bbn-colorpicker component\n *\n * @description The bbn-colorpicker component contains a field that shows the currently selected color.\n * Clicking on the input field it displays a color chart. The set of colors can be customized using the palette property.\n *\n * @copyright BBN Solutions\n *\n * @author Mirko Argentino\n *\n * @created 10/02/2020\n */\n\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   * @mixin bbn.cp.mixins.input\n   * @mixin bbn.cp.mixins.events\n   * @mixin bbn.cp.mixins.resizer\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.input, bbn.cp.mixins.events, bbn.cp.mixins.resizer],\n  props: {\n    /**\n     * The colorpicker's value.\n     * @prop {String} value\n     */\n    value: {\n      type: String\n    },\n    /**\n     * Shows the coolors wheel.\n     * @prop {Boolean} [true] wheel\n     */\n    wheel: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Show a colors slider instead of the wheel.\n     * @prop {Boolean} [false] slider\n     */\n    slider: {\n      tyoe: Boolean,\n      default: false\n    },\n    /**\n     * Shows the brightness slier\n     * @prop {Boolean}.[true] brightness\n     */\n    brightness: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Shows the saturation slider.\n     * @prop {Boolean} [true] saturation\n     */\n    saturation: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Shows the colors palette only.\n     * @prop {Boolean} [false] onlyPalette\n     */\n    onlyPalette: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * The initial color.\n     * @prop {String} ['#FDFDFD'] color\n     */\n    color: {\n      type: String,\n      default: '#FDFDFD'\n    },\n    /**\n     * Set it to true to show an input containing the color code.\n     * @prop {Boolean} [true] showCodes\n     */\n    showCodes: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * An array containing the list of colors by hex, rgb, rgba, or hsl.\n     * @prop {Array} palette\n     */\n    palette: {\n      type: Array,\n      default() {\n        return bbn.var.colors ? Object.values(bbn.var.colors) : [];\n      }\n    },\n    /**\n     * Shows a button that empties the selection when clicked.\n     * @prop {Boolean} [true] emptyButton\n     */\n    emptyButton: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Defines the color code.\n     * Accepted values: 'hex', 'rgb', 'rgba', 'hsl'.\n     * @prop {String} ['hex'] codeColor\n     */\n    codeColor: {\n      type: String,\n      default: \"hex\",\n      validator: c => ['hex', 'rgb', 'rgba', 'hsl'].includes(c)\n    },\n    /**\n     * Clicking a palette element will automatically select the color and close the widget.\n     * @prop {Boolean} [false] autoSelect\n     */\n    autoSelect: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {\n      /**\n       * @data widget\n       */\n      widget: false,\n      /**\n       * @data {Boolean} [false] showFloater\n       */\n      showFloater: false,\n      /**\n       * @data {Boolean} [false] showPalette\n       */\n      showPalette: this.onlyPalette || this.palette.length,\n      /**\n       * @data {String} currentValue\n       */\n      currentValue: this.value,\n      /**\n       * @data {String} [''] currentHex\n       */\n      currentHex: '',\n      /**\n       * @data {String} [''] currentRgb\n       */\n      currentRgb: '',\n      /**\n       * @data {String} [''] currentRgba\n       */\n      currentRgba: '',\n      /**\n       * @data {String} [''] currentHsl\n       */\n      currentHsl: '',\n      /**\n       * @data {Boolean|Number} [false] initTimeout\n       */\n      initTimeout: false\n    };\n  },\n  computed: {\n    /**\n     * The widget configuration.\n     * @computed currentCfg\n     * @return {Object}\n     */\n    currentCfg() {\n      let obj = {\n        handleRadius: 6,\n        color: this.value || this.color,\n        layout: []\n      };\n      if (this.wheel && !this.slider && !this.onlyPalette) {\n        obj.layout.push({\n          component: _jaames_iro__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ui.Wheel\n        });\n      } else if (!this.onlyPalette) {\n        obj.layout.push({\n          component: _jaames_iro__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ui.Slider,\n          options: {\n            sliderType: 'hue'\n          }\n        });\n      }\n      if (this.brightness && !this.onlyPalette) {\n        obj.layout.push({\n          component: _jaames_iro__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ui.Slider\n        });\n      }\n      if (this.saturation && !this.onlyPalette) {\n        obj.layout.push({\n          component: _jaames_iro__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ui.Slider,\n          options: {\n            sliderType: 'saturation'\n          }\n        });\n      }\n      return obj;\n    }\n  },\n  methods: {\n    /**\n     * The method called at the window resize event.\n     * @method onResize\n     * @fires init\n     */\n    onResize() {\n      this.$nextTick(() => {\n        this.init();\n      });\n    },\n    /**\n     * Initializes the widget.\n     * @method init\n     * @fires destroy\n     * @fires setEvents\n     * @fires getRef\n     */\n    init() {\n      if (this.widget) {\n        this.destroy();\n      }\n      clearTimeout(this.initTimeout);\n      this.initTimeout = setTimeout(() => {\n        let el = this.getRef('picker');\n        if (el) {\n          let parent = el.offsetParent;\n          let width;\n          if (parent) {\n            width = parent.getBoundingClientRect().width - 100;\n          } else {\n            width = 400;\n          }\n          this.widget = new _jaames_iro__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ColorPicker(el, bbn.fn.extend(true, {\n            width: width\n          }, this.currentCfg));\n          this.setEvents();\n          this.find('bbn-input,bbn-button').focus();\n        }\n      }, 300);\n    },\n    /**\n     * Sets the current values.\n     * @method setCurrents\n     */\n    setCurrents(color) {\n      if (bbn.fn.isObject(color)) {\n        this.currentHex = color.hexString;\n        this.currentRgb = color.rgbString;\n        this.currentRgba = color.rgbaString;\n        this.currentHsl = color.hslString;\n        switch (this.codeColor) {\n          case 'hex':\n            this.currentValue = this.currentHex;\n            break;\n          case 'rgb':\n            this.currentValue = this.currentRgb;\n            break;\n          case 'rgba':\n            this.currentValue = this.currentRgba;\n            break;\n          case 'hsl':\n            this.currentValue = this.currentHsl;\n            break;\n        }\n      } else {\n        this.currentHex = '';\n        this.currentRgb = '';\n        this.currentRgba = '';\n        this.currentHsl = '';\n        this.currentValue = '';\n      }\n    },\n    /**\n     * Sets the events to the widget.\n     * @method setEvents\n     * @fires setCurrents\n     */\n    setEvents() {\n      this.widget.on('mount', cp => {\n        if (this.value) {\n          this.setCurrents(cp.color);\n        }\n        cp.on('color:change', color => {\n          this.setCurrents(color);\n        });\n      });\n    },\n    /**\n     * Unsets the widget's events.\n     * @method unsetEvents\n     */\n    unsetEvents() {\n      if (this.widget) {\n        this.widget.off('color:change');\n      }\n    },\n    /**\n     * Destroys the widget.\n     * @method destroy\n     * @fires unsetEvents\n     */\n    destroy() {\n      if (this.widget) {\n        this.unsetEvents();\n        this.widget.base.remove();\n        this.widget = false;\n      }\n    },\n    /**\n     * Empties the current calue.\n     * @method empty\n     * @fires setCurrents\n     */\n    empty() {\n      this.setCurrents();\n    },\n    /**\n     * Sets the component value.\n     * @method save\n     * @emit input\n     * @emit change\n     */\n    save() {\n      if (this.value !== this.currentValue) {\n        this.emitInput(this.currentValue || (this.nullable ? null : ''));\n        this.$emit('change', this.currentValue);\n      }\n      this.showFloater = false;\n    },\n    /**\n     * Sets the color to the widget.\n     * @method setColor\n     */\n    setColor(color) {\n      this.widget.color.set(color);\n      if (this.autoSelect) {\n        this.$nextTick(() => {\n          this.save();\n        });\n      }\n    },\n    /**\n     * Sets the color inserted from the inputs.\n     * @method fromInput\n     * @fires setColor\n     */\n    fromInput(event) {\n      this.setColor(event.target.value);\n    },\n    /**\n     * Opens/closes the floater.\n     * @method openCloseFloater\n     */\n    openCloseFloater() {\n      if (this.showFloater) {\n        this.showFloater = false;\n      } else if (!this.isDisabled && !this.readonly) {\n        this.showFloater = true;\n      }\n    },\n    keydown(ev) {\n      if (!this.showFloater) {\n        if (ev.code === 'Space' || ev.code === 'ArrowDown') {\n          this.showFloater = true;\n        }\n      }\n    }\n  },\n  /**\n   * @event mounted\n   */\n  mounted() {\n    if (!window.iro) {\n      bbn.fn.error(\"IRO NEEDED!!\");\n    }\n    this.ready = true;\n  },\n  /**\n   * @event beforeDestroy\n   * @fires destroy\n   */\n  beforeDestroy() {\n    this.destroy();\n  },\n  watch: {\n    showFloater(v) {\n      if (!v) {\n        this.$nextTick(() => {\n          this.getRef('focuser').focus();\n        });\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/colorpicker/_i18n lazy recursive ^\\\\.\\\\/colorpicker\\\\..*\\\\.lang$\")(`./colorpicker.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\nconst def = {\n  name: 'bbn-colorpicker',\n  definition: cpDef,\n  template: _colorpicker_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  style: _colorpicker_less__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  lang: cpLang\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/colorpicker/colorpicker.js?");

/***/ })

}]);