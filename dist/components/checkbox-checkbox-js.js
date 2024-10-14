"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/checkbox-checkbox-js"],{

/***/ "./src/components/checkbox/checkbox.js":
/*!*********************************************************!*\
  !*** ./src/components/checkbox/checkbox.js + 1 modules ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("// ESM COMPAT FLAG\n__webpack_require__.r(__webpack_exports__);\n\n// EXPORTS\n__webpack_require__.d(__webpack_exports__, {\n  \"default\": () => (/* binding */ components_checkbox_checkbox)\n});\n\n// EXTERNAL MODULE: ./node_modules/@bbn/bbn/dist/index.js + 292 modules\nvar dist = __webpack_require__(\"./node_modules/@bbn/bbn/dist/index.js\");\n;// ./src/components/checkbox/checkbox.html\n// Module\nvar code = `<span :class=\"['bbn-iblock', componentClass]\">\n  <input type=\"checkbox\"\n         :id=\"id\"\n         :name=\"name\"\n         :value=\"value\"\n         class=\"bbn-checkbox\"\n         :required=\"required\"\n         :disabled=\"isDisabled\"\n         :readonly=\"readonly\"\n         @change=\"toggle\"\n         :checked=\"state\"\n         ref=\"element\"\n         style=\"display: none\">\n  <label class=\"bbn-checkbox-label bbn-iflex bbn-vmiddle\"\n         :tabindex=\"tabindex || '0'\"\n         :for=\"id\"\n         @keydown.space.enter.stop.prevent=\"\\$event.target.click()\">\n    <component bbn-if=\"component\"\n               :is=\"component\"\n               bbn-bind=\"componentOptions\"\n               class=\"bbn-left-spadded\"/>\n    <span bbn-elseif=\"label\"\n          class=\"bbn-left-spadded\"\n          bbn-html=\"label\"/>\n  </label>\n</span>`;\n// Exports\n/* harmony default export */ const checkbox_checkbox = (code);\n;// ./src/components/checkbox/checkbox.js\n/**\r\n * @file bbn-checkbox component\r\n *\r\n * @description The bbn-checkbox component is a box that by clicking, it assigns a certain value and when we deselect it takes another.\r\n * The values ​​that can be assumed in case of selection or not are  defined in the configuration of the component.\r\n * In addition, we can customize it by using the properties at disposal.\r\n *\r\n * @copyright BBN Solutions\r\n *\r\n * @author BBN Solutions\r\n *\r\n */\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.input\r\n   * @mixin bbn.cp.mixins.events\r\n   * @mixin bbn.cp.mixins.componentInside\r\n   */\n  mixins: [dist[\"default\"].cp.mixins.basic, dist[\"default\"].cp.mixins.input, dist[\"default\"].cp.mixins.events, dist[\"default\"].cp.mixins.componentInside],\n  props: {\n    value: {\n      /**\r\n       * The value of the checkbox.\r\n       *\r\n       * @prop {Boolean} [true] value\r\n       */\n      default: true\n    },\n    /**\r\n    * The value of the checkbox when unchecked.\r\n    *\r\n    * @prop {Boolean} [null] novalue\r\n    */\n    novalue: {\n      default: null\n    },\n    /**\r\n     * The name of the component checkbox.\r\n     *\r\n     * @prop {String} [null] name\r\n     */\n    name: {\n      type: String,\n      default: null\n    },\n    /**\r\n     * The id of the checkbox.\r\n     *\r\n     * @prop {String} id\r\n     */\n    id: {\n      type: String,\n      default() {\n        return dist[\"default\"].fn.randomString(10, 25);\n      }\n    },\n    /**\r\n     * The property used for the component's value instead of the classic \"value\" property.\r\n     *\r\n     * @prop {String|Boolean|Number} [undefined] modelValue\r\n     */\n    modelValue: {\n      type: [String, Boolean, Number]\n    },\n    /**\r\n     * Set to true to have required checkbox selection.\r\n     *\r\n     * @prop {Boolean} [false] required\r\n     */\n    required: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * Set to true to disable the checkbox.\r\n     *\r\n     * @prop {Boolean} [false] disabled\r\n     */\n    disabled: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * Set to true for a readonly checkbox.\r\n     *\r\n     * @prop {Boolean} [false] readonly\r\n     */\n    readonly: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * The accompanying label for the checkbox.\r\n     *\r\n     * @prop {String} label\r\n     */\n    label: {\n      type: String\n    },\n    /**\r\n     * Set to true for a checked checkbox.\r\n     *\r\n     * @prop {Boolean} [false] checked\r\n     */\n    checked: {\n      type: Boolean,\n      default: false\n    },\n    /**\r\n     * If set to true, a comparison will also be made on the component value type.\r\n     *\r\n     * @prop {Boolean} [false] strict\r\n     */\n    strict: {\n      type: Boolean,\n      default: false\n    }\n  },\n  model: {\n    prop: 'modelValue',\n    event: 'input'\n  },\n  computed: {\n    state() {\n      if (this.checked) {\n        if (this.modelValue === undefined) {\n          return true;\n        }\n        if (!this.strict && this.modelValue != this.value || this.strict && this.modelValue !== this.value) {\n          return false;\n        }\n      }\n      if (this.strict && this.modelValue === this.value || !this.strict && this.modelValue == this.value) {\n        return true;\n      }\n      return this.checked;\n    }\n  },\n  methods: {\n    /**\r\n     * Emits a change when the state of the checkbox changes.\r\n     *\r\n     * @method toggle\r\n     * @emits input\r\n     * @emits change\r\n     */\n    toggle(ev) {\n      //bbn.fn.log(\"ONCHANGE CHECKBOX\")\n      if (!this.isDisabled && !this.readonly) {\n        this.$emit('beforechange', ev, this.state);\n        if (!ev?.defaultPrevented) {\n          let emitVal = !this.state ? this.value : this.novalue;\n          this.$emit('input', emitVal);\n          this.$emit('change', emitVal, this);\n        }\n      }\n    },\n    /**\r\n     * Prevents the event action if the component is disabled or readonly\r\n     * @method onClick\r\n     * @fires click\r\n     */\n    onClick(ev) {\n      if (this.isDisabled || this.readonly) {\n        ev.preventDefault();\n      } else {\n        this.toggle();\n      }\n    },\n    /**\r\n     * Prevents the event action if the component is disabled or readonly\r\n     * @method onKeyDown\r\n     * @fires keydown\r\n     */\n    onKeyDown(ev) {\n      if ((this.isDisabled || this.readonly) && ev.keyCode === 32) {\n        ev.preventDefault();\n      } else {\n        //bbn.fn.log(\"KEYDOWN\");\n        this.keydown(ev);\n      }\n    }\n  },\n  /**\r\n   * @todo ask mirko about @emit\r\n   *\r\n   *\r\n   * @event mounted\r\n   * @fires toggle\r\n   * @emits input\r\n   */\n  mounted() {\n    if (this.checked && !this.state) {\n      this.toggle();\n    }\n    if (!this.checked && !this.state) {\n      //this.$emit('input', this.novalue);\n    }\n  },\n  watch: {\n    /**\r\n     * @watch checked\r\n     * @param {Boolean} newValue\r\n     * @fires toggle\r\n     */\n    checked(newValue) {\n      if (newValue !== this.state) {\n        this.toggle();\n      }\n    }\n  }\n};\n\n\n/* harmony default export */ const components_checkbox_checkbox = ({\n  name: 'bbn-checkbox',\n  definition: cpDef,\n  template: checkbox_checkbox\n});\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/checkbox/checkbox.js_+_1_modules?");

/***/ })

}]);