/*jshint esversion: 6 */
// Importing beautifiers for different types of code
import { js_beautify, css_beautify, html_beautify } from "js-beautify";
// Importing Tern for JavaScript code analysis
import tern from "tern";
// Importing CodeMirror and various language support and extensions
import { LanguageSupport } from "@codemirror/language"
import * as autocomplete from "@codemirror/autocomplete";
import * as commands from "@codemirror/commands";
import * as collaboration from "@codemirror/collab";
import * as lsp from "codemirror-languageserver";
import * as language from "@codemirror/language";
import * as lint from "@codemirror/lint";
import * as state from "@codemirror/state";
import * as search from "@codemirror/search";
import * as view from "@codemirror/view";
import * as bbnCpCM from "@bbn/codemirror-lang-bbn-cp";
import * as css from "@codemirror/lang-css";
import * as javascript from "@codemirror/lang-javascript";
import * as json from "@codemirror/lang-json";
import * as html from "@codemirror/lang-html";
import * as less from "@codemirror/lang-less";
import * as markdown from "@codemirror/lang-markdown";
import * as php from "@codemirror/lang-php";
import * as python from "@codemirror/lang-python";
import * as xml from "@codemirror/lang-xml";
import * as yaml from "@codemirror/lang-yaml";
import * as theme from "thememirror";
import { abbreviationTracker } from '@emmetio/codemirror6-plugin';

// Mapping of language extensions to their respective CodeMirror language supports

const ignoredKeys = [].concat(...bbn.var.keys.leftRight, ...bbn.var.keys.upDown, ...bbn.var.keys.confirm, ...bbn.var.keys.dels);
function myHtml() {
  const myHtmlLang = html.htmlLanguage.configure({dialect: 'selfClosing'});
  return new LanguageSupport(myHtmlLang)
}
function myPhp() {
  return php.php({
    baseLanguage: myHtml().language,
    plain: false
  });
}
/**
 * @file Defines the bbn-code component.
 * @description `bbn-code` is a text editor designed for code editing. It supports various languages and provides a range of tools and configurations to enhance the coding experience.
 * @author BBN Solutions
 * @copyright BBN Solutions
 */
