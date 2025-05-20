const componentInside = {
  props: {
    /**
     * The component that will be rendered inside the main component.
     * @prop {String|Object|HTMLElement} component
     * @memberof componentInside
     */
    component: {
      type: [String, Object, HTMLElement]
    },
    /**
     * The component's props.
     * @prop {Object} componentOptions
     * @memberof componentInside
     */
    componentOptions: {
      type: Object
    },
    /**
     * A set of functions to add on the component's events
     * @prop {Object} componentEvents
     * @memberof componentInside
     */
    componentEvents: {
      type: Object
    }
  },
  computed: {
    componentHasEvents() {
      return this.component && this.componentEvents ? !!bbn.fn.numProperties(this.componentEvents) : false;
    }
  },
  methods: {
    componentRegister(e) {
      const cp = e.target;
      if (this.componentHasEvents && bbn.cp.isComponent(cp)) {
        bbn.fn.iterate(this.componentEvents, (ev, name) => cp.$on(name, ev));
      }
    },
    componentUnregister(e) {
      const cp = e.target;
      if (this.componentHasEvents && bbn.cp.isComponent(cp)) {
        bbn.fn.iterate(this.componentEvents, (ev, name) => cp.$off(name, ev));
      }
    },

  }
};

export default componentInside;
