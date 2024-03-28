/**
 * Removes an element from the views
 * 
 * @method remove
 * @param {*} misc Index, URL or element
 * @param {Boolean} noCfg If set to true will not trigger the storage saving
 * @fires getIndex
 * @fires remove
 * @emit close
 * @return {Boolean}
 */
async function remove(misc, force) {
  let idx = this.getIndex(misc);
  if (idx > -1) {
    /** @var {Event} onBeforeClose beforeClose event, cancelable only if not force */
    let onBeforeClose = new Event('beforeClose', { cancelable: !force });
    /** @var {Event} onClose close event, cancelable only if not force */
    let onClose = new Event('close');
    this.$emit('beforeClose', idx, onBeforeClose);
    //bbn.fn.log("REMOVING " + this.views[idx].url)
    if (force || !onBeforeClose.defaultPrevented) {
      if (
        !force &&
        !this.ignoreDirty &&
        this.isDirty &&
        this.views[idx].dirty
      ) {
        this.confirm(this.confirmLeave, () => {
          // Looking for dirty ones in registered forms of each container
          let forms = this.urls[this.views[idx].url].forms;
          if (Array.isArray(forms) && forms.length) {
            bbn.fn.each(forms, (f, k) => {
              f.reset();
            });
          }

          return this.close(idx, true);
        });
      }
      else if (this.views[idx] && !this.views[idx].real) {
        bbn.fn.log(["ERMOVE FROM ROUTER " + idx, force])
        this.$emit('close', idx, onClose);
        this.views.splice(idx, 1);
        bbn.fn.log(["ERMOVE FROM ROUTER " + idx, bbn.fn.numProperties(this.urls), this.views.length])
        this.fixIndexes();
        await this.$forceUpdate();
        await this.$nextTick();
        return true;
      }
    }
  }
  return false;
}
/**
 * Adds an object with a valid url to the views.
 * @method add
 * @param {Object} obj
 * @param {Number} idx
 * @fires getFullBaseURL
 * @fires search
 * @fires isValidIndex
 * @fires getDefaultView
 */
async function add(obj, idx) {
  let index;
  //obj must be an object with property url
  if (bbn.fn.isObject(obj) && bbn.fn.isString(obj.url)) {
    obj.url = bbn.fn.replaceAll('//', '/', obj.url);
    // This is a component
    if (obj.$options) {
      if (!obj.current && !obj.currentURL) {
        if (bbn.env.path.indexOf(this.getFullBaseURL() + (obj.url ? obj.url + '/' : '')) === 0) {
          obj.currentURL = bbn.fn.substr(bbn.env.path, this.getFullBaseURL().length);
        }
        else {
          obj.currentURL = obj.url;
        }
      }
      /*
      else {
        if (obj.currentURL) {
          obj.currentURL = bbn.fn.replaceAll(obj.currentURL);
        }
      }
      */
      let obj2 = bbn.fn.extend(true, {}, obj.$options.propsData),
        props = obj.$options.props;
      bbn.fn.iterate(props, (v, i) => {
        if (!(i in obj2) && ('default' in v)) {
          obj2[i] = v.default;
        }
      });
      bbn.fn.iterate(this.getDefaultView(), (a, n) => {
        if (obj2[n] === undefined) {
          obj2[n] = a;
        }
      });
      obj2.real = true;

      // ---- ADDED 16/12/20 (Mirko) ----
      if (!obj2.current) {
        if (bbn.env.path.indexOf(this.getFullBaseURL() + (obj2.url ? obj2.url + '/' : '')) === 0) {
          obj2.current = bbn.fn.substr(bbn.env.path, this.getFullBaseURL().length);
        }
        else {
          obj2.current = obj2.url;
        }
      }
      else if ((obj2.current !== obj2.url) && (obj2.current.indexOf(obj2.url + '/') !== 0)) {
        obj2.current = obj2.url;
      }
      if (!obj2.current) {
        obj2.current = obj2.url;
      }
      if (obj2.content) {
        obj2.loaded = true;
      }
      // ---- END ----

      if (obj2.real && !this.hasRealContainers) {
        this.hasRealContainers = true;
      }
      if (obj2.url === '') {
        this.hasEmptyURL = true;
      }
      if (this.search(obj2.url) === false) {
        if (this.isValidIndex(idx)) {
          this.views.splice(idx, 0, obj2);
        }
        else if (this.hasRealContainers && (this.first !== 'real') && !obj2.real) {
          idx = bbn.fn.search(this.views, { real: true });
          this.views.splice(idx, 0, obj2);
        }
        else {
          this.views.push(obj2);
        }
      }
    }
    else {
      if (!obj.current) {
        if (bbn.env.path.indexOf(this.getFullBaseURL() + (obj.url ? obj.url + '/' : '')) === 0) {
          obj.current = bbn.fn.substr(bbn.env.path, this.getFullBaseURL().length);
        }
        else {
          obj.current = obj.url;
        }
      }
      else if ((obj.current !== obj.url) && (obj.current.indexOf(obj.url + '/') !== 0)) {
        obj.current = obj.url;
      }
      if (!obj.current) {
        obj.current = obj.url;
      }
      if (obj.content) {
        obj.loaded = true;
      }

      obj.events = {};
      if (obj.menu === undefined) {
        obj.menu = [];
      }

      index = this.search(obj.url);
      if (index !== false) {
        let o = this.views[index],
          cn = this.urls[this.views[index].url];
        if (idx === undefined) {
          idx = index;
        }
        if (cn && this.isValidIndex(idx)) {
          cn.currentIndex = idx;
        }
        if (obj.real) {
          return;
        }
        bbn.fn.iterate(obj, (a, n) => {
          if (o[n] !== a) {
            // Each new property must be set with $set
            this.$set(o, n, a)
          }
        });
      }
      else {
        let isValid = this.isValidIndex(idx);
        obj.selected = false;
        obj.idx = isValid ? idx : this.views.length;

        bbn.fn.iterate(this.getDefaultView(), (a, n) => {
          if (obj[n] === undefined) {
            // Each new property must be set with $set
            this.$set(obj, n, a);
          }
        });
        obj.uid = obj.url + '-' + bbn.fn.randomString();
        if (this.single && this.views.length) {
          await this.remove(0, true);
          obj.idx = 0;
          isValid = false;
        }

        if (isValid) {
          this.views.splice(obj.idx, 0, obj);
        }
        else if (this.hasRealContainers && (this.first !== 'real') && !obj.real) {
          idx = bbn.fn.search(this.views, { real: true });
          this.views.splice(idx, 0, obj);
        }
        else {
          this.views.push(obj);
        }
      }
    }
    this.fixIndexes();
  }
}
/**
 * Moves a container within the router, changes its idx.
 * 
 * @method move
 * @param {Number} from The index of the container to move
 * @param {Number} to   The index to which the container must go
 * @returns 
 */
