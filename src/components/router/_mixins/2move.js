import bbn from "@bbn/bbn";

export default {
  props: {
    /**
     * The confirm message when you close an unsaved container.
     * @prop {(Boolean|String|Function)} ['Are you sure you want to discard the changes you made in this tab?'] confirmLeave
     */
    confirmLeave: {
      type: [Boolean, String, Function],
      default: bbn._("Are you sure you want to discard the changes you made in this page?")
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
      if (this.isValidIndex(idx) && this.checkLoaded(idx)) {
        let url = this.views[idx].current;
        let rurl = this.views[idx].url;
        bbn.fn.log(["RELOAD", idx, url, rurl, this.baseURL]);
        if (!force
          && !this.ignoreDirty
          && this.isDirty
          && this.views[idx].dirty
        ) {
          this.confirm(this.confirmLeave, () => {
            if (this.checkLoaded(idx)) {
              // Looking for dirty ones in registered forms of each container
              let forms = this.urls[this.views[idx].uid].forms;
              if (Array.isArray(forms) && forms.length) {
                bbn.fn.each(forms, (f, k) => {
                  f.reset();
                });
              }
              if (this.urls[this.views[idx].uid].popups?.length) {
                this.urls[this.views[idx].uid].popups.splice(0);
              }

              this.remove(idx).then(() => {
                this.add({url: rurl, current: url, selected: true, load: true}, idx);
              });
            }
          });
        }
        else {
          this.remove(idx).then(() => {
            this.add({url: rurl, current: url, selected: true, load: true}, idx);
          });
}
      }
    }

  }
}

