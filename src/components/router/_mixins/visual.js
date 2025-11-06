export default {
  props: {
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
        return !!bbn.fn.getRow(bbnRouter.possibleOrientations, { name: v })
      }
    },
    maxVisualSize: {
      type: Number,
      default: 160
    },
    minVisualSize: {
      type: Number,
      default: 40
    },
  },
  data() {
    return {
      visualIsReady: false,
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
      tabsOrientation: this.orientation !== 'auto' ? this.orientation : null,
      /**
       * If true the auto orientation won't be taken into account.
       * @data {Boolean} lockedVisualOrientation
       */
      lockedVisualOrientation: false,
      lockedTabsOrientation: false,
      /**
       * If true visual mode is used for nav (instead of tabs or breadcrumbs)
       * @data {Boolean} visual
       */
      visualList: [],
      isOverThumb: false,
      visualItemWidth: 0
    }
  },
  computed: { 
    // Between 60 and 180
    visualSize() {
      if (!this.visualIsReady) {
        return this.maxVisualSize;
      }

      return Math.min(
        Math.max(
          this.minVisualSize,
          Math.min(
            Math.round(
              Math.min(bbn.env.width, bbn.env.height)
              / (bbn.fn.isMobile() && (bbn.env.height > bbn.env.width) ? 5 : 9)
            )
          )
        ), this.maxVisualSize);
    },
    isVisual() {
      return this.currentMode === 'visual';
    },
    /**
     * The grid style for showing the router in visual mode
     * @computed visualStyle
     * @return {Object} 
     */
    visualStyle() {
      const res = {};
      if (this.isVisual) {
        const isSide = ['left', 'right'].includes(this.visualOrientation);
        let gridTemplateRows = 'repeat(' + this.numVisualRows + ', 1fr)';
        let gridTemplateColumns = 'repeat(' + this.numVisualCols + ', 1fr)';
        if (isSide) {
          gridTemplateColumns = 'repeat(1, 1fr)';
        }
        else {
          gridTemplateRows = 'repeat(' + (this.isMobile && (this.numVisualReals > this.numVisualCols) ? 2 : 1) + ', 1fr)';
        }
        Object.assign(res, {
          display: 'grid',
          gridColumnGap: '0.5rem',
          gridRowGap: '0.5rem',
          gridTemplateRows,
          gridTemplateColumns,
          padding: '0 0.5rem 0.5rem',
          height: '100%',

        });
      }
  
        if (!this.visualShowAll) {
          res.height = '100%';
          if (['left', 'right'].includes(this.visualOrientation)) {
            res.gridTemplateColumns = 'repeat(1, 1fr)';
          }
          else {
            res.gridTemplateRows = 'repeat(' + (this.isMobile && (this.numVisualReals > this.numVisualCols) ? 2 : 1) + ', 1fr)';
          }
        }
      return res;
    },

    /**
     * The grid style for showing the router in visual mode
     * @computed visualStyle
     * @return {Object} 
     */
    visualFullStyle() {
      const res = {};
      if (this.isVisual) {
        Object.assign(res, {
          display: 'grid',
          gridColumnGap: '0.5rem',
          gridRowGap: '0.5rem',
          gridTemplateRows: 'repeat(' + this.numVisualRows + ', 1fr)',
          gridTemplateColumns: 'repeat(' + this.numVisualCols + ', 1fr)',
          padding: '0 0.5rem 0.5rem'
        });
      }
      
      return res;
    },

    flexDirectionStyle() {
      if (this.isVisual && !this.visualShowAll) {
        switch (this.visualOrientation) {
          case 'right':
            return 'row-reverse';
          case 'left':
            return 'row';
          case 'bottom':
            return 'column-reverse';
          default:
            return 'column';
        }
      }
      else if (this.isTabs) {
        switch (this.tabsOrientation) {
          case 'right':
            return 'row-reverse';
          case 'left':
            return 'row';
          case 'bottom':
            return 'column-reverse';
          default:
            return 'column';
        }
      }

      return null;
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

    isOrientedVertically() {
      return this.lastKnownWidth < this.lastKnownHeight;
    },
    /**
     * The number of columns (width) for the visual mode
     * @computed numVisualCols
     * @return {Number} 
     */
    numVisualCols() {
      const main = this.splittable ? this.getRef('mainPane') : this;
      if (this.isVisual && this.ready && (!this.splittable || (this.mainPaneMounted && main))) {
        // Width greater or equal to height
        if (this.isMobile && this.isOrientedVertically) {
          return 4;
        }

        let w = main.lastKnownWidth - (this.visualIsOnHeight ? this.visualSize : 0);

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
      const main = this.splittable ? this.getRef('mainPane') : this;
      if (this.isVisual && this.ready && (!this.splittable || (this.mainPaneMounted && main))) {
        let h = main.lastKnownHeight - (this.visualIsOnHeight ? 0 : this.visualSize);

        if (this.visualRatio > 1) {
          return Math.round(h / this.visualSize * 1);
        }
        else {
          return Math.round(h / this.visualSize);
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
      let res = 0;
      if (this.isVisual && this.numVisualRows && this.numVisualCols) {
        const max = bbn.fn.count(this.views, { pane: false });
        if (['left', 'right'].includes(this.visualOrientation)) {
          res = this.numVisualRows - 1;
        }
        else if (this.isMobile) {
          res = (this.numVisualCols * 2) - 1;
        }
        else {
          res = this.numVisualCols - 1;
        }

        if (res > max) {
          res = max;
        }
      }

      return res;
    },


    /**
     * The number of cells on the side where the thumbnails are shown in the visual mode
     * @computed numVisualReals
     * @return {Number} 
     */
    numVisualReals() {
      if (this.isVisual) {
        return bbn.fn.filter(this.visualList, a => a.idx !== this.selected).length;
      }

      return 0;
    },
    shortVisualList() {
      return bbn.fn.order(
        this.views.filter(a => !a.pane && !a.selected),
        'last',
        'desc'
      ).slice(0, this.numVisuals);
    },
    fullVisualList() {
      return bbn.fn.multiorder(
        this.views.filter(a => !a.pane),
        { selected: 'desc', fixed: 'desc', pinned: 'desc', last: 'desc', idx: 'asc' }
      );
    }
  },
  methods: {
    toggleVisualShowAll() {
      if (!this.visualShowAll) {
        let i = 0;
        let ele = this.getRef('visualListItems-' + i);
        while (ele && !ele.offsetWidth) {
          i++;
          ele = this.getRef('visualListItems-' + i);
        }
        if (ele) {
          this.visualItemWidth = ele.offsetWidth;
        }
      }

      this.visualShowAll = !this.visualShowAll;
    },
    /**
     * The views to show, in a specific different order, for the visual mode
     * @computed visualList
     * @return {Array} 
     */
    updateVisualList() {
      if (!this.isVisual) {
        return;
      }

      let moreViewsThanSlots = this.numVisuals < bbn.fn.filter(this.views, { pane: false }).length;
      let numAvailableSlots = this.numVisuals - (moreViewsThanSlots ? 1 : 0);
      let order = this.visualShowAll ?
        { selected: 'desc', fixed: 'desc', pinned: 'desc', last: 'desc', idx: 'asc' }
        : { last: 'desc', fixed: 'desc', pinned: 'desc', idx: 'asc' };
      let idx = 0;
      const items = bbn.fn.map(
        bbn.fn.multiorder(
          this.views.filter(a => !a.pane),
          order
        ),
        a => {
          let visible = false;
          if (this.visualShowAll || ((idx <= numAvailableSlots) && (this.selected !== a.idx))) {
            visible = true;
            idx++;
          }

          return {
            idx: a.idx,
            uid: a.uid,
            url: a.url,
            visible
          };
        }
      );

      items.map((a, i) => {
        if (this.visualList[i]?.uid === a.uid) {
          if (JSON.stringify(this.visualList[i]) !== JSON.stringify(a)) {
            bbn.fn.extend(this.visualList[i], a);
          }
        }
        else {
          const idx = bbn.fn.search(this.visualList, { uid: a.uid});
          if (idx > i) {
            bbn.fn.move(this.visualList, idx, i);
            bbn.fn.extend(this.visualList[i], a);
          }
          else {
            this.visualList.splice(i, 0, a);
          }
        }
      });

      if (this.visualList.length > items.length) {
        this.visualList.splice(items.length);
      }

      this.$nextTick(this.updatePortalTargets);
    },
  
    visualInit() {
      if (!this.single && this.hasStorage) {
        this.visualIsReady = true;
        this.updateVisualList();
        /*
        window.removeEventListener('focus', this.visualOnEvent);
        window.addEventListener('focus', this.visualOnEvent);
        window.removeEventListener('resize', this.visualOnEvent);
        window.addEventListener('resize', this.visualOnEvent);
        */
      }

      if (!this.visualOrientation && this.isVisual) {
        this.setAutoOrientation();
      }
    },
    setAutoOrientation() {
      if (this.orientation === 'auto') {
        this.visualOrientation = this.clientWidth > this.clientHeight ? 'left' : (this.isMobile ? 'bottom' : 'top');
      }
    },
    visualOnEvent(e) {
      this.onResize();
      this.$nextTick(this.updateVisualList);
    },
  },
  watch: {
    isOrientedVertically() {
      if (this.isMobile) {
        if (this.isVisual) {
          this.setAutoOrientation();
        }
        else if (!this.isBreadcrumb && this.orientation === 'auto') {
          this.currenttabsOrientation = this.clientWidth > this.clientHeight ? 'left' : (this.isMobile ? 'bottom' : 'top');

        }
      }
    },
    visualOrientation() {
      this.$nextTick(this.updateVisualList);
      this.setConfig();
    },
    tabsOrientation() {
      this.$nextTick(this.updateVisualList);
      this.setConfig();
    },
    lockedVisualOrientation() {
      this.setConfig();
    },
    lockedTabsOrientation() {
      this.setConfig();
    },
    numVisuals() {
      this.onResize();
      this.updateVisualList();
    },
    visualShowAll(v) {
      this.updateVisualList();
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
        this.$nextTick(() => {
          if (v) {
            this.setAutoOrientation();
            this.updateVisualList();
          }

          this.$forceUpdate();
        });
      }
    },
  }

}
