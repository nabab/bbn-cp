export default function retrieveNode(cp, id, hash) {
  let res = cp.$nodes[id] || null;
  if (res && hash) {
    return res[hash] || null;
  }

  return res;
}