"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-config-js"],{

/***/ "./src/components/router/_mixins/config.js":
/*!*************************************************!*\
  !*** ./src/components/router/_mixins/config.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  data() {\n    return {\n      /**\n       * If true the configuration will be shown\n       * @data {Boolean} visual\n       */\n      showRouterCfg: false,\n      changingConfig: false\n    };\n  },\n  methods: {\n    changeConfig() {\n      this.changingConfig = true;\n      setTimeout(() => {\n        this.changingConfig = false;\n      }, 1500);\n    },\n    /**\n     * @method setconfig\n     * @fires setStorage\n     * @fires getConfig\n     */\n    setConfig() {\n      if (this.autoload && this.isInit) {\n        this.setStorage(this.getConfig(), this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);\n        //this.$forceUpdate();\n      }\n    },\n    /**\n     * @method getConfig\n     * @return {Object}\n     */\n    getConfig() {\n      let cfg = {\n        baseURL: this.parentContainer ? this.parentContainer.currentURL : this.storageName,\n        views: [],\n        breadcrumb: this.isBreadcrumb,\n        visual: this.isVisual,\n        orientation: this.lockedOrientation ? this.visualOrientation : null,\n        panes: this.currentPanes.map(a => {\n          return {\n            id: a.id,\n            tabs: a.tabs.map(b => b.url),\n            selected: a.selected\n          };\n        })\n      };\n      bbn.fn.each(this.views, (obj, i) => {\n        if (obj.url && obj.load) {\n          let res = {\n            url: obj.url,\n            icon: obj.icon || false,\n            notext: obj.notext || false,\n            load: true,\n            loaded: false,\n            title: obj.title ? obj.title : bbn._('Untitled'),\n            fixed: !!obj.fixed,\n            pinned: !!obj.pinned,\n            pane: obj.pane || false,\n            current: obj.current || obj.url,\n            cfg: {},\n            real: obj.real,\n            last: obj.last\n          };\n          if (obj.bcolor) {\n            res.bcolor = obj.bcolor;\n          }\n          if (obj.fcolor) {\n            res.fcolor = obj.fcolor;\n          }\n          cfg.views.push(res);\n        }\n      });\n      return cfg;\n    },\n    /**\n     * @method unsetConfig\n     * @fires unsetStorage\n     */\n    unsetConfig() {\n      if (this.autoload) {\n        this.unsetStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/config.js?");

/***/ })

}]);