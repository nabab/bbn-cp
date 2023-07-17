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
return {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.events
     *
     */
    mixins: 
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.input,
      bbn.cp.mixins.events
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
      id: {
        type: String,
        default(){
          return bbn.fn.randomString(10, 25);
        }
      },
      /**
       * @todo description
       * @prop {String|Boolean|Number} [undefined] modelValue
       */
      modelValue: {
        type: [String, Boolean, Number],
        default: undefined
      },
      /**
       * Set to true to have required checkbox selection.
       *
       * @prop {Boolean} [false] required
       */
      required: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true to disable the checkbox.
       *
       * @prop {Boolean} [false] disabled
       */
      disabled: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true for a readonly checkbox.
       *
       * @prop {Boolean} [false] readonly
       */
      readonly: {
        type: Boolean,
        default: false
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
       * @todo description
       *
       * @prop {Boolean} [false] strict
       */
      strict: {
        type: Boolean,
        default: false
      },
      component: {
        type: [Object, String, Function]
      }
    },
    model: {
      prop: 'modelValue',
      event: 'input'
    },
    data(){
      return {
        /**
         * @data valueToSet
         */
        valueToSet: this.value,
        currentChecked: this.checked
      }
    },
    computed: {
      /**
       * Returns the state of the checkbox.
       *
       * @computed state
       * @return {Boolean}
       */
      state(){
        if ( this.currentChecked && (this.modelValue === undefined) ){
          return true;
        }
        if ( this.currentChecked &&
          (
            ( !this.strict && (this.modelValue != this.valueToSet) ) ||
            ( this.strict && (this.modelValue !== this.valueToSet) )
          )
        ){
          return false;
        }
        if (
          ( this.strict && (this.modelValue === this.valueToSet) ) ||
          ( !this.strict && (this.modelValue == this.valueToSet) )
        ){
          return true;
        }
        return this.currentChecked;
      },
    },
    methods: {
      /**
       * Emits a change when the state of the checkbox changes.
       *
       * @method toggle
       * @emits input
       * @emits change
       */
      toggle(force) {
        if ( !this.isDisabled && !this.readonly ){
          if ( force !== undefined ){
            this.currentChecked = !!force;
          }
          else {
            this.currentChecked = !this.currentChecked;
          }
          let emitVal = !this.state ? this.valueToSet : this.novalue;
          this.$emit('input', emitVal);
          this.$emit('change', emitVal, this);
        }
      },
      /**
       * Prevents the event action if the component is disabled or readonly
       * @method onClick
       * @fires click
       */
      onClick(ev){
        if (this.isDisabled || this.readonly){
          ev.preventDefault();
        }
        else {
          this.$emit('beforechange', ev, this.currentChecked);
          if (!ev.defaultPrevented) {
            this.toggle();
          }
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
          this.keydown(ev);
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
      if ( this.currentChecked && !this.state ){
        this.toggle();
      }
      if ( !this.currentChecked && !this.state ){
        //this.$emit('input', this.novalue);
      }
    }
  };
