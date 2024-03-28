function getPane(obj) {
  if (!obj) {
    return false;
  }

  if (this.isVisual) {
    return obj.view.pane || false;
  }

  return obj.pane || false;
}


function addPane(paneId) {
  if (this.splittable) {
    if (!paneId) {
      paneId = bbn.fn.randomString().toLowerCase();
    }

    if (!bbn.fn.getRow(this.currentPanes, { id: paneId })) {
      this.currentPanes.push({
        id: paneId,
        tabs: [],
        selected: -1
      });
    }
  }

  return paneId;
}


function selectPaneTab(pane) {
  let view = pane.tabs[pane.selected];
  if (view) {
    view.last = bbn.fn.timestamp();
  }
}


function removePane(paneId) {
  if (this.splittable && this.currentPanes) {
    let paneIndex = bbn.fn.search(this.currentPanes, { id: paneId });
    let pane = this.currentPanes[paneIndex];
    if (!pane) {
      throw new Error(bbn._("Impossible to find the pane with ID %s", paneId));
    }
    if (pane.tabs.length) {
      throw new Error(bbn._("Impossible to remove the pane with ID %s as it has still containers inside", paneId));
    }

    this.currentPanes.splice(paneIndex, 1);
    if (this.routed) {
      this.$nextTick(() => {
        this.currentPanes.length ?
          this.getRef('splitter').init()
          : this.getRef('topSplitter').init()
      })
    }
  }
}


function addToPane(containerIdx, paneId) {
  let view = this.views[containerIdx];
  if (!view) {
    throw new Error(bbn._("Impossible to find the view with index") + ' ' + containerIdx);
  }

  if (view.dirty) {
    this.alert(bbn._("Save your changes or discard them before moving the container"));
    return;
  }

  let pane = bbn.fn.getRow(this.currentPanes, { id: paneId });
  if (!pane) {
    paneId = this.addPane(paneId);
    pane = bbn.fn.getRow(this.currentPanes, { id: paneId });
  }

  this.$set(this.views[containerIdx], "pane", paneId);
  pane.tabs.push(view);
  //this.$forceUpdate();
  if (containerIdx === this.selected) {
    this.selectClosest(containerIdx);
  }
  pane.selected = pane.tabs.length - 1;
}


function removeFromPane(containerIdx) {
  let view = this.views[containerIdx];
  if (view) {
    if (view.dirty) {
      this.alert(bbn._("Save your changes or discard them before moving the container"));
      return;
    }

    let paneId = view.pane;
    if (paneId) {
      let pane = bbn.fn.getRow(this.currentPanes, { id: paneId });
      if (pane && pane.tabs) {
        let idx = bbn.fn.search(pane.tabs, { idx: containerIdx });
        if (idx > -1) {
          this.selected = containerIdx;
          view.pane = false;
          this.$nextTick(() => {
            pane.tabs.splice(idx, 1);
            if (!pane.tabs.length) {
              this.removePane(paneId);
            }
            else if (pane.selected >= idx) {
              pane.selected--;
              this.getRef('pane' + pane.id).onResize(true);
            }
          })
        }
      }
    }
  }
}

export {
  getPane,
  addPane,
  selectPaneTab,
  removePane,
  addToPane,
  removeFromPane,
}