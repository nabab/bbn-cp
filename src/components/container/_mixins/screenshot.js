export default {
  props: {
    /**
     * Time between 2 automatic screenshot in visual mode, in milliseconds
     * @prop {Number} [43200000] screenshotDelay (12 hours)
     */
    screenshotDelay: {
      type: Number,
      default: 43200000
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
    }
  },
  methods: {
    setScreenshot() {
      if (!this._screenshotInterval && this.router.isVisual && this.router.db && !this.isPane) {
        let url = this.getFullURL();
        this.router.db.selectOne('containers', 'time', {url: url}).then(time => {
          // Checking if we have a screenshot of less than an hour
          if ((bbn.fn.timestamp() - (time || 0)) >= this.currentScreenshotDelay) {
            this.saveScreenshot(0.1, 10000);
          }
        }).catch(() => {
          this.saveScreenshot(0.1, 10000);
        });

        this._screenshotInterval = setInterval(() => {
          this.saveScreenshot(0.1);
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


    async saveScreenshot(scale = 0.1, timeout = 0) {
      if (this.router.db && (this.currentIndex === this.router.selected) && !this.isPane) {
        let img       = await this.takeScreenshot(scale, timeout, true);
        let num_tries = 0;
        while (!img && (num_tries < 5)) {
          num_tries++;
          img = await this.takeScreenshot(scale, 5000);
        }
        if (!img) {
          bbn.fn.log(bbn._("Impossible to take the screenshot of") + ' ' + this.getFullCurrentURL());
          return;
          //throw new Error(bbn._("Impossible to take the screenshot of " + this.getFullCurrentURL()));
        }
        this.thumbnail = img.src;
        // This is in fact an insert/update
        this.router.db.insert('containers', {
          url: this.getFullURL(),
          image: img.src,
          time: bbn.fn.timestamp()
        });
      }
    },


    takeScreenshot(scale = 1, timeout = 0, image = false, force = false) {
      return new Promise(resolve => {
        if (this._screenshotTimeout) {
          if (force) {
            clearTimeout(this._screenshotTimeout);
          }
          else {
            resolve(false);
          }
        }

        this._screenshotTimeout = setTimeout(() => {
          let exit = () => {
            this._screenshotTimeout = false;
            resolve(false);
          };
          if ((this.currentIndex === this.router.selected)
              && this.isVisible
              && window.html2canvas
              && bbn.fn.isActiveInterface(600)
              && !this.router.visualShowAll
          ) {
            //debugger;
            let scroll = this.getRef('scroll');
            if (!scroll) {
              return exit();
            }

            let w  = scroll.clientWidth;
            let h  = scroll.clientHeight;
            let s = Math.min(w, h);
            let ct = this.getRef('canvasSource');
            if (!ct || !s) {
              return exit();
            }

            scroll.style.maxWidth = s + 'px !important';
            scroll.style.maxHeight = s + 'px !important';
            html2canvas(ct, {
              width: s,
              height: s,
              scale: scale
            }).then(canvas => {
              ct.style.width = null;
              ct.style.height = null;
              this._screenshotTimeout = false;
              if (!image) {
                resolve(canvas);
                return;
              }
              let img   = bbn.fn.canvasToImage(canvas);
              let ctx   = canvas.getContext('2d');
              let size  = Math.min(canvas.width, canvas.height);
              let num   = Math.min(this.router.numVisualCols, this.router.numVisualRows);
              let msize = Math.ceil(size / num);
              ctx.drawImage(img, 0, 0, size, size, 0, 0, msize, msize);
              resolve(img);
            });
          }
          else {
            exit();
          }
        }, timeout)
      })
    },


    updateScreenshot() {
      if (this.visual && this.router.db) {
        let url = this.getFullURL();
        this.router.db.selectOne('containers', 'image', {url: url}).then(res => {
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
