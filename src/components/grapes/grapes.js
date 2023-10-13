 /**
  * @file bbn-grapes component
  *
  * @description
  *
  * @copyright BBN Solutions
  *
  * @author BBN Solutions
  *
  * @created 10/02/2017
  */
export default {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: [bbn.cp.mixins.basic],
    props: {
      /**
       * @prop {(String|Function)} css
       */
      css: {
        type: [String, Function]
      }
    },
    data(){
      return {
        /**
         * @data [null] widget
         */
        widget: null
      }
    },
    /**
     * @event mounted
     */
    mounted(){
      this.widget = grapesjs.init({
        container: this.$el,
        fromElement: true,
        plugins: ['gjs-blocks-basic'],
        style: this.css || ''
      })
    }
  };
