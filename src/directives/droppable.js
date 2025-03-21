export default function() {
  var dragOver = false;
  var mouseOver = false;

  const inserted = (el, binding) => {
    if (analyzeValue(el, binding)) {
      el.bbnDirectives.droppable.onmouseenter = e => {
        if (!!el.bbnDirectives.droppable.active) {
          mouseOver = true;
        }
      };
      el.addEventListener('mouseenter', el.bbnDirectives.droppable.onmouseenter);
      el.bbnDirectives.droppable.onmouseleave = e => {
        if (!!el.bbnDirectives.droppable.active) {
          let ev = new CustomEvent('dragleave', {
            cancelable: true,
            bubbles: true,
            detail: dragOver
          });
          mouseOver = false;
          dragOver = false;
          el.dispatchEvent(ev);
          if (!ev.defaultPrevented) {
            if (el.classList.contains('bbn-droppable-over')) {
              el.classList.remove('bbn-droppable-over');
            }

            el.bbnDirectives.droppable.over = false;
            delete el.dataset.bbn_droppable_over;
          }
        }
      };
      el.addEventListener('mouseleave', el.bbnDirectives.droppable.onmouseleave);
      el.bbnDirectives.droppable.ondragoverdroppable = e => {
        //bbn.fn.log('mirko2', e, bbn.fn.clone(el));
        if (!!el.bbnDirectives.droppable.active
          && !e.defaultPrevented
          && !dragOver
          && !!mouseOver
        ) {
          dragOver = bbn.fn.createObject({
            from: e.detail,
            to: el.bbnDirectives.droppable.options
          });
          let ev = new CustomEvent('dragover', {
            cancelable: true,
            bubbles: true,
            detail: dragOver
          });
          el.dispatchEvent(ev);
          if (!ev.defaultPrevented) {
            if (!el.classList.contains('bbn-droppable-over')) {
              el.classList.add('bbn-droppable-over');
            }

            el.bbnDirectives.droppable.over = true;
            el.dataset.bbn_droppable_over = true;
            //bbn.fn.log('mirko3', bbn.fn.clone(el))
          }
        }
      };
      el.addEventListener('dragoverdroppable', el.bbnDirectives.droppable.ondragoverdroppable);
      el.bbnDirectives.droppable.onbeforedrop = e => {
        if (!!el.bbnDirectives.droppable.active) {
          if (el.classList.contains('bbn-droppable-over')) {
            el.classList.remove('bbn-droppable-over');
          }
          if (!e.defaultPrevented && !!dragOver) {
            let ev = new CustomEvent('drop', {
              cancelable: true,
              bubbles: true,
              detail: dragOver
            });
            el.dispatchEvent(ev);
            if (!ev.defaultPrevented) {
              el.appendChild(e.detail.originalElement);
            }
            else {
              let ev = new CustomEvent('dragend', {
                cancelable: true,
                bubbles: true,
                detail: dragOver
              });
              e.detail.originalElement.dispatchEvent(ev);
              if (!ev.defaultPrevented) {
                if (!!e.detail.mode && (e.detail.mode === 'self')) {
                  e.detail.originalParent.insertBefore(e.detail.originalElement, e.detail.nextElement);
                }
              }
            }
          }
        }
      };
      el.addEventListener('beforedrop', el.bbnDirectives.droppable.onbeforedrop);
    }
  };

  const analyzeValue = (el, binding) => {
    if (el.bbnDirectives === undefined) {
      el.bbnDirectives = bbn.fn.createObject();
    }

    if (el.bbnDirectives.droppable === undefined) {
      el.bbnDirectives.droppable = bbn.fn.createObject();
    }

    if ((binding.value !== false)
      && !el.classList.contains('bbn-undroppable')
    ) {
      el.dataset.bbn_droppable = true;
      el.bbnDirectives.droppable = bbn.fn.createObject({
        active: true,
        over: false
      });
      if (!el.classList.contains('bbn-droppable')) {
        el.classList.add('bbn-droppable');
      }

      let options = bbn.fn.createObject(),
          asArg = !!binding.arg && binding.arg.length,
          asMods = bbn.fn.isArray(binding.modifiers) && binding.modifiers.length,
          asDataFromMods = asMods && binding.modifiers.includes('data'),
          data = bbn.fn.createObject();
      if (asArg) {
        if (binding.arg === 'data') {
          data = binding.arg;
        }
      }
      else if (bbn.fn.isObject(binding.value)) {
        options = binding.value;
        if (asDataFromMods) {
          if ((options.data === undefined)
            || !bbn.fn.isObject(options.data)
          ) {
            bbn.fn.error(bbn._('No "data" property found or not an object'));
            throw bbn._('No "data" property found or not an object');
          }
          data = options.data;
        }
      }

      options.data = data;
      el.bbnDirectives.droppable.options = options;
      return true;
    }
    else {
      el.dataset.bbn_droppable = false;
      el.bbnDirectives.droppable = bbn.fn.createObject({
        active: false
      });
      return false;
    }
  };

  const setOff = el => {
    if (el.dataset) {
      el.dataset.bbn_droppable = false;
    }

    if (el.bbnDirectives === undefined) {
      el.bbnDirectives = bbn.fn.createObject();
    }

    if (el.bbnDirectives.droppable === undefined) {
      el.bbnDirectives.droppable = bbn.fn.createObject();
    }

    if (el.bbnDirectives.droppable.active) {
      if (bbn.fn.isFunction(el.bbnDirectives.droppable.onmouseenter)) {
        el.removeEventListener('mouseenter', el.bbnDirectives.droppable.onmouseenter);
      }
      if (bbn.fn.isFunction(el.bbnDirectives.droppable.onmouseleave)) {
        el.removeEventListener('mouseleave', el.bbnDirectives.droppable.onmouseleave);
      }
      if (bbn.fn.isFunction(el.bbnDirectives.droppable.ondragoverdroppable)) {
        el.removeEventListener('dragoverdroppable', el.bbnDirectives.droppable.ondragoverdroppable);
      }
      if (bbn.fn.isFunction(el.bbnDirectives.droppable.onbeforedrop)) {
        el.removeEventListener('beforedrop', el.bbnDirectives.droppable.onbeforedrop);
      }
    }

    el.bbnDirectives.droppable = bbn.fn.createObject({
      active: false
    });
    if (el.classList?.contains('bbn-droppable')) {
      el.classList.remove('bbn-droppable');
    }
  };

  bbn.cp.directives['bbn-droppable'] = bbn.fn.createObject({
    inserted: inserted,
    update: (el, binding) => {
      if ((binding.value !== false)
        && (el.nodeName !== '#comment')
        && !el.classList.contains('bbn-undroppable')
      ) {
        if (binding.oldValue === false) {
          inserted(el, binding);
        }
        else if (!el.bbnDirectives?.droppable?.over) {
          analyzeValue(el, binding);
        }
      }
      else {
        setOff(el);
      }
    }
  });
};