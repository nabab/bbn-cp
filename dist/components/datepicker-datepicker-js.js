/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/datepicker-datepicker-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/datepicker/datepicker.less":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/datepicker/datepicker.less ***!
  \********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-datepicker {\n  display: inline-flex;\n  flex-wrap: nowrap;\n  flex-direction: row;\n}\n.bbn-datepicker .bbn-masked {\n  border: none;\n}\n.bbn-datepicker .bbn-button {\n  margin-top: 0;\n}\n.bbn-datepicker .bbn-button.bbn-button-right,\n.bbn-datepicker .bbn-button.bbn-button-left {\n  opacity: 0.7;\n}\n.bbn-datepicker .bbn-calendar {\n  height: auto;\n  max-height: 16rem;\n  max-width: 40rem;\n}\n.bbn-datepicker .bbn-calendar .bbn-widget:first-child {\n  border: 0;\n}\n.bbn-datepicker.bbn-input-nullable .bbn-input-nullable-container {\n  opacity: 0;\n  transition: opacity 0.2s;\n  line-height: 100%;\n  margin: auto;\n  padding-right: 0.2rem;\n  width: 1.05rem;\n}\n.bbn-datepicker.bbn-input-nullable .bbn-input-nullable-container .nf-fa-times_circle {\n  line-height: 100%;\n  margin: auto;\n}\n.bbn-datepicker.bbn-input-nullable:hover .bbn-input-nullable-container {\n  opacity: 0.3;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/datepicker/datepicker.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/components/datepicker/datepicker.html":
/*!***************************************************!*\
  !*** ./src/components/datepicker/datepicker.html ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[componentClass, 'bbn-textbox', {'bbn-input-nullable': isNullable}]\\\">\\n  <bbn-button bbn-if=\\\"buttonPosition === 'left'\\\"\\n              icon=\\\"nf nf-fa-calendar\\\"\\n              @click=\\\"isOpened = !isOpened\\\"\\n              :disabled=\\\"isDisabled || readonly\\\"\\n              tabindex=\\\"-1\\\"\\n              class=\\\"bbn-button-left bbn-no-vborder\\\"/>\\n  <bbn-masked ref=\\\"element\\\"\\n              :disabled=\\\"isDisabled\\\"\\n              :readonly=\\\"readonly\\\"\\n              :required=\\\"required\\\"\\n              :mask=\\\"currentMask\\\"\\n              @hook:mounted=\\\"maskedMounted = true\\\"\\n              @blur=\\\"inputChanged\\\"\\n              @keydown.enter=\\\"inputChanged\\\"\\n              bbn-model=\\\"inputValue\\\"\\n              class=\\\"bbn-flex-fill\\\"\\n              :autosize=\\\"autosize\\\"\\n              :inputmode=\\\"inputmode\\\"\\n              :placeholder=\\\"placeholder\\\"/>\\n  <div bbn-if=\\\"isNullable && !readonly && !isDisabled\\\"\\n       class=\\\"bbn-block bbn-h-100 bbn-input-nullable-container\\\">\\n    <i bbn-if=\\\"hasValue\\\"\\n       class=\\\"nf nf-fa-times_circle bbn-p\\\"\\n       @mousedown.prevent.stop=\\\"clear\\\"/>\\n  </div>\\n  <bbn-button bbn-if=\\\"buttonPosition === 'right'\\\"\\n              icon=\\\"nf nf-fa-calendar\\\"\\n              @click=\\\"isOpened = !isOpened\\\"\\n              :disabled=\\\"isDisabled || readonly\\\"\\n              tabindex=\\\"-1\\\"\\n              class=\\\"bbn-button-right bbn-no-vborder\\\"/>\\n  <bbn-floater bbn-if=\\\"isOpened && !isDisabled && !readonly\\\"\\n               :element=\\\"$el\\\"\\n               ref=\\\"floater\\\"\\n               :auto-hide=\\\"1000\\\"\\n               @close=\\\"isOpened = false\\\"\\n               :element-width=\\\"false\\\">\\n    <bbn-calendar :arrows-buttons=\\\"false\\\"\\n                  @selected=\\\"setDate\\\"\\n                  :value=\\\"value ? value.toString() : ''\\\"\\n                  :selection=\\\"true\\\"\\n                  :auto-selection=\\\"true\\\"\\n                  :type=\\\"type\\\"\\n                  ref=\\\"calendar\\\"\\n                  :date=\\\"value ? value.toString() : ''\\\"\\n                  :min=\\\"min\\\"\\n                  :max=\\\"max\\\"\\n                  :extra-items=\\\"true\\\"\\n                  :disable-dates=\\\"disableDates\\\"\\n                  :items-range=\\\"datesRange\\\"\\n                  :source=\\\"source\\\"\\n                  :onlyEvents=\\\"onlyEvents\\\"/>\\n  </bbn-floater>\\n</div>\\n\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/datepicker/datepicker.html?");

/***/ }),

