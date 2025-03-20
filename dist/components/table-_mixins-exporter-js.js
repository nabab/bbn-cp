"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/table-_mixins-exporter-js"],{

/***/ "./src/components/table/_mixins/exporter.js":
/*!**************************************************!*\
  !*** ./src/components/table/_mixins/exporter.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  methods: {\n    /**\n     * Prepares the data to export the table to CSV.\n     * @method _export\n     * @returns {Array}\n     */\n    _export() {\n      let span = window.document.createElement('span');\n      let cols = {};\n      let res = [];\n      bbn.fn.each(this.currentData, a => {\n        let o = bbn.fn.clone(a.data);\n        let row = [];\n        bbn.fn.each(this.cols, b => {\n          if (!b.invisible && !b.buttons && b.field) {\n            const val = this.getProp(o, b.field);\n            if (typeof val === 'string') {\n              span.innerHTML = val;\n              row.push(span.textContent.trim());\n            } else {\n              row.push(val);\n            }\n          }\n        });\n        res.push(row);\n      });\n      return res;\n    },\n    /**\n     * Exports to csv and download the given filename.\n     * @method exportCSV\n     * @param {String} filename\n     * @param {String} valSep\n     * @param {String} rowSep\n     * @param {String} valEsc\n     * @fires _export\n     */\n    exportCSV(filename, valSep, rowSep, valEsc) {\n      let data = bbn.fn.toCSV(this._export(), valSep, rowSep, valEsc);\n      if (!filename) {\n        filename = 'export-' + bbn.fn.dateSQL().replace('/:/g', '-') + '.csv';\n      }\n      bbn.fn.downloadContent(filename, data, 'csv');\n    },\n    /**\n     * Exports to excel.\n     * @method exportExcel\n     * @fires getPostData\n     */\n    exportExcel() {\n      if (this.isAjax && !this.isLoading) {\n        if (this.pageable) {\n          this.getPopup({\n            label: bbn._('Warning'),\n            content: '<div class=\"bbn-padding bbn-c\">' + bbn._('What do you want to export?') + '</div>',\n            buttons: [{\n              label: bbn._('Cancel'),\n              action: () => {\n                this.getPopup().close();\n              }\n            }, {\n              label: bbn._('This view'),\n              action: () => {\n                bbn.fn.postOut(this.source, this.getExcelPostData(true));\n                this.getPopup().close();\n              }\n            }, {\n              label: bbn._('All'),\n              action: () => {\n                bbn.fn.postOut(this.source, this.getExcelPostData());\n                this.getPopup().close();\n              }\n            }],\n            width: 300\n          });\n        } else {\n          this.confirm(bbn._('Are you sure you want to export to Excel?'), () => {\n            bbn.fn.postOut(this.source, this.getExcelPostData());\n          });\n        }\n      }\n    },\n    /**\n     * @method getExcelPostData\n     * @param {Boolean} currentView \n     * @returns {Object}\n     */\n    getExcelPostData(currentView) {\n      let cols = bbn.fn.filter(bbn.fn.extend(true, [], this.cols), c => {\n          return this.shownFields.includes(c.field) && (c.export === undefined || !c.export.excluded) || c.export && !c.export.excluded;\n        }),\n        data = {\n          excel: {\n            fields: bbn.fn.map(cols, c => {\n              return {\n                field: c.field,\n                // check if is present a custom 'title' on column's export property\n                title: c.export?.title || c.label || '',\n                // check if is present a custom 'type' on column's export property\n                type: c.export?.type || c.type || 'string',\n                hidden: c.export?.hidden !== undefined ? c.export.hidden : !this.shownFields.includes(c.field) ? 1 : 0,\n                format: c.export?.format || null\n              };\n            })\n          },\n          // the current fields\n          fields: bbn.fn.map(cols.slice(), f => {\n            return f.field;\n          }),\n          limit: currentView ? this.currentLimit : 50000,\n          start: currentView ? this.start : 0,\n          data: this.getPostData()\n        };\n      if (this.sortable) {\n        data.order = this.currentOrder;\n      }\n      if (this.isFilterable) {\n        data.filters = this.currentFilters;\n      }\n      return data;\n    }\n  }\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/table/_mixins/exporter.js?");

/***/ })

}]);