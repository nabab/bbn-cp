export default {
  methods: {
    /**
    * @method getTitle
    * @param {Number} idx
    * @return {String}
    */
    getTitle(idx) {
      let cp = this,
        res = '';
      if (idx === undefined) {
        idx = this.selected;
      }
      if (cp.views[idx]) {
        res += (cp.views[idx].label || bbn._('Untitled'));
        if (cp.parentTab) {
          idx = cp.parentTab.currentIndex;
          cp = cp.parentTab.router;
          while (cp) {
            res += ' < ' + (cp.views[idx].label || bbn._('Untitled'));
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
    },
    /**
    * Returns the full label (combination of label and flabel if any)
    * 
    * @method getFullTitle
    * @param {Object} obj
    * @return {String|null}
    */
    getFullTitle(obj) {
      let t = '';
      if (obj.label) {
        t += obj.label;
      }
      if (obj.flabel) {
        t += (t.length ? ' - ' : '') + obj.flabel;
      }
      return t;
    },
    /**
    * @method getFontColor
    * @param {Number} idx
    * @fires getRef
    * @return {String}
    */
    getFontColor(idx) {
      return this.views[idx]?.fcolor || '';
      //this.views[idx].fcolor = window.getComputedStyle(el.$el ? el.$el : el).color;
    },


    /**s
    * @method getBackgroundColor
    * @param {Number} idx
    * @fires getRef
    * @return {String}
    */
    getBackgroundColor(idx) {
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
    },


    /**
    * @method getTab
    * @param {Number} idx
    * @fires getRef
    * @return {HTMLElement}
    */
    getTab(idx) {
      if (idx === undefined) {
        idx = this.selected;
      }
      return this.getRef('tabs').getRef('tab-' + idx);
    },


    /**
    * Returns the breadcrumb's source list.
    * @method getList
    * @param {HTMLElement} bc
    * @fires close
    * @return {Array}
    */
    getList(idx) {
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
        if (!t.invisible && (t.idx !== this.selected) && !t.pane) {
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
    },


    /**
    * @method getParents
    * @return {Array}
    */
    getParents() {
      return this.parent ? [...this.parent.getParents(), this.parent] : []
    },


    /**
    * @method getView
    * @return {Object|null}
    */
    getView(url) {
      return bbn.fn.getRow(this.views, { url: url })
    }
  },
}
