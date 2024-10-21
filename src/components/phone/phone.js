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
    }

  },
  data(){
    return {
      countryCodes: bbn.fn.map(countryCodes, c => {
        c.text = `${c.name} (${c.prefix})`;
        if (this.icons) {
          c.icon = `fi fi-${c.code.toLowerCase()}`;
          //c.text = `<i class="${icon}"></i><span>${c.text}</span>`;
        }
        return c;
      }),
      currentPrefix: this.getPrefixFromValue(),
      currentNumber: this.getNumberFromValue(),
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
      return bbn.fn.getField(this.countryCodes, 'code', 'prefix', this.currentPrefix);
    },
    currentMaxlength(){
      return (this.maxlength > -1) ? this.maxlength : (this.currentCountry === 'FR' ? 10 : 0);
    },
    currentPattern(){
      return `[0-9]${this.currentMaxlength ? ('{0,' + this.currentMaxlength + '}') : '+'}`;
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

      return this.defaultCode ? bbn.fn.getField(countryCodes, 'prefix', 'code', this.defaultCode) : '';
    },
    getNumberFromValue(){
      if (this.value) {
        const prefix = this.getPrefixFromValue();
        return this.value.replace(prefix, '');
      }

      return '';
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
      if (this.currentPrefix !== prefix) {
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
