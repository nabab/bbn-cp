export default {
  data() {
    return {
      paneContainers: {},
      portalTargets: []
    }
  },
  computed: {
    activeContainer() {
      const v = this.views[this.selected];
      if (v) {
        return this.urls[v.uid];
      }

      return null;
    }
  },
  methods: {
    updatePortalTargets() {
      this.portalTargets = this.views.map(a => {
        if (this.routed && !a.real && this.ready) {
          if (a.selected) {
            return false;
          }
          if (a.pane) {
            return this.paneContainers[a.pane + '-' + a.uid] || false;
          }
          if (this.isVisual) {
            const idx = bbn.fn.search(this.visualList, 'uid', a.uid);
            if (this.visualList[idx]) {
              return this.getRef('bbn-router-visual-' + idx.toString());
            }
          }
        }
        return false;
      });
    },
    /**
     * @method getVue
     * @fires isValidIndex
     * @return {Vue|Boolean}
     */
    getVue(idx) {
      return this.getContainer(idx);
    },
    /**
     * Returns the corresponding container's component's DOM element.
     * @method getContainer
     * @param {Number} idx
     * @return {HTMLElement}
     */
    getContainer(idx) {
      if (idx === undefined) {
        idx = this.selected;
      }

      return this.urls[this.views[idx]?.uid];
    },
    /**
     * Returns the corresponding container's component's DOM element.
     * @method getDOMContainer
     * @param {Number} idx
     * @fires getContainer
     * @return {HTMLElement|Boolean}
     */
    getDOMContainer(idx) {
      if (idx === undefined) {
        idx = this.selected;
      }
      let c = this.getContainer(idx);
      return c ? c.$el : false;
    },
    /**
     * @method getFinalContainer
     * @param misc
     * @fires getIndex
     * @fires getSubRouter
     * @fires getContainer
     * @return {HTMLElement}
     */
    getFinalContainer(misc) {
      let idx = this.getIndex(misc);
      if (idx === undefined) {
        idx = this.selected;
      }

      let router = this.urls[this.views[idx].uid].subrouter;
      if (router) {
        return router.getFinalContainer();
      }

      return this.getContainer(idx);
    },
    /**
     * @method getRealVue
     * @param misc
     * @fires getFinalContainer
     * @return {HTMLElement}
     */
    getRealVue(misc) {
      return this.getFinalContainer(misc);
    },

    getPortal(item) {
      if (!item.real && this.routed) {
        if (item.pane) {
          return this.paneContainers[item.pane + '-' + item.uid] || false;
        }
        if (bbn.fn.getRow(this.visualList, 'uid', item.uid)) {
          return this.getRef('bbn-router-visual-' + item.uid);
        }
      }

      return false;
    },

    onCreatePaneContainer(e, paneId) {
      //bbn.fn.log(["CREATE PANE CONTAINER", paneId, e?.target]);
      this.paneContainers[paneId] = e.target;
    },

  }
};