import {bbn} from "@bbn/bbn";
import addPrefix from "./functions/addPrefix.js";
import addUrlAsPrefix from "./functions/addUrlAsPrefix.js";
import attributeChangedCallback from "./functions/attributeChangedCallback.js";
import convertClasses from "./functions/convertClasses.js";
import convertStyles from "./functions/convertStyles.js";
import createApp from "./functions/createApp.js";
import define from "./functions/define.js";
import executeQueueItem from "./functions/executeQueueItem.js";
import executeQueueItems from "./functions/executeQueueItems.js";
import executeTemplate from "./functions/executeTemplate.js";
import fetchComponents from "./functions/fetchComponents.js";
import getComponent from "./functions/getComponent.js";
import initDefaults from "./functions/initDefaults.js";
import insertDirectives from "./functions/insertDirectives.js";
import isComponent from "./functions/isComponent.js";
import isTag from "./functions/isTag.js";
import mapTemplate from "./functions/mapTemplate.js";
import normalizeComponent from "./functions/normalizeComponent.js";
import realDefineComponent from "./functions/realDefineComponent.js";
import setComputed from "./functions/setComputed.js";
import setDefaults from "./functions/setDefaults.js";
import startTick from "./functions/startTick.js";
import stopTick from "./functions/stopTick.js";
import updateDirectives from "./functions/updateDirectives.js";
import basic from "./mixins/basic.js";
import browserNotification from "./mixins/browserNotification.js";
import close from "./mixins/close.js";
import componentInside from "./mixins/componentInside.js";
import config from "./mixins/config.js";
import data from "./mixins/data.js";
import dataEditor from "./mixins/dataEditor.js";
import dimensions from "./mixins/dimensions.js";
import dropdown from "./mixins/dropdown.js";
import editableList from "./mixins/editableList.js";
import empty from "./mixins/empty.js";
import events from "./mixins/events.js";
import field from "./mixins/field.js";
import input from "./mixins/input.js";
import keepCool from "./mixins/keepCool.js";
import keynav from "./mixins/keynav.js";
import list from "./mixins/list.js";
import localStorage from "./mixins/localStorage.js";
import memory from "./mixins/memory.js";
import observer from "./mixins/observer.js";
import pageable from "./mixins/pageable.js";
import popup from "./mixins/popup.js";
import position from "./mixins/position.js";
import resizer from "./mixins/resizer.js";
import serviceWorker from "./mixins/serviceWorker.js";
import toggle from "./mixins/toggle.js";
import url from "./mixins/url.js";
import view from "./mixins/view.js";
import draggable from "./directives/draggable.js";
import droppable from "./directives/droppable.js";
import focused from "./directives/focused.js";
import portal from "./directives/portal.js";
import resizable from "./directives/resizable.js";

