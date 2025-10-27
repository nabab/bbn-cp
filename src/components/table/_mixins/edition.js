export default {
  data() {
    return {
      editedIndex: false
    }
  },
  methods: {
    getEditableComponent(col) {
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
     * Returns the object of properties to bind with the editable component.
     * @method getEditableOptions
     * @param {Object} col
     * @returns {Object}
     */
    getEditableOptions(col) {
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
     * Return true if the given row is changed from originalData.
     * @method isDirty
     * @param {Object} row
     * @param {Object} col
     * @param {Number} idx
     */
    isDirty(col, rowIndex) {
      return this.isBatch &&
        col &&
        (rowIndex !== this.editedIndex) &&
        (col.editable !== false) &&
        col.field &&
        this.originalData &&
        this.originalData[rowIndex] &&
        (this.items[rowIndex].data[col.field] != this.originalData[rowIndex][col.field])
    },
    /**
     * Returns true if a column is editable.
     * @method isEditable
     * @param {Object} row
     * @param {Object} col
     * @param {Number} index
     * @returns {Boolean}
     */
    isEditable(row, col, index) {
      if (!this.editable) {
        return false;
      }
      if (bbn.fn.isFunction(col.editable)) {
        return col.editable(row, col, index)
      }
      return col.editable !== false
    },
    /**
     * Returns true if the given row is edited.
     * @method isEdited
     * @param {Object} data
     * @param {Object} col
     * @param {Number} idx
     * @fires isEditable
     * @returns {Boolean}
     */
    isEdited(data, col, idx) {
      return this.isEditable(data, col, idx) &&
        (this.editMode === 'inline') &&
        (this.filteredData[idx]?.index === this.editedIndex);
    },
    /**
     * Returns an object of the default values for the different types of fields.
     * @method defaultObject
     * @returns {Object}
     */
    defaultObject() {
      let o = {};
      bbn.fn.iterate(bbn.cp.mixins.field.props, (v, n) => {
        if (v.default !== undefined) {
          o[n] = bbn.fn.isFunction(v.default) ? v.default() : v.default;
        }
      })
      return o;
    },
    /**
     * Normalizes the row's data.
     * @method _defaultRow
     * @param initialData
     * @returns {Object}
     */
    _defaultRow(initialData) {
      let res = {},
        data = initialData ? bbn.fn.clone(initialData) : {};
      bbn.fn.each(this.cols, function (a) {
        if (a.field) {
          if (data[a.field] !== undefined) {
            res[a.field] = data[a.field];
          }
          else if (a.default !== undefined) {
            res[a.field] = bbn.fn.isFunction(a.default) ? a.default() : a.default;
          }
          else if (a.nullable) {
            res[a.field] = null;
          }
          else if (a.type) {
            switch (a.type) {
              case 'number':
              case 'money':
                res[a.field] = a.min > 0 ? a.min : 0;
                break;
              default:
                res[a.field] = '';
            }
          }
          else {
            res[a.field] = '';
          }

          if (bbn.fn.isArray(res[a.field])) {
            res[a.field] = res[a.field].slice();
          }
          else if (res[a.field] instanceof (Date)) {
            res[a.field] = new Date(res[a.field].getTime());
          }
          else if ((null !== res[a.field]) && (typeof res[a.field] === 'object')) {
            res[a.field] = bbn.fn.clone(res[a.field]);
          }
        }
      });
      return res;
    },

  }
}

