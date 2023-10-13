export default function() {
  const moveToTarget = (el, target) => {
    if (el.parentNode !== target) {
      target.appendChild(el);
    }
  };

  const treatBinding = (el, binding, force) => {
    if (!force && (binding.value === binding.oldValue)) {
      return;
    }

    if (bbn.fn.isString(binding.value)) {
      const target = document.querySelector(binding.value);
      if (target) {
        return moveToTarget(el, target);
      }
    }
    else if (bbn.fn.isDom(binding.value)) {
      return moveToTarget(el, binding.value);
    }
    else {
      return moveToTarget(el, document.body);
    }
  };

  bbn.cp.directives['bbn-portal'] =  bbn.fn.createObject({
    inserted: (el, binding) => {
      el.bbnDirectives.portal = bbn.fn.createObject({
        originalParent: el.parentNode
      });

      if (binding.value) {
        treatBinding(el, binding, true);
      }
    },
    update: (el, binding) => {
      if (binding.value) {
        treatBinding(el, binding);
      }
      else {
        moveToTarget(el, el.bbnDirectives.portal.originalParent);
      }
    }
  });
}
