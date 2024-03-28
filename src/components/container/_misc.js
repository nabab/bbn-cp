/**
 * Returns the full current url.
 * 
 * @method getFullCurrentURL
 * @return {String}
 */
function getFullCurrentURL(){
  return this.router.getFullBaseURL() + this.currentURL;
}


/**
 * Returns the full url.
 * 
 * @method getFullURL
 * @return {String}
 */
function getFullURL(){
  return this.router.getFullBaseURL() + this.url;
}


/**
 * Generates a random name used for the component.
 * 
 * @method randomName
 * @return {String}
 */
function randomName(){
  let n = bbn.fn.randomString(20, 15).toLowerCase();
  while (bbnContainerCp.componentsList.indexOf(n) > -1 ){
    n = bbn.fn.randomString(20, 15).toLowerCase();
  }
  return n;
}


/**
 * Gets the popup object.
 *  
 * @method popup
 * @return {Object}
 */
function popup() {
  let popup = this.getPopup();
  return arguments.length ? popup.open.apply(popup, arguments) : popup;
}


/**
 * Gets the child component.
 * 
 * @method getComponent
 * @return {Object|Boolean}
 */
function getComponent() {
  return this.getRef('component');
}


/**
 * Fires the parent's method enter.
 * 
 * @method enter
 * @fires router.enter
 */
function enter() {
  this.router.enter(this);
}


function onResize() {
  if (this.isVisible && this.ready) {
    return bbn.cp.mixins.resizer.methods.onResize.apply(this);
  }
}

export {
  getFullCurrentURL,
  getFullURL,
  randomName,
  popup,
  getComponent,
  enter,
  onResize
}