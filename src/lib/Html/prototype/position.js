import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$position = function(ele) {
  const e = ele || this;
  const coor = e.getBoundingClientRect();
  const left = Math.round(coor.left);
  const top = Math.round(coor.top);
  return {
    left,
    top,
    right: Math.round(coor.right),
    bottom: Math.round(coor.bottom),
    width: Math.round(coor.width),
    height: Math.round(coor.height),
    x: left,
    y: top
  };
};
