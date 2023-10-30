import {bbn, axios, dayjs} from "@bbn/bbn";
import bbnData from "./classes/Data.js";
import bbnHTML from "./classes/Html.js";
import bbnButtonHTML from "./classes/Button.js";
import bbnCellHTML from "./classes/Cell.js";
import bbnElementHTML from "./classes/Element.js";
import bbnFormHTML from "./classes/Form.js";
import bbnListHTML from "./classes/List.js";
import bbnRowHTML from "./classes/Row.js";
import bbnCp from "./classes/Cp.js";
import bbnAnonCp from "./classes/AnonCp.js";
import bbnAnon from "./classes/Anon.js";
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
