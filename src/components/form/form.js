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
  tag: 'form',
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
     * @prop {Boolean} autofocus
     */
    autofocus: {
      type: Boolean,
      default() {
        return !bbn.fn.isMobile()
      }
    },
    /**
     *@tood not used
     * @ {Boolean} [false] autocomplete
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
     * Set to true to disable the form.
     * @prop {Boolean} [false] disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * The list of fields the form must contain.
     * @prop {} script
     */
    script: {},
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
     * @prop {String|Function} confirmMessage
     */
    confirmMessage: {
      type: [String, Function]
    },
    /**
     * A confirmation popup with a costumized message shown before leaving the form.
     *
     * @prop {String|Function} confirmLeave
     */
    confirmLeave: {
      type: [Boolean, String, Function],
      default() {
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
     * @prop {String|Function} successMessage
     */
    successMessage: {
      type: [String, Function]
    },
    /**
     * A popup with a costumized message shown after a form submission fails.
     *
     * @prop {String|Function} failureMessage
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
     * Set to true to enable form scrolling.
     *
     * @prop {Boolean} [true] scrollable
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * Set to true to keep the scrollbars visible
     *
     * @prop {Boolean} [false] keepScrollVisible
     */
    keepScrollVisible: {
      type: Boolean,
      default: false
    },
    /**
     * The buttons shown on the form.
     *
     * @prop {Boolean|Array} ['cancel', 'submit'] buttons
     */
    buttons: {
      type: [Boolean, Array],
      default() {
        return ['cancel', 'submit'];
      }
    },
    /**
     * The form's text on submit button.
     *
     * @prop {String} [Submit] submitText
     */
    submitText: {
      type: String,
      default() {
        return bbn._('Submit');
      }
    },
    /**
     * The form's text on cancel button.
     *
     * @prop {String} [Cancel] cancelText
     */
    cancelText: {
      type: String,
      default() {
        return bbn._('Cancel');
      }
    },
    /**
     * The form's text on reset button.
     *
     * @prop {String} [Reset] resetText
     */
    resetText: {
      type: String,
      default() {
        return bbn._('Reset');
      }
    },
    /**
     * The submit button's icon.
     *
     * @prop {String} ['nf nf-fa-check_circle'] submitIcon
     */
    submitIcon: {
      type: String,
      default: 'nf nf-fa-check_circle'
    },
    /**
     * The cancel button's icon.
     *
     * @prop {String} ['nf nf-fa-times_circle'] cancelIcon
     */
    cancelIcon: {
      type: String,
      default: 'nf nf-fa-times_circle'
    },
    /**
     * The reset button's icon.
     *
     * @prop {String} ['nf nf-fa-refresh'] resetIcon
     */
    resetIcon: {
      type: String,
      default: 'nf nf-fa-refresh'
    },
    /**
     * The submit button's icon position.
     *
     * @prop {String} ['left'] submitIconPosition
     */
    submitIconPosition: {
      type: String,
      default: 'left'
    },
    /**
     * The cancel button's icon position.
     *
     * @prop {String} ['left'] cancelIconPosition
     */
    cancelIconPosition: {
      type: String,
      default: 'left'
    },
    /**
     * The reset button's icon position.
     *
     * @prop {String} ['left'] resetIconPosition
     */
    resetTextPosition: {
      type: String,
      default: 'left'
    },
    /**
     * The proper data used in the form.
     *
     * @prop {Object} source
     */
    // This is the proper data used in the form
    source: {
      type: Object,
      default() {
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
      default: function () {
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
     * @prop {Boolean|String} windowed
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
     * If true and inside a popup the popup will close after submit
     *
     * @prop {Boolean} closeAfter
     */
    closeAfter: {
      type: Boolean,
      default: true
    },
    /**
     * @prop String mode Mode for buttons: normal or big
     */
    mode: {
      type: String
    },

  },
  data() {
    let currentSchema = [];
    this.schema.map(a => {
      currentSchema.push(bbn.fn.extend({}, a, { id: a.id ? a.id : bbn.fn.randomString(20, 30) }))
    });
    const od = bbnData.getObject(this.source);
    return {
      /**
       * True if the form has been modified.
       * @data {Boolean} [false] dirty
       */
      dirty: false,
      /**
       * True if the form has been modified.
       * @data {Boolean} [false] popup
       */
      popupIndex: false,
      tab: false,
      originalData: bbn.fn.clone(od ? bbnData.getValue(od, true) : this.source),
      isPosted: false,
      isLoading: false,
      currentSchema: currentSchema,
      currentMode: this.mode ? this.mode : (this.closest('bbn-floater') ? 'big' : 'normal'),
      _isSetting: false,
      window: null,
      windowFooter: false,
      isInit: false,
      canSubmit: false,
      canCancel: false,
      sourceTimeout: 0,
      isClosing: false,
      sourceDataId: this.source.__bbnData.uid
    };
  },
  computed: {
    /**
     * Returns true if the form has a footer.
     *
     * @computed hasFooter
     * @return {Boolean}
     */
    hasFooter() {
      return this.$slots.footer && this.$slots.footer.length;
    },

    /**
     * Based on the properties 'fixedFooter' and 'fullScreen', a string is returned containing the classes for the form's template.
     *
     * @computed currentClass
     * @return {String}
     */
    currentClass() {
      let st = '';
      if (this.isInit) {
        if (!this.window && (this.hasFooter || this.realButtons.length || this.footer) && (this.scrollable || this.fullSize)) {
          st += ' bbn-flex-height';
        }
        if (this.scrollable || this.fullSize) {
          st += ' bbn-overlay';
        }
      }

      return st;
    },
    currentStyle() {
      return {};
      if (!this.isInit) {
        return {};
      }
      let floater = this.closest('bbn-floater');
      let ct = this.getRef('container');
      let ctn = ct ? ct.getRef('scrollContent') : false;
      if (floater && ct) {
        let width = this.scrollable && ctn ? ctn.clientWidth : ct.clientWidth;
        let height = this.scrollable && ctn ? ctn.clientHeight : ct.clientHeight;
        let ctWidth = floater.getContainerWidth();
        let ctHeight = floater.getContainerHeight() - (floater.getRef('header').clientHeight || 0);
        if (width > ctWidth) {
          width = ctWidth;
        }
        if (height > ctHeight) {
          height = ctHeight;
        }
        return {
          width: width + 'px',
          height: height + 'px'
        };
      }
    },
    realButtons() {
      const r = [];
      bbn.fn.each(this.buttons, a => {
        let t = typeof (a);
        let obj;
        if (t === 'string') {
          switch (a) {
            case 'cancel':
              obj = {
                preset: 'cancel',
                text: this.cancelText,
                icon: this.cancelIcon,
                iconPosition: this.cancelIconPosition,
                action: () => {
                  this.cancel();
                },
                disabled: !this._canCancel()
              };
              break;
            case 'reset':
              obj = {
                preset: 'reset',
                text: this.resetText,
                icon: this.resetIcon,
                iconPosition: this.resetIconPosition,
                action: () => {
                  this.reset();
                },
                disabled: !this.dirty && !this.prefilled
              };
              break;
            case 'submit':
              obj = {
                preset: 'submit',
                text: this.submitText,
                icon: this.submitIcon,
                iconPosition: this.submitIconPosition,
                action: () => {
                  this.submit();
                },
                disabled: !this.canSubmit
              };
              break;
          }
        }
        else if (t === 'object') {
          obj = bbn.fn.clone(a);
          if ((typeof a.action === 'string') && bbn.fn.isFunction(this[a.action])) {
            obj.action = this[a.action];
          }
        }

        if (obj) {
          if (this.isLoading) {
            obj.disabled = true;
          }
          r.push(obj);
        }
      });

      return r;
    }
  },
  methods: {
    /**
     * Returns an array containing the form's buttons.
     *
     * @computed realButtons
     * @return {Array}
     */
    updateRealButtons() {
      this.$forceUpdate();
      /*
      if (this.window && bbn.fn.isArray(this.window.currentButtons) && (this.currentMode === 'big')) {
        if (this.window.currentButtons !== this.realButtons) {
          this.window.currentButtons = this.realButtons;
          this.window.$forceUpdate().then(() => this.window.onResize());
        }
      }
        */

      return this.realButtons;
    },
    _canCancel() {
      return this.window || this.isModified();
    },
    /**
     * Returns true if the form can be submitted.
     *
     * @method _canSubmit
     * @return {Boolean}
     */
    _canSubmit() {
      return (this.prefilled || this.isModified()) && !this.disabled;
    },
    /**
     * Defines the form behavior when submitted.
     *
     * @method _post
     * @fires getPopup
     * @emit failure
     * @emit success
     */
    _post() {
      this.isPosted = true;
      this.isLoading = true;
      if (this.action && !this.target) {
        let data = bbn.fn.extend(true, {}, this.data || {}, this.source || {});
        let method = this.blank || this.self || this.target ? 'postOut' : 'post';
        this[method](this.action, data, d => {
          if (d && (d.success === false)) {
            if (this.failureMessage) {
              this.alert(bbn.fn.isFunction(this.failureMessage) ? this.failureMessage(d) : this.failureMessage);
            }
            else {
              this.alert(bbn._("An error occurred"));
            }

            this.isLoading = false;
          }
          else if (d) {
            let e = new Event('success', { cancelable: true });
            this.$emit('success', d, e);
            if (!e.defaultPrevented) {
              this.commitData();
              if (this.successMessage) {
                this.alert(bbn.fn.isFunction(this.successMessage) ? this.successMessage(d) : this.successMessage);
              }

              this.isLoading = false;
              this.update();

              if (this.window) {
                this.$nextTick(() => {
                  this.window.close(true, true);
                });
              }
            }

          }
        }, !this.blank && !this.self && !this.target ? (xhr, textStatus, errorThrown) => {
          this.$emit('failure', xhr, textStatus, errorThrown);
          this.isLoading = false;
        } : (this.self ? '_self' : (this.blank ? '_blank' : this.target)));
      }
      else {
        this.commitData();
        let e = new Event('success', { cancelable: true });
        this.$emit('success', this.source, e);
        // ?????
        if (this.sendModel) {
          this.commitData();
        }
        this.dirty = false;
        this.isLoading = false;
        if (!e.defaultPrevented) {
          if (this.window) {
            this.window.close(true);
          }
        }
      }
    },
    commitData() {
      const od = bbnData.getObject(this.source);
      this.originalData = bbn.fn.clone(od ? bbnData.getValue(od, true) : this.source);
      this.dirty = false;
    },
    /**
     * Executes the action given to the button.
     * @method _execCommand
     */
    _execCommand(button, ev) {
      if (button.action) {
        button.action(this.source, this, ev)
      }
    },
    /**
     * Compares the actual data with the original data of the form to identify the differences.
     *
     * @method getModifications
     * @fires getData
     * @return {Object}
     */
    getModifications() {
      let data = this.getData(this.$el) || {},
        res = {};
      for (let n in data) {
        if (!bbn.fn.isSame(this.originalData[n], data[n])) {
          res[n] = data[n];
        }
      }
      return res;
    },
    /**
     * Based on the prop 'sendModel', either the source of the form or an object of data contained in the form's fields is returned.
     *
     * @method getData
     * @return {Object}
     */
    getData() {
      return this.source;//this.sendModel ? this.source : bbn.fn.formdata(this.$el);
    },
    /**
     * Returns true if the form has been modified or if the value of the property 'prefilled' is true.
     * @method isModified
     * @return {Boolean}
     */
    isModified() {
      if (!bbn.fn.isSame(this.source, this.originalData)) {
        return true;
      }
      return false;
    },
    /**
     * Closes the popup containing the form.
     * @method 
     * @param {bbnCp} window 
     * @param {Event} ev 
     * @fires isModified
     */
    closePopup(force, ev) {
      if (this.window && this.$el && !this.isClosing) {
        this.isClosing = true;
        // In case the event is sent
        if (force !== true) {
          force = false;
        }
        if (!force && !this.isPosted && this.confirmLeave && this.isModified()) {
          if (ev) {
            ev.preventDefault();
          }
          this.confirm(this.confirmLeave, () => {
            this.reset();
            this.$nextTick(() => {
              if (this.window) {
                this.window.close(true, true);
                this.isClosing = false;
              }
            });
          }, () => {
            this.isClosing = false;
          }, {
            maxWidth: '90%'
          });
        }
        else {
          this.reinit();
          this.$nextTick(() => {
            if (this.window) {
              this.window.close(true, true);
              this.isClosing = false;
            }
          });
        }
      }
    },
    /**
     * Cancels the changes and closes the window containing the form.
     * @method cancel
     * @fires reset
     * @fires window.close
     */
    cancel() {
      let ev = new Event('cancel', { cancelable: true });
      this.$emit('beforecancel');
      if (!ev.defaultPrevented) {
        this.$emit('cancel', ev, this);
        this.reset();
        if (this.window) {
          this.window.close(true);
        }
      }
    },
    /**
     * Checks if the form content is valid.
     * @method isValid
     */
    isValid(force, callValidation = true, onlyFirst = true) {
      const elems = this.findAll('.bbn-input-component');
      let ok = true;
      let firstFound = null;
      if (bbn.fn.isArray(elems)) {
        bbn.fn.each(elems, ele => {
          const invalid = bbn.fn.isFunction(ele.isValid) && !ele.isValid(ele, false);
          if (invalid || (bbn.fn.isFunction(ele.validation) && !ele.validation())) {
            ok = false;
            if (bbn.fn.isNull(firstFound)) {
              firstFound = ele;
              if (bbn.fn.isFunction(ele.focus)) {
                firstFound.focus();
                if (this.scrollable) {
                  this.getRef('container').scrollTo(0, firstFound);
                }
              }
            }

            if (callValidation
              && invalid
              && (!onlyFirst || (ele === firstFound))
            ) {
              this.$nextTick(() => {
                ele.isValid(ele, callValidation, true);
              })
            }
          }
          if (!ok && !!onlyFirst) {
            return false;
          }
        });
      }

      if (ok && this.validation && callValidation) {
        ok = this.validation(this.source, this.originalData, force)
      }

      return !!ok;
    },
    /**
     * Submits the form.
     * @method submit
     * @param {Boolean} force 
     * @fires validation
     * @fires _post
     * @emits submit
     */
    submit(force) {
      if (!this.isValid(force)) {
        return;
      }

      if (!force) {
        if (this.disabled) {
          return;
        }

        const ev = new CustomEvent('submit', { cancelable: true });
        const ev2 = this.$emit('submit', ev, this);
        ev2.preventDefault();
        if (ev.defaultPrevented) {
          return;
        }
      }

      let cf = false;
      if (this.confirmMessage) {
        if (bbn.fn.isFunction(this.confirmMessage)) {
          cf = this.confirmMessage(this);
        }
        else {
          cf = this.confirmMessage;
        }
        if (cf && this.window) {
          this.window.confirm(cf, () => {
            this._post();
          });
        }
      }
      if (!cf) {
        this._post();
      }
    },
    /**
     * Resets the original data of the form.
     * @method reset 
     * return {Boolean}
     */
    reset() {
      this.isPosted = false;
      bbn.fn.iterate(this.originalData, (val, name) => {
        //if ( this.source[name] !== val ){
        if (!bbn.fn.isSame(this.source[name], val)) {
          if (typeof val !== typeof this.source[name]) {
            this.$set(this.source, name, bbn.fn.clone(val));
          }
          else if (bbn.fn.isArray(this.source[name], val)) {
            bbn.fn.each(val, (a, i) => {
              if (this.source[name].length <= i) {
                this.source[name].push(a);
              }
              else if (a !== this.source[name][i]) {
                let idx = this.source[name].indexOf(a);
                if (idx > i) {
                  bbn.fn.move(this.source[name], idx, i);
                }
                else {
                  this.source[name].splice(i, 0, a);
                }
              }
            });
            if (this.source[name].length > val.length) {
              this.source[name].splice(val.length, this.source[name].length - val.length);
            }
          }
          else if (bbn.fn.isObject(this.source[name], val)) {
            let k1 = Object.keys(val);
            let k2 = Object.keys(this.source[name]);
            bbn.fn.each(k2, a => {
              if (k1.indexOf(a) === -1) {
                delete this.source[name][a];
              }
            });
            bbn.fn.each(k1, a => {
              if (val[a] !== this.source[name][a]) {
                this.source[name][a] = val[a];
              }
            });
          }
          else {
            this.$set(this.source, name, bbn.fn.clone(val));
          }
        }
      });
      this.reinit();
      this.$forceUpdate();
      this.$nextTick(() => {
        let elems = this.findAll('.bbn-input-component');
        if (bbn.fn.isArray(elems)) {
          bbn.fn.each(elems, a => a.$emit('removevalidation'));
        }
      })
      return true;
    },
    /**
     * Reinitializes the form.
     * @method reinit
     * 
     */
    reinit() {
      const od = bbnData.getObject(this.source);
      this.originalData = bbn.fn.clone(od ? bbnData.getValue(od, true) : this.source);
      this.dirty = this.isModified();
    },
    focusFirst(fromLast) {
      let ele = this.getRef('container');
      if (this.scrollable) {
        ele = ele.$el;
      }
      if (ele) {
        let focusable = false;
        let all = ele.querySelectorAll('input, select, .bbn-checkbox-label, textarea, [tabindex]:not([tabindex="-1"])');
        if (fromLast) {
          bbn.fn.forir(all, a => {
            if (a.offsetHeight && a.offsetWidth && !a.disabled && !a.classList.contains('bbn-no')) {
              focusable = a;
              return false;
            }
          })
        }
        else {
          bbn.fn.each(all, a => {
            if (a.offsetHeight && a.offsetWidth && !a.disabled && !a.classList.contains('bbn-no')) {
              //bbn.fn.log(a);
              focusable = a;
              return false;
            }
          });
        }
        if (focusable) {
          //focusable.focus();
        }
      }
    },
    focusLast() {
      this.focusFirst(true);
    },
    /**
   * Initializes the form.
   * @method init 
   * 
   */
    init() {
      if (this.$options.propsData.script) {
        this.$el.dataset.script = this.$options.propsData.script;
      }
      if (!this.window && this.windowed) {
        this.window = this.closest("bbn-floater");
        if (this.window) {
          if (!this.window.$isMounted) {
            this.window.$once('hook:mounted', () => {
              this.$nextTick(() => {
                this.windowFooter = this.window.getRef('buttons');
                this.$nextTick(() => {
                  this.window.updateButtonsInContainer();
                });
              });
            });
          }
          else {
            this.windowFooter = this.window.getRef('buttons');
            this.$nextTick(() => {
              this.window.updateButtonsInContainer();
            });
          }

          this.window.addClose(this.closePopup);
          this.window.componentClass.push('bbn-radius-bottom')
        }
      }
      if (!this.tab) {
        this.tab = this.closest("bbn-container");
      }
      this.canSubmit = this._canSubmit();
      this.updateRealButtons(true);
      this.isInit = true;
      if (this.autofocus) {
        this.focusFirst();
      }
    },
    /**
     * @method checkValidity
     * @fires $el.checkValidity
     */
    checkValidity() {
      bbn.fn.warning("checkValidity is deprecated, use isValid instead");
      return this.$el.checkValidity();
    },
    /**
     * @method reportValidity
     * @fires $el.reportValidity
     */
    reportValidity() {
      bbn.fn.warning("reportValidity is deprecated, use isValid instead");
      return this.$el.reportValidity();
    },
    update() {
      this.canCancel = this._canCancel();
      this.canSubmit = this._canSubmit();
    }
  },
  /**
   * Registers in each container until root.
   * 
   * @event mounted
   * @fires init
   */
  mounted() {
    let container = this;
    while (container = container.closest('bbn-container')) {
      container.forms.push(this);
    }
    container = this;
    while (container = container.closest('bbn-floater')) {
      container.forms.push(this);
    }

    this.updateRealButtons();


    if (this.storage) {
      let data = this.getStorage();
      if (data) {
        this._isSetting = true;
        bbn.fn.iterate(data, (val, name) => {
          //if ( this.source[name] !== val ){
          if (!bbn.fn.isSame(this.source[name], val)) {
            if (typeof val !== typeof this.source[name]) {
              this.$set(this.source, name, bbn.fn.clone(val));
            }
            else if (bbn.fn.isArray(this.source[name], val)) {
              bbn.fn.each(val, (a, i) => {
                if (this.source[name].length <= i) {
                  this.source[name].push(a);
                }
                else if (a !== this.source[name][i]) {
                  let idx = this.source[name].indexOf(a);
                  if (idx > i) {
                    bbn.fn.move(this.source[name], idx, i);
                  }
                  else {
                    this.source[name].splice(i, 0, a);
                  }
                }
              });
              if (this.source[name].length > val.length) {
                this.source[name].splice(val.length, this.source[name].length - val.length);
              }
            }
            else if (bbn.fn.isObject(this.source[name], val)) {
              let k1 = Object.keys(val);
              let k2 = Object.keys(this.source[name]);
              bbn.fn.each(k2, a => {
                if (k1.indexOf(a) === -1) {
                  delete this.source[name][a];
                }
              });
              bbn.fn.each(k1, a => {
                if (val[a] !== this.source[name][a]) {
                  this.source[name][a] = val[a];
                }
              });
            }
            else {
              this.$set(this.source, name, bbn.fn.clone(val));
            }
          }
        });
        this._isSetting = false;
      }
    }
    this.init();

  },
  /**
   * Registers in each container until root.
   * 
   * @event mounted
   * @fires init
   */
  beforeDestroy() {
    let container = this;
    while (container = container.closest('bbn-container')) {
      bbn.fn.each(container.forms, (f, i) => {
        if (f === this) {
          container.forms.splice(i, 1);
          return false;
        }
      });
    }
    container = this;
    while (container = container.closest('bbn-floater')) {
      bbn.fn.each(container.forms, (f, i) => {
        if (f === this) {
          container.forms.splice(i, 1);
          return false;
        }
      });
    }
  },
  watch: {
    /**
     * @watch schema
     */
    schema() {
      let currentSchema = [];
      this.schema.map(a => {
        currentSchema.push(bbn.fn.extend({}, a, { id: a.id ? a.id : bbn.fn.randomString(20, 30) }))
      });
      this.currentSchema = currentSchema;
    },
    /**
     * @watch source
     */
    source: {
      deep: true,
      handler() {
        const sourceDataId = this.source.__bbnData.uid;
        if (sourceDataId && (sourceDataId !== this.sourceDataId)) {
          this.sourceDataId = sourceDataId;
          this.commitData();
          return;
        }

        //bbn.fn.log(["SOURCE CHANGED", JSON.stringify(this.getModifications()), this.originalData, JSON.stringify(this.source)]);
        this.dirty = this.isModified();
        this.canSubmit = this._canSubmit();
        if (this.storage) {
          if (!this._isSetting) {
            this.setStorage(this.source)
          }
        }
        this.$emit('change', this.getModifications())
        this.$nextTick(() => {
          if (this.sourceTimeout) {
            clearTimeout(this.sourceTimeout);
          }
          this.sourceTimeout = setTimeout(() => {
            this.update();
          }, 200)
        })
      }
    },
    /**
     * @watch buttons
     */
    buttons: {
      deep: true,
      handler() {
        if (this.isInit) {
          this.updateRealButtons(true);
        }
      }
    },
    /**
     * @watch canSubmit
     */
    canSubmit() {
      this.updateRealButtons();
    },
    /**
     * @watch canCancel
     */
    canCancel() {
      this.updateRealButtons();
    },
    /**
     * @watch dirty
     */
    dirty(v) {
      if (this.window) {
        this.window.dirty = v;
      }
      if (this.tab) {
        this.tab.dirty = v;
      }
    },
    mode(v) {
      this.currentMode = v;
    },
    isLoading() {
      this.updateRealButtons();
    }
  }
};

import bbn from '@bbn/bbn';
import cpHtml from './form.html';
import cpStyle from './form.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/form.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-form',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
