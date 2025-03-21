/**
 * @file bbn-vlist component
 *
 * @description bbn-vlist represents a vertical list of possible actions to be performed.This list can be nested hierarchically.
 *
 * @copyrigth BBN Soutions
 *
 * @author BBN Soutions
 *
 * @created 15/52/2017.
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.position
     */
    mixins: 
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.position
    ],
    statics() {
      return {isClicked: false};
    },
    props: {
      /**
       * @prop {(Function|Array)} source
       */
      source: {
        type: [Function, Array]
      },
      /**
       * @prop {String} ['100%'] maxHeight
       */
      maxHeight: {
        type: String,
        default: '100%'
      },
      /**
       * @prop {Boolean} [false] unique
       */
      unique: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {String} ['free'] mode
       */
      mode: {
        type: String,
        default: "free"
      },
      /**
       * @prop [false] parent
       */
      parent: {
        default: false
      },
      /**
       * @prop [false] noIcon
       */
      noIcon: {
        default: false
      },
      // The hierarchy level, root is 0, and for each generation 1 is added to the level
      /**
       * @prop {Number} [0] level
       */
      level: {
        type: Number,
        default: 0
      },
      /**
       * @prop {Funtion} mapper
       */
      mapper: {
        type: Function
      },
      /**
       * itemComponent
       */
      itemComponent: {}
    },
    data(){
      let items = [],
          hasIcons = false;
      if ( this.source ){
        items =bbn.fn.isFunction(this.source) ? this.source() : this.source.slice();
        if ( this.mapper ){
          bbn.fn.map(items, a => {
            return this.mapper(a);
          })
        }
        bbn.fn.each(items, a => {
          if ( a.icon ){
            hasIcons = true;
          }
        });
      }
      return {
        items: items,
        currentIndex: 0,
        currentHeight: 0,
        currentWidth: 0,
        focused: bbn.env.focused,
        hasIcons: hasIcons
      };
    },
    methods: {
      getStyles(){
        let left = this.left ? (bbn.fn.isNumber(this.left) ? this.left : parseInt(this.left)) : '',
            right = this.right ? (bbn.fn.isNumber(this.right) ? this.right : parseInt(this.right)) : '',
            top = this.top ? (bbn.fn.isNumber(this.top) ? this.top : parseInt(this.top)) : '',
            bottom = this.bottom ? (bbn.fn.isNumber(this.bottom) ? this.bottom : parseInt(this.bottom)) : '';
        if ( this.currentHeight ){
          let tW = bbn.env.width,
              tH = bbn.env.height;
          if ( right && ((right + this.currentWidth) >= tW) ){
            left = '';
            right = bbn.env.width - this.currentWidth;
          }
          else if ( left && ((left + this.currentWidth) >= tW) ){
            right = '';
            left = tW < this.currentWidth ? 0 : tW - this.currentWidth;
          }
          if ( bottom && ((bottom + this.currentHeight) >= tH) ){
            top = '';
            bottom = tH - this.currentHeight;
          }
          else if ( top && ((top + this.currentHeight) >= tH) ){
            bottom = '';
            top = tH - this.currentHeight;
          }
        }
        return {
          left: left ? left + 'px' : null,
          right: right ? right + 'px' : null,
          top: top ? top + 'px' : null,
          bottom: bottom ? bottom + 'px' : null,
          maxHeight: this.maxHeight
        };
      },
      pressKey(e){
        switch ( e.key ){
          case "Enter":
          case "Space":
            this.select(this.currentIndex);
            break;
          case "Escape":
            this.closeAll();
            break;
          case "ArrowLeft":
            this.close();
            break;
          case "ArrowRight":
            //this.close();
            break;
          case "ArrowDown":
            if ( this.items.length ){
              if ( this.currentIndex > this.items.length - 2 ){
                this.currentIndex = 0;
              }
              else{
                this.currentIndex++;
              }
            }
            break;
          case "ArrowUp":
            if ( this.items.length ){
              if ( this.currentIndex > 0 ){
                this.currentIndex--;
              }
              else{
                this.currentIndex = this.items.length - 1;
              }
            }
            break;
        }
      },
      leaveList: function(e){
        if ( !bbnVlist.isClicked ){
          this.close();
        }
      },
      beforeClick(){
        bbnVlist.isClicked = true;
      },
      afterClick(){
        setTimeout(function(){
          bbnVlist.isClicked = false;
        })
      },

      over(idx){
        if ( this.currentIndex !== idx ){
          this.currentIndex = idx;
          if ( this.items[idx].items ){
            let $item = this.$el.querySelector(" > ul > li")[idx],
                offset = $item.offset(),
                h = this.$root.$el.clientHeight,
                w = this.$root.$el.clientWidth;
            this.items[idx].right = offset.left > (w * 0.6) ? Math.round(w - offset.left) : null;
            this.items[idx].left = offset.left <= (w * 0.6) ? Math.round(offset.left + $item[0].clientWidth) : null;
            this.items[idx].bottom = offset.top > (h * 0.6) ? Math.round(h - offset.top - $item[0].clientHeight) : null;
            this.items[idx].top = offset.top <= (h * 0.6) ? Math.round(offset.top) : null;
            this.items[idx].maxHeight = (offset.top > (h * 0.6) ?
              Math.round(offset.top + $item[0].clientHeight) :
              Math.round(h - offset.top)
            ) + 'px';
            bbn.fn.log('over', this.items[idx])
          }
        }
      },
      close(e){
        this.currentIndex = false;
        if ( !this.level && this.focused ){
          this.focused.focus();
        }
      },
      closeAll(){
        this.close();
        if ( this.level ){
          this.$emit("closeall");
        }
        else{
          if ( this.focused ){
            this.focused.focus();
          }
          this.$emit('close');
          this.focus = false;
        }
      },
      select(idx){
        if ( !this.items[idx].disabled && !this.items[idx].items ){
          if ( this.mode === 'options' ){
            this.items[idx].selected = !this.items[idx].selected;
          }
          else if ( (this.mode === 'selection') && !this.items[idx].selected ){
            let prev = bbn.fn.search(this.items, "selected", true);
            if ( prev > -1 ){
              this.items[prev].selected = false;
            }
            this.items[idx].selected = true;

          }
          if ( this.items[idx].action ){
            if ( typeof(this.items[idx].action) === 'string' ){
              bbn.fn.log("CLICK IS STRING", this);
            }
            else if (bbn.fn.isFunction(this.items[idx].action) ){
              bbn.fn.log("CLICK IS FUNCTION ???", this);
              this.items[idx].action(idx, JSON.parse(JSON.stringify(this.items[idx])));
            }
          }
          if ( this.mode !== 'options' ){
            this.closeAll();
          }
        }
      }
    },
    created(){
      this.focused = bbn.env.focused;
    },
    mounted(){
      this.$nextTick(() => {
        if ( !this.focused ){
          this.focused = bbn.env.focused;
        }
        this.currentHeight = this.$el.children[0].clientHeight;
        this.currentWidth = this.$el.children[0].clientWidth;
        this.$el.children[0].focus();
        this.ready = true;
      })
    },
    beforeDestroy(){
      bbn.fn.log("beforeDestroy");
      if ( this.focused ){
        bbn.fn.log("foc", this.focused);
        this.focused.focus()
      }
    },
    watch: {
      currentIndex(newVal){
        if ( (newVal === false) && !this.parent ){
          this.$emit("close");
        }
      },
      items(){
        let hasIcons = false;
        bbn.fn.each(this.items, a => {
          if ( a.icon ){
            hasIcons = true;
          }
        });
        if ( this.hasIcons !== hasIcons ){
          this.hasIcons = hasIcons;
        }
      }
    }
  };

import cpHtml from './vlist.html';
import cpStyle from './vlist.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/vlist.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-vlist',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
