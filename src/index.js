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
import "./lib/Cp/connected.js";
import "./lib/Cp/delete.js";
import "./lib/Cp/destroy.js";
import "./lib/Cp/emit.js";
import "./lib/Cp/forceUpdate.js";
import "./lib/Cp/get.js";
import "./lib/Cp/has.js";
import "./lib/Cp/is.js";
import "./lib/Cp/isComponent.js";
import "./lib/Cp/nextTick.js";
import "./lib/Cp/off.js";
import "./lib/Cp/on.js";
import "./lib/Cp/once.js";
import "./lib/Cp/retrieveComponent.js";
import "./lib/Cp/retrieveElement.js";
import "./lib/Cp/set.js";
import "./lib/Cp/tick.js";
import "./lib/Cp/treatValue.js";
import "./lib/Cp/watch.js";

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
