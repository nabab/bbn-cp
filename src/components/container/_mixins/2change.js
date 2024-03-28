export default {
  methods: {
    /**
     * Initializes the component.
     * 
     * @method init
     */
    init() {
      if (this.isVisible && (this.real || (this.isLoaded && !this.ready))) {
        //bbn.fn.log("INIT " + this.currentURL, this.real,this.currentScript, this.currentView )
        let res;

        if (this.currentScript) {
          //bbn.fn.log(this.currentScript);
          res = typeof this.currentScript === 'string' ? eval(this.currentScript) : this.currentScript;
          //bbn.fn.log("************************************", res);
          // if evaluating the script property returns a function that will be onMount
          if (bbn.fn.isFunction(res) ){
            this.onMount = res;
            this.isComponent = false;
          }
          // Otherwise if it's an object we assume it is a component
          else if (res && (typeof(res) === 'object')) {
            if (!res.props) {
              res.props = bbn.fn.createObject();
            }
            if (!res.props.source) {
              res.props.source = {
                type: Object
              };
            }
            if (!res.mixins) {
              res.mixins = [];
            }
            if (!res.mixins.includes(bbn.cp.mixins.basic)) {
              res.mixins.push(bbn.cp.mixins.basic);
            }

            this.componentDefinition = bbn.cp.normalizeComponent(res, 'bbn-container-' + this.getFullURL());

            //bbn.fn.log("YUUUU", res, this.componentDefinition, this.currentContent)
            this.componentDefinition.template = this.currentContent;
            this.isComponent = true;
          }
        }
        else if ( this.currentContent ){
          this.isComponent = false;
        }

        if (this.isComponent) {
          // We create a local component with a random name,
          // the content as template
          // and the object returned as component definition
          // Adding also a few funciton to interact with the tab
          let cont = this;
          const definition = bbn.fn.extend(true, res ? res : {}, {
            template: '<div class="' + (this.router.scrollContent ? '' : 'bbn-w-100') + '">' + this.currentView.content + '</div>',
            methods: {
              getContainer(){
                if (!this._bbn_container) {
                  this._bbn_container = this.closest('bbn-container');
                }
                return this._bbn_container;
              },
              getTab(){
                return this.getContainer();
              },
              addMenu(){
                return this.getContainer().addMenu.apply(this.router, arguments)
              },
              deleteMenu(){
                return this.getContainer().deleteMenu.apply(this.router, arguments)
              }
            },
            props: {
              source: {
                type: Object
              }
            }
          });
          if (!definition.props) {
            definition.props = bbn.fn.createObject();
          }
          if (!definition.props.source) {
            definition.props.source = {
              type: Object
            };
          }

          if (!definition.mixins) {
            definition.mixins = [];
          }
          if (!definition.mixins.includes(bbn.cp.mixins.basic)) {
            definition.mixins.push(bbn.cp.mixins.basic);
          }
          this.$el.bbnCfg = bbn.cp.normalizeComponent(definition, 'bbn-container-' + this.getFullURL());
          // The local anon component gets defined
          this.$options.components[this.componentName] = this.$el.bbnCfg;
        }
        else {
          this.isComponent = false;
        }

        if (bbn.env.url.indexOf('#')) {
          let scroll = this.getRef('scroll');
          /**
           * @todo  Does it mean the scroll manage the hash? Check it out
           */
          if (scroll && (scroll.currentY || scroll.currentX)) {
            return;
          }
          let hash = bbn.env.url.split('#')[1];
          if (hash) {
            hash = '#' + hash;
            location.hash = null;
            location.hash = hash;
          }
          
        }
        if (this.visual) {
          this.setScreenshot();
        }

        this.ready = true;
      }
    },


    /**
     * Fires the parent's method reload.
     * 
     * @method reload
     * @fires router.reload
     */
    reload(){
      this.popups.splice(0);
      this.$nextTick(() => {
        this.router.reload(this.currentIndex);
      });
    },


    /**
     * @method registerRouter
     * @param {Object} bc
     * @param {String} url
     */
    registerRouter(router) {
      this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)] = router;
      this.router.registerRouter(router);
    },
    /**
     * @method unregisterRouter
     * @param {Object} bc
     * @param {String} url
     */
    unregisterRouter(router){
      delete this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)];
      this.router.unregisterRouter(router);
    }
  }
}
