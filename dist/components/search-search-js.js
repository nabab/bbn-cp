/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/search-search-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/search/search.less":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/search/search.less ***!
  \************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-search {\n  display: inline-block;\n  box-sizing: border-box;\n  cursor: pointer;\n}\n.bbn-search.bbn-search-autosize {\n  min-width: 4rem;\n}\n.bbn-search:hover .bbn-search-select-button:not(.bbn-disabled) {\n  opacity: 1;\n  background: none, linear-gradient(to bottom, var(--effect) 0%, rgba(255, 255, 255, 0) 100%) 50% 50% repeat var(--hover-background);\n}\n.bbn-search .bbn-search-container {\n  line-height: normal;\n  height: 100%;\n}\n.bbn-search .bbn-search-container.bbn-search-container-native {\n  min-width: 6rem;\n}\n.bbn-search .bbn-search-container .bbn-search-content {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.bbn-search .bbn-search-container .bbn-input,\n.bbn-search .bbn-search-container select {\n  background-color: transparent;\n  max-width: 100%;\n  width: 100%;\n  height: 100%;\n}\n.bbn-search .bbn-search-container .bbn-input div.bbn-flex-width,\n.bbn-search .bbn-search-container select div.bbn-flex-width {\n  height: 100%;\n  box-sizing: border-box;\n  /* \n        position: absolute;\n        top: 0px;\n        left: 0px;\n        bottom: 0px;\n        right: 0px;\n        overflow: hidden; */\n}\n.bbn-search .bbn-search-container .bbn-input div.bbn-flex-width .bbn-button,\n.bbn-search .bbn-search-container select div.bbn-flex-width .bbn-button {\n  font-size: 125%;\n  line-height: 100%;\n  margin: 0;\n}\n.bbn-search .bbn-search-container .bbn-input input,\n.bbn-search .bbn-search-container select input {\n  cursor: pointer;\n}\n.bbn-search .bbn-search-container select {\n  min-width: 4rem;\n  font-size: inherit;\n  font-weight: inherit;\n  border-radius: inherit;\n  color: inherit;\n  border: 0;\n  padding: 0.0833rem 0.25rem;\n  padding-right: 2.45rem;\n  box-sizing: border-box;\n  appearance: none;\n  -webkit-appearance: none;\n  z-index: 1;\n}\n.bbn-search .bbn-search-container .bbn-search-select-button {\n  min-width: 2rem;\n  opacity: 0.7;\n  z-index: 0;\n  min-height: 100%;\n  max-height: 100%;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/search/search.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/search/search.html":
/*!*******************************************!*\
  !*** ./src/components/search/search.html ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[\r\n       componentClass,\r\n       'bbn-iblock',\r\n       'bbn-textbox',\r\n       {'bbn-disabled': !!isDisabled}\r\n     ]\"\r\n     @mouseenter=\"isOverDropdown = true\"\r\n     @mouseleave=\"isOverDropdown = false\"\r\n     @focusin=\"isActive = true\"\r\n     @focusout=\"onFocusOut\">\r\n  <div :class=\"['bbn-rel', 'bbn-search-container', 'bbn-flex-width', 'bbn-vmiddle', currentItemCls, {\r\n    'bbn-search-container-native': native\r\n  }]\">\r\n    <div bbn-if=\"sourceIcon && hasValue && !!currentItemIcon\"\r\n         class=\"bbn-left-xspadded\">\r\n      <i :class=\"currentItemIcon\"\r\n         @click.stop=\"click\" />\r\n    </div>\r\n    <div bbn-if=\"sourceImg && hasValue && !!currentItemImg\"\r\n         class=\"bbn-left-xspadded\">\r\n      <img :src=\"currentItemImg\"\r\n           @click.stop=\"click\">\r\n    </div>\r\n    <bbn-input :tabindex=\"0\"\r\n               class=\"bbn-no-border bbn-i\"\r\n               bbn-model=\"filterString\"\r\n               ref=\"input\"\r\n               @focus=\"selectText\"\r\n               @blur=\"inputIsVisible = false\"\r\n               autocomplete=\"off\"\r\n               @keydown.stop=\"keydown\"\r\n               @change=\"onChange\"\r\n               :autosize=\"autosize\"\r\n               autocorrect=\"off\"\r\n               autocapitalize=\"off\"\r\n               spellcheck=\"false\"\r\n               :button-right=\"currentIcon\"\r\n               :button-right-disabled=\"!filteredData.length\"\r\n               :action-right=\"() => {isOpened = !isOpened}\"\r\n               :nullable=\"true\"\r\n               :placeholder=\"placeholder\"/>\r\n  </div>\r\n  <bbn-floater bbn-if=\"!popup\r\n                  && filteredData.length\r\n                  && !isDisabled\r\n                  && !native\r\n                  && ready\r\n                  && isOpened\"\r\n              bbn-portal=\"portalSelector && !isInsideFloater ? portalSelector : false\"\r\n              :element=\"asMobile ? undefined : \\$el\"\r\n              :max-height=\"asMobile ? undefined : maxHeight\"\r\n              :min-width=\"\\$el.clientWidth\"\r\n              :width=\"asMobile ? '100%' : undefined\"\r\n              :height=\"asMobile ? '100%' : undefined\"\r\n              ref=\"list\"\r\n              :children=\"null\"\r\n              :source-value=\"sourceValue\"\r\n              :source-text=\"sourceText\"\r\n              :source-url=\"sourceUrl\"\r\n              :source-icon=\"sourceIcon\"\r\n              :title=\"floaterTitle\"\r\n              :buttons=\"asMobile ? realButtons : []\"\r\n              :item-component=\"realComponent\"\r\n              @mouseenter=\"isOverDropdown = true\"\r\n              @mouseleave=\"isOverDropdown = false\"\r\n              @ready=\"attachList\"\r\n              @select=\"select\"\r\n              @close=\"isOpened = false\"\r\n              :source=\"filteredData\"/>\r\n</div>\r\n`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/search/search.html?");

/***/ }),

