/**
 * @file bbn-phone component
 * @description bbn-phone allows to enter a phone number and its international prefix.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 25/09/2024
 */

import countryCodes from './_codes.js';
import '/node_modules/flag-icons/css/flag-icons.min.css';


const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.events
   * @mixin bbn.cp.mixins.input
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.events,
    bbn.cp.mixins.input
  ],
  props: {
    /**
     * The default country code.
     * @prop {String} ['FR'] defaultCode
     */
    defaultCode: {
      type: String,
      default: 'FR'
    },
    /**
     * Using the browser native render
     * @prop {Boolean} [false] native
     */
    native: {
      type: Boolean,
      default: false
    },
    /**
     * Show the icons on the left of the input
     * @prop {Boolean} [true] icons
     */
    icons: {
      type: Boolean,
      default: true
    },
    /**
     * Sets the prefix dropdown as readonly
     * @prop {Boolean} [false] prefixReadonly
     */
    prefixReadonly: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the autosize property of the prefix dropdown
     * @prop {Boolean} [false] prefixAutosize
     */
    prefixAutosize: {
      type: Boolean,
      default: true
    },
    /**
     * Only accepts mobile phone numbers
     * @prop {Boolean} [false] onlyMobile
     */
    onlyMobile: {
      type: Boolean,
      default: false
    },
    /**
     * Only accepts fixed phone numbers
     * @prop {Boolean} [false] onlyFixed
     */
    onlyFixed: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {String|Array} mobilePrefix
     */
    mobilePrefix: {
      type: [String, Array]
    },
    /**
     * @prop {String|Array} fixedPrefix
     */
    fixedPrefix: {
      type: [String, Array]
    },
    check: {
      type: String
    }
  },
  data(){
    return {
      countriesList: bbn.fn.map(countryCodes, c => {
        c.text = `${c.name} (${c.prefix})`;
        c.mobilePrefix = c.mobilePrefix || '';
        c.fixedPrefix = c.fixedPrefix || '';
        c.maxlength = c.maxlength || 0;
        if (this.icons) {
          c.icon = `fi fi-${c.code.toLowerCase()}`;
        }

        return c;
      }),
      currentPrefix: this.getPrefixFromValue() || (this.defaultCode ? bbn.fn.getField(countryCodes, 'prefix', 'code', this.defaultCode) : ''),
      currentNumber: this.getNumberFromValue(),
      isChecking: false
    }
  },
  computed: {
    currentValue(){
      if (!this.currentNumber.length) {
        return '';
      }

      return this.currentPrefix + this.currentNumber;
    },
    currentCountry(){
      return this.currentPrefix ? bbn.fn.getRow(this.countriesList, 'prefix', this.currentPrefix) : {};
    },
    currentCountryCode(){
      return this.currentCountry?.code || '';
    },
    currentMaxlength(){
      return this.currentCountry?.maxlength || (this.maxlength > -1 ? this.maxlength : 0);
    },
    currentMask(){
      return this.currentCountry?.mask || '';
    },
    currentMobilePrefix(){
      return this.mobilePrefix || this.currentCountry?.mobilePrefix || '';
    },
    currentFixedPrefix(){
      return this.fixedPrefix || this.currentCountry?.fixedPrefix || '';
    },
    currentPattern(){
      if (this.pattern) {
        return this.pattern;
      }

      let pattern = '';
      if ((this.onlyMobile && this.currentMobilePrefix)
        || (this.onlyFixed && this.currentFixedPrefix)
      ) {
        const prefix = this.onlyMobile ? this.currentMobilePrefix : this.currentFixedPrefix;
        if (bbn.fn.isArray(prefix)) {
          if (prefix.length === 1) {
            pattern = prefix[0] + '{1}';
          }
          else {
            pattern = '(';
            bbn.fn.each(prefix, (p, i) => {
              pattern += p + (prefix[i+1] ? '|' : '');
            });
            pattern += '){1}';
          }
        }
        else {
          pattern = prefix + '{1}';
        }

        if (this.isFrance) {
          pattern += '\\s{1}[0-9]{2}\\s{1}[0-9]{2}\\s{1}[0-9]{2}\\s{1}[0-9]{2}';
        }
        else {
          pattern += '[0-9]+';
        }
      }
      else if (this.currentCountry?.pattern) {
        pattern = this.currentCountry.pattern;
      }
      else {
        pattern = '[0-9]{1,' + this.currentMaxlength + '}';
      }

      return pattern;
    },
    isFrance(){
      return this.currentCountryCode === 'FR';
    }
  },
  methods: {
    getPrefixFromValue(){
      if (this.value?.length) {
        let p = '';
        bbn.fn.each(countryCodes, c => {
          if (this.value.startsWith(c.prefix) && (c.prefix.length > p.length)) {
            p = c.prefix;
          }
        });

        if (p.length) {
          return p;
        }
      }

      return '';
    },
    getNumberFromValue(){
      if (this.value) {
        const prefix = this.getPrefixFromValue();
        return this.value.replace(prefix, '');
      }

      return '';
    },
    onInputFocus(e){
      if (e?.target?.bbn
        && ((e.target.tagName === 'BBN-INPUT')
          || (e.target.tagName === 'BBN-MASKED')
        )
      ) {
        e.target.bbn.getRef('element').focus();
      }
    },
    onDropDownFocus(e){
      if (e?.target?.bbn
        && (e.target.tagName === 'BBN-DROPDOWN')
      ) {
        e.target.bbn.getRef('input').getRef('element').focus();
      }
    },
    onChange(){
      this.$nextTick(() => {
        this.$emit('change', this.currentValue);
        if (this.check && this.currentValue) {
          this.isChecking = true;
          const ev = new CustomEvent('checkstart', {cancelable: true});
          this.$emit('checkstart', ev);
          if (!ev.defaultPrevented){
            this.post(this.check, {number: this.currentValue}, d => {
              this.isChecking = false;
              if (d.valid) {
                this.$emit('removevalidation');
              }
              else {
                this.setInvalid(bbn._('Invalid phone number'));
              }

              this.$emit('checkend', d.valid);
            }, () => {
              this.isChecking = false;
              this.$emit('checkend', false);
            });
          }
        }
      });
    }
  },
  watch: {
    /**
     * @watch value
     * @fires getPrefix
     * @fires getNumberFromValue
     */
    value(newVal){
      const prefix = this.getPrefixFromValue();
      if (prefix && (this.currentPrefix !== prefix)) {
        this.currentPrefix = prefix;
      }

      const number = this.getNumberFromValue();
      if (this.currentNumber !== number) {
        this.currentNumber = number;
      }
    },
    currentValue(newVal){
      this.emitInput(!newVal.length && this.nullable ? this.nullValue : newVal);
    }
  }
};

import cpHtml from './phone.html';
import cpStyle from './phone.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/phone.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-phone',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
