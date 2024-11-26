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
import * as html from "@codemirror/lang-html";
import * as bbnCpCM from "@bbn/codemirror-lang-bbn-cp";
import * as javascript from "@codemirror/lang-javascript";
import * as php from "@codemirror/lang-php";
import * as css from "@codemirror/lang-css";
import * as json from "@codemirror/lang-json";
import * as markdown from "@codemirror/lang-markdown";
import * as xml from "@codemirror/lang-xml";
import * as theme from "thememirror";
import { abbreviationTracker } from '@emmetio/codemirror6-plugin';

// Mapping of language extensions to their respective CodeMirror language supports


/**
 * @file Defines the bbn-code component.
 * @description `bbn-code` is a text editor designed for code editing. It supports various languages and provides a range of tools and configurations to enhance the coding experience.
 * @author BBN Solutions
 * @copyright BBN Solutions
 */
const cpDef = {
  statics() {
    return {
      cm: {
        languageExtensions: {
          javascript: [new LanguageSupport(javascript.javascriptLanguage)],
          html: [new LanguageSupport(html.htmlLanguage)],
          css: [new LanguageSupport(css.cssLanguage)],
          php: [new LanguageSupport(php.phpLanguage)],
          json: [new LanguageSupport(json.jsonLanguage)],
          markdown: [new LanguageSupport(markdown.markdownLanguage)],
          xml: [new LanguageSupport(xml.xmlLanguage)],
          bbn: [new LanguageSupport(bbnCpCM.bbnLanguage)]
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
        html,
        javascript,
        php,
        css,
        json,
        markdown,
        xml,
        theme,
        // Emmet abbreviation tracker for improved code writing efficiency
        elmet: abbreviationTracker(),
        extensions: {
          lineNumbers: view.lineNumbers(),
          lineWrapping: view.EditorView.lineWrapping,
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
      compartments: bbnData.immunizeValue(bbn.fn.createObject()) 
    }
  },

  methods: {
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

      if (!this.mode || !this.theme) {
        throw new Error("You must provide a language and a theme");
      }
      if (!cm.languageExtensions[this.mode] && !['js', 'less', 'purephp'].includes(this.mode)) {
        throw new Error("Unknown language");
      }
      if (!cm.theme[this.theme]) {
        throw new Error("Unknown theme");
      }
      const state = cm.state;
      const cpt = state.Compartment;

      // Configuring compartments for dynamic editor options such as wrap, tabSize, etc.
      this.compartments.wrap = new cpt;
      extensions.push(this.compartments.wrap.of(cm.view.EditorView.lineWrapping));
      this.compartments.tabSize = new cpt;
      extensions.push(this.compartments.tabSize.of(state.EditorState.tabSize.of(this.tabSize)));

      // Adding language and theme specific extensions
      this.compartments.language = new cpt;
      if (this.mode === "js") {
        extensions.push(this.compartments.language.of(cm.javascript.javascript()));
      }
      else if (this.mode === "less") {
        extensions.push(this.compartments.language.of(cm.css.css()));
      }
      else if (this.mode === "purephp") {
        extensions.push(this.compartments.language.of(cm.php.php({plain: true})));
      }
      else if (cm.languageExtensions[this.mode]) {
        extensions.push(this.compartments.language.of(cm.languageExtensions[this.mode]));
      }
      else {
        throw new Error("Language unrecognized!");
      }

      this.compartments.theme = new cpt;
      extensions.push(this.compartments.theme.of(cm.theme[this.theme]));
      this.compartments.readonly = new cpt;
      extensions.push(this.compartments.readonly.of(state.EditorState.readOnly.of(this.disabled || this.readonly)));

      return extensions; // Return the configured extensions
    },
    onChange(tr) {
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
    onKeyDown(event) {
      this.lastKeyDown = event;
      // Custom key handling for code beautification and autocompletion
      bbn.fn.log("CODE KEY DOWN", event)
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
        // Beautify the code based on the mode
        let newValue = "";
        // JavaScript beautification
        if (['javascript', 'js'].includes(this.mode)) {
          const options = { indent_size: 2, space_in_empty_paren: true };
          newValue = js_beautify(this.widget.state.doc.toString(), options);
        }
        // CSS and LESS beautification
        else if (['css', 'less'].includes(this.mode)) {
          const options = { indent_size: 2, space_in_empty_paren: true };
          newValue = css_beautify(this.widget.state.doc.toString(), options);
        }
        // HTML beautification
        else if (['html'].includes(this.mode)) {
          const options = { indent_size: 2, space_in_empty_paren: true, wrap_attributes: 'force-aligned' };
          newValue = html_beautify(this.widget.state.doc.toString(), options);
        }
        // PHP beautification
        else if (['php', 'purephp'].includes(this.mode)) {
          const options = { indent_size: 2, space_in_empty_paren: true };
          if (this.mode === 'purephp') {
            options.plain = true;
          }
          newValue = html_beautify(this.widget.state.doc.toString(), options);
        }

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
      }
      // Trigger autocomplete on '.' press
      if (['Escape', 'Space'].includes(event.key)) {
        this.constructor.cm.autocomplete.closeCompletion(this.widget)
      }
      else if (![].concat(...bbn.var.keys.leftRight, ...bbn.var.keys.upDown).includes(event.which)
        && !this.constructor.cm.autocomplete.currentCompletions(this.widget.state).length
      ) {
        this.constructor.cm.autocomplete.startCompletion(this.widget);
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
      //bbnCodeCp.cm.language.foldInside(bbnCodeCp.cm.language.syntaxTree(this.widget));
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
