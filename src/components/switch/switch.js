 /**
  * @file bbn-switch component
  *
  * @description bbn-switch is a component with easy implementation and customization that allows the user to switch between selected and unselected states, defining the value and novalue in the appropriate properties.
  *
  * @copyright BBN Solutions
  *
  * @author BBN Solutions
  *
  * @created 13/02/2017
  */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.events
     */
    mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.input,
      bbn.cp.mixins.events
    ],
    props: {
      /**
       * The value of the component.
       * @prop {Boolean} [true] value
       */
      value: {
        default: true
      },
      /**
       * The value of the component when switch is off.
       * @prop [null] novalue
       */
      novalue: {
        default: null
      },
      /**
       * The name of the input.
       * @prop {String} [null] name
       */
      name: {
        type: String,
        default: null
      },
      /**
       * The id of the input.
       * @prop {String} [bbn.fn.randomString(10, 25)] id
       */
      id: {
        type: String,
        default(){
          return bbn.fn.randomString(10, 25);
        }
      },
      /**
       * The class(es) to add to the tag span.
       * @prop {String|Array} cls
       */
      cls: {
        type: [String,Array]
      },
      /**
       * The class(es) to add to the switch button.
       * @prop {String|Array} sliderCls
       */
      sliderCls: {
        type: [String,Array]
      },
      /**
       * The property used for the component's value instead of the classic "value" property.
       * @prop {String|Boolean|Number} [undefined] modelValue
       */
      modelValue: {
        type: [String, Boolean, Number],
        default: undefined
      },
      /**
       * True if a value is required.
       * @prop {Boolean} [false] required
       */
      required: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true disables the switch.
       * @prop {Boolean} [false] disabled
       */
      disabled: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true for a readonly switch.
       * @prop {Boolean} [false] readonly
       */
      readonly: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true to have the component switched on.
       * @prop {Boolean} [false] checked
       */
      checked: {
        type: Boolean,
        default: false
      },
      /**
       * If set to true, a comparison will also be made on the component value type.
       * @prop {Boolean} [false] strict
       */
      strict: {
        type: Boolean,
        default: false
      },
      /**
       * Defines the icon for the component when switched on.
       * @prop {String} ['nf nf-fa-play'] onIcon
       */
      onIcon: {
        type: String,
        default: 'nf nf-fa-play'
      },
      /**
       * Defines the icon for the component when switched off.
       * @prop {String} ['nf nf-fa-stop'] offIcon
       */
      offIcon: {
        type: String,
        default: 'nf nf-fa-stop'
      },
      /**
       * Set to true does not show onIcon and offIcon.
       * @prop {Boolean} [tre] noIcon
       */
      noIcon: {
        type: Boolean,
        default: true
      },
      /**
       * Set to true gives the component a rounded appearance.
       * @prop {Boolean} [false] radius
       */
      radius: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true gives the component a squared appearance.
       * @prop {Boolean} [false] squared
       */
      squared: {
        type: Boolean,
        default: false
      }
    },
    data() {
      let state = this.checked;
      if (state
        && ((!this.strict && (this.modelValue != this.value))
          || (this.strict && (this.modelValue !== this.value)))
      ) {
        state = false;
      }
      else if ((this.strict && (this.modelValue === this.value))
        || (!this.strict && (this.modelValue == this.value))
      ) {
        state = true;
      }
  
      return {state};
    },
    model: {
      prop: 'modelValue',
      event: 'input'
    },
    computed: {
      /**
       * If the prop noIcon is set to false returns the icon basing on the component's state.
       * @computed currentIcon
       * @return {String}
       */
      currentIcon(){
        return this.noIcon ? '' : (this.state ? this.onIcon : this.offIcon);

      }
    },
    methods: {
      /**
       * Switches the component.
       * @method toggle
       * @emits input
       * @emits change
       */
      toggle(ev) {
        if (!this.isDisabled && !this.readonly) {
          this.$emit('beforechange', ev, this.state);
          if (!ev?.defaultPrevented) {
            let emitVal;
            if (this.modelValue !== undefined) {
              emitVal = this.state ? this.novalue : this.value;
            }
            else {
              emitVal = this.state ? this.novalue : this.value;
            }
            
            this.$emit('input', emitVal);
            this.$emit('change', emitVal, this);
            this.state = !this.state;
            // This is mandatory for string, I don't know why!
            this.$forceUpdate();
          }
        }
      },
      /**
       * Prevents the event action if the component is disabled or readonly
       * @method onClick
       * @fires click
       */
      onClick(ev){
        if (this.isDisabled || this.readonly) {
          ev.preventDefault();
        }
        else {
          this.toggle();
        }
      },
      /**
       * Prevents the event action if the component is disabled or readonly
       * @method onKeyDown
       * @fires keydown
       */
      onKeyDown(ev){
        if ((this.isDisabled || this.readonly) && (ev.keyCode === 32)) {
          ev.preventDefault()
        }
        else {
          //bbn.fn.log("KEYDOWN");
          this.keydown(ev);
        }
      }
    },
    /**
     * Sets the initial state of the component.
     * @event mounted
     * @fires toggle
     * @emits input
     */
    mounted(){
      if (this.checked && !this.state) {
        this.toggle();
      }
      /*
      if (!this.checked && !this.state) {
        this.$emit('input', this.novalue);
      }
      */
    },
    watch: {
      /**
       * @watch checked
       * @param {Boolean} newValue
       * @fires toggle
       */
      checked(newValue){
        if (newValue !== this.state) {
          this.toggle();
        }
      }
    }
  };

import cpHtml from './switch.html';
import cpStyle from './switch.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./switch.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-switch',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
