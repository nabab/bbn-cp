/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbbn_axios_dayjs"] = self["webpackChunkbbn_axios_dayjs"] || []).push([["components/splashscreen-splashscreen-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/splashscreen/splashscreen.less":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/splashscreen/splashscreen.less ***!
  \************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-splashscreen {\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n}\n.bbn-splashscreen .bbn-splashscreen-main {\n  position: fixed;\n  box-sizing: border-box;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 100%;\n  max-width: 100%;\n}\n.bbn-splashscreen .bbn-splashscreen-main img {\n  object-fit: cover;\n  height: 100%;\n  width: 100%;\n}\n.bbn-splashscreen.bbn-splashscreen-swipe-left .slide-leave-active,\n.bbn-splashscreen.bbn-splashscreen-swipe-left .slide-enter-active {\n  transition: 0.2s;\n}\n.bbn-splashscreen.bbn-splashscreen-swipe-left .slide-enter {\n  transform: translateX(100%);\n}\n.bbn-splashscreen.bbn-splashscreen-swipe-left .slide-leave-to {\n  transform: translateX(-100%);\n}\n.bbn-splashscreen.bbn-splashscreen-swipe-right .slide-leave-active,\n.bbn-splashscreen.bbn-splashscreen-swipe-right .slide-enter-active {\n  transition: 0.2s;\n}\n.bbn-splashscreen.bbn-splashscreen-swipe-right .slide-enter {\n  transform: translateX(-100%);\n}\n.bbn-splashscreen.bbn-splashscreen-swipe-right .slide-leave-to {\n  transform: translateX(100%);\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/splashscreen/splashscreen.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/splashscreen/splashscreen.html":
/*!*******************************************************!*\
  !*** ./src/components/splashscreen/splashscreen.html ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[componentClass, currentSwipeClass, 'bbn-overlay']\\\"\\n     @touchstart.passive=\\\"touchstart\\\"\\n     @touchmove.passive=\\\"touchmove\\\"\\n     @touchend.passive=\\\"touchend\\\">\\n  <div class=\\\"bbn-splashscreen-main\\\">\\n    <template v-for=\\\"item in filteredData\\\">\\n      <img v-if=\\\"item.data.image\\\"\\n           :src=\\\"item.data.image\\\"\\n           :class=\\\"{'bbn-hidden': item.index !== currentIndex}\\\">\\n    </template>\\n  </div>\\n  <div class=\\\"bbn-splashscreen-container bbn-flex-height bbn-overlay\\\">\\n    <component v-if=\\\"headerComponent\\\"\\n              :is=\\\"headerComponent\\\"\\n              class=\\\"bbn-splashscreen-header\\\"/>\\n    <div v-else-if=\\\"header\\\"\\n        v-html=\\\"header\\\"\\n        class=\\\"bbn-splashscreen-header\\\">\\n    </div>\\n    <component v-if=\\\"!!dots && (dotsPosition === 'outsideTop')\\\"\\n              :is=\\\"$options.components.dots\\\"\\n              :indexes=\\\"currentIndexes\\\"\\n              v-model=\\\"currentIndex\\\"/>\\n    <div class=\\\"bbn-flex-fill\\\">\\n      <template v-for=\\\"item in filteredData\\\">\\n        <transition name=\\\"slide\\\">\\n          <div v-show=\\\"ready && (item.index === currentIndex)\\\"\\n                class=\\\"bbn-splashscreen-slide bbn-overlay\\\">\\n            <div class=\\\"bbn-flex-height bbn-overlay\\\">\\n              <component v-if=\\\"item.data.headerComponent\\\"\\n                        :is=\\\"item.data.headerComponent\\\"\\n                        class=\\\"bbn-splashscreen-slide-header\\\"\\n                        v-bind=\\\"item.data\\\"/>\\n              <div v-else-if=\\\"item.data.header\\\"\\n                  v-html=\\\"item.data.header\\\"\\n                  class=\\\"bbn-splashscreen-slide-header\\\">\\n              </div>\\n              <component v-if=\\\"!!dots && (dotsPosition === 'insideTop')\\\"\\n                        :is=\\\"$options.components.dots\\\"\\n                        :indexes=\\\"currentIndexes\\\"\\n                        v-model=\\\"currentIndex\\\"/>\\n              <div class=\\\"bbn-flex-fill\\\">\\n                <div class=\\\"bbn-overlay bbn-flex-width\\\">\\n                  <div v-if=\\\"arrows\\\"\\n                      class=\\\"bbn-splashscreen-arrow-next bbn-vmiddle bbn-spadded\\\">\\n                    <i v-if=\\\"showPrevArrow\\\"\\n                      class=\\\"nf nf-fa-angle_left bbn-xxxl bbn-p bbn-primary-text\\\"\\n                      @click=\\\"prev\\\"/>\\n                  </div>\\n                  <div class=\\\"bbn-flex-fill bbn-splashscreen-slide-body\\\">\\n                    <component v-if=\\\"item.data.bodyComponent\\\"\\n                              :is=\\\"item.data.bodyComponent\\\"\\n                              class=\\\"bbn-overlay\\\"\\n                              v-bind=\\\"item.data\\\"/>\\n                    <div v-else-if=\\\"item.data.body\\\"\\n                              v-html=\\\"item.data.body\\\"\\n                              class=\\\"bbn-overlay\\\">\\n                    </div>\\n                  </div>\\n                  <div v-if=\\\"arrows\\\"\\n                      class=\\\"bbn-splashscreen-arrow-next bbn-vmiddle bbn-spadded\\\">\\n                    <i v-if=\\\"showNextArrow\\\"\\n                      class=\\\"nf nf-fa-angle_right bbn-xxxl bbn-p bbn-primary-text\\\"\\n                      @click=\\\"next\\\"/>\\n                  </div>\\n                </div>\\n              </div>\\n              <component v-if=\\\"!!dots && (dotsPosition === 'insideBottom')\\\"\\n                        :is=\\\"$options.components.dots\\\"\\n                        :indexes=\\\"currentIndexes\\\"\\n                        v-model=\\\"currentIndex\\\"/>\\n              <component v-if=\\\"item.data.footerComponent\\\"\\n                        :is=\\\"item.data.footerComponent\\\"\\n                        class=\\\"bbn-splashscreen-slide-footer\\\"\\n                        v-bind=\\\"item.data\\\"/>\\n              <div v-else-if=\\\"item.data.footer\\\"\\n                  v-html=\\\"item.data.footer\\\"\\n                  class=\\\"bbn-splashscreen-slide-footer\\\">\\n              </div>\\n            </div>\\n          </div>\\n        </transition>\\n      </template>\\n    </div>\\n    <component v-if=\\\"!!dots && (dotsPosition === 'outsideBottom')\\\"\\n              :is=\\\"$options.components.dots\\\"\\n              :indexes=\\\"currentIndexes\\\"\\n              v-model=\\\"currentIndex\\\"/>\\n    <component v-if=\\\"footerComponent\\\"\\n              :is=\\\"footerComponent\\\"\\n              class=\\\"bbn-splashscreen-footer\\\"/>\\n    <div v-else-if=\\\"footer\\\"\\n        v-html=\\\"footer\\\"\\n        class=\\\"bbn-splashscreen-footer\\\">\\n    </div>\\n  </div>\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/splashscreen/splashscreen.html?");

/***/ }),

