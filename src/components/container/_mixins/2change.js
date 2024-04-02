export default {
  methods: {
    /**
     * @method registerRouter
     * @param {Object} bc
     * @param {String} url
     */
    registerRouter(router) {
      this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)] = router;
      this.router.registerRouter(router);
    },
    /**
     * @method unregisterRouter
     * @param {Object} bc
     * @param {String} url
     */
    unregisterRouter(router){
      delete this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)];
      this.router.unregisterRouter(router);
    }
  }
}
