/**
 * @file bbn-browser component
 *
 * @description 
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    tag: 'iframe',
    props: {
      /**
       * @prop {} [''] security
       */
      security: {
        type: [String, Boolean],
        default: ''
      },
      /**
       * @prop {String} 
       */
      url: {
        type: String
      },
      /**
       * @prop {String} [''] root
       */
      root: {
        type: String,
        default: ''
      },
      /**
       * @prop {Boolean} [false] communication
       */
      communication: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {Boolean} [false] resetStyle
       */
      resetStyle: {
        type: Boolean,
        default: false
      }
    },
    data(){
      let sandbox = this.security;
      if (sandbox === false) {
        const list = [
          'allow-forms',
          'allow-modals',
          'allow-pointer-lock',
          'allow-orientation-lock',
          'allow-same-origin',
          'allow-popups',
          'allow-presentation',
          'allow-scripts',
          'allow-top-navigation',
          'allow-top-navigation-by-user-activation',
          'allow-popups-to-escape-sandbox'
        ]
        sandbox = list.join(' ');
      }

      if (this.resetStyle
        && !sandbox.includes('allow-same-origin')
      ) {
        sandbox += (sandbox.length ? ' ' : '') + 'allow-same-origin';
      }

      return {
        window: null,
        currentSandbox: sandbox
      }
    },
    methods: {
      sendMessage(msg){
        this.$el.contentWindow.postMessage(msg, '*');
      },
      sendID(){
        setTimeout(() => {
          this.sendMessage(this._uid);
        }, 1000);
      },
      load(){
        if ( this.communication ){
          this.sendID();
        }
        if (this.root) {
          let ev = new Event('load', {cancelable: true});
          let url = bbn.fn.substr(this.contentDocument.location.href, this.root.length);
          this.$emit('load', ev, url);
          if (!ev.defaultPrevented) {
            let ct = this.closest('bbn-container');
            if (ct && ct.router && url && (ct.router.currentURL !== (ct.url + '/' + url))) {
              bbn.fn.log("IN FRAME", ct.router.currentURL, (ct.url + '/' + url));
              ct.router.route(ct.url + '/' + url);
            }
          }
        }

        if (this.resetStyle && this.contentDocument?.body) {
          const iframeStyle = window.getComputedStyle(this.$el);
          const css = `
            body {
              font-family: ${iframeStyle.fontFamily};
              font-size: ${iframeStyle.fontSize};
              font-style: ${iframeStyle.fontSyle};
              font-weight: ${iframeStyle.fontWeight};
              color: ${iframeStyle.color};
              margin: ${iframeStyle.margin};
              padding: ${iframeStyle.padding};
              border: ${iframeStyle.border};
            }
          `;
          const style = document.createElement('style');
          style.appendChild(document.createTextNode(css));
          this.contentDocument.head.prepend(style);
        }
      },
      listen(msg){
        if ( this.communication ){
          if ( msg.data && (msg.data.uid === this._uid) ){
            this.$emit('message', msg.data.message);
          }
        }
      },
      route(url) {
        if (this.$el.contentWindow.location.href !== (this.root + url)) {
          this.$el.contentWindow.location.href = this.root + url;
        }
      }
    },
    created(){
      if ( this.communication ){
        window.addEventListener('message', this.listen, false);
      }
    },
    beforeDestroy(){
      if ( this.communication ){
        window.removeEventListener('message', this.listen);
      }
    }
  };

import cpHtml from './frame.html';
import cpStyle from './frame.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/frame.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-frame',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
