
export default {
  props: {
    /**
     * @todo Integrates Boolean to have a default with no menu
     * @prop {Array|Function} [[]] menu
     */
    menu: {
      type: [Array, Function, Boolean],
      default: function () {
        return [];
      }
    },
  },
  methods: {
    /**
     * @method getMenuFn
     * @param {Number} idx
     * @fires getContainer
     * @fires reload
     * @return {Array|Boolean}
     */
    getMenuFn(idx) {
      const view = bbn.fn.getRow(this.views, {idx});
      if (!this.menu || !this.nav || !view || (view.menu === false)) {
        bbn.fn.log("NO MENU", idx, this.menu, this.nav, view, view?.menu)
        return [];
      }
      let items = [];
      let tmp = ((bbn.fn.isFunction(view.menu) ? view.menu() : view.menu) || []).slice();
      let others = false;
      let container = this.getContainer(idx);
      bbn.fn.each(this.views, (a, i) => {
        if ((i !== idx) && !a.fixed) {
          others = true;
          return false;
        }
      });

      if (!view.help) {
        let sub = this.urls[view.uid].subrouter;
        if (sub && sub.views && sub.views.length) {
          let helps = [];
          sub.views.forEach(a => {
            if (a.help) {
              helps.push({
                url: sub.fullBaseURL + a.url,
                content: a.help,
                label: a.label || a.url,
                anchor: bbn.fn.randomString(15, 20).toLowerCase()
              });
            }
          });
          if (helps.length === 1) {
            view.help = helps[0].content;
          }
          else if (helps.length) {
            view.help = '';
            let slide1 = '';
            helps.forEach(a => {
              slide1 += '<h1><a href="#' + a.anchor + '">' + a.label + '</a></h1>\n';
              view.help += '---slide---' + '\n<a name="' + a.anchor + '">\n' + a.content;
            });
            view.help = slide1 + view.help;
          }
        }
      }

      if (view.help) {
        items.push({
          text: bbn._("Help"),
          key: "help",
          icon: "nf nf-md-help_circle_outline",
          action: () => {
            let view = this.getContainer(idx),
              span = document.createElement('span');
            span.innerHTML = view.label;
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
                content: view.help
              },
              label: '<i class="bbn-large nf nf-md-help_circle_outline"> </i> <span class="bbn-iblock">' + title + '</span>',
              width: '90%',
              height: '90%'
            });
          }
        })
      }

      if (view.load && !view.component) {
        items.push({
          text: bbn._("Reload"),
          key: "reload",
          icon: "nf nf-md-sync",
          action: () => {
            this.reload(idx);
          }
        });
      }

      if (container && container.fullScreen) {
        items.push({
          text: bbn._("Exit full screen"),
          key: "reduce",
          icon: "nf nf-md-arrow_collapse",
          action: () => {
            container.fullScreen = false;
          }
        });
      }
      else if (container && !container.isPane) {
        items.push({
          text: bbn._("Enlarge"),
          key: "enlarge",
          icon: "nf nf-md-arrow_expand_all",
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

      if (view.icon && view.label && !this.isBreadcrumb && !this.isVisual) {
        items.push({
          text: view.notext ? bbn._("Show text") : bbn._("Show only icon"),
          key: "notext",
          icon: view.notext ? "nf nf-fa-font" : "nf nf-fa-font_awesome",
          action: () => {
            this.$set(view, 'notext', !view.notext);
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
              text: view.label,
              icon: view.icon || 'nf nf-fa-link',
              url: this.getFullBaseURL() + view.url
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
          icon: "nf nf-md-image_album",
          key: "screenshot",
          items: [
            {
              text: bbn._("Download"),
              key: "screenshot_dl",
              icon: "nf nf-md-arrow_expand_all",
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
              icon: "nf nf-md-image_multiple",
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
              icon: "nf nf-md-image_multiple",
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

      if (!view.fixed && !view.pane) {
        if (this.isBreadcrumb) {
          items.push({
            text: bbn._("Close"),
            key: "close",
            icon: "nf nf-md-close",
            action: () => {
              this.close(idx);
            }
          });
        }
        else {
          if (!view.pinned) {
            items.push({
              text: bbn._("Pin"),
              key: "pin",
              icon: "nf nf-md-pin",
              action: () => {
                this.pin(idx);
              }
            });
            items.push({
              text: bbn._("Close"),
              key: "close",
              icon: "nf nf-md-close",
              action: () => {
                this.close(idx);
              }
            })
          }
          else {
            items.push({
              text: bbn._("Unpin"),
              key: "pin",
              icon: "nf nf-md-pin_off",
              action: () => {
                this.unpin(idx);
              }
            });
          }
        }
      }

      if (others && !view.pane) {
        items.push({
          text: bbn._("Close Others"),
          key: "close_others",
          icon: "nf nf-md-close_circle_outline",
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
                icon: "nf nf-md-close_circle_outline",
                action: () => {
                  this.move(idx, 0);
                }
              });
            }
            directions.push({
              text: bbn._("Before"),
              key: "move_before",
              icon: "nf nf-md-close_circle_outline",
              action: () => {
                this.move(idx, idx - 1);
              }
            });
          }
          if (idx < (this.views.length - 1)) {
            directions.push({
              text: bbn._("After"),
              key: "move_after",
              icon: "nf nf-md-close_circle_outline",
              action: () => {
                this.move(idx, idx + 1);
              }
            });
            if (idx < (this.views.length - 2)) {
              directions.push({
                text: bbn._("Last"),
                key: "move_last",
                icon: "nf nf-md-close_circle_outline",
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
                icon: "nf nf-md-close_circle_outline",
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
            icon: "nf nf-md-window_restore",
            action: () => {
              this.removeFromPane(idx);
            }
          });
        }
        else {
          items.push({
            text: bbn._("Show in a new pane"),
            key: "split",
            icon: "nf nf-md-format_horizontal_align_right",
            action: () => {
              this.addToPane(idx);
            }
          });
          if (this.currentPanes.length) {
            let tmp = {
              text: bbn._("Show in pane"),
              key: "panes",
              icon: "nf nf-md-checkbox_multiple_blank_outline",
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

      if (others && !view.fixed && !view.pane) {
        items.push({
          text: bbn._("Close All"),
          key: "close_all",
          icon: "nf nf-md-close_circle",
          action: () => {
            this.closeAll();
          }
        });
      }

      if (this.configuration && !view.pane) {
        items.push({
          text: bbn._("Configuration"),
          key: "config",
          icon: "nf nf-fa-cogs",
          action: () => {
            this.getPopup({
              label: false,
              scrollable: true,
              closable: true,
              component: 'bbn-router-config',
              minWidth: 800,
              minHeight: 500,
              componentOptions: {
                router: this,
                visual: !this.parent
              }
            })
          }
        });
      }

      let menu = bbn.fn.isArray(this.menu) ? this.menu : this.menu(view, this);
      if (menu.length) {
        bbn.fn.each(menu, a => {
          items.push(a);
        });
      }

      return items;
    }
  }
}