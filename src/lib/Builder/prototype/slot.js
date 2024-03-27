import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.slot = function(node, hashName) {
  if (node.tag === 'slot') {
    let slot = "'default'";
    if (node.attr?.name) {
      slot = node.attr.name.exp ? `node.attr.name.exp` : `node.attr.name.value`;
    }
    $_items[node.id] = $_par.at(-1);
    if ($_this.$el.bbnSlots?.[slot]?.length) {
      // Iterating the elements going in the slot
      bbn.fn.each($_this.$el.bbnSlots[slot], a => {
        //    bbn.fn.log("This is a slot element", a)
        let search = { bbnId: a.bbnId };
        if (a.bbnHash) {
          search.bbnHash = a.bbnHash;
        }
        // Case where the slot is inside another component
        if (($_par.at(-1) !== $_this.$el) && bbn.cp.isComponent($_par.at(-1))) {
          let idx = bbn.fn.search($_par.at(-1).bbnSlots[slot], search);
          $_par.at(-1).bbnSlots.default.splice(idx > -1 ? idx : $_par.at(-1).bbnSlots.default.length, idx > -1 ? 1 : 0, a);
          //      if ($_par.at(-1).bbn) {
          //        $_par.at(-1).bbn.$tick();
          //      }
        }
        // Else if only the element is not mounted (otherwise it's already there)
        else if (!a.parentNode) {
          if ($_par.at(-1) === $_this.$el) {
            $_final.push({ ele: a, position: $_num['-'] - 1 });
          }
          else {
            let idx = bbn.fn.search($_par.at(-1).childNodes, search);
            if (idx > -1) {
              $_par.at(-1).replaceChild(a, $_par.at(-1).childNodes[idx]);
            }
            else {
              $_par.at(-1).appendChild(a);
            }
          }
        }
        if ($_par.at(-1) === $_this.$el) {
          $_num['-']++;
        }
        if (!$_num[$_par.at(-1).bbnId]) {
          $_num[$_par.at(-1).bbnId] = 0;
        }
        $_num[$_par.at(-1).bbnId]++;
      });
    }
    treatItems(cp, node, hashName);
  }
};
