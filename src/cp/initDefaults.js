/**
 * Sets default object for a component, accessible through bbn.vue.defaults[__COMPONENT_NAME__].
 * 
 * @method initDefaults
 * @memberof bbn.cp
 * @param Object defaults 
 */
export default function initDefaults(defaults){
  if ( typeof defaults !== 'object' ){
    throw new Error("The default object sent for defaults is not an object");
  }
  bbn.fn.extend(true, bbn.cp.defaults, defaults);
}
