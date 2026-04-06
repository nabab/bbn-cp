export default async function onHook(cp, hook) {
  if (cp.$cfg?.[hook]?.length) {
    for (let i = 0; i < cp.$cfg[hook].length; i++) {
      if (cp.$cfg[hook][i][Symbol.toStringTag] === 'AsyncFunction') {
        await cp.$cfg[hook][i].bind(cp)();
      }
      else {
        cp.$cfg[hook][i].bind(cp)();
      }
    }
  }
}
