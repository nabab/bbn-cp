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
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.row
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.row
  ],
  tag: 'tr',
  props: {
    group: {
      type: Number,
      required: true
    }
  },
  computed: {
    numberGroup() {
      return bbn.fn.count(this.filteredData, {[this.table.cols[this.group].field]: this.source[this.table.cols[this.group].field]})
    },
    hasExpander() {
      return this.table.hasExpander
    },
    isExpanded() {
      return this.table.isExpanded(this.source, this.table.items[this.index].index)
    },
    isAggregated() {
      return this.table.isAggregated && false
    },
  },
  data() {
    return {};
  },
};

import cpHtml from './table-row-group.html';
import cpStyle from './table-row-group.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-row-group.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-row-group',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
