export default {
  props: {
    /**
     * Set it to true if you want to show the breadcrumb instead of the tabs.
     * @prop {Boolean} [false] breadcrumb
     */
    breadcrumb: {
      type: Boolean,
      default: false
    },
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
       * Shows if the navigation mode is set to breacrumb.
       * @data {Boolean} isBreadcrumb
       */
      isBreadcrumb: !!this.breadcrumb,
      /**
       * itsMaster.isBreadcrumb watcher.
       * @data {Boolean} breadcrumbWatcher
       */
      breadcrumbWatcher: false,
      /**
       * List of breadcrumbs
       * @data {Array} breadcrumbsList
       */
      breadcrumbsList: [],
    }
  },
  computed: {
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

    /**
     * The master bbn-router of this one.
     * @computed itsMaster
     * @return {bbnCp}
     */
    itsMaster() {
      let r = this;
      if (this.master) {
        return r;
      }

      if (this.parents.length) {
        let i = 0;
        while (this.parents[i] && this.parents[i].isBreadcrumb) {
          r = this.parents[i];
          i++;
          if (r.master) {
            break;
          }
        }
      }
      return r;
    },
    isBreadcrumbMaster() {
      if (this.isBreadcrumb) {
        return this.itsMaster === this;
      }

      return false;
    },
  },
  methods: {
    //Breadcrumb
    /**
     * @method registerBreadcrumb
     * @param {bbnCp} bc
     * @param {String} url
     */
    registerBreadcrumb(bc) {
      let url = bbn.fn.substr(bc.baseURL, 0, bc.baseURL.length - 1);
      this.breadcrumbsList.push(bc);
      if (this.itsMaster && !this.master) {
        this.itsMaster.breadcrumbsList.push(bc);
      }
    },


    /**
     * @method unregisterBreadcrumb
     * @param {bbnCp} bc
     * @param {String} url
     */
    unregisterBreadcrumb(bc) {
      if (this.breadcrumbsList) {
        let idx = bbn.fn.search(this.breadcrumbsList, { baseURL: bc.baseURL });
        if (idx !== -1) {
          this.breadcrumbsList.splice(idx, 1);
        }
        if (this.itsMaster && !this.master) {
          idx = bbn.fn.search(this.itsMaster.breadcrumbsList, { baseURL: bc.baseURL });
          if (idx !== -1) {
            this.itsMaster.breadcrumbsList.splice(idx, 1);
          }
        }
      }
    },


    getBreadcrumbs(idx) {
      let ret = [];
      if (bbn.fn.isNumber(idx) && this.views[idx]) {
        let url = this.views[idx].url,
          bc = bbn.fn.getRow(this.breadcrumbsList, { baseURL: url + '/' });
        if (this.urls[this.views[idx].uid] && bc) {
          ret.push(...bc.breadcrumbs);
        }
      }
      return ret;
    }

  },
  watch: {
    /**
     * @watch itsMaster
     * @fires breadcrumbWatcher
     */
    itsMaster(newVal, oldVal) {
      if (this.nav && (newVal !== oldVal)) {
        this.isBreadcrumb = newVal ? newVal.isBreadcrumb : this.breadcrumb;
        if (this.breadcrumbWatcher) {
          this.breadcrumbWatcher();
        }
        if (newVal) {
          /**
           * @watch itsMaster.isBreadcrumb
           */
          this.breadcrumbWatcher = this.$watch('itsMaster.isBreadcrumb', isB => {
            this.isBreadcrumb = isB;
          });
        }
      }
    },
    breadcrumb(v) {
      this.isBreadcrumb = v;
    },
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
  beforeMount() {
    //Breadcrumb
    //bbn.fn.warning("BEFORE MOUNT ROUTER")

    //Get config from the storage
    if (!this.single & this.nav) {
      let storage = this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
      if (storage) {
        if (storage.breadcrumb !== undefined) {
          this.isBreadcrumb = storage.breadcrumb;
        }
      }

      if (!this.master && this.parent && this.parentContainer) {
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
  beforeDestroy() {
    if (!this.single & this.nav && !this.master && this.parent) {
      this.parent.unregisterBreadcrumb(this);
    }
  }
}
