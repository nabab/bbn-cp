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
   */
  mixins: [bbn.cp.mixins.basic],
  statics() {
    let titleTemplates = {
      h1: `<h1 bbn-text="source.content"></h1>`,
      h2: `<h2 bbn-text="source.content"></h2>`,
      h3: `<h3 bbn-text="source.content"></h3>`,
      h4: `<h4 bbn-text="source.content"></h4>`,
      h5: `<h5 bbn-text="source.content"></h5>`,
    },
    htmlTemplates = {
      p: `<p bbn-html="source.content"></p>`,
      span: `<span bbn-html="source.content"></span>`
  
    },
    templates = {
      text: {
        view: `<div bbn-html="source.content || '&nbsp;'"/>`,
        edit: `<bbn-textarea class="bbn-w-100"
                              bbn-model="source.content"/>`
      },
      html: {
        view: `<div @click="$parent.editMode" @mouseover="$parent.mouseover" @mouseleave="$parent.mouseleave"
                    :class="['component-container', 'bbn-block-html', alignClass]"
                    bbn-html="source.content"
                    :style="currentStyle">
  
              </div>`,
        edit: `<div :class="['component-container', 'bbn-block-html', alignClass ]">
                <bbn-rte bbn-model="source.content">
                </bbn-rte>
              </div>`
      },
      title: {
        view: `<div @click="$parent.editMode" @mouseover="$parent.mouseover" @mouseleave="$parent.mouseleave"  :class="['component-container', 'bbn-block-title', {'has-hr': source.hr}, alignClass]":style="currentStyle">
                <hr bbn-if="source.hr">
                <component :is="cpHTML(source.tag, 'title')" :source="source"></component>
                <hr bbn-if="source.hr">
                </div>`,
        edit: `<div :class="['component-container','bbn-cms-block-edit' ,'bbn-block-title', 'bbn-flex-height', {'has-hr': source.hr}, alignClass]" :style="currentStyle">
                <div class="edit-title bbn-w-100">
                  <hr bbn-show="source.hr"><component :is="cpHTML(source.tag,'title')" :source="source"></component><hr bbn-if="source.hr">
                </div>
                <div class="bbn-grid-fields bbn-vspadding bbn-w-100">
                  <label bbn-text="_('Title tag')"></label>
                  <div>
                    <bbn-dropdown :source="tags" bbn-model="source.tag"></bbn-dropdown>
                  </div>
                  <label bbn-text="_('Title text')"></label>
                  <bbn-input bbn-model="source.content"></bbn-input>
                  <label>Title color</label>
                    <div>
                      <bbn-colorpicker @change="setColor"
                      ></bbn-colorpicker>
                    </div>
                  <label bbn-text="_('Title alignment')"></label>
                  <bbn-block-align-buttons></bbn-block-align-buttons>
                  <label bbn-text="_('Line')"></label>
                  <bbn-checkbox bbn-model="source.hr"></bbn-checkbox>
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
                  :alt="source.alt ? source.alt : ''"
            >
          </a>
          <img bbn-else
                :src="$parent.path + source.src"
                :style="currentStyle"
                :alt="source.alt ? source.alt : ''"
          >
          <p class="image-caption bbn-l bbn-s bbn-vsmargin"
              bbn-if="source.caption"
              bbn-html="source.caption"
          ></p>
          <!--error when using decodeuricomponent on details of home image-->
          <a class="image-details-title bbn-l bbn-vsmargin bbn-w-100"
              bbn-if="source.details_title"
              bbn-html="(source.details_title)"
              :href="source.href"
              target="_blank"
          ></a>
          <p class="image-details bbn-l bbn-vsmargin"
              bbn-if="source.details"
              bbn-html="(source.details)"
          ></p>
        </div>`,
        edit:     `
        <div class="component-container bbn-block-image" :class="alignClass">
          <div class="bbn-padding">
            <div class="bbn-grid-fields bbn-vspadding">
              <label bbn-text="_('Upload your image')"></label>
              <bbn-upload :save-url="'upload/save/' + ref"
                          remove-url="test/remove"
                          :json="true"
                          :paste="true"
                          :multiple="false"
                          bbn-model="image"
                          @success="imageSuccess"
              ></bbn-upload>
  
              <label bbn-text="_('Image size')"></label>
              <bbn-cursor bbn-model="source.style['width']"
                          unit="%"
                          :min="0"
                          :max="100"
                          :step="20"
              ></bbn-cursor>
  
              <label bbn-text="_('Image alignment')"></label>
              <bbn-block-align-buttons></bbn-block-align-buttons>
            </div>
          </div>
          <img :src="$parent.path + source.src" :style="currentStyle">
          <p class="image-caption bbn-l bbn-s bbn-vsmargin" bbn-if="source.caption" bbn-html="source.caption"></p>
        </div>
                  `
      },
      carousel: {
        view: `
        <div :class="['component-container', 'bbn-block-carousel', 'bbn-w-100',  alignClass]" :style="currentStyle" bbn-if="show">
          <div bbn-for="(group, idx) in carouselSource"
                bbn-if="idx === currentCarouselIdx"
          >
            <bbn-cms-carousel-control :source="idx"
                                      :key="idx"
                                      bbn-if="carouselSource.length > 3"
            ></bbn-cms-carousel-control>
            <div :class="['bbn-w-100',carouselCols]">
              <bbn-cms-block-gallery-item bbn-for="(image, imgIdx) in group" :source="image" :key="imgIdx" :index="imgIdx"></bbn-cms-block-gallery-item>
            </div>
          </div>
        </div>
        `,
        edit: `<div>edit</div>`
      },
      gallery: {
        view: `
        <div :class="['component-container', 'bbn-block-gallery', alignClass, galleryCols]" :style="currentStyle" bbn-if="show">
          <bbn-cms-block-gallery-item bbn-for="(image, idx) in source.source" :source="image" :key="idx" :index="idx"></bbn-cms-block-gallery-item>
        </div>
        `,
        edit: `
        <div>
          <div :class="['component-container', 'bbn-block-gallery', alignClass, galleryCols]" :style="currentStyle" bbn-if="show">
            <!-- GIVE HREF TO VIEW FULL IMAGE -->
            <bbn-cms-block-gallery-item bbn-for="(image, idx) in source.content" :source="image" :key="idx" :index="idx"></bbn-cms-block-gallery-item>
          </div>
          <div class="bbn-grid-fields bbn-padding">
            <label>Columns number</label>
            <div>
              <bbn-dropdown bbn-model="source.columns"
                            :source="tinyNumbers"
              ></bbn-dropdown>
            </div>
            <label bbn-text="_('Upload your images')"></label>
            <bbn-upload :save-url="'upload/save/' + ref"
                        remove-url="test/remove"
                        :data="{gallery: true}"
                        :paste="true"
                        :multiple="true"
                        bbn-model="source.content"
                        @success="imageSuccess"
            ></bbn-upload>
  
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
            <iframe
                    :style="currentStyle"
  
                    :autoplay="false"
  
                    :src="source.src"
              ></iframe>
          </div>`,
        edit: `
        <div class="component-container" id="video-container">
          <div class="bbn-grid-fields bbn-padding">
            <label bbn-text="_('Video source')"></label>
            <bbn-input bbn-model="source.content"></bbn-input>
            <label>Muted</label>
            <div>
              <bbn-button :notext="true"
                          :title="_('Mute the video')"
                          @click="muted = !muted"
                          :icon="muted ? 'nf nf-oct-mute' : 'nf nf-oct-unmute'"/>
            </div>
            <label>Autoplay</label>
            <div>
              <bbn-button :notext="true"
                          :title="_('Autoplay')"
                          @click="autoplay = !autoplay"
                          :icon="autoplay ? 'nf nf-fa-pause' : 'nf nf-fa-play'"/>
            </div>
            <label>Video alignment</label>
            <bbn-block-align-buttons></bbn-block-align-buttons>
            <label>Video width</label>
            <div>
              <bbn-cursor bbn-model="source.style['width']"
                          :min="100"
                          :max="1000"
                          :step="10"
                          class="bbn-w-70"/>
            </div>
            <label>Video height</label>
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
                      :source="source.content"/>
          </div>
        </div>
        `
      },
      line: {
        view: `<div class="component-container"><hr :style="style"></div>`,
        edit: `<div class="block-line-edit component-container">
                <hr :style="currentStyle">
                <div class="block-line-edit-command bbn-padding">
                  <div class="bbn-grid-fields bbn-vspadding">
                    <label>Line width</label>
                    <div>
                      <bbn-cursor bbn-model="source.style['width']"
                                  :min="0"
                                  :max="100"
                                  unit="%"/>
                    </div>
                    <label>Line height</label>
                    <div>
                      <bbn-cursor bbn-model="source.style['border-width']"
                                  :min="1"
                                  :max="10"
                                  unit="px"/>
                    </div>
                    <label>Line style</label>
                    <div>
                      <bbn-dropdown bbn-model="source.style['border-style']"
                                    :source="borderStyle"/>
                    </div>
  
                    <label>Line color</label>
                    <div>
                      <bbn-colorpicker bbn-model="source.style['border-color']"
                      ></bbn-colorpicker>
                    </div>
                    <label>Line alignment</label>
                    <bbn-block-align-buttons></bbn-block-align-buttons>
                  </div>
                </div>
                </div>`
      },
      space: {
        view: `<div class="component-container" :style="currentStyle">
                <div class="block-space-view"></div>
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
      },
    };
  
    let borderStyle =  [{"text":"hidden","value":"hidden"},{"text":"dotted","value":"dotted"},{"text":"dashed","value":"dashed"},{"text":"solid","value":"solid"},{"text":"double","value":"double"},{"text":"groove","value":"groove"},{"text":"ridge","value":"ridge"}];
    return {
      borderStyle,
      titleTemplates,
      htmlTemplates,
      templates
    };
  },
  props: {
    /**
     * The aduio's URL
     * @prop {Object} [true] source
     */
    source: {
      type: Object,
      required: true
    },
    /**
     * The audio's title
     * @prop {String} [''] title
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
    /**
     * The path for the index showing the images ('ex: image/').
     *
     * @prop {String} [''] path
     */
    path: {
      type: String,
      default: ''
    },
    /**
     * The path for the links (give a path to a controller to manage the links).
     *
     * @prop {String} [''] linkURL
     */
    linkURL: {
      type: String,
      default: ''
    },
    /*edit: {
      type: Boolean,
      default: false
    },*/
  },
  data(){
    return {
      /**
       * @data {Boolean} [false] over
       */
      over: false,
      /**
       * @data {Boolean} [false] edit
       */
      edit: false,
      /**
       * @data {Boolean} [true] isAdmin
       */
      isAdmin: true,
      /**
       * @data {Boolean} [true] editing
       */
      editing: true,
      /**
       * @data {String} ['100%'] width
       */
      width: '100%',
      /**
       * @data {String} ['100%'] height
       */
      height: '100%',
      //ready is important for the component template to be defined
      /**
       * Ready is important for the component template to be defined.
       *
       * @data {Boolean} [true] ready
       */
      ready: true,
      initialSource: {}
    }
  },
  computed: {
    /**
     * changed
     * @returns {boolean}
     */
    changed(){
      return !bbn.fn.isSame(this.initialSource, this.source)
    },
    /**
     * type
     * @returns {"all"|"sharedworker"|"window"|"worker"|string}
     */
    type(){
      return this.source.type || 'text'
    },
    /**
     * parent
     * @returns {*|null}
     */
    parent(){
      return this.ready ? this.closest('bbn-container').getComponent() : null;
    }
  },
  methods: {
    /**
     * @method onMyMouseEnter
     */
    onMyMouseEnter(){
      alert('enter')
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
     * @param st
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
      bbn.fn.log("setEvenbt")
      document.addEventListener('mousedown', this.checkMouseDown);
      document.addEventListener('touchstart', this.checkMouseDown);
      document.addEventListener('keydown', this.checkKeyCode);
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
     * @param e
     */
    checkKeyCode(e){
      bbn.fn.log("checkKeyCode")
      if ( e.keyCode === 27 ){
        this.edit = false;
      }
    },
    /**
     * set edit to false
     * @param {event} e
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
      bbn.fn.log("editBlock")
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
     * @method cancelEdit
     */
    cancelEdit(){
      bbn.fn.log("cancelEdit")
      bbn.fn.iterate(this.initialSource, (v, i)=>{
        this.source[i] = v;
        this.edit = false;
      })
    },
    /**
     * @method editNode
     */
    editMode(){
      bbn.fn.log("editMode")
      let blocks = this.closest('bbn-container').getComponent().findAll('bbn-cms-block');
      bbn.fn.each(blocks, (v, i)=>{
        v.edit = false;
        v.over = false;
      })
      this.edit = true;
    },
    /**
     * returns the object of the component basing on the given type
     *
     * @method component
     * @param {string} type
     */
    component(type){
      return {
        props: {
          source: {},
        },
        template: this.edit ? bbnCmsBlock.templates[type]['edit'] : bbnCmsBlock.templates[type]['view'],
        data(){
          let tmp = Object.keys(bbnCmsBlock.titleTemplates).map((a)=>{return a = {text:a, value:a}});
          return {
            //cp video
            muted: true,
            autoplay: false,
            align: '',
            tags: tmp,
            image: [],
            tinyNumbers: [{text: '1', value: 1}, {text: '2', value: 2},{text: '3', value: 3},{text: '4', value: 4}],
            borderStyle: bbnCmsBlock.borderStyle,
            ref: (new Date()).getTime(),
            show: true,
            currentCarouselIdx: 0
          }
        },
        computed: {
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
            return this.source.src.indexOf('youtube') > -1
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
          currentStyle(){
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
                  st += 'border-width:' + this.source.style['border-width'] + ( bbn.fn.isNumber(this.source.content['border-width']) ? 'px;' : ';');
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
              template: (type === 'title') ? bbnCmsBlock.titleTemplates[tag] : bbnCmsBlock.htmlTemplates[tag],
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
                  //this.source.content.push(c.image);//
                  this.makeSquareImg();
                }, 200);
              }
              else{
                this.source.content = c.image.name;
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
            //:src="'image/' + source.content"
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
                <time bbn-if="source.time"
                      bbn-text="source.time"
                      :class="$parent.alignClass"/>
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
                  //bbn.fn.log("SELECT IMG", this.closest('bbn-container'), this.closest('bbn-container').getComponent());
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
        beforeMount(){
          if ( bbn.fn.isEmpty(this.source.style) ){
            this.source.style = {}
          }
          if ( this.$parent.edit ){
            if ( (this.source.type === 'image') && this.source.content && this.source.content.length ){
              let extension = bbn.fn.substr(this.source.content, this.source.content.lastIndexOf('.'), this.source.content.length)
              //take the correct size
              this.image.push({
                "name": this.source.content,
                "size":574906,
                "extension": extension
              });
            }
            else if ( (this.source.type === 'gallery') && this.source.content && this.source.content.length ){
              /*this.image = bbn.fn.map(this.source.content, a => {
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

      }
    },
  },
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
    changed(){
      bbn.fn.log("changed")
    },
    type(){
      bbn.fn.log("type")
    },
    edit(val){
      /*
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
      */
    }
  },

};

import cpHtml from './cms-block.html';
import cpStyle from './cms-block.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/cms-block.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-cms-block',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
