import {bbn, axios, dayjs} from "@bbn/bbn";
import bbnData from "./lib/Data/Data.js";
import "./lib/Data/prototype/addComponent.js";
import "./lib/Data/prototype/getImpacted.js";
import "./lib/Data/prototype/hasComponent.js";
import "./lib/Data/prototype/isSame.js";
import "./lib/Data/prototype/removeComponent.js";
import "./lib/Data/prototype/unset.js";
import "./lib/Data/prototype/update.js";
import "./lib/Data/prototype/updateChildren.js";
import "./lib/Data/static/getObject.js";
import "./lib/Data/static/getValue.js";
import "./lib/Data/static/immunizeValue.js";
import "./lib/Data/static/proxy.js";
import "./lib/Data/static/proxyPop.js";
import "./lib/Data/static/proxyPush.js";
import "./lib/Data/static/proxyReverse.js";
import "./lib/Data/static/proxyShift.js";
import "./lib/Data/static/proxySort.js";
import "./lib/Data/static/proxySplice.js";
import "./lib/Data/static/proxyUnshift.js";
import "./lib/Data/static/treatValue.js";
import bbnHTML from "./lib/Html.js";
import bbnButtonHTML from "./lib/Button.js";
import bbnCellHTML from "./lib/Cell.js";
import bbnElementHTML from "./lib/Element.js";
import bbnFormHTML from "./lib/Form.js";
import bbnListHTML from "./lib/List.js";
import bbnRowHTML from "./lib/Row.js";
import bbnCp from "./lib/Cp/Cp.js";
import "./lib/Cp/prototype/connected.js";
import "./lib/Cp/prototype/delete.js";
import "./lib/Cp/prototype/destroy.js";
import "./lib/Cp/prototype/emit.js";
import "./lib/Cp/prototype/forceUpdate.js";
import "./lib/Cp/prototype/get.js";
import "./lib/Cp/prototype/has.js";
import "./lib/Cp/prototype/insertElement.js";
import "./lib/Cp/prototype/is.js";
import "./lib/Cp/prototype/isComponent.js";
import "./lib/Cp/prototype/nextTick.js";
import "./lib/Cp/prototype/off.js";
import "./lib/Cp/prototype/on.js";
import "./lib/Cp/prototype/once.js";
import "./lib/Cp/prototype/retrieveComponent.js";
import "./lib/Cp/prototype/retrieveElement.js";
import "./lib/Cp/prototype/set.js";
import "./lib/Cp/prototype/tick.js";
import "./lib/Cp/prototype/treatValue.js";
import "./lib/Cp/prototype/watch.js";
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
