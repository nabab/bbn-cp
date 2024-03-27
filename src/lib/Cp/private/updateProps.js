import getProp from "./getProp.js";

export default function updateProps(cp) {
  bbn.fn.each(cp.$namespaces, (a, n) => {
    if (a === 'props') {
      getProp(cp, n);
    }
  });
}