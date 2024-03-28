/**
 * Handles the configuration of the container's menu.
 * 
 * @param {Object} obj 
 */
function addMenu(obj){
  if (
    (this.currentIndex > -1) &&
    obj.text &&
    this.router.views &&
    this.router.views[this.currentIndex]
  ){
    if ( this.router.views[this.currentIndex].menu === undefined ){
      this.router.views[this.currentIndex].menu = [];
    }
    let menu = this.router.views[this.currentIndex].menu || [],
        idx = bbn.fn.isFunction(menu) ? -1 : bbn.fn.search(menu || [], {text: obj.text});
    if (idx === -1) {
      if (bbn.fn.isFunction(menu) ){
        this.router.views[this.currentIndex].menu = () => {
          let items = menu() || [];
          if ( bbn.fn.search(items, obj) === -1 ){
            if ( !obj.key ){
              obj.key = bbn.fn.randomInt(99999,99999999999);
            }
            items.push(obj);
          }
          return items;
        };
      }
      else{
        if ( !obj.key ){
          obj.key = bbn.fn.randomInt(99999,99999999999);
        }
        menu.push(obj);
      }
    }
    else{
      obj.key = menu[idx].key;
      menu.splice(idx, 1, obj);
    }
    this.router.views[this.currentIndex].menu = menu;
    return obj.key;
  }
  return false;
}


/**
 * Deletes the given key from the container's menu.
 * 
 * @method deleteMenu
 * @param {String} key 
 */
function deleteMenu(key) {
  if (
    (this.currentIndex > -1) &&
    this.router.views &&
    this.router.views[this.currentIndex]
  ){
    let menu = this.router.views[this.currentIndex].menu || [];
    if (bbn.fn.isFunction(menu) ){
      menu = () => {
        let items = menu() || [];
        let idx = bbn.fn.search(items, "key", key);
        if ( idx > -1 ){
          items.splice(idx, 1);
          this.router.views[this.currentIndex].menu = items;
          //this.router.$forceUpdate();
          return true;
        }
      };
    }
    else{
      let idx = bbn.fn.search(menu, "key", key);
      if ( idx > -1 ){
        menu.splice(idx, 1);
        this.router.views[this.currentIndex].menu = menu;
        //this.router.$forceUpdate();
        return true;
      }
    }
  }
  return false;
}


function showMenu() {
  return this.router.getMenuFn(this.currentIndex);
}


export {
  addMenu,
  deleteMenu,
  showMenu,
}
