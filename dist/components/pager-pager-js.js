/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/pager-pager-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/pager/pager.less":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/pager/pager.less ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-pager {\n  line-height: 2rem;\n  padding: 0.333rem 0.25rem;\n}\n.bbn-pager .bbn-pager-mobile-icon {\n  vertical-align: middle;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/pager/pager.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/pager/_i18n lazy recursive ^\\.\\/pager\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/pager/_i18n/ lazy ^\.\/pager\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./pager.fr.lang\": [\n\t\t\"./src/components/pager/_i18n/pager.fr.lang\",\n\t\t\"src_components_pager__i18n_pager_fr_lang\"\n\t],\n\t\"./pager.it.lang\": [\n\t\t\"./src/components/pager/_i18n/pager.it.lang\",\n\t\t\"src_components_pager__i18n_pager_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/pager/_i18n lazy recursive ^\\\\.\\\\/pager\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/pager/_i18n/_lazy_^\\.\\/pager\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/pager/pager.html":
/*!*****************************************!*\
  !*** ./src/components/pager/pager.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div bbn-show=\"element && (numPages || extraControls)\"\n\t\t :class=\"[componentClass, 'bbn-widget', 'bbn-unselectable', 'bbn-w-100']\">\n\t<div :class=\"{'bbn-flex-width': !isMobile}\">\n\t\t<div :class=\"{\n\t\t\t\t\t'bbn-w-100': isMobile,\n\t\t\t\t\t'bbn-flex-fill': !isMobile,\n\t\t\t\t\t'bbn-c': isMobile && !isTablet\n\t\t\t\t}\">\n\t\t\t<template bbn-if=\"numPages && element?.pageable\">\n\t\t\t\t<!-- 1ST BUTTON (FIRST) -->\n\t\t\t\t<bbn-button icon=\"nf nf-fa-angle_double_left\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\t:label=\"_('Go to the first %s', pageName)\"\n\t\t\t\t\t\t\t\t\t\t:disabled=\"currentPage <= 2\"\n\t\t\t\t\t\t\t\t\t\t@click=\"firstPage\"\n\t\t\t\t\t\t\t\t\t\tbbn-if=\"buttons\"/>\n\t\t\t\t<!-- OR 1ST ICON -->\n\t\t\t\t<span bbn-else\n\t\t\t\t\t\t\tclass=\"bbn-iblock bbn-hxspadding bbn-p bbn-pager-mobile-icon\"\n\t\t\t\t\t\t\t@click=\"firstPage\"\n\t\t\t\t\t\t\t:style=\"{visibility: currentPage <= 2 ? 'hidden' : 'visible'}\">\n\t\t\t\t\t<i class=\"nf nf-fa-angle_double_left bbn-xl bbn-pager-mobile-icon\"/>\n\t\t\t\t</span>\n\t\t\t\t<!-- 2ND BUTTON (PREVIOUS) -->\n\t\t\t\t<bbn-button icon=\"nf nf-fa-angle_left\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Go to the previous %s', pageName)\"\n\t\t\t\t\t\t\t\t\t\t:disabled=\"currentPage == 1\"\n\t\t\t\t\t\t\t\t\t\t@click=\"prevPage\"\n\t\t\t\t\t\t\t\t\t\tbbn-if=\"buttons\"/>\n\t\t\t\t<!-- OR 2ND ICON (PREVIOUS) -->\n\t\t\t\t<span bbn-else\n\t\t\t\t\t\t\tclass=\"bbn-iblock bbn-hxspadding bbn-p bbn-pager-mobile-icon\"\n\t\t\t\t\t\t\t@click=\"prevPage\"\n\t\t\t\t\t\t\t:style=\"{visibility: currentPage == 1 ? 'hidden' : 'visible'}\">\n\t\t\t\t\t<i class=\"nf nf-fa-angle_left bbn-xl bbn-pager-mobile-icon\"/>\n\t\t\t\t</span>\n\t\t\t\t<!-- PAGE + NUMERIC SELECTOR -->\n\t\t\t\t<span class=\"bbn-iblock\" bbn-text=\"pageName\"/>\n\t\t\t\t<bbn-numeric bbn-if=\"numericSelector\"\n\t\t\t\t\t\t\t\t\t\tbbn-model=\"currentNumericPage\"\n\t\t\t\t\t\t\t\t\t\t:min=\"1\"\n\t\t\t\t\t\t\t\t\t\t:max=\"element.numPages\"\n\t\t\t\t\t\t\t\t\t\tclass=\"bbn-narrower bbn-right-sspace\"\n\t\t\t\t\t\t\t\t\t\t:disabled=\"!!element.isLoading\"\n\t\t\t\t\t\t\t\t\t\t:readonly=\"element.numPages == 1\"/>\n\t\t\t\t<span bbn-else\n\t\t\t\t\t\t\tclass=\"bbn-iblock bbn-right-xsspace\"\n\t\t\t\t\t\t\tbbn-text=\"currentPage\"/>\n\t\t\t\t<!-- OF TOTAL -->\n\t\t\t\t<span class=\"bbn-iblock bbn-right-xsspace\"\n\t\t\t\t\t\t\tbbn-text=\"_('of') + ' ' + element.numPages\"/>\n\t\t\t\t<!-- 3RD BUTTON (NEXT) -->\n\t\t\t\t<bbn-button icon=\"nf nf-fa-angle_right\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Go to the next %s', pageName)\"\n\t\t\t\t\t\t\t\t\t\t:disabled=\"currentPage == element.numPages\"\n\t\t\t\t\t\t\t\t\t\t@click=\"nextPage\"\n\t\t\t\t\t\t\t\t\t\tbbn-if=\"buttons\"/>\n\t\t\t\t<!-- OR 3RD ICON (NEXT) -->\n\t\t\t\t<span bbn-else\n\t\t\t\t\t\t\tclass=\"bbn-iblock bbn-hxspadding bbn-p bbn-pager-mobile-icon\"\n\t\t\t\t\t\t\t@click=\"nextPage\"\n\t\t\t\t\t\t\t:style=\"{visibility: currentPage == element.numPages ? 'hidden' : 'visible'}\">\n\t\t\t\t\t<i class=\"nf nf-fa-angle_right bbn-xl bbn-pager-mobile-icon\"/>\n\t\t\t\t</span>\n\t\t\t\t<!-- 4TH BUTTON (LAST) -->\n\t\t\t\t<bbn-button icon=\"nf nf-fa-angle_double_right\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Go to the last %s', pageName)\"\n\t\t\t\t\t\t\t\t\t\t@click=\"lastPage\"\n\t\t\t\t\t\t\t\t\t\t:disabled=\"currentPage >= element.numPages - 1\"\n\t\t\t\t\t\t\t\t\t\tbbn-if=\"buttons\"/>\n\t\t\t\t<!-- OR 4TH ICON (LAST) -->\n\t\t\t\t<span bbn-else\n\t\t\t\t\t\t\tclass=\"bbn-iblock bbn-hxspadding bbn-p bbn-pager-mobile-icon\"\n\t\t\t\t\t\t\t@click=\"lastPage\"\n\t\t\t\t\t\t\t:style=\"{visibility: currentPage >= element.numPages - 1 ? 'hidden' : 'visible'}\">\n\t\t\t\t\t<i class=\"nf nf-fa-angle_double_right bbn-xl bbn-pager-mobile-icon\"/>\n\t\t\t\t</span>\n\t\t\t\t<span bbn-if=\"(element?.limits?.length > 1) &&\n\t\t\t\t\t\t\t\t\t\t(!isMobile || isTablet) &&\n\t\t\t\t\t\t\t\t\t\t!!limit\"\n\t\t\t\t\t\t\tclass=\"bbn-hmargin\">\n\t\t\t\t\t<bbn-dropdown :source=\"element.limits\"\n\t\t\t\t\t\t\t\t\t\t\t\tbbn-model.number=\"element.currentLimit\"\n\t\t\t\t\t\t\t\t\t\t\t\t@change=\"currentPage = 1\"\n\t\t\t\t\t\t\t\t\t\t\t\t:disabled=\"!!element.isLoading\"\n\t\t\t\t\t\t\t\t\t\t\t\t:autosize=\"true\"/>\n\t\t\t\t\t<span bbn-text=\"itemName + ' ' + _('per') + ' ' + pageName\"/>\n\t\t\t\t</span>\n\t\t\t</template>\n\t\t</div>\n\t\t<div bbn-if=\"element && extraControls\"\n\t\t\t\t:class=\"{\n\t\t\t\t\t'bbn-block': !isMobile || isTablet,\n\t\t\t\t\t'bbn-flex-width': isMobile && !isTablet,\n\t\t\t\t\t'bbn-top-xsspace': isMobile && !isTablet && element.pageable && element.currentData.length,\n\t\t\t\t\t'bbn-vmiddle': isMobile && !isTablet\n\t\t\t\t}\"\n\t\t\t\t:style=\"{\n\t\t\t\t\tfloat: !isMobile || isTablet ? 'right' : 'left',\n\t\t\t\t\tjustifyContent: isMobile && !isTablet ? 'flex-end' : ''\n\t\t\t\t}\">\n\t\t\t<div bbn-if=\"element.limits?.length &&\n\t\t\t\t\t\t\t\tisMobile &&\n\t\t\t\t\t\t\t\t!isTablet &&\n\t\t\t\t\t\t\t\telement.pageable &&\n\t\t\t\t\t\t\t\telement.currentData.length\"\n\t\t\t\t\tclass=\"bbn-right-space bbn-flex-fill bbn-vmiddle\">\n\t\t\t\t<bbn-dropdown :source=\"element.limits\"\n\t\t\t\t\t\t\t\t\t\t\tbbn-model.number=\"limit\"\n\t\t\t\t\t\t\t\t\t\t\t@change=\"currentPage = 1\"\n\t\t\t\t\t\t\t\t\t\t\t:disabled=\"!!element.isLoading\"\n\t\t\t\t\t\t\t\t\t\t\t:autosize=\"true\"/>\n\t\t\t</div>\n\t\t\t<div>\n\t\t\t\t<span bbn-if=\"element.filteredData.length &&\n\t\t\t\t\t\t\t\t\t\telement.pageable && element.isAjax\"\n\t\t\t\t\t\t\tbbn-text=\"(element.start+1) + (element.currentLimit <= 1 ? '' : '-' + (element.start + element.currentLimit > element.total ? element.total : element.start + element.currentLimit)) + ' / ' + element.total\"\n\t\t\t\t></span>\n\t\t\t\t<span bbn-elseif=\"element.filteredData.length &&\n\t\t\t\t\t\t\t\t\t\t\t\telement.pageable && !element.isAjax\"\n\t\t\t\t\t\t\tbbn-text=\"(element.start+1) + '-' + (element.start + element.currentLimit > element.filteredData.length ? element.filteredData.length : element.start + element.currentLimit) + ' ' + _('of') + ' ' + element.filteredData.length\"\n\t\t\t\t></span>\n\t\t\t\t<span bbn-elseif=\"!isMobile || isTablet\"\n\t\t\t\t\t\t\tbbn-text=\"element.total ? _('Total') + ': ' + element.total + ' ' + _('items') : _('No item')\"\n\t\t\t\t></span>\n\t\t\t\t<span bbn-else>\n\t\t\t\t\t<i class=\"nf nf-fa-hashtag bbn-m bbn-right-sspace\"></i><span bbn-text=\"element.total\"></span>\n\t\t\t\t</span>\n\t\t\t\t&nbsp;\n\t\t\t\t<bbn-button bbn-if=\"element.currentQuery && element.showQuery\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('View SQL query')\"\n\t\t\t\t\t\t\t\t\t\t@click=\"element ? element.showQuery() : () => {}\"\n\t\t\t\t\t\t\t\t\t\ticon=\"nf nf-md-database\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\tclass=\"bbn-left-xsspace\"/>\n\t\t\t\t<bbn-button bbn-if=\"element.saveable\"\n\t\t\t\t\t\t\t\t\t\t:disabled=\"element.isSaved\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Save current configuration')\"\n\t\t\t\t\t\t\t\t\t\t@click=\"onClickSave\"\n\t\t\t\t\t\t\t\t\t\ticon=\"nf nf-fa-save\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\tclass=\"bbn-left-xsspace\"/>\n\t\t\t\t<bbn-button bbn-if=\"(element.filterable || element.showable) && element.reset\"\n\t\t\t\t\t\t\t\t\t\t:disabled=\"!element.isChanged\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Reset to original configuration')\"\n\t\t\t\t\t\t\t\t\t\t@click=\"element ? element.reset(false) : () => {}\"\n\t\t\t\t\t\t\t\t\t\ticon=\"nf nf-fa-undo\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\tclass=\"bbn-left-xsspace\"/>\n\t\t\t\t<bbn-button bbn-if=\"element.showable && element.openColumnsPicker\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Columns\\\\' picker')\"\n\t\t\t\t\t\t\t\t\t\t@click=\"element ? element.openColumnsPicker() : () => {}\"\n\t\t\t\t\t\t\t\t\t\ticon=\"nf nf-fa-columns\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\tclass=\"bbn-left-xsspace\"/>\n\t\t\t\t<bbn-button bbn-if=\"element.filterable &&\n\t\t\t\t\t\t\t\t\t\t\t\t\telement.multifilter &&\n\t\t\t\t\t\t\t\t\t\t\t\t\telement.openMultiFilter\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Multi Filter')\"\n\t\t\t\t\t\t\t\t\t\t:class=\"[\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t'bbn-left-xsspace',\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t{'bbn-red': element.currentFilters && element.currentFilters.conditions.length ? true : false}\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t]\"\n\t\t\t\t\t\t\t\t\t\t@click=\"element ? element.openMultiFilter() : () => {}\"\n\t\t\t\t\t\t\t\t\t\ticon=\"nf nf-md-filter_variant\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"/>\n\t\t\t\t<bbn-button bbn-if=\"element.isAjax && element.updateData\"\n\t\t\t\t\t\t\t\t\t\t:title=\"_('Refresh')\"\n\t\t\t\t\t\t\t\t\t\t@click=\"element ? element.updateData() : () => {}\"\n\t\t\t\t\t\t\t\t\t\ticon=\"nf nf-fa-refresh\"\n\t\t\t\t\t\t\t\t\t\t:notext=\"true\"\n\t\t\t\t\t\t\t\t\t\tclass=\"bbn-left-xsspace\"/>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/pager/pager.html?");

/***/ }),

