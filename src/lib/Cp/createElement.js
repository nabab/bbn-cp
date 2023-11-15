import bbnCp from "../Cp.js";
import stringToTemplate from "../../internals/stringToTemplate.js";
import retrieveSlots from "../../internals/retrieveSlots.js";

/**
 * Creates an element in the given target
 * @param {HTMLElement} d 
 * @param {HTMLElement} target 
 * @returns 
 */
bbnCp.prototype.$createElement = async function (node, target, prevElementIndex, loopInfo) {
  // Components have an hyphen
  let isComponent = !node.comment && this.$isComponent(node);
  /** @constant {Array} todo A list of function to apply once the element will ne created */
  const todo = [];
  /** @constant {bbnComponentFunction} cpSource */
  const cpSource = node.componentId ? bbn.cp.getComponent(node.componentId)?.bbn : this;
  const oldEle = cpSource.$retrieveElement(node.id, node.loopHash);
  let replace = false;
  let ele;
  if (oldEle) {
    const isComment = bbn.fn.isComment(oldEle);
    if (
      (oldEle !== this.$el)
      && (
        (!!node.comment !== isComment)
        || (
          !isComment
          && node.tag
          && !bbn.cp.isTag(node.tag, oldEle)
        )
      )
    ) {
      //bbn.fn.log("REPLACING " + node.id, isComment, d, oldEle);
      replace = true;
    }
    else {
      ele = oldEle;
    }
  }

  /** @todo check todo */
  let tag = node.tag;
  let originalTag = node.tag;
  if (tag && this.$cfg.componentNames[tag]) {
    tag = this.$cfg.componentNames[tag];
    isComponent = true;
  }
  /** 
   * @todo Add the possibility to change the tag using Customized built-in elements 
   * See createElement
   */
  if (isComponent) {
    if (this.$addUnknownComponent(tag)) {
      await this.$fetchComponents(tag);
    }
    if (bbn.cp.statics[tag]?.tag) {
      originalTag = tag;
      tag = bbn.cp.statics[originalTag].tag;
    }
  }

  if (node.model) {
    for (let n in node.model) {
      if (n === '_default_') {
        if (isComponent) {
          let modelProp = bbn.cp.statics[tag]?.cfg?.model?.prop || 'value';
          node.props[modelProp] = node.props._default_;
          delete node.props._default_;
          node.model[modelProp] = node.model._default_;
          //delete node.model._default_;
        }
        else {
          node.model.value = node.model._default_;
          //delete node.model._default_;
          node.props.value = node.props._default_;
          delete node.props._default_;
        }
      }
    }
  }

  if (!oldEle || replace) {
    if (node.comment) {
      ele = document.createComment(" ***_BBN_*** ");
    }
    else if (tag === 'svg') {
      ele = document.createElementNS("http://www.w3.org/2000/svg", tag);
      ele.innerHTML = node.content;
    }
    else {
      /** 
       * @todo Add the possibility to change the tag using Customized built-in elements 
       * See createElement
       */
      if (isComponent) {
        if (replace && oldEle?.tagName && (tag === oldEle.tagName.toLowerCase())) {
          replace = false;
        }
      }

      /** @constant {HTMLElement} ele */
      const constructorArgs = [tag];
      if (originalTag !== tag) {
        constructorArgs.push({
          is: originalTag
        });
      }
      ele = document.createElement(...constructorArgs);
      if (originalTag !== tag) {
        ele.setAttribute('is', originalTag);
      }
      if (tag === 'bbn-anon') {
        if (node.cfg) {
          if (node.cfg.mixins && node.cfg.mixins.indexOf(bbn.cp.mixins.basic) === -1) {
            node.cfg.mixins.push(bbn.cp.mixins.basic);
          }
          Object.defineProperty(ele, 'bbnCfg', {
            value: node.cfg,
            writable: false,
            configurable: false
          });
          if (node.cfg.template) {
            const tmp = stringToTemplate(node.cfg.template, true, node.cfg.tag || 'bbn-anon');
            Object.defineProperty(ele, 'bbnTpl', {
              value: tmp.res,
              writable: false,
              configurable: false
            });
            Object.defineProperty(ele, 'bbnMap', {
              value: tmp.map,
              writable: false,
              configurable: false
            });
            Object.defineProperty(ele, 'bbnInlineTemplates', {
              value: tmp.inlineTemplates,
              writable: false,
              configurable: false
            });
          }
        }
      }
    }

    // Giving to all elements property bbnId
    Object.defineProperty(ele, 'bbnId', {
      value: node.id,
      writable: false,
      configurable: false
    });

    // Outer schema of the component, with the slots
    Object.defineProperty(ele, 'bbnSchema', {
      value: node,
      writable: true,
      configurable: true
    });

    Object.defineProperty(ele, 'bbnComponentId', {
      value: cpSource.$cid,
      writable: false,
      configurable: false
    });

    if (node.directives) {
      Object.defineProperty(ele, 'bbnDirectives', {
        value: bbn.fn.createObject(),
        writable: false,
        configurable: false
      });
    }

    if (loopInfo) {
      Object.defineProperty(ele, 'bbnLoopVars', {
        value: loopInfo,
        writable: false,
        configurable: false
      });
    }

    if (node.loopHash) {
      Object.defineProperty(ele, 'bbnHash', {
        value: node.loopHash,
        writable: false,
        configurable: false
      });
      Object.defineProperty(ele, 'bbnIndex', {
        value: node.loopIndex,
        writable: false,
        configurable: false
      });
    }
    if (isComponent) {
      let realSlots;
      if (tag === 'bbn-anon') {
        realSlots = retrieveSlots(ele.bbnTpl || node.items);
      }
      else {
        realSlots = bbn.fn.clone(ele.constructor.bbnSlots)
      }

      if (!bbn.fn.numProperties(realSlots)) {
        realSlots = bbn.fn.createObject({
          default: []
        });
      }

      // Outer schema of the component, with the slots
      Object.defineProperty(ele, 'bbnRealSlots', {
        value: realSlots,
        writable: false,
        configurable: false
      });
      // Outer schema of the component, with the slots
      Object.defineProperty(ele, 'bbnSlots', {
        get() {
          return this.bbnRealSlots;
        }
      });

    }
  }
  else {
    ele = oldEle;
    if (!bbn.fn.isSame(ele.bbnSchema.props, node.props)) {
      ele.bbnSchema = d;
      if (isComponent && ele.bbn && ele.bbn.$isMounted) {
        ele.bbn.$forceUpdate();
      }
    }
  }

  if (!node.comment) {
    cpSource.$updateElementFromProps(node, ele);

    if (node.pre) {
      ele.innerHTML = node.pre;
    }

  }

  if (oldEle && !replace) {
    return oldEle;
  }

  if (target !== this.$el) {
    this.$insertElement(ele, target, prevElementIndex, oldEle);
  }
  else {
    this.$addToElements(ele);
  }

  return ele;
}