import {bbn, axios, dayjs} from "@bbn/bbn";

import bbnData from "./lib/Data.js";
import "./lib/Data/addComponent.js";
import "./lib/Data/getImpacted.js";
import "./lib/Data/getObject.js";
import "./lib/Data/getValue.js";
import "./lib/Data/hasComponent.js";
import "./lib/Data/immunizeValue.js";
import "./lib/Data/isSame.js";
import "./lib/Data/proxy.js";
import "./lib/Data/proxyPop.js";
import "./lib/Data/proxyPush.js";
import "./lib/Data/proxyReverse.js";
import "./lib/Data/proxyShift.js";
import "./lib/Data/proxySort.js";
import "./lib/Data/proxySplice.js";
import "./lib/Data/proxyUnshift.js";
import "./lib/Data/removeComponent.js";
import "./lib/Data/treatValue.js";
import "./lib/Data/unset.js";
import "./lib/Data/update.js";
import "./lib/Data/updateChildren.js";

import bbnHTML from "./lib/Html.js";
import bbnButtonHTML from "./lib/Button.js";
import bbnCellHTML from "./lib/Cell.js";
import bbnElementHTML from "./lib/Element.js";
import bbnFormHTML from "./lib/Form.js";
import bbnListHTML from "./lib/List.js";
import bbnRowHTML from "./lib/Row.js";

import bbnCp from "./lib/Cp.js";
import "./lib/Cp/addNamespace.js";
import "./lib/Cp/addToElements.js";
import "./lib/Cp/addUnknownComponent.js";
import "./lib/Cp/attributeChange.js";
import "./lib/Cp/checkPropValue.js";
import "./lib/Cp/connectedCallback.js";
import "./lib/Cp/createElement.js";
import "./lib/Cp/createText.js";
import "./lib/Cp/delete.js";
import "./lib/Cp/destroy.js";
import "./lib/Cp/disconnectedCallback.js";
import "./lib/Cp/emit.js";
import "./lib/Cp/fetchComponents.js";
import "./lib/Cp/forceUpdate.js";
import "./lib/Cp/get.js";
import "./lib/Cp/getProp.js";
import "./lib/Cp/has.js";
import "./lib/Cp/init.js";
import "./lib/Cp/insertElement.js";
import "./lib/Cp/is.js";
import "./lib/Cp/isComponent.js";
import "./lib/Cp/makeReactive.js";
import "./lib/Cp/nextTick.js";
import "./lib/Cp/off.js";
import "./lib/Cp/on.js";
import "./lib/Cp/once.js";
import "./lib/Cp/onHook.js";
import "./lib/Cp/realSetProp.js";
import "./lib/Cp/registerChild.js";
import "./lib/Cp/removeDOM.js";
import "./lib/Cp/removeFromElements.js";
import "./lib/Cp/retrieveComponent.js";
import "./lib/Cp/retrieveElement.js";
import "./lib/Cp/retrieveLoopObject.js";
import "./lib/Cp/set.js";
import "./lib/Cp/setData.js";
import "./lib/Cp/setProp.js";
import "./lib/Cp/setRef.js";
import "./lib/Cp/setUpData.js";
import "./lib/Cp/setUpProp.js";
import "./lib/Cp/tick.js";
import "./lib/Cp/treatValue.js";
import "./lib/Cp/unregisterChild.js";
import "./lib/Cp/updateComponent.js";
import "./lib/Cp/updateComputed.js";
import "./lib/Cp/updateData.js";
import "./lib/Cp/updateElementFromProps.js";
import "./lib/Cp/updateFromSchema.js";
import "./lib/Cp/updateProps.js";
import "./lib/Cp/updateWatcher.js";
import "./lib/Cp/watch.js";
import "./lib/Cp/_getInternalState.js";
import "./lib/Cp/_getInternalValue.js";
import "./lib/Cp/_setInternalResult.js";

import bbnBuilder from "./lib/Builder.js";
import "./lib/Builder/build.js";
import "./lib/Builder/condition.js";
import "./lib/Builder/element.js";
import "./lib/Builder/environment.js";
import "./lib/Builder/items.js";
import "./lib/Builder/loop.js";
import "./lib/Builder/props.js";
import "./lib/Builder/root.js";
import "./lib/Builder/slot.js";
import "./lib/Builder/text.js";

import bbnAnonCp from "./lib/AnonCp.js";
import bbnAnon from "./lib/Anon.js";

import "./cp.js";

customElements.define('bbn-anon', bbnAnon);

export {
  axios,
  dayjs,
  bbn,
  bbnHTML,
  bbnAnon,
  bbnBuilder,
  bbnButtonHTML,
  bbnCellHTML,
  bbnElementHTML,
  bbnFormHTML,
  bbnListHTML,
  bbnRowHTML,
  bbnAnonCp,
  bbnData,
  bbnCp
};
