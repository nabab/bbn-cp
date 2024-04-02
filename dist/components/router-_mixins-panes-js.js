"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-panes-js"],{

/***/ "./src/components/router/_mixins/panes.js":
/*!************************************************!*\
  !*** ./src/components/router/_mixins/panes.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * A list of panes used by default if splittable is true\n     * @prop {Array} [[]] panes\n     */\n    panes: {\n      type: Array,\n      default() {\n        return [];\n      }\n    },\n    /**\n     * If true another tab can be opened aside\n     * @prop {Boolean} [false] splittable\n     */\n    splittable: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * If true when splittable the extra panes can be collapsed\n     * @prop {Boolean} [false] collapsible\n     */\n    collapsible: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * If true when splittable the extra panes can be resized\n     * @prop {Boolean} [false] resizable\n     */\n    resizable: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data() {\n    return {\n      /**\n       * The panes for when splittable is true\n       * @data {Array} currentPanes\n       */\n      currentPanes: this.panes.slice(),\n      /**\n       * Becomes true once the pane splitter is mounted\n       * @data {Boolean} visual\n       */\n      splitterMounted: false\n    };\n  },\n  computed: {\n    isSplittable() {\n      return this.splittable && !this.single;\n    },\n    /**\n     * The number of tabs which are not in a pane\n     * \n     * @returns {Number}\n     */\n    numOutOfPane() {\n      return bbn.fn.filter(this.views, {\n        pane: false\n      }).length;\n    },\n    /**\n     * The number of panes displayed\n     * @computed numPanes\n     * @return {Number} \n     */\n    numPanes() {\n      return this.currentPanes.length;\n    }\n  },\n  methods: {\n    getPane(obj) {\n      if (!obj) {\n        return false;\n      }\n      if (this.isVisual) {\n        return obj.view.pane || false;\n      }\n      return obj.pane || false;\n    },\n    addPane(paneId) {\n      if (this.splittable) {\n        if (!paneId) {\n          paneId = bbn.fn.randomString().toLowerCase();\n        }\n        if (!bbn.fn.getRow(this.currentPanes, {\n          id: paneId\n        })) {\n          this.currentPanes.push({\n            id: paneId,\n            tabs: [],\n            selected: -1\n          });\n        }\n      }\n      return paneId;\n    },\n    selectPaneTab(pane) {\n      let view = pane.tabs[pane.selected];\n      if (view) {\n        view.last = bbn.fn.timestamp();\n      }\n    },\n    removePane(paneId) {\n      if (this.splittable && this.currentPanes) {\n        let paneIndex = bbn.fn.search(this.currentPanes, {\n          id: paneId\n        });\n        let pane = this.currentPanes[paneIndex];\n        if (!pane) {\n          throw Error(bbn._(\"Impossible to find the pane with ID %s\", paneId));\n        }\n        if (pane.tabs.length) {\n          throw Error(bbn._(\"Impossible to remove the pane with ID %s as it has still containers inside\", paneId));\n        }\n        this.currentPanes.splice(paneIndex, 1);\n        if (this.routed) {\n          this.$nextTick(() => {\n            this.currentPanes.length ? this.getRef('splitter').init() : this.getRef('topSplitter').init();\n          });\n        }\n      }\n    },\n    addToPane(containerIdx, paneId) {\n      let view = this.views[containerIdx];\n      if (!view) {\n        throw Error(bbn._(\"Impossible to find the view with index\") + ' ' + containerIdx);\n      }\n      if (view.dirty) {\n        this.alert(bbn._(\"Save your changes or discard them before moving the container\"));\n        return;\n      }\n      let pane = bbn.fn.getRow(this.currentPanes, {\n        id: paneId\n      });\n      if (!pane) {\n        paneId = this.addPane(paneId);\n        pane = bbn.fn.getRow(this.currentPanes, {\n          id: paneId\n        });\n      }\n      this.$set(this.views[containerIdx], \"pane\", paneId);\n      pane.tabs.push(view);\n      //this.$forceUpdate();\n      if (containerIdx === this.selected) {\n        this.selectClosest(containerIdx);\n      }\n      pane.selected = pane.tabs.length - 1;\n    },\n    removeFromPane(containerIdx) {\n      let view = this.views[containerIdx];\n      if (view) {\n        if (view.dirty) {\n          this.alert(bbn._(\"Save your changes or discard them before moving the container\"));\n          return;\n        }\n        let paneId = view.pane;\n        if (paneId) {\n          let pane = bbn.fn.getRow(this.currentPanes, {\n            id: paneId\n          });\n          if (pane && pane.tabs) {\n            let idx = bbn.fn.search(pane.tabs, {\n              idx: containerIdx\n            });\n            if (idx > -1) {\n              this.selected = containerIdx;\n              view.pane = false;\n              this.$nextTick(() => {\n                pane.tabs.splice(idx, 1);\n                if (!pane.tabs.length) {\n                  this.removePane(paneId);\n                } else if (pane.selected >= idx) {\n                  pane.selected--;\n                  this.getRef('pane' + pane.id).onResize(true);\n                }\n              });\n            }\n          }\n        }\n      }\n    },\n    /**\n     * @event created\n     */\n    panesCreated() {\n      let storage = !this.single && this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);\n      if (storage && storage.panes) {\n        bbn.fn.each(storage.panes, a => {\n          this.addPane(a.id);\n        });\n      }\n    }\n  },\n  /**\n   * @event mounted\n   * @fires getStorage\n   * @fires getDefaultURL\n   * @fires add\n   */\n  beforeMount() {\n    if (this.splittable) {\n      if (storage && storage.panes) {\n        bbn.fn.each(storage.panes, pane => {\n          bbn.fn.each(pane.tabs, tab => {\n            let view = bbn.fn.getRow(this.views, {\n              url: tab\n            });\n            let realPane = bbn.fn.getRow(this.currentPanes, {\n              id: pane.id\n            });\n            if (view && realPane) {\n              if (!view.pane) {\n                view.pane = pane.id;\n              }\n              realPane.tabs.push(view);\n            }\n          });\n        });\n      }\n      bbn.fn.each(this.views, a => {\n        if (a.pane) {\n          let pane = bbn.fn.getRow(this.currentPanes, {\n            id: a.pane\n          });\n          if (pane && !bbn.fn.getRow(pane.tabs, {\n            url: a.url\n          })) {\n            pane.tabs.push(a);\n          }\n        }\n      });\n      bbn.fn.each(this.currentPanes, pane => {\n        let done = false;\n        if (storage && storage.panes) {\n          let p = bbn.fn.getRow(storage.panes, {\n            id: pane.id\n          });\n          if (p && pane.tabs[p.selected]) {\n            pane.selected = p.selected;\n            done = true;\n          }\n        }\n        if (!done) {\n          pane.selected = pane.tabs.length ? 0 : -1;\n        }\n      });\n    }\n  },\n  watch: {\n    numPanes() {\n      this.onResize();\n    },\n    currentPanes: {\n      deep: true,\n      handler() {\n        if (this.ready) {\n          this.setConfig();\n        }\n      }\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/panes.js?");

/***/ })

}]);