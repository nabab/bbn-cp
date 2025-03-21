/**
  * @file bbn-datepicker component
  *
  * @description bbn-datepicker is a component that combines input and calendar, allowing the user to choose a date value.
  * This component allows the association of data in a bidirectional way and allows the users to choose a validation interval period and the format of the value entered.
  *
  * @copyright BBN Solutions
  *
  * @author Mirko Argentino
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
       * The array of events for each day.
       * When a string is set, an ajax call will be made to the corresponding url.
       *
       * @prop {(String|Array)} [[]] source
      */
      source: {
        type: [String, Array],
        default(){
          return [];
        }
      },
      /**
       * The format of the date displayed.
       *
       * @prop {String} format
       */
      format: {
        type: String
      },
      /**
       * The format of the value.
       *
       * @prop {(String|Function)} valueFormat
       */
      valueFormat: {
        type: [String, Function]
      },
      /**
       * The mask for the date input.
       *
       * @prop {String} mask
       */
      mask: {
        type: String
      },
      /**
       * The maximum allowed value.
       *
       * @prop {String} max
       */
      max: {
        type: String
      },
      /**
       * The minimum allowed value.
       *
       * @prop {String} min
       */
      min: {
        type: String
      },
      /**
       * The visualization mode.
       * Allowed values: days, weeks, months and years.
       *
       * @prop {String} ['days'] type
      */
      type: {
        type: String,
        default: 'days',
        validator: m => ['days', 'weeks', 'months', 'years'].includes(m)
      },
      /**
       * The disabled dates.
       *
       * @prop {(Array|Function)} disableDates
       */
      disableDates: {
        type: [Array, Function]
      },
      /**
       * Array of date values insertable into a range.
       *
       * @prop {Array} [[]] datesRange
      */
      datesRange: {
        type: Array,
        default(){
          return [];
        }
      },
      /**
       * Set it to false if you dont' want to auto-resize the input's width based on its value (in characters).
       * @prop {Boolean} [true] autosize
       */
      autosize: {
        type: Boolean,
        default: true
      },
      /**
       * Shows only dates with events.
       *
       * @prop {Boolean} [false] onlyEvents
       */
      onlyEvents: {
        type: Boolean,
        default: false
      },
      /**
       * The calendar button's position
       * 
       * @prop {String} ['right'] buttonPosition
       */
      buttonPosition: {
        type: String,
        default: 'right',
        validator: pos => ['right', 'left'].includes(pos)
      }
    },
    data(){
      return {
        /**
         * Shows/hides the floater.
         *
         * @data {Boolean} [false] isOpened
        */
        isOpened: false,
        /**
         * Indicates if the bbn-masked is mounted.
         *
         * @data {Boolean} [false] maskedMounted
        */
        maskedMounted: false,
        /**
         * The current value displayed in the input.
         *
         * @data {String} [''] inputValue
        */
        inputValue: '',
        /**
         * The old value displayed in the input.
         *
         * @data {String} [''] oldInputvalue
         */
        oldInputValue: ''
      }
    },
    computed: {
      /**
       * The current mask for the date input.
       *
       * @computed currentMask
       * @return {String}
       */
      currentMask(){
        if (this.mask) {
          return this.mask;
        }

        switch (this.type) {
          case 'months':
            return '00/0000';
          case 'years':
            return '0000';
        }

        return '00/00/0000';
      },
      /**
       * The current value format.
       *
       * @computed currentValueFormat
       * @return {String}
       */
      currentValueFormat(){
        if (this.valueFormat) {
          return this.valueFormat;
        }

        switch (this.type) {
          case 'months':
            return 'YYYY-MM';
          case 'years':
            return 'YYYY';
        }

        return 'YYYY-MM-DD';
      },
      /**
       * The current format displayed in the input.
       *
       * @computed currentFormat
       * @return {String}
       */
      currentFormat(){
        if (this.format) {
          return this.format;
        }

        switch (this.type) {
          case 'months':
            return 'MM/YYYY';
          case 'years':
            return 'YYYY';
        }

        return 'DD/MM/YYYY';
      },
      /**
       * The current pattern for the bbn-mask.
       *
       * @computed currentPattern
       * @returns {String}
       */
      currentPattern(){
        if (this.pattern) {
          return this.pattern;
        }

        switch (this.type) {
          case 'months':
            return '[0-3]{1}[0-9]{1}\\\/{1}[0-9]{4}';
          case 'years':
            return '[0-9]{4}';
        }

        return '[0-3]{1}[0-9]{1}\\\/{1}[0-1]{1}[0-9]{1}\\\/{1}[0-9]{4}';
      },
      /**
       * True if the values of the inputValue and the oldInputValue properties are different.
       *
       * @computed intuValueChanged
       * @return {Boolean}
       */
      inputValueChanged(){
        return this.inputValue !== this.oldInputValue;
      }
    },
    methods: {
      /**
       * Gets the correct value format.
       *
       * @method getValueFormat
       * @param {String} val The value.
       * @fires valueFormat
       * @return {String}
       */
      getValueFormat(val){
        return bbn.fn.isFunction(this.valueFormat) ? this.valueFormat(val) : this.currentValueFormat;

      },
      /**
       * Sets the value to the 'YYYY-MM-DD' format.
       *
       * @method setDate
       * @param {String} val
       * @fires getValueFormat
       * @fires setValue
       */
      setDate(val, calendar, format){
        this.setValue(dayjs(val.toString(), format).isValid() ? dayjs(val.toString(), format).format(this.getValueFormat(val.toString())) : '');
      },
      /**
       * Sets the value.
       *
       * @method setValue
       * @param {String} val The value.
       * @fires getValueFormat
       * @fires disableDates
       * @fires setInputValue
       * @emits input
       */
      setValue(val){
        let format = !!val ? this.getValueFormat(val.toString()) : false,
            value = format ? (dayjs(val.toString(), format).isValid() ? dayjs(val.toString(), format).format(format) : '') : '';
        if ( value ){
          if ( this.min && (value < this.min) ){
            value = this.min;
          }
          if ( this.max && (value > this.max) ){
            value = this.max;
          }
          if (
            this.disableDates &&
            (bbn.fn.isFunction(this.disableDates) && this.disableDates(value)) ||
            (bbn.fn.isArray(this.disableDates) && this.disableDates.includes(value))
          ){
            value = this.nullable ? null : '';
          }
        }
        else if ( this.nullable ){
          value = null;
        }
        if ( value !== this.value ){
          this.emitInput(value);
        }
        else {
          this.setInputValue(value);
        }
        if ( !value ){
          this.inputValue = '';
          this.oldInputValue = '';
        }
        this.isOpened = false;
      },
      /**
       * Updates the calendar.
       *
       * @method updateCalendar
       * @fires getRef
      */
      updateCalendar(){
        if ( this.getRef('calendar') ){
          this.getRef('calendar').refresh();
        }
      },
      /**
       * The method called by the input blur event.
       *
       * @method inputChanged
       * @fires getRef
       * @fires getValueFormat
       * @fires disableDates
       * @fires setValue
       * @emits min
       * @emits max
       * @emits change
      */
      inputChanged(){
        let mask = this.getRef('element'),
            maskInput = mask.inputValue,
            maskVal = mask.raw(maskInput),
            r = new RegExp(this.currentPattern),
            dj = maskVal &&  r.test(maskInput) ? dayjs(maskInput, this.currentFormat) : false,
            value = dj && dj.isValid() ? dj.format(this.getValueFormat(maskInput)) : '';
        if ((maskVal !== this.oldInputValue)
          && (!maskVal || value)
        ) {
          if (value && this.min && (value < this.min)) {
            const ev = new CustomEvent('min', {cancelable: true});
            this.$emit('min', ev, value, this.min, this);
            if (ev.defaultPrevented) {
              return;
            }

            value = this.min;
          }

          if (value && this.max && (value > this.max)) {
            const ev = new CustomEvent('max', {cancelable: true});
            this.$emit('max', ev, value, this.max, this);
            if (ev.defaultPrevented) {
              return;
            }

            value = this.max;
          }

          if (this.disableDates
            && ((bbn.fn.isFunction(this.disableDates) && this.disableDates(value))
              || (bbn.fn.isArray(this.disableDates) && this.disableDates.includes(value)))
          ) {
            this.setValue(false);
          }
          else {
            this.setValue(value);
            this.$nextTick(() => {
              if (this.value !== value) {
                this.$emit('change', value);
              }
            });
          }
        }
      },
      /**
       * Set the new value by updating the calendar.
       *
       * @method setInputValue
       * @param {String} newVal
       * @fires getRef
       * @fires getValueFormat
       * @fires setValue
       * @fires updateCalendar
       */
      setInputValue(newVal){
        if ( newVal ){
          let mask = this.getRef('element'),
              mom = dayjs(newVal.toString(), this.getValueFormat(newVal.toString()));
          this.inputValue = newVal && mask && mom.isValid() ?
            mask.raw(mom.format(this.currentFormat).toString()) :
            '';
        }
        else {
          this.inputValue = '';
        }

        this.oldInputValue = this.inputValue;
        this.updateCalendar();
      },
      /**
       * Clears the value.
       *
       * @method clear
       * @fires getRef
       * @fires setValue
       */
      clear(){
        this.setValue('');
        this.$nextTick(() => {
          this.$set(this.getRef('element'), 'inputValue', '');
        })
      }
    },
    /**
     * @event beforeCreate
     */
    beforeCreate(){
      if ( bbn.env && bbn.env.lang && (bbn.env.lang !== dayjs.locale()) ){
        dayjs.locale(bbn.env.lang);
      }
    },
    /**
     * @event mounted
     */
    mounted(){
      if (this.maskedMounted) {
        this.setInputValue(this.value);
      }

      this.ready = true;
    },
    watch: {
      /**
       * @watch min
       * @fires setValue
       * @fires updateCalendar
       */
      min(){
        this.setValue(this.value || '');
        this.updateCalendar();
      },
      /**
       * @watch max
       * @fires setValue
       * @fires updateCalendar
       */
      max(){
        this.setValue(this.value || '');
        this.updateCalendar();
      },
      /**
       * @watch valueFormat
       * @fires setValue
       */
      valueFormat(){
        this.setValue(this.value || '');
      },
      /**
       * @watch maskedMounted
       * @param {String} newVal
       * @fires setInputValue
       */
      maskedMounted(newVal){
        if ( newVal ){
          this.setInputValue(this.value);
        }
      },
      /**
       * @watch value
       * @param {String} newVal
       * @fires setInputValue
       */
      value(newVal){
        this.setInputValue(newVal);
      }
    }
  };

import cpHtml from './datepicker.html';
import cpStyle from './datepicker.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/datepicker.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-datepicker',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
