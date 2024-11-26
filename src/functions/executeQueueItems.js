/**
 * @method executeQueueItems
 * @memberof bbn.cp
 * @param {Array} items
 */
export default function executeQueueItems(items){
  if ( items.length ){
    let url = 'components/';
    let i = 0;
    while (items[i] && (url.length < maxUrlLength)) {
      if (i) {
        url += '/';
      }

      url += items[i].name;
      i++;
    }
    url += '?v=' + bbn.version;
    let prom = axios.get(url, {responseType:'json'}).then(d => {
      d = d.data;
      if ( d && d.success && d.components ){
        bbn.fn.iterate(items, a => {
          let cp = bbn.fn.getRow(d.components, {name: a.name});
          const fnName = bbn.fn.camelize(a.name) + 'Cp';
          if ( cp && this.realDefineComponent(a.name, cp, a.mixins) && window[fnName]) {
            a.resolve(true);
          }
          else{
            bbn.fn.log("PROMISE REJECT OF" + a.name, a);
            a.reject();
            throw new Error(bbn._("Impossible to load the component") + ' ' + a.name);
          }
        })
      }
    });

    if (i < (items.length -1)) {
      items.splice(0, i);
      this.executeQueueItems(items);
    }

    return prom;
  }

  return false;
}
