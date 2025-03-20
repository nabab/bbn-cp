export default {
  data() {
    return {
      editedIndex: false
    }
  },
  methods: {
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
        (this.filteredData[idx].index === this.editedIndex);
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

