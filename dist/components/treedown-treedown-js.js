/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/treedown-treedown-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/treedown/treedown.less":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/treedown/treedown.less ***!
  \****************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-treedown {\n  display: inline-block;\n  box-sizing: border-box;\n  min-width: 4rem;\n  cursor: pointer;\n}\n.bbn-treedown input {\n  cursor: pointer;\n  width: 100%;\n  font-size: inherit;\n}\n.bbn-treedown button {\n  height: 100%;\n}\n.bbn-treedown div {\n  box-sizing: border-box;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/treedown/treedown.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/treedown/treedown.html":
/*!***********************************************!*\
  !*** ./src/components/treedown/treedown.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[componentClass, 'bbn-iblock', 'bbn-textbox', 'bbn-reactive', {'bbn-disabled': !!isDisabled}]\\\"\\r\\n     @mouseleave=\\\"leave\\\"\\r\\n     @focusin=\\\"isActive = true\\\"\\r\\n     @focusout=\\\"isActive = false\\\"\\r\\n>\\r\\n  <div class=\\\"bbn-flex-width bbn-h-100\\\">\\r\\n    <div class=\\\"bbn-flex-fill\\\"\\r\\n         @click.stop=\\\"click\\\">\\r\\n      <input :disabled=\\\"isDisabled\\\"\\r\\n              class=\\\"bbn-unselectable bbn-textbox bbn-no-border bbn-abs bbn-top-left\\\"\\r\\n              @keydown.stop=\\\"keydownInput\\\"\\r\\n              ref=\\\"input\\\"\\r\\n              :required=\\\"required\\\"\\r\\n              readonly=\\\"readonly\\\"\\r\\n              :placeholder=\\\"filterString ? '' : placeholder\\\"\\r\\n              :tabindex=\\\"autocomplete || isDisabled || readonly ? -1 : 0\\\"\\r\\n              :value=\\\"filterString\\\">\\r\\n      <input bbn-if=\\\"autocomplete && !isDisabled && !readonly\\\"\\r\\n              tabindex=\\\"0\\\"\\r\\n              class=\\\"bbn-textbox bbn-no-border\\\"\\r\\n              bbn-model=\\\"filterString\\\"\\r\\n              ref=\\\"filter\\\"\\r\\n              @focus=\\\"selectText\\\"\\r\\n              autocomplete=\\\"off\\\"\\r\\n              :required=\\\"required\\\"\\r\\n              :readonly=\\\"readonly\\\"\\r\\n              @keydown.stop=\\\"keydownFilter\\\"\\r\\n              @change=\\\"ready = true\\\"\\r\\n              :name=\\\"name\\\">\\r\\n    </div>\\r\\n    <div>\\r\\n      <bbn-button :icon=\\\"'nf nf-fa-caret_' + (isOpened && !isDisabled && !readonly && filteredData.length ? 'up' : 'down')\\\"\\r\\n                  class=\\\"bbn-p bbn-button-right bbn-no-vborder\\\"\\r\\n                  @click.prevent.stop=\\\"click\\\"\\r\\n                  tabindex=\\\"-1\\\"\\r\\n                  :disabled=\\\"isDisabled\\\">\\r\\n      </bbn-button>\\r\\n    </div>\\r\\n  </div>\\r\\n  <input type=\\\"hidden\\\"\\r\\n         bbn-model=\\\"value\\\"\\r\\n         ref=\\\"element\\\"\\r\\n         :name=\\\"name\\\">\\r\\n  <bbn-floater bbn-if=\\\"!isDisabled && !readonly && isOpened\\\"\\r\\n               :element=\\\"$el\\\"\\r\\n               :max-height=\\\"maxHeight\\\"\\r\\n               :min-width=\\\"currentWidth\\\"\\r\\n               ref=\\\"list\\\"\\r\\n               :uid=\\\"sourceValue\\\"\\r\\n               :item-component=\\\"realComponent\\\"\\r\\n               @select=\\\"select\\\"\\r\\n               :selected=\\\"[value]\\\"\\r\\n               @close=\\\"isOpened = false\\\"\\r\\n               :source=\\\"filteredData\\\">\\r\\n  </bbn-floater>\\r\\n</div>\\r\\n\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/treedown/treedown.html?");

/***/ }),

