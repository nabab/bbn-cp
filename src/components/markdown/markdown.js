/**
 * @file bbn-markdown component
 *
 * @description bbn-markdown is a component that allows you to easily format the Markdown text.
 * It's an editor that enable you to create textual content, to insert lists, image management and hyperlinks.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 */

import 'easymde/dist/easymde.min.css';
import EasyMDE from 'easymde';
import {marked} from 'marked';
//Markdown editor use simpleMDe
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic 
   * @mixin bbn.cp.mixins.input 
   * @mixin bbn.cp.mixins.events 
   */
  mixins: 
  [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.events
  ],
  statics() {
    const toolbar = [
      {
        name: "bold",
        className: "nf nf-fa-bold",
        title: bbn._("Bold"),
        action: window.EasyMDE.toggleBold
      },
      {
        name: "italic",
        className: "nf nf-fa-italic",
        title: bbn._("Italic"),
        action: window.EasyMDE.toggleItalic
      },
      {
        name: "heading",
        className: "nf nf-fa-header",
        title: bbn._("Heading"),
        children: [
          {
            name: "heading-1",
            className: "nf nf-md-format_header_1",
            title: bbn._("Heading") + " 1",
            action: window.EasyMDE.toggleHeading1
          }, {
            name: "heading-2",
            className: "nf nf-md-format_header_2",
            title: bbn._("Heading") + " 2",
            action: window.EasyMDE.toggleHeading2
          }, {
            name: "heading-3",
            className: "nf nf-md-format_header_3",
            title: bbn._("Heading") + " 3",
            action: window.EasyMDE.toggleHeading3
          }, {
            name: "heading-4",
            className: "nf nf-md-format_header_4",
            title: bbn._("Heading") + " 4",
            action: window.EasyMDE.toggleHeading4
          }, {
            name: "heading-5",
            className: "nf nf-md-format_header_5",
            title: bbn._("Heading") + " 5",
            action: window.EasyMDE.toggleHeading5
          }, {
            name: "heading-6",
            className: "nf nf-md-format_header_6",
            title: bbn._("Heading") + " 6",
            action: window.EasyMDE.toggleHeading6
          }
        ]
      },
      "|",
      {
        name: "quote",
        className: "nf nf-fa-quote_left",
        title: bbn._("Quote"),
        action: window.EasyMDE.toggleBlockquote
      },
      {
        name: "unordered-list",
        className: "nf nf-fa-list_ul",
        title: bbn._("Generic List"),
        action: window.EasyMDE.toggleUnorderedList
      },
      {
        name: "ordered-list",
        className: "nf nf-fa-list_ol",
        title: bbn._("Numbered List"),
        action: window.EasyMDE.toggleOrderedList
      },
      "|",
      {
        name: "link",
        className: "nf nf-fa-link",
        title: bbn._("Create Link"),
        action: window.EasyMDE.drawLink
      },
      {
        name: "image",
        className: "nf nf-fa-image",
        title: bbn._("Insert Image"),
        action: window.EasyMDE.drawImage
      },
      "|",
      {
        name: "preview",
        className: "nf nf-fa-eye no-disable",
        title: bbn._("Toggle Preview"),
        action: window.EasyMDE.togglePreview
      },
      {
        name: "side-by-side",
        className: "nf nf-fa-columns no-disable no-mobile",
        title: bbn._("Toggle Side by Side"),
        action: window.EasyMDE.toggleSideBySide,
        default: true
      },
      {
        name: "fullscreen",
        className: "nf nf-fa-arrows_alt no-disable no-mobile",
        title: bbn._("Toggle Fullscreen"),
        action: window.EasyMDE.toggleFullScreen
      },
      "|",
      {
        name: "guide",
        action: () => bbn.fn.link("https://simplemde.com/markdown-guide"),
        className: "nf nf-fa-question-circle",
        title: bbn._("Markdown Guide")
      },
    ];
    return {
      toolbar,
      insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](https://", ")"],
        link: ["[", "](https://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
      },
      shortCuts: {
        drawTable: "Cmd-Alt-T"
      }
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: [String, Boolean],
    },
    readonly: {
      type: [String, Boolean],
    },
    /**
     * The object of configuration
     * @prop {Object} cfg
     */
    cfg: {
      type: Object,
      default(){
        return {};
      }
    },
    //@todo not used
    toolBar: {
      type: Array
    },
    //@todo not used
    hideIcons: {
      type: Array
    }
  },
  data() {
    return {
      defaultCfg: {
        widgetName: "EasyMDE",
        sideBySideFullscreen: false,
        nativeSpellcheck: this.cfg.nativeSpellCheck || false,
        spellChecker: this.cfg.spellChecker || false,
        indentWithTabs: this.cfg.indentWithTabs === undefined ? true : this.cfg.indentWithTabs,
        initialValue: this.value,
        autoDownloadFontAwesome: false,
        renderingConfig: {
          singleLineBreaks: true,
          codeSyntaxHighlighting: true,
        },
        status: false,
        tabSize: this.cfg.tabSize || 2,
        toolbarTips: true,
        minHeight: "100px",
        insertTexts: this.constructor.insertTexts,
        shortcuts: this.constructor.shortcuts,
        toolbar: this.constructor.toolbar,
      }
    };
  },
  computed: {
    mdeCfg() {
      const cfg = bbn.fn.extend({}, this.defaultCfg, this.cfg);
      return cfg;
    },
    compiled() {
      return this.value ? window.marked.parse(this.value) : '';
    },
    toolbar() {
      if (this.readonly) {
        return false;
      }
      return this.toolBar || bbnMarkdownCp.toolbar;
    }
  },
  methods: {
    disableWidget(v){
      this.widget.codemirror.setOption('disableInput', !!v);
      if ( !v && !this.readonly ){
        this.widget.codemirror.setOption('readOnly', false);
        this.$el.querySelector(".editor-toolbar").display =  'block'
      }
      else {
        this.widget.codemirror.setOption('readOnly', true);
        this.$el.querySelector(".editor-toolbar").display =  'none'
      }
    },
    readonlyWidget(v){
      this.widget.codemirror.setOption('readOnly', !!v);
      if ( !v && !this.isDisabled ){
        this.$el.querySelector(".editor-toolbar").display =  'block'
      }
      else {
        this.$el.querySelector(".editor-toolbar").display =  'none'
      }
    }
  },
  watch: {
    isDisabled(newVal){
      this.disableWidget(newVal);
    },
    readonly(newVal){
      this.readonlyWidget(newVal);
    }
  },
  mounted(){
    const vm = this;
    /*let cfg = bbn.fn.extend(vm.getOptions(), {
      change: function(e){
        vm.emitInput(vm.widget.value());
        return true
      }
    });*/
    this.widget = new EasyMDE(bbn.fn.extend({
        element: this.$refs.element,
        value: this.value,
      }, this.mdeCfg
    ));
    /*
    this.widget.codemirror.on("change", () => {
      this.emitInput(this.widget.value());
    });
    */
    if ( this.isDisabled ){
      this.disableWidget(true);
    }
    if ( this.readonly ){
      this.readonlyWidget(true);
    }
    this.ready = true;
  },

};

import cpHtml from './markdown.html';
import cpStyle from './markdown.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./markdown.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

const def = {
  name: 'bbn-markdown',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};

export {def as default, EasyMDE, marked};
