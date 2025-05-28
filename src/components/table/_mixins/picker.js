export default {
  data() {
    return {
      pickerStarted: false,
    }
  },
  methods: {
    /**
     * Show or hide the given column index.
     * @method show
     * @param {Array} colIndexes
     * @param {Boolean} hide
     * @fires $forceUpdate
     * @fires setConfig
     * @fires init
     */
    show(colIndexes, hide, noInit) {
      if (!Array.isArray(colIndexes)) {
        colIndexes = [colIndexes];
      }

      bbn.fn.each(colIndexes, colIndex => {
        let col = bbn.fn.isNumber(colIndex) ? this.cols[colIndex] : bbn.fn.getRow(this.cols, {field: colIndex})
        if (col) {
          if ((col.invisible && !hide) || (!col.invisible && hide)) {
            let idx = this.currentHidden.indexOf(col.field || colIndex);
            if (hide && (idx === -1)) {
              this.currentHidden.push(col.field || colIndex);
            } else if (!hide && (idx > -1)) {
              this.currentHidden.splice(idx, 1);
            }
          }
        }
      });
      if (!noInit) {
        this.setConfig(true);
        this.$forceUpdate();
        setTimeout(() => {
          this.init(true);
        }, 500);
      }
    },
    /**
     * Returns the list of the showable columns
     * @method pickableColumnList
     * @returns {Array}
     */
    pickableColumnList() {
      return this.cols.slice().map(a => {
        return a.showable !== false;
      });
    },
    /**
     * Opens the popup containing the column picker.
     * @method openColumnsPicker
     */
    openColumnsPicker() {
      let table = this;
      this.getPopup({
        label: bbn._("Columns' picker"),
        height: '90%',
        width: '90%',
        component: {
          template: `
<div class="bbn-table-column-picker">
  <bbn-form ref="scroll"
            :source="formData"
            :scrollable="true"
            :prefilled="true"
            @success="applyColumnsShown">
    <div class="bbn-padding">
      <ul bbn-if="source.titleGroups">
        <li bbn-for="(tg, idx) in source.titleGroups">
          <h3>
            <bbn-checkbox :checked="allVisible(tg.value)"
                          @change="checkAll(tg.value)"
                          :label="tg.text"/>
          </h3>
          <ul>
            <li bbn-for="(col, i) in source.cols"
                bbn-if="!col.fixed && (col.group === tg.value) && (col.showable !== false) && (col.label || col.flabel)">
              <bbn-checkbox bbn-model="shownCols[i]"
                            :value="true"
                            :novalue="false"
                            :label="col.flabel || col.label"
                            :contrary="true"/>
            </li>
          </ul>
        </li>
      </ul>
      <ul bbn-else>
        <li bbn-for="(col, i) in source.cols"
            bbn-if="!col.fixed && (col.showable !== false) && (col.label || col.flabel)">
          <bbn-checkbox bbn-model="shownCols[i]"
                        @change="check(col, i)"
                        :label="col.flabel || col.label"
                        :contrary="true"/>
        </li>
      </ul>
    </div>
  </bbn-form>
</div>
`,
          props: ['source'],
          data() {
            // An array of booleans for each column with true for shown and false for hidden
            let shownColumns = this.source.cols.map(a => !a.invisible);
            return {
              table,
              formData: {
                changed: false
              },
              shownCols: shownColumns
            }
          },
          methods: {
            applyColumnsShown() {
              table.pickerStarted = true;
              setTimeout(() => {
                let toShow = [];
                let toHide = [];
                bbn.fn.each(this.source.cols, (a, i) => {
                  // invisible is the opposite of shownCols
                  if (a.invisible == this.shownCols[i]) {
                    if (this.shownCols[i]) {
                      toShow.push(a.field || i);
                    } else {
                      toHide.push(a.field || i);
                    }
                  }
                });
  
                if (toShow.length) {
                  table.show(toShow, false, true);
                }
  
                if (toHide.length) {
                  table.show(toHide, true, true);
                }
  
                table.init();
                table.pickerStarted = false;
              });
            },
            allVisible(group) {
              let ok = true;
              bbn.fn.each(this.source.cols, (a, i) => {
                if ((a.showable !== false)
                  && (a.group === group)
                  && !a.fixed
                ) {
                  if (!this.shownCols[i]) {
                    ok = false;
                    return false;
                  }
                }
              });
              return ok;
            },
            check(col, index) {
              this.shownCols[index] = !this.shownCols[index];
            },
            checkAll(group) {
              let show = !this.allVisible(group);
              bbn.fn.each(this.source.cols, (a, i) => {
                if ((a.showable !== false) && (a.group === group) && !a.fixed) {
                  if (this.shownCols[i] != show) {
                    this.shownCols[i] = show;
                  }
                }
              });
              this.$forceUpdate();
            }
          },
          watch: {
            shownCols: {
              deep: true,
              handler() {
                if (!this.formData.changed) {
                  // If the shownCols array has changed, we set the changed flag to true
                  this.formData.changed = true;
                }
              }
            }
          }
        },
        source: {
          cols: this.cols,
          titleGroups: this.titleGroups
        }
      });
    },

  }
}

