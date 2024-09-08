import bbnNode from "../Node.js";

bbnNode.prototype.init = async function(after) {
  const old = this.element;
  if (old) {
    //return await this.update();
  }

  await this.setAll();
  const ele = await this.build(after);
  if (!this.loop) {
    await this.conceive();
  }

  if (this.isComponent) {
    if (!ele.bbn) {
      ele.bbnConnected = true;
    }
    else if (!Object.hasOwn(ele.bbn, '$isCreated')){
      ele.bbn.$connected();
    }
  }

  return ele;
};
