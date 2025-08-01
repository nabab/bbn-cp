/**
 * @file bbn-block component
 * @description bbn-block
 * @copyright BBN Solutions
 * @author Loredana Bruno
 * @created 09/11/2020.
 */
const cpDef = {
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

import cpHtml from './cursor.html';
import cpStyle from './cursor.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-cursor',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
