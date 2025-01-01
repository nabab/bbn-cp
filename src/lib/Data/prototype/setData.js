import bbnData from "../../Data.js";

/**
 * Removes a component from the data object
 * @param {bbnCp} component 
 */
bbnData.prototype.setData = function(data) {
  if (data.__bbnData && (data.__bbnData !== this)) {
    throw new Error("The data object is already part of another bbnData object");
  }
  /**
   * @var {Symbol} __bbnData The special property added to the data object to identify it as being part of a bbnData object
   */
  Object.defineProperty(data, '__bbnData', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: this
  });
  /**
   * @var {Object|Array} targetData The original data object
   */
  Object.defineProperty(this, 'targetData', {
    value: data,
    writable: false,
    configurable: true
  });

  /**
   * @var {Proxy} value The proxy takes care of subreactivity
   */
  Object.defineProperty(this, 'value', {
    value: new Proxy(this.targetData, this.constructor.proxy(this.component, this.path, this)),
    writable: false,
    configurable: true
  });
}