/***/ "./src/components/search/search.less":
/*!*******************************************!*\
  !*** ./src/components/search/search.less ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_search_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./search.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/search/search.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_search_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_search_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_search_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_search_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/search/search.less?");

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

/***/ "./src/components/search/_i18n lazy recursive ^\\.\\/search\\..*\\.lang$":
/*!******************************************************************************************!*\
  !*** ./src/components/search/_i18n/ lazy ^\.\/search\..*\.lang$ strict namespace object ***!
  \******************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/search/_i18n lazy recursive ^\\\\.\\\\/search\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/search/_i18n/_lazy_^\\.\\/search\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/search/search.js":
/*!*****************************************!*\
  !*** ./src/components/search/search.js ***!
  \*****************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _search_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./search.html */ \"./src/components/search/search.html\");\n/* harmony import */ var _search_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.less */ \"./src/components/search/search.less\");\n/**\r\n * @file bbn-search component\r\n * @description The search allows to select a single value from a list of items by proposeing suggestions based on the typed characters.\r\n * @copyright BBN Solutions\r\n * @author BBN Solutions\r\n * @created 10/02/2017.\r\n */\n\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.events\r\n   * @mixin bbn.cp.mixins.resizer\r\n   * @mixin bbn.cp.mixins.list\r\n   * @mixin bbn.cp.mixins.keynav\r\n   * @mixin bbn.cp.mixins.url\r\n   * @mixin bbn.cp.mixins.dropdown\r\n    */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.events, bbn.cp.mixins.resizer, bbn.cp.mixins.list, bbn.cp.mixins.keynav, bbn.cp.mixins.url, bbn.cp.mixins.dropdown],\n  props: {\n    /**\r\n     * For to apply the filters or not.\r\n     *\r\n     * @prop {Boolean} filterable\r\n     */\n    filterable: {\n      type: Boolean,\n      default: true\n    },\n    /**\r\n     * To define the length of the string to start the filter.\r\n     *\r\n     * @prop {Number} [0] minLength\r\n     */\n    minLength: {\n      type: Number,\n      default: 2\n    },\n    /**\r\n     * Specifies the time of delay.\r\n     *\r\n     * @prop {Number} [250] delay\r\n     */\n    delay: {\n      type: Number,\n      default: 250\n    },\n    /**\r\n     * Specifies the mode of the filter.\r\n     *\r\n     * @prop {String} ['startswith'] filterMode\r\n     */\n    filterMode: {\n      type: String,\n      default: 'contains'\n    },\n    /**\r\n     * Autobind defaults at false.\r\n     *\r\n     * @prop {Boolean} [false] autobind\r\n     */\n    autobind: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * Defines if the component has to be disabled.\r\n     * @prop {Boolean|Function} [false] disabled\r\n     */\n    disabled: {\n      type: [Boolean, Function],\n      default: false\n    },\n    /**\r\n     * Set it to true if you want to auto-resize the input's width based on its value (in characters).\r\n     * @prop {Boolean} [false] autosize\r\n     */\n    autosize: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * The placeholder.\r\n     * @prop {String} placeholder\r\n     */\n    placeholder: {\n      type: String\n    }\n  },\n  data() {\n    return {\n      /**\r\n       * Indicates if the filter input is visible\r\n       * @data {Boolean} [false] inputIsVisible\r\n       */\n      inputIsVisible: false,\n      isDisabled: this.disabled\n    };\n  },\n  methods: {\n    /**\r\n     * Shows the filter input\r\n     * @method _setInputVisible\r\n     */\n    _setInputVisible() {\n      this.filterString = this.currentText;\n      this.inputIsVisible = true;\n      this.$nextTick(() => {\n        this.getRef('input').focus();\n      });\n    },\n    onChange() {\n      if (!this.ready) {\n        this.ready = true;\n      }\n    },\n    /**\r\n     * Puts the focus on the element.\r\n     *\r\n     * @method click\r\n     * @fires getRef\r\n     */\n    click() {\n      if (!this.isDisabled) {\n        this.getRef('input').focus();\n        if (this.filteredData.length) {\n          this.isOpened = !this.isOpened;\n        }\n      }\n    },\n    /**\r\n     * Remove the filter and close the list if it is notabove it.\r\n     *\r\n     * @method leave\r\n     * @fires getRef\r\n     */\n    leave() {\n      if (this.isOpened && !this.getRef('list').isOver) {\n        this.isOpened = false;\n      }\n      this.inputIsVisible = false;\n      this.filterString = '';\n    },\n    /**\r\n     * Emits the event 'select'.\r\n     *\r\n     * @method select\r\n     * @param {Object} item\r\n     * @fires emitInput\r\n     * @fires getRef\r\n     * @emit change\r\n     */\n    select(item) {\n      if (item) {\n        if (this.sourceUrl && item[this.sourceUrl]) {\n          bbn.fn.link(item[this.sourceUrl]);\n        } else if (this.sourceAction && item[this.sourceAction] && bbn.fn.isFunction(item[this.sourceAction])) {\n          item[this.sourceAction](item);\n        } else {\n          this.$emit('select', item);\n        }\n        this.filterString = '';\n      }\n      this.isOpened = false;\n    },\n    /**\r\n     * Function to do the reset and if the component is open it closes it.\r\n     *\r\n     * @method resetDropdown\r\n     * @fires unfilter\r\n     */\n    resetDropdown() {\n      this.currentText = this.currentTextValue;\n      this.filterString = this.currentTextValue;\n      this.unfilter();\n      if (this.isOpened) {\n        this.isOpened = false;\n      }\n    },\n    /**\r\n     * Function that performs different actions based on what is being pressed.\r\n     *\r\n     * @method keydown\r\n     * @param {Event} e\r\n     * @fires resetDropdown\r\n     * @fires commonKeydown\r\n     * @fires keynav\r\n     */\n    keydown(e) {\n      if (this.commonKeydown(e)) {\n        return;\n      } else if (this.isOpened && e.key === 'Escape') {\n        e.stopPropagation();\n        e.preventDefault();\n        this.resetDropdown();\n        return;\n      } else if (bbn.var.keys.upDown.includes(e.keyCode)) {\n        this.keynav(e);\n      }\n    }\n  },\n  watch: {\n    disabled(v) {\n      this.isDisabled = v;\n    },\n    /**\r\n     * @watch filterString\r\n     * @fires onResize\r\n     * @fires unfilter\r\n     * @param {String} v\r\n     */\n    filterString(v) {\n      if (!this.ready) {\n        this.ready = true;\n      }\n      clearTimeout(this.filterTimeout);\n      //bbn.fn.log(\"CLEARED\")\n      if (!v && this.nullable && this.inputIsVisible) {\n        //bbn.fn.log(\"NO VALUE\")\n        this.unfilter();\n        this.emitInput(null);\n        this.currentText = '';\n        if (this.currentData.length) {\n          this.currentData.splice(0, this.currentData.length);\n        }\n      } else if (v) {\n        //bbn.fn.log(\"VALUE\")\n        if (v.length < this.minLength) {\n          if (this.currentData.length) {\n            this.currentData.splice(0, this.currentData.length);\n          }\n        } else if (v !== this.currentText) {\n          //bbn.fn.log(\"MIN PASSED\")\n          this.isOpened = false;\n          this.filterTimeout = setTimeout(() => {\n            // this.filterTimeout = false;\n            // We don't relaunch the source if the component has been left\n            if (this.isActive) {\n              //bbn.fn.log(\"UPDATING AUTOC\");\n              this.currentFilters.conditions.splice(0, this.currentFilters.conditions.length ? 1 : 0, {\n                field: this.sourceText,\n                operator: this.filterMode,\n                value: v\n              });\n              this.updateData().then(() => {\n                this.isOpened = true;\n              });\n            }\n          }, this.delay);\n        }\n      } else if (!v) {\n        this.unfilter();\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/search/_i18n lazy recursive ^\\\\.\\\\/search\\\\..*\\\\.lang$\")(`./search.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-search',\n  definition: cpDef,\n  template: _search_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _search_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/search/search.js?");

/***/ })

}]);