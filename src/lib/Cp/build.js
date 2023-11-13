import bbn from "@bbn/bbn";
import bbnCp from "../Cp.js";

const setEvents = function(cp, ele, events) {
  bbn.fn.iterate(cp.$tpl[ele.bbnId].events, (ev, n) => {
    if (!$_items['-'].bbnSchema?.events?.[n]) {
      //bbn.fn.log("SETTING EVENT n ON " + $_this.$options.name, _ele, $_anew);
      $_items['-'].addEventListener(n, _bbnEventObject => {
        //  bbn.fn.log("EXECUTING EVENT n ev.exp ON node.tag", _bbnEventObject.detail);
        if (ev.modifiers.length) {
          if (!_bbnEventObject.key || !JSON.stringify(ev.modifiers).includes(_bbnEventObject.key.toLowerCase())) {
            return;
          }
        }

        let $event = _bbnEventObject;

        if (ev.prevent) {
          $event.preventDefault();
        }

        if (ev.stop) {
          $event.stopImmediatePropagation();
        }

        if (ev.exp) {
          if ((ev.exp.indexOf(';') > -1) || (ev.exp.indexOf('if') === 0)) {
            ev.exp;
          }
          else {
            let $_action = (ev.exp);
            if (bbn.fn.isFunction($_action)) {
              const args = _bbnEventObject.detail?.args || [$event];
              args.push(_bbnEventObject);
              $_action.bind($_this.$origin)(...args);
            }
          }

          bbn.fn.iterate($_data, ($_val, $_idx) => {
            //    bbn.fn.log(['$_val, $_idx', $_val, $_idx, eval($_idx), $_this[$_idx], '++++']);
            if ($_val !== eval($_idx)) {
              if ($_this[$_idx] !== undefined) {
                $_this[$_idx] = eval($_idx);
              }
              $_data[$_idx] = $_this[$_idx];
            }
          });
        }

        //  $_this.$forceUpdate();
        let eventEnd = '}';
        if (ev.once || ev.passive || ev.capture) {
          eventEnd += ', {';
          if (ev.once) {
            eventEnd += `once: true, `;
          }

          if (ev.passive) {
            eventEnd += `passive: true, `;
          }

          if (ev.capture) {
            eventEnd += `capture: true, `;
          }

          eventEnd += '}';
        }

        eventEnd += ');';
      })
    }
  })

}

/**
 * Deletes the given property from the given object using static method
 * @param {*} obj 
 * @param {*} prop 
 * @returns 
 */
bbnCp.prototype.$build = function (obj, parent, data) {
  // If obj is the component's root updating the element based on schema and template
  if (obj.id === '0') {

  }
  // Otherwise update should rely on attr
  else {

  }

  const items = [];
  // Taking care of children
  // Checking out the conditions in the children
  // Checking out forget
  // Checking out loop
  // Finding existing element
  // Updating existing element
  // Or creating a new one


}