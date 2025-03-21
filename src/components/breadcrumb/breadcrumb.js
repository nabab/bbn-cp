/**
  * @file bbn-breadcrumb component
  * @description bbn-breadcrumb
  * @copyright BBN Solutions
  * @author Mirko Argentino mirko@bbn.solutions
  * @created 10/03/2020
  * @ignore
  */
const cpDef = {
  mixins: [
    /**
     * @mixin bbn.cp.mixins.basic
     */
    bbn.cp.mixins.basic,
    /**
     * @mixin bbn.cp.mixins.resizer
     */
    bbn.cp.mixins.resizer,
    /**
     * @mixin bbn.cp.mixins.localStorage
     */
    bbn.cp.mixins.localStorage,
    /**
     * @mixin bbn.cp.mixins.close
     */
    bbn.cp.mixins.close,
    /**
     * @mixin bbn.cp.mixins.observer
     */
    bbn.cp.mixins.observer
  ],
  props: {
    /**
     * @prop {Array} [true] source
     */
    source: {
      type: Array,
      reuired: true
    },
    /**
     * @prop value
     */
    value: {},
    /**
     * @prop {Boolean} [true] content
     */
    content: {
      type: Boolean,
      default: true
    },
    /**
     * Sets if the tabs' titles will be scrollable in case they have a greater width than the page (true), or if they will be shown multilines (false, default).
     * @prop {Boolean} [false] scrollable
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * The max length for a title
     * @prop {Number} maxTitleLength
     */
    maxTitleLength: {
      type: Number,
      default: 20
    },
    /**
     * @prop {Function} menu
     */
    menu: {
      type: Function
    },
    /**
     * Set it to true if you want to set this breadcrumb as a master.
     * @prop {Boolean} [false] master
     */
    master: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      /**
       * The current selected view's index.
       * @data {Number|Boolean} [false] selected
       */
      selected: false,
      /**
       * The parents breadcrumbs list.
       * @data {Array} [[]] parents
       */
      parents: [],
      /**
       * The sub-breadcrumbs list indexed by the view's url
       * @data {Object} {{}} subBreadcrumbs
       */
      subBreadcrumbs: {},
      /**
       * A list of all sub-breadcrumbs
       * @data {Array} [[]] allSubBreadcrumbs
       */
      allSubBreadcrumbs: [],
      parent: false
    }
  },
  computed: {
    /**
     * Returns the scroll configuration
     * @computed scrollCfg
     * @return {Object}
     */
    scrollCfg(){
      return this.scrollable ? {
        axis: 'x',
        container: true,
        invisible: true
      } : {};
    },
    /**
     * The master bbn-router of this breadcrumb.
     * @computed itsMaster
     * @return {HTMLElement}
     */
    router(){
      if ( this.$parent && (this.$parent.$options.name === 'bbn-router') ){
        return this.$parent;
      }
      return false;
    },
    /**
     * Returns the master bbn-breadcrumb of this one
     * @computed itsMaster
     * @return {HTMLElement}
     */
    itsMaster(){
      if ( this.master ){
        return this;
      }
      else if (
        this.router &&
        this.router.itsMaster &&
        this.router.itsMaster.itsMasterBreadcrumb
      ){
        return this.router.itsMaster.itsMasterBreadcrumb;
      }
      return bbn.fn.getRow(this.parents, {master: true})
    },
    /**
     * The list of the sub-breadcrumbs used for the render.
     * @computed currents
     * @return {Array}
     */
    currents(){
      let ret = [],
          // a way to force this computed to update itself
          sbcs = this.allSubBreadcrumbs;
      /* if ( this.router && bbn.fn.isNumber(this.router.selected) ){
        let url = this.router.views[this.router.selected].url;
        if ( this.router.urls[url] && this.subBreadcrumbs[url] ){
          ret.push(this.subBreadcrumbs[url]);
          if ( this.subBreadcrumbs[url].currents.length ){
            ret.push(...this.subBreadcrumbs[url].currents);
          }
        }
      }
      return ret; */
      return this.getCurrents(this.router.selected);
    },
    /**
     * Returns the background color used for the main bar.
     * @computed backgroundColor
     * @return {String}
     */
    backgroundColor(){
      return this.isNumber(this.selected) && this.source[this.selected] && this.source[this.selected].bcolor ? this.source[this.selected].bcolor : ''
    },
    /**
     * Returns the font color used for the main bar.
     * @computed fontcolor
     * @return {String}
     */
    fontColor(){
      return this.isNumber(this.selected) && this.source[this.selected] && this.source[this.selected].fcolor ? this.source[this.selected].fcolor : ''
    }
  },
  methods: {
    /**
     * Alias of bbn.fn.isNumber
     * @method isNumber
     * @return {Boolean}
     */
    isNumber: bbn.fn.isNumber,
    /**
     * @method register
     * @param {HTMLElement} bc
     * @param {String} url
     */
    register(bc, url){
      this.subBreadcrumbs[url] = bc;
      this.allSubBreadcrumbs.push(bc);
      if ( this.itsMaster ){
        this.itsMaster.allSubBreadcrumbs.push(bc);
      }
    },
    /**
     * @method unregister
     * @param {HTMLElement} bc
     * @param {String} url
     */
    unregister(bc, url){
      if ( this.subBreadcrumbs[url] ){
        delete this.subBreadcrumbs[url];
      }
      let idx = bbn.fn.search(this.allSubBreadcrumbs, {_uid: bc._uid});
      if ( idx !== -1 ){
        this.allSubBreadcrumbs.splice(idx, 1);
      }
      if ( this.itsMaster ){
        let idx2 = bbn.fn.search(this.itsMaster.allSubBreadcrumbs, {_uid: bc._uid});
        if ( idx2 !== -1 ){
          this.itsMaster.allSubBreadcrumbs.splice(idx2, 1);
        }
      }
    },
    getCurrents(idx){
      let ret = [];
      if ( this.router && bbn.fn.isNumber(idx) && this.router.views[idx] ){
        let url = this.router.views[idx].url;
        if ( this.router.urls[url] && this.subBreadcrumbs[url] ){
          ret.push(this.subBreadcrumbs[url]);
          if ( this.subBreadcrumbs[url].currents.length ){
            ret.push(...this.subBreadcrumbs[url].currents);
          }
        }
      }
      return ret;
    },
    /**
     * @method getMenuFn
     * @param {Number} idx
     * @return {Array}
     */
    getMenuFn(idx){
      return this.menu ? this.menu(idx) : [];
    },
    /**
     * @method close
     * @param {Number} idx
     * @param {Boolean} force
     * @fires isValidIndex
     * @emit beforeclose
     * @emit close
     */
    close(idx, force){
      if ( this.isValidIndex(idx) ){
        let ev = new CustomEvent('beforeclose', {
          cancelable: true
        });
        this.$emit('beforeclose', idx, force, ev);
        if ( !ev.defaultPrevented ){
          this.source.splice(idx, 1);
          if ( this.selected > idx ){
            this.selected--;
          }
          else if ( this.selected === idx ){
            this.selected = false;
          }
          this.$emit('close', idx, force);
        }
      }
    },
    /**
     * @method closeAll
     * @fires close
     */
    closeAll(){
      for ( let i = this.source.length - 1; i >= 0; i-- ){
        if ( !this.source[i].fixed && !this.source[i].pinned ){
          this.close(i);
        }
      }
    },
    /**
     * @method closeAllBut
     * @fires close
     */
    closeAllBut(idx){
      for ( let i = this.source.length - 1; i >= 0; i-- ){
        if ( !this.source[i].fixed && !this.source[i].pinned && (i !== idx) ){
          this.close(i);
        }
      }
    },
    /**
     * @method isvalidIndex
     * @return {Boolean}
     */
    isValidIndex(idx){
      return bbn.fn.isNumber(idx) && (this.source[idx] !== undefined);
    },
    /**
     * Returns the breadcrumb's source list.
     * @method getList
     * @param {HTMLElement} bc
     * @fires close
     * @return {Array}
     */
    getList(bc){
      if ( !bc ){
        bc = this;
      }
      let list = [],
          parents = bc.itsMaster && (bc !== bc.itsMaster) ? bc.getParents() : [];
      bbn.fn.each(bc.source, (t, i) => {
        if ( !t.invisible && (i !== bc.selected) ){
          list.push({
            text: t.label,
            icon: t.icon,
            key: t.url,
            bcolor: t.bcolor,
            fcolor: t.fcolor,
            fixed: t.fixed,
            parents: parents,
            children: bc.getCurrents(i),
            action: () => {
              bc.selected = t.idx;
            },
            closeAction: () => {
              bc.close(t.idx)
            }
          })
        }
      });
      return list;
    },
    /**
     * @method getParents
     * @return {Array}
     */
    getParents(){
      return this.parent ? [...this.parent.getParents(), this.parent] : []
    },
    /**
     * @method openMenu
     * @param {Event} ev
     */
    openMenu(ev){
      let ele = ev.target.parentElement.parentElement,
          e = new MouseEvent("contextmenu", {
            bubbles: true,
            cancelable: true,
            view: window
          });
      ele.dispatchEvent(e);
    }
  },
  /**
   * @event mounted
   */
  mounted(){
    if ( !this.master ){
      bbn.fn.each(this.ancestors('bbn-breadcrumb'), b => {
        this.parents.push(b);
        if ( b.master ){
          return false;
        }
      });
    }
    if ( bbn.fn.isNumber(this.value) ){
      this.selected = this.value;
    }
    this.$nextTick(() => {
      if ( !this.master && this.router ){
        this.parent = this.router.parent.itsBreadcrumb;
        this.router.parent.itsBreadcrumb.register(
          this,
          bbn.fn.substr(this.router.baseURL, 0, this.router.baseURL.length - 1)
        );
      }
    })
    this.ready = true;
  },
  /**
   * @event beforeDestroy
   */
  beforeDestroy(){
    if (
      !this.master &&
      this.router &&
      this.router.parent &&
      this.router.parent.itsBreadcrumb
    ){
      this.router.parent.itsBreadcrumb.unregister(
        this,
        bbn.fn.substr(this.router.baseURL, 0, this.router.baseURL.length - 1)
      );
    }
  },
  watch: {
    /**
     * @watch selected
     * @emit select
     */
    selected(newVal, oldVal){
      if ( newVal !== oldVal ){
        this.$emit('select', newVal);
      }
    },
    /**
     * @watch value
     */
    value(newVal, oldVal){
      if ( newVal !== oldVal ){
        this.selected = newVal
      }
    }
  },
  components: {
    /**
     * @component listItem
     */
    listItem: {
      template: `
<span class="bbn-w-100 bbn-vxspadding bbn-hspadding">
<span class="bbn-flex-width bbn-vmiddle">
  <span class="text bbn-flex-fill">
    <template bbn-for="p in source.parents">
      <span :style="{
              backgroundColor: p.source[p.selected].bcolor || false,
              color: p.source[p.selected].fcolor || false
            }"
            class="bbn-hxspadding">
        <i bbn-if="p.source[p.selected].icon"
            :class="p.source[p.selected].icon"/>
        <span bbn-html="p.source[p.selected].label || '` + bbn._('Untitled') + `'"/>
      </span>
      <i class="nf nf-fa-angle_right bbn-hsmargin bbn-large bbn-breadcrumb-arrow"/>
    </template>
    <span :style="{
            backgroundColor: source.bcolor || false,
            color: source.fcolor || false
          }"
          class="bbn-hxspadding">
      <i bbn-if="source.icon"
          class="source.icon"/>
      <span bbn-html="source.text || '` + bbn._('Untitled') + `'"/>
    </span>
    <template bbn-for="(c, i) in source.children">
      <i class="nf nf-fa-angle_right bbn-hsmargin bbn-large bbn-breadcrumb-arrow"/>
      <span :style="{
              backgroundColor: c.source[c.selected].bcolor || false,
              color: c.source[c.selected].fcolor || false
            }"
            :class="['bbn-hxspadding', {'bbn-b': !!source.children[i+1]}]">
        <i bbn-if="c.source[c.selected].icon"
            class="c.source[c.selected].icon"/>
        <span bbn-html="c.source[c.selected].label || '` + bbn._('Untitled') + `'"></span>
      </span>
    </template>
  </span>
  <span bbn-if="!source.fixed"
        class="space"
        style="text-align: right"
        @click.prevent.stop="close">
    <i class="nf nf-fa-times"/>
  </span>
</span>
</span>
      `,
      props: {
        /**
         * @prop {Object} source
         * @memberof listItem
         */
        source :{
          type: Object,
          required: true
        }
      },
      methods: {
        /**
         * @method close
         * @memberof listItem
         */
        close(){
          this.source.closeAction();
          this.closest('bbn-context').showFloater = false;
        }
      }
    }
  }
};

import cpHtml from './breadcrumb.html';
import cpStyle from './breadcrumb.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/breadcrumb.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-breadcrumb',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
