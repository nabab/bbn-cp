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
import bbnBreakAttr from "./lib/Attr/Break.js";
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
import bbnOnceAttr from "./lib/Attr/Once.js";
import bbnPreAttr from "./lib/Attr/Pre.js";
import bbnRefAttr from "./lib/Attr/Ref.js";
import bbnShowAttr from "./lib/Attr/Show.js";
import bbnSlotAttr from "./lib/Attr/Slot.js";
import bbnStyleAttr from "./lib/Attr/Style.js";
import bbnTextAttr from "./lib/Attr/Text.js";
import bbnTransitionAttr from "./lib/Attr/Transition.js";
import bbnProtoHtml from "./lib/ProtoHtml.js";
import bbnOptions from "./lib/Options.js";
import bbnHtml from "./lib/Html/Html.js";
import bbnAnonHtml from "./lib/Html/Anon.js";
import bbnComputed from "./lib/Computed.js";
import bbnParser from "./lib/Parser.js";
import bbnWatcher from "./lib/Watcher.js";
import "./cp.js";

customElements.define('bbn-anon', bbnAnonHtml);

import bbnCpAppui from "./components/appui/appui.js";
import bbnCpAudio from "./components/audio/audio.js";
import bbnCpAutocomplete from "./components/autocomplete/autocomplete.js";
import bbnCpBigSearch from "./components/big-search/big-search.js";
import bbnCpBlockList from "./components/block-list/block-list.js";
import bbnCpBreadcrumb from "./components/breadcrumb/breadcrumb.js";
import bbnCpButton from "./components/button/button.js";
import bbnCpCalendar from "./components/calendar/calendar.js";
import bbnCpChat from "./components/chat/chat.js";
import bbnCpCheckbox from "./components/checkbox/checkbox.js";
import bbnCpClipboard from "./components/clipboard/clipboard.js";
import bbnCpCmsBlock from "./components/cms-block/cms-block.js";
import bbnCpCombo from "./components/combo/combo.js";
import bbnCpContainer from "./components/container/container.js";
import bbnCpContext from "./components/context/context.js";
import bbnCpCountdown from "./components/countdown/countdown.js";
import bbnCpCursor from "./components/cursor/cursor.js";
import bbnCpDashboard from "./components/dashboard/dashboard.js";
import bbnCpDatepicker from "./components/datepicker/datepicker.js";
import bbnCpDatetimepicker from "./components/datetimepicker/datetimepicker.js";
import bbnCpDropdown from "./components/dropdown/dropdown.js";
import bbnCpEditable from "./components/editable/editable.js";
import bbnCpField from "./components/field/field.js";
import bbnCpFilter from "./components/filter/filter.js";
import bbnCpFinder from "./components/finder/finder.js";
import bbnCpFisheye from "./components/fisheye/fisheye.js";
import bbnCpFloater from "./components/floater/floater.js";
import bbnCpForm from "./components/form/form.js";
import bbnCpFrame from "./components/frame/frame.js";
import bbnCpGallery from "./components/gallery/gallery.js";
import bbnCpGridConfiguration from "./components/grid-configuration/grid-configuration.js";
import bbnCpIcon from "./components/icon/icon.js";
import bbnCpIconpicker from "./components/iconpicker/iconpicker.js";
import bbnCpIconSvg from "./components/icon-svg/icon-svg.js";
import bbnCpInitial from "./components/initial/initial.js";
import bbnCpInlineEditor from "./components/inline-editor/inline-editor.js";
import bbnCpInput from "./components/input/input.js";
import bbnCpKanban from "./components/kanban/kanban.js";
import bbnCpKanbanElement from "./components/kanban-element/kanban-element.js";
import bbnCpKey from "./components/key/key.js";
import bbnCpKeyvalue from "./components/keyvalue/keyvalue.js";
import bbnCpList from "./components/list/list.js";
import bbnCpListInput from "./components/list-input/list-input.js";
import bbnCpLoadbar from "./components/loadbar/loadbar.js";
import bbnCpLoader from "./components/loader/loader.js";
import bbnCpLoadicon from "./components/loadicon/loadicon.js";
import bbnCpLogin from "./components/login/login.js";
import bbnCpMasked from "./components/masked/masked.js";
import bbnCpMenu from "./components/menu/menu.js";
import bbnCpMiniSearch from "./components/mini-search/mini-search.js";
import bbnCpMultiInput from "./components/multi-input/multi-input.js";
import bbnCpMultipart from "./components/multipart/multipart.js";
import bbnCpMultiselect from "./components/multiselect/multiselect.js";
import bbnCpNotification from "./components/notification/notification.js";
import bbnCpNumeric from "./components/numeric/numeric.js";
import bbnCpPager from "./components/pager/pager.js";
import bbnCpPane from "./components/pane/pane.js";
import bbnCpPanelbar from "./components/panelbar/panelbar.js";
import bbnCpPopup from "./components/popup/popup.js";
import bbnCpProgressbar from "./components/progressbar/progressbar.js";
import bbnCpRadio from "./components/radio/radio.js";
import bbnCpRadiobuttons from "./components/radiobuttons/radiobuttons.js";
import bbnCpRange from "./components/range/range.js";
import bbnCpRating from "./components/rating/rating.js";
import bbnCpRouter from "./components/router/router.js";
import bbnCpRouterConfig from "./components/router-config/router-config.js";
import bbnCpRouterGroup from "./components/router-group/router-group.js";
import bbnCpRte from "./components/rte/rte.js";
import bbnCpScroll from "./components/scroll/scroll.js";
import bbnCpScrollbar from "./components/scrollbar/scrollbar.js";
import bbnCpSearch from "./components/search/search.js";
import bbnCpSlider from "./components/slider/slider.js";
import bbnCpSliderMenu from "./components/slider-menu/slider-menu.js";
import bbnCpSlideshow from "./components/slideshow/slideshow.js";
import bbnCpSplashscreen from "./components/splashscreen/splashscreen.js";
import bbnCpSplitTabs from "./components/split-tabs/split-tabs.js";
import bbnCpSplitter from "./components/splitter/splitter.js";
import bbnCpStack from "./components/stack/stack.js";
import bbnCpStreamSearch from "./components/stream-search/stream-search.js";
import bbnCpSwitch from "./components/switch/switch.js";
import bbnCpTable from "./components/table/table.js";
import bbnCpTableCell from "./components/table-cell/table-cell.js";
import bbnCpTableCellAggregate from "./components/table-cell-aggregate/table-cell-aggregate.js";
import bbnCpTableCellButtons from "./components/table-cell-buttons/table-cell-buttons.js";
import bbnCpTableCellEditor from "./components/table-cell-editor/table-cell-editor.js";
import bbnCpTableCellExpander from "./components/table-cell-expander/table-cell-expander.js";
import bbnCpTableCellMenu from "./components/table-cell-menu/table-cell-menu.js";
import bbnCpTableCellSelector from "./components/table-cell-selector/table-cell-selector.js";
import bbnCpTableHeadTitle from "./components/table-head-title/table-head-title.js";
import bbnCpTableHeadGroup from "./components/table-head-group/table-head-group.js";
import bbnCpTableDots from "./components/table-dots/table-dots.js";
import bbnCpTableRow from "./components/table-row/table-row.js";
import bbnCpTableRowAggregate from "./components/table-row-aggregate/table-row-aggregate.js";
import bbnCpTableRowExpansion from "./components/table-row-expansion/table-row-expansion.js";
import bbnCpTableRowFooter from "./components/table-row-footer/table-row-footer.js";
import bbnCpTableRowFull from "./components/table-row-full/table-row-full.js";
import bbnCpTableRowGroup from "./components/table-row-group/table-row-group.js";
import bbnCpTabs from "./components/tabs/tabs.js";
import bbnCpTextarea from "./components/textarea/textarea.js";
import bbnCpTimepicker from "./components/timepicker/timepicker.js";
import bbnCpTimer from "./components/timer/timer.js";
import bbnCpTimewheel from "./components/timewheel/timewheel.js";
import bbnCpToolbar from "./components/toolbar/toolbar.js";
import bbnCpTooltip from "./components/tooltip/tooltip.js";
import bbnCpTracks from "./components/tracks/tracks.js";
import bbnCpTree from "./components/tree/tree.js";
import bbnCpTreeInput from "./components/tree-input/tree-input.js";
import bbnCpTreedown from "./components/treedown/treedown.js";
import bbnCpTreemenu from "./components/treemenu/treemenu.js";
import bbnCpUpload from "./components/upload/upload.js";
import bbnCpValues from "./components/values/values.js";
import bbnCpVideo from "./components/video/video.js";
import bbnCpVlist from "./components/vlist/vlist.js";
import bbnCpWheel from "./components/wheel/wheel.js";
import bbnCpWidget from "./components/widget/widget.js";
import bbnCpWindow from "./components/window/window.js";


