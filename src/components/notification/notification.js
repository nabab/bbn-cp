/**
 * @file bbn-notification component
 * @description bbn-notification is a component that allows the display of a brief information message, for example to confirm the success of an action that has taken place.
 * @author BBN Solutions
 * @copyright BBN Solutions
 * @created 11/01/2017
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
      /**
       * @prop {Number}, [5000] delay
       */
      delay: {
        type: Number,
        default: 5000
      },
      /**
       * @prop {String}, ['bottom-left'] position
       */
      position: {
        type: String,
        default: 'bottom-right'
      },
      /**
       * @prop {String|Function}, ['Success'] successMessage
       */
      successMessage: {
        type: [String, Function],
        default(){
          return bbn._('Success');
        }
      },
      /**
       * @prop {String|Function}, ['Warning'] warningMessage
       */
      warningMessage: {
        type: [String, Function],
        default(){
          return bbn._('Warning');
        }
      },
      /**
       * @prop {String|Function}, ['Error'] errorMessage
       */
      errorMessage: {
        type: [String, Function],
        default(){
          return bbn._('Error');
        }
      },
      /**
       * @prop {String|Function}, ['Info'] infoMessage
       */
      infoMessage: {
        type: [String, Function],
        default(){
          return bbn._('Info');
        }
      },
      /**
       * @prop {String|Boolean}, ['nf nf-fa-check_square'] successIcon
       */
      successIcon: {
        type: [String, Boolean],
        default: 'nf nf-fa-check_square'
      },
      /**
       * @prop {String|Boolean}, ['nf nf-fa-warning'] warningIcon
       */
      warningIcon: {
        type: [String, Boolean],
        default: 'nf nf-fa-warning'
      },
      /**
       * @prop {String|Boolean}, ['nf nf-fa-exclamation_circle'] errorIcon
       */
      errorIcon: {
        type: [String, Boolean],
        default: 'nf nf-fa-exclamation_circle'
      },
      /**
       * @prop {String|Boolean}, ['nf nf-md-information'] infoIcon
       */
      infoIcon: {
        type: [String, Boolean],
        default: 'nf nf-md-information'
      },
      /**
       * The source of the component.
       * @prop {Array} [[]] source
       */
      source: {
        type: Array,
        default(){
          return [];
        }
      },
      /**
       * @prop {Number} [10] zIndex
       */
       zIndex: {
        type: Number,
        default: 10
      },
      /**
       * @prop {HTMLElement} container
       */
      container: {
        type: HTMLElement
      }
    },
    data(){
      let bits = this.position.split('-');
      let pos = {
        v: {
          top: false,
          bottom: true
        },
        h: {
          left: false,
          right: true
        }
      };
      bbn.fn.each(bits, bit => {
        bbn.fn.iterate(pos, (o, dir) => {
          if ( o[bit.toLowerCase()] !== undefined){
            bbn.fn.iterate(o, (b, k) => {
              if ( bit === k ){
                pos[dir][k] = true;
              }
              else{
                pos[dir][k] = false;
              }
            });
          }
        });
      });
      return {
        /**
         * @data {Array} [[]] items
         */
        items: this.source,
        /**
         * @data {Boolean} isTop
         */
        isTop: pos.v.top,
        /**
         * @data {Boolean} isLeft
         */
        isLeft: pos.h.left
      };
    },
    computed: {
      isTop() {
        return this.position.indexOf('top') > -1;
      },
      isBottom() {
        return this.position.indexOf('bottom') > -1;
      },
      isLeft() {
        return this.position.indexOf('left') > -1;
      },
      isRight() {
        return this.position.indexOf('right') > -1;
      }
    },
    methods: {
      /**
       * @method onFloaterResize
       * @param {Object} obj
       * @fires $nextTick
       */
      onFloaterResize(obj){
        this.$nextTick(() => {
         obj.adding = true;
        })
      },
      /**
       * @method _sanitize
       * @param {Object} obj
       * @param {String} type
       * @param {Number} timeout
       * @return {Object}
       */
      _sanitize(obj, type, timeout){
        if (!bbn.fn.isObject(obj) || (!obj.id)) {
          if ( typeof obj === 'string' ){
            obj = {content: obj};
          }
          else if ( !obj ){
            obj = {};
          }
          if ( !obj.type ){
            if (type) {
              obj.type = type;
            }
            else {
              //obj.type = 'info';
            }
          }
          let id = (new Date()).getTime() + bbn.fn.randomString(10);
          obj.id = id;
          obj.num = 1;
          if ( !obj.content && this[type + 'Message'] ){
            obj.content = bbn.fn.isFunction(this[type + 'Message']) ? this[type + 'Message'](obj) : this[type + 'Message']
          }
          if ( !obj.content ){
            obj.content = '';
          }
          if ( timeout && !obj.delay ){
            obj.delay = timeout > 500 ? timeout : timeout * 1000;
          }
          else{
            obj.pinned = true;
          }
          if (obj.icon !== false) {
            if ((obj.icon === undefined) && obj.type && this[obj.type + 'Icon']) {
              obj.icon = this[obj.type + 'Icon'];
            }
          }
        }
        return obj;
      },
      /**
       * @method add
       * @param {Object} o
       */
      add(o) {
        o = this._sanitize(o);
        let idx = bbn.fn.search(this.items, {
          content: o.content,
          type: o.type,
          icon: o.icon,
        });
        if (idx > -1) {
          this.items[idx].num++;
          if (idx !== (this.items.length - 1)) {
            this.items.push(...this.items.splice(idx, 1));
          }
        }
        else {
          o.adding = false;
          this.items.push(o);
          this.$forceUpdate();
          setTimeout(() => {
            this.$nextTick(() => {
              if (o.delay) {
                setTimeout(() => {
                  this.close(o.id);
                }, o.delay);
              }
            });
          }, 250)
        }


      },
      /**
       * @method close
       * @param {Number} id
       */
      close(id, callCallback){
        let idx = bbn.fn.search(this.items, {id: id});
        if ( idx > -1 ){
          if (callCallback && this.items[idx].onClose && bbn.fn.isFunction(this.items[idx].onClose)){
            this.items[idx].onClose(this.items[idx]);
          }
          this.items[idx].closing = true;
          setTimeout(() => {
            this.items.splice(idx, 1);
          }, 250);
        }
      },
      /**
       * @method success
       * @param {Object} o
       * @param {Number} timeout
       * @fires _sanitize
       * @fires add
       */
      success(o, timeout){
        if ( !timeout ){
          timeout = this.delay;
        }
        o = this._sanitize(o, 'success', timeout);
        this.add(o);
      },
      /**
       * @method error
       * @param {Object} o
       * @param {Number} timeout
       * @fires _sanitize
       * @fires add
       */
      error(o, timeout){
        o = this._sanitize(o, 'error', timeout);
        this.add(o);
      },
      /**
       * @method warning
       * @param {Object} o
       * @param {Number} timeout
       * @fires _sanitize
       * @fires add
       */
      warning(o, timeout){
        o = this._sanitize(o, 'warning', timeout);
        this.add(o);
      },
      /**
       * @method show
       * @param {Object} o
       * @param {String} type
       * @param {Number} timeout
       * @fires _sanitize
       * @fires add
       */
      show(o, type, timeout){
        o = this._sanitize(o, type, timeout);
        this.add(o);
      },
      /**
       * @method info
       * @param {Object} o
       * @param {Number} timeout
       * @fires _sanitize
       * @fires add
       */
      info(o, timeout){
        o = this._sanitize(o, 'info', timeout);
        this.add(o);
      },
    }
  };

import cpHtml from './notification.html';
import cpStyle from './notification.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/notification.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-notification',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
