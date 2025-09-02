/**
 * @file bbn-container component
 *
 * @description bbn-container is a uniquely identified container component that can be used by bbn-tabnav.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 *
 * @created 15/02/2017
 */

import view from './_mixins/view.js';
import menu from './_mixins/menu.js';
import toChange from './_mixins/toChange.js';
import core from './_mixins/core.js';
import visual from './_mixins/visual.js';
import display from './_mixins/display.js';
import component from './_mixins/component.js';
import selection from './_mixins/selection.js';

/**
 * @component
 * @param {string} url - The URL on which the tabNav will be initialized.
 * @param {boolean} autoload - Defines if the tab will be automatically loaded based on URLs. False by default
 * except if it is true for the parent.
 * @param {string} orientation - The position of the tabs' titles: top (default) or bottom.
 * @param {string} root - The root URL of the tabNav, will be only taken into account for the top parents'
 * tabNav, will be automatically calculated for the children.
 * @param {boolean} scrollable - Sets if the tabs' titles will be scrollable in case they have a greater width
 * than the page (true), or if they will be shown multilines (false, default).
 * @param {array} source - The tabs shown at init.
 * @param {string} current - The URL to which the tabnav currently corresponds (its selected tab).
 * @param {string} baseURL - The parent TabNav's URL (if any) on top of which the tabNav has been built.
 * @param {array} parents - The tabs shown at init.
 * @param {array} tabs - The tabs configuration and state.
 * @param {boolean} parentTab - If the tabNav has a tabNav parent, the tab Vue object in which it stands, false
 * otherwise.
 * @param {boolean|number} selected - The index of the currently selected tab, and false otherwise.
 */

const cpDef = {
  name: 'bbn-container',
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.observer
   * @mixin view
   * @mixin screenshot
   * @mixin menu
   * @mixin toChange
   * @mixin core
   * @mixin visual
   * @mixin display
   * @mixin component
   * @mixin selection
   */
  statics() {
    return {
      componentsList: []
    }
  },
  mixins: 
  [
    view,
    menu,
    toChange,
    core,
    visual,
    display,
    component,
    selection,
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.resizer, 
    bbn.cp.mixins.observer
  ],
  methods: {
    containerMounted(){
      if (this.currentView.load
        && !this.currentView.loaded
        && !this.isLoading
        && (
          this.currentView.selected
          || (
            this.isPane
            && (this.currentPane.tabs[this.currentPane.selected].url === this.currentURL)
          )
        )
      ) {
        this.$nextTick(() => {
          this.loadView(this.currentView.current).then(() => {
            this.router.updateScreenshot(this.currentIndex);
            this.selectionMounted();
          });
        });
      }
      else {
        this.router.updateScreenshot(this.currentIndex);
        this.selectionMounted();
      }
  
    }  
  },

  /**
   * @event created 
   */
  created() {
    //bbn.fn.log("CREATED " + this.url)
    this.componentClass.push('bbn-resize-emitter');
    this.componentCreated();
    const router = this.real ? this.closest('bbn-router') : this.$origin;
    if (router.$isCreated) {
      this.router = router;
    }
    else {
      router.$once('hook:beforemount', () => {
        this.router = router;
        this.$nextTick(() => {
          this.containerMounted();
        })
      }, this)
    }
  },
  /**
   * @event mounted
   * @fires router.register
   */
  mounted() {
    if (this.router) {
      this.containerMounted();
    }
  },
  /**
   * @event beforeDestroy
   * @fires router.unregister
   */
  beforeDestroy() {
    if (this.router) {
      this.router.unregister(this);
    }

    if ( this.isComponent ){
      let idx = bbnContainer.componentsList.indexOf(this.componentName);
      if ( idx > -1 ){
        bbnContainer.componentsList.splice(idx, 1);
      }
    }
  },

  watch: {
    ready(v){
      if (v) {
        if (this.onMount) {
          this.onMount(this.$el, this.source);
        }
      }
    },
  },

};

import cpHtml from './container.html';
import cpStyle from './container.less';
import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-container',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
