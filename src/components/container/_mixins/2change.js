import bbn from "@bbn/bbn";

export default {
  methods: {
    /**
     * @method registerRouter
     * @param {Object} bc
     * @param {String} url
     */
    registerRouter(router) {
      if (this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)]) {
        throw Error(bbn._('The router %s already exists', router.getBaseURL() || '__root__'));
      }

      this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)] = router;
    },
    /**
     * @method unregisterRouter
     * @param {Object} bc
     * @param {String} url
     */
    unregisterRouter(router){
      if (!this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)]) {
        throw Error(bbn._('The router %s was not registered', router.getBaseURL() || '__root__'));
      }

      delete this.routers[bbn.fn.substr(router.getBaseURL(), 0, -1)];
    }
  }
}
