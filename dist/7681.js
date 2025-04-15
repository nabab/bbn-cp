/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([[7681],{

/***/ 15233:
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _terminal_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20451);\n/**\n * @file bbn-textarea component\n *\n * @description bbn-textarea is an easy to configure component, it represents a multiline text field, in which it is possible to assign an initial value among the various configurations, validate the content and provide a maximum number of characters that can be inserted.\n * You can define actions on the events activated on it.\n *\n * @copyright BBN Solutions\n * \n * @author BBN Solutions\n */\nconst cpDef = {\n  mixins: [bbn.cp.mixins.basic],\n  props: {},\n  data() {\n    return {\n      widget: false,\n      fitter: false,\n      searcher: false\n    };\n  },\n  methods: {\n    clear() {},\n    write(st) {\n      this.widget.write(st);\n    },\n    resize() {\n      //this.fitter.fit(300, 300);\n    }\n  },\n  mounted() {\n    this.ready = true;\n    this.widget = new Terminal();\n    this.fitter = new FitAddon.FitAddon();\n    this.widget.loadAddon(this.fitter);\n    //this.widget.loadAddon(new WebLinksAddon.WebLinksAddon());\n    //this.searcher = new SearchAddon.SearchAddon();\n    //this.widget.loadAddon(this.searcher);\n    this.widget.open(this.$el);\n    this.fitter.fit();\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(80829)(`./terminal.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-terminal',\n  definition: cpDef,\n  template: _terminal_html__WEBPACK_IMPORTED_MODULE_0__/* [\"default\"] */ .A,\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTUyMzMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsMkJBQU8sWUFBa0IsRUFBRSxLQUFLLE1BQU0sQ0FBQztBQUMxRDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQSxZQUFZLCtEQUFNO0FBQ2xCO0FBQ0EsQ0FBQyxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJibi9iYm4tY3AvLi9zcmMvY29tcG9uZW50cy90ZXJtaW5hbC90ZXJtaW5hbC5qcz84ZjM3Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGUgYmJuLXRleHRhcmVhIGNvbXBvbmVudFxuICpcbiAqIEBkZXNjcmlwdGlvbiBiYm4tdGV4dGFyZWEgaXMgYW4gZWFzeSB0byBjb25maWd1cmUgY29tcG9uZW50LCBpdCByZXByZXNlbnRzIGEgbXVsdGlsaW5lIHRleHQgZmllbGQsIGluIHdoaWNoIGl0IGlzIHBvc3NpYmxlIHRvIGFzc2lnbiBhbiBpbml0aWFsIHZhbHVlIGFtb25nIHRoZSB2YXJpb3VzIGNvbmZpZ3VyYXRpb25zLCB2YWxpZGF0ZSB0aGUgY29udGVudCBhbmQgcHJvdmlkZSBhIG1heGltdW0gbnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBjYW4gYmUgaW5zZXJ0ZWQuXG4gKiBZb3UgY2FuIGRlZmluZSBhY3Rpb25zIG9uIHRoZSBldmVudHMgYWN0aXZhdGVkIG9uIGl0LlxuICpcbiAqIEBjb3B5cmlnaHQgQkJOIFNvbHV0aW9uc1xuICogXG4gKiBAYXV0aG9yIEJCTiBTb2x1dGlvbnNcbiAqL1xuY29uc3QgY3BEZWYgPSB7XG4gIG1peGluczogW2Jibi5jcC5taXhpbnMuYmFzaWNdLFxuICBwcm9wczoge30sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZGdldDogZmFsc2UsXG4gICAgICBmaXR0ZXI6IGZhbHNlLFxuICAgICAgc2VhcmNoZXI6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIGNsZWFyKCkge30sXG4gICAgd3JpdGUoc3QpIHtcbiAgICAgIHRoaXMud2lkZ2V0LndyaXRlKHN0KTtcbiAgICB9LFxuICAgIHJlc2l6ZSgpIHtcbiAgICAgIC8vdGhpcy5maXR0ZXIuZml0KDMwMCwgMzAwKTtcbiAgICB9XG4gIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5yZWFkeSA9IHRydWU7XG4gICAgdGhpcy53aWRnZXQgPSBuZXcgVGVybWluYWwoKTtcbiAgICB0aGlzLmZpdHRlciA9IG5ldyBGaXRBZGRvbi5GaXRBZGRvbigpO1xuICAgIHRoaXMud2lkZ2V0LmxvYWRBZGRvbih0aGlzLmZpdHRlcik7XG4gICAgLy90aGlzLndpZGdldC5sb2FkQWRkb24obmV3IFdlYkxpbmtzQWRkb24uV2ViTGlua3NBZGRvbigpKTtcbiAgICAvL3RoaXMuc2VhcmNoZXIgPSBuZXcgU2VhcmNoQWRkb24uU2VhcmNoQWRkb24oKTtcbiAgICAvL3RoaXMud2lkZ2V0LmxvYWRBZGRvbih0aGlzLnNlYXJjaGVyKTtcbiAgICB0aGlzLndpZGdldC5vcGVuKHRoaXMuJGVsKTtcbiAgICB0aGlzLmZpdHRlci5maXQoKTtcbiAgfVxufTtcbmltcG9ydCBjcEh0bWwgZnJvbSAnLi90ZXJtaW5hbC5odG1sJztcbmxldCBjcExhbmcgPSB7fTtcbmlmIChiYm4uZW52LmxhbmcpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBsYW5nID0gYmJuLmVudi5sYW5nIHx8ICdlbic7XG4gICAgY3BMYW5nID0gYXdhaXQgaW1wb3J0KGAuL19pMThuL3Rlcm1pbmFsLiR7bGFuZ30ubGFuZ2ApO1xuICAgIGlmIChjcExhbmcuZGVmYXVsdCkge1xuICAgICAgY3BMYW5nID0gY3BMYW5nLmRlZmF1bHQ7XG4gICAgfVxuICB9IGNhdGNoIChlcnIpIHt9XG59XG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdiYm4tdGVybWluYWwnLFxuICBkZWZpbml0aW9uOiBjcERlZixcbiAgdGVtcGxhdGU6IGNwSHRtbCxcbiAgbGFuZzogY3BMYW5nXG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///15233\n");

/***/ }),

/***/ 20451:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[componentClass, 'bbn-overlay']\"></div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjA0NTEuanMiLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsSUFBSSIsInNvdXJjZXMiOlsid2VicGFjazovL0BiYm4vYmJuLWNwLy4vc3JjL2NvbXBvbmVudHMvdGVybWluYWwvdGVybWluYWwuaHRtbD80MTdkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE1vZHVsZVxudmFyIGNvZGUgPSBgPGRpdiA6Y2xhc3M9XCJbY29tcG9uZW50Q2xhc3MsICdiYm4tb3ZlcmxheSddXCI+PC9kaXY+YDtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///20451\n");

/***/ }),

/***/ 80829:
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
webpackEmptyAsyncContext.id = 80829;
module.exports = webpackEmptyAsyncContext;

/***/ })

}]);