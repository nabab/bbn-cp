/**
 * @file bbn-combo component
 * @description The easy-to-implement bbn-combo component allows you to choose a single value from a user-supplied list or to write new.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 10/02/2017.
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.componentInside
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.list,
    bbn.cp.mixins.componentInside
  ],
  props: {
    /**
     * Max Image Width
     *
     * @prop {Number} [''] imgWidth
     */
    imgWidth: {
      type: Number,
      default: 420
    },
    /**
     * The max columns number
     * @prop {Number} maxColumns
     */
    maxColumns: {
      type: Number
    }
  },
  data(){
    return {
      windowWidth: window.innerWidth
    }
  },
  computed: {
    /**
     * @computed rowCount
     * @returns {Number}
     */
    rowCount(){
      let res = Math.ceil(this.windowWidth / this.imgWidth);
      if (!!this.maxColumns
        && (this.maxColumns < res)
      ) {
        res = this.maxColumns;
      }
      return res;
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    this.ready = true;
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  },
  watch: {
    currentPage() {
      let sc = this.closest('bbn-scroll');
      while (sc && !sc.scrollable) {
        sc = sc.closest('bbn-scroll');
      }

      if (sc) {
        sc.scrollTo(0, this.$el.offsetTop, true);
      }
      else {
        let p = this.$el;
        while (p) {
          if (p.scrollHeight && p.clientHeight && p.scrollTop) {
            let pos = this.$el.offsetTop;
            p.scrollTop = pos;
            break;
          }
          else {
            p = p.parentNode;
          }
        }
      }
    }
  }
};

import bbn from '@bbn/bbn';
import cpHtml from './block-list.html';
import cpStyle from './block-list.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./block-list.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-block-list',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
