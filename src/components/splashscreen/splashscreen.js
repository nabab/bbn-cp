/**
 * @file bbn-splashscreen component
 * @description  bbn-splashscreen.
 * @author BBN Solutions
 * @copyright BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.list
     * @mixin bbn.cp.mixins.events
     * @mixin bbn.cp.mixins.resizer
     */
    mixins: 
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.list,
      bbn.cp.mixins.events,
      bbn.cp.mixins.resizer
    ],
    props: {
      /**
       * @prop {Array} source
       */
      source: {
        type: Array
      },
      /**
       * @prop {Boolean} [true] arrows
       */
      arrows: {
        type: Boolean,
        default: true
      },
      /**
       * @prop {(Boolean|String)} ['outsideBottom'] dots
       */
      dots: {
        type: [Boolean, String],
        default: 'outsideBottom',
        validator: d => [true, false, 'insideTop', 'insideBottom', 'outsideTop', 'outsideBottom'].includes(d)
      },
      /**
       * @prop {Boolean} [true] loop
       */
      loop: {
        type: Boolean,
        default: true
      },
      /**
       * @prop {String} header
       */
      header: {
        type: String
      },
      /**
       * @prop {(String|Object|HTMLElement)} headerComponent
       */
      headerComponent: {
        type: [String, Object, HTMLElement]
      },
      /**
       * @prop {String} footer
       */
      footer: {
        type: String
      },
      /**
       * @prop {(String|Object|HTMLElement)} footerComponent
       */
      footerComponent: {
        type: [String, Object, HTMLElement]
      }
    },
    data(){
      return {
        currentSwipeClass: 'bbn-splashscreen-swipe-left',
        currentIndex: 0
      }
    },
    computed: {
      dotsPosition(){
        return this.dots === true ? 'outsideBottom' : this.dots;
      },
      currentIndexes(){
        return bbn.fn.map(this.filteredData, d => d.index);
      },
      currentStyle(){
        let style = {};
        if (this.currentData.length) {
          let item = this.currentData[this.currentIndex].data;
          if (item.background) {
            style.backgroundColor = item.background;
          }
          if (item.image) {
            style.backgroundImage = `url(${item.image})`;
            style.backgroundPosition = 'center';
            style.backgroundRepeat = 'no-repeat';
            style.backgroundSize = 'cover';
          }
        }
        return style;
      },
      showNextArrow(){
        let i = this.currentIndexes.indexOf(this.currentIndex);
        return (i > -1) && (!!this.loop || (this.currentIndexes[i+1] !== undefined));
      },
      showPrevArrow(){
        let i = this.currentIndexes.indexOf(this.currentIndex);
        return (i > -1) && (!!this.loop || (this.currentIndexes[i-1] !== undefined));
      }
    },
    methods: {
      prev(){
        if (this.currentIndexes.length) {
          let i = this.currentIndexes.indexOf(this.currentIndex);
          if (i > -1) {
            if (this.currentIndexes[i-1] !== undefined) {
              this.currentIndex = this.currentIndexes[i-1]
            }
            else if (this.loop) {
              this.currentIndex = this.currentIndexes[this.currentIndexes.length-1]
            }
          }
        }
      },
      next(){
        if (this.currentIndexes.length) {
          let i = this.currentIndexes.indexOf(this.currentIndex);
          if (i > -1) {
            if (this.currentIndexes[i+1] !== undefined) {
              this.currentIndex = this.currentIndexes[i+1]
            }
            else if (this.loop) {
              this.currentIndex = this.currentIndexes[0]
            }
          }
        }
      },
      _map(data) {
        if ( bbn.fn.isArray(data) ){
          data = data.map(a => {
            let o = bbn.fn.extend(true, {}, a);
            if (!o.headerComponent && (!bbn.fn.isString(o.header) || (bbn.fn.substr(o.header, 0,1) !== '<'))) {
              o.headerComponent = o.header;
              delete o.header;
            }
            if (!o.headerComponent && (!bbn.fn.isString(o.body) || (bbn.fn.substr(o.body, 0,1) !== '<'))) {
              o.bodyComponent = o.body;
              delete o.body;
            }
            if (!o.footerComponent && (!bbn.fn.isString(o.footer) || (bbn.fn.substr(o.footer, 0,1) !== '<'))) {
              o.footerComponent = o.footer;
              delete o.footer;
            }
            return o;
          });
          return (this.map ? data.map(this.map) : data).slice();
        }
        return [];
      },
      _getStyle(item){
        let style = {};
        if (item.background) {
          style.backgroundColor = item.background;
        }
        if (item.image) {
          style.backgroundImage = `url(${item.image})`;
          style.backgroundPosition = 'center';
          style.backgroundRepeat = 'no-repeat';
          style.backgroundSize = 'cover';
        }
        return style;
      },
      _swipeLeft(){
        this.currentSwipeClass = 'bbn-splashscreen-swipe-left';
        this.next();
      },
      _swipeRight(){
        this.currentSwipeClass = 'bbn-splashscreen-swipe-right';
        this.prev();
      }
    },
    created(){
      this.$on('swipeleft', this._swipeLeft);
      this.$on('swiperight', this._swipeRight);
    },
    mounted(){
      this.ready = true;
    },
    beforeDestroy() {
      this.$off('swipeleft', this._swipeLeft);
      this.$off('swiperight', this._swipeRight);
    },
    watch: {
      source:{
        deep: true,
        handler(){
          this.updateData();
        }
      },
      currentIndex(idx){
        this.$emit('change', idx, this.source[idx]);
      }
    },
    components: {
      dots: {
        template: `
          <div class="bbn-splashscreen-dots bbn-c">
            <i bbn-for="idx in indexes"
               @click="select(idx)"
               :class="['bbn-padding', 'bbn-p', 'nf nf-fa-circle', {
                 ' bbn-primary-text': value !== idx,
                 'bbn-primary-text-alt': value === idx
               }]"
               style="width: 02rem; height: 0.2rem"/>
          </div>
        `,
        props: {
          value: {
            type: Number
          },
          indexes: {
            type: Array
          }
        },
        methods: {
          select(idx){
            this.$emit('input', idx);
          }
        }
      }
    }
  };
  
import cpHtml from './splashscreen.html';
import cpStyle from './splashscreen.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/splashscreen.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-splashscreen',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
