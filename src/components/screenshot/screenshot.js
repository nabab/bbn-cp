/**
 * @file bbn-scroll component
 *
 * @description bbn-scroll is a component consisting of horizontal and vertical bars that allow the flow of content in both directions, if the container its smaller than the content, inserts and removes reactively vertical, horizontal bar or both.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 *
 * @created 10/02/2017
 */
import * as htmlToImage from 'html-to-image';

const cpDef = {
  statics() {
    window.htmlToImage = htmlToImage;
  },
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


    async takeScreenshot(element, width, heightOrSquare) {
      let eleWidth  = element.clientWidth;
      let eleHeight  = element.clientHeight;
      let canvasWidth = width || eleWidth;
      if (!width && heightOrSquare && (heightOrSquare !== true)) {
        canvasWidth = Math.floor(eleWidth * (heightOrSquare / eleHeight));
      }

      let canvasHeight = heightOrSquare === true ? canvasWidth : (heightOrSquare || eleHeight);
      if (width && !heightOrSquare) {
        canvasHeight = Math.floor(eleHeight * (width / eleWidth));
      }

      const opt = {
        canvasWidth,
        canvasHeight
      };

      if (canvasWidth === canvasHeight) {
        if (eleWidth !== eleHeight) {
          if (eleWidth > eleHeight) {
            eleWidth = eleHeight;
          }
          else {
            eleHeight = eleWidth;
          }
        }
      }
      else {
        eleHeight = Math.floor(canvasHeight * (canvasWidth / eleWidth));
        if (eleHeight > element.clientHeight) {
          eleHeight = element.clientHeight;
          eleWidth = Math.floor(canvasWidth * (canvasHeight / eleHeight));
        }
      }

      bbn.fn.log({
        canvasWidth,
        canvasHeight,
        width: eleWidth,
        height: eleHeight,
      });
      return await htmlToImage.toPng(element, {
        canvasWidth,
        canvasHeight,
        width: eleWidth,
        height: eleHeight,
      });
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
};

import cpHtml from './screenshot.html';
import cpStyle from './screenshot.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/screenshot.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
    
  }
  catch (err) {}
}

export default {
  name: 'bbn-screenshot',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
