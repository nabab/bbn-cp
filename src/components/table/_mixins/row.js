import bbn from "@bbn/bbn";

export default {
  data() {
    return {
      currentRows: [],
      rowHeight: null,
      intersectionTimeout: null,
    };

    return o;
  },
  methods: {
    updateSequences(tr) {
      const first = this.firstColumnVisible;
      const last  = this.lastColumnVisible;
      const row = bbn.fn.getRow(this.currentRows, {tr});
      //bbn.fn.log(["Updating sequences for row", row, first, last]);
      if (!last) {
        return;
      }

      const seq = row.sequences;
      // --- Robust totalEnd, always start at 0
      const endCandidates = [
        last,
        seq.length ? seq[seq.length - 1].end : -Infinity,
        Number.isInteger(this.totalColumns) ? this.totalColumns - 1 : -Infinity,
        (this.table?.columns && Number.isInteger(this.columns.length)) ? this.columns.length - 1 : -Infinity,
        Number.isInteger(this.colCount) ? this.colCount - 1 : -Infinity
      ].filter(Number.isFinite);

      const totalStart = 0;
      const totalEnd = endCandidates.length ? Math.max(...endCandidates) : Math.max(last, 0);
      if (totalEnd < 0) { this.sequences = []; return; }

      // --- Protected blocks: keep them exactly as-is (clamped) and keep their uid.
      const protectedBlocks = seq
        .filter(s => s.visible)
        .map(s => ({
          start: Math.max(s.start, totalStart),
          end:   Math.min(s.end, totalEnd),
          uid:   s.uid,
          protected: true
        }))
        .filter(s => s.start <= s.end)
        // ensure order by start; do NOT merge, even if adjacent (must remain distinct)
        .sort((a, b) => a.start - b.start || a.end - b.end);

      // --- Subtract protected blocks from the viewport to get pure viewport-only pieces
      const vpStart = Math.max(first, totalStart);
      const vpEnd   = Math.min(last, totalEnd);
      const viewportPieces = [];

      if (vpStart <= vpEnd) {
        let curStart = vpStart;
        for (const p of protectedBlocks) {
          if (p.end < curStart) continue;                // protected before current window
          if (p.start > vpEnd) break;                    // protected after viewport
          if (p.start > curStart) {
            viewportPieces.push({
              start: curStart,
              end: Math.min(p.start - 1, vpEnd),
              protected: false
            });
          }
          curStart = Math.max(curStart, p.end + 1);      // skip over protected
          if (curStart > vpEnd) break;
        }
        if (curStart <= vpEnd) {
          viewportPieces.push({
            start: curStart,
            end: vpEnd,
            protected: false
          });
        }
      }

      // --- All visible outputs: protected (keep uid) + viewport-only (fresh uid)
      const visibles = [...protectedBlocks, ...viewportPieces]
        .sort((a, b) => a.start - b.start || (a.protected ? -1 : 1));

      // --- Build full coverage [0..totalEnd], never merging visible neighbors
      const out = [];
      let cursor = totalStart;

      for (const v of visibles) {
        if (v.start > v.end) continue;

        // Invisible gap before this visible block
        if (cursor < v.start) {
          out.push({
            start: cursor,
            end: v.start - 1,
            visible: false,
          });
        }

        // Visible block (keep uid for protected; unique uid for viewport-only)
        out.push({
          start: v.start,
          end: v.end,
          visible: true,
          uid: v.uid
        });

        cursor = v.end + 1;
      }

      // Tail (after last visible) or whole area if no visibles
      if (cursor <= totalEnd) {
        out.push({
          start: cursor,
          end: totalEnd,
          visible: false
        });
      }

      // Compact only invisible neighbors (never merge visible ones)
      const compacted = [];
      for (const s of out) {
        const lastSeg = compacted[compacted.length - 1];
        if (lastSeg && (lastSeg.end + 1 === s.start) && (lastSeg.visible === s.visible)) {
          if (s.uid && s.items?.length) {
            lastSeg.uid = s.uid;
          }
          lastSeg.end = s.end; // keep earlier uid for stability
          lastSeg.items = (lastSeg.items || []).concat(s.items || []);
        }
        else {
          if (!s.uid) {
            s.uid = bbn.fn.randomString();
          }

          compacted.push(s);
        }
      }
      compacted.map(a => {
        if (a.visible) {
          if (!a.items) {
            a.items = [];
          }
          for (let i = a.start; i <= a.end; i++) {
            const uid = this.groupCols[1].cols[i].uid;
            if (!uid) {
              throw new Error("Cannot find uid for column at index " + i);
            }

            const row = bbn.fn.getRow(a.items, {uid});
            if (row && (row === a.items[i - a.start])) {
              continue;
            }
            else if (row) {
              row.index = i;
              a.items.splice(i - a.start, 0, row);
            }
            else {
              a.items.splice(i - a.start, 0, {index: i, uid});
            }
          }
        }
      });

      const uids = seq.map((s, i) => ({uid: s.uid, i})).reverse();
      bbn.fn.each(uids, (s, i) => {
        const idx = bbn.fn.search(compacted, {uid: s.uid});
        if (idx === -1) {
          seq.splice(s.i, 1);
        }
      });
      bbn.fn.each(compacted, (row, i) => {
        if (row.uid === seq[i]?.uid) {
          //bbn.fn.log(['found', seq[i].start, row.start, seq[i].end, row.end])
          if (seq[i].start > row.start) {
            seq[i].start = row.start;
            seq[i].items.unshift(...row.items.slice(0, seq[i].start - row.start));
          }
          if (seq[i].end < row.end) {
            seq[i].end = row.end;
            seq[i].items.push(...row.items.slice(seq[i].end - row.end));
          }
        }
        else {
          seq.splice(i, 0, row);
        }
      })
    },
    onRowCreated(e) {
      const tr = e.target;
      if (this.scrollIntersection) {
        this.scrollIntersection.observe(tr);
      }

      this.$nextTick(() => {
        const visible = this.$refs.scroll.isYInScroll(tr);
        this.currentRows.push({tr, visible, sequences: [{start: 0, end: this.groupCols[1].cols.length - 1, visible: false, uid: bbn.fn.randomString()}]});
        if (visible) {
          this.updateSequences(tr);
        }
      })
    },
    onRowDestroyed(e) {
      const tr = e.target;
      if (this.scrollIntersection) {
        this.scrollIntersection.unobserve(tr);
      }
    },
    isSelected(row) {
      if (this.selection) {
        const i = this.uid ? row.data[this.uid] : row.index;
        return this.currentSelected.includes(i);
      }
      return false;
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
      if (i % 2) {
        if (this.table.alt) {
          cls.push('bbn-alt');
        }
      }

      if (this.selection && this.isSelected(row)) {
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
      this.visibleRows.push(tr);
      setTimeout(() => {
        if (this.visibleRows.includes(tr)) {
          this.updateSequences(tr);
        }
      }, 250);

    },
    intersectionExit(tr) {
      const idx = this.visibleRows.indexOf(tr);
      if (idx > -1) {
        this.visibleRows.splice(idx, 1);
      }
    },
  },
};

