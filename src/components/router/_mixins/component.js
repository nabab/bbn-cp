export default {
  props: {
    /**
     * If this is set, along with componentSource and componentUrl a single container with this component will be created.
     * @prop {(String|Object)} component
     */
    component: {
      type: [String, Object]
    },
    /**
     * The source for the component.
     * @prop {Object} componentSource
     */
    componentSource: {
      type: Object
    },
    /**
     * The property to get from the componentSource to use for setting the URL.
     * @prop {String} componentUrl
     */
    componentUrl: {
      type: String
    },
  },
  methods: {}
}