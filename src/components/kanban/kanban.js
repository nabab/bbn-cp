/**
 * @file bbn-kanban component
 * @description The bbn-kanban.
 * @copyright BBN Solutions
 * @author Mirko Argentino
 * @created 11/10/2022
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.list
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.list
  ],
  props: {
    /**
     * The component to use for the toolbar
     * @prop {String|Object|HTMLElement} toolbar
     */
    toolbar: {
      type: [String, Object, HTMLElement]
    },
    /**
     * The name of the property used to specify the color to use as the background
     * @prop {String} ['backgroundColor'] sourceBackgroundColor
     */
    sourceBackgroundColor: {
      type: String,
      default: 'backgroundColor'
    },
    /**
     * The name of the property used to specify the color to use for the font
     * @prop {String} ['fontColor'] sourceFontColor
     */
    sourceFontColor: {
      type: String,
      default: 'fontColor'
    },
    /**
     * The name of the property used to specify the component for the toolbar
     * @prop {String} ['toolbar'] sourceToolbar
     */
    sourceToolbar: {
      type: String,
      default: 'toolbar'
    },
    /**
     * The name of the property used to specify the item component
     * @prop {String} ['component'] sourceComponent
     */
    sourceComponent: {
      type: String,
      default: 'component'
    },
    /**
     * Defines the behaviour of the columns about the scroll.
     * @prop {Boolean} [true] scrollable
     */
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * The column's width
     * @prop {Number|String} ['40rem'] columnWidth
     */
    columnWidth: {
      type: [Number, String],
      default: '40rem'
    },
    /**
     * Set to true allows the columns children to be filtered.
     * @prop {Boolean} [false] childrenFilterable
     */
    childrenFilterable: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the filters of the columns' children.
     * @prop {Object} [{logic: 'AND',conditions: []}] filters
     */
    childrenFilters: {
      type: [Object, Function],
      default(){
        return {
          logic: 'AND',
          conditions: []
        };
      }
    },
    /**
     * Set to true allows columns' children to be sortable.
     * @prop {Boolean} [false] childrenSortable
     */
    childrenSortable: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the order of the columns' children.
     * @prop {Array|Object} [[]] ChildrenOrder
     */
    childrenOrder: {
      type: [Array, Object],
      default(){
        return [];
      }
    },
    /**
     * On first dataloaded event collapse empty columns
     * @prop {Boolean} [true] collapseEmpty
     */
    collapseEmpty: {
      type: Boolean,
      default: true
    },
    /**
     * The options for the component
     * @prop {Object} componentOptions
     */
    componentOptions: {
      type: Object
    },
    /**
     * The name of the property used to specify the component's options of the item
     * @prop {String} ['componentOptions'] sourceComponentOptions
     */
    sourceComponentOptions: {
      type: String,
      default: 'componentOptions'
    },
    /**
     * The limit of rows to be shown in a page of the list.
     * @prop {Number} [0] limit
     */
    limit: {
      type: Number,
      default: 0
    },
    /**
     * The limit of rows to be shown in a page of the children list.
     * @prop {Number} [10] limit
     */
    childrenLimit: {
      type: Number,
      default: 10
    },
    /**
     * @prop {Boolean} [true] loading
     */
    loading: {
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      /**
       * @data {Array} [[]] columns
       */
      columns: []
    }
  },
  methods: {
    /**
     * Normalizes the data
     * @method _map
     * @param {Array} data
     * @return {Array}
     */
    _map(data) {
      if (bbn.fn.isArray(data)) {
        if (data.length
          && !bbn.fn.isObject(data[0])
          && !bbn.fn.isArray(data[0])
          && this.sourceValue
          && this.sourceText
        ) {
          data = data.map(a => {
            return {
              [this.sourceValue]: a,
              [this.sourceText]: a
            };
          });
        }
        data = data.map(a => {
          a.opened = false;
          return a;
        });

        return (this.map ? data.map(this.map) : data).slice();
      }
      return [];
    },
    /**
     * Collapses all columns
     * @method collapseAll
     */
    collapseAll(){
      bbn.fn.each(this.columns, c => {
        c.collapse();
      });
    },
    /**
     * Expands all columns
     * @method expandAll
     */
    expandAll(){
      bbn.fn.each(this.columns, c => {
        c.expand();
      });
    },
    /**
       * Reload all columns
       * @method reloadAll
       * @fires updateData
       * @fires $nextTick
       */
    reloadAll(){
      this.updateData().then(() => {
        this.$nextTick(() => {
          bbn.fn.each(this.columns, c => {
            c.updateData();
          });
        });
      });
    },
    /**
     * Fires setCheckCollapse method on every columns
     * @method setAllCheckCollapse
     */
    setAllCheckCollapse(){
      bbn.fn.each(this.columns, c => c.setCheckCollapse(true));
    },
    /**
     * Adds a column to the columns list
     * @param {Object|HTMLElement} column
     */
    addColumn(column){
      this.columns.push(column);
    },
    /**
     * Removes a column form the columns list
     * @method removeColumn
     * @param {Object|HTMLElement} column
     */
    removeColumn(column){
      if (this.columns.length && column.bbnUid) {
        let idx = bbn.fn.search(this.columns, 'bbnUid', column.bbnUid);
        if (idx > -1) {
          this.columns.splice(idx, 1);
        }
      }
    }
  }
};

import cpHtml from './kanban.html';
import cpStyle from './kanban.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/kanban.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-kanban',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};

