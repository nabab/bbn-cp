import bbnCp from "../Cp.js";
import generateNode from "../private/generateNode.js";
import stringToTemplate from "../../../internals/stringToTemplate.js";
import retrieveSlots from "../../../internals/retrieveSlots.js";

/**
 * Deletes the given property from the given object using static method
 * @param {Object} cfg The new component configuration
 * @param {HTMLElement} target The element in which the component will be put
 * @param {HTMLElement} before Optional element after which it will be inserted
 * @returns 
 */
bbnCp.prototype.$create = function (obj, target, before) {
  const parentNode = this.$nodes[target.bbnId.split('-').slice(0, -1).join('-')];
  const newId = target.bbnId + '-' + bbn.fn.randomString(5).toLowerCase();
  const node = generateNode({
    tag: 'bbn-anon',
    id: newId
  }, this, parentNode, target.bbnSchema.root, target.bbnSchema.rootHash, target.bbnSchema.hash);

  // Its content is its template
  let tmp = stringToTemplate(obj.template, true, 'bbn-anon');
  const cpTpl = tmp.res;
  const cpMap = tmp.map;
  bbn.fn.iterate(tmp.inlineTemplates, (tpl, tag) => {
    if (!obj.components[tag]) {
      throw new Error("Impossible to find the sub component %s", tag);
    }
    obj.components[tag].template = tpl;
  });

  // Freeze the component configuration.
  const cpCfg = Object.freeze(bbn.cp.normalizeComponent(obj));

  // Initialize subcomponents if defined.
  if (cpCfg.components) {
    for (let n in cpCfg.components) {
      bbn.cp.define(cpCfg.componentNames[n], cpCfg.components[n], cpCfg.components[n].template);
    }
  }

  // Retrieve slots from the template.
  const slots = retrieveSlots(cpTpl);
  if (!slots.default) {
    slots.default = [];
  }

  // Create the bbn-anon element and set up its properties.
  const cp = Object.assign(
    document.createElement("bbn-anon"),
    {
      bbnId: newId,
      bbnComponent: this,
      bbnConnected: true,
      bbnCfg: cpCfg,
      bbnTpl: cpTpl,
      bbnSlots: slots,
      bbnMap: cpMap,
      get bbnSchema() {
        return node
      },
      bbnMapped: false
    }
  );

  if (before) {
    target.insertBefore(cp, before);
  }
  else {
    target.appendChild(cp);
  }

  return cp;
};
