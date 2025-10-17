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

/***/ "./src/components/loadicon/loadicon.js":
/*!*********************************************************!*\
  !*** ./src/components/loadicon/loadicon.js + 1 modules ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ loadicon_loadicon)\n});\n\n;// ./src/components/loadicon/loadicon.html\n// Module\nvar code = `<span :class=\"componentClass\">\n  <svg xmlns=\"http://www.w3.org/2000/svg\"\n       version=\"1.0\"\n       :width=\"currentSize\"\n       :height=\"currentSize\"\n       viewBox=\"0 0 128 128\"\n       xml:space=\"preserve\">\n    <g>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"1\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.2\" transform=\"rotate(30 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.2\" transform=\"rotate(60 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.2\" transform=\"rotate(90 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.2\" transform=\"rotate(120 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.3\" transform=\"rotate(150 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.4\" transform=\"rotate(180 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.5\" transform=\"rotate(210 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.6\" transform=\"rotate(240 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.7\" transform=\"rotate(270 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.8\" transform=\"rotate(300 64 64)\"/>\n      <path d=\"M59.6 0h8v40h-8V0z\" fill=\"inherit\" fill-opacity=\"0.9\" transform=\"rotate(330 64 64)\"/>\n      <animateTransform attributeName=\"transform\" type=\"rotate\" values=\"0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64\" calcMode=\"discrete\" dur=\"1080ms\" repeatCount=\"indefinite\"></animateTransform>\n    </g>\n  </svg>\n</span>\n`;\n// Exports\n/* harmony default export */ const loadicon = (code);\n;// ./src/components/loadicon/loadicon.js\n/**\r\n * @file bbn-loadicon component\r\n *\r\n * @description bbn-loadicon is a simple implementation component, which represents an icon displaying a waiting state.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author  BBN Solutions\r\n * \r\n * @created 07/01/2017\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic \r\n   */\n  mixins: [bbn.cp.mixins.basic],\n  props: {\n    /**\r\n     * The size of the icon container\r\n     * @prop {Number|String} [16] size\r\n     */\n    size: {\n      type: [Number, String],\n      default: 16\n    }\n  },\n  data() {\n    return {\n      currentSize: bbn.fn.formatSize(this.size)\n    };\n  },\n  watch: {\n    size(v) {\n      this.currentSize = bbn.fn.formatSize(v);\n    }\n  }\n};\n\n//import cpLang from './_i18n/index.js';\n\n/* harmony default export */ const loadicon_loadicon = ({\n  name: 'bbn-loadicon',\n  definition: cpDef,\n  template: loadicon\n  //lang: cpLang\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9sb2FkaWNvbi9sb2FkaWNvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0YsU0FBUyxTQUFTLFNBQVMsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVTtBQUNqTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQWUsSUFBSSxFOztBQzNCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGVBQWU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDcUM7QUFDckM7O0FBRUEsd0RBQWU7QUFDZjtBQUNBO0FBQ0EsWUFBWSxRQUFNO0FBQ2xCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BiYm4vYmJuLWNwLy4vc3JjL2NvbXBvbmVudHMvbG9hZGljb24vbG9hZGljb24uaHRtbD8xMDQyIiwid2VicGFjazovL0BiYm4vYmJuLWNwLy4vc3JjL2NvbXBvbmVudHMvbG9hZGljb24vbG9hZGljb24uanM/ODAyNSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBNb2R1bGVcbnZhciBjb2RlID0gYDxzcGFuIDpjbGFzcz1cImNvbXBvbmVudENsYXNzXCI+XG4gIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgdmVyc2lvbj1cIjEuMFwiXG4gICAgICAgOndpZHRoPVwiY3VycmVudFNpemVcIlxuICAgICAgIDpoZWlnaHQ9XCJjdXJyZW50U2l6ZVwiXG4gICAgICAgdmlld0JveD1cIjAgMCAxMjggMTI4XCJcbiAgICAgICB4bWw6c3BhY2U9XCJwcmVzZXJ2ZVwiPlxuICAgIDxnPlxuICAgICAgPHBhdGggZD1cIk01OS42IDBoOHY0MGgtOFYwelwiIGZpbGw9XCJpbmhlcml0XCIgZmlsbC1vcGFjaXR5PVwiMVwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNNTkuNiAwaDh2NDBoLThWMHpcIiBmaWxsPVwiaW5oZXJpdFwiIGZpbGwtb3BhY2l0eT1cIjAuMlwiIHRyYW5zZm9ybT1cInJvdGF0ZSgzMCA2NCA2NClcIi8+XG4gICAgICA8cGF0aCBkPVwiTTU5LjYgMGg4djQwaC04VjB6XCIgZmlsbD1cImluaGVyaXRcIiBmaWxsLW9wYWNpdHk9XCIwLjJcIiB0cmFuc2Zvcm09XCJyb3RhdGUoNjAgNjQgNjQpXCIvPlxuICAgICAgPHBhdGggZD1cIk01OS42IDBoOHY0MGgtOFYwelwiIGZpbGw9XCJpbmhlcml0XCIgZmlsbC1vcGFjaXR5PVwiMC4yXCIgdHJhbnNmb3JtPVwicm90YXRlKDkwIDY0IDY0KVwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNNTkuNiAwaDh2NDBoLThWMHpcIiBmaWxsPVwiaW5oZXJpdFwiIGZpbGwtb3BhY2l0eT1cIjAuMlwiIHRyYW5zZm9ybT1cInJvdGF0ZSgxMjAgNjQgNjQpXCIvPlxuICAgICAgPHBhdGggZD1cIk01OS42IDBoOHY0MGgtOFYwelwiIGZpbGw9XCJpbmhlcml0XCIgZmlsbC1vcGFjaXR5PVwiMC4zXCIgdHJhbnNmb3JtPVwicm90YXRlKDE1MCA2NCA2NClcIi8+XG4gICAgICA8cGF0aCBkPVwiTTU5LjYgMGg4djQwaC04VjB6XCIgZmlsbD1cImluaGVyaXRcIiBmaWxsLW9wYWNpdHk9XCIwLjRcIiB0cmFuc2Zvcm09XCJyb3RhdGUoMTgwIDY0IDY0KVwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNNTkuNiAwaDh2NDBoLThWMHpcIiBmaWxsPVwiaW5oZXJpdFwiIGZpbGwtb3BhY2l0eT1cIjAuNVwiIHRyYW5zZm9ybT1cInJvdGF0ZSgyMTAgNjQgNjQpXCIvPlxuICAgICAgPHBhdGggZD1cIk01OS42IDBoOHY0MGgtOFYwelwiIGZpbGw9XCJpbmhlcml0XCIgZmlsbC1vcGFjaXR5PVwiMC42XCIgdHJhbnNmb3JtPVwicm90YXRlKDI0MCA2NCA2NClcIi8+XG4gICAgICA8cGF0aCBkPVwiTTU5LjYgMGg4djQwaC04VjB6XCIgZmlsbD1cImluaGVyaXRcIiBmaWxsLW9wYWNpdHk9XCIwLjdcIiB0cmFuc2Zvcm09XCJyb3RhdGUoMjcwIDY0IDY0KVwiLz5cbiAgICAgIDxwYXRoIGQ9XCJNNTkuNiAwaDh2NDBoLThWMHpcIiBmaWxsPVwiaW5oZXJpdFwiIGZpbGwtb3BhY2l0eT1cIjAuOFwiIHRyYW5zZm9ybT1cInJvdGF0ZSgzMDAgNjQgNjQpXCIvPlxuICAgICAgPHBhdGggZD1cIk01OS42IDBoOHY0MGgtOFYwelwiIGZpbGw9XCJpbmhlcml0XCIgZmlsbC1vcGFjaXR5PVwiMC45XCIgdHJhbnNmb3JtPVwicm90YXRlKDMzMCA2NCA2NClcIi8+XG4gICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPVwidHJhbnNmb3JtXCIgdHlwZT1cInJvdGF0ZVwiIHZhbHVlcz1cIjAgNjQgNjQ7MzAgNjQgNjQ7NjAgNjQgNjQ7OTAgNjQgNjQ7MTIwIDY0IDY0OzE1MCA2NCA2NDsxODAgNjQgNjQ7MjEwIDY0IDY0OzI0MCA2NCA2NDsyNzAgNjQgNjQ7MzAwIDY0IDY0OzMzMCA2NCA2NFwiIGNhbGNNb2RlPVwiZGlzY3JldGVcIiBkdXI9XCIxMDgwbXNcIiByZXBlYXRDb3VudD1cImluZGVmaW5pdGVcIj48L2FuaW1hdGVUcmFuc2Zvcm0+XG4gICAgPC9nPlxuICA8L3N2Zz5cbjwvc3Bhbj5cbmA7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBjb2RlOyIsIi8qKlxyXG4gKiBAZmlsZSBiYm4tbG9hZGljb24gY29tcG9uZW50XHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvbiBiYm4tbG9hZGljb24gaXMgYSBzaW1wbGUgaW1wbGVtZW50YXRpb24gY29tcG9uZW50LCB3aGljaCByZXByZXNlbnRzIGFuIGljb24gZGlzcGxheWluZyBhIHdhaXRpbmcgc3RhdGUuXHJcbiAqXHJcbiAqIEBjb3B5cmlnaHQgQkJOIFNvbHV0aW9uc1xyXG4gKlxyXG4gKiBAYXV0aG9yICBCQk4gU29sdXRpb25zXHJcbiAqIFxyXG4gKiBAY3JlYXRlZCAwNy8wMS8yMDE3XHJcbiAqL1xuY29uc3QgY3BEZWYgPSB7XG4gIC8qKlxyXG4gICAqIEBtaXhpbiBiYm4uY3AubWl4aW5zLmJhc2ljIFxyXG4gICAqL1xuICBtaXhpbnM6IFtiYm4uY3AubWl4aW5zLmJhc2ljXSxcbiAgcHJvcHM6IHtcbiAgICAvKipcclxuICAgICAqIFRoZSBzaXplIG9mIHRoZSBpY29uIGNvbnRhaW5lclxyXG4gICAgICogQHByb3Age051bWJlcnxTdHJpbmd9IFsxNl0gc2l6ZVxyXG4gICAgICovXG4gICAgc2l6ZToge1xuICAgICAgdHlwZTogW051bWJlciwgU3RyaW5nXSxcbiAgICAgIGRlZmF1bHQ6IDE2XG4gICAgfVxuICB9LFxuICBkYXRhKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50U2l6ZTogYmJuLmZuLmZvcm1hdFNpemUodGhpcy5zaXplKVxuICAgIH07XG4gIH0sXG4gIHdhdGNoOiB7XG4gICAgc2l6ZSh2KSB7XG4gICAgICB0aGlzLmN1cnJlbnRTaXplID0gYmJuLmZuLmZvcm1hdFNpemUodik7XG4gICAgfVxuICB9XG59O1xuaW1wb3J0IGNwSHRtbCBmcm9tICcuL2xvYWRpY29uLmh0bWwnO1xuLy9pbXBvcnQgY3BMYW5nIGZyb20gJy4vX2kxOG4vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdiYm4tbG9hZGljb24nLFxuICBkZWZpbml0aW9uOiBjcERlZixcbiAgdGVtcGxhdGU6IGNwSHRtbFxuICAvL2xhbmc6IGNwTGFuZ1xufTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/loadicon/loadicon.js\n\n}");

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
/******/ 	__webpack_modules__["./src/components/loadicon/loadicon.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	window["components/loadicon/loadicon"] = __webpack_exports__;
/******/ 	
/******/ })()
;