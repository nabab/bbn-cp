export default {
  methods: {
    /**
     * used by container to make themselves known when they are mounted.
     * @method register
     * @param {bbnCp} cp
     * @param {Boolean} fake
     * @fires add
     * @fires search
     * @fires route
     * @fires getDefaultURL
     */
    register(cp, fake) {
      if (fake) {
        bbn.fn.log("ADDING FAKE", cp);
        this.add(cp);
        return;
      }

      if (!bbn.fn.isString(cp.url)) {
        bbn.fn.log(cp);
        throw Error(bbn._('The component bbn-container must have a URL defined'));
      }
      //bbn.fn.log("REGISRTE", cp.$el.bbnId, cp.url, this.urls[cp.url] ? this.urls[cp.url].$el.bbnId : "NO")
      if (this.urls[cp.url]) {
        bbn.fn.log(["It exists", this.urls[cp.url].$numBuild, this.numRegistered, this.views[0].real]);
        if (cp !== this.urls[cp.url]) {
          this.urls[cp.url].$el.parentNode.removeChild(this.urls[cp.url].$el);
          ///throw Error(bbn._('Two containers cannot have the same URL defined (' + cp.url + ')'));
        }

        //return;
      }

      bbn.fn.log("REGISTERING " + cp.url);
      this.numRegistered++;
      this.urls[cp.url] = cp;
      if (this.isVisual) {
        //bbn.fn.log("VIEW ON VISUAL")
        cp.$on('view', () => {
          this.visualShowAll = false;
        })
      }
      let idx = this.search(cp.url);
      if (idx === false) {
        bbn.fn.log("ADDING BECAUSE CAN'T FIND", cp.url, this.views.map(a => a.url));
        this.add(cp);
      }
      else {
        cp.currentIndex = idx;
      }

      //bbn.fn.log(this.numRegistered + " OUT OF " + this.numOutOfPane, cp.currentView.pane)
      if (this.numRegistered === this.numOutOfPane) {
        this.init(this.getDefaultURL());
      }

      this.$emit('registered', cp.url)
    },


    /**
     * used by container to make themselves known when they are destroyed
     * @method unregister
     * @fires search
     * @fires remove
     * @param {bbnCp} cp
     */
    unregister(cp) {
      bbn.fn.log("UNREGISTERING " + cp.url);
      if (!bbn.fn.isString(cp.url)) {
        throw Error(bbn._('The component bbn-container must have a URL defined'));
      }
      this.numRegistered--;
      let idx = this.search(cp.url),
        dataObj = this.postBaseUrl ? { _bbn_baseURL: this.fullBaseURL } : {},
        requestID = bbn.fn.getRequestId(cp.url, dataObj);
      if (bbn.fn.getLoader(requestID)) {
        bbn.fn.abort(requestID);
      }
      if (this.urls[cp.url] !== undefined) {
        delete this.urls[cp.url];
      }

      if (idx !== false) {
        //this.remove(idx);
      }
    },

    /**
     * @method registerRouter
     * @param {bbnCp} bc
     * @param {String} url
     */
    registerRouter(router) {
      this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)] = router;
    },


    /**
     * @method unregisterRouter
     * @param {bbnCp} bc
     * @param {String} url
     */
    unregisterRouter(router) {
      delete this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)];
    }

  },
  beforeMount() {
    if (this.parentContainer) {
      this.parentContainer.registerRouter(this);
    }
  },
  /**
   * @event beforeDestroy
   */
  beforeDestroy() {
    if (this.parentContainer) {
      this.parentContainer.unregisterRouter(this);
    }
  },
}
