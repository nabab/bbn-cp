/**
 * @file bbn-list component
 *
 * @description A fully customizable selectable list.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 */
export default {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.list
     * @mixin bbn.cp.mixins.keynav
     * @mixin bbn.cp.mixins.input
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.list, 
      bbn.cp.mixins.keynav, 
      bbn.cp.mixins.input
    ],
    statics() {
      return {isClicked: false};
    },
    props: {
      //@todo not used.
      unique: {
        type: Boolean,
        default: true
      },
      /**
       * The mode of the component.
       * @prop {String} ['free'] mode
       */
      mode: {
        type: String,
        default: "free"
      },
      /**
       * @prop {Boolean} [false] suggest
       */
      suggest: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        
      };
    },
    computed: {
    },
    methods: {
    },
    /**
     * @event mounted
     */
    mounted(){
    }
  };
