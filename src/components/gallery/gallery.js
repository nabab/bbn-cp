// It has a multitude of customizations to better your gallery.
/**
 * @file bbn-gallery component
 * @description bbn-gallery is a component that displays a collection of images.
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
       * The alternative component for the toolbar.
       * @prop {HTMLElement|(Object|Boolean)} toolbar
       */
      toolbar: {
        type: [HTMLElement, Object, Boolean],
        default: true
      },
      /**
       * Extra buttons to add to begin of the toolbar
       * @prop {Array} [[]] toolbatButtons
       */
      toolbarButtons: {
        type: Array,
        default() {
          return [];
        }
      },
      /**
       * @prop {(Boolean|String)} [false] overlay
       */
      overlay: {
        type: [Boolean, String],
        default: false
      },
      /**
       * Set to true to allow the gallery to be magnifiable.
       * @prop {Boolean} [false] zoomable
       */
      zoomable: {
        type: Boolean,
        default: false
      },
      /**
       * Set to true to show info on the gallery's footer.
       * @prop {Boolean} [false] info
       */
      info: {
        type: Boolean,
        default: false
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
       * @prop {(Number|String)} [150] itemWidth
       */
      itemWidth: {
        type: [Number, String],
        default: 150
      },
      /**
       * The min width of the items.
       * @prop {Number} minItemWidth
       */
      minItemWidth: {
        type: Number
      },
      /**
       * The width of the items.
       * @prop {Number} maxItemWidth
       */
      maxItemWidth: {
        type: Number
      },
      /**
       * The horizontal alignment of the column.
       * @prop {String} ['center'] align
       */
      align: {
        type: String,
        default: 'center'
      },
      /**
       * Enables the upload possibility
       * @prop {Boolean} [false] uploadable
       */
      uploadable: {
        type: Boolean,
        default: false
      },
      /**
       * Enables the download possibility
       * @prop {Boolean} [false] downloadable
       */
      downloadable: {
        type: Boolean,
        default: false
      },
      /**
       * Enables the delete possibility
       * @prop {Boolean} [false] deletable
       */
      deletable: {
        type: Boolean,
        default: false
      },
      /**
       * Sets the toolbar buttons as notext
       * @prop {Boolean} [false] buttonsNoText
       */
      buttonsNoText: {
        type: Boolean,
        default: false
      },
      /**
       * Displays a preview of items below the slideshow.
       * @prop {Boolean} [true] preview
       */
      preview: {
        type: Boolean,
        default: true
      },
      /**
       * The property that will be used for the image path.
       * @prop {String} ['content'] pathName
       */
      pathName: {
        type: String,
        default: 'content'
      },
      /**
       * The property that will be used for the image overlay.
       * @prop {String} ['verlay] overlayName
       */
      overlayName: {
        type: String,
        default: 'overlay'
      },
      /**
       * The property that will be used for the researc.
       * @prop {String} ['title'] searchName
       */
      searchName: {
        type: String,
        default: 'title'
      },
      /**
       * The item component
       * @prop {(String|Object|HTMLElement)} itemComponent
       */
      itemComponent: {
        type: [String, Object, HTMLElement]
      },
      /**
       * The context menu source of every image
       * @prop {(Function|Array)} buttonMenu
       */
      buttonMenu: {
        type: [Function, Array]
      },
      /**
       * The component used by the context menu items
       * @prop {(String|Object|HTMLElement)} contextComponent
       */
      buttonMenuComponent: {
        type: [String, Object, HTMLElement]
      },
      /**
       * Enables the resize possibility
       * @prop {Boolean} [true] resizable
       */
      resizable: {
        type: Boolean,
        default: true
      },
      /**
       * Set to false to hide the pager.
       * @prop {Boolean} [true] pager
       */
      pager: {
        type: Boolean,
        default: true
      },
      /**
       * The data property name of an item used to sort the items
       * @prop {String} sourceOrder
       */
      sourceOrder: {
        type: String
      },
      /**
       * The data property name of an intem used to open a link
       * @prop {String} ['link'] sourceAction
       */
      sourceAction: {
        type: String,
        default: 'link'
      },
      /**
       * The property that will be used for the image info.
       * @prop {String} ['info'] sourceInfo
       */
       sourceInfo: {
        type: String,
        default: 'info'
      }
    },
    data() {
      return {
        /**
         * The width of the component.
         * @data {Number} [0] width
         */
        width: 0,
        /**
         * True if the gallery is on selection mode.
         * @data {Boolean} [false] isSelecting
         */
        isSelecting: false,
        /**
         * The selection mode.
         * @data {Boolean|String} [false] selectingMode
         */
        selectingMode: false,
        //currentSelected: this.selected,
        /**
         * @data {Boolean} [false] isLoaded
         */
        isLoaded: false,
        /**
         * The current widht of the items
         * @data {Number} currentItemWidth
         */
        currentItemWidth: this.itemWidth,
        /**
         * The current text on the search input
         * @data {String} [''] currentSearch
         */
        currentSearch: '',
        /**
         * The research timeout
         * @data {Number} [0] searchTimeout
         */
        searchTimeout: 0,
        /**
         * The data of the current selected items
         * @data {Array} [[]] currentSelectedData
         */
        currentSelectedData: [],
        /**
         * @data {Boolean} [false] showFloater
         */
        showFloater: false,
        /**
         * @data {Object} [{}] floaterSource
         */
        floaterSource: {},
        /**
         * @data {Boolean} [false] isSorting
         */
        isSorting: false,
        /**
         * @data {Number} currentLimit
         */
        currentLimit: !!this.pageable ? this.limit : 0
      }
    },
    computed: {
      /**
       * The number of columns.
       * @computed cols
       * @return {Number}
       */
      cols() {
        return parseInt(this.lastKnownWidth / (this.currentItemWidth + this.columnGap)) || 1
      },
      /**
       * The data of the current view
       * @computed items
       * @return {Array}
       */
      items() {
        let data = this.filteredData.slice();
        if (this.sortable && !this.serverSorting) {
          bbn.fn.order(data, 'data.' + this.sourceOrder, 'asc');
        }
        if (this.pageable
          && this.currentLimit
          && (!this.isAjax || !this.serverPaging)
        ) {
          return data.slice(this.start, this.start + this.currentLimit);
        }
        return data;
      },
      /**
       * The min item width
       * @computed currentMinItemWidth
       * @return {Number}
       */
      currentMinItemWidth() {
        let mw = this.itemWidth - 200;
        return this.minItemWidth || (mw > 50 ? mw : 50);
      },
      /**
       * The max item width
       * @computed currentMaxItemWidth
       * @return {Number}
       */
      currentMaxItemWidth() {
        return this.minItemWidth || (this.itemWidth + 200);
      }
    },
    methods: {
      /**
       * Alias of bbn.fn.isObject.
       * @method isObject
       * @return {Boolean}
      */
      isObject: bbn.fn.isObject,
      /**
       * Alias of bbn.cp.isComponent.
       * @method isComponent
       * @return {Boolean}
      */
      isComponent: bbn.cp.isComponent,
      /**
         * Alias of bbn.fn.correctCase.
         * @method correctCase
         * @return {string}
        */
      correctCase: bbn.fn.correctCase,
      /**
       * Sets the selectingMode data property.
       * @method setSelecting
       * @param {String} mode
       */
      setSelecting(mode) {
        if (bbn.fn.isString(mode)) {
          this.isSelecting = true;
          this.selectingMode = mode;
        }
        else {
          this.isSelecting = false;
          this.selectingMode = false;
          this.currentSelected.splice(0);
          this.currentSelectedData.splice(0);
        }
      },
      /**
       * Manages actions based on the data property selectingMode.
       * @method action
       * @fires setSelecting
       */
      emitAction() {
        if (this.currentSelected.length) {
          let mess = '';
          if (this.selectingMode === 'download') {
            mess = bbn._("Are you sure you want to download these photos?");
          }
          else if (this.selectingMode === 'delete') {
            mess = bbn._("Are you sure you want to delete these photos?");
          }
          if (mess.length) {
            this.confirm(mess, () => {
              this.$emit(this.selectingMode, this.currentSelectedData);
              this.setSelecting(false);
            });
          }
          else {
            this.$emit(this.selectingMode, this.currentSelectedData);
            this.setSelecting(false);
          }
        }
      },
      resetSearch() {
        this.currentSearch = '';
      }
    },
    /**
     * @event mounted
     * @fires onResize
     */
    mounted() {
      this.$nextTick(() => {
        this.ready = true;
      });
    },
    watch: {
      /**
       * @watch currentSearch
       */
      currentSearch(newVal) {
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
          let idx = bbn.fn.search(this.currentFilters.conditions, { field: this.searchName });
          bbn.fn.log("GALLERY", idx)
          if (idx > -1) {
            if (newVal) {
              this.currentFilters.conditions[idx].value == newVal;
            }
            else {
              this.currentFilters.conditions.splice(idx, 1)
            }
          }
          else if (newVal) {
            this.currentFilters.conditions.push({
              field: this.searchName,
              operator: 'contains',
              value: newVal
            })
          }
        }, 1000)
      },
      itemWidth(val) {
        this.currentItemWidth = val;
      },
      showFloater(val) {
        if (!val) {
          this.floaterSource = {};
        }
      }
    },
    components: {
      /**
       * @component column
       */
      column: {
        name: 'column',
        template: `
<div :style="colStyle">
  <component :is="gallery.itemComponent || $options.components.item"
             bbn-for="(item, idx) in source"
             :source="item"
             :key="'item-' + index + '-' + idx"/>
</div>`,
        props: {
          /**
           * The source of the component 'gallery-col'.
           * @prop {Array} [[]] source
           * @memberof column
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
           * @memberof column
           */
          index: {
            type: Number
          }
        },
        computed: {
          /**
           * The parent gallery component.
           * @computed gallery
           * @memberof column
           * @return {Object}
           */
          gallery() {
            return this.closest('bbn-gallery');
          },
          /**
           * The style object of the column.
           * @computed colStyle
           * @memberof column
           * @return {Object}
           */
          colStyle() {
            return {
              width: `${this.gallery.currentItemWidth}px`,
              margin: `0 ${this.gallery.columnGap / 2}px`,
              verticalAlign: 'top',
              display: 'inline-block'
            }
          }
        },
        components: {
          /**
           * @component item
           * @memberof column
           */
          item: {
            name: 'item',
            template: `
<a bbn-if="!col.gallery.isLoading"
    :class="['bbn-gallery-item', 'bbn-box', {'bbn-primary': isSelected, 'bbn-p': !!col.gallery.zoomable}]"
    @click="action"
    @contextmenu="onContext"
    :style="aStyle"
    bbn-draggable="!!col.gallery.isSorting && !!col.gallery.uid"
    bbn-droppable="!!col.gallery.isSorting && !!col.gallery.uid"
    @drop="changeOrder">
  <span :class="{
          'bbn-spadding': !loaded || ((source.data.is_image !== undefined) && !source.data.is_image),
          'bbn-c': !loaded || ((source.data.is_image !== undefined) && !source.data.is_image)
        }"
        style="display: block">
    <i bbn-if="(source.data.is_image !== undefined) && !source.data.is_image"
       :class="['nf nf-fa-file', 'bbn-xxxl', {'bbn-bottom-lspace': !!showOverlay}]"
       style="display: block"/>
    <img bbn-else
         :src="imgSrc"
         @load="loaded = true"
         @error="error = true"
         :class="{
           'bbn-radius': !col.gallery.isSorting,
           'bbn-gallery-item-selected': isSelected,
           'bbn-invisible': !loaded
         }"
         :style="imgStyle"
         :alt="(source.caption ? source.caption + ' - ' : '') + (source.text ? source.text + ' - ' : '') + (source.tags || []).join(' | ')"
         :drag="!col.gallery.isSorting">
    <bbn-loadicon class="bbn-gallery-item-loading bbn-c"
                  bbn-if="!loaded && !error"/>
    <i bbn-elseif="error && !loaded" class="bbn-red nf nf-md-image_off"/>
    <span bbn-if="showOverlay && loaded"
          class="bbn-gallery-overlay bbn-widget bbn-ellipsis bbn-radius-bottom bbn-hxspadding"
          bbn-text="source.data[col.gallery.overlayName]"
          :title="source.data[col.gallery.overlayName]"/>
    <i bbn-if="col.gallery.zoomable && loaded && !col.gallery.isSelecting && !col.gallery.isSorting"
       class="bbn-gallery-zoverlay nf nf-fa-search"/>
    <bbn-context bbn-if="showOverlay && !!col.gallery.buttonMenu && loaded && !col.gallery.isSelecting && !col.gallery.isSorting"
                 tag="div"
                 class="bbn-block bbn-top-left bbn-top-smargin bbn-left-smargin"
                 :source="!!col.gallery.buttonMenu
                   ? (isFunction(col.gallery.buttonMenu)
                     ? col.gallery.buttonMenu(source.data, source.index, source.key)
                     : col.gallery.buttonMenu)
                   : []"
                 :attach="buttonMenuElement"
                 :item-component="col.gallery.contextComponent"
                 @hook:mounted="buttonMenuElement = getRef('itemMenu') || ''"
                 ref="menuButton">
        <div class="bbn-block">
          <i class="bbn-gallery-button-menu nf nf-md-menu"
             ref="itemMenu"/>
        </div>
    </bbn-context>
  </span>
  <div bbn-if="col.gallery.sortable && col.gallery.isSorting && col.gallery.sourceOrder"
        bbn-text="source.data[col.gallery.sourceOrder]"
        class="bbn-b bbn-gallery-item-position bbn-lg"/>
</a>
            `,
            props: {
              /**
               * The source of the compoment 'item'.
               * @prop {String|Object} source
               * @memberof item
               */
              source: {
                type: [String, Object]
              }
            },
            data() {
              return {
                /**
                 * True if the item is loaded.
                 * @data {Boolean} [false] loaded
                 * @memberof item
                 */
                loaded: (this.source.data.is_image !== undefined) && !this.source.data.is_image,
                /**
                 * The element to which the context menu is attached
                 * @data {HTMLElement} [undefined] buttonMenuElement
                 * @memberof item
                 */
                buttonMenuElement: '',
                error: false
              }
            },
            computed: {
              /**
               * The parent component 'column'.
               * @computed col
               * @memberof item
               * @return {HTMLElement}
               */
              col() {
                return this.$parent;
              },
              /**
               * The style object of the item.
               * @computed aStyle
               * @memberof item
               * @return {Object}
               */
              aStyle() {
                let style = {
                  margin: `0 0 ${this.col.gallery.rowGap}px 0`,
                  border: this.isSelected ? '5px dotted' : (this.col.gallery.isSorting ? '5px var(--primary-border) solid' : ''),
                };
                if (!this.col.gallery.zoomable && !this.hasLink) {
                  style.cursor = 'default';
                }
                return style;
              },
              /**
               * The style object of the image.
               * @computed imgStyle
               * @memberof item
               * @return {Object}
               */
              imgStyle() {
                return {
                  width: this.loaded ? '100%' : 0,
                  height: this.loaded ? '' : 0,
                  margin: 0,
                  display: 'block',
                  visibility: this.loaded ? 'visible' : 'hidden',
                  '-webkit-user-drag': !this.col.gallery.isSorting
                }
              },
              /**
               * True if the source of the component is an object.
               * @computed isObj
               * @return {Boolean}
               * @memberof item
               */
              isObj() {
                return bbn.fn.isObject(this.source);
              },
              /**
               * If true, shows the overlay.
               * @computed showOverlay
               * @return {Boolean}
               * @memberof item
               */
              showOverlay() {
                return this.col.gallery.overlay && this.isObj && (this.source.data[this.col.gallery.overlayName] !== undefined);
              },
              /**
               * True if the item is selected.
               * @computed isSelected
               * @return {Boolean}
               * @memberof item
               */
              isSelected() {
                return this.col.gallery.currentSelected.includes(!!this.col.gallery.uid ? this.source.data[this.col.gallery.uid] : this.source.index);
              },
              /**
               * The image source
               * @computed imgSrc
               * @memberof item
               * @return {String}
               */
              imgSrc() {
                let src = '';
                if (bbn.fn.isString(this.source.data)) {
                  src = this.source.data;
                }
                else {
                  let prop = this.col.gallery.pathName || 'thumb' || 'content';
                  if (this.source.data[prop]) {
                    src = this.source.data[prop];
                  }
                }
                if (src && bbn.fn.isString(src)) {
                  return bbn.fn.escapeUrl(src, 'w=' + this.col.gallery.currentItemWidth + '&thumb=1');
                }
                return null;
              },
              floaterSource() {
                return {
                  data: bbn.fn.map(this.col.gallery.currentData, d => {
                    let obj = bbn.fn.extend(true, {}, d.data);
                    obj.content = obj[this.col.gallery.pathName];
                    obj.type = 'img';
                    obj.mode = 'original';
                    if (!obj[this.col.gallery.sourceInfo]) {
                      obj[this.col.gallery.sourceInfo] = obj[this.col.gallery.overlayName];
                    }
                    return obj;
                  }),
                  info: this.col.gallery.info,
                  sourceInfo: this.col.gallery.sourceInfo,
                  slide: this.source.index,
                  preview: this.col.gallery.preview
                }
              },
              hasLink() {
                return this.col.gallery.sourceAction
                  && !!this.source.data[this.col.gallery.sourceAction];
              }
            },
            methods: {
              onContext(ev) {
                let menuButton = this.getRef('menuButton');
                if (menuButton) {
                  ev.preventDefault();
                  ev.stopImmediatePropagation();
                  menuButton.click();
                }
              },
              /**
               * Alias of bbn.fn.isFunction method
               * @methods isFunction
               * @memberof item
               */
              isFunction: bbn.fn.isFunction,
              /**
               * Manages the actions.
               * @methods action
               * @memberof item
               * @fires getPopup
               */
              action(ev) {
                if (this.col.gallery.isSelecting) {
                  let id = !!this.col.gallery.uid ? this.source.data[this.col.gallery.uid] : this.source.index;
                  if (this.isSelected) {
                    this.col.gallery.currentSelected.splice(this.col.gallery.currentSelected.indexOf(id), 1);
                    if (!!this.col.gallery.uid) {
                      let idx = bbn.fn.search(this.col.gallery.currentSelectedData, this.col.gallery.uid, id);
                      if (idx > -1) {
                        this.col.gallery.currentSelectedData.splice(idx, 1);
                      }
                    }
                  }
                  else {
                    this.col.gallery.currentSelected.push(id);
                    if (!!this.col.gallery.uid) {
                      this.col.gallery.currentSelectedData.push(this.source.data);
                    }
                  }
                }
                else if (!ev.target.classList.contains('bbn-gallery-button-menu')
                  && (!ev.target.closest('.bbn-floater-list'))
                  && this.col.gallery.zoomable
                ) {
                  this.col.gallery.floaterSource = this.floaterSource;
                  this.col.gallery.showFloater = true;
                }
                else if (this.hasLink) {
                  bbn.fn.link(this.source.data[this.col.gallery.sourceAction]);
                }
                else {
                  this.col.gallery.$emit('clickitem', this.source);
                }
              },
              changeOrder(ev) {
                ev.preventDefault();
                let sortEvent = new Event('sort', {cancelable: true}),
                    data = ev.detail.from.originalElement.bbn.source.data,
                    pos = data[this.col.gallery.sourceOrder],
                    posNew = this.source.data[this.col.gallery.sourceOrder];
                this.col.gallery.$emit('sort', sortEvent, {
                  [data[this.col.gallery.uid]]: posNew,
                  [this.source.data[this.col.gallery.uid]]: pos
                });
                if (!sortEvent.defaultPrevented) {
                  this.$set(data, this.col.gallery.sourceOrder, posNew);
                  this.source.data[this.col.gallery.sourceOrder] = pos;
                }
              }
            }
          }
        }
      },
      /**
       * @component zoom
       */
      zoom: {
        name: 'zoom',
        template: `
<div class="bbn-overlay bbn-gallery-zoom">
  <bbn-slideshow :source="source.data"
                :show-info="source.info"
                :source-info="source.sourceInfo"
                :arrows="true"
                :show-count="true"
                :full-slide="true"
                :initial-slide="source.slide"
                :preview="source.preview"
                :keyboard="true"/>
</div>
                `,
        props: {
          /**
           * The source of the component 'gallery-zoom'.
           * @prop {String|Object} source
           * @memberof zoom
           */
          source: {
            type: [String, Object]
          }
        }
      },
      /**
       * @component selected
       */
      selected: {
        name: 'selected',
        template: `
<div class="bbn-rel">
  <i class="bbn-top-right nf nf-fa-close bbn-red bbn-vxspadding bbn-hspadding bbn-lg bbn-p"
     @click="unselect"/>
  <i bbn-if="(itemData.is_image !== undefined) && !itemData.is_image"
     class="bbn-gallery-selected-file nf nf-fa-file bbn-xxxl bbn-radius bbn-border bbn-spadding bbn-c"
     style="display: block"/>
  <img bbn-else
       :src="imgSrc"
       class="bbn-radius bbn-border"
       :alt="altSrc">
</div>
        `,
        props: {
          /**
           * @prop {String|Number} source
           * @memberof selected
           */
          source: {
            type: [String, Number],
            required: true
          }
        },
        computed: {
          /**
           * @computed altSrc
           * @memberof selected
           * @fires bbn.fn.basename
           * @return {String}
           */
          altSrc() {
            return bbn.fn.baseName(this.imgSrc);
          },
          /**
           * @computed gallery
           * @memberof selected
           * @fires closest
           * @return {HTMLElement}
           */
          gallery() {
            return this.closest('bbn-gallery');
          },
          /**
           * @computed imgSrc
           * @memberof selected
           * @return {String|null}
           */
          imgSrc() {
            if (this.gallery) {
              let src = '';
              if (bbn.fn.isString(this.itemData)) {
                src = this.itemData;
              }
              else {
                let prop = this.gallery.pathName || 'thumb' || 'content';
                if (this.itemData[prop]) {
                  src = this.itemData[prop];
                }
              }

              if (src && bbn.fn.isString(src)) {
                return bbn.fn.escapeUrl(src, 'w=70&thumb=1');
              }
            }
            return null;
          },
          itemData(){
            if (this.gallery && !!this.gallery.uid) {
              return bbn.fn.getRow(this.gallery.currentSelectedData, this.gallery.uid, this.source);
            }
            return {};
          }
        },
        methods: {
          /**
           * @method unselect
           * @memberof selected
           */
          unselect() {
            if (this.gallery) {
              this.gallery.currentSelected.splice(this.gallery.currentSelected.indexOf(this.source), 1);
            }
          }
        }
      }
    }
  };

import cpHtml from './gallery.html';
import cpStyle from './gallery.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/gallery.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-gallery',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
