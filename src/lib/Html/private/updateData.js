import setUpData from './setUpData.js';

/**
 * Update the data property with the dataSource Array
 */
export default function updateData(cp) {
  if (cp.$isDataSet) {
    return;
  }

  if (cp.$cfg.data.length) {
    bbn.fn.iterate(
      bbn.fn.extend(bbn.fn.createObject(), ...cp.$cfg.data.map(a => a.apply(cp))),
      (v, n) => {
        setUpData(cp, n, v);
      }
    );
  }

  Object.defineProperty(cp, '$isDataSet', {
    value: true,
    writable: false,
    configurable: false
  });
}