/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/window-window-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/window/window.less":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/window/window.less ***!
  \************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/* LESS Document */\n.bbn-window {\n  transition: opacity 0.2s;\n  position: fixed !important;\n}\n.bbn-window > .bbn-floater {\n  position: absolute !important;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/window/window.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/window/window.html":
/*!*******************************************!*\
  !*** ./src/components/window/window.html ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[componentClass, 'bbn-modal']\\\"\\r\\n     :style=\\\"containerCSS\\\"\\r\\n     tabindex=\\\"-1\\\"\\r\\n     @animationstart=\\\"onResize\\\"\\r\\n     @keydown.esc.prevent.stop=\\\"close\\\">\\r\\n  <bbn-floater bbn-if=\\\"ready\\\"\\r\\n              :title=\\\"title\\\"\\r\\n              :maximizable=\\\"maximizable\\\"\\r\\n              :closable=\\\"closable\\\"\\r\\n              :animation=\\\"true\\\"\\r\\n              :width=\\\"width\\\"\\r\\n              :height=\\\"height\\\"\\r\\n              :min-width=\\\"minWidth\\\"\\r\\n              :max-width=\\\"maxWidth\\\"\\r\\n              :min-height=\\\"minHeight\\\"\\r\\n              :max-height=\\\"maxHeight\\\"\\r\\n              :component=\\\"component\\\"\\r\\n              :buttons=\\\"buttons\\\"\\r\\n              :footer=\\\"footer\\\"\\r\\n              :content=\\\"content\\\"\\r\\n              :source=\\\"source\\\"\\r\\n              :container=\\\"$el\\\"\\r\\n              @beforeClose=\\\"floaterClose\\\"\\r\\n              :latency=\\\"500\\\"\\r\\n              @keydown.esc.prevent.stop=\\\"close\\\"\\r\\n              :scrollable=\\\"scrollable\\\"\\r\\n              :draggable=\\\"draggable\\\"\\r\\n              :resizable=\\\"resizable\\\"\\r\\n              :on-open=\\\"onOpen\\\"\\r\\n              :on-close=\\\"onClose\\\"\\r\\n              :uid=\\\"uid\\\">\\r\\n    <slot></slot>\\r\\n  </bbn-floater>\\r\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/window/window.html?");

/***/ }),

