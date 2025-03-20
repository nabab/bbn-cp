export default {
  data() {
    return {
      /**
       * @data {DOMElement} [undefined] focusedElement
       */
      focusedElement: null,
      /**
       * @data {Number} [0] focusedElementX Horizontal coordinate of focused element
       */
      focusedElementX: 0,
      /**
       * @data {Number} [0] focusedElementY Vertical coordinate of focused element
       */
      focusedElementY: 0,
      /**
       * @data {Boolean} [false] focusedRow
       */
      focusedRow: false,
    }
  },
  methods: {
    /**
     * Focuses the given row index.
     * @method focusRow
     * @param {Event} ev
     * @param {Number} idx
     */
    focusRow(ev, idx) {
      if (ev.target.tagName !== 'BUTTON') {
        this.focusedRow = idx;
      }
    },
    /**
     * Blurs the given row index.
     * @method blurRow
     * @param {Event} ev
     * @param {Number} idx
     */
    blurRow(ev, idx) {
      if (ev.target.tagName !== 'BUTTON') {
        this.focusedRow = false;
      }
    },
    /**
     * @method clickCell
     * @param {Object} col
     * @param {Number} colIndex
     * @param {Number} dataIndex
     * @emits click-row
     * @emits click-cell
     */
    clickCell(col, colIndex, dataIndex) {
      if (this.filteredData[dataIndex]) {
        this.$emit('click-row', this.filteredData[dataIndex].data, dataIndex);
        this.$emit('click-cell', col, colIndex, dataIndex);
      }
    },
    /**
     * @method dbclickCell
     * @param {Object} col
     * @param {Number} colIndex
     * @param {Number} dataIndex
     */
    dbclickCell(col, data, itemIndex, force) {
      if (this.zoomable && (!!col.zoomable || force)) {
        let obj = {
          label: col.label || col.flabel,
          minHeight: '20%',
          minWidth: '20%'
        };
        if (!!col.component) {
          obj.component = col.component;
          obj.source = bbn.fn.isFunction(col.mapper) ? col.mapper(data) : data;
          obj.componentOptions = col.options;
        }
        else if (bbn.fn.isFunction(col.render)) {
          obj.content = `<div class="bbn-spadding">${col.render(data, col, itemIndex)}</div>`;
        }
        else if (col.field) {
          obj.content = `<div class="bbn-spadding">${getProp(data, col.field)}</div>`;
        }
        else {
          obj.content = `<div class="bbn-spadding">${data.text}</div>`;
        }
        this.getPopup().open(obj);
      }
    },
    /**
     * Removes the focus from the given row.
     * @param {Number} idx 
     */
    focusout(idx) {
      this.clickedTd = null;
      if ((idx === undefined) || (idx === this.focusedRow)) {
        this.focused = false;
        //this.focusedElement = undefined;
        setTimeout(() => {
          if (!this.focused) {
            this.focusedRow = false;
          }
        }, 50);
      }
    },
    /**
     * Focuses the given row.
     * @param {Number} idx 
     * @param {Event} e 
     */
    focusin(idx, e) {
      if (!e.target.closest('td')
        || !e.target.closest('td').classList.contains('bbn-table-buttons')
        || e.target.closest('td').classList.contains('bbn-table-edit-buttons')
      ) {
        this.focused = true;
        this.clickedTd = e.target;
        //this.setFocusedElement(e)
        if (this.focusedRow !== idx) {
          this.focusedRow = idx;
        }
      }
    },
    setFocusedElement(ev) {
      if (this.editable
        && (this.editMode === 'inline')
        && (this.tmpRow || this.editedRow)
        && (ev.target.tagName !== 'TR')
        && (ev.target.tagName !== 'TD')
      ) {
        let e = ev.target.closest('td'),
          pos = e.getBoundingClientRect();
        this.focuseElementX = pos.x;
        this.focusedElementY = pos.y - pos.height;
        this.focusedElement = ev.target;
      }
    },
    /**
     * The behavior of the component at mouseMove.
     * @method moveMouse
     * @param {Event} e
     * @fires keepCool
     * @fires checkFilterWindow
     */
    moveMouse(e) {
      this.keepCool(() => {
        this.checkFilterWindow(e);

      }, 'moveMouse')
    },
    /**
     * Prevents default if enter or tab keys are pressed.
     * @method onKeydown
     * @param {Event} e
     */
    onKeydown(e) {
      if (this.isBatch && this.editedRow && (e.which === 9) || (e.which === 13)) {
        e.preventDefault();
      }
    },

  },
  watch: {
    /**
     * @watch focusedRow
     * @fires isModified
     * @fires edit
     * @emit change
     * @emit focus
     * @emit focusout
     */
    focusedRow(newIndex, oldIndex) {
      if (bbn.fn.isNumber(oldIndex)) {
        this.$emit('focusout', oldIndex, this.items[oldIndex] ? this.items[oldIndex].index : undefined);
      }
      if (this.items[newIndex]) {
        this.$emit('focus', this.items[newIndex].data, newIndex, this.items[newIndex].index);
      }
      if (this.editable && (this.editMode === 'inline')) {
        if (bbn.fn.isNumber(oldIndex) && this.items[oldIndex]) {
          let idx = this.items[oldIndex].index;
          if ((this.editedIndex === idx)
            && ((idx === -1) || this.isModified(idx))
          ) {
            if (this.autoSave) {
              this.saveInline();
            }
            else if (this.autoReset) {
              this.cancel();
            }
            else {
              this.$emit('change', this.items[oldIndex].data, idx);
            }
          }
        }
        this.editedRow = false;
        if (bbn.fn.isNumber(newIndex)
          && this.items[newIndex]
          && !this.items[newIndex].group
          && !this.items[newIndex].expander
        ) {
          let comeFromAfter = bbn.fn.isNumber(oldIndex) && (newIndex === (oldIndex - 1));
          this.$nextTick(() => {
            this.edit(this.items[newIndex].data, null, newIndex);
            this.$nextTick(() => {

              let ele = this.clickedTd || this.getTr(newIndex);
              let nextInputs = ele ? ele.querySelectorAll('input') : [];
              let nextInput;
              bbn.fn.each(nextInputs, a => {
                if (a.offsetWidth) {
                  nextInput = a;
                  if (!comeFromAfter) {
                    return false;
                  }
                }
              });
              if (nextInput) {
                nextInput.focus();
              }
            });
          });
        }
      }
    },
  }
}

