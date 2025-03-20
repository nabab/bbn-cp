
const dispatch = function(ele, type) {
  const ev = new CustomEvent(type, bbn.fn.createObject({
    cancelable: false,
    detail: {
      __bbnEvent: true,
      __bbnCid: ele.bbnComponentId,
      args: [ele]
    }
  }));
  ele.dispatchEvent(ev);
}

export default function doTransition(ele, type) {
  bbn.fn.checkType(ele, HTMLElement);
  if (!['enter', 'leave'].includes(type)) {
    throw new Error("The type must be 'enter' or 'leave'");
  }

  return new Promise((resolve, reject) => {
    requestAnimationFrame(() => {
      const transition = ele?.bbnSchema?.transition;
      if (!transition || !ele?.classList) {
        return resolve(true);
      }

      transition.num++;
      const num = transition.num;
      const proms = [];
      const name = transition.name || 'bbn';
      if (transition.running) {
        transition.animations.forEach(a => a.reverse());
        transition.animations = ele.getAnimations();
      }
      else {
        transition.type = type;
        dispatch(ele, 'before' + type);
        bbn.fn.log("DISPATCHING " + 'before' + type)
        ele.classList.add(name + "-" + type + "-to");
        ele.classList.remove(name + "-" + type + "-from");
        dispatch(ele, type);
        transition.running = true;
        transition.animations = ele.getAnimations();
      }
      transition.animations.forEach(a => proms.push(a.finished));
      if (!proms.length) {
        proms.push(Promise.resolve(true));
      }
      Promise.all(proms).then(() => {
        if (num !== transition.num) {
          return resolve(false);
        }

        const currentType = num % 2 ? transition.type : (transition.type === 'leave' ? 'enter' : 'leave');
        bbn.fn.log("Removing", ele, proms);
        ele.style.display = 'none';

        if (transition.multiple) {
          ele.classList.remove(name + "-move");
        }

        ele.classList.remove(name + "-" + currentType + "-active");
        ele.classList.remove(name + "-" + currentType + "-to");

        requestAnimationFrame(() => {
          transition.running = false;
          transition.num = 0;
          dispatch(ele, 'after' + currentType);
          bbn.fn.log("DISPATCHING " + 'after' + currentType, num)
          resolve(!!(num % 2));
        });
      });
    });
  });
}
