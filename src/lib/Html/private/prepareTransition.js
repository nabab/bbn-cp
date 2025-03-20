export default function prepareTransition(ele, type) {
  const transition = ele?.bbnSchema?.transition;
  if (transition && ele?.classList) {
    const name = transition.name || 'bbn';
    ele.classList.add(name + "-" + type + "-from");
    ele.classList.add(name + "-" + type + "-active");
    if (transition.multiple) {
      ele.classList.add(name + "-move");
    }
  }
}
