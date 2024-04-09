"use strict";

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.keepCool
   * @mixin bbn.cp.mixins.resizer
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.list,
    bbn.cp.mixins.keepCool,
    bbn.cp.mixins.resizer
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
     * @prop {String} title
     */
    title: {
      type: String
    },
    /**
     * @prop {String|bbnCp|Object} toolbar
     */
    toolbar: {
      type: [String, bbnCp, Object]
    },
    /**
     * @prop {Object} toolbarSource
     */
    toolbarSource: {
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
      collapsed: false
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
      return !!this.collapsable || (this.title !== undefined) || !!this.toolbar;
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
          if (this.filteredData.length) {
            this.expand(force);
          }
          else {
            this.collapse(force);
          }
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
    }
  },
  created(){
    if (this.startHidden) {
      this.$once('dataloaded', () => {
        this.isVisible = true;
      });
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
     * @watch currentPage
     * @fires closest
     * @fires $once
     */
    currentPage(newVal){
      if (!this.scrollable) {
        let externalScroll = this.closest('bbn-scroll');
        if (externalScroll && externalScroll.hasScrollY) {
          this.$once('dataloaded', () => {
            externalScroll.scrollTo(null, this.$el);
          })
        }
      }
    }
  }
}

import cpHtml from './column-list.html';
import cpStyle from './column-list.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/column-list.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-column-list',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
