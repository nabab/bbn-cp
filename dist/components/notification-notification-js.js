/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/notification-notification-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/notification/notification.less":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/notification/notification.less ***!
  \************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `/* LESS Document */\n.bbn-notification .bbn-floater.bbn-notification-transition {\n  transition: top left right bottom 0.5s ease-in-out !important;\n}\n.bbn-notification .bbn-notification-icon {\n  margin-right: 1rem;\n}\n.bbn-notification .bbn-notification-content {\n  white-space: nowrap;\n}\n.bbn-notification .bbn-notification-content > span {\n  white-space: normal;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/notification/notification.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/notification/notification.html":
/*!*******************************************************!*\
  !*** ./src/components/notification/notification.html ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"componentClass\">\n  <bbn-floater bbn-for=\"(it, idx) in items\"\n               :ref=\"'it' + it.id\"\n               :key=\"it.id\"\n               :focused=\"false\"\n               :container=\"\\$root.\\$el\"\n               :class=\"{\n                  'bbn-notification-transition': positions[it.id] !== undefined,\n                  'bbn-notification-closing': !!it.closing\n               }\"\n               :top=\"isTop && (positions[it.id] !== undefined) ? positions[it.id] : undefined\"\n               :bottom=\"isTop || (positions[it.id] === undefined) ? undefined : positions[it.id]\"\n               :left=\"isLeft ? 0 : undefined\"\n               :right=\"isLeft ? undefined : 0\"\n               :title=\"false\"\n               :scrollable=\"true\"\n               @resize=\"_updatePositions\"\n               @hook.destroy=\"_updatePositions\">\n    <div :class=\"{\n        'bbn-notification-content': true,\n        'bbn-block': true,\n        'bbn-unselectable': true,\n        'bbn-white': !!it.type,\n        'bbn-light': true,\n        'bbn-m': true,\n        'bbn-lpadded': true,\n        'bbn-bg-green': it.type === 'success',\n        'bbn-bg-orange': it.type === 'warning',\n        'bbn-bg-red': it.type === 'error',\n        'bbn-b': it.type === 'error',\n        'bbn-bg-blue': it.content && (it.type === 'info')\n    }\">\n      <span class=\"bbn-notification-icon bbn-iblock bbn-lg\"\n            bbn-if=\"it.icon\">\n        <i :class=\"[it.icon, it.type ? 'bbn-white' : 'bbn-black']\"/>\n      </span>\n      <span bbn-if=\"it.content\"\n            class=\"bbn-iblock\"\n            bbn-html=\"it.content\"/>\n      <span bbn-elseif=\"it.type === 'success'\"\n            class=\"bbn-iblock\"\n            bbn-html=\"successMessage\"/>\n      <span bbn-elseif=\"it.type === 'warning'\"\n            class=\"bbn-iblock\"\n            bbn-html=\"warningMessage\"/>\n      <span bbn-elseif=\"it.type === 'error'\"\n            class=\"bbn-iblock\"\n            bbn-html=\"errorMessage\"/>\n      <div bbn-if=\"it.num > 1\"\n           class=\"bbn-iblock bbn-top-left bbn-hsmargin bbn-vxsmargin\">\n        <span class=\"bbn-badge bbn-small bbn-bg-red\"\n              bbn-text=\"it.num\"/>\n      </div>\n      <div :class=\"{\n          'bbn-notification-closer': true,\n          'bbn-top-right': true,\n          'bbn-vxsmargin': true,\n          'bbn-hsmargin': true,\n          'bbn-p': true,\n          'bbn-white': !!it.type\n      }\"\n          @click=\"close(it.id, true)\">\n          <i class=\"bbn-lg nf nf-fa-times\"/>\n      </div>\n    </div>\n  </bbn-floater>\n</div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/notification/notification.html?");

/***/ }),

/***/ "./src/components/notification/notification.less":
/*!*******************************************************!*\
  !*** ./src/components/notification/notification.less ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_notification_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./notification.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/notification/notification.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_notification_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_notification_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_notification_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_notification_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/notification/notification.less?");

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

/***/ "./src/components/notification/_i18n lazy recursive ^\\.\\/notification\\..*\\.lang$":
/*!******************************************************************************************************!*\
  !*** ./src/components/notification/_i18n/ lazy ^\.\/notification\..*\.lang$ strict namespace object ***!
  \******************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./notification.fr.lang\": [\n\t\t\"./src/components/notification/_i18n/notification.fr.lang\",\n\t\t\"src_components_notification__i18n_notification_fr_lang\"\n\t],\n\t\"./notification.it.lang\": [\n\t\t\"./src/components/notification/_i18n/notification.it.lang\",\n\t\t\"src_components_notification__i18n_notification_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/notification/_i18n lazy recursive ^\\\\.\\\\/notification\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/notification/_i18n/_lazy_^\\.\\/notification\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/notification/notification.js":
/*!*****************************************************!*\
  !*** ./src/components/notification/notification.js ***!
  \*****************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _notification_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notification.html */ \"./src/components/notification/notification.html\");\n/* harmony import */ var _notification_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./notification.less */ \"./src/components/notification/notification.less\");\n/**\r\n * @file bbn-notification component\r\n * @description bbn-notification is a component that allows the display of a brief information message, for example to confirm the success of an action that has taken place.\r\n * @author BBN Solutions\r\n * @copyright BBN Solutions\r\n * @created 11/01/2017\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   */\n  mixins: [bbn.cp.mixins.basic],\n  props: {\n    /**\r\n     * @prop {Number}, [5000] delay\r\n     */\n    delay: {\n      type: Number,\n      default: 5000\n    },\n    /**\r\n     * @prop {String}, ['bottom-left'] position\r\n     */\n    position: {\n      type: String,\n      default: 'bottom-right'\n    },\n    /**\r\n     * @prop {String|Function}, ['Success'] successMessage\r\n     */\n    successMessage: {\n      type: [String, Function],\n      default() {\n        return bbn._('Success');\n      }\n    },\n    /**\r\n     * @prop {String|Function}, ['Warning'] warningMessage\r\n     */\n    warningMessage: {\n      type: [String, Function],\n      default() {\n        return bbn._('Warning');\n      }\n    },\n    /**\r\n     * @prop {String|Function}, ['Error'] errorMessage\r\n     */\n    errorMessage: {\n      type: [String, Function],\n      default() {\n        return bbn._('Error');\n      }\n    },\n    /**\r\n     * @prop {String|Function}, ['Info'] infoMessage\r\n     */\n    infoMessage: {\n      type: [String, Function],\n      default() {\n        return bbn._('Info');\n      }\n    },\n    /**\r\n     * @prop {String|Boolean}, ['nf nf-fa-check_square'] successIcon\r\n     */\n    successIcon: {\n      type: [String, Boolean],\n      default: 'nf nf-fa-check_square'\n    },\n    /**\r\n     * @prop {String|Boolean}, ['nf nf-fa-warning'] warningIcon\r\n     */\n    warningIcon: {\n      type: [String, Boolean],\n      default: 'nf nf-fa-warning'\n    },\n    /**\r\n     * @prop {String|Boolean}, ['nf nf-fa-exclamation_circle'] errorIcon\r\n     */\n    errorIcon: {\n      type: [String, Boolean],\n      default: 'nf nf-fa-exclamation_circle'\n    },\n    /**\r\n     * @prop {String|Boolean}, ['nf nf-mdi-information'] infoIcon\r\n     */\n    infoIcon: {\n      type: [String, Boolean],\n      default: 'nf nf-mdi-information'\n    },\n    /**\r\n     * The source of the component.\r\n     * @prop {Array} [[]] source\r\n     */\n    source: {\n      type: Array,\n      default() {\n        return [];\n      }\n    },\n    /**\r\n     * @prop {Number} [10] zIndex\r\n     */\n    zIndex: {\n      type: Number,\n      default: 10\n    }\n  },\n  data() {\n    let bits = this.position.split('-');\n    let pos = {\n      v: {\n        top: false,\n        bottom: true\n      },\n      h: {\n        left: false,\n        right: true\n      }\n    };\n    bbn.fn.each(bits, bit => {\n      bbn.fn.iterate(pos, (o, dir) => {\n        if (o[bit.toLowerCase()] !== undefined) {\n          bbn.fn.iterate(o, (b, k) => {\n            if (bit === k) {\n              pos[dir][k] = true;\n            } else {\n              pos[dir][k] = false;\n            }\n          });\n        }\n      });\n    });\n    return {\n      /**\r\n       * @data {Array} [[]] items\r\n       */\n      items: this.source,\n      /**\r\n       * @data {Boolean} isTop\r\n       */\n      isTop: pos.v.top,\n      /**\r\n       * @data {Boolean} isLeft\r\n       */\n      isLeft: pos.h.left,\n      /**\r\n       * @data {Object} [{}] positions\r\n       */\n      positions: {}\n    };\n  },\n  methods: {\n    /**\r\n     * @method _sanitize\r\n     * @param {Object} obj\r\n     * @param {String} type\r\n     * @param {Number} timeout\r\n     * @return {Object}\r\n     */\n    _sanitize(obj, type, timeout) {\n      if (!bbn.fn.isObject(obj) || !obj.id) {\n        if (typeof obj === 'string') {\n          obj = {\n            content: obj\n          };\n        } else if (!obj) {\n          obj = {};\n        }\n        if (!obj.type) {\n          if (type) {\n            obj.type = type;\n          } else {\n            //obj.type = 'info';\n          }\n        }\n        let id = new Date().getTime() + bbn.fn.randomString(10);\n        obj.id = id;\n        obj.num = 1;\n        if (!obj.content && this[type + 'Message']) {\n          obj.content = bbn.fn.isFunction(this[type + 'Message']) ? this[type + 'Message'](obj) : this[type + 'Message'];\n        }\n        if (!obj.content) {\n          obj.content = '';\n        }\n        if (timeout && !obj.delay) {\n          obj.delay = timeout > 500 ? timeout : timeout * 1000;\n        } else {\n          obj.pinned = true;\n        }\n        if (obj.icon !== false) {\n          if (obj.icon === undefined && obj.type && this[obj.type + 'Icon']) {\n            obj.icon = this[obj.type + 'Icon'];\n          }\n        }\n      }\n      return obj;\n    },\n    /**\r\n     * @method add\r\n     * \r\n     * @param {Object} o\r\n     */\n    add(o) {\n      o = this._sanitize(o);\n      let idx = bbn.fn.search(this.items, {\n        content: o.content,\n        type: o.type,\n        icon: o.icon\n      });\n      if (idx > -1) {\n        o.num += this.items[idx].num;\n        this.items.splice(idx, 1);\n      }\n      this.items.push(o);\n      this._updatePositions();\n      if (o.delay) {\n        setTimeout(() => {\n          this.close(o.id);\n        }, o.delay);\n      }\n    },\n    /**\r\n     * @method _updatePositions\r\n     * @fires getRef\r\n     */\n    _updatePositions() {\n      let p = {};\n      let pos = 0;\n      let ids = [];\n      bbn.fn.each(this.items, a => {\n        let cp = this.getRef('it' + a.id);\n        let s;\n        if (cp) {\n          s = cp.$el.getBoundingClientRect().height;\n        }\n        if (a.closing) {\n          p[a.id] = this.positions[a.id];\n        } else {\n          p[a.id] = pos;\n          if (s) {\n            pos += s;\n          }\n        }\n        ids.push(a.id);\n      });\n      bbn.fn.iterate(bbn.fn.diffObj(this.positions, p), (a, k) => {\n        if (a.type === 'updated') {\n          this.positions[k] = a.newData;\n        } else if (a.type === 'created') {\n          this.positions[k] = a.data;\n        } else if (a.type === 'deleted') {\n          delete this.positions[k];\n        }\n      });\n      this.$forceUpdate();\n    },\n    /**\r\n     * @method close\r\n     * @param {Number} id\r\n     */\n    close(id, callCallback) {\n      let idx = bbn.fn.search(this.items, {\n        id: id\n      });\n      if (idx > -1) {\n        if (callCallback && this.items[idx].onClose && bbn.fn.isFunction(this.items[idx].onClose)) {\n          this.items[idx].onClose(this.items[idx]);\n        }\n        this.items.splice(idx, 1);\n        this._updatePositions();\n      }\n    },\n    /**\r\n     * @method success\r\n     * @param {Object} o\r\n     * @param {Number} timeout\r\n     * @fires _sanitize\r\n     * @fires add\r\n     */\n    success(o, timeout) {\n      if (!timeout) {\n        timeout = this.delay;\n      }\n      o = this._sanitize(o, 'success', timeout);\n      this.add(o);\n    },\n    /**\r\n     * @method error\r\n     * @param {Object} o\r\n     * @param {Number} timeout\r\n     * @fires _sanitize\r\n     * @fires add\r\n     */\n    error(o, timeout) {\n      o = this._sanitize(o, 'error', timeout);\n      this.add(o);\n    },\n    /**\r\n     * @method warning\r\n     * @param {Object} o\r\n     * @param {Number} timeout\r\n     * @fires _sanitize\r\n     * @fires add\r\n     */\n    warning(o, timeout) {\n      o = this._sanitize(o, 'warning', timeout);\n      this.add(o);\n    },\n    /**\r\n     * @method show\r\n     * @param {Object} o\r\n     * @param {String} type\r\n     * @param {Number} timeout\r\n     * @fires _sanitize\r\n     * @fires add\r\n     */\n    show(o, type, timeout) {\n      o = this._sanitize(o, type, timeout);\n      this.add(o);\n    },\n    /**\r\n     * @method info\r\n     * @param {Object} o\r\n     * @param {Number} timeout\r\n     * @fires _sanitize\r\n     * @fires add\r\n     */\n    info(o, timeout) {\n      o = this._sanitize(o, 'info', timeout);\n      this.add(o);\n    }\n  },\n  /**\r\n   * @event beforeMount\r\n   * @fires _updatePositions\r\n   */\n  beforeMount() {\n    this._updatePositions();\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/notification/_i18n lazy recursive ^\\\\.\\\\/notification\\\\..*\\\\.lang$\")(`./notification.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-notification',\n  definition: cpDef,\n  template: _notification_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _notification_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/notification/notification.js?");

/***/ })

}]);