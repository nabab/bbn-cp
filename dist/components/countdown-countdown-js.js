/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkbbn_axios_dayjs_bbnHTML_bbnAnon_bbnButtonHTML_bbnCellHTML_bbnElementHTML_bbnFormHTML_bbnListHTML_bbnRowHTML_bbnAnonCp_bbnData_bbnCp"] = self["webpackChunkbbn_axios_dayjs_bbnHTML_bbnAnon_bbnButtonHTML_bbnCellHTML_bbnElementHTML_bbnFormHTML_bbnListHTML_bbnRowHTML_bbnAnonCp_bbnData_bbnCp"] || []).push([["components/countdown-countdown-js"],{

/***/ "./src/components/countdown/countdown.html":
/*!*************************************************!*\
  !*** ./src/components/countdown/countdown.html ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<span :class=\\\"['bbn-iblock', componentClass]\\\" v-if=\\\"target\\\">\\r\\n  <span v-if=\\\"isValid\\\">\\r\\n    <span v-if=\\\"rendered\\\"></span>\\r\\n    <span>\\r\\n      <span v-for=\\\"(p, i) in periods\\\"\\r\\n            v-if=\\\"shown[p.name]\\\"\\r\\n            v-text=\\\"text[p.name] + (periods[i+1] && shown[periods[i+1].name] ? p.separator : '')\\\"\\r\\n      ></span>\\r\\n    </span>\\r\\n  </span>\\r\\n  <slot v-else></slot>\\r\\n</span>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://bbn.axios.dayjs.bbnHTML.bbnAnon.bbnButtonHTML.bbnCellHTML.bbnElementHTML.bbnFormHTML.bbnListHTML.bbnRowHTML.bbnAnonCp.bbnData.bbnCp/./src/components/countdown/countdown.html?");

/***/ }),

