/**
 * @method updateVisualStyleContainer
 * @return {Object}
 */
function updateVisualStyleContainer() {
  if (!this.visualStyleContainer) {
    this.visualStyleContainer = bbn.fn.createObject();
  }
  else if (!this.isVisual) {
    this.visualStyleContainer = bbn.fn.createObject();
  }

  if (!this.isVisual) {
    return;
  }

  //bbn.fn.warning("updateVisualStyleContainer");
  bbn.fn.iterate(this.views, view => {
    if (view.view) {
      view = view.view;
    }

    if (!this.visualStyleContainer[view.url]) {
      this.visualStyleContainer[view.url] = {};
    }

    if (!this.urls[view.url]) {
      return;
    }

    const ct = this.urls[view.url];
    if (!ct?.isVisible || this.visualShowAll) {
      if (this.visualStyleContainer[view.url].zoom != 0.5) {
        this.visualStyleContainer[view.url] = { zoom: 0.1 };
      }

      return;
    }

    let num = this.numVisuals + 1;
    let coord = [1, num, 1, num];
    switch (this.visualOrientation) {
      case 'up':
        coord[2] = 2;
        break;
      case 'down':
        coord[3] = num - 1;
        break;
      case 'left':
        coord[0] = 2;
        break;
      case 'right':
        coord[1] = num - 1;
        break;
    }


    if ((this.visualStyleContainer[view.url].zoom != 1)
      || (this.visualStyleContainer[view.url].gridColumnStart != coord[0])
      || (this.visualStyleContainer[view.url].gridColumnEnd != coord[1])
      || (this.visualStyleContainer[view.url].gridRowStart != coord[2])
      || (this.visualStyleContainer[view.url].gridRowEnd != coord[3])
    ) {
      this.visualStyleContainer[view.url] = {
        gridColumnStart: coord[0],
        gridColumnEnd: coord[1],
        gridRowStart: coord[2],
        gridRowEnd: coord[3],
        zoom: 1
      };
    }
  });

  return this.visualStyleContainer;
}


async function init(url) {
  if (!this.isInit) {
    if (this.numRegistered) {
      this.isInit = true;
    }

    await this.$forceUpdate();
    if (this.auto) {
      await this.route(url, true);
    }
  }
}


/**
 * Sets the 'dirtyContainers' property with the list of unsaved views
 * @method retrieveDirtyContainers
 */
function retrieveDirtyContainers() {
  this.dirtyContainers.splice(0, this.dirtyContainers.length);
  bbn.fn.iterate(this.urls, v => {
    if (v.dirty) {
      this.dirtyContainers.push({
        idx: v.currentIndex,
        url: v.url
      });
    }
  });
}


/**
 * @method onEscape
 * @param {Event} e
 */
function onEscape(e) {
  if (this.isVisual && this.visualShowAll) {
    this.visualShowAll = false;
    e.stopPropagation();
    e.preventDefault();
  }
}


/**
 * Function triggered every time a container is shown (at the start of the animation) to change the URL if needed.
 * @method enter
 * @param container
 */
function enter(container) {
  //bbn.fn.log("THE CONTAINER WILL BE SHOWN: ", container);
}


//Tabs
/**
 * Cuts the given string by 'maxTitleLength' property value
 * @method cutTitle
 * @param {String} title
 * @return {String}
 */
function cutTitle(title) {
  return bbn.fn.shorten(title, this.maxTitleLength)
}


/**
 * @method onResize
 * @return {Promise}
 */
function onResize() {
  this.keepCool(() => {
    let m = this.setResizeMeasures();
    let c = this.setContainerMeasures();
    if (m || c) {
      this.$emit('resize');
    }
    if (this.isVisual && (this.orientation === 'auto') && !this.lockedOrientation) {
      this.visualOrientation = this.lastKnownWidth > this.lastKnownHeight ? 'left' : 'top';
    }
  }, 'resize', 50);
}


function slashToHyphen(str) {
  return bbn.fn.replaceAll('/', '-', str);
}

export {
  updateVisualStyleContainer,
  init,
  retrieveDirtyContainers,
  onEscape,
  enter,
  cutTitle,
  onResize,
  slashToHyphen,
}