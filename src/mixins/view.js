const view = {
  props: {
    /**
     * The source of the component.
     * @prop {Object|Function} source
     * @memberof viewComponent
     */
    source: {
      type: [Array, Object, String, Function],
    },
    /**
     * The label of the component.
     * @prop {String|Number} ['Untitled'] label
     * @memberof viewComponent
     */
    label: {
      type: [String, Number],
      default(){
        return bbn._("Untitled");
      }
    },
    /**
     * The options object of the component.
     * @prop {Object} options
     * @memberof viewComponent
     */
    options: {
      type: Object,
      default(){
        return {}
      }
    },
    /**
     * Defines if the component has to be cached.
     * @prop {Boolean} [false] cached
     * @memberof viewComponent
     */
    cached: {
      type: Boolean,
      default: false
    },
    /**
     * Defines if the component has to be scrollable.
     * @prop {Boolean} [true] scrollable
     * @memberof viewComponent
     */
    scrollable: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the component to use.
     * @prop component
     * @memberof viewComponent
     */
    component: {
      type: [String, Object, Function]
    },
    /**
     * Defines the icon.
     * @prop {String|Boolean} icon
     * @memberof viewComponent
     */
    icon: {
      type: [String, Boolean],
    },
    /**
     * Defines if the component can have a text.
     * @prop {Boolean} [false] notext
     * @memberof viewComponent
     */
    notext: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the component's content.
     * @prop {String} [''] content
     * @memberof viewComponent
     */
    content: {
      type: String,
      default: ""
    },
    /**
     * Defines the menu.
     * @prop {Array|Function} menu
     * @memberof viewComponent
     */
    menu: {
      type: [Array, Function, Boolean]
    },
    /**
     * Defines if the component is loaded.
     * @prop {Boolean} loaded
     * @memberof viewComponent
     */
    loaded: {
      type: Boolean,
      default: false
    },
    /**
     * Tells if the component is currently loading.
     * @prop {Boolean} loading
     * @memberof viewComponent
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the component's fcolor.
     * @prop {String} fcolor
     * @memberof viewComponent
     */
    fcolor: {
      type: String
    },
    /**
     * Defines the component's bcolor.
     * @prop {String} bcolor
     * @memberof viewComponent
     */
    bcolor: {
      type: String
    },
    /**
     * @prop {Boolean} [false] load
     * @memberof viewComponent
     */
    load: {
      type: Boolean,
      default: false
    },
    /**
     * Defines if the component has to be selected.
     * @prop {Boolean|Number} [false] selected
     * @memberof viewComponent
     */
    selected: {
      type: [Boolean, Number],
      default: false
    },
    /**
     * Defines the css string for the component.
     * @prop {String} [''] css
     * @memberof viewComponent
     */
    css: {
      type: String,
      default: ""
    },
    /**
     * @prop {String|HTMLElement} advert
     * @memberof viewComponent
     */
    advert: {
      type: [String, HTMLElement]
    },
    /**
     * @prop {String} help
     * @memberof viewComponent
     */
    help: {
      type: String
    },
    /**
     * @prop {Array} imessages
     * @memberof viewComponent
     */
    imessages: {
      type: [Array, Function],
      default() {
        return []
      }
    },
    /**
     * @prop script
     * @memberof viewComponent
     */
    script: {},
    /**
     * Defines
     if the component has to be pinned.
      * @prop {Boolean|Number} [false] pinned
      * @memberof viewComponent
      */
    pinned: {
      type: [Boolean, Number],
      default: false
    },
    /**
     * Defines the url.
     * @prop {String|Number} url
     * @memberof viewComponent
     */
    url: {
      type: [String, Number]
    },
    /**
     * @prop current
     * @prop {String|Number} current
     * @memberof viewComponent
     */
    current: {
      type: [String, Number]
    },
    /**
     * @prop {Boolean} [true] real
     * @memberof viewComponent
     */
    real: {
      type: Boolean,
      default: true
    },
    /**
     * The object of configuration for the component
     * @prop {Object} cfg
     * @memberof viewComponent
     */
    cfg: {
      type: Object
    },
    /**
     * @prop {Object} events
     * @memberof viewComponent
     */
    events: {
      type: Object,
      default(){
        return {}
      }
    },
    /**
     * Defines if the component is disabled.
     * @prop {Boolean} [false] disabled
     */
    disabled: {
      type: [Boolean, Function],
      default: false
    },
    /**
     * Defines if the component is hidden.
     * @prop {Boolean} [false] invisible
     */
    invisible: {
      type: [Boolean, Function],
      default: false
    }
  }
};

export default view;
