"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/dropdown-dropdown-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/dropdown/dropdown.less":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/dropdown/dropdown.less ***!
  \****************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-dropdown {\n  display: inline-block;\n  box-sizing: border-box;\n  cursor: pointer;\n  text-align: left;\n}\n.bbn-dropdown.bbn-c,\n.bbn-dropdown.bbn-center {\n  text-align: center;\n}\n.bbn-dropdown.bbn-r,\n.bbn-dropdown.bbn-right {\n  text-align: right;\n}\n.bbn-dropdown.bbn-dropdown-autosize {\n  min-width: 4rem;\n}\n.bbn-dropdown:hover .bbn-dropdown-select-button:not(.bbn-disabled) {\n  opacity: 1;\n  background: none, linear-gradient(to bottom, var(--effect) 0%, rgba(255, 255, 255, 0) 100%) 50% 50% repeat var(--hover-background);\n}\n.bbn-dropdown .bbn-dropdown-container {\n  line-height: normal;\n}\n.bbn-dropdown .bbn-dropdown-container.bbn-dropdown-container-native {\n  min-width: 6rem;\n}\n.bbn-dropdown .bbn-dropdown-container .bbn-dropdown-content {\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.bbn-dropdown .bbn-dropdown-container .bbn-input,\n.bbn-dropdown .bbn-dropdown-container select {\n  background-color: transparent;\n  max-width: 100%;\n  width: 100%;\n  height: 100%;\n}\n.bbn-dropdown .bbn-dropdown-container .bbn-input div.bbn-flex-width,\n.bbn-dropdown .bbn-dropdown-container select div.bbn-flex-width {\n  height: 100%;\n  box-sizing: border-box;\n  /* \n        position: absolute;\n        top: 0px;\n        left: 0px;\n        bottom: 0px;\n        right: 0px;\n        overflow: hidden; */\n}\n.bbn-dropdown .bbn-dropdown-container .bbn-input div.bbn-flex-width .bbn-button,\n.bbn-dropdown .bbn-dropdown-container select div.bbn-flex-width .bbn-button {\n  line-height: 100%;\n  margin: 0;\n}\n.bbn-dropdown .bbn-dropdown-container .bbn-input input,\n.bbn-dropdown .bbn-dropdown-container select input {\n  cursor: pointer;\n}\n.bbn-dropdown .bbn-dropdown-container select {\n  min-width: 4rem;\n  font-size: inherit;\n  font-weight: inherit;\n  border-radius: inherit;\n  color: inherit;\n  border: 0;\n  padding: 0.0833rem 0.25rem;\n  padding-right: 2.45rem;\n  box-sizing: border-box;\n  appearance: none;\n  -webkit-appearance: none;\n  z-index: 1;\n}\n.bbn-dropdown .bbn-dropdown-container .bbn-dropdown-select-button {\n  min-width: 2rem;\n  opacity: 0.7;\n  z-index: 0;\n  min-height: 100%;\n  max-height: 100%;\n}\n*.bbn-flex-width > .bbn-dropdown .bbn-dropdown-container {\n  height: 100%;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/dropdown/dropdown.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/dropdown/dropdown.html":
/*!***********************************************!*\
  !*** ./src/components/dropdown/dropdown.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[\r\n       componentClass,\r\n       'bbn-iblock',\r\n       'bbn-textbox',\r\n       {'bbn-disabled': !!isDisabled}\r\n     ]\"\r\n     @mouseenter=\"isOverDropdown = true\"\r\n     @mouseleave=\"isOverDropdown = false\"\r\n     @focusin=\"isActive = true\"\r\n     @focusout=\"onFocusOut\">\r\n  <div :class=\"['bbn-rel', 'bbn-dropdown-container', 'bbn-flex-width', 'bbn-vmiddle', currentItemCls, {\r\n    'bbn-dropdown-container-native': native\r\n  }]\">\r\n    <div bbn-if=\"sourceIcon && hasValue && !!currentItemIcon\"\r\n         class=\"bbn-left-xspadded\">\r\n      <i :class=\"currentItemIcon\"\r\n         @click.stop=\"click\" />\r\n    </div>\r\n    <div bbn-if=\"sourceImg && hasValue && !!currentItemImg\"\r\n         class=\"bbn-left-xspadded\">\r\n      <img :src=\"currentItemImg\"\r\n           @click.stop=\"click\">\r\n    </div>\r\n    <bbn-input bbn-if=\"!native && _1strun\"\r\n               ref=\"input\"\r\n               class=\"bbn-no-border bbn-flex-fill\"\r\n               bbn-model=\"currentText\"\r\n               @keydown=\"keydown\"\r\n               @keyup=\"keyup\"\r\n               @click.stop=\"click\"\r\n               @paste=\"paste\"\r\n               @clickrightbutton.stop=\"click\"\r\n               :button-right-disabled=\"isDisabled || readonly\"\r\n               :disabled=\"isDisabled\"\r\n               autocorrect=\"off\"\r\n               autocapitalize=\"off\"\r\n               spellcheck=\"false\"\r\n               :required=\"required\"\r\n               :nullable=\"isNullable\"\r\n               :force-nullable=\"isNullable\"\r\n               :placeholder=\"placeholder\"\r\n               :tabindex=\"isDisabled ? -1 : 0\"\r\n               :button-right=\"currentIcon\"\r\n               :autosize=\"autosize\"\r\n               :readonly=\"true\"\r\n               :ellipsis=\"true\"\r\n               @focus=\"focus\"\r\n               @blur=\"blur\"/>\r\n    <template bbn-elseif=\"_1strun\">\r\n      <bbn-button :icon=\"currentIcon\"\r\n                  tabindex=\"-1\"\r\n                  :class=\"['bbn-dropdown-select-button', 'bbn-button-right', 'bbn-no-vborder', 'bbn-m', 'bbn-top-right', {\r\n                    'bbn-disabled': !filteredData.length || !!isDisabled || !!readonly\r\n                  }]\"\r\n                  :disabled=\"!filteredData.length || !!isDisabled || !!readonly\"/>\r\n      <select bbn-model=\"currentSelectValue\"\r\n              class=\"bbn-textbox bbn-no-border bbn-flex-fill bbn-p\"\r\n              :required=\"required\"\r\n              ref=\"input\"\r\n              @blur=\"ev => {isOpened = false; blur(ev)}\"\r\n              @change=\"selectOnNative\"\r\n              @focus=\"ev => {isOpened = true; focus(ev)}\"\r\n              @click=\"isOpened = true\"\r\n              :disabled=\"!!isDisabled || !!readonly\">\r\n        <option :value=\"isNullable ? null : ''\"\r\n                bbn-html=\"isNullable && !((value === '') || (value === null)) ? _('Clear') : placeholder\"\r\n                :disabled=\"!isNullable\"\r\n                :selected=\"(value === '') || (value === null)\"/>\r\n        <option bbn-for=\"d in filteredData\"\r\n                :value=\"d.data[sourceValue]\"\r\n                bbn-html=\"d.data[sourceText]\"\r\n                :disabled=\"!!d.data[sourceDisabled]\"/>\r\n      </select>\r\n    </template>\r\n  </div>\r\n  <input type=\"hidden\"\r\n         :value=\"value\"\r\n         ref=\"element\"\r\n         :name=\"name\">\r\n  <bbn-floater bbn-if=\"!popup\r\n                    && filteredData.length\r\n                    && !isDisabled\r\n                    && !readonly\r\n                    && ready\r\n                    && !native\r\n                    && (isOpened || preload)\"\r\n              bbn-show=\"isOpened\"\r\n              bbn-portal=\"portalSelector && !isInsideFloater ? portalSelector : false\"\r\n              :element=\"asMobile ? undefined : \\$el\"\r\n              :max-height=\"asMobile ? undefined : maxHeight\"\r\n              :min-width=\"\\$el.clientWidth\"\r\n              :width=\"asMobile ? '100%' : undefined\"\r\n              :height=\"asMobile ? '100%' : undefined\"\r\n              ref=\"list\"\r\n              :uid=\"sourceValue\"\r\n              :item-component=\"realComponent\"\r\n              @ready=\"attachList\"\r\n              @select=\"onSelect\"\r\n              :children=\"null\"\r\n              :suggest=\"true\"\r\n              @mouseenter=\"isOverDropdown = true\"\r\n              @mouseleave=\"isOverDropdown = false\"\r\n              :selected=\"value ? [value] : []\"\r\n              @close=\"isOpened = false\"\r\n              :source=\"filteredData\"\r\n              :source-text=\"sourceText\"\r\n              :source-value=\"sourceValue\"\r\n              :source-url=\"sourceUrl\"\r\n              :source-icon=\"sourceIcon\"\r\n              :title=\"floaterTitle\"\r\n              :buttons=\"asMobile ? realButtons : []\"\r\n              :groupable=\"groupable\"\r\n              :source-group=\"sourceGroup\"\r\n              :group-component=\"groupComponent\"\r\n              :group-style=\"groupStyle\"/>\r\n</div>\r\n`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/dropdown/dropdown.html?");

/***/ }),

