"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-breadcrumb-js"],{

/***/ "./src/components/router/_mixins/breadcrumb.js":
/*!*****************************************************!*\
  !*** ./src/components/router/_mixins/breadcrumb.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Set it to true if you want to show the breadcrumb instead of the tabs.\n     * @prop {Boolean} [false] breadcrumb\n     */\n    breadcrumb: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * Set it to true if you want to set this nav as a master.\n     * @prop {Boolean} [false] master\n     */\n    master: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data() {\n    return {\n      /**\n       * Shows if the navigation mode is set to breacrumb.\n       * @data {Boolean} isBreadcrumb\n       */\n      isBreadcrumb: !!this.breadcrumb,\n      /**\n       * itsMaster.isBreadcrumb watcher.\n       * @data {Boolean} breadcrumbWatcher\n       */\n      breadcrumbWatcher: false,\n      /**\n       * List of breadcrumbs\n       * @data {Array} breadcrumbsList\n       */\n      breadcrumbsList: []\n    };\n  },\n  computed: {\n    /**\n     * Returns the breadcrumbs array\n     * @computed breadcrumbs\n     * @return {Array}\n     */\n    breadcrumbs() {\n      let res = [];\n      if (this.isBreadcrumb) {\n        res.push(this);\n      }\n      if (this.breadcrumbsList.length) {\n        res.push(...this.getBreadcrumbs(this.selected));\n      }\n      return res;\n    },\n    /**\n     * The master bbn-router of this one.\n     * @computed itsMaster\n     * @return {bbnCp}\n     */\n    itsMaster() {\n      let r = this;\n      if (this.master) {\n        return r;\n      }\n      if (this.parents.length) {\n        let i = 0;\n        while (this.parents[i] && this.parents[i].isBreadcrumb) {\n          r = this.parents[i];\n          i++;\n          if (r.master) {\n            break;\n          }\n        }\n      }\n      return r;\n    },\n    isBreadcrumbMaster() {\n      if (this.isBreadcrumb) {\n        return this.itsMaster === this;\n      }\n      return false;\n    }\n  },\n  methods: {\n    //Breadcrumb\n    /**\n     * @method registerBreadcrumb\n     * @param {bbnCp} bc\n     * @param {String} url\n     */\n    registerBreadcrumb(bc) {\n      let url = bbn.fn.substr(bc.baseURL, 0, bc.baseURL.length - 1);\n      this.breadcrumbsList.push(bc);\n      if (this.itsMaster && !this.master) {\n        this.itsMaster.breadcrumbsList.push(bc);\n      }\n    },\n    /**\n     * @method unregisterBreadcrumb\n     * @param {bbnCp} bc\n     * @param {String} url\n     */\n    unregisterBreadcrumb(bc) {\n      if (this.breadcrumbsList) {\n        let idx = bbn.fn.search(this.breadcrumbsList, {\n          baseURL: bc.baseURL\n        });\n        if (idx !== -1) {\n          this.breadcrumbsList.splice(idx, 1);\n        }\n        if (this.itsMaster && !this.master) {\n          idx = bbn.fn.search(this.itsMaster.breadcrumbsList, {\n            baseURL: bc.baseURL\n          });\n          if (idx !== -1) {\n            this.itsMaster.breadcrumbsList.splice(idx, 1);\n          }\n        }\n      }\n    },\n    getBreadcrumbs(idx) {\n      let ret = [];\n      if (bbn.fn.isNumber(idx) && this.views[idx]) {\n        let url = this.views[idx].url,\n          bc = bbn.fn.getRow(this.breadcrumbsList, {\n            baseURL: url + '/'\n          });\n        if (this.urls[this.views[idx].uid] && bc) {\n          ret.push(...bc.breadcrumbs);\n        }\n      }\n      return ret;\n    }\n  },\n  watch: {\n    /**\n     * @watch itsMaster\n     * @fires breadcrumbWatcher\n     */\n    itsMaster(newVal, oldVal) {\n      if (this.nav && newVal !== oldVal) {\n        this.isBreadcrumb = newVal ? newVal.isBreadcrumb : this.breadcrumb;\n        if (this.breadcrumbWatcher) {\n          this.breadcrumbWatcher();\n        }\n        if (newVal) {\n          /**\n           * @watch itsMaster.isBreadcrumb\n           */\n          this.breadcrumbWatcher = this.$watch('itsMaster.isBreadcrumb', isB => {\n            this.isBreadcrumb = isB;\n          });\n        }\n      }\n    },\n    breadcrumb(v) {\n      this.isBreadcrumb = v;\n    },\n    /**\n     * @watch isBreadcrumb\n     * @fires setConfig\n     */\n    isBreadcrumb(newVal) {\n      this.$nextTick(() => {\n        if (this.ready) {\n          this.setConfig();\n          this.onResize();\n        }\n      });\n    }\n  },\n  beforeMount() {\n    //Breadcrumb\n    //bbn.fn.warning(\"BEFORE MOUNT ROUTER\")\n\n    //Get config from the storage\n    if (!this.single & this.nav) {\n      let storage = this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);\n      if (storage) {\n        if (storage.breadcrumb !== undefined) {\n          this.isBreadcrumb = storage.breadcrumb;\n        }\n      }\n      if (!this.master && this.parent && this.parentContainer) {\n        this.parent.registerBreadcrumb(this);\n        bbn.fn.log(\"VIEW ON BREADCUMB\");\n        this.parentContainer.$on('view', () => {\n          this.parent.registerBreadcrumb(this);\n        }, true);\n        this.parentContainer.$on('unview', () => {\n          this.parent.unregisterBreadcrumb(this);\n        }, true);\n        if (this.parentContainer.isVisible) {\n          this.parent.registerBreadcrumb(this);\n        }\n      }\n    }\n  },\n  beforeDestroy() {\n    if (!this.single & this.nav && !this.master && this.parent) {\n      this.parent.unregisterBreadcrumb(this);\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/breadcrumb.js?");

/***/ })

}]);