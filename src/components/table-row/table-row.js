/**
 * @file bbn-table component
 *
 * @description  bbn-table is a powerful component of wide configuration that offers vast customizations.
 * The source obtains it by giving a url to retrieve data or directly supplying an array.
 * It allows you to easily modify the content by entering new data in the input field corresponding to the type of column being defined.
 * The table rows can be sorted by clicking on a column header.
 * Table elements can be filtered with the help of a built-in filters in the column headings or using a multifilter panel and a reset by removing a filter or all filters with just one click.
 * It's possible to create fixed areas that will keep their position by always having them available during scrolling.
 * It gives the possibility to group the data.
 * These are some examples of what can be done with this component, from the few configuration lines we can express considerable work complexity.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.row
   */
  mixins: [
    bbn.cp.mixins.row
  ],
  tag: 'tr',
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ready: false,
      tmpReady: false,
      sequences: []
    };
  },
  computed: {
  },
  methods: {
    getComponentType(idx) {
      if (this.table.groupCols[1].cols[idx].isExpander && !this.table.isGroupActive) {
        return 'bbn-table-cell-expander';
      }
      if (this.table.groupCols[1].cols[idx].isSelection) {
        return 'bbn-table-cell-selector';
      }
      if (this.table.groupCols[1].cols[idx].isExpander && this.table.isEdited(this.source.data, this.table.groupCols[1].cols[idx], this.index)) {
        return 'bbn-table-cell-editor';
      }
      if (this.table.groupCols[1].cols[idx].buttons) {
        return 'bbn-table-cell-buttons';
      }

      return 'bbn-table-cell';
    },
    getComponentCondition(idx) {
      return true;
    },
    getComponentClass(idx) {
      const type = this.getComponentType(idx);
      switch (type) {
        case 'bbn-table-cell-expander':
          const arr = [this.cellClass];
          if (this.table.currentColumns[0].fixed) {
            arr.push(this.cssRuleName + ' bbn-table-fixed-cell bbn-table-fixed-cell-left');
          }

          return arr;
      }
      
    },
    getComponentOptions(idx) {
      const type = this.getComponentType(idx);
      const options = {column: this.table.groupCols[1].cols[idx], rowIndex: this.index};
      switch (type) {
        case 'bbn-table-cell-expander':
          break;
        case 'bbn-table-cell-selector':
          options.selected = this.source.selected;
          options.selection = this.source.selection;
          break;
        case 'bbn-table-cell-editor':
        case 'bbn-table-cell':
          options.tabindex = this.table.editable && this.table.isEditable(this.source.data, this.table.groupCols[1].cols[idx], this.index) ? 0 : -1
          break;
        case 'bbn-table-cell-buttons':
          options.mode = this.table.buttonMode;
          break;
      }

      return options;
    },
    loopSequence(i) {
      const start = this.sequences[i].start;
      const end = this.sequences[i].end;
      return [...Array(end - start + 1)].map((_, i) => ({index: i + start, uid: this.table.groupCols[1].cols[i + start].uid}));
    },
    updateSequences() {
      const first = this.table.firstColumnVisible;
      const last  = this.table.lastColumnVisible;
      if (!last) {
        this.sequences = [{start: 0, end: this.table.groupCols[1].cols.length - 1, visible: true, uid: bbn.fn.randomString()}];
        return;
      }

      const seq = Array.isArray(this.sequences) ? this.sequences : [];

      // --- Robust totalEnd, always start at 0
      const endCandidates = [
        last,
        seq.length ? seq[seq.length - 1].end : -Infinity,
        Number.isInteger(this.table?.totalColumns) ? this.table.totalColumns - 1 : -Infinity,
        (this.table?.columns && Number.isInteger(this.table.columns.length)) ? this.table.columns.length - 1 : -Infinity,
        Number.isInteger(this.table?.colCount) ? this.table.colCount - 1 : -Infinity
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
              uid: bbn.fn.randomString(),
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
            uid: bbn.fn.randomString(),
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
            uid: bbn.fn.randomString()
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
          visible: false,
          uid: bbn.fn.randomString()
        });
      }

      // Compact only invisible neighbors (never merge visible ones)
      const compacted = [];
      for (const s of out) {
        const lastSeg = compacted[compacted.length - 1];
        if (lastSeg && !lastSeg.visible && !s.visible && lastSeg.end + 1 === s.start) {
          lastSeg.end = s.end; // keep earlier uid for stability
        } else {
          compacted.push(s);
        }
      }

      this.sequences = compacted;
    },
    checkBreak(ele, data) {
      if (!this.table.hasScrollX) {
        return false;
      }

      if (!this.table.lastColumnVisible) {
        return false;
      }

      return data.i > this.table.lastColumnVisible;
    }
  },
  watch: {
    ready(v) {
      if (v) {
        if (!this.table.groupCols[1].cols.length) {
          this.sequences = [];
          return;
        }

        const sequences = [];
        if (!this.table.lastColumnVisible) {
          this.sequences = [{start: 0, end: this.table.groupCols[1].cols.length - 1, visible: true, uid: bbn.fn.randomString()}];
          return;
        }

        if (this.table.firstColumnVisible) {
          sequences.push({start: 0, end: this.table.firstColumnVisible - 1, uid: bbn.fn.randomString(), visible: false});
        }
        sequences.push({start: this.table.firstColumnVisible, end: this.table.lastColumnVisible, uid: bbn.fn.randomString(), visible: true});
        if (this.table.lastColumnVisible < (this.table.groupCols[1].cols.length - 1)) {
          sequences.push({start: this.table.lastColumnVisible + 1, end: this.table.groupCols[1].cols.length - 1, uid: bbn.fn.randomString(), visible: false});
        }
        this.sequences.push(...sequences);
      }
    },
    tmpReady(v) {
      setTimeout(() => {
        if (v && !this.ready && this.tmpReady) {
          this.ready = true;
        }
      }, 250)
    },
  },
  mounted() {
    if (this.table.scrollable) {
      //this.ready = this.closest('bbn-scroll').isYInScroll(this);
      if (this.ready) {
        this.tmpReady = this.ready;
      }
    }
  }
};

import cpHtml from './table-row.html';
import cpStyle from './table-row.less';
//import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-table-row',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  //lang: cpLang
};
