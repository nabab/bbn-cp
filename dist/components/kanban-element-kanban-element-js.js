/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/kanban-element-kanban-element-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/kanban-element/kanban-element.less":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/kanban-element/kanban-element.less ***!
  \****************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-kanban-element {\n  display: block;\n}\n.bbn-kanban-element .verticaltext {\n  text-orientation: upright;\n  writing-mode: vertical-lr;\n}\n.bbn-kanban-element .bbn-kanban-element-header {\n  padding-bottom: 0;\n}\n.bbn-kanban-element .bbn-kanban-element-loader {\n  padding: 0;\n  position: relative !important;\n}\n.bbn-kanban-element .bbn-kanban-element-footer {\n  width: 100%;\n  position: relative;\n  box-sizing: border-box;\n  padding: var(--sspace);\n  padding-top: 0;\n}\n.bbn-kanban-element .bbn-kanban-element-footer .bbn-pager {\n  border: 0;\n  border-radius: var(--default-border-radius);\n}\n.bbn-kanban-element .bbn-kanban-element-footer .bbn-pager .bbn-button {\n  border: 0;\n}\n.bbn-kanban-element .bbn-kanban-element-footer .bbn-pager .bbn-numeric {\n  border: 0;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/kanban-element/kanban-element.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

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

/***/ "./src/components/kanban-element/_i18n lazy recursive ^\\.\\/kanban\\-element\\..*\\.lang$":
/*!***********************************************************************************************************!*\
  !*** ./src/components/kanban-element/_i18n/ lazy ^\.\/kanban\-element\..*\.lang$ strict namespace object ***!
  \***********************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./kanban-element.fr.lang\": [\n\t\t\"./src/components/kanban-element/_i18n/kanban-element.fr.lang\",\n\t\t\"src_components_kanban-element__i18n_kanban-element_fr_lang\"\n\t],\n\t\"./kanban-element.it.lang\": [\n\t\t\"./src/components/kanban-element/_i18n/kanban-element.it.lang\",\n\t\t\"src_components_kanban-element__i18n_kanban-element_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/kanban-element/_i18n lazy recursive ^\\\\.\\\\/kanban\\\\-element\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/kanban-element/_i18n/_lazy_^\\.\\/kanban\\-element\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/kanban-element/kanban-element.html":
/*!***********************************************************!*\
  !*** ./src/components/kanban-element/kanban-element.html ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[componentClass, 'bbn-radius', {'collapsed': collapsed}]\"\n      :key=\"index\"\n      :style=\"{width: !collapsed ? width : '', height: scrollable ? '100%' : 'auto'}\"\n      bbn-show=\"isVisible\">\n  <div :class=\"['bbn-kanban-element-container', 'bbn-radius', 'bbn-background', 'bbn-rel', {\n          'bbn-flex-height': !!scrollable\n        }]\"\n        :style=\"{\n          backgroundColor: !!backgroundColor ? (backgroundColor + ' !important') : '',\n          height: '100%',\n          width: '100%'\n        }\">\n    <div :class=\"['bbn-kanban-element-header', 'bbn-spadding', , 'bbn-vmiddle', 'bbn-unselectable', {\n           'bbn-flex-width': !collapsed,\n           'bbn-flex-height': collapsed\n         }]\"\n         bbn-if=\"headerVisible\">\n      <bbn-button bbn-if=\"collapsable && collapsed\"\n                  class=\"bbn-no-border\"\n                  :notext=\"true\"\n                  :label=\"_('Expand')\"\n                  icon=\"nf nf-md-arrow_expand\"\n                  @click=\"expand\"\n                  style=\"height: auto; width: 100%; aspect-ratio: 1\"/>\n      <div :class=\"['bbn-kanban-element-title', 'bbn-upper', 'bbn-b', 'bbn-tertiary-text-alt', 'bbn-unselectable', 'bbn-m', 'bbn-ellipsis', {\n             'bbn-left-space': !collapsed,\n             'bbn-top-space': collapsed,\n             'bbn-right-lspace': !collapsed,\n             'bbn-bottom-lspace': collapsed,\n             'verticaltext': collapsed,\n             'bbn-flex-fill': !toolbar\n           }]\"\n           bbn-text=\"label\"\n           :title=\"label\"\n           :style=\"{\n             color: !!fontColor ? (fontColor + ' !important') : '',\n             maxHeight: isMobile && collapsed ? '20rem' : '',\n             letterSpacing: collapsed ? (isMobile ? '' : '-0.2rem') : ''\n           }\"\n           bbn-if=\"label !== undefined\"/>\n      <div class=\"bbn-kanban-element-toolbar bbn-alt-background bbn-vmiddle bbn-xspadding bbn-radius bbn-flex-fill\"\n          :style=\"{\n            'min-height': !collapsed ? '2rem' : '4rem',\n            'justify-content': 'flex-end',\n            'align-items': collapsed ? 'flex-end': ''\n          }\"\n          bbn-if=\"toolbar\">\n        <component :is=\"toolbar\"\n                   :source=\"toolbarSource || (!isAjax ? source : undefined)\"\n                   :total=\"total\"\n                   class=\"bbn-vmiddle\"\n                   :style=\"{'flex-direction': collapsed ? 'column': 'row'}\"/>\n      </div>\n      <bbn-button bbn-if=\"collapsable && !collapsed\"\n                  class=\"bbn-no-border bbn-left-space\"\n                  :notext=\"true\"\n                  :label=\"_('Collapse')\"\n                  icon=\"nf nf-md-arrow_collapse\"\n                  @click=\"collapse\"\n                  style=\"height: 100%; width: auto; aspect-ratio: 1\"/>\n    </div>\n    <div bbn-if=\"!collapsed\"\n        :class=\"['bbn-kanban-element-main', 'bbn-vpadding', 'bbn-rel', {'bbn-flex-fill': !!scrollable}]\"\n        style=\"width: 100%\">\n      <div class=\"bbn-rel\"\n           style=\"width: 100%; height: 100%\">\n        <bbn-loader bbn-if=\"isLoading\"\n                    class=\"bbn-kanban-element-loader bbn-margin bbn-background\"/>\n        <component bbn-else\n                   :is=\"scrollable ? 'bbn-scroll' : 'div'\"\n                   axis=\"y\"\n                   ref=\"scroll\">\n          <div :class=\"['bbn-kanban-element-items', 'bbn-hpadding', {\n                 'bbn-overlay': !scrollable || !items.length,\n                 'bbn-middle': !scrollable || !items.length\n                }]\">\n            <template bbn-if=\"items.length\">\n              <div bbn-for=\"(item, itemIdx) in items\"\n                  :class=\"[\n                    'bbn-kanban-element-item',\n                    'bbn-radius',\n                    {\n                      'bbn-bottom-space': !!items[itemIdx+1]\n                    }\n                  ]\"\n                  :key=\"itemIdx\">\n                <component :is=\"component\"\n                           :source=\"item.data\"\n                           :index=\"item.index\"\n                           bbn-bind=\"componentOptions\"\n                           :key=\"!!uid && item.data && (item.data[uid] !== undefined) ? item.data[uid] : itemIdx\"/>\n              </div>\n            </template>\n            <div bbn-elseif=\"isLoaded && !!noData\"\n                 class=\"bbn-c bbn-background bbn-radius bbn-spadding\"\n                 bbn-text=\"noData\"/>\n          </div>\n        </component>\n      </div>\n    </div>\n    <div bbn-if=\"!collapsed && pageable\"\n          class=\"bbn-kanban-element-footer\">\n      <bbn-pager :element=\"_self\"\n                 :limit=\"false\"/>\n    </div>\n  </div>\n</div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/kanban-element/kanban-element.html?");

/***/ }),

