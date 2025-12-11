/**
 * @file bbn-calendar component
 *
 * @description The bbn-calendar component is a calendar that allows you to interact with dates by providing details, inserting reminders and creating events.
 *
 * @copyright BBN Solutions
 *
 * @author Mirko Argentino
 */
import {buildDaysView, buildWeeksView, buildMonthsView, buildYearsView} from "./functions.js";

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.resizer
  */
  mixins: 
  [
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.list, 
    bbn.cp.mixins.resizer
  ],
  props: {
    /**
     * Auto-loads the data at mount of the component if it's set as "true".
     * @prop {Boolean} [false] autobind
    */
    autobind: {
      type: Boolean,
      default: false
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
     * Set to true to autoselect the date property value.
     *
     * @prop {Boolean} [false] autoSelect
     */
    autoSelection: {
      type: Boolean,
      default: false
    },
    /**
     * Set to true to select multiple values.
     *
     * @todo change to multiple
     * @prop {Boolean} [false] multiSelection
    */
    multiSelection: {
      type: Boolean,
      default: false
    },
    /**
     * The value.
     *
     * @prop {String} [''] value
    */
    value: {
      type: String,
      default: ''
    },
    /**
     * Shows the arrows on the header.
     *
     * @prop {Boolean} [true] arrows
     */
    arrows: {
      type: Boolean,
      default: true
    },
    /**
     * Shows the arrows as buttons (only icons also).
     *
     * @prop {Boolean} [true] arrowsButtons
    */
    arrowsButtons: {
      type: Boolean,
      default: true
    },
    /**
     * The icon displayed before the title.
     *
     * @prop {String|Boolean} ['nf nf-oct-calendar'] titleIcon
    */
    titleIcon: {
      type: [String, Boolean],
      default: 'nf nf-oct-calendar'
    },
    /**
     * The function called on click on the title.
     * 
     * @prop {Function} titleAction
     */
    titleAction: {
      type: Function
    },
    /**
     * The initial date.
     *
     * @prop {String} date
    */
    date: {
      type: String
    },
    /**
     * Shows/hides the dates of the next and previous period in the current visualization.
     *
     * @prop {Boolean} [false] extraItems
    */
    extraItems: {
      type: Boolean,
      default: false
    },
    /**
     * Array of items to insert into a range.
     *
     * @prop {Array} [[]] itemsRange
     */
    itemsRange: {
      type: Array,
      default(){
        return [];
      }
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
     * Disables the dates without events.
     *
     * @prop {Boolean} [false] disableNoEvents
     */
    disableNoEvents: {
      type: Boolean,
      default: false
    },
    /**
     * Shows/hides the date's details.
     *
     * @prop {Boolean} [false] itemDetails
    */
    itemDetails: {
      type: Boolean,
      default: false
    },
    /**
     * The icon used to indicate the presence of events in the item.
     * If set to false, nothing will be shown.
     *
     * @prop {String|Boolean} ['nf nf-fa-user'] eventIcon
    */
    eventIcon: {
      type: [String, Boolean],
      default: 'nf nf-fa-calendar'
    },
    /**
     * Shows/hides the padding of the item's cell.
     *
     * @prop {Boolean} [false] itemPadding
    */
    itemPadding: {
      type: [Boolean, Number, String],
      default() {
        return this.type !== 'days';
      }
    },
    /**
     * The component used for the items.
     *
     * @prop {HTMLElement} itemComponent
    */
    itemComponent: {
      type: [HTMLElement, Object, String]
    },
    /**
     * The title for the item's details.
     *
     * @prop {Function|String} [''] itemTitle
    */
    itemTitle: {
      type: [Function, String],
      default: ''
    },
    /**
     * The component used for the header.
     *
     * @prop {HTMLElement|Object|String} headerComponent
    */
    headerComponent: {
      type: [HTMLElement, Object, String]
    },
    /**
     * The labels type.
     * Types: auto, letter, abbr, full, false.
     *
     * @prop {String|Boolean} ['auto'] labels
    */
    labels: {
      type: [String, Boolean],
      default: 'auto',
      validator: s => ['auto', 'letter', 'abbr', 'full', 'short', 'long', 'narrow', false].includes(s)
    },
    /**
     * The field used for the event's start.
     *
     * @prop {String} ['start'] startField
     */
    startField: {
      type: String,
      default: 'start'
    },
    /**
     * The field used for the event's end.
     *
     * @prop {String} ['end'] endField
    */
    endField: {
      type: String,
      default: 'end'
    },
    /**
     * The format used for the event's start.
     *
     * @prop {String} ['YYYY-MM-DD 00:00:00'] startFormat
     */
    startFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    /**
     * The format used for the event's end.
     *
     * @prop {String} ['YYYY-MM-DD 23:59:59'] endFormat
     */
    endFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    /**
     * The maximum allowed date.
     *
     * @prop {String} max
     */
    max: {
      type: String
    },
    /**
     * The minimum allowed date.
     *
     * @prop {String} min
     */
    min: {
      type: String
    },
    /**
     * The start of the range in range mode.
     *
     * @prop {String} start
     */
    start: {
      type: String
    },
    /**
     * The end of the range in range mode.
     *
     * @prop {String} end
     */
    end: {
      type: String
    },
    /**
     * The disabled dates.
     *
     * @prop {Array|Function} disableDates
     */
    disableDates: {
      type: [Array, Function],
      default(){
        return [];
      }
    },
    /**
     * Shows the "loading" text when it's loading.
     * @prop {Boolean} showLoading
     */
    showLoading: {
      type: Boolean,
      default: false
    },
    /**
     * Highlights the current date.
     * @prop {Boolean} highlightCurrent
     */
    highlightCurrent: {
      type: Boolean,
      default: true
    },
    /**
     * Highlights the given dates.
     * @prop {Array|Function} highlightDates
     */
    highlightDates: {
      type: [Array, Function]
    },
    numMonth: {
      type: Number,
      default: 1,
      validator: s => [1, 2, 3, 4, 5, 6].includes(s)
    },
    firstWeekDay: {
      type: Number,
      default: 1,
    },
    mode: {
      type: String,
      default: 'single',
      validator: s => ['single', 'range', 'multiple'].includes(s.toLowerCase())
    },
    maxRange: {
      type: Number
    },
    minRange: {
      type: Number
    },
    status: {
      type: [Boolean, Object],
      default: true
    },
    time: {
      type: [Boolean, String],
      default: false
    },
    showSecond: {
      type: Boolean,
      default: false
    },
    showMinute: {
      type: Boolean,
      default: true
    },
    hourStart: {
      type: Number,
      default: 0
    },
    hourEnd: {
      type: Number,
      default: 23
    }
  },
  data() {
    const cfg = this.getCfg();
    let mom = bbn.dt();
    const currentMin = this.getDateObject(this.min, cfg);
    const currentMax = this.getDateObject(this.max, cfg);
    if (this.mode === 'range') {
      if (this.start && this.end) {
      }
    }
    else if (this.value) {
      let m = this.getDateObject(this.value, cfg);
      mom = m.isValid ? m : mom;
    }
    if (this.currentMin && mom.isBefore(this.currentMin, 'day')) {
      mom = this.currentMin;
    }
    else if (this.currentMax && mom.isAfter(this.currentMax, 'day')) {
      mom = this.currentMax;
    }

    return {
      /**
       * Today as 'YYYY-MM-DD' format.
       *
       * @data {String} [today] today
      */
      today: bbn.dt().format('YYYY-MM-DD'),
      /**
       * The current calendar title.
       *
       * @data {String} [''] title
      */
      currentTitle: '',
      /**
       * The labels (text).
       *
       * @data {Array} [[]] currentLabels
      */
      currentLabels: [],
      /**
       * The Moment objects of the labels.
       *
       * @data {Array} [[]] currentLabelsDates
      */
      currentLabelsDates: [],
      /**
       * The current date as a Moment object.
       *
       * @data {Moment} currentDate
       */
      currentDate: mom,
      /**
       * The items' structures.
       *
       * @data {Array} [[]] items
      */
      items: [],
      /**
       * The component is ready.
       *
       * @data {Boolean} [false] ready
       */
      ready: false,
      /**
       * CSS style for the grid.
       *
       * @data {String} [''] gridStyle
      */
      gridStyle: '',
      /**
       * The current value.
       *
       * @data {String} [''] currentValue
       */
      currentValue: '',
      /**
       * The events.
       *
       * @data {Object} [{}] events
       */
      events: {},
      firstDayVisible: null,
      lastDayVisible: null,
      currentCfg: cfg,
      currentMin: currentMin,
      currentMax: currentMax,
      rangeSelected: [],
      currentTime: mom.format('HH:mm:ss'),
      hours: bbn.fn.range(this.hourStart, this.hourEnd, 1).map(h => ({text: h.toString().padStart(2, "0"), value: h.toString().padStart(2, "0")})),
      minsec: bbn.fn.range(0, 59, 5).map(h => ({text: h.toString().padStart(2, "0"), value: h.toString().padStart(2, "0")})),
      wheelHeight: 0,
      timeMode: this.time === true ? 'day' : this.time || null,
      firstSelectedDate: null,
    }
  },
  computed: {
    hour: {
      get() {
        return this.currentDate?.isValid ? this.currentDate.HH : this.currentTime.split(':')[0];
      },
      set(h) {
        if (this.currentDate?.isValid) {
          this.currentDate = this.currentDate.hour(h);
        }
        else {
          const parts = this.currentTime.split(':');
          parts[0] = h;
          this.currentTime = parts.join(':');
        }
      }
    },
    minute: {
      get() {
        return this.currentDate?.isValid ? this.currentDate.II : this.currentTime.split(':')[1];
      },
      set(h) {
        if (this.currentDate?.isValid) {
          this.currentDate = this.currentDate.minute(h);
        }
        else {
          const parts = this.currentTime.split(':');
          parts[1] = h;
          this.currentTime = parts.join(':');
        }
      }
    },
    second: {
      get() {
        return this.currentDate?.isValid ? this.currentDate.SS : this.currentTime.split(':')[2];
      },
      set(h) {
        if (this.currentDate?.isValid) {
          this.currentDate = this.currentDate.second(h);
        }
        else {
          const parts = this.currentTime.split(':');
          parts[2] = h;
          this.currentTime = parts.join(':');
        }
      }
    },
    timeValue: {
      get() {
        if (this.currentDate?.isValid) {
          return this.currentDate.format('HH:mm:ss');
        }
        return this.currentTime;
      },
      set(v) {
        if (this.currentDate?.isValid) {
          this.currentDate = this.currentDate.time(v)
        }
        else {
          this.currentTime = v;
        }

      }
    },
    weekSequence() {
      if (this.type === 'days') {
        const arr = [];
        for (let i = 0; i < 7; i++) {
          arr.push((i + this.firstWeekDay) % 7);
        }
        return arr;
      }

      return [];
    },
    isPrevDisabled() {
      if (this.currentDate
        && this.currentCfg?.step
        && this.currentCfg?.startFormat
        && ((this.type !== 'days') || this.items.length)
      ) {
        if (!this.currentMin) {
          return false;
        }

        const format = bbn.fn.isFunction(this.currentCfg.startFormat) ? this.currentCfg.startFormat() : this.currentCfg.startFormat;
        const date = this.type === 'days' ? bbn.dt(this.firstDayVisible?.value) : this.currentDate;
        const check = date.subtract(...this.currentCfg.step).endOf('month').format(format);
        return check < this.currentMin.format(format);
      }

      return true;
    },
    isNextDisabled() {
      if (this.currentCfg?.step
        && this.currentCfg?.endFormat
        && ((this.type !== 'days') || this.items.length)
      ) {
        if (!this.currentMax) {
          return false;
        }

        const format = bbn.fn.isFunction(this.currentCfg.endFormat) ? this.currentCfg.endFormat() : this.currentCfg.endFormat;
        const date = this.type === 'days' ? bbn.dt(this.lastDayVisible?.value) : this.currentDate;
        const check = date.add(...this.currentCfg.step).startOf('month').format(format);
        return check > this.currentMax.format(format);
      }

      return true;
    },
    isPrevSkipDisabled(){
      if (this.currentCfg?.stepSkip
        && this.currentCfg?.startFormat
        && ((this.type !== 'days') || this.items.length)
      ) {
        if (!this.currentMin) {
          return false;
        }

        const format = bbn.fn.isFunction(this.currentCfg.startFormat) ? this.currentCfg.startFormat() : this.currentCfg.startFormat;
        const date = this.type === 'days' ? bbn.dt(this.firstDayVisible?.value) : this.currentDate;
        const check = date.subtract(...this.currentCfg.stepSkip).endOf('month').format(format);
        return check < this.currentMin.format(format);
      }

      return true;
    },
    isNextSkipDisabled() {
      if (this.currentCfg?.stepSkip
        && this.currentCfg?.endFormat
        && ((this.type !== 'days') || this.items.length)
      ) {
        if (!this.currentMax) {
          return false;
        }

        const format = bbn.fn.isFunction(this.currentCfg.endFormat) ? this.currentCfg.endFormat() : this.currentCfg.endFormat;
        const date = this.type === 'days' ? bbn.dt(this.lastDayVisible?.value) : this.currentDate;
        const check = date.add(...this.currentCfg.stepSkip).startOf('month').format(format);
        return check > this.currentMax.format(format);
      }

      return true;
    },
    startDate() {
      if (this.mode === 'range' && this.start) {
        return bbn.dt(this.start);
      }

      return null;
    },
    endDate() {
      if (this.mode === 'range' && this.end) {
        return bbn.dt(this.end);
      }

      return null;
    },
    lastDate() {
      if (this.startDate && this.endDate && this.firstSelectedDate) {
        return bbn.dt(this.firstSelectedDate).isSame(this.startDate, 'd') ? this.endDate : this.startDate;
      }

      return null;
    },
    statusText() {
      if (this.currentCfg.statusFormat) {
        if (this.mode === 'range') {
          if (this.startDate && this.endDate) {
            return this.startDate.format(this.currentCfg.statusFormat) + ' - ' + this.endDate.format(this.currentCfg.statusFormat);
          }
          else {
            return bbn._('Not selected');
          }
        }
        else if (this.currentDate && this.currentDate.isValid) {
          return this.currentDate.format(this.currentCfg.statusFormat);
        }
        return '';
      }
      else if (this.mode === 'range') {
        if (this.startDate && this.endDate) {
          return this.startDate.fdate(false, this.time) + ' - ' + this.endDate.fdate(false, this.time);
        }

        return bbn._('Not selected');
      }
      else {
        if (this.currentDate && this.currentDate.isValid) {
          return this.currentDate.fdate(false, this.time);
        }

        return '';
      }
    }
  },
  methods: {
    onTimeClose() {
      if ((this.mode === 'range') && this.start && this.end && this.time) {
        bbn.fn.log('onTimeClose', this.start, this.end);
        this.$emit('selected', [this.start, this.end], this, this.currentCfg.valueFormat);
        this.$origin.isOpened = false;
      }
    },
    onTimeChange(v, date, cp) {
      if (v) {
        if (this.mode === 'range') {
          if (this.startDate && this.startDate.isSame(date, 'd')) {
            const formatted = this.startDate.time(v).format(this.currentCfg.valueFormat);
            this.$emit('input:start', formatted);
            bbn.fn.log("Emitted", formatted);
          }
          else if (this.endDate && this.endDate.isSame(date, 'd')) {
            const formatted = this.endDate.time(v).format(this.currentCfg.valueFormat);
            this.$emit('input:end', formatted);
            bbn.fn.log("Emitted", formatted);
          }
          else if (this.rangeSelected.length && bbn.dt(this.rangeSelected[0], this.currentCfg.valueFormat).isSame(date, 'd')) {
            const dt = bbn.dt(this.rangeSelected[0], this.currentCfg.valueFormat).time(v);
            this.rangeSelected[0] = dt.format(this.currentCfg.valueFormat);
          }
          else {
            throw new Error("In range mode, the date must be either the start or the end date");
          }
        }
        else {
          this.currentDate.time(v);
          this.$emit('input', this.currentDate.format(this.currentCfg.valueFormat));
          this.$emit('change', this.currentDate.format(this.currentCfg.valueFormat));
        }
      }

      if (cp && cp.$origin.close) {
        cp.$origin.close();
      }
    },
    getDateObject(val, cfg) {
      if (!val) {
        return null;
      }

      let d = bbn.dt(val, (cfg || this.currentCfg).valueFormat, this.time ? 'dateTime' : 'date');
      if (!d.isValid) {
        d = bbn.dt(val, undefined, this.time ? 'dateTime' : 'date');
      }

      return d;
    },
    isInRange(value) {
      if (this.startDate && this.endDate) {
        const fmt = bbn.dt(value, this.currentCfg.valueFormat).format('YYYYMMDD');
        return fmt >= this.startDate.format('YYYYMMDD') && fmt <= this.endDate.format('YYYYMMDD');
      }

      return false;
    },
    isInTmpRange(value) {
      if (this.rangeSelected.length) {
        const r = this.rangeSelected.slice().sort();

        if (this.maxRange) {
          if (bbn.dt(r[0]).diff(value, this.type, true) > this.maxRange) {
            return false;
          }
        }
        if (this.minRange) {
          if (bbn.dt(r[0]).diff(value, this.type, true) < this.minRange) {
            return false;
          }
        }

        if (r.length === 2) {
          return value >= r[0] && value <= r[1];
        }
      }

      return false;
    },
    mouseenterItem(item, ev) {
      if (ev.target.querySelector('bbn-floater')) {
        return;
      }
      if (this.selection && !item.disabled) {
        if ((this.mode === 'range') && this.rangeSelected.length) {
          this.rangeSelected.push(item.value);
        }

        item.over = true;
      }
      //bbn.fn.log(['mouseenter', item, !!(this.selection && item.over && !item.disabled)]);
    },
    mouseleaveItem(item, ev) {
      if (ev.target.querySelector('bbn-floater')) {
        return;
      }
      if (this.selection && !item.disabled) {
        if ((this.mode === 'range') && (this.rangeSelected.length === 2)) {
          this.rangeSelected.pop();
        }

        item.over = false;
      }
      //bbn.fn.log(['mouseleave', item, !!(this.selection && item.over && !item.disabled)]);
    },
    _makeDays() {
      const result = buildDaysView(this);
      this.items = result.months;
      this.gridStyle = result.gridStyle;
      this.firstDayVisible = result.firstDayVisible;
      this.lastDayVisible = result.lastDayVisible;
    },

    _makeWeeks() {
      const result = buildWeeksView(this);
      this.items.splice(0, this.items.length, ...result.items);
      this.gridStyle = result.gridStyle;
      this.currentLabelsDates = result.currentLabelsDates;
    },

    _makeMonths() {
      const result = buildMonthsView(this);
      this.items.splice(0, this.items.length, ...result.items);
      this.gridStyle = result.gridStyle;
      this.currentLabelsDates = [];
    },

    _makeYears() {
      const result = buildYearsView(this);
      this.items.splice(0, this.items.length, ...result.items);
      this.gridStyle = result.gridStyle;
      this.currentLabelsDates = [];
    },

    /**
     * Returns the correct configuration based on the calendar type.
     *
     * @method getCfg
     * @return {Object}
     */
    getCfg(type){
      let m = type || this.type,
          cfg = {};
      switch ( m ){
        case 'days':
          bbn.fn.extend(cfg, {
            make: this._makeDays,
            step: [1, 'M'],
            stepSkip: [1, 'y'],
            stepEvent: [1, 'd'],
            stepText: bbn._('month'),
            stepSkipText: bbn._('year'),
            titleFormat: 'MMM YYYY',
            valueFormat: this.time ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD',
            labelsFormatDefault: 'short',
            labelsFormatLetter: 'narrow',
            labelsFormatAbbr: 'short',
            labelsFormatFull: 'long',
            startFormat: 'YYYY-MM-01',
            endFormat: () => {
              return 'YYYY-MM-' + this.currentDate.daysInMonth()
            },
            startExtra: [7, 'd'],
            endExtra: [15, 'd']
          });
          break;
        case 'weeks':
          bbn.fn.extend(cfg, {
            make: this._makeWeeks,
            step: [1, 'w'],
            stepEvent: [1, 'w'],
            stepText: bbn._('week'),
            titleFormat: 'MMM YYYY',
            valueFormat: 'YYYY-MM-DD',
            labelsFormatDefault: 'ddd',
            labelsFormatLetter: 'dd',
            labelsFormatAbbr: 'ddd',
            labelsFormatFull: 'dddd',
            startFormat: () => {
              return this.currentDate.setWeekday(0).format('YYYY-MM-DD');
            },
            endFormat: () => {
              return this.currentDate.setWeekday(6).format('YYYY-MM-DD');
            }
          });
          break;
        case 'months':
          bbn.fn.extend(cfg, {
            make: this._makeMonths,
            step: [1, 'y'],
            stepEvent: [1, 'M'],
            stepText: bbn._('year'),
            titleFormat: 'YYYY',
            valueFormat: 'YYYY-MM',
            startFormat: 'YYYY-01-01',
            endFormat: 'YYYY-12-31'
          });
          break;
        case 'years':
          bbn.fn.extend(cfg, {
            make: this._makeYears,
            step: [10, 'y'],
            stepEvent: [1, 'y'],
            stepText: bbn._('decade'),
            titleFormat: () => {
              let from = this.currentDate.format('YYYY') - 5,
                  to = from + 9;
              return from + '-' + to;
            },
            valueFormat: 'YYYY',
            startFormat: () => {
              return (this.currentDate.format('YYYY') - 5) + '-01-01';
            },
            endFormat: () => {
              return (this.currentDate.format('YYYY') + 4) + '-12-31';
            }
          });
          break;
      }
      return cfg;
    },
    /**
     * Returns the correct labels' format.
     *
     * @method getLabelsFormat
     * @return {String|false}
     */
    getLabelsFormat(){
      if ( this.labels ){
        switch ( this.labels ){
          case 'letter':
          case 'narrow':
            return 'narrow';
          case 'abbr':
          case 'short':
            return 'short';
          case 'full':
            return 'long';
          default:
            return 'long';
        }
      }

      return false;
    },
    /**
     * Called to the component mounted setting currentDate at max or min.
     *
     * @method create
     * @fires init
     * @fires setTitle
     * @fires updateData
     */
    create(){
      if ( !this.ready ){
        this.$once('dataloaded', () => {
          this.init();
          this.$nextTick(() => {
            if ( !this.date && ( this.max || this.min) ){
              if ( this.max && !this.min && (this.max < this.currentDate.format(this.currentCfg.valueFormat)) ){
                this.currentDate = bbn.dt(this.max, this.currentCfg.valueFormat);
              }
              if ( this.min && !this.max && (this.min > this.currentDate.format(this.currentCfg.valueFormat)) ){
                this.currentDate = bbn.dt(this.min, this.currentCfg.valueFormat);
              }
              this.currentCfg.make();
              this.setTitle();
              if (this.time) {
                this.$nextTick(() => {
                  this.wheelHeight = this.getRef('calendar').clientHeight;
                })
              }
            }
            this.ready = true;
          });
        });
        this.updateData();
      }
    },
    /**
     * Defines and inserts events.
     *
     * @method makeEvents
     */
    makeEvents(){
      this.$set(this, 'events', {});
      bbn.fn.each(this.currentData, d => {
        let tmpStart = bbn.dt(d.data[this.startField], this.startFormat).format(this.currentCfg.valueFormat),
            tmpEnd = bbn.dt(d.data[this.endField], this.endFormat).format(this.currentCfg.valueFormat);
        if ( this.events[tmpStart] === undefined ){
          this.events[tmpStart] = [];
        }
        this.events[tmpStart].push(d.data);
        if ( tmpStart !== tmpEnd ){
          let mom = bbn.dt(tmpStart, this.currentCfg.valueFormat).add(...this.currentCfg.stepEvent),
              tmp = mom.format(this.currentCfg.valueFormat);
          while ( tmp <= tmpEnd ){
            if ( this.events[tmp] === undefined ){
              this.events[tmp] = [];
            }
            this.events[tmp].push(d.data);
            mom.add(...this.currentCfg.stepEvent);
            tmp = mom.format(this.currentCfg.valueFormat);
          }
        }
      });
    },
    /**
     * Initializes the calendar.
     *
     * @method init
     * @fires currentCfg.make
     * @fires makeEvents
     * @fires setTitle
     * @fires setLabels
     * @emits input
     */
    init(){
      if ( this.currentCfg && bbn.fn.isFunction(this.currentCfg.make) ){
        if ( this.selection && this.autoSelection && this.currentCfg.valueFormat ){
          this.currentValue = this.value ? bbn.dt(this.value, this.currentCfg.valueFormat).format(this.currentCfg.valueFormat) : '';
          this.$emit('input', this.currentValue);
        }
        this.makeEvents();
        this.setTitle();
        this.currentCfg.make();
        this.$nextTick(() => {
          this.setLabels(this.currentLabelsDates);
          this.$emit('init', true)
          if (this.time) {
            this.$nextTick(() => {
              this.wheelHeight = this.getRef('calendar').clientHeight;
            })
          }
        });
      }
    },
    /**
     * Filters the events.
     *
     * @method filterEvents
     * @param {String} v
     * @return {Array}
    */
    filterEvents(v){
      return  []
      if ( this.startField && this.endField ){
        return this.currentData && bbn.fn.isArray(this.currentData) ?
          bbn.fn.map(bbn.fn.filter(this.currentData, ev => {
            if ( ev.data[this.startField] && ev.data[this.endField] ){
              let start = bbn.dt(ev.data[this.startField], this.startFormat).format(this.currentCfg.valueFormat),
                  end = bbn.dt(ev.data[this.endField], this.endFormat).format(this.currentCfg.valueFormat)
              return (start <= v) && (end >= v)
            }
            return false
          }), ev => {
            return ev.data
          }) :
          []
      }
      return []
    },
    /**
     * Sets the calendar's title.
     *
     * @method setTitle
     * @fires currentCfg.titleFormat
    */
    setTitle(){
      if ( this.currentCfg && this.currentCfg.titleFormat ){
        this.$set(this, 'currentTitle', bbn.fn.isFunction(this.currentCfg.titleFormat) ?
          this.currentCfg.titleFormat() :
          this.currentDate.format(this.currentCfg.titleFormat)
        );
      }
    },
    /**
     * Refreshes the data
     *
     * @method refresh
     * @param {Boolean} force
     * @fires updateData
     * @fires init
     * @emits dataLoad
     * @emits dataLoaded
    */
    refresh(force){
      if ( !force ){
        let ev = new Event('dataload', {cancelable: true});
        this.$emit('dataload', ev, this);
        if (ev.defaultPrevented) {
          return false;
        }
      }
      this.$once('dataloaded', () => {
        this.init();
      });
      this.updateData();
    },
    /**
     * Changes the current calendar view to the next period.
     *
     * @method next
     * @param {Boolean} skip
     * @fires refresh
     * @emits next
    */
    next(skip){
      if (this.isNextDisabled || (skip && this.isNextSkipDisabled)) {
        return;
      }

      skip = typeof skip === 'boolean' ? skip : false;
      if ( this.currentCfg && this.currentCfg.step && bbn.fn.isFunction(this.currentCfg.make) ){
        let check = bbn.dt(this.currentDate).add(...this.currentCfg[skip && this.currentCfg.stepSkip ? 'stepSkip' : 'step']);
        this.currentDate = (this.currentMax && check.isAfter(this.currentMax) ? this.currentMax : check);
        bbn.fn.log(this.currentDate.format(this.currentCfg.valueFormat));
        let ev = new Event('next', {cancelable: true});
        this.$emit('next', ev, this);
        if (ev.defaultPrevented) {
          return false;
        }
        this.refresh();
      }
    },
    /**
     * Changes the current calendar view to the previous period.
     *
     * @method prev
     * @param {Boolean} skip
     * @fires refresh
     * @emits prev
    */
    prev(skip) {
      if (this.isPrevDisabled || (skip && this.isPrevSkipDisabled)) {
        return;
      }

      skip = typeof skip === 'boolean' ? skip : false;
      if ( this.currentCfg && this.currentCfg.step && bbn.fn.isFunction(this.currentCfg.make) ){
        let check = bbn.dt(this.currentDate).subtract(...this.currentCfg[skip && this.currentCfg.stepSkip ? 'stepSkip' : 'step']);
        this.currentDate = (this.currentMin && check.isBefore(this.currentMin) ? this.currentMin : check);
        bbn.fn.log(this.currentDate.format(this.currentCfg.valueFormat));
        let ev = new Event('prev');
        this.$emit('prev', ev, this);
        if (ev.defaultPrevented) {
          return false;
        }
        this.refresh();
      }
    },
    /**
     * Changes the current value after a selection.
     *
     * @method select
     * @param {String} val The selected day
     * @param {Boolean} [undefined] notEmit If true, the 'selected' emit will not be performed
     * @emits input
     * @emits selected
    */
    select(val, notEmit, event){
      bbn.fn.log("SELECT " + val);
      if (this.selection && val) {
        const dt = bbn.dt(val, this.currentCfg.valueFormat);
        if (!dt.isValid) {
          return;
        }

        if (this.mode === 'range') {
          if (this.start) {
            this.$emit('input:start', '');
            this.$emit('input:end', '');
            this.rangeSelected.splice(0);
          }

          if (!this.rangeSelected.length) {
            this.rangeSelected.push(val);
          }
          else {
            if (this.rangeSelected.length === 2) {
              this.rangeSelected.pop();
            }

            const firstDate = bbn.dt(this.rangeSelected[0], this.currentCfg.valueFormat);
            if (dt.isSame(firstDate, 'd')) {
              this.rangeSelected.splice(0, 1);
              return;
            }

            this.rangeSelected.push(val);
            if (!this.isInTmpRange(val)) {
              this.rangeSelected.splice(0, 1);
              return;
            }

            const r = this.rangeSelected.slice().sort();

            this.$emit('input:start', r[0]);
            this.$emit('input:end', r[1]);
            this.rangeSelected.splice(0);
            bbn.fn.each(this.items, month => {
              bbn.fn.each(month.weeks, week => {
                bbn.fn.each(week.days, day => {
                  day.over = false;
                });
              });
            });
            if (!notEmit && !this.time) {
              this.$emit('selected', [r[0], r[1]], this, this.currentCfg.valueFormat);
              /* Don't work
              if (this.time && event?.target) {
                const t = event.target;
                setTimeout(() => {
                  const ctx = t.querySelector('.bbn-context');
                  if (ctx) {
                    ctx.open();
                  }
                }, 250);
              }*/
            }
          }
          return;
        }

        val = val === this.currentValue ? '' : val;
        this.currentValue = val;
        this.$emit('input', val);
        this.currentDate = val ? this.getDateObject(val, this.currentCfg) : null;
        if ( !notEmit ){
          this.$emit('selected', val, this, this.currentCfg.valueFormat);
        }
      }
    },
    /**
     * Additionals data to sent with the ajax call.
     *
     * @method getPostData
     * @return {Object}
    */
    getPostData(){
      let start = bbn.dt(this.currentDate.format(bbn.fn.isFunction(this.currentCfg.startFormat) ?
            this.currentCfg.startFormat() :
            this.currentCfg.startFormat
          )),
          end = bbn.dt(this.currentDate.format(bbn.fn.isFunction(this.currentCfg.endFormat) ?
            this.currentCfg.endFormat() :
            this.currentCfg.endFormat
          )),
          data = {};
      if ( this.extraItems ){
        if ( this.currentCfg.startExtra ){
          start.subtract(...this.currentCfg.startExtra);
        }
        if ( this.currentCfg.endExtra ){
          end.add(...this.currentCfg.endExtra);
        }
      }
      data[this.startField] = start.format(this.startFormat);
      data[this.endField] = end.format(this.endFormat);
      if ( this.data ){
        bbn.fn.extend(data, bbn.fn.isFunction(this.data) ? this.data() : this.data);
      }
      return data;
    },
    /**
     * Sets the labels.
     *
     * @method setLabels
     * @param {Array} d
     * @fires getLabelsFormat
    */
    setLabels(d){
      if ( bbn.fn.isArray(d) && d.length ){
        this.currentLabels = d.map(l => {
          return l[this.getLabelsFormat()];
        });
      }
      else {
        this.currentLabels = [];
      }
    },
    /**
     * Handles the resize.
     *
     * @method onResize
     * @fires setLabels
    */
    onResize(){
      return new Promise((resolve, reject) => {
        this.setLabels(this.currentLabelsDates);
        resolve();
      });
    }
  },
  /**
   * @event mounted
   * @fires create
  */
  mounted(){
    this.create();
  },
  watch: {
    /**
     * @watch type
     * @fires create
    */
    type(newVal){
      this.ready = false;
      this.currentCfg = this.getCfg(newVal);
      this.currentMin = this.getDateObject(this.min);
      this.currentMax = this.getDateObject(this.max);
      this.create();
    },
    /**
     * @watch currentLabelsDates
     * @fires setLabels
    */
    currentLabelsDates(newVal){
      this.setLabels(newVal);
    },
    /**
     * @watch value
     */
    value(newVal, oldVal){
      if ( newVal !== oldVal ){
        this.currentValue = newVal;
      }
    },
    /**
     * @watch currentData
     * @fires init
    */
    currentData(){
      this.init();
    },
    rangeSelected() {
      bbn.fn.log("Tmp range selected", this.rangeSelected);
      if (this.rangeSelected.length === 1) {
        this.firstSelectedDate = this.rangeSelected[0];
      }
    }
  },
  components: {
    time: {
      mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.input],
      template: `
      <div class="bbn-iblock">
        <bbn-time second="$origin.showSecond"
                  bbn-model="value"
                  :hour-start="$origin.hourStart"
                  :hour-end="$origin.hourEnd"
                  @input="onChange"/>
      </div>
      `,
      props: {
        value: {
          type: String,
          default: '00:00:00'
        },
        date: {
          type: String,
          required: true
        }
      },
      methods: {
        onChange(v) {
          this.$emit('change', v, this.date, this.$origin);
        },
        close() {
          this.closest('bbn-floater').close();
        }
      },
      created() {
        this.$origin.openedTime = this;
      }
    }
  }
};

import cpHtml from './calendar.html';
import cpStyle from './calendar.less';
import cpLang from './_i18n/index.js';
import bbn from '@bbn/bbn';

export default {
  name: 'bbn-calendar',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