/***/ "./src/components/countdown lazy recursive ^\\.\\/countdown\\..*\\.lang$":
/*!******************************************************************************************!*\
  !*** ./src/components/countdown/ lazy ^\.\/countdown\..*\.lang$ strict namespace object ***!
  \******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./countdown.fr.lang\": [\n\t\t\"./src/components/countdown/countdown.fr.lang\",\n\t\t\"src_components_countdown_countdown_fr_lang\"\n\t],\n\t\"./countdown.it.lang\": [\n\t\t\"./src/components/countdown/countdown.it.lang\",\n\t\t\"src_components_countdown_countdown_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/countdown lazy recursive ^\\\\.\\\\/countdown\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://bbn.axios.dayjs.bbnHTML.bbnAnon.bbnButtonHTML.bbnCellHTML.bbnElementHTML.bbnFormHTML.bbnListHTML.bbnRowHTML.bbnAnonCp.bbnData.bbnCp/./src/components/countdown/_lazy_^\\.\\/countdown\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/countdown/countdown.js":
/*!***********************************************!*\
  !*** ./src/components/countdown/countdown.js ***!
  \***********************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _countdown_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./countdown.html */ \"./src/components/countdown/countdown.html\");\n/**\r\n * @file bbn-countdown component\r\n * @description bbn-countdown is a component that performs a countdown of a user-defined date, based on the measure of time defined in the construction.\r\n * @copyright BBN Solutions\r\n * @author BBN Solutions\r\n * @created 13/02/2017.\r\n*/\n\n/** @todo try this way\r\n\r\n const timestamp = 1519482900000;\r\n const formatted = dayjs(timestamp).format('L');\r\n\r\n console.log(formatted);*/\n\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   */\n  mixins: [bbn.cp.mixins.basic],\n  statics() {\n    return {\n      VALUES: [{\n        name: 'year',\n        title: bbn._('year'),\n        titles: bbn._('years'),\n        code: 'y',\n        separator: 'y',\n        timeout: 3600000\n      }, {\n        name: 'month',\n        title: bbn._('month'),\n        titles: bbn._('months'),\n        code: 'm',\n        separator: 'm',\n        diff: 12,\n        timeout: 3600000\n      }, {\n        name: 'day',\n        title: bbn._('day'),\n        titles: bbn._('days'),\n        code: 'd',\n        diff: 31,\n        separator: 'd',\n        timeout: 3600000\n      }, {\n        name: 'hour',\n        title: bbn._('hour'),\n        titles: bbn._('hours'),\n        code: 'h',\n        diff: 24,\n        separator: ':',\n        timeout: 3600000\n      }, {\n        name: 'minute',\n        title: bbn._('minute'),\n        titles: bbn._('minutes'),\n        code: 'i',\n        diff: 60,\n        separator: ':',\n        timeout: 60000\n      }, {\n        name: 'second',\n        title: bbn._('second'),\n        titles: bbn._('seconds'),\n        code: 's',\n        diff: 60,\n        separator: '.',\n        timeout: 1000\n      }, {\n        name: 'millisecond',\n        title: bbn._('millisecond'),\n        titles: bbn._('milliseconds'),\n        code: 'x',\n        diff: 1000,\n        separator: '',\n        timeout: 50\n      }]\n    };\n  },\n  props: {\n    /**\r\n     * The precision of the countdown.\r\n     * @prop {precision} ['second'] precision\r\n     */\n    precision: {\n      type: String,\n      default: 'second'\n    },\n    /**\r\n     * The scale of the countdown.\r\n     * @prop {precision} ['year'] scale\r\n     */\n    scale: {\n      type: String,\n      default: 'year'\n    },\n    /**\r\n     * The target date.\r\n     * @prop {Date|String|Function} target\r\n     */\n    target: {\n      type: [Date, String, Function]\n    },\n    /**\r\n     * Shows unit even if empty.\r\n     * @prop {Boolean} [false] showZero\r\n     */\n    showZero: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * Set to true the remaining day and month and year will be displayed.\r\n     * @prop {Boolean} [true] zeroFill\r\n     */\n    zeroFill: {\n      type: Boolean,\n      default: true\n    }\n  },\n  data() {\n    return {\n      /**\r\n       * The target year.\r\n       * @data {Boolean} [false] targetYear\r\n       */\n      targetYear: false,\n      /**\r\n       * The target month.\r\n       * @data {Boolean} [false] targetMonth\r\n       */\n      targetMonth: false,\n      /**\r\n       * The target day.\r\n       * @data {Boolean} [false] targetDay\r\n       */\n      targetDay: false,\n      /**\r\n       * The target hour.\r\n       * @data {Boolean} [false] targetHour\r\n       */\n      targetHour: false,\n      /**\r\n       * The target minute.\r\n       * @data {Boolean} [false] targetMinute\r\n       */\n      targetMinute: false,\n      /**\r\n       * The target second.\r\n       * @data {Boolean} [false] targetSecond\r\n       */\n      targetSecond: false,\n      /**\r\n       * The target millisecond.\r\n       * @data {Boolean} [false] targetMillisecond\r\n       */\n      targetMillisecond: false,\n      /* year: false,\r\n      month: false,\r\n      day: false,\r\n      hour: false,\r\n      minute: false,\r\n      second: false,\r\n      millisecond: false,*/\n      /**\r\n       * The interval of the countdown.\r\n       * @data {Number} [0] interval\r\n       */\n      interval: 0,\n      /**\r\n       * The timestamp of the real target date.\r\n       * @data {Boolean|Number} [false] time\r\n       */\n      time: false,\n      /**\r\n       * @data {String} [\"{}\"] prevValues\r\n       */\n      prevValues: JSON.stringify({}),\n      /**\r\n       * @data {Object} [{}] shown\r\n       */\n      shown: {},\n      /**\r\n       * @data {Object} [{}] text\r\n       */\n      text: {},\n      /**\r\n       * @data {Boolean} [false] isValid\r\n       */\n      isValid: false,\n      /**\r\n       * @data {Boolean} [false] realTarget\r\n       */\n      realTarget: false\n    };\n  },\n  computed: {\n    /**\r\n     * The index of the 'precision' property in the array of the constant bbnCountdownCp.VALUES.\r\n     * @return {Number} [5] precisionIdx\r\n     */\n    precisionIdx() {\n      return bbn.fn.search(bbnCountdownCp.VALUES, this.precision.length === 1 ? 'code' : 'name', this.precision);\n    },\n    /**\r\n     * The index of the 'scale' property in the array of the constant bbnCountdownCp.VALUES.\r\n     * @return {Number} [5] scaleIdx\r\n     */\n    scaleIdx() {\n      return bbn.fn.search(bbnCountdownCp.VALUES, this.scale.length === 1 ? 'code' : 'name', this.scale);\n    },\n    /**\r\n     * List type of periods.\r\n     * @return {Array} periods\r\n     */\n    periods() {\n      return bbnCountdownCp.VALUES;\n    },\n    // @todo incomplete\n    rendered() {\n      if (this.template) {}\n      return false;\n    }\n  },\n  methods: {\n    /**\r\n     * Checks if the component has been correctly set up.\r\n     * @method check\r\n     * @return {Boolean}\r\n     */\n    check() {\n      return this.realTarget && this.precisionIdx > -1 && this.scaleIdx > -1 && this.precisionIdx >= this.scaleIdx;\n    },\n    /**\r\n     * Initializes the component.\r\n     * @method init\r\n     * @fires update\r\n     */\n    init() {\n      clearInterval(this.interval);\n      if (this.precisionIdx === -1) {\n        throw new Error(bbn._(\"The precision is incorrect\"));\n      } else if (this.scaleIdx === -1) {\n        throw new Error(bbn._(\"The scale is incorrect\"));\n      } else {\n        let tmp = bbn.fn.isFunction(this.target) ? this.target() : this.target;\n        if (bbn.fn.isString(tmp)) {\n          tmp = bbn.fn.date(tmp);\n        }\n        this.realTarget = new dayjs(tmp);\n        this.time = this.realTarget.unix();\n        let timeout = bbnCountdownCp.VALUES[this.precisionIdx].timeout;\n        this.update();\n        this.interval = setInterval(this.update, timeout);\n      }\n    },\n    /**\r\n     * Udates the component.\r\n     * @method update\r\n     * @fires check\r\n     * @fires getShown\r\n     * @fires getText\r\n     */\n    update() {\n      if (this.check()) {\n        let d = new dayjs();\n        let secs = this.time - d.unix();\n        if (secs <= 0) {\n          if (this.isValid) {\n            bbn.fn.each(bbnCountdownCp.VALUES, (a, i) => {\n              this[a.name] = 0;\n            });\n            this.isValid = false;\n          }\n        } else if (secs) {\n          let diff = dayjs.duration(secs, 'seconds');\n          let diffs = {};\n          bbn.fn.each(bbnCountdownCp.VALUES, (a, i) => {\n            diffs[a.name] = diff['as' + a.name[0].toUpperCase() + bbn.fn.substr(a.name, 1) + 's']();\n            if (i >= this.scaleIdx && i <= this.precisionIdx) {\n              let round = Math.floor(diffs[a.name]);\n              diffs[a.name] = round;\n              if (i < this.precisionIdx) {\n                diff = diff.subtract(dayjs.duration(round, a.name + 's'));\n              }\n            }\n          });\n          bbn.fn.iterate(diffs, (b, n) => {\n            this[n] = b;\n          });\n          if (!this.isValid) {\n            this.isValid = true;\n          }\n          this.shown = this.getShown();\n          this.text = this.getText();\n          this.$forceUpdate();\n        }\n      }\n    },\n    /**\r\n     * Returns the descriptive list of units used in the countdown.\r\n     *\r\n     * @method getShow\r\n     * @return {Object}\r\n     */\n    getShown() {\n      let res = {};\n      bbn.fn.each(bbnCountdownCp.VALUES, (a, i) => {\n        res[a.name] = (this.showZero || this[a.name] || this.zeroFill) && this.precisionIdx >= i && this.scaleIdx <= i;\n      });\n      return res;\n    },\n    /**\r\n     * Returns the descriptive list of units used in the countdown with the value that contains it when calling this function.\r\n     *\r\n     * @method getText\r\n     * @return {Object}\r\n     */\n    getText() {\n      let res = {};\n      bbn.fn.each(bbnCountdownCp.VALUES, (a, i) => {\n        res[a.name] = this[a.name] || 0;\n        if (this.zeroFill && this.scaleIdx !== i && res[a.name].toString().length <= 1) {\n          res[a.name] = '0' + res[a.name];\n        }\n      });\n      return res;\n    }\n  },\n  /**\r\n   * @event created\r\n   * @fires init\r\n   */\n  created() {\n    this.init();\n  },\n  /**\r\n   * @event beforeDestroy\r\n   */\n  beforeDestroy() {\n    if (this.interval) {\n      clearInterval(this.interval);\n    }\n  },\n  watch: {\n    /**\r\n    * @watch target\r\n    * @fires init\r\n    */\n    target() {\n      this.init();\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/countdown lazy recursive ^\\\\.\\\\/countdown\\\\..*\\\\.lang$\")(`./countdown.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-countdown',\n  definition: cpDef,\n  template: _countdown_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://bbn.axios.dayjs.bbnHTML.bbnAnon.bbnButtonHTML.bbnCellHTML.bbnElementHTML.bbnFormHTML.bbnListHTML.bbnRowHTML.bbnAnonCp.bbnData.bbnCp/./src/components/countdown/countdown.js?");

/***/ })

}]);