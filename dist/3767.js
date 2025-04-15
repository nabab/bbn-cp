/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([[3767],{

/***/ 7619:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _stack_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88365);\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.list\n   */\n  mixins: [bbn.cp.mixins.list, bbn.cp.mixins.basic],\n  props: {\n    /**\n     * @prop {Array} source\n     */\n    source: {\n      type: Array\n    }\n  },\n  data() {\n    return {\n      current: []\n    };\n  },\n  created() {\n    //bbn.fn.log('stack mounted', this.source)\n    this.current = this.source;\n    //this.currentData = this.source;\n  },\n  methods: {\n    setCurrent(a) {\n      this.current = a;\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(87269)(`./stack.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-stack',\n  definition: cpDef,\n  template: _stack_html__WEBPACK_IMPORTED_MODULE_0__/* [\"default\"] */ .A,\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzYxOS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQU8sU0FBZSxFQUFFLEtBQUssTUFBTSxDQUFDO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBLFlBQVksNERBQU07QUFDbEI7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYmJuL2Jibi1jcC8uL3NyYy9jb21wb25lbnRzL3N0YWNrL3N0YWNrLmpzPzY3MTIiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgY3BEZWYgPSB7XG4gIC8qKlxuICAgKiBAbWl4aW4gYmJuLmNwLm1peGlucy5saXN0XG4gICAqL1xuICBtaXhpbnM6IFtiYm4uY3AubWl4aW5zLmxpc3QsIGJibi5jcC5taXhpbnMuYmFzaWNdLFxuICBwcm9wczoge1xuICAgIC8qKlxuICAgICAqIEBwcm9wIHtBcnJheX0gc291cmNlXG4gICAgICovXG4gICAgc291cmNlOiB7XG4gICAgICB0eXBlOiBBcnJheVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudDogW11cbiAgICB9O1xuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIC8vYmJuLmZuLmxvZygnc3RhY2sgbW91bnRlZCcsIHRoaXMuc291cmNlKVxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc291cmNlO1xuICAgIC8vdGhpcy5jdXJyZW50RGF0YSA9IHRoaXMuc291cmNlO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2V0Q3VycmVudChhKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBhO1xuICAgIH1cbiAgfVxufTtcbmltcG9ydCBjcEh0bWwgZnJvbSAnLi9zdGFjay5odG1sJztcbmxldCBjcExhbmcgPSB7fTtcbmlmIChiYm4uZW52LmxhbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsYW5nID0gYmJuLmVudi5sYW5nIHx8ICdlbic7XG4gICAgY3BMYW5nID0gYXdhaXQgaW1wb3J0KGAuL19pMThuL3N0YWNrLiR7bGFuZ30ubGFuZ2ApO1xuICAgIGlmIChjcExhbmcuZGVmYXVsdCkge1xuICAgICAgY3BMYW5nID0gY3BMYW5nLmRlZmF1bHQ7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHt9XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdiYm4tc3RhY2snLFxuICBkZWZpbml0aW9uOiBjcERlZixcbiAgdGVtcGxhdGU6IGNwSHRtbCxcbiAgbGFuZzogY3BMYW5nXG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///7619\n");

/***/ }),

/***/ 87269:
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
webpackEmptyAsyncContext.id = 87269;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 88365:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[{'bbn-overlay':true}, componentClass]\" bbn-if=\"currentData.length\"> <div class=\"bbn-block\" bbn-for=\"(c, i) in current\" @click=\"setCurrent(c)\" :key=\"i\"> <i class=\"bbn-xl nf nf-custom-folder\"></i> <div bbn-text=\"c.text\"></div> </div> </div> `;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODgzNjUuanMiLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQSwyQkFBMkIsbUJBQW1CO0FBQzlDO0FBQ0EsaUVBQWUsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL0BiYm4vYmJuLWNwLy4vc3JjL2NvbXBvbmVudHMvc3RhY2svc3RhY2suaHRtbD85YzI3Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIE1vZHVsZVxudmFyIGNvZGUgPSBgPGRpdiA6Y2xhc3M9XCJbeydiYm4tb3ZlcmxheSc6dHJ1ZX0sIGNvbXBvbmVudENsYXNzXVwiIGJibi1pZj1cImN1cnJlbnREYXRhLmxlbmd0aFwiPiA8ZGl2IGNsYXNzPVwiYmJuLWJsb2NrXCIgYmJuLWZvcj1cIihjLCBpKSBpbiBjdXJyZW50XCIgQGNsaWNrPVwic2V0Q3VycmVudChjKVwiIDprZXk9XCJpXCI+IDxpIGNsYXNzPVwiYmJuLXhsIG5mIG5mLWN1c3RvbS1mb2xkZXJcIj48L2k+IDxkaXYgYmJuLXRleHQ9XCJjLnRleHRcIj48L2Rpdj4gPC9kaXY+IDwvZGl2PiBgO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgY29kZTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///88365\n");

/***/ })

}]);