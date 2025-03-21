/**
 * @file bbn-masonry component
 * @description bbn-masonry
 * @copyright BBN Solutions
 * @author Mirko Argentino
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.list
   */
  mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.list
    ],
  props: {
    /**
     * Set to true to allow the component to have a scroll.
     * @prop {Boolean} [true] scrollable
     */
    scrollable: {
      type: Boolean,
      default: true
    },
    /**
     * The gap between the columns.
     * @prop {Number} [20] columnGap
     */
    columnGap: {
      type: Number,
      default: 20
    },
    /**
     * The gap between the rows.
     * @prop {Number} [20] rowGap
     */
    rowGap: {
      type: Number,
      default: 20
    },
    /**
     * The minimum number of columns allowed.
     * @prop {Number} [1] minCol
     */
    minCol: {
      type: Number,
      default: 1
    },
    /**
     * The maximum number of columns allowed.
     * @prop {Number} maxCol
     */
    maxCol: {
      type: Number
    },
    /**
     * The width of the items.
     * @prop {Number} [350] itemWidth
     */
    itemWidth: {
      type: Number,
      default: 350
    },
  },
  data(){
    return {
      fromSlot: []
    }
  },
  computed: {
    /**
     * The number of columns.
     * @computed cols
     * @return {Number}
     */
    cols() {
      return parseInt(this.lastKnownWidth / (this.itemWidth + this.columnGap)) || 1
    },
    /**
     * @computed containerStyle
     * @return {Object}
     */
    containerStyle(){
      return {
        gridTemplateColumns: `repeat(${this.cols}, 1fr)`,
        gridGap: `${this.columnGap}px`
      }
    },
    items(){
      let d = [...this.currentData];
      if (this.fromSlot.length) {
        let idx = this.currentData.length;
        bbn.fn.each(this.fromSlot, s => {
          d.push({
            index: idx,
            slot: true,
            content: s.content
          });
          idx++;
        })
      }
      return d;
    }
  },
  /**
   * @event mounted
   * @fires $nextTick
   */
    mounted() {
    this.$nextTick(() => {
      /*
      if (this.$slots.default) {
        let toData = [];
        for (let node of this.$slots.default) {
          if (!!node.componentOptions
            && (node.componentOptions.tag === 'bbns-masonry')
            ) {
            toData.push({
              content: node.elm.innerHTML.trim()
            });
          }
        }
        this.fromSlot.push(...toData);
      }
      */
      this.ready = true;
    });
  },
  components: {
    slotItem: {
      name: 'bbns-masonry'
    },
    mascol: {
      props: {
        /**
         * The source of the component 'masonry-col'.
         * @prop {Array} [[]] source
         * @memberof masonry-col
         */
        source: {
          type: Array,
          default() {
            return [];
          }
        },
        /**
         * The index of the column.
         * @prop {Number} index
         * @memberof masonry-col
         */
        index: {
          type: Number
        }
      },
      computed: {
        /**
         * The parent masonry component.
         * @computed masonry
         * @memberof masonry-col
         * @return {Object}
         */
        masonry() {
          return this.closest('bbn-masonry');
        },
        /**
         * The style object of the column.
         * @computed colStyle
         * @memberof masonry-col
         * @return {Object}
         */
        colStyle() {
          return {
            width: '100%',
            margin: `0 ${(this.index + 1) < this.masonry.cols ? this.masonry.columnGap : 0}px 0 0`,
            verticalAlign: 'top',
            display: 'inline-block'
          }
        }
      },
      components: {
        /**
         * @component masonryItem
         * @memberof masonry-col
         */
        masitem: {
          props: {
            /**
             * The source of the compoment 'masonry-item'.
             * @prop {String|Object} source
             * @memberof masonry-item
             */
            source: {
              type: [String, Object]
            }
          },
          computed: {
            /**
             * The parent component 'masonry-col'.
             * @computed col
             * @memberof masonry-item
             * @return {HTMLElement}
             */
            col() {
              return this.closest('bbn-masonry-mascol');
            },
            itemStyle(){
              return {
                marginBottom: this.col.index < this.col.masonry.cols ? this.col.masonry.rowGap + 'px' : 0
              }
            }
          }
        }
      }
    }
  }
};

import cpHtml from './masonry.html';
import cpStyle from './masonry.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/masonry.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-masonry',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
