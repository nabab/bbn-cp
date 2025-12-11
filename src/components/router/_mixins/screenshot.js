export default {
  props: {
    /**
     * Time between 2 automatic screenshot in visual mode, in milliseconds
     * @prop {Number} [43200000] screenshotDelay (12 hours)
     */
    screenshotDelay: {
      type: Number,
      default: 3600000
    },
    screenshotExpiration: {
      type: Number,
      default: 3600000*7*24 // 7 days
    }
  },
  data() {
    return {
      /**
       * Time between 2 automatic screenshot in visual mode, in milliseconds
       * @data {Number} currentScreenshotDelay
       */
      currentScreenshotDelay: this.screenshotDelay,
      /**
       * The bbn-screenshot element inside router
       */
      _screenshoter: false,
      _screenshotInterval: {},
      thumbnails: bbn.fn.createObject()
    }
  },
  computed: {
    screenshoter() {
      if (!this._screenshoter) {
        this._screenshoter = this.getRef('screenshot');
      }

      return this._screenshoter;
    }
  },
  methods: {
    async setScreenshot(idx) {
      const ct = this.getContainer(idx);
      if (!ct) {
        return;
      }
      if (!this._screenshotInterval[this.views[idx].uid]) {
        this._screenshotInterval[this.views[idx].uid] = setInterval(() => {
          this.saveScreenshot(idx, 400);
        }, this.currentScreenshotDelay);
      }

      if (!this.thumbnails[ct.currentView.uid] && ct?.isTabSelected && this.isVisual && this.db && this.views[idx].loaded) {
        let url = ct.getFullURL();
        try {
          const row = await this.db.select('containers', ['manual', 'time'], {url});
          bbn.fn.log("CHECKING SCREENSHOT FOR ", url, row);
          if (ct.isVisible && (!row || (!row.manual && ((bbn.fn.timestamp() - (row.time || 0)) >= this.screenshotExpiration)))) {
            await bbn.fn.yieldToBrowser();
            bbn.fn.log("SAVING SCREENSHOT FOR ", url);
            await this.saveScreenshot(idx, 400);
          }
        } catch (e) {
          bbn.fn.log(e);
          appui.error(e.message);
        }
      }
    },

    unsetScreenshot(idx) {
      if (this._screenshotInterval[this.views[idx].uid]) {
        clearInterval(this._screenshotInterval[this.views[idx].uid]);
        this._screenshotInterval[this.views[idx].uid] = false;
      }
    },

    saveScreenshot(idx, width, height, force = false) {
      const ct = this.getContainer(idx);
      if (ct?.isTabSelected && this.db && ct.checkVisibility()) {
        this.db.select('containers', ['manual', 'time'], {url: ct.currentURL}).then(row => {
          if (force || !row || (!row.manual && ((bbn.fn.timestamp() - (row.time || 0)) >= this.screenshotExpiration))) {
            this.takeScreenshot(idx, width, height).then(img => {
              if (!img) {
                return;
              }
    
              if (img instanceof Image) {
                img = img.src;
              }
    
              this.thumbnails[ct.currentView.uid] = {image: img};
              // This is in fact an insert/update
              const url = ct.getFullURL();
              if (url) {
                this.db.insert('containers', {
                  url,
                  image: img,
                  time: bbn.fn.timestamp(),
                  manual: force ? 1 : 0
                });
              }
            });
          }
        });
      }
      else if (force) {
        throw new Error(bbn._("The container is not visible, the screenshot cannot be saved."));
      }
      else {
        bbn.fn.log(["No screenshot to save", this.isVisible, this.router.db, !this.isPane, this.checkVisibility()]);
      }
    },

    takeScreenshot(idx, width, height, meth = 'png') {
      return new Promise(resolve => {
        const ct = this.getContainer(idx);
        if (ct
            && this.screenshoter
            && ct.isTabSelected
            && ct.checkVisibility()
            //&& bbn.fn.isActiveInterface(600)
            && !this.visualShowAll
        ) {
          this.screenshoter.capture(ct.getRef('canvasSource'), width, height, meth).then(img => {
            resolve(img);
          })
        }
        else {
          resolve(false);
        }
      })
    },

    updateScreenshot(idx, force) {
      const ct = this.getContainer(idx);
      if (ct && this.isVisual && this.db) {
        let url = ct.getFullURL();
        this.db.select('containers', ['manual', 'image'], {url}).then(res => {
          if (res && (!res.manual || force)) {
            this.thumbnails[ct.currentView.uid] = res;
          }
        });
      }
    },
  }
}
