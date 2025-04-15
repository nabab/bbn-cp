"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-2change-js"],{

/***/ "./src/components/container/_mixins/2change.js":
/*!*****************************************************!*\
  !*** ./src/components/container/_mixins/2change.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * @method registerRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    registerRouter(router) {\n      if (!router.urlNavigation) {\n        return;\n      }\n      if (this.subrouter && this.subrouter !== router && !this.subrouter.$isDestroying) {\n        throw new Error(bbn._('The router %s already exists', router.getBaseURL() || '__root__'));\n      }\n      this.subrouter = router;\n    },\n    /**\n     * @method unregisterRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    unregisterRouter(router) {\n      if (!this.subrouter) {\n        throw new Error(bbn._('The router %s was not registered', router.getBaseURL() || '__root__'));\n      }\n      this.subrouter = null;\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9jb250YWluZXIvX21peGlucy8yY2hhbmdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxpRUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJibi9iYm4tY3AvLi9zcmMvY29tcG9uZW50cy9jb250YWluZXIvX21peGlucy8yY2hhbmdlLmpzPzM4MTIiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBtZXRob2RzOiB7XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCByZWdpc3RlclJvdXRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBiY1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKi9cbiAgICByZWdpc3RlclJvdXRlcihyb3V0ZXIpIHtcbiAgICAgIGlmICghcm91dGVyLnVybE5hdmlnYXRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc3Vicm91dGVyICYmIHRoaXMuc3Vicm91dGVyICE9PSByb3V0ZXIgJiYgIXRoaXMuc3Vicm91dGVyLiRpc0Rlc3Ryb3lpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGJibi5fKCdUaGUgcm91dGVyICVzIGFscmVhZHkgZXhpc3RzJywgcm91dGVyLmdldEJhc2VVUkwoKSB8fCAnX19yb290X18nKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN1YnJvdXRlciA9IHJvdXRlcjtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgdW5yZWdpc3RlclJvdXRlclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBiY1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAgICAgKi9cbiAgICB1bnJlZ2lzdGVyUm91dGVyKHJvdXRlcikge1xuICAgICAgaWYgKCF0aGlzLnN1YnJvdXRlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYmJuLl8oJ1RoZSByb3V0ZXIgJXMgd2FzIG5vdCByZWdpc3RlcmVkJywgcm91dGVyLmdldEJhc2VVUkwoKSB8fCAnX19yb290X18nKSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN1YnJvdXRlciA9IG51bGw7XG4gICAgfVxuICB9XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/container/_mixins/2change.js\n");

/***/ })

}]);