/***/ "./src/components/kanban-element/kanban-element.js":
/*!*********************************************************!*\
  !*** ./src/components/kanban-element/kanban-element.js ***!
  \*********************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _kanban_element_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kanban-element.html */ \"./src/components/kanban-element/kanban-element.html\");\n/* harmony import */ var _kanban_element_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kanban-element.less */ \"./src/components/kanban-element/kanban-element.less\");\n\n\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   * @mixin bbn.cp.mixins.list\n   * @mixin bbn.cp.mixins.keepCool\n   * @mixin bbn.cp.mixins.resizer\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.list, bbn.cp.mixins.keepCool, bbn.cp.mixins.resizer],\n  props: {\n    /**\n     * @prop {Number} index\n     */\n    index: {\n      type: Number\n    },\n    /**\n     * @prop {Boolean} [false] collapsable\n     */\n    collapsable: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * @prop {Boolean} [false] autoCollapse\n     */\n    autoCollapse: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * The width\n     * @prop {Number|String} ['100%'] width\n     */\n    width: {\n      type: [Number, String],\n      default: '100%'\n    },\n    /**\n     * @prop {Boolean} [true] scrollable\n     */\n    scrollable: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * @prop {String} backgroundColor\n     */\n    backgroundColor: {\n      type: String\n    },\n    /**\n     * @prop {String} fontColor\n     */\n    fontColor: {\n      type: String\n    },\n    /**\n     * @prop {String} label\n     */\n    label: {\n      type: String\n    },\n    /**\n     * @prop {String|HTMLElement|Object} toolbar\n     */\n    toolbar: {\n      type: [String, HTMLElement, Object]\n    },\n    /**\n     * @prop {Object} toolbarSource\n     */\n    toolbarSource: {\n      type: Object\n    },\n    /**\n     * The options for the component\n     * @prop {Object} componentOptions\n     */\n    componentOptions: {\n      type: Object\n    },\n    /**\n     * @prop {Boolean} [false] startHidden\n     */\n    startHidden: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {\n      /**\n       * @data {Boolean} isVisible\n       */\n      isVisible: !this.startHidden,\n      /**\n       * @data {Boolean} [false] collapsed\n       */\n      collapsed: false\n    };\n  },\n  computed: {\n    /**\n     * @computed items\n     */\n    items() {\n      if (this.pageable && (!this.isAjax || !this.serverPaging)) {\n        return this.filteredData.slice().splice(this.start, this.currentLimit);\n      }\n      return this.filteredData;\n    },\n    /**\n     * @computed headerVisible\n     */\n    headerVisible() {\n      return !!this.collapsable || this.label !== undefined || !!this.toolbar;\n    }\n  },\n  methods: {\n    /**\n     * @method setCheckCollapse\n     * @param {Boolean} force\n     * @fires $once\n     * @fires expand\n     * @fires collapse\n     */\n    setCheckCollapse(force) {\n      if (this.autoCollapse || force) {\n        this.$once('dataloaded', () => {\n          if (this.filteredData.length) {\n            this.expand(force);\n          } else {\n            this.collapse(force);\n          }\n        });\n      }\n    },\n    /**\n     * @method expand\n     * @param {Boolean} force\n     * @emits expanded\n     */\n    expand(force) {\n      if (this.collapsable || force) {\n        this.collapsed = false;\n        this.$emit('expanded', this);\n      }\n    },\n    /**\n     * @method collapse\n     * @param {Boolean} force\n     * @emits collapsed\n     */\n    collapse(force) {\n      if (this.collapsable || force) {\n        this.collapsed = true;\n        this.$emit('collapsed', this);\n      }\n    },\n    /**\n     * @method expandAll\n     * @fires findAll\n     */\n    expandAll() {\n      if (!!this.component && this.currentData.length) {\n        let items = this.findAll(this.component);\n        bbn.fn.each(items, item => {\n          item.$set(item, 'collapsed', false);\n        });\n      }\n    },\n    /**\n     * @method collapsedAll\n     * @fires findAll\n     */\n    collapseAll() {\n      if (!!this.component && this.currentData.length) {\n        let items = this.findAll(this.component);\n        bbn.fn.each(items, item => {\n          item.$set(item, 'collapsed', true);\n        });\n      }\n    }\n  },\n  /**\n   * @event beforeMount\n   * @fires setCheckCollapse\n   * @emits beforemount\n   */\n  beforeMount() {\n    if (this.collapsable) {\n      this.setCheckCollapse();\n    }\n    this.$emit('beforemount', this);\n  },\n  /**\n   * @event mounted\n   * @fires $nextTick\n   */\n  mounted() {\n    this.$nextTick(() => {\n      this.ready = true;\n    });\n  },\n  /**\n   * @event beforeDestroy\n   * @emits beforedestroy\n   */\n  beforeDestroy() {\n    this.$emit('beforedestroy', this);\n  },\n  watch: {\n    /**\n     * @watch data\n     * @fires updateData\n     */\n    data: {\n      deep: true,\n      handler() {\n        this.updateData();\n      }\n    },\n    /**\n     * @watch isLoaded\n     * @fires $once\n     */\n    isLoaded: {\n      immediate: true,\n      handler(newVal) {\n        if (this.startHidden) {\n          this.$once('dataloaded', () => {\n            this.isVisible = true;\n          });\n        }\n      }\n    },\n    /**\n     * @watch currentPage\n     * @fires closest\n     * @fires $once\n     */\n    currentPage(newVal) {\n      if (!this.scrollable) {\n        let externalScroll = this.closest('bbn-scroll');\n        if (externalScroll && externalScroll.hasScrollY) {\n          this.$once('dataloaded', () => {\n            externalScroll.scrollSet(null, this.$el);\n          });\n        }\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/kanban-element/_i18n lazy recursive ^\\\\.\\\\/kanban\\\\-element\\\\..*\\\\.lang$\")(`./kanban-element.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-kanban-element',\n  definition: cpDef,\n  template: _kanban_element_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  style: _kanban_element_less__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/kanban-element/kanban-element.js?");

/***/ }),

/***/ "./src/components/kanban-element/kanban-element.less":
/*!***********************************************************!*\
  !*** ./src/components/kanban-element/kanban-element.less ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_kanban_element_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./kanban-element.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/kanban-element/kanban-element.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_kanban_element_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_kanban_element_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_kanban_element_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_kanban_element_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/kanban-element/kanban-element.less?");

/***/ })

}]);