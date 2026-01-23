"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-title-js"],{

/***/ "./src/components/table/_mixins/title.js":
/*!***********************************************!*\
  !*** ./src/components/table/_mixins/title.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * True if the columns has to have titles.\n     * @prop {Boolean} [true] titles\n     */\n    titles: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * If the property 'group' is given to one or more columns in the table (ex: group=\"test\"), it defines the title of a group of columns. (ex: titleGroups=\"[{value: 'test', text: 'My group'}]\").\n     * @prop {Array|Function} titleGroups\n     */\n    titleGroups: {\n      type: [Array, Function]\n    }\n  },\n  methods: {\n    onTitleCellDestroyed(e) {\n      if (this.scrollIntersection) {\n        this.scrollIntersection.unobserve(e.target);\n      }\n    },\n    onTitleCellCreated(e) {\n      if (this.scrollIntersection) {\n        this.scrollIntersection.observe(e.target);\n      }\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy90YWJsZS9fbWl4aW5zL3RpdGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGdLQUFnSyxnQ0FBZ0M7QUFDaE0sY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJibi9iYm4tY3AvLi9zcmMvY29tcG9uZW50cy90YWJsZS9fbWl4aW5zL3RpdGxlLmpzP2VkNTgiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBwcm9wczoge1xuICAgIC8qKlxuICAgICAqIFRydWUgaWYgdGhlIGNvbHVtbnMgaGFzIHRvIGhhdmUgdGl0bGVzLlxuICAgICAqIEBwcm9wIHtCb29sZWFufSBbdHJ1ZV0gdGl0bGVzXG4gICAgICovXG4gICAgdGl0bGVzOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogSWYgdGhlIHByb3BlcnR5ICdncm91cCcgaXMgZ2l2ZW4gdG8gb25lIG9yIG1vcmUgY29sdW1ucyBpbiB0aGUgdGFibGUgKGV4OiBncm91cD1cInRlc3RcIiksIGl0IGRlZmluZXMgdGhlIHRpdGxlIG9mIGEgZ3JvdXAgb2YgY29sdW1ucy4gKGV4OiB0aXRsZUdyb3Vwcz1cIlt7dmFsdWU6ICd0ZXN0JywgdGV4dDogJ015IGdyb3VwJ31dXCIpLlxuICAgICAqIEBwcm9wIHtBcnJheXxGdW5jdGlvbn0gdGl0bGVHcm91cHNcbiAgICAgKi9cbiAgICB0aXRsZUdyb3Vwczoge1xuICAgICAgdHlwZTogW0FycmF5LCBGdW5jdGlvbl1cbiAgICB9XG4gIH0sXG4gIG1ldGhvZHM6IHtcbiAgICBvblRpdGxlQ2VsbERlc3Ryb3llZChlKSB7XG4gICAgICBpZiAodGhpcy5zY3JvbGxJbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5zY3JvbGxJbnRlcnNlY3Rpb24udW5vYnNlcnZlKGUudGFyZ2V0KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uVGl0bGVDZWxsQ3JlYXRlZChlKSB7XG4gICAgICBpZiAodGhpcy5zY3JvbGxJbnRlcnNlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5zY3JvbGxJbnRlcnNlY3Rpb24ub2JzZXJ2ZShlLnRhcmdldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59OyJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/table/_mixins/title.js\n\n}");

/***/ })

}]);