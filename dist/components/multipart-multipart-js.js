/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbbn_axios_dayjs"] = self["webpackChunkbbn_axios_dayjs"] || []).push([["components/multipart-multipart-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/multipart/multipart.less":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/multipart/multipart.less ***!
  \******************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, ``, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/multipart/multipart.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/components/multipart/multipart.html":
/*!*************************************************!*\
  !*** ./src/components/multipart/multipart.html ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[componentClass, 'bbn-overlay', 'bbn-flex-width']\\\">\\n  <div :class=\\\"['bbn-h-100', 'bbn-alt-background-internal', 'bbn-reactive', 'bbn-middle', 'bbn-unselectable', 'bbn-p', {'bbn-disabled': !hasPrev}]\\\"\\n       style=\\\"width: 10%; min-width: 10%\\\"\\n       @click=\\\"prev\\\">\\n    <div class=\\\"bbn-block bbn-xxxxl\\\">\\n      <i class=\\\"nf nf-fa-chevron_left\\\"></i>\\n    </div>\\n  </div>\\n  <div class=\\\"bbn-h-100 bbn-flex-fill\\\">\\n    <bbn-form :full-size=\\\"true\\\"\\n              v-bind=\\\"$options.propsData\\\"\\n              :confirm-leave=\\\"confirmLeave\\\"\\n              mode=\\\"big\\\"\\n              ref=\\\"form\\\">\\n      <div class=\\\"bbn-abs bbn-no\\\"\\n           style=\\\"width: 1px; height: 1px; background-color: transparent\\\"\\n           tabindex=\\\"0\\\"\\n           @focus=\\\"leaveBefore\\\"></div>\\n      <bbn-router class=\\\"bbn-overlay\\\"\\n                  ref=\\\"router\\\"\\n                  @hook:mounted=\\\"init\\\"\\n                  :autoload=\\\"false\\\"\\n                  :def=\\\"def\\\"\\n                  :auto=\\\"false\\\"\\n                  @change=\\\"onRoute\\\">\\n\\n        <slot></slot>\\n      </bbn-router>\\n      <div class=\\\"bbn-abs bbn-no\\\"\\n           style=\\\"width: 1px; height: 1px; background-color: transparent\\\"\\n           tabindex=\\\"0\\\"\\n           @focus=\\\"leaveAfter\\\"></div>\\n    </bbn-form>\\n  </div>\\n  <div :class=\\\"['bbn-h-100', 'bbn-alt-background-internal', 'bbn-reactive', 'bbn-middle', 'bbn-unselectable', 'bbn-p', {'bbn-disabled': !hasNext}]\\\"\\n       style=\\\"width: 10%; min-width: 10%\\\"\\n       @click=\\\"next\\\">\\n    <div class=\\\"bbn-block  bbn-xxxxl\\\">\\n      <i class=\\\"nf nf-fa-chevron_right\\\"></i>\\n    </div>\\n  </div>\\n</div>\\n\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/multipart/multipart.html?");

/***/ }),

