import bbnBuilder from "../Builder.js";

bbnBuilder.prototype.props = function(node, hashName) {
  $_props = bbn.fn.createObject();
  // Will GO if the element is new or modified and not forgotten
  if (bbn.fn.numProperties(node.attr)) {
    if (node.attr['bbn-bind']) {
      $_tmp1 = $_sr(node.attr['bbn-bind'].hash, node.attr['bbn-bind'].exp, hashName) || bbn.fn.createObject();
      if (!$_go && ($_gs(node.attr['bbn-bind'].hash, hashName) !== "OK")) {
        $_go = true;
      }
      $_tmp2 = bbn.fn.createObject();
      for (let n in node.attr) {
        if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
          continue;
        }

        if (node.attr[n].exp) {
          $_tmp2[n] = $_sr(node.attr[n].hash, node.attr[n].exp, hashName);
        }
        else {
          $_tmp2[n] = bbn.fn.escapeSquotes(node.attr[n].value);
        }
      }
      bbn.fn.each(bbn.fn.unique(Object.keys($_tmp1).concat(Object.keys($_tmp2))), n => {
        let val = $_tmp2[n] === undefined ? $_tmp1?.[n] : $_tmp2[n];
        if (val === undefined) {
          return;
        }
        if (n === 'class') {
          $_props[n] = bbn.cp.convertClasses(val);
        }
        else if (n === 'style') {
          $_props[n] = bbn.cp.convertStyles(val);
        }
        else {
          $_props[n] = val;
        }
        if (!$_go && $_node.attr[n] && !Object.hasOwn($_node.attr[n], 'value') && $_node.attr[n].hash && ($_gs($_node.attr[n].hash, hashName) !== "OK")) {
          $_go = true;
        }
      });
      //bbn.fn.log(["PROPS", $_props, $_tmp1, $_tmp2, bbn.fn.unique(Object.keys($_tmp1).concat(Object.keys($_tmp2)))]);
    }
    // Simpler version
    else {
      for (let n in node.attr) {
        if (['bbn-bind', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else', 'bbn-forget'].includes(n)) {
          continue;
        }

        if (node.attr[n].exp) {
          $_tmp1 = $_sr(node.attr[n].hash, node.attr[n].exp, hashName);
          if ($_tmp1 !== undefined) {
            if (n === 'class') {
              $_props[n] = bbn.cp.convertClasses($_tmp1);
            }
            else if (n === 'style') {
              $_props[n] = bbn.cp.convertStyles($_tmp1);
            }
            else {
              $_props[n] = $_tmp1;
            }
          }
          if (!$_go && $_node.attr[n] && !Object.hasOwn($_node.attr[n], 'value') && $_node.attr[n].hash && ($_gs($_node.attr[n].hash, hashName) !== "OK")) {
            $_go = true;
          }
        }
        else {
          $_props[n] = bbn.fn.escapeSquotes(node.attr[n].value);
        }
      }

    }
  }
};
