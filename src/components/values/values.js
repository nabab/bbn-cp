/**
 * @file bbn-context component
 *
 * @description bbn-keyvalue is a dynamic list of keys and values
 * The source of the menu can have a tree structure.
 * ì
 * @copyright BBN Solutions
 *
 * @created 15/02/2017.
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.input
   * @mixin bbn.cp.mixins.dropdown
   * @mixin bbn.cp.mixins.keynav
   */
  mixins: 
  [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.input,
    bbn.cp.mixins.dropdown,
    bbn.cp.mixins.keynav
  ],
  props: {
    /**
     * @prop {Array} source
     */
    source: {
      type: Array,
      default(){
        return [];
      }
    },
    /**
     * @prop {(Array|String)} value
     */
    value: {
      type: [Array, String]
    },
    /**
     * @prop {Number} max
     */
    max: {
      type: Number
    },
    /**
     * @prop {Number} min
     */
    min: {
      type: Number
    },
    /**
     * @prop {(String|Function)} validator
     */
    validator: {
      type: [String, Function]
    },
    mode: {
      type: String,
      default: 'input',
      validator: v => ['input', 'dropdown'].includes(v)
    },
    sourceText: {
      type: String,
      default: 'text'
    },
    sourceValue: {
      type: String,
      default: 'value'
    }
  },
  data(){
    let isJSON = this.value && bbn.fn.isString(this.value);
    let value = this.value ? (isJSON ? JSON.parse(this.value) : bbn.fn.clone(this.value)) : [];
    if (!bbn.fn.isArray(value)) {
      throw new Error("The value of bbn-values must be an array");
    }
    return {
      isJSON: isJSON,
      currentValue: value,
      oldValue: bbn.fn.clone(value),
      currentInput: ''
    };
  },
  computed: {
    filteredData(){
      return bbn.fn.filter(this.source, a => {
        if (this.currentInput.length) {
          let ci = bbn.fn.removeAccents(this.currentInput).toLowerCase();
          let tmp = bbn.fn.removeAccents(a).toLowerCase();
          if (tmp.indexOf(ci) === -1) {
            return false;
          }
        }

        return !this.currentValue.includes(a);
      });
    }
  },
  methods: {
    keydown(e){
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (this.$refs.list && (this.$refs.list.overIdx > -1)) {
          this.currentInput = this.filteredData[this.$refs.list.overIdx];
        }

        this.add();
      }
      else if (e.key === ';') {
        e.preventDefault();
        this.add();
      }
      else if (this.commonKeydown(e)) {
        return;
      }
      else if (e.key === 'Escape') {
        e.preventDefault();
        this.isOpened = false;
      }
      else if (bbn.var.keys.upDown.includes(e.keyCode)) {
        e.preventDefault();
        if (!this.isOpened) {
          this.isOpened = true;
        }
        else {
          this.keynav(e);
        }
      }
    },
    select(value){
      this.currentInput = value.value;
      this.add();
    },
    isValidValue(){
      return bbn.fn.isArray(this.currentValue);
    },
    add(){
      if (!this.isDisabled
        && !this.readonly
        && this.currentInput.length
        && (this.currentValue.indexOf(this.currentInput) === -1)
      ) {
        this.currentValue.push(this.currentInput);
        this.emitInput(this.isJSON ? JSON.stringify(this.currentValue) : this.currentValue);
        this.currentInput = '';
        this.$refs.input.focus();
      }
    },
    remove(idx){
      if (!this.isDisabled
        && !this.readonly
      ) {
        this.currentValue.splice(idx, 1);
        this.emitInput(this.isJSON ? JSON.stringify(this.currentValue) : this.currentValue);
      }
    },
    getText(val){
      if (this.mode === 'dropdown') {
        return bbn.fn.getField(this.source, this.sourceText, this.sourceValue, val);
      }
      else if (this.mode === 'input') {
        return val;
      }
    }
  }
};

import cpHtml from './values.html';
import cpStyle from './values.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/values.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-values',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
