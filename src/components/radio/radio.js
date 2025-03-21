/**
 * @file bbn-radio component
 * @description bbn-radio is a component that can be used to select a particular choice from a range of options.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 13/02/2017
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.input
   * @mixin bbn.cp.mixins.localStorage
   * @mixin bbn.cp.mixins.events
   *
   */
  mixins: 
  [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.input,
    bbn.cp.mixins.localStorage,
    bbn.cp.mixins.events
  ],
  props: {
    /**
     * The separator that can be inserted between the radio buttons.
     * @prop {String} separator
     */
    separator: {
      type: String
    },
    /**
     * Set to true to arrange the radio buttons vertically.
     * @prop {Boolean} [false] vertical
     */
    vertical: {
      type: Boolean,
      default: false
    },
    /**
     * If the property vertical is set to false, defines the number of columns used to render the component.
     * @prop {Number} step
     */
    step: {
      type: Number
    },
    /**
     * The id of the radio input.
     * @prop {String} [bbn.fn.randomString(10, 25)]  id
     */
    uid: {
      type: String,
      default(){
        return bbn.fn.randomString(10, 25);
      }
    },
    /**
     * A function rendering each radio label.
     * @prop {Function} render
     */
    render: {
      type: Function
    },
    /**
     * The name of the property in the item object used as a text.
     * @prop {String} ['text'] sourceText
     */
    sourceText: {
      type: String,
      default: 'text'
    },
    /**
     * The name of the property in the item object used as a value
     * @prop {String} ['text'] sourceValue
     */
    sourceValue: {
      type: String,
      default: 'value'
    },
    /**
     * The source of the component.
     * @prop {Array} [[{text:'Yes', value:1},{text:'No', value:0}]] source
     */
    source: {
      type: Array,
      default(){
        return [{
          text: bbn._("Yes"),
          value: 1
        }, {
          text: bbn._("No"),
          value: 0
        }];
      }
    }
  },
  methods: {
    /**
     * @method changed
     * @param val
     * @param {Event} e
     * @emits input
     * @emits change
     */
    changed(val, d, e){
      this.$emit('input', val);
      this.$emit('change', val, d, e);
    },
    /**
     * Returns the component's style based on the property 'step'.
     * @method getStyle
     */
    getStyle(){
      if ( this.step && !this.vertical ){
        return 'display: grid; grid-template-columns: ' + 'auto '.repeat(this.step) + ';';
      }
      else {
        return '';
      }
    }
  },
  beforeMount() {
    if (this.hasStorage) {
      let v = this.getStorage();
      if (v && (v !== this.value)) {
        this.changed(v);
      }
    }
  },
  watch: {
    /**
     * @watch value
     * @param {Mixed} v
     */
    value(v) {
      if (this.storage) {
        if (v) {
          this.setStorage(v);
        }
        else {
          this.unsetStorage()
        }
      }
    },
  }
};

import cpHtml from './radio.html';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/radio.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-radio',
  definition: cpDef,
  template: cpHtml,
  lang: cpLang
};
