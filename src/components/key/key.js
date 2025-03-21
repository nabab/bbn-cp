/**
 * @file bbn-context component
 *
 * @description bbn-context is a menu that can be activated with a right click.
 * The source of the menu can have a tree structure.
 * ì
 * @copyright BBN Solutions
 *
 * @created 15/02/2017.
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [
      bbn.cp.mixins.basic,
    ],
    statics() {
      const DIRECTIONS = ['left', 'right', 'up', 'down'];
    },
    props: {
      /**
       * The content of the context menu.
       * @prop {String} content
       */
      content: {
        type: String
      },
    },
    data(){
      return {
        /**
         * True if the floating element of the menu is opened.
         * @data {Boolean} [false] showFloater ì
         */
        showFloater: false
      };
    },
    computed: {
      k(){
        return this.content.toLowerCase();
      },
      isReturn(){
        return ['return', 'enter'].includes(this.k)
      },
      isDelete(){
        return ['del', 'delete', 'backspace'].includes(this.k);
      },
      isSpace(){
        return (this.content === ' ') || (this.k === 'space');
      },
      isDouble(){
        return ['shift', 'tab', 'return', 'enter', 'backspace', 'caps lock'].includes(this.k);
      },
      isEscape(){
        return ['esc', 'escape'].includes(this.k);
      },
      isSpecial(){
        return this.k.length > 1;
      },
      isTop(){
        return this.isEscape || this.isFunction || ['print screen', 'prt', 'prt sc', 'prt sc.', 'screen lock', 'screen', 'scr lk', 'pause'].includes(this.k);
      },
      isFunction(){
        return this.isSpecial && (bbn.fn.substr(this.k, 0, 1) === 'f');
      },
      isArrow(){
        return (this.k.indexOf('arrow') === 0) || bbnKey.DIRECTIONS.includes(this.k)
      },
      rendered(){
        let st = bbn.fn.correctCase(this.k);
        if (st === 'Escape') {
          st = 'Esc';
        }
        if (st === 'Space') {
          st = ' ';
        }
        if ((st === 'Prt sc') || (st === 'Prt sc.') || (st === 'Print screen')) {
          st = 'Prt<br>Sc';
        }
        if ((st === 'Scr lk') || (st === 'Screen lock') || (st === 'Screen')) {
          st = 'Src<br>Lk';
        }
        return st;
      },
      arrowClass(){
        let cls = '';
        if (this.isArrow) {
          bbn.fn.each(bbnKey.DIRECTIONS, a => {
            if (this.k.indexOf(a) > -1) {
              cls = 'nf nf-fa-long_arrow_' + a;
              return false;
            }
          });
        }
        return cls;
      }
    }
  };

import cpHtml from './key.html';
import cpStyle from './key.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/key.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-key',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
