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
    const node = (this.node.constructor.name === 'bbnInternalNode') && !this.node.component.$isRoot ? this.node.element.bbnNode : this.node;
    if (node.comment) {
      return;
    }
    
    if (!init) {
      await this.attrSet();
    }

    if (init || (this.exp && (this.isLate || this.isChanged))) {
      node.styles[this.uid] = this.value ? {} : {display: 'none'};
      node.nodeSetStyle();
    }
  }
}