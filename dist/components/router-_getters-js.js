"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/router-_getters-js"],{

/***/ "./src/components/router/_getters.js":
/*!*******************************************!*\
  !*** ./src/components/router/_getters.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getBackgroundColor: () => (/* binding */ getBackgroundColor),\n/* harmony export */   getDefaultURL: () => (/* binding */ getDefaultURL),\n/* harmony export */   getFontColor: () => (/* binding */ getFontColor),\n/* harmony export */   getFullTitle: () => (/* binding */ getFullTitle),\n/* harmony export */   getList: () => (/* binding */ getList),\n/* harmony export */   getParents: () => (/* binding */ getParents),\n/* harmony export */   getTab: () => (/* binding */ getTab),\n/* harmony export */   getTitle: () => (/* binding */ getTitle),\n/* harmony export */   getView: () => (/* binding */ getView)\n/* harmony export */ });\n/**\n * @method getDefaultURL\n * @fires parseURL\n * @return {String}\n */\nfunction getDefaultURL() {\n  let url = this.parseURL(bbn.env.path);\n  if (!url && this.url) {\n    url = this.url;\n  }\n\n  // If there is a parent router we automatically give the proper baseURL\n  if (!url && this.parentContainer && this.parentContainer.currentURL !== this.parentContainer.url) {\n    url = bbn.fn.substr(this.parentContainer.currentURL, this.parentContainer.url.length + 1);\n  }\n  if (!url && this.def) {\n    url = this.def;\n  }\n  return url;\n}\n\n/**\n * @method getTitle\n * @param {Number} idx\n * @return {String}\n */\nfunction getTitle(idx) {\n  let cp = this,\n    res = '';\n  if (idx === undefined) {\n    idx = this.selected;\n  }\n  if (cp.views[idx]) {\n    res += cp.views[idx].title || bbn._('Untitled');\n    if (cp.parentTab) {\n      idx = cp.parentTab.currentIndex;\n      cp = cp.parentTab.router;\n      while (cp) {\n        res += ' < ' + (cp.views[idx].title || bbn._('Untitled'));\n        if (cp.parentTab) {\n          idx = cp.parentTab.currentIndex;\n          cp = cp.parentTab.router;\n        } else {\n          cp = false;\n        }\n      }\n    }\n    res += ' - ';\n  }\n  res += bbn.env.siteTitle || bbn._(\"Untitled site\");\n  return res;\n}\n/**\n * Returns the full title (combination of title and ftitle if any)\n * \n * @method getFullTitle\n * @param {Object} obj\n * @return {String|null}\n */\nfunction getFullTitle(obj) {\n  let t = '';\n  if (obj.title) {\n    t += obj.title;\n  }\n  if (obj.ftitle) {\n    t += (t.length ? ' - ' : '') + obj.ftitle;\n  }\n  return t;\n}\n/**\n * @method getFontColor\n * @param {Number} idx\n * @fires getRef\n * @return {String}\n */\nfunction getFontColor(idx) {\n  return this.views[idx]?.fcolor || '';\n  //this.views[idx].fcolor = window.getComputedStyle(el.$el ? el.$el : el).color;\n}\n\n/**s\n * @method getBackgroundColor\n * @param {Number} idx\n * @fires getRef\n * @return {String}\n */\nfunction getBackgroundColor(idx) {\n  return this.views[idx]?.bcolor || '';\n  /*\n  if (this.$isMounted && this.views[idx]) {\n    if (!this.views[idx].bcolor) {\n      let el = this.getRef('title-' + idx);\n      if (el) {\n        this.views[idx].bcolor = window.getComputedStyle(el.$el ? el.$el : el).backgroundColor;\n        bbn.fn.log([\"GETTING BCOLOR\", idx, this.views[idx].bcolor]);\n      }\n    }\n     return this.views[idx].bcolor;\n  }\n   return '';\n  */\n}\n\n/**\n * @method getTab\n * @param {Number} idx\n * @fires getRef\n * @return {HTMLElement}\n */\nfunction getTab(idx) {\n  if (idx === undefined) {\n    idx = this.selected;\n  }\n  return this.getRef('tabs').getRef('tab-' + idx);\n}\n\n/**\n * Returns the breadcrumb's source list.\n * @method getList\n * @param {bbnCp} bc\n * @fires close\n * @return {Array}\n */\nfunction getList(idx) {\n  let list = [],\n    parents = bbn.fn.map(idx && this.itsMaster && this.baseURL !== this.itsMaster.baseURL ? this.getParents() : [], p => {\n      return {\n        view: p.views[p.selected],\n        maxTitleLength: p.maxTitleLength\n      };\n    });\n  if (parents.length > idx) {\n    parents.splice(0, parents.length - idx);\n  }\n  bbn.fn.each(this.views, (t, i) => {\n    if (!t.hidden && t.idx !== this.selected && !t.pane) {\n      list.push({\n        view: t,\n        key: t.url,\n        parents: parents,\n        children: bbn.fn.map(this.getBreadcrumbs(i), c => {\n          return {\n            view: c.views[c.selected],\n            maxTitleLength: c.maxTitleLength\n          };\n        }),\n        maxTitleLength: this.maxTitleLength,\n        action: () => {\n          this.activateIndex(t.idx);\n        },\n        closeAction: () => {\n          return this.close(t.idx);\n        }\n      });\n    }\n  });\n  return list;\n}\n\n/**\n * @method getParents\n * @return {Array}\n */\nfunction getParents() {\n  return this.parent ? [...this.parent.getParents(), this.parent] : [];\n}\n\n/**\n * @method getView\n * @return {Object|null}\n */\nfunction getView(url) {\n  return bbn.fn.getRow(this.views, {\n    url: url\n  });\n}\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/router/_getters.js?");

/***/ })

}]);