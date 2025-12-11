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
      start: {
        type: String,
        default: ''
      },
      end: {
        type: String,
        default: ''
      },
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
      },
      /**
       * The number of months to in day mode calendar
       * 
       * @prop {Number} [1] numMonth
       */
      numMonth: {
        type: Number,
        default: 3
      },
      time : {
        type: Boolean
      },
      seconds: {
        type: Boolean,
        default: true
      }

    },
    data() {
      if (!this.start && bbn.fn.isArray(this.value) && (this.value.length === 2)) {
        this.$props.start = this.value[0];
        this.$props.end = this.value[1];
      }

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
            return '00/0000 - 00/0000';
          case 'years':
            return '0000 - 0000';
        }

        if (this.time) {
          if (this.seconds) {
            return '00/00/0000 00:00:00 - 00/00/0000 00:00:00';
          }
          return '00/00/0000 00:00 - 00/00/0000 00:00';
        }

        return '00/00/0000 - 00/00/0000';
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

        if (this.time) {
          return 'YYYY-MM-DD HH:II:SS';
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

        if (this.time) {
          if (this.seconds) {
            return 'DD/MM/YYYY HH:II:SS';
          }

          return 'DD/MM/YYYY HH:II';
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
            return '[0-3]{1}[0-9]{1}\\\/{1}[0-9]{4} - [0-3]{1}[0-9]{1}\\\/{1}[0-9]{4}';
          case 'years':
            return '[0-9]{4} - [0-9]{4}';
        }

        if (this.time) {
          if (this.seconds) {
            return '[0-3]{1}[0-9]{1}\\\/{1}[0-1]{1}[0-9]{1}\\\/{1}[0-9]{4} [0-2]{1}[0-9]{1}:{1}[0-5]{1}[0-9]{1}:{1}[0-5]{1}[0-9]{1} - [0-3]{1}[0-9]{1}\\\/{1}[0-1]{1}[0-9]{1}\\\/{1}[0-9]{4} [0-2]{1}[0-9]{1}:{1}[0-5]{1}[0-9]{1}:{1}[0-5]{1}[0-9]{1}';
          }

          return '[0-3]{1}[0-9]{1}\\\/{1}[0-1]{1}[0-9]{1}\\\/{1}[0-9]{4} [0-2]{1}[0-9]{1}:{1}[0-5]{1}[0-9]{1} - [0-3]{1}[0-9]{1}\\\/{1}[0-1]{1}[0-9]{1}\\\/{1}[0-9]{4} [0-2]{1}[0-9]{1}:{1}[0-5]{1}[0-9]{1}';
        }

        return '[0-3]{1}[0-9]{1}\\\/{1}[0-1]{1}[0-9]{1}\\\/{1}[0-9]{4} - [0-3]{1}[0-9]{1}\\\/{1}[0-1]{1}[0-9]{1}\\\/{1}[0-9]{4}';
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
      setDate(vals, calendar, format) {
        bbn.fn.log(["SET DATE", vals, calendar, format, this.start, this.end]);
        const [start, end] = vals;
        const dstart = bbn.dt(start, format);
        const dend = bbn.dt(end, format);
        if (dstart.isValid && dend.isValid) {
          this.$emit('input:start', vals[0]);
          this.$emit('input:end', vals[1]);
          this.setValue(vals);
        }
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
      setValue(vals) {
        bbn.fn.log(["SET VALUE", vals]);
        let start, end;
        bbn.fn.each(vals, value => {
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
          end = start && !end ? value : end;
          start = !start ? value : start;
        })
        if (start && end) {
          const value = [start, end];
          if (JSON.stringify(value) !== JSON.stringify(this.value)) {
            this.emitInput(value);
          }
          if (!this.time) {
            this.isOpened = false;
          }
        }
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
            dj = maskVal &&  r.test(maskInput) ? bbn.dt(maskInput, this.currentFormat) : false,
            value = dj && dj.isValid ? dj.format(this.getValueFormat(maskInput)) : '';
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
        if (newVal[0] && newVal[1]) {
          let mask = this.getRef('element');
          const start = bbn.dt(newVal[0], this.getValueFormat(newVal[0]));
          const end = bbn.dt(newVal[1], this.getValueFormat(newVal[1]));
          const formatted = start.format(this.currentFormat) + ' - ' + end.format(this.currentFormat);
          bbn.fn.log(["SET INPUT VALUE", newVal, formatted]);
          this.inputValue = newVal && mask && start.isValid && end.isValid && end.isAfter(start) ?
            mask.raw(formatted) :
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

import cpHtml from './daterangepicker.html';
import cpStyle from './daterangepicker.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-daterangepicker',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
