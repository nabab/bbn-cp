/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbbn_axios_dayjs"] = self["webpackChunkbbn_axios_dayjs"] || []).push([["components/panelbar-panelbar-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/panelbar/panelbar.less":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/panelbar/panelbar.less ***!
  \****************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-panelbar .bbn-panelbar-bbn-header {\n  border-top: none;\n  border-right: none;\n  border-left: none;\n  border-radius: 0;\n  margin-bottom: 0;\n  width: 100%;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-arrow-container {\n  width: 3rem;\n  height: 100%;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-arrow-container .bbn-panelbar-header-icon {\n  display: inline-block;\n  transform: rotate(0deg);\n  transition-duration: 0.3s;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-arrow-container .bbn-panelbar-header-icon.bbn-panelbar-header-icon-rotate {\n  transform: rotate(90deg);\n  transition-duration: 0.3s;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-title {\n  margin-right: 3rem;\n  margin-left: 3rem;\n  width: 100%;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-title.bbn-panelbar-center {\n  justify-content: center;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-title.bbn-panelbar-start {\n  justify-content: flex-start;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-title.bbn-panelbar-end {\n  justify-content: flex-end;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-title .bbn-panelbar-right-padded {\n  padding-right: 2rem;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-selected,\n.bbn-panelbar .bbn-panelbar-bbn-header .bbn-panelbar-content {\n  transition: all 2s;\n  transition: height 0.8s;\n}\n.bbn-panelbar .bbn-panelbar-bbn-header .buttons button {\n  border: 0;\n}\n.bbn-panelbar .bbn-panelbar-inline {\n  display: inline;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/panelbar/panelbar.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/panelbar/panelbar.html":
/*!***********************************************!*\
  !*** ./src/components/panelbar/panelbar.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[componentClass]\\\">\\r\\n  <div class=\\\"bbn-bordered bbn-h-100\\\">\\r\\n    <div class=\\\"bbn-flex-height\\\" ref=\\\"container\\\">\\r\\n      <template v-for=\\\"(s, idx) in source\\\">\\r\\n        <div :class=\\\"['bbn-panelbar-bbn-header', 'bbn-header', 'bbn-unselectable', 'bbn-spadded', 'bbn-vmiddle', {'bbn-panelbar-header-selected': isSelected(idx)}]\\\"\\r\\n             ref=\\\"header\\\">\\r\\n          <div class=\\\"bbn-panelbar-arrow-container bbn-hspadded bbn-p bbn-middle bbn-block\\\"\\r\\n               @click=\\\"multiple ? multiselect(idx) : select(idx)\\\">\\r\\n            <i :class=\\\"['nf nf-fa-angle_right', 'bbn-panelbar-header-icon', 'bbn-large',  {'bbn-panelbar-header-icon-rotate': multiple ? isSelected(idx) : (preselected === idx)}]\\\"></i>\\r\\n          </div>\\r\\n          <div :class=\\\"['bbn-panelbar-title', 'bbn-vmiddle', {\\r\\n                  'bbn-panelbar-center': (align === 'center'),\\r\\n                  'bbn-panelbar-start': (align === 'left'),\\r\\n                  'bbn-panelbar-end': (align === 'right'),\\r\\n                }]\\\"\\r\\n          >\\r\\n            <div v-html=\\\"s.header\\\"\\r\\n                @click=\\\"multiple ? multiselect(idx) : select(idx)\\\"\\r\\n                :class=\\\"{\\r\\n                  'bbn-p':true,\\r\\n                  'bbn-panelbar-inline': s.headerComponent,\\r\\n                  'bbn-panelbar-right-padded': s.headerComponent || headerComponent\\r\\n                }\\\"\\r\\n            ></div>\\r\\n            <component v-if=\\\"s.headerComponent\\\"\\r\\n                      :is=\\\"s.headerComponent\\\"\\r\\n                      v-bind=\\\"source[idx]['headerOptions']\\\"\\r\\n            ></component>\\r\\n            <component v-if=\\\"headerComponent && !s.headerComponent\\\"\\r\\n                      :is=\\\"headerComponent\\\"\\r\\n                      v-bind=\\\"headerOptions\\\"\\r\\n            ></component>\\r\\n          </div>\\r\\n        </div>\\r\\n        <div :class=\\\"['bbn-border-box', {\\r\\n              'bbn-w-100': !scrollable,\\r\\n              'bbn-panelbar-selected' : isSelected(idx),\\r\\n              'bbn-flex-fill': isSelected(idx) && (flex || source[idx].flex || scrollable)\\r\\n            }]\\\"\\r\\n            :style=\\\"getStyle(idx)\\\"\\r\\n        >\\r\\n          <component :is=\\\"scrollable ? 'bbn-scroll' : 'div'\\\"\\r\\n                     :class=\\\"{'bbn-w-100': !scrollable}\\\"\\r\\n                     :key=\\\"idx\\\"\\r\\n          >\\r\\n            <div v-if=\\\"!s.component && !component\\\"\\r\\n                 v-html=\\\"s.content\\\"\\r\\n            ></div>\\r\\n            <div v-else-if=\\\"!s.component && component\\\"\\r\\n                :class=\\\"['bbn-panelbar-content', {'bbn-w-100': !scrollable}]\\\"\\r\\n            >\\r\\n              <component :is=\\\"component\\\"\\r\\n                        v-bind=\\\"componentOptions\\\"\\r\\n                        :class=\\\"{'bbn-w-100': !scrollable}\\\"\\r\\n                        @hook:mounted=\\\"$emit('componentMounted', component, componentOptions, s)\\\"\\r\\n              ></component>\\r\\n            </div>\\r\\n            <div v-else-if=\\\"(s.component)\\\"\\r\\n                :class=\\\"['bbn-panelbar-content', {'bbn-w-100': !scrollable}]\\\"\\r\\n            >\\r\\n              <component :is=\\\"s.component\\\"\\r\\n                         v-bind=\\\"source[idx]['componentOptions']\\\"\\r\\n                         :class=\\\"{'bbn-w-100': !scrollable}\\\"\\r\\n                         @hook:mounted=\\\"$emit('componentMounted', s.component, s.componentOptions, s)\\\"\\r\\n              ></component>\\r\\n            </div>\\r\\n          </component>\\r\\n        </div>\\r\\n      </template>\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/panelbar/panelbar.html?");

/***/ }),

/***/ "./src/components/panelbar/panelbar.less":
/*!***********************************************!*\
  !*** ./src/components/panelbar/panelbar.less ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_panelbar_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./panelbar.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/panelbar/panelbar.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_panelbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_panelbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_panelbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_panelbar_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/panelbar/panelbar.less?");

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

/***/ "./src/components/panelbar lazy recursive ^\\.\\/panelbar\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/panelbar/ lazy ^\.\/panelbar\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/components/panelbar lazy recursive ^\\\\.\\\\/panelbar\\\\..*\\\\.lang$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/panelbar/_lazy_^\\.\\/panelbar\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/panelbar/panelbar.js":
/*!*********************************************!*\
  !*** ./src/components/panelbar/panelbar.js ***!
  \*********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _panelbar_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./panelbar.html */ \"./src/components/panelbar/panelbar.html\");\n/* harmony import */ var _panelbar_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panelbar.less */ \"./src/components/panelbar/panelbar.less\");\n/**\r\n * @file bbn-panelbar component\r\n * @description bbn-panelbar is a component that configures itself easily, it allows to visualize the data in a hierarchical way expandable to levels.\r\n * It can contain texts, html elements and even Vue components, the latter can be inserted both on its content but also as a header.\r\n * Those who use this component have the possibility to see schematically their data with the maximum simplicity of interpretation.\r\n * @copyright BBN Solutions\r\n * @author Loredana Bruno\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.localStorage\r\n   * @mixin bbn.cp.mixins.resizer\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.localStorage, bbn.cp.mixins.resizer],\n  props: {\n    /**\r\n     * @prop {Boolean} [false] multiple\r\n     */\n    multiple: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * @prop {Boolean} [false] flex\r\n     */\n    flex: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * The source of the component. The object item has property:\r\n     * - header // the title on the header\r\n     * - headerComponent // a component on the header\r\n     * - headerOptions // options relative to the component on the header\r\n     * - content // the content html or text to show when the item is selected\r\n     * - component // a component to show when the item is selected\r\n     * - height // the height of the item's slot, it will overwrite the props itemsHeight for the item\r\n     * - options // options of configuration of the component shown in the slot of the item\r\n     * @prop {Array} items\r\n     */\n    source: {\n      type: Array\n    },\n    /**\r\n     * @prop {Boolean} [true] scrollable\r\n     */\n    scrollable: {\n      type: Boolean,\n      default: true\n    },\n    /**\r\n     * @prop {String} ['center'] align\r\n     */\n    align: {\n      type: String,\n      default: 'center'\n    },\n    /**\r\n     * Specifies whether or not an index will be expanded\r\n     * @prop {Number} opened\r\n     */\n    opened: {\n      type: Number\n    },\n    /**\r\n     * The component to be rendered on each header if not specified for the single item in the source\r\n     * @prop {String} headerComponent\r\n     */\n    headerComponent: {\n      type: String\n    },\n    /**\r\n     * The object of properties to bind with the headerComponent\r\n     * @prop {Object} headerOptions\r\n     */\n    headerOptions: {\n      type: Object\n    },\n    /**\r\n     * The component to be rendered in each content slot if not specified for the single item in the source\r\n     * @prop {String} component\r\n     */\n    component: {\n      type: String\n    },\n    /**\r\n     * The object of properties to bind with the component in the content slot\r\n     * @prop {Object} componentOptions\r\n     */\n    componentOptions: {\n      type: Object\n    }\n  },\n  data() {\n    return {\n      selectedValues: [],\n      /**\r\n       * @data {Number} [null] size\r\n       */\n      size: null,\n      /**\r\n       * The index of the selected item\r\n       * @data {Number} [null] selected\r\n       */\n      selected: null,\n      /**\r\n       * @data {Number} [null] preselected\r\n       */\n      preselected: null,\n      /**\r\n       * @data {Number} [0] childHeight\r\n       */\n      childHeight: 0\n    };\n  },\n  computed: {\n    /**\r\n     * @computed headers\r\n     */\n    headers() {\n      return this.$refs['header'];\n    }\n  },\n  methods: {\n    isSelected(idx) {\n      if (!this.multiple) {\n        return this.selected === idx;\n      } else {\n        return this.selectedValues.includes(idx);\n      }\n    },\n    /**\r\n     * @method onResize\r\n     */\n    onResize() {\n      this.size = this.$el.clientHeight;\n    },\n    multiselect(idx) {\n      if (!this.selectedValues.includes(idx)) {\n        this.selectedValues.push(idx);\n      } else {\n        this.selectedValues.splice(this.selectedValues.indexOf(idx), 1);\n      }\n    },\n    /**\r\n      * Shows the content of selected items and emits the event select\r\n      * @method select\r\n      * @param {Number} idx\r\n      * @emits select\r\n      * @fires getStyle\r\n      */\n    select(idx) {\n      if (this.selected !== idx) {\n        this.preselected = idx;\n        if (this.selected === null) {\n          setTimeout(() => {\n            this.selected = idx;\n          }, 300);\n        } else {\n          this.selected = idx;\n        }\n        this.$emit('select', idx, this.source[idx]);\n        if (!this.flex) {\n          this.$nextTick(() => {\n            this.getStyle(idx);\n          });\n        }\n      } else {\n        this.preselected = null;\n        this.selected = null;\n      }\n    },\n    /**\r\n     * @method getStyle\r\n     * @param {Number} idx\r\n     * @fires getRef\r\n     * @return {Object}\r\n     */\n    getStyle(idx) {\n      if (!this.multiple) {\n        if (idx !== null && idx === this.preselected && (this.flex || this.source[idx] !== undefined && this.source[idx].flex === true)) {\n          return this.size ? {\n            height: this.size + 'px',\n            overflow: 'hidden'\n          } : {};\n        }\n        //if this.flex === false, case of panelbar containing a table or other content that has an height\n        else if (idx !== null && idx === this.preselected && (!this.flex || this.source[idx] !== undefined && this.source[idx].flex === false)) {\n          let children = this.getRef('container').children,\n            res = [],\n            childHeight = 0;\n          bbn.fn.each(children, a => {\n            if (a.classList.contains('bbn-border-box')) {\n              res.push(a);\n            }\n          });\n          this.$nextTick(() => {\n            if (res[idx] && res[idx].firstElementChild.clientHeight) {\n              this.childHeight = res[idx].firstElementChild.clientHeight;\n            }\n            return this.size ? {\n              height: this.childHeight + 'px',\n              overflow: 'hidden'\n            } : {};\n          });\n        } else {\n          return {\n            height: '0px',\n            overflow: 'hidden'\n          };\n        }\n      } else {\n        if (this.selectedValues.includes(idx) && idx !== null && (this.flex || this.source[idx] !== undefined && this.source[idx].flex === true)) {\n          return this.size ? {\n            height: this.size + 'px',\n            overflow: 'hidden'\n          } : {};\n        }\n        //if this.flex === false, case of panelbar containing a table or other content that has an height\n        else if (this.selectedValues.includes(idx) && idx !== null && (!this.flex || this.source[idx] !== undefined && this.source[idx].flex === false)) {\n          let children = this.getRef('container').children,\n            res = [],\n            childHeight = 0;\n          bbn.fn.each(children, a => {\n            if (a.classList.contains('bbn-border-box')) {\n              res.push(a);\n            }\n          });\n          this.$nextTick(() => {\n            if (res[idx] && res[idx].firstElementChild.clientHeight) {\n              this.childHeight = res[idx].firstElementChild.clientHeight;\n            }\n            return this.size ? {\n              height: this.childHeight + 'px',\n              overflow: 'hidden'\n            } : {};\n          });\n        } else {\n          return {\n            height: '0px',\n            overflow: 'hidden'\n          };\n        }\n      }\n    }\n  },\n  /**\r\n    * Select the index of item defined by the prop opened\r\n    * @event mounted\r\n    * @fires select\r\n    */\n  mounted() {\n    if (this.opened !== undefined) {\n      this.$nextTick(() => {\n        this.select(this.opened);\n      });\n    }\n  },\n  watch: {\n    /**\r\n     * @watch selected\r\n     */\n    selected(v, o) {\n      if (v !== null) {\n        setTimeout(() => {\n          this.headers[v].style.overflow = null;\n        }, 300);\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/panelbar lazy recursive ^\\\\.\\\\/panelbar\\\\..*\\\\.lang$\")(`./panelbar.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-panelbar',\n  definition: cpDef,\n  template: _panelbar_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _panelbar_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://bbn.axios.dayjs/./src/components/panelbar/panelbar.js?");

/***/ })

}]);