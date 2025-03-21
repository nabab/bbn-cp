"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-display-js"],{

/***/ "./src/components/container/_mixins/display.js":
/*!*****************************************************!*\
  !*** ./src/components/container/_mixins/display.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    pane: {},\n    /**\n     * Defines if the component is hidden.\n     * @prop {Boolean} [false] invisible\n     */\n    invisible: {\n      type: [Boolean, Function],\n      default: false\n    }\n  },\n  data() {\n    return {\n      /**\n       * True if the container is fullscreen.\n       * @data {Boolean} [false] fullScreen\n       */\n      fullScreen: false\n    };\n  },\n  computed: {\n    /**\n     * True if the router configuration object has pane (ie is in a splitter pane).\n     * @data {Boolean} [false] isVisible\n     */\n    isPane() {\n      return !!this.currentView?.pane;\n    },\n    /**\n     * True if the container is shown.\n     * @data {Boolean} [false] isVisible\n     */\n    isVisible() {\n      if (this.router) {\n        if (this.isPane) {\n          if (!this.router.routed) {\n            return false;\n          }\n          if (this.isLoaded) {\n            return true;\n          }\n          let pane = bbn.fn.getRow(this.router.currentPanes, {\n            id: this.currentView.pane\n          });\n          if (pane) {\n            let idx = bbn.fn.search(pane.tabs, {\n              url: this.currentView.url\n            });\n            if (pane.tabs[idx]) {\n              return idx === pane.selected;\n            }\n          }\n          return this.router.routed && this.isPane || this.router.selected === this.currentIndex;\n        } else {\n          return this.router.selected === this.currentIndex;\n        }\n      }\n      return false;\n    }\n  },\n  watch: {\n    /**\n     * @watch visible\n     * @param {Boolean} nv \n     * @param {Boolean} ov \n     * @fires selfEmit\n     */\n    isVisible(nv) {\n      //bbn.fn.log(\"Changing isVisible for \" + this.currentURL);\n      let emit = true;\n      if (!this.isPane && this.router?.isVisual) {\n        if (nv) {\n          this.setScreenshot();\n        } else {\n          this.unsetScreenshot();\n        }\n      }\n      if (emit) {\n        this.$emit(nv ? 'view' : 'unview', this);\n      }\n      if (nv) {\n        this.onShow();\n      }\n    },\n    /**\n     * If true adds the event listener keydown, or else removes the event listener.\n     * @watch fullScreen\n     * @param {Boolean} newVal \n     * @fires selfEmit\n     */\n    fullScreen(newVal) {\n      let fn = e => {\n        if (e.keyCode === 27) {\n          this.fullScreen = false;\n        }\n      };\n      if (newVal) {\n        document.body.addEventListener('keydown', fn);\n      } else {\n        document.body.removeEventListener('keydown', fn);\n      }\n      this.$nextTick(() => {\n        this.selfEmit(true);\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/display.js?");

/***/ })

}]);