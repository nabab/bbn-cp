/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/loadbar-loadbar-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loadbar/loadbar.less":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loadbar/loadbar.less ***!
  \**************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `bbn-loadbar {\n  white-space: nowrap;\n  overflow: visible;\n}\nbbn-loadbar a {\n  text-overflow: ellipsis;\n  overflow: hidden;\n  white-space: nowrap;\n  display: block;\n}\nbbn-loadbar .bbn-loadbar-content {\n  height: 100%;\n}\nbbn-loadbar .bbn-loadbar-state {\n  width: 1.8rem;\n}\nbbn-loadbar .bbn-loadbar-time {\n  width: 4rem;\n  display: inline-block;\n}\nbbn-loadbar .bbn-loadbar-error {\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 7rem;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadbar/loadbar.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/loadbar/loadbar.html":
/*!*********************************************!*\
  !*** ./src/components/loadbar/loadbar.html ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"['bbn-100', 'bbn-unselectable', componentClass]\\\">\\n  <span class=\\\"bbn-loadbar-content bbn-h-100 bbn-flex-width\\\"\\n        @click=\\\"info = !info\\\"\\n        ref=\\\"bar\\\">\\n    <span class=\\\"bbn-loadbar-state bbn-hxspadded bbn-c bbn-block bbn-h-100 bbn-middle bbn-text\\\">\\n      <bbn-loadicon v-if=\\\"currentItem.loading\\\"/>\\n      <i v-else-if=\\\"currentItem.error\\\"\\n         class=\\\"nf nf-fa-times_circle bbn-red\\\"/>\\n      <i v-else-if=\\\"currentItem.success\\\"\\n         class=\\\"nf nf-fa-check bbn-green\\\"/>\\n      <i v-else-if=\\\"currentItem.abort\\\"\\n         class=\\\"nf nf-mdi-stop bbn-orange\\\"/>\\n    </span>\\n    <span class=\\\"bbn-flex-fill\\\">\\n      <span class=\\\"bbn-overlay\\\">\\n        <span class=\\\"bbn-h-100 bbn-vmiddle bbn-s\\\">\\n          <a href=\\\"javascript:;\\\"\\n             :title=\\\"text + ' ' + _('Loading')\\\"\\n             style=\\\"color: inherit; cursor: default\\\"\\n             v-if=\\\"currentItem\\\"\\n             v-text=\\\"currentItem.url\\\"/>\\n        </span>\\n      </span>\\n    </span>\\n  </span>\\n\\n  <bbn-floater v-if=\\\"info\\\"\\n               :element=\\\"$el.parentNode\\\"\\n               ref=\\\"floater\\\"\\n               :auto-hide=\\\"true\\\"\\n               :title=\\\"_('Requests\\\\' history')\\\"\\n               :closable=\\\"true\\\"\\n               :container=\\\"$root.$el\\\"\\n               :scrollable=\\\"true\\\"\\n               @close=\\\"info = false\\\"\\n               width=\\\"100%\\\"\\n               max-height=\\\"60vw\\\">\\n    <div class=\\\"bbn-padded bbn-w-100\\\">\\n      <bbn-input class=\\\"bbn-w-100\\\"\\n                 button-right=\\\"nf nf-mdi-send\\\"\\n                 v-model=\\\"link\\\"\\n                 @keydown.enter=\\\"go\\\"\\n                 :focused=\\\"true\\\"\\n                 @clickRightButton=\\\"go\\\"/>\\n      <ul class=\\\"bbn-reset bbn-w-100 bbn-ul\\\">\\n        <li v-for=\\\"it of items\\\">\\n          <bbn-context tag=\\\"div\\\"\\n                       class=\\\"bbn-vmiddle\\\"\\n                       :max-width=\\\"300\\\"\\n                       :source=\\\"contextMenu(it)\\\">\\n            <span class=\\\"bbn-loadbar-state bbn-hxspadded bbn-c\\\">\\n              <bbn-loadicon v-if=\\\"it.loading\\\"\\n                            class=\\\"bbn-blue\\\"/>\\n              <i v-else-if=\\\"it.error\\\"\\n                 class=\\\"nf nf-fa-times_circle bbn-red\\\"/>\\n              <i v-else-if=\\\"it.success\\\"\\n                 class=\\\"nf nf-fa-check bbn-green\\\"/>\\n              <i v-else-if=\\\"it.abort\\\"\\n                 class=\\\"nf nf-mdi-stop bbn-orange\\\"/>\\n            </span>\\n            <div class=\\\"bbn-loadbar-time bbn-c bbn-s\\\">\\n              <span v-text=\\\"renderDuration(it.duration)\\\"/>\\n            </div>\\n            <span class=\\\"bbn-hxspadded bbn-s\\\"\\n                  v-text=\\\"it.url\\\"/>\\n          </bbn-context>\\n\\n          <div v-if=\\\"it.error && it.errorMessage\\\"\\n                class=\\\"bbn-loadbar-error bbn-red\\\"\\n                v-text=\\\"it.errorMessage\\\"/>\\n        </li>\\n      </ul>\\n    </div>\\n  </bbn-floater>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadbar/loadbar.html?");

/***/ }),

/***/ "./src/components/loadbar/loadbar.less":
/*!*********************************************!*\
  !*** ./src/components/loadbar/loadbar.less ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_loadbar_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./loadbar.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/loadbar/loadbar.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_loadbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_loadbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_loadbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_loadbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadbar/loadbar.less?");

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

/***/ "./src/components/loadbar lazy recursive ^\\.\\/loadbar\\..*\\.lang$":
/*!**************************************************************************************!*\
  !*** ./src/components/loadbar/ lazy ^\.\/loadbar\..*\.lang$ strict namespace object ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./loadbar.fr.lang\": [\n\t\t\"./src/components/loadbar/loadbar.fr.lang\",\n\t\t\"src_components_loadbar_loadbar_fr_lang\"\n\t],\n\t\"./loadbar.it.lang\": [\n\t\t\"./src/components/loadbar/loadbar.it.lang\",\n\t\t\"src_components_loadbar_loadbar_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/loadbar lazy recursive ^\\\\.\\\\/loadbar\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadbar/_lazy_^\\.\\/loadbar\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/loadbar/loadbar.js":
/*!*******************************************!*\
  !*** ./src/components/loadbar/loadbar.js ***!
  \*******************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _loadbar_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadbar.html */ \"./src/components/loadbar/loadbar.html\");\n/* harmony import */ var _loadbar_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadbar.less */ \"./src/components/loadbar/loadbar.less\");\n/**\r\n * @file bbn-loadbar component\r\n *\r\n * @description bbn-loadbar component is a simple implementation component, it represents a bar with a display of wait state of a user-defined file.\r\n * Next to the loading icon, you'll find the path of the file from which the response is expected.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author BBN Solutions\r\n *\r\n * @created 15/02/2017\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic \r\n   */\n  mixins: [bbn.cp.mixins.basic],\n  props: {\n    //@todo not used\n    encoded: {\n      type: Boolean,\n      default: true\n    },\n    //@todo not used\n    position: {\n      type: Object,\n      default() {\n        return {\n          position: {\n            bottom: 5,\n            right: 5\n          }\n        };\n      }\n    },\n    /**\r\n     * The source of the component\r\n     * @prop {Array} source\r\n     */\n    source: {\n      type: Array\n    },\n    //@todo not used\n    history: {\n      type: Number,\n      default: 100\n    }\n  },\n  data() {\n    return {\n      /**\r\n       * @data {Boolean} isLoading\r\n       */\n      isLoading: false,\n      //@todo not used\n      isSuccess: false,\n      //@todo not used\n      isError: false,\n      /**\r\n       * @data {String} [''] text\r\n       */\n      text: '',\n      //@todo not used\n      id: false,\n      //@todo not used\n      selected: 0,\n      //@todo not used\n      numLoaded: 0,\n      /**\r\n       * @data {Boolean} [false] info\r\n       */\n      info: false,\n      /**\r\n      * @data {Boolean} [false] interval\r\n      */\n      interval: false,\n      /**\r\n      * @data {Boolean} [false] timeNow\r\n      */\n      timeNow: false,\n      link: ''\n    };\n  },\n  computed: {\n    /**\r\n     * @computed loadingItems \r\n     * @return {Array}\r\n     */\n    loadingItems() {\n      return bbn.fn.filter(this.source, {\n        loading: true\n      });\n    },\n    /**\r\n    * @computed loadedItems \r\n    * @return {Array}\r\n    */\n    loadedItems() {\n      return bbn.fn.filter(this.source, {\n        loading: false\n      });\n    },\n    /**\r\n     * @computed items\r\n     * @return {Array}\r\n     */\n    items() {\n      let items = [];\n      bbn.fn.each(this.loadingItems, a => {\n        let b = bbn.fn.clone(a);\n        b.duration = this.timeNow - b.start;\n        items.push(b);\n      });\n      return items.concat(this.loadedItems);\n    },\n    /** \r\n     * @computed currentItem\r\n     * @return {Object|Boolean}\r\n    */\n    currentItem() {\n      return this.loadingItems.length ? this.loadingItems[0] : this.loadedItems.length ? this.loadedItems[0] : false;\n    }\n  },\n  methods: {\n    contextMenu(item) {\n      let res = [{\n        text: bbn._(\"Copy URL\"),\n        icon: 'nf nf-mdi-content_copy',\n        action() {\n          bbn.fn.copy(item.url);\n          appui.success(bbn._(\"Copied\"));\n        }\n      }];\n      if (item.loading) {\n        res.push({\n          text: bbn._(\"abort\"),\n          icon: 'nf nf-mdi-cancel',\n          action: () => {\n            this.cancel(item);\n          }\n        });\n      }\n      return res;\n    },\n    /**\r\n     * Return the duration in seconds or milliseconds of a request\r\n     * @method renderDuration\r\n     * @param {Number} d\r\n     * @return {Number}\r\n     */\n    renderDuration(d) {\n      let tmp = d / 1000;\n      if (tmp < 10) {\n        return tmp.toFixed(3) + ' s';\n      } else {\n        return parseInt(tmp) + ' s';\n      }\n    },\n    /**\r\n     * Aborts the selected request\r\n     * @method cancel\r\n     * @param {Object} item \r\n     */\n    cancel(item) {\n      if (item.loading) {\n        this.confirm(bbn._(\"Are you sure you want to abort this request?\"), d => {\n          bbn.fn.abort(item.key);\n        });\n      }\n    },\n    //@todo not used\n    deleteHistory() {\n      let tmp = [];\n      bbn.fn.each(this.data, a => {\n        if (a.isLoading) {\n          tmp.push(a);\n        }\n      });\n      this.data = tmp;\n    },\n    /**\r\n     * Opens the given link\r\n     * @method go\r\n     */\n    go() {\n      if (this.link) {\n        bbn.fn.link(this.link);\n        this.hide();\n      }\n    },\n    /**\r\n     * Shows the information panel\r\n     * @method show\r\n     */\n    show() {\n      this.info = true;\n    },\n    /**\r\n     * Hides the information panel\r\n     * @method hide\r\n     */\n    hide() {\n      this.info = false;\n    }\n  },\n  watch: {\n    source: {\n      deep: true,\n      handler(v, ov) {\n        //bbn.fn.log([\"WATCHING LOADBAR SOURCE\", v, ov, v === ov])\n        this.$forceUpdate();\n      }\n    },\n    /*\r\n    async currentItem(v) {\r\n      await this.$forceUpdate();\r\n    },\r\n    */\n    info(v) {\n      if (this.interval) {\n        clearInterval(this.interval);\n      }\n      if (v) {\n        this.timeNow = bbn.fn.timestamp();\n        this.interval = setInterval(() => {\n          if (this.info) {\n            this.timeNow = bbn.fn.timestamp();\n          }\n        }, 300);\n      }\n    }\n  },\n  /**\r\n   * @event mounted\r\n   */\n  mounted() {\n    if (this.info) {\n      this.interval = setInterval(() => {\n        if (this.info) {\n          this.timeNow = bbn.fn.timestamp();\n        }\n      }, 300);\n    }\n  },\n  /**\r\n   * @event beforeDestroy\r\n   */\n  beforeDestroy() {\n    if (this.info) {\n      clearInterval(this.interval);\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/loadbar lazy recursive ^\\\\.\\\\/loadbar\\\\..*\\\\.lang$\")(`./loadbar.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-loadbar',\n  definition: cpDef,\n  template: _loadbar_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _loadbar_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/loadbar/loadbar.js?");

/***/ })

}]);