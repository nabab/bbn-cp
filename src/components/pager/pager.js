/**
 * @file bbn-pager component
 * @description bbn-pager is a component to manage the pagination of a pageable component.
 * @author BBN Solutions
 * @copyright BBN Solutions
 */
return {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
      /**
       * The element to bond with
       * @props {bbnCp} element
       */
      element: {
        type: [Object, bbnCp],
        default() {
          return this.$parent;
        }
      },
      /**
       * False if you wanto to see the arrows instead of the buttons
       * @prop {Boolean} [true] buttons
       */
      buttons: {
        type: Boolean,
        default: true
      },
      /**
       * Force to render as mobile
       * @prop {Boolean} [false] forceMobile
       */
      forceMobile: {
        type: Boolean,
        default: false
      },
      /**
       * Force to render as tablet
       * @prop {Boolean} [false] forceTablet
       */
      forceTablet: {
        type: Boolean,
        default: false
      },
      /**
       * The name of the `page` word as used in the pager interface.
       * @prop {String} ['Page'] pageName
       */
      pageName: {
        type: String,
        default: bbn._("page")
      },
      /**
       * The name of the `record` word as used in the pager interface.
       * @prop {String} ['Record(s)'] itemName
       */
      itemName: {
        type: String,
        default: bbn._("records")
      },
      /**
       * The extra controls part on the right.
       * @prop {Boolean} [true] extraControls
       */
      extraControls: {
        type: Boolean,
        default: true
      },
      /**
       * False if you wanto to hide the limit selector
       * @prop {Boolean} [true] limit
       */
      limit: {
        type: Boolean,
        default: true
      },
      /**
       * Shows the bbn-numeric field for selecting the page
       * @prop {Boolean} [true] numericSelector
       */
       numericSelector: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        numericTimeout: false
      }
    },
    computed: {
      currentPage: {
        get(){
          return this.element?.currentPage;
        },
        set(v) {
          if (this.element) {
            this.element.currentPage = v;
          }
        }
      },
      currentNumericPage: {
        get(){
          return this.element?.currentPage;
        },
        set(v) {
          if (this.element) {
            this.element.currentPage = parseInt(v);
          }
        }
      },
      numPages: {
        get(){
          return this.element?.numPages;
        },
        set(v) {
          if (this.element) {
            this.element.numPages = v;
          }
        }
      }
    },
    methods: {
      updatePager() {
      },
      /**
       * @method firstPage
       */
      firstPage(){
        if (this.element
          && ('currentPage' in this.element)
          && (this.element.currentPage !== 1)
        ){
          this.element.currentPage = 1;
        }
      },
      /**
       * @method nextPage
       */
      nextPage(){
        if (this.element
          && ('currentPage' in this.element)
          && ('numPages' in this.element)
          && (this.element.currentPage < this.element.numPages)
        ){
          this.element.currentPage++;
        }
      },
      /**
       * @method prevPage
       */
      prevPage(){
        if (this.element
          && ('currentPage' in this.element)
          && (this.element.currentPage > 1)
        ){
          this.element.currentPage--;
        }
      },
      /**
       * @method lastPage
       */
      lastPage(){
        if (this.element
          && ('currentPage' in this.element)
          && ('numPages' in this.element)
          && (this.element.currentPage !== this.element.numPages)
        ){
          this.element.currentPage = this.element.numPages;
        }
      }
    },
    /**
     * @event created
     */
    created(){
      if (this.forceMobile){
        this.isMobile = true;
      }
      if (this.forceTablet){
        this.isTablet = true;
      }
    },
    /**
     * @event mounted
     */
    mounted(){
      if (this.element && (this.element instanceof bbnCp)) {
        if (this.element.ready && !this.ready){
          this.ready = true;
        }
        else {
          this.element.$on('ready', () => {
            this.ready = true;
          })
        }

        this.element.$on('dataloaded', this.updatePager);
      }
    },
    beforeDestroy() {
      if (this.element) {
        this.element.$off('dataloaded', this.updatePager);
      }
    },
    watch: {
      element(v, oldV) {
        bbn.fn.log(v, oldV);
        alert("ELE");
        if (v && (v instanceof bbnCp)) {
          this.ready = true;
        }
      },
      currentPage(v) {
        if (this.currentNumericPage !== v) {
          this.currentNumericPage = v;
        }
      },
      currentNumericPage(v){
        if (this.numericTimeout) {
          clearTimeout(this.numericTimeout);
        }
        this.numericTimeout = setTimeout(() => {
          if (this.currentPage !== v) {
            this.currentPage = v;
          }
        }, 500);
      }
    }
  };
