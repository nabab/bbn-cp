/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/slider-slider-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/slider/slider.less":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/slider/slider.less ***!
  \************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-slider {\n  z-index: 10;\n  visibility: hidden;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/slider/slider.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/slider/slider.html":
/*!*******************************************!*\
  !*** ./src/components/slider/slider.html ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"['bbn-abs', 'bbn-bordered', 'bbn-background', componentClass, {\\r\\n  'bbn-no-hborder': !isVertical,\\r\\n  'bbn-no-vborder': isVertical,\\r\\n  'bbn-w-100': !isVertical,\\r\\n  'bbn-h-100': isVertical,\\r\\n}]\\\"\\r\\n     @mouseup.stop\\r\\n     @mousedown.stop\\r\\n     @keydown.escape=\\\"hide\\\"\\r\\n     :style=\\\"currentStyle\\\">\\r\\n  <slot></slot>\\r\\n  <div v-if=\\\"closeButton\\\"\\r\\n       :class=\\\"{\\r\\n         'bbn-abs': true,\\r\\n         'bbn-top-right': !['bottom-right', 'bottom-left', 'top-left'].includes(closeButton),\\r\\n         'bbn-bottom-right': closeButton === 'bottom-right',\\r\\n         'bbn-top-left': closeButton === 'top-left',\\r\\n         'bbn-bottom-left': closeButton === 'bottom-left',\\r\\n         'bbn-p': true,\\r\\n         'bbn-spadded': true,\\r\\n         'bbn-m': !isMobile,\\r\\n         'bbn-xxl': isMobile,\\r\\n         'bbn-unselectable': true\\r\\n       }\\\"\\r\\n       @click.stop.prevent=\\\"hide\\\">\\r\\n    <i class=\\\"nf nf-fa-times\\\"></i>\\r\\n  </div>\\r\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/slider/slider.html?");

/***/ }),

