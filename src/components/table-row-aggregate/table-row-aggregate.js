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
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.editableList
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.dataEditor
   * @mixin bbn.cp.mixins.localStorage
   * @mixin bbn.cp.mixins.observer
   * @mixin bbn.cp.mixins.data
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.row
  ],
  tag: 'tr',
  props: {},
  data() {
    return {};
  },
};

import cpHtml from './table-row-aggregate.html';
import cpStyle from './table-row-aggregate.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-row-aggregate.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-row-aggregate',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
