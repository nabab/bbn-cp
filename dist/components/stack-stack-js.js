/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/stack-stack-js"],{

/***/ "./src/components/stack/_i18n lazy recursive ^\\.\\/stack\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/stack/_i18n/ lazy ^\.\/stack\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/components/stack/_i18n lazy recursive ^\\.\\/stack\\..*\\.lang$";
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ "./src/components/stack/stack.html":
/*!*****************************************!*\
  !*** ./src/components/stack/stack.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[{'bbn-overlay':true}, componentClass]\" bbn-if=\"currentData.length\">\n\t<!--bbn-toolbar></bbn-toolbar-->\n\t<div class=\"bbn-block\" bbn-for=\"(c, i) in current\" @click=\"setCurrent(c)\" :key=\"i\">\n\t\t<i class=\"bbn-xl nf nf-custom-folder\"></i>\n\t\t<div bbn-text=\"c.text\"></div>\n\t</div>\n</div>\n`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zdGFjay9zdGFjay5odG1sIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBLDJCQUEyQixtQkFBbUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYmJuL2Jibi1jcC8uL3NyYy9jb21wb25lbnRzL3N0YWNrL3N0YWNrLmh0bWw/OWMyNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNb2R1bGVcbnZhciBjb2RlID0gYDxkaXYgOmNsYXNzPVwiW3snYmJuLW92ZXJsYXknOnRydWV9LCBjb21wb25lbnRDbGFzc11cIiBiYm4taWY9XCJjdXJyZW50RGF0YS5sZW5ndGhcIj5cblx0PCEtLWJibi10b29sYmFyPjwvYmJuLXRvb2xiYXItLT5cblx0PGRpdiBjbGFzcz1cImJibi1ibG9ja1wiIGJibi1mb3I9XCIoYywgaSkgaW4gY3VycmVudFwiIEBjbGljaz1cInNldEN1cnJlbnQoYylcIiA6a2V5PVwiaVwiPlxuXHRcdDxpIGNsYXNzPVwiYmJuLXhsIG5mIG5mLWN1c3RvbS1mb2xkZXJcIj48L2k+XG5cdFx0PGRpdiBiYm4tdGV4dD1cImMudGV4dFwiPjwvZGl2PlxuXHQ8L2Rpdj5cbjwvZGl2PlxuYDtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/stack/stack.html\n");

/***/ }),

/***/ "./src/components/stack/stack.js":
/*!***************************************!*\
  !*** ./src/components/stack/stack.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _stack_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stack.html */ \"./src/components/stack/stack.html\");\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.list\n   */\n  mixins: [bbn.cp.mixins.list, bbn.cp.mixins.basic],\n  props: {\n    /**\n     * @prop {Array} source\n     */\n    source: {\n      type: Array\n    }\n  },\n  data() {\n    return {\n      current: []\n    };\n  },\n  created() {\n    //bbn.fn.log('stack mounted', this.source)\n    this.current = this.source;\n    //this.currentData = this.source;\n  },\n  methods: {\n    setCurrent(a) {\n      this.current = a;\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/stack/_i18n lazy recursive ^\\\\.\\\\/stack\\\\..*\\\\.lang$\")(`./stack.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-stack',\n  definition: cpDef,\n  template: _stack_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zdGFjay9zdGFjay5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsNkZBQU8sU0FBZSxFQUFFLEtBQUssTUFBTSxDQUFDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBLFlBQVksbURBQU07QUFDbEI7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYmJuL2Jibi1jcC8uL3NyYy9jb21wb25lbnRzL3N0YWNrL3N0YWNrLmpzPzY3MTIiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3BEZWYgPSB7XG4gIC8qKlxuICAgKiBAbWl4aW4gYmJuLmNwLm1peGlucy5saXN0XG4gICAqL1xuICBtaXhpbnM6IFtiYm4uY3AubWl4aW5zLmxpc3QsIGJibi5jcC5taXhpbnMuYmFzaWNdLFxuICBwcm9wczoge1xuICAgIC8qKlxuICAgICAqIEBwcm9wIHtBcnJheX0gc291cmNlXG4gICAgICovXG4gICAgc291cmNlOiB7XG4gICAgICB0eXBlOiBBcnJheVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudDogW11cbiAgICB9O1xuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIC8vYmJuLmZuLmxvZygnc3RhY2sgbW91bnRlZCcsIHRoaXMuc291cmNlKVxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc291cmNlO1xuICAgIC8vdGhpcy5jdXJyZW50RGF0YSA9IHRoaXMuc291cmNlO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2V0Q3VycmVudChhKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBhO1xuICAgIH1cbiAgfVxufTtcbmltcG9ydCBjcEh0bWwgZnJvbSAnLi9zdGFjay5odG1sJztcbmxldCBjcExhbmcgPSB7fTtcbmlmIChiYm4uZW52LmxhbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsYW5nID0gYmJuLmVudi5sYW5nIHx8ICdlbic7XG4gICAgY3BMYW5nID0gYXdhaXQgaW1wb3J0KGAuL19pMThuL3N0YWNrLiR7bGFuZ30ubGFuZ2ApO1xuICAgIGlmIChjcExhbmcuZGVmYXVsdCkge1xuICAgICAgY3BMYW5nID0gY3BMYW5nLmRlZmF1bHQ7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHt9XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdiYm4tc3RhY2snLFxuICBkZWZpbml0aW9uOiBjcERlZixcbiAgdGVtcGxhdGU6IGNwSHRtbCxcbiAgbGFuZzogY3BMYW5nXG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/stack/stack.js\n");

/***/ })

}]);