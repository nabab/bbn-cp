import bbnCp from '../lib/Cp.js';

const componentInside = {
  props: {
    /**
     * The component that will be rendered inside the main component.
     * @prop {String|Object|bbnCp} component
     * @memberof componentInside
     */
    component: {
      type: [String, Object, bbnCp]
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
  }
};

export default componentInside;
