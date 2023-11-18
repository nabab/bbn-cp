const createMap = (map, items) => {
  bbn.fn.each(items, a => {
    map[a.id] = a;
    if (a.items) {
      createMap(map, a.items);
    }
  });
};

export default function templateToMap(tpl) {
  const map = bbn.fn.createObject();
  createMap(map, tpl);
  return map;
}
