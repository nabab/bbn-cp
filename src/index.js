import {bbn, axios, dayjs} from "@bbn/bbn";
import bbnData from "./lib/Data.js";
import bbnNode from "./lib/Node.js";
import bbnComponentNode from "./lib/Node/Component.js";
import bbnInternalNode from "./lib/Node/Internal.js";
import bbnSlotNode from "./lib/Node/Slot.js";
import bbnTemplateNode from "./lib/Node/Template.js";
import bbnTextNode from "./lib/Node/Text.js";
import bbnAttr from "./lib/Attr.js";
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
import bbnTransitionAttr from "./lib/Attr/Transition.js";
import bbnProtoHtml from "./lib/ProtoHtml.js";
import bbnHtml from "./lib/Html/Html.js";
import bbnAnonHtml from "./lib/Html/Anon.js";
import bbnComputed from "./lib/Computed.js";
import bbnParser from "./lib/Parser.js";
import bbnWatcher from "./lib/Watcher.js";
import "./cp.js";

customElements.define('bbn-anon', bbnAnonHtml);

export {
  axios,
  dayjs,
  bbn,
  bbnHtml,
  bbnProtoHtml,
  bbnAnonHtml,
  bbnNode,
  bbnComponentNode,
  bbnInternalNode,
  bbnSlotNode,
  bbnTemplateNode,
  bbnTextNode,
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
  bbnTransitionAttr,
  bbnData,
  bbnComputed,
  bbnParser,
  bbnWatcher
};
