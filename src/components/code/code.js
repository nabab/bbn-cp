/*jshint esversion: 6 */
/**
 * @file bbn-code component
 *
 * @description bbn-code is a text editor.
 * It specializes in editing the code of a supported language.
 * Various tools are provided to the users, which can be configured to their liking.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */


return {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.events
     */
    mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.input,
      bbn.cp.mixins.events
    ],
    props: {
      mode: {
        type: String,
        default: 'php'
      },
      theme: {
        type: String,
        default: 'ayuLight'
      },
      extensions: {
        type: Array,
        default: null
      }
    },
    data() {
      return {
        state: null,
        widget: null,
        compartments: bbnData.immunizeValue(bbn.fn.createObject())
      }
    },

    methods: {
      updateDoc() {
        this.$emit('update', this.currentDoc);
      },
      getExtensions() {
        if (this.extensions?.length) {
          return this.extensions;
        }

        let cm = window.codemirror6;

        if (!this.mode || !this.theme) {
          throw new Error("You earmust provide a language and a theme");
        }
        if (!cm.languageExtensions[this.mode] && !['js', 'less', 'purephp'].includes(this.mode)) {
          throw new Error("Unknown language");
        }
        if (!cm.theme[this.theme]) {
          throw new Error("Unknown theme");
        }
        let extensions = [];

        // push current language extension and current theme extension
        this.compartments.language = new codemirror6.state.Compartment;
        if (this.mode === "js") {
          extensions.push(this.compartments.language.of(cm.javascript.javascript()));
        }
        else if (this.mode === "less") {
          extensions.push(this.compartments.language.of(cm.css.css()));
        }
        else if (this.mode === "purephp") {
          extensions.push(this.compartments.language.of(cm.languageExtensions['php']));
        }
        else if (cm.languageExtensions[this.mode]) {
          extensions.push(this.compartments.language.of(cm.languageExtensions[this.mode]));
        }
        else {
          throw new Error("Language unrecognized!");
        }

        this.compartments.theme = new codemirror6.state.Compartment;
        extensions.push(this.compartments.theme.of(cm.theme[this.theme]));
        this.compartments.readonly = new codemirror6.state.Compartment;
        extensions.push(this.compartments.readonly.of(this.disabled || this.readonly));

        return extensions;
      },
      onChange(tr) {
        this.widget.update([tr]);
        let value = this.widget.state.doc.toString();
        if (value !== this.value) {
          this.emitInput(value);
        }
      },
      initUntilExtensionsLoaded(max) {
        this.init();
      },
      init() {
        let cm = window.codemirror6;
        let extensions = this.getExtensions();
        //bbn.fn.log("extensions", extensions, this.extensions);
        let editorStateCfg = {
          doc: this.value,
          extensions,
          readOnly: cm.state.EditorState.readOnly.of(this.readonly)
        };
        this.state = cm.state.EditorState.create(editorStateCfg);
        this.widget = new cm.view.EditorView(bbnData.immunizeValue({
          state: this.state,
          parent: this.getRef('element'),
          dispatch: t => this.onChange(t)
        }));
      },
      onKeyDown(event) {
        this.lastKeyDown = event;
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
          let newValue = "";
          if (['javascript', 'js'].includes(this.mode) && window.beautifier.js) {
            const options = {
              indent_size: 2,
              space_in_empty_paren: true
            };
            newValue = window.beautifier.js(this.widget.state.doc.toString(), options);
          }
          else if (['css', 'less'].includes(this.mode) && window.beautifier.css) {
            const options = {
              indent_size: 2,
              space_in_empty_paren: true
            };
            newValue = window.beautifier.css(this.widget.state.doc.toString(), options);
          }
          else if (['html'].includes(this.mode) && window.beautifier.html) {
            const options = {
              indent_size: 2,
              space_in_empty_paren: true,
              wrap_attributes: 'force-aligned'
            };
            newValue = window.beautifier.html(this.widget.state.doc.toString(), options);
          }
          else if (['php', 'purephp'].includes(this.mode)) {
            const options = {
              indent_size: 2,
              space_in_empty_paren: true
            };
            if (this.mode === 'purephp') {
              options.plain = true;
            }

            newValue = window.beautifier.html(this.widget.state.doc.toString(), options);
          }

          this.widget.dispatch({
            changes: {
              from: 0,
              to: this.widget.state.doc.toString().length,
              insert: newValue
            }
          })
        }
        if (event.key === ".") {
          codemirror6.autocomplete.startCompletion(this.widget)
        }
        this.$emit('keydown', event);
      },
      scrollBottom() {
        let sc = this.find('div.cm-scroller');
        if (sc) {
          sc.scrollTop = sc.scrollHeight;
        }
      }
    },
    mounted() {
      this.initUntilExtensionsLoaded(100);
    },
    watch: {
      readonly(v) {
        this.widget.dispatch({
          effects: this.compartments.readonly.reconfigure(codemirror6.state.EditorState.readOnly.of(v))
        });
      },
      value(nv) {
        if (this.widget) {
          let value = this.widget.state.doc.toString();
          if (value !== nv) {
            this.widget.dispatch({
              changes: {
                from: 0,
                to: this.widget.state.doc.length,
                insert: nv
              }
            });
          }
        }
      }
    }
  }