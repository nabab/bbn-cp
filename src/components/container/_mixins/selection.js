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
      type: String,
      default() {
        return bbn.fn.randomString();
      }
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
    show() {
      if (!this.isPane) {
        this.router.selected = this.currentIndex;
        if (this.visual && this.router.visualShowAll) {
          this.router.visualShowAll = false;
        }
      }
    },


    close() {
      if (!this.isPane) {
        this.router.close(this.currentIndex);
      }
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
    async getView(url, force, index) {
      if (url) {
        let finalURL = this.router.fullBaseURL + url;
        this.isLoading = true;
        if (!this.currentView.pane) {
          this.currentURL = this.router.parseURL(url);
        }

        this.router.$emit('update', this.router.views);
        this.router.$emit("load", finalURL);
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
          let idx = this.search(this.parseURL(finalURL));
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
          let callRealInit = true;
          if (!d.title || (d.title === bbn._('Loading'))) {
            let title = bbn._('Untitled');
            let num = 0;
            while (bbn.fn.search(this.views, { title: title }) > -1) {
              num++;
              title = bbn._('Untitled') + ' ' + num;
            }
            d.title = title;
          }

          this.currentTitle = d.title;

          if (!d.current && d.url) {
            d.current = d.url;
          }

          if (d.current) {
            this.currentURL = d.current;
          }

          if (d.data) {
            this.currentSource = d.data;
          }

          if (d.script) {
            this.currentScript = d.script;
          }

          if (d.content) {
            this.currentContent = d.content;
          }

          this.isLoaded = true;
          this.init();

          /*
          if (d.url) {
            d.url = this.parseURL(d.url);
          }
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
          let idx = this.search(this.parseURL(finalURL));
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
      }
    },

  }
}