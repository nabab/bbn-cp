(bbn => {
  "use strict";
  Object.defineProperty(bbn.cp.mixins, 'basic', {
    configurable: false,
    writable: false,
    value: {
      data() {
        bbn.cp.uid++;
        let o = {
          /**
           * The change of value of this prop to true emits the event 'ready'.
           * @data {Boolean} [false] ready
           * @memberof basicComponent
           */
          ready: false,
          /**
           * Each basic component will have a unique UID.
           * @data {Number} uid
           * @memberof basicComponent
           */
          bbnUid: bbn.cp.uid,
          /**
           * The classes added to the component.
           * @data {Array} [['bbn-basic-component']] componentClass
           * @memberof basicComponent
           */
          componentClass: ['bbn-basic-component'],
          /**
           * Indicates if we're on a mobile device.
           * @data {Boolean} isMobile
           * @memberof basicComponent
           */
          isMobile: bbn.fn.isMobile(),
          /**
           * Indicates if we're on a tablet device.
           * @data {Boolean} isTablet
           * @memberof basicComponent
           */
          isTablet: bbn.fn.isTabletDevice(),
          _currentPoup: null
        };
        if (this.$options.name && bbn.cp.defaults[this.$options.name.slice(4)]) {
          bbn.fn.extend(o, bbn.cp.defaults[this.$options.name.slice(4)]);
        }
        return o;
      },
      computed: {
        currentPopup(){
          if ( !this._currentPopup ){
            let e = this._retrievePopup(this);
            if ( e ){
              this._currentPopup = e;
            }
            else{
              let vm = this;
              while (vm = vm.$parent) {
                if ( vm._currentPopup ){
                  this._currentPopup = vm._currentPopup;
                  break;
                }
                else if ( vm ){
                  e = this._retrievePopup(vm);
                  if ( e ){
                    this._currentPopup = e;
                    break;
                  }
                }
                if (vm === this.$root) {
                  break;
                }
              }
            }
          }
          if ( this._currentPopup ){
            return this._currentPopup;
          }
          return null;
        }
      },
      methods: {
        /**
         * Retrieves the closest popup component in the Vue tree
         * @param vm Vue
         * @returns Vue|false
         */
        _retrievePopup(vm){
          if ( vm.$options && vm.$options._componentTag === 'bbn-popup' ){
            return vm;
          }
          else if ( vm.getRef('popup') ){
            return vm.getRef('popup');
          }
          return vm.$parent ? this._retrievePopup(vm.$parent) : false;
        },
        /**
         * Creates a HTML string for recreating the component.
         * @method exportComponent
         * @memberof basicComponent
         * @param  {Boolean}   full 
         * @param  {Number}    level 
         */
        exportComponent(full, level) {
          let lv = level || 0;
          let st = bbn.fn.repeat('  ', lv) + '<' + this.$options._componentTag;
          bbn.fn.iterate(this.$options.propsData, (a, n) => {
            if (n === 'value') {
              st += ' v-model=""';
            }
            else if ( !bbn.fn.isFunction(a) && !bbn.fn.isObject(a) && !bbn.fn.isArray(a) ){
              st += ' ';
              if (typeof(a) !== 'string') {
                st += ':';
              }
              st += bbn.fn.camelToCss(n) + '=' + '"' + a + '"';
            }
          });
          st += '>' + "\n";
          if (full) {
            bbn.fn.each(this.$children, a => {
              if ( a.exportComponent !== undefined ){
                st += a.exportComponent(true, lv+1);
              }
            });
          }
          st += bbn.fn.repeat('  ', lv) + '</' + this.$options._componentTag + '>' + "\n";
          return st;
        },
        /**
        * Opens the closest object popup.
        * @method getPopup
        * @return {Object}
        */
        getPopup() {
          let popup = this.currentPopup;
          if (arguments.length && popup) {
            let cfg = arguments[0];
            let args = [];
            if (bbn.fn.isObject(cfg)) {
              cfg.opener = this;
            }

            args.push(cfg);
            for (let i = 1; i < arguments.length; i++) {
              args.push(arguments[i]);
            }

            return popup.open.apply(popup, args);
          }

          return popup;
        },
        /**
        * Opens a confirmation from the closest popup
        * @method confirm
        */
        confirm() {
          return;
          let popup = this.getPopup();
          if (arguments.length && popup) {
            let cfg = arguments[0];
            let args = [];
            if (bbn.fn.isObject(cfg)) {
              cfg.opener = this;
            }

            args.push(cfg);
            for (let i = 1; i < arguments.length; i++) {
              args.push(arguments[i]);
            }

            if (!bbn.fn.isObject(cfg)) {
              args.push(this);
            }

            return popup.confirm.apply(popup, args)
          }
        },
        /**
        * Opens an alert from the closest popup
        * @method alert
        */
        alert() {
          alert(...arguments);
          return;
          let popup = this.getPopup();
          if (arguments.length && popup) {
            let cfg = arguments[0];
            let args = [];
            if (bbn.fn.isObject(cfg)) {
              cfg.opener = this;
            }

            args.push(cfg);
            for (let i = 1; i < arguments.length; i++) {
              args.push(arguments[i]);
            }

            if (!bbn.fn.isObject(cfg)) {
              args.push(this);
            }

            return popup.alert.apply(popup, args)
          }
        },
        /**
        * Executes bbn.fn.post
        * @method post
        * @see {@link https://bbn.io/bbn-js/doc/ajax/post|bbn.fn.post} documentation
        * @todo Stupid idea, it should be removed.
        * @return {Promise}
        */
        post() {
          let ct = this.closest('bbn-container');
          let referer = ct ? ct.getFullCurrentURL()
            : document.location.pathName;
          let cfg = bbn.fn.treatAjaxArguments(arguments);
          if (!referer && bbn.env.path) {
            referer = bbn.env.path;
          }
          cfg.obj = bbn.fn.extend({}, cfg.obj || {}, { _bbn_referer: referer, _bbn_key: bbn.fn.getRequestId(cfg.url, cfg.obj, 'json') });
          return bbn.fn.post(cfg);
        },
        /**
        * Executes bbn.fn.postOut
        * @method postOut
        * @see {@link https://bbn.io/bbn-js/doc/ajax/postOut|bbn.fn.postOut} documentation
        * @todo Stupid idea, it should be removed.
        * @return {void}
        */
        postOut(url, obj, onSuccess, target) {
          let ct = this.closest('bbn-container');
          let referer = ct ? ct.getFullCurrentURL()
            : document.location.pathName;
          let cfg = bbn.fn.treatAjaxArguments(arguments);
          if (!referer && bbn.env.path) {
            referer = bbn.env.path;
          }
          obj = bbn.fn.extend({}, obj || {}, { _bbn_referer: referer, _bbn_key: bbn.fn.getRequestId(url, obj, 'json') });
          return bbn.fn.postOut(url, obj, onSuccess, target);
        },
      },
      /**
       * If not defined, defines component's template
       * @memberof basicComponent
       * @event beforeCreate
       */
      beforeCreate() {
        if ( !this.$options.render && !this.$options.template && this.$options.name ){
          this.$options.template = '#bbn-tpl-component-' + (this.$options.name.indexOf('bbn-') === 0 ? this.$options.name.slice(4) : this.$options.name);
        }
      },
      /**
       * Gives to the component the class bbn-basic-component
       * @event created
       * @memberof basicComponent
       */
      created() {
        if (this.$options.name && !this.componentClass.includes(this.$options.name)){
          this.componentClass.push(this.$options.name);
        }
      },
      watch: {
        /**
         * Emits the event 'ready' when the value is true.
         * @watch ready
         * @emit ready
         * @memberof basicComponent
         */
        ready(newVal) {
          if (newVal) {
            let ev = new CustomEvent('subready', {bubbles: true, detail: {cp: this}});
            this.$el.dispatchEvent(ev);
            this.$emit('ready', this);
          }
        }
      }
    }
  });
})(bbn);