"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/input-input-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/input/input.less":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/input/input.less ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `bbn-input {\n  display: inline-block;\n}\nbbn-input:hover .bbn-button {\n  opacity: 1;\n}\nbbn-input .bbn-button {\n  opacity: 0.7;\n}\nbbn-input input {\n  width: 100%;\n  font-size: inherit;\n  font-weight: inherit;\n  border-radius: inherit;\n  text-align: inherit;\n}\nbbn-input.bbn-input-nullable .bbn-input-nullable-container {\n  opacity: 0;\n  transition: opacity 0.2s;\n  line-height: 100%;\n  margin: auto;\n  padding-right: 0.2rem;\n}\nbbn-input.bbn-input-nullable .bbn-input-nullable-container .nf-fa-times_circle {\n  line-height: 100%;\n  margin: auto;\n}\nbbn-input.bbn-input-nullable:hover .bbn-input-nullable-container {\n  opacity: 0.3;\n}\nbbn-input .bbn-invisible {\n  opacity: 0;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/input/input.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/components/input/input.html":
/*!*****************************************!*\
  !*** ./src/components/input/input.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[\r\n\tcomponentClass, 'bbn-textbox', {\r\n\t\t'bbn-disabled': !!isDisabled,\r\n\t\t'bbn-input-button-left' : !!buttonLeft,\r\n\t\t'bbn-input-button-right' : !!buttonRight,\r\n\t\t'bbn-invisible' : (type === 'hidden'),\r\n    'bbn-input-nullable': isNullable\r\n\t}]\"\r\n\t:style=\"(currentSize !== '') ? 'width:' + currentSize : '' \">\r\n  <div :class=\"{\r\n    'bbn-w-100': (!buttonLeft && !buttonRight && !nullable),\r\n    'bbn-flex-width' : (buttonLeft || buttonRight || nullable),\r\n    'bbn-nowrap': true\r\n  }\">\r\n    <bbn-button bbn-if=\"buttonLeft\"\r\n          :icon=\"buttonLeft\"\r\n          :action=\"currentActionLeft\"\r\n          tabindex=\"-1\"\r\n          :class=\"[\r\n            'bbn-button-left',\r\n            'bbn-no-vborder',\r\n            {\r\n              'bbn-invisible': autoHideLeft,\r\n              'bbn-disabled': buttonLeftDisabled\r\n            }\r\n          ]\"\r\n          :disabled=\"buttonLeftDisabled\"/>\r\n    <div bbn-if=\"prefix\"\r\n         class=\"bbn-block bbn-h-100 bbn-vmiddle bbn-nowrap\"\r\n         bbn-text=\"prefix\"/>\r\n    <input :value=\"currentValue\"\r\n          :type=\"currentType\"\r\n          bbn-focused.selected=\"focused\"\r\n          :name=\"name\"\r\n          ref=\"element\"\r\n          :readonly=\"readonly ? 'readonly' : false\"\r\n          :required=\"required\"\r\n          :disabled=\"isDisabled\"\r\n          :placeholder=\"placeholder\"\r\n          :maxlength=\"maxlength\"\r\n          :minlength=\"minlength\"\r\n          :autocomplete=\"currentAutocomplete\"\r\n          :pattern=\"currentPattern\"\r\n          @input=\"onInput\"\r\n          @click=\"click\"\r\n          @paste=\"\\$emit('paste', \\$event)\"\r\n          @focus=\"focus\"\r\n          @blur=\"blur\"\r\n          @change=\"change\"\r\n          @mouseenter=\"over\"\r\n          @mouseleave=\"out\"\r\n          :tabindex=\"tabindex\"\r\n          :class=\"{\r\n            'bbn-flex-fill' : (buttonLeft || buttonRight || isNullable),\r\n            'bbn-ellipsis': ellipsis,\r\n            'bbn-radius': !buttonLeft && !buttonRight,\r\n            'bbn-radius-left': !buttonLeft,\r\n            'bbn-radius-right': !buttonRight,\r\n            'bbn-right-lpadding': isNullable && (!readonly || forceNullable) && !isDisabled\r\n          }\"\r\n          :size=\"currentInputSize\"\r\n          :inputmode=\"inputmode\"\r\n          :min=\"min\"\r\n          :max=\"max\"\r\n          :style=\"{\r\n            paddingLeft: prefix ? 0 : null\r\n          }\">\r\n    <bbn-loadicon bbn-if=\"loading\"\r\n                  class=\"bbn-top-right bbn-vmiddle bbn-h-100 bbn-right-xspadded\"/>\r\n    <div bbn-elseif=\"isNullable && (!readonly || forceNullable) && !isDisabled\"\r\n         class=\"bbn-input-nullable-container bbn-vmiddle bbn-top-right bbn-h-100\"\r\n         :style=\"{\r\n           positions: 'absolute',\r\n           top: 0,\r\n           bottom: 0,\r\n           visibility: hasValue ? 'visible' : 'hidden',\r\n           right: buttonRight ? '3rem' : '2px'\r\n         }\">\r\n      <i class=\"nf nf-fa-times_circle bbn-p\"\r\n         @mousedown.prevent.stop=\"clear\"></i>\r\n    </div>\r\n    <bbn-button bbn-if=\"buttonRight\"\r\n                :icon=\"buttonRight\"\r\n                tabindex=\"-1\"\r\n                :action=\"currentActionRight\"\r\n                :class=\"[\r\n                  'bbn-button-right',\r\n                  'bbn-no-vborder',\r\n                  {\r\n                    'bbn-invisible' : autoHideRight,\r\n                    'bbn-disabled': buttonRightDisabled\r\n                  }\r\n                ]\"\r\n                :disabled=\"buttonRightDisabled\"/>\r\n  </div>\r\n</div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/input/input.html?");

/***/ }),

/***/ "./src/components/input/input.less":
/*!*****************************************!*\
  !*** ./src/components/input/input.less ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_input_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./input.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/input/input.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_input_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_input_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_input_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_input_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/input/input.less?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/components/input/input.js":
/*!***************************************!*\
  !*** ./src/components/input/input.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _input_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input.html */ \"./src/components/input/input.html\");\n/* harmony import */ var _input_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./input.less */ \"./src/components/input/input.less\");\n/**\r\n * @file bbn-input component\r\n *\r\n * @description bbn-input is a simple text field.\r\n *\r\n * @author BBN Solutions\r\n * \r\n * @copyright BBN Solutions\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.events\r\n   * @mixin bbn.cp.mixins.input\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.events, bbn.cp.mixins.input],\n  props: {\n    /**\r\n     * Specifies whether a loading icon isshown inside the input field.\r\n     * @prop {Boolean} [false] loading\r\n     */\n    loading: {\n      type: [Boolean],\n      default: false\n    },\n    /**\r\n     * Specifies whether or not the input field should have autocomplete enabled. Accepts boolean or the strings 'on' or 'off'.\r\n     * @prop {Boolean|String} [true] autocomplete\r\n     */\n    autocomplete: {\n      type: [Boolean, String],\n      default: true\n    },\n    /**\r\n     * The type of the input.\r\n     * @prop {String} type\r\n     */\n    type: {\n      type: String,\n      default: 'text'\n    },\n    /**\r\n     * The button's icon on the left of the input.\r\n     * @prop {String} buttonLeft\r\n     */\n    buttonLeft: {\n      type: String\n    },\n    /**\r\n     * The button's icon on the right of the input.\r\n     * @prop {String} buttonRight\r\n     */\n    buttonRight: {\n      type: String\n    },\n    /**\r\n     * Hides the left button. \r\n     * @prop {Boolean} [false] autoHideLeft\r\n     */\n    autoHideLeft: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * Hides the right button.\r\n     * @prop {Boolean} [false] autoHideRight\r\n     */\n    autoHideRight: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * Called when click the left button. \r\n     * @prop {Function} actionLeft\r\n     */\n    actionLeft: {\n      type: Function\n    },\n    /**\r\n     * Called when click the right button. \r\n     * @prop {Function} actionRight\r\n     */\n    actionRight: {\n      type: Function\n    },\n    /**\r\n     * Sets the left button disabled.\r\n     * @prop {Boolean} [false] buttonLeftDisabled\r\n     */\n    buttonLeftDisabled: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * Sets the left button disabled.\r\n     * @prop {Boolean} [false] buttonRightDisabled\r\n     */\n    buttonRightDisabled: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * The title of the left button.\r\n     * @prop {String} buttonLeftTitle\r\n     */\n    buttonLeftTitle: {\n      type: String\n    },\n    /**\r\n     * The title of the right button.\r\n     * @prop {String} buttonRightTitle\r\n     */\n    buttonRightTitle: {\n      type: String\n    },\n    /**\r\n     * The input's attribute 'pattern'.\r\n     * @prop {String} pattern\r\n     */\n    pattern: {\n      type: String\n    },\n    /**\r\n     * The size of the input.\r\n     * @prop {(String|Number)} size\r\n     */\n    size: {\n      type: [String, Number]\n    },\n    /**\r\n     * @prop {(String|Number)} min\r\n     */\n    min: {\n      type: [String, Number]\n    },\n    /**\r\n     * @prop {(String|Number)} max\r\n     */\n    max: {\n      type: [String, Number]\n    },\n    /**\r\n     * @prop {String} prefix\r\n     */\n    prefix: {\n      type: String\n    },\n    /**\r\n     * Forces the input to show the nullable icon even if it is in the read-only state\r\n     * @prop {Boolean} [false] forceNullable\r\n     */\n    forceNullable: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    let currentAutocomplete = 'off';\n    if (this.autocomplete === true) {\n      currentAutocomplete = 'on';\n    } else if (this.autocomplete && bbn.fn.isString(this.autocomplete)) {\n      currentAutocomplete = this.autocomplete;\n    }\n    let currentValue = this.value || '';\n    if (this.prefix && this.value.indexOf(this.prefix) === 0) {\n      currentValue = bbn.fn.substr(currentValue, this.prefix.length);\n    }\n    return {\n      /**\r\n       * @todo not used\r\n       */\n      currentValue,\n      /**\r\n       * The property 'autocomplete' normalized.\r\n       * @data {String} [''] currentAutocomplete\r\n       */\n      currentAutocomplete: currentAutocomplete,\n      /**\r\n       * The property 'size' normalized.\r\n       * @data {String} [''] currentSize\r\n       */\n      currentSize: this.size || '',\n      /**\r\n       * The action performed by the left button.\r\n       * @data {Function} currentActionLeft\r\n       */\n      currentActionLeft: bbn.fn.isFunction(this.actionLeft) ? this.actionLeft : () => this.$emit('clickleftbutton'),\n      /**\r\n       * The action performed by the right button.\r\n       * @data {Function} currentActionRight\r\n       */\n      currentActionRight: bbn.fn.isFunction(this.actionRight) ? this.actionRight : () => this.$emit('clickrightbutton'),\n      currentPattern: null,\n      currentType: null\n    };\n  },\n  computed: {\n    /**\r\n     * The current input width in characters if the 'autosize' is enabled\r\n     * @computed currentInputSize\r\n     * @returns {Number}\r\n     */\n    currentInputSize() {\n      return this.autosize ? this.value ? this.value.toString().length : 1 : 0;\n    }\n  },\n  methods: {\n    clear() {\n      this.emitInput(this.prefix || (this.nullable ? null : ''));\n      this.currentValue = '';\n    },\n    init() {\n      if (this.pattern) {\n        let types = ['text', 'date', 'search', 'url', 'tel', 'email', 'password'];\n        this.currentPattern = this.pattern;\n        this.currentType = types.includes(this.type) ? this.type : 'text';\n      } else if (this.type === 'hostname') {\n        this.currentPattern = bbn.var.regexp.hostname.source;\n        this.currentType = 'text';\n      } else if (this.type === 'ip') {\n        this.currentPattern = bbn.var.regexp.ip.source;\n        this.currentType = 'text';\n      } else {\n        this.currentPattern = this.pattern;\n        this.currentType = this.type;\n      }\n    },\n    emitValue(v) {\n      if (this.prefix && v.indexOf(this.prefix) !== 0) {\n        v = this.prefix + v;\n      }\n      this.emitInput(!v && this.nullable ? null : v);\n    },\n    /*\r\n    inputFieldUpdate() {\r\n      if (this.inputFieldUpdater !== undefined) {\r\n        clearTimeout(this.inputFieldUpdater);\r\n      }\r\n        this.inputFieldUpdater = setTimeout(() => {\r\n        const ele = this.getRef('element');\r\n        if (ele && (ele.value !== this.currentValue)) {\r\n          this.getRef('element').value = this.currentValue;\r\n        }\r\n      }, 50);\r\n    }*/\n    onInput(ev) {\n      ev.stopPropagation();\n      ev.stopImmediatePropagation();\n      this.currentValue = ev.target.value;\n    }\n  },\n  created() {\n    this.init();\n  },\n  mounted() {\n    if (this.value !== this.currentValue) {\n      this.emitValue(this.currentValue);\n    }\n    this.ready = true;\n  },\n  watch: {\n    value(v) {\n      if (this.prefix && v.indexOf(this.prefix) === 0) {\n        v = bbn.fn.substr(v, this.prefix.length);\n      }\n      if (this.currentValue !== v) {\n        this.currentValue = v || '';\n      }\n    },\n    currentValue(v) {\n      if (this.value !== (this.prefix || '') + this.currentValue) {\n        this.emitValue(v);\n      }\n    },\n    required(v) {\n      const ele = this.getRef('element');\n      if (ele) {\n        if (v) {\n          ele.setAttribute('required', '');\n        } else if (ele.hasAttribute('required')) {\n          ele.removeAttribute('required');\n        }\n      }\n    },\n    type(newVal) {\n      this.init();\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'undefined'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-input',\n  definition: cpDef,\n  template: _input_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _input_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/input/input.js?");

/***/ })

}]);