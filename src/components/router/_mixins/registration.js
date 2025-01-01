import bbn from "@bbn/bbn";

export default {
  data() {
    return {
      /**
      * Number of conatainers registered - as they say it.
      * @data {Number} [0] numRegistered
      */
      numRegistered: 0,
      /**
       * Real containers are the bbn-container in the slot.
       * @data {Boolean} [false] hasRealContainers
       */
      hasRealContainers: false,
      /**
       * Fake containers are the bbns-container in the slot.
       * @data {Boolean} [false] hasFakeContainers
       */
      hasFakeContainers: false,
    }
  },
  methods: {
    filterIsContainer(ele) {
      return ele?.tagName === 'BBN-CONTAINER';
    },
    /**
     * used by container to make themselves known when they are mounted.
     * @method register
     * @param {bbnCp} cp
     * @param {Boolean} fake
     * @fires add
     * @fires search
     * @fires route
     * @fires getDefaultURL
     */
    register(cp, fake) {
      bbn.fn.checkType(cp, bbnContainerCp);
      if (cp.isRegistered) {
        bbn.fn.log(["It exists", this.urls[cp.routerUid].$numBuild, this.numRegistered, this.views[0].real]);
        if (this.urls[cp.routerUid]) {
          //this.urls[cp.url].$el.parentNode.removeChild(this.urls[cp.url].$el);
          throw new Error(bbn._('Two containers cannot have the same URL defined') + '(' + cp.url + ')');
        }
        else {
          throw new Error(bbn._("The container shouldn't register twice"));
        }
      }

      let idx = this.search(cp.url);
      if (idx === false) {
        throw new Error(bbn._('Impossible to find the view for URL %s', cp.url));
      }

      cp.isRegistered = true;
      if (!cp.routerUid) {
        cp.routerUid = this.views[idx].uid;
      }

      this.numRegistered++;
      this.urls[cp.routerUid] = cp;
      //bbn.fn.log("VIEW ON VISUAL")
      cp.$on('view', () => {
        if (this.isVisual) {
          this.visualShowAll = false;
        }
      });

      this.$emit('registered', cp);
      if (!this.isInit && (this.numRegistered === this.numOutOfPane)) {
        this.init();
      }

    },


    /**
     * used by container to make themselves known when they are destroyed
     * @method unregister
     * @fires search
     * @fires remove
     * @param {bbnCp} cp
     */
    unregister(cp) {
      //bbn.fn.log("UNREGISTERING " + cp.url);
      if (!bbn.fn.isString(cp.url)) {
        throw new Error(bbn._('The component bbn-container must have a URL defined'));
      }
      this.numRegistered--;
      let idx = this.search(cp.url),
        dataObj = this.postBaseUrl ? { _bbn_baseURL: this.fullBaseURL } : {},
        requestID = bbn.fn.getRequestId(cp.url, dataObj);
      if (bbn.fn.getLoader(requestID)) {
        bbn.fn.abort(requestID);
      }
      if (this.urls[cp.routerUid] !== undefined) {
        delete this.urls[cp.routerUid];
      }

      if (idx !== false) {
        //this.remove(idx);
      }
    },
  },
  beforeMount() {
    if (this.parentContainer) {
      this.parentContainer.registerRouter(this);
    }
  },
  /**
   * @event beforeDestroy
   */
  beforeDestroy() {
    if (this.parentContainer) {
      this.parentContainer.unregisterRouter(this);
    }
  },
}
