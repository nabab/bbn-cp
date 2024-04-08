/**
 * @file bbn-router component
 * @description bbn-router is a component that allows and manages the navigation (url) between the various containers of an application
 * @copyright BBN Solutions
 * @author BBN Solutions
 */

import elements from './_mixins/elements.js';
import navigation from './_mixins/navigation.js';
import registration from './_mixins/registration.js';
import panes from './_mixins/panes.js';
import views from './_mixins/views.js';
import config from './_mixins/config.js';
import search from './_mixins/search.js';
import menu from './_mixins/menu.js';
import getters from './_mixins/getters.js';
import breadcrumb from './_mixins/breadcrumb.js';
import observers from './_mixins/observers.js';
import useless from './_mixins/2move.js';
import visual from './_mixins/visual.js';
import misc from './_mixins/misc.js';
import component from './_mixins/component.js';

import listItem from './_components/listItem.js';
import searchResult from './_components/searchResult.js';

const cpDef = {
  name: 'bbn-router',
  statics() {
    // IndexedDb access for storing thumbnails in visual mode
    let db = false;
    if (bbn.db && bbn.db.ok && window.html2canvas) {
      db = true;
      if (!bbn.db._structures.bbn || !bbn.db._structures.bbn.containers) {
        bbn.db.add('bbn', 'containers', {
          keys: {
            PRIMARY: {
              columns: ['url'],
              unique: true
            }
          },
          fields: {
            url: {

            },
            image: {

            }
          }
        });
      }
    }
    return {
      db,
      possibleOrientations: [
        {
          name: 'auto',
          text: bbn._("Position automatically")
        }, {
          name: 'left',
          text: bbn._("Position on the left side")
        }, {
          name: 'top',
          text: bbn._("Position on the top side")
        }, {
          name: 'bottom',
          text: bbn._("Position on the bottom side")
        }, {
          name: 'right',
          text: bbn._("Position on the right side")
        }
      ]
    };
  },
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.localStorage
   * @mixin bbn.cp.mixins.close
   * @mixin bbn.cp.mixins.observer
   * @mixin bbn.cp.mixins.resizer
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.localStorage,
    bbn.cp.mixins.close,
    bbn.cp.mixins.observer,
    bbn.cp.mixins.resizer,
    bbn.cp.mixins.keepCool,
    elements,
    navigation,
    registration,
    panes,
    views,
    config,
    search,
    menu,
    getters,
    breadcrumb,
    observers,
    useless,
    visual,
    misc,
    component,
  ],
  methods: {
    /**
     * Alias of bbn.fn.isNumber
     * @method isNumber
     * @return {Boolean}
     */
    isNumber: bbn.fn.isNumber,
    /**
     * Alias of bbn.fn.numProperties
     * @method numProperties
     * @return {Number|Boolean}
     */
    numProperties: bbn.fn.numProperties,
  },

  /**
   * @event created
   */
  async created() {
    this.componentClass.push('bbn-resize-emitter');
  },
  /**
   * @event mounted
   * @fires getStorage
   * @fires getDefaultURL
   * @fires add
   */
  async beforeMount() {
    this.navigationInit();
    await this.viewsInit();
    this.panesCreated();
    this.navigationCreated();
    this.ready = true;
    await this.$forceUpdate();
  },
  components: {
    listItem,
    searchResult
  }
};

import bbn from '@bbn/bbn';
import cpHtml from './router.html';
import cpStyle from './router.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/router.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-router',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
