/**
 * @file bbn-rte component
 *
 * @description bbn-rte is a component that provides users with a range of options to insert and format text as desired, automatically displaying them as a preview.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 *
 * @created 11/01/2017
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.events
     */
    mixins: [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.input,
      bbn.cp.mixins.events
    ],
    statics() {
      const defaultParagraphSeparatorString = 'defaultParagraphSeparator';
      const formatBlock = 'formatBlock';
      const queryCommandState = command => document.queryCommandState(command);
      const queryCommandValue = command => document.queryCommandValue(command);
      const defaultButtons = bbnData.immunizeValue({
        blockStyle: {
          text: bbn._('Style'),
          active: false,
          component: bbnData.immunizeValue({
            name: 'bbn-rte-style',
            template: `
              <bbn-dropdown class="bbn-rte-style"
                            :source="styles"
                            v-model="currentStyle"
                            :writable="false"
                            @change="setStyle"
                            :clear-html="true"/>
            `,
            data(){
              return {
                styles: [{
                  text: bbn._('Normal'),
                  value: '<div>'
                }, {
                  text: '<p>' + bbn._('Paragraph') + '</p>',
                  value: '<p>'
                }, {
                  text: '<h1>' + bbn._('Heading 1') + '</h1>',
                  value: '<h1>'
                }, {
                  text: '<h2>' + bbn._('Heading 2') + '</h2>',
                  value: '<h2>'
                }, {
                  text: '<h3>' + bbn._('Heading 3') + '</h3>',
                  value: '<h3>'
                }, {
                  text: '<h4>' + bbn._('Heading 4') + '</h4>',
                  value: '<h4>'
                }, {
                  text: '<h5>' + bbn._('Heading 5') + '</h5>',
                  value: '<h5>'
                }, {
                  text: '<h6>' + bbn._('Heading 6') + '</h6>',
                  value: '<h6>'
                }, {
                  text: '<pre>' + bbn._('Preformatted') + '</pre>',
                  value: '<pre>'
                }, {
                  text: '<blockquote>' + bbn._('Quote') + '</blockquote>',
                  value: '<blockquote>'
                }],
                currentStyle: ''
              }
            },
            computed: {
              rte() {
                return this.closest('bbn-floater').opener;
              }
            },
            methods: {
              setStyle(style){
                exec(formatBlock, style);
              }
            },
            mounted(){
              this.rte.styleComponent = this;
              this.rte.setStyle();
            }
          })
        },
        fontsize: {
          text: bbn._('Font size'),
          active: false,
          component: {
            name: 'bbn-rte-fontsize',
            template: `
              <bbn-dropdown class="bbn-rte-fontsize"
                            :source="sizes"
                            v-model="currentSize"
                            :writable="false"
                            @change="setSize"
                            :clear-html="true"
                            title="` + bbn._('Font size') + `"/>
            `,
            data(){
              return {
                sizes: [{
                  text: '<font class="bbn-rte-fontsize-font" size="1">1</font>',
                  value: 1
                }, {
                  text: '<font class="bbn-rte-fontsize-font" size="2">2</font>',
                  value: 2
                }, {
                  text: '<font class="bbn-rte-fontsize-font" size="3">3</font>',
                  value: 3
                }, {
                  text: '<font class="bbn-rte-fontsize-font" size="4">4</font>',
                  value: 4
                }, {
                  text: '<font class="bbn-rte-fontsize-font" size="5">5</font>',
                  value: 5
                }, {
                  text: '<font class="bbn-rte-fontsize-font" size="6">6</font>',
                  value: 6
                }, {
                  text: '<font class="bbn-rte-fontsize-font" size="7">7</font>',
                  value: 7
                }],
                currentSize: ''
              }
            },
            computed: {
              rte() {
                return this.closest('bbn-floater').opener;
              }
            },
            methods: {
              setSize(style){
                exec('fontSize', style);
              }
            },
            mounted(){
              this.rte.fontsizeComponent = this;
              this.rte.setFontsize();
            }
          }
        },
        fontincrease: {
          text: bbn._('Increase font size'),
          component: {
            template: `
              <bbn-button text="` + bbn._('Increase font size') + `"
                          icon="nf nf-fa-plus"
                          :notext="true"
                          @click="onClick"/>
            `,
            computed: {
              rte() {
                return this.closest('bbn-floater').opener;
              }
            },
            methods: {
              onClick(){
                let current = parseInt(bbnRteCp.queryCommandValue('fontSize'));
                if (current < 7) {
                  exec('fontSize', current + 1);
                  this.rte.setFontsize();
                }
              }
            }
          },
          active: false
        },
        fontdecrease: {
          text: bbn._('Decrease font size'),
          component: {
            template: `
              <bbn-button text="` + bbn._('Decrease font size') + `"
                          icon="nf nf-fa-minus"
                          :notext="true"
                          @click="onClick"/>
            `,
            computed: {
              rte() {
                return this.closest('bbn-floater').opener;
              }
            },
            methods: {
              onClick(){
                let current = parseInt(bbnRteCp.queryCommandValue('fontSize'));
                if (current > 1) {
                  exec('fontSize', current - 1);
                  this.rte.setFontsize();
                }
              }
            }
          },
          notext: true,
          active: false
        },
        bold: {
          icon: 'nf nf-fa-bold',
          text: bbn._('Bold'),
          notext: true,
          active: false,
          action: () => exec('bold')
        },
        italic: {
          icon: 'nf nf-fa-italic',
          text: bbn._('Italic'),
          notext: true,
          active: false,
          action: () => exec('italic')
        },
        underline: {
          icon: 'nf nf-fa-underline',
          text: bbn._('Underline'),
          notext: true,
          active: false,
          action: () => exec('underline')
        },
        strikethrough: {
          icon: 'nf nf-fa-strikethrough',
          text: bbn._('Strike-through'),
          notext: true,
          active: false,
          action: () => exec('strikeThrough')
        },
        align: {
          text: bbn._('Align'),
          notext: true,
          active: false,
          component: {
            name: 'bbn-rte-align',
            template: `
              <bbn-radiobuttons :disabled="!!isDisabled || !!isReadOnly"
                                v-model="currentAlign"
                                :source="buttons"
                                :notext="true"
                                style="width: auto"
                                @input="setAlign"/>
            `,
            data(){
              return {
                buttons: [{
                  text: bbn._('Align Left'),
                  icon: 'nf nf-fa-align_left',
                  value: 'justifyLeft'
                }, {
                  text: bbn._('Align Center'),
                  icon: 'nf nf-fa-align_center',
                  value: 'justifyCenter'
                }, {
                  text: bbn._('Align Right'),
                  icon: 'nf nf-fa-align_right',
                  value: 'justifyRight'
                }, {
                  text: bbn._('Align Justify'),
                  icon: 'nf nf-fa-align_justify',
                  value: 'justifyFull'
                }],
                currentAlign: '',
                isDisabled: false,
                isReadOnly: false
              }
            },
            computed: {
              rte() {
                return this.closest('bbn-floater').opener;
              }
            },
            methods: {
              setAlign(align){
                exec(align);
              }
            },
            mounted(){
              this.rte.alignComponent = this;
              this.isDisabled = !!this.rte.disabled;
              this.isReadOnly = !!this.rte.readonly;
              this.disWatch = this.rte.$watch('disabled', val => this.isDisabled = !!val);
              this.readWatch = this.rte.$watch('readonly', val => this.isDisabled = !!val);
            },
            beforeDestroy(){
              this.disWatch();
              this.readWatch();
            }
          }
        },
        fontcolor: {
          text: bbn._('Font Color'),
          notext: true,
          active: false,
          component: {
            name: 'bbn-rte-fontcolor',
            template: `
              <span :class="['bbn-rte-fontcolor', 'bbn-vmiddle', 'bbn-iflex', 'bbn-bordered', 'bbn-radius', {
                      'disabled': !!isDisabled || !!isReadOnly,
                      'bbn-background': !isDisabled && !isReadOnly
                    }]">
                <i class="nf nf-mdi-format_color_text bbn-hxsspace"/>
                <bbn-colorpicker @change="setColor"
                                 v-model="currentColor"
                                 :disabled="isDisabled"
                                 :readonly="isReadOnly"/>
              </span>
            `,
            data(){
              return {
                currentColor: bbn.fn.rgb2hex(window.getComputedStyle(document.body).color),
                isDisabled: false,
                isReadOnly: false
              }
            },
            computed: {
              rte() {
                return this.closest('bbn-floater').opener;
              }
            },
            methods: {
              setColor(color){
                exec('foreColor', color);
              }
            },
            mounted(){
              this.rte.fontColorComponent = this;
              this.isDisabled = !!this.rte.disabled;
              this.isReadOnly = !!this.rte.readonly;
              this.disWatch = this.rte.$watch('disabled', val => this.isDisabled = !!val);
              this.readWatch = this.rte.$watch('readonly', val => this.isDisabled = !!val);
            },
            beforeDestroy(){
              this.disWatch();
              this.readWatch();
            }
          }
        },
        fontbgcolor: {
          text: bbn._('Font Background Color'),
          notext: true,
          active: false,
          component: {
            name: 'bbn-rte-fontbgcolor',
            template: `
            <span :class="['bbn-rte-fontbgcolor', 'bbn-vmiddle', 'bbn-iflex', 'bbn-bordered', 'bbn-radius', {
                    'disabled': !!isDisabled || !!isReadOnly,
                    'bbn-background': !isDisabled && !isReadOnly
                  }]">
                <i class="nf nf-mdi-format_color_fill bbn-hxsspace bbn-lg"/>
                <bbn-colorpicker @change="setColor"
                                 v-model="currentColor"
                                 :disabled="isDisabled"
                                 :readonly="isReadOnly"/>
              </span>
            `,
            data(){
              return {
                currentColor: '',
                isDisabled: false,
                isReadOnly: false
              }
            },
            computed: {
              rte() {
                return this.closest('bbn-floater').opener;
              }
            },
            methods: {
              setColor(color){
                exec('hiliteColor', color);
              }
            },
            mounted(){
              this.rte.fontBgColorComponent = this;
              this.isDisabled = !!this.rte.disabled;
              this.isReadOnly = !!this.beforeDestroy, this.rte.readonly;
              this.disWatch = this.rte.$watch('disabled', val => this.isDisabled = !!val);
              this.readWatch = this.rte.$watch('readonly', val => this.isDisabled = !!val);
            },
            beforeDestroy(){
              this.disWatch();
              this.readWatch();
            }
          }
        },
        outdent: {
          icon: 'nf nf-md-arrow_expand_left',
          text: bbn._('Decrease indent'),
          notext: true,
          action: () => exec('outdent')
        },
        indent: {
          icon: 'nf nf-md-arrow_expand_right',
          text: bbn._('Increase indent'),
          notext: true,
          action: () => exec('indent')
        },
        /*
        heading: {
          icon: 'nf nf-fa-header',
          text: bbn._('Heading 1'),
          notext: true,
          items: [
            {
              icon: 'nf nf-mdi-format_header_1',
              text: bbn._('Heading 1'),
              notext: true,
              action: () => exec(formatBlock, '<h1>')
            },
            {
              icon: 'nf nf-mdi-format_header_2',
              text: bbn._('Heading 2'),
              notext: true,
              action: () => exec(formatBlock, '<h2>')
            },
            {
              icon: 'nf nf-mdi-format_header_3',
              text: bbn._('Heading 3'),
              notext: true,
              action: () => exec(formatBlock, '<h3>')
            },
            {
              icon: 'nf nf-mdi-format_header_4',
              text: bbn._('Heading 4'),
              notext: true,
              action: () => exec(formatBlock, '<h4>')
            },
            {
              icon: 'nf nf-mdi-format_header_5',
              text: bbn._('Heading 5'),
              notext: true,
              action: () => exec(formatBlock, '<h5>')
            },
            {
              icon: 'nf nf-mdi-format_header_6',
              text: bbn._('Heading 6'),
              notext: true,
              action: () => exec(formatBlock, '<h6>')
            },
          ]
        },
        paragraph: {
          icon: 'nf nf-fa-paragraph',
          text: bbn._('Paragraph'),
          notext: true,
          action: () => exec(formatBlock, '<p>')
        },
        */
        quote: {
          icon: 'nf nf-mdi-format_quote_open',
          text: bbn._('Quote'),
          notext: true,
          action: () => exec('formatBlock', '<blockquote>')
        },
        olist: {
          icon: 'nf nf-mdi-format_list_numbers',
          text: bbn._('Ordered List'),
          notext: true,
          action: () => exec('insertOrderedList')
        },
        ulist: {
          icon: 'nf nf-mdi-format_list_bulleted_type',
          text: bbn._('Unordered List'),
          notext: true,
          action: () => exec('insertUnorderedList')
        },
        code: {
          icon: 'nf nf-mdi-code_tags',
          text: bbn._('Code'),
          notext: true,
          action: () => exec('formatBlock', '<pre>')
        },
        line: {
          icon: 'nf nf-oct-horizontal_rule',
          text: bbn._('Horizontal Line'),
          notext: true,
          action: () => exec('insertHorizontalRule')
        },
        link: {
          icon: 'nf nf-oct-link',
          text: bbn._('Link'),
          notext: true,
          action: () => {
            const url = window.prompt(bbn._('Enter the link URL'))
            if (url) exec('createLink', url)
          }
        },
        image64: {
          text: bbn._('Image'),
          component: {
            template: `
              <bbn-button text="` + bbn._('Image') + `"
                          icon="nf nf-md-image_plus"
                          :notext="true"
                          @click="onClick"/>
            `,
            methods: {
              onClick() {
                let fileInput = this.rte.getRef('fileInput');
                if (fileInput) {
                  fileInput.click();
                }
              }
            }
          },
          notext: true
        },
        image: {
          icon: 'nf nf-md-image_move',
          text: bbn._('Image from URL'),
          notext: true,
          action: () => {
            const url = window.prompt(bbn._('Enter the image URL'))
            if (url) exec('insertImage', url)
          }
        }
      });
      const setButtons = buttons => {
        let res = bbnData.immunizeValue([]);
        if (!buttons.length) {
          buttons = Object.keys(this.defaultButtons);
        }

        bbn.fn.each(buttons, a => {
          if (bbn.fn.isString(a) && this.defaultButtons[a]) {
            res.push(bbn.fn.extend({code: a}, this.defaultButtons[a]));
          }
          else {
            res.push(a);
          }
        });

        return res;
      };
      const exec = (command, value = null) => document.execCommand(command, false, value);
      const defaultStates = {
        bold: {
          active: () => this.queryCommandState('bold'),
        },
        italic: {
          active: () => this.queryCommandState('italic'),
        },
        underline: {
          active: () => this.queryCommandState('underline'),
        },
        strikethrough: {
          active: () => this.queryCommandState('strikeThrough'),
        },
      };

      const defaultClasses = {
        actionbar: 'pell-actionbar',
        button: 'pell-button',
        content: 'pell-content',
        selected: 'pell-button-selected'
      };
    
      let openedFloatingRTE = [];
      return {
        defaultParagraphSeparatorString,
        formatBlock,
        queryCommandState,
        queryCommandValue,
        setButtons,
        exec,
        defaultButtons,
        defaultStates,
        defaultClasses,
        openedFloatingRTE
      };
    },
    props: {
      /**
       * @prop {Boolean} [true] toolbar
       */
      toolbar: {
        type: Boolean,
        default: true
      },
      /**
       * @prop {String} ['top'] position
       */
      position: {
        type: String,
        default: 'top'
      },
      /**
       * @prop {Boolean} [false] iFrame
       */
      iFrame: {
        type: Boolean,
        default: false
      },
      /**
       * @prop {Array} [bbn.env.cdn + 'lib/bbnjs/1.0.1/src/css/iFrame.less'] iframeCSSLinks
       */
      iframeCSSLinks: {
        default(){
          return [bbn.env.cdn + 'lib/bbnjs/1.0.1/src/css/iFrame.less']
        },
        type: Array
      },
      /**
       * The height of the editor
       * @prop {Number|String} ['100%'] height
       */
      height: {
        type: [String, Number]
      },
      cleanPaste: {
        type: Boolean,
        default: false
      },
      /**
       * The buttons to show on the toolbar
       * @prop {Array} [[['viewHTML'],['undo', 'redo'],['formatting'],['strong', 'em', 'underline', 'del'],['removeformat', 'foreColor', 'backColor'],['superscript', 'subscript'],['link'],['insertImage', 'base64'],['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],['unorderedList', 'orderedList'],['horizontalRule'],['fullscreen']]] buttons
       */
      buttons: {
        type: Array,
        default() {
          return [];
        }
        /*default(){
          return ['source', '|', 'bold', 'italic', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|','image', 'video', 'table', 'link', '|', 'left', 'center', 'right', 'justify', '|', 'undo', 'redo', '|', 'hr', 'eraser', 'fullsize'];
          return [
            ['viewHTML'],
            ['undo', 'redo'], // Only supported in Blink browsers
            ['formatting'],
            ['strong', 'em', 'underline', 'del'],
            ['removeformat', 'foreColor', 'backColor'],
            ['superscript', 'subscript'],
            ['link'],
            ['insertImage', 'base64'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'center'],
            ['unorderedList', 'orderedList'],
            ['horizontalRule'],
            ['fullscreen'],

          ];
        }*/
      },
      /**
       * The object of configuration.
       * @prop {Object} cfg
       */
      cfg: {
        type: Object,
        default(){
          return {
            pinned: true,
            top: null,
            left: null,
            bottom: 5,
            right: 5,
          }
        }
      },
      floating: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        /**
         * The height to give to the editor depending on the value of the prop height.
         * @data {String} realHeight
         */
        realHeight: typeof this.height === 'string' ? this.height : this.height + 'px',
        /**
         * @data [false] widget
         */
        widget: false,
         /**
         * @data {String|Number} currentValue
         */
        currentValue: this.value,
        /**
         * @data {bbnCp} fontColorComponent
         */
        fontColorComponent : null,
        /**
         * @data {bbnCp} fontBgColorComponent
         */
        fontBgColorComponent : null,
        /**
         * @data {bbnCp} fontsizeComponent
         */
        fontsizeComponent : null,
        /**
         * @data {bbnCp} alignComponent
         */
        alignComponent : null,
        /**
         * @data {Bool} [false] isEditing
         */
        isEditing: false,
        showSource: false,
        body: document.body,
        currentButtons: null

      }
    },
    computed: {
      textboxStyle() {
        let style = {};
        if (this.toolbar) {
          if (this.position === 'top') {
            style.borderTop = '0px';
            style.borderTopLeftRadius = '0px';
            style.borderTopRightRadius = '0px';
          }
          else {
            style.borderBottom = '0px';
            style.borderBottomLeftRadius = '0px';
            style.borderBottomRightRadius = '0px';
          }
        }
        return style;
      },
      currentHeight(){
        if (this.height) {
          return bbn.fn.isNumber(this.height) && (this.height > 0) ? this.height + 'px' : this.height;
        }
        return '';
      }
    },
    methods: {
      /**
       * @method onPaste
       */
      onPaste(ev) {
        if (this.cleanPaste) {
          ev.preventDefault();
          bbn.fn.replaceSelection(bbn.fn.nl2br(ev.clipboardData.getData('text/plain').trim(), true));
          this.emitInput(this.getRef('element').innerHTML);
        }
      },


      /**
       * @method setButtons
       */
      setButtons() {
        let tmp = bbnRteCp.setButtons(this.buttons);
        if (this.floating) {
          tmp.push({
            icon: 'nf nf-fa-times',
            text: bbn._('Close'),
            notext: true,
            active: false,
            action: () => {
              this.isEditing = false;
            }
          });
        }
        let row = bbn.fn.getRow(tmp, {code: 'code'});
        if (row) {
          row.action = () => {
            this.showSource = !this.showSource;
          }
        }
        this.currentButtons = tmp;
      },
      /**
       * @method updateButtonsState
       */
      updateButtonsState() {
        bbn.fn.iterate(this.currentStates, (a, n) => {
          let row = bbn.fn.getRow(this.currentButtons, {code: n});
          if (row) {
            row.active = a.active();
          }
        });
      },
      /**
       * @method rteOnKeydown
       * @fires setColors
       * @fires setStyle
       * @fires setAlign
       */
      rteOnKeydown(event) {
        if (event.key === 'Enter') {
          event.stopPropagation();
          event.stopImmediatePropagation();
        }
        if (event.key === 'Enter' && bbnRteCp.queryCommandValue(bbnRteCp.formatBlock) === 'blockquote') {
          setTimeout(() => exec(bbnRteCp.formatBlock, `<${this.defaultParagraphSeparator}>`), 0);
        }
        this.setColors();
        this.setStyle();
        this.setAlign();
      },
      /**
       * @method rteOnClick
       * @fires updateButtonsState
       * @fires setColors
       * @fires setStyle
       * @fires setFontsize
       * @fires setAlign
       */
      rteOnClick(event){
        this.updateButtonsState();
        this.setColors();
        this.setStyle();
        this.setFontsize();
        this.setAlign();

      },
      /**
       * @method rteOnInput
       */
      rteOnInput(target) {
        let firstChild = target.firstChild;
        if (firstChild && firstChild.nodeType === 3) {
          exec(bbnRteCp.formatBlock, `<${this.defaultParagraphSeparator}>`);
        }
        else if (this.content.innerHTML === '<br>') {
          this.content.innerHTML = ''
        }
        this.updateButtonsState();
        this.currentValue = this.content.innerHTML;
        this.emitInput(this.currentValue);
      },
      /**
       * @method setStyle
       */
      setStyle(){
        if (this.styleComponent) {
          let style = bbnRteCp.queryCommandValue(bbnRteCp.formatBlock);
          this.styleComponent.currentStyle =  !!style ? `<${style}>` : '<div>';
        }
      },
      /**
       * @method setColors
       */
      setColors(){
        if (this.fontColorComponent) {
          this.fontColorComponent.currentColor = bbn.fn.rgb2hex(bbnRteCp.queryCommandValue('foreColor'));
        }
        if (this.fontBgColorComponent) {
          this.fontBgColorComponent.currentColor = bbn.fn.rgb2hex(bbnRteCp.queryCommandValue('hiliteColor'));
          if (!this.fontBgColorComponent.currentColor) {
            this.fontBgColorComponent.currentColor = bbn.fn.rgb2hex(bbnRteCp.queryCommandValue('backColor'));
          }
        }
      },
      /**
       * @method setFontsize
       */
      setFontsize(){
        if (this.fontsizeComponent) {
          this.fontsizeComponent.currentSize = parseInt(bbnRteCp.queryCommandValue('fontSize')) || 2;
        }
      },
      /**
       * @method setAlign
       */
      setAlign(){
        if (this.alignComponent) {
          let current;
          if (queryCommandState('justifyLeft')) {
            current = 'justifyLeft';
          }
          else if (queryCommandState('justifyCenter')) {
            current = 'justifyCenter';
          }
          else if (queryCommandState('justifyRight')) {
            current = 'justifyRight';
          }
          else if (queryCommandState('justifyFull')) {
            current = 'justifyFull';
          }
          if (!!current && (this.alignComponent.currentAlign != current)) {
            this.alignComponent.currentAlign = current;
          }
        }
      },
      onClickDocument(e) {
        let floater = this.getRef('floater');
        let element = this.getRef('element');
        if (floater && element) {
          if (!bbn.fn.isInside(e.target, floater.$el) && !bbn.fn.isInside(e.target, element) && (e.target !== element)) {
            bbn.fn.log("onClickDocument");
            this.isEditing = false;
          }
        }
      },
      updateContenteditable() {
        let element = this.getRef('element');
        let st = element.innerHTML;
        if (st !== this.currentValue) {
          this.currentValue = st;
          this.emitInput(st);
        }
      },
      stopEdit() {
        if (bbn.fn.isNumber(this.stopEditTimeout)) {
          clearTimeout(this.stopEditTimeout);
        }

        this.stopEditTimeout = setTimeout(() => {
          this.isEditing = false;
        }, 2000)
      },
      onFileInputChange(ev){
        const files = ev.target.files;
        if (files.length) {
          const [file] = files;
          const fileReader = new FileReader();
          fileReader.onload = () => {
            const img = fileReader.result;
            exec('insertHTML', `<img src="${img}" style="max-width: 100%; height: auto; object-fit: scale-down">`);
            this.getRef('fileInput').value = '';
          }
          fileReader.readAsDataURL(file);
        }
      }
    },
    /**
     * @event created
     */
    created(){
      if (!this.value
        && this.$slots.default
        && this.$slots.default[0]
        && this.$slots.default[0].text.length
      ) {
        this.currentValue = this.$slots.default[0].text;
      }
      this.setButtons();
      bbn.fn.log("RTE!!", this);
      this.defaultParagraphSeparator = bbnRteCp.defaultParagraphSeparatorString || 'div'
    },
    /**
     * Initializes the component
     * @event mounted
     * @fires getRef
     * @emits input
     */
    mounted(){
      let cfg = {
        iframe: this.iFrame,
        disabled: this.isDisabled,
        readonly: this.readonly,
        required: this.required,
        allowResizeX: false,
        allowResizeY: false,
        spellcheck: false,
        useSplitMode: true,
        height: this.height,
        tabIndex: 0,
        maxHeight: '100%',
        uploader: {
          insertImageAsBase64URI: true
        },
        iframeCSSLinks: this.iFrame ? this.iframeCSSLinks : []
      };
  
      this.content = this.getRef('element');
      bbn.fn.log("CONTENT", this);
      this.content.innerHTML = this.currentValue;
  
      /*
      buttons.forEach(action => {
        const button = createElement('button')
        button.className = classes.button
        button.innerHTML = action.icon
        button.title = action.title
        button.setAttribute('type', 'button')
        button.onclick = () => action.result() && content.focus()
    
        if (action.state) {
          const handler = () => button.classList[action.state() ? 'add' : 'remove'](classes.selected)
          addEventListener(content, 'keyup', handler)
          addEventListener(content, 'mouseup', handler)
          addEventListener(button, 'click', handler)
        }
    
        appendChild(actionbar, button)
      })
  
      if (settings.styleWithCSS) exec('styleWithCSS')
        exec(defaultParagraphSeparatorString, defaultParagraphSeparator)
        */

      this.ready = true;
    },
    beforeDestroy() {
      if (this.floating) {
        window.document.body.removeEventListener('click', this.onClickDocument);
      }
    },
    watch: {
      value(v) {
        if (v !== this.currentValue) {
          this.currentValue = v;
          this.content.innerHTML = v;
        }
      },
      currentValue(v) {
        if (this.showSource) {
          this.content.innerHTML = v;
        }
      },
      /**
       * @watch value
       * @param newVal
       */
      buttons: {
        deep: true,
        handler() {
          this.setButtons();
        }
      },
      isEditing(v) {
        if (this.floating) {
          if (v) {
            window.document.body.addEventListener('click', ev => {
              this.onClickDocument(ev);
            });
            this.$nextTick(() => {
              this.getRef('floater').onResize(true);
            })
          }
          else {
            window.document.body.removeEventListener('click', ev => {
              this.onClickDocument(ev);
            });
          }
          /*
          if (v) {
            if (openedFloatingRTE.indexOf(this) === -1) {
              openedFloatingRTE.push(this);
            }
            bbn.fn.each(openedFloatingRTE, a => {
              if (a !== this) {
                a.isEditing = false;
                a.$forceUpdate();
              }
            });

          }
          else {
            let idx = openedFloatingRTE.indexOf(this);
            if (idx > -1) {
              openedFloatingRTE.splice(idx, 1);
            }
          }
          */
          this.$forceUpdate();

        }
      }
    }
  };

import cpHtml from './rte.html';
import cpStyle from './rte.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./rte.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-rte',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
