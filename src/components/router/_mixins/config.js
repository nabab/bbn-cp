
export default {
  data() {
    return {
      /**
       * If true the configuration will be shown
       * @data {Boolean} visual
       */
      showRouterCfg: false,
    }
  },
  methods: {
    /**
     * @method setconfig
     * @fires setStorage
     * @fires getConfig
     */
    setConfig() {
      if (this.autoload && this.isInit) {
        this.setStorage(this.getConfig(), this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
        //this.$forceUpdate();
      }
    },
    /**
     * @method getConfig
     * @return {Object}
     */
    getConfig() {
      let cfg = {
        baseURL: this.parentContainer ? this.parentContainer.getFullURL() : this.storageName,
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
            title: obj.title ? obj.title : bbn._('Untitled'),
            fixed: !!obj.fixed,
            pinned: !!obj.pinned,
            pane: obj.pane || false,
            current: obj.current ? obj.current : obj.url,
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
        this.unsetStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
      }
    }
  },
}