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
import { snapdom } from '@zumer/snapdom';

const cpDef = {
  statics() {
    return {htmlToImage, snapdom};
  },
  methods: {
    async capture(ele, width, height, meth = 'png') {
      let fn;
      switch (meth) {
        case 'jpeg':
          fn = snapdom.toJpeg;
          break;
        case 'blob':
          fn = snapdom.toBlob;
          break;
        case 'svg':
          fn = snapdom.toSvg;
          break;
        default:
          fn = snapdom.toPng;
      }

      return new Promise((resolve) => {
        ele.classList.add('bbn-screenshot-element');
        setTimeout(() => {
          const opt = {
            iconFonts: ['.nf'],
            backgroundColor: 'white',
            filter: e => e.tagName !== 'BBN-CHART',
            width: ele.clientWidth,
            height: ele.clientHeight,
          };
          /*
          if (width) {
            opt.width = width;
          }
          if (height) {
            opt.height = height;
          }*/

          try {
            fn(ele, opt).then(img => {
              bbn.fn.log("RESPONSE", img)
              ele.classList.remove('bbn-screenshot-element');
              resolve(img || false);
            }).catch(e => {
              bbn.fn.log("There has been an error2", e);
              ele.classList.remove('bbn-screenshot-element');
              resolve(false);
            })
          }
          catch (e) {
            bbn.fn.log("There has been an error", e);
            ele.classList.remove('bbn-screenshot-element');
            resolve(false);
          }
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
