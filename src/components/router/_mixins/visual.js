export default {
  props: {
    /**
     * Set it to true if you want to see the visual navigation bar
     * @prop {Boolean} [false] visual
     */
    visual: {
      type: Boolean,
      default: false
    },
    /**
     * The size of every grid cell on which is based the visual view
     * @prop {Number} [180] visualSize
     */
    visualSize: {
      type: Number,
      default() {
        return Math.max(60, Math.min(120, Math.round(Math.min(bbn.env.width, bbn.env.height) / 7)))
      }
    },
    /**
     * The position of the visual mini containers
     * @prop {Number} [180] visualSize
     */
    orientation: {
      type: String,
      default() {
        return 'auto'
      },
      validator(v) {
        return !!bbn.fn.getRow(bbnRouterCp.possibleOrientations, { name: v })
      }
    },
  },
  data() {
    return {
      /**
       * If true and visual will show all the containers as icons.
       * Starts at true for better updating when displays changes
       * @data {Boolean} visualShowAll
       */
      visualShowAll: false,
      /**
       * In visual mode the side on which the thumbnails are shown.
       * If auto (default) the bar will be top if H > W, left otherwise
       * @data {String} ['auto'] visualOrientation
       */
      visualOrientation: this.orientation !== 'auto' ? this.orientation : null,
      /**
       * If true the auto orientation won't be taken into account.
       * @data {Boolean} lockedOrientation
       */
      lockedOrientation: false,
      /**
       * If true visual mode is used for nav (instead of tabs or breadcrumbs)
       * @data {Boolean} visual
       */
      currentVisual: this.visual,
      visualStyleContainer: bbn.fn.createObject(),
    }
  },
  computed: {
    isVisual() {
      return this.currentVisual && !this.parentContainer;
    },
    visualContainerStyle() {
      if (!this.isVisual) {
        return {};
      }

      let coord = [1, this.numVisualCols + 1, 1, this.numVisualRows + 1];
      if (this.views.length > 1) {
        switch (this.visualOrientation) {
          case 'top':
            coord[2] = 2;
            break;
          case 'bottom':
            coord[3] = coord[3] - 1;
            break;
          case 'left':
            coord[0] = 2;
            break;
          case 'right':
            coord[1] = coord[1] - 1;
            break;
        }
      }

      return {
        position: 'relative',
        top: null,
        left: null,
        right: null,
        bottom: null,
        gridColumnStart: coord[0],
        gridColumnEnd: coord[1],
        gridRowStart: coord[2],
        gridRowEnd: coord[3],
        zoom: 1
      };
    },
    /**
     * The grid style for showing the router in visual mode
     * @computed visualStyle
     * @return {Object} 
     */
    visualStyle() {
      if (!this.isVisual) {
        return {};
      }

      return {
        minHeight: '100%',
        display: 'grid',
        gridColumnGap: '0.5rem',
        gridRowGap: '0.5rem',
        gridTemplateRows: 'repeat(' + this.numVisualRows + ', 1fr)',
        gridTemplateColumns: 'repeat(' + this.numVisualCols + ', 1fr)'
      }
    },

    /**
     * Returns true if the visual blocks are on top or bottom of the selected container
     * @computed visualIsOnHeight
     * @return {Boolean} 
     */
    visualIsOnHeight() {
      if (this.isVisual) {
        return ['top', 'bottom'].includes(this.visualOrientation);
      }

      return false;
    },

    /**
     * The ratio between height and width for each block
     * @computed visualRatio
     * @return {Object} 
     */
    visualRatio() {
      if (!this.isVisual) {
        return 1;
      }

      let diffW = this.visualIsOnHeight ? 0 : this.visualSize;
      let diffH = this.visualIsOnHeight ? this.visualSize : 0;
      let ratio = (this.lastKnownWidth - diffW) / (this.lastKnownHeight - diffH);
      if (ratio > 2) {
        return 2;
      }

      return Math.max(0.5, ratio);
    },

    /**
     * The number of columns (width) for the visual mode
     * @computed numVisualCols
     * @return {Number} 
     */
    numVisualCols() {
      if (this.isVisual && this.ready) {
        // Width greater or equal to height
        let w = this.lastKnownWidth - (this.visualIsOnHeight ? 0 : this.visualSize);
        if (this.splitterMounted) {
          let splitter = this.getRef('splitter');
          if (splitter.$el.clientWidth < w) {
            w -= splitter.$el.clientWidth;
          }
        }
        if (this.visualRatio >= 1) {
          return Math.floor(w / this.visualSize);
        }
        else {
          return Math.floor(w / (this.visualSize * 1));
        }
      }

      return 1;
    },

    /**
     * The number of rows (height) for the visual mode
     * @computed numVisualRows
     * @return {Number} 
     */
    numVisualRows() {
      if (this.isVisual && this.ready) {
        let h = this.lastKnownHeight - (this.visualIsOnHeight ? this.visualSize : 0);
        if (this.splitterMounted) {
          let splitter = this.getRef('splitter');
          if (splitter.$el.clientHeight < h) {
            h -= splitter.$el.clientHeight;
          }
        }
        if (this.visualRatio > 1) {
          return Math.floor(h / this.visualSize * 1);
        }
        else {
          return Math.floor(h / this.visualSize);
        }
      }

      return 1;
    },

    /**
     * The number of cells on the side where the thumbnails are shown in the visual mode
     * @computed numVisuals
     * @return {Number} 
     */
    numVisuals() {
      if (this.isVisual) {
        if (['left', 'right'].includes(this.visualOrientation)) {
          return this.numVisualRows;
        }
        else {
          return this.numVisualCols;
        }
      }

      return 0;
    },


    /**
     * The number of cells on the side where the thumbnails are shown in the visual mode
     * @computed numVisualReals
     * @return {Number} 
     */
    numVisualReals() {
      if (this.isVisual) {
        return bbn.fn.filter(this.visualList, a => (a.view.idx !== this.selected) && !a.view.pane).length;
      }

      return 0;
    },


    /**
     * The views to show, in a specific different order, for the visual mode
     * @computed visualList
     * @return {Array} 
     */
    visualList() {
      if (!this.isVisual) {
        return [];
      }

      let moreViewsThanSlots = this.numVisuals < bbn.fn.filter(this.views, { pane: false }).length;
      let numAvailableSlots = this.numVisuals - (moreViewsThanSlots ? 1 : 0);
      let order = this.visualShowAll ?
        { selected: 'asc', fixed: 'desc', pinned: 'desc', last: 'desc', idx: 'asc' }
        : { selected: 'desc', last: 'desc', fixed: 'desc', pinned: 'desc', idx: 'asc' };
      let idx = 0;
      return bbn.fn.map(
        bbn.fn.multiorder(
          this.views,
          order
        ),
        a => {
          let visible = false;
          if (this.visualShowAll || (idx <= numAvailableSlots) || (this.selected === a.idx)) {
            visible = true;
            if (!a.pane) {
              idx++;
            }
          }
          else if (a.pane) {
            visible = true;
          }
          return {
            view: a,
            visible: visible
          }
        }
      );
    },

  },
  watch: {
    numVisuals() {
      this.onResize();
    },
    visualShowAll(v) {
      if (v && this.isVisual) {
        this.getRef('visualRouter').focus();
      }
    },
    /**
     * @watch isVisual
     * @fires setConfig
     */
    isVisual(v) {
      if (this.ready) {
        this.changeConfig();
        this.setConfig();
      }
    },
  },
  beforeMount() {
    if (!this.single) {
      let storage = this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
      if (storage) {
        if (storage.visual !== undefined) {
          this.currentVisual = storage.visual;
        }
  
        if (storage.orientation) {
          this.visualOrientation = storage.orientation;
          this.lockedOrientation = true;
        }
      }
  
      this.updateVisualStyleContainer();
    }
  }

}