/***/ "./src/components/treedown/treedown.less":
/*!***********************************************!*\
  !*** ./src/components/treedown/treedown.less ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_treedown_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./treedown.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/treedown/treedown.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_treedown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_treedown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_treedown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_treedown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/treedown/treedown.less?");

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

/***/ "./src/components/treedown/_i18n lazy recursive ^\\.\\/treedown\\..*\\.lang$":
/*!**********************************************************************************************!*\
  !*** ./src/components/treedown/_i18n/ lazy ^\.\/treedown\..*\.lang$ strict namespace object ***!
  \**********************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/treedown/_i18n lazy recursive ^\\\\.\\\\/treedown\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/treedown/_i18n/_lazy_^\\.\\/treedown\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/treedown/treedown.js":
/*!*********************************************!*\
  !*** ./src/components/treedown/treedown.js ***!
  \*********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _treedown_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./treedown.html */ \"./src/components/treedown/treedown.html\");\n/* harmony import */ var _treedown_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./treedown.less */ \"./src/components/treedown/treedown.less\");\n/**\r\n * @file bbn-dropdown component\r\n *\r\n * @description The easy-to-implement bbn-dropdown component allows you to choose a single value from a user-supplied list.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author BBN Solutions\r\n *\r\n * @created 10/02/2017.\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.input\r\n   * @mixin bbn.cp.mixins.resizer\r\n   * @mixin bbn.cp.mixins.list\r\n   * @mixin bbn.cp.mixins.keynav\r\n   * @mixin bbn.cp.mixins.url\r\n    */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.events, bbn.cp.mixins.input, bbn.cp.mixins.list, bbn.cp.mixins.keynav, bbn.cp.mixins.url],\n  props: {\n    /**\r\n     * @prop {String} [''] textValue\r\n     */\n    textValue: {\n      type: String,\n      default: ''\n    },\n    /**\r\n     * @prop {Number} [0] minLength\r\n     */\n    minLength: {\n      type: Number,\n      default: 0\n    },\n    /**\r\n     * A component for each element of the list.\r\n     *\r\n     * @prop component\r\n     */\n    component: {},\n    /**\r\n     * The template to costumize the dropdown menu.\r\n     *\r\n     * @prop template\r\n     */\n    template: {},\n    /**\r\n     * @todo description\r\n     *\r\n     * @prop valueTemplate\r\n     */\n    valueTemplate: {},\n    /**\r\n     * Defines the groups for the dropdown menu.\r\n     * @prop {String} group\r\n     */\n    group: {\n      type: String\n    },\n    /**\r\n     * Set to true so that the dropdown is not autofilled if empty\r\n     * @prop {Boolean} nullable\r\n     */\n    nullable: {\n      default: null\n    },\n    /**\r\n     * The placeholder of the dropdown.\r\n     *\r\n     * @prop {String} placeholder\r\n     */\n    placeholder: {\n      type: String\n    },\n    /**\r\n     * @prop {String} ['selection'] mode\r\n     */\n    mode: {\n      type: String,\n      default: 'selection'\n    },\n    /**\r\n     * @prop {Boolean} [false] autocomplete\r\n     */\n    autocomplete: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * @prop {Number} [500] delay\r\n     */\n    delay: {\n      type: Number,\n      default: 500\n    },\n    /**\r\n     * @prop {(Number|String)} maxHeight\r\n     */\n    maxHeight: {\n      type: [Number, String]\n    }\n  },\n  data() {\n    let isNullable = !!this.nullable;\n    if (this.nullable === null) {\n      isNullable = this.required ? false : !!this.placeholder;\n    }\n    let cp = this.component || null;\n    if (!cp && this.template) {\n      cp = {\n        props: ['source'],\n        data() {\n          return this.source;\n        },\n        template: this.template\n      };\n    }\n    let autobind = true;\n    if (this.autobind === false || this.isAjax && this.autocomplete && this.filterString.length < this.minLength) {\n      autobind = false;\n    }\n    return {\n      /**\r\n       * @data {String} [''] filterString\r\n       */\n      filterString: this.textValue || '',\n      /**\r\n       * @data {Boolean} [false] isOpened\r\n       */\n      isOpened: false,\n      /**\r\n       * @data {String} [''] currentText\r\n       */\n      currentText: this.textValue || '',\n      /**\r\n       * @data {Number} [0] currentWidth\r\n       */\n      currentWidth: 0,\n      /**\r\n       * @data {Number} [0] currentHeight\r\n       */\n      currentHeight: 0,\n      isFilterable: true,\n      filterTimeout: false,\n      isActive: false\n    };\n  },\n  computed: {\n    currentTextValue() {\n      if (this.value && this.mode === 'free') {\n        return this.value;\n      }\n      if (this.value && this.sourceText && this.currentData.length) {\n        let idx = bbn.fn.search(this.currentData, a => {\n          return a.data[this.uid || this.sourceValue] === this.value;\n        });\n        if (idx > -1) {\n          return this.currentData[idx].data[this.sourceText];\n        }\n      } else if (this.textValue) {\n        return this.textValue;\n      }\n      return '';\n    }\n  },\n  methods: {\n    selectText() {\n      let filter = this.getRef('filter');\n      if (filter) {\n        filter.setSelectionRange(0, filter.value.length);\n      }\n    },\n    /**\r\n     * Handles the resize of the component\r\n     * @method onResize\r\n     */\n    onResize() {\n      this.currentWidth = this.$el.offsetWidth;\n      this.currentHeight = this.$el.offsetHeight;\n    },\n    /**\r\n     * @method enter\r\n     * @param element \r\n     */\n    enter(element) {\n      const height = bbn.fn.calculateHeight(element);\n      element.style.height = 0;\n      setTimeout(() => {\n        element.style.height = height;\n      });\n    },\n    click() {\n      if (!this.isDisabled && this.filteredData.length) {\n        this.isOpened = !this.isOpened;\n        if (this.autocomplete) {\n          this.getRef('filter').focus();\n        } else {\n          this.getRef('input').focus();\n        }\n      }\n    },\n    /**\r\n     * @method leave\r\n     * @param element \r\n     */\n    leave() {\n      if (this.isOpened && !this.getRef('list').isOver) {\n        this.isOpened = false;\n        //this.getRef('list').close();\n      }\n      /*\r\n      if ( this.filterString && (this.filterString !== this.currentText) ){\r\n        this.filterString = '';\r\n      }\r\n      */\n    },\n    /**\r\n     * Emits the event 'select' \r\n     * @method select\r\n     * @param {} item \r\n     * @emit change\r\n     */\n    select(item) {\n      if (item && item[this.uid || this.sourceValue] !== undefined) {\n        this.emitInput(item[this.uid || this.sourceValue]);\n        this.$emit('change', item[this.uid || this.sourceValue]);\n        if (this.autocomplete && this.isAjax) {\n          this.$nextTick(() => {\n            this.currentData = [{\n              index: 0,\n              data: item,\n              selected: true\n            }];\n            this.currentText = item[this.sourceText];\n            this.filterString = item[this.sourceText];\n            this.$nextTick(() => {\n              this.getRef('filter').focus();\n              this.selectText();\n            });\n          });\n        }\n      }\n      this.isOpened = false;\n    },\n    commonKeydown(e) {\n      if (!this.filteredData.length || e.altKey || e.ctrlKey || e.metaKey) {\n        return;\n      }\n      if (e.key === 'Tab') {\n        let list = this.find('bbn-list');\n        if (list.overIdx > -1) {\n          if (this.mode === 'free') {\n            this.filterString = list.filteredData[list.overIdx].data[this.uid || this.sourceValue];\n            return true;\n          }\n          if (!this.value) {\n            this.emitInput(list.filteredData[list.overIdx].data[this.uid || this.sourceValue]);\n            return true;\n          }\n        }\n        this.resetDropdown();\n        return true;\n      } else if (this.isOpened && (bbn.var.keys.confirm.includes(e.which) || !this.autocomplete && e.key === ' ')) {\n        e.preventDefault();\n        let list = this.find('bbn-list');\n        if (list.overIdx > -1) {\n          this.select(list.filteredData[list.overIdx].data);\n        } else if (this.isNullable) {\n          this.selfEmit('');\n        }\n        return true;\n      }\n      return false;\n    },\n    resetDropdown() {\n      this.currentText = this.currentTextValue;\n      if (this.autocomplete) {\n        this.filterString = this.currentTextValue;\n      }\n      this.unfilter();\n      if (this.isOpened) {\n        this.isOpened = false;\n      }\n    },\n    /**\r\n     * States the role of the enter key on the dropdown menu.\r\n     *\r\n     * @method _pressEnter\r\n     * @fires widget.select\r\n     * @fires widget.open\r\n     *\r\n     */\n    keydownInput(e) {\n      if (this.commonKeydown(e)) {\n        return;\n      } else if (e.key === 'Escape' || bbn.var.keys.dels.includes(e.which)) {\n        this.resetDropdown();\n      } else if (bbn.var.keys.upDown.includes(e.keyCode)) {\n        this.keynav(e);\n      } else if (e.key === ' ') {\n        this.isOpened = !this.isOpened;\n      } else if (e.key.match(/^[A-z0-9]{1}$/)) {\n        this.currentFilters.conditions.splice(0, this.currentFilters.conditions.length ? 1 : 0, {\n          field: this.sourceText,\n          operator: 'startswith',\n          value: e.key\n        });\n        if (!this.isOpened) {\n          this.isOpened = true;\n        }\n      }\n    },\n    keydownFilter(e) {\n      if (this.commonKeydown(e)) {\n        return;\n      } else if (e.key === 'Escape') {\n        this.resetDropdown();\n      } else if (bbn.var.keys.upDown.includes(e.keyCode)) {\n        this.keynav(e);\n      }\n    },\n    afterUpdate() {\n      if (!this.ready) {\n        this.ready = true;\n      }\n      this.onResize();\n      let floater = this.getRef('list');\n      if (floater.currentSelected === -1) {\n        floater.currentSelected = 0;\n      }\n    },\n    unfilter() {\n      this.currentFilters.conditions.splice(0, this.currentFilters.conditions.length);\n    }\n  },\n  /**\r\n   *\r\n   * @event created\r\n   */\n  created() {\n    this.$on('dataloaded', () => {\n      if (this.value !== undefined) {\n        let row = bbn.fn.getRow(this.currentData, a => {\n          return a.data[this.sourceValue] === this.value;\n        });\n        if (row) {\n          this.currentText = row.data[this.sourceText];\n        }\n      }\n      if (!this.currentText && !this.isNullable && this.filteredData.length) {\n        this.emitInput(this.filteredData[0][this.sourceValue]);\n      }\n    });\n    if (this.filterString && this.filterString.length >= this.minLength) {\n      this.currentFilters.conditions.splice(0, this.currentFilters.conditions.length ? 1 : 0, {\n        field: this.sourceText,\n        operator: 'startswith',\n        value: this.filterString\n      });\n    }\n  },\n  watch: {\n    /**\r\n     * @watch value\r\n     * @param newVal\r\n     */\n    value() {\n      this.$nextTick(() => {\n        this.currentText = this.currentTextValue;\n      });\n    },\n    /**\r\n     * @watch filterString\r\n     * @param {String} v\r\n     */\n    filterString(v) {\n      if (!this.autocomplete) {\n        return;\n      }\n      if (!this.ready) {\n        this.ready = true;\n      }\n      if (this.mode === 'free') {\n        this.emitInput(v);\n      }\n      clearTimeout(this.filterTimeout);\n      // if (v !== this.currentText) {\n      this.isOpened = false;\n      this.filterTimeout = setTimeout(() => {\n        this.filterTimeout = false;\n        if (this.isActive) {\n          if (v && v.length >= this.minLength) {\n            this.currentFilters.conditions.splice(0, this.currentFilters.conditions.length ? 1 : 0, {\n              field: this.sourceText,\n              operator: 'startswith',\n              value: v\n            });\n            this.$nextTick(() => {\n              if (!this.isOpened) {\n                this.isOpened = true;\n              } else {\n                let list = this.find('bbn-scroll');\n                if (list) {\n                  list.onResize();\n                }\n              }\n            });\n          } else {\n            this.unfilter();\n          }\n        }\n      }, this.delay);\n      // }\n      // else if ( !v ){\n      //   this.unfilter();\n      // }\n    },\n    source() {\n      this.$once('dataloaded', () => {\n        if (this.filteredData.length) {\n          this.onResize();\n        }\n      });\n      this.updateData();\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/treedown/_i18n lazy recursive ^\\\\.\\\\/treedown\\\\..*\\\\.lang$\")(`./treedown.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-treedown',\n  definition: cpDef,\n  template: _treedown_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _treedown_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/treedown/treedown.js?");

/***/ })

}]);