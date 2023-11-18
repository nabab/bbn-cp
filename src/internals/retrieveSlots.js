export default function retrieveSlots(tpl, res) {
  if (res === undefined) {
    res = bbn.fn.createObject();
  }

  bbn.fn.each(tpl, node => {
    if (node.tag && (node.tag === 'slot')) {
      let idx = node.attr && node.attr.name ? node.attr.name.value : 'default'
      if (!idx) {
        throw new Error(bbn._("Invalid slot name"));
      }

      /*if (res[idx]) {
        throw new Error("A same slot can't appear twice in the template");
      }*/

      res[idx] = [];
      res[idx].id = node.id;
    }
    if (node.items) {
      retrieveSlots(node.items, res);
    }
  });

  return res;
}
