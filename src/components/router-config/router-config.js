/**
 * @file bbn-router component
 * @description bbn-router is a component that allows and manages the navigation (url) between the various containers of an application
 * @copyright BBN Solutions
 * @author BBN Solutions
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.localStorage
     */
    mixins: 
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.localStorage,
    ],
    statics() {
      const img = `<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve">
<g>
 <path d="M57,6H1C0.448,6,0,6.447,0,7v44c0,0.553,0.448,1,1,1h56c0.552,0,1-0.447,1-1V7C58,6.447,57.552,6,57,6z M56,50H2V8h54V50z"
   />
 <path d="M16,28.138c3.071,0,5.569-2.498,5.569-5.568C21.569,19.498,19.071,17,16,17s-5.569,2.498-5.569,5.569
   C10.431,25.64,12.929,28.138,16,28.138z M16,19c1.968,0,3.569,1.602,3.569,3.569S17.968,26.138,16,26.138s-3.569-1.601-3.569-3.568
   S14.032,19,16,19z"/>
 <path d="M7,46c0.234,0,0.47-0.082,0.66-0.249l16.313-14.362l10.302,10.301c0.391,0.391,1.023,0.391,1.414,0s0.391-1.023,0-1.414
   l-4.807-4.807l9.181-10.054l11.261,10.323c0.407,0.373,1.04,0.345,1.413-0.062c0.373-0.407,0.346-1.04-0.062-1.413l-12-11
   c-0.196-0.179-0.457-0.268-0.72-0.262c-0.265,0.012-0.515,0.129-0.694,0.325l-9.794,10.727l-4.743-4.743
   c-0.374-0.373-0.972-0.392-1.368-0.044L6.339,44.249c-0.415,0.365-0.455,0.997-0.09,1.412C6.447,45.886,6.723,46,7,46z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

`;
      return {img};
    },
    props: {
      router: {
        type: HTMLElement,
        required: true
      },
      visual: {
        type: Boolean,
        default: true
      },
      tabs: {
        type: Boolean,
        default: true
      },
      breadcrumb: {
        type: Boolean,
        default: true
      },
    },
    data() {
      let modes = ['visual', 'tabs', 'breadcrumb'];
      let num = 0;
      bbn.fn.each(modes, m => {
        if (this[m]) {
          num++;
        }
      });
      if (num < 2) {
        throw new Error(bbn._("You cannot have more then one mode disabled"))
      }

      return {
        numModes: num,
        svg: bbnRouterConfig.img,
        visualSelected: 2,
        breadcrumbSelected: 2,
        tabsSelected: 2,
        breadcrumbActive: false,
        visualShowAll: false,
      };
    },
    computed: {
      orientations() {
        let tmp = {
          auto: {
            pos: bbn._("Auto"),
            text: bbn._("Picks left or top in function of your window's size"),
            value: false
          },
          left: {
            pos: bbn._("Left"),
            text: bbn._("On the left of the main content"),
            area: '1 / 2 / 6 / 6',
            value: false
          },
          top: {
            pos: bbn._("Top"),
            text: bbn._("On the top of the main content"),
            area: '2 / 1 / 6 / 6',
            value: false
          },
          right: {
            pos: bbn._("Right"),
            text: bbn._("On the right of the main content"),
            area: '1 / 1 / 6 / 5',
            value: false
          },
          bottom: {
            pos: bbn._("Bottom"),
            text: bbn._("On the bottom of the main content"),
            area: '1 / 1 / 5 / 6',
            value: false
          }
        };
        tmp.auto.area = tmp[this.guessedOrientation].area;
        return tmp;
      },
      db() {
        return this.router?.db
      },
      mode: {
        get() {
          if (this.router.isVisual) {
            return 'visual';
          }
          if (this.router.isBreadcrumb) {
            return 'breadcrumb';
          }
          if (this.router.nav) {
            return 'tabs';
          }
          return false;
        },
        set(v) {
          switch (v) {
            case 'visual':
              this.router.currentVisual = true;
              this.router.isBreadcrumb = false;
              break;
            case 'breadcrumb':
              this.router.isBreadcrumb = true;
              this.router.currentVisual = false;
              break;
            default:
              this.router.isBreadcrumb = false;
              this.router.currentVisual = false;
              break;
          }
        }
      },
      guessedOrientation() {
        return this.router.lastKnownWidth > this.router.lastKnownHeight ? 'left' : 'top';
      },
      currentOrientation: {
        get() {
          return this.router.lockedOrientation ? this.router.visualOrientation : 'auto';
        },
        set(v) {
          if (this.orientations[v]) {
            this.router.lockedOrientation = v !== 'auto'
            this.router.visualOrientation = v ===  'auto' ? 
                (this.router.lastKnownWidth > this.router.lastKnownHeight ? 'left' : 'top')
                : v;
          }
        }
      }
    },

    methods: {
      onSelect(mode, index) {
        let v = this[mode + 'Selected'];
        if (v !== undefined) {
          if (v === index) {
            this.mode = mode;
          }
          else {
            this[mode + 'Selected'] = index;
            this.visualShowAll = false;
          }
        }
      }
    },
    components: {
      container: {
        template: `
<div class="bbn-section bbn-w-100 bbn-bottom-margin bbn-flex-vcentered">
  <div style="width: 10rem" class="bbn-right-lspace">
    <img bbn-if="thumbnail"
         :src="thumbnail"
         style="width: 100%; max-height: 10rem; height: auto">
    <bbn-icon bbn-else
              content="nf nf-fa-image"
              size="7rem"/>
  </div>
  <div class="bbn-flex-fill">
    <div class="bbn-flex-vcentered bbn-bottom-margin">
      <div class="bbn-flex-fill">
        <bbn-icon :content="source.icon || 'nf nf-fa-question'"
                  class="bbn-right-space bbn-radius bbn-border bbn-padding bbn-xl"/>
        <bbn-button icon="nf nf-md-magnify_scan"
                    @click="browse(source)"/>
        <span bbn-text="source.label"
              class="bbn-light bbn-lg"/>
      </div>
      <div>
        <bbn-button icon="nf nf-fa-trash"
                    @click="del(source)"/>
        <bbn-button icon="nf nf-fa-trash"
                    @click="del(source)"/>
        <bbn-button icon="nf nf-fa-trash"
                    @click="del(source)"/>
      </div>
    </div>
    <div class="bbn-flex-vcentered">
      <div class="bbn-flex-fill">
        <strong>URL: </strong>
        <span class="bbn-light"
              bbn-text="source.url"/>
      </div>
      <div>Buttons</div>
    </div>
  </div>
</div>
        `,
        data() {
          return {
            thumbnail: false,
            db: this.bbnComponent.db
          }
        },
        methods: {
          del(o) {

          },
          browse(o) {
            this.bbnComponent.router.getPopup({
              height: '90%',
              width: '90%',
              maxWidth: '1200px',
              component: 'bbn-iconpicker',
              componentOptions: {
                source: {
                  obj: o,
                  field: 'icon'
                }
              }
            })
          }
        },
        mounted() {
          this.db.selectOne('containers', 'image', {url: this.source.url}).then(res => {
            if (res) {
              this.thumbnail = res;
            }
          });
  
        }
      }
    }
  };

import cpHtml from './router-config.html';
import cpStyle from './router-config.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/router-config.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-router-config',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
