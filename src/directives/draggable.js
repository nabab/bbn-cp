export default function() {
  var isDragging = false;
  var currentEle = false;

  const fnClick = e => {
    e.stopImmediatePropagation();
    e.preventDefault();
  };

  const fnDrag = e => {
    drag(e, currentEle);
  };

  const fnEnd = e => {
    endDrag(e, currentEle);
    document.removeEventListener('mousemove', fnDrag);
    setTimeout(() => {
      document.removeEventListener('click', fnClick, {once: true, capture: true});
    }, 100);
    isDragging = false;
  };

  const fnUp = () => {
    isDragging = false;
  };

  const startDrag = (e, ele) => {
    if (ele.bbnDirectives?.draggable?.active
      && !isDragging
    ) {
      isDragging = true;
      currentEle = ele;
      const o = ele.bbnDirectives.draggable.options;
      let ev = new CustomEvent('dragstart', {
        cancelable: true,
        bubbles: true,
        detail: o
      });
      ele.dispatchEvent(ev);
      if (!ev.defaultPrevented) {
        ev.stopImmediatePropagation();
        let isMove = o.mode === 'move';
        let isSelf = o.mode === 'self';
        let helper = isMove ? false : (isSelf ? ele : ele.cloneNode(true));
        let rect = ele.getBoundingClientRect();
        o.originalElement = ele;
        o.originalParent = ele.parentElement;
        o.originalNextElement = ele.nextElementSibling;
        o.helper = o.helperElement || ele;
        if (!o?.container) {
          o.container = bbn.fn.isDom(o.originalParent) ? o.originalParent : document.body;
        }
        if (!isMove) {
          if (o?.component) {
            helper = document.createElement('component');
            helper.setAttribute(bbn.fn.isString(o.component) ? 'is' : ':is', o.component);
            if (bbn.fn.isObject(o?.componentOptions)
            ) {
              helper.setAttribute('v-bind', JSON.stringify(o.componentOptions));
            }
          }
          if (!!o.helperElement) {
            rect = o.helperElement.getBoundingClientRect();
            helper = isSelf ? o.helperElement : o.helperElement.cloneNode(true)
          }

          const d = document.createElement('div');
          d.setAttribute('id', 'bbn-draggable-current');
          d[isSelf ? 'appendChild' : 'append'](helper);
          d.style.left = e.pageX + 'px';
          d.style.top = e.pageY + 'px';
          d.style.position = 'fixed';
          d.style.zIndex = '1000';
          d.style.opacity = 0.7;
          d.style.width = rect.width + 'px';
          d.style.height = rect.height + 'px';
          o.helper = d;
          o.container[isSelf ? 'appendChild' : 'append'](o.helper);
          //bbn.cp.createApp(document.querySelector('#bbn-draggable-current > *'));
        }
        ele.bbnDirectives.draggable.pointerEvents = window.getComputedStyle(o.helper).pointerEvents;
        o.helper.style.pointerEvents = 'none';
        document.addEventListener('click', fnClick, {once: true, capture: true});
        document.addEventListener('mouseup', fnEnd, {once: true});
        document.addEventListener('mousemove', fnDrag);
      }
      else {
        isDragging = false;
      }
    }
  };

  const drag = (e, ele) => {
    const dir = ele.bbnDirectives;
    if (dir?.draggable?.active) {
      // we prevent default from the event
      e.stopImmediatePropagation();
      e.preventDefault();
      var options = dir.draggable.options;
      if (options.mode === 'move') {
        let rectContainer = options.container.getBoundingClientRect(),
            rectHelper = options.helper.getBoundingClientRect(),
            rectEle = ele.getBoundingClientRect(),
            x = bbn.fn.roundDecimal(e.x, 0),
            y = bbn.fn.roundDecimal(e.y, 0),
            minLeft = bbn.fn.roundDecimal(-rectHelper.width + (rectHelper.right - rectEle.right) + 20, 0),
            minLeftPos = bbn.fn.roundDecimal(rectContainer.left + minLeft - (rectEle.left - rectHelper.left), 0),
            maxLeft = bbn.fn.roundDecimal(rectContainer.width - (rectEle.left - rectHelper.left) - 20, 0),
            maxLeftPos = bbn.fn.roundDecimal((rectEle.left + rectEle.width - rectHelper.left) + rectContainer.left + maxLeft, 0),
            minTop = bbn.fn.roundDecimal(-rectHelper.height + (rectHelper.bottom - rectEle.bottom) + 20, 0),
            minTopPos = bbn.fn.roundDecimal(rectContainer.top + minTop - (rectEle.top - rectHelper.top), 0),
            maxTop = bbn.fn.roundDecimal(rectContainer.height - (rectEle.top - rectHelper.top) - 20, 0),
            maxTopPos = bbn.fn.roundDecimal((rectEle.top + rectEle.height - rectHelper.top) + rectContainer.top + maxTop, 0),
            left = options.helper.offsetLeft - (dir.draggable.mouseX - x),
            top = options.helper.offsetTop - (dir.draggable.mouseY - y);

        if ((x < minLeftPos) || (options.helper.offsetLeft < minLeft)) {
          left = minLeft;
        }
        else if ((options.helper.offsetLeft > maxLeft)
          || ((x > (maxLeftPos - 20))
            && (options.helper.offsetLeft === maxLeft)
          )
        ) {
          left = maxLeft;
        }
        if ((y < minTopPos) || (options.helper.offsetTop < minTop)) {
          top = minTop;
        }
        else if ((options.helper.offsetTop > maxTop)
          || ((y > (maxTopPos - 20))
            && (options.helper.offsetTop === maxTop)
          )
        ) {
          top = maxTop;
        }
        if ((options.helper.offsetLeft === minLeft)) {
          if (dir.draggable.mouseMinX === undefined) {
            dir.draggable.mouseMinX = x;
          }
          else if (x >= minLeftPos) {
            if (x >= dir.draggable.mouseMinX) {
              delete dir.draggable.mouseMinX;
            }
            else {
              left = minLeft;
            }
          }
        }
        if ((options.helper.offsetLeft === maxLeft)) {
          if (dir.draggable.mouseMaxX === undefined) {
            dir.draggable.mouseMaxX = x;
          }
          else if (x <= maxLeftPos) {
            if (x <= dir.draggable.mouseMaxX) {
              delete dir.draggable.mouseMaxX;
            }
            else {
              left = maxLeft;
            }
          }
        }
        if ((options.helper.offsetTop === minTop)) {
          if (dir.draggable.mouseMinY === undefined) {
            dir.draggable.mouseMinY = y;
          }
          else if (y >= minTopPos) {
            if (y >= dir.draggable.mouseMinY) {
              delete dir.draggable.mouseMinY;
            }
            else {
              top = minTop;
            }
          }
        }
        if ((options.helper.offsetTop === maxTop)) {
          if (dir.draggable.mouseMaxY === undefined) {
            dir.draggable.mouseMaxY = y;
          }
          else if (y <= maxTopPos) {
            if (y <= dir.draggable.mouseMaxY) {
              delete dir.draggable.mouseMaxY;
            }
            else {
              top = maxTop;
            }
          }
        }
        if (left < minLeft) {
          left = minLeft;
        }
        if (top < minTop) {
          top = minTop;
        }
        if (left > maxLeft) {
          left = maxLeft;
        }
        if (top > maxTop) {
          top = maxTop;
        }
        options.helper.style.left = left + 'px';
        options.helper.style.top = top + 'px';
        let style = window.getComputedStyle(options.helper);
        if ((style.position !== 'absolute')
          && (style.position !== 'fixed')
        ) {
          options.helper.style.position = 'absolute';
        }
        dir.draggable.mouseX = x;
        dir.draggable.mouseY = y;
      }
      else {
        options.helper.style.left = e.pageX + 'px';
        options.helper.style.top = e.pageY + 'px';
      }
      let scroll = e.target.closest('.bbn-scroll');
          options.scroll = !!scroll && (scroll.bbn !== undefined) ? scroll.bbn : false;
      if (!!options.scroll
        && (options.scroll.hasScrollY || options.scroll.hasScrollX)
        && !options.scroll.isScrolling
      ) {
        let getDiff = axis => {
          let coord = options.scroll.$el.getBoundingClientRect(),
              client = 'client' + axis.toUpperCase(),
              dim = axis === 'y' ? 'height' : 'width',
              step = Math.ceil(coord[dim] / 20),
              margin = step * 4,
              diff = 0;
          if (e[client] < (coord[axis] + margin)) {
            diff = e[client] - coord[axis] - margin;
          }
          else if (e[client] > (coord[axis] + coord[dim] - margin)) {
            diff = e[client] - (coord[axis] + coord[dim] - margin);
          }
          if (diff) {
            let approachLevel = Math.round(diff/step);
            return Math.round(options.scroll.$el['offset' + dim.charAt(0).toUpperCase() + dim.slice(1)] / 5) * approachLevel + 1;
          }
        };
        if (options.scroll.hasScrollY) {
          let diff = getDiff('y');
          if (diff) {
            options.scroll.addVertical(diff);
          }
        }
        if (options.scroll.hasScrollX) {
          let diff = getDiff('x');
          if (diff) {
            options.scroll.addHorizontal(diff);
          }
        }
      }
      if (options.mode !== 'move') {
        let target = e.target;
        if (target.dataset.bbn_droppable !== 'true') {
          target = target.closest('[data-bbn_droppable=true]');
        }
        if (target
          && (target !== ele)
          && !target.classList.contains('bbn-undroppable')
          && !!target.bbnDirectives?.droppable?.active
        ) {
          let ev = new CustomEvent('dragoverdroppable', {
            cancelable: true,
            bubbles: true,
            detail: options
          });
          target.dispatchEvent(ev)
        }
      }
    }
  };

  const endDrag = (e, ele) => {
    if (!!ele.bbnDirectives?.draggable?.active
      && isDragging
    ) {
      const draggable = ele.bbnDirectives.draggable;
      e.preventDefault();
      e.stopImmediatePropagation();
      var options = draggable.options;
      options.helper.style.pointerEvents = draggable.pointerEvents;
      let target = options.mode !== 'move' ? e.target : false;
      if (bbn.fn.isDom(target)
        && (target.dataset.bbn_droppable_over !== 'true')
      ) {
        target = target.closest('[data-bbn_droppable_over=true]');
      }
      if (bbn.fn.isDom(target)
        && !target.classList.contains('bbn-undroppable')
        && !!target.bbnDirectives?.droppable?.active
      ) {
        let ev = new CustomEvent('beforedrop', {
          cancelable: true,
          bubbles: true,
          detail: options
        });
        target.dispatchEvent(ev);
      }
      else {
        let ev = new CustomEvent('dragend', {
          cancelable: true,
          bubbles: true,
          detail: options
        });
        ele.dispatchEvent(ev);
        if (!ev.defaultPrevented) {
          if (!!options.mode && (options.mode === 'self')) {
            options.originalParent.insertBefore(options.originalElement, options.originalNextElement);
          }
        }
      }
      document.removeEventListener('click', fnClick, {once: true, capture: true});
      document.removeEventListener('mouseup', fnEnd, {once: true});
      document.removeEventListener('mousemove', fnDrag);
      document.removeEventListener('mouseup', fnUp, {once: true});
      if (options.mode !== 'move') {
        options.helper.remove();
      }
      else {
        delete draggable.mouseX;
        delete draggable.mouseY;
        delete draggable.mouseMinX;
        delete draggable.mouseMaxX;
        delete draggable.mouseMinY;
        delete draggable.mouseMaxY;
      }
    }
  };

  const inserted = (el, binding) => {
    if (analyzeValue(el, binding)) {
      // Add the events listener to capture the long press click and start the drag
      const draggable = el.bbnDirectives.draggable;
      let clickTimeout = 0;
      let holdClick = false;
      draggable.onmousedown = ev => {
        if (!!draggable.active) {
          draggable.mouseX = ev.x;
          draggable.mouseY = ev.y;
          if (clickTimeout) {
            clearTimeout(clickTimeout);
          }
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
      el.addEventListener('mousedown', draggable.onmousedown);
      draggable.onmouseup = ev => {
        if (!!draggable.active) {
          holdClick = false;
        }
      };
      el.addEventListener('mouseup', draggable.onmouseup);
    }
  };

  const analyzeValue = (el, binding)  => {
    if (el.bbnDirectives === undefined) {
      el.bbnDirectives = bbn.fn.createObject();
    }
    if (el.bbnDirectives.draggable === undefined) {
      el.bbnDirectives.draggable = bbn.fn.createObject();
    }
    if ((binding.value !== false)
      && !el.classList.contains('bbn-undraggable')
    ) {
      el.dataset.bbn_draggable = true;
      el.bbnDirectives.draggable = bbn.fn.createObject({
        active: true
      });
      if (!el.classList.contains('bbn-draggable')) {
        el.classList.add('bbn-draggable');
      }
      let options = bbn.fn.createObject(),
          asArg = !!binding.arg && binding.arg.length,
          asMods = bbn.fn.isArray(binding.modifiers) && binding.modifiers.length,
          asComponentFromMods = asMods && binding.modifiers.includes('component'),
          asContainerFromMods = asMods && binding.modifiers.includes('container'),
          asModeFromMods = asMods && binding.modifiers.includes('mode'),
          asDataFromMods = asMods && binding.modifiers.includes('data'),
          asHelperFromMods = asMods && binding.modifiers.includes('helper'),
          component = false,
          container = false,
          mode = 'clone',
          data = bbn.fn.createObject(),
          helper = false;

      if (asArg) {
        switch (binding.arg) {
          case 'component':
            component = binding.value;
            break;
          case 'container':
            container = binding.value;
            break;
          case 'data':
            data = binding.value;
            break;
          case 'mode':
            mode = binding.value;
            break;
          case 'helper':
            helper = binding.value;
            break;
        }
      }
      else {
        if (bbn.fn.isObject(binding.value)) {
          options = binding.value;
          if (asComponentFromMods) {
            if ((options.component === undefined)
              || (bbn.fn.isObject(options.component)
                && !bbn.fn.numProperties(options.component))
              || (bbn.fn.isString(options.component)
                && !options.component.length)
            ) {
              bbn.fn.error(bbn._('No "component" property found'));
              throw bbn._('No "component" property found');
            }
            component = options.component;
          }
          if (asContainerFromMods) {
            if ((options.container === undefined)
              || !bbn.fn.isDom(options.container)
            ) {
              return;
              bbn.fn.error(bbn._('No "container" property found or not a DOM element'));
              throw bbn._('No "container" property found or not a DOM element');
            }
            container = options.container;
          }
          if (asDataFromMods) {
            if ((options.data === undefined)
              || !bbn.fn.isObject(options.data)
            ) {
              bbn.fn.error(bbn._('No "data" property found or not an object'));
              throw bbn._('No "data" property found or not an object');
            }
            data = options.data;
          }
          if (asModeFromMods) {
            if ((options.mode === undefined)
              || !bbn.fn.isString(options.mode)
            ) {
              bbn.fn.error(bbn._('No "mode" property found or not a string'));
              throw bbn._('No "mode" property found or not a string');
            }
            mode = options.mode;
          }
          if (asHelperFromMods) {
            if ((options.helper === undefined)
              || (!bbn.fn.isString(options.helper)
                && !bbn.fn.isDom(options.helper))
            ) {
              bbn.fn.error(bbn._('No "helper" property found or not a string or not a DOM element'));
              throw bbn._('No "helper" property found or not a string or not a DOM element');
            }
            helper = options.helper;
          }
        }
        else if (bbn.fn.isString(binding.value)) {
          switch (binding.value) {
            case 'clone':
            case 'move':
            case 'self':
              mode = binding.value;
              break;
            default:
              // The helper is a component name
              component = binding.value;
              break;
          }
        }
      }
      if (component) {
        options.component = component;
      }
      options.container = container;
      options.data = data;
      options.mode = mode;
      if (helper) {
        options.helperElement = helper;
      }
      el.bbnDirectives.draggable.options = options;
      return true;
    }
    else {
      el.dataset.bbn_draggable = false;
      el.bbnDirectives.draggable = bbn.fn.createObject({
        active: false
      });
      return false;
    }
  };

  const setOff = el => {
    if (el.dataset) {
      el.dataset.bbn_draggable = false;
    }

    if (el.bbnDirectives === undefined) {
      el.bbnDirectives = bbn.fn.createObject();
    }

    if (el.bbnDirectives.draggable === undefined) {
      el.bbnDirectives.draggable = bbn.fn.createObject({active: false});
    }

    const draggable = el.bbnDirectives.draggable;

    if (draggable.active) {
      if (bbn.fn.isFunction(draggable.onmousedown)) {
        el.removeEventListener('mousedown', draggable.onmousedown);
      }
      if (bbn.fn.isFunction(draggable.onmouseup)) {
        el.removeEventListener('mouseup', draggable.onmouseup);
      }

      draggable.active = false;
    }

    if (el.classList?.contains('bbn-draggable')) {
      el.classList.remove('bbn-draggable');
    }
  };

  bbn.cp.directives['bbn-draggable'] = bbn.fn.createObject({
    inserted: inserted,
    update: (el, binding) => {
      if ((binding.value !== false)
        && (el.nodeName !== '#comment')
        && !el.classList.contains('bbn-undraggable')
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
};
