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
        if (el.classList) {
          el.classList.add('bbn-portal-active');
        }

        return moveToTarget(el, target);
      }
    }
    else if (bbn.fn.isDom(binding.value)) {
      if (el.classList) {
        el.classList.add('bbn-portal-active');
      }

      return moveToTarget(el, binding.value);
    }
    else {
      bbn.fn.warning("Invalid binding value for bbn-portal");
      if (el.classList) {
        el.classList.remove('bbn-portal-active');
      }

      return moveToTarget(el, el.bbnDirectives.portal.originalParent);
    }
  };

  bbn.cp.directives['bbn-portal'] = bbn.fn.createObject({
    inserted: (el, binding) => {
      let original = el.parentNode;
      if (el.bbnId.indexOf(el.parentNode.bbnId)) {
        original = el.bbnSchema.parent.element;
        if (!original || (original instanceof Comment)) {
          original = el.bbnSchema.parent.parentElement;
        }
      }
      el.bbnDirectives.portal = bbn.fn.createObject({
        originalParent: original,
        todo: false
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
