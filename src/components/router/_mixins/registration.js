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
    registrationInit() {
      if (this.parentContainer) {
        this.parentContainer.registerRouter(this);
      }
    },
    routerRegistrationDestroy() {
      if (this.parentContainer) {
        this.parentContainer.unregisterRouter(this);
      }
    },
    filterIsContainer(ele) {
      return ele?.tagName === 'BBN-CONTAINER';
    },
    /**
     * used by container to make themselves known when they are mounted.
     * @method register
     * @param {HTMLElement} cp
     * @param {Boolean} fake
     * @fires add
     * @fires search
     * @fires route
     * @fires getDefaultURL
     */
    register(cp, fake) {
      bbn.fn.checkType(cp, bbnContainer);
      if (cp.isRegistered) {
        bbn.fn.log(["It exists", this.containers[cp.routerUid].$numBuild, this.numRegistered, this.views[0].real]);
        if (this.containers[cp.routerUid]) {
          throw new Error(bbn._('Two containers cannot have the same URL defined') + '(' + cp.url + ')');
        }
        else {
          throw new Error(bbn._("The container shouldn't register twice"));
        }
      }

      let idx = this.search(cp.url);
      if (idx === false) {
        if (fake) {
          throw new Error(bbn._('Impossible to find the view for URL %s', cp.url));
        }

        if (cp.$node.prevElement && ('currentIndex' in cp.$node.prevElement)) {
          idx = cp.$node.prevElement.currentIndex + 1;
        }
        else {
          idx = this.views.length;
        }

        const props = bbn.fn.extendOut({idx}, cp.bbnNode.props);
        this.add(props, idx);
      }

      cp.isRegistered = true;
      if (!cp.routerUid) {
        cp.routerUid = this.views[idx].uid;
      }

      if (this.db) {
        this.db.select('containers', ['manual', 'image'], {url: this.views[idx].url}).then(thumb => {
          if (thumb?.image) {
            this.thumbnails[cp.routerUid] = bbn.cp.immunizeValue(thumb);
          }
        });
      }

      this.numRegistered++;
      this.containers[cp.routerUid] = cp;
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
     * @fires removeItem
     * @param {HTMLElement} cp
     */
    unregister(cp) {
      if (!bbn.fn.isString(cp.url)) {
        throw new Error(bbn._('The component bbn-container must have a URL defined'));
      }
      let idx = this.search(cp.url);
      const dataObj = this.postBaseUrl ? { _bbn_baseURL: this.fullBaseURL } : {};
      const requestID = bbn.fn.getRequestId(cp.url, dataObj);
      if (bbn.fn.getLoader(requestID)) {
        bbn.fn.abort(requestID);
      }
      if (idx !== false) {
        if (this.views[idx].uid !== cp.routerUid) {
          delete this.containers[cp.routerUid];
        }
        else {
          // Changing the container
        }
      }
      else {
        delete this.containers[cp.routerUid];
        this.numRegistered--;
      }
    },
  },
}
