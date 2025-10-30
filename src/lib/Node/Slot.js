import bbnNode from "./Node.js";

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

  get realName() {
    return this.#name
  }

  nodeInit(after) {
    const old = this.element;
    if (this.isCreating) {
      bbn.fn.log(["ALREADY CREATING", this.element, this]);
      throw new Error("Already creating");
    }

    this.isCreating = true;

    const name = this.attr.name ? this.attr.name.attrGetValue() : 'default';
    this.#name = name;
    let ele;
    //bbn.fn.log(["IN A SLOT", name, old, this.component.$slots[name], old?.parentNode]);
    if (this.component.$slots[name]) {
      if (this.bind) {
        for (let i = 0; i < this.component.$slots[name].length; i++) {
          const item = this.component.$slots[name][i].bbnNode;
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
              const done = this.nodeSwitch(false);
              if (done) {
                this.isCreating = false;
                return done;
              }
            }

            ele = this.element || this.nodeBuild(null, true);
            if (ele?.bbn && !ele.$isInit) {
              if (ele.isConnected) {
                ele.bbn.$connected();
              }
              else {
                ele.bbnConnected = true;
              }
            }
            else if (!ele.bbn && !ele.bbnConnected) {
              ele.bbnConnected = true;
            }

            break;
          }
        }
      }
      else {
        ele = this.element || this.nodeBuild(null, true);

        this.component.$slotElements[name] = ele;
        //bbn.fn.log(["SLOT PARENT", ele, this.parentElement, ele.parentNode, this.component.$options.name, this.component.$slots[name]]);
        const parent = this.parentElement;
        if (parent.bbn && (parent.bbnCid !== this.component.$cid) && (parent.bbnSlots?.default)) {
          debugger;
          for (let i = 0; i < this.component.$slots[name].length; i++) {
            const item = this.component.$slots[name][i];
            parent.bbnSlots.default.push(item);
          }
        }
        else {
          const slots = this.component.$retrieveSlotItems(name);
          for (let i = 0; i < slots.length; i++) {
            const item = slots[i];
            let hasClass = false;
            if (item.isConnected && item.classList) {
              hasClass = true;
              item.classList.add('bbn-is-moving');
            }

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

            //item.bbnTargetSlot = this;
            if (hasClass) {
              item.classList.remove('bbn-is-moving');
            }
          }
        }
      }
    }

    this.isCreating = false;

    if (!ele) {
      ele = this.nodeSwitch(true);
      if (!ele) {
        ele = this.nodeBuild(after, true);
      }
      else if (this.numBuild) {
        let num = this.nodeClean();
        //bbn.fn.log(["DELETE NODES2", num, this.id]);
      }
    }

    return ele;
  }
}