/***/ "./src/components/splashscreen/splashscreen.less":
/*!*******************************************************!*\
  !*** ./src/components/splashscreen/splashscreen.less ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_splashscreen_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./splashscreen.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/splashscreen/splashscreen.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_splashscreen_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_splashscreen_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_splashscreen_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_splashscreen_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/splashscreen/splashscreen.less?");

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

/***/ "./src/components/splashscreen lazy recursive ^\\.\\/splashscreen\\..*\\.lang$":
/*!************************************************************************************************!*\
  !*** ./src/components/splashscreen/ lazy ^\.\/splashscreen\..*\.lang$ strict namespace object ***!
  \************************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/splashscreen lazy recursive ^\\\\.\\\\/splashscreen\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/splashscreen/_lazy_^\\.\\/splashscreen\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/splashscreen/splashscreen.js":
/*!*****************************************************!*\
  !*** ./src/components/splashscreen/splashscreen.js ***!
  \*****************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _splashscreen_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./splashscreen.html */ \"./src/components/splashscreen/splashscreen.html\");\n/* harmony import */ var _splashscreen_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./splashscreen.less */ \"./src/components/splashscreen/splashscreen.less\");\n/**\n * @file bbn-splashscreen component\n * @description  bbn-splashscreen.\n * @author BBN Solutions\n * @copyright BBN Solutions\n */\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   * @mixin bbn.cp.mixins.list\n   * @mixin bbn.cp.mixins.events\n   * @mixin bbn.cp.mixins.resizer\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.list, bbn.cp.mixins.events, bbn.cp.mixins.resizer],\n  props: {\n    /**\n     * @prop {Array} source\n     */\n    source: {\n      type: Array\n    },\n    /**\n     * @prop {Boolean} [true] arrows\n     */\n    arrows: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * @prop {(Boolean|String)} ['outsideBottom'] dots\n     */\n    dots: {\n      type: [Boolean, String],\n      default: 'outsideBottom',\n      validator: d => [true, false, 'insideTop', 'insideBottom', 'outsideTop', 'outsideBottom'].includes(d)\n    },\n    /**\n     * @prop {Boolean} [true] loop\n     */\n    loop: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * @prop {String} header\n     */\n    header: {\n      type: String\n    },\n    /**\n     * @prop {(String|Object|bbnCp)} headerComponent\n     */\n    headerComponent: {\n      type: [String, Object, bbnCp]\n    },\n    /**\n     * @prop {String} footer\n     */\n    footer: {\n      type: String\n    },\n    /**\n     * @prop {(String|Object|bbnCp)} footerComponent\n     */\n    footerComponent: {\n      type: [String, Object, bbnCp]\n    }\n  },\n  data() {\n    return {\n      currentSwipeClass: 'bbn-splashscreen-swipe-left',\n      currentIndex: 0\n    };\n  },\n  computed: {\n    dotsPosition() {\n      return this.dots === true ? 'outsideBottom' : this.dots;\n    },\n    currentIndexes() {\n      return bbn.fn.map(this.filteredData, d => d.index);\n    },\n    currentStyle() {\n      let style = {};\n      if (this.currentData.length) {\n        let item = this.currentData[this.currentIndex].data;\n        if (item.background) {\n          style.backgroundColor = item.background;\n        }\n        if (item.image) {\n          style.backgroundImage = `url(${item.image})`;\n          style.backgroundPosition = 'center';\n          style.backgroundRepeat = 'no-repeat';\n          style.backgroundSize = 'cover';\n        }\n      }\n      return style;\n    },\n    showNextArrow() {\n      let i = this.currentIndexes.indexOf(this.currentIndex);\n      return i > -1 && (!!this.loop || this.currentIndexes[i + 1] !== undefined);\n    },\n    showPrevArrow() {\n      let i = this.currentIndexes.indexOf(this.currentIndex);\n      return i > -1 && (!!this.loop || this.currentIndexes[i - 1] !== undefined);\n    }\n  },\n  methods: {\n    prev() {\n      if (this.currentIndexes.length) {\n        let i = this.currentIndexes.indexOf(this.currentIndex);\n        if (i > -1) {\n          if (this.currentIndexes[i - 1] !== undefined) {\n            this.currentIndex = this.currentIndexes[i - 1];\n          } else if (this.loop) {\n            this.currentIndex = this.currentIndexes[this.currentIndexes.length - 1];\n          }\n        }\n      }\n    },\n    next() {\n      if (this.currentIndexes.length) {\n        let i = this.currentIndexes.indexOf(this.currentIndex);\n        if (i > -1) {\n          if (this.currentIndexes[i + 1] !== undefined) {\n            this.currentIndex = this.currentIndexes[i + 1];\n          } else if (this.loop) {\n            this.currentIndex = this.currentIndexes[0];\n          }\n        }\n      }\n    },\n    _map(data) {\n      if (bbn.fn.isArray(data)) {\n        data = data.map(a => {\n          let o = bbn.fn.extend(true, {}, a);\n          if (!o.headerComponent && (!bbn.fn.isString(o.header) || bbn.fn.substr(o.header, 0, 1) !== '<')) {\n            o.headerComponent = o.header;\n            delete o.header;\n          }\n          if (!o.headerComponent && (!bbn.fn.isString(o.body) || bbn.fn.substr(o.body, 0, 1) !== '<')) {\n            o.bodyComponent = o.body;\n            delete o.body;\n          }\n          if (!o.footerComponent && (!bbn.fn.isString(o.footer) || bbn.fn.substr(o.footer, 0, 1) !== '<')) {\n            o.footerComponent = o.footer;\n            delete o.footer;\n          }\n          return o;\n        });\n        return (this.map ? data.map(this.map) : data).slice();\n      }\n      return [];\n    },\n    _getStyle(item) {\n      let style = {};\n      if (item.background) {\n        style.backgroundColor = item.background;\n      }\n      if (item.image) {\n        style.backgroundImage = `url(${item.image})`;\n        style.backgroundPosition = 'center';\n        style.backgroundRepeat = 'no-repeat';\n        style.backgroundSize = 'cover';\n      }\n      return style;\n    },\n    _swipeLeft() {\n      this.currentSwipeClass = 'bbn-splashscreen-swipe-left';\n      this.next();\n    },\n    _swipeRight() {\n      this.currentSwipeClass = 'bbn-splashscreen-swipe-right';\n      this.prev();\n    }\n  },\n  created() {\n    this.$on('swipeleft', this._swipeLeft);\n    this.$on('swiperight', this._swipeRight);\n  },\n  mounted() {\n    this.ready = true;\n  },\n  beforeDestroy() {\n    this.$off('swipeleft', this._swipeLeft);\n    this.$off('swiperight', this._swipeRight);\n  },\n  watch: {\n    source: {\n      deep: true,\n      handler() {\n        this.updateData();\n      }\n    },\n    currentIndex(idx) {\n      this.$emit('change', idx, this.source[idx]);\n    }\n  },\n  components: {\n    dots: {\n      template: `\n          <div class=\"bbn-splashscreen-dots bbn-c\">\n            <i v-for=\"idx in indexes\"\n               @click=\"select(idx)\"\n               :class=\"['bbn-padded', 'bbn-p', 'nf nf-fa-circle', {\n                 ' bbn-primary-text': value !== idx,\n                 'bbn-primary-text-alt': value === idx\n               }]\"\n               style=\"width: 02rem; height: 0.2rem\"/>\n          </div>\n        `,\n      props: {\n        value: {\n          type: Number\n        },\n        indexes: {\n          type: Array\n        }\n      },\n      methods: {\n        select(idx) {\n          this.$emit('input', idx);\n        }\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/splashscreen lazy recursive ^\\\\.\\\\/splashscreen\\\\..*\\\\.lang$\")(`./splashscreen.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-splashscreen',\n  definition: cpDef,\n  template: _splashscreen_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _splashscreen_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/splashscreen/splashscreen.js?");

/***/ })

}]);