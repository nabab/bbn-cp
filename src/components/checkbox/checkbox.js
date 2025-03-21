/**
 * @file bbn-checkbox component
 *
 * @description The bbn-checkbox component is a box that by clicking, it assigns a certain value and when we deselect it takes another.
 * The values ​​that can be assumed in case of selection or not are  defined in the configuration of the component.
 * In addition, we can customize it by using the properties at disposal.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 *
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.input
   * @mixin bbn.cp.mixins.events
   * @mixin bbn.cp.mixins.componentInside
   */
  mixins:
  [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.input,
    bbn.cp.mixins.events,
    bbn.cp.mixins.componentInside
  ],
  props: {
    value: {
    /**
     * The value of the checkbox.
     *
     * @prop {Boolean} [true] value
     */
      default: true
    },
    /**
    * The value of the checkbox when unchecked.
    *
    * @prop {Boolean} [null] novalue
    */
    novalue: {
      default: null
    },
    /**
     * The name of the component checkbox.
     *
     * @prop {String} [null] name
     */
    name: {
      type: String,
      default: null
    },
    /**
     * The id of the checkbox.
     *
     * @prop {String} id
     */
    uid: {
      type: String,
      default(){
        return bbn.fn.randomString(10, 25);
      }
    },
    /**
     * The property used for the component's value instead of the classic "value" property.
     *
     * @prop {String|Boolean|Number} [undefined] modelValue
     */
    modelValue: {
      type: [String, Boolean, Number]
    },
    /**
     * The accompanying label for the checkbox.
     *
     * @prop {String} label
     */
    label: {
      type: String,
    },
    /**
     * Set to true for a checked checkbox.
     *
     * @prop {Boolean} [false] checked
     */
    checked: {
      type: Boolean,
      default: false
    },
    /**
     * If set to true, a comparison will also be made on the component value type.
     *
     * @prop {Boolean} [false] strict
     */
    strict: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  computed: {
    state(){
      if (this.checked) {
        if (this.modelValue === undefined) {
          return true;
        }

        if ((!this.strict && (this.modelValue != this.value))
          || (this.strict && (this.modelValue !== this.value))
        ) {
          return false;
        }
      }

      if ((this.strict && (this.modelValue === this.value))
        || (!this.strict && (this.modelValue == this.value))
      ) {
        return true;
      }

      return this.checked;
    }
  },
  methods: {
    check() {
      if (!this.isDisabled && !this.readonly && !this.state) {
        const ev = new Event('beforechange', {cancelable: true});
        this.$emit('beforechange', ev, this.state);
        if (!ev.defaultPrevented) {
          let emitVal = this.value;
          this.$emit('input', emitVal);
          this.$emit('change', emitVal, this);
        }
        else {
          this.getRef('element').checked = this.state;
        }
      }
    },
    uncheck() {
      if (!this.isDisabled && !this.readonly && this.state) {
        const ev = new Event('beforechange', {cancelable: true});
        this.$emit('beforechange', ev, this.state);
        if (!ev.defaultPrevented) {
          let emitVal = this.novalue;
          this.$emit('input', emitVal);
          this.$emit('change', emitVal, this);
        }
        else {
          this.getRef('element').checked = this.state;
        }
      }
    },
    /**
     * Emits a change when the state of the checkbox changes.
     *
     * @method toggle
     * @emits input
     * @emits change
     */
    toggle() {
      if (!this.isDisabled && !this.readonly) {
        const ev = new Event('beforechange', {cancelable: true});
        this.$emit('beforechange', ev, this.state);
        if (!ev?.defaultPrevented) {
          let emitVal = this.state ? this.novalue : this.value;
          this.$emit('input', emitVal);
          this.$emit('change', emitVal, this);
        }
        else {
          this.getRef('element').checked = this.state;
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
        this.onKeydown(ev);
      }
    }
  },
  /**
   * @todo ask mirko about @emit
   *
   *
   * @event mounted
   * @fires toggle
   * @emits input
   */
  mounted(){
    if (this.checked && !this.state) {
      this.toggle();
    }
    if (!this.checked && !this.state) {
      //this.$emit('input', this.novalue);
    }
  },
  watch: {
    /**
     * @watch checked
     * @param {Boolean} newValue
     * @fires toggle
     */
    checked(newValue) {
      this.$computed.state.computedUpdate(true);
      if (newValue !== this.state) {
        bbn.fn.log("CHECKED WATCHER", newValue, this.state);
        this.toggle();
      }
    }
  }
};

import cpHtml from './checkbox.html';

export default {
  name: 'bbn-checkbox',
  definition: cpDef,
  template: cpHtml
};
