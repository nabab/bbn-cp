import bbn from "@bbn/bbn";

// Small helpers
const makeSeq = (start, end, visible, fixed = false) => ({
  start, end, visible, fixed, uid: bbn.fn.randomString()
});
const overlaps = (s, e, a, b) => !(e < a || s > b);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

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
      rowsShownFinished: !this.scrollable || this.groupable,
      rowsShownTimer: null,
      rowLastSequence: null,
      numRowsCreated: 0,
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
      if (!row.visible && this.visibleRows.includes(row.tr)) {
        row.visible = true;
      }

      // Nothing to do if `last` missing or nothing hidden in row
      if (!last || !bbn.fn.count(row.sequences, {visible: false})) {
        return;
      }

      const orig = (row.sequences || []).slice().sort((a, b) => a.start - b.start);
      const lastSequence = JSON.stringify(orig.map(seg => ({ start: seg.start, end: seg.end, visible: seg.visible, fixed: seg.fixed })));
      if (this.rowLastSequence?.hash === lastSequence) {
        row.sequences.splice(0, row.sequences.length, ...this.rowLastSequence.sequences.map(s => {
          return {
            start: s.start,
            end: s.end,
            visible: s.visible,
            fixed: s.fixed,
            isLeft: s.isLeft,
            isRight: s.isRight,
            uid: s.uid,
            items: s.items ? s.items.slice() : []
          }
        }));
        this.$nextTick(() => {
          row.height = this.$position(row.tr).height;
        });
        return;
      }

      // 1) Split around the visible window [first, last]
      //    Every original segment becomes up to 3 pieces: left (invisible), mid (visible), right (invisible)
      //    We only keep non-empty pieces (start <= end).
      const pieces = [];
      for (const seg of orig) {
        const {start: s, end: e, visible, fixed} = seg;

        if (!overlaps(s, e, first, last)) {
          // Completely outside the window: keep as-is
          pieces.push({...seg});
          continue;
        }

        if (seg.visible && (first >= seg.start) && (last <= seg.end) ) {
          // Segment fully inside window: keep as-is
          return;
        }
          // Window fully inside segment: split into 3

        // Left (before first)
        const Ls = s;
        const Le = Math.min(e, first - 1);
        if (Ls <= Le) {
          // Stays as original visibility; fixed preserved only if segment untouched
          pieces.push(makeSeq(Ls, Le, seg.visible && Le < first, fixed && (seg.start === Ls) && (seg.end === Le)));
        }

        // Mid (inside [first, last]) => enforced visible
        const Ms = clamp(s, first, last);
        const Me = clamp(e, first, last);
        if (Ms <= Me) {
          // Mid slice is never fixed
          pieces.push(makeSeq(Ms, Me, true, false));
        }

        // Right (after last)
        const Rs = Math.max(s, last + 1);
        const Re = e;
        if (Rs <= Re) {
          pieces.push(makeSeq(Rs, Re, seg.visible && Rs > last, fixed && (seg.start === Rs) && (seg.end === Re)));
        }
      }

      // 2) Sort and normalize adjacency (fix overlaps/gaps into contiguous ranges)
      pieces.sort((a, b) => a.start - b.start || a.end - b.end);

      // If there are tiny overlaps or gaps due to upstream data, fix to strict adjacency by
      // snapping current.start to prev.end + 1 where needed, provided it doesn't invert the range.
      const normalized = [];
      for (const seg of pieces) {
        if (!normalized.length) {
          normalized.push({...seg});
          continue;
        }
        const prev = normalized[normalized.length - 1];

        // If current starts before or at prev.end, push its start to prev.end+1
        if (seg.start <= prev.end) {
          const newStart = prev.end + 1;
          if (newStart <= seg.end) {
            normalized.push({...seg, start: newStart});
          }
          // else the segment collapses completely; drop it
        }
        // If there is a gap, fill with an invisible block
        else if (seg.start > prev.end + 1) {
          normalized.push(makeSeq(prev.end + 1, seg.start - 1, false, false));
          normalized.push({...seg});
        } else {
          // Adjacent already
          normalized.push({...seg});
        }
      }

      // 3) Fuse consecutive visible sequences,
      //    EXCEPT when they’re fixed and at the extreme edges.
      //    (By convention, only the extreme edges may be fixed.)
      const fused = [];
      for (let i = 0; i < normalized.length; i++) {
        const cur = normalized[i];
        if (!fused.length) {
          fused.push({...cur});
          continue;
        }
        const prev = fused[fused.length - 1];

        const adjacent = cur.start === prev.end + 1;
        const bothVisible = prev.visible && cur.visible;

        // Determine if we must preserve a fixed visible block at the array edges.
        const isPrevEdgeFixed = prev.fixed && fused.length === 1; // at start
        const isCurEdgeFixed  = cur.fixed && (i === normalized.length - 1); // at end

        if (adjacent && bothVisible && !isPrevEdgeFixed && !isCurEdgeFixed) {
          // Fuse into prev
          prev.end = cur.end;
          prev.fixed = false; // fused block can't remain fixed
        } else {
          fused.push({...cur});
        }
      }

      // 4) Guarantee global contiguity (no gaps, no overlaps)
      //    (Run once more in case fusing created adjacency we need to re-check)
      const seq = [];
      for (const seg of fused) {
        if (!seq.length) {
          seq.push({...seg});
          continue;
        }
        const prev = seq[seq.length - 1];
        if (seg.start > prev.end + 1) {
          seq.push(makeSeq(prev.end + 1, seg.start - 1, false, false));
          seq.push({...seg});
        } else if (seg.start <= prev.end) {
          const newStart = prev.end + 1;
          if (newStart <= seg.end) {
            seq.push({...seg, start: newStart});
          }
          // else drop collapsed
        } else {
          seq.push({...seg});
        }
      }

      // 5) Determine which indices need items rebuilt
      //    Rebuild items for any visible, non-fixed sequence and any sequence that changed.
      //    We compare to original by range+visibility (quick heuristic).
      const updateItemsIdx = new Set();
      const keyOf = s => `${s.start}-${s.end}-${s.visible ? 1 : 0}-${s.fixed ? 1 : 0}`;

      // Build a map of "unchanged-looking" slices from the old array for quick check
      const origKeys = new Set(orig.map(keyOf));
      seq.forEach((s, i) => {
        const changed = !origKeys.has(keyOf(s));
        if ((s.visible && !s.fixed) && (changed || !s.items || !Array.isArray(s.items))) {
          updateItemsIdx.add(i);
        }
      });

      // 6) Rebuild items for marked sequences
      for (let i = 0; i < seq.length; i++) {
        const a = seq[i];
        if (a.visible && !a.fixed && updateItemsIdx.has(i)) {
          a.items = [];
          for (let c = a.start; c <= a.end; c++) {
            const col = this.currentColumns[c];
            if (!col || !col.uid) {
              throw new Error("Cannot find uid for column at index " + c);
            }
            a.items.push({index: col.index, uid: col.uid});
          }
        }
      }

      // 7) Commit back and measure height
      row.sequences = seq;
      this.rowLastSequence = {
        hash: lastSequence,
        sequences: seq
      };
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
      const tr = e.target;
      const index = parseInt(tr.dataset.index);
      const row = this.items[index];
      const shown = !this.scrollable || !!(this.groupable && this.isGroupActive);
      row.tr = tr;
      row.visible = shown;
      row.sequences = this.setSequences(tr)
      this.numRowsCreated++;
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

      const num = shown ? 0 : this.items.length;
      if (num === this.numRowsCreated) {
        this.$nextTick(() => {
          bbn.fn.executeSlowly(this.items, async (a, i) => {
            if (!a.visible) {
              a.visible = true;
            }
            if (i % 10 === 0) {
              await bbn.cp.nextFrame();
            }
            //bbn.fn.log("DONE " + i + " OUT OF " + num)
          })
        });

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
      //bbn.fn.log("INTERSECTION", row);
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

