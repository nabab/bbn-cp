export default {
  props: {
    /**
     * A unique id for the container that will ben used as index by the router
     * @prop {String} uid
     */
    visual: {
      type: Boolean,
      default: false
    },
    portal: {
      type: [String, HTMLElement, Boolean],
      default: false
    }
  },
  computed: {
    isVisualVisible() {
      if (this.router?.isVisual) {
        let row = bbn.fn.getRow(this.router.visualList, 'view.idx', this.currentIndex);
        if (row) {
          return row.visible;
        }
      }

      return false;
    },
    visualStyle() {
      let r = this.router;
      if (r && r.isVisual) {
        if ((r.numVisualReals > 0) && (!this.isVisible || r.visualShowAll) && (!this.ready || !this.isPane)) {
          return {
            zoom: 0.1,
            width: '100%',
            height: 'auto',
            overflow: 'hidden'
          };
        }

        let coord = [1, r.numVisualCols + 1, 1, r.numVisualRows + 1];
        if (r.numVisualReals > 0) {
          switch (r.visualOrientation) {
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
          gridColumnStart: coord[0],
          gridColumnEnd: coord[1],
          gridRowStart: coord[2],
          gridRowEnd: coord[3],
          zoom: 1
        };
      }

      return {};
    },

  }
}