export default {
  props: {
    /**
     * The index of the container
     * @prop {Number} idx
     */
    idx: {
      type: Number
    },
    /**
     * The timestamp of the last activation
     * @prop {Number} last
     */
    last: {
      type: Number
    },
    /**
     * A unique id for the container that will ben used as index by the router
     * @prop {String} uid
     */
    uid: {
      type: String
    },
    /**
     * Defines if the component has to be selected.
     * @prop {Boolean|Number} [false] selected
     */
    selected: {
      type: [Boolean, Number],
      default: false
    },
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    isTabSelected() {
      if (!this.router) {
        return false;
      }

      if (this.currentPane) {
        return this.currentPane.tabs[this.currentPane.selected] === this.currentView;
      }

      return this.router.selected === this.currentIndex;
    }
  },
  methods: {
    /**
     * Shows the container.
     * 
     * @method show
     */
    show(url) {
      //bbn.fn.log([url, "CHANGING SELECTED BY SHOWING " + this.currentIndex, this.currentIndex, this.currentView.idx]);
      if (!this.isPane && (this.currentIndex !== undefined)) {
        this.router.selected = this.currentIndex;
        if (this.visual && this.router.visualShowAll) {
          this.router.visualShowAll = false;
        }
      }

      if (bbn.fn.isString(url) && !url.indexOf(this.currentURL)) {
        this.setCurrent(url);
      }
    },


    close() {
      if (!this.isPane) {
        this.router.close(this.currentIndex);
      }
    },
    onShow() {
      //bbn.fn.log(["ON SHOW", this.isVisible, this.router?.selected, this.currentIndex, this.isLoaded, this.isLoading, this.ready]);
      this.$nextTick(() => {
        if (this.isVisible && this.router) {
          if (!this.isLoaded && !this.isLoading) {
            this.loadView(this.currentCurrent)
          }
          else if (!this.ready) {
            this.onResize();
            this.init();
          }

          this.router.navigate();
        }
      });
    },

    /**
     * @method load
     * @param {String} url
     * @param {Boolean} force
     * @fires search
     * @fires add
     * @fires parseURL
     * @fires callRouter
     * @fires navigate
     * @fires activate
     * @emit update
    */
    async loadView(url, force, index) {
      if (!url) {
        throw new Error(bbn._("Impossible to get the view without an URL"));
      }

      bbn.fn.log("LOADING VIEW " + url);
      if (this.isLoading) {
        return;
      }

      let finalURL = this.router.fullBaseURL + url;
      //bbn.fn.warning("ROUTING " + url + ' / CURRENT: ' + this.router.currentURL + ' / FULL: ' + this.router.getFullCurrentURL() + ' / FINAL: ' + finalURL);
      this.isLoading = true;
      if (!this.currentView.pane) {
        //bbn.fn.log(["GETTING VIEW " + finalURL, url, this.router.parseURL(url), this.router.baseURL, this.getFullCurrentURL()]);
        //this.currentURL = url;
      }

      this.router.$emit('update', this.router.views);
      this.router.$emit("load", url);
      let dataObj = this.router.postBaseUrl ? { _bbn_baseURL: this.router.fullBaseURL } : {};
      let response;
      try {
        response = await this.post(finalURL, dataObj);
        this.isLoading = false;
      }
      // Abort
      catch (e) {
        bbn.fn.warning("ABORTED")
        this.isLoading = false;
        /*
        let idx = this.search(url);
        if (idx !== false) {
          let url = this.currentView.url;
          if (this.urls[url]) {
            this.callRouter(finalURL, url);
            this.$nextTick(() => {
              this.close(idx);
            });
            return;
          }
        }
        */
      }

      if (response?.status === 200) {
        const d = response.data;
        //bbn.fn.log(["RESPONSE", d.url, d, dataObj, this.$el]);
        let callRealInit = true;
        if (!d.label && d.title) {
          d.label = d.title;
          delete d.title;
        }

        if (!d.label || (d.label === bbn._('Loading'))) {
          let label = bbn._('Untitled');
          let num = 0;
          while (bbn.fn.search(this.router.views, a => a.label.indexOf(label) === 0) > -1) {
            num++;
            label = bbn._('Untitled') + ' ' + num;
          }

          d.label = label;
        }

        this.currentTitle = d.label;

        const oldUrl = d.url;
        const oldCurrent = d.url;
        d.url = this.router.parseURL(d.url || finalURL);
        if (d.url !== this.currentURL) {
          this.currentURL = d.url;
          this.router.updateBaseURL();
          if (!d.url) {
            bbn.fn.log("OLD URL " + oldUrl, "OLD CUR " + oldCurrent, "NEW URL " + d.url, "NEW CUR " + finalURL);
            debugger;
          }
          //bbn.fn.log("CHANGING URL TO " + d.url + ' / ' + this.router.baseURL);
          if (this.currentCurrent.indexOf(d.url)) {
            this.setCurrent(d.url);
          }
        }

        if (Object.hasOwn(d, 'data')) {
          this.currentSource = d.data;
        }

        if (Object.hasOwn(d, 'script')) {
          this.currentScript = d.script;
        }

        if (Object.hasOwn(d, 'css')) {
          this.currentCss = d.css;
        }

        if (Object.hasOwn(d, 'content')) {
          this.currentContent = d.content;
        }

        if (Object.hasOwn(d, 'bcolor')) {
          this.currentBcolor = d.bcolor;
        }

        if (Object.hasOwn(d, 'fcolor')) {
          this.currentFcolor = d.fcolor;
        }

        if (Object.hasOwn(d, 'icon')) {
          this.currentIcon = d.icon;
        }

        if (Object.hasOwn(d, 'options')) {
          this.currentOptions = d.options;
        }

        if (Object.hasOwn(d, 'scrollable')) {
          this.currentScrollable = d.scrollable;
        }

        if (Object.hasOwn(d, 'component')) {
          this.currentComponent = d.component;
        }

        if (Object.hasOwn(d, 'notext')) {
          this.currentNotext = d.notext;
        }

        if (Object.hasOwn(d, 'menu')) {
          this.currentMenu = d.menu;
        }

        if (Object.hasOwn(d, 'advert')) {
          this.currentAdvert = d.advert;
        }

        if (Object.hasOwn(d, 'help')) {
          this.currentHelp = d.help;
        }

        if (Object.hasOwn(d, 'imessages')) {
          this.currentImessages = d.imessages;
        }

        this.isLoaded = true;
        this.init();
      }
    },
    selectionMounted() {
      //bbn.fn.warning("SELECTION MOUNTED");
      if (!this.router.ready) {
        //bbn.fn.warning("ROUTER NOT READY");
        this.router.$on('ready', () => {
          //bbn.fn.warning("ROUTER ON READY");
          this.selectionMounted();
        });
      }
      else{
        if (this.router.urls[this.uid]) {
          //bbn.fn.warning("SELECTION EXISTING");
          return;
        }

        //bbn.fn.warning("ROUTER REGISTERING FOR " + this.url);
        this.router.register(this);
        this.$nextTick(() => {
          if (this.currentSelected) {
            this.show();
            this.onShow();
          }
  
          this.init();
        });
      }
    },
    /**
     * Initializes the component.
     * 
     * @method init
     */
    init() {
      if (this.router && this.isVisible && (this.real || (this.isLoaded && !this.ready))) {
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
            template: '<div class="' + (this.router?.scrollContent ? '' : 'bbn-w-100') + '">' + this.currentView.content + '</div>',
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
          this.componentDefinition = bbn.cp.normalizeComponent(definition, 'bbn-container-' + this.getFullURL());
          // The local anon component gets defined
          this.$options.components[this.componentName] = this.componentDefinition;
        }
        else {
          this.isComponent = false;
        }

        if (bbn.env.path.indexOf('#') !== -1) {
          let scroll = this.getRef('scroll');
          /**
           * @todo  Does it mean the scroll manage the hash? Check it out
           */
          if (scroll && (scroll.currentY || scroll.currentX)) {
            return;
          }
          let hash = bbn.env.path.split('#')[1];
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
    reload() {
      this.popups.splice(0);
      this.$nextTick(() => {
        this.router.reload(this.currentIndex);
      });
    },
  },
  watch: {
    isTabSelected(v) {
      if (v) {
        this.show();
      }
    }
  }
}