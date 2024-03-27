/**
 * @file appui component
 * @description The autocomplete allows to select a single value from a list of items by proposeing suggestions based on the typed characters.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @ignore
 * @created 10/02/2017.
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.localStorage
   * @mixin bbn.cp.mixins.observer
   * @mixin bbn.cp.mixins.serviceWorker
   * @mixin bbn.cp.mixins.browserNotification
   */
  mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.localStorage,
      bbn.cp.mixins.observer,
      bbn.cp.mixins.serviceWorker,
      bbn.cp.mixins.browserNotification
    ],
  props: {
    root: {
      type: String,
      default: ''
    },
    /**
     * @prop {String} ['bbn.env.path'] url
     */
    url: {
      type: String,
      default: bbn.env.path
    },
    popup: {
      type: bbnCp
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {String} def
     */
    def: {
      type: String
    },
    /**
     * @prop {Boolean} [true] autoload
     */
    autoload: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Boolean} [false] disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Object} [{}] options
     */
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @prop {Array} [[]] shortcuts
     */
    shortcuts: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * @prop {Object} [{}] plugins
     */
    plugins: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * @prop {Object} [{'span'}] cfg
     */
    cfg: {
      type: Object,
      default() {
        return {
          tag: 'span'
        }
      }
    },
    /**
     * @prop {Array} [[]] source
     */
    source: {
      type: Array,
      default() {
        return [/*{
          url: (this.plugins && this.plugins['appui-core'] ? this.plugins['appui-core'] : 'core') + '/home',
          title: bbn._("Dashboard"),
          load: true,
          fixed: true,
          icon: 'nf nf-fa-tachometer_alt'
        }*/];
      }
    },
    /**
     * @prop {(Object|Boolean)} [{}] searchBar
     */
    searchBar: {
      type: [Object, Boolean],
      default() {
        return {}
      }
    },
    /**
     * @prop {Boolean} [false] single
     */
    single: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] single
     */
    urlNavigation: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {String} ['bbn.env.siteTitle || bbn._("App-UI")'] title
     */
    title: {
      type: String,
      default: bbn.env.siteTitle || bbn._('App-UI')
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
     * Will be passed to router in order to ignore the dirty parameter.
     * @prop {Boolean} [false] ignoreDirty
     */
    ignoreDirty: {
      type: Boolean,
      default: false
    },
    /**
     * Will be passed to router in order to ignore the dirty parameter.
     * @prop {Boolean} [false] ignoreDirty
     */
    loadbar: {
      type: Boolean,
      default: true
    },
    /**
     * Will be passed to the top router in order to make it splittable.
     * @prop {Boolean} [false] splittable
     */
    splittable: {
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
    prefix: {
      type: String
    },
    componentsPath: {
      type: String,
      default: 'components/'
    },
    componentsMixin: {
      type: Object
    },
    header: {

    },
    nav: {

    },
    status: {

    },
    definition: {
      type: Object
    },
    users: {
      type: Array,
      default() {
        return []
      }
    },
    groups: {
      type: Array,
      default() {
        return []
      }
    },
    user: {
      type: Object
    }
  },
  data() {
    let isMobile = bbn.fn.isMobile();
    let isTablet = bbn.fn.isTabletDevice();

    let d = {
      isFocused: false,
      intervalBugChrome: null,
      mode: bbn.env.mode,
      opacity: 0,
      pollerObject: {
        token: bbn.env.token || null
      },
      /* For the server query (checking or not) */
      chatOnline: true,
      /* No chat component if chat is not visible */
      chatVisible: false,
      /* Chat dialog windows */
      chatWindows: [],
      usersOnline: [],
      usersOnlineHash: false,
      width: 0,
      height: 0,
      popups: [],
      // Polling
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
      searchString: '',
      observerTimeout: false,
      colorEnvVisible: true,
      currentTitle: this.title,
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
      loadingText: bbn._('Loading'),
      registeredComponents: bbnData.immunizeValue(bbn.fn.createObject())
    };
    return d;
  },
  computed: {
    userGroup() {
      return this.getUserGroup(this.user.id_group);
    },
    isDev() {
      return bbn.env.isDev;
    },
    appComponent() {
      return 'span';
      return bbn.fn.extend({
        render(createElement) {
          return createElement();
        }
      }, this.cfg)
    },
    headerComponent() {
      return this.header && bbn.fn.isObject(this.header) ? this.header : false;
    },
    footerComponent() {
      return this.footer && bbn.fn.isObject(this.footer) ? this.footer : false;
    },
    appMode() {
      if (this.mode === 'dev') {
        return bbn._("Application in development mode");
      }

      if (this.mode === 'prod') {
        return bbn._("Application in production mode");
      }

      if (this.mode === 'test') {
        return bbn._("Application in testing mode");
      }
    }
  },
  methods: {
    fdate: bbn.fn.fdate,
    onCopy() {
      let cpb = this.getRef('clipboardButton');
      //bbn.fn.log("AWATCH", cpb);
      if (cpb) {
        cpb.style.color = 'green';
        setTimeout(() => {
          cpb.style.color = null;
        }, 250);
      }
    },
    setBigMessage(msg, timeout = 3000) {
      this.bigMessage = msg;
      setTimeout(() => {
        this.hasBigMessage = true;
        setTimeout(() => {
          this.closeBigMessage();
        }, timeout < 100 ? timeout * 1000 : timeout);
      }, 50);

    },
    closeBigMessage() {
      this.hasBigMessage = false;
      setTimeout(() => {
        this.bigMessage = false;
      }, 250)
    },
    tabMenu(tab, router) {
      let res = [];
      if (bbn.env.isDev) {
        let plugin;
        bbn.fn.iterate(this.plugins, (a, n) => {
          if (tab.url.indexOf(a + '/') === 0) {
            plugin = n;
            return false;
          }
        });
        let url = this.plugins['appui-project'] + '/router/' + bbn.env.appName + '/ide/editor/file/';
        if (plugin) {
          url += 'lib/' + plugin + '/mvc' + bbn.fn.substr(tab.url, this.plugins[plugin].length);
        }
        else {
          url += 'app/main/mvc/' + tab.url;
        }
        url += '/_end_/';
        if (tab.url.indexOf('test/') === 0) {
          url += 'private';
        }
        else {
          url += 'php';
        }
        res.push({
          text: bbn._('Dev tools'),
          icon: 'nf nf-fa-code',
          items: [
            {
              text: bbn._('Open in editor'),
              icon: 'nf nf-fa-edit',
              action() {
                bbn.fn.link(url);
              }
            }, {
              text: bbn._('Log the container'),
              icon: 'nf nf-mdi-sign_text',
              action() {
                let idx = router.search(tab.url);
                //bbn.fn.log("Container with URL " + tab.url, router.urls[router.views[idx].url]);
              }
            }
          ]
        });
      }

      return res;
    },
    onBeforeRoute(ev, path) {
      this.$emit('beforeroute', ev, path);
    },
    onRoute(path) {
      this.$emit('route', path)
    },
    route(url, force) {
      this.getRef('router').route(url, force)
    },
    register(name, cp) {
      if (this.registeredComponents[name]) {
        throw new Error(bbn._("%s is already registered", name));
      }

      if (cp) {
        this.registeredComponents[name] = cp;
      }
      else {
        throw new Error(bbn._("The component that should be registered as %s does not exist", name));
      }
    },
    unregister(name, ignore) {
      if (this.registeredComponents[name]) {
        delete this.registeredComponents[name];
      }
      else if (!ignore) {
        throw new Error(bbn._("The component") + ' ' + name + ' ' + bbn._("is not registered"));
      }
    },
    getRegistered(name, ignore) {
      if (this.registeredComponents[name]) {
        return this.registeredComponents[name];
      }
      if (name === undefined) {
        return this.registeredComponents;
      }

      if (!ignore) {
        throw new Error(bbn._("The component") + ' ' + name + ' ' + bbn._("cannot be found"));
      }
    },
    getField: bbn.fn.getField,
    toggleDebug() {
      let debug = this.getRef('debug');
      if (debug) {
        debug.toggle();
      }
    },
    getPopup() {
      let popup = this.popup || this.getRef('popup');
      if (arguments.length) {
        return popup.open(...arguments);
      }

      return popup;
    },

    loadPopup(obj) {
      return this.getPopup().load.apply(this, arguments);
    },

    getUserName: function(id){
      return bbn.fn.getField(this.users, "text", "value", id);
    },

    getUserGroup: function(id){
      return bbn.fn.getField(this.users, "id_group", "value", id);
    },

    getActiveUsers() {
      if ( bbn.fn.isArray(this.users) ){
        return bbn.fn.order(this.users.filter(user => {
          return !!user.active;
        }), 'text', 'ASC');
      }
      return [];
    },

    notify(obj, type, timeout) {
      let notification = this.getRef('notification');
      if (notification) {
        return notification.show(obj, type, timeout);
      }
      bbn.fn.log("NOTIFICATION: " + type, obj);
    },

    error(obj, timeout) {
      return this.notify(obj, "error", timeout);
    },

    warning(obj, timeout) {
      return this.notify(obj, "warning", timeout);
    },

    success(obj, timeout) {
      return this.notify(obj, "success", timeout || 5);
    },

    info(obj, timeout) {
      return this.notify(obj, "info", timeout || 30);
    },

    confirm() {
      let p = appui.getPopup();
      return p.confirm.apply(p, arguments);
    },

    alert() {
      let p = appui.getPopup();
      return p.alert.apply(p, arguments);
    },

    measure() {
      /*
      let w = $(this.$el).width(),
          h = $(this.$el).height();
      if ( w && h && ((w !== this.width) || (h !== this.height)) ){
        this.width = w;
        this.height = h;
        this.$emit("resize", {width: this.width, height: this.height});
      }
      */
    },


    /**
     * Get messages from service worker
     * @param {Object} message
     */
    receive(message) {
      //bbn.fn.log("RECEIVING", message, message.type);
      if (message.type !== undefined) {
        switch (message.type) {
          case 'message':
            if (!bbn.fn.numProperties(message.data)) {
              return;
            }
            if (message.data && message.data.disconnected) {
              //document.location.reload();
              bbn.fn.log("DISCONNECTED", message.data);
            }
            else if (message.data && message.data.data) {

            }
            if (message.data && message.data.plugins && Object.keys(message.data.plugins).length) {
              bbn.fn.iterate(message.data.plugins, (d, i) => {
                if ('serviceWorkers' in d) {
                  this.$set(this.pollerObject, i, bbn.fn.extend(true, this.pollerObject[i], d.serviceWorkers));
                  delete d.serviceWorkers;
                }
                this.$emit(i, message.type, d);
              });
            }
            break;
          case 'log':
            this.$emit('swlog', message.data);
            break;
          case 'messageFromChannel':
            bbn.fn.log("messageFromChannel", message);
            this.$emit(message.channel, message.type, message.data);
            break;
          case 'notificationClick':
            bbn.fn.log("notificationClick", message.data);
            this.browserNotificationClick(message.data);
        }
      }
    },
    poll(data) {
      if (this.pollable && this.pollerPath) {
        if (!data) {
          data = {
            'appui-core': {
              observers: this.observers
            }
          };
        }
        if (this._postMessage(bbn.fn.extendOut({}, data, this.pollerObject))) {
          this.observersCopy = bbn.fn.clone(this.observers);
        }
      }
    },
    onChatMounted() {
      this.pollerObject['appui-chat'].online = this.app?.user?.chat;
      if (this.ready) {
        this.poll();
      }
    },
    getCurrentContainer() {
      let router = this.getRef('router'),
        container = !!router ? router.searchContainer(bbn.env.path, true) : false;
      return container || this;
    },
    searchBarBlur() {
      setTimeout(() => {
        this.searchIsActive = false
      }, 500)
    },
    keydown(e) {
      if (this.longPressed) {
        e.preventDefault();
      }
      if (this.pressedKey) {
        this.pressedKey = false;
      }
      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && !this.isTouch) {
        let tag = e.target.tagName;
        if ((tag === 'INPUT') || (tag === 'TEXTAREA') || (tag === 'SELECT') || ((tag === 'DIV') && e.target.isContentEditable)) {
          return;
        }

        this.pressedKey = e.key;
      }
    },
    removePressListener() {
      this.longPressed = false;
      document.removeEventListener('keyup', this.removePressListener);
    },
    longPress(key) {
      this.longPressed = true;
      document.addEventListener('keyup', this.removePressListener)
      if (bbn.fn.isNumber(key)) {
        let router = this.getRef('router');
        if (key === '0') {
          if (router.isVisual) {
            router.visualShowAll = !router.visualShowAll;
          }
          return
        }

        let idx = parseInt(key);
        if (router.isVisual) {
          if (router.visualList[idx]) {
            idx = router.visualList[idx].view.idx
            this.getRef('router').activateIndex(idx);
          }
        }
        else {
          idx--;
          if (router.isValidIndex(idx)) {
            this.getRef('router').activateIndex(idx);
          }
        }
        return;
      }

      switch (key) {
        case 'f':
          this.searchOn = true;
          break;
        case 'b':
          this.showBookmarks = true;
          break;
        case 'g':
          let loadbar = this.getRef('loading');
          if (loadbar) {
            loadbar.show();
          }
          break;
        case 'c':
          let clipboard = this.getRef('clipboard');
          if (clipboard) {
            clipboard.show();
          }
          break;
        case 'm':
          let menu = this.getRef('slider');
          if (menu) {
            menu.show();
          }
          break;
        case 'ArrowLeft':
          history.back();
          break;
        case 'ArrowRight':
          history.forward();
          break;
      }
    },
    onLoad() {
      this.$emit('load', ...arguments);
    },
    startLoading(text) {
      this.loadingText = text === false ? '' : text || bbn._('Loading');
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    }
  },
  beforeCreate() {
    bbn.fn.defaultAjaxErrorFunction = (jqXHR, textStatus, errorThrown) => {
      /** @todo */
      if (window.appui?.status) {
        this.$nextTick(() => {
          const loadBar = this.getRef('loading');
          if (bbn.fn.isCp(loadBar)) {
            loadBar.$forceUpdate();
          }
        });
      }
      appui.error({ title: textStatus, content: errorThrown }, 4);
      return false;
    };
    bbn.fn.defaultPreLinkFunction = url => {
      let router = appui.getRef('router');
      if (router) {
        if (bbn.fn.isFunction(router.route) && !router.disabled) {
          router.route(url);
        }

        return false;
      }
      return true;
    };
    bbn.fn.defaultAlertFunction = ele => {
      /** @todo */
      let c = appui.getCurrentContainer();
      c.alert.apply(c, arguments);
    };

    bbn.fn.defaultStartLoadingFunction = () => {
      if (window.appui?.status) {
        this.$nextTick(() => {
          const loadBar = this.getRef('loading');
          if (bbn.fn.isCp(loadBar)) {
            loadBar.$forceUpdate();
          }
        });
      }
    };

    bbn.fn.defaultEndLoadingFunction = (url, timestamp, data, res) => {
      if (res && res.data && (bbn.fn.numProperties(res.data) === 1) && res.data.disconnected) {
        window.location.reload();
        return;
      }

      if (window.appui?.status) {
        this.$nextTick(() => {
          const loadBar = this.getRef('loading');
          if (bbn.fn.isCp(loadBar)) {
            loadBar.$forceUpdate();
          }
        });
      }
    };
  },
  created() {
    if (window.appui) {
      throw new Error("Impossible to have 2 bbn-appui components on a same page. bbn-appui is meant to hold a whole web app");
    }
    else {
      window.appui = this;
      this.componentClass.push('bbn-resize-emitter', 'bbn-observer');
      this.cool = true;

      let preloaded = [
        'container',
        'router',
        'scrollbar',
        'scroll',
        'floater',
        'popup'
      ];

      if (!this.single) {
        preloaded.push(
          'pane',
          'splitter',
          'tabs',
          'context',
          'loadicon'
        );
      }

      if (this.header) {
        preloaded.push(
          'pane',
          'splitter',
          'search',
          'fisheye'
        );
      }

      if (this.plugins && this.plugins['appui-menu']) {
        preloaded.push(
          'slider',
          'tree',
          'treemenu',
          'menu',
          'input',
          'list',
          'dropdown',
          'checkbox',
          'button'
        );
      }

      if (this.plugins && this.plugins['appui-notification']) {
        preloaded.push(
          'notification'
        );
      }

      if (this.status) {
        preloaded.push(
          'splitter',
          'input',
          'loadbar',
          'checkbox',
          'button'
        );
        if (this.chat) {
          preloaded.push(
            'chat'
          );
        }
      }

      if (this.clipboard) {
        preloaded.push(
          'slider',
          'clipboard'
        );
      }

      bbn.cp.fetchComponents(preloaded.map(c => 'bbn-' + c));

      this.$on('focusin', () => this.isFocused = true);
      this.$on('focusout', () => this.isFocused = false);

      document.addEventListener('keydown', this.keydown);
      document.addEventListener('keyup', () => {
        this.pressedKey = false;
      });

      this.$on('messageToChannel', data => {
        this.messageChannel(this.primaryChannel, data);
      });

      // Emissions from poller
      //appui
      this.$on('appui', (type, data) => {
        switch (type) {
          case 'messageFromChannel':
            this.messageFromChannel(data);
        }
      })
      // appui-chat
      this.$on('appui-chat', (type, data) => {
        let chat = this.getRef('chat');
        switch (type) {
          case 'message':
            if (bbn.cp.isComponent(chat) && bbn.fn.numProperties(data)) {
              chat.receive(data);
            }
            break;
          case 'messageFromChannel':
            if (bbn.cp.isComponent(chat)) {
              chat.messageFromChannel(data);
            }
            break;
        }
      })
      // appui-core
      this.$on('appui-core', (type, data) => {
        if ((type === 'message') && data.observers) {
          bbn.fn.each(
            data.observers,
            obs => bbn.fn.each(
              bbn.fn.filter(
                this.observers,
                { id: obs.id }
              ),
              o => this.observerEmit(obs.result, o)
            )
          );
        }
      })
      // appui-notification
      this.$on('appui-notification', (type, data) => {
        if (this.plugins['appui-notification']) {
          if (type === 'message') {
            let tray = this.getRegistered('appui-notification-tray')
            if (bbn.cp.isComponent(tray) && bbn.fn.isFunction(tray.receive)) {
              tray.receive(data);
            }
            if ('browser' in data) {
              bbn.fn.each(data.browser, n => this.browserNotify(n.title, {
                body: bbn.fn.html2text(n.content),
                tag: n.id,
                timestamp: n.browser,
                requireInteraction: true
              }));
            }
          }
        }
      });
      // appui-cron
      this.$on('appui-cron', (type, data) => {
        if (type === 'message') {
          let cron = appui.getRegistered('appui-cron');
          if (bbn.cp.isComponent(cron) && bbn.fn.isFunction(cron.receive)) {
            cron.receive(data);
          }
        }
      });

      // Set plugins pollerObject
      if (!this.pollerObject.token) {
        this.pollerObject.token = bbn.env.token;
      }
      if (this.plugins['appui-chat']) {
        this.$set(this.pollerObject, 'appui-chat', {
          online: null,
          usersHash: false,
          chatsHash: false
        })
      }
      if (this.plugins['appui-notification']) {
        this.$set(this.pollerObject, 'appui-notification', { unreadHash: false });
      }
    }
  },
  beforeMount() {
    this.componentClass.push(
      'bbn-background',
      this.scrollable ? 'bbn-overlay' : 'bbn-w-100'
    );
    if (this.isMobile) {
      this.componentClass.push('bbn-desktop');
    }

  },
  mounted() {
    if (this.cool) {
      if (this.$refs.app) {
        this.app = this.$refs.app;
      }
      this.onResize();
      this.ready = true;
      this.opacity = 1;
      this._postMessage({
        type: 'initCompleted'
      });
      if (!this.single) {
        this.registerChannel('appui', true);
        if (this.plugins['appui-chat']) {
          this.registerChannel('appui-chat');
        }
        if (this.plugins['appui-notification']) {
          this.registerChannel('appui-notification');
          this.browserNotificationURL = this.plugins['appui-notification'];
          this.browserNotificationSW = true;
        }
        this.poll();
      }
      this.onResize();
      setTimeout(() => {
        this.ready = true;
        this.opacity = 1;
        setTimeout(() => {
          this._postMessage({
            type: 'initCompleted'
          });
          this.registerChannel('appui', true);
          if (this.plugins['appui-chat']) {
            this.registerChannel('appui-chat');
          }
          if (this.plugins['appui-notification']) {
            this.registerChannel('appui-notification');
            this.browserNotificationURL = this.plugins['appui-notification'];
            this.browserNotificationSW = true;
          }
          this.poll();
        }, 5000);
      }, this.app?.header ? 1000 : 10);
    }
  },
  beforeDestroy() {
    this.$off('appui-chat');
    this.$off('appui-core');
    this.$off('appui-notification');
  },
  watch: {
    pressedKey(v) {
      clearTimeout(this.pressedTimeout);
      if (v) {
        this.pressedTimeout = setTimeout(() => {
          this.longPress(v);
          this.pressedKey = false;
        }, 500)
      }
    },
    observers: {
      deep: true,
      handler() {
        if (this.observerTimeout) {
          clearTimeout(this.observerTimeout);
        }
        this.observerTimeout = setTimeout(() => {
          this.poll();
        }, 1000);
      }
    },
    isLoading(newVal) {
      if (!newVal) {
        this.loadingText = bbn._('Loading');
      }
    }
  }
};

import cpHtml from './appui.html';
import cpStyle from './appui.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./appui.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }

  }
  catch (err) { }
}

export default {
  name: 'bbn-appui',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
