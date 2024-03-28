/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/timer-timer-js"],{

/***/ "./src/components/timer/timer.html":
/*!*****************************************!*\
  !*** ./src/components/timer/timer.html ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<span :class=\\\"['bbn-iblock', componentClass]\\\">\\n  <span bbn-if=\\\"(mode === 'countdown') && isValid\\\">\\n    <span bbn-if=\\\"rendered\\\"></span>\\n    <span>\\n      <span bbn-for=\\\"(p, i) in periods\\\"\\n            bbn-if=\\\"shown[p.name]\\\"\\n            bbn-text=\\\"text[p.name] + (periods[i+1] && shown[periods[i+1].name] ? p.separator : '')\\\"\\n      ></span>\\n    </span>\\n  </span>\\n  <span bbn-elseif=\\\"mode !== 'countdown'\\\">\\n    <span bbn-text=\\\"currentTime\\\"/>\\n  </span>\\n  <slot bbn-else></slot>\\n</span>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/timer/timer.html?");

/***/ }),

/***/ "./src/components/timer/_i18n lazy recursive ^\\.\\/timer\\..*\\.lang$":
/*!****************************************************************************************!*\
  !*** ./src/components/timer/_i18n/ lazy ^\.\/timer\..*\.lang$ strict namespace object ***!
  \****************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./timer.fr.lang\": [\n\t\t\"./src/components/timer/_i18n/timer.fr.lang\",\n\t\t\"src_components_timer__i18n_timer_fr_lang\"\n\t],\n\t\"./timer.it.lang\": [\n\t\t\"./src/components/timer/_i18n/timer.it.lang\",\n\t\t\"src_components_timer__i18n_timer_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/timer/_i18n lazy recursive ^\\\\.\\\\/timer\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/timer/_i18n/_lazy_^\\.\\/timer\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/timer/timer.js":
/*!***************************************!*\
  !*** ./src/components/timer/timer.js ***!
  \***************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _timer_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.html */ \"./src/components/timer/timer.html\");\n/**\n * @file bbn-countdown component\n * @description bbn-countdown is a component that performs a countdown of a user-defined date, based on the measure of time defined in the construction.\n * @copyright BBN Solutions\n * @author BBN Solutions\n * @created 13/02/2017.\n*/\n\n/** @todo try this way\n\n const timestamp = 1519482900000;\n const formatted = dayjs(timestamp).format('L');\n\n console.log(formatted);*/\n\nconst cpDef = {\n  /**\n   * @mixin bbn.cp.mixins.basic\n   */\n  mixins: [bbn.cp.mixins.basic],\n  statics() {\n    const VALUES = [{\n      name: 'year',\n      title: bbn._('year'),\n      titles: bbn._('years'),\n      code: 'y',\n      separator: 'y',\n      timeout: 3600000\n    }, {\n      name: 'month',\n      title: bbn._('month'),\n      titles: bbn._('months'),\n      code: 'm',\n      separator: 'm',\n      diff: 12,\n      timeout: 3600000\n    }, {\n      name: 'day',\n      title: bbn._('day'),\n      titles: bbn._('days'),\n      code: 'd',\n      diff: 31,\n      separator: 'd',\n      timeout: 3600000\n    }, {\n      name: 'hour',\n      title: bbn._('hour'),\n      titles: bbn._('hours'),\n      code: 'h',\n      diff: 24,\n      separator: ':',\n      timeout: 3600000\n    }, {\n      name: 'minute',\n      title: bbn._('minute'),\n      titles: bbn._('minutes'),\n      code: 'i',\n      diff: 60,\n      separator: ':',\n      timeout: 60000\n    }, {\n      name: 'second',\n      title: bbn._('second'),\n      titles: bbn._('seconds'),\n      code: 's',\n      diff: 60,\n      separator: '.',\n      timeout: 1000\n    }, {\n      name: 'millisecond',\n      title: bbn._('millisecond'),\n      titles: bbn._('milliseconds'),\n      code: 'x',\n      diff: 1000,\n      separator: '',\n      timeout: 50\n    }];\n  },\n  props: {\n    /**\n     * The precision of the visible timer.\n     * @prop {string} ['second'] precision\n     */\n    precision: {\n      type: String,\n      default: 'minute'\n    },\n    /**\n     * The scale of the timer (largest unit).\n     * @prop {string} ['hour'] scale\n     */\n    scale: {\n      type: String,\n      default: 'hour'\n    },\n    /**\n     * Shows unit even if empty for countdown mode.\n     * @prop {Boolean} [false] showZero\n     */\n    showZero: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * The target date(s) if countdown or alarm.\n     * @prop {Array|Date|String|Function} target\n     */\n    source: {\n      type: [Object, Array, Date, String, Function]\n    },\n    /**\n     * @prop {String} ['date'] sourceDate\n     */\n    sourceDate: {\n      type: String,\n      default: 'date'\n    },\n    /**\n     * Set to true the remaining day and month and year will be displayed.\n     * @prop {Boolean} [true] zeroFill\n     */\n    zeroFill: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * @prop {String} ['clock'] mode\n     */\n    mode: {\n      type: String,\n      default: 'clock'\n    }\n  },\n  data() {\n    return {\n      isInit: false,\n      currentTasks: [],\n      taskIndex: 0,\n      /**\n       * The target year.\n       * @data {Boolean} [false] targetYear\n       */\n      targetYear: false,\n      /**\n       * The target month.\n       * @data {Boolean} [false] targetMonth\n       */\n      targetMonth: false,\n      /**\n       * The target day.\n       * @data {Boolean} [false] targetDay\n       */\n      targetDay: false,\n      /**\n       * The target hour.\n       * @data {Boolean} [false] targetHour\n       */\n      targetHour: false,\n      /**\n       * The target minute.\n       * @data {Boolean} [false] targetMinute\n       */\n      targetMinute: false,\n      /**\n       * The target second.\n       * @data {Boolean} [false] targetSecond\n       */\n      targetSecond: false,\n      /**\n       * The target millisecond.\n       * @data {Boolean} [false] targetMillisecond\n       */\n      targetMillisecond: false,\n      /* year: false,\n      month: false,\n      day: false,\n      hour: false,\n      minute: false,\n      second: false,\n      millisecond: false,*/\n      /**\n       * The interval of the countdown.\n       * @data {Number} [0] interval\n       */\n      interval: 0,\n      /**\n       * The timestamp of the real target date.\n       * @data {Boolean|Number} [false] time\n       */\n      time: false,\n      /**\n       * @data {String} [\"{}\"] prevValues\n       */\n      prevValues: JSON.stringify({}),\n      /**\n       * @data {Object} [{}] shown\n       */\n      shown: {},\n      /**\n       * @data {Object} [{}] text\n       */\n      text: {},\n      /**\n       * @data {Boolean} [false] isValid\n       */\n      isValid: false,\n      /**\n       * @data {Boolean} [false] currentTime\n       */\n      currentTime: null\n    };\n  },\n  computed: {\n    /**\n     * The index of the 'precision' property in the array of the constant VALUES.\n     * @return {Number} [5] precisionIdx\n     */\n    precisionIdx() {\n      return bbn.fn.search(bbnTimerCp.VALUES, this.precision.length === 1 ? 'code' : 'name', this.precision);\n    },\n    /**\n     * The index of the 'scale' property in the array of the constant VALUES.\n     * @return {Number} [5] scaleIdx\n     */\n    scaleIdx() {\n      return bbn.fn.search(bbnTimerCp.VALUES, this.scale.length === 1 ? 'code' : 'name', this.scale);\n    },\n    /**\n     * List type of periods.\n     * @return {Array} periods\n     */\n    periods() {\n      return bbnTimerCp.VALUES;\n    },\n    // @todo incomplete\n    rendered() {\n      if (this.template) {}\n      return false;\n    }\n  },\n  methods: {\n    /**\n     * Checks if the component has been correctly set up.\n     * @method check\n     * @return {Boolean}\n     */\n    check() {\n      return this.precisionIdx > -1 && this.scaleIdx > -1 && this.precisionIdx >= this.scaleIdx;\n    },\n    /**\n     * Initializes the component.\n     * @method init\n     * @fires update\n     */\n    init() {\n      if (this.precisionIdx === -1) {\n        throw new Error(bbn._(\"The precision is incorrect\"));\n      } else if (this.scaleIdx === -1) {\n        throw new Error(bbn._(\"The scale is incorrect\"));\n      } else {\n        let tmp = bbn.fn.isFunction(this.source) ? this.source() : this.source;\n        if (!bbn.fn.isArray(tmp)) {\n          tmp = [tmp];\n        }\n        bbn.fn.each(tmp, t => this.addTask(t));\n        this.cleanTasks();\n        this.launch();\n      }\n    },\n    launch() {\n      clearInterval(this.interval);\n      if (this.currentTasks.length && this.mode === 'countdown') {\n        this.time = this.currentTasks[0].timestamp.getTime();\n      }\n      let timeout = bbnTimerCp.VALUES[this.precisionIdx].timeout;\n      this.update();\n      this.interval = setInterval(this.update, timeout);\n    },\n    /**\n     * Removes the past tasks\n     */\n    cleanTasks() {\n      let now = new Date().getTime();\n      for (let i = 0; i < this.currentTasks.length; i++) {\n        while (now > this.currentTasks[i].timestamp) {\n          this.currentTasks.shift();\n        }\n      }\n    },\n    /**\n     * Adds a new task to the timer, should be in the future.\n     * \n     * @param {mixed} task \n     */\n    addTask(task) {\n      let r;\n      if (bbn.fn.isString(task)) {\n        r = {\n          [this.sourceDate]: bbn.fn.date(task)\n        };\n      } else if (bbn.fn.isDate(task)) {\n        r = {\n          [this.sourceDate]: bbn.fn.date(task)\n        };\n      } else if (bbn.fn.isObject(task)) {\n        r = task;\n      }\n      if (r && r[this.sourceDate] && bbn.fn.isDate(r[this.sourceDate])) {\n        let now = new Date().getTime();\n        r.timestamp = r[this.sourceDate].getTime();\n        for (let i = 0; i < this.currentTasks.length; i++) {\n          if (this.currentTasks[i].timestamp < r.timestamp) {\n            this.currentTasks.unshift(r);\n            return true;\n          } else if (this.currentTasks[i].timestamp === r.timestamp) {\n            let tmp = this.currentTasks[i].action;\n            if (tmp && r.action) {\n              this.currentTasks[i].action = () => {\n                tmp();\n                r.action();\n              };\n              return true;\n            }\n          }\n        }\n        this.currentTasks.push(r);\n        return true;\n      }\n      return false;\n    },\n    /**\n     * Udates the component.\n     * @method update\n     * @fires check\n     * @fires getShown\n     * @fires getText\n     */\n    update() {\n      if (this.check()) {\n        let d = new Date();\n        if (this.mode === 'countdown' && this.time) {\n          let secs = this.time - d.getTime();\n          if (secs <= 0) {\n            if (this.isValid) {\n              bbn.fn.each(bbnTimerCp.VALUES, (a, i) => {\n                this[a.name] = 0;\n              });\n              this.isValid = false;\n            }\n          } else if (secs) {\n            let diff = dayjs.duration(secs, 'seconds');\n            let diffs = {};\n            bbn.fn.each(bbnTimerCp.VALUES, (a, i) => {\n              diffs[a.name] = diff['as' + a.name[0].toUpperCase() + bbn.fn.substr(a.name, 1) + 's']();\n              if (i >= this.scaleIdx && i <= this.precisionIdx) {\n                let round = Math.floor(diffs[a.name]);\n                diffs[a.name] = round;\n                if (i < this.precisionIdx) {\n                  diff = diff.subtract(dayjs.duration(round, a.name + 's'));\n                }\n              }\n            });\n            bbn.fn.iterate(diffs, (b, n) => {\n              this[n] = b;\n            });\n            if (!this.isValid) {\n              this.isValid = true;\n            }\n            this.shown = this.getShown();\n            this.text = this.getText();\n            this.$forceUpdate();\n          }\n        } else {\n          this.currentTime = bbn.fn.formatDate(d, \"HH:mm\");\n        }\n      }\n    },\n    /**\n     * Returns the descriptive list of units used in the countdown.\n     *\n     * @method getShow\n     * @return {Object}\n     */\n    getShown() {\n      let res = {};\n      bbn.fn.each(bbnTimerCp.VALUES, (a, i) => {\n        res[a.name] = (this.showZero || this[a.name] || this.zeroFill) && this.precisionIdx >= i && this.scaleIdx <= i;\n      });\n      return res;\n    },\n    /**\n     * Returns the descriptive list of units used in the countdown with the value that contains it when calling this function.\n     *\n     * @method getText\n     * @return {Object}\n     */\n    getText() {\n      let res = {};\n      bbn.fn.each(bbnTimerCp.VALUES, (a, i) => {\n        res[a.name] = this[a.name] || 0;\n        if (this.zeroFill && this.scaleIdx !== i && res[a.name].toString().length <= 1) {\n          res[a.name] = '0' + res[a.name];\n        }\n      });\n      return res;\n    }\n  },\n  /**\n   * @event created\n   * @fires init\n   */\n  created() {\n    this.init();\n  },\n  /**\n   * @event beforeDestroy\n   */\n  beforeDestroy() {\n    if (this.interval) {\n      clearInterval(this.interval);\n    }\n  }\n};\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/timer/_i18n lazy recursive ^\\\\.\\\\/timer\\\\..*\\\\.lang$\")(`./timer.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  name: 'bbn-timer',\n  definition: cpDef,\n  template: _timer_html__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  lang: cpLang\n});\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/timer/timer.js?");

/***/ })

}]);