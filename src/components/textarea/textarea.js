/**
 * @file bbn-textarea component
 *
 * @description bbn-textarea is an easy to configure component, it represents a multiline text field, in which it is possible to assign an initial value among the various configurations, validate the content and provide a maximum number of characters that can be inserted.
 * You can define actions on the events activated on it.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
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
       * The number of rows of the textarea.
       * @prop {Number} rows
       */
			rows: {
				validator: bbn.fn.isNumber
      },
      /**
       * The number of columns of the textarea.
       * @prop {Number} cols
       */
			cols: {
				validator: bbn.fn.isNumber
      },
      /**
       * Sets the textarea resizable
       * @prop {Boolean} [true] resizable
       */
      resizable: {
        type: Boolean,
        default: true
      },
      /**
       * Sets the textarea resizable
       * @prop {Boolean} [true] resizable
       */
      autosize: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentValue: this.value,
        currentHeight: null,
        resizeTimeout: null
      }
    },
    computed: {
      currentRows() {
        if (this.rows) {
          return this.rows;
        }

        if (this.autosize) {
          return 1;
        }

        return undefined;
      },
      currentStyle() {
        const st = {resize: 'none'};
        if (this.resizable) {
          st.resize = bbn.fn.isString(this.resizable) ? this.resizable : 'both';
        }
        if (this.currentHeight) {
          st.height = this.currentHeight + 'px';
        }

        return st;
      }
    },
    methods: {
      onInput(e) {
        if (this.maxlength && (parseInt(this.maxlength) > -1) && (e.target.value.length > parseInt(this.maxlength))) {
          this.emitInput(this.value);
          return;
        }

        if (this.autosize) {
          e.target.style.height = 'auto';
          this.currentHeight = e.target.scrollHeight;
          e.target.style.height = e.target.scrollHeight + 'px';
        }

        this.emitInput(e.target.value)
      },
      /**
       * @method textareaKeydown
       * @param {Event} ev
       * @fires keydown
       */
      textareaKeydown(ev) {
        if (this.maxlength && (parseInt(this.maxlength) > -1) && (this.value.length >= parseInt(this.maxlength))) {
          ev.preventDefault();
        }
        else {
          this.onKeydown(ev);
        }
      },
      /**
       * Clears the textarea.
       * @method clear
       * @fires emitInput
       */
      clear(){
        bbn.fn.log("CLEAR")
        this.emitInput('');
      }
    },
    created() {
      if ((this.$node.model.value || this.$node.model._default_).value !== this.value) {
        this.currentValue = (this.$node.model.value || this.$node.model._default_).value;
      }
    },
    /**
     * Sets the prop ready to true.
     * @event mounted
     */
    mounted() {
      this.ready = true;
      const el = this.getRef('element');
      if (this.currentValue) {
        el.defaultValue = this.currentValue;
      }

      if (this.autosize) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight+'px';
      }

    },
    watch: {
      value(v) {
        const el = this.getRef('element');
        if (this.currentValue !== v) {
          this.currentValue = v;
        }
      },
      currentValue(v) {
        const el = this.getRef('element');
        if (el.value !== v) {
          el.value = v;
        }

        if (this.value !== v) {
          this.emitInput(v);
        }
      }
    }
  };

import cpHtml from './textarea.html';
import cpStyle from './textarea.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-textarea',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
