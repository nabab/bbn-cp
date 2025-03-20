export default function onHook(cp, hook) {
  if (cp.$cfg?.[hook]?.length) {
    for (let i = 0; i < cp.$cfg[hook].length; i++) {
      cp.$cfg[hook][i].bind(cp)();
    }
  }
}