const cpDef = {
  statics() {
    return {
      modeCode: {
        bbn: 'bbn',
        css: 'css',
        html: 'html',
        js: 'javascript',
        json: 'json',
        less: 'less',
        md: 'markdown',
        php: 'php',
        py: 'python',
        scss: 'css',
        sql: 'sql',
        xml: 'xml',
        yaml: 'yaml',
      },
      cm: {
        languageExtensions: {
          bbn: [new LanguageSupport(bbnCpCM.bbnLanguage)],
          css: [new LanguageSupport(css.cssLanguage)],
          html: [myHtml()],
          javascript: [new LanguageSupport(javascript.javascriptLanguage)],
          json: [new LanguageSupport(json.jsonLanguage)],
          less: [new LanguageSupport(less.lessLanguage)],
          markdown: [new LanguageSupport(markdown.markdownLanguage)],
          php: [myPhp()],
          python: [new LanguageSupport(python.pythonLanguage)],
          xml: [new LanguageSupport(xml.xmlLanguage)],
          yaml: [new LanguageSupport(yaml.yamlLanguage)],
        },
        autocomplete,
        commands,
        collaboration,
        language,
        lint,
        lsp,
        state,
        search,
        view,
        bbn: bbnCpCM,
        css,
        html,
        javascript,
        json,
        less,
        markdown,
        php,
        python,
        xml,
        yaml,
        theme,
        // Emmet abbreviation tracker for improved code writing efficiency
        elmet: abbreviationTracker(),
        extensions: {
          lineNumbers: view.lineNumbers(),
          highlightActiveLineGutter: view.highlightActiveLineGutter(),
          highlightSpecialChars: view.highlightSpecialChars(),
          history: commands.history(),
          foldGutter: language.foldGutter(),
          drawSelection: view.drawSelection(),
          dropCursor: view.dropCursor(),
          allowMultipleSelections: state.EditorState.allowMultipleSelections.of(true),
          indentOnInput: language.indentOnInput(),
          syntaxHighlighting: language.syntaxHighlighting(language.defaultHighlightStyle, {fallback: true}),
          bracketMatching: language.bracketMatching(),
          closeBrackets: autocomplete.closeBrackets(),
          autocompletion: autocomplete.autocompletion(),
          rectangularSelection: view.rectangularSelection(),
          crosshairCursor: view.crosshairCursor(),
          highlightSelectionMatches: search.highlightSelectionMatches(),
          keymap: view.keymap.of([
            ...autocomplete.closeBracketsKeymap,
            ...commands.defaultKeymap,
            ...search.searchKeymap,
            ...commands.historyKeymap,
            ...language.foldKeymap,
            ...autocomplete.completionKeymap,
            ...lint.lintKeymap,
            commands.indentWithTab
          ]),
        }
      },
    }
  },
  /**
   * @mixin bbn.cp.mixins.basic - Basic mixin for common functionalities.
   * @mixin bbn.cp.mixins.input - Input mixin for handling input related features.
   * @mixin bbn.cp.mixins.events - Events mixin for event handling and emission.
   */
  mixins:
  [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.input,
    bbn.cp.mixins.events
  ],
  props: {
    // Default mode/language of the editor
    mode: {
      type: String,
      default: 'php' 
    },
    // Default theme of the editor
    theme: {
      type: String,
      default: 'dracula' 
    },
    // Custom extensions for the editor
    extensions: {
      type: [Array, Function]
    },
    // Enables/disables line wrapping
    wrap: {
      type: Boolean,
      default: true 
    },
    // Default size of a tab character
    tabSize: {
      type: Number,
      default: 2 
    }
  },
  data() {
    return {
      setterTimeout: null,
      // Editor state
      state: null,
      // Editor widget/view instance
      widget: null,
      // Holds compartments for dynamic editor configurations
      compartments: bbnData.immunizeValue(bbn.fn.createObject()),
      currentTheme: this.theme,
    }
  },

  methods: {
    themeSettings() {
      const cp = this;
      this.getPopup({
        label: false,
        modal: false,
        closable: false,
        component: {
          template: `
<div class="bbn-block bbn-xlpadding bbn-c bbn-lg">
  <bbn-dropdown class="bbn-xl bbn-b bbn-wide" :source="themes" bbn-model="currentTheme"/><br><br>
  <bbn-button @click="prev" :label="_('Previous')"/> &nbsp; 
  <bbn-button bbn-if="isPlaying" @click="stop" :label="_('Stop')"/>
  <bbn-button bbn-else @click="play" :label="_('Play')"/>  &nbsp; 
  <bbn-button @click="next" :label="_('Next')"/><br><br>
  <bbn-button @click="select" :label="_('Close')"/> &nbsp; 
  <bbn-button @click="cancel" :label="_('Back to original')"/> 
</div>
  `,
          data(){
            const keys = Object.keys(cp.constructor.cm.theme);
            const themes = [];
            bbn.fn.each(keys, k => {
              if (k !== 'createTheme') {
                themes.push({text: k, value: k});
              }
            })
            return {
              cp,
              themes,
              originalTheme: cp.currentTheme,
              currentTheme: cp.currentTheme,
              interval: null,
              isPlaying: false,
              currentIndex: bbn.fn.search(themes, {value: cp.currentTheme}),
            }
          },
          methods: {
            close() {
              clearInterval(this.interval);
              this.closest('bbn-floater').close(true);
            },
            cancel() {
              this.cp.currentTheme = this.originalTheme;
              this.close();
            },
            select() {
              this.close();
            },
            stop() {
              if (this.isPlaying) {
                clearInterval(this.interval);
                this.isPlaying = false;
              }
            },
            play() {
              if (!this.isPlaying) {
                this.isPlaying = true;
                this.interval = setInterval(() => {
                  this.next();
                }, 2000);
              }
            },
            prev() {
              if (this.themes[this.currentIndex - 1]) {
                this.currentIndex--;
              }
              else {
                this.currentIndex = this.themes.length - 1;
              }

              this.currentTheme = this.themes[this.currentIndex].value;
            },
            next() {
              if (this.themes[this.currentIndex + 1]) {
                this.currentIndex++;
              }
              else {
                this.currentIndex = 0;
              }

              this.currentTheme = this.themes[this.currentIndex].value;
            }
          },
          watch: {
            currentTheme(v) {
              this.cp.currentTheme = v;
            }
          }
        }
      })
    },
    updateDoc() {
      // Emit update event with the current document
      this.$emit('update', this.currentDoc); 
    },
    getExtensions() {
      const extensions = [];
      if (this.extensions) {
        if (bbn.fn.isFunction(this.extensions)) {
          extensions.push(...this.extensions())
        }
        else if (this.extensions?.length) {
          // Return custom extensions if provided
          return this.extensions; 
        }
      }

      const cm = this.constructor.cm;

      if (!this.mode || !this.currentTheme) {
        throw new Error("You must provide a language and a theme");
      }
      if (!cm.languageExtensions[this.mode] && !['js', 'less', 'purephp'].includes(this.mode)) {
        throw new Error("Unknown language");
      }
      if (!cm.theme[this.currentTheme]) {
        throw new Error("Unknown theme");
      }
      const state = cm.state;
      const cpt = state.Compartment;

      // Configuring compartments for dynamic editor options such as wrap, tabSize, etc.
      this.compartments.wrap = new cpt;
      extensions.push(this.compartments.wrap.of(cm.view.EditorView.lineWrapping));
      this.compartments.tabSize = new cpt;
      extensions.push(this.compartments.tabSize.of(state.EditorState.tabSize.of(this.tabSize)));
      // push each basic extension
      for (let n in cm.extensions) {
        extensions.push(cm.extensions[n]);
      }
      this.compartments.theme = new cpt;
      extensions.push(this.compartments.theme.of(cm.theme[this.currentTheme]));
      this.compartments.readonly = new cpt;
      extensions.push(this.compartments.readonly.of(state.EditorState.readOnly.of(this.disabled || this.readonly)));

      const idx = this.constructor.modeCode[this.mode] ? this.constructor.modeCode[this.mode] : this.mode;
      if (!cm.languageExtensions[idx]) {
        throw new Error("Language not recognized");
      }

      // Adding language and theme specific extensions
      this.compartments.language = new cpt;
      extensions.push(this.compartments.language.of(cm.languageExtensions[idx]));

      return extensions; // Return the configured extensions
    },
    onChange(tr) {
      bbn.fn.log(tr)
      this.widget.update([tr]); // Update the editor widget with the transaction
      let value = this.widget.state.doc.toString(); // Get the current document's content
      if (value !== this.value) {
        this.emitInput(value); // Emit input event if the value has changed
      }
    },
    init() {
      let cm = this.constructor.cm;
      // Get extensions for the editor
      let extensions = this.getExtensions(); 
      // Configuration for the editor state
      let editorStateCfg = {
        // Initial document/content
        doc: this.value, 
        // Applied extensions
        extensions, 
        // Read-only state
        readOnly: cm.state.EditorState.readOnly.of(this.readonly) 
      };
      // Create editor state
      this.state = cm.state.EditorState.create(editorStateCfg); 
      this.widget = new cm.view.EditorView(bbnData.immunizeValue({
        // Set state
        state: this.state, 
        // Set parent element
        parent: this.getRef('element'), 
        // Dispatch method for handling changes
        dispatch: t => this.onChange(t), 
        // Line wrapping configuration
        lineWrapping: this.wrap, 
      }));
    },
    beautifyCode(code, mode) {
      let newValue = '';

      if (!mode) {
        mode = this.mode;
      }

      // JavaScript beautification
      if (['javascript', 'js'].includes(mode)) {
        const options = { indent_size: 2, space_in_empty_paren: true };
        newValue = js_beautify(code, options);
      }
      // CSS and LESS beautification
      else if (['css', 'less'].includes(mode)) {
        const options = { indent_size: 2, space_in_empty_paren: true };
        newValue = css_beautify(code, options);
      }
      // HTML beautification
      else if (['html'].includes(mode)) {
        const options = { indent_size: 2, space_in_empty_paren: true, wrap_attributes: 'force-aligned' };
        newValue = html_beautify(code, options);
      }
      // PHP beautification
      else if (['php', 'purephp'].includes(mode)) {
        const options = { indent_size: 2, space_in_empty_paren: true };
        if (this.mode === 'purephp') {
          options.plain = true;
        }
        newValue = html_beautify(code, options);
      }

      return newValue;
    },
    beautify() {
      // Beautify the code based on the mode
      let newValue = this.beautifyCode(this.widget.state.doc.toString(), this.mode);
      if (newValue) {
        // Apply the beautified content as a change
        this.widget.dispatch({
          changes: {
            from: 0,
            to: this.widget.state.doc.toString().length,
            insert: newValue
          }
        })
      }
    },
    // Custom key handling for code beautification and autocompletion
    onKeyDown(event) {
      this.lastKeyDown = event;
      const currentCompletions = this.constructor.cm.autocomplete.currentCompletions(this.widget.state);
      // Beautify code on Ctrl+Shift+F
      if (!currentCompletions.length) {
        if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
          this.beautify();
        }
        // Trigger autocomplete on '.' press
        else if (!['Escape', 'Space', 'Enter', 'Return'].includes(event.key) && !ignoredKeys.includes(event.which)) {
          bbn.fn.log("STARTING COMPLETIONS")
          this.constructor.cm.autocomplete.startCompletion(this.widget);
        }
      }
      else {
        if (['Escape', 'Space', 'Enter', 'Return'].includes(event.key)) {
          bbn.fn.log("CLOSIG COMPLETIONS")
          this.constructor.cm.autocomplete.closeCompletion(this.widget)
        }
      }
      /*
      */
      // Emit keydown event
    },
    scrollBottom() {
      // Scroll to the bottom of the editor
      let sc = this.find('div.cm-scroller');
      if (sc) {
        sc.scrollTop = sc.scrollHeight;
      }
    },
    foldAll() {
      this.constructor.cm.language.foldAll(this.widget);
      //bbnCode.cm.language.foldInside(bbnCode.cm.language.syntaxTree(this.widget));
    },
    unfoldAll() {
      this.constructor.cm.language.unfoldAll(this.widget);

    },
    openSearchPanel() {
      this.constructor.cm.search.openSearchPanel(this.widget);
    },
    closeSearchPanel() {
      this.constructor.cm.search.closeSearchPanel(this.widget);
    },
    findNext() {
      this.constructor.cm.search.findNext(this.widget);
    },
    findPrevious() {
      this.constructor.cm.search.findPrevious(this.widget);
    },
    replaceAll() {
      this.constructor.cm.search.replaceAll(this.widget);
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    extensions() {

    },
    // Watchers to dynamically reconfigure editor based on props changes
    tabSize(v) {
      this.widget.dispatch({
        effects: this.compartments.tabSize.reconfigure(this.constructor.cm.state.EditorState.tabSize.of(v))
      });
    },
    theme(v) {
      if (this.currentTheme !== v) {
        this.currentTheme = v;
      }
    },
    currentTheme(v) {
      if (!this.constructor.cm.theme[v]) {
        throw new Error("Unknown theme");
      }

      if (this.widget) {
        this.widget.dispatch({
          effects: this.compartments.theme.reconfigure(this.constructor.cm.theme[v])
        });
      }
    },
    wrap(v) {
      this.widget.dispatch({
        effects: this.compartments.wrap.reconfigure(this.constructor.cm.view.EditorView.lineWrapping.of(v))
      });
    },
    readonly(v) {
      this.widget.dispatch({
        effects: this.compartments.readonly.reconfigure(this.constructor.cm.state.EditorState.readOnly.of(v))
      });
    },
    value(nv) {
      clearTimeout(this.setterTimeout);
      // Update the document content if the value prop changes - but not too fast
      if (this.widget) {
        let value = this.widget.state.doc.toString();
        this.setterTimeout = setTimeout(() => {
          if (this.widget) {
            let v2 = this.widget.state.doc.toString();
            if ((v2 === value) && (value !== nv)) {
              this.widget.dispatch({
                changes: {
                  from: 0,
                  to: this.widget.state.doc.length,
                  insert: nv
                }
              });
            }
          }
        }, 250)
      }
    }
  }
};

// Import component HTML template and styles
import cpHtml from './code.html';
import cpStyle from './code.less';
import bbn from "@bbn/bbn";
let cpLang = {};
if (bbn.env.lang) {
  // Attempt to load language-specific strings
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/code.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

// Component definition containing template, style, and language strings
const def = {
  name: 'bbn-code',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};

// Exporting component definition and utilities
export { def as default, js_beautify, css_beautify, html_beautify, tern }
