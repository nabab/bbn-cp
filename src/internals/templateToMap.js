const createMap = (map, items) => {
  bbn.fn.each(items, a => {
    map[a.id] = a;
    if (a.items) {
      createMap(map, a.items);
    }
  });
};
