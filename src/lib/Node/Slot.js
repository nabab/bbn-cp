import bbnNode from "../Node.js";
import deleteNodes from "../Cp/private/deleteNodes.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnSlotNode extends bbnNode
{
  #tag;
  #name;

  get realTag() {
    return this.#tag;
  }

  nodeInit() {
    if (this.isCreating) {
      throw new Error("Already creating");
    }
    this.isCreating = true;

    const name = this.attr.name ? this.attr.name.attrGetValue() : 'default';
    this.#name = name;
    let ele;
    //bbn.fn.log(["IN A SLOT", name, ele, this.component.$slots[name], ele.parentNode]);
    if (this.component.$slots[name]) {
      if (this.bind) {
        for (let i = 0; i < this.component.$slots[name].length; i++) {
          const item = this.component.$slots[name][i].bbnSchema;
          if (item.slot?.slotValue && item.pre) {
            let fnStr = `return bbn.cp.normalizeComponent({
              props: ['${item.slot.slotValue}'],
              template: \`${item.pre.content}\`,`;
            if (item.component.$methods) {
              fnStr += 'methods: {';
              for (let m in item.component.$methods) {
                fnStr += `${m}: cp.${m},`;
              }
              fnStr += '},';
            }
            if (item.component.$computed) {
              fnStr += 'computed: {';
              for (let m in item.component.$namespaces) {
                if (item.component.$namespaces[m] === 'computed') {
                  fnStr += `${m}() {return cp.${m};},`;
                }
              }
              fnStr += '},';
            }
            if (item.component.$dataCfg) {
              fnStr += 'data: {';
              for (let m in item.component.$dataCfg) {
                fnStr += `${m}: cp.${m},`;
              }
              fnStr += '},';
            }
            fnStr += '})';

            this.cfg = (new Function('cp', fnStr))(item.component);
            this.#tag = 'bbn-anon';
            this.props[item.slot.slotValue] = this.bind.attrGetValue();
            if (this.comment) {
              const done = this.setComment(false);
              if (done) {
                this.isCreating = false;
                return done;
              }
            }

            ele = this.element || this.nodeBuild();
            if (ele?.bbn && !ele.bbn?.$isCreated) {
              ele.bbn.$connected();
            }
            else if (!ele.bbn && !ele.bbnConnected) {
              ele.bbnConnected = true;
            }

            break;
          }
        }
      }
      else {
        ele = this.setComment(true);
        if (!ele) {
          ele = this.element || this.nodeBuild();
        }
        else if (this.numBuild) {
          bbn.fn.log(["DELETE NODES", this.id, this.hash]);
          deleteNodes(this.component, this.id, this.hash);
        }
        //bbn.fn.log(["SLOT PARENT", ele, this.parentElement, ele.parentNode, this.component.$options.name, this.component.$slots[name]]);
        const parent = this.parentElement;
        if (parent.bbn && (parent.bbnCid !== this.component.$cid) && (parent.bbnSlots?.default)) {
          for (let i = 0; i < this.component.$slots[name].length; i++) {
            const item = this.component.$slots[name][i];
            parent.bbnSlots.default.push(item);
          }
        }
        else {
          for (let i = 0; i < this.component.$slots[name].length; i++) {
            const item = this.component.$slots[name][i];
            if (ele.parentNode) {
              ele.parentNode.insertBefore(item, ele);
            }
            else {
              let el = this.parentElement;
              if (el) {
                el.append(item);
              }
              else {
                throw new Error("Impossible to find the parent element for the slot");
              }
            }
          }
        }
      }
    }

    if (!ele) {
      ele = this.setComment(true);
      if (!ele) {
        ele = this.nodeBuild();
      }
      else if (this.numBuild) {
        bbn.fn.log(["DELETE NODES2", this.id, this.hash]);
        deleteNodes(this.component, this.id, this.hash);
      }
    }

    this.isCreating = false;
    return ele;
  }
}