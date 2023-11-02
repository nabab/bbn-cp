export default async function repeatTick(cp, num) {
  if (!num) {
    num = 0;
  }

  let idx = bbn.fn.search(bbn.cp.queue, {cp});
  if (idx > -1) {
    const queueElement = bbn.cp.queue.splice(idx, 1)[0];
    await cp.$updateComponent();
    queueElement.fns.forEach(fn => {
      if (fn) {
        fn.bind(cp)();
      }
    });
    if (num < 3) {
      bbn.fn.log(`REPEAT ${num} times`);
      await bbn.cp.repeatTick(cp, num + 1);
    }
    else {
      bbn.fn.log(["INFINITE LOOP", cp, bbn.fn.filter(bbn.cp.queue, {cp: queueElement.cp})]);
      throw new Error(bbn._("Infinite loop detected"));
    }
  }
}