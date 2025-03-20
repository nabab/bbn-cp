
export default {
  props: {
    /**
     * Shows the configuration in the menu
     */
    configuration: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      /**
       * If true the configuration will be shown
       * @data {Boolean} visual
       */
      showRouterCfg: false,
      changingConfig: false,
    }
  },
  computed: {
    routerStorageName() {
      return this.parentContainer ? this.parentContainer.getFullURL() : this.storageName;
    }
  },
  methods: {
    changeConfig() {
      this.changingConfig = true;
      setTimeout(() => {
        this.changingConfig = false;
      }, 1500);
    },
    /**
     * @method setconfig
     * @fires setStorage
     * @fires getConfig
     */
    setConfig() {
      if (this.isInit && this.hasStorage) {
        this.setStorage(this.getConfig(), this.routerStorageName);
        //this.$forceUpdate();
      }
    },
    /**
     * @method getConfig
     * @return {Object}
     */
    getConfig() {
      let cfg = {
        baseURL: this.parentContainer ? this.parentContainer.currentURL : this.storageName,
        views: [],
        breadcrumb: this.isBreadcrumb,
        visual: this.isVisual,
        orientation: this.lockedOrientation ? this.visualOrientation : null,
        panes: this.currentPanes.map(a => { return { id: a.id, tabs: a.tabs.map(b => b.url), selected: a.selected } })
      };

      bbn.fn.each(this.views, (obj, i) => {
        if (obj.url && obj.load) {
          let res = {
            url: obj.url,
            icon: obj.icon || false,
            notext: obj.notext || false,
            load: true,
            loaded: false,
            label: obj.label || bbn._('Untitled'),
            fixed: !!obj.fixed,
            pinned: !!obj.pinned,
            pane: obj.pane || false,
            current: obj.current || obj.url,
            cfg: {},
            real: obj.real,
            last: obj.last
          };
          if (obj.bcolor) {
            res.bcolor = obj.bcolor;
          }
          if (obj.fcolor) {
            res.fcolor = obj.fcolor;
          }
          cfg.views.push(res);
        }
      });
      return cfg;
    },
    /**
     * @method unsetConfig
     * @fires unsetStorage
     */
    unsetConfig() {
      if (this.autoload) {
        this.unsetStorage(this.routerStorageName);
      }
    }
  },
}