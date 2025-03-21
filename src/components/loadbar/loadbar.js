/**
 * @file bbn-loadbar component
 *
 * @description bbn-loadbar component is a simple implementation component, it represents a bar with a display of wait state of a user-defined file.
 * Next to the loading icon, you'll find the path of the file from which the response is expected.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 *
 * @created 15/02/2017
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic 
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
      //@todo not used
      encoded: {
        type: Boolean,
        default: true
      },
      //@todo not used
      position: {
        type: Object,
        default(){
          return {
            position: {
              bottom: 5,
              right: 5
            }
          };
        }
      },
      /**
       * The source of the component
       * @prop {Array} source
       */
      source: {
        type: Array
      },
      //@todo not used
      history: {
        type: Number,
        default: 100
      },
    },
    data(){
      return {
        /**
         * @data {Boolean} isLoading
         */
        isLoading: false,
        //@todo not used
        isSuccess: false,
        //@todo not used
        isError: false,
        /**
         * @data {String} [''] text
         */
        text: '',
        //@todo not used
        selected: 0,
        //@todo not used
        numLoaded: 0,
        /**
         * @data {Boolean} [false] info
         */
        info: false,
         /**
         * @data {Boolean} [false] interval
         */
        interval: false,
         /**
         * @data {Boolean} [false] timeNow
         */
        timeNow: false,
        link: ''
      };
    },
    computed: {
      /**
       * @computed loadingItems 
       * @return {Array}
       */
      loadingItems(){
        return bbn.fn.filter(this.source, {loading: true})
      },
       /**
       * @computed loadedItems 
       * @return {Array}
       */
      loadedItems(){
        return bbn.fn.filter(this.source, {loading: false})
      },
      /**
       * @computed items
       * @return {Array}
       */
      items(){
        return [...this.loadingItems, ...this.loadedItems]
      },
      /** 
       * @computed currentItem
       * @return {Object|Boolean}
      */
      currentItem() {
        return this.loadingItems[0] || this.loadedItems[0] || false;
      },

    },
    methods: {
      duration(item){
        return this.timeNow - item.start;
      },
      contextMenu(item) {
        let res =  [{
          text: bbn._("Copy URL"),
          icon: 'nf nf-md-content_copy',
          action() {
            bbn.fn.copy(item.url);
            appui.success(bbn._("Copied"));
          }
        }];

        if (item.loading) {
          res.push({
            text: bbn._("abort"),
            icon: 'nf nf-md-cancel',
            action: () => {
              this.cancel(item);
            }
          });
        }

        return res;
      },
      /**
       * Return the duration in seconds or milliseconds of a request
       * @method renderDuration
       * @param {Number} d
       * @return {Number}
       */
      renderDuration(d){
        let tmp = d / 1000;
        if ( tmp < 10){
          return tmp.toFixed(3)+ ' s';
        }
        else {
          return parseInt(tmp) + ' s';
        }
      },
      /**
       * Aborts the selected request
       * @method cancel
       * @param {Object} item 
       */
      cancel(item){
        if (item.loading) {
          this.confirm(bbn._("Are you sure you want to abort this request?"), d => {
            bbn.fn.abort(item.key);
          })
        }
      },
      //@todo not used
      deleteHistory(){
        let tmp = [];
        bbn.fn.each(this.data, a => {
          if ( a.isLoading ){
            tmp.push(a);
          }
        });
        this.data = tmp;
      },
      /**
       * Opens the given link
       * @method go
       */
       go(){
        if (this.link) {
          bbn.fn.link(this.link);
          this.hide();
        }
      },
      /**
       * Shows the information panel
       * @method show
       */
      show() {
        this.info = true;
      },
      /**
       * Hides the information panel
       * @method hide
       */
      hide() {
        this.info = false;
      }
    },
    watch: {
      info(v) {
        if (this.interval) {
          clearInterval(this.interval);
        }

        if (v) {
          this.timeNow = bbn.fn.timestamp();
          this.interval = setInterval(() => {
            if (this.info) {
              this.timeNow = bbn.fn.timestamp();
            }
          }, 300);
        }
      }
    },
    /**
     * @event mounted
     */
    mounted() {
      if (this.info) {
        this.interval = setInterval(() => {
          if (this.info) {
            this.timeNow = bbn.fn.timestamp();
          }
        }, 300);
      }
    },
    /**
     * @event beforeDestroy
     */
    beforeDestroy() {
      if (this.info) {
        clearInterval(this.interval)
      }
    }
  };

import cpHtml from './loadbar.html';
import cpStyle from './loadbar.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/loadbar.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-loadbar',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
