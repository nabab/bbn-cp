export default {
  methods: {
    /*
    observerEmit(newVal, obs){
      bbn.fn.log("OBS EMIT", newVal, obs);
      let ele = $(".bbn-observer-" + obs.element, this.$el);
      if ( ele.length ){
        let idx = this.getIndex(ele);
        if ( idx !== false ){
          let i = bbn.fn.search(this.observers, {id: obs.id, element: obs.element});
          if ( (i > -1) && (this.observers[i].value !== newVal) ){
            if ( idx === this.selected ){
              this.$emit('bbnObs' + obs.element + obs.id, newVal);
              this.observers[i].value = newVal;
            }
            else{
              this.observers[i].value = newVal;
              this.$set(this.views[idx].events, 'bbnObs' + obs.element + obs.id, newVal);
            }
          }
        }
      }
    },
    */

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
     * @fires getIndex
     * @fires $delete
     * @fires $nextTick
     * @fires $forceUpdate
     * @fires observationTower.observerClear
     */
    observerClear(obs) {
      let ele = this.$el.querySelector(".bbn-observer-" + obs.element);
      if (ele) {
        let idx = this.getIndex(ele);
        if ((idx !== false) && (this.views[idx].events['bbnObs' + obs.element + obs.id] !== undefined)) {
          this.$delete(this.views[idx].events, 'bbnObs' + obs.element + obs.id);
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
