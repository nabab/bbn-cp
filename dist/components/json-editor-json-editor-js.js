/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_bbn_bbn_cp"] = self["webpackChunk_bbn_bbn_cp"] || []).push([["components/json-editor-json-editor-js"],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/json-editor/json-editor.less":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/json-editor/json-editor.less ***!
  \**********************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `.bbn-json-editor {\n  overflow: visible !important;\n  background-color: white;\n}\n.bbn-json-editor > div {\n  overflow: visible !important;\n}\n.bbn-json-editor .editor-toolbar a,\n.bbn-json-editor .editor-toolbar a.active,\n.bbn-json-editor .editor-toolbar a:hover {\n  color: inherit !important;\n}\n.bbn-json-editor div.jsoneditor-tree div.jsoneditor-tree-inner {\n  padding-bottom: 0!important;\n}\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/json-editor/json-editor.less?./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js");

/***/ }),

/***/ "./src/components/json-editor/json-editor.html":
/*!*****************************************************!*\
  !*** ./src/components/json-editor/json-editor.html ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div :class=\\\"[{'bbn-100': true, 'bbn-block': true}, componentClass]\\\"\\r\\n     @keydown.enter.stop=\\\"\\\"\\r\\n>\\r\\n  <div class=\\\"bbn-100 bbn-block\\\"\\r\\n       ref=\\\"element\\\"\\r\\n       @click=\\\"click($event)\\\"\\r\\n       @focus=\\\"focus($event)\\\"\\r\\n       @blur=\\\"blur($event)\\\"\\r\\n       @keydown=\\\"keydown($event)\\\"\\r\\n       @keyup=\\\"keyup($event)\\\"\\r\\n  >\\r\\n  \\r\\n  </div>\\r\\n  <input bbn-model=\\\"currentValue\\\"\\r\\n         type=\\\"hidden\\\"\\r\\n         ref=\\\"input\\\"\\r\\n         :name=\\\"name\\\"\\r\\n         :disabled=\\\"isDisabled\\\"\\r\\n         :readonly=\\\"readonly\\\"\\r\\n  >\\r\\n</div>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/json-editor/json-editor.html?");

/***/ }),

/***/ "./src/components/json-editor/json-editor.less":
/*!*****************************************************!*\
  !*** ./src/components/json-editor/json-editor.less ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_json_editor_less__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/less-loader/dist/cjs.js!./json-editor.less */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/components/json-editor/json-editor.less\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_json_editor_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_json_editor_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_json_editor_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_less_loader_dist_cjs_js_json_editor_less__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/json-editor/json-editor.less?");

/***/ }),

/***/ "./src/components/json-editor lazy recursive ^\\.\\/json\\-editor\\..*\\.lang$":
/*!***********************************************************************************************!*\
  !*** ./src/components/json-editor/ lazy ^\.\/json\-editor\..*\.lang$ strict namespace object ***!
  \***********************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./json-editor.fr.lang\": [\n\t\t\"./src/components/json-editor/json-editor.fr.lang\",\n\t\t\"src_components_json-editor_json-editor_fr_lang\"\n\t],\n\t\"./json-editor.it.lang\": [\n\t\t\"./src/components/json-editor/json-editor.it.lang\",\n\t\t\"src_components_json-editor_json-editor_it_lang\"\n\t]\n};\nfunction webpackAsyncContext(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\treturn Promise.resolve().then(() => {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t});\n\t}\n\n\tvar ids = map[req], id = ids[0];\n\treturn __webpack_require__.e(ids[1]).then(() => {\n\t\treturn __webpack_require__.t(id, 1 | 16);\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./src/components/json-editor lazy recursive ^\\\\.\\\\/json\\\\-editor\\\\..*\\\\.lang$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/json-editor/_lazy_^\\.\\/json\\-editor\\..*\\.lang$_strict_namespace_object?");

/***/ }),

/***/ "./src/components/json-editor/json-editor.js":
/*!***************************************************!*\
  !*** ./src/components/json-editor/json-editor.js ***!
  \***************************************************/
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   JSONEditor: () => (/* reexport default export from named module */ jsoneditor__WEBPACK_IMPORTED_MODULE_1__),\n/* harmony export */   \"default\": () => (/* binding */ def)\n/* harmony export */ });\n/* harmony import */ var jsoneditor_dist_jsoneditor_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsoneditor/dist/jsoneditor.css */ \"./node_modules/jsoneditor/dist/jsoneditor.css\");\n/* harmony import */ var jsoneditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsoneditor */ \"./node_modules/jsoneditor/dist/jsoneditor.min.js\");\n/* harmony import */ var _json_editor_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./json-editor.html */ \"./src/components/json-editor/json-editor.html\");\n/* harmony import */ var _json_editor_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./json-editor.less */ \"./src/components/json-editor/json-editor.less\");\n/**\r\n * @file bbn-json-editor component\r\n *\r\n * @description bbn-json-editor is a component that allows the schematic visualization of data in JSON format using different types of structures, such as: 'tree', 'text', 'object' and 'code'.\r\n * It also allows the modification or insertion of content.\r\n *\r\n * @author BBN Solutions\r\n * \r\n * @copyright BBN Solutions\r\n *\r\n * @created 20/02/17\r\n */\n\n\n\n\n//Markdown editor use simpleMDe\nconst cpDef = {\n  /**\r\n   * @mixin bbn.cp.mixins.basic\r\n   * @mixin bbn.cp.mixins.input\r\n   * @mixin bbn.cp.mixins.events\r\n   */\n  mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.input, bbn.cp.mixins.events],\n  statics() {\n    return {\n      lang: {\n        array: bbn._('Array'),\n        auto: bbn._('Auto'),\n        appendText: bbn._('Append'),\n        appendTitle: bbn._('Append a new field with type \\'auto\\' after this field (Ctrl+Shift+Ins)'),\n        appendSubmenuTitle: bbn._('Select the type of the field to be appended'),\n        appendTitleAuto: bbn._('Append a new field with type \\'auto\\' (Ctrl+Shift+Ins)'),\n        ascending: bbn._('Ascending'),\n        ascendingTitle: bbn._('Sort the childs of this ${type} in ascending order'),\n        actionsMenu: bbn._('Click to open the actions menu (Ctrl+M)'),\n        collapseAll: bbn._('Collapse all fields'),\n        descending: bbn._('Descending'),\n        descendingTitle: bbn._('Sort the childs of this ${type} in descending order'),\n        drag: bbn._('Drag to move this field (Alt+Shift+Arrows)'),\n        duplicateKey: bbn._('duplicate key'),\n        duplicateText: bbn._('Duplicate'),\n        duplicateTitle: bbn._('Duplicate selected fields (Ctrl+D)'),\n        duplicateField: bbn._('Duplicate this field (Ctrl+D)'),\n        duplicateFieldError: bbn._('Duplicate field name'),\n        cannotParseFieldError: bbn._('Cannot parse field into JSON'),\n        cannotParseValueError: bbn._('Cannot parse value into JSON'),\n        empty: bbn._('empty'),\n        expandAll: bbn._('Expand all fields'),\n        expandTitle: bbn._('Click to expand/collapse this field (Ctrl+E). \\n' + 'Ctrl+Click to expand/collapse including all childs.'),\n        insert: bbn._('Insert'),\n        insertTitle: bbn._('Insert a new field with type \\'auto\\' before this field (Ctrl+Ins)'),\n        insertSub: bbn._('Select the type of the field to be inserted'),\n        object: bbn._('Object'),\n        ok: bbn._('Ok'),\n        redo: bbn._('Redo (Ctrl+Shift+Z)'),\n        removeText: bbn._('Remove'),\n        removeTitle: bbn._('Remove selected fields (Ctrl+Del)'),\n        removeField: bbn._('Remove this field (Ctrl+Del)'),\n        selectNode: bbn._('Select a node...'),\n        showAll: bbn._('show all'),\n        showMore: bbn._('show more'),\n        showMoreStatus: bbn._('displaying ${visibleChilds} of ${totalChilds} items.'),\n        sort: bbn._('Sort'),\n        sortTitle: bbn._('Sort the childs of this ${type}'),\n        sortTitleShort: bbn._('Sort contents'),\n        sortFieldLabel: bbn._('Field:'),\n        sortDirectionLabel: bbn._('Direction:'),\n        sortFieldTitle: bbn._('Select the nested field by which to sort the array or object'),\n        sortAscending: bbn._('Ascending'),\n        sortAscendingTitle: bbn._('Sort the selected field in ascending order'),\n        sortDescending: bbn._('Descending'),\n        sortDescendingTitle: bbn._('Sort the selected field in descending order'),\n        string: bbn._('String'),\n        transform: bbn._('Transform'),\n        transformTitle: bbn._('Filter, sort, or transform the childs of this ${type}'),\n        transformTitleShort: bbn._('Filter, sort, or transform contents'),\n        extract: bbn._('Extract'),\n        extractTitle: bbn._('Extract this ${type}'),\n        transformQueryTitle: bbn._('Enter a JMESPath query'),\n        transformWizardLabel: bbn._('Wizard'),\n        transformWizardFilter: bbn._('Filter'),\n        transformWizardSortBy: bbn._('Sort by'),\n        transformWizardSelectFields: bbn._('Select fields'),\n        transformQueryLabel: bbn._('Query'),\n        transformPreviewLabel: bbn._('Preview'),\n        type: bbn._('Type'),\n        typeTitle: bbn._('Change the type of this field'),\n        openUrl: bbn._('Ctrl+Click or Ctrl+Enter to open url in new window'),\n        undo: bbn._('Undo last action (Ctrl+Z)'),\n        validationCannotMove: bbn._('Cannot move a field into a child of itself'),\n        autoType: bbn._('Field type \"auto\". ' + 'The field type is automatically determined from the value ' + 'and can be a string, number, boolean, or null.'),\n        objectType: bbn._('Field type \"object\". ' + 'An object contains an unordered set of key/value pairs.'),\n        arrayType: bbn._('Field type \"array\". ' + 'An array contains an ordered collection of values.'),\n        stringType: bbn._('Field type \"string\". ' + 'Field type is not determined from the value, ' + 'but always returned as string.'),\n        modeCodeText: bbn._('Code'),\n        modeCodeTitle: bbn._('Switch to code highlighter'),\n        modeFormText: bbn._('Form'),\n        modeFormTitle: bbn._('Switch to form editor'),\n        modeTextText: bbn._('Text'),\n        modeTextTitle: bbn._('Switch to plain text editor'),\n        modeTreeText: bbn._('Tree'),\n        modeTreeTitle: bbn._('Switch to tree editor'),\n        modeViewText: bbn._('View'),\n        modeViewTitle: bbn._('Switch to tree view'),\n        modePreviewText: bbn._('Preview'),\n        modePreviewTitle: bbn._('Switch to preview mode'),\n        examples: bbn._('Examples'),\n        default: bbn._('Default')\n      }\n    };\n  },\n  props: {\n    /**\r\n     * The value of the json editor.\r\n     * @prop {String} ['{}'] value\r\n     */\n    value: {\n      default: '{}'\n    },\n    /**\r\n     * Defines the mode of the json editor. Allowed values are 'tree', 'view', 'form', 'code' and 'text'.\r\n     * @prop {String} ['tree'] mode\r\n     */\n    mode: {\n      type: String,\n      default: 'tree'\n    },\n    expanded: {\n      type: [Number, Boolean]\n    },\n    /**\r\n     * The object of configuration.\r\n     * @prop {Object} [{}] cfg\r\n     */\n    cfg: {\n      type: Object,\n      default() {\n        return {};\n      }\n    }\n  },\n  data() {\n    let isParsed = this.value && (bbn.fn.isObject(this.value) || bbn.fn.isArray(this.value));\n    let v = this.value || '';\n    if (isParsed) {\n      try {\n        v = JSON.stringify(this.value);\n      } catch (e) {\n        bbn.fn.log(\"Impossible to parse\");\n      }\n    }\n    return {\n      isParsed: isParsed,\n      currentValue: v\n    };\n  },\n  computed: {\n    /**\r\n      * The mode of the component.\r\n      * @data {String} mode\r\n      */\n    currentMode() {\n      return this.readonly ? 'view' : this.mode || \"tree\";\n    }\n  },\n  methods: {\n    /**\r\n     * Gets the initial configuration of the component.\r\n     * @method getCfg\r\n     * @emit change\r\n     * @emit input\r\n     * @return {Object}\r\n     */\n    getCfg() {\n      let cfg = {\n        /**\r\n         * @data onEditable\r\n         */\n        onEditable: this.cfg.onEditable || null,\n        /**\r\n         * @data onError\r\n         */\n        onError: this.cfg.onError || null,\n        /**\r\n         * @data onModeChange \r\n         */\n        onModeChange: this.cfg.onModeChange || null,\n        /**\r\n         * @data escapeUnicode \r\n         */\n        escapeUnicode: this.cfg.escapeUnicode || false,\n        /**\r\n         * @data sortObjectKeys \r\n         */\n        sortObjectKeys: this.cfg.sortObjectKeys || false,\n        /**\r\n         * @data history\r\n         */\n        history: this.cfg.history || true,\n        /**\r\n         * The mode of the component.\r\n         * @data {String} mode\r\n         */\n        mode: this.readonly ? 'view' : this.currentMode,\n        /**\r\n         * @data {Array} modes\r\n         */\n        modes: this.readonly ? ['view'] : [\"tree\", \"view\", \"form\", \"code\", \"text\"],\n        /**\r\n         * @data schema\r\n         */\n        schema: this.cfg.schema || null,\n        /**\r\n         * @data schemaRefs\r\n         */\n        schemaRefs: this.cfg.schemaRefs || null,\n        /**\r\n         * @data search\r\n         */\n        search: this.cfg.search !== undefined ? this.cfg.search : true,\n        /**\r\n         * @data {Number} indentation\r\n         */\n        indentation: this.cfg.indentation || 2,\n        /**\r\n         * @data theme\r\n         */\n        theme: this.cfg.theme || null,\n        /**\r\n         * @data {Array} templates\r\n         */\n        templates: this.cfg.templates || [],\n        /**\r\n         * @data autocomplete\r\n         */\n        autocomplete: this.cfg.autocomplete || null,\n        /**\r\n         * The code of the language used in the component.\r\n         * @data {String} ['en'] language\r\n         */\n        language: bbn.env.lang || 'en',\n        languages: {}\n      };\n      if (bbn.env.lang) {\n        cfg.languages[bbn.env.lang || 'en'] = bbnJsonEditorCp.lang;\n      }\n      if (!this.readonly) {\n        let cp = this;\n        cfg.onChange = () => {\n          let v = this.widget.getText();\n          if (this.isParsed) {\n            try {\n              v = JSON.parse(v);\n            } catch (e) {\n              bbn.fn.log('Impossible to read the JSON');\n              v = '';\n            }\n          }\n          if (this.value !== v) {\n            bbn.fn.log(\"REAL CHANGE\", v);\n            this.emitInput(v);\n          }\n        };\n      }\n      return cfg;\n    },\n    /**\r\n     * Initializes the component.\r\n     * @fires getCfg\r\n     * @fires widget.setText\r\n     */\n    init() {\n      let cfg = this.getCfg();\n      bbn.fn.log(\"VALUE\", this.value);\n      this.widget = new window.JSONEditor(this.$refs.element, cfg);\n      if (this.currentValue) {\n        this.widget.setText(this.currentValue);\n      }\n      if (this.expanded) {\n        if (bbn.fn.isNumber(this.expanded)) {\n          expand(this.widget.node.childs, this.expanded);\n        } else {\n          this.widget.expandAll();\n        }\n      }\n      this.ready = true;\n    },\n    /**\r\n     * Destroys and reinitializes the component.\r\n     * @fires widget.destroy\r\n     * @fires init\r\n     */\n    reinit() {\n      this.widget.destroy();\n      this.init();\n    }\n  },\n  /**\r\n   * @event mounted@fires init\r\n   */\n  mounted() {\n    this.init();\n  },\n  watch: {\n    /**\r\n     * @watch value\r\n     * @param {String} newVal \r\n     * @fires widget.getText\r\n     * @fires widget.setText\r\n     */\n    currentValue(v) {\n      if (this.ready && this.widget.getText() != v) {\n        this.widget.setText(v);\n      }\n    },\n    value(v) {\n      let tmp = v;\n      if (v && typeof v === 'object') {\n        tmp = JSON.stringify(v);\n      } else if (!bbn.fn.isString(v)) {\n        tmp = '';\n      }\n      if (tmp !== this.currentValue) {\n        this.currentValue = tmp;\n      }\n    }\n  }\n};\n\n\nlet cpLang = {};\nif (bbn.env.lang) {\n  try {\n    cpLang = await __webpack_require__(\"./src/components/json-editor lazy recursive ^\\\\.\\\\/json\\\\-editor\\\\..*\\\\.lang$\")(`./json-editor.${bbn.env.lang}.lang`);\n    if (cpLang.default) {\n      cpLang = cpLang.default;\n    }\n  } catch (err) {}\n}\nconst def = {\n  name: 'bbn-json-editor',\n  definition: cpDef,\n  template: _json_editor_html__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  style: _json_editor_less__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  lang: cpLang\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://@bbn/bbn-cp/./src/components/json-editor/json-editor.js?");

/***/ })

}]);