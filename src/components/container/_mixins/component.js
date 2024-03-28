export default {
  props: {
    /**
     * Defines the component to use.
     * @prop component
     */
    component: {
      type: [String, Object, Function]
    },
  },
  data() {
    return {
      /**
       * A random unique component name.
       * @data {String} [this.randomName()] componentName
       */
      componentName: this.randomName(),
      /**
       * True if the container is a componenent.
       * @data [null] isComponent
       */
      isComponent: null,
      componentDefinition: false,
      componentTemplate: false,
      componentCSS: false,
    }
  },
  computed: {
    anonComponent(){
      return this.$refs.component;
    }
  },
  methods: {
    componentCreated() {
      if ( this.isComponent ){
        bbnContainerCp.componentsList.push(this.componentName);
      }
      else if ( this.isComponent === null ){
        // The default onMount function is to do nothing.
        this.onMount = () => {
          return false;
        };
      }
    },
  }
  
}
