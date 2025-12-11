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

import FilerobotImageEditor from 'filerobot-image-editor';
const { TABS, TOOLS } = FilerobotImageEditor;
const config = {
  onSave: (editedImageObject, designState) =>
    console.log('saved', editedImageObject, designState),
  annotationsCommon: {
    fill: '#ff0000',
  },
  Text: { text: 'Filerobot...' },
  Rotate: { angle: 90, componentType: 'slider' },
  translations: {
    profile: 'Profile',
    coverPhoto: 'Cover photo',
    facebook: 'Facebook',
    socialMedia: 'Social Media',
    fbProfileSize: '180x180px',
    fbCoverPhotoSize: '820x312px',
  },
  Crop: {
    presetsItems: [
      {
        titleKey: 'classicTv',
        descriptionKey: '4:3',
        ratio: 4 / 3,
        // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
      },
      {
        titleKey: 'cinemascope',
        descriptionKey: '21:9',
        ratio: 21 / 9,
        // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
      },
    ],
    presetsFolders: [
      {
        titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
        // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
        groups: [
          {
            titleKey: 'facebook',
            items: [
              {
                titleKey: 'profile',
                width: 180,
                height: 180,
                descriptionKey: 'fbProfileSize',
              },
              {
                titleKey: 'coverPhoto',
                width: 820,
                height: 312,
                descriptionKey: 'fbCoverPhotoSize',
              },
            ],
          },
        ],
      },
    ],
  },
  tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK], // or ['Adjust', 'Annotate', 'Watermark']
  defaultTabId: TABS.ANNOTATE, // or 'Annotate'
  defaultToolId: TOOLS.TEXT, // or 'Text'
};
//Markdown editor use simpleMDe
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic 
   */
  mixins: [bbn.cp.mixins.basic],
  props: {
    /**
     * @prop {String} source²
     */
    source: {
      type: String
    },
    /**
     * @prop {String} name
     */
    name: {
      type: String
    }
  },
  data(){
    return {
      widget: null
    };
  },
  methods: {
  },
  watch: {
  },
  mounted(){
    this.widget = bbn.cp.immunizeValue(new FilerobotImageEditor(
      this.getRef('element'),
      bbn.fn.extend({}, config, {
        source: this.source,
      })
    ));

    this.widget.render({
      onClose: (closingReason) => {
        console.log('Closing reason', closingReason);
        this.widget.terminate();
      },
    });

    this.ready = true;
  },

};

import cpHtml from './image-editor.html';
import cpStyle from './image-editor.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/image-editor.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-image-editor',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
