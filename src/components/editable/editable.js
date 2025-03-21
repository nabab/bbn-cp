/**
 * @file bbn-cms-block component
 * @description bbn-cms-block
 * @copyright BBN Solutions
 * @author Loredana Bruno
 * @created 09/11/2020.
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.componentInside
     */
    mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.input,
      bbn.cp.mixins.componentInside
    ],
    statics() {
      const titleTemplates = {
        h1: `<h1 bbn-text="currentValue"></h1>`,
        h2: `<h2 bbn-text="currentValue"></h2>`,
        h3: `<h3 bbn-text="currentValue"></h3>`,
        h4: `<h4 bbn-text="currentValue"></h4>`,
        h5: `<h5 bbn-text="currentValue"></h5>`,
      };
    
      const htmlTemplates = {
        p: `<p bbn-html="currentValue"></p>`,
        span: `<span bbn-html="currentValue"></span>`
    
      };
    
      const templates = {
        text: {
          view: '<div bbn-text="currentValue"/>',
          edit: '<bbn-input bbn-model="currentValue"/>'
        },
        multilines: {
          view: '<div bbn-text="currentValue" style="white-space: pre-wrap; word-break: break-word"/>',
          edit: '<bbn-textarea bbn-model="currentValue" class="bbn-100"/>'
        },
        inline: {
          view: '<div bbn-text="value"></div>',
          edit: '<bbn-inline-editor bbn-model="currentValue"/>'
        },
        component: {
          view: '<div bbn-text="currentValue" style="white-space: pre-wrap; word-break: break-word"></div>',
          edit: '<div class="bbn-100"><component :is="component" bbn-bind="componentOptions" bbn-model="currentValue"/></div>'
        },
        html: {
          view: `<div  @click="$parent.editMode" @mouseover="$parent.mouseover" @mouseleave="$parent.mouseleave"
                      :class="['component-container', 'bbn-block-html', alignClass]"
                      bbn-html="currentValue"
                      :style="currentStyle">
    
                </div>`,
          edit: `<div :class="['component-container', 'bbn-block-html', alignClass ]">
                  <bbn-rte bbn-model="currentValue"/>
                </div>`
        },
        markdown: {
          view: `<div  @click="$parent.editMode" @mouseover="$parent.mouseover" @mouseleave="$parent.mouseleave"
                      :class="['component-container', 'bbn-block-html', alignClass]"
                      bbn-html="currentValue"
                      :style="currentStyle"/>`,
          edit: `<div :class="['component-container', 'bbn-block-html', alignClass ]">
                  <bbn-markdown bbn-model="currentValue"/>
                </div>`
        },
        title: {
          view: `<div @click="$parent.editMode" @mouseover="$parent.mouseover" @mouseleave="$parent.mouseleave"  :class="['component-container', 'bbn-block-title', {'has-hr': source.hr}, alignClass]":style="currentStyle">
                  <hr bbn-if="source.hr">
                  <component :is="cpHTML(source.tag, 'title')" :source="source"/>
                  <hr bbn-if="source.hr">
                 </div>`,
          edit: `<div :class="['component-container','bbn-cms-block-edit' ,'bbn-block-title', 'bbn-flex-height', {'has-hr': source.hr}, alignClass]" :style="currentStyle">
                  <div class="edit-title bbn-w-100">
                    <hr bbn-show="source.hr"><component :is="cpHTML(source.tag,'title')" :source="source"/><hr bbn-if="source.hr">
                  </div>
                  <div class="bbn-grid-fields bbn-vspadding bbn-w-100">
                    <label bbn-text="_('Title tag')"></label>
                    <div>
                      <bbn-dropdown :source="tags" bbn-model="source.tag"/>
                    </div>
                    <label bbn-text="_('Title text')"/>
                    <bbn-input bbn-model="currentValue"/>
                    <label bbn-text="_('Title color')"/>
                      <div>
                        <bbn-colorpicker @change="setColor"/>
                      </div>
                    <label bbn-text="_('Title alignment')"/>
                    <bbn-block-align-buttons/>
                    <label bbn-text="_('Line')"/>
                    <bbn-checkbox bbn-model="source.hr"/>
                  </div>
                </div>`
        },
        image: {
          //taglia originale 100% width,width 50% 33% 25%
          view: `
          <div class="component-container bbn-block-image" :class="alignClass">
            <a bbn-if="source.href" target="_self" :href="$parent.linkURL + source.href" class="bbn-c">
              <img :src="$parent.path + source.src"
                    style="heigth:500px;width:100%"
                   :style="currentStyle"
                   :alt="source.alt ? source.alt : ''">
            </a>
            <img bbn-else
                 :src="$parent.path + source.src"
                 :style="currentStyle"
                 :alt="source.alt ? source.alt : ''">
            <p class="image-caption bbn-l bbn-s bbn-vsmargin"
               bbn-if="source.caption"
               bbn-html="source.caption"/>
            <!--error when using decodeuricomponent on details of home image-->
            <a class="image-details-title bbn-l bbn-vsmargin bbn-w-100"
               bbn-if="source.details_title"
               bbn-html="(source.details_title)"
               :href="source.href"
               target="_blank"/>
            <p class="image-details bbn-l bbn-vsmargin"
               bbn-if="source.details"
               bbn-html="(source.details)"/>
          </div>`,
          edit:     `
          <div class="component-container bbn-block-image" :class="alignClass">
            <div class="bbn-padding">
              <div class="bbn-grid-fields bbn-vspadding">
                <label bbn-text="_('Upload your image')"/>
                <bbn-upload :save-url="'upload/save/' + ref"
                            remove-url="test/remove"
                            :json="true"
                            :paste="true"
                            :multiple="false"
                            bbn-model="image"
                            @success="imageSuccess"/>
    
                <label bbn-text="_('Image size')"/>
                <bbn-cursor bbn-model="source.style['width']"
                            unit="%"
                            :min="0"
                            :max="100"
                            :step="20"/>
    
                <label bbn-text="_('Image alignment')"/>
                <bbn-block-align-buttons/>
              </div>
            </div>
            <img :src="$parent.path + source.src" :style="currentStyle">
            <p class="image-caption bbn-l bbn-s bbn-vsmargin" bbn-if="source.caption" bbn-html="source.caption"/>
          </div>
                    `
        },
        carousel: {
          view: `
          <div :class="['component-container', 'bbn-block-carousel', 'bbn-w-100',  alignClass]" :style="currentStyle" bbn-if="show">
            <div bbn-for="(group, idx) in carouselSource"
                 bbn-if="idx === currentCarouselIdx">
              <bbn-cms-carousel-control :source="idx"
                                        :key="idx"
                                        bbn-if="carouselSource.length > 3"/>
              <div :class="['bbn-w-100',carouselCols]">
                <bbn-cms-block-gallery-item bbn-for="(image, imgIdx) in group" :source="image" :key="imgIdx" :index="imgIdx"/>
              </div>
            </div>
          </div>
          `,
          edit: `<div bbn-text="_('Edit')"/>`
        },
        gallery: {
          view: `
          <div :class="['component-container', 'bbn-block-gallery', alignClass, galleryCols]" :style="currentStyle" bbn-if="show">
            <bbn-cms-block-gallery-item bbn-for="(image, idx) in source.source" :source="image" :key="idx" :index="idx"/>
          </div>
          `,
          edit: `
          <div>
            <div :class="['component-container', 'bbn-block-gallery', alignClass, galleryCols]" :style="currentStyle" bbn-if="show">
              <!-- GIVE HREF TO VIEW FULL IMAGE -->
              <bbn-cms-block-gallery-item bbn-for="(image, idx) in currentValue" :source="image" :key="idx" :index="idx"/>
            </div>
            <div class="bbn-grid-fields bbn-padding">
              <label bbn-text="_('Columns number')"/>
              <div>
                <bbn-dropdown bbn-model="source.columns"
                              :source="tinyNumbers"/>
              </div>
              <label bbn-text="_('Upload your images')"/>
              <bbn-upload :save-url="'upload/save/' + ref"
                          remove-url="test/remove"
                          :data="{gallery: true}"
                          :paste="true"
                          :multiple="true"
                          bbn-model="currentValue"
                          @success="imageSuccess"/>    
            </div>
          </div>
          `
        },
        video: {
          view: `
            <div :class="['component-container', 'bbn-cms-block-video', alignClass]">
              <!--ERROR ON HOME-->
              <!--bbn-video :width="source.width"
                         :style="currentStyle"
                         :height="source.height"
                         :autoplay="autoplay"
                         :muted="muted"
                         :youtube="youtube"
                         :source="source.src"
              ></bbn-video-->
              <iframe :style="currentStyle"
                      :autoplay="false"
                      :src="source.src"/>
            </div>`,
          edit: `
          <div class="component-container" id="video-container">
            <div class="bbn-grid-fields bbn-padding">
              <label bbn-text="_('Video source')"/>
              <bbn-input bbn-model="currentValue"/>
              <label bbn-text="_('Muted')"/>
              <div>
                <bbn-button :notext="true"
                            :title="_('Mute the video')"
                            @click="muted = !muted"
                            :icon="muted ? 'nf nf-oct-mute' : 'nf nf-oct-unmute'"/>
              </div>
              <label bbn-text="_('Autoplay')"/>
              <div>
                <bbn-button :notext="true"
                            :title="_('Autoplay')"
                            @click="autoplay = !autoplay"
                            :icon="autoplay ? 'nf nf-fa-pause' : 'nf nf-fa-play'"/>
              </div>
              <label bbn-text="_('Video alignment')"/>
              <bbn-block-align-buttons/>
              <label bbn-text="_('Video width')"/>
              <div>
                <bbn-cursor bbn-model="source.style['width']"
                            :min="100"
                            :max="1000"
                            :step="10"
                            class="bbn-w-70"/>
              </div>
              <label bbn-text="_('Video height')"/>
              <div>
                <bbn-cursor bbn-model="source.style['height']"
                            :min="100"
                            :max="1000"
                            :step="10"
                            class="bbn-w-70"/>
              </div>
            </div>
            <div :class="alignClass">
              <bbn-video :width="source.style.width"
                        :style="currentStyle"
                        :height="source.style.height"
                        :autoplay="autoplay"
                        :muted="muted"
                        :youtube="youtube"
                        :source="currentValue"/>
            </div>
          </div>
          `
        },
        line: {
          view: `<div class="component-container"><hr :style="currentStyle"></div>`,
          edit: `<div class="block-line-edit component-container">
                  <hr :style="currentStyle">
                  <div class="block-line-edit-command bbn-padding">
                    <div class="bbn-grid-fields bbn-vspadding">
                      <label bbn-text="_('Line width')"/>
                      <div>
                        <bbn-cursor bbn-model="source.style['width']"
                                    :min="0"
                                    :max="100"
                                    unit="%"/>
                      </div>
                      <labelbbn-text="_('Line height')"/>
                      <div>
                        <bbn-cursor bbn-model="source.style['border-width']"
                                    :min="1"
                                    :max="10"
                                    unit="px"/>
                      </div>
                      <label bbn-text="_('Line style')"/>
                      <div>
                        <bbn-dropdown bbn-model="source.style['border-style']"
                                      :source="borderStyle"/>
                      </div>
    
                      <label bbn-text="_('Line color')"/>
                      <div>
                        <bbn-colorpicker bbn-model="source.style['border-color']"/>
                      </div>
                      <label bbn-text="_('Line alignment')"/>
                      <bbn-block-align-buttons/>
                    </div>
                  </div>
                 </div>`
        },
        space: {
          view: `<div class="component-container" :style="currentStyle">
                  <div class="block-space-view"/>
                </div>`,
          edit: `
              <div class="component-container" :style="currentStyle">
                <div :style="currentStyle" class="block-space-edit">
                  <bbn-cursor bbn-model="source.style.height"
                              unit="px"
                              :min="0"
                              :step="50"/>
                </div>
              </div>`
        }
      };
    
      const borderStyle =  [
        {"text":"hidden","value":"hidden"},
        {"text":"dotted","value":"dotted"},
        {"text":"dashed","value":"dashed"},
        {"text":"solid","value":"solid"},
        {"text":"double","value":"double"},
        {"text":"groove","value":"groove"},
        {"text":"ridge","value":"ridge"}
      ];
      return {
        titleTemplates,
        htmlTemplates,
        templates,
        borderStyle
      };
    },
    props: {
      /**
       * @prop {String} ['nf nf-fa-edit bbn-xlarge bbn-blue'] editIcon
       */
      editIcon: {
        type: String,
        default: 'nf nf-fa-edit bbn-m bbn-blue'
      },
      /**
       * @prop {String} ['nf nf-fa-check bbn-xlarge bbn-green'] saveIcon
       */
      saveIcon: {
        type: String,
        default: 'nf nf-fa-check bbn-m bbn-green'
      },
      /**
       * @prop {String} ['nf nf-fa-check bbn-xlarge bbn-red'] cancelIcon
       */
      cancelIcon: {
        type: String,
        default: 'nf nf-fa-close bbn-m bbn-red'
      },
      /**
       * The aduio's URL
       * @prop {Object} [{}] source
       */
      source: {
        type: Object,
        default(){
          return {}
        }
      },
      /**
       * The component's label
       * @prop {String} [''] label
       */
      label: {
        type: String,
        default: ''
      },
      /**
       * @prop {Number} index
       */
      index: {
        type: Number,
      },
      //the path for the index showing the images ('ex: image/')
      /**
       * @prop {String} [''] path
       */
      path: {
        type: String,
        default: ''
      },
      //the path for the links (give a path to a controller to manage the links)
      /**
       * @prop {String} [''] linkURL
       */
      linkURL: {
        type: String,
        default: ''
      },
      /**
       * @prop {String} [] novalue
       */
      novalue: {
        type: String
      }
    },
    data(){
      const data = {
        /**
         * @data {Boolean} [false] over
         */
        over: false,
        mouseIn: false,
        /**
         * @data {Boolean} [false] isEditing
         */
        isEditing: false,
        /**
         * @data {Boolean} [true] editing
         */
        editing: true,
        /***
         * @data {String} ['100%'] width
         */
        width: '100%',
        /**
         * @data {String} ['100%']
         */
        height: '100%',
        /**
         * @prop {Object} [{}] initialSource
         */
        initialSource: {},
        /**
         * @prop {(Object|Null|String)} currentValue
         */
        currentValue: this.value || (this.source.nullable ? null : ''),
        componentObject: null,
      };

      return data;
    },
    computed: {
      /**
       * @computed changed
       * @return {Boolean}
       */
      changed(){
        return !bbn.fn.isSame(this.currentValue, this.value)
      },
      /**
       * @computed type
       * @return {String}
       */
      type(){
        if (this.component) {
          return 'component';
        }
        if (this.source && this.source.type) {
          return this.source.type;
        }

        return 'text';
      },
      /**
       * @computed parent
       * @return {(Object|null)}
       */
      parent(){
        const ct = this.closest('bbn-container');
        if (this.ready && ct) {
          return ct.getComponent();
        }

        return null;
      }
    },
    /**
     * getCurrentValue
     */
    methods: {
      /**
       * @method getCurrentValue
       * @return {*}
       */
      getCurrentValue(){
        return this.currentValue;
      },
      /**
       * @method save
       * @emits save
       */
      save() {
        if (this.currentValue !== this.value) {
          this.originalValue = bbn.fn.clone(this.value);
          this.$emit('save', this.currentValue, this.originalValue);
          this.emitInput(this.currentValue);
        }
        this.isEditing = false;
      },
      /**
       * @method focusout
       * @fires save
       */
      focusout(){
        if (this.isEditing) {
          this.save()
        }
      },
      /**
       * @method onCancel
       */
      async onCancel() {
        bbn.fn.log("CANCEL");
        this.currentValue = this.value ? bbn.fn.clone(this.value) : (this.source.nullable ? null : '');
        this.isEditing = false;
        await this.$forceUpdate();
      },
      /**
       * @method mouseleave
       */
      mouseleave(){
        this.over = false
      },
      /**
       * @method mouseover
       */
      mouseover(){
        this.over = true
        /*console.log('over: ' + this.over)
        if ( !e.target.closest(".component-container") ){
          e.preventDefault();
          e.stopImmediatePropagation();
          this.over = false;
        }
        else{
          this.over = true;
        }*/
      },
      /**
       * @method mouseenter
       */
      mouseenter(){
        alert('enter')
      },
      /**
       * @method selectImg
       * @param {String} st
       */
      selectImg(st){
        bbn.fn.link(st);
      },
      /**
       * @method alert
       */
      alert(){
        alert('test')
      },
      /**
       * adds the events listener when edit = true
       * @method _setEvents
       * @param {boolean} edit
       */
      _setEvents(){
        /*
        document.addEventListener('mousedown', this.checkMouseDown);
        document.addEventListener('touchstart', this.checkMouseDown);
        document.addEventListener('keydown', this.checkKeyCode);
        */
        /*if ( edit ){
          document.addEventListener('mousedown', this.checkMouseDown);
          document.addEventListener('touchstart', this.checkMouseDown);
          document.addEventListener('keydown', this.checkKeyCode);
        }
        else{
          document.addEventListener('mouseover', this.mouseover);
          document.removeEventListener('mousedown', this.checkMouseDown);
          document.removeEventListener('touchstart', this.checkMouseDown);
        }*/
      },
      /**
       * @method checkKeyCode
       * @param {Event} e
       */
      checkKeyCode(e){
        if ( e.keyCode === 27 ){
          this.edit = false;
        }
      },
      /**
       * set edit to false
       * @method checkMouseDown
       * @param {Event} e
       */
      checkMouseDown(e){
        if ( !e.target.closest(".bbn-cms-block-edit") ){
          /*e.preventDefault();
          e.stopImmediatePropagation();*/
          this.edit = false;
          alert(this.edit)
        }
        else{
          alert(this.edit)
          this.editMode();
        }
      },
      /**
       * @method editBlock
       */
      editBlock(){
        if ( this.changed ){
          appui.success(bbn._('Block changed'))
          //add a confirm
         this.$nextTick(()=>{
           this.edit = false;
         })
        }
        else{
          this.edit = false;
        }

      },
      /**
       * @method edit
       * @emits edit
       */
      edit(){
        let ev = new Event('edit', {cancelable: true});
        this.$emit('edit', ev, this);
        if (!ev.defaultPrevented) {
          this.isEditing = true;
        }
      },
      /**
       * @method cancelEdit
       */
      cancelEdit(){
      },
      /**
       * @method editMode
       */
      editMode(){
        let blocks = this.closest('bbn-container').getComponent().findAll('bbn-cms-block');
        bbn.fn.each(blocks, (v, i)=>{
          v.edit = false;
          v.over = false;
        })
        this.edit = true;
      },
      /**
       * returns the object of the component basing on the given type
       * @param {String} type
       * @return {Object}
       */
      getComponentObject(type) {
        if (!bbnEditable.templates[type]) {
          throw new Error('The component type ' + type + ' is not defined');
        }

        return bbnData.immunizeValue({
          props: {
            value: {},
            source: {},
          },
          template: this.isEditing ? bbnEditable.templates[type].edit : bbnEditable.templates[type].view,
          data(){
            let tmp = Object.keys(bbnEditable.titleTemplates).map((a)=>{return a = {text:a, value:a}});
            return {
              //cp video
              muted: true,
              autoplay: false,
              align: '',
              tags: tmp,
              image: [],
              tinyNumbers: [{text: '1', value: 1}, {text: '2', value: 2},{text: '3', value: 3},{text: '4', value: 4}],
              borderStyle: bbnEditable.borderStyle,
              ref: (new Date()).getTime(),
              show: true,
              currentCarouselIdx: 0
            }
          },
          computed: {
            currentValue: {
              get() {
                bbn.fn.log("GETTING CURRENT VALUE", type, this.value, this.$el.bbnSchema.model.value.value, this)
                return this.value
              },
              set(v) {
                this.$emit('input', v)
              }
            },
            edit(){
              return this.$parent.edit
            },
            path(){
              return this.$parent.path
            },
            linkURL(){
              return this.$parent.linkURL
            },
            carouselSource(){
              if (this.source.source && (this.source.type === 'carousel')){
                let res = [];
                var i,j,temparray, chunk = 3;
                for (i=0,j=this.source.source.length; i<j; i+=chunk) {
                    temparray = this.source.source.slice(i,i+chunk);
                    res.push(temparray);
                    // do whatever
                }
                return res;

              }

            },
            mobile(){
              if ( bbn.env.width <= 640 ){
                this.$parent.isMobile = true;
                return true;
              }
              return false
            },
            galleryCols(){
              if ( (this.source.type === 'gallery') && !this.mobile){
                if ( this.source.columns === 1 ){
                  return 'cols-1'
                }
                else if ( this.source.columns === 2 ){
                  return 'cols-2'
                }
                else if ( this.source.columns === 4 ){
                  return 'cols-4'
                }
                return 'cols-3'
              }
              else if (this.mobile) {
                if (this.source.columns !== 2) {
                  return 'cols-2'
                }
                else{
                  return 'cols-1'
                }
              }
            },
            carouselCols(){
              if ( (this.source.type === 'carousel') && !this.mobile){
                if ( this.source.columns === 1 ){
                  return 'cols-1'
                }
                else if ( this.source.columns === 2 ){
                  return 'cols-2'
                }
                else if ( this.source.columns === 4 ){
                  return 'cols-4'
                }
                return 'cols-3'
              }
              else if (this.mobile){
                return 'cols-2'
              }
            },
            youtube(){
              if (this.source.src) {
                return this.source.src.indexOf('youtube') > -1
              }

              return false;
            },
            contentStyle(){
              let st = ''
              if ( this.source.style?.['border-radius'] ){
                st += 'border-radius:' + this.source.style['border-radius'] + ( bbn.fn.isNumber(this.source.style['border-radius']) ? ( 'px;') : ';');
              }
              return st;
            },
            alignClass(){
              let st = 'bbn-c';
              if ( this.source.align === 'left' ){
                st = 'bbn-l'
              }
              if ( this.source.align === 'right' ){
                st = 'bbn-r'
              }
              return st;
            },
            currentStyle() {
              let st = '';
              if ( this.source.style ){
                if ( this.source.style['color'] ){
                  st += 'color: ' + this.source.style['color'] + ';'
                }
                if ( this.source.style['font-size'] ){
                  st += 'font-size:' + this.source.style['font-size'] + ( bbn.fn.isNumber(this.source.style['font-size']) ? ( 'px;') : ';');
                }
                if ( this.source.style['width'] ){
                  st += 'width:' + this.source.style['width'] + ( bbn.fn.isNumber(this.source.style['width']) ? ( 'px;') : ';');
                }
                if ( this.source.style['height'] ){
                  st += 'height:' + this.source.style['height'] + ( bbn.fn.isNumber(this.source.style['height']) ? ('px;' ) : ';');
                }
                if ( this.source.style['border-style'] ){
                  st += 'border-style:' + this.source.style['border-style'] + ';';
                }
                if ( this.source.style['border-color'] ){
                  st += 'border-color:' + this.source.style['border-color'] + ';';
                }
                if(this.source.type === 'line'){
                  if (bbn.fn.isEmpty(this.source.style) || !this.source.style['border-width'] ){
                    this.source.style['border-width'] = '100%';
                    st += 'border-top-width:' + this.source.style['border-width'] + ( bbn.fn.isNumber(this.source.style['border-width']) ? 'px;' : ';');
                    st += 'border-bottom:0'
                  }
                }
                else {
                  if ( this.source.style['border-width'] ){
                    st += 'border-width:' + this.source.style['border-width'] + ( bbn.fn.isNumber(this.source.style['border-width']) ? 'px;' : ';');
                  }
                }
              }
              if ( this.source.align && ((this.source.type === 'line') || (this.source.type === 'video'))){
                let margin = '';
                switch (this.source.align){
                  case 'center':
                    (margin = 'margin-left: auto;margin-right:auto');
                  break;
                  case 'left':
                    this.source.type === 'video' ? (margin = 'float: left') : (margin = 'margin-left: 0');
                  break;
                  case 'right':
                    this.source.type === 'video' ? (margin = 'float: right') : (margin = 'margin-right: 0');
                  break;
                }
                st += margin;

              }
              return st;
            }
          },
          methods: {
            decodeURIComponent(st){
              //the regular expression to match the new line
              /*let reg = /\r?\n|\r/g;
              if(st.match(reg)){
                st = st.replace(reg, '');
              }*/
              //var st = bbn.fn.nl2br(st);
              return decodeURIComponent(this.escape(st));
            },
            escape(st){
              return escape(st)
            },
            /**
             * calculate the height of the images in gallery basing on source.columns
             */
            makeSquareImg(){
              if ( !this.source.noSquare ){
                 //creates square container for the a
              var items = this.$el.querySelectorAll('a'),
                images = this.$el.querySelectorAll('img');
                this.show = false;
                if (this.source.columns === 1){
                  for (let i in items ){
                    if ( images[i].tagName === 'IMG' ){
                      this.$nextTick(()=>{
                        images[i].style.height = 'auto';
                        images[i].style.width = '100%';
                      })
                    }
                  }
                }
                else {
                  for (let i in images ){
                    if ( images[i].tagName === 'IMG' ){
                      this.$nextTick(()=>{
                        images[i].style.height = items[i].offsetWidth + 'px';
                      })
                    }
                  }

                }
              this.show = true;
              }
            },
            setColor(a){
              this.source.style.color = a;
              this.$parent.edit = false
              //this.$forceUpdate()
            },
            //returns the component for the blocks of type title
            cpHTML(tag, type){
              return {
                props: ['source'],
                template: (type === 'title') ? bbnEditable.titleTemplates[tag] : bbnEditable.htmlTemplates[tag],
              }
            },
            /** @todo Seriously these arguments names??  */
            imageSuccess(a, b, c, d){
              if (c.success && c.image.src.length ){
                if ( this.source.type === 'gallery' ){
                  c.image.src = c.image.name;
                  c.image.alt = '';
                  setTimeout(() => {
                    this.show = false;
                    //this.currentValue.push(c.image);//
                    this.makeSquareImg();
                  }, 200);
                }
                else{
                  this.emitInput(c.image.name);
                }
                appui.success(bbn._('Image correctly uploaded'))
              }
              else{
                appui.error(bbn._('An error occurred while uploading the image'))
              }

            }
          },
          components: {
            'bbn-cms-block-gallery-item': {
              props: ['source', 'index'],
              //:src="'image/' + currentValue"
              //the template below to take the image from index
              template: `
                <!--IMPORTANT CHANGE FROM CLICK TO HREF WHEN WILL BE POSSIBLE TO MAKE LINK-->
                <!--a  target="_self" :href="(source.href ? (linkURL + source.href) : source.src)"-->
                <a  target="_self" @click="selectImg">
                  <!--TO TAKE IMAGE FROM THE INDEX-->
                  <img :src="path + source.src" :alt="source.alt ? source.alt : ''" :style="$parent.source.style">
                  <div bbn-if="source.caption || (source.title && (type === 'carousel'))"
                       :class="['bbn-block-gallery-caption',$parent.alignClass]"
                       bbn-html="(source.caption && (type === 'gallery')) ? source.caption : source.title"
                  ></div>
                  <div bbn-if="source.details_title"
                       :class="['image-details-title',$parent.alignClass]"
                       bbn-html="source.details_title"
                  ></div>
                  <div bbn-if="source.details"
                       :class="['image-details',$parent.alignClass]"
                       bbn-html="source.details"
                  ></div>
                  <div bbn-if="source.price"
                       :class="['image-price',$parent.alignClass]"
                       bbn-text="source.price"
                  ></div>
                  <time bbn-if="source.time" bbn-text="source.time" :class="$parent.alignClass"></time>
                </a>
                `

               /*template: `
                <a :href="(source.src ? source.src : source.name)" target="_blank">
                  <!--TO TAKE IMAGE FROM THE INDEX-->
                  <!--img :src="'image/gallery/' + (source.src ? source.src : source.name)" :alt="source.alt ? source.alt : ''"-->
                  <img :src="source.src" :alt="source.alt ? source.alt : ''">
                </a>
                `*/,
                methods:{
                  //IMPORTANT TO RENDER CHINESE CHARACTERS
                  decodeURIComponent(st){
                    return this.$parent.decodeURIComponent(st);
                  },
                  escape(st){
                    return this.$parent.escape(st);
                  },
                  selectImg(){
                    bbn.fn.log("SELECT IMG", this.closest('bbn-container'), this.closest('bbn-container').getComponent());
                    return this.closest('bbn-cms-block').selectImg(this.source.href)
                  }
                },
                computed: {
                  path(){
                    return this.$parent.path
                  },
                  linkURL(){
                    return this.$parent.linkURL
                  },
                  type(){
                    return this.$parent.source.type
                  }
                },
                mounted(){
                  bbn.fn.happy(this.source.price)
                }
            },
            'bbn-cms-carousel-control':{
              template: `
              <div class="bbn-r control">
                <span>
                  <i @click="prev" class="prev nf nf-oct-chevron_left"></i>
                  <i @click="next" class="next nf nf-oct-chevron_right"></i>
                </span>
              </div>`,
              methods: {
                next(){
                  if ( this.$parent.currentCarouselIdx < (this.$parent.carouselSource.length -1) ){
                    this.$parent.currentCarouselIdx ++
                  }
                },
                prev(){
                  if ( this.$parent.currentCarouselIdx > 0 ){
                    this.$parent.currentCarouselIdx --
                  }
                }
              }
            },
            //internal component for align buttons in edit of the block
            'bbn-block-align-buttons':{
              template: `
              <div>
                <bbn-button icon="nf nf-fa-align_left"
                            :title="_('Align left')"
                            :notext="true"
                            @click="align = 'left'"
                            :class="{'bbn-state-active': ($parent.source.align === 'left')}"/>
                <bbn-button icon="nf nf-fa-align_center"
                            :title="_('Align left')"
                            :notext="true"
                            @click="align = 'center'"
                            :class="{'bbn-state-active': ($parent.source.align === 'center')}"/>
                <bbn-button icon="nf nf-fa-align_right"
                            :title="_('Align left')"
                            :notext="true"
                            @click="align = 'right'"
                            :class="{'bbn-state-active': ($parent.source.align === 'right')}"/>
              </div>`,
              data(){
                return {
                  align: ''
                }
              },
              watch:{
                align(val){
                  this.$parent.source.align = val
                  this.$parent.$parent.$forceUpdate();
                },
              },
            },

          },
          watch:{
            'source.columns':{
              handler(val){
                this.makeSquareImg()
              }
            }
          },
          beforeMount() {
            if ( bbn.fn.isEmpty(this.source.style) ){
              this.source.style = {}
            }
            if ( this.$parent.edit ){
              if ( (this.type === 'image') && this.currentValue && this.currentValue.length ){
                let extension = bbn.fn.substr(this.currentValue, this.currentValue.lastIndexOf('.'), this.currentValue.length)
                //take the correct size
                this.image.push({
                  "name": this.currentValue,
                  "size":574906,
                  "extension": extension
                });
              }
              else if ((this.type === 'gallery') && this.currentValue && this.currentValue.length) {
                /*this.image = bbn.fn.map(this.currentValue, a => {
                  let extension = bbn.fn.substr(a.src, a.src.lastIndexOf('.'), a.src.length);
                  a.name = a.src;
                  a.size = 465464;
                  a.extension = extension;
                  return a
                })*/
              }
            }
          },
          mounted(){
            if ( (this.source.type === 'gallery') || (this.source.type === 'carousel') ){
              this.makeSquareImg();
            }
          },

        });
      },
    },

    beforeMount() {
      bbn.fn.log(this.value, this.currentValue, '-------');
      this.componentObject = this.getComponentObject(this.type);
    },
    /**
     * @event mounted
     */
    mounted(){
      this.initialSource = bbn.fn.extend({}, this.source);
      this.ready = true;
      if ( bbn.fn.isEmpty(this.source.style) ){
        bbn.fn.warning(this.source.type + "  HAS STYLE WHICH IS EMPTY?")
        this.source.style = {};
      }
      if ( bbn.fn.isEmpty(this.source.style) || !this.source.style.color ){
        this.source.style.color = '';
      }
      if ( !this.source.align ){
        this.source.align = 'left'
      }
      if ( bbn.fn.isEmpty(this.source.style) || !this.source.style.width ){
        this.source.width = '100%'
      }
      //if alignment is already defined as style property
      if ( this.source.style && this.source.style.align ){
        this.source.align = this.source.style.align;
      }

      bbn.fn.log("I AM THE BLOCK! ", this.source);
    },


    watch: {
      /**
       * @watch isEditing
       */
      isEditing() {
        this.componentObject = this.getComponentObject(this.type);
      },
      /**
       * @watch type
       */
      type() {
        this.componentObject = this.getComponentObject(this.type);
      },
      /**
       * @watch edit
       * @param {Boolean} val
       */
      edit(val){
        //if adding a new block
        throw new Error('watch')
        if ( ( val === false ) && ( this.newBlock === true ) ){
          this.parent.source.lines.push(this.source)
          this.parent.lines.push({
            content: {
              data:  '<div>[CONTENT]</div>'
            },
            type: ''
          });
          appui.success(bbn._('New block ' + this.source.type + ' added!'))
          this.newBlock = false;
        }
        //this._setEvents()
      }
    },

  };

import cpHtml from './editable.html';
import cpStyle from './editable.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/editable.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-editable',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
