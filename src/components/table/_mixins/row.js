import bbn from "@bbn/bbn";

export default {
  props: {
    /**
     * Alternates the background color on the list
     * @prop {Boolean} [false] alternateBackground
     */
    alternateBackground: {
      type: Boolean,
      default: true
    },

  },
  data() {
    return {
      currentRows: [],
      rowHeight: null,
      intersectionTimeout: null,
      rowsShownFinished: false,
      rowsShownTimer: null
    };
  },
  methods: {
    updateSequences(tr) {
      const first = this.firstColumnVisible;
      const last  = this.lastColumnVisible;
      const row = bbn.fn.getRow(this.currentRows, {tr});
      //bbn.fn.log(["Updating sequences for row", row, first, last]);
      if (!row.visible) {
        row.visible = true;
      }

      if (!last || !bbn.fn.count(row.sequences, {visible: false})) {
        return;
      }

      const seq = row.sequences;
      let prevSeq;
      let done;
      const updateItems = [];
      for (let i = 0; i < seq.length; i++) {
        if (seq[i].fixed) {
          continue;
        }

        if ((first <= seq[i].end) && (last >= seq[i].start)) {
          done = true;
          if (!seq[i].visible) {
            if (first === seq[i].start) {
              if (last === seq[i].end) {
                if (seq[i+1] && seq[i+1].visible && !seq[i+1].fixed) {
                  seq.splice(i, 1);
                  i--;
                  seq[i].start = start;
                }
                else {
                  seq[i].visible = true;
                }

                updateItems.push(i);
              }
              else if (last < seq[i].end) {
                seq[i].start = last + 1;
                const newSeq = {
                  start: first,
                  end: last,
                  uid: bbn.fn.randomString(),
                  visible: true
                };
                seq.splice(i, 0, newSeq);
                updateItems.push(i);
                i++;
              }
              else {
                if (seq[i+1] && seq[i+1].visible && !seq[i+1].fixed) {
                  seq.splice(i, 1);
                  seq[i].start = first;
                  updateItems.push(i);
                }
                else {
                  seq[i].end = last;
                  if (seq[i+1]) {
                    seq[i+1].start = last + 1;
                    updateItems.push(i+1);
                  }
                }
              }
            }
            else if (first > seq[i].start) {
              const oldEnd = seq[i].end;
              seq[i].end = first - 1;
              if (oldEnd === last) {
                if (seq[i+1] && seq[i+1].visible && !seq[i+1].fixed) {
                  seq[i+1].start = first;
                  updateItems.push(i+1);
                }
                else {
                  const newSeq = {
                    start: first,
                    end: last,
                    uid: bbn.fn.randomString(),
                    visible: true
                  };
                  seq.splice(i+1, 0, newSeq);
                  i++;
                }
              }
              else if (oldEnd > last) {
                const newSeq = {
                  start: first,
                  end: last,
                  uid: bbn.fn.randomString(),
                  visible: true
                };
                seq.splice(i+1, 0, newSeq, {
                  start: last + 1,
                  end: oldEnd,
                  uid: bbn.fn.randomString(),
                  visible: false
                });
                i += 2;
              }
              else {
                if (seq[i+1] && seq[i+1].visible && !seq[i+1].fixed) {
                  seq[i+1].start = first;
                  updateItems.push(i+1);
                }
                else {
                  const newSeq = {
                    start: first,
                    end: oldEnd,
                    uid: bbn.fn.randomString(),
                    visible: true
                  };
                  seq.splice(i+1, 0, newSeq);
                  updateItems.push(i+1);
                  i++;
                }
              }
            }
            else if (prevSeq) {
              if (prevSeq.end < last) {
                prevSeq.end = last;
                seq[i].start = last + 1;
                updateItems.push(i-1);
              }
            }
            else {
              const newSeq = {
                start: seq[i].start,
                end: last,
                uid: bbn.fn.randomString(),
                visible: true
              };
              seq[i].start = last + 1;
              seq.splice(i, 0, newSeq);
              i++;
            }
          }
        }
        else if (done) {
          break;
        }

        prevSeq = seq[i];
      }

      seq.map((a, i) => {
        if (a.visible && !a.fixed && (!a.items || updateItems.includes(i))) {
          if (!a.items) {
            a.items = [];
          }

          for (let i = a.start; i <= a.end; i++) {
            const uid = this.currentColumns[i].uid;
            if (!uid) {
              throw new Error("Cannot find uid for column at index " + i);
            }

            const row = bbn.fn.getRow(a.items, {uid});
            if (row && (row === a.items[i - a.start])) {
              continue;
            }
            else if (row) {
              row.index = this.currentColumns[i].index;
              a.items.splice(i - a.start, 0, row);
            }
            else {
              a.items.splice(i - a.start, 0, {index: this.currentColumns[i].index, uid});
            }
          }
        }
      });

      tr.style.height = 'auto';
    },
    onRowCreated(e) {
      const tr = e.target;
      const sequences = [];
      if (this.groupCols[0].cols.length) {
        sequences.push({
          start: 0,
          end: this.groupCols[0].cols.length - 1,
          uid: bbn.fn.randomString(),
          fixed: true,
          isLeft: true,
          visible: true,
          items: this.groupCols[0].cols.map(c => ({index: c.index, uid: c.uid})),
        });
      }
      sequences.push({
        start: this.groupCols[0].cols.length,
        end: this.groupCols[0].cols.length + this.groupCols[1].cols.length - 1,
        uid: bbn.fn.randomString(),
        visible: false
      });
      if (!this.hasScrollX) {
        sequences[sequences.length - 1].visible = true;
        sequences[sequences.length - 1].items = this.groupCols[1].cols.map(c => ({index: c.index, uid: c.uid}));
      }
      if (this.groupCols[2].cols.length) {
        sequences.push({
          start: this.groupCols[0].cols.length + this.groupCols[1].cols.length,
          end: this.groupCols[0].cols.length + this.groupCols[1].cols.length + this.groupCols[2].cols.length - 1,
          uid: bbn.fn.randomString(),
          fixed: true,
          isRight: true,
          visible: true,
          items: this.groupCols[2].cols.map(c => ({index: c.index, uid: c.uid})),
        });
      }
      const row = {
        tr,
        visible: !this.scrollable || (this.groupable && this.isGroupActive),
        index: parseInt(tr.dataset.index),
        sequences
      };
      this.currentRows.push(row);
      this.$nextTick(() => {
        if (this.scrollIntersection) {
          this.scrollIntersection.observe(tr);
        }
      })
    },
    onRowDestroyed(e) {
      const tr = e.target;
      if (this.scrollIntersection) {
        this.scrollIntersection.unobserve(tr);
      }
    },
    setSelected(row, v) {
      if (this.selection) {
        const i = this.uid ? row.data[this.uid] : row.index;
        if (v) {
          if (!this.currentSelected.includes(i)) {
            this.currentSelected.push(i);
          }
        }
        else {
          const idx = this.currentSelected.indexOf(i);
          if (idx > -1) {
            this.currentSelected.splice(idx, 1);
          }
        }
      }
    },
    rowClass(row, i) {
      const cls = [];
      if (this.alternateBackground) {
        if (this.isGroupActive) {
          if (row.groupIndex % 2) {
            cls.push('bbn-alt');
          }
        }
        else if (i % 2) {
          cls.push('bbn-alt');
        }
      }

      if (this.selection && this.isSelected(row.index)) {
        cls.push('bbn-row-selected');
      }

      if (this.trClass) {
        if (bbn.fn.isFunction(this.trClass)) {
          cls.push(this.trClass(row.data));
        }
        else {
          cls.push(this.trClass);
        }
      }

      return cls;
    },
    rowStyle(row) {
      let res = '';
      if (this.trStyle) {
        if (bbn.fn.isFunction(this.trStyle)) {
          res = this.trStyle(row.data);
        }
        else {
          res = this.trStyle;
        }
      }

      return res;
    },
    intersectionEnter(tr) {
      if (!this.currentRows.filter(a => a.tr === tr).length) {
        return;
      }

      if (this.rowsShownFinished) {
        setTimeout(() => {
          if (!this.visibleRows.includes(tr)) {
            this.visibleRows.push(tr);
            this.updateSequences(tr);
          }
        }, 250);
      }
      else {
        this.visibleRows.push(tr);
        this.updateSequences(tr);
        clearTimeout(this.rowsShownTimer);
        this.rowsShownTimer = setTimeout(() => {
          this.rowsShownFinished = true;
        }, 250);
      }
    },
    intersectionExit(tr) {
      const idx = this.visibleRows.indexOf(tr);
      if (idx > -1) {
        this.visibleRows.splice(idx, 1);
      }
    },
  },
  created() {
    if (!this.rowsShownFinished && (!this.scrollable || this.groupable)) {
      this.rowsShownFinished = true;
    }
  }
};

