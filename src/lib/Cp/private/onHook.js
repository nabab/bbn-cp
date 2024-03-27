export default function onHook(cp, hook) {
  if (cp.$cfg[hook]?.length) {
    cp.$cfg[hook].forEach(fn => fn.bind(cp)());
  }
}
