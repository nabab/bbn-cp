import bbnData from '../../Data/Data.js';
import setProp from './setProp.js';

export default function getProp(cp, name) {
  if (Object.hasOwn(cp.$el.bbnSchema.props || {}, name) && (cp.$el.bbnSchema.props[name] !== cp.$propsCfg[name].value)) {
    setProp(cp, name, cp.$el.bbnSchema.props[name]);
  }

  bbnData.addSequence(cp, name);

  return cp.$propsCfg[name].value;
}
