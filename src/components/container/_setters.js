/**
 * Sets the current url.
 * 
 * @method setCurrent
 * @param {String} url 
 */
function setCurrent(url){
  if ( url.indexOf(this.url) === 0 ){
    this.currentURL = url;
    return true;
  }

  return false;
}


/**
 * Sets the title of the container.
 * 
 * @method setTitle
 * @param {String} title 
 */
function setTitle(title){
  if ( this.router ){
    if (!this.real) {
      this.router.views[this.currentIndex].title = title;
    }
    else {
      this.currentTitle = title;
    }
  }
}


/**
 * Sets the icon of the container.
 * 
 * @method setIcon
 * @param {String} title 
 */
function setIcon(icon){
  if ( this.router ){
    if (!this.real) {
      this.router.views[this.currentIndex].icon = icon;
    }
    else {
      this.currentIcon = icon;
    }
  }
}


/**
 * Sets the color.
 * 
 * @method setColor
 * @param {String} bcolor 
 * @param {String} fcolor 
 */
function setColor(bcolor, fcolor){
  if ( this.router ){
    let view = this.router.getView(this.url);
    if (view) {
      if ( bcolor ){
        this.router.$set(view, "bcolor", bcolor);
      }
      if ( fcolor ){
        this.router.$set(view, "fcolor", fcolor);
      }
    }
  }
}
/**
 * Sets the value of the property loaded to the given val.
 * 
 * @method setLoaded
 * @param {Boolean} val 
 */
function setLoaded(val){
 this.isLoaded = !!val;
}


export {
  setCurrent,
  setTitle,
  setIcon,
  setColor,
  setLoaded,
}