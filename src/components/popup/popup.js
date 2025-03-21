
/**
 * @file bbn-popup component
 * @description bbn-popup is a component very similar to a desktop window of an operating system.
 * Inside you can show what you wish, even the components with its information.
 * Its potential lies in the fact that it emphasizes with a particular attention that portion of information that we want to see, enclosed in a window that can be opened or closed upon request.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 15/02/2017
 */

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.position
   */
  mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.position
    ],
  props: {
    /**
     * @prop {String} ['United'] united
     */
    untitled: {
      type: String,
      default(){
        return bbn._("Untitled");
      }
    },
    /**
     * @prop {Array} [[]] source
     */
    source: {
      type: Array,
      default: function () {
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
     * @prop {String} ['There was a problem...'] alertMessage
     */
    alertMessage: {
      type: String,
      default(){
        return bbn._("There was a problem") + '...';
      }
    },
    /**
     * @prop {String} ['Confirmation request] confirmTitle
     */
    confirmTitle: {
      type: String,
      default(){
        return bbn._("Confirmation request");
      }
    },
    /**
     * @prop {String} ['Are you sure?'] confirmMessage
     */
    confirmMessage: {
      type: String,
      default(){
        return bbn._("Are you sure?");
      }
    },
    /**
     * @prop {String} ['OK'] okText
     */
    okText: {
      type: String,
      default(){
        return bbn._("OK");
      }
    },
    /**
     * @prop {String} ['Yes'] yesText
     */
    yesText: {
      type: String,
      default(){
        return bbn._("Yes");
      }
    },
    /**
     * @prop {String} ['No'] noText
     */
    noText: {
      type: String,
      default(){
        return bbn._("No");
      }
    }
  },
  data() {
    return {
      /**
       * @data [false] type
       */
      type: false,
      /**
       * @data [[]] items
       */
      items: this.source
    };
  },
  computed: {
    /**
     * @computed numPopups
     * @return {Number}
     */
    numPopups() {
      return this.items.length
    },
    /**
     * @computed popus
     * @fires getObject
     * @return {Array}
     */
    popups() {
      let r = [];
      bbn.fn.each(this.items, (a, i) => {
        //r.push(this.getObject(bbn.fn.extendOut(a, {index: i})));
        r.push(this.getObject(bbn.fn.extend({}, a, {
          index: i,
          maxWidth: a.maxWidth || this.lastKnownWidth || this.lastKnownCtWidth || null,
          maxHeight: a.maxHeight || this.lastKnownHeight || this.lastKnownCtHeight || null
        })));
      });
      return r;
    },
    /**
     * @computed showPopup
     * @return {Boolean}
     */
    showPopup() {
      return this.items.length > 0;
    },
    modalStyle(){
      return {
        zIndex: this.zIndex + this.popups.length - 2
      }
    }
  },
  methods: {
    /**
     * Alias of bbn.fn.randomString
     * @method randomString
    */
    randomString: bbn.fn.randomString,
    /**
     * @method open
     * @param {Object} obj
     * @return {String|Boolean}
     */
    open(obj) {
      let d = {};
      if (typeof (obj) !== 'object') {
        for (let i = 0; i < arguments.length; i++) {
          if (!d.content && (typeof (arguments[i]) === 'string')) {
            d.content = arguments[i];
          }
          else if (bbn.fn.isDimension(arguments[i])) {
            if (!d.width) {
              d.width = arguments[i];
            }
            else if (!d.height) {
              d.height = arguments[i];
            }
          }
          else if (!d.label && (typeof (arguments[i]) === 'string')) {
            d.label = arguments[i];
          }
          else if (!d.label && (arguments[i] === false)) {
            d.label = false;
          }
          else if (bbn.fn.isFunction(arguments[i])) {
            if (!d.onOpen) {
              d.onOpen = arguments[i];
            }
            else if (!d.onClose) {
              d.onClose = arguments[i];
            }
          }
          else if (typeof (arguments[i]) === 'object') {
            d.options = arguments[i];
          }
        }
        if (!d.height) {
          d.height = false;
        }
      }
      else {
        d = obj;
      }
      if (d) {
        if (d.url) {
          return this.load(d);
        }
        if (!d.uid) {
          d.uid = 'bbn-popup-' + bbn.fn.timestamp().toString() + '-' + bbn.fn.randomString(4, 6);
        }
        d.index = this.items.length;
        this.setResizeMeasures();
        this.setContainerMeasures();
        this.items.push(d);
        //this.makeWindows();
        return d.uid;
      }
      else {
        new Error("You must give a title and either a content or a component to a popup")
      }
      return false;
    },
    /**
     * @method load
     * @param {Object} obj
     * @fires post
     * @fires makeWindows
     */
    async load(obj) {
      let d = {};
      if (typeof (obj) !== 'object') {
        for (let i = 0; i < arguments.length; i++) {
          if (!d.url && (typeof (arguments[i]) === 'string')) {
            d.url = arguments[i];
          }
          else if (bbn.fn.isDimension(arguments[i]) || (arguments[i] === 'auto')) {
            if (!d.width) {
              d.width = arguments[i];
            }
            else if (!d.height) {
              d.height = arguments[i];
            }
          }
          else if (bbn.fn.isFunction(arguments[i])) {
            if (!d.onOpen) {
              d.onOpen = arguments[i];
            }
            else if (!d.close) {
              d.onClose = arguments[i];
            }
          }
          else if (typeof (arguments[i]) === 'object') {
            if (!d.data) {
              d.data = arguments[i];
            }
            else if (!d.options) {
              d.options = arguments[i];
            }
          }
        }
        if (!d.height) {
          d.height = false;
        }
      }
      else {
        d = obj;
      }
      if (d.url) {
        return this.post(d.url, d.data || {}, r => {
          if (r.content || r.title) {
            if (r.script) {
              let tmp = eval(r.script);
              delete r.script;
              if (bbn.fn.isFunction(tmp)) {
                d.open = tmp;
              }
              // anon vuejs component initialization
              else if (typeof (tmp) === 'object') {
                bbn.fn.extendOut(tmp, {
                  //name: bbn.fn.randomString(20, 15).toLowerCase(),
                  template: '<div>' + (r.content || '') + '</div>',
                  props: ['source']
                });
                this.$options.components[tmp.name] = tmp;
                d.component = this.$options.components[tmp.name];
                d.source = r.data || [];
              }
            }

            bbn.fn.extend(d, r);
            d.label = d.title || d.label;
            delete d.title;
            delete d.url;
            delete d.data;
            if (!d.uid) {
              d.uid = 'bbn-popup-' + bbn.fn.timestamp().toString();
            }
            d.index = this.items.length;
            this.setResizeMeasures();
            this.setContainerMeasures();
            this.items.push(d);
            this.makeWindows();
          }
        })
      }
      else {
        new Error("You must give a URL in order to load a popup")
      }
    },
    /**
     * @method onClose
     * @param {Number} index
     */
    onClose(index) {
      this.items.splice(index, 1);
    },
    /**
     * @method getObject
     * @param {Object} a
     * @return {Object}
     */
    getObject(a) {
      if (!a.uid) {
        a.uid = 'bbn-popup-' + bbn.fn.timestamp().toString()
      }
      if (a.closable === undefined) {
        a.closable = true;
      }
      if ((a.label === undefined) && this.untitled) {
        a.label = this.untitled;
      }
      if (a.drag === undefined) {
        a.drag = true;
      }
      return a;
    },
    /**
     * @method loading
     * @fires open
     * @return {String|Boolean}
     */
    loading() {
      return this.open({
        label: false,
        content: `
<div class="bbn-middle" style="width: 500px; height: 250px">
<div class="bbn-block bbn-c bbn-b bbn-xl">` + bbn._('Loading') + `...</div>
</div>`,
        width: 500,
        height: 250,
        scrollable: false
      })
    },
    /**
     * @method close
     * @param {Number} idx
     * @param {Boolean} force
     * @fires getWindows
     */
    close(idx, force) {
      if (idx === undefined) {
        idx = this.items.length - 1;
      }
      let win = this.getWindow(idx);
      if (win && !force) {
        return win.close(idx);
      }

      if (this.items[idx]) {
        this.items.splice(idx, 1);
        this.$forceUpdate();
      }
    },
    /**
     * @method getIndexByUID
     * @param {String} uid
     * @return {Number}
     */
    getIndexByUID(uid) {
      return bbn.fn.search(this.items, { uid: uid });
    },
    /**
     * @method alert
     * @fires open
     */
    alert() {
      let has_msg = false;
      let has_title = false;
      let has_width = false;
      let has_callback = false;
      let okText;
      let onOpen;
      let onClose;
      let o = {};
      for (let i = 0; i < arguments.length; i++) {
        if (!has_msg && (typeof (arguments[i]) === 'string')) {
          o.content = arguments[i];
          has_msg = 1;
        }
        else if (bbn.fn.isDimension(arguments[i]) || (arguments[i] === 'auto')) {
          if (has_width) {
            o.height = arguments[i];
          }
          else {
            o.width = arguments[i];
            has_width = 1;
          }
        }
        else if (!has_title && (typeof arguments[i] === 'string')) {
          o.label = arguments[i];
          has_title = true;
        }
        else if (typeof arguments[i] === 'string') {
          okText = arguments[i];
        }
        else if (bbn.fn.isFunction(arguments[i])) {
          if (has_callback) {
            onClose = arguments[i];
          }
          else {
            onOpen = arguments[i];
            has_callback = 1;
          }
        }
        else if (bbn.cp.isComponent(arguments[i])) {
          o.opener = arguments[i];
        }
        else if (bbn.fn.isObject(arguments[i])) {
          bbn.fn.extend(o, arguments[i]);
        }
      }
      if (typeof (o) === 'object') {
        if (o.closable === undefined) {
          o.closable = true;
        }
        if (!o.content) {
          o.content = this.alertMessage;
        }
        if (!o.label) {
          o.label = false;
        }
        if (!okText) {
          okText = this.okText;
        }
        o.content = '<div class="' + (this.isMobile || this.isTablet ? 'bbn-padding' : 'bbn-lpadding') + ' bbn-large bbn-c" style="min-width: ' + (this.isMobile || this.isTablet ? '15' : '30') + 'em">' + o.content + '</div>';
        o.buttons = [{
          label: okText,
          cls: 'bbn-primary',
          icon: 'nf nf-fa-check_circle',
          focused: true,
          action($ev, btn) {
            if (onClose) {
              onClose($ev, btn);
            }
            btn.closest('bbn-floater').close(true);
          }
        }];
        /*
        mounted(){
          this.window = this.closest('bbn-floater');
          setTimeout(() => {
            let ele = this.getRef('click');
            if ( ele ){
              ele.$el.focus();
            }
          }, 50)
        }
        */
        this.open(bbn.fn.extend(o, {
          maximizable: false,
          scrollable: true,
          resizable: false
        }));
      }
    },
    /**
     * @method confirm
     * @fires open
     */
    confirm() {
      let onYes = false;
      let onNo = false;
      let yesText = bbn._('Yes');
      let noText = bbn._('No');
      let o = {};
      let options = {};
      let has_msg = false;
      let has_yes = false;
      let has_width = false;
      let i;
      if (bbn.fn.isObject(arguments[0])) {
        o = arguments[0];
      }
      else {
        for (i = 0; i < arguments.length; i++) {
          if (!has_msg && (typeof (arguments[i]) === 'string')) {
            o.content = arguments[i];
            has_msg = 1;
          }
          else if (bbn.fn.isDimension(arguments[i]) || (arguments[i] === 'auto')) {
            if (has_width) {
              o.height = arguments[i];
            }
            else {
              o.width = arguments[i];
              has_width = 1;
            }
          }
          else if ((typeof arguments[i] === 'string')) {
            if (!has_yes) {
              yesText = arguments[i];
              has_yes = true;
            }
            else {
              noText = arguments[i];
            }
          }
          else if (bbn.fn.isFunction(arguments[i])) {
            if (onYes) {
              onNo = arguments[i];
            }
            else {
              onYes = arguments[i];
            }
          }
          else if (bbn.cp.isComponent(arguments[i])) {
            o.opener = arguments[i];
          }
          else if (typeof (arguments[i]) === 'object') {
            options = arguments[i];
          }
        }
      }

      if ((typeof (o) === 'object') && onYes) {
        if (!o.content) {
          o.content = this.confirmMessage;
        }
        if (!o.label) {
          o.label = false;
        }

        o.content = '<div class="' + (this.isMobile || this.isTablet ? 'bbn-padding' : 'bbn-lpadding') + ' bbn-large bbn-c" style="min-width: ' + (this.isMobile || this.isTablet ? '15' : '30') + 'em">' + o.content + '</div>';
        o.buttons = [{
          label: noText,
          icon: 'nf nf-fa-times_circle',
          focused: true,
          action: ($ev, btn) => {
            btn.closest('bbn-floater').close(true);
            bbn.fn.log("ON NO", btn);
            if (onNo) {
              onNo($ev, btn);
            }
          }
        }, {
          label: yesText,
          cls: 'bbn-primary',
          icon: 'nf nf-fa-check_circle',
          action: ($ev, btn) => {
            bbn.fn.log("ON YES", btn);
            btn.closest('bbn-floater').close(true);
            onYes($ev, btn);
          }
        }];

        this.open(bbn.fn.extend(o, options, {
          resizable: false,
          maximizable: false,
          scrollable: true
        }));
      }
    },
    /**
     * @method makeWindows
     */
    makeWindows() {
      this.$forceUpdate();
    },
    /**
     * @method getWindow
     * @param {Number} idx
     * @return {Object|Boolean}
     */
    getWindow(idx) {
      if (this.popups.length) {
        if (idx === undefined) {
          idx = this.popups.length - 1;
        }
        if (this.popups[idx]) {
          return bbn.fn.getRow(Array.from(this.children), a => a.uid === this.popups[idx].uid);
        }
      }
      return false;
    }
  },
  /**
   * @event created
   */
  created() {
    this.componentClass.push('bbn-resize-emitter');
  },
  /**
   * @event mounted
   */
  mounted() {
    this.onResize();
    bbn.fn.each(this.popups, a => this.open(a));
    this.ready = true;
  },
  watch: {
    /**
     * @watch items
     * @fires makeWindows
     */
    items() {
      this.makeWindows();
    },
    /**
     * @watch numPopups
     */
    numPopups(v) {
      if (v && !this.ready) {
        this.ready = true;
      }
    }
  }
};

import cpHtml from './popup.html';
import cpStyle from './popup.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/popup.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-popup',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