/***/ "./src/components/pager/pager.js":
/*!***************************************!*\
  !*** ./src/components/pager/pager.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _pager_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pager.html */ \"./src/components/pager/pager.html\");\n/* harmony import */ var _pager_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pager.less */ \"./src/components/pager/pager.less\");\n/**\n * @file bbn-pager component\n * @description bbn-pager is a component to manage the pagination of a pageable component.\n * @author BBN Solutions\n * @copyright BBN Solutions\n */\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   */\n  mixins: [bbn.cp.mixins.basic],\n  props: {\n    /**\n     * The element to bond with\n     * @props {HTMLElement} element\n     */\n    element: {\n      type: [Object, HTMLElement],\n      default() {\n        //bbn.fn.log(\"ELEMENT ON TABLE\", this);\n        return this.$parent;\n      }\n    },\n    /**\n     * False if you wanto to see the arrows instead of the buttons\n     * @prop {Boolean} [true] buttons\n     */\n    buttons: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Force to render as mobile\n     * @prop {Boolean} [false] forceMobile\n     */\n    forceMobile: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Force to render as tablet\n     * @prop {Boolean} [false] forceTablet\n     */\n    forceTablet: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * The name of the `page` word as used in the pager interface.\n     * @prop {String} ['Page'] pageName\n     */\n    pageName: {\n      type: String,\n      default() {\n        return bbn._(\"page\");\n      }\n    },\n    /**\n     * The name of the `record` word as used in the pager interface.\n     * @prop {String} ['Record(s)'] itemName\n     */\n    itemName: {\n      type: String,\n      default() {\n        return bbn._(\"records\");\n      }\n    },\n    /**\n     * The extra controls part on the right.\n     * @prop {Boolean} [true] extraControls\n     */\n    extraControls: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * False if you wanto to hide the limit selector\n     * @prop {Boolean} [true] limit\n     */\n    limit: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Shows the bbn-numeric field for selecting the page\n     * @prop {Boolean} [true] numericSelector\n     */\n    numericSelector: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data() {\n    return {\n      numericTimeout: false,\n      currentNumericPage: this.element?.currentPage || 1\n    };\n  },\n  computed: {\n    currentPage: {\n      get() {\n        return this.element?.currentPage;\n      },\n      set(v) {\n        if (this.element) {\n          this.element.currentPage = v;\n        }\n      }\n    },\n    numPages: {\n      get() {\n        return this.element?.numPages;\n      }\n    }\n  },\n  methods: {\n    onClickSave() {\n      if (this.element) {\n        if (bbn.fn.isFunction(this.element.onSave)) {\n          this.element.onSave();\n        } else {\n          this.element.$emit('save', this.element.currentConfig);\n        }\n      }\n    },\n    updatePager() {\n      this.currentNumericPage = this.element.currentPage;\n    },\n    /**\n     * @method firstPage\n     */\n    firstPage() {\n      if (this.element && 'currentPage' in this.element && this.element.currentPage !== 1) {\n        this.element.currentPage = 1;\n      }\n    },\n    /**\n     * @method nextPage\n     */\n    nextPage() {\n      if (this.element && 'currentPage' in this.element && 'numPages' in this.element && this.element.currentPage < this.element.numPages) {\n        this.element.currentPage++;\n      }\n    },\n    /**\n     * @method prevPage\n     */\n    prevPage() {\n      if (this.element && 'currentPage' in this.element && this.element.currentPage > 1) {\n        this.element.currentPage--;\n      }\n    },\n    /**\n     * @method lastPage\n     */\n    lastPage() {\n      if (this.element && 'currentPage' in this.element && 'numPages' in this.element && this.element.currentPage !== this.element.numPages) {\n        this.element.currentPage = this.element.numPages;\n      }\n    },\n    updateData() {\n      this.element.updateData();\n    }\n  },\n  /**\n   * @event created\n   */\n  created() {\n    if (this.forceMobile) {\n      this.isMobile = true;\n    }\n    if (this.forceTablet) {\n      this.isTablet = true;\n    }\n  },\n  /**\n   * @event mounted\n   */\n  mounted() {\n    if (this.element && this.element instanceof HTMLElement) {\n      if (this.element.ready && !this.ready) {\n        this.ready = true;\n      } else {\n        this.element.$on('ready', () => {\n          this.ready = true;\n        });\n      }\n      this.element.$on('dataloaded', this.updatePager);\n    }\n  },\n  beforeDestroy() {\n    if (this.element) {\n      this.element.$off('dataloaded', this.updatePager);\n    }\n  },\n  watch: {\n    element(v, oldV) {\n      if (v && v instanceof HTMLElement) {\n        this.ready = true;\n      }\n    },\n    currentPage(v) {\n      //bbn.fn.log(\"CURRENT PAGE\", v);\n      if (this.currentNumericPage !== v) {\n        this.currentNumericPage = parseInt(v) || 1;\n      }\n    },\n    limit(v, ov) {\n      bbn.fn.log(\"LIMIT\", v, ov, this.element.currentLimit);\n\n      //bbn.fn.log(\"CURRENT PAGE\", v);\n      if (this.element.currentLimit !== v) {\n        this.currentPage = 1;\n        this.element.currentLimit = parseInt(v);\n        this.element.updateData();\n      }\n    },\n    currentNumericPage(v) {\n      //bbn.fn.log(\"CURRENT NUM PAGE\", v);\n      if (this.numericTimeout) {\n        clearTimeout(this.numericTimeout);\n      }\n      this.numericTimeout = setTimeout(() => {\n        if (this.currentPage != v) {\n          this.currentPage = v;\n        }\n      }, 250);\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/pager/_i18n lazy recursive ^\\\\.\\\\/pager\\\\..*\\\\.lang$\")(`./pager.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-pager',\n  definition: cpDef,\n  template: _pager_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _pager_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/pager/pager.js?");

/***/ }),

/***/ "./src/components/pager/pager.less":
/*!*****************************************!*\
  !*** ./src/components/pager/pager.less ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_pager_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./pager.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/pager/pager.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_pager_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_pager_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_pager_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_pager_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/pager/pager.less?");

/***/ })

}]);