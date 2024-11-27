import onHook from "./onHook.js";
/**
 * Register the given child of the component into the $children array
 */
const fullId = function(cp) {
  let st = cp.$id;
  while ( cp = cp.$origin ){
    st = cp.$id + " / " + st;
  }
  return st;
}

export default function tryMount(cp) {
  bbn.fn.checkType(cp, bbnCp, "The component must be a bbn Component object");
  if (!cp.$isMounted && !cp.$children.filter(a => !(a?.bbn instanceof bbnCp)).length) {
    //bbn.fn.log("SUCCEED MMOUNT ON " + fullId(cp));
    // Sending mounted event
    const mounted = new Event('hook:mounted');
    onHook(cp, 'mounted');
    cp.$el.dispatchEvent(mounted);
    Object.defineProperty(cp, '$isMounted', {
      value: true,
      writable: false, 
      configurable: false
    });
    cp.$children.forEach(a => tryMount(a))
  }
  else {
    bbn.fn.log(["ERROR", cp.$children, cp])
  }
}
