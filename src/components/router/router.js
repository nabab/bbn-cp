/**
 * @file bbn-router component
 * @description bbn-router is a component that allows and manages the navigation (url) between the various containers of an application
 * @copyright BBN Solutions
 * @author BBN Solutions
 */

import {
  getVue,
  getContainer,
  getDOMContainer,
  getSubRouter,
  getFinalContainer,
  getRealVue
} from './_elements.js';

import {
  getRoute,
  formatBaseURL,
  getDefaultView,
  route,
  realRoute,
  next,
  prev,
  activate,
  changeURL,
  getBaseURL,
  getFullBaseURL,
  getFullURL,
  getCurrentURL,
  getFullCurrentURL,
  parseURL,
  isValidIndex,
  activateDefault,
  activateIndex,
  callRouter
} from './_navigation.js';

import {
  register,
  unregister,
  registerRouter,
  unregisterRouter
} from './_registration.js';

import {
  getPane,
  addPane,
  selectPaneTab,
  removePane,
  addToPane,
  removeFromPane,
} from './_panes.js';

import {
  remove,
  add,
  move,
  close,
  closeAll,
  closeAllBut,
  closeTab,
  pin,
  unpin
} from './_manipulate.js';

import {
  setConfig,
  getConfig,
  unsetConfig,
} from './_config.js';

import {
  getPortalSelector,
  selectClosest,
  getIndex,
  fixIndexes,
  search,
  searchForString,
  searchContainer,
} from './_search.js';

import {
  getMenuFn
} from './_menu.js';

import {
  getDefaultURL,
  getTitle,
  getFullTitle,
  getFontColor,
  getBackgroundColor,
  getTab,
  getList,
  getParents,
  getView,
} from './_getters.js';

import {
  registerBreadcrumb,
  unregisterBreadcrumb,
  getBreadcrumbs,
} from './_breadcrumb.js';

import {
  observerEmit,
  observerClear,
} from './_observers.js';

import {
  load,
  realInit,
  checkLoaded,
  reload,
} from './_2move.js';

