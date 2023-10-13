export default function isTag(tag, ele) {
  bbn.fn.checkType(tag, 'string', bbn._("Tags must be strings"));
  bbn.fn.checkType(ele, HTMLElement);
  if (ele.tagName.toLowerCase() === tag) {
    return true;
  }

  if (ele.getAttribute("is") === tag) {
    return true;
  }

  return false;
}