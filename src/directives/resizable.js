(() => {
  var isDragging = false;
  var currentEle = false;

  const fnDrag = e => {
    drag(e, currentEle);
  };

  const fnEnd = e => {
    endDrag(e, currentEle);
    document.removeEventListener('mousemove', fnDrag);
    isDragging = false;
  };

  const startDrag = (e, ele) => {
    if (!isDragging
      && !!ele.bbnDirectives.resizable.active
      && !ele.bbnDirectives.resizable.resizing
      && !!ele.bbnDirectives.resizable.modes
      && bbn.fn.numProperties(ele.bbnDirectives.resizable.modes)
    ) {
      isDragging = true;
      currentEle = ele;
      ele.bbnDirectives.resizable.resizing = true;
      let cursor = ''
          modes = ele.bbnDirectives.resizable.modes;
      if (!!modes.left) {
        cursor = !!modes.top ? 'nwse-resize' : (!!modes.bottom ? 'nesw-resize' : 'ew-resize');
      }
      else if (!!modes.right) {
        cursor = !!modes.top ? 'nesw-resize' : (!!modes.bottom ? 'nwse-resize' : 'ew-resize');
      }
      else if (!!modes.top) {
        cursor = !!modes.right ? 'nesw-resize' : (!!modes.left ? 'nwse-resize' : 'ns-resize');
      }
      else if (!!modes.bottom) {
        cursor = !!modes.right ? 'nwse-resize' : (!!modes.left ? 'nesw-resize' : 'ns-resize');
      }
      ele.bbnDirectives.resizable.cursor = window.getComputedStyle(document.body).cursor;
      document.body.style.cursor = cursor;
      ele.classList.add('bbn-resizable-resizing');
      ele.bbnDirectives.resizable.mouseX = bbn.fn.roundDecimal(e.x, 0);
      ele.bbnDirectives.resizable.mouseY = bbn.fn.roundDecimal(e.y, 0);
      if (!ele.bbnDirectives.resizable.container) {
        ele.bbnDirectives.resizable.container = bbn.fn.isDom(ele.parentElement) ? ele.parentElement : document.body;
      }
      let ev = new CustomEvent('userresizestart', {
        cancelable: true,
        bubbles: true,
        detail: ele.bbnDirectives.resizable
      });
      ele.dispatchEvent(ev);
      if (ele.bbn !== undefined) {
        ele.bbn.$emit('userresizestart', ev);
      }
      if (!ev.defaultPrevented) {
        ev.stopImmediatePropagation();
        document.addEventListener('mouseup', fnEnd, {once: true});
        document.addEventListener('mousemove', fnDrag);
      }
    }
  };

  const drag = (e, ele) => {
    if (!!ele.bbnDirectives.resizable.active
      && !!ele.bbnDirectives.resizable.resizing
    ) {
      // we prevent default from the event
      e.stopImmediatePropagation();
      e.preventDefault();
      let rectContainer = ele.bbnDirectives.resizable.container.getBoundingClientRect(),
          rectEle = ele.getBoundingClientRect(),
          style = window.getComputedStyle(ele),
          styleContainer = window.getComputedStyle(ele.bbnDirectives.resizable.container),
          x = bbn.fn.roundDecimal(e.x, 0),
          y = bbn.fn.roundDecimal(e.y, 0),
          modes = ele.bbnDirectives.resizable.modes,
          xMovement = bbn.fn.roundDecimal(ele.bbnDirectives.resizable.mouseX - x, 0),
          yMovement = bbn.fn.roundDecimal(ele.bbnDirectives.resizable.mouseY - y, 0),
          width = rectEle.width + (!!modes.left ? xMovement : -xMovement),
          height = rectEle.height + (!!modes.top ? yMovement : -yMovement),
          element = {
            minWidth: parseFloat(style.minWidth) || 10,
            maxWidth: parseFloat(style.maxWidth) || rectContainer.width,
            minHeight: parseFloat(style.minHeight) || 10,
            maxHeight: parseFloat(style.maxHeight) || rectContainer.height,
            margin: {
              top: parseFloat(style.marginTop) || 0,
              right: parseFloat(style.marginRight) || 0,
              bottom: parseFloat(style.marginBottom) || 0,
              left: parseFloat(style.marginLeft) || 0,
            },
            padding : {
              top: parseFloat(style.paddingTop) || 0,
              right: parseFloat(style.paddingRight) || 0,
              bottom: parseFloat(style.paddingBottom) || 0,
              left: parseFloat(style.paddingLeft) || 0
            },
            border : {
              top: parseFloat(style.borderTop) || 0,
              right: parseFloat(style.borderRight) || 0,
              bottom: parseFloat(style.borderBottom) || 0,
              left: parseFloat(style.borderLeft) || 0
            }
          },
          container = {
            margin: {
              top: parseFloat(styleContainer.marginTop) || 0,
              right: parseFloat(styleContainer.marginRight) || 0,
              bottom: parseFloat(styleContainer.marginBottom) || 0,
              left: parseFloat(styleContainer.marginLeft) || 0,
            },
            padding : {
              top: parseFloat(styleContainer.paddingTop) || 0,
              right: parseFloat(styleContainer.paddingRight) || 0,
              bottom: parseFloat(styleContainer.paddingBottom) || 0,
              left: parseFloat(styleContainer.paddingLeft) || 0
            },
            border : {
              top: parseFloat(styleContainer.borderTop) || 0,
              right: parseFloat(styleContainer.borderRight) || 0,
              bottom: parseFloat(styleContainer.borderBottom) || 0,
              left: parseFloat(styleContainer.borderLeft) || 0
            }
          },
          wt = element.padding.left +
            element.padding.right +
            element.border.left +
            element.border.right,
          ht = element.padding.top +
            element.padding.bottom +
            element.border.top +
            element.border.bottom,
          mtx = element.margin.left + element.margin.right,
          mty = element.margin.top + element.margin.bottom;
      if (element.minWidth < wt) {
        element.minWidth = wt;
      }
      if (element.minHeight < ht) {
        element.minHeight = ht;
      }
      if (element.maxWidth > (rectContainer.width - mtx)) {
        element.maxWidth = rectContainer.width - mtx;
      }
      if (element.maxHeight > (rectContainer.height - mty)) {
        element.maxHeight = rectContainer.height - mty;
      }
      width = width < element.minWidth ?
        element.minWidth :
        (width > element.maxWidth ? element.maxWidth : width);
      height = height < element.minHeight ?
        element.minHeight :
        (height > element.maxHeight ? element.maxHeight : height);
      if (((!!modes.left && xMovement)
          || (!!modes.top && yMovement))
        && (style.position !== 'absolute')
        && (style.position !== 'fixed')
      ) {
        ele.style.position = 'absolute';
      }
      bbn.fn.log('aaaaa', width, element.maxWidth, rectEle)
      if ((!!modes.left || !!modes.right) && xMovement) {
        if (!!modes.left) {
          var tmpLeft = rectEle.left - xMovement;
          if (tmpLeft < rectContainer.left) {
            xMovement = rectContainer.left - tmpLeft;
            width -= xMovement;
            tmpLeft = rectContainer.left;
          }
        }
        else {
          if ((rectEle.right + xMovement) > rectContainer.right) {
            xMovement = (rectEle.right + xMovement) - rectContainer.right;
            width -= xMovement;
          }
        }
        if (width !== rectEle.width) {
          let detail = bbn.fn.createObject({
                from: !!modes.left ? 'left' : 'right',
                movement: xMovement,
                size: width,
                oldSize: rectEle.width
              }),
              ev = new CustomEvent('resize', {
                cancelable: true,
                bubbles: true,
                detail: detail
              });
          ele.dispatchEvent(ev);
          if (!ev.defaultPrevented) {
            if (!!modes.left && xMovement) {
              ele.style.left = tmpLeft + 'px';
            }
            ele.style.width = width + 'px';
            if (ele.bbn !== undefined) {
              ele.bbn.$emit('userresize', ev, detail);
              if (!ev.defaultPrevented
                && (ele.bbn.parentResizer !== undefined)
                && bbn.fn.isFunction(ele.bbn.parentResizer.onResize)
              ) {
                ele.bbn.parentResizer.onResize();
              }
            }
          }
        }
      }
      if ((!!modes.top || !!modes.bottom) && yMovement) {
        if (!!modes.top) {
          bbn.fn.log('yMovement', yMovement)
          var tmpTop = ele.offsetTop - yMovement;
          if (tmpTop < rectContainer.top) {
            yMovement = rectContainer.top - tmpTop;
            height -= yMovement;
            tmpTop = rectContainer.top;
          }
        }
        else {
          if ((rectEle.bottom + yMovement) > rectContainer.bottom) {
            yMovement = (rectEle.bottom + yMovement) - rectContainer.bottom;
            height -= yMovement;
          }
        }
        bbn.fn.log('aaaa', height, rectEle.height, yMovement, tmpTop)
        if (height !== rectEle.height) {
          let detail = bbn.fn.createObject({
                from: !!modes.top ? 'top' : 'bottom',
                movement: yMovement,
                size: height,
                oldSize: rectEle.height
              }),
              ev = new CustomEvent('userresize', {
                cancelable: true,
                bubbles: true,
                detail: detail
              });
          ele.dispatchEvent(ev);
          if (!ev.defaultPrevented) {
            if (!!modes.top && yMovement) {
              ele.style.top = tmpTop + 'px';
            }
            ele.style.height = height + 'px';
            if (ele.bbn !== undefined) {
              ele.bbn.$emit('userresize', ev, detail);
              if (!ev.defaultPrevented
                && (ele.bbn.parentResizer !== undefined)
                && bbn.fn.isFunction(ele.bbn.parentResizer.onResize)
              ) {
                ele.bbn.parentResizer.onResize();
              }
            }
          }
        }
      }
      ele.bbnDirectives.resizable.mouseX = x;
      ele.bbnDirectives.resizable.mouseY = y;
    }
  };

  const endDrag = (e, ele) => {
    if (isDragging
      && !!ele.bbnDirectives.resizable.active
      && !!ele.bbnDirectives.resizable.resizing
    ) {
      ele.bbnDirectives.resizable.resizing = false;
      ele.classList.remove('bbn-resizable-resizing');
      document.body.style.cursor = ele.bbnDirectives.resizable.cursor;
      e.preventDefault();
      e.stopImmediatePropagation();
      let ev = new CustomEvent('userresizeend', {
        cancelable: true,
        bubbles: true,
        detail: ele.bbnDirectives.resizable
      });
      ele.dispatchEvent(ev);
      if (ele.bbn !== undefined) {
        ele.bbn.$emit('userresizestart', ev);
      }
      document.removeEventListener('mouseup', fnEnd, {once: true});
      document.removeEventListener('mousemove', fnDrag);
      delete ele.bbnDirectives.resizable.mouseX;
      delete ele.bbnDirectives.resizable.mouseY;
    }
  };

  const inserted = (el, binding) => {
    if (analyzeValue(el, binding)) {
      el.bbnDirectives.resizable.onmousemove = ev => {
        if (!!el.bbnDirectives.resizable.active
          && !el.bbnDirectives.resizable.resizing
        ) {
          let rect = el.getBoundingClientRect(),
              modes = el.bbnDirectives.resizable.enabledModes,
              m = bbn.fn.createObject();
          if (modes.left
            && (ev.x >= (rect.left - 2))
            && (ev.x <= (rect.left + 2))
          ) {
            m.left = true;
            el.classList.add('bbn-resizable-over-left');
          }
          else {
            el.classList.remove('bbn-resizable-over-left');
          }
          if (modes.right
            && (ev.x >= (rect.left + rect.width - 2))
            && (ev.x <= (rect.left + rect.width + 2))
          ) {
            m.right = true;
            el.classList.add('bbn-resizable-over-right');
          }
          else {
            el.classList.remove('bbn-resizable-over-right');
          }
          if (modes.top
            && (ev.y >= (rect.top - 2))
            && (ev.y <= (rect.top + 2))
          ) {
            m.top = true;
            el.classList.add('bbn-resizable-over-top');
          }
          else {
            el.classList.remove('bbn-resizable-over-top');
          }
          if (modes.bottom
            && (ev.y >= (rect.top + rect.height - 2))
            && (ev.y <= (rect.top + rect.height + 2))
          ) {
            m.bottom = true;
            el.classList.add('bbn-resizable-over-bottom');
          }
          else {
            el.classList.remove('bbn-resizable-over-bottom');
          }
          if (!el.bbnDirectives.resizable.resizing) {
            el.bbnDirectives.resizable.modes = m;
          }
        }
      };
      el.addEventListener('mousemove', el.bbnDirectives.resizable.onmousemove);

      // Add the events listener to capture the long press click and start the drag
      let clickTimeout = 0,
          holdClick = false;
      el.bbnDirectives.resizable.onmousedown = ev => {
        if (clickTimeout) {
          clearTimeout(clickTimeout);
        }
        if (!!el.bbnDirectives.resizable.active
          && !el.bbnDirectives.resizable.resizing
          && !!el.bbnDirectives.resizable.modes
          && bbn.fn.numProperties(el.bbnDirectives.resizable.modes)
        ) {
          if (ev.button === 0) {
            holdClick = true;
            clickTimeout = setTimeout(() => {
              if (holdClick) {
                startDrag(ev, el);
              }
            }, 150);
          }
        }
      };
      el.addEventListener('mousedown', el.bbnDirectives.resizable.onmousedown);
      el.bbnDirectives.resizable.onmouseup = ev => {
        if (!!el.bbnDirectives.resizable.active) {
          holdClick = false;
        }
      };
      el.addEventListener('mouseup', el.bbnDirectives.resizable.onmouseup);
    }
  };

  const analyzeValue = (el, binding) => {
    if (el.bbnDirectives === undefined) {
      el.bbnDirectives = bbn.fn.createObject();
    }
    if (el.bbnDirectives.resizable === undefined) {
      el.bbnDirectives.resizable = bbn.fn.createObject();
    }
    if ((binding.value !== false)
      && !el.classList.contains('bbn-unresizable')
    ) {
      let options = bbn.fn.createObject(),
          asMods = bbn.fn.isArray(binding.modifiers) && binding.modifiers.length,
          asContainerFromMods = asMods && binding.modifiers.includes('container'),
          asArg = !!binding.arg && binding.arg.length,
          modes = bbn.fn.createObject({
            top: !asMods || binding.modifiers.includes('top'),
            right: !asMods || binding.modifiers.includes('right'),
            bottom: !asMods || binding.modifiers.includes('bottom'),
            left: !asMods || binding.modifiers.includes('left')
          }),
          container = false;
      el.dataset.bbn_resizable = true;
      el.bbnDirectives.resizable = bbn.fn.createObject({
        active: true,
        resizing: false,
        enabledModes: modes
      });
      if (!el.classList.contains('bbn-resizable')) {
        el.classList.add('bbn-resizable');
      }

      if (asArg) {
        switch (binding.arg) {
          case 'container':
            container = binding.value;
            break;
        }
      }
      else {
        if (bbn.fn.isObject(binding.value)) {
          options = binding.value;
          if (asContainerFromMods) {
            if ((options.container === undefined)
              || !bbn.fn.isDom(options.container)
            ) {
              bbn.fn.error(bbn._('No "container" property found or not a DOM element'));
              throw bbn._('No "container" property found or not a DOM element');
            }
            container = options.container;
          }
        }
      }
      el.bbnDirectives.resizable.container = container;
      el.bbnDirectives.resizable.options = options;
      return true;
    }
    else {
      el.dataset.resizable = false;
      el.bbnDirectives.resizable = bbn.fn.createObject({
        active: false
      });
      return false;
    }
  };

  const setOff = el => {
    el.dataset.bbn_resizable = false;
    if (el.bbnDirectives === undefined) {
      el.bbnDirectives = bbn.fn.createObject();
    }
    if (el.bbnDirectives.resizable === undefined) {
      el.bbnDirectives.resizable = bbn.fn.createObject();
    }
    if (!!el.bbnDirectives.resizable.active) {
      if (bbn.fn.isFunction(el.bbnDirectives.resizable.onmousedown)) {
        el.removeEventListener('mousedown', el.bbnDirectives.resizable.onmousedown);
      }
      if (bbn.fn.isFunction(el.bbnDirectives.resizable.onmouseup)) {
        el.removeEventListener('mouseup', el.bbnDirectives.resizable.onmouseup);
      }
      if (bbn.fn.isFunction(el.bbnDirectives.resizable.onmousemove)) {
        el.removeEventListener('mousemove', el.bbnDirectives.resizable.onmousemove);
      }
    }
    el.bbnDirectives.resizable = bbn.fn.createObject({
      active: false
    });
    if (el.classList.contains('bbn-resizable')) {
      el.classList.remove('bbn-resizable');
    }
  };

  bbn.cp.directives['bbn-resizable'] =  bbn.fn.createObject({
    inserted: inserted,
    update: (el, binding) => {
      if ((binding.value !== false)
        && !el.classList.contains('bbn-unresizable')
      ) {
        if (binding.oldValue === false) {
          inserted(el, binding);
        }
        else if (!isDragging){
          analyzeValue(el, binding);
        }
      }
      else {
        setOff(el);
      }
    }
  });
})();
