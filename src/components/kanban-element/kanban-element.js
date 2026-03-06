"use strict";

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.keepCool
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.componentInside
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.list,
    bbn.cp.mixins.keepCool,
    bbn.cp.mixins.resizer,
    bbn.cp.mixins.componentInside
  ],
  props: {
    /**
     * @prop {Number} index
     */
    index: {
      type: Number
    },
    /**
     * @prop {Boolean} [false] collapsable
     */
    collapsable: {
      type: Boolean,
      default: false
    },
    /**
     * @prop {Boolean} [false] autoCollapse
     */
    autoCollapse: {
      type: Boolean,
      default: false
    },
    /**
     * The width
     * @prop {Number|String} ['100%'] width
     */
    width: {
      type: [Number, String],
      default: '100%'
    },
    /**
     * @prop {Boolean} [true] scrollable
     */
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {String} backgroundColor
     */
    backgroundColor: {
      type: String
    },
    /**
     * @prop {String} fontColor
     */
    fontColor: {
      type: String
    },
    /**
     * @prop {String} label
     */
    label: {
      type: String
    },
    /**
     * @prop {String|HTMLElement|Object} toolbar
     */
    toolbar: {
      type: [String, HTMLElement, Object]
    },
    /**
     * @prop {Object} toolbarSource
     */
    toolbarSource: {
      type: Object
    },
    /**
     * The options for the toolbar component
     * @prop {Object} toolbarOptions
     */
    toolbarOptions: {
      type: Object
    },
    /**
     * The options for the component
     * @prop {Object} componentOptions
     */
    componentOptions: {
      type: Object
    },
    /**
     * @prop {Boolean} [false] startHidden
     */
    startHidden: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      /**
       * @data {Boolean} isVisible
       */
      isVisible: !this.startHidden,
      /**
       * @data {Boolean} [false] collapsed
       */
      collapsed: false,
      /**
       * @data {Boolean} [false] loadingHidden
       */
      isLoadingHidden: false
    }
  },
  computed: {
    /**
     * @computed items
     */
    items(){
      if (this.pageable && (!this.isAjax || !this.serverPaging)) {
        return this.filteredData.slice().splice(this.start, this.currentLimit);
      }
      return this.filteredData;
    },
    /**
     * @computed headerVisible
     */
    headerVisible(){
      return !!this.collapsable || (this.label !== undefined) || !!this.toolbar;
    }
  },
  methods: {
    /**
     * @method setCheckCollapse
     * @param {Boolean} force
     * @fires $once
     * @fires expand
     * @fires collapse
     */
    setCheckCollapse(force){
      if (this.autoCollapse || force) {
        this.$once('dataloaded', () => {
          this.$nextTick(() => {
            if (this.filteredData.length) {
              this.expand(force);
            }
            else {
              this.collapse(force);
            }
          });
        });
      }
    },
    /**
     * @method expand
     * @param {Boolean} force
     * @emits expanded
     */
    expand(force){
      if (this.collapsable || force) {
        this.collapsed = false;
        this.$emit('expanded', this);
      }
    },
    /**
     * @method collapse
     * @param {Boolean} force
     * @emits collapsed
     */
    collapse(force){
      if (this.collapsable || force) {
        this.collapsed = true;
        this.$emit('collapsed', this);
      }
    },
    /**
     * @method expandAll
     * @fires findAll
     */
    expandAll(){
      if (!!this.component && this.currentData.length) {
        let items = this.findAll(this.component);
        bbn.fn.each(items, item => {
          item.$set(item, 'collapsed', false);
        });
      }
    },
    /**
     * @method collapsedAll
     * @fires findAll
     */
    collapseAll(){
      if (!!this.component && this.currentData.length) {
        let items = this.findAll(this.component);
        bbn.fn.each(items, item => {
          item.$set(item, 'collapsed', true);
        });
      }
    },
    updateDataBackground(){
      this.isLoadingHidden = true;
      return this.updateData(false, false).then(() => {
        this.isLoadingHidden = false;
      });
    },
    getItemKey(item){
      return item.key + '-' + bbn.fn.md5(JSON.stringify(item.data));
    }
  },
  /**
   * @event beforeMount
   * @fires setCheckCollapse
   * @emits beforemount
   */
  beforeMount(){
    if (this.collapsable) {
      this.setCheckCollapse();
    }
    this.$emit('beforemount', this);
  },
  /**
   * @event mounted
   * @fires $nextTick
   */
  mounted(){
    this.$nextTick(() => {
      this.ready = true;
    });
  },
  /**
   * @event beforeDestroy
   * @emits beforedestroy
   */
  beforeDestroy(){
    this.$emit('beforedestroy', this);
  },
  watch: {
    /**
     * @watch data
     * @fires updateData
     */
    data: {
      deep: true,
      handler(){
        this.updateData();
      }
    },
    /**
     * @watch isLoaded
     * @fires $once
     */
    isLoaded: {
      immediate: true,
      handler(newVal){
        if (this.startHidden) {
          this.$once('dataloaded', () => {
            this.isVisible = true;
          });
        }
      }
    },
    /**
     * @watch currentPage
     * @fires closest
     * @fires $once
     */
    currentPage(newVal){
      if (!this.scrollable) {
        let externalScroll = this.closest('bbn-scroll');
        if (externalScroll && externalScroll.hasScrollY) {
          this.$once('dataloaded', () => {
            externalScroll.scrollSet(null, this.$el);
          })
        }
      }
    }
  }
}
import cpHtml from './kanban-element.html';
import cpStyle from './kanban-element.less';
import cpLang from './_i18n/index.js';
import bbn from '@bbn/bbn';

export default {
  name: 'bbn-kanban-element',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
