export default function setEvents (cp, ele) {
  bbn.fn.iterate(cp.$currentMap[ele.bbnId].events, (ev, n) => {
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
        if (!e.key || !JSON.stringify(ev.modifiers).includes(e.key.toLowerCase())) {
          return;
        }
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

      let $event = e;

      if (ev.prevent) {
        $event.preventDefault();
      }

      if (ev.stop) {
        $event.stopImmediatePropagation();
      }

      if (ev.exp) {
        ev.fn.bind(cp.$origin)(...(ev.args.map(a => a === '$event' ? e : (bbn.fn.isFunction(cp[a]) ? cp[a].bind(cp.$origin) : cp[a]))));
      }
    }, cfg);
  });
}
