/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/vlist-vlist-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/vlist/vlist.less":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/vlist/vlist.less ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `div.bbn-vlist {\n  position: fixed !important;\n  overflow: auto;\n  left: -1000px;\n  /** Popup zIndex: 7 */\n  z-index: 100;\n}\ndiv.bbn-vlist .k-menu .k-animation-container .k-animation-container,\ndiv.bbn-vlist .k-menu .k-menu-group .k-menu-group,\ndiv.bbn-vlist .k-menu-vertical .k-animation-container,\ndiv.bbn-vlist .k-menu-vertical .k-menu-group {\n  top: auto;\n  left: auto;\n}\ndiv.bbn-vlist > ul.options > li .space {\n  opacity: 0;\n}\ndiv.bbn-vlist > ul.options > li.selected .space {\n  opacity: 1;\n}\ndiv.bbn-vlist > ul.options > li.disabled {\n  opacity: 1;\n}\ndiv.bbn-vlist > ul.options > li.disabled .space {\n  opacity: 0.5;\n}\ndiv.bbn-vlist > ul > li.disabled {\n  opacity: 0.7;\n}\ndiv.bbn-vlist > ul > li.disabled .k-link {\n  cursor: default;\n}\ndiv.bbn-vlist > ul > li .space {\n  display: inline-block;\n  width: 1.8rem;\n  text-align: left;\n}\ndiv.bbn-vlist > ul > li .text i {\n  margin-right: 1rem;\n}\ndiv.bbn-vlist > ul > li .text.disabled i {\n  opacity: 0.5;\n}\ndiv.bbn-vlist > ul > li .text.hidden i {\n  opacity: 0 !important;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/vlist/vlist.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/vlist/vlist.html":
/*!*****************************************!*\
  !*** ./src/components/vlist/vlist.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"['bbn-unselectable', componentClass]\\\"\\r\\n     :style=\\\"getStyles()\\\"\\r\\n>\\r\\n  <ul :class=\\\"'bbn-bbox bbn-no-radius bbn-box k-group k-reset ' + mode + (parent ? ' k-menugroup' : ' k-menu k-menu-vertical k-context-menu')\\\"\\r\\n      @mouseleave.stop.prevent=\\\"leaveList($event)\\\"\\r\\n      tabindex=\\\"0\\\"\\r\\n      bbn-if=\\\"items\\\"\\r\\n      @keydown=\\\"pressKey\\\">\\r\\n    <li bbn-for=\\\"(li, idx) in items\\\"\\r\\n        bbn-show=\\\"!li.hidden\\\"\\r\\n        :class=\\\"{\\r\\n          'k-item': true,\\r\\n          'bbn-reactive': true,\\r\\n          selected: li.selected ? true : false,\\r\\n          disabled: !!li.disabled\\r\\n        }\\\"\\r\\n        :key=\\\"idx\\\"\\r\\n        :style=\\\"li.items && li.items.length ? 'z-index: auto;' : ''\\\"\\r\\n        @mouseenter=\\\"over(idx)\\\"\\r\\n        @mousedown.stop.prevent=\\\"beforeClick\\\"\\r\\n        @click.stop.prevent=\\\"select(idx)\\\"\\r\\n        @mouseup=\\\"afterClick\\\">\\r\\n      <span class=\\\"k-link\\\" bbn-if=\\\"itemComponent\\\">\\r\\n        <component :is=\\\"itemComponent\\\" :source=\\\"li\\\"></component>\\r\\n      </span>\\r\\n      <span class=\\\"k-link\\\" bbn-else>\\r\\n        <span class=\\\"space\\\" bbn-if=\\\"(mode === 'selection') || (mode === 'options')\\\">\\r\\n          <i bbn-if=\\\"(mode === 'selection') && (li.selected)\\\" class=\\\"nf nf-fa-check\\\"></i>\\r\\n          <i bbn-elseif=\\\"mode === 'options'\\\" class=\\\"nf nf-fa-check\\\"></i>\\r\\n        </span>\\r\\n        <span class=\\\"space\\\" bbn-if=\\\"hasIcons\\\">\\r\\n          <i bbn-if=\\\"li.icon\\\" :class=\\\"li.icon\\\"></i>\\r\\n        </span>\\r\\n        <span class=\\\"text\\\" bbn-html=\\\"li.text\\\"></span>\\r\\n        <span bbn-if=\\\"li.items && li.items.length\\\"\\r\\n              class=\\\"k-icon k-i-arrow-60-right\\\"\\r\\n        ></span>\\r\\n      </span>\\r\\n      <bbn-vlist bbn-if=\\\"li.items && li.items.length && (idx === currentIndex)\\\"\\r\\n                 :level=\\\"level + 1\\\"\\r\\n                 @closeall=\\\"closeAll()\\\"\\r\\n                 :source=\\\"li.items\\\"\\r\\n                 :unique=\\\"li.unique\\\"\\r\\n                 :no-icon=\\\"li.noIcon\\\"\\r\\n                 :mode=\\\"li.mode\\\"\\r\\n                 :left=\\\"li.left\\\"\\r\\n                 :top=\\\"li.top\\\"\\r\\n                 :right=\\\"li.right\\\"\\r\\n                 :bottom=\\\"li.bottom\\\"\\r\\n                 :max-height=\\\"li.maxHeight\\\"\\r\\n                 :parent=\\\"true\\\"\\r\\n      ></bbn-vlist>\\r\\n    </li>\\r\\n  </ul>\\r\\n</div>\\r\\n\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/vlist/vlist.html?");

/***/ }),