import {
  updateVisualStyleContainer,
  init,
  retrieveDirtyContainers,
  onEscape,
  enter,
  cutTitle,
  onResize,
  slashToHyphen,
} from './_misc.js';


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
  mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.localStorage,
      bbn.cp.mixins.close,
      bbn.cp.mixins.observer,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.keepCool
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
     * Set it to true if you want to see the visual navigation bar
     * @prop {Boolean} [false] visual
     */
    visual: {
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
     * The size of every grid cell on which is based the visual view
     * @prop {Number} [180] visualSize
     */
    visualSize: {
      type: Number,
      default() {
        return Math.max(60, Math.min(120, Math.round(Math.min(bbn.env.width, bbn.env.height) / 7)))
      }
    },
    /**
     * The position of the visual mini containers
     * @prop {Number} [180] visualSize
     */
    orientation: {
      type: String,
      default() {
        return 'auto'
      },
      validator(v) {
        return !!bbn.fn.getRow(bbnRouterCp.possibleOrientations, { name: v })
      }
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
     * Decides if real bbn-container are shown before or after the ones in the config or fake container 9bbns-container)
     * @prop {String} ['real] first
     */
    first: {
      type: String,
      default: 'real'
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
      /**
       * If true and visual will show all the containers as icons.
       * Starts at true for better updating when displays changes
       * @data {Boolean} visualShowAll
       */
      visualShowAll: false,
      /**
       * In visual mode the side on which the thumbnails are shown.
       * If auto (default) the bar will be top if H > W, left otherwise
       * @data {String} ['auto'] visualOrientation
       */
      visualOrientation: this.orientation !== 'auto' ? this.orientation : null,
      /**
       * If true the auto orientation won't be taken into account.
       * @data {Boolean} lockedOrientation
       */
      lockedOrientation: false,
      /**
       * If true visual mode is used for nav (instead of tabs or breadcrumbs)
       * @data {Boolean} visual
       */
      isVisual: this.visual,
      /**
       * The panes for when splittable is true
       * @data {Array} currentPanes
       */
      currentPanes: this.panes.slice(),
      /**
       * If true the configuration will be shown
       * @data {Boolean} visual
       */
      showRouterCfg: false,
      /**
       * Becomes true once the pane splitter is mounted
       * @data {Boolean} visual
       */
      splitterMounted: false,
      visualStyleContainer: bbn.fn.createObject()
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
    isSplittable() {
      return this.splittable && !this.single;
    },
    visualContainerStyle() {
      if (!this.isVisual) {
        return {};
      }

      let coord = [1, this.numVisualCols + 1, 1, this.numVisualRows + 1];
      if (this.views.length > 1) {
        switch (this.visualOrientation) {
          case 'top':
            coord[2] = 2;
            break;
          case 'bottom':
            coord[3] = coord[3] - 1;
            break;
          case 'left':
            coord[0] = 2;
            break;
          case 'right':
            coord[1] = coord[1] - 1;
            break;
        }
      }

      return {
        position: 'relative',
        top: null,
        left: null,
        right: null,
        bottom: null,
        gridColumnStart: coord[0],
        gridColumnEnd: coord[1],
        gridRowStart: coord[2],
        gridRowEnd: coord[3],
        zoom: 1
      };
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
    /**
     * Returns the bbn-tabs component of this router.
     * @todo Kill this function, there is no anymore tabs component
     * @computed itsTabs
     * @fires getRef
     * @return {Vue|Boolean}
     */
    itsTabs() {
      if (!this.isBreadcrumb) {
        return this.getRef('tabs');
      }
      return false;
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
     * The grid style for showing the router in visual mode
     * @computed visualStyle
     * @return {Object} 
     */
    visualStyle() {
      if (!this.isVisual) {
        return {};
      }

      return {
        minHeight: '100%',
        display: 'grid',
        gridColumnGap: '0.5rem',
        gridRowGap: '0.5rem',
        gridTemplateRows: 'repeat(' + this.numVisualRows + ', 1fr)',
        gridTemplateColumns: 'repeat(' + this.numVisualCols + ', 1fr)'
      }
    },

    /**
     * Returns true if the visual blocks are on top or bottom of the selected container
     * @computed visualIsOnHeight
     * @return {Boolean} 
     */
    visualIsOnHeight() {
      if (this.isVisual) {
        return ['top', 'bottom'].includes(this.visualOrientation);
      }

      return false;
    },

    /**
     * The ratio between height and width for each block
     * @computed visualRatio
     * @return {Object} 
     */
    visualRatio() {
      if (!this.isVisual) {
        return 1;
      }

      let diffW = this.visualIsOnHeight ? 0 : this.visualSize;
      let diffH = this.visualIsOnHeight ? this.visualSize : 0;
      let ratio = (this.lastKnownWidth - diffW) / (this.lastKnownHeight - diffH);
      if (ratio > 2) {
        return 2;
      }

      return Math.max(0.5, ratio);
    },

    /**
     * The number of columns (width) for the visual mode
     * @computed numVisualCols
     * @return {Number} 
     */
    numVisualCols() {
      if (this.isVisual && this.ready) {
        // Width greater or equal to height
        let w = this.lastKnownWidth - (this.visualIsOnHeight ? 0 : this.visualSize);
        if (this.splitterMounted) {
          let splitter = this.getRef('splitter');
          if (splitter.$el.clientWidth < w) {
            w -= splitter.$el.clientWidth;
          }
        }
        if (this.visualRatio >= 1) {
          return Math.floor(w / this.visualSize);
        }
        else {
          return Math.floor(w / (this.visualSize * 1));
        }
      }

      return 1;
    },

    /**
     * The number of rows (height) for the visual mode
     * @computed numVisualRows
     * @return {Number} 
     */
    numVisualRows() {
      if (this.isVisual && this.ready) {
        let h = this.lastKnownHeight - (this.visualIsOnHeight ? this.visualSize : 0);
        if (this.splitterMounted) {
          let splitter = this.getRef('splitter');
          if (splitter.$el.clientHeight < h) {
            h -= splitter.$el.clientHeight;
          }
        }
        if (this.visualRatio > 1) {
          return Math.floor(h / this.visualSize * 1);
        }
        else {
          return Math.floor(h / this.visualSize);
        }
      }

      return 1;
    },

    /**
     * The number of cells on the side where the thumbnails are shown in the visual mode
     * @computed numVisuals
     * @return {Number} 
     */
    numVisuals() {
      if (this.isVisual) {
        if (['left', 'right'].includes(this.visualOrientation)) {
          return this.numVisualRows;
        }
        else {
          return this.numVisualCols;
        }
      }

      return 0;
    },


    /**
     * The number of cells on the side where the thumbnails are shown in the visual mode
     * @computed numVisualReals
     * @return {Number} 
     */
    numVisualReals() {
      if (this.isVisual) {
        return bbn.fn.filter(this.visualList, a => (a.view.idx !== this.selected) && !a.view.pane).length;
      }

      return 0;
    },


    /**
     * The views to show, in a specific different order, for the visual mode
     * @computed visualList
     * @return {Array} 
     */
    visualList() {
      if (!this.isVisual) {
        return [];
      }

      let moreViewsThanSlots = this.numVisuals < bbn.fn.filter(this.views, { pane: false }).length;
      let numAvailableSlots = this.numVisuals - (moreViewsThanSlots ? 1 : 0);
      let order = this.visualShowAll ?
        { selected: 'asc', fixed: 'desc', pinned: 'desc', last: 'desc', idx: 'asc' }
        : { selected: 'desc', last: 'desc', fixed: 'desc', pinned: 'desc', idx: 'asc' };
      let idx = 0;
      return bbn.fn.map(
        bbn.fn.multiorder(
          this.views,
          order
        ),
        a => {
          let visible = false;
          if (this.visualShowAll || (idx <= numAvailableSlots) || (this.selected === a.idx)) {
            visible = true;
            if (!a.pane) {
              idx++;
            }
          }
          else if (a.pane) {
            visible = true;
          }
          return {
            view: a,
            visible: visible
          }
        }
      );
    },

    /**
     * The number of tabs which are not in a pane
     * 
     * @returns {Number}
     */
    numOutOfPane() {
      return bbn.fn.filter(this.views, { pane: false }).length;
    },

    /**
     * The number of panes displayed
     * @computed numPanes
     * @return {Number} 
     */
    numPanes() {
      return this.currentPanes.length;
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
    getVue,
    getContainer,
    getDOMContainer,
    getSubRouter,
    getFinalContainer,
    getRealVue,

    getRoute,
    formatBaseURL,
    getDefaultView,
    route,
    realRoute,
    next,
    prev,
    activate,
    changeURL,
    getBaseURL,
    getFullBaseURL,
    getFullURL,
    getCurrentURL,
    getFullCurrentURL,
    parseURL,
    isValidIndex,
    activateDefault,
    activateIndex,
    callRouter,

    register,
    unregister,
    registerRouter,
    unregisterRouter,
  
    getPane,
    addPane,
    selectPaneTab,
    removePane,
    addToPane,
    removeFromPane,

    remove,
    add,
    move,
    close,
    closeAll,
    closeAllBut,
    closeTab,
    pin,
    unpin,

    setConfig,
    getConfig,
    unsetConfig,

    getPortalSelector,
    selectClosest,
    getIndex,
    fixIndexes,
    search,
    searchForString,
    searchContainer,

    getMenuFn,

    getDefaultURL,
    getTitle,
    getFullTitle,
    getFontColor,
    getBackgroundColor,
    getTab,
    getList,
    getParents,
    getView,
  
    registerBreadcrumb,
    unregisterBreadcrumb,
    getBreadcrumbs,

    observerEmit,
    observerClear,

    load,
    realInit,
    checkLoaded,
    reload,

    updateVisualStyleContainer,
    init,
    retrieveDirtyContainers,
    onEscape,
    enter,
    cutTitle,
    onResize,
    slashToHyphen,
  
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
    /**
   * @event route
   * @fires setconfig
   */
    this.$on('route', url => {
      if (this.nav) {
        this.setConfig();
        let i = this.history.indexOf(url);
        if (i > -1) {
          this.history.splice(i, 1);
        }
        this.history.unshift(url);
        while (this.history.length > this.historyMaxLength) {
          this.history.pop();
        }
      }
    });
    let storage = !this.single && this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
    if (storage && storage.panes) {
      bbn.fn.each(storage.panes, a => {
        this.addPane(a.id);
      })
    }
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

    let tmp = [];

    //bbn.fn.warning("BEFORE MOUNT ROUTER")

    //Get config from the storage
    let storage = !this.single && this.getStorage(this.parentContainer ? this.parentContainer.getFullURL() : this.storageName);
    if (storage) {
      if (storage.breadcrumb !== undefined) {
        this.isBreadcrumb = storage.breadcrumb;
      }

      if (storage.visual !== undefined) {
        this.isVisual = storage.visual;
      }

      if (storage.orientation) {
        this.visualOrientation = storage.orientation;
        this.lockedOrientation = true;
      }
    }

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

    if (this.splittable) {
      if (storage && storage.panes) {
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
    }

    //Breadcrumb
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

    if (this.parentContainer) {
      this.parentContainer.registerRouter(this);
    }

    this.updateVisualStyleContainer();
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
  /**
   * @event beforeDestroy
   */
  beforeDestroy() {
    if (!this.master && this.parent) {
      this.parent.unregisterBreadcrumb(this);
    }
    if (this.parentContainer) {
      this.parentContainer.unregisterRouter(this);
    }
  },
  watch: {
    numVisuals() {
      this.onResize();
    },
    numPanes() {
      this.onResize();
    },
    visualShowAll(v) {
      if (v && this.isVisual) {
        this.getRef('visualRouter').focus();
      }
    },
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
     * @watch currentURL
     * @fires changeURL
     * @fires search
     * @emit change
     * @emit route
     */
    currentURL(newVal, oldVal) {
      if (this.ready) {
        let idx = this.search(newVal);
        if (idx !== false) {
          let v = this.views[idx];
          let ct = this.urls[v.url];
          if (!v.pane) {
            this.selected = idx;
            if (ct) {
              this.changeURL(newVal, ct.title);
            }
            else if (this.isLoading) {
              this.changeURL(newVal, bbn._("Loading"));
            }
          }
        }

        this.$emit('change', newVal);
        this.$emit('route', newVal);
      }
    },
    /**
     * @watch url
     * @fires route
     */
    url(newVal) {
      if (this.ready && newVal && (newVal !== this.currentURL)) {
        //bbn.fn.log("URL CHANGED FROM WATCHER TO " + newVal);
        this.route(newVal);
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
    currentPanes: {
      deep: true,
      handler() {
        if (this.ready) {
          this.setConfig();
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
    /**
     * @watch isVisual
     * @fires setConfig
     */
    isVisual(v) {
      this.$nextTick(() => {
        if (this.ready) {
          this.setConfig();
          this.onResize();
        }
      })
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
