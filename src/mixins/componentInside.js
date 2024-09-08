import bbnCp from '../lib/Cp/Cp.js';

const componentInside = {
  props: {
    /**
     * The component that will be rendered inside the main component.
     * @prop {String|Object|bbnCp} component
     * @memberof componentInsideComponent
     */
    component: {
      type: [String, Object, bbnCp]
    },
    /**
     * The component's props.
     * @prop {Object} componentOptions
     * @memberof componentInsideComponent
     */
    componentOptions: {
      type: Object
    }
  }
};

export default componentInside;
