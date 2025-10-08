 /**
  * @file bbn-rating component
  * @description bbn-rating is a component with easy implementation and customization that allows the user to select a rating by clicking on stars.
  * @copyright BBN Solutions
  * @author Mirko Argentino
  * @created 08/10/2025
  */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.events
   * @mixin bbn.cp.mixins.input
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.events,
    bbn.cp.mixins.input
  ],
  props: {
    /**
     * The icon to use for the rating
     * @prop {String} ['nf nf-fa-star'] icon
     */
    icon: {
      type: String,
      default: 'nf nf-fa-star'
    },
    /**
     * The maximum score of the rating
     * @prop {Number} [5] score
     */
    score: {
      type: Number,
      default: 5
    },
    /**
     * The color of the selected icons
     * @prop {String} ['gold'] color
     */
    color: {
      type: String,
      default: 'gold'
    },
    /**
     * The color of the unselected icons
     * @prop {String} ['var(--grey)'] ucolor
     */
    ucolor: {
      type: String,
      default: 'var(--grey)'
    }
  },
  data(){
    return {
      isOver: null
    }
  },
  methods: {
    setValue(n){
      if (!this.isDisabled && !this.readonly) {
        this.emitInput(n);
        this.$emit('change', n);
      }
    },
    getColor(n){
      if (!this.readonly && !this.isDisabled && (this.isOver !== null)) {
        return n <= this.isOver ? this.color : this.ucolor;
      }

      return n <= this.value ? this.color : this.ucolor;
    }
  }
};

import cpHtml from './rating.html';
import cpStyle from './rating.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-rating',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
