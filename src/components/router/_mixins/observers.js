export default {
  methods: {
    /**
     * @method observerEmit
     * @param newVal
     * @param obs
     * @fires getIndex
     */
    observerEmit(newVal, obs) {
      if (bbn.cp.mixins.observer.methods.observerEmit.apply(this, [newVal, obs])) {
        let ele = this.$el.querySelector(".bbn-observer-" + obs.element);
        if (ele) {
          let idx = this.getIndex(ele);
          if (idx !== false) {
            this.$set(this.views[idx].events, 'bbnObs' + obs.element + obs.id, newVal);
            this.$nextTick(() => {
              //this.$forceUpdate();
            });
          }
        }
      }
    },


    /**
     * The called method on the switching to false of the "observer Dirty" property value
     * @method observerClear
     * @param {Object} obs
     * @fires getInde
     * @fires $nextTick
     * @fires $forceUpdate
     * @fires observationTower.observerClear
     */
    observerClear(obs) {
      let ele = this.$el.querySelector(".bbn-observer-" + obs.element);
      if (ele) {
        let idx = this.getIndex(ele);
        if ((idx !== false) && ('bbnObs' + obs.element + obs.id in this.views[idx].events)) {
          delete this.views[idx].events['bbnObs' + obs.element + obs.id];
          this.$nextTick(() => {
            //this.$forceUpdate();
          });
        }
      }
      else if (this.observationTower) {
        this.observationTower.observerClear(obs);
      }
    }
  },
}
