export default {
  props: {
    /**
     * The index of the container
     * @prop {Number} idx
     */
    idx: {
      type: Number
    },
    /**
     * The timestamp of the last activation
     * @prop {Number} last
     */
    last: {
      type: Number
    },
    /**
     * A unique id for the container that will ben used as index by the router
     * @prop {String} uid
     */
    uid: {
      type: String,
      default() {
        return bbn.fn.randomString();
      }
    },
    /**
     * Defines if the component has to be selected.
     * @prop {Boolean|Number} [false] selected
     */
    selected: {
      type: [Boolean, Number],
      default: false
    },
  },
  methods: {
    /**
     * Shows the container.
     * 
     * @method show
     */
    show() {
      if (!this.isPane) {
        this.router.selected = this.currentIndex;
        if (this.visual && this.router.visualShowAll) {
          this.router.visualShowAll = false;
        }
      }
    },


    close() {
      if (!this.isPane) {
        this.router.close(this.currentIndex);
      }
    },


  }
}