/***/ "./src/components/multipart/multipart.less":
/*!*************************************************!*\
  !*** ./src/components/multipart/multipart.less ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_multipart_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./multipart.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/multipart/multipart.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_multipart_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_multipart_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_multipart_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_multipart_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/multipart/multipart.less?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/components/multipart lazy recursive ^\\.\\/multipart\\..*\\.lang$":
/*!******************************************************************************************!*\
  !*** ./src/components/multipart/ lazy ^\.\/multipart\..*\.lang$ strict namespace object ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./multipart.fr.lang\": [\n\t\t\"./src/components/multipart/multipart.fr.lang\",\n\t\t\"src_components_multipart_multipart_fr_lang\"\n\t],\n\t\"./multipart.it.lang\": [\n\t\t\"./src/components/multipart/multipart.it.lang\",\n\t\t\"src_components_multipart_multipart_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/multipart lazy recursive ^\\\\.\\\\/multipart\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/multipart/_lazy_^\\.\\/multipart\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/multipart/multipart.js":
/*!***********************************************!*\
  !*** ./src/components/multipart/multipart.js ***!
  \***********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _multipart_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multipart.html */ \"./src/components/multipart/multipart.html\");\n/* harmony import */ var _multipart_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./multipart.less */ \"./src/components/multipart/multipart.less\");\n/**\n * @file bbn-form component\n *\n * @description bbn-form is a component that allows you to quickly generate and process web forms.\n * \n * Validation and custom control can be defined before data is sent to the back-end system.\n *\n * @copyright BBN Solutions\n *\n * @author BBN Solutions\n */\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   * @mixin bbn.cp.mixins.localStorage\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.localStorage],\n  props: {\n    /**\n     * @todo not used\n     * @prop {Boolean} [false] autocomplete\n     */\n    autocomplete: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Set to true to enable the form's buttons without changing the form's content.\n     *\n     * @prop {Boolean} [false] prefilled\n     */\n    prefilled: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * A confirmation popup with a costumized message shown before leaving the form.\n     *\n     * @prop {String|Function} confirmLeave\n     */\n    confirmLeave: {\n      type: [Boolean, String, Function],\n      default: bbn._(\"Are you sure you want to leave?\")\n    },\n    /**\n     * Set to true to disable the form.\n     * @prop {Boolean} [false] disabled\n     */\n    disabled: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * @prop {} script\n     */\n    script: {},\n    /**\n     * @prop {} scrollable\n     */\n    scrollable: {},\n    /**\n     * The list of fields the form must contain.\n     * @prop {} fields\n     */\n    fields: {},\n    /**\n     * Set to true to make a postOut instead of a post when the form is submitted.\n     *\n     * @prop {Boolean} [false] blank\n     */\n    blank: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Set to true to give the attribute target the value '_self'.\n     * @prop {Boolean} [false] self\n     */\n    self: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * @prop {String} target\n     */\n    target: {\n      type: String\n    },\n    /**\n     * A confirmation popup with a costumized message shown before the form is submitted.\n     *\n     * @prop {(String|Function)} confirmMessage\n     */\n    confirmMessage: {\n      type: [String, Function]\n    },\n    /**\n     * A confirmation popup with a costumized message shown before leaving the form.\n     *\n     * @prop {(String|Function)} confirmLeave\n     */\n    confirmLeave: {\n      type: [Boolean, String, Function],\n      default: bbn._(\"Are you sure you want to discard the changes you made in this form?\")\n    },\n    /**\n     * The url contacted when submitting the form.\n     *\n     * @prop {String} action\n     */\n    action: {\n      type: String\n    },\n    /**\n     * A method called after a form is correctly submitted.\n     *\n     * @prop {Function} success\n     */\n    success: {\n      type: Function\n    },\n    /**\n     * A method called after a form submission fails.\n     *\n     * @prop {Function} failure\n     */\n    failure: {\n      type: Function\n    },\n    /**\n     * A popup with a costumized message shown after a form is correctly submitted.\n     *\n     * @prop {(String|Function)} successMessage\n     */\n    successMessage: {\n      type: [String, Function]\n    },\n    /**\n     * A popup with a costumized message shown after a form submission fails.\n     *\n     * @prop {(String|Function)} failureMessage\n     */\n    failureMessage: {\n      type: [String, Function]\n    },\n    /**\n     * The form's method of submission.\n     *\n     * @prop {String} [post] method\n     */\n    method: {\n      type: String,\n      default: 'post'\n    },\n    /**\n     * The buttons shown on the form.\n     *\n     * @prop {(Boolean|Array)} ['cancel', 'submit'] buttons\n     */\n    buttons: {\n      type: [Boolean, Array],\n      default() {\n        return ['cancel', 'submit'];\n      }\n    },\n    /**\n     * The proper data used in the form.\n     *\n     * @prop {Object} source\n     */\n    // This is the proper data used in the form\n    source: {\n      type: Object,\n      default() {\n        return {};\n      }\n    },\n    /**\n     * The additional data to be sent by the form.\n     *\n     * @prop {Object} data\n     */\n    // This is additional data to be sent by the form\n    data: {\n      type: Object\n    },\n    /**\n     * Set to true to fix the form's footer.\n     *\n     * @prop {Boolean} [true] fixedFooter\n     */\n    fixedFooter: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * The form's schema generating the inputs.\n     *\n     * @prop {Array} [[]] schema\n     */\n    // That will be a form schema generating the inputs\n    schema: {\n      type: Array,\n      default: function () {\n        return [];\n      }\n    },\n    // Sets if it is the data property which must be sent, or the content of the named fields\n    // (in this case names are not necessary on form inputs)\n    /**\n     * Set to true if the data property must be sent.\n     *\n     * @prop {Boolean} [true] sendModel\n     */\n    sendModel: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * Checks the fields' data before submitting the form.\n     *\n     * @prop {Function} validation\n     */\n    validation: {\n      type: Function\n    },\n    /**\n     * If true, will consider itself as a unique element of a floater and will have its buttons incorporated in it \n     * whereas if undefined will.\n     *\n     * @prop {(Boolean|String)} windowed\n     */\n    windowed: {\n      type: [Boolean, String],\n      default: 'auto'\n    },\n    /**\n     * If true, will use the class bbn-overlay for its container.\n     *\n     * @prop {Boolean} fullSize\n     */\n    fullSize: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * @prop {String} [''] def\n     */\n    def: {\n      type: String,\n      default: ''\n    }\n  },\n  data() {\n    return {\n      router: null,\n      form: null,\n      hasNext: false,\n      hasPrev: false,\n      isFocusing: false\n    };\n  },\n  methods: {\n    prev() {\n      if (this.router) {\n        this.router.prev();\n      }\n    },\n    next() {\n      if (this.router) {\n        this.router.next();\n      }\n    },\n    init() {\n      this.router = this.getRef('router');\n      this.form = this.getRef('form');\n      this.update();\n      setTimeout(() => {\n        this.router.route(this.router.getDefaultURL(), true);\n      }, 100);\n    },\n    focusout(e) {\n      bbn.fn.log(\"FOCUSING OUT\");\n    },\n    leaveBefore(e) {\n      if (this.hasPrev) {\n        this.router.prev();\n        this.isFocusing = true;\n        setTimeout(() => {\n          this.form.focusLast();\n          this.isFocusing = false;\n        }, 100);\n      }\n    },\n    leaveAfter(e) {\n      if (this.hasNext) {\n        this.router.next();\n        this.isFocusing = true;\n        setTimeout(() => {\n          this.form.focusFirst();\n          this.isFocusing = false;\n        }, 100);\n      }\n    },\n    update() {\n      this.$nextTick(() => {\n        if (this.router) {\n          this.hasPrev = this.router.views[this.router.selected - 1] !== undefined;\n          this.hasNext = this.router.views[this.router.selected + 1] !== undefined;\n        }\n      });\n    },\n    onRoute() {\n      this.update();\n      if (!this.isFocusing) {\n        this.form.focusFirst();\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/multipart lazy recursive ^\\\\.\\\\/multipart\\\\..*\\\\.lang$\")(`./multipart.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-multipart',\n  definition: cpDef,\n  template: _multipart_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _multipart_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/multipart/multipart.js?");

/***/ })

}]);