/***/ "./src/components/slider/slider.less":
/*!*******************************************!*\
  !*** ./src/components/slider/slider.less ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_slider_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./slider.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/slider/slider.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_slider_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_slider_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_slider_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_slider_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/slider/slider.less?");

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

/***/ "./src/components/slider lazy recursive ^\\.\\/slider\\..*\\.lang$":
/*!************************************************************************************!*\
  !*** ./src/components/slider/ lazy ^\.\/slider\..*\.lang$ strict namespace object ***!
  \************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./slider.fr.lang\": [\n\t\t\"./src/components/slider/slider.fr.lang\",\n\t\t\"src_components_slider_slider_fr_lang\"\n\t],\n\t\"./slider.it.lang\": [\n\t\t\"./src/components/slider/slider.it.lang\",\n\t\t\"src_components_slider_slider_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/slider lazy recursive ^\\\\.\\\\/slider\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/slider/_lazy_^\\.\\/slider\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/slider/slider.js":
/*!*****************************************!*\
  !*** ./src/components/slider/slider.js ***!
  \*****************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _slider_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.html */ \"./src/components/slider/slider.html\");\n/* harmony import */ var _slider_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider.less */ \"./src/components/slider/slider.less\");\n/**\r\n * @file bbn-slider component\r\n *\r\n * @description \r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author Vito Fava\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic \r\n   * @mixin bbn.cp.mixins.toggle\r\n   * @mixin bbn.cp.mixins.resizer \r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.resizer, bbn.cp.mixins.toggle],\n  statics() {\n    const orientations = {\n      left: {\n        shadow: '2px 0 20px 0',\n        size: 'width',\n        prop: 'top'\n      },\n      right: {\n        shadow: '-2px 0 20px 0',\n        size: 'width',\n        prop: 'top'\n      },\n      top: {\n        shadow: '2px 0 20px 0',\n        size: 'height',\n        prop: 'left'\n      },\n      bottom: {\n        shadow: '2px 0 20px 0',\n        size: 'height',\n        prop: 'left'\n      }\n    };\n    return {\n      orientations\n    };\n  },\n  props: {\n    /**\r\n     * The orientation of the slider.\r\n     * @prop {String} ['left'] orientation \r\n     */\n    orientation: {\n      type: String,\n      default: 'left'\n    },\n    /**\r\n     * The close button.\r\n     * @prop {Boolean|String} [true]\r\n     */\n    closeButton: {\n      type: [Boolean, String],\n      default: true\n    },\n    /**\r\n     * Defines if the slider is visible.\r\n     * @prop {Boolean} [false] visible\r\n     */\n    visible: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {\n      /**\r\n       * True when the component has been opened.\r\n       */\n      hasBeenOpened: false,\n      /**\r\n       * The opacity of the slider.\r\n       * @data {Number} [0] opacity\r\n       */\n      opacity: 1,\n      /**\r\n       * The current size.\r\n       * @data {Number} [0] currentSize\r\n       */\n      currentSize: 0,\n      /**\r\n       * The position top.\r\n       * @data [null] top\r\n       */\n      top: null,\n      /**\r\n       * The position left.\r\n       * @data [null] left\r\n       */\n      left: null,\n      /**\r\n       * The position bottom.\r\n       * @data [null] bottom\r\n       */\n      bottom: null,\n      /**\r\n       * The position right.\r\n       * @data [null] right\r\n       */\n      right: null,\n      /**\r\n       * @data {Number|Boolean} [false] transitionTimeout\r\n       */\n      transitionTimeout: false,\n      /**\r\n       * Internal setting for when showing shadow.\r\n       * @data {Boolean} showShadow\r\n       */\n      showShadow: this.visible\n    };\n  },\n  computed: {\n    /**\r\n     * True if it is a vertical slider.\r\n     * @computed isVertical\r\n     * @returns {Boolean}\r\n     */\n    isVertical() {\n      return this.orientation === 'left' || this.orientation === 'right';\n    },\n    /**\r\n     * The current style.\r\n     * @computed currentStyle\r\n     * @returns {String}\r\n     */\n    currentStyle() {\n      if (!bbnSliderCp.orientations[this.orientation]) {\n        throw new Error(bbn._(\"Impossible to get an orientation for the slider\"));\n      }\n      let o = {\n        visibility: 'hidden'\n      };\n      let or = bbn.fn.createObject(bbnSliderCp.orientations[this.orientation]);\n      if (this.showShadow) {\n        o['-webkit-box-shadow'] = o['-moz-box-shadow'] = o['box-shadow'] = or.shadow + ' !important';\n      }\n      if (o[or.prop] !== null && this.ready && !this.isResizing) {\n        o.transition = this.orientation + ' 0.5s';\n        o.visibility = 'visible';\n      }\n      o[or.size] = 'auto';\n      o[or.prop] = 0;\n      o[this.orientation] = this.currentVisible ? 0 : -this.currentSize + 'px';\n      return o;\n    }\n  },\n  methods: {\n    /**\r\n     * Private method to manage the \"touchstart\" event\r\n     * @method _touchStart\r\n     */\n    _touchStart() {\n      this.touchStart = true;\n      this.touchMove = false;\n    },\n    /**\r\n     * Private method to manage the \"touchmove\" event\r\n     * @method _touchMove\r\n     */\n    _touchMove() {\n      this.touchMove = true;\n    },\n    /**\r\n     * Private method to manage the \"touchend\" event\r\n     * @method _touchEnd\r\n     * @param {Event} e\r\n     * @fires checkClick\r\n     */\n    _touchEnd(e) {\n      if (!this.touchMove) {\n        this.checkClick(e);\n      }\n      this.touchStart = false;\n      this.touchMove = false;\n    },\n    /**\r\n     * Adds or removes the event listener for mousedown and touchstart.\r\n     * @method _setEvents\r\n     * @param add\r\n     */\n    _setEvents(add) {\n      if (add) {\n        document.addEventListener('mouseup', this.checkClick.bind(this));\n        document.addEventListener('touchstart', this._touchStart.bind(this));\n        document.addEventListener('touchmove', this._touchMove.bind(this), {\n          passive: true\n        });\n        document.addEventListener('touchend', this._touchEnd.bind(this));\n      } else {\n        document.removeEventListener('mouseup', this.checkClick.bind(this));\n        document.removeEventListener('touchstart', this._touchStart.bind(this));\n        document.removeEventListener('touchmove', this._touchMove.bind(this));\n        document.removeEventListener('touchend', this._touchEnd.bind(this));\n      }\n    },\n    /**\r\n     * Handles the resize.\r\n     * @method onResize\r\n     */\n    onResize() {\n      this.isResizing = true;\n      if (this.transitionTimeout) {\n        clearTimeout(this.transitionTimeout);\n      }\n      this.transitionTimeout = setTimeout(() => {\n        if (!this.$isMounted) {\n          this.onResize();\n        }\n        if (this.setResizeMeasures() || this.setContainerMeasures()) {\n          let s = this.$el.getBoundingClientRect()[this.isVertical ? 'width' : 'height'];\n          if (s !== this.currentSize && s > 20) {\n            this.currentSize = s + 7;\n          }\n        }\n        this.isResizing = false;\n        if (!this.ready) {\n          this.ready = true;\n        }\n      }, 500);\n    },\n    /**\r\n     * Handles the mousedown.\r\n     * @param {Event} e \r\n     * @fires toggle\r\n     */\n    checkClick(e) {\n      if (this.currentVisible) {\n        const target = e.target;\n        const ev = new CustomEvent('checkclick', {\n          cancelable: true\n        });\n        bbn.fn.log(\"CHECK CLICK\", target, ev);\n        this.$emit('checkclick', target, ev);\n        if (!ev.defaultPrevented) {\n          const cp = e.target.closest(\".bbn-component\")?.bbn;\n          if (!cp || cp.closest(\"bbn-slider\") !== this) {\n            this.hide();\n          }\n          bbn.fn.log(\"CHECK CLICK\", target, ev, cp);\n        }\n      }\n    },\n    changeVisible(v) {\n      //bbn.fn.log(\"CHANGE SLIDER VISIBLE\");\n      if (v && !this.hasBeenOpened) {\n        this.hasBeenOpened = true;\n      }\n      this.switchFocus(v);\n    }\n  },\n  /**\r\n   * Sets the events listener.\r\n   * @event created\r\n   * @fires _setEvents\r\n   */\n  created() {\n    this.componentClass.push('bbn-resize-emitter');\n    this._setEvents(true);\n  },\n  /**\r\n   * Removes the events listener.\r\n   * @event destroyed\r\n   * @fires _setEvents\r\n   */\n  beforeDestroy() {\n    this._setEvents();\n  },\n  /**\r\n   * Initializes the component.\r\n   * @event mounted\r\n   */\n  mounted() {\n    this.onResize();\n  },\n  watch: {\n    /**\r\n     * @watch currentSize\r\n     * @param v \r\n     */\n    currentSize(v) {\n      this.$el.style[this.isVertical ? 'width' : 'height'] = v;\n    },\n    visible(v) {\n      this.currentVisible = v;\n    },\n    currentVisible(v) {\n      if (!v) {\n        this._shadowTimeout = setTimeout(() => {\n          this.showShadow = false;\n        }, 500);\n      } else {\n        if (this._shadowTimeout) {\n          clearTimeout(this._shadowTimeout);\n        }\n        this.showShadow = true;\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/slider lazy recursive ^\\\\.\\\\/slider\\\\..*\\\\.lang$\")(`./slider.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-slider',\n  definition: cpDef,\n  template: _slider_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _slider_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/slider/slider.js?");

/***/ })

}]);