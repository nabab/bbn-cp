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

    if (this.node.element?.bbn?.$internal?.attr?.style) {
      await this.node.element.bbn.$internal.attr.style.attrUpdate(true);
    }
    else if (this.node.attr?.style) {
      await this.node.attr.style.attrUpdate(true);
    }
    else if (this.node.element?.style) {
      const isVisible = this.node.element.style?.display !== 'none';
      if (isVisible !== this.value) {
        this.node.element.style.display = this.value ? '' : 'none';
      }
    }
  }
}