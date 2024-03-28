/**
 * @method getDefaultURL
 * @fires parseURL
 * @return {String}
 */
function getDefaultURL() {
  let url = this.parseURL(bbn.env.path);

  if (!url && this.url) {
    url = this.url;
  }

  // If there is a parent router we automatically give the proper baseURL
  if (!url && this.parentContainer && (this.parentContainer.currentURL !== this.parentContainer.url)) {
    url = bbn.fn.substr(this.parentContainer.currentURL, this.parentContainer.url.length + 1);
  }

  if (!url && this.def) {
    url = this.def;
  }

  return url;
}


/**
 * @method getTitle
 * @param {Number} idx
 * @return {String}
 */
function getTitle(idx) {
  let cp = this,
    res = '';
  if (idx === undefined) {
    idx = this.selected;
  }
  if (cp.views[idx]) {
    res += (cp.views[idx].title || bbn._('Untitled'));
    if (cp.parentTab) {
      idx = cp.parentTab.currentIndex;
      cp = cp.parentTab.router;
      while (cp) {
        res += ' < ' + (cp.views[idx].title || bbn._('Untitled'));
        if (cp.parentTab) {
          idx = cp.parentTab.currentIndex;
          cp = cp.parentTab.router;
        }
        else {
          cp = false;
        }
      }
    }
    res += ' - ';
  }
  res += bbn.env.siteTitle || bbn._("Untitled site")
  return res;
}
/**
 * Returns the full title (combination of title and ftitle if any)
 * 
 * @method getFullTitle
 * @param {Object} obj
 * @return {String|null}
 */
function getFullTitle(obj) {
  let t = '';
  if (obj.title) {
    t += obj.title;
  }
  if (obj.ftitle) {
    t += (t.length ? ' - ' : '') + obj.ftitle;
  }
  return t;
}
/**
 * @method getFontColor
 * @param {Number} idx
 * @fires getRef
 * @return {String}
 */
function getFontColor(idx) {
  return this.views[idx]?.fcolor || '';
  //this.views[idx].fcolor = window.getComputedStyle(el.$el ? el.$el : el).color;
}


/**s
 * @method getBackgroundColor
 * @param {Number} idx
 * @fires getRef
 * @return {String}
 */
function getBackgroundColor(idx) {
  return this.views[idx]?.bcolor || '';
  /*
  if (this.$isMounted && this.views[idx]) {
    if (!this.views[idx].bcolor) {
      let el = this.getRef('title-' + idx);
      if (el) {
        this.views[idx].bcolor = window.getComputedStyle(el.$el ? el.$el : el).backgroundColor;
        bbn.fn.log(["GETTING BCOLOR", idx, this.views[idx].bcolor]);
      }
    }

    return this.views[idx].bcolor;
  }

  return '';
*/
}


/**
 * @method getTab
 * @param {Number} idx
 * @fires getRef
 * @return {HTMLElement}
 */
function getTab(idx) {
  if (idx === undefined) {
    idx = this.selected;
  }
  return this.getRef('tabs').getRef('tab-' + idx);
}


/**
 * Returns the breadcrumb's source list.
 * @method getList
 * @param {bbnCp} bc
 * @fires close
 * @return {Array}
 */
function getList(idx) {
  let list = [],
    parents = bbn.fn.map(idx && this.itsMaster && (this.baseURL !== this.itsMaster.baseURL) ?
      this.getParents() : [],
      p => {
        return {
          view: p.views[p.selected],
          maxTitleLength: p.maxTitleLength
        }
      });
  if (parents.length > idx) {
    parents.splice(0, parents.length - idx);
  }
  bbn.fn.each(this.views, (t, i) => {
    if (!t.hidden && (t.idx !== this.selected) && !t.pane) {
      list.push({
        view: t,
        key: t.url,
        parents: parents,
        children: bbn.fn.map(this.getBreadcrumbs(i), c => {
          return {
            view: c.views[c.selected],
            maxTitleLength: c.maxTitleLength
          }
        }),
        maxTitleLength: this.maxTitleLength,
        action: () => {
          this.activateIndex(t.idx);
        },
        closeAction: () => {
          return this.close(t.idx)
        }
      })
    }
  });
  return list;
}


/**
 * @method getParents
 * @return {Array}
 */
function getParents() {
  return this.parent ? [...this.parent.getParents(), this.parent] : []
}


/**
 * @method getView
 * @return {Object|null}
 */
function getView(url) {
  return bbn.fn.getRow(this.views, { url: url })
}

export {
  getDefaultURL,
  getTitle,
  getFullTitle,
  getFontColor,
  getBackgroundColor,
  getTab,
  getList,
  getParents,
  getView,
}