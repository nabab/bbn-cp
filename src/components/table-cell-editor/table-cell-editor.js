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
    bbn.cp.mixins.cell,
    bbn.cp.mixins.componentInside
  ],
  tag: 'td',
  data() {},
  computed: {
    /**
     * Return false if a required field of a column is missing.
     * @computed isEditedValid
     * @returns {Boolean}
     */
    isEditedValid() {
      let ok = true;
      if (this.table.tmpRow) {
        bbn.fn.each(this.table.columns, a => {
          if (a.field && a.required && !this.getProp(this.table.tmpRow, a.field)) {
            ok = false;
            return false;
          }
        });
      }
      return ok;
    },
  },
  methods: {
    /**
     * Returns the object of properties to bind with the editable component.
     * @method getEditableOptions
     * @param {Object} col
     * @param {Object} data
     * @returns {Object}
     */
    getEditableOptions() {
      const col = this.column;
      let res = col.options ? (
        bbn.fn.isFunction(col.options) ? col.options(this.source, col) : col.options
      ) : {};
      if (!res.name && col.field) {
        res.name = col.field;
      }
      if (col.type) {
        switch (col.type) {
          case "date":
            break;
          case "email":
            bbn.fn.extend(res, {
              type: 'email'
            });
            break;
          case "url":
            bbn.fn.extend(res, {
              type: 'url'
            });
            break;
          case "number":
            break;
          case "phone":
            break;
          case "money":
            break;
          case "bool":
          case "boolean":
            bbn.fn.extend(res, {
              value: 1,
              novalue: 0
            });
            break;
        }
      }
      if (col.source) {
        bbn.fn.extend(res, {
          source: col.source
        });
      } else if (col.editor) {
        res.source = this.source;
      }

      return res;
    },
    /**
     * If no editor is given to the table returns the correct component to edit the field basing on the column type.
     *
     * @method getEditableComponent
     * @param {Object} col
     * @param {Object} data
     * @return {String}
     */
    getEditableComponent() {
      const col = this.column;
      if (col.editor) {
        return col.editor;
      }
      if (col.type) {
        switch (col.type) {
          case "date":
            return 'bbn-datepicker';
          case "email":
            return 'bbn-input';
          case "url":
            return 'bbn-input';
          case "phone":
            return 'bbn-phone';
          case "number":
            return 'bbn-numeric';
          case "money":
            return 'bbn-numeric';
          case "bool":
          case "boolean":
            return 'bbn-checkbox';
        }
      }
      if (col.source) {
        return 'bbn-dropdown';
      }
      return 'bbn-input';
    },
    /**
     * Return true if the given row is changed from originalData.
     * @method isDirty
     * @param {Object} row
     * @param {Object} col
     * @param {Number} idx
     */
    isDirty() {
      return this.table.isBatch &&
        this.column &&
        (this.rowIndex !== this.table.editedIndex) &&
        (this.column.editable !== false) &&
        this.column.field &&
        this.table.originalData &&
        this.table.originalData[this.rowIndex] &&
        (this.getProp(this.source, this.column.field) != this.getProp(this.originalData[this.rowIndex], this.column.field))
    },
  }
};

import cpHtml from './table-cell-editor.html';
import cpStyle from './table-cell-editor.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/table-cell-editor.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-table-cell-editor',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
