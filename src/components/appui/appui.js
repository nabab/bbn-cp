/**
 * Summary: Main bbn-appui Vue component defining application UI with routing, chat, notifications, and plugins.
 * @file appui component
 * @description The autocomplete allows to select a single value from a list of items by proposing suggestions based on the typed characters.
 */
const cpDef = {
  /**
   * Summary: Included mixins for basic behavior, resizer, localStorage, observer, serviceWorker, and notifications.
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.localStorage
   * @mixin bbn.cp.mixins.observer
   * @mixin bbn.cp.mixins.serviceWorker
   * @mixin bbn.cp.mixins.browserNotification
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.resizer,
    bbn.cp.mixins.localStorage,
    bbn.cp.mixins.observer,
    bbn.cp.mixins.serviceWorker,
    bbn.cp.mixins.browserNotification,
  ],
  props: {
    /**
     * Summary: Root element selector.
     * @prop root
     * @type String
     */
    root: {
      type: String,
      default: "",
    },
    /**
     * Summary: Base URL for API calls.
     * @prop url
     * @type String
     */
    url: {
      type: String,
      default: bbn.env.path,
    },
    /**
     * Summary: Reference to popup component.
     * @prop popup
     * @type HTMLElement
     */
    popup: {
      type: HTMLElement,
    },
    /**
     * Summary: Enable internal scrolling.
     * @prop scrollable
     * @type Boolean
     */
    scrollable: {
      type: Boolean,
      default: true,
    },
    /**
     * Summary: Default definition string.
     * @prop def
     * @type String
     */
    def: {
      type: String,
    },
    /**
     * Summary: Auto-load data on mount.
     * @prop autoload
     * @type Boolean
     */
    autoload: {
      type: Boolean,
      default: true,
    },
    /**
     * Summary: Disable component.
     * @prop disabled
     * @type Boolean
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Summary: Configuration options object.
     * @prop options
     * @type Object
     */
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * Summary: Keyboard shortcuts definitions.
     * @prop shortcuts
     * @type Array
     */
    shortcuts: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * Summary: Plugin registry.
     * @prop plugins
     * @type Object
     */
    plugins: {
      type: Object,
      default() {
        return {};
      },
    },
    /**
     * Summary: Component config parameters.
     * @prop cfg
     * @type Object
     */
    cfg: {
      type: Object,
    },
    /**
     * Summary: Data source for navigation items.
     * @prop source
     * @type Array
     */
    source: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * Summary: Search bar configuration or disabled state.
     * @prop searchBar
     * @type Object|Boolean
     */
    searchBar: {
      type: [Object, Boolean],
      default() {
        return {};
      },
    },
    /**
     * Summary: Single item mode flag.
     * @prop single
     * @type Boolean
     */
    single: {
      type: Boolean,
      default: false,
    },
    /**
     * Summary: Enable URL navigation on select.
     * @prop urlNavigation
     * @type Boolean
     */
    urlNavigation: {
      type: Boolean,
      default: true,
    },
    /**
     * Summary: Label displayed in header.
     * @prop label
     * @type String
     */
    label: {
      type: String,
      default: bbn.env.siteTitle || bbn._("App-UI"),
    },
    /**
     * Summary: Single component to render.
     * @prop component
     * @type String|Object
     */
    component: {
      type: [String, Object],
    },
    /**
     * Summary: Source definition for component loading.
     * @prop componentSource
     * @type Object
     */
    componentSource: { type: Object },
    /**
     * Summary: Key in componentSource for URL.
     * @prop componentUrl
     * @type String
     */
    componentUrl: { type: String },
    /**
     * Summary: Ignore dirty state in routing.
     * @prop ignoreDirty
     * @type Boolean
     */
    ignoreDirty: { type: Boolean, default: false },
    /**
     * Summary: Show loading bar.
     * @prop loadbar
     * @type Boolean
     */
    loadbar: { type: Boolean, default: true },
    /**
     * Summary: Allow splitting UI containers.
     * @prop splittable
     * @type Boolean
     */
    splittable: { type: Boolean, default: false },
    /**
     * Summary: Enable scrolling within component content.
     * @prop scrollContent
     * @type Boolean
     */
    scrollContent: { type: Boolean, default: true },
    /**
     * Summary: Mixin object for child components.
     * @prop componentsMixin
     * @type Object
     */
    componentsMixin: { type: Object },
    /**
     * Summary: Custom header component definition.
     * @prop header
     * @type <any>
     */
    header: {},
    /**
     * Summary: Navigation component definition.
     * @prop nav
     * @type <any>
     */
    nav: {},
    /**
     * Summary: Status bar component definition.
     * @prop status
     * @type <any>
     */
    status: {},
    /**
     * Summary: Router definition.
     * @prop definition
     * @type Object
     */
    definition: { type: Object },
    /**
     * Summary: List of user objects.
     * @prop users
     * @type Array
     */
    users: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * Summary: List of group objects.
     * @prop groups
     * @type Array
     */
    groups: {
      type: Array,
      default() {
        return [];
      },
    },
    /**
     * Summary: Current user information.
     * @prop user
     * @type Object
     */
    user: { type: Object },
    /**
     * Summary: Enable polling service worker messages.
     * @prop pollable
     * @type Boolean
     */
    pollable: { type: Boolean, default: false },
  },
  /**
   * Summary: Reactive data properties for UI state and config.
   * @data
   */
  data() {
    // Detect device type and freeze user object
    let isMobile = bbn.fn.isMobile();
    let isTablet = bbn.fn.isTabletDevice();
    if (this.user) {
      Object.freeze(this.user);
    }
    return {
      isFocused: false,
      intervalBugChrome: null,
      mode: bbn.env.mode,
      opacity: 0,
      pollerObject: { token: bbn.env.token || null },
      chatOnline: true,
      chatVisible: false,
      chatWindows: [],
      usersOnline: [],
      usersOnlineHash: false,
      width: 0,
      height: 0,
      popups: [],
      polling: false,
      pollingTimeout: 0,
      prePollingTimeout: 0,
      pollingErrors: 0,
      loaders: bbn.env.loadersHistory,
      notifications: [],
      poller: false,
      debug: false,
      isOverDebug: false,
      app: null,
      cool: false,
      searchString: "",
      observerTimeout: false,
      colorEnvVisible: true,
      currentTitle: this.label,
      searchIsActive: false,
      bigMessage: false,
      hasBigMessage: false,
      searchOn: false,
      pressedKey: false,
      pressedTimeout: false,
      longPressed: false,
      isMobile: isMobile,
      isTablet: isTablet,
      isTouch: isMobile || isTablet,
      isDesktop: !isTablet && !isMobile,
      showBookmarks: false,
      bookmarksLoaded: false,
      isLoading: false,
      loadingText: bbn._("Loading"),
      registeredComponents: bbn.cp.immunizeValue(bbn.fn.createObject()),
      online: bbn.env.online
    };
  },
  computed: {
    db() {
      return this.constructor.db;
    },
    /**
     * Summary: Finds the group object for the current user.
     * @computed userGroup
     * @return Object|undefined
     */
    userGroup() {
      if (this.user?.id) {
        let idGroup = this.getUserGroup(this.user.id) || this.user.id_group;
        if (idGroup) {
          return bbn.fn.getRow(this.groups, "id", idGroup);
        }
      }
    },
    /**
     * Summary: Flag indicating development environment.
     * @computed isDev
     * @return Boolean
     */
    isDev() {
      return bbn.env.isDev;
    },
    /**
     * Summary: Renders application component wrapper.
     * @computed appComponent
     * @return String|Object
     */
    appComponent() {
      return "span";
      return bbn.fn.extend(
        {
          render(createElement) {
            return createElement();
          },
        },
        this.cfg
      );
    },
    /**
     * Summary: Returns header component if object.
     * @computed headerComponent
     * @return Object|false
     */
    headerComponent() {
      return this.header && bbn.fn.isObject(this.header) ? this.header : false;
    },
    /**
     * Summary: Returns footer component if object.
     * @computed footerComponent
     * @return Object|false
     */
    footerComponent() {
      return this.footer && bbn.fn.isObject(this.footer) ? this.footer : false;
    },
    /**
     * Summary: Descriptive text for current app mode.
     * @computed appMode
     * @return String
     */
    appMode() {
      if (this.mode === "dev") {
        return bbn._("Application in development mode");
      }
      if (this.mode === "prod") {
        return bbn._("Application in production mode");
      }
      if (this.mode === "test") {
        return bbn._("Application in testing mode");
      }
    },
  },
  methods: {
    /**
     * Summary: Formats a date using bbn.fn.fdate.
     * @method fdate
     * @type method fdate
     * @param {any} args forwarded to bbn.fn.fdate
     * @return {String} formatted date
     */
    fdate: bbn.fn.fdate,
    /**
     * Summary: Visual feedback when copying to clipboard.
     * @method onCopy
     */
    onCopy() {
      let cpb = this.getRegistered("clipboard-button");
      if (cpb) {
        cpb.style.color = "green";
        setTimeout(() => {
          cpb.style.color = null;
        }, 250);
      }
    },
    /**
     * Summary: Displays a big message overlay temporarily.
     * @method setBigMessage
     * @param {String|Boolean} msg Message content or false to clear
     * @param {Number} timeout Timeout in ms or seconds
     */
    setBigMessage(msg, timeout = 3000) {
      this.bigMessage = msg;
      setTimeout(() => {
        this.hasBigMessage = true;
        setTimeout(
          () => {
            this.closeBigMessage();
          },
          timeout < 100 ? timeout * 1000 : timeout
        );
      }, 50);
    },
    /**
     * Summary: Closes the big message overlay.
     * @method closeBigMessage
     */
    closeBigMessage() {
      this.hasBigMessage = false;
      setTimeout(() => {
        this.bigMessage = false;
      }, 250);
    },
    /**
     * Summary: Constructs developer tools menu entries based on URL.
     * @method tabMenu
     * @param {Object} tab Tab info object
     * @param {Object} router Router reference
     * @return {Array} Menu items
     */
    tabMenu(tab, router) {
      let res = [];
      if (bbn.env.isDev) {
        let plugin;
        bbn.fn.iterate(this.plugins, (a, n) => {
          if (tab.url.indexOf(a + "/") === 0) {
            plugin = n;
            return false;
          }
        });
        let url =
          this.plugins["appui-project"] +
          "/router/" +
          bbn.env.appName +
          "/ide/editor/file/";
        if (plugin) {
          url +=
            "lib/" +
            plugin +
            "/mvc" +
            bbn.fn.substr(tab.url, this.plugins[plugin].length);
        } else {
          url += "app/main/mvc/" + tab.url;
        }
        url += "/_end_/";
        url += tab.url.indexOf("test/") === 0 ? "private" : "php";
        res.push({
          text: bbn._("Dev tools"),
          icon: "nf nf-fa-code",
          items: [
            {
              text: bbn._("Open in editor"),
              icon: "nf nf-fa-edit",
              action() {
                bbn.fn.link(url);
              },
            },
            {
              text: bbn._("Log the container"),
              icon: "nf nf-md-sign_text",
              action() {
                let idx = router.search(tab.url);
              },
            },
          ],
        });
      }
      return res;
    },
    /**
     * Summary: Emits a before-route event.
     * @method onBeforeRoute
     * @param {Event} ev Route event
     * @param {String} path Route path
     */
    onBeforeRoute(ev, path) {
      this.$emit("beforeroute", ev, path);
    },
    /**
     * Summary: Emits a route event.
     * @method onRoute
     * @param {String} path Route path
     */
    onRoute(path) {
      this.$emit("route", path);
    },
    /**
     * Summary: Routes to specified URL via router ref.
     * @method route
     * @param {String} url Destination URL
     * @param {Boolean} force Force navigation flag
     * @return {Boolean} always false
     */
    route(url, force) {
      this.getRef("router").route(url, force);
      return false;
    },
    /**
     * Summary: Registers a component by name.
     * @method register
     * @param {String} name Component key
     * @param {Object} cp Component instance
     * @throws Error if already registered or component missing
     */
    register(name, cp) {
      if (this.registeredComponents[name]) {
        throw new Error(bbn._("%s is already registered", name));
      }
      if (cp) {
        this.registeredComponents[name] = cp;
      } else {
        throw new Error(
          bbn._(
            "The component that should be registered as %s does not exist",
            name
          )
        );
      }
    },
    /**
     * Summary: Unregisters a component by name.
     * @method unregister
     * @param {String} name Component key
     * @param {Boolean} ignore If true, suppress error
     */
    unregister(name, ignore) {
      if (this.registeredComponents[name]) {
        delete this.registeredComponents[name];
      } else if (!ignore) {
        throw new Error(
          bbn._("The component") + " " + name + " " + bbn._("is not registered")
        );
      }
    },
    /**
     * Summary: Retrieves a registered component or the registry.
     * @method getRegistered
     * @param {String} [name] Component key
     * @return {Object|<any>}
     */
    getRegistered(name) {
      if (this.registeredComponents[name]) {
        return this.registeredComponents[name];
      }
      if (name === undefined) {
        return this.registeredComponents;
      }
    },
    /**
     * Summary: Proxy to bbn.fn.getField for nested data access.
     * @method getField
     */
    getField: bbn.fn.getField,
    /**
     * Summary: Toggles debug panel visibility.
     * @method toggleDebug
     */
    toggleDebug() {
      let debug = this.getRef("debug");
      if (debug) {
        debug.toggle();
      }
    },
    /**
     * Summary: Retrieves or opens popup component.
     * @method getPopup
     * @param {...any} args Arguments to open
     * @return {Object|<any>}
     */
    getPopup() {
      let popup = this.popup || this.getRef("popup");
      if (arguments.length) {
        return popup.open(...arguments);
      }
      return popup;
    },
    /**
     * Summary: Loads a popup with given options.
     * @method loadPopup
     * @param {Object} obj Popup configuration
     * @return {Promise}
     */
    loadPopup(obj) {
      return this.getPopup().load.apply(this, arguments);
    },
    /**
     * Summary: Retrieves username by user id.
     * @method getUserName
     * @param {Number|String} id User identifier
     * @return {String} User name text
     */
    getUserName: function (id) {
      return bbn.fn.getField(this.users, "text", "value", id);
    },
    /**
     * Summary: Retrieves user's group id by user id.
     * @method getUserGroup
     * @param {Number|String} id User identifier
     * @return {any} Group id or undefined
     */
    getUserGroup: function (id) {
      return bbn.fn.getField(this.users, "id_group", "value", id);
    },
    /**
     * Summary: Returns active users ordered by name.
     * @method getActiveUsers
     * @return {Array} Filtered and sorted users
     */
    getActiveUsers() {
      if (bbn.fn.isArray(this.users)) {
        return bbn.fn.order(
          this.users.filter((user) => user.active),
          "text",
          "ASC"
        );
      }
      return [];
    },
    /**
     * Summary: Delegates to notification component.
     * @method notify
     * @param {Object} obj Notification content
     * @param {String} type Type label
     * @param {Number} timeout Duration in seconds
     */
    notify(obj, type, timeout) {
      let notification = this.getRegistered("notification");
      if (notification) {
        return notification.show(obj, type, timeout);
      }
      bbn.fn.log("NOTIFICATION: " + type, obj);
    },
    /**
     * Summary: Shortcut to show error notification.
     * @method error
     * @param {Object} obj
     * @param {Number} timeout
     */
    error(obj, timeout) {
      return this.notify(obj, "error", timeout);
    },
    /**
     * Summary: Shortcut to show warning.
     * @method warning
     * @param {Object} obj
     * @param {Number} timeout
     */
    warning(obj, timeout) {
      return this.notify(obj, "warning", timeout);
    },
    /**
     * Summary: Shortcut to show success.
     * @method success
     * @param {Object} obj
     * @param {Number} timeout
     */
    success(obj, timeout) {
      return this.notify(obj, "success", timeout || 5);
    },
    /**
     * Summary: Shortcut to show info.
     * @method info
     * @param {Object} obj
     * @param {Number} timeout
     */
    info(obj, timeout) {
      return this.notify(obj, "info", timeout || 30);
    },
    /**
     * Summary: Proxy to global confirm dialog.
     * @method confirm
     * @return {Promise}
     */
    confirm() {
      let p = appui.getPopup();
      return p.confirm.apply(p, arguments);
    },
    /**
     * Summary: Proxy to global alert dialog.
     * @method alert
     * @return {Promise}
     */
    alert() {
      let p = appui.getPopup();
      return p.alert.apply(p, arguments);
    },
    /**
     * Summary: Handles incoming service worker messages and emits events accordingly.
     * @method receive
     * @param {Object} message Service worker message payload
     */
    addShortcut(data) {
      this.$emit("shortcut", data);
    },
    receive(message) {
      this.$emit("received", message);
      if (message.type !== undefined) {
        switch (message.type) {
          case "message":
            if (!bbn.fn.numProperties(message.data)) {
              return;
            }
            if (message.data.disconnected) {
              bbn.fn.log(["DISCONNECTED", message.data]);
            }
            if (
              message.data.plugins &&
              Object.keys(message.data.plugins).length
            ) {
              bbn.fn.iterate(message.data.plugins, (d, i) => {
                if ("serviceWorkers" in d) {
                  this.$set(
                    this.pollerObject,
                    i,
                    bbn.fn.extend(true, this.pollerObject[i], d.serviceWorkers)
                  );
                  delete d.serviceWorkers;
                }
                this.$emit(i, message.type, d);
              });
            }
            break;
          case "log":
            bbn.fn.log(message.data);
            this.$emit("swlog", message.data);
            break;
          case "messageFromChannel":
            bbn.fn.log("messageFromChannel", message);
            this.$emit(message.channel, message.type, message.data);
            break;
          case "notificationClick":
            bbn.fn.log("notificationClick", message.data);
            this.browserNotificationClick(message.data);
        }
      }
    },
    /**
     * Summary: Polls service worker if pollable is enabled.
     * @method poll
     * @param {Object} [data] Data to send
     */
    poll(data) {
      if (this.pollable) {
        if (!data) {
          data = { "appui-core": { observers: this.observers } };
        }
        if (this._postMessage(bbn.fn.extendOut({}, data, this.pollerObject))) {
          this.observersCopy = bbn.fn.clone(this.observers);
        }
      }
    },
    /**
     * Summary: Returns current router container or root.
     * @method getCurrentContainer
     * @return {Object} Container component or root
     */
    getCurrentContainer() {
      let router = this.getRef("router"),
        container = router ? router.searchContainer(bbn.env.path, true) : false;
      return container || this;
    },
    /**
     * Summary: Blur handler for search bar.
     * @method searchBarBlur
     */
    searchBarBlur() {
      setTimeout(() => {
        this.searchIsActive = false;
      }, 500);
    },
    /**
     * Summary: Global keydown listener for shortcuts.
     * @method onKeydown
     * @param {Event} e Keyboard event
     */
    onKeydown(e) {
      if (this.longPressed) {
        e.preventDefault();
      }
      if (this.pressedKey) {
        this.pressedKey = false;
      }
      if (
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey &&
        !this.isTouch
      ) {
        let tag = e.target.tagName;
        if (
          ["INPUT", "TEXTAREA", "SELECT"].includes(tag) ||
          (tag === "DIV" && e.target.isContentEditable)
        ) {
          return;
        }
        this.pressedKey = e.key;
      }
    },
    /**
     * Summary: Removes long press listener.
     * @method removePressListener
     */
    removePressListener() {
      this.longPressed = false;
      document.removeEventListener("keyup", this.removePressListener);
    },
    /**
     * Summary: Handles long key press shortcuts.
     * @method longPress
     * @param {String|Number} key Key or digit pressed
     */
    longPress(key) {
      this.longPressed = true;
      document.addEventListener("keyup", this.removePressListener);
      if (bbn.fn.isNumber(key)) {
        let router = this.getRef("router");
        if (key === "0") {
          if (router.isVisual) {
            router.visualShowAll = !router.visualShowAll;
          }
          return;
        }
        let idx = parseInt(key);
        if (router.isVisual) {
          if (router.visualList[idx]) {
            idx = router.visualList[idx].idx;
            this.getRef("router").activateIndex(idx);
          }
        } else {
          idx--;
          if (router.isValidIndex(idx)) {
            this.getRef("router").activateIndex(idx);
          }
        }
        return;
      }
      switch (key) {
        case "f":
          this.searchOn = true;
          break;
        case "b":
          this.showBookmarks = true;
          break;
        case "g":
          let loadbar = this.getRef("loading");
          if (loadbar) {
            loadbar.show();
          }
          break;
        case "c":
          let clipboard = this.getRegistered("clipboard");
          if (clipboard) {
            clipboard.show();
          }
          break;
        case "m":
          let menu = this.getRegistered("menu");
          if (menu) {
            menu.show();
          }
          break;
        case "ArrowLeft":
          history.back();
          break;
        case "ArrowRight":
          history.forward();
          break;
      }
    },
    /**
     * Summary: Emits load event on component.
     * @method onLoad
     */
    onLoad() {
      this.$emit("load", ...arguments);
    },
    /**
     * Summary: Shows loading indicator with optional text.
     * @method startLoading
     * @param {String|Boolean} text Text or false to clear
     */
    startLoading(text) {
      this.loadingText = text === false ? "" : text || bbn._("Loading");
      this.isLoading = true;
    },
    /**
     * Summary: Hides loading indicator.
     * @method stopLoading
     */
    stopLoading() {
      this.isLoading = false;
    },
  },
  /**
   * Summary: Set global default AJAX and routing handlers before creation.
   * @lifecycle beforeCreate
   */
  beforeCreate() {
    bbn.env.loadersHistory = this.loaders;
    bbn.fn.defaultAjaxErrorFunction = (jqXHR, textStatus, errorThrown) => {
      appui.error(textStatus);
      bbn.fn.log(errorThrown);
      return false;
    };
    bbn.fn.defaultPreLinkFunction = (url) => {
      appui.route(url);
      return false;
    };
    bbn.fn.defaultAlertFunction = (ele) => {
      let c = appui.getCurrentContainer();
      c.alert.apply(c, arguments);
    };
    bbn.fn.defaultStartLoadingFunction = () => {};
    bbn.fn.defaultEndLoadingFunction = (url, timestamp, data, res) => {
      if (
        res?.data &&
        bbn.fn.numProperties(res.data) === 1 &&
        res.data.disconnected
      ) {
        window.location.reload();
        return;
      }
    };
  },
  /**
   * Summary: Initialize component instance, register events, prefetch components.
   * @lifecycle created
   */
  created() {
    if (window.appui) {
      throw new Error(
        "Impossible to have 2 bbn-appui components on a same page. bbn-appui is meant to hold a whole web app"
      );
    }
    window.appui = this;
    this.componentClass.push("bbn-resize-emitter", "bbn-observer");
    let preloaded = ["container", "router", "scroll", "floater", "popup"];
    if (!this.single) {
      preloaded.push("pane", "splitter", "tabs", "context", "loadicon");
    }
    if (this.header) {
      preloaded.push("pane", "splitter", "search", "fisheye");
    }
    if (this.plugins["appui-menu"]) {
      preloaded.push(
        "slider",
        "tree",
        "treemenu",
        "menu",
        "input",
        "list",
        "dropdown",
        "checkbox",
        "button"
      );
    }
    if (this.plugins["appui-notification"]) {
      preloaded.push("notification");
    }
    if (this.status) {
      preloaded.push("splitter", "input", "loadbar", "checkbox", "button");
      if (this.chat) {
        preloaded.push("chat");
      }
    }
    if (this.clipboard) {
      preloaded.push("slider", "clipboard");
    }
    window.addEventListener('online', () => {
      this.online = true
    });
    window.addEventListener('offline', () => {
      this.online = false
    });
    // Prefetch components
    // bbn.cp.fetchComponent(preloaded.map(c => 'bbn-'+c));
    this.$on("focusin", () => (this.isFocused = true));
    this.$on("focusout", () => (this.isFocused = false));
    document.addEventListener("keydown", this.onKeydown);
    document.addEventListener("keyup", () => {
      this.pressedKey = false;
    });
    this.$on("messageToChannel", (data) => {
      this.messageChannel(this.primaryChannel, data);
    });
    // Event listeners for SW channels
    this.$on("appui", (type, data) => {
      if (type === "messageFromChannel") {
        this.messageFromChannel(data);
      }
    });
    this.$on("appui-chat", (type, data) => {
      let chat = this.getRegistered("chat");
      if (type === "message" && bbn.cp.isComponent(chat)) {
        chat.receive(data);
      }
      if (type === "messageFromChannel" && bbn.cp.isComponent(chat)) {
        chat.messageFromChannel(data);
      }
    });
    this.$on("appui-core", (type, data) => {
      if (type === "message" && data.observers) {
        bbn.fn.each(data.observers, (obs) =>
          bbn.fn.each(bbn.fn.filter(this.observers, { id: obs.id }), (o) =>
            this.observerEmit(obs.result, o)
          )
        );
      }
    });
    this.$on("appui-notification", (type, data) => {
      if (this.plugins["appui-notification"] && type === "message") {
        let tray = this.getRegistered("appui-notification-tray");
        if (bbn.cp.isComponent(tray) && bbn.fn.isFunction(tray.receive)) {
          tray.receive(data);
        }
        if ("browser" in data) {
          bbn.fn.each(data.browser, (n) =>
            this.browserNotify(n.title, {
              body: bbn.fn.html2text(n.content),
              tag: n.id,
              timestamp: n.browser,
              requireInteraction: true,
            })
          );
        }
      }
    });
    this.$on("appui-cron", (type, data) => {
      if (type === "message") {
        let cron = appui.getRegistered("appui-cron");
        if (bbn.cp.isComponent(cron) && bbn.fn.isFunction(cron.receive)) {
          cron.receive(data);
        }
      }
    });
    if (!this.pollerObject.token) {
      this.pollerObject.token = bbn.env.token;
    }
    if (this.plugins["appui-chat"]) {
      this.$set(this.pollerObject, "appui-chat", {
        online: null,
        usersHash: false,
        chatsHash: false,
      });
    }
    if (this.plugins["appui-notification"]) {
      this.$set(this.pollerObject, "appui-notification", { unreadHash: false });
    }
  },
  /**
   * Summary: Apply CSS classes before mounting.
   * @lifecycle beforeMount
   */
  beforeMount() {
    this.componentClass.push(
      "bbn-background-internal",
      this.scrollable ? "bbn-overlay" : "bbn-w-100"
    );
    if (this.isMobile) {
      this.componentClass.push("bbn-desktop");
    }
  },
  /**
   * Summary: Setup component refs and service worker messaging after mount.
   * @lifecycle mounted
   */
  mounted() {
    if (this.$refs.app) {
      this.app = this.$refs.app;
    }
    this.ready = true;
    setTimeout(
      () => {
        setTimeout(() => {
          if (navigator?.serviceWorker?.controller) {
            navigator.serviceWorker.addEventListener("message", (event) => {
              if (event.data?.data) {
                this.receive(event.data);
              }
            });
            this.poll();
          }
          this._postMessage({ type: "initCompleted" });
          this.registerChannel("appui", true);
          if (this.plugins["appui-chat"]) {
            this.registerChannel("appui-chat");
          }
          if (this.plugins["appui-notification"]) {
            this.registerChannel("appui-notification");
            this.browserNotificationURL = this.plugins["appui-notification"];
            this.browserNotificationSW = true;
          }
        }, 1000);
        this.onResize();
        this.opacity = 1;
      },
      this.app?.header ? 250 : 50
    );
  },
  /**
   * Summary: Cleanup event listeners before destruction.
   * @lifecycle beforeDestroy
   */
  beforeDestroy() {
    this.$off("appui-chat");
    this.$off("appui-core");
    this.$off("appui-notification");
  },
  watch: {
    /**
     * Summary: Handles pressedKey changes to trigger longPress.
     * @watch pressedKey
     */
    pressedKey(v) {
      clearTimeout(this.pressedTimeout);
      if (v) {
        this.pressedTimeout = setTimeout(() => {
          this.longPress(v);
          this.pressedKey = false;
        }, 500);
      }
    },
    /**
     * Summary: Watches observers to debounce poll calls.
     * @watch observers (deep)
     */
    observers: {
      deep: true,
      handler() {
        if (this.observerTimeout) {
          clearTimeout(this.observerTimeout);
        }
        this.observerTimeout = setTimeout(() => {
          this.poll();
        }, 1000);
      },
    },
    /**
     * Summary: Resets loadingText when loading finishes.
     * @watch isLoading
     */
    isLoading(newVal) {
      if (!newVal) {
        this.loadingText = bbn._("Loading");
      }
    },
  },
};

import bbn from "@bbn/bbn";
import cpHtml from "./appui.html";
import cpStyle from "./appui.less";
import cpLang from "./_i18n/index.js";

export default {
  name: "bbn-appui",
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang,
};
