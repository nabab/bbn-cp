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

const components = [
    "appui",
    "audio",
    "autocomplete",
    "big-search",
    "block-list",
    "breadcrumb",
    //"browser",
    "button",
    "calendar",
    //"chart",
    "chat",
    "checkbox",
    "clipboard",
    "cms-block",
    //"code",
    //"colorpicker",
    "combo",
    "container",
    "context",
    "countdown",
    "cursor",
    "dashboard",
    "datepicker",
    "datetimepicker",
    "dropdown",
    "editable",
    //"editable-content",
    //"emoji",
    "field",
    //"file",
    "filter",
    "finder",
    "fisheye",
    //"flag",
    "floater",
    "form",
    "frame",
    "gallery",
    "grid-configuration",
    "icon",
    "icon-svg",
    "iconpicker",
    //"image-editor",
    "initial",
    "inline-editor",
    "input",
    //"json-editor",
    "kanban",
    "kanban-element",
    "key",
    //"keyboard",
    "keyvalue",
    "list",
    "list-input",
    "loadbar",
    "loader",
    "loadicon",
    "login",
    //"map",
    //"markdown",
    "masked",
    //"masonry",
    "menu",
    "mini-search",
    "multi-input",
    "multipart",
    "multiselect",
    "notification",
    "numeric",
    "pager",
    "pane",
    "panelbar",
    //"phone",
    "popup",
    "progressbar",
    "radio",
    "radiobuttons",
    "range",
    "router",
    "router-config",
    "router-group",
    "rte",
    "scroll",
    "search",
    "slider",
    "slider-menu",
    "slideshow",
    "splashscreen",
    "split-tabs",
    "splitter",
    "stack",
    "stream-search",
    "switch",
    "table",
    "table-cell",
    "table-cell-buttons",
    "table-cell-editor",
    "table-cell-expander",
    "table-cell-menu",
    "table-cell-selector",
    "table-dots",
    "table-head-title",
    "table-head-group",
    "table-row",
    "table-row-aggregate",
    "table-row-footer",
    "table-row-full",
    "table-row-group",
    "tabs",
    //"terminal",
    "textarea",
    "timepicker",
    "timer",
    "timewheel",
    "toolbar",
    "tooltip",
    "tracks",
    "tree",
    "tree-input",
    "treedown",
    "treemenu",
    "upload",
    "values",
    "video",
    "vlist",
    "wheel",
    "widget",
    "window",
];

