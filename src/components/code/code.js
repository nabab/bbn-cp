/*jshint esversion: 6 */
import {js_beautify, css_beautify, html_beautify} from "js-beautify";
import tern from "tern";
import {LanguageSupport} from "@codemirror/language"
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
  elmet: abbreviationTracker(),
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
const cpDef = {
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
      default: 'dracula'
    },
    extensions: {
      type: Array,
      default: null
    },
    wrap: {
      type: Boolean,
      default: true
    },
    tabSize: {
      type: Number,
      default: 2
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

      const cm = codemirror6;

      if (!this.mode || !this.theme) {
        throw new Error("You earmust provide a language and a theme");
      }
      if (!cm.languageExtensions[this.mode] && !['js', 'less', 'purephp'].includes(this.mode)) {
        throw new Error("Unknown language");
      }
      if (!cm.theme[this.theme]) {
        throw new Error("Unknown theme");
      }
      const extensions = [];
      const state = cm.state;
      const cpt = state.Compartment;


      this.compartments.wrap = new cpt;
      extensions.push(this.compartments.wrap.of(cm.view.EditorView.lineWrapping));
      this.compartments.tabSize = new cpt;
      extensions.push(this.compartments.tabSize.of(state.EditorState.tabSize.of(this.tabSize)));

      // push current language extension and current theme extension
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
      let cm = codemirror6;
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
        dispatch: t => this.onChange(t),
        lineWrapping: this.wrap,
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


import cpHtml from './code.html';
import cpStyle from './code.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/code.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

const def = {
  name: 'bbn-code',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};

export {def as default, codemirror6, js_beautify, css_beautify, html_beautify, tern}
