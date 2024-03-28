//Breadcrumb
/**
 * @method registerBreadcrumb
 * @param {bbnCp} bc
 * @param {String} url
 */
function registerBreadcrumb(bc) {
  let url = bbn.fn.substr(bc.baseURL, 0, bc.baseURL.length - 1);
  this.breadcrumbsList.push(bc);
  if (this.itsMaster && !this.master) {
    this.itsMaster.breadcrumbsList.push(bc);
  }
}


/**
 * @method unregisterBreadcrumb
 * @param {bbnCp} bc
 * @param {String} url
 */
function unregisterBreadcrumb(bc) {
  if (this.breadcrumbsList) {
    let idx = bbn.fn.search(this.breadcrumbsList, { baseURL: bc.baseURL });
    if (idx !== -1) {
      this.breadcrumbsList.splice(idx, 1);
    }
    if (this.itsMaster && !this.master) {
      idx = bbn.fn.search(this.itsMaster.breadcrumbsList, { baseURL: bc.baseURL });
      if (idx !== -1) {
        this.itsMaster.breadcrumbsList.splice(idx, 1);
      }
    }
  }
}


function getBreadcrumbs(idx) {
  let ret = [];
  if (bbn.fn.isNumber(idx) && this.views[idx]) {
    let url = this.views[idx].url,
      bc = bbn.fn.getRow(this.breadcrumbsList, { baseURL: url + '/' });
    if (this.urls[url] && bc) {
      ret.push(...bc.breadcrumbs);
    }
  }
  return ret;
}

export {
  registerBreadcrumb,
  unregisterBreadcrumb,
  getBreadcrumbs,
}