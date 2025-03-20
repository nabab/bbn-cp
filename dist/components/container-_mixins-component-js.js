"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-component-js"],{

/***/ "./src/components/container/_mixins/component.js":
/*!*******************************************************!*\
  !*** ./src/components/container/_mixins/component.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Defines the component to use.\n     * @prop component\n     */\n    component: {\n      type: [String, Object, Function]\n    }\n  },\n  data() {\n    return {\n      /**\n       * A random unique component name.\n       * @data {String} [this.randomName()] componentName\n       */\n      componentName: this.randomName(),\n      /**\n       * True if the container is a componenent.\n       * @data [null] isComponent\n       */\n      isComponent: null,\n      componentDefinition: false,\n      componentTemplate: false,\n      componentCSS: false\n    };\n  },\n  computed: {\n    anonComponent() {\n      return this.$refs.component;\n    }\n  },\n  methods: {\n    componentCreated() {\n      if (this.isComponent) {\n        bbnContainer.componentsList.push(this.componentName);\n      } else if (this.isComponent === null) {\n        // The default onMount function is to do nothing.\n        this.onMount = () => {\n          return false;\n        };\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/component.js?");

/***/ })

}]);