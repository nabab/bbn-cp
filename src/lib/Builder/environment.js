import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.environment = function() {
  // Each element with namespace is set in $_data and is added to argNames and argValues
  for (let n in this.cp.$namespaces) {
    this.argNames.push(n);
    this.argValues.push(this.cp[n]);
  }
};
