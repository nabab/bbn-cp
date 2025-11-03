import bbnFacade from "../Facade.js";
import bbnAttr from "./Attr.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnVarsAttr extends bbnAttr
{
  #dependencies;
  #datas;
  get dataObjects() {
    return this.#datas;
  }

  addDependency(name, attr) {
    const idx = this.names.indexOf(name);
    if (idx === -1) {
      throw new Error(bbn._("No name %s", name))
    }

    if (!this.#dependencies) {
      this.#dependencies = bbn.fn.createObject();
    }

    if (this.#datas[idx] instanceof bbnData) {
      if (this.#datas[idx].deps?.__bbnRoot && !this.#datas[idx].deps.__bbnRoot.includes(attr)) {
        this.#datas[idx].deps.__bbnRoot.push(attr)
      }
    }
    else {
      if (!this.#dependencies[name]) {
        this.#dependencies[name] = [];
      }

      if (!this.#dependencies[name].includes(attr)) {
        this.#dependencies[name].push(attr)
      }
    }
  }

  varsUpdate(val) {
    //bbn.fn.log(['vars update', val, this.node]);
    if (bbn.fn.isArray(val)) {
      const o = bbn.fn.createObject();
      const datas = [];
      for (let i = 0; i < this.names.length; i++) {
        o[this.names[i]] = val[i];
        datas.push(bbnData.getObject(o[this.names[i]]) || o[this.names[i]]);
      }

      if (!this.#datas) {
        this.#datas = datas;
      }

      if (!this.node.data) {
        Object.defineProperty(this.node, 'data', {
          value: new bbnFacade(this.node, o),
          writable: false
        });
      }
      else {
        let i = 0;
        for (const n in o) {
          if (!this.node.data.__bbn_keys.includes(n)) {
            this.node.data.__bbn_keys.push(n);
            this.node.data.__bbn_data[n] = o[n];
          }
          else if (this.node.data.__bbn_data[n] !== o[n]) {
            this.node.data.__bbn_data[n] = o[n];
          }

          if (this.#datas[i] !== datas[i]) {
            this.#datas.splice(i, 1, datas[i]);
          }

          i++;
        }
      }

      for (let n in this.#dependencies) {
        for (let i = this.#dependencies[n].length - 1; i >= 0; i--) {
          if (this.#dependencies[n][i].node.off) {
            this.#dependencies[n].splice(i, 1);
          }
          else {
            this.#dependencies[n][i].attrUpdate();
          }
        }
      }
    }
  }
};
