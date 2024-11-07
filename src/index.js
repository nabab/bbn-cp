import {bbn, axios, dayjs} from "@bbn/bbn";
import bbnData from "./lib/Data/Data.js";
import "./lib/Data/prototype/addComponent.js";
import "./lib/Data/prototype/fixIndexes.js";
import "./lib/Data/prototype/getImpacted.js";
import "./lib/Data/prototype/hasComponent.js";
import "./lib/Data/prototype/hasParent.js";
import "./lib/Data/prototype/isSame.js";
import "./lib/Data/prototype/prepareUpdate.js";
import "./lib/Data/prototype/removeComponent.js";
import "./lib/Data/prototype/setData.js";
import "./lib/Data/prototype/unset.js";
import "./lib/Data/static/addSequence.js";
import "./lib/Data/static/getObject.js";
import "./lib/Data/static/getValue.js";
import "./lib/Data/static/hash.js";
import "./lib/Data/static/immunizeValue.js";
import "./lib/Data/static/proxy.js";
import "./lib/Data/static/proxyPop.js";
import "./lib/Data/static/proxyPush.js";
import "./lib/Data/static/proxyReverse.js";
import "./lib/Data/static/proxyShift.js";
import "./lib/Data/static/proxySort.js";
import "./lib/Data/static/proxySplice.js";
import "./lib/Data/static/proxyUnshift.js";
import "./lib/Data/static/startWatching.js";
import "./lib/Data/static/stopWatching.js";
import "./lib/Data/static/treatValue.js";
import bbnNode from "./lib/Node/Node.js";
import "./lib/Node/prototype/build.js";
import "./lib/Node/prototype/conceive.js";
import "./lib/Node/prototype/define.js";
import "./lib/Node/prototype/init.js";
import "./lib/Node/prototype/insert.js";
import "./lib/Node/prototype/setAll.js";
import "./lib/Node/prototype/update.js";
import bbnComponentNode from "./lib/Node/Component.js";
import bbnInternalNode from "./lib/Node/Internal.js";
import bbnSlotNode from "./lib/Node/Slot.js";
import bbnTemplateNode from "./lib/Node/Template.js";
import bbnTextNode from "./lib/Node/Text.js";
import bbnTransitionNode from "./lib/Node/Transition.js";
import bbnAttr from "./lib/Attr/Attr.js";
import "./lib/Attr/prototype/retrieveArgument.js";
import "./lib/Attr/prototype/exec.js";
import "./lib/Attr/prototype/getState.js";
import "./lib/Attr/prototype/getValue.js";
import "./lib/Attr/prototype/setResult.js";
import "./lib/Attr/prototype/set.js";
import "./lib/Attr/prototype/update.js";
import bbnBindAttr from "./lib/Attr/Bind.js";
import bbnClassAttr from "./lib/Attr/Class.js";
import bbnConditionAttr from "./lib/Attr/Condition.js";
import bbnContentAttr from "./lib/Attr/Content.js";
import bbnDirectiveAttr from "./lib/Attr/Directive.js";
import bbnEventAttr from "./lib/Attr/Event.js";
import bbnForgetAttr from "./lib/Attr/Forget.js";
import bbnHtmlAttr from "./lib/Attr/Html.js";
import bbnIsAttr from "./lib/Attr/Is.js";
import bbnLoopAttr from "./lib/Attr/Loop.js";
import bbnModelAttr from "./lib/Attr/Model.js";
import bbnPreAttr from "./lib/Attr/Pre.js";
import bbnRefAttr from "./lib/Attr/Ref.js";
import bbnShowAttr from "./lib/Attr/Show.js";
import bbnSlotAttr from "./lib/Attr/Slot.js";
import bbnStyleAttr from "./lib/Attr/Style.js";
import bbnTextAttr from "./lib/Attr/Text.js";
import bbnHtml from "./lib/Html/Html.js";
import bbnAnonHtml from "./lib/Html/Anon.js";
import bbnButtonHtml from "./lib/Html/Button.js";
import bbnCellHtml from "./lib/Html/Cell.js";
import bbnDivHtml from "./lib/Html/Div.js";
import bbnElementHtml from "./lib/Html/Element.js";
import bbnFormHtml from "./lib/Html/Form.js";
import bbnListHtml from "./lib/Html/List.js";
import bbnRowHtml from "./lib/Html/Row.js";
import bbnSpanHtml from "./lib/Html/Span.js";
import bbnCp from "./lib/Cp/Cp.js";
import bbnComputed from "./lib/Computed/Computed.js";
import bbnParser from "./lib/Parser/Parser.js";
import bbnWatcher from "./lib/Watcher/Watcher.js";
import bbnAnonCp from "./lib/Cp/Anon.js";
import "./lib/Cp/prototype/connected.js";
import "./lib/Cp/prototype/delete.js";
import "./lib/Cp/prototype/destroy.js";
import "./lib/Cp/prototype/emit.js";
import "./lib/Cp/prototype/forceUpdate.js";
import "./lib/Cp/prototype/get.js";
import "./lib/Cp/prototype/has.js";
import "./lib/Cp/prototype/is.js";
import "./lib/Cp/prototype/isComponent.js";
import "./lib/Cp/prototype/nextTick.js";
import "./lib/Cp/prototype/off.js";
import "./lib/Cp/prototype/on.js";
import "./lib/Cp/prototype/once.js";
import "./lib/Cp/prototype/retrieveComponent.js";
import "./lib/Cp/prototype/retrieveElement.js";
import "./lib/Cp/prototype/retrieveNode.js";
import "./lib/Cp/prototype/set.js";
import "./lib/Cp/prototype/tick.js";
import "./lib/Cp/prototype/treatValue.js";
import "./lib/Cp/prototype/watch.js";
import "./cp.js";

customElements.define('bbn-anon', bbnAnonHtml);

export {
  axios,
  dayjs,
  bbn,
  bbnHtml,
  bbnAnonHtml,
  bbnButtonHtml,
  bbnCellHtml,
  bbnDivHtml,
  bbnElementHtml,
  bbnFormHtml,
  bbnListHtml,
  bbnRowHtml,
  bbnSpanHtml,
  bbnNode,
  bbnComponentNode,
  bbnInternalNode,
  bbnSlotNode,
  bbnTemplateNode,
  bbnTextNode,
  bbnTransitionNode,
  bbnAttr,
  bbnBindAttr,
  bbnClassAttr,
  bbnConditionAttr,
  bbnContentAttr,
  bbnDirectiveAttr,
  bbnEventAttr,
  bbnForgetAttr,
  bbnHtmlAttr,
  bbnIsAttr,
  bbnLoopAttr,
  bbnModelAttr,
  bbnPreAttr,
  bbnRefAttr,
  bbnShowAttr,
  bbnSlotAttr,
  bbnStyleAttr,
  bbnTextAttr,
  bbnAnonCp,
  bbnData,
  bbnCp,
  bbnComputed,
  bbnParser,
  bbnWatcher
};
