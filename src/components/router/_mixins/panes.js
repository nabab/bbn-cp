export default {
  props: {
    /**
     * A list of panes used by default if splittable is true
     * @prop {Array} [[]] panes
     */
    panes: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * If true another tab can be opened aside
     * @prop {Boolean} [false] splittable
     */
    splittable: {
      type: Boolean,
      default: false
    },
    /**
     * If true when splittable the extra panes can be collapsed
     * @prop {Boolean} [false] collapsible
     */
    collapsible: {
      type: Boolean,
      default: true
    },
    /**
     * If true when splittable the extra panes can be resized
     * @prop {Boolean} [false] resizable
     */
    resizable: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      /**
       * The panes for when splittable is true
       * @data {Array} currentPanes
       */
      currentPanes: this.panes.slice(),
      /**
       * Becomes true once the pane splitter is mounted
       * @data {Boolean} visual
       */
      splitterMounted: false,

    }
  },
  computed: {
    isSplittable() {
      return this.splittable && !this.single;
    },

    /**
     * The number of tabs which are not in a pane
     * 
     * @returns {Number}
     */
    numOutOfPane() {
      return this.views.filter(a => !a.pane).length;
    },

    /**
     * The number of panes displayed
     * @computed numPanes
     * @return {Number} 
     */
    numPanes() {
      return this.currentPanes.length;
    },
  },
  methods: {
    getPane(obj) {
      if (!obj) {
        return false;
      }

      return obj.view?.pane || obj.pane || false;
    },
    addPane(paneId) {
      if (this.splittable) {
        if (!paneId) {
          paneId = bbn.fn.randomString(8, 12).toLowerCase();
        }

        if (!bbn.fn.getRow(this.currentPanes, { id: paneId })) {
          this.currentPanes.push({
            id: paneId,
            tabs: [],
            selected: -1
          });
          this.updatePortalTargets();
        }
      }

      return paneId;
    },
    selectPaneTab(pane) {
      let view = pane.tabs[pane.selected];
      if (view && this.urls[view.uid]) {
        view.last = bbn.fn.timestamp();
        if (view.load && !this.urls[view.uid].isLoaded) {
          this.urls[view.uid].loadView(view.current);
        }
      }
    },
    removePane(paneId) {
      if (this.splittable && this.currentPanes) {
        let paneIndex = bbn.fn.search(this.currentPanes, { id: paneId });
        let pane = this.currentPanes[paneIndex];
        if (!pane) {
          throw new Error(bbn._("Impossible to find the pane with ID %s", paneId));
        }
        if (pane.tabs.length) {
          throw new Error(bbn._("Impossible to remove the pane with ID %s as it has still containers inside", paneId));
        }

        this.currentPanes.splice(paneIndex, 1);
        this.updatePortalTargets();
        if (this.routed) {
          this.$nextTick(() => {
            this.currentPanes.length ?
              this.getRef('splitter').init()
              : this.getRef('topSplitter').init()
          })
        }
      }
    },
    addToPane(containerIdx, paneId) {
      let view = this.views[containerIdx];
      if (!view) {
        throw new Error(bbn._("Impossible to find the view with index") + ' ' + containerIdx);
      }

      if (view.dirty) {
        this.alert(bbn._("Save your changes or discard them before moving the container"));
        return;
      }

      let pane = bbn.fn.getRow(this.currentPanes, { id: paneId });
      if (!pane) {
        paneId = this.addPane(paneId);
        pane = bbn.fn.getRow(this.currentPanes, { id: paneId });
      }

      if (this.selected <= containerIdx) {
        this.selected--;
      }

      this.views[containerIdx].pane = paneId;
      pane.tabs.push(view);
      //this.$forceUpdate();
      if (containerIdx === this.selected) {
        this.selectClosest(containerIdx);
      }

      pane.selected = pane.tabs.length - 1;
      this.updatePortalTargets();
    },
    removeFromPane(containerIdx) {
      let view = this.views[containerIdx];
      if (view) {
        let paneId = view.pane;
        if (paneId) {
          let pane = bbn.fn.getRow(this.currentPanes, { id: paneId });
          if (pane && pane.tabs) {
            let idx = bbn.fn.search(pane.tabs, { idx: containerIdx });
            if (idx > -1) {
              pane.tabs.splice(idx, 1);
              if ((pane.selected >= idx) && pane[idx-1]) {
                pane.selected--;
              }

              view.pane = false;
              this.$nextTick(() => {
                this.selected = containerIdx;
                if (!pane.tabs.length) {
                  this.removePane(paneId);
                }
                else if (pane.selected >= idx) {
                  this.getRef('pane' + pane.id).onResize(true);
                }
              })
            }
          }
          this.updatePortalTargets();
        }
      }
    },
    /**
     * @event created
     */
    panesInit() {
      if (this.splittable && this.hasStorage) {
        let storage = this.getStorage(this.routerStorageName);
        if (storage && storage.panes) {
          bbn.fn.each(storage.panes, a => {
            this.addPane(a.id);
          })

          bbn.fn.each(storage.panes, pane => {
            bbn.fn.each(pane.tabs, tab => {
              let view = bbn.fn.getRow(this.views, { url: tab });
              let realPane = bbn.fn.getRow(this.currentPanes, { id: pane.id });
              if (view && realPane) {
                if (!view.pane) {
                  view.pane = pane.id;
                }
                realPane.tabs.push(view);
              }
            });
          })
        }
  
        bbn.fn.each(this.views, a => {
          if (a.pane) {
            let pane = bbn.fn.getRow(this.currentPanes, { id: a.pane });
            if (pane && !bbn.fn.getRow(pane.tabs, { url: a.url })) {
              pane.tabs.push(a);
            }
          }
        });
  
        bbn.fn.each(this.currentPanes, pane => {
          let done = false;
          if (storage && storage.panes) {
            let p = bbn.fn.getRow(storage.panes, { id: pane.id });
            if (p && pane.tabs[p.selected]) {
              pane.selected = p.selected;
              done = true;
            }
  
          }
          if (!done) {
            pane.selected = pane.tabs.length ? 0 : -1;
          }
        })
        this.updatePortalTargets();
      }
    },
  },
  watch: {
    numPanes() {
      this.onResize();
    },
    currentPanes: {
      deep: true,
      handler() {
        if (this.ready) {
          this.setConfig();
        }
      }
    },
  },
}
