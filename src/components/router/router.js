/**
 * @file bbn-router component
 * @description bbn-router is a component that allows and manages the navigation (url) between the various containers of an application
 * @copyright BBN Solutions
 * @author BBN Solutions
 */

import elements from './_mixins/elements.js';
import navigation from './_mixins/navigation.js';
import registration from './_mixins/registration.js';
import panes from './_mixins/panes.js';
import manipulate from './_mixins/manipulate.js';
import config from './_mixins/config.js';
import search from './_mixins/search.js';
import menu from './_mixins/menu.js';
import getters from './_mixins/getters.js';
import breadcrumb from './_mixins/breadcrumb.js';
import observers from './_mixins/observers.js';
import useless from './_mixins/2move.js';
import visual from './_mixins/visual.js';
import misc from './_mixins/misc.js';

const cpDef = {
  name: 'bbn-router',
  statics() {
    // IndexedDb access for storing thumbnails in visual mode
    let db = false;
    if (bbn.db && bbn.db.ok && window.html2canvas) {
      db = true;
      if (!bbn.db._structures.bbn || !bbn.db._structures.bbn.containers) {
        bbn.db.add('bbn', 'containers', {
          keys: {
            PRIMARY: {
              columns: ['url'],
              unique: true
            }
          },
          fields: {
            url: {

            },
            image: {

            }
          }
        });
      }
    }
    return {
      db,
      possibleOrientations: [
        {
          name: 'auto',
          text: bbn._("Position automatically")
        }, {
          name: 'left',
          text: bbn._("Position on the left side")
        }, {
          name: 'top',
          text: bbn._("Position on the top side")
        }, {
          name: 'bottom',
          text: bbn._("Position on the bottom side")
        }, {
          name: 'right',
          text: bbn._("Position on the right side")
        }
      ]
    };
  },
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.localStorage
   * @mixin bbn.cp.mixins.close
   * @mixin bbn.cp.mixins.observer
   * @mixin bbn.cp.mixins.resizer
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.localStorage,
    bbn.cp.mixins.close,
    bbn.cp.mixins.observer,
    bbn.cp.mixins.resizer,
    bbn.cp.mixins.keepCool,
    elements,
    navigation,
    registration,
    panes,
    manipulate,
    config,
    search,
    menu,
    getters,
    breadcrumb,
    observers,
    useless,
    visual,
    misc,
  ],
  props: {
    /**
     * Routes automatically after mount.
     * @prop {Boolean} [true] auto
     */
    auto: {
      type: Boolean,
      default: true
    },
    /**
     * The URL on which the router will be initialized.
     * @prop {String} ['] url
     */
    url: {
      type: String,
      default: ''
    },
    /**
     * Defines if the container will be automatically loaded based on URLs.
     * @prop {Boolean} [true] autoload
     */
    autoload: {
      type: Boolean,
      default: true
    },
    /**
     * The root URL of the router, will be only taken into account for the top parents' router, will be automatically calculated for the children.
     * @prop {String} ['] root
     */
    root: {
      type: String,
      default: ''
    },
    /**
     * @prop {String} def
     */
    def: {
      type: String
    },
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
    /**
     * @prop {Boolean} [false] single
     */
    single: {
      type: Boolean,
      default: false
    },
    maxTotal: {
      type: Number,
      default: 25
    },
    /**
     * Set it to true if you want to see the navigation bar (tabs or breadcrumb).
     * @prop {Boolean} [false] nav
     */
    nav: {
      type: Boolean,
      default: false
    },
    /**
     * Sets if the views' titles will be scrollable in case they have a greater width than the page (true), or if they will be shown multilines (false, default).
     * @prop {Boolean} [false] scrollable
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * Sets if the router and the ocntainers inside it should be themselves scrollable or part of the global scroll.
     * @prop {Boolean} [false] scrollContent
     */
    scrollContent: {
      type: Boolean,
      default: true
    },
    /**
     * The name used for the storage.
     * @prop {String} ['__ROOT__'] storageName
     */
    storageName: {
      type: String,
      default: '__ROOT__'
    },
    /**
     * The confirm message when you close an unsaved container.
     * @prop {(Boolean|String|Function)} ['Are you sure you want to discard the changes you made in this tab?'] confirmLeave
     */
    confirmLeave: {
      type: [Boolean, String, Function],
      default: bbn._("Are you sure you want to discard the changes you made in this page?")
    },
    /**
     * The max length of the history.
     * @prop {Number} [10] historyMaxLength
     */
    historyMaxLength: {
      type: Number,
      default: 10
    },
    /**
     * @todo Integrates Boolean to have a default with no menu
     * @prop {Array|Function} [[]] menu
     */
    menu: {
      type: [Array, Function],
      default: function () {
        return [];
      }
    },
    /**
     * Set it to true if you want to send the variable _baseUrl.
     * @prop {Boolean} [true] postBaseUrl
     */
    postBaseUrl: {
      type: Boolean,
      default: true
    },
    /**
     * If this is set, along with componentSource and componentUrl a single container with this component will be created.
     * @prop {(String|Object)} component
     */
    component: {
      type: [String, Object]
    },
    /**
     * The source for the component.
     * @prop {Object} componentSource
     */
    componentSource: {
      type: Object
    },
    /**
     * The property to get from the componentSource to use for setting the URL.
     * @prop {String} componentUrl
     */
    componentUrl: {
      type: String
    },
    /**
     * The max length for the titles
     * @prop {Number} [20] maxTitleLength
     */
    maxTitleLength: {
      type: Number,
      default: 20
    },
    /**
     * @prop {Boolean} [true] urlNavigation
     */
    urlNavigation: {
      type: Boolean,
      default: true
    },
    /**
     * Will be passed to router in order to ignore the dirty parameter.
     * @prop {Boolean} ignoreDirty
     */
    ignoreDirty: {
      type: Boolean,
      default: false
    },
    /**
     * The default background color for the title bar
     * @prop {String} [#666] bcolor
     */
    bcolor: {
      type: String,
      default: '#666'
    },
    /**
     * The default text color for the title bar
     * @prop {String} [#EEE] fcolor
     */
    fcolor: {
      type: String,
      default: '#EEE'
    },
    /**
     * Decides if real bbn-container are shown before or after the ones in the config or fake container 9bbns-container)
     * @prop {String} ['real] first
     */
    first: {
      type: String,
      default: 'real'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      /**
       * IndexedDb connection
       * @return {Object} 
       */
      db: null,
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
      /**
       * True if one of the initial containers' URL is an empty string.
       * @data {Boolean} [false] hasEmptyURL
       */
      hasEmptyURL: false,
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
       * All the URLS of the views.
       * @data {Object} [{}] urls
       */
      urls: {},
      /**
       * Current URL of the router.
       * @data {String} currentURL
       */
      currentTitle: '',
      /**
       * Current URL of the router.
       * @data {String} currentURL
       */
      currentURL: this.url || '',
      /**
       * Relative root of the router (set by user or by parent router).
       * @data {String} baseURL
       */
      baseURL: this.formatBaseURL(this.root),
      /**
      * An array of the parents router.
      * @data {Array} [[]] parents
      */
      parents: [],
      /**
      * An object with each mounted children router.
      * @data {Object} [{}] routers
      */
      routers: {},
      /**
     * The direct parent router if there is one.
     * @data {bbnCp} [null] parent
     */
      parent: null,
      /**
       * The root router or the current one it's the same.
       * @data {bbnCp} [null] router
       */
      router: null,
      /**
       * The container having the router in if there is one.
       * @data {bbnCp} [null] parentContainer
       */
      parentContainer: null,
      /**
       * ????
       * @data {Boolean} [ture] visible
       */
      visible: true,
      /**
       * The currently visible container.
       * @data {bbnCp} [null] activeContainer
       */
      activeContainer: null,
      /**
       * Set to true each time the router is loading (can only load once at a time).
       * @data {Boolean} [false] isLoading
       */
      isLoading: false,
      /**
       * This will remain false until the first routing.
       * @data {Boolean} [false] routed
       */
      routed: false,
      /**
       * True while the component is in the action of routing.
       * @data {Boolean} [false] isRouting
       */
      isRouting: false,
      /**
       * False until the first routing.
       * @data {Boolean} [false] isInit
       */
      isInit: false,
      /**
       * The index of the currently selected view.
       * @data {Number} [null] selected
       */
      selected: null,
      /**
       * The list of the dirty containers.
       * @data {Array} [[]] dirtyContainers
       */
      dirtyContainers: [],
      /**
       * The navigation history.
       * @data {Array} [[]] history
       */
      history: [],
      /**
       * @data {Boolean} [false] iconsReady
       */
      iconsReady: false,
      /**
       * If true the configuration will be shown
       * @data {Boolean} visual
       */
      showRouterCfg: false,
    };
  },
  computed: {
    selectedTab: {
      get() {
        return bbn.fn.search(this.tabsList, { idx: this.selected })
      },
      set(v) {
        //bbn.fn.log("SETING SELECTED TAB");
        let done = false;
        let i = v;
        while (i > -1) {
          if (this.tabsList[i]) {
            this.selected = this.tabsList[i].idx;
            done = true;
            break;
          }
          i--;
        }

        if (!done) {
          i = v;
          while (i < this.tabsList.length) {
            if (this.tabsList[i]) {
              this.selected = this.tabsList[i].idx;
              done = true;
              break;
            }
            i++;
          }
        }

        if (!done) {
          this.selected = null;
        }
      }
    },
    /**
     * Not only the baseURL but a combination of all the parent's baseURLs.
     * @computed fullBaseURL
     * @return {String}
     */
    fullBaseURL() {
      let vm = this,
        base = '',
        tmp;
      while (tmp = vm.baseURL) {
        base = tmp + base;
        if (!vm.parents.length) {
          break;
        }
        vm = vm.parents[0];
      }
      return base;
    },
    /**
     * Returns true if there are any unsaved views.
     * @computed isDirty
     * @return {Boolean}
     */
    isDirty() {
      return !!this.dirtyContainers.length;
    },

    /**
     * The final Vue object for the active container (if it has sub-router).
     * @computed activeRealContainer
     * @fires getFinalContainer
     * @return {Vue|Boolean}
     */
    activeRealContainer() {
      return this.getFinalContainer();
    },
    /**
     * The last router i.e. the deepest in the current active container - or this one if none
     * @computed activeRouter
     * @fires getSubRouter
     * @return {bbnCp}
     */
    activeRouter() {
      if (this.activeContainer) {
        let sub = this.getSubRouter(this.selected);
        if (bbn.cp.isComponent(sub)) {
          return sub.activeRouter;
        }
      }
      return this;
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
    hasVerticalTabs() {
      return !this.isVisual
        && !this.isBreadcrumb
        && ((this.orientation === 'left')
          || (this.orientation === 'right'));
    },
  },

  methods: {
  
    /**
     * Alias of bbn.fn.isNumber
     * @method isNumber
     * @return {Boolean}
     */
    isNumber: bbn.fn.isNumber,
    /**
     * Alias of bbn.fn.numProperties
     * @method numProperties
     * @return {Number|Boolean}
     */
    numProperties: bbn.fn.numProperties,
  },

  /**
   * @event created
   */
  created() {
    this.componentClass.push('bbn-resize-emitter');
  },
  /**
   * @event mounted
   * @fires getStorage
   * @fires getDefaultURL
   * @fires add
   */
  beforeMount() {
    // All routers above (which constitute the fullBaseURL)
    this.parents = this.ancestors('bbn-router');
    // The closest
    this.parent = this.parents.length ? this.parents[0] : false;
    // The root
    this.router = this.parents.length ? this.parents[this.parents.length - 1] : this;
    // Case where the rooter is not at the root level

    if (this.parent) {
      this.parentContainer = this.closest('bbn-container');
      let uri = this.parentContainer.url;
      if (this.root && (uri !== this.root) && (this.root.indexOf(uri) === 0)) {
        uri = this.root;
      }
      this.baseURL = this.formatBaseURL(uri);
    }
    // Case where the rooter is at root level
    else {
      // Opening the database for the visual mode multiview
      if (!this.single && bbnRouterCp.db) {
        bbn.db.open('bbn').then(r => {
          this.db = r;
        }, err => {
          bbn.fn.log("Connection error in router", err);
        });
      }

      window.addEventListener("beforeunload", e => {
        e = e || window.event;
        //if ( $(".bbn-tabnabbn-unsaved").length ){
        if (this.isDirty) {
          // doesn't use that string but a default string...
          let st = bbn._('You have unsaved data, are you sure you want to leave?');
          // For IE and Firefox prior to version 4
          if (e) {
            e.returnValue = st;
          }
          // For Safari
          return st;
        }
      });
    }

    let storage = !this.single && this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
    let tmp = [];

    // ---- ADDED 16/12/20 (Mirko) ----
    // Adding bbns-container from the slot
    if (this.$slots.default) {
      for (let item of this.$slots.default) {
        let node = item.bbnSchema;
        //bbn.fn.log("ROUTER SLOT", node, '-------------');

        if (!node.comment && ['bbn-container', 'bbns-container'].includes(node?.tag)) {
          if (node.props.url === undefined) {
            throw new Error(bbn._("You cannot use containers in router without defining a URL property"));
          }
          if (!this.hasRealContainers) {
            this.hasRealContainers = true;
          }
          if (node.props.url === '') {
            this.hasEmptyURL = true;
          }
          const obj = bbn.fn.createObject(bbn.fn.extend(true, {}, node.props));
          bbn.fn.iterate(this.getDefaultView(), (a, n) => {
            if (obj[n] === undefined) {
              obj[n] = a;
            }
          });
          if (node.tag === 'bbn-container') {
            obj.real = true;
          }
          //let o = {real: true, load: false, loaded: true};
          //tmp.push(bbn.fn.extend({}, node.componentOptions.propsData, o));
          tmp.push(obj);
        }
      }
    }
    // ---- END ----

    bbn.fn.each(this.source, (a, i) => {
      if (a.url === '') {
        if (a.load) {
          throw new Error(bbn._("You cannot use containers with empty URL for loading"));
        }
        this.hasEmptyURL = true;
      }
      tmp.push(bbn.fn.extendOut(a, { real: false }));
    });

    //Get config from the storage
    if (storage && storage.views && tmp) {
      bbn.fn.each(storage.views, a => {
        let idx = bbn.fn.search(tmp, { url: a.url });
        if (idx > -1) {
          // Static comes only from configuration
          let isFixed = tmp[idx].fixed;
          bbn.fn.extend(tmp[idx], a, { fixed: isFixed });
        }
        else {
          tmp.push(a);
        }
      });
    }

    // Getting the default URL
    let url = this.getDefaultURL();

    if (this.first !== 'real') {
      tmp = bbn.fn.multiorder(tmp, { real: 'desc' });
    }


    // Adding to the views
    //bbn.fn.warning("ROUTER BEFORE MOUNT");
    bbn.fn.each(tmp, a => {
      if (!bbn.fn.isString(a.url)) {
        throw new Error(bbn._("The container must have a valid URL"));
      }

      // Setting current if URL starts with default URL
      if (url && url.indexOf(a.url) === 0) {
        a.current = url;
      }

      //bbn.fn.warning("ADDING BEFORE MOUNT");
      //bbn.fn.log(a);
      this.add(a);
    });



    this.ready = true;
    this.$forceUpdate();

    this.$nextTick(() => {
      if (this.$slots.default) {
        for (let item of this.$slots.default) {
          if (item.bbnSchema?.tag === 'bbn-container') {
            let el = this.$refsElements['ct-' + item.bbnSchema.props.url];
            if (el) {
              el.parentNode.replaceChild(item, el);
            }
          }
        }
      }

      if (!this.views.length) {
        this.init(url);
      }
    });

  },
  watch: {
    selected(idx) {
      if (this.views[idx]) {
        //bbn.fn.log("In selected watcher " + idx, bbn.fn.filter(this.views, {selected: true}));
        bbn.fn.map(bbn.fn.filter(this.views, { selected: true }), a => {
          if (a.idx !== idx) {
            a.selected = false;
            if (this.urls[a.url]) {
              this.urls[a.url].$tick();
            }
          }
        });
        if (!this.views[idx].selected && !this.views[idx].pane) {
          this.views[idx].selected = true;
        }

        this.views[idx].last = bbn.fn.timestamp();
        if (this.currentURL !== this.views[idx].current) {
          //bbn.fn.log("CHANGING URL " + this.currentURL + " TO " + this.views[idx].current);
          this.route(this.views[idx].current);
        }
      }
      else {
        throw new Error("The view with index " + idx + " doesn't exist");
      }
    },
    currentTitle(v) {
      if (!this.parent) {
        document.title = v + ' - ' + bbn.env.siteTitle;
      }
    },
    /**
     * @watch dirty
     */
    isDirty(v) {
      if (this.parentContainer) {
        this.parentContainer.dirty = v;
      }
    },
    source(v, ov) {
      bbn.fn.each(v, a => {
        if (!bbn.fn.isString(a.url)) {
          throw new Error(bbn._("The container must have a valid URL"));
        }

        // Setting current if URL starts with default URL
        if (this.currentURL && this.currentURL.indexOf(a.url) === 0) {
          a.current = this.currentURL;
        }

        //bbn.fn.warning(bbn._("ADDING %s ON WATCH", a.url));
        this.add(a);
      });
    },
    views() {
      this.updateVisualStyleContainer();
    }
  },
  components: {
    /**
     * @component listItem
     */
    listItem: {
      template: `
<div class="bbn-w-100 bbn-vmiddle bbn-bordered-bottom"
     style="height: 2.5rem"
     @mouseenter="isHover = true"
     @mouseleave="isHover = false">
  <div class="bbn-flex-width bbn-vmiddle bbn-h-100">
    <div class="bbn-vmiddle bbn-h-100">
      <div bbn-for="(p, i) in source.parents"
           class="bbn-vmiddle bbn-h-100">
        <div class="bbn-vmiddle bbn-h-100"
            :style="{
              backgroundColor: !isHover && p.view.bcolor ? p.view.bcolor : null,
              color: !isHover && p.view.fcolor ? p.view.fcolor : null
            }">
          <div class="bbn-router-breadcrumb-badge-container bbn-middle"
              bbn-if="numProperties(p.view.events)">
            <span class="bbn-badge bbn-small bbn-bg-red"
                  bbn-text="numProperties(p.view.events)"/>
          </div>
          <div class="bbn-router-breadcrumb-loader bbn-border-text"
              :style="{borderColor: p.view.fcolor || null}"
              bbn-show="p.view.loading"/>
          <div :class="['bbn-router-breadcrumb-element', 'bbn-h-100', 'bbn-vmiddle', {'bbn-router-breadcrumb-dirty': p.view.dirty}]">
            <span bbn-if="p.view.icon"
                  :title="p.view.title"
                  :class="'bbn-router-breadcrumb-element-icon bbn-h-100 bbn-vmiddle bbn-right-xsspace' + (p.view.notext ? ' bbn-lg' : ' bbn-m')">
              <i :class="p.view.icon"/>
            </span>
            <span bbn-if="!p.view.notext"
                  class="bbn-router-breadcrumb-element-text"
                  :title="p.view.title && (p.view.title.length > p.maxTitleLength) ? p.view.title : ''"
                  bbn-html="p.view.title ? shortTitle(p) : '` + bbn._('Untitled') + `'"/>
          </div>
        </div>
        <div>
          <i class="nf nf-fa-angle_right bbn-hsmargin bbn-router-breadcrumb-arrow"/>
        </div>
      </div>

      <div class="bbn-vmiddle bbn-h-100"
          :style="{
            backgroundColor: !isHover && source.view.bcolor ? source.view.bcolor : null,
            color: !isHover && source.view.fcolor ? source.view.fcolor : null
          }">
        <div class="bbn-router-breadcrumb-badge-container bbn-middle"
             bbn-if="numProperties(source.view.events)">
          <span class="bbn-badge bbn-small bbn-bg-red"
                bbn-text="numProperties(source.view.events)"/>
        </div>
        <div class="bbn-router-breadcrumb-loader bbn-border-text"
             :style="{borderColor: source.view.fcolor || null}"
             bbn-show="source.view.loading"/>
        <div :class="['bbn-router-breadcrumb-element', 'bbn-h-100', 'bbn-vmiddle', {'bbn-router-breadcrumb-dirty': source.view.dirty}]">
          <span bbn-if="source.view.icon"
                :title="source.view.title"
                :class="'bbn-router-breadcrumb-element-icon bbn-h-100 bbn-vmiddle bbn-right-xsspace' + (source.view.notext ? ' bbn-lg' : ' bbn-m')">
            <i :class="source.view.icon"/>
          </span>
          <span bbn-if="!source.view.notext"
                class="bbn-router-breadcrumb-element-text"
                :title="source.view.title && (source.view.title.length > source.maxTitleLength) ? source.view.title : ''"
                bbn-html="source.view.title ? (source.parents.length? shortTitle(source): source.view.title) : '` + bbn._('Untitled') + `'"/>
        </div>
      </div>

      <div bbn-for="(p, i) in source.children"
           class="bbn-vmiddle bbn-h-100">
        <div>
          <i class="nf nf-fa-angle_right bbn-hsmargin bbn-large bbn-router-breadcrumb-arrow"/>
        </div>
        <div class="bbn-vmiddle bbn-h-100"
             :style="{
               backgroundColor: !isHover && p.view.bcolor ? p.view.bcolor : null,
               color: !isHover && p.view.fcolor ? p.view.fcolor : null
             }">
          <div class="bbn-router-breadcrumb-badge-container bbn-middle"
              bbn-if="numProperties(p.view.events)">
            <span class="bbn-badge bbn-small bbn-bg-red"
                  bbn-text="numProperties(p.view.events)"/>
          </div>
          <div class="bbn-router-breadcrumb-loader bbn-border-text"
              :style="{borderColor: p.view.fcolor || null}"
              bbn-show="p.view.loading"/>
          <div :class="['bbn-router-breadcrumb-element', 'bbn-h-100', 'bbn-vmiddle', {'bbn-router-breadcrumb-dirty': p.view.dirty}]">
            <span bbn-if="p.view.icon"
                  :title="p.view.title"
                  :class="'bbn-router-breadcrumb-element-icon bbn-h-100 bbn-vmiddle bbn-right-xsspace' + (p.view.notext ? ' bbn-lg' : ' bbn-m')">
              <i :class="p.view.icon"/>
            </span>
            <span bbn-if="!p.view.notext"
                  class="bbn-router-breadcrumb-element-text"
                  :title="p.view.title && (p.view.title.length > p.maxTitleLength) ? p.view.title : ''"
                  bbn-html="p.view.title ? shortTitle(p) : '` + bbn._('Untitled') + `'"/>
             </div>
        </div>
      </div>
    </div>
    <div class="bbn-flex-fill bbn-h-100"
         :style="!isHover ? lastColors : {}">
      &nbsp;
    </div>
    <div bbn-if="!source.view.fixed"
          class="bbn-vmiddle bbn-h-100 bbn-hpadded"
          @mousedown.prevent.stop="close"
          @mouseup.prevent.stop
          :style="!isHover ? lastColors : {}">
      <i class="nf nf-fa-times_rectangle"/>
    </div>
  </div>
</div>
        `,
      props: {
        /**
         * @prop {Object} source
         * @memberof listItem
         */
        source: {
          type: Object,
          required: true
        }
      },
      data() {
        return {
          isHover: false
        }
      },
      computed: {
        lastColors() {
          let e = this.source.children.length ?
            this.source.children[this.source.children.length - 1].view
            : this.source.view;
          let r = {};
          if (e.bcolor) {
            r.backgroundColor = e.bcolor;
          }
          if (e.fcolor) {
            r.color = e.fcolor;
          }
          return r;
        }
      },
      methods: {
        numProperties: bbn.fn.numProperties,
        /**
         * @method close
         * @memberof listItem
         */
        close() {
          let k = this.source.key;
          if (this.source.closeAction()) {
            let list = this.closest('bbn-list');
            if (bbn.cp.isComponent(list) && list.source) {
              let idx = bbn.fn.search(list.source, { 'data.key': k });
              if (idx > -1) {
                list.source.splice(idx, 1);
                if (list.source.length) {
                  list.updateData();
                  this.$nextTick(() => {
                    list.closest('bbn-floater').onResize(true);
                  })
                }
                else {
                  this.closest('bbn-floater').close();
                }
              }
            }
          }
        },
        shortTitle(src) {
          return src.view.title.length > src.maxTitleLength ?
            bbn.fn.shorten(src.view.title, src.maxTitleLength) :
            src.view.title;
        }
      }
    },
    searchResult: {
      template: `
<div class="bbn-router-search-result bbn-w-100 bbn-spadded bbn-default-alt-background bbn-p bbn-hover-effect-element"
     :style="{backgroundColor: source.bcolor, color: source.fcolor}">
  <div class="bbn-flex-width">
    <div class="bbn-flex-fill bbn-nowrap bbn-ellipsis">
      <span class="bbn-s bbn-badge bbn-bg-blue"
            bbn-text="source.score"/>
      <span bbn-text="_('Opened container')"/>
      <em bbn-text="'URL: ' + source.url"></em><br>
      <span class="bbn-lg" bbn-text="source.title"></span>
    </div>
    <div class="bbn-hlpadded bbn-h-100 bbn-r"
          style="vertical-align: middle"
          bbn-html="source.match">
    </div>
  </div>
</div>
`,
      props: {
        source: {
          type: Object,
          required: true
        }
      }
    }
  }
};

import bbn from '@bbn/bbn';
import cpHtml from './router.html';
import cpStyle from './router.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./router.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-router',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
