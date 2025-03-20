"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-misc-js"],{

/***/ "./src/components/router/_mixins/misc.js":
/*!***********************************************!*\
  !*** ./src/components/router/_mixins/misc.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Sets if the views' titles will be scrollable in case they have a greater width than the page (true), or if they will be shown multilines (false, default).\n     * @prop {Boolean} [false] scrollable\n     */\n    scrollable: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Sets if the router and the ocntainers inside it should be themselves scrollable or part of the global scroll.\n     * @prop {Boolean} [false] scrollContent\n     */\n    scrollContent: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * The name used for the storage.\n     * @prop {String} ['__ROOT__'] storageName\n     */\n    storageName: {\n      type: String,\n      default: '__ROOT__'\n    },\n    /**\n     * The max length for the titles\n     * @prop {Number} [20] maxTitleLength\n     */\n    maxTitleLength: {\n      type: Number,\n      default: 20\n    },\n    /**\n     * The default background color for the title bar\n     * @prop {String} [#666] bcolor\n     */\n    bcolor: {\n      type: String,\n      default: '#666'\n    },\n    /**\n     * The default text color for the title bar\n     * @prop {String} [#EEE] fcolor\n     */\n    fcolor: {\n      type: String,\n      default: '#EEE'\n    },\n    disabled: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {};\n  },\n  computed: {\n    hasVerticalTabs() {\n      return !this.isVisual && !this.isBreadcrumb && (this.orientation === 'left' || this.orientation === 'right');\n    }\n  },\n  methods: {\n    /**\n     * @method onEscape\n     * @param {Event} e\n     */\n    onEscape(e) {\n      if (this.isVisual && this.visualShowAll) {\n        this.visualShowAll = false;\n        e.stopPropagation();\n        e.preventDefault();\n      }\n    },\n    /**\n     * Function triggered every time a container is shown (at the start of the animation) to change the URL if needed.\n     * @method enter\n     * @param container\n     */\n    enter(container) {\n      //bbn.fn.log(\"THE CONTAINER WILL BE SHOWN: \", container);\n    },\n    //Tabs\n    /**\n     * Cuts the given string by 'maxTitleLength' property value\n     * @method cutTitle\n     * @param {String} title\n     * @return {String}\n     */\n    cutTitle(title) {\n      return bbn.fn.shorten(title, this.maxTitleLength);\n    },\n    /**\n     * @method onResize\n     * @return {Promise}\n     */\n    onResize() {\n      this.keepCool(() => {\n        let m = this.setResizeMeasures();\n        let c = this.setContainerMeasures();\n        if (m || c) {\n          this.$emit('resize');\n        }\n        if (this.isVisual && this.orientation === 'auto' && !this.lockedOrientation) {\n          this.visualOrientation = this.clientWidth > this.clientHeight ? 'left' : 'top';\n        }\n      }, 'resize', 50);\n    },\n    slashToHyphen(str) {\n      return bbn.fn.replaceAll('/', '-', str);\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/misc.js?");

/***/ })

}]);