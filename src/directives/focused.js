(() => {
  bbn.cp.directives['bbn-focused'] = bbn.fn.createObject({
    inserted(el, binding) {
      if (binding.value === false) {
        return;
      }

      setTimeout(() => {
        el.focus();
        bbn.env.focused = el;
        if (binding.modifiers.includes('selected')) {
          bbn.fn.selectElementText(el);
        }
      }, 250);
    }
  });
})();
