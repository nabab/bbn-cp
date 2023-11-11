import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.loop = function(node, hashName) {
  const clone = bbn.fn.clone(node);
  delete clone.loop;
  const md5 = bbn.fn.md5(node.id);
  const hash = 'bbnLoopHash_' + md5
  const indexName = node.loop.index || ('bbnLoopIndex_' + md5);
  // Starting the loop

  let varName = $_sr(node.loop.hash, node.loop.exp, hashName);
  let isNumber = bbn.fn.isNumber(varName);
  let parentName = $_par.at(-1);
  let listName = [];
  let isArray = bbn.fn.isArray(varName);
  if (isNumber) {
    varName = Object.keys((new Array(varName)).fill(0)).map(a => parseInt(a));
    //  //bbn.fn.log("LOOP VALUE", varName);
  }
  $_old = false;
  for (let indexName in varName) {
    if (isArray) {
      indexName = parseInt(indexName);
    }
    node.loop.item = isNumber ? parseInt(indexName) : varName[indexName];
    const hash = (hashName || '') + 'node.loop.hash-indexName-' + (node.attr?.key?.exp ? node.attr.key.exp : indexName);
    listName.push(hash);
    $_sr(node.loop.item, node.loop.item, hash);
    //  bbn.fn.log(node.loop.item);

    nodesToFunction(
      cp,
      [clone],
      hash
    );
    // Ending the loop
  }
  Array.from(parentName.childNodes).forEach(a => {
    // If the loop is on a template the ID won't be the same with the loop but will start by it
    if ((a.bbnHash && (a.bbnHash.indexOf(hashName) === 0)) && (a.bbnId.indexOf(node.id) === 0) && (!a.bbnLoopVars || (bbn.fn.escapeSquotes(node.loop.exp) === a.bbnLoopVars.exp)) && !listName.includes(a.bbnHash)) {
      $_this.$removeDOM(a);//bbn.fn.log("REMOVING NODE", a, a.bbnHash, listName)
    }
  });
};
