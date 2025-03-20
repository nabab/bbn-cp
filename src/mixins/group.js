export default {
  methods: {
    /**
     * Returns the configuration for the cells of the titles of grouped columns.
     * @method titleGroupsCells
     * @param {Number} groupIndex
     * @returns {Array}
     */
    titleGroupsCells(groupIndex) {
      if (this.titleGroups) {
        let cells = [],
          group = null,
          corresp = {};
        bbn.fn.each(this.groupCols[groupIndex].cols, a => {
          if (!a.invisible) {
            if (a.group === group) {
              cells[cells.length - 1].colspan++;
              cells[cells.length - 1].width += a.realWidth;
              if (a.left !== undefined) {
                if ((cells[cells.length - 1].left === undefined)
                  || (a.left < cells[cells.length - 1].left)
                ) {
                  cells[cells.length - 1].left = a.left;
                }
              }
              if (a.right !== undefined) {
                if ((cells[cells.length - 1].right === undefined)
                  || (a.right < cells[cells.length - 1].right)
                ) {
                  cells[cells.length - 1].right = a.right;
                }
              }
            }
            else {
              if (corresp[a.group] === undefined) {
                let idx = bbn.fn.search(this.titleGroups, 'value', a.group);
                if (idx > -1) {
                  corresp[a.group] = idx;
                }
              }
              if (corresp[a.group] !== undefined) {
                cells.push({
                  text: this.titleGroups[corresp[a.group]].text || '&nbsp;',
                  style: this.titleGroups[corresp[a.group]].style || {},
                  cls: this.titleGroups[corresp[a.group]].cls || '',
                  colspan: 1,
                  width: a.realWidth,
                  left: a.left !== undefined ? a.left : undefined,
                  right: a.right !== undefined ? a.right : undefined
                });
              }
              /*
              else if ( this.titleGroups.default ){
                cells.push({
                  text: this.titleGroups.default.text || '&nbsp;',
                  style: this.titleGroups.default.style || {},
                  cls: this.titleGroups.default.cls || '',
                  colspan: 1,
                  width: a.realWidth
                });
              }
              */
              else {
                cells.push({
                  text: '&nbsp;',
                  style: '',
                  cls: '',
                  colspan: 1,
                  width: a.realWidth,
                  left: a.left !== undefined ? a.left : undefined,
                  right: a.right !== undefined ? a.right : undefined
                });
              }
              group = a.group;
            }
          }
        });
        return cells;
      }
    },
  }
}

