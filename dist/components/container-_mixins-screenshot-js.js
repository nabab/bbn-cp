"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/container-_mixins-screenshot-js"],{

/***/ "./src/components/container/_mixins/screenshot.js":
/*!********************************************************!*\
  !*** ./src/components/container/_mixins/screenshot.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  props: {\n    /**\n     * Time between 2 automatic screenshot in visual mode, in milliseconds\n     * @prop {Number} [43200000] screenshotDelay (12 hours)\n     */\n    screenshotDelay: {\n      type: Number,\n      default: 43200000\n    }\n  },\n  data() {\n    return {\n      /**\n       * Time between 2 automatic screenshot in visual mode, in milliseconds\n       * @data {Number} currentScreenshotDelay\n       */\n      currentScreenshotDelay: this.screenshotDelay,\n      /**\n       * The base 64 encoded thumbnail image.\n       * @data {String} thumbnail\n       */\n      thumbnail: false\n    };\n  },\n  methods: {\n    setScreenshot() {\n      if (!this._screenshotInterval && this.router.isVisual && this.router.db && !this.isPane) {\n        let url = this.getFullURL();\n        this.router.db.selectOne('containers', 'time', {\n          url: url\n        }).then(time => {\n          // Checking if we have a screenshot of less than an hour\n          if (bbn.fn.timestamp() - (time || 0) >= this.currentScreenshotDelay) {\n            this.saveScreenshot(0.1, 10000);\n          }\n        }).catch(() => {\n          this.saveScreenshot(0.1, 10000);\n        });\n        this._screenshotInterval = setInterval(() => {\n          this.saveScreenshot(0.1);\n        }, this.currentScreenshotDelay);\n      }\n    },\n    unsetScreenshot() {\n      if (this._screenshotInterval) {\n        clearInterval(this._screenshotInterval);\n        this._screenshotInterval = false;\n        if (this._screenshotTimeout) {\n          clearTimeout(this._screenshotTimeout);\n          this._screenshotTimeout = false;\n        }\n      }\n    },\n    async saveScreenshot(scale = 0.1, timeout = 0) {\n      if (this.router.db && this.currentView.idx === this.router.selected && !this.isPane) {\n        let img = await this.takeScreenshot(scale, timeout, true);\n        let num_tries = 0;\n        while (!img && num_tries < 5) {\n          num_tries++;\n          img = await this.takeScreenshot(scale, 5000);\n        }\n        if (!img) {\n          bbn.fn.log(bbn._(\"Impossible to take the screenshot of\") + ' ' + this.getFullCurrentURL());\n          return;\n          //throw Error(bbn._(\"Impossible to take the screenshot of \" + this.getFullCurrentURL()));\n        }\n        this.thumbnail = img.src;\n        // This is in fact an insert/update\n        this.router.db.insert('containers', {\n          url: this.getFullURL(),\n          image: img.src,\n          time: bbn.fn.timestamp()\n        });\n      }\n    },\n    takeScreenshot(scale = 1, timeout = 0, image = false, force = false) {\n      return new Promise(resolve => {\n        if (this._screenshotTimeout) {\n          if (force) {\n            clearTimeout(this._screenshotTimeout);\n          } else {\n            resolve(false);\n          }\n        }\n        this._screenshotTimeout = setTimeout(() => {\n          let exit = () => {\n            this._screenshotTimeout = false;\n            resolve(false);\n          };\n          if (this.currentIndex === this.router.selected && this.isVisible && window.html2canvas && bbn.fn.isActiveInterface(600) && !this.router.visualShowAll) {\n            let scroll = this.getRef('scroll');\n            if (!scroll) {\n              return exit();\n            }\n            if (scroll.$el) {\n              scroll = scroll.$el;\n            }\n            let w = scroll.clientWidth;\n            let h = scroll.clientHeight;\n            let s = Math.min(w, h);\n            let ct = this.getRef('canvasSource');\n            if (!ct || !s) {\n              return exit();\n            }\n            ct.style.width = s + 'px !important';\n            ct.style.height = s + 'px !important';\n            html2canvas(ct, {\n              width: s,\n              height: s,\n              scale: scale\n            }).then(canvas => {\n              ct.style.width = null;\n              ct.style.height = null;\n              this._screenshotTimeout = false;\n              if (!image) {\n                resolve(canvas);\n                return;\n              }\n              let img = bbn.fn.canvasToImage(canvas);\n              let ctx = canvas.getContext('2d');\n              let size = Math.min(canvas.width, canvas.height);\n              let num = Math.min(this.router.numVisualCols, this.router.numVisualRows);\n              let msize = Math.ceil(size / num);\n              ctx.drawImage(img, 0, 0, size, size, 0, 0, msize, msize);\n              resolve(img);\n            });\n          } else {\n            exit();\n          }\n        }, timeout);\n      });\n    },\n    updateScreenshot() {\n      if (this.visual && this.router.db) {\n        let url = this.getFullURL();\n        this.router.db.selectOne('containers', 'image', {\n          url: url\n        }).then(res => {\n          if (res) {\n            this.thumbnail = res;\n          }\n        });\n      }\n    },\n    screenshotMounted() {\n      this.updateScreenshot();\n      this._screenshotInterval = false;\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/container/_mixins/screenshot.js?");

/***/ })

}]);