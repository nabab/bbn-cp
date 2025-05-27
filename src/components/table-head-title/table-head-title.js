/**
 * @file bbn-table component
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.cell
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.componentInside
  ],
  tag: 'th',
  props: {
    groupIndex: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    const table = this.$origin;
    return {
      table
    }
  },
  computed: {
    groupCol() {
      return this.table.groupCols[this.groupIndex]
    }
  },
  beforeMount() {
    if (bbn.fn.isInViewport(this)) {
      this.source.ready = true;
    }
    else {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.source.ready = true;
            observer.disconnect();
          }
        })
      })

      observer.observe(this)
    }
  },
};

import cpHtml from './table-head-title.html';
import cpStyle from './table-head-title.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-head-title.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-head-title',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