/***/ "./src/components/vlist/vlist.less":
/*!*****************************************!*\
  !*** ./src/components/vlist/vlist.less ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_vlist_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./vlist.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/vlist/vlist.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_vlist_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_vlist_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_vlist_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_vlist_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/vlist/vlist.less?");

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

/***/ "./src/components/vlist/_i18n lazy recursive ^\\.\\/vlist\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/vlist/_i18n/ lazy ^\.\/vlist\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/vlist/_i18n lazy recursive ^\\\\.\\\\/vlist\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/vlist/_i18n/_lazy_^\\.\\/vlist\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/vlist/vlist.js":
/*!***************************************!*\
  !*** ./src/components/vlist/vlist.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _vlist_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vlist.html */ \"./src/components/vlist/vlist.html\");\n/* harmony import */ var _vlist_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vlist.less */ \"./src/components/vlist/vlist.less\");\n/**\r\n * @file bbn-vlist component\r\n *\r\n * @description bbn-vlist represents a vertical list of possible actions to be performed.This list can be nested hierarchically.\r\n *\r\n * @copyrigth BBN Soutions\r\n *\r\n * @author BBN Soutions\r\n *\r\n * @created 15/52/2017.\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.position\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.position],\n  statics() {\n    return {\n      isClicked: false\n    };\n  },\n  props: {\n    /**\r\n     * @prop {(Function|Array)} source\r\n     */\n    source: {\n      type: [Function, Array]\n    },\n    /**\r\n     * @prop {String} ['100%'] maxHeight\r\n     */\n    maxHeight: {\n      type: String,\n      default: '100%'\n    },\n    /**\r\n     * @prop {Boolean} [false] unique\r\n     */\n    unique: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * @prop {String} ['free'] mode\r\n     */\n    mode: {\n      type: String,\n      default: \"free\"\n    },\n    /**\r\n     * @prop [false] parent\r\n     */\n    parent: {\n      default: false\n    },\n    /**\r\n     * @prop [false] noIcon\r\n     */\n    noIcon: {\n      default: false\n    },\n    // The hierarchy level, root is 0, and for each generation 1 is added to the level\n    /**\r\n     * @prop {Number} [0] level\r\n     */\n    level: {\n      type: Number,\n      default: 0\n    },\n    /**\r\n     * @prop {Funtion} mapper\r\n     */\n    mapper: {\n      type: Function\n    },\n    /**\r\n     * itemComponent\r\n     */\n    itemComponent: {}\n  },\n  data() {\n    let items = [],\n      hasIcons = false;\n    if (this.source) {\n      items = bbn.fn.isFunction(this.source) ? this.source() : this.source.slice();\n      if (this.mapper) {\n        bbn.fn.map(items, a => {\n          return this.mapper(a);\n        });\n      }\n      bbn.fn.each(items, a => {\n        if (a.icon) {\n          hasIcons = true;\n        }\n      });\n    }\n    return {\n      items: items,\n      currentIndex: 0,\n      currentHeight: 0,\n      currentWidth: 0,\n      focused: bbn.env.focused,\n      hasIcons: hasIcons\n    };\n  },\n  methods: {\n    getStyles() {\n      let left = this.left ? bbn.fn.isNumber(this.left) ? this.left : parseInt(this.left) : '',\n        right = this.right ? bbn.fn.isNumber(this.right) ? this.right : parseInt(this.right) : '',\n        top = this.top ? bbn.fn.isNumber(this.top) ? this.top : parseInt(this.top) : '',\n        bottom = this.bottom ? bbn.fn.isNumber(this.bottom) ? this.bottom : parseInt(this.bottom) : '';\n      if (this.currentHeight) {\n        let tW = bbn.env.width,\n          tH = bbn.env.height;\n        if (right && right + this.currentWidth >= tW) {\n          left = '';\n          right = bbn.env.width - this.currentWidth;\n        } else if (left && left + this.currentWidth >= tW) {\n          right = '';\n          left = tW < this.currentWidth ? 0 : tW - this.currentWidth;\n        }\n        if (bottom && bottom + this.currentHeight >= tH) {\n          top = '';\n          bottom = tH - this.currentHeight;\n        } else if (top && top + this.currentHeight >= tH) {\n          bottom = '';\n          top = tH - this.currentHeight;\n        }\n      }\n      return {\n        left: left ? left + 'px' : null,\n        right: right ? right + 'px' : null,\n        top: top ? top + 'px' : null,\n        bottom: bottom ? bottom + 'px' : null,\n        maxHeight: this.maxHeight\n      };\n    },\n    pressKey(e) {\n      switch (e.key) {\n        case \"Enter\":\n        case \"Space\":\n          this.select(this.currentIndex);\n          break;\n        case \"Escape\":\n          this.closeAll();\n          break;\n        case \"ArrowLeft\":\n          this.close();\n          break;\n        case \"ArrowRight\":\n          //this.close();\n          break;\n        case \"ArrowDown\":\n          if (this.items.length) {\n            if (this.currentIndex > this.items.length - 2) {\n              this.currentIndex = 0;\n            } else {\n              this.currentIndex++;\n            }\n          }\n          break;\n        case \"ArrowUp\":\n          if (this.items.length) {\n            if (this.currentIndex > 0) {\n              this.currentIndex--;\n            } else {\n              this.currentIndex = this.items.length - 1;\n            }\n          }\n          break;\n      }\n    },\n    leaveList: function (e) {\n      if (!bbnVlistCp.isClicked) {\n        this.close();\n      }\n    },\n    beforeClick() {\n      bbnVlistCp.isClicked = true;\n    },\n    afterClick() {\n      setTimeout(function () {\n        bbnVlistCp.isClicked = false;\n      });\n    },\n    over(idx) {\n      if (this.currentIndex !== idx) {\n        this.currentIndex = idx;\n        if (this.items[idx].items) {\n          let $item = $(this.$el).find(\" > ul > li\").eq(idx),\n            offset = $item.offset(),\n            h = $(this.$root.$el).height(),\n            w = $(this.$root.$el).width();\n          this.items[idx].right = offset.left > w * 0.6 ? Math.round(w - offset.left) : null;\n          this.items[idx].left = offset.left <= w * 0.6 ? Math.round(offset.left + $item[0].clientWidth) : null;\n          this.items[idx].bottom = offset.top > h * 0.6 ? Math.round(h - offset.top - $item[0].clientHeight) : null;\n          this.items[idx].top = offset.top <= h * 0.6 ? Math.round(offset.top) : null;\n          this.items[idx].maxHeight = (offset.top > h * 0.6 ? Math.round(offset.top + $item[0].clientHeight) : Math.round(h - offset.top)) + 'px';\n          bbn.fn.log('over', this.items[idx]);\n        }\n      }\n    },\n    close(e) {\n      this.currentIndex = false;\n      if (!this.level && this.focused) {\n        $(this.focused).focus();\n      }\n    },\n    closeAll() {\n      this.close();\n      if (this.level) {\n        this.$emit(\"closeall\");\n      } else {\n        if (this.focused) {\n          $(this.focused).focus();\n        }\n        this.$emit('close');\n        this.focus = false;\n      }\n    },\n    select(idx) {\n      if (!this.items[idx].disabled && !this.items[idx].items) {\n        if (this.mode === 'options') {\n          this.items[idx].selected = !this.items[idx].selected;\n        } else if (this.mode === 'selection' && !this.items[idx].selected) {\n          let prev = bbn.fn.search(this.items, \"selected\", true);\n          if (prev > -1) {\n            this.items[prev].selected = false;\n          }\n          this.items[idx].selected = true;\n        }\n        if (this.items[idx].action) {\n          if (typeof this.items[idx].action === 'string') {\n            bbn.fn.log(\"CLICK IS STRING\", this);\n          } else if (bbn.fn.isFunction(this.items[idx].action)) {\n            bbn.fn.log(\"CLICK IS FUNCTION ???\", this);\n            this.items[idx].action(idx, JSON.parse(JSON.stringify(this.items[idx])));\n          }\n        }\n        if (this.mode !== 'options') {\n          this.closeAll();\n        }\n      }\n    }\n  },\n  created() {\n    this.focused = bbn.env.focused;\n  },\n  mounted() {\n    this.$nextTick(() => {\n      if (!this.focused) {\n        this.focused = bbn.env.focused;\n      }\n      this.currentHeight = $(this.$el).children().height();\n      this.currentWidth = $(this.$el).children().width();\n      this.$el.children[0].focus();\n      this.ready = true;\n      /*\r\n      let style = {},\r\n        h = $(this.$el).children().height();\r\n      if ( this.bottom ){\r\n      if ( this.bottom - h < 0 ){\r\n        style.top = '0px';\r\n      }\r\n      else{\r\n        style.top = Math.round(this.bottom - h) + 'px';\r\n      }\r\n      style.height = Math.round(h + 2) + 'px';\r\n      $(this.$el).css(style)\r\n      }\r\n      */\n    });\n  },\n  beforeDestroy() {\n    bbn.fn.log(\"beforeDestroy\");\n    if (this.focused) {\n      bbn.fn.log(\"foc\", this.focused);\n      this.focused.focus();\n    }\n  },\n  watch: {\n    currentIndex(newVal) {\n      if (newVal === false && !this.parent) {\n        this.$emit(\"close\");\n      }\n    },\n    items() {\n      let hasIcons = false;\n      bbn.fn.each(this.items, a => {\n        if (a.icon) {\n          hasIcons = true;\n        }\n      });\n      if (this.hasIcons !== hasIcons) {\n        this.hasIcons = hasIcons;\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/vlist/_i18n lazy recursive ^\\\\.\\\\/vlist\\\\..*\\\\.lang$\")(`./vlist.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-vlist',\n  definition: cpDef,\n  template: _vlist_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _vlist_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/vlist/vlist.js?");

/***/ })

}]);