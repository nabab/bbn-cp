export default {
  methods: {
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
            let shownColumns = this.source.cols.map(a => !a.invisible);
            return {
              table: table,
              formData: {
                changed: false
              },
              shownCols: shownColumns
            }
          },
          methods: {
            applyColumnsShown() {
              let toShow = [];
              let toHide = [];
              bbn.fn.each(this.source.cols, (a, i) => {
                if (a.invisible == this.shownCols[i]) {
                  if (this.shownCols[i]) {
                    toShow.push(a.field || i);
                  } else {
                    toHide.push(a.field || i);
                  }
                }
              });
              if (toShow.length) {
                table.show(toShow);
              }
              if (toHide.length) {
                table.show(toHide, true);
              }
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
                    this.shownCols.splice(i, 1, show);
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
                this.formData.changed = true;
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

