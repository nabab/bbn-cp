import updateWatcher from "../Cp/private/updateWatcher.js";
import bbnNode from "./Node.js";

/**
 * Takes care of the data reactivity for non primitive values.
 */
export default class bbnInternalNode extends bbnNode
{
  async build() {
    if (!this.comment) {
      for (let i = 0; i < this.attributes.length; i++) {
        await this.attributes[i].set();
        await this.attributes[i].update(true);
      }
    }

    await this.conceive();
  }
}