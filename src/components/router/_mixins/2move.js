export default {
  props: {
    /**
     * The confirm message when you close an unsaved container.
     * @prop {(Boolean|String|Function)} ['Are you sure you want to discard the changes you made in this tab?'] confirmLeave
     */
    confirmLeave: {
      type: [Boolean, String, Function],
      default: bbn._("Are you sure you want to discard the changes you made in this page?")
    },
  },
  methods: {
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
    async load(url, force, index) {
      if (url) {
        bbn.fn.log("LOAD URL " + url);
        this.isLoading = true;
        let finalURL = this.fullBaseURL + url;
        let idx = this.search(url);
        let toAdd = false;
        let view;
        if (idx !== false) {
          bbn.fn.log("INDEX RETRIEVED BEFORE LOAD: " + idx.toString(), JSON.stringify(this.views[idx], null, 2));
          if (this.views[idx].loading || (!force && !this.views[idx].load)) {
            return;
          }

          view = this.views[idx];
          //bbn.fn.log(finalURL, idx, JSON.stringify(view, null, 2), force, index);
          //alert("STOP");
          if (force) {
            let kept = {
              loading: true,
              loaded: false,
              load: true,
              url: view.url,
              current: url,
              selected: true,
              cached: view.cached !== undefined ? view.cached : (this.single || !this.nav ? false : true),
              pane: view.pane,
              title: view.title,
              fixed: view.fixed,
              pinned: view.pinned,
              index: idx,
              real: view.real || false,
              last: bbn.fn.timestamp()
            };
            if (view.icon) {
              kept.icon = view.icon;
            }
            if (view.bcolor) {
              kept.bcolor = view.bcolor;
            }
            if (view.fcolor) {
              kept.fcolor = view.fcolor;
            }
            bbn.fn.iterate(bbn.fn.extend(this.getDefaultView(), kept), (a, n) => {
              if (view[n] !== a) {
                this.$set(view, n, a);
              }
            });
            if (this.urls[url]) {
              this.urls[url].isLoaded = false;
              this.urls[url].dirty = false;
            }
          }

          if ((index !== undefined) && (idx !== index)) {
            this.move(idx, index);
            idx = index;
          }
        }
        else {
          toAdd = true;
          idx = index === undefined ? this.views.length : index;
        }

        if (this.single) {
          idx = 0;
        }

        if (toAdd) {
          bbn.fn.log("ADDING ON LOAD " + url);
          await this.add({
            url: url,
            title: view?.title ? view.title : bbn._('Loading'),
            load: true,
            loading: true,
            real: view?.real || false,
            pane: false,
            scrollable: !this.single,
            current: url,
            error: false,
            loaded: false,
            hidden: false,
            last: bbn.fn.timestamp()
          }, idx);
          view = this.views[this.search(url)];
        }
        else if (!this.views[idx].loading) {
          this.views[idx].loading = true;
        }

        if (!this.views[idx].pane) {
          this.currentURL = this.parseURL(url);
        }

        let portal = this.getRef('portal-' + url);
        if (portal) {
          await portal.$forceUpdate();
        }
        this.$emit('update', this.views);
        this.$emit("load", finalURL);
        let dataObj = this.postBaseUrl ? { _bbn_baseURL: this.fullBaseURL } : {};
        let response;
        try {
          response = await this.post(finalURL, dataObj);
        }
        // Abort
        catch (e) {
          bbn.fn.warning("ABORTED")
          this.isLoading = false;
          let idx = this.search(this.parseURL(finalURL));
          if (idx !== false) {
            let url = this.views[idx].url;
            if (this.urls[url]) {
              this.callRouter(finalURL, url);
              this.$nextTick(() => {
                this.close(idx);
              });
              return;
            }
          }
        }

        if (response?.status === 200) {
          const d = response.data;
          let callRealInit = true;
          this.isLoading = false;
          //this.remove(url);
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

          if (!d.title || (d.title === bbn._('Loading'))) {
            if (view && view.title) {
              d.title = view.title;
            }
            else {
              let title = bbn._('Untitled');
              let num = 0;
              while (bbn.fn.search(this.views, { title: title }) > -1) {
                num++;
                title = bbn._('Untitled') + ' ' + num;
              }
              d.title = title;
            }
          }

          if (!d.current && d.url) {
            d.current = d.url;
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
            /*
            */

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
                this.urls[this.views[idx].url].isLoaded = true;
                this.urls[this.views[idx].url].dirty = false;
                this.urls[this.views[idx].url].ready = false;
                this.urls[this.views[idx].url].init();

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
        }
        else {
          this.isLoading = false;
          let idx = this.search(this.parseURL(finalURL));
          if (idx !== false) {
            let url = this.views[idx].url;
            if (this.urls[url]) {
              this.urls[url].errorStatus = response?.status || 500;
              this.urls[url].setTitle(bbn._("Error"));
              this.urls[url].setIcon("nf nf-fa-warning");
              if (this.selected === idx) {
                await this.callRouter(finalURL, url);
              }
            }
          }
        }
      }
    },


    realInit(url) {
      //bbn.fn.log("REAL INIT", url, this.urls, this.views)
      if (this.urls[url]) {
        this.urls[url].setLoaded(true);
        // Otherwise the changes we just did on the props wont be taken into account at container level
        this.urls[url].init();
        //bbn.fn.log("callRouter", this.urls[url], this.urls[url].currentView);
        this.callRouter(this.urls[url].currentURL || url, url);
        this.$emit('update', this.views);
      }
      else {
        //bbn.fn.log(url, this.views[0].loading, this.views[0].url, JSON.stringify(Object.keys(this.urls), null, 2));
        //throw new Error(bbn._("Impossible to find the container for URL") + ' ' + url);
      }
    },


    checkLoaded(idx) {
      return this.views[idx] &&
        //!this.views[idx].real &&
        this.views[idx].load &&
        this.urls[this.views[idx].url] &&
        this.urls[this.views[idx].url].isLoaded;
    },


    /**
    * @method reload
    * @param {Number} idx
    * @fires route
    */
    async reload(idx, force) {
      if (this.checkLoaded(idx)) {
        let url = this.views[idx].current;
        if (!force
          && !this.ignoreDirty
          && this.isDirty
          && this.views[idx].dirty
        ) {
          this.confirm(this.confirmLeave, () => {
            if (this.checkLoaded(idx)) {
              // Looking for dirty ones in registered forms of each container
              let forms = this.urls[this.views[idx].url].forms;
              if (Array.isArray(forms) && forms.length) {
                bbn.fn.each(forms, (f, k) => {
                  f.reset();
                });
              }
              if (this.urls[this.views[idx].url]
                && this.urls[this.views[idx].url].popups
                && this.urls[this.views[idx].url].popups.length
              ) {
                this.urls[this.views[idx].url].popups.splice(0);
              }
              this.load(url, true, idx);
            }
          });
        }
        else {
          this.load(url, true, idx);
        }
      }
    }

  }
}