/***/ "./src/components/window/window.less":
/*!*******************************************!*\
  !*** ./src/components/window/window.less ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_window_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./window.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/window/window.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_window_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_window_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_window_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_window_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/window/window.less?");

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

/***/ "./src/components/window/_i18n lazy recursive ^\\.\\/window\\..*\\.lang$":
/*!******************************************************************************************!*\
  !*** ./src/components/window/_i18n/ lazy ^\.\/window\..*\.lang$ strict namespace object ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./window.fr.lang\": [\n\t\t\"./src/components/window/_i18n/window.fr.lang\",\n\t\t\"src_components_window__i18n_window_fr_lang\"\n\t],\n\t\"./window.it.lang\": [\n\t\t\"./src/components/window/_i18n/window.it.lang\",\n\t\t\"src_components_window__i18n_window_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/window/_i18n lazy recursive ^\\\\.\\\\/window\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/window/_i18n/_lazy_^\\.\\/window\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/window/window.js":
/*!*****************************************!*\
  !*** ./src/components/window/window.js ***!
  \*****************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _window_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./window.html */ \"./src/components/window/window.html\");\n/* harmony import */ var _window_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window.less */ \"./src/components/window/window.less\");\n/**\r\n * @file bbn-window component\r\n *\r\n * @description The bbn-window is a component that represents a modal window in which it is possible to show the content.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author BBN Solutions\r\n *\r\n * @created 15/02/2017\r\n */\nconst cpDef = {\n  name: 'bbn-window',\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.resizer\r\n   * @mixin bbn.cp.mixins.dimensions\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.resizer, bbn.cp.mixins.dimensions],\n  props: {\n    /**\r\n     * @prop {Boolean} [true] maximazable\r\n     */\n    maximizable: {\n      type: Boolean,\n      default: true\n    },\n    /**\r\n     * @prop {Boolean} [true] closable\r\n     */\n    closable: {\n      type: Boolean,\n      default: true\n    },\n    /**\r\n     * @prop {Boolean} [true] scrollable\r\n     */\n    scrollable: {\n      type: Boolean,\n      default: true\n    },\n    /**\r\n     * @prop {Boolean} [false] draggable\r\n     */\n    draggable: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * @prop {Boolean} [true] resizable\r\n     */\n    resizable: {\n      type: Boolean,\n      default: true\n    },\n    /**\r\n     * @prop {Boolean} [false] maximized\r\n     */\n    maximized: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * @prop {Function} onOpen\r\n     */\n    onOpen: {\n      type: Function\n    },\n    /**\r\n     * @prop {Function} beforeClose\r\n     */\n    beforeClose: {\n      type: Function\n    },\n    /**\r\n     * @prop {Function} onClose\r\n     */\n    onClose: {\n      type: Function\n    },\n    /**\r\n     * @prop {Function} afterClose\r\n     */\n    afterClose: {\n      type: Function\n    },\n    /**\r\n     * @prop {Function|String|Object} footer\r\n     */\n    footer: {\n      type: [Function, String, Object]\n    },\n    /**\r\n     * @prop {Array} [[]] buttons\r\n     */\n    buttons: {\n      type: Array,\n      default() {\n        return [];\n      }\n    },\n    /**\r\n     * @prop {Function|Array|Object} [{}] source\r\n     */\n    source: {\n      type: [Function, Array, Object],\n      default() {\n        return {};\n      }\n    },\n    /**\r\n     * @prop {String|Function|Object} component\r\n     */\n    component: {\n      type: [String, Function, Object]\n    },\n    /**\r\n     * @prop {String|Boolean} ['Untitled'] title\r\n     */\n    title: {\n      type: [String, Boolean],\n      default: bbn._(\"Untitled\")\n    },\n    /**\r\n     * @prop {String} uid\r\n     */\n    uid: {\n      type: String\n    },\n    /**\r\n     * @prop {String} content\r\n     */\n    content: {\n      type: String\n    },\n    /**\r\n     * @prop {String} mode\r\n     */\n    mode: {\n      type: String,\n      default: \"free\",\n      validator: mode => ['free', 'options', 'selection'].includes(mode)\n    }\n  },\n  data() {\n    let fns = [];\n    if (this.onClose) {\n      fns.push(this.onClose);\n    }\n    return {\n      /**\r\n       * @data {Boolean} isMaximized\r\n       */\n      isMaximized: this.maximized,\n      /**\r\n       * @data {String} widthUnit\r\n       */\n      widthUnit: typeof this.width === 'string' && bbn.fn.substr(this.width, -1) === '%' ? '%' : 'px',\n      /**\r\n       * @data {Number|String|Boolean} currentWidth\r\n       */\n      currentWidth: this.width,\n      /**\r\n       * @data {String} heightUnit\r\n       */\n      heightUnit: typeof this.height === 'string' && bbn.fn.substr(this.height, -1) === '%' ? '%' : 'px',\n      /**\r\n       * @data {Number|String|Boolean} currentHeight\r\n       */\n      currentHeight: this.height,\n      /**\r\n       * @data {Array} closingFunctions\r\n       */\n      closingFunctions: fns,\n      /**\r\n       * @data {Boolean} [false] showContent\r\n       */\n      showContent: false,\n      /**\r\n       * @data {Boolean|bbnCp} [false] popup\r\n       */\n      popup: false,\n      /**\r\n       * @data {Object} [{opacity: 0}] containerCss\r\n       */\n      containerCSS: {\n        opacity: 0\n      }\n    };\n  },\n  computed: {\n    /**\r\n     * @computed realWidth\r\n     * @returns {String}\r\n     */\n    realWidth() {\n      if (!this.currentWidth) {\n        return 'auto';\n      }\n      if (typeof this.currentWidth === 'number') {\n        return this.currentWidth.toString() + 'px';\n      }\n      return this.currentWidth;\n    },\n    /**\r\n     * @computed realHeight\r\n     * @returns {String}\r\n     */\n    realHeight() {\n      if (!this.currentHeight) {\n        return 'auto';\n      }\n      if (typeof this.currentHeight === 'number') {\n        return this.currentHeight.toString() + 'px';\n      }\n      return this.currentHeight;\n    }\n  },\n  methods: {\n    /**\r\n     * @method getContainerPosition\r\n     * @returns {Object}\r\n     */\n    getContainerPosition() {\n      return this.$el ? this.$el.parentNode.getBoundingClientRect() : {};\n    },\n    /**\r\n     * @method onResize\r\n     * @fires getContainerPosition\r\n     */\n    onResize() {\n      let o = this.getContainerPosition();\n      this.containerCSS = {\n        opacity: 1,\n        top: o.top + 'px',\n        left: o.left + 'px',\n        width: o.width + 'px',\n        height: o.height + 'px'\n      };\n    },\n    /**\r\n     * @method addClose\r\n     * @param {Function} fn\r\n     */\n    addClose(fn) {\n      for (let i = 0; i < arguments.length; i++) {\n        if (typeof arguments[i] === 'function') {\n          this.closingFunctions.push(arguments[i]);\n        }\n      }\n    },\n    /**\r\n     * @method removeClose\r\n     * @param {Function} fn\r\n     */\n    removeClose(fn) {\n      if (!fn) {\n        this.closingFunctions = [];\n      } else {\n        this.closingFunctions = bbn.fn.filter(this.closingFunctions, f => {\n          return fn !== f;\n        });\n      }\n    },\n    /**\r\n     * @method floaterClose\r\n     * @param {Event} e\r\n     * @fires close\r\n     */\n    floaterClose(e) {\n      this.close(false, e);\n    },\n    /**\r\n     * @method close\r\n     * @param {Boolean} force\r\n     * @param {Event} ev\r\n     * @emits {beforeClose}\r\n     * @fires beforeClose\r\n     * @fires $nextTick\r\n     * @fires afterClose\r\n     * @emits close\r\n     */\n    close(force, ev) {\n      let ok = true;\n      if (!ev) {\n        ev = new Event('beforeClose', {\n          cancelable: true\n        });\n      }\n      if (!force) {\n        if (this.popup) {\n          this.popup.$emit('beforeClose', ev, this);\n        } else {\n          this.$emit('beforeClose', ev, this);\n        }\n        if (this.beforeClose && this.beforeClose(this) === false) {\n          return;\n        }\n      }\n      /*\r\n      bbn.fn.each(this.closingFunctions, a => {\r\n        if (!ev.defaultPrevented) {\r\n          a(this, ev);\r\n        }\r\n      });\r\n      */\n      if (!force && bbn.fn.isObject(ev) && ev.defaultPrevented) {\n        return;\n      }\n      let closeEvent = new Event('close', {\n        cancelable: true\n      });\n      this.$el.style.display = 'block';\n      this.$nextTick(() => {\n        this.$emit(\"close\", this, closeEvent);\n        if (this.afterClose) {\n          this.afterClose(this);\n        }\n      });\n    }\n  },\n  /**\r\n   * @event created\r\n   * @fires closest\r\n   */\n  created() {\n    this.popup = this.closest('bbn-popup');\n  },\n  /**\r\n   * @event mounted\r\n   * @fires onResize\r\n   */\n  mounted() {\n    this.ready = true;\n    this.onResize();\n  },\n  watch: {\n    /**\r\n     * @watch isMaximized\r\n     * @fires $nextTick\r\n     * @fires selfEmit\r\n     */\n    isMaximized() {\n      this.$nextTick(() => {\n        this.selfEmit(true);\n      });\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/window/_i18n lazy recursive ^\\\\.\\\\/window\\\\..*\\\\.lang$\")(`./window.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-window',\n  definition: cpDef,\n  template: _window_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _window_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/window/window.js?");

/***/ })

}]);