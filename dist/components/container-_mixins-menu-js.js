"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-menu-js"],{

/***/ "./src/components/container/_mixins/menu.js":
/*!**************************************************!*\
  !*** ./src/components/container/_mixins/menu.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * Handles the configuration of the container's menu.\n     * \n     * @param {Object} obj \n     */\n    addMenu(obj) {\n      if (this.currentIndex > -1 && obj.text && this.router.views && this.router.views[this.currentIndex]) {\n        if (this.router.views[this.currentIndex].menu === undefined) {\n          this.router.views[this.currentIndex].menu = [];\n        }\n        let menu = this.router.views[this.currentIndex].menu || [],\n          idx = bbn.fn.isFunction(menu) ? -1 : bbn.fn.search(menu || [], {\n            text: obj.text\n          });\n        if (idx === -1) {\n          if (bbn.fn.isFunction(menu)) {\n            this.router.views[this.currentIndex].menu = () => {\n              let items = menu() || [];\n              if (bbn.fn.search(items, obj) === -1) {\n                if (!obj.key) {\n                  obj.key = bbn.fn.randomInt(99999, 99999999999);\n                }\n                items.push(obj);\n              }\n              return items;\n            };\n          } else {\n            if (!obj.key) {\n              obj.key = bbn.fn.randomInt(99999, 99999999999);\n            }\n            menu.push(obj);\n          }\n        } else {\n          obj.key = menu[idx].key;\n          menu.splice(idx, 1, obj);\n        }\n        this.router.views[this.currentIndex].menu = menu;\n        return obj.key;\n      }\n      return false;\n    },\n    /**\n     * Deletes the given key from the container's menu.\n     * \n     * @method deleteMenu\n     * @param {String} key \n     */\n    deleteMenu(key) {\n      if (this.currentIndex > -1 && this.router.views && this.router.views[this.currentIndex]) {\n        let menu = this.router.views[this.currentIndex].menu || [];\n        if (bbn.fn.isFunction(menu)) {\n          menu = () => {\n            let items = menu() || [];\n            let idx = bbn.fn.search(items, \"key\", key);\n            if (idx > -1) {\n              items.splice(idx, 1);\n              this.router.views[this.currentIndex].menu = items;\n              //this.router.$forceUpdate();\n              return true;\n            }\n          };\n        } else {\n          let idx = bbn.fn.search(menu, \"key\", key);\n          if (idx > -1) {\n            menu.splice(idx, 1);\n            this.router.views[this.currentIndex].menu = menu;\n            //this.router.$forceUpdate();\n            return true;\n          }\n        }\n      }\n      return false;\n    },\n    showMenu() {\n      return this.router.getMenuFn(this.currentIndex);\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/menu.js?");

/***/ })

}]);