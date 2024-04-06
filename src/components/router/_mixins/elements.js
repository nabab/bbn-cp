export default {
  methods: {
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
     * @return {bbnCp}
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
     * @return {bbnCp}
     */
    getFinalContainer(misc) {
      let idx = this.getIndex(misc);
      if (idx === undefined) {
        idx = this.selected;
      }

      let router = this.urrls[this.views[idx].uid].subRouter;
      if (router) {
        return router.getFinalContainer();
      }

      return this.getContainer(idx);
    },
    /**
     * @method getRealVue
     * @param misc
     * @fires getFinalContainer
     * @return {bbnCp}
     */
    getRealVue(misc) {
      return this.getFinalContainer(misc);
    }
  }
};