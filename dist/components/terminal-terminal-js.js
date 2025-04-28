/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/terminal-terminal-js"],{

/***/ "./src/components/terminal/_i18n lazy recursive ^\\.\\/terminal\\..*\\.lang$":
/*!**********************************************************************************************!*\
  !*** ./src/components/terminal/_i18n/ lazy ^\.\/terminal\..*\.lang$ strict namespace object ***!
  \**********************************************************************************************/
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
webpackEmptyAsyncContext.id = "./src/components/terminal/_i18n lazy recursive ^\\.\\/terminal\\..*\\.lang$";
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ "./src/components/terminal/terminal.html":
/*!***********************************************!*\
  !*** ./src/components/terminal/terminal.html ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = `<div :class=\"[componentClass, 'bbn-overlay']\"></div>`;\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90ZXJtaW5hbC90ZXJtaW5hbC5odG1sIiwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxJQUFJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJibi9iYm4tY3AvLi9zcmMvY29tcG9uZW50cy90ZXJtaW5hbC90ZXJtaW5hbC5odG1sPzQxN2QiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTW9kdWxlXG52YXIgY29kZSA9IGA8ZGl2IDpjbGFzcz1cIltjb21wb25lbnRDbGFzcywgJ2Jibi1vdmVybGF5J11cIj48L2Rpdj5gO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgY29kZTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/terminal/terminal.html\n");

/***/ }),

