"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-toChange-js"],{

/***/ "./src/components/container/_mixins/toChange.js":
/*!******************************************************!*\
  !*** ./src/components/container/_mixins/toChange.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * @method registerRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    registerRouter(router) {\n      if (!router.urlNavigation) {\n        return;\n      }\n      if (this.subrouter && this.subrouter !== router && !this.subrouter.$isDestroying) {\n        throw new Error(bbn._('The router %s already exists', router.getBaseURL() || '__root__'));\n      }\n      this.subrouter = router;\n    },\n    /**\n     * @method unregisterRouter\n     * @param {Object} bc\n     * @param {String} url\n     */\n    unregisterRouter(router) {\n      if (!this.subrouter) {\n        throw new Error(bbn._('The router %s was not registered', router.getBaseURL() || '__root__'));\n      }\n      this.subrouter = null;\n    }\n  }\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9jb250YWluZXIvX21peGlucy90b0NoYW5nZS5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BiYm4vYmJuLWNwLy4vc3JjL2NvbXBvbmVudHMvY29udGFpbmVyL19taXhpbnMvdG9DaGFuZ2UuanM/NmE3OSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIG1ldGhvZHM6IHtcbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHJlZ2lzdGVyUm91dGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqL1xuICAgIHJlZ2lzdGVyUm91dGVyKHJvdXRlcikge1xuICAgICAgaWYgKCFyb3V0ZXIudXJsTmF2aWdhdGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zdWJyb3V0ZXIgJiYgdGhpcy5zdWJyb3V0ZXIgIT09IHJvdXRlciAmJiAhdGhpcy5zdWJyb3V0ZXIuJGlzRGVzdHJveWluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYmJuLl8oJ1RoZSByb3V0ZXIgJXMgYWxyZWFkeSBleGlzdHMnLCByb3V0ZXIuZ2V0QmFzZVVSTCgpIHx8ICdfX3Jvb3RfXycpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3Vicm91dGVyID0gcm91dGVyO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQG1ldGhvZCB1bnJlZ2lzdGVyUm91dGVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJjXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICAgICAqL1xuICAgIHVucmVnaXN0ZXJSb3V0ZXIocm91dGVyKSB7XG4gICAgICBpZiAoIXRoaXMuc3Vicm91dGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihiYm4uXygnVGhlIHJvdXRlciAlcyB3YXMgbm90IHJlZ2lzdGVyZWQnLCByb3V0ZXIuZ2V0QmFzZVVSTCgpIHx8ICdfX3Jvb3RfXycpKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3Vicm91dGVyID0gbnVsbDtcbiAgICB9XG4gIH1cbn07Il0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/container/_mixins/toChange.js\n\n}");

/***/ })

}]);