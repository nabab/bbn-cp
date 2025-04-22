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
    async capture(ele, width, height) {
      return new Promise((resolve) => {
        ele.classList.add('bbn-screenshot-element');
        setTimeout(() => {
          const opt = {
            width: ele.clientWidth,
            height: ele.clientHeight,
            quality: 0.95,
          };
          if (width) {
            opt.canvasWidth = width;
          }
          if (height) {
            opt.canvasHeight = height;
          }

          htmlToImage.toPng(ele, opt).then(img => {
            ele.classList.remove('bbn-screenshot-element');
            resolve(img || false);
          })
        }, 100)
      });
    },
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
