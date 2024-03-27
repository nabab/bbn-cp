export default function setRef(cp, ref, ele) {
  if (cp.$refsElements[ref] && (cp.$refsElements[ref] !== ele)) {
    if (!bbn.fn.isArray(cp.$refsElements[ref])) {
      if (!cp.$refsElements[ref].isConnected) {
        cp.$refsElements[ref] = ele;
      }
      else {
        cp.$refsElements[ref] = [cp.$refsElements[ref]]
      }
    }
    if (bbn.fn.isArray(cp.$refsElements[ref])) {
      cp.$refsElements[ref].push(ele);
    }
  }
  else {
    cp.$refsElements[ref] = ele;
  }
}