/**
 * @file bbn-countdown component
 * @description bbn-countdown is a component that performs a countdown of a user-defined date, based on the measure of time defined in the construction.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 13/02/2017.
*/


/** @todo try this way

 const timestamp = 1519482900000;

 console.log(formatted);*/

 const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.input
  ],
  props: {
    hourStart: {
      type: Number,
      default: 0
    },
    hourEnd: {
      type: Number,
      default: 23
    },
    seconds: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {String} ['clock'] mode
     */
    mode: {
      type: String,
      default: 'auto',
      validator: m => ['auto', 'short', 'full'].includes(m.toLowerCase())
    }
  },
  data() {
    const dt = this.value ? this.value.split(':') : null;
    const currentHour = dt && dt[0] ? parseInt(dt[0]) : null;
    const currentMinute = dt && dt[1] ? parseInt(dt[1]) : 0;
    const currentSecond = dt && dt[2] ? parseInt(dt[2]) : 0;
    const currentMode = 'auto' === this.mode ? (this.seconds ? 'full' : (currentMinute % 5 ? 'full' : 'short')) : this.mode;
    return {
      keyHour: null,
      keyMinute: null,
      keySecond: null,
      showAllMinutes: this.mode !== 'short',
      showAllSeconds: this.mode !== 'short',
      currentHour,
      currentMinute,
      currentSecond,
      currentMode,
      clickedHour: false,
      clickedMinute: false,
      clickedSecond: false
    };
  },
  computed: {
    gridHours() {
      return Math.ceil(this.sourceHours.length / (this.isMobile ? 8 : 4));
    },
    gridMinutes() {
      return Math.ceil(this.sourceMinutes.length / (this.isMobile ? 8 : 4));
    },
    gridSeconds() {
      return Math.ceil(this.sourceSeconds.length / (this.isMobile ? 8 : 4));
    },
    sourceHours() {
      return bbn.fn.range(this.hourStart, this.hourEnd, 1);
    },
    sourceMinutes() {
      const cm = this.currentMode;
      return bbn.fn.range(0, 59, cm === 'four' ? 15 : (cm === 'short' ? 5 : 1));
    },
    sourceSeconds() {
      return bbn.fn.range(0, 59, this.showAllSeconds ? 1 : 5);
    }
  },
  methods: {
    isValid() {
      return !!((this.currentHour !== null)
        && (this.currentMinute !== null)
        && (this.currentSecond !== null));
    },
    isFullyClicked() {
      return !!((this.clickedHour)
        && (this.clickedMinute)
        && (this.clickedSecond || !this.seconds));
    },
    getValue() {
      if (this.isValid()) {
        return this.currentHour.toString().padStart(2, '0') + ':' + this.currentMinute.toString().padStart(2, '0') + ':' + (this.currentSecond ? this.currentSecond.toString().padStart(2, '0') : '00');
      }
      return null;
    },
    onClick(unit, value) {
      bbn.fn.log(["CLICK", unit, value]);
      switch (unit) {
        case 'H':
          if (value !== this.currentHour) {
            this.currentHour = value;
          }
          else if (this.clickedHour) {
            if (this.isValid()) {
              this.emitInput(this.getValue());
            }
          }
          this.clickedHour = true;
          if (this.isFullyClicked()) {
            this.emitInput(this.getValue());
          }
          break;
        case 'i':
          if (value !== this.currentMinute) {
            this.currentMinute = value;
          }
          else if (this.clickedMinute) {
            if (this.isValid()) {
              this.emitInput(this.getValue());
            }
          }
          this.clickedMinute = true;
          if (this.isFullyClicked()) {
            bbn.fn.log("EMITTING INPUT", this.getValue());
            this.emitInput(this.getValue());
          }
          break;
        case 's':
          if (value !== this.currentSecond) {
            this.currentSecond = value;
          }
          else if (this.clickedSecond) {
            if (this.isValid()) {
              this.emitInput(this.getValue());
            }
          }
          this.clickedSecond = true;
          if (this.isFullyClicked()) {
            this.emitInput(this.getValue());
          }
          break;
      }
    },
    onKeyDown(unit) {

    }
  },
};

import cpHtml from './time.html';
import cpLang from './_i18n/index.js';
import bbn from '@bbn/bbn';

export default {
  name: 'bbn-time',
  definition: cpDef,
  template: cpHtml,
  lang: cpLang
};
