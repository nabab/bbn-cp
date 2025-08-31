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
    }
  },
  computed: {
    screenshoter() {
      if (!this._screenshoter) {
        this._screenshoter = this.router.getRef('screenshot');
      }

      return this._screenshoter;
    }
  },
  methods: {
    async setScreenshot() {
      if (!this._screenshotInterval && this.router.isVisual && this.router.db && !this.isPane && this.isLoaded) {
        let url = this.getFullURL();
        try {
          const row = await this.router.db.select('containers', ['manual', 'time'], {url: url});
          // Checking if we have a screenshot of less than an hour
          if (!row || (!row.manual && ((bbn.fn.timestamp() - (row.time || 0)) >= this.currentScreenshotDelay))) {
            setTimeout(() => {
              if (this.isVisible) {
                this.saveScreenshot(400);
              }
            }, 1000)
          }
        } catch (e) {
          appui.error(e.message);
          throw e;
        }

        this._screenshotInterval = setInterval(() => {
          this.saveScreenshot(400);
        }, this.currentScreenshotDelay);
      }
    },


    unsetScreenshot() {
      if (this._screenshotInterval) {
        clearInterval(this._screenshotInterval);
        this._screenshotInterval = false;
        if (this._screenshotTimeout) {
          clearTimeout(this._screenshotTimeout);
          this._screenshotTimeout = false;
        }
      }
    },

    saveScreenshot(width, height, force = false) {
      if (this.isVisible && this.router.db && !this.isPane && this.checkVisibility()) {
        this.takeScreenshot(width, height).then(img => {
          if (!img) {
            return;
          }

          this.thumbnail = img;
          // This is in fact an insert/update
          const url = this.getFullURL();
          bbn.fn.log("Saving screenshot for ", url);
          if (url) {
            this.router.db.insert('containers', {
              url: this.getFullURL(),
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

    takeScreenshot(width, height, meth = 'png') {
      return new Promise(resolve => {
        if (this.screenshoter
            && this.isVisible
            && this.checkVisibility()
            && bbn.fn.isActiveInterface(600)
            && !this.router.visualShowAll
        ) {
          this.screenshoter.capture(this.getRef('canvasSource'), width, height, meth).then(img => {
            resolve(img);
          })
        }
        else {
          resolve(false);
        }
      })
    },

    updateScreenshot() {
      if (this.visual && this.router.db) {
        let url = this.getFullURL();
        this.router.db.selectOne('containers', 'image', {url}).then(res => {
          if (res) {
            this.thumbnail = res;
          }
        });
      }
    },

    screenshotMounted() {
      this.updateScreenshot()
      this._screenshotInterval = false;
    }
  }
}
