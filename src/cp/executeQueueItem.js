/**
 * @method executeQueueItem
 * @memberof bbn.cp
 * @param {Object} item
 */
export default function executeQueueItem(item){
  if (item.url) {
    return axios.get(item.url, {responseType:'json'}).then(r => {
      if (r.data) {
        r = r.data;
        const fnName = bbn.fn.camelize(item.name) + 'Cp';
        if (this.realDefineComponent(item.name, r, item.mixins) && window[fnName]) {
          item.resolve(true);
          return;
        }
      }

      item.reject();
    })
  }
  return false;
}