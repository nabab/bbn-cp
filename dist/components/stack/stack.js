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

/***/ "./src/components/stack/stack.js":
/*!***************************************************!*\
  !*** ./src/components/stack/stack.js + 1 modules ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ stack_stack)\n});\n\n;// ./src/components/stack/stack.html\n// Module\nvar code = `<div :class=\"[{'bbn-overlay':true}, componentClass]\" bbn-if=\"currentData.length\">\n\t<!--bbn-toolbar></bbn-toolbar-->\n\t<div class=\"bbn-block\" bbn-for=\"(c, i) in current\" @click=\"setCurrent(c)\" :key=\"i\">\n\t\t<i class=\"bbn-xl nf nf-custom-folder\"></i>\n\t\t<div bbn-text=\"c.text\"></div>\n\t</div>\n</div>\n`;\n// Exports\n/* harmony default export */ const stack = (code);\n;// ./src/components/stack/stack.js\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.list\n   */\n  mixins: [bbn.cp.mixins.list, bbn.cp.mixins.basic],\n  props: {\n    /**\n     * @prop {Array} source\n     */\n    source: {\n      type: Array\n    }\n  },\n  data() {\n    return {\n      current: []\n    };\n  },\n  created() {\n    //bbn.fn.log('stack mounted', this.source)\n    this.current = this.source;\n    //this.currentData = this.source;\n  },\n  methods: {\n    setCurrent(a) {\n      this.current = a;\n    }\n  }\n};\n\n//import cpLang from './_i18n/index.js';\n\n/* harmony default export */ const stack_stack = ({\n  name: 'bbn-stack',\n  definition: cpDef,\n  template: stack\n  //lang: cpLang\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9zdGFjay9zdGFjay5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBLDJCQUEyQixtQkFBbUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUFlLElBQUksRTs7QUNWbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2tDO0FBQ2xDOztBQUVBLGtEQUFlO0FBQ2Y7QUFDQTtBQUNBLFlBQVksS0FBTTtBQUNsQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYmJuL2Jibi1jcC8uL3NyYy9jb21wb25lbnRzL3N0YWNrL3N0YWNrLmh0bWw/OWMyNyIsIndlYnBhY2s6Ly9AYmJuL2Jibi1jcC8uL3NyYy9jb21wb25lbnRzL3N0YWNrL3N0YWNrLmpzP2MwZWYiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTW9kdWxlXG52YXIgY29kZSA9IGA8ZGl2IDpjbGFzcz1cIlt7J2Jibi1vdmVybGF5Jzp0cnVlfSwgY29tcG9uZW50Q2xhc3NdXCIgYmJuLWlmPVwiY3VycmVudERhdGEubGVuZ3RoXCI+XG5cdDwhLS1iYm4tdG9vbGJhcj48L2Jibi10b29sYmFyLS0+XG5cdDxkaXYgY2xhc3M9XCJiYm4tYmxvY2tcIiBiYm4tZm9yPVwiKGMsIGkpIGluIGN1cnJlbnRcIiBAY2xpY2s9XCJzZXRDdXJyZW50KGMpXCIgOmtleT1cImlcIj5cblx0XHQ8aSBjbGFzcz1cImJibi14bCBuZiBuZi1jdXN0b20tZm9sZGVyXCI+PC9pPlxuXHRcdDxkaXYgYmJuLXRleHQ9XCJjLnRleHRcIj48L2Rpdj5cblx0PC9kaXY+XG48L2Rpdj5cbmA7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsImNvbnN0IGNwRGVmID0ge1xuICAvKipcbiAgICogQG1peGluIGJibi5jcC5taXhpbnMubGlzdFxuICAgKi9cbiAgbWl4aW5zOiBbYmJuLmNwLm1peGlucy5saXN0LCBiYm4uY3AubWl4aW5zLmJhc2ljXSxcbiAgcHJvcHM6IHtcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7QXJyYXl9IHNvdXJjZVxuICAgICAqL1xuICAgIHNvdXJjZToge1xuICAgICAgdHlwZTogQXJyYXlcbiAgICB9XG4gIH0sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGN1cnJlbnQ6IFtdXG4gICAgfTtcbiAgfSxcbiAgY3JlYXRlZCgpIHtcbiAgICAvL2Jibi5mbi5sb2coJ3N0YWNrIG1vdW50ZWQnLCB0aGlzLnNvdXJjZSlcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnNvdXJjZTtcbiAgICAvL3RoaXMuY3VycmVudERhdGEgPSB0aGlzLnNvdXJjZTtcbiAgfSxcbiAgbWV0aG9kczoge1xuICAgIHNldEN1cnJlbnQoYSkge1xuICAgICAgdGhpcy5jdXJyZW50ID0gYTtcbiAgICB9XG4gIH1cbn07XG5pbXBvcnQgY3BIdG1sIGZyb20gJy4vc3RhY2suaHRtbCc7XG4vL2ltcG9ydCBjcExhbmcgZnJvbSAnLi9faTE4bi9pbmRleC5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2Jibi1zdGFjaycsXG4gIGRlZmluaXRpb246IGNwRGVmLFxuICB0ZW1wbGF0ZTogY3BIdG1sXG4gIC8vbGFuZzogY3BMYW5nXG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/stack/stack.js\n\n}");

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
/******/ 	__webpack_modules__["./src/components/stack/stack.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	window["components/stack/stack"] = __webpack_exports__;
/******/ 	
/******/ })()
;