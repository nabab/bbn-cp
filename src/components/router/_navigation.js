/**
 * Given a URL returns the existing path of a corresponding view or false, or the default view if forced.
 * @method getRoute
 * @param {String} url
 * @param {Boolean} force
 * @fires parseURL
 * @returns {String|false}
 */
function getRoute(url, force) {
  if (!bbn.fn.isString(url)) {
    throw Error(bbn._('The bbn-container must have a valid URL defined'));
  }

  if (!url && this.hasEmptyURL) {
    return '';
  }

  if (!url && !this.parent) {
    url = this.parseURL(bbn.env.path);
  }

  if (!url && force && this.parent) {
    url = this.parseURL(this.router.getFullCurrentURL());
  }

  if (url) {
    let bits = url.split('/');
    while (bits.length) {
      let st = bits.join('/');
      if (this.urls[st]) {
        return this.urls[st].disabled ? '' : st;
      }
      bits.pop();
    }
  }

  if (this.def && force) {
    return this.def
  }

  if (this.views.length && force) {
    return this.views[0].current
  }

  return false;
}

/**
 * Formats a baseURL correctly (without 1st slash and with end slash.
 * @method formatBaseURL
 * @param {String} baseURL
 * @returns {String}
 */
function formatBaseURL(baseURL) {
  while (bbn.fn.substr(baseURL, -1) === '/') {
    baseURL = bbn.fn.substr(baseURL, 0, baseURL.length - 1);
  }
  while (bbn.fn.substr(baseURL, 0, 1) === '/') {
    baseURL = bbn.fn.substr(baseURL, 1);
  }
  return baseURL ? baseURL + '/' : '';
}
/**
 * Returns the default object for the view.
 * @method getDefaultView
 * @return {Object}
 */
function getDefaultView() {
  return {
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
  };
}
/**
 * Sends event beforeRoute (cancellable) and launch real routing.
 * @method route
 * @param {String} url
 * @param {Boolean} force
 * @fires realRoute
 * @fires getRoute
 * @fires load
 * @emit beforeRoute
 * @returns {void}
 */
async function route(url, force) {
  //bbn.fn.log("ROUTING ON " + url);
  if (!bbn.fn.isString(url)) {
    throw Error(bbn._('The component bbn-container must have a valid URL defined (URL is not a string)'));
  }
  url = bbn.fn.replaceAll('//', '/', url);
  /** @var {Boolean} ok Will prevent the route to happen if false */
  let ok = true;

  // Looking first in the opened panes if splittable
  if (this.splittable) {
    bbn.fn.each(this.currentPanes, a => {
      bbn.fn.each(a.tabs, (v, i) => {
        if (url.indexOf(v.url) === 0) {
          /** @var {bbnCp} container The bbn-container component for the given URL if it's in a pane] */
          let container = this.urls[v.url];
          if (!container) {
            ok = false;
          }

          if (a.selected !== i) {
            a.selected = i;
            ok = false;
          }

          if (v.current !== url) {
            v.current = url;
            if (container) {
              container.setCurrent(url);
            }
          }

          return false;
        }
      })

      if (!ok) {
        return false;
      }
    });
  }
  if (ok && this.ready && (force || !this.activeContainer || (url !== this.currentURL))) {
    let event = new CustomEvent(
      "beforeroute",
      {
        bubbles: false,
        cancelable: true
      }
    );
    this.$emit("beforeroute", event, url);
    if (!event.defaultPrevented) {
      let bits = url.split('#');
      url = bits[0];
      if ((url === '') && this.hasEmptyURL) {
        this.urls[''].setCurrent(url);
        await this.realRoute('', '', force);
        return;
      }
      // Checks weather the container is already there
      if (!url) {
        let idx = this.getRoute('', true);
        if (idx && this.urls[idx]) {
          url = this.urls[idx].currentURL;
        }
      }

      let st = url ? this.getRoute(url) : '';
      /** @todo There is asomething to do here */
      //bbn.fn.log("ROUTING FUNCTION EXECUTING FOR " + url + " (CORRESPONDING TO " + st + ")");
      if (!url || (!force && (this.currentURL === url))) {
        if (bits[1]) {

        }
        //bbn.fn.log("SAME URL END ROUTING");
        return;
      }
      else if (url && ((!st && this.autoload) || (this.urls[st] && this.urls[st].load && !this.urls[st].isLoaded))) {
        this.load(url);
      }
      // Otherwise the container is activated ie made visible
      else {
        //bbn.fn.log("LOADED " + url);
        if (!st && this.def && (!url || force)) {
          st = this.getRoute(this.def);
          if (st) {
            url = this.def;
          }
        }
        if (!st && force && this.views.length) {
          st = this.views[0].url;
          if (st) {
            url = this.urls[st] ? this.urls[st].currentURL : st;
          }
        }
        if (st) {
          if (this.urls[st]) {
            this.urls[st].setCurrent(url);
          }

          await this.realRoute(url, st, force, bits[1]);
        }
      }
    }
  }
}
/**
 * Routes the router.
 * @method realRoute
 * @param {String} url The URL to route to
 * @param {String} st The URL/key of the container on which we will route
 * @param {Boolean} force
 * @fires activate
 * @emit route1
 */
