export default {
  props: {
    pane: {},
    /**
     * Defines if the component is hidden.
     * @prop {Boolean} [false] invisible
     */
    invisible: {
      type: [Boolean, Function],
      default: false
    },
  },
  data() {
    return {
      /**
       * True if the container is fullscreen.
       * @data {Boolean} [false] fullScreen
       */
      fullScreen: false,
    }
  },
  computed: {
    /**
     * True if the router configuration object has pane (ie is in a splitter pane).
     * @data {Boolean} [false] isVisible
     */
    isPane() {
      return !!this.currentView?.pane;
    },
    /**
     * True if the container is shown.
     * @data {Boolean} [false] isVisible
     */
    isVisible() {
      if (this.router) {
        if (this.isPane) {
          if (!this.router.routed) {
            return false;
          }
          if (this.isLoaded) {
            return true;
          }

          let pane = bbn.fn.getRow(this.router.currentPanes, {id: this.currentView.pane});
          if (pane) {
            let idx = bbn.fn.search(pane.tabs, {url: this.currentView.url});
            if (pane.tabs[idx]) {
              return idx === pane.selected;
            }
          }
          return (this.router.routed && this.isPane) || (this.router.selected === this.currentIndex);
        }
        else {
          return this.router.selected === this.currentIndex;
        }
      }

      return false;
    },
  },
  watch: {
    /**
     * @watch visible
     * @param {Boolean} nv 
     * @param {Boolean} ov 
     * @fires selfEmit
     */
    isVisible(nv) {
      //bbn.fn.log("Changing isVisible for " + this.currentURL);
      let emit = true;

      if (!this.isPane && this.router?.isVisual) {
        if (nv) {
          this.setScreenshot()
        }
        else {
          this.unsetScreenshot();
        }
      }

      if (emit) {
        this.$emit(nv ? 'view' : 'unview', this);
      }

      if (nv) {
        this.onShow();
      }
    },
    /**
     * If true adds the event listener keydown, or else removes the event listener.
     * @watch fullScreen
     * @param {Boolean} newVal 
     * @fires selfEmit
     */
    fullScreen(newVal){
      let fn = e => {
        if ( e.keyCode === 27 ){
          this.fullScreen = false;
        }
      };
      if ( newVal ){
        document.body.addEventListener('keydown', fn);
      }
      else{
        document.body.removeEventListener('keydown', fn);
      }
      this.$nextTick(() => {
        this.selfEmit(true)
      })
    },

  }
}
