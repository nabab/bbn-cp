/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 86431:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ terminal_terminal)\n});\n\n;// ./src/components/terminal/terminal.html\n// Module\nvar code = `<div :class=\"[componentClass, 'bbn-overlay']\"></div>`;\n// Exports\n/* harmony default export */ const terminal = (code);\n;// ./src/components/terminal/terminal.js\n/**\n * @file bbn-textarea component\n *\n * @description bbn-textarea is an easy to configure component, it represents a multiline text field, in which it is possible to assign an initial value among the various configurations, validate the content and provide a maximum number of characters that can be inserted.\n * You can define actions on the events activated on it.\n *\n * @copyright BBN Solutions\n * \n * @author BBN Solutions\n */\nconst cpDef = {\n  mixins: [bbn.cp.mixins.basic],\n  props: {},\n  data() {\n    return {\n      widget: false,\n      fitter: false,\n      searcher: false\n    };\n  },\n  methods: {\n    clear() {},\n    write(st) {\n      this.widget.write(st);\n    },\n    resize() {\n      //this.fitter.fit(300, 300);\n    }\n  },\n  mounted() {\n    this.ready = true;\n    this.widget = new Terminal();\n    this.fitter = new FitAddon.FitAddon();\n    this.widget.loadAddon(this.fitter);\n    //this.widget.loadAddon(new WebLinksAddon.WebLinksAddon());\n    //this.searcher = new SearchAddon.SearchAddon();\n    //this.widget.loadAddon(this.searcher);\n    this.widget.open(this.$el);\n    this.fitter.fit();\n  }\n};\n\n//import cpLang from './_i18n/index.js';\n\n/* harmony default export */ const terminal_terminal = ({\n  name: 'bbn-terminal',\n  definition: cpDef,\n  template: terminal\n  //lang: cpLang\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODY0MzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0EsK0NBQWUsSUFBSSxFOztBQ0huQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNxQztBQUNyQzs7QUFFQSx3REFBZTtBQUNmO0FBQ0E7QUFDQSxZQUFZLFFBQU07QUFDbEI7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJibi9iYm4tY3AvLi9zcmMvY29tcG9uZW50cy90ZXJtaW5hbC90ZXJtaW5hbC5odG1sPzQxN2QiLCJ3ZWJwYWNrOi8vQGJibi9iYm4tY3AvLi9zcmMvY29tcG9uZW50cy90ZXJtaW5hbC90ZXJtaW5hbC5qcz8zOTU3Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIE1vZHVsZVxudmFyIGNvZGUgPSBgPGRpdiA6Y2xhc3M9XCJbY29tcG9uZW50Q2xhc3MsICdiYm4tb3ZlcmxheSddXCI+PC9kaXY+YDtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7IiwiLyoqXG4gKiBAZmlsZSBiYm4tdGV4dGFyZWEgY29tcG9uZW50XG4gKlxuICogQGRlc2NyaXB0aW9uIGJibi10ZXh0YXJlYSBpcyBhbiBlYXN5IHRvIGNvbmZpZ3VyZSBjb21wb25lbnQsIGl0IHJlcHJlc2VudHMgYSBtdWx0aWxpbmUgdGV4dCBmaWVsZCwgaW4gd2hpY2ggaXQgaXMgcG9zc2libGUgdG8gYXNzaWduIGFuIGluaXRpYWwgdmFsdWUgYW1vbmcgdGhlIHZhcmlvdXMgY29uZmlndXJhdGlvbnMsIHZhbGlkYXRlIHRoZSBjb250ZW50IGFuZCBwcm92aWRlIGEgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyB0aGF0IGNhbiBiZSBpbnNlcnRlZC5cbiAqIFlvdSBjYW4gZGVmaW5lIGFjdGlvbnMgb24gdGhlIGV2ZW50cyBhY3RpdmF0ZWQgb24gaXQuXG4gKlxuICogQGNvcHlyaWdodCBCQk4gU29sdXRpb25zXG4gKiBcbiAqIEBhdXRob3IgQkJOIFNvbHV0aW9uc1xuICovXG5jb25zdCBjcERlZiA9IHtcbiAgbWl4aW5zOiBbYmJuLmNwLm1peGlucy5iYXNpY10sXG4gIHByb3BzOiB7fSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkZ2V0OiBmYWxzZSxcbiAgICAgIGZpdHRlcjogZmFsc2UsXG4gICAgICBzZWFyY2hlcjogZmFsc2VcbiAgICB9O1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgY2xlYXIoKSB7fSxcbiAgICB3cml0ZShzdCkge1xuICAgICAgdGhpcy53aWRnZXQud3JpdGUoc3QpO1xuICAgIH0sXG4gICAgcmVzaXplKCkge1xuICAgICAgLy90aGlzLmZpdHRlci5maXQoMzAwLCAzMDApO1xuICAgIH1cbiAgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLnJlYWR5ID0gdHJ1ZTtcbiAgICB0aGlzLndpZGdldCA9IG5ldyBUZXJtaW5hbCgpO1xuICAgIHRoaXMuZml0dGVyID0gbmV3IEZpdEFkZG9uLkZpdEFkZG9uKCk7XG4gICAgdGhpcy53aWRnZXQubG9hZEFkZG9uKHRoaXMuZml0dGVyKTtcbiAgICAvL3RoaXMud2lkZ2V0LmxvYWRBZGRvbihuZXcgV2ViTGlua3NBZGRvbi5XZWJMaW5rc0FkZG9uKCkpO1xuICAgIC8vdGhpcy5zZWFyY2hlciA9IG5ldyBTZWFyY2hBZGRvbi5TZWFyY2hBZGRvbigpO1xuICAgIC8vdGhpcy53aWRnZXQubG9hZEFkZG9uKHRoaXMuc2VhcmNoZXIpO1xuICAgIHRoaXMud2lkZ2V0Lm9wZW4odGhpcy4kZWwpO1xuICAgIHRoaXMuZml0dGVyLmZpdCgpO1xuICB9XG59O1xuaW1wb3J0IGNwSHRtbCBmcm9tICcuL3Rlcm1pbmFsLmh0bWwnO1xuLy9pbXBvcnQgY3BMYW5nIGZyb20gJy4vX2kxOG4vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdiYm4tdGVybWluYWwnLFxuICBkZWZpbml0aW9uOiBjcERlZixcbiAgdGVtcGxhdGU6IGNwSHRtbFxuICAvL2xhbmc6IGNwTGFuZ1xufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///86431\n\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[86431](0,__webpack_exports__,__webpack_require__);
/******/ 	window["components/terminal/terminal"] = __webpack_exports__;
/******/ 	
/******/ })()
;