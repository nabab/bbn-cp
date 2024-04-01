/**
 * @method setDefaults
 * @memberof bbn.cp
 * @param {Object} defaults 
 * @param {String} cpName
 */
export default function setDefaults(defaults, cpName){
  if ( typeof defaults !== 'object' ){
    throw Error("The default object sent is not an object " + cpName);
  }
  bbn.cp.defaults[cpName] = bbn.fn.extend(bbn.cp.defaults[cpName] || {}, defaults);
}