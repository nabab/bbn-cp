
export default {
  props: {
    /**
     * @todo Integrates Boolean to have a default with no menu
     * @prop {Array|Function} [[]] menu
     */
    menu: {
      type: [Array, Function],
      default: function () {
        return [];
      }
    },
  },
  methods: {
    /**
     * @method getMenuFn
     * @param {Number} idx
     * @fires getSubRouter
     * @fires getContainer
     * @fires reload
     * @return {Array|Boolean}
     */
    getMenuFn(idx) {
      if (!this.nav || !this.views[idx] || (this.views[idx].menu === false)) {
        return [];
      }
      let items = [];
      let tmp = ((bbn.fn.isFunction(this.views[idx].menu) ? this.views[idx].menu() : this.views[idx].menu) || []).slice();
      let others = false;
      let container = this.getContainer(idx);
      bbn.fn.each(this.views, (a, i) => {
        if ((i !== idx) && !a.fixed) {
          others = true;
          return false;
        }
      });

      if (!this.views[idx].help) {
        let sub = this.getSubRouter(idx);
        if (sub && sub.views && sub.views.length) {
          let helps = [];
          sub.views.forEach(a => {
            if (a.help) {
              helps.push({
                url: sub.fullBaseURL + a.url,
                content: a.help,
                title: a.title || a.url,
                anchor: bbn.fn.randomString(15, 20).toLowerCase()
              });
            }
          });
          if (helps.length === 1) {
            this.views[idx].help = helps[0].content;
          }
          else if (helps.length) {
            this.views[idx].help = '';
            let slide1 = '';
            helps.forEach(a => {
              slide1 += '<h1><a href="#' + a.anchor + '">' + a.title + '</a></h1>\n';
              this.views[idx].help += '---slide---' + '\n<a name="' + a.anchor + '">\n' + a.content;
            });
            this.views[idx].help = slide1 + this.views[idx].help;
          }
        }
      }

      if (this.views[idx].help) {
        items.push({
          text: bbn._("Help"),
          key: "help",
          icon: "nf nf-mdi-help_circle_outline",
          action: () => {
            let view = this.getContainer(idx),
              span = document.createElement('span');
            span.innerHTML = this.views[idx].title;
            let title = span.innerText;
            if (!title && span.querySelector("[title]").length) {
              title = span.querySelector("[title]").getAttribute("title");
            }
            view.getPopup({
              scrollable: false,
              component: {
                props: ['source'],
                template: `
                  <bbn-slideshow :source="source.content"
                                class="bbn-bg-webblue bbn-white"
                                :full-slide="true"
                                separator="---slide---"></bbn-slideshow>`
              },
              source: {
                content: this.views[idx].help
              },
              title: '<i class="bbn-large nf nf-mdi-help_circle_outline"> </i> <span class="bbn-iblock">' + title + '</span>',
              width: '90%',
              height: '90%'
            });
          }
        })
      }

      if (this.views[idx].load && !this.views[idx].component) {
        items.push({
          text: bbn._("Reload"),
          key: "reload",
          icon: "nf nf-mdi-sync",
          action: () => {
            this.reload(idx);
          }
        });
      }

      if (container && container.fullScreen) {
        items.push({
          text: bbn._("Exit full screen"),
          key: "reduce",
          icon: "nf nf-mdi-arrow_collapse",
          action: () => {
            container.fullScreen = false;
          }
        });
      }
      else if (container && !container.isPane) {
        items.push({
          text: bbn._("Enlarge"),
          key: "enlarge",
          icon: "nf nf-mdi-arrow_expand_all",
          action: () => {
            container.fullScreen = true;
          }
        });
      }



      if (tmp && tmp.length) {
        bbn.fn.each(tmp, (a, i) => {
          items.push(a)
        });
      }

      if (this.views[idx].icon && this.views[idx].title && !this.isBreadcrumb && !this.isVisual) {
        items.push({
          text: this.views[idx].notext ? bbn._("Show text") : bbn._("Show only icon"),
          key: "notext",
          icon: this.views[idx].notext ? "nf nf-fa-font" : "nf nf-fa-font_awesome",
          action: () => {
            this.$set(this.views[idx], 'notext', !this.views[idx].notext);
          }
        });
      }

      // Adding a shortcut
      if (window.appui) {
        items.push({
          text: bbn._("Create a shortcut"),
          key: "shortcut",
          icon: "nf nf-fa-link",
          action: () => {
            this.$emit('shortcut', {
              text: this.views[idx].title,
              icon: this.views[idx].icon || 'nf nf-fa-link',
              url: this.getFullBaseURL() + this.views[idx].url
            });
          }
        });
      }

      if (container) {
        items.push({
          text: bbn._("Copy content text"),
          icon: "nf nf-fa-copy",
          key: "text_copy",
          action: () => {
            let scroll = container.getRef('scroll');
            let ok = false;
            if (scroll) {
              let scrollContent = scroll.getRef('scrollContent');
              if (scrollContent) {
                bbn.fn.copy(scrollContent.innerText)
                ok = true;
              }
            }
            if (ok) {
              appui.success(bbn._("Copied!"))
            }
            else {
              appui.error(bbn._("Not copied!"))
            }
          }
        });
        items.push({
          text: bbn._("Copy content HTML"),
          icon: "nf nf-fa-html5",
          key: "html_copy",
          action: () => {
            let scroll = container.getRef('scroll');
            let ok = false;
            if (scroll) {
              let scrollContent = scroll.getRef('scrollContent');
              if (scrollContent) {
                bbn.fn.copy(scrollContent.innerHTML)
                ok = true;
              }
            }
            if (ok) {
              appui.success(bbn._("Copied!"))
            }
            else {
              appui.error(bbn._("Not copied!"))
            }
          }
        });
        items.push({
          text: bbn._("Screenshot"),
          icon: "nf nf-mdi-image_album",
          key: "screenshot",
          items: [
            {
              text: bbn._("Download"),
              key: "screenshot_dl",
              icon: "nf nf-mdi-arrow_expand_all",
              action: () => {
                container.takeScreenshot().then(canvas => {
                  if (canvas) {
                    bbn.fn.downloadContent(
                      bbn.fn.replaceAll('/', '-', container.getFullCurrentURL() + '_' + bbn.fn.dateSQL(undefined, true) + '.png'),
                      canvas
                    )
                  }
                });
              }
            }, {
              text: bbn._("Copy"),
              key: "screenshot_copy",
              icon: "nf nf-mdi-image_multiple",
              action: () => {
                container.takeScreenshot(0.5).then(canvas => {
                  if (canvas) {
                    canvas.toBlob(blob => {
                      bbn.fn.copy(blob).then(() => {
                        appui.success();
                      })
                    });
                  }
                });
              }
            }, {
              text: bbn._("Copy full size"),
              key: "screenshot_copy",
              icon: "nf nf-mdi-image_multiple",
              action: () => {
                container.takeScreenshot(1).then(canvas => {
                  if (canvas) {
                    canvas.toBlob(blob => {
                      bbn.fn.copy(blob).then(() => {
                        appui.success();
                      })
                    });
                  }
                });
              }
            }
          ]
        });
      }

      if (!this.views[idx].fixed && !this.views[idx].pane) {
        if (this.isBreadcrumb) {
          items.push({
            text: bbn._("Close"),
            key: "close",
            icon: "nf nf-mdi-close",
            action: () => {
              this.close(idx);
            }
          });
        }
        else {
          if (!this.views[idx].pinned) {
            items.push({
              text: bbn._("Pin"),
              key: "pin",
              icon: "nf nf-mdi-pin",
              action: () => {
                this.pin(idx);
              }
            });
            items.push({
              text: bbn._("Close"),
              key: "close",
              icon: "nf nf-mdi-close",
              action: () => {
                this.close(idx);
              }
            })
          }
          else {
            items.push({
              text: bbn._("Unpin"),
              key: "pin",
              icon: "nf nf-mdi-pin_off",
              action: () => {
                this.unpin(idx);
              }
            });
          }
        }
      }

      if (others && !this.views[idx].pane) {
        items.push({
          text: bbn._("Close Others"),
          key: "close_others",
          icon: "nf nf-mdi-close_circle_outline",
          action: () => {
            this.closeAllBut(idx);
          }
        });

        if (!this.isVisual) {
          let directions = [];
          if (idx) {
            if (idx > 1) {
              directions.push({
                text: bbn._("First"),
                key: "move_first",
                icon: "nf nf-mdi-close_circle_outline",
                action: () => {
                  this.move(idx, 0);
                }
              });
            }
            directions.push({
              text: bbn._("Before"),
              key: "move_before",
              icon: "nf nf-mdi-close_circle_outline",
              action: () => {
                this.move(idx, idx - 1);
              }
            });
          }
          if (idx < (this.views.length - 1)) {
            directions.push({
              text: bbn._("After"),
              key: "move_after",
              icon: "nf nf-mdi-close_circle_outline",
              action: () => {
                this.move(idx, idx + 1);
              }
            });
            if (idx < (this.views.length - 2)) {
              directions.push({
                text: bbn._("Last"),
                key: "move_last",
                icon: "nf nf-mdi-close_circle_outline",
                action: () => {
                  this.move(idx, this.views.length - 1);
                }
              });
            }
          }

          if (directions.length) {
            if (directions.length === 1) {
              directions[0].text = bbn._("Switch position");
              items.push(directions[0]);
            }
            else {
              items.push({
                text: bbn._("Move"),
                key: "move",
                icon: "nf nf-mdi-close_circle_outline",
                items: directions
              });
            }
          }
        }
      }


      if (container && this.splittable) {
        if (container.isPane) {
          items.push({
            text: bbn._("Remove from pane"),
            key: "unpane",
            icon: "nf nf-mdi-window_restore",
            action: () => {
              this.removeFromPane(idx);
            }
          });
        }
        else {
          items.push({
            text: bbn._("Show in a new pane"),
            key: "split",
            icon: "nf nf-mdi-format_horizontal_align_right",
            action: () => {
              this.addToPane(idx);
            }
          });
          if (this.currentPanes.length) {
            let tmp = {
              text: bbn._("Show in pane"),
              key: "panes",
              icon: "nf nf-mdi-checkbox_multiple_blank_outline",
              items: []
            };
            bbn.fn.each(this.currentPanes, (a, i) => {
              tmp.items.push({
                text: 'Pane <div class="bbn-badge">' + (i + 1) + '</div>',
                key: "pane" + (i + 1),
                action: () => {
                  this.addToPane(idx, a.id);
                }
              })
            });
            items.push(tmp);
          }
        }
      }

      if (others && !this.views[idx].fixed && !this.views[idx].pane) {
        items.push({
          text: bbn._("Close All"),
          key: "close_all",
          icon: "nf nf-mdi-close_circle",
          action: () => {
            this.closeAll();
          }
        });
      }

      if (!this.views[idx].pane) {
        items.push({
          text: bbn._("Configuration"),
          key: "config",
          icon: "nf nf-fa-cogs",
          action: () => {
            this.showRouterCfg = true;
          }
        });
      }

      let menu = bbn.fn.isArray(this.menu) ? this.menu : this.menu(this.views[idx], this);
      if (menu.length) {
        bbn.fn.each(menu, a => {
          items.push(a);
        });
      }

      return items;
    }
  }
}