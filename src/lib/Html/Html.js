import bbnProtoHtml from "./Proto.js";
import bbnOptions from "../Options.js";
/**
 * Create the bbn component class which extends the HTMLElement class
 */
export default class bbnHtml extends HTMLElement
{
  $lastBuild = 0;

  get _self() {
    return this;
  }

  get $el() {
    return this;
  }

  get $node() {
    return this.bbnNode;
  }

  get $cls() {
    return this.constructor;
  }


  connectedCallback() {
    return bbnProtoHtml.connectedCallback.call(this);
  } 

  disconnectedCallback() {
    return bbnProtoHtml.disconnectedCallback.call(this, [this]);
  }

  _(...args) {
    return bbnProtoHtml._.apply(this, args);
  }

  getRef(...args) {
    return bbnProtoHtml.getRef.apply(this, args);
  }

  ancestors(...args) {
    return bbnProtoHtml.ancestors.apply(this, args);
  }

  closest(...args) {
    return bbnProtoHtml.closest.apply(this, args);
  }

  find(...args) {
    return bbnProtoHtml.find.apply(this, args);
  }

  findAll(...args) {
    return bbnProtoHtml.findAll.apply(this, args);
  }

  extend(...args) {
    return bbnProtoHtml.extend.apply(this, args);
  }

  async $connected(...args) {
    return await bbnProtoHtml.$connected.apply(this, args);;
  }

  $create(...args) {
    return bbnProtoHtml.$create.apply(this, args);
  }

  $destroy(...args) {
    return bbnProtoHtml.$destroy.apply(this, args);
  }
    
  $emit(...args) {
    return bbnProtoHtml.$emit.apply(this, args);
  }
    
  $forceUpdate(...args) {
    return bbnProtoHtml.$forceUpdate.apply(this, args);
  }
    
  $hasSlots(...args) {
    return bbnProtoHtml.$hasSlots.apply(this, args);
  }
    
  $is(...args) {
    return bbnProtoHtml.$is.apply(this, args);
  }
    
  $isComponent(...args) {
    return bbnProtoHtml.$isComponent.apply(this, args);
  }

  $isPropNative(...args) {
    return bbnProtoHtml.$isPropNative.apply(this, args);
  }
    
  $nextTick(...args) {
    return bbnProtoHtml.$nextTick.apply(this, args);
  }
    
  $off(...args) {
    return bbnProtoHtml.$off.apply(this, args);
  }
    
  $on(...args) {
    return bbnProtoHtml.$on.apply(this, args);
  }
    
  $once(...args) {
    return bbnProtoHtml.$once.apply(this, args);
  }
    
  $position(...args) {
    return bbnProtoHtml.$position.apply(this, args);
  }

  $retrieveSlotItems(...args) {
    return bbnProtoHtml.$retrieveSlotItems.apply(this, args);
  }
    
  $set(...args) {
    return bbnProtoHtml.$set.apply(this, args);
  }
    
  $watch(...args) {
    return bbnProtoHtml.$watch.apply(this, args);
  }
}
