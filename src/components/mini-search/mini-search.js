/**
 * @file bbn-mini-search component
 *
 * @description
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 *
 * @created 10/02/2017.
 */

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.events
   * @mixin bbn.cp.mixins.input
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.keynav
   * @mixin bbn.cp.mixins.url
   * @mixin bbn.cp.mixins.dropdown
    */
  mixins:
  [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.events,
    bbn.cp.mixins.input,
    bbn.cp.mixins.resizer,
    bbn.cp.mixins.list,
    bbn.cp.mixins.keynav,
    bbn.cp.mixins.url,
    bbn.cp.mixins.dropdown
  ],
  props: {
    /**
     * @prop {Boolean} [false] filterselection
     */
    filterselection: {
      default: false
    },
    /**
     * Defines if the search is filterable.
     * @prop {Boolean} [true] filterable
     */
    filterable: {
      type: Boolean,
      default: true
    },
    /**
     * Set to true will automatically update the data before mount.
     * @prop {Boolean} [false] autobind
     */
    autobind: {
      default: true
    },
    /**
     * Defines if the search can have a null value.
     * @prop {Boolean} [true] nullable
     */
    nullable: {
      default: true
    },
    /**
     * Defines the min length of the filter string.
     * @prop {Number} [1] minLength
     */
    minLength: {
      type: Number,
      default: 1
    },
    /**
     * Defines the left icon of the search.
     * @prop {Boolean|String} [false] leftIcon
     */
    leftIcon: {
      default: false
    },
    /**
     * Defines the right icon of the search.
     * @prop {Boolean|String} ['nf nf-fa-search'] rightIcon
     */
    rightIcon: {
      default: 'nf nf-fa-search'
    },
    /**
     * Defines the min width of the input.
     * @prop {String} ['4,2rem'] minWidth
     */
    minWidth: {
      default: '4.2rem'
    },
    /**
     * Defines the max width of the input.
     * @prop {String} ['100%'] maxWidth
     */
    maxWidth: {
      default: '100%'
    },
    /**
     * Defines the delay before the component starts to search.
     * @prop {Number} [500] delay
     */
    delay: {
      type: Number,
      default: 20
    },
    /**
     * @prop {String} ['?'] shortPlaceholder
     */
    shortPlaceholder: {
      type: String,
      default: '?'
    },
    /**
     * Delay to auto-hide the results when mouse out (or false to not auto-hide).
     * @prop {Boolean|Number} [1500] autohide
     */
    autohide: {
      type: [Boolean, Number],
      default: 1500
    },
    /**
     * The name of the property to be used as action to execute when selected.
     * @prop {String} sourceAction
     */
    sourceAction: {
      type: [String, Function],
      default: 'action'
    },
    /**
     * The URL where to send the selected result.
     * @prop {String} selectUrl
     */
    selectUrl: {
      type: String
    },
    /**
     * An array of javascript search functions
     * @prop {Array} searchFunctions
     */
    searchFunctions: {
      type: Array,
      default(){
        return [];
      },
      validator(a) {
        let ok = true;
        bbn.fn.each(a, f => {
          if (!bbn.fn.isFunction(f)) {
            ok = false;
            return false;
          }
        });
        return ok;
      }
    }
  },
  data() {
    return {
      isOpened: true,
      /**
       * The current min width.
       * @data {String} ['4.2rem'] specialWidth
       */
      specialWidth: this.minWidth,
      /**
       * The placeholder.
       * @data {String} ['?'] currentPlaceholder
       */
      currentPlaceholder: this.shortPlaceholder,
      /**
       * The timeout.
       * @data {Number|null} [null] timeout
       */
      timeout: null,
      /**
       * @data {Number|null} [null] mouseTimeout
       */
      mouseTimeout: null,
      /**
       * @data {Array} [null] registeredFunctions
       */
      registeredFunctions: this.searchFunctions.slice()
    };
  },
  computed: {
    isNullable(){
      return this.nullable && this.isActive;
    },
    isDisabled(){
      return !!this.disabled;
    },
    /**
     * Returns the component object.
     * @computed realComponent
     * @memberof listComponent
     */
    searchComponent(){
      let cp = bbn.fn.isString(this.component) || (bbn.fn.isObject(this.component) && Object.keys(this.component).length) ? this.component : null;
      if (!cp) {
        cp = {
          props: ['source'],
          data(){
            return this.source;
          },
          template: `<component :is="source.component || 'div'" :source="source"></component>`,
        };
      }
      return cp;
    },
    currentIcon(){
      return '';
    }
  },
  methods: {
    /**
     * Register a new search function
     * @method registerFunction
     * @param {Function} fn
     */
    registerFunction(fn) {
      if (!bbn.fn.isFunction(fn)) {
        throw new Error(bbn._("%s takes a function as argument", "registerFunction"));
      }

      let signature = bbn.fn.md5(fn.toString());
      if (!bbn.fn.getRow(this.registeredFunctions, {signature: signature})) {
        this.registeredFunctions.push({
          signature: signature,
          fn: fn
        });
      }
    },
    /**
     * Unregister a search function
     * @method registerFunction
     * @param {Function} fn
     */
      unregisterFunction(fn) {
      let idx = this.registeredFunctions.indexOf(fn);
      if (idx > -1) {
        this.registeredFunctions.splice(idx, 1);
      }
    },
    /**
     * Emits the event 'select'
     * @method select
     * @param {Object} item
     * @param {Number} idx
     * @param {Number} dataIndex
     * @emit change
     */
    select(item, idx, dataIndex, ev){
      if (!this.isDisabled) {
        if (!ev) {
          ev = new Event('select', {cancelable: true});
        }
        this.$emit('select', ev, item, idx, dataIndex);
        if (!ev.defaultPrevented) {
          if (this.sourceAction && item[this.sourceAction]) {
            if ( typeof(item[this.sourceAction]) === 'string' ){
              if ( bbn.fn.isFunction(this[item[this.sourceAction]]) ){
                this[item[this.sourceAction]]();
              }
            }
            else if (bbn.fn.isFunction(item[this.sourceAction]) ){
              if (this.actionArguments) {
                item[this.sourceAction](...this.actionArguments);
              }
              else {
                item[this.sourceAction](idx, item.data);
              }
            }
          }
          else if (this.sourceUrl && item[this.sourceUrl]) {
            let url = bbn.fn.isFunction(this.sourceUrl) ?
              this.sourceUrl(item, idx, dataIndex)
              : item[this.sourceUrl];
            if (url) {
              bbn.fn.link(url);
            }
          }

          if (this.selectUrl) {
            bbn.fn.post(this.selectUrl, {
              data: item,
              id: this.searchId
            }, d => {
              bbn.fn.log("RESULT OF SELECT URL", d);
            })
          }

          this.isOpened = false;
          this.filterString = '';
        }
      }
    },
    /**
     * States the role of the enter key on the dropdown menu.
     *
     * @method _pressEnter
     * @fires resetDropdown
     * @fires keynav
     *
     */
    onKeydown(e){
      if (e.key === 'Enter') {
        let list = this.getRef('list');
        if (!!list) {
          list = list.getRef('list');
        }
        if (list && bbn.fn.isNumber(list.overIdx)) {
          list.select(list.overIdx);
        }
      }
      if ((e.key === ' ') || this.commonKeydown(e)) {
        return;
      }
      if (e.key === 'Escape') {
        this.isOpened = false;
        this.filterString = '';
      }
      else if (bbn.var.keys.upDown.includes(e.keyCode)) {
        this.keynav(e);
      }
    },
    async updateData() {
      if (this.beforeUpdate() !== false) {
        this._dataPromise = new Promise(resolve => {
          let loadingRequestID;
          if (this.loadingRequestID) {
            bbn.fn.abort(this.loadingRequestID);
            setTimeout(() => {
              this.loadingRequestID = false;
              this.updateData().then(() => {
                resolve();
              })
            }, 50);
            return;
          }

          this.isLoading = true;
          this.$emit('startloading');
          let data = this.getData();
          loadingRequestID = bbn.fn.getRequestId(this.source, data);
          this.loadingRequestID = loadingRequestID;
          this.post(this.source, data).then(d => {
            if (!this.loadingRequestID || (this.loadingRequestID !== loadingRequestID)) {
              this.isLoading = false;
              this.loadingRequestID = false;
              throw new Error("No loading request");
            }

            this.isLoading = false;
            this.loadingRequestID = false;

            if ( !d ){
              return;
            }

            if ( d.status !== 200 ){
              d.data = undefined;
            }
            else {
              d = d.data;
            }

            this.$emit('datareceived', d);
            if (bbn.fn.isArray(d.data) ){
              this.appendData(d.data);
            }
            this.afterUpdate();
            this.isOpened = true;
            resolve(this.currentData);
            if (!this.isLoaded) {
              this.isLoaded = true;
            }
            this.$emit('dataloaded', d);
            if (this.isAjax && d && d.next_step) {
              if (d.id && (d.data !== undefined)) {
                this.searchId = d.id;
              }
              this.getMoreData(d.next_step);
            }
          });
        }).catch(e => {
          this.isLoading = false;
          this.loadingRequestID = false;
          bbn.fn.log("ERROR", e);
        });
        return this._dataPromise;
      }
    },
    appendData(data) {
      bbn.fn.each(this.treatData(data), a => {
        let todo = true;
        if (a.data.hash) {
          let row = bbn.fn.filter(this.currentData, r => r.data.hash === a.data.hash);
          if (row.length && (row[0].data.score && a.data.score)) {
            todo = false;
            row[0].data.score += a.data.score;
          }
        }

        if (todo) {
          this.currentData.push(a);
        }
      });
      bbn.fn.order(this.currentData, 'data.score', 'desc');
      this.updateIndexes();
    },

    getMoreData(step = 0) {
      if (this.isAjax) {
        this.isLoading = true;
        this.$emit('startloading');
        let data = this.getData();
        data.step = step;
        this.loadingRequestID = bbn.fn.getRequestId(this.source, data);
        this.isLoading = true;
        this.post(this.source, data, d => {
          this.isLoading = false;
          this.loadingRequestID = false;
          if (d && d.data) {
            if (d.data.length) {
              this.appendData(d.data);
            }

            if (d.next_step) {
              if (this.isOpened !== undefined) {
                if (this.isOpened) {
                  bbn.fn.log("APPEING DATA")
                  this.getMoreData(d.next_step);
                }
              }
              else {
                this.getMoreData(d.next_step);
              }
            }
          }
        });
      }
    },
    launchRegisteredFunctions(search) {
      bbn.fn.each(this.registeredFunctions, o => {
        let res = o.fn(search);
        if (bbn.fn.isArray(res) && res.length) {
          bbn.fn.each(res, r => {
            let d = bbn.fn.extend({}, r);
            delete d.score;
            if (!r.hash) {
              r.hash = bbn.fn.md5(JSON.stringify(d));
            }

            r.signature = o.signature;
          });

          this.appendData(res);
        }
      });
    }
  },
  watch: {
    isOpened(v) {
      bbn.fn.log("isOpened", this.isOpened);
      if (!v) {
        this.$emit('close');
      }
    },
    /**
     * @watch filterString
     * @param {String} v 
     */
    filterString(v){
      if (!this.ready) {
        this.ready = true;
      }

      clearTimeout(this.filterTimeout);
      if (!v.length) {
        this.isOpened = false;
      }
      if (v !== this.currentText) {
        this.emitInput(v);
        this.$emit('change', v);
        if (this.currentData.length) {
          this.currentData.splice(0);
        }

        this.launchRegisteredFunctions(v);

        this.$nextTick(() => {
          this.filterTimeout = setTimeout(() => {
            this.filterTimeout = false;
            // We don't relaunch the source if the component has been left
            if (v && (v.length >= this.minLength)) {
              this.$once('dataloaded', () => {
                this.$nextTick(() => {
                  let list = this.getRef('list');
                  if (list) {
                    list = this.find('bbn-scroll');
                    if ( list ){
                      list.onResize();
                    }
                  }
                });
              });
              this.currentFilters.conditions.splice(0, this.currentFilters.conditions.length ? 1 : 0, {
                field: this.sourceText,
                operator: 'startswith',
                value: v
              });
            }
            else {
              this.unfilter();
            }
          }, this.delay);
        })
      }
    }
  },
  mounted() {
    this.ready = true;
  }
}

import cpHtml from './mini-search.html';
import cpStyle from './mini-search.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/mini-search.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-mini-search',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
