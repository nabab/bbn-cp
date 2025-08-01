export default {
  methods: {
    /**
     * @method registerRouter
     * @param {Object} bc
     * @param {String} url
     */
    registerRouter(router) {
      if (!router.urlNavigation) {
        return;
      }
      if (this.subrouter && (this.subrouter !== router) && !this.subrouter.$isDestroying) {
        throw new Error(bbn._('The router %s already exists', router.getBaseURL() || '__root__'));
      }

      this.subrouter = router;
    },
    /**
     * @method unregisterRouter
     * @param {Object} bc
     * @param {String} url
     */
    unregisterRouter(router){
      if (!this.subrouter) {
        throw new Error(bbn._('The router %s was not registered', router.getBaseURL() || '__root__'));
      }

      this.subrouter = null;
    }
  }
}
