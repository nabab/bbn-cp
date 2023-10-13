/**
 * @file bbn-block component
 * @description bbn-block
 * @copyright BBN Solutions
 * @author Loredana Bruno
 * @created 09/11/2020.
 */
export default {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.events
     * @mixin bbn.cp.mixins.input
     */
    mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.events,
      bbn.cp.mixins.input
    ],
    props: {
      /**
       * @prop {Number} [1] step
       */
      step: {
        type: Number,
        default: 1
      },
      /**
       * The aduio's URL
       */
      /*source: {
        type: Number,
        required: true
      },*/
      /**
       * The audio's title
       * {String} [''] title
       */
      /**
       * @prop {Number} [0] min
       */
      min: {
        type: Number,
        default: 0
      },
      /**
       * @prop {Number} [500] max
       */
      max: {
        type: Number,
        default: 500
      },
      /**
       * @prop {String} [''] title
       */
      title: {
        type: String,
        default: ''
      },
      /**
       * @prop {(Number|String)} [] value
       */
      value: {
        type: Number | String,
      },
      /**
       * @prop {String} [''] unit
       */
      unit: {
        type: String,
        default: ''
      }
    },
    computed: {
      label(){
        return this.value
      }
    }
  };