const possibleAttributes = [
  'is',
  'source',
  'ref',
  'slot',
  'id',
  'class',
  'style',
  'key'
];
/** Custom elements polyfill */
!function(){"use strict";var e=(e,t)=>{const n=e=>{for(let t=0,{length:n}=e;t<n;t++)o(e[t])},o=({target:e,attributeName:t,oldValue:n})=>{e.attributeChangedCallback(t,n,e.getAttribute(t))};return(r,l)=>{const{observedAttributes:s}=r.constructor;return s&&e(l).then((()=>{new t(n).observe(r,{attributes:!0,attributeOldValue:!0,attributeFilter:s});for(let e=0,{length:t}=s;e<t;e++)r.hasAttribute(s[e])&&o({target:r,attributeName:s[e],oldValue:null})})),r}};
/*! (c) Andrea Giammarchi - ISC */const t=!0,n=!1,o="querySelectorAll",r="querySelectorAll",{document:l,Element:s,MutationObserver:c,Set:a,WeakMap:i}=self,u=e=>r in e,{filter:f}=[];var h=e=>{const h=new i,d=(t,n)=>{let o;if(n)for(let r,l=(e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector)(t),s=0,{length:c}=p;s<c;s++)l.call(t,r=p[s])&&(h.has(t)||h.set(t,new a),o=h.get(t),o.has(r)||(o.add(r),e.handle(t,n,r)));else h.has(t)&&(o=h.get(t),h.delete(t),o.forEach((o=>{e.handle(t,n,o)})))},g=(e,t=!0)=>{for(let n=0,{length:o}=e;n<o;n++)d(e[n],t)},{query:p}=e,m=e.root||l,y=((e,r=document,l=MutationObserver,s=["*"])=>{const c=(n,r,l,s,a,i)=>{for(const u of n)(i||o in u)&&(a?l.has(u)||(l.add(u),s.delete(u),e(u,a)):s.has(u)||(s.add(u),l.delete(u),e(u,a)),i||c(u[o](r),r,l,s,a,t))},a=new l((e=>{if(s.length){const o=s.join(","),r=new Set,l=new Set;for(const{addedNodes:s,removedNodes:a}of e)c(a,o,r,l,n,n),c(s,o,r,l,t,n)}})),{observe:i}=a;return(a.observe=e=>i.call(a,e,{subtree:t,childList:t}))(r),a})(d,m,c,p),{attachShadow:w}=s.prototype;return w&&(s.prototype.attachShadow=function(e){const t=w.call(this,e);return y.observe(t),t}),p.length&&g(m[r](p)),{drop:e=>{for(let t=0,{length:n}=e;t<n;t++)h.delete(e[t])},flush:()=>{const e=y.takeRecords();for(let t=0,{length:n}=e;t<n;t++)g(f.call(e[t].removedNodes,u),!1),g(f.call(e[t].addedNodes,u),!0)},observer:y,parse:g}};const{document:d,Map:g,MutationObserver:p,Object:m,Set:y,WeakMap:w,Element:b,HTMLElement:E,Node:v,Error:S,TypeError:M,Reflect:O}=self,{defineProperty:A,keys:N,getOwnPropertyNames:q,setPrototypeOf:C}=m;let T=!self.customElements;const D=e=>{const t=N(e),n=[],{length:o}=t;for(let r=0;r<o;r++)n[r]=e[t[r]],delete e[t[r]];return()=>{for(let r=0;r<o;r++)e[t[r]]=n[r]}};if(T){const{createElement:L}=d,P=new g,$=new g,k=new g,I=new g,x=[],H=(e,t,n)=>{const o=k.get(n);if(t&&!o.isPrototypeOf(e)){const t=D(e);R=C(e,o);try{new o.constructor}finally{R=null,t()}}const r=(t?"":"dis")+"connectedCallback";r in o&&e[r]()},{parse:_}=h({query:x,handle:H});let R=null;const V=e=>{if(!$.has(e)){let t,n=new Promise((e=>{t=e}));$.set(e,{$:n,_:t})}return $.get(e).$},j=e(V,p);function W(){const{constructor:e}=this;if(!P.has(e))throw new M("Illegal constructor");const t=P.get(e);if(R)return j(R,t);const n=L.call(d,t);return j(C(n,e.prototype),t)}A(self,"customElements",{configurable:!0,value:{define:(e,t)=>{if(I.has(e))throw new S(`the name "${e}" has already been used with this registry`);P.set(t,e),k.set(e,t.prototype),I.set(e,t),x.push(e),V(e).then((()=>{_(d.querySelectorAll(e))})),$.get(e)._(t)},get:e=>I.get(e),whenDefined:V}}),A(W.prototype=E.prototype,"constructor",{value:W}),A(self,"HTMLElement",{configurable:!0,value:W}),A(d,"createElement",{configurable:!0,value(e,t){const n=t&&t.is,o=n?I.get(n):I.get(e);return o?new o:L.call(d,e)}}),"isConnected"in v.prototype||A(v.prototype,"isConnected",{configurable:!0,get(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}else if(T=!self.customElements.get("extends-li"),T)try{function F(){return self.Reflect.construct(HTMLLIElement,[],F)}F.prototype=HTMLLIElement.prototype;const U="extends-li";self.customElements.define("extends-li",F,{extends:"li"}),T=d.createElement("li",{is:U}).outerHTML.indexOf(U)<0;const{get:z,whenDefined:B}=self.customElements;A(self.customElements,"whenDefined",{configurable:!0,value(e){return B.call(this,e).then((t=>t||z.call(this,e)))}})}catch(G){}if(T){const J=self.customElements,{createElement:K}=d,{define:Q,get:X,upgrade:Y}=J,{construct:Z}=O||{construct(e){return e.call(this)}},ee=new w,te=new y,ne=new g,oe=new g,re=new g,le=new g,se=[],ce=[],ae=e=>le.get(e)||X.call(J,e),ie=(e,t,n)=>{const o=re.get(n);if(t&&!o.isPrototypeOf(e)){const t=D(e);pe=C(e,o);try{new o.constructor}finally{pe=null,t()}}const r=(t?"":"dis")+"connectedCallback";r in o&&e[r]()},{parse:ue}=h({query:ce,handle:ie}),{parse:fe}=h({query:se,handle(e,t){ee.has(e)&&(t?te.add(e):te.delete(e),ce.length&&me.call(ce,e))}}),{attachShadow:he}=b.prototype;he&&(b.prototype.attachShadow=function(e){const t=he.call(this,e);return ee.set(this,t),t});const de=e=>{if(!oe.has(e)){let t,n=new Promise((e=>{t=e}));oe.set(e,{$:n,_:t})}return oe.get(e).$},ge=e(de,p);let pe=null;function me(e){const t=ee.get(e);ue(t.querySelectorAll(this),e.isConnected)}q(self).filter((e=>/^HTML.*Element$/.test(e))).forEach((e=>{const t=self[e];function n(){const{constructor:e}=this;if(!ne.has(e))throw new M("Illegal constructor");const{is:n,tag:o}=ne.get(e);if(n){if(pe)return ge(pe,n);const t=K.call(d,o);return t.setAttribute("is",n),ge(C(t,e.prototype),n)}return Z.call(this,t,[],e)}C(n,t),A(n.prototype=t.prototype,"constructor",{value:n}),A(self,e,{value:n})})),A(d,"createElement",{configurable:!0,value(e,t){const n=t&&t.is;if(n){const t=le.get(n);if(t&&ne.get(t).tag===e)return new t}const o=K.call(d,e);return n&&o.setAttribute("is",n),o}}),A(J,"get",{configurable:!0,value:ae}),A(J,"whenDefined",{configurable:!0,value:de}),A(J,"upgrade",{configurable:!0,value(e){const t=e.getAttribute("is");if(t){const n=le.get(t);if(n)return void ge(C(e,n.prototype),t)}Y.call(J,e)}}),A(J,"define",{configurable:!0,value(e,t,n){if(ae(e))throw new S(`'${e}' has already been defined as a custom element`);let o;const r=n&&n.extends;ne.set(t,r?{is:e,tag:r}:{is:"",tag:e}),r?(o=`${r}[is="${e}"]`,re.set(o,t.prototype),le.set(e,t),ce.push(o)):(Q.apply(J,arguments),se.push(o=e)),de(e).then((()=>{r?(ue(d.querySelectorAll(o)),te.forEach(me,[o])):fe(d.querySelectorAll(o))})),oe.get(e)._(t)}})}}();  

const cpObj = bbn.fn.createObject({
  tickDelay: 25,
  uid: 0,
  mixins: bbn.fn.createObject({
    basic,
    browserNotification,
    close,
    componentInside,
    config,
    data,
    dataEditor,
    dimensions,
    dropdown,
    editableList,
    empty,
    events,
    field,
    input,
    keepCool,
    keynav,
    list,
    localStorage,
    memory,
    observer,
    pageable,
    popup,
    position,
    resizer,
    serviceWorker,
    toggle,
    url,
    view
  }),
  defaults: bbn.fn.createObject(),
  version: 1,
  spaceHash: bbn.fn.hash(' '),
  queue: [],
  known: [],
  interval: null,
  statics: bbn.fn.createObject(),
  /** @var {Array} directives List of existing directives */
  directives: bbn.fn.createObject(),
  conditionalExp: ['bbn-if', 'bbn-elseif', 'bbn-else'],
  badCaseAttributes: {
    accesskey: 'accessKey',
    autocapitalize: 'autoCapitalize',
    autocorrect: 'autoCorrect',
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    contenteditable: 'contentEditable',
    crossorigin: 'crossOrigin',
    for: 'htmlFor',
  },
  hooks: [
    'beforeCreate',
    'created',
    'updated',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed'
  ],
  tagExtensions: {
    'button': 'bbnButtonHTML',
    'div': 'bbnDivHTML',
    'form': 'bbnFormHTML',
    'ul': 'bbnListHTML',
    'li': 'bbnElementHTML',
    'span': 'bbnSpanHTML',
    'tr': 'bbnRowHTML',
    'td': 'bbnCellHTML',
    'th': 'bbnCellHTML'
  },
  knownPrefixes: [],
  queue: [],
  queueTimer: null,
  loadDelay: 100,
  possibleAttributes,
  forbidden: ['bbn-forget', 'bbn-for', 'bbn-if', 'bbn-elseif', 'bbn-else'],
  /** @var {Object} components All the components in the DOM are referenced in this object through their CID */
  componentsIndex: new Map(),
  addPrefix,
  addUrlAsPrefix,
  attributeChangedCallback,
  convertClasses,
  convertStyles,
  createApp,
  define,
  executeQueueItem,
  executeQueueItems,
  executeTemplate,
  fetchComponents,
  getComponent,
  initDefaults,
  insertDirectives,
  isComponent,
  isTag,
  mapTemplate,
  normalizeComponent,
  realDefineComponent,
  setComputed,
  setDefaults,
  startTick,
  stopTick,
  updateDirectives,
});

bbn.fn.autoExtend('cp', cpObj);

draggable();
droppable();
focused();
portal();
resizable();

export default cpObj;
