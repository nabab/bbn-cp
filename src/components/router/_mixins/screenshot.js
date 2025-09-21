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
  },
  data() {
    return {
      /**
       * Time between 2 automatic screenshot in visual mode, in milliseconds
       * @data {Number} currentScreenshotDelay
       */
      currentScreenshotDelay: this.screenshotDelay,
      /**
       * The base 64 encoded thumbnail image.
       * @data {String} thumbnail
       */
      thumbnail: false,
      /**
       * The bbn-screenshot element inside router
       */
      _screenshoter: false,
      _screenshotInterval: {}
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
    setScreenshot(idx) {
      const ct = this.getContainer(idx);
      return new Promise(resolve => {
        if (ct?.isTabSelected && !this._screenshotInterval[this.views[idx].uid] && this.isVisual && this.db && this.views[idx].loaded) {
          let url = ct.getFullURL();
          try {
            this.db.select('containers', ['manual', 'time'], {url: url}).then(row => {
              if (!row || (!row.manual && ((bbn.fn.timestamp() - (row.time || 0)) >= this.currentScreenshotDelay))) {
                setTimeout(() => {
                  if (ct.isVisible) {
                    this.saveScreenshot(idx, 400);
                  }
                }, 1000)
              }
              resolve(true);
            });
            // Checking if we have a screenshot of less than an hour
          } catch (e) {
            appui.error(e.message);
            throw e;
          }
  
          this._screenshotInterval[this.views[idx].uid] = setInterval(() => {
            this.saveScreenshot(idx, 400);
          }, this.currentScreenshotDelay);
        }
      })
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
        this.takeScreenshot(idx, width, height).then(img => {
          if (!img) {
            return;
          }

          ct.thumbnail = img;
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
            && bbn.fn.isActiveInterface(600)
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
      if (ct && this.visual && this.db) {
        let url = ct.getFullURL();
        this.db.select('containers', ['manual', 'image'], {url}).then(res => {
          if (res && (!res.manual || force)) {
            ct.thumbnail = res.image;
          }
        });
      }
    },
  }
}
