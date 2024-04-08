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
import screenshot from './_mixins/screenshot.js';
import menu from './_mixins/menu.js';
import temp from './_mixins/2change.js';
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
   */
  statics() {
    return {
      componentsList: []
    }
  },
  mixins: 
  [
    view,
    screenshot,
    menu,
    temp,
    core,
    visual,
    display,
    component,
    selection,
    bbn.cp.mixins.basic, 
    bbn.cp.mixins.resizer, 
    bbn.cp.mixins.observer
  ],

  /**
   * @event created 
   */
  created() {
    this.componentClass.push('bbn-resize-emitter');
    this.componentCreated();
  },
  beforeMount() {
    // The router is needed
    this.setRouter();
  },
  /**
   * @event mounted
   * @fires router.register
   */
  async mounted() {
    if ( !this.router ){
      throw Error(bbn._("bbn-container cannot be rendered without a bbn-router"));
    }

    this.screenshotMounted();
    await this.selectionMounted();
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
      let idx = bbnContainerCp.componentsList.indexOf(this.componentName);
      if ( idx > -1 ){
        bbnContainerCp.componentsList.splice(idx, 1);
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
import bbn from '@bbn/bbn';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/container.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-container',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
