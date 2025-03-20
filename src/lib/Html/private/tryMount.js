import onHook from "./onHook.js";
/**
 * Register the given child of the component into the $children array
 */
const fullId = function(cp) {
  let st = '';
  while (cp) {
    st = st ? cp.$id + " / " + st : cp.$id;
    cp = cp.$origin;
  }

  return st;
}

const timeouts = {};
export default function tryMount(cp, child) {
  bbn.fn.checkType(cp, HTMLElement, "The component must be a bbn Component object");
  if (cp.$isMounted || !cp.$isInit || !cp.$isWatched) {
    return;
  }

  if (!cp.$el.parentNode) {
    return;
  }

  if (cp.$components.isOk) {
    //bbn.fn.log("SUCCEED MOUNT ON " + fullId(cp));
    // Sending mounted event
    onHook(cp, 'mounted');
    if (cp.bbnSchema.events?.['hook:mounted'] || cp.$events?.['hook:mounted']) {
      const mounted = new Event('hook:mounted');
      cp.dispatchEvent(mounted);
    }

    Object.defineProperty(cp, '$isMounted', {
      value: true,
      writable: false, 
      configurable: false
    });
    cp.classList.add('bbn-component-mounted');

    if (cp.$origin) {
      tryMount(cp.$origin, cp);
    }
  }
  else {
    //bbn.fn.log("FAILED MOUNT ON " + fullId(cp), cp.$components.queue);
    if (timeouts[cp.$cid]) {
      clearTimeout(timeouts[cp.$cid].to);
    }

    if (cp.$el.parentNode) {
      if (!timeouts[cp.$cid]) {
        timeouts[cp.$cid] = {to: 0, num: 0};
      }

      if (timeouts[cp.$cid].num > (cp.$components.length + 10)) {
        bbn.fn.log("FAILED MOUNT ON " + fullId(cp), cp.$components.queue);
      }

      cp.$nextTick(() => {
        cp.$components.clean();
        if (!cp.$isMounted) {
          tryMount(cp);
        }

        delete timeouts[cp.$cid];
      });
      timeouts[cp.$cid].num++;
    }
  }
}
