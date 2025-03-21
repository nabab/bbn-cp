/**
 * @file bbn-combo component
 * @description The easy-to-implement bbn-combo component allows you to choose a single value from a user-supplied list or to write new.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 10/02/2017.
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.events
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.resizer
     * @mixin bbn.cp.mixins.list
     * @mixin bbn.cp.mixins.keynav
     * @mixin bbn.cp.mixins.url
     * @mixin bbn.cp.mixins.dropdown
      */
    mixins: [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.events,
      bbn.cp.mixins.input,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.list,
      bbn.cp.mixins.keynav,
      bbn.cp.mixins.url,
      bbn.cp.mixins.dropdown
    ],
    props: {
      /**
       * Set to true allows the columns of the list to be filtered. A filter icon will appear at the top of each column.The property can be given to each column to define different behaviour.
       * @prop {Boolean} [true] filterable
       */
      filterable: {
        type: Boolean,
        default: true
      },
      /**
       * To define the length of the string to start the filter.
       *
       * @prop {Number} [0] minLength
       */
      minLength: {
        type: Number,
        default: 0
      },
      /**
       * Specifies the time of delay.
       *
       * @prop {Number} [10] delay
       */
      delay: {
        type: Number,
        default: 10
      },
    },
    data() {
      return {
        filterString: this.value
      }
    },
    methods: {
      /**
       * Puts the focus on the element.
       *
       * @method onClick
       * @fires getRef
       */
      onClick(){
        if ( !this.isDisabled && !this.readnly ){
          this.getRef('input').focus();
          if ( this.filteredData.length ){
            this.isOpened = !this.isOpened;
          }
        }
      },
      /**
       * Remove the filter and close the list if it is notabove it.
       *
       * @method leave
       * @fires getRef
       */
      leave(){
        if ( this.isOpened && !this.getRef('list').isOver ){
          this.isOpened = false;
        }
      },
      /**
       * Emits the event 'select'
       * @method select
       * @param {Object} item
       * @fires emitInput
       * @fires getRef
       * @emit change
       */
      select(item){
        if ( item && (item[this.sourceValue] !== undefined) ){
          this.writing = false;
          this.emitInput(item[this.sourceValue]);
          this.$emit('change', item[this.sourceValue]);
          this.filterString = item[this.sourceText];
          this.$nextTick(() => {
            this.getRef('input').focus();
          });
        }
        this.isOpened = false;
      },
      /**
       * Select the string of text inside of the input.
       * @method selectText
       * @fires getRef
       */
      selectText(){
        this.getRef('input').selectText();
      },
      /**
       * Function to do the reset and if the component is open it closes it.
       *
       * @method resetDropdown
       * @fires unfilter
       */
      resetDropdown(){
        this.filterString = this.currentTextValue;
        this.unfilter();
        if ( this.isOpened ){
          this.isOpened = false;
        }
      },
      /**
       * Function that performs different actions based on what is being pressed.
       *
       * @method keydown
       * @param {Event} e
       * @fires resetDropdown
       * @fires commonKeydown
       * @fires keynav
       */
      onKeydown(e) {
        if (e.key === 'Tab') {
          let list = this.getRef('list');
          list = list ? list.getRef('list') : {};
          if ( list.overIdx > -1 ) {
            this.filterString = list.filteredData[list.overIdx].data[this.sourceValue];
            return;
          }
        }
        if ((e.key === ' ') || this.commonKeydown(e)) {
          return;
        }
        if (e.key === 'Escape') {
          this.resetDropdown();
        }
        else if (bbn.var.keys.upDown.includes(e.keyCode)) {
          this.keynav(e);
        }
        else if ( !this.isDisabled || !this.readonly ){
          this.writing = true;
        }
      },
    },
    /**
     * @event created
     * @fires emitInput
     */
    created(){
      this.$on('dataloaded', () => {
        if ( this.value !== undefined ){
          let row = bbn.fn.getRow(this.currentData, a => {
            return a.data[this.sourceValue] === this.value;
          });
          if ( row ){
            this.currentText = row.data[this.sourceText];
          }
        }
        if ( !this.currentText && !this.isNullable && this.filteredData.length ){
          this.emitInput(this.filteredData[0][this.sourceValue]);
        }
      });
    },
    watch: {
      /**
       * @watch filterString
       * @param {String} v
       * @fires onResize
       * @fires unfilter
       * @fires emitInput
       */
      filterString(v){
        if ( !this.ready ){
          this.ready = true;
        }
        clearTimeout(this.filterTimeout);
        if ( this.writing ){
          this.filterTimeout = setTimeout(() => {
            this.filterTimeout = false;
            if (this.isActive) {
              if (v && (v.length >= this.minLength)) {
                this.currentFilters.conditions.splice(0, this.currentFilters.conditions.length ? 1 : 0, {
                  field: this.sourceText,
                  operator: this.searchOperator,
                  value: v
                });
              }
              else {
                this.unfilter();
                this.enptyData();
              }
            }
            this.emitInput(v);
          }, this.delay);
        }
      },
      filteredTotal() {
        let fl = this.getRef('list');
        if (this.isOpened && fl) {
          fl.fullResize();
        }
      }
    }
  };

import cpHtml from './combo.html';
import cpStyle from './combo.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/combo.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-combo',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
