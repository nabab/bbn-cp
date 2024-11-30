"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-observers-js"],{

/***/ "./src/components/router/_mixins/observers.js":
/*!****************************************************!*\
  !*** ./src/components/router/_mixins/observers.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /*\n    observerEmit(newVal, obs){\n      bbn.fn.log(\"OBS EMIT\", newVal, obs);\n      let ele = $(\".bbn-observer-\" + obs.element, this.$el);\n      if ( ele.length ){\n        let idx = this.getIndex(ele);\n        if ( idx !== false ){\n          let i = bbn.fn.search(this.observers, {id: obs.id, element: obs.element});\n          if ( (i > -1) && (this.observers[i].value !== newVal) ){\n            if ( idx === this.selected ){\n              this.$emit('bbnobs' + obs.element + obs.id, newVal);\n              this.observers[i].value = newVal;\n            }\n            else{\n              this.observers[i].value = newVal;\n              this.$set(this.views[idx].events, 'bbnObs' + obs.element + obs.id, newVal);\n            }\n          }\n        }\n      }\n    },\n    */\n\n    /**\n     * @method observerEmit\n     * @param newVal\n     * @param obs\n     * @fires getIndex\n     */\n    observerEmit(newVal, obs) {\n      if (bbn.cp.mixins.observer.methods.observerEmit.apply(this, [newVal, obs])) {\n        let ele = this.$el.querySelector(\".bbn-observer-\" + obs.element);\n        if (ele) {\n          let idx = this.getIndex(ele);\n          if (idx !== false) {\n            this.$set(this.views[idx].events, 'bbnObs' + obs.element + obs.id, newVal);\n            this.$nextTick(() => {\n              //this.$forceUpdate();\n            });\n          }\n        }\n      }\n    },\n    /**\n     * The called method on the switching to false of the \"observer Dirty\" property value\n     * @method observerClear\n     * @param {Object} obs\n     * @fires getInde\n     * @fires $nextTick\n     * @fires $forceUpdate\n     * @fires observationTower.observerClear\n     */\n    observerClear(obs) {\n      let ele = this.$el.querySelector(\".bbn-observer-\" + obs.element);\n      if (ele) {\n        let idx = this.getIndex(ele);\n        if (idx !== false && 'bbnObs' + obs.element + obs.id in this.views[idx].events) {\n          delete this.views[idx].events['bbnObs' + obs.element + obs.id];\n          this.$nextTick(() => {\n            //this.$forceUpdate();\n          });\n        }\n      } else if (this.observationTower) {\n        this.observationTower.observerClear(obs);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/observers.js?");

/***/ })

}]);