/***/ "./src/components/dropdown/dropdown.less":
/*!***********************************************!*\
  !*** ./src/components/dropdown/dropdown.less ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_dropdown_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./dropdown.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/dropdown/dropdown.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_dropdown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_dropdown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_dropdown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_dropdown_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/dropdown/dropdown.less?");

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

/***/ "./src/components/dropdown/dropdown.js":
/*!*********************************************!*\
  !*** ./src/components/dropdown/dropdown.js ***!
  \*********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bbn/bbn */ \"./node_modules/@bbn/bbn/dist/index.js\");\n/* harmony import */ var _dropdown_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown.html */ \"./src/components/dropdown/dropdown.html\");\n/* harmony import */ var _dropdown_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dropdown.less */ \"./src/components/dropdown/dropdown.less\");\n/**\r\n * @file bbn-dropdown component\r\n *\r\n * @description The easy-to-implement bbn-dropdown component allows you to choose a single value from a user-supplied list.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author BBN Solutions\r\n *\r\n * @created 10/02/2017.\r\n */\n\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.events\r\n   * @mixin bbn.cp.mixins.input\r\n   * @mixin bbn.cp.mixins.resizer\r\n   * @mixin bbn.cp.mixins.list\r\n   * @mixin bbn.cp.mixins.keynav\r\n   * @mixin bbn.cp.mixins.url\r\n   * @mixin bbn.cp.mixins.dropdown\r\n   * @mixin bbn.cp.mixins.localStorage\r\n    */\n  mixins: [_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.basic, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.events, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.input, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.resizer, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.list, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.keynav, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.url, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.dropdown, _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cp.mixins.localStorage],\n  props: {\n    /**\r\n     * @prop {Boolean} [false] notext\r\n     */\n    notext: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {\n      startingTmpValue: '',\n      startingTmpTimeout: null\n    };\n  },\n  /**\r\n   * The current icon.\r\n   *\r\n   * @computed currentIcon\r\n   * @return {String}\r\n  */\n  beforeMount() {\n    if (this.hasStorage) {\n      let v = this.getStorage();\n      if (v && v !== this.value) {\n        this.emitInput(v);\n      }\n    }\n  },\n  methods: {\n    /**\r\n     * States the role of the enter key on the dropdown menu.\r\n     *\r\n     * @method keydown\r\n     * @param {Event} e\r\n     * @fires widget.select\r\n     * @fires widget.open\r\n     * @fires commonKeydown\r\n     * @fires resetDropdown\r\n     * @fires keynav\r\n     */\n    keydown(e) {\n      if (this.commonKeydown(e)) {\n        return;\n      } else if (this.isOpened && e.key === 'Escape') {\n        e.stopPropagation();\n        e.preventDefault();\n        this.resetDropdown();\n      } else if (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].var.keys.dels.includes(e.which) && !this.filterString) {\n        e.preventDefault();\n        this.resetDropdown();\n      } else if (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].var.keys.upDown.includes(e.keyCode)) {\n        e.preventDefault();\n        this.keynav(e);\n      } else if (!this.isSearching && e.key === ' ') {\n        e.preventDefault();\n        this.isOpened = !this.isOpened;\n      } else if (this.isOpened && e.key === 'Enter') {\n        e.preventDefault();\n        this.selectOver();\n      }\n    },\n    paste() {\n      //alert(\"PASTE\");\n    },\n    keyup(e) {\n      if (e.key.match(/^[A-z0-9\\s]{1}$/)) {\n        this.startingTmpValue += e.key;\n        _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.log(\"keyup\");\n        if (!this.isOpened) {\n          this.isOpened = true;\n        }\n      }\n    },\n    selectOnNative(ev) {\n      if (!ev.defaultPrevented) {\n        if (ev.target.value === '') {\n          this.emitInput(this.isNullable ? null : '');\n          this.$emit('change', this.isNullable ? null : '', -1, -1, ev);\n        } else {\n          let idx = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.search(this.filteredData, 'data.' + this.sourceValue, ev.target.value);\n          if (idx > -1) {\n            let item = this.filteredData[idx].data;\n            if (this.sourceAction && item[this.sourceAction] && _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isFunction(item[this.sourceAction])) {\n              item[this.sourceAction](item);\n            } else if (this.sourceUrl !== undefined && item[this.sourceUrl]) {\n              _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.link(item[this.sourceUrl]);\n            } else if (item[this.uid || this.sourceValue] !== undefined) {\n              this.emitInput(item[this.uid || this.sourceValue]);\n              this.$emit('change', item[this.uid || this.sourceValue], idx, this.filteredData[idx].index, ev);\n              _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.log('yes', item[this.uid || this.sourceValue], idx, this.filteredData[idx].index, ev);\n            }\n          }\n        }\n      }\n      this.isOpened = false;\n    }\n  },\n  /**\r\n   * @event created\r\n   */\n  beforeCreate() {\n    this.$on('dataloaded', () => {\n      if (this.value !== undefined && !this.currentText.length) {\n        let row = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.getRow(this.currentData, a => {\n          return a.data[this.sourceValue] === this.value;\n        });\n        if (row) {\n          let txt = row.data[this.sourceText];\n          if (this.selectedText) {\n            txt = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.isFunction(this.selectedText) ? this.selectedText(row.data) : row.data[this.selectedText];\n          }\n          this.currentText = this.clearHtml ? _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.html2text(txt) : txt;\n          //bbn.fn.log([\"CHANGIN CURRENT TEXT\", this.currentText]);\n        }\n      }\n    });\n  },\n  beforeDestroy() {\n    let fl = this.getRef('list');\n    if (fl && fl.$el) {\n      fl.$destroy();\n      fl.$el.parentNode.removeChild(fl.$el);\n    }\n  },\n  watch: {\n    startingTmpValue(v) {\n      if (v) {\n        let fl = this.getRef('list');\n        if (fl) {\n          let lst = fl.getRef('list');\n          if (lst) {\n            lst.overByString(v);\n          }\n        }\n        if (this.startingTmpTimeout) {\n          clearTimeout(this.startingTmpTimeout);\n        }\n        this.startingTmpTimeout = setTimeout(() => {\n          this.startingTmpValue = '';\n        }, 1000);\n      }\n    },\n    /**\r\n     * @watch  isOpened\r\n     */\n    isOpened(val) {\n      if (this.popup && val && !this.native) {\n        this.popupComponent.open({\n          title: false,\n          element: this.$el,\n          maxHeight: this.maxHeight,\n          minWidth: this.$el.clientWidth,\n          autoHide: true,\n          uid: this.sourceValue,\n          itemComponent: this.realComponent,\n          onSelect: this.select,\n          position: 'bottom',\n          suggest: true,\n          modal: false,\n          selected: [this.value],\n          onClose: () => {\n            this.isOpened = false;\n          },\n          source: this.filteredData.map(a => _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fn.extend({\n            value: a.data.text\n          }, a.data)),\n          sourceAction: this.sourceAction,\n          sourceText: this.sourceText,\n          sourceValue: this.sourceValue\n        });\n      }\n      if (!val && this.preload && !this.native) {\n        this.getRef('list').currentVisible = true;\n      }\n    },\n    /**\r\n     * @watch  currentText\r\n     */\n    currentText(newVal) {\n      if (this.ready) {\n        if (!newVal && this.value) {\n          this.emitInput(this.isNullable && this.nullable !== null ? this.nullValue : '');\n          this.filterString = '';\n        } else {\n          this.filterString = newVal === this.currentTextValue ? '' : newVal;\n        }\n      }\n    },\n    /**\r\n     * @watch  currentSelectValue\r\n     */\n    currentSelectValue(newVal) {\n      if (this.ready && newVal !== this.value) {\n        this.emitInput(newVal);\n        this.$emit('change', newVal);\n      }\n    },\n    filterString(v) {\n      let args = [0, this.currentFilters.conditions.length ? 1 : 0];\n      if (v && this.isActive) {\n        args.push({\n          field: this.sourceText,\n          operator: 'startswith',\n          value: v\n        });\n      }\n      this.currentFilters.conditions.splice(...args);\n    },\n    value(v) {\n      if (v !== this.currentSelectValue) {\n        this.currentSelectValue = v;\n      }\n      this.$nextTick(() => {\n        this.currentText = this.currentTextValue;\n      });\n      if (this.storage) {\n        if (v) {\n          this.setStorage(v);\n        } else {\n          this.unsetStorage();\n        }\n      }\n    }\n  }\n};\n\n\n\nlet cpLang = {};\nif (_bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.lang) {\n  try {\n    const lang = _bbn_bbn__WEBPACK_IMPORTED_MODULE_0__[\"default\"].env.lang || 'en';\n    cpLang = await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'undefined'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-dropdown',\n  definition: cpDef,\n  template: _dropdown_html__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  style: _dropdown_less__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/dropdown/dropdown.js?");

/***/ })

}]);