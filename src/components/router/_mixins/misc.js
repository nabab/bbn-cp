export default {
  props: {
    /**
     * Sets if the views' titles will be scrollable in case they have a greater width than the page (true), or if they will be shown multilines (false, default).
     * @prop {Boolean} [false] scrollable
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * Sets if the router and the ocntainers inside it should be themselves scrollable or part of the global scroll.
     * @prop {Boolean} [false] scrollContent
     */
    scrollContent: {
      type: Boolean,
      default: true
    },
    /**
     * The name used for the storage.
     * @prop {String} ['__ROOT__'] storageName
     */
    storageName: {
      type: String,
      default: '__ROOT__'
    },
    /**
     * The max length for the titles
     * @prop {Number} [20] maxTitleLength
     */
    maxTitleLength: {
      type: Number,
      default: 20
    },
    /**
     * The default background color for the title bar
     * @prop {String} [#666] bcolor
     */
    bcolor: {
      type: String,
      default: '#666'
    },
    /**
     * The default text color for the title bar
     * @prop {String} [#EEE] fcolor
     */
    fcolor: {
      type: String,
      default: '#EEE'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    hasVerticalTabs() {
      return !this.isVisual
        && !this.isBreadcrumb
        && ((this.orientation === 'left')
          || (this.orientation === 'right'));
    },
  },
  methods: {
    /**
     * @method updateVisualStyleContainer
     * @return {Object}
     */
    updateVisualStyleContainer() {
      if (!this.visualStyleContainer) {
        this.visualStyleContainer = bbn.fn.createObject();
      }
      else if (!this.isVisual) {
        this.visualStyleContainer = bbn.fn.createObject();
      }

      if (!this.isVisual) {
        return;
      }

      //bbn.fn.warning("updateVisualStyleContainer");
      bbn.fn.iterate(this.views, view => {
        if (view.view) {
          view = view.view;
        }

        if (!this.visualStyleContainer[view.url]) {
          this.visualStyleContainer[view.url] = {};
        }

        if (!this.urls[view.uid]) {
          return;
        }

        const ct = this.urls[view.uid];
        if (!ct?.isVisible || this.visualShowAll) {
          if (this.visualStyleContainer[view.uid].zoom != 0.5) {
            this.visualStyleContainer[view.uid] = { zoom: 0.1 };
          }

          return;
        }

        let num = this.numVisuals + 1;
        let coord = [1, num, 1, num];
        switch (this.visualOrientation) {
          case 'up':
            coord[2] = 2;
            break;
          case 'down':
            coord[3] = num - 1;
            break;
          case 'left':
            coord[0] = 2;
            break;
          case 'right':
            coord[1] = num - 1;
            break;
        }


        if ((this.visualStyleContainer[view.uid].zoom != 1)
          || (this.visualStyleContainer[view.uid].gridColumnStart != coord[0])
          || (this.visualStyleContainer[view.uid].gridColumnEnd != coord[1])
          || (this.visualStyleContainer[view.uid].gridRowStart != coord[2])
          || (this.visualStyleContainer[view.uid].gridRowEnd != coord[3])
        ) {
          this.visualStyleContainer[view.uid] = {
            gridColumnStart: coord[0],
            gridColumnEnd: coord[1],
            gridRowStart: coord[2],
            gridRowEnd: coord[3],
            zoom: 1
          };
        }
      });

      return this.visualStyleContainer;
    },


    /**
     * @method onEscape
     * @param {Event} e
     */
    onEscape(e) {
      if (this.isVisual && this.visualShowAll) {
        this.visualShowAll = false;
        e.stopPropagation();
        e.preventDefault();
      }
    },


    /**
     * Function triggered every time a container is shown (at the start of the animation) to change the URL if needed.
     * @method enter
     * @param container
     */
    enter(container) {
      //bbn.fn.log("THE CONTAINER WILL BE SHOWN: ", container);
    },


    //Tabs
    /**
     * Cuts the given string by 'maxTitleLength' property value
     * @method cutTitle
     * @param {String} title
     * @return {String}
     */
    cutTitle(title) {
      return bbn.fn.shorten(title, this.maxTitleLength)
    },


    /**
     * @method onResize
     * @return {Promise}
     */
    onResize() {
      this.keepCool(() => {
        let m = this.setResizeMeasures();
        let c = this.setContainerMeasures();
        if (m || c) {
          this.$emit('resize');
        }
        if (this.isVisual && (this.orientation === 'auto') && !this.lockedOrientation) {
          this.visualOrientation = this.lastKnownWidth > this.lastKnownHeight ? 'left' : 'top';
        }
      }, 'resize', 50);
    },


    slashToHyphen(str) {
      return bbn.fn.replaceAll('/', '-', str);
    }
  },
}