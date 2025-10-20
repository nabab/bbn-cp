export default {
  props: {
    /**
     * Set it to true if you want to set this nav as a master.
     * @prop {Boolean} [false] master
     */
    master: {
      type: Boolean,
      default: false
    },

  },
  data() {
    return {
      /**
       * List of breadcrumbs
       * @data {Array} breadcrumbsList
       */
      breadcrumbsList: [],
    }
  },
  computed: {
    isBreadcrumb() {
      return this.currentMode === 'breadcrumb';
    },
    /**
     * Returns the breadcrumbs array
     * @computed breadcrumbs
     * @return {Array}
     */
    breadcrumbs() {
      let res = [];
      if (this.isBreadcrumb) {
        res.push(this)
      }
      if (this.breadcrumbsList.length) {
        res.push(...this.getBreadcrumbs(this.selected))
      }
      return res;
    },
    breadcrumbMaster() {
      const routers = [this, ...this.parents];
      let r = null;
      for (let i = 0; i < routers.length; i++) {
        if (routers[i].isBreadcrumb) {
          r = routers[i];
        }
      }

      return r;
    },
    breadcrumbMasterElement() {
      if (this.breadcrumbMaster && this.ready) {
        return this.breadcrumbMaster.getRef('breadcrumb');
      }

      return null;
    },
    isBreadcrumbMaster() {
      return this.isBreadcrumb && (this.breadcrumbMaster === this);
    },
  },
  methods: {
    routerBreadcrumbDestroy() {
      if (!this.single && this.isNav && !this.master && this.parent) {
        this.parent.unregisterBreadcrumb(this);
      }
    },
    breadcrumbInit() {
      if (!this.single && this.isNav) {
        if (!this.master && this.parent && this.parentContainer && this.isBreadcrumb) {
          this.parent.registerBreadcrumb(this);
          bbn.fn.log("VIEW ON BREADCUMB")
          this.parentContainer.$on('view', () => {
            this.parent.registerBreadcrumb(this);
          }, true);
          this.parentContainer.$on('unview', () => {
            this.parent.unregisterBreadcrumb(this);
          }, true);
          if (this.parentContainer.isVisible) {
            this.parent.registerBreadcrumb(this);
          }
        }
      }
    },
    //Breadcrumb
    /**
     * @method registerBreadcrumb
     * @param {HTMLElement} bc
     * @param {String} url
     */
    registerBreadcrumb(bc) {
      if (this.breadcrumbsList.indexOf(bc) === -1) {
        this.breadcrumbsList.push(bc);
        if (this.breadcrumbMaster && (this.breadcrumbMaster.breadcrumbsList.indexOf(bc) === -1) && (this.breadcrumbMaster !== this)) {
          this.breadcrumbMaster.breadcrumbsList.push(bc);
        }
      }
    },


    /**
     * @method unregisterBreadcrumb
     * @param {HTMLElement} bc
     * @param {String} url
     */
    unregisterBreadcrumb(bc) {
      if (this.breadcrumbsList) {
        let idx = bbn.fn.search(this.breadcrumbsList, { baseURL: bc.baseURL });
        if (idx !== -1) {
          this.breadcrumbsList.splice(idx, 1);
        }
        if (this.breadcrumbMaster && (this.breadcrumbMaster !== this)) {
          idx = bbn.fn.search(this.breadcrumbMaster.breadcrumbsList, { baseURL: bc.baseURL });
          if (idx !== -1) {
            this.breadcrumbMaster.breadcrumbsList.splice(idx, 1);
          }
        }
      }
    },


    getBreadcrumbs(idx) {
      let ret = [];
      if (bbn.fn.isNumber(idx) && this.views[idx]) {
        let url = this.views[idx].url,
          bc = bbn.fn.getRow(this.breadcrumbsList, { baseURL: url + '/' });
        if (this.containers[this.views[idx].uid] && bc) {
          ret.push(...bc.breadcrumbs);
        }
      }
      return ret;
    }

  },
  watch: {
    /**
     * @watch isBreadcrumb
     * @fires setConfig
     */
    isBreadcrumb(newVal) {
      this.$nextTick(() => {
        if (this.ready) {
          this.setConfig();
          this.onResize();
        }
      })
    },
  },
}
