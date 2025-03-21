/**
 * @file bbn-browser component
 * @description bbn-browser
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @ignore
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   */
  mixins: [bbn.cp.mixins.basic],
  props: {
    /**
    * The object source of component bbn-browser.
    * @prop {Object} Source
    */
    source: {}
  },
  data(){
    return {
      /**
      * @prop {Array} [[]] tabs
      */
      tabs: []
    }
  },
  computed: {
    /**
     * Return if the button is disabled.
     *
     * @computed isDisabled
     * @return {Boolean}
     */
    isDisabled(){
      return typeof(this.disabled) === 'function' ?
        this.disabled() : this.disabled
    }
  },
  methods: {
    /**
     * The role of the button when clicked.
     *
     * @method onClick
     * @emit click
     */
    onClick(e){
      if ( this.url ){
        bbn.fn.link(this.url);
      }
      else{
        this.$emit('click', e);
      }
    }
  },
  components: {
    /**
    * @component tab
    */
    tab: {
      template: `
<div class="bbn-overlay">
<div class="bbn-flex-height">
  <div class="bbn-w-100">
    <div class="bbn-flex-width">
      <div class="bbn-block">
        <span bbn-if="ssl" class="bbn-green">
          <i class="nf nf-fa-lock"></i>
        </span>
        <span bbn-else class="bbn-red">
          <i class="nf nf-fa-unlock"></i>
        </span>
      </div>
      <div class="bbn-flex-fill">
        <bbn-input bbn-model="url" class="bbn-w-100" @keydown="onKeydown"></bbn-input>
      </div>
    </div>
  </div>
  <div class="bbn-flex-fill">
    <iframe bbn-if="realURL" class="bbn-overlay" src="rawURL"></iframe>
    <div bbn-else class="bbn-overlay">

    </div>
  </div>
</div>
</div>
      `,
      data(){
        return {
          /**
           * @data {Boolean} [false] ssl
           */
          ssl: false,
          /**
           * @data {String} ['home'] url
           */
          url: 'home',
          /**
           * @data {String} [null] rawURL
           */
          rawURL: null,
          /**
           * @data {String} [null] realURL
           */
          realURL: null
        }
      },
      methods: {
        /**
         * @method onKeydown
         * @param e
         */
        onKeydown(e){
          bbn.fn.log("ON KEYDOWN BVROWSER", e)
        }
      }
    }
  }
};

import cpHtml from './browser.html';
import cpStyle from './browser.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/browser.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-browser',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
