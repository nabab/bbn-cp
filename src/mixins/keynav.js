const keynav = {
  methods: {
    getKeyNavTarget() {
      let list = this.getRef('list');
      if (!list && this.$is('bbn-list')) {
        list = this;
      }
      else if (list && !list.$is('bbn-list')) {
        list = list.getRef('list');
      }
      else if (!list) {
        list = this.find('bbn-list');
      }

      return list;
    },

    /**
     * States the role of the enter button on the dropdown menu.
     * @memberof keynavComponent
     * @method keynav
     * @param {Event} e
     * @fires widget.select
     * @fires widget.open
     *
     */
    keynav(e){
      if (this.filteredData.length && bbn.var.keys.upDown.includes(e.key)) {
        if (e.preventDefault) {
          e.preventDefault();
        }

        if ( !this.isOpened ){
          this.isOpened = true;
          return;
        }

        let list = this.getKeyNavTarget();
        if (list) {
          list.isOver = false;
          let idx = -1;
          let d = list.filteredData;
          if (d.length === 1) {
            list.overIdx = 0;
            return;
          }
          if (list.overIdx > -1) {
            idx = list.overIdx;
          }

          switch ( e.keyCode ){
            // Arrow down
            case 40:
              let toAdd = 1;
              for (let i = idx; i < d.length; ++i) {
                if (this.getRef('item-' + i)) {
                  toAdd = i - idx;
                  break;
                }
              }
              list.overIdx = d[idx+toAdd] !== undefined ? idx+toAdd : d.length - 1;
              break;
            // Arrow Up
            case 38:
              let toRemove = 1;
              for (let i = idx; i >= 0; --i) {
                if (this.getRef('item-' + i)) {
                  toRemove = idx - i;
                  break;
                }
              }
              list.overIdx = d[idx-toRemove] !== undefined ? idx-toRemove : 0;
              break;
            // Page down (10)
            case 34:
              if (list.overIdx >= (d.length - 1)) {
                list.overIdx = 0;
              }
              else{
                list.overIdx = d[idx+10] ? idx+10 : d.length - 1;
              }
              break;
            // Page up (10)
            case 33:
              if (list.overIdx <= 0) {
                list.overIdx = d.length - 1;
              }
              else{
                list.overIdx = d[idx-10] ? idx-10 : 0;
              }
              break;
            // End
            case 35:
              list.overIdx = d.length - 1;
              break;
            // Home
            case 36:
              list.overIdx = 0;
              break;

          }
          list.$forceUpdate();
        }
      }
    }
  }
};

export default keynav;
