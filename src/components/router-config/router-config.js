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
    // IndexedDb access for storing thumbnails in visual mode
    let db = false;
    bbn.fn.warning("LAUNCHING ROUTER CONFIG STATICS");
    bbn.fn.log(bbn.db, bbn.db?.ok);
    if (bbn.db && bbn.db.ok) {
      db = bbn.db;
      if (true || !db._structures?.bbn?.backups) {
        bbn.fn.warning("ADDING BACKUPS STRUCTURE");
        db.add('bbn', 'backups', {
          keys: {
            PRIMARY: {
              columns: ['key'],
              unique: true
            }
          },
          fields: {
            key: {},
            title: {},
            content: {},
            date: {},
            num: {}
          },
          num: 8
        });
      }
    }

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
      return {img, db};
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
        currentModeSelected: null,
        backups: []
      };
    },
    computed: {
      visualOrientations() {
        const tmp = {
          auto: {
            pos: bbn._("Auto"),
            text: bbn._("Picks left or top in function of your window's size"),
            value: false,
          }
        };
        if (!this.isMobile || !this.router.isOrientedVertically) {
          tmp.left = {
            pos: bbn._("Left"),
            text: bbn._("On the left of the main content"),
            area: '1 / 2 / 6 / 6',
            value: false
          };
        }
        if (!this.isMobile || this.router.isOrientedVertically) {
          tmp.top = {
            pos: bbn._("Top"),
            text: bbn._("On the top of the main content"),
            area: '2 / 1 / 6 / 6',
            value: false
          };
        }
        if (!this.isMobile || !this.router.isOrientedVertically) {
          tmp.right = {
            pos: bbn._("Right"),
            text: bbn._("On the right of the main content"),
            area: '1 / 1 / 6 / 5',
            value: false
          };
        }
        if (!this.isMobile || this.router.isOrientedVertically) {
          tmp.bottom = {
            pos: bbn._("Bottom"),
            text: bbn._("On the bottom of the main content"),
            area: '1 / 1 / 5 / 6',
            value: false
          };
        }

        tmp.auto.area = tmp[this.guessedOrientation].area;
        return tmp;
      },
      tabsOrientations() {
        const tmp = {
          auto: {
            pos: bbn._("Auto"),
            text: bbn._("On top by default..."),
            area: '2 / 1 / 6 / 6',
            value: false
          }
        };
        if (!this.isMobile || !this.router.isOrientedVertically) {
          tmp.left = {
            pos: bbn._("Left"),
            text: bbn._("On the left of the main content"),
            area: '1 / 2 / 6 / 6',
            value: false
          };
        }
        if (!this.isMobile || this.router.isOrientedVertically) {
          tmp.top = {
            pos: bbn._("Top"),
            text: bbn._("On the top of the main content"),
            area: '2 / 1 / 6 / 6',
            value: false
          };
        }
        if (!this.isMobile || !this.router.isOrientedVertically) {
          tmp.right = {
            pos: bbn._("Right"),
            text: bbn._("On the right of the main content"),
            area: '1 / 1 / 6 / 5',
            value: false
          };
        }
        if (!this.isMobile || this.router.isOrientedVertically) {
          tmp.bottom = {
            pos: bbn._("Bottom"),
            text: bbn._("On the bottom of the main content"),
            area: '1 / 1 / 5 / 6',
            value: false
          };
        }

        return tmp;
      },
      routerDb() {
        return this.router?.db
      },
      mode: {
        get() {
          return this.router.currentMode;
        },
        set(v) {
          this.router.currentMode = v;
        }
      },
      guessedOrientation() {
        return this.router.lastKnownWidth > this.router.lastKnownHeight ? 'left' : 'top';
      },
      currentVisualOrientation: {
        get() {
          return this.router.lockedVisualOrientation ? this.router.visualOrientation : 'auto';
        },
        set(v) {
          if (this.visualOrientations[v]) {
            this.router.lockedVisualOrientation = v !== 'auto'
            this.router.visualOrientation = v ===  'auto' ? 
                (this.router.lastKnownWidth > this.router.lastKnownHeight ? 'left' : 'top')
                : v;
          }
        }
      },
      currentTabsOrientation: {
        get() {
          return this.router.lockedTabsOrientation ? this.router.tabsOrientation : 'auto';
        },
        set(v) {
          if (this.tabsOrientations[v]) {
            this.router.lockedTabsOrientation = v !== 'auto';
            this.router.tabsOrientation = v === 'auto' ? 'top' : v;
          }
        }
      }
    },

    methods: {
      onSelect(mode, index) {
        if (this[mode]) {
          this.mode = mode;
        }
      },
      createBackup(cfg) {
        const title = bbn._("Backup created on %s", bbn.dt().fdate(false, true));
        this.closest('bbn-popup').prompt(bbn._("Please enter a title for this backup"), title, (title) => {
          const current = cfg || bbn.fn.clone(this.router.views).map(a => {
            delete a.uid;
            delete a.content;
            delete a.script;
            delete a.style;
            if (a.load) {
              a.loaded = false;
            }
            return a;
          });
          const key = 'backup-' + bbn.fn.timestamp();
          const d = {
            key,
            title,
            content: JSON.stringify(current),
            num: current.length,
            date: bbn.dt().datetime()
          };
          this.backups.push(d);
          this.db.insert('backups', d);
        });
      },
      renameBackup(backup) {
        this.closest('bbn-popup').prompt(bbn._("Please enter the new title for the backup"), backup.title, (title) => {
          if (title && (title !== backup.title)) {
            this.db.update('backups', {title}, {key: backup.key}).then(() => {
              backup.title = title;
            });
          }
        });
      },
      restoreBackup(backup) {
        if (backup && backup.content) {
          const views = JSON.parse(backup.content);
          this.closest('bbn-popup').confirm(bbn._("Do you wish to replace your current router configuration with the selected backup? If not it will add all the missing tabs to your current configuration"),
          () => {
            for (let i = this.router.views.length - 1; i >= 0; i--) {
              const row = bbn.fn.getRow(views, {url: this.router.views[i].url});
              if (!row && !this.router.views[i].fixed) {
                this.router.removeItem(i);
              }
            }
            bbn.fn.each(views, v => {
              if (!bbn.fn.getRow(this.router.views, {url: v.url})){
                this.router.add(v);
              }
            })
          },
          () => {
            bbn.fn.each(views, v => {
              if (!bbn.fn.getRow(this.router.views, {url: v.url})){
                this.router.add(v);
              }
            })
          });
        }
      },
      importBackup() {
        bbn.fn.getFileContent('application/json', content => {
          const views = JSON.parse(content);
          bbn.fn.log("IMPORT CONTENT", views);
          this.createBackup(views);
        })
      },
      exportBackup(backup) {
        bbn.fn.downloadContent(backup.title.replaceAll('/', '-') + '.json', JSON.stringify(JSON.parse(backup.content), null, 2), 'application/json');
      },
      deleteBackup(backup) {
        this.closest('bbn-popup').confirm(bbn._("Are you sure you want to delete this backup?"), () => {
          this.db.delete('backups', {key: backup.key}).then(() => {
            const idx = bbn.fn.search(this.backups, {key: backup.key});
            if (this.backups[idx]) {
              this.backups.splice(idx, 1);
            }
            appui.success(bbn._("Backup deleted"));
          });
        });
      }
    },
    beforeCreate() {
      if (this.constructor.db) {
        this.constructor.db.open('bbn').then(res => {
          this.db = res;
          this.db.selectAll('backups').then(backups => {
            this.backups = backups;
          });
        });
      }
    },
    mounted() {
      if (this.router.isVisual) {
        this.currentModeSelected = 'visual';
      }
      else if (this.router.isBreadcrumb) {
        this.currentModeSelected = 'breadcrumbs';
      }
      else {
        this.currentModeSelected = 'tabs';
      }
    },
    components: {
      container: {
        data() {
          return {
            thumbnail: false,
            db: this.bbnComponent.routerDb,
            router: this.bbnComponent.router
          }
        },
        methods: {
          del(data) {
            const idx = bbn.fn.search(this.router.views, {url: data.url});
            if (this.router.views[idx]) {
              this.router.removeItem(idx);
            }
          },
          moveUp(data) {
            const idx = bbn.fn.search(this.router.views, {url: data.url});
            if (this.router.views[idx] && idx) {
              this.router.move(idx, idx - 1);
            }
          },
          moveDown(data) {
            const idx = bbn.fn.search(this.router.views, {url: data.url});
            if (this.router.views[idx] && (idx < this.router.views.length - 1)) {
              this.router.move(idx, idx + 1);
            }
          },
          select(data) {
            const idx = bbn.fn.search(this.router.views, {url: data.url});
            this.router.route(data.current).then(() => {

            });
          },
          pin(data) {
            data.pinned = !data.pinned;
          },
          screenshot(data) {
            const idx = bbn.fn.search(this.router.views, {url: data.url});
            if (this.router.views[idx]) {
              this.router.views[idx].screenshot = !this.router.views[idx].screenshot;
              this.db.update('containers', {screenshot: this.router.views[idx].screenshot}, {url: data.url});
            }
          },
          edit(data) {
            bbn.fn.log("SHOULD EDIT", data)
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
import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-router-config',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