function move(from, to) {
  if (!bbn.fn.isNumber(from, to) || (from === to) || !this.views[from] || !this.views[to]) {
    return;
  }

  bbn.fn.move(this.views, from, to);
  let selectedOk = false;
  if (from === this.selected) {
    this.selected = to;
    selectedOk = true;
  }

  for (let i = Math.min(from, to); i <= Math.max(from, to); i++) {
    if (this.views[i].idx !== i) {
      if (!selectedOk && (this.selected === this.views[i].idx)) {
        this.selected = i;
      }

      this.views[i].idx = i;
    }
  }

  this.setConfig();
}
/**
 * @method close
 * @param {Number}  idx   The index of the container to close
 * @param {Boolean} force Will close the container without prevention
 * @param {Boolean} noCfg If set to true will not trigger the storage saving
 * @fires remove
 * @fires getIndex
 * @fires activateIndex
 * @fires setConfig
 * @return {Boolean}
 */
function close(idx, force, noCfg) {
  bbn.fn.log("CLOSING CT")
  let res = this.remove(idx, force);
  if (res) {
    if (this.selected > idx) {
      this.selected--;
    }
    else if (idx === this.selected) {
      this.selectClosest(idx);
    }

    if (!noCfg) {
      this.setConfig();
    }
  }

  return res;
}
/**
 * @method closeAll
 * @fires close
 */
function closeAll(force) {
  for (let i = this.views.length - 1; i >= 0; i--) {
    if (!this.views[i].fixed && !this.views[i].pinned) {
      this.close(i, force, true);
    }
  }

  this.setConfig();
}
/**
 * @method closeallBut
 * @param {Number} idx
 * @fires close
 */
function closeAllBut(idx, force) {
  for (let i = this.views.length - 1; i >= 0; i--) {
    if (!this.views[i].fixed && !this.views[i].pinned && (i !== idx)) {
      this.close(i, force, true);
    }
  }
  this.setConfig();
}


function closeTab(idx) {
  this.close(this.tabsList[idx].idx);
}


/**
 * @method pin
 * @param {Number} idx
 * @fires isValidIndex
 * @fires setConfig
 * @emit beforePin
 * @emit pin
 */
function pin(idx) {
  if (this.isValidIndex(idx)) {
    let ev = new CustomEvent('beforePin', {
      cancelable: true
    });
    this.$emit('beforePin', idx, ev);
    if (!ev.defaultPrevented) {
      this.views[idx].pinned = true;
      this.setConfig();
      this.$emit('pin', idx);
    }
  }
}


/**
 * @method unpin
 * @param {Number} idx
 * @fires isValidIndex
 * @fires setConfig
 * @emit beforeUnpin
 * @emit unpin
 */
function unpin(idx) {
  if (this.isValidIndex(idx)) {
    let ev = new CustomEvent('beforeUnpin', {
      cancelable: true
    });
    this.$emit('beforeUnpin', idx, ev);
    if (!ev.defaultPrevented) {
      this.views[idx].pinned = false;
      this.setConfig();
      this.$emit('unpin', idx);
    }
  }
}

export {
  remove,
  add,
  move,
  close,
  closeAll,
  closeAllBut,
  closeTab,
  pin,
  unpin,
}