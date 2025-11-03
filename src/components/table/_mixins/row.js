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
      rowHeight: null,
      intersectionTimeout: null,
      rowsShownFinished: false,
      rowsShownTimer: null
    };
  },
  computed: {
    averageRowHeight() {
      return 40;
      if (this.currentRows.length) {
        let total = 0;
        let count = 0;
        this.currentRows.forEach(r => {
          if (r.height && r.visible) {
            total += r.height;
            count++;
          }
        });
        return count ? Math.floor(total / count) : this.rowHeight;
      }
    }
  },
  methods: {
    updateSequences(row) {
      const first = this.firstColumnVisible;
      const last  = this.lastColumnVisible;
      if (!row.visible) row.visible = true;
      const seq = row.sequences;
      if (!Array.isArray(seq) || !seq.length || !last) return;

      // Helpers
      const newUid = () => bbn.fn.randomString();
      const clamp  = (v, a, b) => Math.max(a, Math.min(b, v));
      const overlaps = (s, e, a, b) => !(e < a || s > b);

      // 1) Split each original segment into up to 3 parts around [first,last]
      //    left (original visibility), mid (forced visible), right (original visibility)
      const parts = [];
      for (const s of seq) {
        const S = {start: s.start, end: s.end, visible: s.visible, fixed: !!s.fixed, uid: s.uid || newUid()};
        if (!overlaps(S.start, S.end, first, last)) {
          // untouched
          parts.push({...S});
          continue;
        }
        // left
        if (S.start < first) {
          parts.push({
            ...S,
            end: first - 1,
            fixed: S.fixed && S.end === (first - 1) // survives only if not trimmed internally
          });
        }
        // mid (forced visible, never fixed)
        const ms = clamp(S.start, first, last);
        const me = clamp(S.end, first, last);
        parts.push({start: ms, end: me, visible: true, fixed: false, uid: newUid()});
        // right
        if (S.end > last) {
          parts.push({
            ...S,
            start: last + 1,
            fixed: S.fixed && S.start === (last + 1)
          });
        }
      }

      // 2) Sort by start and enforce strict contiguity (fill gaps, trim overlaps)
      parts.sort((a, b) => a.start - b.start || a.end - b.end);
      const contiguous = [];
      for (const cur of parts) {
        if (!contiguous.length) {
          contiguous.push({...cur});
          continue;
        }
        const prev = contiguous[contiguous.length - 1];
        if (cur.start > prev.end + 1) {
          // fill gap with invisible
          contiguous.push({start: prev.end + 1, end: cur.start - 1, visible: false, fixed: false, uid: newUid()});
          contiguous.push({...cur});
        } else if (cur.start <= prev.end) {
          // trim overlap
          const newStart = prev.end + 1;
          if (newStart <= cur.end) contiguous.push({...cur, start: newStart});
          // else fully covered; drop
        } else {
          contiguous.push({...cur});
        }
      }

      // 3) Fuse adjacent visible segments, except when a fixed block sits at the very edges
      const fused = [];
      for (let i = 0; i < contiguous.length; i++) {
        const cur = contiguous[i];
        if (!fused.length) {
          fused.push({...cur});
          continue;
        }
        const prev = fused[fused.length - 1];
        const adjacent = cur.start === prev.end + 1;
        const bothVisible = prev.visible && cur.visible;

        // Edge-fixed rule: only protect the very first or very last segment if fixed
        const protectPrev = prev.fixed && fused.length === 1;                         // start edge
        const protectCur  = cur.fixed  && i === (contiguous.length - 1);              // end edge

        if (adjacent && bothVisible && !protectPrev && !protectCur) {
          prev.end = cur.end;
          prev.fixed = false;       // merged blocks are not fixed
          // keep prev.uid
        } else {
          fused.push({...cur});
        }
      }

      // 4) One more pass to guarantee contiguity after fusing
      const finalSeq = [];
      for (const seg of fused) {
        if (!finalSeq.length) {
          finalSeq.push({...seg});
          continue;
        }
        const prev = finalSeq[finalSeq.length - 1];
        if (seg.start > prev.end + 1) {
          finalSeq.push({start: prev.end + 1, end: seg.start - 1, visible: false, fixed: false, uid: newUid()});
          finalSeq.push({...seg});
        } else if (seg.start <= prev.end) {
          const ns = prev.end + 1;
          if (ns <= seg.end) finalSeq.push({...seg, start: ns});
        } else {
          finalSeq.push({...seg});
        }
      }

      // 5) Rebuild items for visible, non-fixed sequences (simple & safe)
      for (const s of finalSeq) {
        if (s.visible && !s.fixed) {
          s.items = [];
          for (let i = s.start; i <= s.end; i++) {
            const col = this.currentColumns[i];
            if (!col || !col.uid) throw new Error("Cannot find uid for column at index " + i);
            s.items.push({index: col.index, uid: col.uid});
          }
        }
      }

      // 6) In-place replace (keep original array reference)
      seq.splice(0, seq.length, ...finalSeq);

      this.$nextTick(() => {
        row.height = this.$position(row.tr).height;
      });
    },
    setSequences(row) {
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

      return sequences;
    },
    onRowCreated(e) {
      bbn.fn.log("ON ROW CREATED");
      const tr = e.target;
      const index = parseInt(tr.dataset.index);
      const row = this.items[index];
      row.tr = tr;
      row.visible = !this.scrollable || !!(this.groupable && this.isGroupActive) || this.groupCols[0].cols.length || this.groupCols[2].cols.length;
      row.sequences = this.setSequences(tr)
      if (this.scrollIntersection) {
        this.scrollIntersection.observe(tr);
      }
      if (!row.visible) {
        setTimeout(() => {
          if (this.getRef('scroll').isYInScroll(tr)) {
            row.visible = true;
          }
        }, 25)
      }
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
    intersectionEnterRow(tr) {
      if (this.groupable && this.isGroupActive) {
        return;
      }

      const index = parseInt(tr.dataset.index);
      const row = this.items[index];
      if (!row) {
        return;
      }

      if (this.rowsShownFinished) {
        if (!this.visibleRows.includes(tr)) {
          this.visibleRows.push(tr);
          setTimeout(() => {
            if (this.visibleRows.includes(tr)) {
              row.visible = true;
              this.updateSequences(row);
            }
          }, 100);
        }
      }
      else {
        this.visibleRows.push(tr);
        row.visible = true;
        clearTimeout(this.rowsShownTimer);
        this.updateSequences(row);
        this.rowsShownTimer = setTimeout(() => {
          this.rowsShownFinished = true;
        }, 100);
      }
    },
    intersectionExitRow(tr) {
      if (this.groupable && this.isGroupActive) {
        return;
      }
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

