import retrieveSlots from "../../../internals/retrieveSlots.js";
import stringToTemplate from "../../../internals/stringToTemplate.js";
import templateToMap from "../../../internals/templateToMap.js";
import applyPropsOnElement from "./applyPropsOnElement.js";
import fetchComponents from "./fetchComponents.js";
import treatEvents from "./treatEvents.js";
import treatModel from "./treatModel.js";
//import addToElements from "./addToElements.js";
import addUnknownComponent from "./addUnknownComponent.js";
import bbn from "@bbn/bbn";

/**
 * Creates an element in the given target
 * @param {bbnCp} cp
 * @param {HTMLElement} d 
 * @param {HTMLElement} target 
 * @returns 
 */
export default async function createElement (cp, node, parent, data) {
  // Components have an hyphen
  let isComponent = !node.comment && cp.$isComponent(node);
  /** @constant {Array} todo A list of function to apply once the element will ne created */
  const todo = [];
  /** @constant {bbnComponentFunction} cpSource */
  const cpSource = node.componentId ? bbn.cp.getComponent(node.componentId)?.bbn : cp;
  const oldEle = cpSource.$retrieveElement(node.id, node.loopHash);
  let replace = false;
  let ele;
  if (oldEle) {
    const isComment = bbn.fn.isComment(oldEle);
    if (
      (oldEle !== cp.$el)
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
  if (tag && cp.$cfg.componentNames[tag]) {
    tag = cp.$cfg.componentNames[tag];
    isComponent = true;
  }
  /** 
   * @todo Add the possibility to change the tag using Customized built-in elements 
   * See createElement
   */
  if (isComponent) {
    if (addUnknownComponent(cp, tag)) {
      await fetchComponents(cp);
    }
    if (bbn.cp.statics[tag]?.tag) {
      originalTag = tag;
      tag = bbn.cp.statics[originalTag].tag;
    }
  }

  if (node.model) {
    for (let n in node.model) {
      if (n === '$_default') {
        x(`  if ($_this.$isComponent($_items['${node.id}'])) {`)
        x(`    let modelProp = $_items['${node.id}'].bbnCfg?.model?.prop || $_items['${node.id}'].constructor?.bbnCfg?.model?.prop || 'value';`);
        x(`    $_tmp1.model[modelProp].value = $_tmp1.props[modelProp] = $_sr($_node.model['${n}'].id, ${node.model[n].exp}, ${hashName});`);
        x(`  }`);
        x(`  else {`);
        x(`    $_tmp1.model.value.value = $_tmp1.props.value = $_sr($_node.model['${n}'].id, ${node.model[n].exp}, ${hashName});`);
        x(`  }`);
      }
      else {
        x(`  $_tmp1.model['${n}'].value = $_tmp1.props['${n}'] = $_sr($_node.model['${n}'].id, ${node.model[n].exp}, ${hashName});`);
      }
    }

    for (let n in node.model) {
      if (n === '$_default') {
        if (isComponent) {
          let modelProp = cp.$cfg?.model?.prop || 'value';
          node.props[modelProp].value = node.props.$_default.value;
        }
        else {
          node.model.value.value = node.model.$_default.value;
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
            const tpl = stringToTemplate(node.cfg.template, true, node.cfg.tag || 'bbn-anon');
            const map = templateToMap(tpl);

            Object.defineProperty(ele, 'bbnTpl', {
              value: tpl,
              writable: false,
              configurable: false
            });
            Object.defineProperty(ele, 'bbnMap', {
              value: map,
              writable: false,
              configurable: false
            });
            Object.defineProperty(ele, 'bbnInlineTemplates', {
              value: tpl[0].inlineTemplates,
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

    if (data) {
      Object.defineProperty(ele, 'bbnLoopVars', {
        value: data,
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
      ele.bbnSchema = node;
      if (isComponent && ele.bbn && ele.bbn.$isMounted) {
        ele.bbn.$forceUpdate();
      }
    }
  }

  if (!node.comment) {
    applyPropsOnElement(cp, node, ele);

    if (node.pre) {
      ele.innerHTML = node.pre;
    }

  }

  if (oldEle && !replace) {
    return oldEle;
  }

  //addToElements(cp, ele);
  if (bbn.fn.numProperties(node.directives)) {
    bbn.cp.insertDirectives(ele.bbnSchema.directives, ele);
  }

  if (node.model) {
    treatModel(cp, node, ele.bbnHash, ele, data);
  }
  if (Object.keys(node.events || {}).length) {
    treatEvents(cp, ele, data);
  }

  return ele;
}