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
  bbn.fn.checkType(cp, bbnCp, "The component must be a bbn Component object");
  if (cp.$isMounted) {
    return;
  }

  if (!cp.$el.parentNode) {
    return;
  }

  if (!cp.$components.filter(a => !(a instanceof bbnCp) || !a.$isMounted).length) {
    //bbn.fn.log("SUCCEED MOUNT ON " + fullId(cp));
    // Sending mounted event
    const mounted = new Event('hook:mounted');
    onHook(cp, 'mounted');
    cp.$el.dispatchEvent(mounted);
    Object.defineProperty(cp, '$isMounted', {
      value: true,
      writable: false, 
      configurable: false
    });
    if (cp.$origin) {
      tryMount(cp.$origin, cp);
    }
  }
  else {
    if (timeouts[cp.$cid]) {
      clearTimeout(timeouts[cp.$cid]);
    }
    if (cp.$el.parentNode) {
      timeouts[cp.$cid] = setTimeout(() => {
        if (cp.$isRoot) {
          let i = 0;
          while (cp.$components[i]) {
            if ((cp.$components[i] instanceof HTMLElement) && !cp.$components[i].parentNode) {
              cp.$components.splice(i, 1);
            }
            else {
              i++;
            }
          }
        }
        if (!cp.$isMounted) {
          tryMount(cp);
        }

        delete timeouts[cp.$cid];
      }, 5*bbn.cp.tickDelay);
    }
  }
}
