export default class bbnOptions {
  name;
  _componentTag;
  components;
  cp;

  // Define a getter for propsData.
  get propsData() {
    if (this.cp.$el) {
      return this.cp.$el.bbnSchema?.props || {};
    }

    return {};
  }

  constructor(cp, tag) {
    this.cp = cp;
    this.name = tag;
    this._componentTag = tag;
    this.components = {};
  }
}
