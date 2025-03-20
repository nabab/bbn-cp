export default {
  props: {
    /**
     * Set to true shows a save icon that allows to save the current configuration of the table at the bottom right of the table.
     * @prop {Boolean} [false] saveable
     */
    saveable: {
      type: Boolean,
      default: false
    },
    /**
     * @todo desc
     * @prop {Object} loadedConfig
     */
    loadedConfig: {
      type: Object
    },
  },
  data() {
    return {
      initialConfig: null,
      /**
       * The current configuration object.
       * @data {Object} [{}] currentConfig
       */
      currentConfig: {},
      /**
       * The saved configuration.
       * @data {Boolean} [false] savedConfig
       */
      savedConfig: false,
      /**
       * The default confuguration
       * @data {Object} defaultConfig
       */
      defaultConfig: bbn.fn.extend({
        filters: this.filters,
        limit: this.limit,
        order: this.order,
        invisible: this.invisible || null,
      }, this.loadedConfig || {}),
    };
  },
  computed: {
    /**
     * Return the json string of currentConfig.
     * @computed jsonConfig
     * @returns {String}
     */
    jsonConfig() {
      let cfg = this.currentConfig;
      if (this.currentHidden.length > (this.cols.length / 2)) {
        cfg = bbn.fn.createObject(cfg);
        cfg.shown = this.allFields.filter(x => !cfg.invisible.includes(x));
        //bbn.fn.log("WE ARE IN!!!!", cfg);
        delete cfg.invisible;
      }

      return JSON.stringify(this.currentConfig);
    },
    /**
     * Return true if the saved config is identic to the jsonConfig.
     * @computed isSaved
     * @returns {Boolean}
     */
    isSaved() {
      return this.jsonConfig === this.savedConfig;
    },
    /**
     * Return true if the json string of currentConfig is different from initialConfig
     * @computed isChanged
     * @returns {Boolean}
     */
    isChanged() {
      return this.jsonConfig !== this.initialConfig;
    },

  },
  methods: {
    initConfig() {
      if (this.defaultConfig.invisible === null) {
        let tmp = [];
        let initColumn = [];
        bbn.fn.each(this.cols, (a, i) => {
          if (a.invisible) {
            tmp.push(a.field || i);
          }
          else if (initColumn.length <= 10) {
            initColumn.push(i);
          }
        });
        this.defaultConfig.invisible = tmp;
      }
  
      this.setConfig(false, true);
      this.initialConfig = this.jsonConfig;
      this.savedConfig = this.initialConfig;
      let cfg = this.getStorage();
      if (cfg) {
        this.setConfig(cfg, true);
      }
      },
    /**
     * Returns the current configuration of the table.
     * @method getConfig
     * @returns {Object}
     */
    getConfig() {
      return {
        searchValue: this.searchValue,
        limit: this.currentLimit,
        order: this.currentOrder,
        filters: this.currentFilters,
        invisible: this.currentHidden
      };
    },
    onSave() {
      this.$emit('save', JSON.parse(this.jsonConfig))
    },
    /**
     * Sets the current config of the table.
     * @method setConfig
     * @param {Object} cfg
     * @param {Boolean} no_storage
     * @fires getConfig
     * @fires setStorage
     */
    setConfig(cfg, no_storage) {
      if (cfg === false) {
        cfg = bbn.fn.clone(this.defaultConfig);
      }
      else if (cfg === true) {
        cfg = this.getConfig();
      }
      if (cfg && cfg.limit) {
        if (this.filterable && cfg.filters && (this.currentFilters !== cfg.filters)) {
          this.currentFilters = cfg.filters;
        }
        if (this.pageable && (this.currentLimit !== cfg.limit)) {
          this.currentLimit = cfg.limit;
        }
        if (this.search) {
          this.searchValue = cfg.searchValue || '';
        }
        if (this.sortable && (this.currentOrder !== cfg.order)) {
          if (bbn.fn.isObject(cfg.order)) {
            let currentOrder = [];
            bbn.fn.iterate(cfg.order, (v, n) => {
              currentOrder.push({ field: n, dir: v.toUpperCase() === 'DESC' ? 'DESC' : 'ASC' });
            });
            this.currentOrder = currentOrder;
          }
          else if (bbn.fn.isArray(cfg.order)) {
            this.currentOrder = cfg.order;
          }
        }
        if (this.showable) {
          this.currentHidden = this.allFields.filter(x => (cfg.shown && !cfg.shown.includes(x)) || (cfg.invisible && cfg.invisible.includes(x)));

          bbn.fn.each(this.cols, (a, i) => {
            let isHidden = (this.currentHidden.indexOf(a.field || i) > -1);
            if (a.invisible !== isHidden) {
              //bbn.fn.log("CHANGING HIDDEN");
              //this.cols[i].invisible = hidden;
              this.cols[i].invisible = isHidden;
            }
          });
        }
        this.currentConfig = {
          searchValue: this.searchValue,
          limit: this.currentLimit,
          order: this.currentOrder,
          filters: this.currentFilters,
          invisible: this.currentHidden
        };
        if (!no_storage) {
          let cfg = this.currentConfig;
          if ((this.cols.length > 10) && (this.currentHidden?.length > (this.cols.length / 2))) {
            cfg = bbn.fn.extend({}, cfg);
            cfg.shown = this.allFields.filter(x => !cfg.invisible.includes(x))
            delete cfg.invisible;
          }

          this.setStorage(cfg);
        }

      }
    },
    /**
     * Saves the current configuration.
     * @method save
     */
    save() {
      this.savedConfig = this.jsonConfig;
    },
    /**
     * Resets configuration of the table.
     * @method reset
     * @param noCfg
     * @fires setConfig
     * @fires init
     */
    reset(noCfg) {
      this.initReady = false;
      this.$emit('reset', this);
      if (!noCfg) {
        this.setConfig(false);
      }
      this.init();
    },

  }
}

