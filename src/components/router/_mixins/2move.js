import bbn from "@bbn/bbn";

export default {
  props: {
    /**
     * The confirm message when you close an unsaved container.
     * @prop {(Boolean|String|Function)} ['Are you sure you want to discard the changes you made in this tab?'] confirmLeave
     */
    confirmLeave: {
      type: [Boolean, String, Function],
      default(){
        return bbn._("Are you sure you want to discard the changes you made in this page?");
      }
    },
  },
  methods: {
    checkLoaded(idx) {
      return this.views[idx] &&
        //!this.views[idx].real &&
        this.views[idx].load &&
        this.urls[this.views[idx].uid] &&
        this.urls[this.views[idx].uid].isLoaded;
    },


    /**
    * @method reload
    * @param {Number} idx
    * @fires route
    */
    async reload(idx, force) {
      if (this.isValidIndex(idx) && this.views[idx].load) {
        const item = this.views[idx];
        let url = this.views[idx].current;
        let rurl = this.views[idx].url;
        //bbn.fn.log(["RELOAD", idx, url, rurl, this.baseURL]);
        const obj = bbn.fn.createObject({load: true, loaded: false});
        const take = ['url', 'current', 'selected', 'bcolor', 'fcolor', 'scrollable', 'icon', 'pane', 'label', 'fixed', 'pinned'];
        take.forEach((n) => {
          if (n in item) {
            obj[n] = item[n];
          }
        });

        if (!force
          && !this.ignoreDirty
          && this.isDirty
          && item.dirty
        ) {
          this.confirm(this.confirmLeave, () => {
            if (this.checkLoaded(idx)) {
              // Looking for dirty ones in registered forms of each container
              let forms = this.urls[item.uid].forms;
              if (Array.isArray(forms) && forms.length) {
                bbn.fn.each(forms, (f, k) => {
                  f.reset();
                });
              }
              if (this.urls[item.uid].popups?.length) {
                this.urls[item.uid].popups.splice(0);
              }

              this.removeItem(idx, true, obj);
            }
          });
        }
        else {
          this.removeItem(idx, true, obj);
        }
      }
    }

  }
}

