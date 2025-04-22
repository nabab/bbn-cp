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
