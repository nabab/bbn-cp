"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-config-js"],{

/***/ "./src/components/table/_mixins/config.js":
/*!************************************************!*\
  !*** ./src/components/table/_mixins/config.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Set to true shows a save icon that allows to save the current configuration of the table at the bottom right of the table.\n     * @prop {Boolean} [false] saveable\n     */\n    saveable: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * @todo desc\n     * @prop {Object} loadedConfig\n     */\n    loadedConfig: {\n      type: Object\n    }\n  },\n  data() {\n    return {\n      initialConfig: null,\n      /**\n       * The current configuration object.\n       * @data {Object} [{}] currentConfig\n       */\n      currentConfig: {},\n      /**\n       * The saved configuration.\n       * @data {Boolean} [false] savedConfig\n       */\n      savedConfig: false,\n      /**\n       * The default confuguration\n       * @data {Object} defaultConfig\n       */\n      defaultConfig: bbn.fn.extend({\n        filters: this.filters,\n        limit: this.limit,\n        order: this.order,\n        invisible: this.invisible || null\n      }, this.loadedConfig || {})\n    };\n  },\n  computed: {\n    /**\n     * Return the json string of currentConfig.\n     * @computed jsonConfig\n     * @returns {String}\n     */\n    jsonConfig() {\n      let cfg = this.currentConfig;\n      if (this.currentHidden.length > this.cols.length / 2) {\n        cfg = bbn.fn.createObject(cfg);\n        cfg.shown = this.allFields.filter(x => !cfg.invisible.includes(x));\n        //bbn.fn.log(\"WE ARE IN!!!!\", cfg);\n        delete cfg.invisible;\n      }\n      return JSON.stringify(this.currentConfig);\n    },\n    /**\n     * Return true if the saved config is identic to the jsonConfig.\n     * @computed isSaved\n     * @returns {Boolean}\n     */\n    isSaved() {\n      return this.jsonConfig === this.savedConfig;\n    },\n    /**\n     * Return true if the json string of currentConfig is different from initialConfig\n     * @computed isChanged\n     * @returns {Boolean}\n     */\n    isChanged() {\n      return this.jsonConfig !== this.initialConfig;\n    }\n  },\n  methods: {\n    initConfig() {\n      if (this.defaultConfig.invisible === null) {\n        let tmp = [];\n        let initColumn = [];\n        bbn.fn.each(this.cols, (a, i) => {\n          if (a.invisible) {\n            tmp.push(a.field || i);\n          } else if (initColumn.length <= 10) {\n            initColumn.push(i);\n          }\n        });\n        this.defaultConfig.invisible = tmp;\n      }\n      this.setConfig(false, true);\n      this.initialConfig = this.jsonConfig;\n      this.savedConfig = this.initialConfig;\n      let cfg = this.getStorage();\n      if (cfg) {\n        this.setConfig(cfg, true);\n      }\n    },\n    /**\n     * Returns the current configuration of the table.\n     * @method getConfig\n     * @returns {Object}\n     */\n    getConfig() {\n      return {\n        searchValue: this.searchValue,\n        limit: this.currentLimit,\n        order: this.currentOrder,\n        filters: this.currentFilters,\n        invisible: this.currentHidden\n      };\n    },\n    onSave() {\n      this.$emit('save', JSON.parse(this.jsonConfig));\n    },\n    /**\n     * Sets the current config of the table.\n     * @method setConfig\n     * @param {Object} cfg\n     * @param {Boolean} no_storage\n     * @fires getConfig\n     * @fires setStorage\n     */\n    setConfig(cfg, no_storage) {\n      if (cfg === false) {\n        cfg = bbn.fn.clone(this.defaultConfig);\n      } else if (cfg === true) {\n        cfg = this.getConfig();\n      }\n      if (cfg && cfg.limit) {\n        if (this.filterable && cfg.filters && this.currentFilters !== cfg.filters) {\n          this.currentFilters = cfg.filters;\n        }\n        if (this.pageable && this.currentLimit !== cfg.limit) {\n          this.currentLimit = cfg.limit;\n        }\n        if (this.search) {\n          this.searchValue = cfg.searchValue || '';\n        }\n        if (this.sortable && this.currentOrder !== cfg.order) {\n          if (bbn.fn.isObject(cfg.order)) {\n            let currentOrder = [];\n            bbn.fn.iterate(cfg.order, (v, n) => {\n              currentOrder.push({\n                field: n,\n                dir: v.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'\n              });\n            });\n            this.currentOrder = currentOrder;\n          } else if (bbn.fn.isArray(cfg.order)) {\n            this.currentOrder = cfg.order;\n          }\n        }\n        if (this.showable) {\n          this.currentHidden = this.allFields.filter(x => cfg.shown && !cfg.shown.includes(x) || cfg.invisible && cfg.invisible.includes(x));\n          bbn.fn.each(this.cols, (a, i) => {\n            let isHidden = this.currentHidden.indexOf(a.field || i) > -1;\n            if (a.invisible !== isHidden) {\n              //bbn.fn.log(\"CHANGING HIDDEN\");\n              //this.cols[i].invisible = hidden;\n              this.cols[i].invisible = isHidden;\n            }\n          });\n        }\n        this.currentConfig = {\n          searchValue: this.searchValue,\n          limit: this.currentLimit,\n          order: this.currentOrder,\n          filters: this.currentFilters,\n          invisible: this.currentHidden\n        };\n        if (!no_storage) {\n          let cfg = this.currentConfig;\n          if (this.cols.length > 10 && this.currentHidden?.length > this.cols.length / 2) {\n            cfg = bbn.fn.extend({}, cfg);\n            cfg.shown = this.allFields.filter(x => !cfg.invisible.includes(x));\n            delete cfg.invisible;\n          }\n          this.setStorage(cfg);\n        }\n      }\n    },\n    /**\n     * Saves the current configuration.\n     * @method save\n     */\n    save() {\n      this.savedConfig = this.jsonConfig;\n    },\n    /**\n     * Resets configuration of the table.\n     * @method reset\n     * @param noCfg\n     * @fires setConfig\n     * @fires init\n     */\n    reset(noCfg) {\n      this.initReady = false;\n      this.$emit('reset', this);\n      if (!noCfg) {\n        this.setConfig(false);\n      }\n      this.init();\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/table/_mixins/config.js?");

/***/ })

}]);