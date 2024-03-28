/**
 * Shows the container.
 * 
 * @method show
 */
function show() {
  if (!this.isPane) {
    this.router.selected = this.currentIndex;
    if (this.visual && this.router.visualShowAll) {
      this.router.visualShowAll = false;
    }
  }
}


function close() {
  if (!this.isPane) {
    this.router.close(this.currentIndex);
  }
}


function pin() {
  this.router.pin(this.currentIndex);
}


function unpin() {
  this.router.unpin(this.currentIndex);
}

export {
  show,
  close,
  pin,
  unpin,
}
