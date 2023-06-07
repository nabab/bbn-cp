(() => {
  window.cdnUrl = window.location.hostname.indexOf('local.bbn.io') > 0 ? 
  "https://cdn-dev-local.bbn.io/"
  : "https://cdn.bbn.io/";

  /*
  const sc = document.createElement('script');
  sc.setAttribute('type', 'text/javascript');
  sc.innerHTML = `
class bbnCp {
  constructor(cp, tag) {
    this.$init(cp);
  }
};
`;
  window.document.head.appendChild(sc);
  */

  bbnCp = function(cp) {
    return window[cp.constructor.bbnFn](cp, this);
  };
  
  const possibleAttributes = ['is', 'source', 'ref', 'slot', 'id', 'class', 'style', 'key'];

  !function(){"use strict";var e=(e,t)=>{const n=e=>{for(let t=0,{length:n}=e;t<n;t++)o(e[t])},o=({target:e,attributeName:t,oldValue:n})=>{e.attributeChangedCallback(t,n,e.getAttribute(t))};return(r,l)=>{const{observedAttributes:s}=r.constructor;return s&&e(l).then((()=>{new t(n).observe(r,{attributes:!0,attributeOldValue:!0,attributeFilter:s});for(let e=0,{length:t}=s;e<t;e++)r.hasAttribute(s[e])&&o({target:r,attributeName:s[e],oldValue:null})})),r}};
  /*! (c) Andrea Giammarchi - ISC */const t=!0,n=!1,o="querySelectorAll",r="querySelectorAll",{document:l,Element:s,MutationObserver:c,Set:a,WeakMap:i}=self,u=e=>r in e,{filter:f}=[];var h=e=>{const h=new i,d=(t,n)=>{let o;if(n)for(let r,l=(e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector)(t),s=0,{length:c}=p;s<c;s++)l.call(t,r=p[s])&&(h.has(t)||h.set(t,new a),o=h.get(t),o.has(r)||(o.add(r),e.handle(t,n,r)));else h.has(t)&&(o=h.get(t),h.delete(t),o.forEach((o=>{e.handle(t,n,o)})))},g=(e,t=!0)=>{for(let n=0,{length:o}=e;n<o;n++)d(e[n],t)},{query:p}=e,m=e.root||l,y=((e,r=document,l=MutationObserver,s=["*"])=>{const c=(n,r,l,s,a,i)=>{for(const u of n)(i||o in u)&&(a?l.has(u)||(l.add(u),s.delete(u),e(u,a)):s.has(u)||(s.add(u),l.delete(u),e(u,a)),i||c(u[o](r),r,l,s,a,t))},a=new l((e=>{if(s.length){const o=s.join(","),r=new Set,l=new Set;for(const{addedNodes:s,removedNodes:a}of e)c(a,o,r,l,n,n),c(s,o,r,l,t,n)}})),{observe:i}=a;return(a.observe=e=>i.call(a,e,{subtree:t,childList:t}))(r),a})(d,m,c,p),{attachShadow:w}=s.prototype;return w&&(s.prototype.attachShadow=function(e){const t=w.call(this,e);return y.observe(t),t}),p.length&&g(m[r](p)),{drop:e=>{for(let t=0,{length:n}=e;t<n;t++)h.delete(e[t])},flush:()=>{const e=y.takeRecords();for(let t=0,{length:n}=e;t<n;t++)g(f.call(e[t].removedNodes,u),!1),g(f.call(e[t].addedNodes,u),!0)},observer:y,parse:g}};const{document:d,Map:g,MutationObserver:p,Object:m,Set:y,WeakMap:w,Element:b,HTMLElement:E,Node:v,Error:S,TypeError:M,Reflect:O}=self,{defineProperty:A,keys:N,getOwnPropertyNames:q,setPrototypeOf:C}=m;let T=!self.customElements;const D=e=>{const t=N(e),n=[],{length:o}=t;for(let r=0;r<o;r++)n[r]=e[t[r]],delete e[t[r]];return()=>{for(let r=0;r<o;r++)e[t[r]]=n[r]}};if(T){const{createElement:L}=d,P=new g,$=new g,k=new g,I=new g,x=[],H=(e,t,n)=>{const o=k.get(n);if(t&&!o.isPrototypeOf(e)){const t=D(e);R=C(e,o);try{new o.constructor}finally{R=null,t()}}const r=(t?"":"dis")+"connectedCallback";r in o&&e[r]()},{parse:_}=h({query:x,handle:H});let R=null;const V=e=>{if(!$.has(e)){let t,n=new Promise((e=>{t=e}));$.set(e,{$:n,_:t})}return $.get(e).$},j=e(V,p);function W(){const{constructor:e}=this;if(!P.has(e))throw new M("Illegal constructor");const t=P.get(e);if(R)return j(R,t);const n=L.call(d,t);return j(C(n,e.prototype),t)}A(self,"customElements",{configurable:!0,value:{define:(e,t)=>{if(I.has(e))throw new S(`the name "${e}" has already been used with this registry`);P.set(t,e),k.set(e,t.prototype),I.set(e,t),x.push(e),V(e).then((()=>{_(d.querySelectorAll(e))})),$.get(e)._(t)},get:e=>I.get(e),whenDefined:V}}),A(W.prototype=E.prototype,"constructor",{value:W}),A(self,"HTMLElement",{configurable:!0,value:W}),A(d,"createElement",{configurable:!0,value(e,t){const n=t&&t.is,o=n?I.get(n):I.get(e);return o?new o:L.call(d,e)}}),"isConnected"in v.prototype||A(v.prototype,"isConnected",{configurable:!0,get(){return!(this.ownerDocument.compareDocumentPosition(this)&this.DOCUMENT_POSITION_DISCONNECTED)}})}else if(T=!self.customElements.get("extends-li"),T)try{function F(){return self.Reflect.construct(HTMLLIElement,[],F)}F.prototype=HTMLLIElement.prototype;const U="extends-li";self.customElements.define("extends-li",F,{extends:"li"}),T=d.createElement("li",{is:U}).outerHTML.indexOf(U)<0;const{get:z,whenDefined:B}=self.customElements;A(self.customElements,"whenDefined",{configurable:!0,value(e){return B.call(this,e).then((t=>t||z.call(this,e)))}})}catch(G){}if(T){const J=self.customElements,{createElement:K}=d,{define:Q,get:X,upgrade:Y}=J,{construct:Z}=O||{construct(e){return e.call(this)}},ee=new w,te=new y,ne=new g,oe=new g,re=new g,le=new g,se=[],ce=[],ae=e=>le.get(e)||X.call(J,e),ie=(e,t,n)=>{const o=re.get(n);if(t&&!o.isPrototypeOf(e)){const t=D(e);pe=C(e,o);try{new o.constructor}finally{pe=null,t()}}const r=(t?"":"dis")+"connectedCallback";r in o&&e[r]()},{parse:ue}=h({query:ce,handle:ie}),{parse:fe}=h({query:se,handle(e,t){ee.has(e)&&(t?te.add(e):te.delete(e),ce.length&&me.call(ce,e))}}),{attachShadow:he}=b.prototype;he&&(b.prototype.attachShadow=function(e){const t=he.call(this,e);return ee.set(this,t),t});const de=e=>{if(!oe.has(e)){let t,n=new Promise((e=>{t=e}));oe.set(e,{$:n,_:t})}return oe.get(e).$},ge=e(de,p);let pe=null;function me(e){const t=ee.get(e);ue(t.querySelectorAll(this),e.isConnected)}q(self).filter((e=>/^HTML.*Element$/.test(e))).forEach((e=>{const t=self[e];function n(){const{constructor:e}=this;if(!ne.has(e))throw new M("Illegal constructor");const{is:n,tag:o}=ne.get(e);if(n){if(pe)return ge(pe,n);const t=K.call(d,o);return t.setAttribute("is",n),ge(C(t,e.prototype),n)}return Z.call(this,t,[],e)}C(n,t),A(n.prototype=t.prototype,"constructor",{value:n}),A(self,e,{value:n})})),A(d,"createElement",{configurable:!0,value(e,t){const n=t&&t.is;if(n){const t=le.get(n);if(t&&ne.get(t).tag===e)return new t}const o=K.call(d,e);return n&&o.setAttribute("is",n),o}}),A(J,"get",{configurable:!0,value:ae}),A(J,"whenDefined",{configurable:!0,value:de}),A(J,"upgrade",{configurable:!0,value(e){const t=e.getAttribute("is");if(t){const n=le.get(t);if(n)return void ge(C(e,n.prototype),t)}Y.call(J,e)}}),A(J,"define",{configurable:!0,value(e,t,n){if(ae(e))throw new S(`'${e}' has already been defined as a custom element`);let o;const r=n&&n.extends;ne.set(t,r?{is:e,tag:r}:{is:"",tag:e}),r?(o=`${r}[is="${e}"]`,re.set(o,t.prototype),le.set(e,t),ce.push(o)):(Q.apply(J,arguments),se.push(o=e)),de(e).then((()=>{r?(ue(d.querySelectorAll(o)),te.forEach(me,[o])):fe(d.querySelectorAll(o))})),oe.get(e)._(t)}})}}();  
  
  bbn.fn.autoExtend('cp', {
    tickDelay: 50,
    uid: 0,
    mixins: bbn.fn.createObject(),
    defaults: bbn.fn.createObject(),
    version: 1,
    known: [],
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
      'form': 'bbnFormHTML',
      'ul': 'bbnListHTML',
      'li': 'bbnElementHTML',
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

    /**
     * Creates a unique ID for a component
     */
    createCid() {
      let cid = 'bbncp-' + bbn.fn.randomString(24, 32).toLowerCase();
      while (this.componentsIndex.has(cid)) {
        cid = 'bbncp-' + bbn.fn.randomString(24, 32).toLowerCase();
      }

      return cid;
    },
    /**
     * Adds a new component to the static global #components property
     */
    addComponent(ele) {
      const cid = ele.bbnCid;
      if (!cid) {
        throw new Error("The component doesn't have a component ID")
      }

      const cp = this.componentsIndex.get(cid);
      if (cp) {
        if (cp !== ele) {
          bbn.fn.log(ele, cp);
          throw new Error("The component already exists")
        }
      }
      else {
        this.componentsIndex.set(cid, ele);
      }
    },

    removeComponent(cid) {
      if (!cid) {
        throw new Error("The component doesn't have a component ID")
      }
      const cp = this.componentsIndex.get(cid);
      if (!cp) {
        throw new Error("The component already exists")
      }

      this.componentsIndex.delete(cid);
    },

    /**
     * Retrieves a component in the document based on its id.
     * Every instance of bbnComponentObject is registered through its
     * unique ID in the static #components property
     * @param {Symbol} id 
     * @returns 
     */
    getComponent(id) {
      return this.componentsIndex.get(id) || null;
    },

    connectedCallback(cp) {
      if (cp.bbnId && !cp.bbn) {
        cp.bbn = new (cp.bbnFn|| cp.constructor.bbnFn)(cp);
        cp.bbn.$connectedCallback();
      }
    },
  
    disconnectedCallback(cp) {
      if (cp.bbn) {
        cp.bbn.$disconnectedCallback()
      }
    },
  
    attributeChangedCallback(cp, name, oldValue, newValue) {
      if ((oldValue !== newValue) && cp.bbn) {
        cp.bbn.$attributeChange(name, oldValue, newValue);
      }
    },

    setComputed(obj, name, getter, setter) {
      if (Object.hasOwn(obj, name)) {
        throw new Error(bbn._("The computed property %s already exists", name));
      }

      const def = {
        get() {
          if (!this.$isDataSet) {
            return undefined;
          }
          if (!Object.hasOwn(this.$computed, name)) {
            this.$computed[name] = bbn.fn.createObject({
              old: undefined,
              val: undefined,
              hash: undefined,
              num: 0,
              update: () => {
                this.$updateComputed(name, getter.bind(this)());
              }
            });
            this.$computed[name].update();
          }
          else if (this.$computed[name].num < this.$numBuild) {
            this.$computed[name].update();
          }

          return this.$computed[name].val;
        }
      };
      if (setter) {
        def.set = function(v) {
          return setter.bind(this)(v);
        };
      }

      Object.defineProperty(obj, name, def);
    },
  
    /**
     * Updates the outer schema (with props and slots) of the component and ticks
     * @param {Array} newSchema 
     */
    bbnUpdate(cp, newSchema) {
      cp.bbnSchema = newSchema;
      if (cp.bbn && cp.bbn.$isMounted && (!cp.bbnSchema.changes || cp.bbnSchema.changes.length)) {
        bbn.fn.log("FROM BBN UPDATE")
        cp.bbn.$tick();
      }
    },
    /**
     * Inserts the given directives to the target element
     * @param {Object} directives
     * @param {HTMLElement} target
     */
    insertDirectives(directives, target) {
      if (bbn.fn.isObject(directives)
        && Object.keys(directives).length
      ) {
        bbn.fn.iterate(directives, (dir, name) => {
          // Check if the directive has not already been initialized on target element
          if (!dir.inserted) {
            // Check if the "inserted" function exists on this directive
            if (bbn.fn.isFunction(bbn.cp.directives[name].inserted)) {
              // Set the directive as initialized
              dir.inserted = true;
              // Initialize the directive
              bbn.cp.directives[name].inserted(target, dir);
            }
          }
        });
      }
    },
    /**
     * Updates the given directives to the target element
     * @param {Object} directives
     * @param {HTMLElement} target
     */
    updateDirectives(directives, target) {
      if (bbn.fn.isObject(directives)
        && Object.keys(directives).length
      ) {
        bbn.fn.iterate(directives, (dir, name) => {
          // Check if the "updated" function exists on this directive
          if (bbn.fn.isFunction(bbn.cp.directives[name].update)
            // Check if the value of the directive has changed
            && !bbn.fn.isSame(dir.value, dir.oldValue)
          ) {
            // Set the "lastUpdate" property
            dir.lastUpdate = bbn.fn.dateSQL();
            // Call the "updated" function of the directive
            bbn.cp.directives[name].update(target, dir);
          }
        })
      }
    },

    isComponent(node) {
      if (!node) {
        return false;
      }

      if (node.$options && node.$options._componentTag) {
        return true;
      }

      // HTMLElement
      if (node.bbnCid) {
        return true;
      }

      if (bbn.fn.isObject(node) && node._bbnComponent) {
        return true;
      }

      // Node object
      if (node.props?.is) {
        if (bbn.fn.isObject(node.props.is)) {
          return true;
        }

        return node.props.is.indexOf('-') > -1;
      }

      if (node.attr?.is?.value) {
        return node.attr.is.value.indexOf('-') > -1;
      }

      if (node.tag) {
        if (node.tag.indexOf('bbns-') === 0) {
          return false;
        }

        return node.tag.indexOf('-') > -1;
      }

      return false;
    },

    isTag(tag, ele) {
      bbn.fn.checkType(tag, 'string', bbn._("Tags must be strings"));
      bbn.fn.checkType(ele, HTMLElement);
      if (ele.tagName.toLowerCase() === tag) {
        return true;
      }

      if (ele.getAttribute("is") === tag) {
        return true;
      }

      return false;
    },

    /**
     * Sets default object for a component, accessible through bbn.vue.defaults[cpName].
     * 
     * @method initDefaults
     * @memberof bbn.vue
     * @param Object defaults 
     * @param String cpName 
     */
    initDefaults(defaults){
      if ( typeof defaults !== 'object' ){
        throw new Error("The default object sent for defaults is not an object");
      }
      bbn.fn.extend(true, bbn.cp.defaults, defaults);
    },

    /**
     * @method setDefaults
     * @memberof bbn.vue
     * @param {Object} defaults 
     * @param {String} cpName
     */
    setDefaults(defaults, cpName){
      if ( typeof defaults !== 'object' ){
        throw new Error("The default object sent is not an object " + cpName);
      }
      bbn.cp.defaults[cpName] = bbn.fn.extend(bbn.cp.defaults[cpName] || {}, defaults);
    },

  
  });
})();  
