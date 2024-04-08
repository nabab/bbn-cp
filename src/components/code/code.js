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
import * as language from "@codemirror/language";
import * as lint from "@codemirror/lint";
import * as state from "@codemirror/state";
import * as search from "@codemirror/search";
import * as view from "@codemirror/view";
import * as html from "@codemirror/lang-html";
import * as vue from "@codemirror/lang-vue";
import * as javascript from "@codemirror/lang-javascript";
import * as php from "@codemirror/lang-php";
import * as css from "@codemirror/lang-css";
import * as json from "@codemirror/lang-json";
import * as markdown from "@codemirror/lang-markdown";
import * as xml from "@codemirror/lang-xml";
import * as theme from "thememirror";
import { abbreviationTracker } from '@emmetio/codemirror6-plugin';

// Mapping of language extensions to their respective CodeMirror language supports
const languageExtensions = {
  javascript: [new LanguageSupport(javascript.javascriptLanguage)],
  html: [new LanguageSupport(html.htmlLanguage)],
  css: [new LanguageSupport(css.cssLanguage)],
  php: [new LanguageSupport(php.phpLanguage)],
  json: [new LanguageSupport(json.jsonLanguage)],
  markdown: [new LanguageSupport(markdown.markdownLanguage)],
  xml: [new LanguageSupport(xml.xmlLanguage)],
  vue: [new LanguageSupport(vue.vueLanguage)]
};

// The main object containing CodeMirror configurations and extensions
const codemirror6 = {
  autocomplete,
  commands,
  collaboration,
  language,
  languageExtensions,
  lint,
  state,
  search,
  view,
  vue,
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
  /**
   * Gets basic extensions based on the editor instance `cm`.
   * Extensions are features like line numbers, code folding, syntax highlighting, etc.
   * @param {Object} cm - The editor instance.
   * @returns {Object} An object containing configured extensions for the editor.
   */
  getBasicExtensions(cm) {
    if (!cm.ext) {
      cm.ext = {
        lineNumbers: cm.view.lineNumbers(),
        lineWrapping: cm.view.EditorView.lineWrapping,
        highlightActiveLineGutter: cm.view.highlightActiveLineGutter(),
        highlightSpecialChars: cm.view.highlightSpecialChars(),
        history: cm.commands.history(),
        foldGutter: cm.language.foldGutter(),
        drawSelection: cm.view.drawSelection(),
        dropCursor: cm.view.dropCursor(),
        allowMultipleSelections: cm.state.EditorState.allowMultipleSelections.of(true),
        indentOnInput: cm.language.indentOnInput(),
        syntaxHighlighting: cm.language.syntaxHighlighting(cm.language.defaultHighlightStyle, {fallback: true}),
        bracketMatching: cm.language.bracketMatching(),
        closeBrackets: cm.autocomplete.closeBrackets(),
        autocompletion: cm.autocomplete.autocompletion(),
        rectangularSelection: cm.view.rectangularSelection(),
        crosshairCursor: cm.view.crosshairCursor(),
        highlightSelectionMatches: cm.search.highlightSelectionMatches(),
        keymap: cm.view.keymap.of([
          ...cm.autocomplete.closeBracketsKeymap,
          ...cm.commands.defaultKeymap,
          ...cm.search.searchKeymap,
          ...cm.commands.historyKeymap,
          ...cm.language.foldKeymap,
          ...cm.autocomplete.completionKeymap,
          ...cm.lint.lintKeymap,
          cm.commands.indentWithTab
        ]),
      };
    }
    return cm.ext;
  }
};

/**
 * @file Defines the bbn-code component.
 * @description `bbn-code` is a text editor designed for code editing. It supports various languages and provides a range of tools and configurations to enhance the coding experience.
 * @author BBN Solutions
 * @copyright BBN Solutions
 */
const cpDef = {
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
      type: Array,
      default: null 
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
      if (this.extensions?.length) {
        // Return custom extensions if provided
        return this.extensions; 
      }

      const cm = codemirror6;

      if (!this.mode || !this.theme) {
        throw Error("You must provide a language and a theme");
      }
      if (!cm.languageExtensions[this.mode] && !['js', 'less', 'purephp'].includes(this.mode)) {
        throw Error("Unknown language");
      }
      if (!cm.theme[this.theme]) {
        throw Error("Unknown theme");
      }
      const extensions = [];
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
        throw Error("Language unrecognized!");
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
    initUntilExtensionsLoaded(max) {
      this.init(); // Initialize the editor
    },
    init() {
      let cm = codemirror6;
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
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
        // Beautify the code based on the mode
        let newValue = "";
        // JavaScript beautification
        if (['javascript', 'js'].includes(this.mode) && window.beautifier.js) {
          const options = { indent_size: 2, space_in_empty_paren: true };
          newValue = window.beautifier.js(this.widget.state.doc.toString(), options);
        }
        // CSS and LESS beautification
        else if (['css', 'less'].includes(this.mode) && window.beautifier.css) {
          const options = { indent_size: 2, space_in_empty_paren: true };
          newValue = window.beautifier.css(this.widget.state.doc.toString(), options);
        }
        // HTML beautification
        else if (['html'].includes(this.mode) && window.beautifier.html) {
          const options = { indent_size: 2, space_in_empty_paren: true, wrap_attributes: 'force-aligned' };
          newValue = window.beautifier.html(this.widget.state.doc.toString(), options);
        }
        // PHP beautification
        else if (['php', 'purephp'].includes(this.mode)) {
          const options = { indent_size: 2, space_in_empty_paren: true };
          if (this.mode === 'purephp') {
            options.plain = true;
          }
          newValue = window.beautifier.html(this.widget.state.doc.toString(), options);
        }

        // Apply the beautified content as a change
        this.widget.dispatch({
          changes: {
            from: 0,
            to: this.widget.state.doc.toString().length,
            insert: newValue
          }
        })
      }
      // Trigger autocomplete on '.' press
      if (event.key === ".") {
        codemirror6.autocomplete.startCompletion(this.widget)
      }
      // Emit keydown event
      this.$emit('keydown', event); 
    },
    scrollBottom() {
      // Scroll to the bottom of the editor
      let sc = this.find('div.cm-scroller');
      if (sc) {
        sc.scrollTop = sc.scrollHeight;
      }
    }
  },
  mounted() {
    // Initialize the editor once mounted
    this.initUntilExtensionsLoaded(100); 
  },
  watch: {
    // Watchers to dynamically reconfigure editor based on props changes
    tabSize(v) {
      this.widget.dispatch({
        effects: this.compartments.tabSize.reconfigure(codemirror6.state.EditorState.tabSize.of(v))
      });
    },
    wrap(v) {
      this.widget.dispatch({
        effects: this.compartments.wrap.reconfigure(codemirror6.view.EditorView.lineWrapping.of(v))
      });
    },
    readonly(v) {
      this.widget.dispatch({
        effects: this.compartments.readonly.reconfigure(codemirror6.state.EditorState.readOnly.of(v))
      });
    },
    value(nv) {
      // Update the document content if the value prop changes
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
};

// Import component HTML template and styles
import cpHtml from './code.html';
import cpStyle from './code.less';
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
export { def as default, codemirror6, js_beautify, css_beautify, html_beautify, tern }
