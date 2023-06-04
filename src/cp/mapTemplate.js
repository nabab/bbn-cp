(() => {
  bbn.fn.autoExtend('cp', {
    mapTemplate(tpl, map) {
      bbn.fn.checkType(tpl, 'array', bbn._("Template must be an array"));
      if (!map) {
        map = [];
      }

      bbn.fn.each(tpl, el => {
        el.index = map.length;
        map.push(el);
        if (el.items) {
          bbn.cp.mapTemplate(el.items, map);
        }
        if (el.slots) {
          bbn.cp.mapTemplate(el.slots, map);
        }
      });

      return map;
    }
  })
})();
