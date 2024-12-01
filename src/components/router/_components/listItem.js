export default {
  template: `
  <div class="bbn-w-100 bbn-vmiddle bbn-bordered-bottom"
       style="height: 2.5rem"
       @mouseenter="isHover = true"
       @mouseleave="isHover = false">
    <div class="bbn-flex-width bbn-vmiddle bbn-h-100">
      <div class="bbn-vmiddle bbn-h-100">
        <div bbn-for="(p, i) in source.parents"
             class="bbn-vmiddle bbn-h-100">
          <div class="bbn-vmiddle bbn-h-100"
              :style="{
                backgroundColor: !isHover && p.view.bcolor ? p.view.bcolor : null,
                color: !isHover && p.view.fcolor ? p.view.fcolor : null
              }">
            <div class="bbn-router-breadcrumb-badge-container bbn-middle"
                bbn-if="numProperties(p.view.events)">
              <span class="bbn-badge bbn-small bbn-bg-red"
                    bbn-text="numProperties(p.view.events)"/>
            </div>
            <div class="bbn-router-breadcrumb-loader bbn-border-text"
                :style="{borderColor: p.view.fcolor || null}"
                bbn-show="p.view.loading"/>
            <div :class="['bbn-router-breadcrumb-element', 'bbn-h-100', 'bbn-vmiddle', {'bbn-router-breadcrumb-dirty': p.view.dirty}]">
              <span bbn-if="p.view.icon"
                    :title="p.view.title"
                    :class="'bbn-router-breadcrumb-element-icon bbn-h-100 bbn-vmiddle bbn-right-xsspace' + (p.view.notext ? ' bbn-lg' : ' bbn-m')">
                <i :class="p.view.icon"/>
              </span>
              <span bbn-if="!p.view.notext"
                    class="bbn-router-breadcrumb-element-text"
                    :title="p.view.title && (p.view.title.length > p.maxTitleLength) ? p.view.title : ''"
                    bbn-html="p.view.title ? shortTitle(p) : '` + bbn._('Untitled') + `'"/>
            </div>
          </div>
          <div>
            <i class="nf nf-fa-angle_right bbn-hsmargin bbn-router-breadcrumb-arrow"/>
          </div>
        </div>
  
        <div class="bbn-vmiddle bbn-h-100"
            :style="{
              backgroundColor: !isHover && source.view.bcolor ? source.view.bcolor : null,
              color: !isHover && source.view.fcolor ? source.view.fcolor : null
            }">
          <div class="bbn-router-breadcrumb-badge-container bbn-middle"
               bbn-if="numProperties(source.view.events)">
            <span class="bbn-badge bbn-small bbn-bg-red"
                  bbn-text="numProperties(source.view.events)"/>
          </div>
          <div class="bbn-router-breadcrumb-loader bbn-border-text"
               :style="{borderColor: source.view.fcolor || null}"
               bbn-show="source.view.loading"/>
          <div :class="['bbn-router-breadcrumb-element', 'bbn-h-100', 'bbn-vmiddle', {'bbn-router-breadcrumb-dirty': source.view.dirty}]">
            <span bbn-if="source.view.icon"
                  :title="source.view.title"
                  :class="'bbn-router-breadcrumb-element-icon bbn-h-100 bbn-vmiddle bbn-right-xsspace' + (source.view.notext ? ' bbn-lg' : ' bbn-m')">
              <i :class="source.view.icon"/>
            </span>
            <span bbn-if="!source.view.notext"
                  class="bbn-router-breadcrumb-element-text"
                  :title="source.view.title && (source.view.title.length > source.maxTitleLength) ? source.view.title : ''"
                  bbn-html="source.view.title ? (source.parents.length? shortTitle(source): source.view.title) : '` + bbn._('Untitled') + `'"/>
          </div>
        </div>
  
        <div bbn-for="(p, i) in source.children"
             class="bbn-vmiddle bbn-h-100">
          <div>
            <i class="nf nf-fa-angle_right bbn-hsmargin bbn-large bbn-router-breadcrumb-arrow"/>
          </div>
          <div class="bbn-vmiddle bbn-h-100"
               :style="{
                 backgroundColor: !isHover && p.view.bcolor ? p.view.bcolor : null,
                 color: !isHover && p.view.fcolor ? p.view.fcolor : null
               }">
            <div class="bbn-router-breadcrumb-badge-container bbn-middle"
                bbn-if="numProperties(p.view.events)">
              <span class="bbn-badge bbn-small bbn-bg-red"
                    bbn-text="numProperties(p.view.events)"/>
            </div>
            <div class="bbn-router-breadcrumb-loader bbn-border-text"
                :style="{borderColor: p.view.fcolor || null}"
                bbn-show="p.view.loading"/>
            <div :class="['bbn-router-breadcrumb-element', 'bbn-h-100', 'bbn-vmiddle', {'bbn-router-breadcrumb-dirty': p.view.dirty}]">
              <span bbn-if="p.view.icon"
                    :title="p.view.title"
                    :class="'bbn-router-breadcrumb-element-icon bbn-h-100 bbn-vmiddle bbn-right-xsspace' + (p.view.notext ? ' bbn-lg' : ' bbn-m')">
                <i :class="p.view.icon"/>
              </span>
              <span bbn-if="!p.view.notext"
                    class="bbn-router-breadcrumb-element-text"
                    :title="p.view.title && (p.view.title.length > p.maxTitleLength) ? p.view.title : ''"
                    bbn-html="p.view.title ? shortTitle(p) : '` + bbn._('Untitled') + `'"/>
               </div>
          </div>
        </div>
      </div>
      <div class="bbn-flex-fill bbn-h-100"
           :style="!isHover ? lastColors : {}">
        &nbsp;
      </div>
      <div bbn-if="!source.view.fixed"
            class="bbn-vmiddle bbn-h-100 bbn-hpadding"
            @mousedown.prevent.stop="close"
            @mouseup.prevent.stop
            :style="!isHover ? lastColors : {}">
        <i class="nf nf-fa-times_rectangle"/>
      </div>
    </div>
  </div>
    `,
  props: {
    /**
     * @prop {Object} source
     * @memberof listItem
     */
    source: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isHover: false
    }
  },
  computed: {
    lastColors() {
      let e = this.source.children.length ?
        this.source.children[this.source.children.length - 1].view
        : this.source.view;
      let r = {};
      if (e.bcolor) {
        r.backgroundColor = e.bcolor;
      }
      if (e.fcolor) {
        r.color = e.fcolor;
      }
      return r;
    }
  },
  methods: {
    numProperties: bbn.fn.numProperties,
    /**
     * @method close
     * @memberof listItem
     */
    close() {
      let k = this.source.key;
      if (this.source.closeAction()) {
        let list = this.closest('bbn-list');
        if (bbn.cp.isComponent(list) && list.source) {
          let idx = bbn.fn.search(list.source, { 'data.key': k });
          if (idx > -1) {
            list.source.splice(idx, 1);
            if (list.source.length) {
              list.updateData();
              this.$nextTick(() => {
                list.closest('bbn-floater').onResize(true);
              })
            }
            else {
              this.closest('bbn-floater').close();
            }
          }
        }
      }
    },
    shortTitle(src) {
      return src.view.title.length > src.maxTitleLength ?
        bbn.fn.shorten(src.view.title, src.maxTitleLength) :
        src.view.title;
    }
  }
  
};