/***/ "./src/components/terminal/terminal.js":
/*!*********************************************!*\
  !*** ./src/components/terminal/terminal.js ***!
  \*********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _terminal_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./terminal.html */ \"./src/components/terminal/terminal.html\");\n/**\n * @file bbn-textarea component\n *\n * @description bbn-textarea is an easy to configure component, it represents a multiline text field, in which it is possible to assign an initial value among the various configurations, validate the content and provide a maximum number of characters that can be inserted.\n * You can define actions on the events activated on it.\n *\n * @copyright BBN Solutions\n * \n * @author BBN Solutions\n */\nconst cpDef = {\n  mixins: [bbn.cp.mixins.basic],\n  props: {},\n  data() {\n    return {\n      widget: false,\n      fitter: false,\n      searcher: false\n    };\n  },\n  methods: {\n    clear() {},\n    write(st) {\n      this.widget.write(st);\n    },\n    resize() {\n      //this.fitter.fit(300, 300);\n    }\n  },\n  mounted() {\n    this.ready = true;\n    this.widget = new Terminal();\n    this.fitter = new FitAddon.FitAddon();\n    this.widget.loadAddon(this.fitter);\n    //this.widget.loadAddon(new WebLinksAddon.WebLinksAddon());\n    //this.searcher = new SearchAddon.SearchAddon();\n    //this.widget.loadAddon(this.searcher);\n    this.widget.open(this.$el);\n    this.fitter.fit();\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    const lang = bbn.env.lang || 'en';\n    cpLang = await __webpack_require__(\"./src/components/terminal/_i18n lazy recursive ^\\\\.\\\\/terminal\\\\..*\\\\.lang$\")(`./terminal.${lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-terminal',\n  definition: cpDef,\n  template: _terminal_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90ZXJtaW5hbC90ZXJtaW5hbC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtR0FBTyxZQUFrQixFQUFFLEtBQUssTUFBTSxDQUFDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLGlFQUFlO0FBQ2Y7QUFDQTtBQUNBLFlBQVksc0RBQU07QUFDbEI7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYmJuL2Jibi1jcC8uL3NyYy9jb21wb25lbnRzL3Rlcm1pbmFsL3Rlcm1pbmFsLmpzPzhmMzciXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZSBiYm4tdGV4dGFyZWEgY29tcG9uZW50XG4gKlxuICogQGRlc2NyaXB0aW9uIGJibi10ZXh0YXJlYSBpcyBhbiBlYXN5IHRvIGNvbmZpZ3VyZSBjb21wb25lbnQsIGl0IHJlcHJlc2VudHMgYSBtdWx0aWxpbmUgdGV4dCBmaWVsZCwgaW4gd2hpY2ggaXQgaXMgcG9zc2libGUgdG8gYXNzaWduIGFuIGluaXRpYWwgdmFsdWUgYW1vbmcgdGhlIHZhcmlvdXMgY29uZmlndXJhdGlvbnMsIHZhbGlkYXRlIHRoZSBjb250ZW50IGFuZCBwcm92aWRlIGEgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGF0IGNhbiBiZSBpbnNlcnRlZC5cbiAqIFlvdSBjYW4gZGVmaW5lIGFjdGlvbnMgb24gdGhlIGV2ZW50cyBhY3RpdmF0ZWQgb24gaXQuXG4gKlxuICogQGNvcHlyaWdodCBCQk4gU29sdXRpb25zXG4gKiBcbiAqIEBhdXRob3IgQkJOIFNvbHV0aW9uc1xuICovXG5jb25zdCBjcERlZiA9IHtcbiAgbWl4aW5zOiBbYmJuLmNwLm1peGlucy5iYXNpY10sXG4gIHByb3BzOiB7fSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkZ2V0OiBmYWxzZSxcbiAgICAgIGZpdHRlcjogZmFsc2UsXG4gICAgICBzZWFyY2hlcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgY2xlYXIoKSB7fSxcbiAgICB3cml0ZShzdCkge1xuICAgICAgdGhpcy53aWRnZXQud3JpdGUoc3QpO1xuICAgIH0sXG4gICAgcmVzaXplKCkge1xuICAgICAgLy90aGlzLmZpdHRlci5maXQoMzAwLCAzMDApO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLndpZGdldCA9IG5ldyBUZXJtaW5hbCgpO1xuICAgIHRoaXMuZml0dGVyID0gbmV3IEZpdEFkZG9uLkZpdEFkZG9uKCk7XG4gICAgdGhpcy53aWRnZXQubG9hZEFkZG9uKHRoaXMuZml0dGVyKTtcbiAgICAvL3RoaXMud2lkZ2V0LmxvYWRBZGRvbihuZXcgV2ViTGlua3NBZGRvbi5XZWJMaW5rc0FkZG9uKCkpO1xuICAgIC8vdGhpcy5zZWFyY2hlciA9IG5ldyBTZWFyY2hBZGRvbi5TZWFyY2hBZGRvbigpO1xuICAgIC8vdGhpcy53aWRnZXQubG9hZEFkZG9uKHRoaXMuc2VhcmNoZXIpO1xuICAgIHRoaXMud2lkZ2V0Lm9wZW4odGhpcy4kZWwpO1xuICAgIHRoaXMuZml0dGVyLmZpdCgpO1xuICB9XG59O1xuaW1wb3J0IGNwSHRtbCBmcm9tICcuL3Rlcm1pbmFsLmh0bWwnO1xubGV0IGNwTGFuZyA9IHt9O1xuaWYgKGJibi5lbnYubGFuZykge1xuICB0cnkge1xuICAgIGNvbnN0IGxhbmcgPSBiYm4uZW52LmxhbmcgfHwgJ2VuJztcbiAgICBjcExhbmcgPSBhd2FpdCBpbXBvcnQoYC4vX2kxOG4vdGVybWluYWwuJHtsYW5nfS5sYW5nYCk7XG4gICAgaWYgKGNwTGFuZy5kZWZhdWx0KSB7XG4gICAgICBjcExhbmcgPSBjcExhbmcuZGVmYXVsdDtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge31cbn1cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2Jibi10ZXJtaW5hbCcsXG4gIGRlZmluaXRpb246IGNwRGVmLFxuICB0ZW1wbGF0ZTogY3BIdG1sLFxuICBsYW5nOiBjcExhbmdcbn07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/terminal/terminal.js\n");

/***/ })

}]);