bbn.cp.toDefine = [
  bbnCpAppui,
  bbnCpAudio,
  bbnCpAutocomplete,
  bbnCpBigSearch,
  bbnCpBlockList,
  bbnCpBreadcrumb,
  bbnCpButton,
  bbnCpCalendar,
  bbnCpChat,
  bbnCpCheckbox,
  bbnCpClipboard,
  bbnCpCmsBlock,
  bbnCpCombo,
  bbnCpContainer,
  bbnCpContext,
  bbnCpCountdown,
  bbnCpCursor,
  bbnCpDashboard,
  bbnCpDatepicker,
  bbnCpDatetimepicker,
  bbnCpDropdown,
  bbnCpEditable,
  bbnCpField,
  bbnCpFilter,
  bbnCpFinder,
  bbnCpFisheye,
  bbnCpFloater,
  bbnCpForm,
  bbnCpFrame,
  bbnCpGallery,
  bbnCpGridConfiguration,
  bbnCpIcon,
  bbnCpIconpicker,
  bbnCpIconSvg,
  bbnCpInitial,
  bbnCpInlineEditor,
  bbnCpInput,
  bbnCpKanban,
  bbnCpKanbanElement,
  bbnCpKey,
  bbnCpKeyvalue,
  bbnCpList,
  bbnCpListInput,
  bbnCpLoadbar,
  bbnCpLoader,
  bbnCpLoadicon,
  bbnCpLogin,
  bbnCpMasked,
  bbnCpMenu,
  bbnCpMiniSearch,
  bbnCpMultiInput,
  bbnCpMultipart,
  bbnCpMultiselect,
  bbnCpNotification,
  bbnCpNumeric,
  bbnCpPager,
  bbnCpPane,
  bbnCpPanelbar,
  bbnCpPopup,
  bbnCpProgressbar,
  bbnCpRadio,
  bbnCpRadiobuttons,
  bbnCpRange,
  bbnCpRating,
  bbnCpRouter,
  bbnCpRouterConfig,
  bbnCpRouterGroup,
  bbnCpRte,
  bbnCpScroll,
  bbnCpScrollbar,
  bbnCpSearch,
  bbnCpSlider,
  bbnCpSliderMenu,
  bbnCpSlideshow,
  bbnCpSplashscreen,
  bbnCpSplitTabs,
  bbnCpSplitter,
  bbnCpStack,
  bbnCpStreamSearch,
  bbnCpSwitch,
  bbnCpTable,
  bbnCpTableCell,
  bbnCpTableCellAggregate,
  bbnCpTableCellButtons,  
  bbnCpTableCellEditor,
  bbnCpTableCellExpander,
  bbnCpTableCellMenu,
  bbnCpTableCellSelector,
  bbnCpTableHeadTitle,
  bbnCpTableHeadGroup,
  bbnCpTableDots,
  bbnCpTableRow,
  bbnCpTableRowAggregate,
  bbnCpTableRowExpansion,
  bbnCpTableRowFooter,
  bbnCpTableRowFull,
  bbnCpTableRowGroup,
  bbnCpTabs,
  bbnCpTextarea,
  bbnCpTimepicker,
  bbnCpTimer,
  bbnCpTimewheel,
  bbnCpToolbar,
  bbnCpTooltip,
  bbnCpTracks,
  bbnCpTree,
  bbnCpTreeInput,
  bbnCpTreedown,
  bbnCpTreemenu,
  bbnCpUpload,
  bbnCpValues,
  bbnCpVideo,
  bbnCpVlist,
  bbnCpWheel,
  bbnCpWidget,
  bbnCpWindow
];

Object.assign(window, {
  axios,
  dayjs,
  bbn,
  bbnOptions,
  bbnHtml,
  bbnData,
  bbnComputed,
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
  bbnBreakAttr,
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
  bbnOnceAttr,
  bbnPreAttr,
  bbnRefAttr,
  bbnShowAttr,
  bbnSlotAttr,
  bbnStyleAttr,
  bbnTextAttr,
  bbnTransitionAttr,
  bbnParser,
  bbnWatcher
});

export {
  axios,
  dayjs,
  bbn,
  bbnOptions,
  bbnHtml,
  bbnData,
  bbnComputed,
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
  bbnBreakAttr,
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
  bbnOnceAttr,
  bbnPreAttr,
  bbnRefAttr,
  bbnShowAttr,
  bbnSlotAttr,
  bbnStyleAttr,
  bbnTextAttr,
  bbnTransitionAttr,
  bbnParser,
  bbnWatcher
};
