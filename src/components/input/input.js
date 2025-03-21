/**
 * @file bbn-input component
 *
 * @description bbn-input is a simple text field.
 *
 * @author BBN Solutions
 * 
 * @copyright BBN Solutions
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.events
   * @mixin bbn.cp.mixins.input
   */
  mixins: 
  [
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.events, 
    bbn.cp.mixins.input
  ],
  props: {
    /**
     * Specifies whether a loading icon isshown inside the input field.
     * @prop {Boolean} [false] loading
     */
    loading: {
      type: [Boolean],
      default: false
    },
    /**
     * Specifies whether or not the input field should have autocomplete enabled. Accepts boolean or the strings 'on' or 'off'.
     * @prop {Boolean|String} [true] autocomplete
     */
    autocomplete: {
      type: [Boolean,String],
      default: true
    },
    /**
     * The type of the input.
     * @prop {String} type
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * The button's icon on the left of the input.
     * @prop {String} buttonLeft
     */
    buttonLeft: {
      type: String
    },
    /**
     * The button's icon on the right of the input.
     * @prop {String} buttonRight
     */
    buttonRight: {
      type: String
    },
    /**
     * Hides the left button. 
     * @prop {Boolean} [false] autoHideLeft
     */
    autoHideLeft: {
      type: Boolean,
      default: false
    },
    /**
     * Hides the right button.
     * @prop {Boolean} [false] autoHideRight
     */
    autoHideRight: {
      type: Boolean,
      default: false
    },
    /**
     * Called when click the left button. 
     * @prop {Function} actionLeft
     */
    actionLeft: {
      type: Function
    },
    /**
     * Called when click the right button. 
     * @prop {Function} actionRight
     */
    actionRight: {
      type: Function
    },
    /**
     * Sets the left button disabled.
     * @prop {Boolean} [false] buttonLeftDisabled
     */
    buttonLeftDisabled: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the left button disabled.
     * @prop {Boolean} [false] buttonRightDisabled
     */
    buttonRightDisabled: {
      type: Boolean,
      default: false
    },
    /**
     * The title of the left button.
     * @prop {String} buttonLeftTitle
     */
    buttonLeftTitle: {
      type: String
    },
    /**
     * The title of the right button.
     * @prop {String} buttonRightTitle
     */
    buttonRightTitle: {
      type: String
    },
    /**
     * The input's attribute 'pattern'.
     * @prop {String} pattern
     */
    pattern: {
      type: String
    },
    /**
     * The size of the input.
     * @prop {(String|Number)} size
     */
    size: {
      type: [String, Number],
    },
    /**
     * @prop {(String|Number)} min
     */
    min: {
      type: [String, Number]
    },
    /**
     * @prop {(String|Number)} max
     */
    max: {
      type: [String, Number]
    },
    /**
     * @prop {String} pref
     */
    pref: {
      type: String
    },
    /**
     * Forces the input to show the nullable icon even if it is in the read-only state
     * @prop {Boolean} [false] forceNullable
     */
    forceNullable: {
      type: Boolean,
      default: false
    }
  },
  data(){
    let currentAutocomplete = 'off';
    if (this.autocomplete === true) {
      currentAutocomplete = 'on';
    }
    else if (this.autocomplete && bbn.fn.isString(this.autocomplete)) {
      currentAutocomplete = this.autocomplete;
    }

    let currentValue = this.value || '';
    if (this.pref && (currentValue.indexOf(this.pref) === 0)) {
      currentValue = bbn.fn.substr(currentValue, this.pref.length);
    }

    return {
      /**
       * @todo not used
       */
      currentValue,
      /**
       * The property 'autocomplete' normalized.
       * @data {String} [''] currentAutocomplete
       */
      currentAutocomplete: currentAutocomplete,
      /**
       * The property 'size' normalized.
       * @data {String} [''] currentSize
       */
      currentSize: this.size || '',
      /**
       * The action performed by the left button.
       * @data {Function} currentActionLeft
       */
      currentActionLeft: bbn.fn.isFunction(this.actionLeft) ? this.actionLeft : () => this.$emit('clickleftbutton'),
      /**
       * The action performed by the right button.
       * @data {Function} currentActionRight
       */
      currentActionRight: bbn.fn.isFunction(this.actionRight) ? this.actionRight : () => this.$emit('clickrightbutton')
    }
  },
  computed: {
    /**
     * The current input width in characters if the 'autosize' is enabled
     * @computed currentInputSize
     * @returns {Number}
     */
    currentInputSize(){
      return this.autosize ? (this.value ? this.value.toString().length : 1) : 0
    },
    currentPattern(){
      if (this.pattern?.length) {
        return this.pattern;
      }
      else {
        if (this.currentType === 'hostname') {
          return bbn.var.regexp.hostname.source;
        }
        else if (this.currentType === 'ip') {
          return bbn.var.regexp.ip.source;
        }
        else {
          return '';
        }
      }
    },
    currentType(){
      return ['text', 'date', 'search', 'url', 'tel', 'email', 'password', 'hostname', 'ip'].includes(this.type) ? this.type : 'text';
    }
  },
  methods: {
    clear(){
      this.emitInput(this.pref || (this.nullable ? null : ''));
      this.currentValue = '';
    },
    emitValue(v) {
      if (this.pref && (v.indexOf(this.pref) !== 0)) {
        v = this.pref + v;
      }

      this.emitInput(!v && this.nullable ? null : v);
    },
    /*
    inputFieldUpdate() {
      if (this.inputFieldUpdater !== undefined) {
        clearTimeout(this.inputFieldUpdater);
      }

      this.inputFieldUpdater = setTimeout(() => {
        const ele = this.getRef('element');
        if (ele && (ele.value !== this.currentValue)) {
          this.getRef('element').value = this.currentValue;
        }
      }, 50);
    }*/
    onInput(ev){
      ev.stopPropagation();
      ev.stopImmediatePropagation();
      this.currentValue = ev.target.value;
    },
    getType(){
      
    }
  },
  mounted(){
    if (this.value !== this.currentValue) {
      this.emitValue(this.currentValue);
    }

    this.ready = true;
  },
  watch: {
    maxlength(newVal) {
      if (this.currentValue.length > newVal) {
        this.currentValue = this.currentValue.substr(0, newVal);
      }
    },
    value(v) {
      if (this.pref && v && (v.indexOf(this.pref) === 0)) {
        v = bbn.fn.substr(v, this.pref.length);
      }

      if (!this.isEmittingValue) {
        if (this.currentValue !== v) {
          this.currentValue = v || '';
        }
      }
    },
    currentValue(v) {
      if (!this.isEmittingValue) {
        this.isEmittingValue = true;
        if (this.value !== (this.pref || '') + this.currentValue) {
          this.emitValue(v);
        }

        this.isEmittingValue = false;
      }
    },
    required(v){
      const ele = this.getRef('element');
      if (ele) {
        if (v) {
          ele.setAttribute('required', '');
        }
        else if (ele.hasAttribute('required')) {
          ele.removeAttribute('required');
        }
      }
    }
  }
};

import cpHtml from './input.html';
import cpStyle from './input.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/input.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-input',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