async function realRoute(url, st, force, anchor) {
  if (!bbn.fn.isString(url) && !bbn.fn.isNumber(url)) {
    throw Error(bbn._('The component bbn-container must have a valid URL defined (URL given to route is not a string)'));
  }
  if (this.urls[st]) {
    //bbn.fn.log("REAL ROUTING GOING ON FOR " + url);
    if (!this.urls[st].isPane && (url !== this.currentURL)) {
      //bbn.fn.log("THE URL IS DIFFERENT FROM THE ORIGINAL " + this.currentURL);
      this.currentURL = url;
    }
    // First routing, triggered only once
    if (this.urls[st].currentView.pane) {
      let pane = bbn.fn.getRow(this.currentPanes, { id: this.urls[st].currentView.pane });
      if (pane && pane.tabs) {
        let idx = bbn.fn.search(pane.tabs, { url: st });
        /*
        if (pane.tabs[idx] && (pane.selected === idx)) {
          this.activate(url, this.urls[st]);
        }
        */
        if (pane.tabs[idx]) {
          this.activate(url, this.urls[st]);
        }
      }
    }
    else {
      if (!this.routed) {
        this.routed = true;
        this.$emit("route1", this);
        this.$nextTick(this.onResize)
      }

      await this.activate(url, this.urls[st]);
    }
    if (this.urls[st] && this.urls[st].isLoaded) {
      this.urls[st].currentURL = url;
      let child = this.urls[st].find('bbn-router');
      //bbn.fn.log("LOOKING FOR CHILD", child);
      if (child) {
        child.route(bbn.fn.substr(url, st.length + 1), force);
      }
      else {
        let ifr = this.urls[st].find('bbn-frame');
        if (ifr) {
          ifr.route(bbn.fn.substr(url, st.length + 1));
        }
      }
    }
  }
}
/**
 * Routes to the next view if any.
 * @method next
 * @fires activateIndex
 */
function next(force) {
  let next = this.selected + 1;
  if (!this.views[next] && force) {
    next = 0;
  }
  if (this.views[next]) {
    this.activateIndex(next);
  }
}
/**
 * Routes to the previous view if any.
 * @method prev
 * @fires activateIndex
 */
function prev(force) {
  let prev = this.selected - 1;
  if (!this.views[prev] && force) {
    prev = this.views.length - 1;
  }
  if (this.views[prev]) {
    this.activateIndex(prev);
  }
}
/**
 * Shows the container with the corresponding URL and hide all others.
 * @method activate
 * @param url
 * @param container
 */
