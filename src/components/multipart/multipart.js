/**
 * @file bbn-form component
 *
 * @description bbn-form is a component that allows you to quickly generate and process web forms.
 * 
 * Validation and custom control can be defined before data is sent to the back-end system.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.localStorage
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.localStorage
    ],
    props: {
      /**
       * @todo not used
       * @prop {Boolean} [false] autocomplete
       */
      autocomplete: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true to enable the form's buttons without changing the form's content.
       *
       * @prop {Boolean} [false] prefilled
       */
      prefilled: {
        type: Boolean,
        default: false
      },
      /**
       * A confirmation popup with a costumized message shown before leaving the form.
       *
       * @prop {String|Function} confirmLeave
       */
      confirmLeave: {
        type: [Boolean, String, Function],
        default(){
          return bbn._("Are you sure you want to leave?");
        }
      },
      /**
       * Set to true to disable the form.
       * @prop {Boolean} [false] disabled
       */
      disabled: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {} script
       */
      script: {},
      /**
       * @prop {} scrollable
       */
      scrollable: {},
      /**
       * @prop {} scrollContent
       */
      scrollContent: {},
      /**
       * The list of fields the form must contain.
       * @prop {} fields
       */
      fields: {},
      /**
       * Set to true to make a postOut instead of a post when the form is submitted.
       *
       * @prop {Boolean} [false] blank
       */
      blank: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true to give the attribute target the value '_self'.
       * @prop {Boolean} [false] self
       */
			self: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {String} target
       */
      target: {
        type: String
      },
      /**
       * A confirmation popup with a costumized message shown before the form is submitted.
       *
       * @prop {(String|Function)} confirmMessage
       */
      confirmMessage: {
        type: [String, Function]
      },
      /**
       * A confirmation popup with a costumized message shown before leaving the form.
       *
       * @prop {(String|Function)} confirmLeave
       */
      confirmLeave: {
        type: [Boolean, String, Function],
        default(){
          return bbn._("Are you sure you want to discard the changes you made in this form?");
        }
      },
      /**
       * The url contacted when submitting the form.
       *
       * @prop {String} action
       */
      action: {
        type: String
      },
      /**
       * A method called after a form is correctly submitted.
       *
       * @prop {Function} success
       */
      success: {
        type: Function
      },
      /**
       * A method called after a form submission fails.
       *
       * @prop {Function} failure
       */ 
      failure: {
        type: Function
      },
      /**
       * A popup with a costumized message shown after a form is correctly submitted.
       *
       * @prop {(String|Function)} successMessage
       */
      successMessage: {
        type: [String, Function]
      },
      /**
       * A popup with a costumized message shown after a form submission fails.
       *
       * @prop {(String|Function)} failureMessage
       */
      failureMessage: {
        type: [String, Function]
      },
      /**
       * The form's method of submission.
       *
       * @prop {String} [post] method
       */
      method: {
        type: String,
        default: 'post'
      },
      /**
       * The buttons shown on the form.
       *
       * @prop {(Boolean|Array)} ['cancel', 'submit'] buttons
       */
      buttons: {
        type: [Boolean, Array],
        default(){
          return ['cancel', 'submit'];
        }
      },
      /**
       * The proper data used in the form.
       *
       * @prop {Object} source
       */
      // This is the proper data used in the form
      source: {
        type: Object,
        default(){
          return {}
        }
      },
      /**
       * The additional data to be sent by the form.
       *
       * @prop {Object} data
       */
      // This is additional data to be sent by the form
      data: {
        type: Object
      },
      /**
       * Set to true to fix the form's footer.
       *
       * @prop {Boolean} [true] fixedFooter
       */
      fixedFooter: {
        type: Boolean,
        default: false
      },
      /**
       * The form's schema generating the inputs.
       *
       * @prop {Array} [[]] schema
       */
      // That will be a form schema generating the inputs
      schema: {
        type: Array,
        default: function(){
          return [];
        }
      },
      // Sets if it is the data property which must be sent, or the content of the named fields
      // (in this case names are not necessary on form inputs)
      /**
       * Set to true if the data property must be sent.
       *
       * @prop {Boolean} [true] sendModel
       */
      sendModel: {
        type: Boolean,
        default: true
      },
      /**
       * Checks the fields' data before submitting the form.
       *
       * @prop {Function} validation
       */
      validation: {
        type: Function
      },
      /**
       * If true, will consider itself as a unique element of a floater and will have its buttons incorporated in it 
       * whereas if undefined will.
       *
       * @prop {(Boolean|String)} windowed
       */
      windowed: {
        type: [Boolean, String],
        default: 'auto'
      },
      /**
       * If true, will use the class bbn-overlay for its container.
       *
       * @prop {Boolean} fullSize
       */
      fullSize: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {String} [''] def
       */
      def: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        router: null,
        form: null,
        isFocusing: false
      }
    },
    computed: {
      hasPrev() {
        return this.router && (this.router.views[this.router.selected-1] !== undefined);
      },
      hasNext() {
        return this.router && (this.router.views[this.router.selected+1] !== undefined);
      }
    },
    methods: {
      prev(){
        if (this.router) {
          this.router.prev();
        }
      },
      next(){
        if (this.router) {
          this.router.next();
        }
      },
      init(){
        this.router = this.getRef('router');
        this.form = this.getRef('form');
        setTimeout(() => {
          this.router.route(this.router.getDefaultURL(), true);
        }, 100)
      },
      onReset() {
        this.unsetStorage();
        this.$emit('reset');
      },
      focusout(e){
        bbn.fn.log("FOCUSING OUT")
      },
      leaveBefore(e){
        if (this.hasPrev) {
          this.router.prev();
          this.isFocusing = true;
          setTimeout(() => {
            this.form.focusLast();
            this.isFocusing = false;
          }, 100)
        }
      },
      leaveAfter(e){
        if (this.hasNext) {
          this.router.next();
          this.isFocusing = true;
          setTimeout(() => {
            this.form.focusFirst();
            this.isFocusing = false;
          }, 100)
        }
      },
      onRoute(){
        this.$forceUpdate();
        if (!this.isFocusing) {
          this.form.focusFirst();
        }
      },
    }
  };
  
import cpHtml from './multipart.html';
import cpStyle from './multipart.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/multipart.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-multipart',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
