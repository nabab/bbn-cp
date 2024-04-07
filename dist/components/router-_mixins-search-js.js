"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_mixins-search-js"],{

/***/ "./src/components/router/_mixins/search.js":
/*!*************************************************!*\
  !*** ./src/components/router/_mixins/search.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    getPortalSelector(view) {\n      if (!this.disabled && this.panes.length) {\n        let pane = this.getPane(view);\n        if (pane) {\n          return '#' + pane + slashToHyphen(this.isVisual ? view.view.url : view.url);\n        }\n      }\n      return undefined;\n    },\n    selectClosest(idx) {\n      if (idx === this.selected && this.views[idx] && !this.views[idx].pane) {\n        return;\n      }\n      if (this.selected === idx) {\n        if (this.views.length) {\n          let newIdx = false;\n          bbn.fn.each(this.history, a => {\n            let tmp = this.getIndex(a);\n            if (tmp !== false && !this.views[tmp].pane) {\n              newIdx = tmp;\n              return false;\n            }\n          });\n          if (newIdx === false) {\n            let tmp = idx;\n            while (tmp >= 0) {\n              if (this.views[tmp] && !this.views[tmp].pane) {\n                newIdx = tmp;\n                break;\n              }\n              tmp--;\n            }\n            if (newIdx === false) {\n              tmp = idx;\n              while (tmp < this.views.length) {\n                if (this.views[tmp] && !this.views[tmp].pane) {\n                  newIdx = tmp;\n                  break;\n                }\n                tmp++;\n              }\n            }\n          }\n          if (this.views[newIdx]) {\n            this.activateIndex(newIdx);\n          }\n        } else {\n          this.selected = false;\n        }\n      }\n    },\n    /**\n     * @method getIndex\n     * @fires isValidIndex\n     * @fires search\n     * @return {Number|Boolean}\n     */\n    getIndex(misc) {\n      if (!this.views.length) {\n        return false;\n      }\n      if ([undefined, null].includes(misc)) {\n        return this.selected;\n      }\n      if (!this.isValidIndex(misc)) {\n        if (typeof misc === 'string') {\n          misc = this.search(misc);\n        } else if (typeof misc === 'object') {\n          // Vue\n          if (misc.$el) {\n            misc = misc.$el;\n          }\n          if (misc.tagName) {\n            bbn.fn.each(this.$children, ct => {\n              if (ct.$vnode && ct.$vnode.componentOptions && ct.$vnode.componentOptions.tag === 'bbn-container' && (ct.$el === misc || ct.$el.contains(misc))) {\n                misc = ct.currentIndex;\n                return false;\n              }\n            });\n          }\n        }\n      }\n      return this.isValidIndex(misc) ? misc : false;\n    },\n    fixIndexes() {\n      bbn.fn.each(this.views, (v, i) => {\n        if (v.idx !== i) {\n          v.idx = i;\n        }\n      });\n    },\n    /**\n     * @method search\n     * @param {String} url\n     * @return {Number|Boolean}\n     */\n    search(url) {\n      if (!bbn.fn.isString(url)) {\n        throw Error(bbn._('The component bbn-container must have a valid URL defined (Search)'));\n      }\n      let r = bbn.fn.search(this.views, \"url\", url);\n      if (r === -1) {\n        bbn.fn.each(this.views, (tab, index) => {\n          if (url.indexOf(tab.url + '/') === 0) {\n            r = index;\n            return false;\n          }\n        });\n      }\n      return r > -1 ? r : false;\n    },\n    searchForString(needle) {\n      let res = [];\n      let st = needle.toLowerCase().trim();\n      bbn.fn.each(this.views, a => {\n        let found = false;\n        bbn.fn.iterate(this.routers, router => {\n          let tmp = router.searchForString(needle);\n          if (tmp.length) {\n            bbn.fn.each(tmp, t => {\n              t.url = this.getBaseURL() + t.url;\n              if (!bbn.fn.getRow(res, {\n                url: t.url\n              })) {\n                found = true;\n                res.push(t);\n              }\n            });\n          }\n        });\n        if (!found) {\n          let match = false;\n          let idx = -1;\n          let obj = {\n            url: a.current || a.url,\n            title: this.getFullTitle(a)\n          };\n          if ((idx = obj.url.toLowerCase().indexOf(st)) > -1) {\n            match = \"url\";\n          } else if ((idx = obj.title.toLowerCase().indexOf(st)) > -1) {\n            match = \"title\";\n          }\n          if (match) {\n            let url = this.getBaseURL() + obj.url;\n            res.push({\n              url: url,\n              title: obj.title,\n              score: match === 'url' ? 10 : 20,\n              icon: a.icon || null,\n              hash: url,\n              bcolor: a.bcolor || null,\n              fcolor: a.fcolor || null,\n              component: this.$options.components.searchResult,\n              match: bbn.fn.substr(obj[match], 0, idx) + '<strong><em>' + bbn.fn.substr(obj[match], idx, st.length) + '</em></strong>' + bbn.fn.substr(obj[match], idx + st.length)\n            });\n          }\n        }\n      });\n      return res;\n    },\n    /**\n     * @method searchContainer\n     * @param {String} url\n     * @param {Boolean} deep\n     * @fires search\n     * @fires getContainer\n     * @return {Vue|Boolean}\n     */\n    searchContainer(url, deep) {\n      let container = false,\n        idx = this.search(url);\n      if (idx !== false) {\n        container = this.getContainer(idx);\n        if (deep && container) {\n          let router = container.find('bbn-router');\n          if (router) {\n            let real = router.searchContainer(bbn.fn.substr(url, router.baseURL.length), true);\n            if (real) {\n              return real;\n            }\n          }\n        }\n      }\n      return container;\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_mixins/search.js?");

/***/ })

}]);