function activate(url, container) {
  if (!bbn.fn.isString(url)) {
    throw Error(bbn._('The component bbn-container must have a valid URL defined (activate)'));
  }
  if (!container) {
    let row = bbn.fn.getRow(this.views, { current: url });
    if (!row) {
      row = bbn.fn.getRow(this.views, { url: url });
    }
    if (!row) {
      throw new Error(bbn._("Impossible to find a container for the URL %s", url));
    }
    if (!this.urls[row.url]) {
      throw new Error(bbn._("The container for the URL %s is not registered", row.url));
    }
    container = this.urls[row.url];
  }

  //bbn.fn.log("ACTIVATING " + url + " AND SENDING FOLLOWING CONTAINER:", container);
  if (this.selected !== container.currentIndex) {
    this.$emit('activate', url);
    container.setCurrent(url);
    if (!container.isPane) {
      this.activeContainer = container;
    }
    container.show();
    // Scrolling tabs
    if (this.scrollable && this.nav && !this.breadcrumb && !this.isVisual) {
      let scroll = this.getRef('horizontal-scroll');
      let tab = this.getRef('tab-' + container.currentIndex);
      if (scroll?.ready) {
        scroll.scrollTo(tab);
      }
      else if (scroll) {
        scroll.$on('ready', sc => {
          setTimeout(() => {
            sc.scrollTo(this.getRef('tab-' + container.currentIndex));
          }, 100);
        })
      }
    }
  }
  else if (url !== container.currentURL) {
    if (container.routers) {
      let rt;
      bbn.fn.iterate(container.routers, (r, n) => {
        if (!rt) {
          rt = r;
        }

        if (url.indexOf(r.baseURL) === 0) {
          rt = r;
          return false;
        }
      });
      if (rt) {
        rt.route(url.indexOf(rt.baseURL) === 0 ? bbn.fn.substr(url, rt.baseURL.length) : '');
      }
    }
    else {
      this.activeContainer.setCurrent(url);
    }
  }
  //bbn.fn.log("ACTIVATED " + url + " AND ACTIVATED CONTAINER BELOW:", this.activeContainer);
}
/**
 * @method changeURL
 * @param {String} url
 * @param {String} title
 * @param {Boolean} replace
 * @fires getFullBaseURL
 */
function changeURL(url, title, replace) {
  if (!bbn.fn.isString(url)) {
    throw Error(bbn._('The component bbn-container must have a valid URL defined (change URL)'));
  }
  if (!bbn.env.isInit) {
    return;
  }
  if (title && (title !== this.currentTitle)) {
    this.currentTitle = title;
  }
  if (url !== this.currentURL) {
    this.currentURL = url;
    // Will fire again
    return;
  }

  /*
  bbn.fn.log([
    "changeURL",
    url,
    title,
    this,
    this.parentContainer ? 
      ["FROM PQARENT", this.parentContainer.currentTitle, this.parentContainer.title]
      : this.currentTitle
  ]);
  */
  // Changing the current property of the view cascades on the container's currentURL
  if (
    this.views[this.selected] &&
    (
      (url.indexOf(this.views[this.selected].url + '/') === 0) ||
      (url === this.views[this.selected].url)
    )
  ) {
    this.$set(this.views[this.selected], 'current', url);
  }
  if (this.urlNavigation) {
    if (this.parentContainer) {
      //this.parentContainer.currentTitle = title + ' < ' + this.parentContainer.title;
      if (!this.parentContainer.isPane) {
        this.parent.currentURL = this.baseURL + url;
      }
      else {
        this.parentContainer.currentView.current = this.baseURL + url;
      }
    }
    else if (replace || (url !== bbn.env.path)) {
      if (!replace) {
        //bbn.fn.log("NO REPLAACE", this.getFullBaseURL() + url, bbn.env.path);
      }
      if (!replace && ((this.getFullBaseURL() + url).indexOf(bbn.env.path) === 0)) {
        //bbn.fn.log("REPLACING");
        replace = true;
      }
      bbn.fn.setNavigationVars(this.getFullBaseURL() + url, this.currentTitle, {}, replace);
    }
  }
}
/**
 * Returns the baseURL property.
 * @method getBaseURL
 * @returns {String}
 */
