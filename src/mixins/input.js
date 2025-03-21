import bbn from '@bbn/bbn';

const input = {
  props: {
    /**
     * The value of the component.
     * @prop value
     * @memberof inputComponent
     */
    value: {
      default(){
        return this.defaultValue !== undefined ? this.defaultValue : ''
      }
    },
    /**
     * The component's name.
     * @prop {String} name 
     * @memberof inputComponent
     */
    name: {
      type: String,
      default(){
        return bbn.fn.randomString(10, 20)
      }
    },
    /**
     * The component's placeholder.
     * @prop {String} placeholder
     * @memberof inputComponent
     */
    placeholder: {
      type: String
    },
    /**
     * Defines if the component has a required value.
     * @prop {Boolean|Function} [false] required
     * @memberof inputComponent
     */
    required: {
      type: [Boolean, Function, String],
      default: false
    },
    /**
     * Defines if the component has to be disabled.
     * @prop {Boolean|Function} [false] disabled
     * @memberof inputComponent
     */
    disabled: {
      type: [Boolean, Function, String, Number],
      default: false
    },
    /**
     * Defines if the component has to be readonly.
     * @prop {Boolean|Function} [false] readonly
     * @memberof inputComponent
     */
    readonly: {
      type: [Boolean, Function, String],
      default: false
    },
    /**
     * Defines the size of the component.
     * @prop {Number|String} size
     * @memberof inputComponent
     */
    size: {
      type: [Number, String]
    },
    /**
     * Defines the maxlength of the value.
     * @prop {Number|String} maxlength 
     * @memberof inputComponent
     */
    maxlength: {
      type: [String, Number],
      default: 524288
    },
    /**
     * Defines the minlength of the value.
     * @prop {Number|String} minlength
     * @memberof inputComponent
     */
    minlength: {
      type: [String, Number],
      default: 0
    },
    /**
     * A function to validate the value before submit.
     * @prop {Function} validation
     * @memberof inputComponent
     */
    validation: {
      type: [Function]
    },
    /**
     * A custon message to show on input validation.
     * @prop {String} validationMessage
     * @memberof inputComponent
     */
    validationMessage: {
      type: String
    },
    /**
     * @prop {Boolean} [false] nullable
     * @memberof inputComponent
     */
    nullable: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean|String|Object} [''] nullValue
     * @memberof inputComponent
     */
    nullValue: {
      type: [Boolean, String, Object],
      default: null
    },
    /**
     * Set it to true if you want to auto-resize the input's width based on its value (in characters).
     * @prop {Boolean} [false] autosize
     */
    autosize: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Number|String} defaultValue
     * @memberof inputComponent
     */
    defaultValue: {
      type: [String, Number]
    },
    /**
     * If true the element will focus on insert
     * @prop {Boolean} [false] focused
     */
    focused: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] ellipsis
     */
    ellipsis: {
      type: Boolean,
      default: false
    },
  },
  data(){
    let original = this.value;
    if (bbn.fn.isObject(this.value) || bbn.fn.isArray(this.value)) {
      original = bbn.fn.clone(this.value);
    }

    return {
      /**
       * True if the component has a value.
       * @data {Boolean} hasVale
       */
      originalValue: original,
      isEmittingValue: false,
    };
  },
  computed: {
    hasValue() {
      return !!this.value;
    },
    /**
     * Returns true if the component can have a null value.
     * @computed isNullable
     * @returns {Boolean}
     */
    isNullable(){
      let isNullable = !!this.nullable;
      if ( this.nullable === null ){
        isNullable = !this.required;
      }

      return isNullable;
    },
    /**
     * Returns true if the component is disabled
     * @computed isDisabled
     * @fires closest
     * @returns {Boolean}
     */
    isDisabled(){
      let form = this.closest('bbn-form');
      return this.disabled || (bbn.cp.isComponent(form) && form.disabled) ? true : false;
    },
    currentTabIndex() {
      if (this.isDisabled) {
        return '-1';
      }

      if ('tabindex' in this.$node.props) {
        const ti = this.$node.props.tabindex;
        return typeof ti === 'string' ? ti : ti.toString()
      }

      return '0';
    },
  },
  methods: {
    resetValue(){
      if (bbn.fn.isObject(this.value) || bbn.fn.isArray(this.value)) {
        this.originalValue = bbn.fn.clone(this.value);
      }
      else {
        this.originalValue = this.value;
      }
    },
    /**
     * Select the text of the component.
     * @method selectText
     * @memberof inputComponent
     */
    selectText(){
      let ele = this.getRef('element');
      if (ele) {
        bbn.fn.selectElementText(ele)
      }
    },
    /**
     * Emits the event input.
     * @method emitInput
     * @emit input
     * @param {Number|String} val 
     * @memberof inputComponent
     */
    emitInput(val, name) {
      let eventName = 'input' + (name ? ':' + name : '');
      //bbn.fn.log(`Emitting ${eventName} from ${this.$options.name}`, this);
      this.$emit(eventName, val);
    },
    /**
     * Emits the event change.
     * @method change
     * @emit change
     * @param {Event} e 
     * @memberof inputComponent
     */
    onChange(e){
      this.$emit('change', e, this.value)
    },
    /**
     * Check the validity of the inserted value.
     * @method isValid
     * @param {HTMLElement} e 
     * @return {Boolean}
     * @memberof inputComponent
     */
    isValid(e, setError = true, setOnFocus = false){
      const $this = bbn.cp.isComponent(e) ? e : this,
            ele = $this.getRef('element') || false,
            inp = $this.getRef('input') || false,
            customMessage = $this.validationMessage || ($this.$el.hasAttribute('validationMessage') ? $this.$el.getAttribute('validationMessage') : false);
      let check = elem => {
        if ( elem && elem.validity ){
          let validity = elem.validity,
              $elem = $this.$el,
              // Default message
              mess = bbn._('The value you entered for this field is invalid.'),
              specificCase = false;
          // If valid or disabled, return true
          if ( elem.disabled || validity.valid ){
            //if ( (!!elem.required || !!elem.readOnly) && !elem.value ){
            if ( elem.required && !elem.value ){
              specificCase = true;
            }
            else {
              if (this.$el.classList.contains('bbn-state-invalid')) {
                this.$el.classList.remove('bbn-state-invalid');
              }
              return true;
            }
          }
          if ( !validity.valid || specificCase ){
            // If field is required and empty
            if ( validity.valueMissing || specificCase ){
              mess = bbn._('Please fill out this field.');
            }
            // If not the right type
            else if ( validity.typeMismatch ){
              switch ( elem.type ){
                // Email
                case 'email':
                  mess = bbn._('Please enter a valid email address.');
                  break;
                // URL
                case 'url':
                  mess = bbn._('Please enter a valid URL.');
                  break;
              }
            }
            // If too short
            else if ( validity.tooShort ){
              mess = bbn._('Please lengthen this text to %d characters or more. You are currently using %d characters.', parseInt(elem.getAttribute('minLength')), elem.value.length);
            }
            // If too long
            else if ( validity.tooLong ){
              mess = bbn._('Please shorten this text to no more than %d characters. You are currently using %d characters.', parseInt(elem.getAttribute('maxLength')), elem.value.length);
            }
            // If number input isn't a number
            else if ( validity.badInput ){
              mess = bbn._('Please enter a number.');
            }
            // If a number value doesn't match the step interval
            else if ( validity.stepMismatch ){
              mess = bbn._('Please select a valid value.');
            }
            // If a number field is over the max
            else if ( validity.rangeOverflow ){
              mess = bbn._('Please select a value that is no more than %d.', parseInt(elem.getAttribute('max')));
            }
            // If a number field is below the min
            else if ( validity.rangeUnderflow ){
              mess = bbn._('Please select a value that is no less than %d.', parseInt(elem.getAttribute('min')));
            }
            // If pattern doesn't match
            else if (validity.patternMismatch) {
              // If pattern info is included, return custom error
              mess = bbn._('Please match the requested format.');
            }
            if (setError) {
              this.setInvalid(customMessage || mess, $this, setOnFocus);
            }
            return false;
          }
        }
      };
      let getLastElement = elem => {
        if ( bbn.cp.isComponent(elem) && elem.$refs && elem.$refs.element ){
          return getLastElement(elem.$refs.element);
        }
        return elem;
      };
      if (inp) {
        //bbn.fn.log(['isValid Inp', inp, getLastElement(inp), check(getLastElement(inp))])
        return check(getLastElement(inp)) || false;
      }
      if (ele) {
        //bbn.fn.log(['isValid Ele', ele, getLastElement(ele), check(getLastElement(ele))])
        return check(getLastElement(ele)) || false;
      }
      return true;
    },
    setInvalid(message, elem, setOnFocus){
      this.$emit('error', message);

      if (message?.length
        && (!elem || !bbn.fn.isDom(elem.$el))
      ) {
        elem = this;
      }

      if (!this.$el.classList.contains('bbn-state-invalid')) {
        this.$el.classList.add('bbn-state-invalid');
      }

      const validationID = `${this.$cid}-validation`;
      const validationStyleID = `${validationID}-style`;
      const styleExists = document.getElementById(validationStyleID);

      document.getElementById(validationID)?.parentElement?.remove();

      if (message?.length
        && elem
        && bbn.fn.isDom(elem.$el)
      ) {
        const scrollCp = elem.closest('.bbn-scroll');
        let onScroll = false;
        const onClose = () => {
          elem.$emit('removevalidation');
        };
        const cfg = {
          template: `
            <bbn-floater id="${validationID}"
                          ref="floater"
                          :icon="false"
                          @close="onFloaterClose"
                          :element="ele"
                          :element-width="false"
                          :arrow="true"
                          :scrollable="false"
                          position="bottomLeft"
                          :auto-hide="500"
                          :distance="8"
                          tabindex="-1"
                          :class="{'bbn-invisible': invisible}"
                          @hook:mounted="onFloaterMounted">
              <div class="bbn-vxspadding bbn-hspadding bbn-w-100"
                    style="min-width: max-content"
                    bbn-html="message"/>
            </bbn-floater>
          `,
          data() {
            return {
                ele: elem.$el,
                invisible: true,
                message,
                scrollCp,
                setOnFocus
            }
          },
          methods: {
            onFloaterClose(){
              if (this.scrollCp) {
                scrollCp.$off('scroll', onScroll);
              }

              if (this.setOnFocus) {
                elem.$off('focus', onClose);
              }

              onClose();
            },
            onFloaterMounted(){
              this.$nextTick(() => {
                if (this.scrollCp) {
                  const floater = this.getRef('floater');
                  onScroll = () => {
                    const scrollRect = scrollCp.$el.getBoundingClientRect();
                    const rect = floater.$el.getBoundingClientRect();
                    this.invisible = (scrollCp.hasScrollY && (rect.bottom > (scrollRect.bottom - 1)))
                     || (scrollCp.hasScrollY && (rect.top < (scrollRect.top + 1)))
                     || (scrollCp.hasScrollX && (rect.right > (scrollRect.right - 1)))
                     || (scrollCp.hasScrollX && (rect.left < (scrollRect.left + 1)));
                  }
                  scrollCp.$on('scroll', onScroll);
                  this.$nextTick(onScroll);
                }

                if (this.setOnFocus) {
                  elem.$on('focus', onClose);
                }

                elem.$emit('validationmounted', this);
              });
            }
          },
          beforeDestroy(){
            if (this.scrollCp) {
              scrollCp.$off('scroll', onScroll);
            }

            if (this.setOnFocus) {
              elem.$off('focus', onClose);
            }
          }
        };

        if (!styleExists) {
          let style = document.createElement('style');
          style.id = validationStyleID;
          style.innerHTML = `
            #${validationID} {
              background-color: var(--error-text) !important;
              color: var(--error-background) !important;
              border-radius: var(--default-border-radius) !important;
              border-color: var(--error-border) !important;
            }
            #${validationID} .bbn-floater-arrow {
              left: 9px !important;
            }
            #${validationID} .bbn-floater-arrow:after {
              background-color: var(--error-text) !important;
              border-color: var(--error-border) !important;
            }
          `;
          document.head.appendChild(style);
        }

        this.$create(cfg, this.$el)
      }

      const ev = () => {
        this.$emit('removevalidation');
      };

      this.$off('input', ev);
      this.$once('input', ev);
    }
  },
  /**
   * Adds the class 'bbn-input-component' to the component.
   * @event created
   * @memberof inputComponent
   */
  created(){
    this.componentClass.push('bbn-input-component');
    if ( this.autosize ){
      this.componentClass.push('bbn-auto-width');
    }
  },
  mounted() {
    if (this.autofocus) {
      const ele = this.$refs.element || this.$refs.input || this.$el;
      ele.focus();
    }
    this.$on('removevalidation', () => {
      if (this.$cid
        && this.$el.classList.contains('bbn-state-invalid')
      ) {
        this.$el.classList.remove('bbn-state-invalid');
        document.getElementById(`${this.$cid}-validation-style`)?.remove();
        document.getElementById(`${this.$cid}-validation`)?.parentElement?.remove();
      }
    })
    // I think this code is not necessary, the events are already called. Mirko
    /* const input = this.getRef('element');
    if (input && bbn.fn.isFunction(input.addEventListener)) {
      input.addEventListener('input', e => {
        e.stopImmediatePropagation();
        if (this.value !== input.value) {
          Object.defineProperty(this, 'value', {
            value: input.value,
            writable: false,
            configurable: true
          });
          this.currentValue = input.value;
          this.$emit('input', this.value);
        }
      })
      input.addEventListener('change', e => {
        this.$emit('change', this.value);
      })
    } */
  },
  watch: {
    /**
     * @watch value
     * @param newVal 
     * @memberof inputComponent
     */
    value(newVal){
      if (newVal !== this.currentValue) {
        this.currentValue = newVal;
      }
      /*
      if ( this.widget && (this.widget.value !== undefined) ){
        if (bbn.fn.isFunction(this.widget.value) ){
          if ( this.widget.value() !== newVal ){
            this.widget.value(newVal);
          }
        }
        else{
          if ( this.widget.value !== newVal ){
            this.widget.value = newVal;
          }
        }
      }
      if ( !!newVal !== this.hasValue ){
        this.hasValue = !!newVal;
      }
      */
    },
  }
};

export default input;
