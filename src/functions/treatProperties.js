import bbn from "@bbn/bbn";

export default function treatProperties (cp, id, hash, go = false) {
  const sr = (attr, hash) => {
    return cp.$_setInternalResult(
      attr.id,
      attr.fn.bind(cp)(...attr.args.map(a => {
        let r;
        try {
          r = bbn.cp.treatArgument(a, cp, hash)
        }
        catch(e) {
          bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, cp, hash, attr])
          throw e;
        }
        return r;
      })),
      hash
    );
  };
  const props = bbn.fn.createObject();
  const node = cp.$currentMap[id];
  // Will GO if the element is new or modified and not forgotten
  if (bbn.fn.numProperties(node.attr)) {
    let bindValue;
    if (node.attr['bbn-bind']) {
      const attr = node.attr['bbn-bind'];
      bindValue = sr(attr, hash);
      if (cp.$_getInternalState(attr.id, hash) !== 'OK') {
        go = true;
      }
    }

    for (let n in node.attr) {
      if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
        continue;
      }
      
      const attr = node.attr[n];
      if (attr.exp) {
        let attrValue = sr(attr, hash);
        if (attrValue !== undefined) {
          props[n] = attrValue;
        }

        if (cp.$_getInternalState(attr.id, hash) !== 'OK') {
          go = true;
        }
      }
      else {
        props[n] = attr.value;
      }
    }

    if (bindValue) {
      bbn.fn.extendOut(props, bindValue);
    }

    if (Object.hasOwn(props, 'class')) {
      props.class = bbn.cp.convertClasses(
        bindValue?.['class'] && props['class'] !== bindValue['class'] ? 
            [bindValue['class'], props['class']]
            : props['class']
      );
    }

    if (Object.hasOwn(props, 'style')) {
      props.style = bbn.cp.convertStyles(
        bindValue?.style && props.style !== bindValue.style ? 
            [bindValue.style, props.style]
            : props.style
      );
    }
  }

  return {go, props};
}
