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

/***/ "./src/components/table-cell/table-cell.js":
/*!*************************************************************!*\
  !*** ./src/components/table-cell/table-cell.js + 1 modules ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ table_cell_table_cell)\n});\n\n;// ./src/components/table-cell/table-cell.html\n// Module\nvar code = `<div :class=\"cellClass\">\n  <slot bbn-if=\"\\$hasSlots()\"/>\n  <component bbn-elseif=\"column.component\"\n             :is=\"column.component\"\n             bbn-bind=\"table.getColOptions(source, column, rowIndex)\"\n             :source=\"column.mapper ? column.mapper(source) : source\"/>\n\n  <div bbn-else\n       bbn-html=\"table.renderDefault(source, column, rowIndex)\"/>\n  <table-dots bbn-if=\"column.dots\"\n              :source=\"{\n                    column: column,\n                    index: index,\n                    dataIndex: rowIndex,\n                    data: source,\n                    itemIndex: rowIndex\n                  }\"/>\n</div>\n`;\n// Exports\n/* harmony default export */ const table_cell = (code);\n;// ./src/components/table-cell/table-cell.js\n/**\r\n * @file bbn-table component\r\n *\r\n * @author BBN Solutions\r\n *\r\n * @copyright BBN Solutions\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.cell\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.cell, bbn.cp.mixins.componentInside],\n  tag: 'td',\n  props: {},\n  data() {\n    return {};\n  },\n  mounted() {}\n};\n\n//import cpLang from './_i18n/index.js';\n\n/* harmony default export */ const table_cell_table_cell = ({\n  name: 'bbn-table-cell',\n  definition: cpDef,\n  template: table_cell\n  //lang: cpLang\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90YWJsZS1jZWxsL3RhYmxlLWNlbGwuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLGlEQUFlLElBQUksRTs7QUNyQm5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ3VDO0FBQ3ZDOztBQUVBLDREQUFlO0FBQ2Y7QUFDQTtBQUNBLFlBQVksVUFBTTtBQUNsQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYmJuL2Jibi1jcC8uL3NyYy9jb21wb25lbnRzL3RhYmxlLWNlbGwvdGFibGUtY2VsbC5odG1sPzZkMTAiLCJ3ZWJwYWNrOi8vQGJibi9iYm4tY3AvLi9zcmMvY29tcG9uZW50cy90YWJsZS1jZWxsL3RhYmxlLWNlbGwuanM/NzE0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNb2R1bGVcbnZhciBjb2RlID0gYDxkaXYgOmNsYXNzPVwiY2VsbENsYXNzXCI+XG4gIDxzbG90IGJibi1pZj1cIlxcJGhhc1Nsb3RzKClcIi8+XG4gIDxjb21wb25lbnQgYmJuLWVsc2VpZj1cImNvbHVtbi5jb21wb25lbnRcIlxuICAgICAgICAgICAgIDppcz1cImNvbHVtbi5jb21wb25lbnRcIlxuICAgICAgICAgICAgIGJibi1iaW5kPVwidGFibGUuZ2V0Q29sT3B0aW9ucyhzb3VyY2UsIGNvbHVtbiwgcm93SW5kZXgpXCJcbiAgICAgICAgICAgICA6c291cmNlPVwiY29sdW1uLm1hcHBlciA/IGNvbHVtbi5tYXBwZXIoc291cmNlKSA6IHNvdXJjZVwiLz5cblxuICA8ZGl2IGJibi1lbHNlXG4gICAgICAgYmJuLWh0bWw9XCJ0YWJsZS5yZW5kZXJEZWZhdWx0KHNvdXJjZSwgY29sdW1uLCByb3dJbmRleClcIi8+XG4gIDx0YWJsZS1kb3RzIGJibi1pZj1cImNvbHVtbi5kb3RzXCJcbiAgICAgICAgICAgICAgOnNvdXJjZT1cIntcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YUluZGV4OiByb3dJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogc291cmNlLFxuICAgICAgICAgICAgICAgICAgICBpdGVtSW5kZXg6IHJvd0luZGV4XG4gICAgICAgICAgICAgICAgICB9XCIvPlxuPC9kaXY+XG5gO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgY29kZTsiLCIvKipcclxuICogQGZpbGUgYmJuLXRhYmxlIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAYXV0aG9yIEJCTiBTb2x1dGlvbnNcclxuICpcclxuICogQGNvcHlyaWdodCBCQk4gU29sdXRpb25zXHJcbiAqL1xuY29uc3QgY3BEZWYgPSB7XG4gIC8qKlxyXG4gICAqIEBtaXhpbiBiYm4uY3AubWl4aW5zLmJhc2ljXHJcbiAgICogQG1peGluIGJibi5jcC5taXhpbnMuY2VsbFxyXG4gICAqL1xuICBtaXhpbnM6IFtiYm4uY3AubWl4aW5zLmJhc2ljLCBiYm4uY3AubWl4aW5zLmNlbGwsIGJibi5jcC5taXhpbnMuY29tcG9uZW50SW5zaWRlXSxcbiAgdGFnOiAndGQnLFxuICBwcm9wczoge30sXG4gIGRhdGEoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9LFxuICBtb3VudGVkKCkge31cbn07XG5pbXBvcnQgY3BIdG1sIGZyb20gJy4vdGFibGUtY2VsbC5odG1sJztcbi8vaW1wb3J0IGNwTGFuZyBmcm9tICcuL19pMThuL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYmJuLXRhYmxlLWNlbGwnLFxuICBkZWZpbml0aW9uOiBjcERlZixcbiAgdGVtcGxhdGU6IGNwSHRtbFxuICAvL2xhbmc6IGNwTGFuZ1xufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/table-cell/table-cell.js\n\n}");

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
/******/ 	__webpack_modules__["./src/components/table-cell/table-cell.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	window["components/table-cell/table-cell"] = __webpack_exports__;
/******/ 	
/******/ })()
;