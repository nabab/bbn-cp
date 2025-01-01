import bbnData from "../../Data.js";

/**
 * Adds a component to the original bbnData object linked to it
 * @param {bbnCp} component 
 * @param {bbnAttr|String} path 
 * @returns {Boolean}
 */

/**
 * source[0].prop.list
 * currentData[0].prop.list
 * filteredData[0].data.prop.list
 * row.prop.list
 */

/*
const cp1 = 1;
const example = {
  data: [{prop: {list: []}}, {prop: {list: []}}, {prop: {list: []}}],
  refs: [{
    cp1,
    path: 'list',
    parent: {
      refs: [{
        cp1,
        path: 'prop',
        parent: {
          refs: [{
            cp1,
            path: 'row',
            parent: null
          }, {
            cp1, 
            path: 'data',
            parent: {
              refs: [{
                cp1,
                path: '0',
                parent: {
                  refs: [{
                    cp1,
                    path: 'filteredData',
                    parent: null
                  }]
                }
              }]
            }
          }, {
            cp1,
            path: '0',
            parent: {
              refs: [{
                cp1,
                path: 'currentData',
                parent: null
              }, {
                cp1,
                path: 'source',
                parent: null
              }]
            }
          }]
        }
      }]
    }
  }]
};
*/


bbnData.prototype.addComponent = function(component, path, parent) {
  if (!(component instanceof bbnCp)) {
    throw new Error(bbn._("bbnData hasComponent must be called with a bbn component"));
  }

  if (typeof path === 'number') {
    path = path.toString();
  }

  /*
  const fpath = [[path]];
  if (parent) {
    let done = 0;
    bbn.fn.each(parent.refs, a => {
      if (a.component === component) {
        if ()
        fpath.push(a.path);
      }
    })
  }
  */

  if (!this.refs.filter(
    b => (b.component === component) && (b.path === path)
  ).length
  ) {
    this.refs.unshift({
      component,
      path,
      parent: parent || null
    });
  }
};
