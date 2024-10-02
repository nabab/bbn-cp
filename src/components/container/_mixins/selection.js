import bbn from "@bbn/bbn";

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
  methods: {
    /**
     * Shows the container.
     * 
     * @method show
     */
    show(url) {
      if (!this.isPane) {
        this.router.selected = this.currentIndex;
        if (this.visual && this.router.visualShowAll) {
          this.router.visualShowAll = false;
        }
      }

      if (url && !url.indexOf(this.currentURL)) {
        this.currentCurrent = url;
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
        throw Error(bbn._("Impossible to get the view without an URL"));
      }

      //bbn.fn.log("LOADING VIEW " + url);
      if (this.isLoading) {
        return;
      }

      let finalURL = this.router.fullBaseURL + url;
      //bbn.fn.warning("ROUTING " + url + ' / CURRENT: ' + this.router.currentURL + ' / FULL: ' + this.router.getFullCurrentURL() + ' / FINAL: ' + finalURL);
      this.isLoading = true;
      if (!this.currentView.pane) {
        //bbn.fn.log(["GETTING VIEW " + finalURL, url, this.router.parseURL(url), this.router.baseURL, this.getFullCurrentURL()]);
        this.currentURL = url;
      }

      this.router.$emit('update', this.router.views);
      this.router.$emit("load", url);
      let dataObj = this.router.postBaseUrl ? { _bbn_baseURL: this.router.fullBaseURL } : {};
      let response;
      try {
        response = await this.post(finalURL, dataObj);
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
        if (!d.title || (d.title === bbn._('Loading'))) {
          let title = bbn._('Untitled');
          let num = 0;
          while (bbn.fn.search(this.router.views, a => a.title.indexOf(title) === 0) > -1) {
            num++;
            title = bbn._('Untitled') + ' ' + num;
          }

          d.title = title;
        }

        this.currentTitle = d.title;

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
            this.currentCurrent = d.url;
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

        /*
        if (!d.url) {
          d.url = url;
        }
        //bbn.fn.warning("URLS", url, d.url);
        if (url.indexOf(d.url) === 0) {
          d.current = url;
          //bbn.fn.warning("CURRENT DEFINED AS " + d.current);
        }
        else {
          bbn.fn.warning(url + ' != ' + d.url);
          let searchIdx = this.search(url);
          if (searchIdx !== false) {
            idx = searchIdx;
            bbn.fn.log("REMOVED");
            this.remove(searchIdx, true);
          }
        }

        if (d.data && bbn.fn.numProperties(d.data)) {
          d.source = d.data;
          delete d.data;
        }

        if ((d.url !== d.current) && this.urls[d.current]) {
          let currentIndex = this.urls[d.current].currentIndex;
          //bbn.fn.warning("DELETING VIEW CASE.... " + d.url + ' / ' + d.current + ' ' + currentIndex);
          //bbn.fn.log([d.url, this.urls[d.current], this.urls[d.url], Object.keys(this.urls), bbn.fn.search(this.views, {idx: this.urls[d.current].idx})]);
          this.remove(currentIndex, true).then(() => {
            const onRegister = url => {
              //bbn.fn.log(["REGISTERED", url]);
              if (url === d.url) {
                this.$off('registered', onRegister);
                let view = bbn.fn.getRow(this.views, { url: url });
                if ((this.selected === view.idx) || view.pane) {
                  this.realInit(url);
                }
              }
            };
            this.$on('registered', onRegister);
            let o = bbn.fn.extend(view || bbn.fn.createObject(), d, { loading: false, load: true, real: view?.real || false, loaded: true });
            //bbn.fn.log(["BEFORE", this.views.length, Object.keys(this.urls)]);
            this.add(o, currentIndex).then(() => {
              //bbn.fn.log(this.search(o.url), o);
              let searchIndex = this.search(o.url);
              //bbn.fn.log("Looking for " + o.url);
              if (searchIndex !== false) {
                //this.activateIndex(searchIndex);
                this.selected = searchIndex;
              }
            });
          })
          //callRealInit = false;

        }
        else {
          this.$forceUpdate().then(() => {
            let o = bbn.fn.extend(view || bbn.fn.createObject(), d, { loading: false, load: true, real: view?.real || false, loaded: true });
            let searchIndex = this.search(o.url);
            //bbn.fn.log("Looking for " + o.url);
            if ((searchIndex !== false) && this.urls[this.views[searchIndex].url]) {
              //this.remove(searchIndex);
              bbn.fn.warning("FOUND AND NOT REMOVED " + searchIndex);
              idx = searchIndex;
              this.urls[this.currentView.url].isLoaded = true;
              this.urls[this.currentView.url].dirty = false;
              this.urls[this.currentView.url].ready = false;
              this.urls[this.currentView.url].init();

            }
            else {
              //bbn.fn.warning("ADDEDD " + idx);
              //bbn.fn.log("ADDING AFTER LOAD");
              this.add(o, idx);
            }

            if (o.title && !o.pane) {
              this.currentTitle = o.title;
            }
            //this.$forceUpdate();
            this.$nextTick(() => {
              if (callRealInit) {
                this.realInit(d.url);
              }
            })
          })

        }
        */
      }
      else {
        this.isLoading = false;
        /*
        let idx = this.search(url);
        if (idx !== false) {
          let url = this.currentView.url;
          if (this.urls[url]) {
            this.urls[url].errorStatus = response?.status || 500;
            this.urls[url].setTitle(bbn._("Error"));
            this.urls[url].setIcon("nf nf-fa-warning");
            if (this.selected === idx) {
              await this.callRouter(finalURL, url);
            }
          }
        }
        */
      }
    },
    async selectionMounted() {

      if (!this.router.ready) {
        bbn.fn.warning("ROUTER NOT READY");
        this.router.$on('ready', () => {
          bbn.fn.warning("ROUTER INITING");
          if (this.currentSelected) {
            this.show();
          }
  
          this.init();
        });
      }
      else{
        if (this.router.urls[this.uid]) {
          return;
        }

        //bbn.fn.warning("ROUTER REGISTERING FOR " + this.url);
        this.router.register(this);
        await this.$nextTick();
        if (this.currentSelected) {
          this.show();
          this.onShow();
        }

        this.init();
      }
    },
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
  }
}