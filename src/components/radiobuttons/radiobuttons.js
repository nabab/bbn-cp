/**
 * @file bbn-radio component
 * @description bbn-radio is a component that can be used to select a particular choice from a range of options.
 * @copyright BBN Solutions
 * @author BBN Solutions
 * @created 13/02/2017
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     * @mixin bbn.cp.mixins.localStorage
     * @mixin bbn.cp.mixins.events
     *
     */
    mixins: 
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.input,
      bbn.cp.mixins.localStorage,
      bbn.cp.mixins.events
    ],
    props: {
      /**
       * Set to true to arrange the radio buttons vertically.
       * @prop {Boolean} [false] vertical
       */
			vertical: {
				type: Boolean,
				default: false
      },
      /**
       * The name of the property in the item object used as a text.
       * @prop {String} ['text'] sourceText
       */
      sourceText: {
        type: String,
        default: 'text'
      },
      /**
       * The name of the property in the item object used as a text.
       * @prop {String} ['text'] sourceText
       */
      sourceIcon: {
        type: String,
        default: 'icon'
      },
      /**
       * The name of the property in the item object used as a value
       * @prop {String} ['text'] sourceValue
       */
      sourceValue: {
        type: String,
        default: 'value'
      },
      /**
       * The source of the component.
       * @prop {Array} [[{text:'Yes', value:1},{text:'No', value:0}]] source
       */
      source: {
        type: Array
      },
      /**
       * @prop {Boolean} [false] notext
       */
      notext: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentData() {
        if (this.source.length && !bbn.fn.isObject(this.source[0])) {
          return bbn.fn.map(this.source, a => {
            return {
              [this.sourceText]: a,
              [this.sourceValue]: a
            };
          });
        }

        return this.source;
      }
    },
    beforeMount() {
      if (this.hasStorage) {
        let v = this.getStorage();
        if (v && (v !== this.value)) {
          this.changed(v);
        }
      }
    },
    watch: {
      /**
       * @watch value
       * @param {Mixed} v
       */
      value(v) {
        if (this.storage) {
          if (v) {
            this.setStorage(v);
          }
          else {
            this.unsetStorage()
          }
        }
      },
    }
  };

import cpHtml from './radiobuttons.html';
import cpStyle from './radiobuttons.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/radiobuttons.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-radiobuttons',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
