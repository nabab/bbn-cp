export default function() {
  bbn.cp.directives['bbn-focused'] = bbn.fn.createObject({
    inserted(el, binding) {
      if (binding.value === false) {
        return;
      }

      setTimeout(() => {
        let element = el;
        if (el.bbn) {
          element = el.bbn.getRef('element') || el.bbn.getRef('input') || el.bbn.$el;
        }

        element.focus();
        bbn.env.focused = element;
        if (binding.modifiers.includes('selected')) {
          bbn.fn.selectElementText(element);
        }
      }, 250);
    }
  });
}
