/**
 * @file bbn-tracks component
 * @description bbn-tracks
 * @copyright BBN Solutions
 * @author BBN Solutions
 */

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.editableList
   */
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.list,
    bbn.cp.mixins.editableList
  ],
  props: {
    /**
     * @prop {String} startDatetime
     */
    startDatetime: {
      type: String
    },
    /**
     * @prop {String} endDatetime
     */
    endDatetime: {
      type: String
    },
    /**
     * @prop {Number} [1] minMovement
     */
    minMovement: {
      type: Number,
      default: 1
    },
    /**
     * @prop {Number} maxMovement
     */
    maxMovement: {
      type: Number
    },
    /**
     * @prop {Number} [3600] step
     */
    step: {
      type: Number,
      default: 3600
    },
    /**
     * A colors list for personalization.
     * @prop {Array} color
     */
    colors: {
      type: Array,
      default(){
        return [{
          background: bbn.var.colors.webblue,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.turquoise,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.orange,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.red,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.purple,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.yellow,
          font: bbn.var.colors.black
        }, {
          background: bbn.var.colors.pink,
          font: bbn.var.colors.black
        }, {
          background: bbn.var.colors.brown,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.grey,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.navy,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.olive,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.pastelorange,
          font: bbn.var.colors.black
        }, {
          background: bbn.var.colors.cyan,
          font: bbn.var.colors.black
        }, {
          background: bbn.var.colors.green,
          font: bbn.var.colors.black
        }, {
          background: bbn.var.colors.black,
          font: bbn.var.colors.white
        }, {
          background: bbn.var.colors.white,
          font: bbn.var.colors.black
        }]
      }
    },
    /**
     * @prop {Boolean} [true] filterable
     */
    filterable: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Boolean} [true] sortable
     */
    sortable: {
      type: Boolean,
      default: true
    },
    /**
     * @prop {Object|Array} [[{field: 'start', dir: 'ASC'}]] order
     */
    order: {
      type: [Object, Array],
      default(){
        return [{
          field: 'start',
          dir: 'ASC'
        }];
      }
    },
    /**
     * @prop {Number} [0] lmit
     */
    limit: {
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      /**
       * @data {Number} [30] secPerPx
       */
      secPerPx: 30,
      /**
       * @data {String} currentStartDatetime
       * @fires getStartDatetime
       */
      currentStartDatetime: this.getStartDatetime(),
      /**
       * @data {String} currentEndDatetime
       * @fires getEndDatetime
       */
      currentEndDatetime: this.getEndDatetime(),
      /**
       * @data {Array} currentFilters
       * @fires getCurrentFilters
       */
      currentFilters: this.getCurrentFilters(),
      /**
       * @data {Boolean} [false] isResizing
       */
      isResizing: false
    }
  },
  computed: {
    /**
     * @computed currentStartUnix
     * @returns {Number}
     */
    currentStartUnix(){
      return dayjs(this.currentStartDatetime).unix();
    },
    /**
     * @computed currentEndUnix
     * @returns {Number}
     */
    currentEndUnix(){
      return dayjs(this.currentEndDatetime).unix();
    },
    /**
     * @computed currentStartTitle
     * @returns {String}
     */
    currentStartTitle(){
      return dayjs(this.currentStartDatetime).format('DD/MM/YYYY HH:mm:ss');
    },
    /**
     * @computed currentEndTitle
     * @returns {String}
     */
    currentEndTitle(){
      return dayjs(this.currentEndDatetime).format('DD/MM/YYYY HH:mm:ss');
    },
    /**
     * @computed cols
     * @returns {Array}
     */
    cols(){
      let cols = [];
      if (!!this.currentEndDatetime && !!this.currentStartDatetime) {
        let numCols = dayjs(this.currentEndDatetime).diff(this.currentStartDatetime, 'second') / this.step;
        let c = dayjs(this.currentStartDatetime);
        for (let i = 0; i < numCols; i++) {
          cols.push({
            start: dayjs(c).add(i * this.step, 'second').format('YYYY-MM-DD HH:mm:ss'),
            end: dayjs(c).add((i + 1) * this.step, 'second').format('YYYY-MM-DD HH:mm:ss'),
            label: dayjs(c).add(i * this.step, 'second').format('HH:mm')
          });
        }
      }

      return cols;
    },
    /**
     * @computed numCols
     * @returns {Number}
     */
    numCols(){
      return this.cols.length;
    },
    /**
     * @computed gridStyle
     * @returns {Object}
     */
    gridStyle(){
      return {
        'grid-template-columns': 'repeat(' + this.numCols + ', ' + (this.step / this.secPerPx) + 'px)',
        'grid-template-rows': '2.5rem auto',
      };
    },
    /**
     * Sets the color property to the correct form.
     * @computed currentColors
     * @return {Array}
     */
    currentColors(){
      return bbn.fn.map(
        bbn.fn.filter(
          bbn.fn.clone(this.colors),
          c => !!c.background && !!c.font
        ),
        c => {
          if (!c.background.startsWith('#')
            && !c.background.toLowerCase().startsWith('rgb')
          ){
            c.background = bbn.fn.colorToHex(c.background);
          }

          if (!!c.background.toLowerCase().startsWith('rgb')) {
            c.background = bbn.fn.rgbToHex(c.background);
          }

          if (!c.font.startsWith('#')
            && !c.font.toLowerCase().startsWith('rgb')
          ){
            c.font = bbn.fn.colorToHex(c.font);
          }

          if (!!c.background.toLowerCase().startsWith('rgb')) {
            c.font = bbn.fn.rgbToHex(c.font);
          }

          return c;
        }
      );
    }
  },
  methods: {
    /**
     * @method getStartDatetime
     * @returns {String}
     */
    getStartDatetime(){
      return this.startDatetime || dayjs().subtract(2, 'day').format('YYYY-MM-DD HH:mm:ss');
    },
    /**
     * @method getEndtDatetime
     * @returns {String}
     */
    getEndDatetime(){
      return this.endDatetime || dayjs().format('YYYY-MM-DD HH:mm:ss');
    },
    /**
     * @method getcurrentFilters
     * @fires getEndDatetime
     * @fires getStartDatetime
     * @returns {Object}
     */
    getCurrentFilters(){
      return {
        logic: 'AND',
        conditions: [{
          field: 'start',
          operator: 'isnotnull'
        }, {
          field: 'end',
          operator: 'isnotnull'
        }, {
          field: 'start',
          operator: '<',
          value: this.getEndDatetime()
        }, {
          field: 'end',
          operator: '>',
          value: this.getStartDatetime()
        }, {
          logic: 'OR',
          conditions: [{
            field: 'start',
            operator: '>=',
            value: this.getStartDatetime()
          }, {
            field: 'end',
            operator: '<=',
            value: this.getEndDatetime()
          }]
        }, bbn.fn.clone(this.filters)]
      };
    },
    /**
     * @method _map
     * @param {Array} data
     * @returns {Array}
     */
    _map(data){
      if (bbn.fn.isArray(data)) {
        data = bbn.fn.multiorder(data, this.order);
        return (this.map ? data.map(this.map) : data).slice();
      }

      return [];
    },
    /**
     * @method zoomIn
     */
    zoomIn(){
      this.secPerPx = this.secPerPx > 2 ? (this.secPerPx - 2) : (this.secPerPx === 2 ? 1 : 2);
    },
    /**
     * @method zoomOut
     */
    zoomOut(){
      this.secPerPx += this.secPerPx === 1 ? 1 : 2;
    },
    /**
     * @method getPostData
     * @returns {Object}
     */
    getPostData(){
      let d = {
        startDatetime: this.currentStartDatetime,
        endDatetime: this.currentEndDatetime
      };
      if (this.data) {
        d = bbn.fn.extend(true, {}, d, bbn.fn.isFunction(this.data) ? this.data(d) : this.data);
      }

      return d;
    },
    /**
     * @method afterUpdate
     */
    afterUpdate(){
      if (this.currentData.length) {
        bbn.fn.each(this.currentData, (item, index) => {
          let color = this.currentColors[index % this.currentColors.length];
          let startUnix = dayjs(item.data.start).unix();
          let endUnix = dayjs(item.data.end).unix();
          this.$set(item, 'start', startUnix);
          this.$set(item, 'end', endUnix);
          this.$set(item, 'bgColor', color.background);
          this.$set(item, 'fontColor', color.font);
          this.$set(item, 'title', item.data.title || '');
          if (((endUnix - startUnix) / 3) < this.secPerPx) {
            this.secPerPx = (endUnix - startUnix) / 3;
          }
        });
        this.secPerPx = this.secPerPx < 1 ? 1 : this.secPerPx;
        bbn.fn.each(this.currentData, (item, index) => {
          let leftLocked = this.currentStartUnix > item.start;
          let rightLocked = this.currentEndUnix < item.end;
          let left = (leftLocked ? this.currentStartUnix : (item.start - this.currentStartUnix)) / this.secPerPx;
          let maxLeft = 0;
          let maxRight = this.currentEndUnix / this.secPerPx;
          if (!!this.currentData[index-1]) {
            maxLeft = (this.currentData[index-1].end - this.currentStartUnix) / this.secPerPx;
          }

          if (!!this.currentData[index+1]) {
            maxRight = (this.currentData[index+1].start - this.currentStartUnix) / this.secPerPx;
          }

          this.$set(item, 'left', left);
          this.$set(item, 'width', ((!!rightLocked ? this.currentEndUnix : item.end) - (!!leftLocked ? this.currentStartUnix : item.start)) / this.secPerPx);
          this.$set(item, 'maxLeft', maxLeft);
          this.$set(item, 'maxRight', maxRight);
          this.$set(item, 'leftLocked', leftLocked);
          this.$set(item, 'rightLocked', rightLocked);
        });
      }
    },
    /**
     * @method updateItemMax
     * @param {Number} index
     */
    updateItemMax(index){
      if (!!this.currentData[index]) {
        let maxLeft = 0;
        let maxRight = this.currentEndUnix / this.secPerPx;
        if (!!this.currentData[index-1]) {
          maxLeft = (this.currentData[index-1].end - this.currentStartUnix) / this.secPerPx;
        }

        if (!!this.currentData[index+1]) {
          maxRight = (this.currentData[index+1].start - this.currentStartUnix) / this.secPerPx;
        }

        this.currentData[index].maxLeft = maxLeft;
        this.currentData[index].maxRight = maxRight;
      }
    },
    /**
     * @method scrollToFirstItem
     * @fires $nextTick
     * @fires scrollTo
     */
    scrollToFirstItem(){
      this.$nextTick(() => {
        setTimeout(() => {
          if (!!this.filteredData.length) {
            let item = !!this.uid ? this.filteredData[0].data[this.uid] : this.filteredData[0].key;
            this.scrollSet(item);
          }
        }, 300);
      });
    },
    /**
     * @method scrollTo
     * @param {String} item
     * @fires getRef
     */
    scrollSet(item){
      let itemRef = this.getRef('item-' + item);
      if (itemRef) {
        this.getRef('scroll').scrollSet(itemRef);
      }
    }
  },
  /**
   * @event created
   * @fires updateData
   */
  created(){
    this.updateData(true);
  },
  /**
   * @event mounted
   */
  mounted(){
    this.ready = true;
  },
  watch: {
    /**
     * @watch currentStartUnix
     * @fires getStartDatetime
     * @fires getCurrentFilters
     * @fires updateData
     */
    currentStartUnix(){
      this.startDatetime = this.getStartDatetime();
      this.currentFilters = this.getCurrentFilters();
      this.updateData();
    },
    /**
     * @watch currentEndUnix
     * @fires getEndDatetime
     * @fires getCurrentFilters
     * @fires updateData
     */
    currentEndUnix(){
      this.endDatetime = this.getEndDatetime();
      this.currentFilters = this.getCurrentFilters();
      this.updateData();
    },
    /**
     * @watch step
     * @fires updateData
     */
    step(){
      this.updateData();
    },
    /**
     * @watch secPerPx
     * @fires updateData
     */
    secPerPx(){
      if (!this.isLoading) {
        this.updateData();
      }
    },
    /**
     * @watch filters
     * @fires getCurrentFilters
     */
    filters: {
      deep: true,
      handler() {
        this.currentFilters = this.getCurrentFilters();
      }
    }
  },
  components: {
    item: {
      name: 'item',
      template: `
        <div class="bbn-tracks-item bbn-middle"
              :style="{
                left: source.left + 'px',
                width: source.width + 'px',
                backgroundColor: currentBgColor
              }"
              bbn-resizable.left.right="isEditable"
              @userresizestart="onResizeStart"
              @userresize="onResize"
              @userresizeend="onResizeEnd"
              @mouseover="isMouseOver = true"
              @mouseleave="isMouseOver = false"
              @click="edit">
          <div bbn-if="isResizing"
                class="bbn-tracks-item-resizing-times bbn-alt-background bbn-alt-text bbn-spadding bbn-radius"
                style="z-index: 1">
            <div class="bbn-vmiddle bbn-no-wrap">
              <i class="nf nf-md-calendar_start bbn-right-sspace bbn-lg"/>
              <span bbn-text="currentStart"/>
            </div>
            <div class="bbn-vmiddle bbn-no-wrap bbn-top-sspace">
              <i class="nf nf-md-calendar_end bbn-right-sspace bbn-lg"/>
              <span bbn-text="currentEnd"/>
            </div>
          </div>
          <div bbn-else-if="isMouseOver && !main.isResizing"
                class="bbn-tracks-item-overlay bbn-c bbn-alt-background bbn-alt-text bbn-spadding bbn-radius">
            <div bbn-if="source.title"
                  bbn-html="source.title"
                  class="bbn-bottom-sspace bbn-primary-text-alt"/>
            <div class="bbn-vmiddle bbn-no-wrap">
              <i class="nf nf-md-calendar_start bbn-right-sspace bbn-lg bbn-green"/>
              <span bbn-text="currentStart"/>
            </div>
            <div class="bbn-vmiddle bbn-no-wrap bbn-top-sspace">
              <i class="nf nf-md-calendar_end bbn-right-sspace bbn-lg bbn-red"/>
              <span bbn-text="currentEnd"/>
            </div>
          </div>
        </div>
      `,
      props: {
        source: {
          type: Object,
          required: true
        },
        resizable: {
          type: Boolean
        },
        selected: {
          type: Boolean
        }
      },
      data(){
        return {
          main: this.closest('bbn-tracks'),
          isResizing: false,
          isMouseOver: false,
          originalSource: bbn.fn.clone(this.source)
        }
      },
      computed: {
        isEditable(){
          return !!this.main.editable;
        },
        currentStart(){
          return dayjs.unix(this.source.start).format('DD/MM/YYYY HH:mm:ss');
        },
        currentEnd(){
          return dayjs.unix(this.source.end).format('DD/MM/YYYY HH:mm:ss');
        },
        currentBgColor(){
          return !!this.isResizing ?
            this.source.bgColor + '66' :
            ((this.isMouseOver && !this.main.isResizing) || this.selected ?
              this.source.bgColor :
              this.source.bgColor + 'B3');
        }
      },
      methods: {
        onResizeStart(event){
          if (!this.resizable || !this.isEditable || this.main.isResizing) {
            event.preventDefault();
            return;
          }

          this.originalSource = bbn.fn.clone(this.source);
          this.isResizing = true;
        },
        onResize(event){
          if (!this.isEditable) {
            event.preventDefault();
            return;
          }
          else if (event.detail.from === 'left') {
            if (!!this.source.leftLocked) {
              event.preventDefault();
              return;
            }

            let left = this.source.left - event.detail.movement;
            let start = this.source.start - (event.detail.movement * this.main.secPerPx);
            if ((left < this.source.maxLeft)
              || (start < this.main.currentStartUnix)
            ) {
              event.preventDefault();
              return;
            }

            this.source.left = left;
            this.source.start = start;
          }
          else if (event.detail.from === 'right') {
            if (!!this.source.rightLocked) {
              event.preventDefault();
              return;
            }

            let right = this.source.left + this.source.width - event.detail.movement;
            let end = this.source.end - (event.detail.movement * this.main.secPerPx);
            if ((right > this.source.maxRight)
              || (end > this.main.currentEndUnix)
            ) {
              event.preventDefault();
              return;
            }

            this.source.end = end;
          }

          this.source.width = ((!!this.source.rightLocked ? this.main.currentEndUnix : this.source.end) - (!!this.source.leftLocked ? this.main.currentStartUnix : this.source.start)) / this.main.secPerPx;
          this.main.updateItemMax(this.source.index - 1);
          this.main.updateItemMax(this.source.index + 1);
          this.source.data.start = dayjs.unix(this.source.start).format('YYYY-MM-DD HH:mm:ss');
          this.source.data.end = dayjs.unix(this.source.end).format('YYYY-MM-DD HH:mm:ss');
        },
        onResizeEnd(event){
          if (!this.isEditable) {
            event.preventDefault();
            return;
          }

          this.isResizing = false;
          if (!bbn.fn.isSame(this.source, this.originalSource)) {
            this.main.$emit('edit', this.source.data);
          }
        },
        edit(event){
          if (this.isEditable
            && !this.isResizing
            && !this.main.isResizing
            && !event.defaultPrevented
            && !event.target?.bbnDirectives?.resizable?.resizing
          ) {
            if (!!this.main.editedRow) {
              this.main.editedRow = false;
            }

            this.$nextTick(() => {
              this.main.edit(this.source.data, {
                label: bbn._('Edit'),
                component: !this.main.editor ? this.main.$options.components.popupEditor : undefined,
                minWidth: 500
              }, this.source.index);
            });
          }
        }
      },
      watch: {
        isResizing(newVal){
          this.main.isResizing = newVal;
        }
      }
    },
    popupEditor: {
      template: `
        <bbn-form :source="source.row"
                  :data="source.data"
                  :action="main.url"
                  :scrollable="false"
                  @success="success"
                  @failure="failure"
                  @cancel="cancel"
                  ref="form">
          <div class="bbn-padding bbn-grid-fields">
            <span class="bbn-label">` + bbn._('Start') + `</span>
            <bbn-datetimepicker bbn-model="source.row.start"
                                :show-second="true"
                                required/>
            <span class="bbn-label">` + bbn._('End') + `</span>
            <bbn-datetimepicker bbn-model="source.row.end"
                                :show-second="true"
                                required/>
          </div>
        </bbn-form>
      `,
      props: {
        source: {
          type: Object,
          required: true
        }
      },
      data(){
        return {
          main: this.closest('bbn-tracks')
        }
      },
      methods: {
        success(d, e) {
          e.preventDefault();
          if (this.main.successEdit
            && bbn.fn.isFunction(this.main.successEdit)
            && this.main.successEdit(d)
          ) {
            this.main.getPopup().close();
            this.main.updateData();
          }
        },
        failure(d) {
          this.main.$emit('editfailure', d);
        },
        cancel() {
          if (this.main
            && bbn.fn.isFunction(this.main.cancel)
          ) {
            this.main.cancel();
          }
        }
      }
    },
    toolbarEditor: {
      template: `
        <bbn-form :source="source"
                  :data="getData()"
                  :action="main.url"
                  :scrollable="false"
                  @success="onSuccess"
                  @failure="onFailure"
                  @cancel="onCancel"
                  ref="form"
                  :buttons="[]"
                  @hook:mounted="setForm"
                  :validation="validation">
          <div class="bbn-hspadding bbn-bottom-spadding bbn-vmiddle bbn-flex-width"
                style="gap: var(--space); align-items: flex-end">
            <div class="bbn-flex-fill bbn-flex-wrap bbn-vmiddle"
                  style="gap: var(--space); align-items: flex-end; flex-wrap: wrap !important">
              <span>
                <span class="bbn-toplabel">` + bbn._('Start') + `</span>
                <bbn-datetimepicker bbn-model="source.start"
                                    :show-second="true"
                                    required/>
              </span>
              <span  class="bbn-toplabel">
                <span class="bbn-left-space">` + bbn._('End') + `</span>
                <bbn-datetimepicker bbn-model="source.end"
                                    :show-second="true"
                                    required/>
              </span>
              <div class="bbn-flex"
                    style="gap: var(--sspace)">
                <bbn-button @click="save"
                            text="` + bbn._('Save') + `"
                            :notext="true"
                            icon="nf nf-fa-check_circle"
                            class="bbn-primary bbn-xl"
                            :disabled="!form || !form.canSubmit"/>
                <bbn-button @click="cancel"
                            text="` + bbn._('Cancel') + `"
                            :notext="true"
                            icon="nf nf-fa-times_circle"
                            class="bbn-xl"/>
              </div>
            </div>
            <bbn-button @click="remove"
                        icon="nf nf-fa-trash"
                        class="bbn-bg-red bbn-white bbn-xl"
                        text="` + bbn._('Delete') + `"
                        :notext="true"/>
          </div>
        </bbn-form>
      `,
      props: {
        source: {
          type: Object,
          required: true
        }
      },
      data(){
        return {
          main: this.closest('bbn-tracks'),
          form: false
        }
      },
      methods: {
        validation(){
          if (dayjs(this.source.end).unix() < dayjs(this.source.start).unix()) {
            this.alert(bbn._('The end date must be more recent than the start date'));
            return false;
          }
          return true;
        },
        setForm(){
          this.form = this.getRef('form');
        },
        getData(){
          return bbn.fn.isFunction(this.main.data) ? this.main.data() : this.main.data;
        },
        save(){
          if (this.form) {
            this.form.submit();
          }
        },
        cancel(){
          if (this.form) {
            this.form.cancel();
          }
        },
        removeItem(){
          this.confirm(bbn._('Are you sure you want to delete this item?'), () => {
            this.post(this.main.url, {
              action: 'delete',
              id: this.source.id
            }, d => {
              if (d.success) {
                this.main.updateData();
                this.main.editedRow = false;
              }
            });
          });
        },
        onSuccess(d, e) {
          e.preventDefault();
          if (this.main.successEdit
            && bbn.fn.isFunction(this.main.successEdit)
            && this.main.successEdit(d)
          ) {
            this.main.getPopup().close();
            this.main.updateData();
          }
        },
        onFailure(d) {
          this.main.$emit('editfailure', d);
        },
        onCancel() {
          if (this.main
            && bbn.fn.isFunction(this.main.cancel)
          ) {
            this.main.cancel();
          }
        }
      }
    }
  }
};

import cpHtml from './tracks.html';
import cpStyle from './tracks.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/tracks.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-tracks',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
