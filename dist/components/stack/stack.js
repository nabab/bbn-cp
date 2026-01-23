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

/***/ 73042:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ stack_stack)\n});\n\n;// ./src/components/stack/stack.html\n// Module\nvar code = `<div :class=\"[{'bbn-overlay':true}, componentClass]\" bbn-if=\"currentData.length\"> <div class=\"bbn-block\" bbn-for=\"(c, i) in current\" @click=\"setCurrent(c)\" :key=\"i\"> <i class=\"bbn-xl nf nf-custom-folder\"></i> <div bbn-text=\"c.text\"></div> </div> </div> `;\n// Exports\n/* harmony default export */ const stack = (code);\n;// ./src/components/stack/stack.js\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.list\n   */\n  mixins: [bbn.cp.mixins.list, bbn.cp.mixins.basic],\n  props: {\n    /**\n     * @prop {Array} source\n     */\n    source: {\n      type: Array\n    }\n  },\n  data() {\n    return {\n      current: []\n    };\n  },\n  created() {\n    //bbn.fn.log('stack mounted', this.source)\n    this.current = this.source;\n    //this.currentData = this.source;\n  },\n  methods: {\n    setCurrent(a) {\n      this.current = a;\n    }\n  }\n};\n\n//import cpLang from './_i18n/index.js';\n\n/* harmony default export */ const stack_stack = ({\n  name: 'bbn-stack',\n  definition: cpDef,\n  template: stack\n  //lang: cpLang\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNzMwNDIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSwyQkFBMkIsbUJBQW1CO0FBQzlDO0FBQ0EsNENBQWUsSUFBSSxFOztBQ0huQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDa0M7QUFDbEM7O0FBRUEsa0RBQWU7QUFDZjtBQUNBO0FBQ0EsWUFBWSxLQUFNO0FBQ2xCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BiYm4vYmJuLWNwLy4vc3JjL2NvbXBvbmVudHMvc3RhY2svc3RhY2suaHRtbD85YzI3Iiwid2VicGFjazovL0BiYm4vYmJuLWNwLy4vc3JjL2NvbXBvbmVudHMvc3RhY2svc3RhY2suanM/YzBlZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNb2R1bGVcbnZhciBjb2RlID0gYDxkaXYgOmNsYXNzPVwiW3snYmJuLW92ZXJsYXknOnRydWV9LCBjb21wb25lbnRDbGFzc11cIiBiYm4taWY9XCJjdXJyZW50RGF0YS5sZW5ndGhcIj4gPGRpdiBjbGFzcz1cImJibi1ibG9ja1wiIGJibi1mb3I9XCIoYywgaSkgaW4gY3VycmVudFwiIEBjbGljaz1cInNldEN1cnJlbnQoYylcIiA6a2V5PVwiaVwiPiA8aSBjbGFzcz1cImJibi14bCBuZiBuZi1jdXN0b20tZm9sZGVyXCI+PC9pPiA8ZGl2IGJibi10ZXh0PVwiYy50ZXh0XCI+PC9kaXY+IDwvZGl2PiA8L2Rpdj4gYDtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IGNvZGU7IiwiY29uc3QgY3BEZWYgPSB7XG4gIC8qKlxuICAgKiBAbWl4aW4gYmJuLmNwLm1peGlucy5saXN0XG4gICAqL1xuICBtaXhpbnM6IFtiYm4uY3AubWl4aW5zLmxpc3QsIGJibi5jcC5taXhpbnMuYmFzaWNdLFxuICBwcm9wczoge1xuICAgIC8qKlxuICAgICAqIEBwcm9wIHtBcnJheX0gc291cmNlXG4gICAgICovXG4gICAgc291cmNlOiB7XG4gICAgICB0eXBlOiBBcnJheVxuICAgIH1cbiAgfSxcbiAgZGF0YSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudDogW11cbiAgICB9O1xuICB9LFxuICBjcmVhdGVkKCkge1xuICAgIC8vYmJuLmZuLmxvZygnc3RhY2sgbW91bnRlZCcsIHRoaXMuc291cmNlKVxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc291cmNlO1xuICAgIC8vdGhpcy5jdXJyZW50RGF0YSA9IHRoaXMuc291cmNlO1xuICB9LFxuICBtZXRob2RzOiB7XG4gICAgc2V0Q3VycmVudChhKSB7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBhO1xuICAgIH1cbiAgfVxufTtcbmltcG9ydCBjcEh0bWwgZnJvbSAnLi9zdGFjay5odG1sJztcbi8vaW1wb3J0IGNwTGFuZyBmcm9tICcuL19pMThuL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYmJuLXN0YWNrJyxcbiAgZGVmaW5pdGlvbjogY3BEZWYsXG4gIHRlbXBsYXRlOiBjcEh0bWxcbiAgLy9sYW5nOiBjcExhbmdcbn07Il0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///73042\n\n}");

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
/******/ 	__webpack_modules__[73042](0,__webpack_exports__,__webpack_require__);
/******/ 	window["components/stack/stack"] = __webpack_exports__;
/******/ 	
/******/ })()
;