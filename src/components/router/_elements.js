/**
 * @method getVue
 * @fires isValidIndex
 * @return {Vue|Boolean}
 */
function getVue(idx) {
  return this.getContainer(idx);
}
/**
 * Returns the corresponding container's component's DOM element.
 * @method getContainer
 * @param {Number} idx
 * @return {bbnCp}
 */
function getContainer(idx) {
  if (idx === undefined) {
    idx = this.selected;
  }

  return this.urls[this.views[idx]?.url];
}
/**
 * Returns the corresponding container's component's DOM element.
 * @method getDOMContainer
 * @param {Number} idx
 * @fires getContainer
 * @return {HTMLElement|Boolean}
 */
function getDOMContainer(idx) {
  if (idx === undefined) {
    idx = this.selected;
  }
  let c = this.getContainer(idx);
  return c ? c.$el : false;
}
/**
 * Returns the next router in the corresponding container if there's any.
 * @method getSubRouter
 * @param misc
 * @fires getIndex
 * @fires getvue
 * @return {Vue|null}
 */
function getSubRouter(misc) {
  let idx = this.getIndex(misc);
  if (idx === undefined) {
    idx = this.selected;
  }
  let container = this.getContainer(idx);
  if (container) {
    return container.find('bbn-router') || null;
  }
  return null;
}
/**
 * @method getFinalContainer
 * @param misc
 * @fires getIndex
 * @fires getSubRouter
 * @fires getContainer
 * @return {bbnCp}
 */
function getFinalContainer(misc) {
  let idx = this.getIndex(misc);
  if (idx === undefined) {
    idx = this.selected;
  }

  let router = this.getSubRouter(idx);
  if (router) {
    return router.getFinalContainer();
  }

  return this.getContainer(idx);
}
/**
 * @method getRealVue
 * @param misc
 * @fires getFinalContainer
 * @return {bbnCp}
 */
function getRealVue(misc) {
  return this.getFinalContainer(misc);
}

export {
  getVue,
  getContainer,
  getDOMContainer,
  getSubRouter,
  getFinalContainer,
  getRealVue
};