/***/ "./src/components/datepicker/datepicker.less":
/*!***************************************************!*\
  !*** ./src/components/datepicker/datepicker.less ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_datepicker_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./datepicker.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/datepicker/datepicker.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_datepicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_datepicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_datepicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_datepicker_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/datepicker/datepicker.less?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/components/datepicker/_i18n lazy recursive ^\\.\\/datepicker\\..*\\.lang$":
/*!**************************************************************************************************!*\
  !*** ./src/components/datepicker/_i18n/ lazy ^\.\/datepicker\..*\.lang$ strict namespace object ***!
  \**************************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/datepicker/_i18n lazy recursive ^\\\\.\\\\/datepicker\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/datepicker/_i18n/_lazy_^\\.\\/datepicker\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/datepicker/datepicker.js":
/*!*************************************************!*\
  !*** ./src/components/datepicker/datepicker.js ***!
  \*************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _datepicker_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datepicker.html */ \"./src/components/datepicker/datepicker.html\");\n/* harmony import */ var _datepicker_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datepicker.less */ \"./src/components/datepicker/datepicker.less\");\n/**\n  * @file bbn-datepicker component\n  *\n  * @description bbn-datepicker is a component that combines input and calendar, allowing the user to choose a date value.\n  * This component allows the association of data in a bidirectional way and allows the users to choose a validation interval period and the format of the value entered.\n  *\n  * @copyright BBN Solutions\n  *\n  * @author Mirko Argentino\n  */\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   * @mixin bbn.cp.mixins.input\n   * @mixin bbn.cp.mixins.events\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.input, bbn.cp.mixins.events],\n  props: {\n    /**\n     * The array of events for each day.\n     * When a string is set, an ajax call will be made to the corresponding url.\n     *\n     * @prop {(String|Array)} [[]] source\n    */\n    source: {\n      type: [String, Array],\n      default() {\n        return [];\n      }\n    },\n    /**\n     * The format of the date displayed.\n     *\n     * @prop {String} format\n     */\n    format: {\n      type: String\n    },\n    /**\n     * The format of the value.\n     *\n     * @prop {(String|Function)} valueFormat\n     */\n    valueFormat: {\n      type: [String, Function]\n    },\n    /**\n     * The mask for the date input.\n     *\n     * @prop {String} mask\n     */\n    mask: {\n      type: String\n    },\n    /**\n     * The maximum allowed value.\n     *\n     * @prop {String} max\n     */\n    max: {\n      type: String\n    },\n    /**\n     * The minimum allowed value.\n     *\n     * @prop {String} min\n     */\n    min: {\n      type: String\n    },\n    /**\n     * The visualization mode.\n     * Allowed values: days, weeks, months and years.\n     *\n     * @prop {String} ['days'] type\n    */\n    type: {\n      type: String,\n      default: 'days',\n      validator: m => ['days', 'weeks', 'months', 'years'].includes(m)\n    },\n    /**\n     * The disabled dates.\n     *\n     * @prop {(Array|Function)} disableDates\n     */\n    disableDates: {\n      type: [Array, Function]\n    },\n    /**\n     * Array of date values insertable into a range.\n     *\n     * @prop {Array} [[]] datesRange\n    */\n    datesRange: {\n      type: Array,\n      default() {\n        return [];\n      }\n    },\n    /**\n     * Set it to false if you dont' want to auto-resize the input's width based on its value (in characters).\n     * @prop {Boolean} [true] autosize\n     */\n    autosize: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Shows only dates with events.\n     *\n     * @prop {Boolean} [false] onlyEvents\n     */\n    onlyEvents: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * The calendar button's position\n     * \n     * @prop {String} ['right'] buttonPosition\n     */\n    buttonPosition: {\n      type: String,\n      default: 'right',\n      validator: pos => ['right', 'left'].includes(pos)\n    }\n  },\n  data() {\n    return {\n      /**\n       * Shows/hides the floater.\n       *\n       * @data {Boolean} [false] isOpened\n      */\n      isOpened: false,\n      /**\n       * Indicates if the bbn-masked is mounted.\n       *\n       * @data {Boolean} [false] maskedMounted\n      */\n      maskedMounted: false,\n      /**\n       * The current value displayed in the input.\n       *\n       * @data {String} [''] inputValue\n      */\n      inputValue: '',\n      /**\n       * The old value displayed in the input.\n       *\n       * @data {String} [''] oldInputvalue\n       */\n      oldInputValue: ''\n    };\n  },\n  computed: {\n    /**\n     * The current mask for the date input.\n     *\n     * @computed currentMask\n     * @return {String}\n     */\n    currentMask() {\n      if (this.mask) {\n        return this.mask;\n      }\n      switch (this.type) {\n        case 'months':\n          return '00/0000';\n        case 'years':\n          return '0000';\n      }\n      return '00/00/0000';\n    },\n    /**\n     * The current value format.\n     *\n     * @computed currentValueFormat\n     * @return {String}\n     */\n    currentValueFormat() {\n      if (this.valueFormat) {\n        return this.valueFormat;\n      }\n      switch (this.type) {\n        case 'months':\n          return 'YYYY-MM';\n        case 'years':\n          return 'YYYY';\n      }\n      return 'YYYY-MM-DD';\n    },\n    /**\n     * The current format displayed in the input.\n     *\n     * @computed currentFormat\n     * @return {String}\n     */\n    currentFormat() {\n      if (this.format) {\n        return this.format;\n      }\n      switch (this.type) {\n        case 'months':\n          return 'MM/YYYY';\n        case 'years':\n          return 'YYYY';\n      }\n      return 'DD/MM/YYYY';\n    },\n    /**\n     * True if the values of the inputValue and the oldInputValue properties are different.\n     *\n     * @computed intuValueChanged\n     * @return {Boolean}\n     */\n    inputValueChanged() {\n      return this.inputValue !== this.oldInputValue;\n    }\n  },\n  methods: {\n    /**\n     * Gets the correct value format.\n     *\n     * @method getValueFormat\n     * @param {String} val The value.\n     * @fires valueFormat\n     * @return {String}\n     */\n    getValueFormat(val) {\n      return bbn.fn.isFunction(this.valueFormat) ? this.valueFormat(val) : this.currentValueFormat;\n    },\n    /**\n     * Sets the value to the 'YYYY-MM-DD' format.\n     *\n     * @method setDate\n     * @param {String} val\n     * @fires getValueFormat\n     * @fires setValue\n     */\n    setDate(val, calendar, format) {\n      this.setValue(dayjs(val, format).isValid() ? dayjs(val, format).format(this.getValueFormat(val)) : '');\n    },\n    /**\n     * Sets the value.\n     *\n     * @method setValue\n     * @param {String} val The value.\n     * @fires getValueFormat\n     * @fires disableDates\n     * @fires setInputValue\n     * @emits input\n     */\n    setValue(val) {\n      let format = !!val ? this.getValueFormat(val.toString()) : false,\n        value = format ? dayjs(val.toString(), format).isValid() ? dayjs(val.toString(), format).format(format) : '' : '';\n      if (value) {\n        if (this.min && value < this.min) {\n          value = this.min;\n        }\n        if (this.max && value > this.max) {\n          value = this.max;\n        }\n        if (this.disableDates && bbn.fn.isFunction(this.disableDates) && this.disableDates(value) || bbn.fn.isArray(this.disableDates) && this.disableDates.includes(value)) {\n          value = this.nullable ? null : '';\n        }\n      } else if (this.nullable) {\n        value = null;\n      }\n      if (value !== this.value) {\n        this.emitInput(value);\n      } else {\n        this.setInputValue(value);\n      }\n      if (!value) {\n        this.inputValue = '';\n        this.oldInputValue = '';\n      }\n      this.isOpened = false;\n    },\n    /**\n     * Updates the calendar.\n     *\n     * @method updateCalendar\n     * @fires getRef\n    */\n    updateCalendar() {\n      if (this.getRef('calendar')) {\n        this.getRef('calendar').refresh();\n      }\n    },\n    /**\n     * The method called by the input blur event.\n     *\n     * @method inputChanged\n     * @fires getRef\n     * @fires getValueFormat\n     * @fires disableDates\n     * @fires setValue\n     * @emits change\n    */\n    inputChanged() {\n      let mask = this.getRef('element'),\n        newVal = mask.inputValue,\n        value = !!newVal ? dayjs(newVal, this.currentFormat).format(this.getValueFormat(newVal)) : '';\n      if (mask.raw(newVal) !== this.oldInputValue) {\n        if (value && this.min && value < this.min) {\n          value = this.min;\n        }\n        if (value && this.max && value > this.max) {\n          value = this.max;\n        }\n        if (this.disableDates && bbn.fn.isFunction(this.disableDates) && this.disableDates(value) || bbn.fn.isArray(this.disableDates) && this.disableDates.includes(value)) {\n          this.setValue(false);\n        } else {\n          this.setValue(value);\n          this.$nextTick(() => {\n            if (this.value !== value) {\n              this.$emit('change', value);\n            }\n          });\n        }\n      }\n    },\n    /**\n     * Set the new value by updating the calendar.\n     *\n     * @method setInputValue\n     * @param {String} newVal\n     * @fires getRef\n     * @fires getValueFormat\n     * @fires setValue\n     * @fires updateCalendar\n     */\n    setInputValue(newVal) {\n      if (newVal) {\n        let mask = this.getRef('element'),\n          mom = dayjs(newVal.toString(), this.getValueFormat(newVal.toString()));\n        this.inputValue = newVal && mask && mom.isValid() ? mask.raw(mom.format(this.currentFormat)) : '';\n      } else {\n        this.inputValue = '';\n      }\n      this.oldInputValue = this.inputValue;\n      this.updateCalendar();\n    },\n    /**\n     * Clears the value.\n     *\n     * @method clear\n     * @fires getRef\n     * @fires setValue\n     */\n    clear() {\n      this.setValue('');\n      this.$nextTick(() => {\n        this.$set(this.getRef('element'), 'inputValue', '');\n      });\n    }\n  },\n  /**\n   * @event beforeCreate\n   */\n  beforeCreate() {\n    if (bbn.env && bbn.env.lang && bbn.env.lang !== dayjs.locale()) {\n      dayjs.locale(bbn.env.lang);\n    }\n  },\n  /**\n   * @event mounted\n   */\n  mounted() {\n    this.ready = true;\n  },\n  watch: {\n    /**\n     * @watch min\n     * @fires setValue\n     * @fires updateCalendar\n     */\n    min() {\n      this.setValue(this.value || '');\n      this.updateCalendar();\n    },\n    /**\n     * @watch max\n     * @fires setValue\n     * @fires updateCalendar\n     */\n    max() {\n      this.setValue(this.value || '');\n      this.updateCalendar();\n    },\n    /**\n     * @watch valueFormat\n     * @fires setValue\n     */\n    valueFormat() {\n      this.setValue(this.value || '');\n    },\n    /**\n     * @watch maskedMounted\n     * @fires setInputValue\n     */\n    maskedMounted(newVal) {\n      if (newVal) {\n        this.setInputValue(this.value);\n      }\n    },\n    /**\n     * @watch value\n     * @fires setInputValue\n    */\n    value(newVal) {\n      this.setInputValue(newVal);\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/datepicker/_i18n lazy recursive ^\\\\.\\\\/datepicker\\\\..*\\\\.lang$\")(`./datepicker.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-datepicker',\n  definition: cpDef,\n  template: _datepicker_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _datepicker_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/datepicker/datepicker.js?");

/***/ })

}]);