/*
import Appui from "./components/appui/index.js";
import Audio from "./components/audio/index.js";
import Autocomplete from "./components/autocomplete/index.js";
import BigSearch from "./components/big-search/index.js";
import BlockList from "./components/block-list/index.js";
import Breadcrumb from "./components/breadcrumb/index.js";
import Button from "./components/button/index.js";
import Calendar from "./components/calendar/index.js";
import Chat from "./components/chat/index.js";
import Checkbox from "./components/checkbox/index.js";
import Clipboard from "./components/clipboard/index.js";
import CmsBlock from "./components/cms-block/index.js";
import Combo from "./components/combo/index.js";
import Container from "./components/container/index.js";
import Context from "./components/context/index.js";
import Countdown from "./components/countdown/index.js";
import Cursor from "./components/cursor/index.js";
import Dashboard from "./components/dashboard/index.js";
import Datepicker from "./components/datepicker/index.js";
import Datetimepicker from "./components/datetimepicker/index.js";
import Dropdown from "./components/dropdown/index.js";
import Editable from "./components/editable/index.js";
import Field from "./components/field/index.js";
import Filter from "./components/filter/index.js";
import Finder from "./components/finder/index.js";
import Fisheye from "./components/fisheye/index.js";
import Floater from "./components/floater/index.js";
import Form from "./components/form/index.js";
import Frame from "./components/frame/index.js";
import Gallery from "./components/gallery/index.js";
import GridConfiguration from "./components/grid-configuration/index.js";
import Icon from "./components/icon/index.js";
import Iconpicker from "./components/iconpicker/index.js";
import IconSvg from "./components/icon-svg/index.js";
import Initial from "./components/initial/index.js";
import InlineEditor from "./components/inline-editor/index.js";
import Input from "./components/input/index.js";
import Kanban from "./components/kanban/index.js";
import KanbanElement from "./components/kanban-element/index.js";
import Key from "./components/key/index.js";
import Keyvalue from "./components/keyvalue/index.js";
import List from "./components/list/index.js";
import ListInput from "./components/list-input/index.js";
import Loadbar from "./components/loadbar/index.js";
import Loader from "./components/loader/index.js";
import Loadicon from "./components/loadicon/index.js";
import Login from "./components/login/index.js";
import Masked from "./components/masked/index.js";
import Menu from "./components/menu/index.js";
import MiniSearch from "./components/mini-search/index.js";
import MultiInput from "./components/multi-input/index.js";
import Multipart from "./components/multipart/index.js";
import Multiselect from "./components/multiselect/index.js";
import Notification from "./components/notification/index.js";
import Numeric from "./components/numeric/index.js";
import Pager from "./components/pager/index.js";
import Pane from "./components/pane/index.js";
import Panelbar from "./components/panelbar/index.js";
import Popup from "./components/popup/index.js";
import Progressbar from "./components/progressbar/index.js";
import Radio from "./components/radio/index.js";
import Radiobuttons from "./components/radiobuttons/index.js";
import Range from "./components/range/index.js";
import Router from "./components/router/index.js";
import RouterConfig from "./components/router-config/index.js";
import RouterGroup from "./components/router-group/index.js";
import Rte from "./components/rte/index.js";
import Scroll from "./components/scroll/index.js";
import Search from "./components/search/index.js";
import Slider from "./components/slider/index.js";
import SliderMenu from "./components/slider-menu/index.js";
import Slideshow from "./components/slideshow/index.js";
import Splashscreen from "./components/splashscreen/index.js";
import SplitTabs from "./components/split-tabs/index.js";
import Splitter from "./components/splitter/index.js";
import Stack from "./components/stack/index.js";
import StreamSearch from "./components/stream-search/index.js";
import Switch from "./components/switch/index.js";
import Table from "./components/table/index.js";
import TableCell from "./components/table-cell/index.js";
import TableCellAggregate from "./components/table-cell-aggregate/index.js";
import TableCellButtons from "./components/table-cell-buttons/index.js";
import TableCellEditor from "./components/table-cell-editor/index.js";
import TableCellExpander from "./components/table-cell-expander/index.js";
import TableCellMenu from "./components/table-cell-menu/index.js";
import TableCellSelector from "./components/table-cell-selector/index.js";
import TableHeadTitle from "./components/table-head-title/index.js";
import TableHeadGroup from "./components/table-head-group/index.js";
import TableDots from "./components/table-dots/index.js";
import TableRow from "./components/table-row/index.js";
import TableRowAggregate from "./components/table-row-aggregate/index.js";
import TableRowExpansion from "./components/table-row-expansion/index.js";
import TableRowFooter from "./components/table-row-footer/index.js";
import TableRowFull from "./components/table-row-full/index.js";
import TableRowGroup from "./components/table-row-group/index.js";
import Tabs from "./components/tabs/index.js";
import Textarea from "./components/textarea/index.js";
import Timepicker from "./components/timepicker/index.js";
import Timer from "./components/timer/index.js";
import Timewheel from "./components/timewheel/index.js";
import Toolbar from "./components/toolbar/index.js";
import Tooltip from "./components/tooltip/index.js";
import Tracks from "./components/tracks/index.js";
import Tree from "./components/tree/index.js";
import TreeInput from "./components/tree-input/index.js";
import Treedown from "./components/treedown/index.js";
import Treemenu from "./components/treemenu/index.js";
import Upload from "./components/upload/index.js";
import Values from "./components/values/index.js";
import Video from "./components/video/index.js";
import Vlist from "./components/vlist/index.js";
import Wheel from "./components/wheel/index.js";
import Widget from "./components/widget/index.js";
import Window from "./components/window/index.js";


bbn.cp.preCompiled = [
  Appui,
  Audio,
  Autocomplete,
  BigSearch,
  BlockList,
  Breadcrumb,
  Button,
  Calendar,
  Chat,
  Checkbox,
  Clipboard,
  CmsBlock,
  Combo,
  Container,
  Context,
  Countdown,
  Cursor,
  Dashboard,
  Datepicker,
  Datetimepicker,
  Dropdown,
  Editable,
  Field,
  Filter,
  Finder,
  Fisheye,
  Floater,
  Form,
  Frame,
  Gallery,
  GridConfiguration,
  Icon,
  Iconpicker,
  IconSvg,
  Initial,
  InlineEditor,
  Input,
  Kanban,
  KanbanElement,
  Key,
  Keyvalue,
  List,
  ListInput,
  Loadbar,
  Loader,
  Loadicon,
  Login,
  Masked,
  Menu,
  MiniSearch,
  MultiInput,
  Multipart,
  Multiselect,
  Notification,
  Numeric,
  Pager,
  Pane,
  Panelbar,
  Popup,
  Progressbar,
  Radio,
  Radiobuttons,
  Range,
  Router,
  RouterConfig,
  RouterGroup,
  Rte,
  Scroll,
  Search,
  Slider,
  SliderMenu,
  Slideshow,
  Splashscreen,
  SplitTabs,
  Splitter,
  Stack,
  StreamSearch,
  Switch,
  Table,
  TableCell,
  TableCellAggregate,
  TableCellButtons,  
  TableCellEditor,
  TableCellExpander,
  TableCellMenu,
  TableCellSelector,
  TableHeadTitle,
  TableHeadGroup,
  TableDots,
  TableRow,
  TableRowAggregate,
  TableRowExpansion,
  TableRowFooter,
  TableRowFull,
  TableRowGroup,
  Tabs,
  Textarea,
  Timepicker,
  Timer,
  Timewheel,
  Toolbar,
  Tooltip,
  Tracks,
  Tree,
  TreeInput,
  Treedown,
  Treemenu,
  Upload,
  Values,
  Video,
  Vlist,
  Wheel,
  Widget,
  Window
];
*/
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
