/**
 * @file bbn-cms-block component
 * @description bbn-cms-block 
 * @copyright BBN Solutions
 * @author Loredana Bruno
 * @created 09/11/2020.
 */
export default {
    /**
     * @mixin bbn.cp.mixins.basic
     * @mixin bbn.cp.mixins.input
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.input
    ],
    props: {
      /**
       * @prop {String} value
       */
      value: {
        type: String
      }
    },
    data(){
      return {
      }
    },
    computed: {
    },
    methods: {
      onInlineInput(ev) {
        this.emitInput(ev.target.innerText);
      },
      updateEditor(){
        this.getRef('divEditor').innerText = this.value;
      }
    },
    mounted(){
      this.updateEditor();
    },
    watch: {
      currentValue(v) {
        this.emitInput(v);
        this.updateEditor();
      },
      value(v){
        if (v !== this.currentValue) {
          this.currentValue = v;
        }
      },
    }, 
 
  };