function getBaseURL() {
  return this.baseURL;
}
/**
 * Returns a string of all the baseURL properties till root.
 * @method getFullBaseURL
 * @returns {String}
 */
function getFullBaseURL() {
  return this.fullBaseURL;
}
/**
 * Returns the full URL from the root router (without the hostname).
 * @method getFullURL
 * @fires getFullBaseURL
 * @returns {String}
 */
function getFullURL() {
  let url = this.getURL();
  if (url !== false) {
    return this.getFullBaseURL() + url;
  }
  return '';
}
/**
 * Returns the current URL of the current router.
 * @method getCurrentURL
 * @returns {String}
 */
function getCurrentURL() {
  return this.currentURL;
}
/**
 * Returns the full current URL from the root router (without the hostname).
 * @method getFullCurrentURL
 * @fires getCurrentURL
 * @fires getFullBaseURL
 * @returns {String|Boolean}
 */
function getFullCurrentURL() {
  let url = this.getCurrentURL();
  if (url !== false) {
    return this.getFullBaseURL() + url;
  }
  return false;
}
/**
 * Returns the url relative to the current tabNav from the given url.
 * @method parseURL
 * @param fullURL
 * @returns {String}
 */
function parseURL(fullURL) {
  if (fullURL === undefined) {
    return '';
  }
  if (!bbn.fn.isString(fullURL)) {
    fullURL = fullURL.toString();
  }
  if (fullURL.indexOf(bbn.env.root) === 0) {
    fullURL = bbn.fn.substr(fullURL, bbn.env.root.length);
  }
  fullURL = bbn.fn.removeTrailingChars(fullURL, '/');
  if (this.fullBaseURL === (fullURL + '/')) {
    return '';
  }
  if (this.fullBaseURL) {
    if (fullURL.indexOf(this.fullBaseURL) === 0) {
      fullURL = bbn.fn.substr(fullURL, this.fullBaseURL.length);
    }
    else {
      fullURL = '';
    }
  }
  return fullURL;
}
/**
 * @method isValidIndex
 * @return {Boolean}
 */
function isValidIndex(idx) {
  return (typeof idx === 'number') && (this.views[idx] !== undefined);
}
/**
 * Activates the default view, or the first one if no default.
 * @method activateDefault
 * @fires getIndex
 * @fires isValidIndex
 * @fires activate
 */
function activateDefault() {
  let idx = this.getIndex('', true);
  if (this.isValidIndex(idx)) {
    this.activate(this.views[idx].current ? this.views[idx].current : this.views[idx].url);
  }
}
/**
 * @method activateIndex
 * @param {Number} idx
 * @fires isValidIndex
 * @fires route
 */
function activateIndex(idx) {
  if (this.isValidIndex(idx)) {
    this.route(
      this.urls[this.views[idx].url] ? this.urls[this.views[idx].url].currentURL
        : this.views[idx].current
    );
  }
}


/**
 * @method callRouter
 * @param {String} url
 * @param st
 * @fires getFullBaseURL
 * @fires realRoute
 */
async function callRouter(url, st) {
  if (!bbn.fn.isString(url)) {
    throw Error(bbn._('The component bbn-container must have a valid URL defined (from callRouter)'));
  }
  if (this.parent) {
    let containers = this.ancestors('bbn-container');
    url = bbn.fn.substr(this.getFullBaseURL(), this.router.baseURL.length) + url;
    //bbn.fn.log("CALL ROOT ROUTER WITH URL " + url);
    // The URL of the last bbn-container as index of the root router
    await this.router.realRoute(url, containers[containers.length - 1].url, true);
  }
  else {
    await this.realRoute(url, st, true);
  }
}

export {
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
}