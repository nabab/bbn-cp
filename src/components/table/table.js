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

import aggregation from './_mixins/aggregation.js';
import buttons from './_mixins/buttons.js';
import columns from './_mixins/columns.js';
import config from './_mixins/config.js';
import data from './_mixins/data.js';
import edition from './_mixins/edition.js';
import events from './_mixins/events.js';
import expand from './_mixins/expand.js';
import exporter from './_mixins/exporter.js';
import filter from './_mixins/filter.js';
import group from './_mixins/group.js';
import init from './_mixins/init.js';
import picker from './_mixins/picker.js';
import selection from './_mixins/selection.js';
import size from './_mixins/size.js';
import sort from './_mixins/sort.js';
import style from './_mixins/style.js';
import title from './_mixins/title.js';
import ui from './_mixins/ui.js';
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
    bbn.cp.mixins.resizer,
    bbn.cp.mixins.editableList,
    bbn.cp.mixins.list,
    bbn.cp.mixins.config,
    bbn.cp.mixins.dataEditor,
    bbn.cp.mixins.localStorage,
    bbn.cp.mixins.observer,
    bbn.cp.mixins.keepCool,
    bbn.cp.mixins.data,
    aggregation,
    buttons,
    columns,
    config,
    data,
    edition,
    events,
    expand,
    exporter,
    filter,
    group,
    init,
    picker,
    selection,
    size,
    sort,
    style,
    title,
    ui
  ],
  iface() {
    return {
      config: {
        name: 'bbns-column',
        data: 'columns',
        props: {
          /**
           * The width of the component.
           * @prop {String|Number} width
           * @memberof fieldComponent
           */
          width: {
            type: [String, Number],
          },
          /**
           * The min-width of the component.
           * @prop {String|Number} minWidth
           * @memberof fieldComponent
           */
          minWidth: {
            type: [String, Number],
          },
          /**
           * The max-width of the component.
           * @prop {String|Number} maxWidth
           * @memberof fieldComponent
           */
          maxWidth: {
            type: [String, Number],
          },
          /**
           * The render of the component.
           * @prop {String|Function} render
           * @memberof fieldComponent
           */
          render: {
            type: [String, Function]
          },
          /**
           * The label of the component.
           * @prop {String|Number} label
           * @memberof fieldComponent
           */
          label: {
            type: [String, Number]
          },
          /**
           * The full label of the component.
           * @prop {String} flabel
           * @memberof fieldComponent
           */
          flabel: {
            type: String
          },
          /**
           * @prop {String|Object} tcomponent
           * @memberof fieldComponent
           */
          tcomponent: {
            type: [String, Object]
          },
          /**
           * The icon of the component.
           * @prop {String} icon
           * @memberof fieldComponent
           */
          icon: {
            type: String
          },
          /**
           * The classes added to the component.
           * @prop {String|Function} cls
           * @memberof fieldComponent
           */
          cls: {
            type: [String, Function]
          },
          /**
           * The component's type.
           * @prop {String} type
           * @memberof fieldComponent
           */
          type: {
            type: String
          },
          /**
           * The component's field.
           * @prop {String} field
           * @memberof fieldComponent
           */
          field: {
            type: String
          },
          /**
           * Defines if the component has to be fixed.
           * @prop {Boolean|String} [false] fixed
           * @memberof fieldComponent
           */
          fixed: {
            type: [Boolean, String],
            default: false
          },
          /**
           * Defines if the component has to be invisible.
           * @prop {Boolean} invisible
           * @memberof fieldComponent
           */
          invisible: {
            type: Boolean
          },
          /**
           * Defines if the componenent has to be encoded.
           * @prop {Boolean} [false] encoded
           * @memberof fieldComponent
           */
          encoded: {
            type: Boolean,
            default: false
          },
          /**
           * Defines if the componenent has to be sortable.
           * @prop {Boolean|Function} [true] sortable 
           * @memberof fieldComponent
           */
          sortable: {
            type: [Boolean, Function],
            default: true
          },
          /**
           * Defines if the componenent has to be editable.
           * @prop {Boolean|Function} [true] editable 
           * @memberof fieldComponent
           */
          editable: {
            type: [Boolean, Function],
            default: true
          },
          /**
           * Defines if the componenent has to be filterable.
           * @prop {Boolean|Function} [true] filterable 
           * @memberof fieldComponent
           */
          filterable: {
            type: [Boolean, Function],
            default: true
          },
          /**
           * Defines if the componenent has to be resizable.
           * @prop {Boolean|Function} [true] resizable 
           * @memberof fieldComponent
           */
          resizable: {
            type: [Boolean, Function],
            default: true
          },
          /**
           * Defines if the componenent has to be showable.
           * @prop {Boolean|Function} [true] showable 
           * @memberof fieldComponent
           */
          showable: {
            type: [Boolean, Function],
            default: true
          },
          /**
           * Defines if the componenent can have a null value.
           * @prop {Boolean|Function} nullable 
           * @memberof fieldComponent
           */
          nullable: {
            type: [Boolean, Function],
          },
          /**
           * The buttons of the component.
           * @prop {Array|Function} buttons 
           * @memberof fieldComponent
           */
          buttons: {
            type: [Array, Function]
          },
          /**
           * The source of the component.
           * @prop {Array|Object|String|Function} source 
           * @memberof fieldComponent
           */
          source: {
            type: [Array, Object, String, Function]
          },
          /**
           * Defines if the the value of the component is required.
           * @prop {Boolean|Function} required 
           * @memberof fieldComponent
           */
          required: {
            type: [Boolean, Function]
          },
          /**
           * Defines the precision of the component.
           * @prop {Number} [0] precision 
           * @memberof fieldComponent
           */
          precision: {
            type: Number
          },
          /**
           * Defines the number of decimals for the component.
           * @prop {Number} [0] decimals 
           * @memberof fieldComponent
           */
          decimals: {
            type: Number
          },
          /**
           * Defines the precision of the component.
           * @prop {Number} [0] precision 
           * @memberof fieldComponent
           */
          unit: {
            type: String
          },
          /**
           * Defines the options of the component.
           * @prop {Object|Function} options
           * @memberof fieldComponent
           */
          options: {
            type: [Object, Function],
            default() {
              return {};
            }
          },
          /**
           * Defines the editor of the component.
           * @prop {String|Object} editor
           * @memberof fieldComponent
           */
          editor: {
            type: [String, Object]
          },
          /**
           * Defines the maxLength of the component.
           * @prop {Number} maxLength 
           * @memberof fieldComponent
           */
          maxLength: {
            type: Number
          },
          /**
           * Defines the max number of chars visible in reading.
           * @prop {Number} maxVisible 
           * @memberof fieldComponent
           */
          maxVisible: {
            type: Number
          },
          /**
           * Defines the sqlType of the component.
           * @prop {String} sqlType 
           * @memberof fieldComponent
           */
          sqlType: {
            type: String
          },
          /**
           * @prop {String|Array} aggregate
           * @memberof fieldComponent
           */
          aggregate: {
            type: [String, Array]
          },
          /**
           * Define a component to use.
           * @prop {String|Object} component
           * @memberof fieldComponent
           */
          component: {
            type: [String, Object]
          },
          /**
           * A function to map the data of the component.
           * @prop {Function} mapper
           * @memberof fieldComponent
           */
          mapper: {
            type: Function
          },
          /**
           * Defines the group of the component.
           * @prop {String} group
           * @memberof fieldComponent
           */
          group: {
            type: String
          },
          titleCls: {
            type: [String, Object, Array],
            default: ''
          }
        },
      }
    }
  },
  data() {
    return {
      /**
       * @data {Boolean} [false] table
       */
      table: false,
      /**
       * @data {Boolean} [false] updaterTimeout
       */
      updaterTimeout: false,
      /**
       * @data {} [null] rowIndexTimeOut
       */
      rowIndexTimeOut: null,
      /**
       * @data {Number|Array} [0] scrollOffset
       */
      scrollOffset: 0,
    };
  },
  /**
   * Adds bbns-column from the slot and sets the initial configuration of the table.
   * @event created
   * @fires addColumn
   * @fires setConfig
   * @fires getStorage
   */
  created() {
    this.componentClass.push('bbn-resize-emitter');
    // Adding bbns-column from the slot
    if (this.$slots.default) {
      //bbn.fn.log("SLOTS TABLE CREATED", this.$slots, this.$el.bbnSlots);
      for (let node of this.$slots.default) {
        if (node.bbnSchema?.tag === 'tr') {
          this.hasTrSlot = true;
          break;
        }
      }
    }

    if (this.columns.length) {
      bbn.fn.each(this.columns, a => this.addColumn(a))
    }

    bbn.fn.log("TABLE CREATED", this.columns.length);

    this.initConfig();
    this.$on('addTmp', () => {
      let scroll = this.getRef('scroll');
      if (bbn.cp.isComponent(scroll)
        && bbn.fn.isFunction(scroll.scrollStartY)
        && bbn.fn.isFunction(scroll.scrollStartX)
      ) {
        scroll.scrollStartY();
        scroll.scrollStartX();
      }
    });
  },
  /**
   * After the initialization of the component sets the property ready on true.
   * @event mounted
   * @fires init
   * @fires updateData
   */
  mounted() {
    this.container = this.getRef('container');
    this.isTable = !!this.closest('bbn-table');
    let floater = this.closest('bbn-floater');
    if (floater) {
      if (floater.ready) {
        this.init();
        this.$once('dataloaded', () => {
          this.ready = true;
          this.setResizeEvent();
          floater.onResize();
        });
      }
      else {
        floater.$on('ready', () => {
          this.init();
          this.$once('dataloaded', () => {
            this.ready = true;
            this.setResizeEvent();
            floater.onResize();
          });
        });
      }
      if (this.isAutobind) {
        this.updateData();
      }
    }
    else {
      this.$once('dataloaded', () => {
        this.ready = true;
      });
      this.init(!!this.isAutobind);
    }

    if (this.titles) {
      setTimeout(() => {
        this.scrollOffset = this.getRef('thead') ? [this.$position(this.getRef('thead')).height, 0] : 0;
      }, 1000);
    }
  }
};

import cpHtml from './table.html';
import cpStyle from './table.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
