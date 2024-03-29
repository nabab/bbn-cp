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

