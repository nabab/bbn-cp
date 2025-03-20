import bbnAttr from "./Attr.js";
import bbnStyleAttr from "./Style.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnShowAttr extends bbnAttr
{
  attrSet() {
    this.node.props[this.name] = this.attrGetValue();
  }

  attrUpdate(init) {
    const node = this.node instanceof bbnInternalNode && !this.node.component.$isRoot ? this.node.element.bbnSchema : this.node;
    if (node.comment) {
      return;
    }
    
    if (!init) {
      this.attrSet();
    }

    if (init || (this.exp && (this.isLate || this.isChanged))) {
      node.styles[this.uid] = this.value ? {} : {display: 'none'};
      node.nodeSetStyle();
    }
  }
}