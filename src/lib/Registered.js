import tryMount from "./Html/private/tryMount.js";

export default class bbnRegistered {
  #components;

  constructor(cp) {
    Object.defineProperty(this, 'cp', {
      value: cp,
      writable: false,
      configurable: false
    });
    this.#components = [];
  }

  add(ele) {
    if (!this.#components.includes(ele)) {
      this.#components.push(ele);
      tryMount(this.cp);
    }
  }

  remove(ele) {
    let idx = this.#components.indexOf(ele);
    if (idx > -1) {
      this.#components.splice(idx, 1);
      tryMount(this.cp);
    }
  }

  removeAll() {
    this.#components.splice(0, this.#components.length);
  }

  has(ele) {
    return this.#components.includes(ele);
  }

  clean() {
    let i = 0;
    while (this.#components[i]) {
      if (!this.#components[i].$isDestroyed) {
        this.#components.splice(i, 1);
      }
      else {
        i++;
      }
    }
  }

  find(fn) {
    return bbn.fn.getRow(this.#components, fn);
  }

  get isOk() {
    return !this.#components.filter(a => !a.$isDestroyed && (!a.bbn || !a.$isMounted)).length;
  }

  get queue() {
    return this.#components.filter(a => !a.bbn || !a.$isMounted)
  }

  get length() {
    return this.#components.length;
  }

}
