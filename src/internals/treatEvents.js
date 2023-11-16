import bbn from "@bbn/bbn";
import treatArgument from "./treatArgument.js";

export default function treatEvents (cp, ele) {
  let id = ele.bbnId;
  if (ele === cp.$el) {
    id = '0';
  }

  bbn.fn.iterate(cp.$currentMap[id].events, (ev, n) => {
    let cfg = {};
    if (ev.once) {
      cfg.once = true;
    }
    if (ev.passive) {
      cfg.passive = true;
    }
    if (ev.capture) {
      cfg.capture = true;
    }

    ele.addEventListener(n, e => {
      //  bbn.fn.log("EXECUTING EVENT n ev.exp ON node.tag", _bbnEventObject.detail);
      if (ev.modifiers.length) {
        if (n.indexOf('key') === 0) {
          if (!e.key || !ev.modifiers.includes(e.key.toLowerCase())) {
            return;
          }
        }
        else if (n.indexOf('mouse') === 0) {
          if (ev.modifiers.includes('right')) {
            if (e.button !== 2) {
              return;
            }
          }
          else if (ev.modifiers.includes('left')) {
            if (e.button !== 0) {
              return;
            }
          }
        }
      }

      if (ev.prevent) {
        e.preventDefault();
      }

      if (ev.stop) {
        e.stopImmediatePropagation();
      }

      if (ev.exp) {
        const args = [];
        bbn.fn.each(ev.args, a => {
          if (a === '$event') {
            args.push(e);
          }
          else {
            args.push(treatArgument(a, cp, ele.bbnSchema.loopHash));
          }
        });
        ev.fn.bind(cp)(...args);
      }
    }, cfg);
  });
}
