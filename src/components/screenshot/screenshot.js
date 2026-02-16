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
import { snapdom, preCache } from '@zumer/snapdom';

const cpDef = {
  statics() {
    return {snapdom};
  },
  props: {
    messages: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async capture(ele, width, height, meth = 'png') {
      if (document.hidden) {
        return;
      }

      await bbn.fn.yieldToBrowser();
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

      const idMdg = this.messages ? appui.info(bbn._('Preparing screenshot...')) : null;

      return new Promise((resolve) => {
        ele.classList.add('bbn-screenshot-element');
        setTimeout(() => {
          const opt = {
            iconFonts: ['.nf'],
            fast: false,
            backgroundColor: 'white',
            filter: e => e.tagName !== 'BBN-CHART',
            //width: ele.clientWidth,
            //height: ele.clientHeight,
          };
          if (meth === 'blob') {
            opt.type = 'png';
          }
          if (width) {
            opt.width = width;
          }
          if (height) {
            opt.height = height;
          }

          try {
            fn(ele, opt).then(img => {
              ele.classList.remove('bbn-screenshot-element');
              resolve(img || false);
              if (idMdg) {
                appui.closeNotification(idMdg);
              }
            }).catch(e => {
              bbn.fn.log("There has been an error2", e);
              ele.classList.remove('bbn-screenshot-element');
              resolve(false);
              if (idMdg) {
                appui.closeNotification(idMdg);
              }
            })
          }
          catch (e) {
            bbn.fn.log("There has been an error", e);
            ele.classList.remove('bbn-screenshot-element');
            resolve(false);
            if (idMdg) {
              appui.closeNotification(idMdg);
            }
          }
        }, 100)
      });
    },
  },
  mounted() {

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
  catch (err) {
  }
}

export default {
  name: 'bbn-screenshot',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
