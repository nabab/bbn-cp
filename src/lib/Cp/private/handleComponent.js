import updateProps from "./updateProps.js";
import treatItems from "./treatItems.js";
import applySchemaOnComponent from "./applySchemaOnComponent.js";
import setExpResult from "./setExpResult.js";
import bbn from "@bbn/bbn";
import treatEvents from "./treatEvents.js";

/**
 * Handles the initialization and setup of the component by applying schemas, directives, events, and more.
 * 
 * @param {bbnCp} cp - The component instance being handled.
 */
export default async function handleComponent(cp) {
  // Starting chrono
  const t1 = (new Date()).getTime();
  // Setting last launch time only if we are updating the whole component
  cp.$lastLaunch = t1;
  /** @var Object The properties of the component */
  const internalProps = bbn.fn.createObject();
  /** @var Object The attributes of the root element */
  const attr = cp.$tpl[0]?.attr;

  // Loop through the attributes defined in the template.
  // They should only be HTML attributes they are not the props
  for (let n in attr) {
    // Evaluate the expression for the attribute or take its value directly.
    internalProps[n] = attr[n].exp ? setExpResult(cp, attr[n]) : attr[n].value;
  }

  for (let n in cp.$computed) {
    cp.$computed[n].update();
  }

  const t2 = (new Date()).getTime();

  // Handling directives.
  const directives = cp.$tpl[0]?.directives;
  if (directives) {
    for (let n in directives) {
      // Clone the directive from the template if not already present.
      if (!cp.$directives[n]) {
        cp.$directives[n] = bbn.fn.clone(cp.$tpl[0].directives[n]);
      }

      // Evaluate and set the value for the directive.
      if (directives[n].exp) {
        cp.$directives[n].value = setExpResult(cp, directives[n]);
      }

      // Ensure there's a bbnDirectives object on the element.
      if (!cp.$el.bbnDirectives) {
        Object.defineProperty(cp.$el, 'bbnDirectives', {
          value: bbn.fn.createObject(),
          writable: false,
          configurable: false
        });
      }

      // Create a directive object if not already present.
      if (!cp.$el.bbnDirectives[n]) {
        cp.$el.bbnDirectives[n] = bbn.fn.createObject();
      }
    }

    // Insert directives for the first build; update them on subsequent builds.
    if (!cp.$numBuild) {
      bbn.cp.insertDirectives(cp.$directives, cp.$el);
    }
    else {
      for (let n in directives) {
        bbn.cp.updateDirectives({[n]: cp.$directives[n]}, cp.$el);
      }
    }
  }

  const t3 = (new Date()).getTime();

  // Applying the schema on the component.
  applySchemaOnComponent(cp, internalProps);

  const t4 = (new Date()).getTime();
  // Setup event listeners if defined and it's the first build.
  if (cp.$tpl[0]?.events && !cp.$numBuild) {
    treatEvents(cp, cp.$el);
  }

  cp.$lastLaunch = (new Date()).getTime();
  /*
  if (cp.$lastLaunch - t1 > 1) {
    bbn.fn.log(
      "UPDATED COMPONENT " + cp.$options.name
      + ' / ' + cp.$cid
      + ' / ' + cp.$numBuild
      + ' /all ' + (cp.$lastLaunch - t1) + 'ms'
      + ' /attr ' + (t2 - t1) + 'ms'
      + ' /dir ' + (t3 - t2) + 'ms'
      + ' /schema ' + (t4 - t3) + 'ms'
      + ' /events ' + (cp.$lastLaunch - t4) + 'ms'
    );
  }
  */

  // Handle nested items within the component template.
  if (cp.$tpl[0]?.items) {
    await treatItems(cp, cp.$tpl[0].items, '', cp.$el);
  }
}
