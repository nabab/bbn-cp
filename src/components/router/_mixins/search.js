export default {
  methods: {
    getPortalSelector(view) {
      if (!this.disabled && this.panes.length) {
        let pane = this.getPane(view);
        if (pane) {
          return '#' + pane + slashToHyphen(this.isVisual ? view.view.url : view.url);
        }
      }

      return undefined;
    },


    selectClosest(idx) {
      if ((idx === this.selected) && this.views[idx] && !this.views[idx].pane) {
        return;
      }

      if (this.selected === idx) {
        if (this.views.length) {
          let newIdx = false;
          bbn.fn.each(this.history, a => {
            let tmp = this.getIndex(a);
            if ((tmp !== false) && !this.views[tmp].pane) {
              newIdx = tmp;
              return false;
            }
          });
          if (newIdx === false) {
            let tmp = idx;
            while (tmp >= 0) {
              if (this.views[tmp] && !this.views[tmp].pane) {
                newIdx = tmp;
                break;
              }
              tmp--;
            }

            if (newIdx === false) {
              tmp = idx;
              while (tmp < this.views.length) {
                if (this.views[tmp] && !this.views[tmp].pane) {
                  newIdx = tmp;
                  break;
                }
                tmp++;
              }
            }
          }

          if (this.views[newIdx]) {
            this.activateIndex(newIdx);
          }
        }
        else {
          this.selected = false;
        }
      }
    },


    /**
     * @method getIndex
     * @fires isValidIndex
     * @fires search
     * @return {Number|Boolean}
     */
    getIndex(misc) {
      if (!this.views.length) {
        return false;
      }
      if ([undefined, null].includes(misc)) {
        return this.selected;
      }
      if (!this.isValidIndex(misc)) {
        if (typeof (misc) === 'string') {
          misc = this.search(misc);
        }
        else if (typeof (misc) === 'object') {
          // Vue
          if (misc.$el) {
            misc = misc.$el;
          }
          if (misc.tagName) {
            bbn.fn.each(this.$children, ct => {
              if (
                ct.$vnode &&
                ct.$vnode.componentOptions &&
                (ct.$vnode.componentOptions.tag === 'bbn-container') &&
                ((ct.$el === misc) || ct.$el.contains(misc))
              ) {
                misc = ct.currentIndex;
                return false;
              }
            });
          }
        }
      }
      return this.isValidIndex(misc) ? misc : false;
    },


    fixIndexes() {
      bbn.fn.each(this.views, (v, i) => {
        if (v.idx !== i) {
          v.idx = i;
          if (this.urls[v.url]) {
            this.urls[v.url].currentIndex = i;
          }
        }
      });
    },


    /**
     * @method search
     * @param {String} url
     * @return {Number|Boolean}
     */
    search(url) {
      if (!bbn.fn.isString(url)) {
        throw Error(bbn._('The component bbn-container must have a valid URL defined (Search)'));
      }
      let r = bbn.fn.search(this.views, "url", url);
      if (r === -1) {
        bbn.fn.each(this.views, (tab, index) => {
          if (url.indexOf(tab.url + '/') === 0) {
            r = index;
            return false;
          }
        });
      }
      return r > -1 ? r : false;
    },


    searchForString(needle) {
      let res = [];
      let st = needle.toLowerCase().trim();
      bbn.fn.each(this.views, a => {
        let found = false;
        bbn.fn.iterate(this.routers, router => {
          let tmp = router.searchForString(needle);
          if (tmp.length) {
            bbn.fn.each(tmp, t => {
              t.url = this.getBaseURL() + t.url;
              if (!bbn.fn.getRow(res, { url: t.url })) {
                found = true;
                res.push(t);
              }
            });
          }
        });

        if (!found) {
          let match = false;
          let idx = -1;
          let obj = {
            url: a.current || a.url,
            title: this.getFullTitle(a)
          };
          if ((idx = obj.url.toLowerCase().indexOf(st)) > -1) {
            match = "url";
          }
          else if ((idx = obj.title.toLowerCase().indexOf(st)) > -1) {
            match = "title";
          }

          if (match) {
            let url = this.getBaseURL() + obj.url;
            res.push({
              url: url,
              title: obj.title,
              score: match === 'url' ? 10 : 20,
              icon: a.icon || null,
              hash: url,
              bcolor: a.bcolor || null,
              fcolor: a.fcolor || null,
              component: this.$options.components.searchResult,
              match: bbn.fn.substr(obj[match], 0, idx)
                + '<strong><em>'
                + bbn.fn.substr(obj[match], idx, st.length)
                + '</em></strong>'
                + bbn.fn.substr(obj[match], idx + st.length)
            });
          }
        }
      });

      return res;
    },


    /**
     * @method searchContainer
     * @param {String} url
     * @param {Boolean} deep
     * @fires search
     * @fires getContainer
     * @return {Vue|Boolean}
     */
    searchContainer(url, deep) {
      let container = false,
        idx = this.search(url);
      if (idx !== false) {
        container = this.getContainer(idx);
        if (deep && container) {
          let router = container.find('bbn-router');
          if (router) {
            let real = router.searchContainer(bbn.fn.substr(url, router.baseURL.length), true);
            if (real) {
              return real;
            }
          }
        }
      }
      return container;
    }

  }
}
