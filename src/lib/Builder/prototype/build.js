import bbnBuilder from "./Builder.js";
import removeDOM from "../Cp/private/removeDOM.js";

/**
 * Recursive function that takes an array of objects representing nodes in an 
 * HTML-like structure and generates JavaScript code based on those nodes. 
 * 
 * @param {Array} arr the nodes array
 * @param {String} varName variable name that is used to reference the data object that corresponds to the current node
 * @param {Number} sp number of spaces to use for indentation in the generated code
 * @param {Array} done array that keeps track of variables that have already been defined to avoid re-definition
 * @returns {String}
 */
bbnBuilder.prototype.build = function(node, cp) {
  if (node.id === '0') {
    // Setting the state of each element in $expResults to TMP except DEL state, which remains
    bbn.fn.iterate(cp.$expResults, a => {
      bbn.fn.iterate(a, b => {
        if (b.state !== 'DEL') {
          b.state = 'TMP';
        }
      });
    });
    node = this.root();
  }
  
  const oldCp = cp.$retrieveElement(node.id, hashName);
  let go = !oldCp;
  let $_items = false;

  if (node.forget?.exp) {
    this.sr(node.forget.hash, node.forget.exp, hashName);
    if (getExpValue($_this, node.forget.hash, hashName)) {
      $_go = false;
    }
    else if (['NEW', 'MOD'].includes(getExpState($_this, node.forget.hash, hashName))) {
      $_go = true;
    }
  }

  let treatEle = true;
  if ((!node.pre && (node.tag === 'template'))
    || ('transition' === node.tag)
  ) {
    $_go = false;
    treatEle = false;
  }
  else {
    if (!$_go) {
      $_go = true;
    }
  }
  //bbn.fn.log(["nodesToFunction", node.tag || 'no', $_go]);

  if ($_go) {
    x.msp();
    if ($_old) {
      $_old.bbnSchema = $_node;
    }
    else {
      $_node.bbnSchema = $_node;
    }

    if (node.text) {
      treatText(node, hashName);
    }
    else if (node.tag === 'slot') {
      treatSlot(cp, node, hashName);
    }
    else if (node.tag) {
      setProperties(node, hashName);
      //c.text += setDirectives(node, hashName);
      if (treatEle) {
        treatElement(cp, node, hashName);
      }

      if (node.forget?.exp) {
        if (getExpState($_this, node.forget.hash, hashName) === 'MOD') {
          if ($_fgtn[node.id]?.[hashName || '$_root']) {
            if ($_old) {
              $_old.childNodes.forEach(o => {
                $_par.at(-1).appendChild(o);
              });
              //      bbn.fn.log("From here");
              removeDOM($_this, $_old);
            }
            // Ele is the current parent
            $_items[node.id] = $_par.at(-1);
          }
          else {
            $_par.at(-1).childNodes.forEach(o => {
              if (o.bbnId.indexOf(node.id + "-") === 0) {
                $_items[node.id].appendChild(o);
              }
            });
          }
        }
        else if ($_fgtn[node.id]?.[hashName || '$_root']) {
          $_items[node.id] = $_par.at(-1);
        }
      }

      if (node.pre) {
        if ($_items[node.id]) {
          $_items[node.id].innerHTML = `${bbn.fn.escapeTicks(node.pre)}`;
        }
      }
    }
    if ($_items[node.id] && ($_items[node.id] !== $_this.$el)) {
      if ($_this.$el === $_par.at(-1)) {
        $_num['-']++;
      }
      if (!$_num[$_par.at(-1).bbnId]) {
        $_num[$_par.at(-1).bbnId] = 0;
      }
      $_num[$_par.at(-1).bbnId]++;
    }
  }

  if ($_items) {
    treatItems(cp, node, hashName);
  }








  //nodesToFunction(cp, node.items, hashName);
  
  let conditions = [];
  let conditionId = null;
  bbn.fn.each(arr, (node, i) => {

    // Taking care of the node node.tag || 'with no tag' node.id
    if (node.loop?.exp) {
      treatLoop(cp, node, hashName);
      return;
    }

    // Launching condition (MUST be before the rest)
    if (node.condition) {
      if ((node.conditionId !== conditionId) && !conditions.includes(node.conditionId)) {
        conditions.push(node.conditionId);
        conditionId = node.conditionId;
        this.condition(node, arr, hashName);
      }

      let condText = (node.condition.type === 'elseif' ? 'else if' : node.condition.type);
      if (node.condition.type !== 'else') {
        condText += ' (getExpValue($_this, "' + node.condition.hash + '", ' + hashName + '))';
      }
      // New level
      condText += ' {';
      x(condText);
      x.msp();
    }


  });
};
