import bbn from "@bbn/bbn";

export default {
  props: {
    /**
     * The views shown at init.
     * @prop {Array} [[]] source
     */
    source: {
      type: Array,
      default() {
        return [];
      }
    },
    maxTotal: {
      type: Number,
      default: 25
    },
    /**
     * Decides if real bbn-container are shown before or after the ones in the config or fake container 9bbns-container)
     * @prop {String} ['real] first
     */
    first: {
      type: String,
      default: 'real'
    },
    /**
     * Will be passed to router in order to ignore the dirty parameter.
     * @prop {Boolean} ignoreDirty
     */
    ignoreDirty: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      /**
       * The array of containers defined in the source.
       * @data {Array} cfgViews
       */
      cfgViews: [].concat(this.source),
      /**
       * The views from the slot.
       * @data {Array} [[]] slotViews
       */
      slotViews: [],
      /**
       * All the views.
       * @data {Array} [[]] views
      */
      views: [],
      /**
       * The list of the dirty containers.
       * @data {Array} [[]] dirtyContainers
       */
      dirtyContainers: [],
    };
  },
  computed: {
    /**
     * Returns true if there are any unsaved views.
     * @computed isDirty
     * @return {Boolean}
     */
    isDirty() {
      return !!this.dirtyContainers.length;
    },

    /**
     * The views to show in the tabs, without the ones in the pane if splittable
     * @computed tabsList
     * @return {Array} 
     */
    tabsList() {
      return bbn.fn.multiorder(
        this.splittable ? bbn.fn.filter(this.views, a => !a.pane) : this.views,
        { fixed: 'desc', pinned: 'desc', idx: 'asc' }
      );
    },
  },
  methods: {
    /**
     * Sets the 'dirtyContainers' property with the list of unsaved views
     * @method retrieveDirtyContainers
     */
    retrieveDirtyContainers() {
      this.dirtyContainers.splice(0, this.dirtyContainers.length);
      bbn.fn.iterate(this.urls, v => {
        if (v.dirty) {
          this.dirtyContainers.push({
            idx: v.currentIndex,
            url: v.url
          });
        }
      });
    },

    /**
    * Returns the default object for the view.
    * @method getDefaultView
    * @return {Object}
    */
    getDefaultView(...obj) {
      return bbn.fn.extendOut(bbn.fn.createObject(), ...obj, {
        source: null,
        title: bbn._("Untitled"),
        options: null,
        cached: !this.single && this.nav,
        scrollable: true,
        component: null,
        icon: '',
        notext: false,
        content: null,
        menu: [],
        loaded: null,
        fcolor: null,
        bcolor: null,
        load: false,
        pane: false,
        selected: null,
        css: '',
        advert: null,
        dirty: false,
        help: null,
        imessages: [],
        script: null,
        fixed: false,
        pinned: false,
        url: null,
        current: null,
        real: false,
        cfg: {},
        events: {},
        real: false,
        last: 0
      });
    },

    async viewsInit() {
      let tmp = [];
      // ---- ADDED 16/12/20 (Mirko) ----
      // Adding bbns-container from the slot
      if (this.$slots.default) {
        for (let item of this.$slots.default) {
          let node = item.bbnSchema;
          //bbn.fn.log("ROUTER SLOT", node, '-------------');
  
          if (!node.comment && ['bbn-container', 'bbns-container'].includes(node?.tag)) {
            if (node.props.url === undefined) {
              throw Error(bbn._("You cannot use containers in router without defining a URL property"));
            }
            if (!this.hasRealContainers) {
              this.hasRealContainers = true;
            }
            if (node.props.url === '') {
              this.hasEmptyURL = true;
            }
            const obj = this.getDefaultView(node.props, {real: node.tag === 'bbn-container'});
            tmp.push(obj);
          }
        }
      }
      // ---- END ----
  
      bbn.fn.each(this.source, (a, i) => {
        if (a.url === '') {
          if (a.load) {
            throw Error(bbn._("You cannot use containers with empty URL for loading"));
          }
          this.hasEmptyURL = true;
        }
        tmp.push(this.getDefaultView(a, { real: false }));
      });

      if (!this.single) {
        //bbn.fn.log("LOOKING FOR STORAGE FOR " + this.parentContainer.getFullURL());
        let storage = this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
        //Get config from the storage
        if (storage && storage.views && tmp) {
          bbn.fn.each(storage.views, a => {
            let idx = bbn.fn.search(tmp, { url: a.url });
            if (idx > -1) {
              // Static comes only from configuration
              let isFixed = tmp[idx].fixed;
              bbn.fn.extend(tmp[idx], a, { fixed: isFixed });
            }
            else if (this.autoload) {
              tmp.push(this.getDefaultView(a));
            }
          });
        }
      }
  
      // Real containers at the end
      if (this.first !== 'real') {
        tmp = bbn.fn.multiorder(tmp, { real: 'desc' });
      }


      bbn.fn.each(tmp, a => this.add(a));
    },


    /**
     * Removes an element from the views
     * 
     * @method remove
     * @param {*} misc Index, URL or element
     * @param {Boolean} noCfg If set to true will not trigger the storage saving
     * @fires getIndex
     * @fires remove
     * @emit close
     * @return {Boolean}
     */
    async remove(misc, force) {
      let idx = this.getIndex(misc);
      bbn.fn.log(["REMOVE " + idx, this.views[idx].url, misc])
      debugger;
      if (idx > -1) {
        /** @var {Event} onBeforeClose beforeClose event, cancelable only if not force */
        let onBeforeClose = new Event('beforeclose', { cancelable: !force });
        /** @var {Event} onClose close event, cancelable only if not force */
        let onClose = new Event('close');
        this.$emit('beforeclose', idx, onBeforeClose);
        //bbn.fn.log("REMOVING " + this.views[idx].url)
        if (force || !onBeforeClose.defaultPrevented) {
          if (
            !force &&
            !this.ignoreDirty &&
            this.isDirty &&
            this.views[idx].dirty
          ) {
            this.confirm(this.confirmLeave, () => {
              // Looking for dirty ones in registered forms of each container
              let forms = this.urls[this.views[idx].uid].forms;
              if (Array.isArray(forms) && forms.length) {
                bbn.fn.each(forms, (f, k) => {
                  f.reset();
                });
              }

              return this.close(idx, true);
            });
          }
          else if (this.views[idx] && !this.views[idx].real) {
            this.$emit('close', idx, onClose);
            //const replacers = replacer ? [this.getViewObject(replacer)] : [];
            //this.views.splice(idx, 1, ...replacers);
            this.views.splice(idx, 1);
            //bbn.fn.log(["ERMOVE FROM ROUTER " + idx, bbn.fn.numProperties(this.urls), this.views.length])
            
            this.fixIndexes();
            if (idx < this.selected) {
              this.selected--;
            }
            else if (idx === this.selected) {
              this.selectClosest(idx);
            }
            await this.$forceUpdate();
            await this.$nextTick();
            return true;
          }
        }
      }
      return false;
    },
    getViewObject(obj, idx) {
      //obj must be an object with property url
      bbn.fn.checkType(obj, 'object');
      bbn.fn.checkType(obj.url, 'string');
      obj.url = bbn.fn.replaceAll('//', '/', obj.url);

      if (obj.uid) {
        throw Error(bbn._("The object already has a uid"));
      }

      let uid = bbn.fn.randomString(20);
      while (this.urls[uid]) {
        uid = bbn.fn.randomString(20);
      }

      obj.uid = uid;
      if (!obj.current) {
        if (bbn.env.path.indexOf(this.getFullBaseURL() + (obj.url ? obj.url + '/' : '')) === 0) {
          obj.current = bbn.fn.substr(bbn.env.path, this.getFullBaseURL().length);
        }
        else {
          obj.current = obj.url;
        }
      }
      else if ((obj.current !== obj.url) && (obj.current.indexOf(obj.url + '/') !== 0)) {
        obj.current = obj.url;
      }
      if (!obj.current) {
        obj.current = obj.url;
      }
      if (obj.content) {
        obj.loaded = true;
      }

      obj.events = {};
      if (obj.menu === undefined) {
        obj.menu = [];
      }

      bbn.fn.iterate(this.getDefaultView(), (a, n) => {
        if (obj[n] === undefined) {
          // Each new property must be set with $set
          this.$set(obj, n, a);
        }
      });

      return obj;
    },
    /**
     * Adds an object with a valid url to the views.
     * @method add
     * @param {Object} obj
     * @param {Number} idx
     * @fires getFullBaseURL
     * @fires search
     * @fires isValidIndex
     * @fires getDefaultView
     */
    async add(obj, idx) {
      obj = this.getViewObject(obj, idx);

      if (bbn.fn.getRow(this.views, {url: obj.url})) {
        bbn.fn.log(bbn.fn.getRow(this.views, {url: obj.url}) === obj, obj)
        throw Error(bbn._("The container already exists"));
      }
      let isValid = this.isValidIndex(idx);
      obj.idx = isValid ? idx : this.views.length;

      if (isValid) {
        this.views.splice(obj.idx, 0, obj);
      }
      else if (this.hasRealContainers && (this.first !== 'real') && !obj.real) {
        idx = bbn.fn.search(this.views, { real: true });
        obj.idx = idx;
        this.views.splice(idx, 0, obj);
      }
      else {
        obj.idx = this.views.length;
        this.views.push(obj);
      }

      if (this.single && (this.views.length > 1)) {
        let toDel = bbn.fn.search(this.views, a => !a.cached && (a.uid !== obj.uid));
        if (toDel !== -1) {
          await this.remove(toDel, true);
        }
      }

      this.fixIndexes();
      await this.$forceUpdate();
      if (obj.selected) {
        this.selected = obj.idx;
      }

      return obj.uid;
    },
    /**
    * Moves a container within the router, changes its idx.
    * 
    * @method move
    * @param {Number} from The index of the container to move
    * @param {Number} to   The index to which the container must go
    * @returns 
    */
    move(from, to) {
      if (!bbn.fn.isNumber(from, to) || (from === to) || !this.views[from] || !this.views[to]) {
        return;
      }

      bbn.fn.move(this.views, from, to);
      let selectedOk = false;
      if (from === this.selected) {
        this.selected = to;
        selectedOk = true;
      }

      for (let i = Math.min(from, to); i <= Math.max(from, to); i++) {
        if (this.views[i].idx !== i) {
          if (!selectedOk && (this.selected === this.views[i].idx)) {
            this.selected = i;
          }

          this.views[i].idx = i;
        }
      }

      this.setConfig();
    },
    /**
    * @method close
    * @param {Number}  idx   The index of the container to close
    * @param {Boolean} force Will close the container without prevention
    * @param {Boolean} noCfg If set to true will not trigger the storage saving
    * @fires remove
    * @fires getIndex
    * @fires activateIndex
    * @fires setConfig
    * @return {Boolean}
    */
    close(idx, force, noCfg) {
      let res = this.remove(idx, force);
      if (res) {
        if (!noCfg) {
          this.setConfig();
        }
      }

      return res;
    },
    /**
    * @method closeAll
    * @fires close
    */
    closeAll(force) {
      for (let i = this.views.length - 1; i >= 0; i--) {
        if (!this.views[i].fixed && !this.views[i].pinned) {
          this.close(i, force, true);
        }
      }

      this.setConfig();
    },
    /**
    * @method closeallBut
    * @param {Number} idx
    * @fires close
    */
    closeAllBut(idx, force) {
      for (let i = this.views.length - 1; i >= 0; i--) {
        if (!this.views[i].fixed && !this.views[i].pinned && (i !== idx)) {
          this.close(i, force, true);
        }
      }
      this.setConfig();
    },


    closeTab(idx) {
      this.close(this.tabsList[idx].idx);
    },


    /**
    * @method pin
    * @param {Number} idx
    * @fires isValidIndex
    * @fires setConfig
    * @emit beforePin
    * @emit pin
    */
    pin(idx) {
      if (this.isValidIndex(idx)) {
        let ev = new CustomEvent('beforepin', {
          cancelable: true
        });
        this.$emit('beforepin', idx, ev);
        if (!ev.defaultPrevented) {
          this.views[idx].pinned = true;
          this.setConfig();
          this.$emit('pin', idx);
        }
      }
    },


    /**
    * @method unpin
    * @param {Number} idx
    * @fires isValidIndex
    * @fires setConfig
    * @emit beforeUnpin
    * @emit unpin
    */
    unpin(idx) {
      if (this.isValidIndex(idx)) {
        let ev = new CustomEvent('beforeunpin', {
          cancelable: true
        });
        this.$emit('beforeunpin', idx, ev);
        if (!ev.defaultPrevented) {
          this.views[idx].pinned = false;
          this.setConfig();
          this.$emit('unpin', idx);
        }
      }
    }
  },
  watch: {
    /**
     * @watch dirty
     */
    isDirty(v) {
      if (this.parentContainer) {
        this.parentContainer.dirty = v;
      }
    },
    source(v, ov) {
      if (v !== ov) {
        this.views.splice(0, this.views.length);
        bbn.fn.each(v, a => {
          if (!bbn.fn.isString(a.url)) {
            throw Error(bbn._("The container must have a valid URL"));
          }
  
          // Setting current if URL starts with default URL
          if (this.currentURL && this.currentURL.indexOf(a.url) === 0) {
            a.current = this.currentURL;
          }
  
          //bbn.fn.warning(bbn._("ADDING %s ON WATCH", a.url));
          this.add(a);
        });
      }
    },
    /*
    views() {
      bbn.fn.log("VIEWS CHANGED")
      this.updateVisualStyleContainer();
    }
    */

  }
}