export default function() {
  const moveToTarget = (el, target) => {
    if (el.parentNode !== target) {
      let hasClass = false;
      if (el.isConnected) {
        hasClass = true;
        el.classList.add('bbn-is-moving');
      }
      target.appendChild(el);
      if (hasClass) {
        el.classList.remove('bbn-is-moving');
      }
      const ev = new CustomEvent('portalmoved');
      el.dispatchEvent(ev);
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
      bbn.fn.warning("Invalid binding value for bbn-portal");
      return moveToTarget(el, el.bbnDirectives.portal.originalParent);
    }
  };

  bbn.cp.directives['bbn-portal'] = bbn.fn.createObject({
    inserted: (el, binding) => {
      //bbn.fn.log(["INSERTED PORTAL", el, binding]);
      el.bbnDirectives.portal = bbn.fn.createObject({
        originalParent: el.parentNode
      });

      if (binding.value) {
        treatBinding(el, binding, true);
      }
    },
    update: (el, binding) => {
      //bbn.fn.log(["UPDATED PORTAL", el, binding]);
      if (binding.value) {
        treatBinding(el, binding);
      }
      else {
        moveToTarget(el, el.bbnDirectives.portal.originalParent);
      }
    }
  });
}
