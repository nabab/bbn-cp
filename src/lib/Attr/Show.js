import bbn from "@bbn/bbn";
import bbnAttr from "./Attr.js";
import bbnStyleAttr from "./Style.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnShowAttr extends bbnAttr
{
  async attrSet() {
    this.node.props[this.name] = this.attrGetValue();
  }

  async attrUpdate(init) {
    if (this.comment) {
      return;
    }

    if (!init) {
      this.attrSet();
    }

    if (this.node.isComponent
      && this.node.element?.bbn?.$internal
      && this.node.element.bbn.$internal.attributes.filter(a => a instanceof bbnStyleAttr).length
    ) {
      this.node.element.bbn.$internal.attributes.filter(a => a instanceof bbnStyleAttr)[0].attrUpdate(true);
    }
    else if (this.node.attributes.filter(a => a instanceof bbnStyleAttr).length) {
      this.node.attributes.filter(a => a instanceof bbnStyleAttr)[0].attrUpdate(true);
    }
    else if (this.node.element?.style) {
      const isVisible = this.node.element.style?.display !== 'none';
      if (isVisible !== this.value) {
        this.node.element.style.display = this.value ? '' : 'none';
      }
    }
  }
}