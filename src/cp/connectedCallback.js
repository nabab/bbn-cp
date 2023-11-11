export default function connectedCallback(cp) {
  if (cp.bbnId && !cp.bbn) {
    cp.bbn = new (cp.bbnFn || cp.constructor.bbnFn)(cp);
    cp.bbn.$connectedCallback();
  }
}
