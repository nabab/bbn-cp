/**
 * @file bbn-table component
 *
 * @description  bbn-table is a powerful component of wide configuration that offers vast customizations.
 * The source obtains it by giving a url to retrieve data or directly supplying an array.
 * It allows you to easily modify the content by entering new data in the input field corresponding to the type of column being defined.
 * The table rows can be sorted by clicking on a column header.
 * Table elements can be filtered with the help of a built-in filters in the column headings or using a multifilter panel and a reset by removing a filter or all filters with just one click.
 * It's possible to create fixed areas that will keep their position by always having them available during scrolling.
 * It gives the possibility to group the data.
 * These are some examples of what can be done with this component, from the few configuration lines we can express considerable work complexity.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
const cpDef = {
  props: {
    /**
     * @prop {Object} source
     * @memberof bbn-table-dots
     */
    source: {
      type: Object
    }
  },
  data() {
    return {
      /**
     * @data {Boolean} [false] visible
     * @memberof bbn-table-dots
     */
      visible: false,
      /**
     * @data {HTMLElement} table
     * @memberof bbn-table-dots
     */
      table: this.closest('bbn-table')
    }
  },
  methods: {
    /**
     * @method {Object} checkVisible
     * @memberof bbn-table-dots
     */
    checkVisible() {
      if (this.table.maxRowHeight && this.table.zoomable) {
        let td = this.$el.closest('td');
        if (!!td && !!td.firstElementChild && !!td.firstElementChild.firstElementChild) {
          let styleFirst = window.getComputedStyle(td.firstElementChild),
            styleSecond = window.getComputedStyle(td.firstElementChild.firstElementChild);
          this.visible = (parseFloat(styleSecond.height) + parseFloat(styleFirst.paddingTop) + parseFloat(styleFirst.paddingBottom)) > this.table.maxRowHeight;
          if (this.visible) {
            td.firstElementChild.firstElementChild.style.setProperty('height', 'calc(' + this.table.maxRowHeight + 'px - 2.3rem)');
            td.firstElementChild.firstElementChild.style.overflow = 'hidden';
          }
        }
      }
      else {
        this.visible = false;
      }
    }
  },
  /**
   * @event mounted
   * @memberof bbn-table-dots
   * @fires checkVisible
   */
  mounted() {
    this.checkVisible();
  }
};

import cpHtml from './table-dots.html';
import cpStyle from './table-dots.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-dots.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-dots',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
