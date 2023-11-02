async (_t, _d) => {
  const _r = _t.$currentResult;
  let _bbnHash = "";
  bbn.fn.iterate(_r, (a) => {
    bbn.fn.iterate(a, (b) => {
      if (b.state !== "DEL") {
        b.state = "TMP";
      }
    });
  });
  const _bbnCurrentData = bbn.fn.createObject();
  _bbnCurrentData["_self"] = _t._self;
  _bbnCurrentData["currentPopup"] = _t.currentPopup;
  _bbnCurrentData["resizerObserved"] = _t.resizerObserved;
  _bbnCurrentData["currentCss"] = _t.currentCss;
  _bbnCurrentData["currentSource"] = _t.currentSource;
  _bbnCurrentData["currentTitle"] = _t.currentTitle;
  _bbnCurrentData["currentOptions"] = _t.currentOptions;
  _bbnCurrentData["currentCached"] = _t.currentCached;
  _bbnCurrentData["currentScrollable"] = _t.currentScrollable;
  _bbnCurrentData["currentComponent"] = _t.currentComponent;
  _bbnCurrentData["currentIcon"] = _t.currentIcon;
  _bbnCurrentData["currentNotext"] = _t.currentNotext;
  _bbnCurrentData["currentContent"] = _t.currentContent;
  _bbnCurrentData["currentMenu"] = _t.currentMenu;
  _bbnCurrentData["currentFcolor"] = _t.currentFcolor;
  _bbnCurrentData["currentBcolor"] = _t.currentBcolor;
  _bbnCurrentData["currentAdvert"] = _t.currentAdvert;
  _bbnCurrentData["currentHelp"] = _t.currentHelp;
  _bbnCurrentData["currentImessages"] = _t.currentImessages;
  _bbnCurrentData["currentScript"] = _t.currentScript;
  _bbnCurrentData["currentCurrent"] = _t.currentCurrent;
  _bbnCurrentData["currentCfg"] = _t.currentCfg;
  _bbnCurrentData["currentEvents"] = _t.currentEvents;
  _bbnCurrentData["currentDisabled"] = _t.currentDisabled;
  _bbnCurrentData["currentHidden"] = _t.currentHidden;
  _bbnCurrentData["isPane"] = _t.isPane;
  _bbnCurrentData["currentView"] = _t.currentView;
  _bbnCurrentData["isVisible"] = _t.isVisible;
  _bbnCurrentData["isVisualVisible"] = _t.isVisualVisible;
  _bbnCurrentData["visualStyle"] = _t.visualStyle;
  _bbnCurrentData["anonComponent"] = _t.anonComponent;
  _bbnCurrentData["ready"] = _t.ready;
  _bbnCurrentData["bbnUid"] = _t.bbnUid;
  _bbnCurrentData["componentClass"] = _t.componentClass;
  _bbnCurrentData["isMobile"] = _t.isMobile;
  _bbnCurrentData["isTablet"] = _t.isTablet;
  _bbnCurrentData["_currentPopup"] = _t._currentPopup;
  _bbnCurrentData["parentResizer"] = _t.parentResizer;
  _bbnCurrentData["onParentResizerEmit"] = _t.onParentResizerEmit;
  _bbnCurrentData["ResizerObserver"] = _t.ResizerObserver;
  _bbnCurrentData["lastKnownHeight"] = _t.lastKnownHeight;
  _bbnCurrentData["lastKnownWidth"] = _t.lastKnownWidth;
  _bbnCurrentData["lastKnownCtHeight"] = _t.lastKnownCtHeight;
  _bbnCurrentData["lastKnownCtWidth"] = _t.lastKnownCtWidth;
  _bbnCurrentData["isResizing"] = _t.isResizing;
  _bbnCurrentData["computedStyle"] = _t.computedStyle;
  _bbnCurrentData["observersCopy"] = _t.observersCopy;
  _bbnCurrentData["observerDirty"] = _t.observerDirty;
  _bbnCurrentData["observerValue"] = _t.observerValue;
  _bbnCurrentData["observers"] = _t.observers;
  _bbnCurrentData["observerID"] = _t.observerID;
  _bbnCurrentData["observationTower"] = _t.observationTower;
  _bbnCurrentData["observerUID"] = _t.observerUID;
  _bbnCurrentData["router"] = _t.router;
  _bbnCurrentData["dirty"] = _t.dirty;
  _bbnCurrentData["isComponent"] = _t.isComponent;
  _bbnCurrentData["fullScreen"] = _t.fullScreen;
  _bbnCurrentData["componentName"] = _t.componentName;
  _bbnCurrentData["popups"] = _t.popups;
  _bbnCurrentData["routers"] = _t.routers;
  _bbnCurrentData["currentScreenshotDelay"] = _t.currentScreenshotDelay;
  _bbnCurrentData["isComponentActive"] = _t.isComponentActive;
  _bbnCurrentData["isLoaded"] = _t.isLoaded;
  _bbnCurrentData["isPinned"] = _t.isPinned;
  _bbnCurrentData["isStatic"] = _t.isStatic;
  _bbnCurrentData["currentURL"] = _t.currentURL;
  _bbnCurrentData["isOver"] = _t.isOver;
  _bbnCurrentData["_bbn_container"] = _t._bbn_container;
  _bbnCurrentData["thumbnail"] = _t.thumbnail;
  _bbnCurrentData["forms"] = _t.forms;
  _bbnCurrentData["errorStatus"] = _t.errorStatus;
  _bbnCurrentData["componentDefinition"] = _t.componentDefinition;
  _bbnCurrentData["componentTemplate"] = _t.componentTemplate;
  _bbnCurrentData["componentCSS"] = _t.componentCSS;
  _bbnCurrentData["currentIndex"] = _t.currentIndex;
  await (async function (
    $props,
    $el,
    $root,
    $attr,
    $event,
    $parent,
    $options,
    $namespaces,
    $children,
    $refs,
    $slots,
    $isCreated,
    $isMounted,
    _self,
    _,
    $emit,
    $is,
    $isComponent,
    $nextTick,
    $off,
    $on,
    $once,
    $retrieveComponent,
    $retrieveElement,
    ancestors,
    closest,
    extend,
    find,
    findAll,
    findAllByKey,
    findByKey,
    getChildByKey,
    getComponentName,
    getComponents,
    getRef,
    source,
    observer,
    idx,
    last,
    uid,
    visual,
    screenshotDelay,
    pane,
    error,
    component,
    title,
    options,
    cached,
    scrollable,
    icon,
    notext,
    content,
    menu,
    loaded,
    loading,
    fcolor,
    bcolor,
    load,
    selected,
    css,
    advert,
    help,
    imessages,
    script,
    static,
    pinned,
    url,
    current,
    real,
    cfg,
    events,
    disabled,
    hidden,
    portal,
    _retrievePopup,
    exportComponent,
    getPopup,
    confirm,
    alert,
    post,
    postOut,
    isActiveResizer,
    onResize,
    setResizeMeasures,
    setContainerMeasures,
    getParentResizer,
    setResizeEvent,
    unsetResizeEvent,
    selfEmit,
    formatSize,
    setComputedStyle,
    observerCheck,
    isObserved,
    observerWatch,
    observerRelay,
    observerEmit,
    observerClear,
    getFullCurrentURL,
    getFullURL,
    setLoaded,
    randomName,
    show,
    close,
    setCurrent,
    setTitle,
    setIcon,
    setColor,
    popup,
    getComponent,
    enter,
    pin,
    unpin,
    reload,
    addMenu,
    deleteMenu,
    init,
    showMenu,
    setScreenshot,
    unsetScreenshot,
    saveScreenshot,
    takeScreenshot,
    updateScreenshot,
    registerRouter,
    unregisterRouter,
    currentPopup,
    resizerObserved,
    currentCss,
    currentSource,
    currentTitle,
    currentOptions,
    currentCached,
    currentScrollable,
    currentComponent,
    currentIcon,
    currentNotext,
    currentContent,
    currentMenu,
    currentFcolor,
    currentBcolor,
    currentAdvert,
    currentHelp,
    currentImessages,
    currentScript,
    currentCurrent,
    currentCfg,
    currentEvents,
    currentDisabled,
    currentHidden,
    isPane,
    currentView,
    isVisible,
    isVisualVisible,
    visualStyle,
    anonComponent,
    ready,
    bbnUid,
    componentClass,
    isMobile,
    isTablet,
    _currentPopup,
    parentResizer,
    onParentResizerEmit,
    ResizerObserver,
    lastKnownHeight,
    lastKnownWidth,
    lastKnownCtHeight,
    lastKnownCtWidth,
    isResizing,
    computedStyle,
    observersCopy,
    observerDirty,
    observerValue,
    observers,
    observerID,
    observationTower,
    observerUID,
    router,
    dirty,
    isComponent,
    fullScreen,
    componentName,
    popups,
    routers,
    currentScreenshotDelay,
    isComponentActive,
    isLoaded,
    isPinned,
    isStatic,
    currentURL,
    isOver,
    _bbn_container,
    thumbnail,
    forms,
    errorStatus,
    componentDefinition,
    componentTemplate,
    componentCSS,
    currentIndex
  ) {
    // _setInternalResult
    const _sIr = (_name, _exp, _hash) => {
      return _t.$_setInternalResult(_r, _name, _exp, _hash);
    };
    // _getInternalState
    const _gIs = (_name, _hash) => {
      return _t.$_getInternalState(_r, _name, _hash);
    };
    // _getInternalValue
    const _gIv = (_name, _hash) => {
      let val = undefined;
      try {
        val = _t.$_getInternalValue(_r, _name, _hash);
      } catch (e) {
        bbn.fn.log("THERE SHOULD BE AN ERROR", _name, _t);
      }
      return val;
    };
    const _eles = bbn.fn.createObject({ "-": _t.$el });
    let _isCondTrue = false;
    let _props = bbn.fn.createObject();
    let _lastId = "";
    let _tmp;
    let _tmp2;
    let _node;
    let isAnew;
    let oldEle;
    const _cps = [];
    const _parents = [_t.$el];
    let $_ct = _t.$el;
    const _forgotten = bbn.fn.createObject();
    const $_go = bbn.fn.createObject();
    let $_num = 0;
    const $_final = [];
    _r._num++;
    _props["class"] = _sIr(
      "6baf0071-d07674f",
      [
        componentClass,
        {
          "bbn-container-ratio": router?.visualShowAll,
          "bbn-overlay": !visual && router?.scrollContent,
          "bbn-w-100": !router?.scrollContent && !router?.visualShowAll,
        },
      ],
      _bbnHash
    );
    _props["bbn-portal"] = "undefined";
    _props["bbn-show"] = _sIr(
      "4345c4f85309aa58",
      (!router?.isVisual && isVisible) || isVisualVisible || isPane,
      _bbnHash
    );
    if (!_t.$el.bbnSchema.directives) {
      _t.$el.bbnSchema.directives = bbn.fn.createObject();
    }
    if (!_t.$el.bbnSchema.directives["bbn-portal"]) {
      _t.$el.bbnSchema.directives["bbn-portal"] = bbn.fn.clone(
        _t.$tpl[0].directives["bbn-portal"]
      );
    }
    _t.$el.bbnSchema.directives["bbn-portal"].value = _sIr(
      "-3aa87e7e-7f5fbd5e",
      portal,
      _bbnHash
    );
    if (!_t.$el.bbnDirectives) {
      Object.defineProperty(_t.$el, "bbnDirectives", {
        value: bbn.fn.createObject(),
        writable: false,
        configurable: false,
      });
    }
    if (!_t.$el.bbnDirectives["{$n}"]) {
      _t.$el.bbnDirectives["bbn-portal"] = bbn.fn.createObject();
    }
    if (!_t.$numBuild) {
      bbn.cp.insertDirectives(_t.$el.bbnSchema.directives, _t.$el);
    }
    if (_t.$numBuild) {
      bbn.cp.updateDirectives(
        { "bbn-portal": _t.$el.bbnSchema.directives["bbn-portal"] },
        _t.$el
      );
    }
    _t.$updateFromSchema(_props);
    if (_r._num === 1) {
      if (!_eles["-"].bbnSchema?.events?.["subready"]) {
        _eles["-"].addEventListener("subready", (_bbnEventObject) => {
          let $event = _bbnEventObject;
          $event.stopImmediatePropagation();
          _t.$forceUpdate();
        });
      }
    }

    // Taking care of the node with no tag 0-0
    oldEle = _t.$retrieveElement("0-0", _bbnHash);
    _node = _t.$currentMap["0-0"];
    _eles["0-0"] = oldEle;
    if (!Object.hasOwn($_go, "0-0")) {
      $_go["0-0"] = !oldEle;
    }
    if (!$_go["0-0"] && !_eles["0-0"]) {
      $_go["0-0"] = true;
    }

    _sIr(
      "03e48e9c08a914dc",
      `
  `,
      _bbnHash
    );
    if ($_go["0-0"] || _gIs("03e48e9c08a914dc", _bbnHash) !== "OK") {
      if (
        _eles["0-0"] &&
        _eles["0-0"].textContent !== _gIv("03e48e9c08a914dc", _bbnHash)
      ) {
        _eles["0-0"].textContent = _gIv("03e48e9c08a914dc", _bbnHash);
      } else {
        _eles["0-0"] = _t.$createText(
          {
            id: "0-0",
            hash: "03e48e9c08a914dc",
            text: _gIv("03e48e9c08a914dc", _bbnHash),
            loopHash: _bbnHash,
          },
          _parents.at(-1)
        );
        if (_parents.at(-1) === _t.$el) {
          $_final.push({ ele: _eles["0-0"], position: $_num });
        }
      }
    }
    if (_parents.at(-1) === _t.$el) {
      $_num++;
    }

    // Taking care of the node div 0-1
    oldEle = _t.$retrieveElement("0-1", _bbnHash);
    _node = _t.$currentMap["0-1"];
    _eles["0-1"] = oldEle;
    if (!Object.hasOwn($_go, "0-1")) {
      $_go["0-1"] = !oldEle;
    }
    _sIr("2518c53b7640ca3b", !router?.scrollContent, _bbnHash);
    if (!_forgotten["0-1"]) {
      _forgotten["0-1"] = bbn.fn.createObject();
    }
    _forgotten["0-1"][_bbnHash || "_root"] = _gIv("2518c53b7640ca3b", _bbnHash);
    if (_forgotten["0-1"][_bbnHash || "_root"]) {
      _eles["0-1"] = _parents.at(-1);
      $_go["0-1"] = false;
    } else if (["NEW", "MOD"].includes(_gIs("2518c53b7640ca3b", _bbnHash))) {
      $_go["0-1"] = true;
    }

    if (!$_go["0-1"] && !_eles["0-1"]) {
      $_go["0-1"] = true;
    }

    _props = bbn.fn.createObject();
    _tmp = _sIr(
      "-31cf7be77306fe79",
      {
        "bbn-overlay": true,
        "bbn-container-full-screen": fullScreen,
      },
      _bbnHash
    );
    if (_tmp !== undefined) {
      _props["class"] = bbn.cp.convertClasses(_tmp);
    }
    if (
      !$_go["0-1"] &&
      _node.attr["class"] &&
      !Object.hasOwn(_node.attr["class"], "value") &&
      _node.attr["class"].hash &&
      _gIs(_node.attr["class"].hash, _bbnHash) !== "OK"
    ) {
      $_go["0-1"] = true;
    }

    if ($_go["0-1"] && !_forgotten["0-1"]?.[_bbnHash || "_root"]) {
      //  bbn.fn.log("IN TODO " + _t.$options.name);
      //  bbn.fn.log("DOING 0-1 div");
      _tmp = bbn.fn.clone(_node);
      if (_bbnHash) {
        _tmp.loopHash = _bbnHash;
      }
      _tmp.props = _props;
      isAnew = false;
      if (
        _eles["0-1"] !== _t.$el &&
        !_forgotten["0-1"]?.[_bbnHash || "_root"] &&
        (!_eles["0-1"] ||
          bbn.fn.isComment(_eles["0-1"]) ||
          !bbn.cp.isTag(_tmp.tag, _eles["0-1"]))
      ) {
        isAnew = true;
      }
      if (isAnew) {
        _eles["0-1"] = await _t.$createElement(_tmp, _parents.at(-1));
        if (_parents.at(-1) === _t.$el) {
          $_final.push({ ele: _eles["0-1"], position: $_num });
        }
      } else {
        _t.$updateElementFromProps(_tmp, _eles["0-1"]);
      }
      if (_parents.at(-1) === _t.$el) {
        $_num++;
      }
    }
    if (_gIs("2518c53b7640ca3b", _bbnHash) === "MOD") {
      if (_forgotten["0-1"]?.[_bbnHash || "_root"]) {
        if (oldEle) {
          oldEle.childNodes.forEach((o) => {
            _parents.at(-1).appendChild(o);
          });
          bbn.fn.log("From here");
          _t.$removeDOM(oldEle);
        }
        // Ele is the current parent
        _eles["0-1"] = _parents.at(-1);
      } else {
        _parents.at(-1).childNodes.forEach((o) => {
          if (o.bbnId.indexOf("0-1" + "-") === 0) {
            _eles["0-1"].appendChild(o);
          }
        });
      }
    } else if (_forgotten["0-1"]?.[_bbnHash || "_root"]) {
      _eles["0-1"] = _parents.at(-1);
    }

    if (_eles["0-1"]) {
      _parents.push(_eles["0-1"]);

      // Taking care of the node with no tag 0-1-0
      oldEle = _t.$retrieveElement("0-1-0", _bbnHash);
      _node = _t.$currentMap["0-1-0"];
      _eles["0-1-0"] = oldEle;
      if (!Object.hasOwn($_go, "0-1-0")) {
        $_go["0-1-0"] = !oldEle;
      }
      if (!$_go["0-1-0"] && !_eles["0-1-0"]) {
        $_go["0-1-0"] = true;
      }

      _sIr(
        "-6304abe4-7727b024",
        `
    `,
        _bbnHash
      );
      if ($_go["0-1-0"] || _gIs("-6304abe4-7727b024", _bbnHash) !== "OK") {
        if (
          _eles["0-1-0"] &&
          _eles["0-1-0"].textContent !== _gIv("-6304abe4-7727b024", _bbnHash)
        ) {
          _eles["0-1-0"].textContent = _gIv("-6304abe4-7727b024", _bbnHash);
        } else {
          _eles["0-1-0"] = _t.$createText(
            {
              id: "0-1-0",
              hash: "-6304abe4-7727b024",
              text: _gIv("-6304abe4-7727b024", _bbnHash),
              loopHash: _bbnHash,
            },
            _parents.at(-1)
          );
          if (_parents.at(-1) === _t.$el) {
            $_final.push({ ele: _eles["0-1-0"], position: $_num });
          }
        }
      }
      if (_parents.at(-1) === _t.$el) {
        $_num++;
      }

      // Taking care of the node transition 0-1-1
      oldEle = _t.$retrieveElement("0-1-1", _bbnHash);
      _node = _t.$currentMap["0-1-1"];
      _eles["0-1-1"] = oldEle;
      if (!Object.hasOwn($_go, "0-1-1")) {
        $_go["0-1-1"] = !oldEle;
      }
      _eles["0-1-1"] = _parents.at(-1);
      $_go["0-1-1"] = false;

      _props = bbn.fn.createObject();
      _props["name"] = "fade";

      if (_eles["0-1-1"]) {
        _parents.push(_eles["0-1-1"]);

        // Taking care of the node with no tag 0-1-1-0
        oldEle = _t.$retrieveElement("0-1-1-0", _bbnHash);
        _node = _t.$currentMap["0-1-1-0"];
        _eles["0-1-1-0"] = oldEle;
        if (!Object.hasOwn($_go, "0-1-1-0")) {
          $_go["0-1-1-0"] = !oldEle;
        }
        if (!$_go["0-1-1-0"] && !_eles["0-1-1-0"]) {
          $_go["0-1-1-0"] = true;
        }

        _sIr(
          "4b76b99c-10e5f524",
          `
      `,
          _bbnHash
        );
        if ($_go["0-1-1-0"] || _gIs("4b76b99c-10e5f524", _bbnHash) !== "OK") {
          if (
            _eles["0-1-1-0"] &&
            _eles["0-1-1-0"].textContent !== _gIv("4b76b99c-10e5f524", _bbnHash)
          ) {
            _eles["0-1-1-0"].textContent = _gIv("4b76b99c-10e5f524", _bbnHash);
          } else {
            _eles["0-1-1-0"] = _t.$createText(
              {
                id: "0-1-1-0",
                hash: "4b76b99c-10e5f524",
                text: _gIv("4b76b99c-10e5f524", _bbnHash),
                loopHash: _bbnHash,
              },
              _parents.at(-1)
            );
            if (_parents.at(-1) === _t.$el) {
              $_final.push({ ele: _eles["0-1-1-0"], position: $_num });
            }
          }
        }
        if (_parents.at(-1) === _t.$el) {
          $_num++;
        }

        // Taking care of the node div 0-1-1-1
        oldEle = _t.$retrieveElement("0-1-1-1", _bbnHash);
        _node = _t.$currentMap["0-1-1-1"];
        _eles["0-1-1-1"] = oldEle;
        if (!Object.hasOwn($_go, "0-1-1-1")) {
          $_go["0-1-1-1"] = !oldEle;
        }
        if (!$_go["0-1-1-1"] && !_eles["0-1-1-1"]) {
          $_go["0-1-1-1"] = true;
        }

        _props = bbn.fn.createObject();
        _tmp = _sIr(
          "51ef89f64ae50e56",
          {
            "bbn-overlay":
              (isPane || !router?.isVisual) && router?.scrollContent,
            "bbn-flex-height":
              !isPane &&
              (router?.isVisual || fullScreen) &&
              router?.scrollContent,
            "bbn-w-100": visual || !router?.scrollContent,
          },
          _bbnHash
        );
        if (_tmp !== undefined) {
          _props["class"] = bbn.cp.convertClasses(_tmp);
        }
        if (
          !$_go["0-1-1-1"] &&
          _node.attr["class"] &&
          !Object.hasOwn(_node.attr["class"], "value") &&
          _node.attr["class"].hash &&
          _gIs(_node.attr["class"].hash, _bbnHash) !== "OK"
        ) {
          $_go["0-1-1-1"] = true;
        }
        _tmp = _sIr(
          "-29f47ab47da15b2c",
          isVisible || router?.isVisual,
          _bbnHash
        );
        if (_tmp !== undefined) {
          _props["bbn-show"] = _tmp;
        }
        if (
          !$_go["0-1-1-1"] &&
          _node.attr["bbn-show"] &&
          !Object.hasOwn(_node.attr["bbn-show"], "value") &&
          _node.attr["bbn-show"].hash &&
          _gIs(_node.attr["bbn-show"].hash, _bbnHash) !== "OK"
        ) {
          $_go["0-1-1-1"] = true;
        }

        if ($_go["0-1-1-1"] && !_forgotten["0-1-1-1"]?.[_bbnHash || "_root"]) {
          //  bbn.fn.log("IN TODO " + _t.$options.name);
          //  bbn.fn.log("DOING 0-1-1-1 div");
          _tmp = bbn.fn.clone(_node);
          if (_bbnHash) {
            _tmp.loopHash = _bbnHash;
          }
          _tmp.props = _props;
          isAnew = false;
          if (
            _eles["0-1-1-1"] !== _t.$el &&
            !_forgotten["0-1-1-1"]?.[_bbnHash || "_root"] &&
            (!_eles["0-1-1-1"] ||
              bbn.fn.isComment(_eles["0-1-1-1"]) ||
              !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1"]))
          ) {
            isAnew = true;
          }
          if (isAnew) {
            _eles["0-1-1-1"] = await _t.$createElement(_tmp, _parents.at(-1));
            if (_parents.at(-1) === _t.$el) {
              $_final.push({ ele: _eles["0-1-1-1"], position: $_num });
            }
          } else {
            _t.$updateElementFromProps(_tmp, _eles["0-1-1-1"]);
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }
        }

        if (_eles["0-1-1-1"]) {
          _parents.push(_eles["0-1-1-1"]);

          // Taking care of the node with no tag 0-1-1-1-0
          oldEle = _t.$retrieveElement("0-1-1-1-0", _bbnHash);
          _node = _t.$currentMap["0-1-1-1-0"];
          _eles["0-1-1-1-0"] = oldEle;
          if (!Object.hasOwn($_go, "0-1-1-1-0")) {
            $_go["0-1-1-1-0"] = !oldEle;
          }
          if (!$_go["0-1-1-1-0"] && !_eles["0-1-1-1-0"]) {
            $_go["0-1-1-1-0"] = true;
          }

          _sIr(
            "48aebf1c5a2e45dc",
            `
        `,
            _bbnHash
          );
          if (
            $_go["0-1-1-1-0"] ||
            _gIs("48aebf1c5a2e45dc", _bbnHash) !== "OK"
          ) {
            if (
              _eles["0-1-1-1-0"] &&
              _eles["0-1-1-1-0"].textContent !==
                _gIv("48aebf1c5a2e45dc", _bbnHash)
            ) {
              _eles["0-1-1-1-0"].textContent = _gIv(
                "48aebf1c5a2e45dc",
                _bbnHash
              );
            } else {
              _eles["0-1-1-1-0"] = _t.$createText(
                {
                  id: "0-1-1-1-0",
                  hash: "48aebf1c5a2e45dc",
                  text: _gIv("48aebf1c5a2e45dc", _bbnHash),
                  loopHash: _bbnHash,
                },
                _parents.at(-1)
              );
              if (_parents.at(-1) === _t.$el) {
                $_final.push({ ele: _eles["0-1-1-1-0"], position: $_num });
              }
            }
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }

          // Taking care of the node div 0-1-1-1-1

          _isCondTrue = false;
          // Checking the set of conditions (if any other) on the first condition
          $_go["0-1-1-1-1"] = false;
          _isCondTrue = _sIr(
            "CONDITION0-1-1-1-1--2bbd41e37519f47d",
            !isPane && (visual || fullScreen),
            _bbnHash
          );
          if (_gIs("CONDITION0-1-1-1-1--2bbd41e37519f47d", _bbnHash) !== "OK") {
            $_go["0-1-1-1-1"] = true;
            let _tmp = _gIv("CONDITION0-1-1-1-1--2bbd41e37519f47d", _bbnHash);
            let _e;
            if (!_tmp) {
              _e = _t.$retrieveElement("0-1-1-1-1", _bbnHash);
              if (_e && !bbn.fn.isComment(_e)) {
                let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                _t.$removeDOM(_e);
                _e = false;
              }
              if (!_e) {
                _eles["0-1-1-1-1"] = await _t.$createElement(
                  {
                    id: "0-1-1-1-1",
                    hash: "CONDITION0-1-1-1-1--2bbd41e37519f47d",
                    loopHash: _bbnHash,
                    conditionId: "R5a6AnAK285shj0Q0hU5DR3JZF0440Ln",
                    comment: true,
                  },
                  _parents.at(-1)
                );
              }
            }
          }
          if (_gIv("CONDITION0-1-1-1-1--2bbd41e37519f47d", _bbnHash)) {
            oldEle = _t.$retrieveElement("0-1-1-1-1", _bbnHash);
            _node = _t.$currentMap["0-1-1-1-1"];
            _eles["0-1-1-1-1"] = oldEle;
            if (!Object.hasOwn($_go, "0-1-1-1-1")) {
              $_go["0-1-1-1-1"] = !oldEle;
            }
            if (!$_go["0-1-1-1-1"] && !_eles["0-1-1-1-1"]) {
              $_go["0-1-1-1-1"] = true;
            }

            _props = bbn.fn.createObject();
            _tmp = _sIr(
              "-8dd4929121e0417",
              "bbn-transition-bcolor bbn-b bbn-spadded bbn-flex-width " +
                (isVisible ? " bbn-m" : ""),
              _bbnHash
            );
            if (_tmp !== undefined) {
              _props["class"] = bbn.cp.convertClasses(_tmp);
            }
            if (
              !$_go["0-1-1-1-1"] &&
              _node.attr["class"] &&
              !Object.hasOwn(_node.attr["class"], "value") &&
              _node.attr["class"].hash &&
              _gIs(_node.attr["class"].hash, _bbnHash) !== "OK"
            ) {
              $_go["0-1-1-1-1"] = true;
            }
            _tmp = _sIr(
              "-2c2f7c43adb509c",
              {
                fontSize: isVisible && !router?.visualShowAll ? null : "10rem",
                backgroundColor: bcolor || router?.bcolor,
                color: fcolor || router?.fcolor,
              },
              _bbnHash
            );
            if (_tmp !== undefined) {
              _props["style"] = bbn.cp.convertStyles(_tmp);
            }
            if (
              !$_go["0-1-1-1-1"] &&
              _node.attr["style"] &&
              !Object.hasOwn(_node.attr["style"], "value") &&
              _node.attr["style"].hash &&
              _gIs(_node.attr["style"].hash, _bbnHash) !== "OK"
            ) {
              $_go["0-1-1-1-1"] = true;
            }

            if (
              $_go["0-1-1-1-1"] &&
              !_forgotten["0-1-1-1-1"]?.[_bbnHash || "_root"]
            ) {
              //  bbn.fn.log("IN TODO " + _t.$options.name);
              //  bbn.fn.log("DOING 0-1-1-1-1 div");
              _tmp = bbn.fn.clone(_node);
              if (_bbnHash) {
                _tmp.loopHash = _bbnHash;
              }
              _tmp.props = _props;
              isAnew = false;
              if (
                _eles["0-1-1-1-1"] !== _t.$el &&
                !_forgotten["0-1-1-1-1"]?.[_bbnHash || "_root"] &&
                (!_eles["0-1-1-1-1"] ||
                  bbn.fn.isComment(_eles["0-1-1-1-1"]) ||
                  !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1"]))
              ) {
                isAnew = true;
              }
              if (isAnew) {
                _eles["0-1-1-1-1"] = await _t.$createElement(
                  _tmp,
                  _parents.at(-1)
                );
                if (_parents.at(-1) === _t.$el) {
                  $_final.push({ ele: _eles["0-1-1-1-1"], position: $_num });
                }
              } else {
                _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1"]);
              }
              if (_parents.at(-1) === _t.$el) {
                $_num++;
              }
            }

            if (_eles["0-1-1-1-1"]) {
              _parents.push(_eles["0-1-1-1-1"]);

              // Taking care of the node with no tag 0-1-1-1-1-0
              oldEle = _t.$retrieveElement("0-1-1-1-1-0", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-1-0"];
              _eles["0-1-1-1-1-0"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-1-0")) {
                $_go["0-1-1-1-1-0"] = !oldEle;
              }
              if (!$_go["0-1-1-1-1-0"] && !_eles["0-1-1-1-1-0"]) {
                $_go["0-1-1-1-1-0"] = true;
              }

              _sIr(
                "-28049b64-772aff24",
                `
          `,
                _bbnHash
              );
              if (
                $_go["0-1-1-1-1-0"] ||
                _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
              ) {
                if (
                  _eles["0-1-1-1-1-0"] &&
                  _eles["0-1-1-1-1-0"].textContent !==
                    _gIv("-28049b64-772aff24", _bbnHash)
                ) {
                  _eles["0-1-1-1-1-0"].textContent = _gIv(
                    "-28049b64-772aff24",
                    _bbnHash
                  );
                } else {
                  _eles["0-1-1-1-1-0"] = _t.$createText(
                    {
                      id: "0-1-1-1-1-0",
                      hash: "-28049b64-772aff24",
                      text: _gIv("-28049b64-772aff24", _bbnHash),
                      loopHash: _bbnHash,
                    },
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-1-0"],
                      position: $_num,
                    });
                  }
                }
              }
              if (_parents.at(-1) === _t.$el) {
                $_num++;
              }

              // Taking care of the node div 0-1-1-1-1-1
              oldEle = _t.$retrieveElement("0-1-1-1-1-1", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-1-1"];
              _eles["0-1-1-1-1-1"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-1-1")) {
                $_go["0-1-1-1-1-1"] = !oldEle;
              }
              if (!$_go["0-1-1-1-1-1"] && !_eles["0-1-1-1-1-1"]) {
                $_go["0-1-1-1-1-1"] = true;
              }

              _props = bbn.fn.createObject();
              _props["class"] = "bbn-flex-fill bbn-vmiddle";

              if (
                $_go["0-1-1-1-1-1"] &&
                !_forgotten["0-1-1-1-1-1"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-1-1-1-1 div");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-1-1-1-1"] !== _t.$el &&
                  !_forgotten["0-1-1-1-1-1"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-1-1-1-1"] ||
                    bbn.fn.isComment(_eles["0-1-1-1-1-1"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-1"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-1-1-1-1"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-1-1"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-1"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
              }

              if (_eles["0-1-1-1-1-1"]) {
                _parents.push(_eles["0-1-1-1-1-1"]);

                // Taking care of the node with no tag 0-1-1-1-1-1-0
                oldEle = _t.$retrieveElement("0-1-1-1-1-1-0", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-1-1-0"];
                _eles["0-1-1-1-1-1-0"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-1-1-0")) {
                  $_go["0-1-1-1-1-1-0"] = !oldEle;
                }
                if (!$_go["0-1-1-1-1-1-0"] && !_eles["0-1-1-1-1-1-0"]) {
                  $_go["0-1-1-1-1-1-0"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-1-1-0"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-1-1-0"] &&
                    _eles["0-1-1-1-1-1-0"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-1-1-1-1-0"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-1-1-0"] = _t.$createText(
                      {
                        id: "0-1-1-1-1-1-0",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-1-1-0"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node bbn-context 0-1-1-1-1-1-1

                _isCondTrue = false;
                // Checking the set of conditions (if any other) on the first condition
                $_go["0-1-1-1-1-1-1"] = false;
                _isCondTrue = _sIr(
                  "CONDITION0-1-1-1-1-1-1-015dd56e2e62db4e",
                  isVisible,
                  _bbnHash
                );
                if (
                  _gIs("CONDITION0-1-1-1-1-1-1-015dd56e2e62db4e", _bbnHash) !==
                  "OK"
                ) {
                  $_go["0-1-1-1-1-1-1"] = true;
                  let _tmp = _gIv(
                    "CONDITION0-1-1-1-1-1-1-015dd56e2e62db4e",
                    _bbnHash
                  );
                  let _e;
                  if (!_tmp) {
                    _e = _t.$retrieveElement("0-1-1-1-1-1-1", _bbnHash);
                    if (_e && !bbn.fn.isComment(_e)) {
                      let _cp =
                        bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                      _t.$removeDOM(_e);
                      _e = false;
                    }
                    if (!_e) {
                      _eles["0-1-1-1-1-1-1"] = await _t.$createElement(
                        {
                          id: "0-1-1-1-1-1-1",
                          hash: "CONDITION0-1-1-1-1-1-1-015dd56e2e62db4e",
                          loopHash: _bbnHash,
                          conditionId: "O45b3MJwiPF6hvQTD4k1HOCr9oOQJj5b",
                          comment: true,
                        },
                        _parents.at(-1)
                      );
                    }
                  }
                }
                if (_gIv("CONDITION0-1-1-1-1-1-1-015dd56e2e62db4e", _bbnHash)) {
                  oldEle = _t.$retrieveElement("0-1-1-1-1-1-1", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-1-1"];
                  _eles["0-1-1-1-1-1-1"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-1-1")) {
                    $_go["0-1-1-1-1-1-1"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-1-1"] && !_eles["0-1-1-1-1-1-1"]) {
                    $_go["0-1-1-1-1-1-1"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp = _sIr(
                    "62c14e5848963518",
                    _("Container menu"),
                    _bbnHash
                  );
                  if (_tmp !== undefined) {
                    _props["floaterTitle"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-1-1-1"] &&
                    _node.attr["floaterTitle"] &&
                    !Object.hasOwn(_node.attr["floaterTitle"], "value") &&
                    _node.attr["floaterTitle"].hash &&
                    _gIs(_node.attr["floaterTitle"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-1-1-1"] = true;
                  }
                  _tmp = _sIr("18723af255f55d92", showMenu, _bbnHash);
                  if (_tmp !== undefined) {
                    _props["source"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-1-1-1"] &&
                    _node.attr["source"] &&
                    !Object.hasOwn(_node.attr["source"], "value") &&
                    _node.attr["source"].hash &&
                    _gIs(_node.attr["source"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-1-1-1"] = true;
                  }
                  _props["class"] = "bbn-right-sspace bbn-lg bbn-p";
                  _props["tag"] = "span";

                  if (
                    $_go["0-1-1-1-1-1-1"] &&
                    !_forgotten["0-1-1-1-1-1-1"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-1-1-1 bbn-context");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-1-1-1"] !== _t.$el &&
                      !_forgotten["0-1-1-1-1-1-1"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-1-1-1"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-1-1-1"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-1-1"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-1-1-1"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-1-1"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-1-1"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (_eles["0-1-1-1-1-1-1"]) {
                    _parents.push(_eles["0-1-1-1-1-1-1"]);

                    // Taking care of the node with no tag 0-1-1-1-1-1-1-0
                    oldEle = _t.$retrieveElement("0-1-1-1-1-1-1-0", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-1-1-1-0"];
                    _eles["0-1-1-1-1-1-1-0"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-1-1-1-0")) {
                      $_go["0-1-1-1-1-1-1-0"] = !oldEle;
                    }
                    if (!$_go["0-1-1-1-1-1-1-0"] && !_eles["0-1-1-1-1-1-1-0"]) {
                      $_go["0-1-1-1-1-1-1-0"] = true;
                    }

                    _sIr(
                      "-13cd70644bd9f6dc",
                      `
              `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-1-1-1-1-1-0"] ||
                      _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-1-1-1-1-1-0"] &&
                        _eles["0-1-1-1-1-1-1-0"].textContent !==
                          _gIv("-13cd70644bd9f6dc", _bbnHash)
                      ) {
                        _eles["0-1-1-1-1-1-1-0"].textContent = _gIv(
                          "-13cd70644bd9f6dc",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-1-1-1-1-1-0"] = _t.$createText(
                          {
                            id: "0-1-1-1-1-1-1-0",
                            hash: "-13cd70644bd9f6dc",
                            text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-1-1-1-0"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    // Taking care of the node i 0-1-1-1-1-1-1-1
                    oldEle = _t.$retrieveElement("0-1-1-1-1-1-1-1", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-1-1-1-1"];
                    _eles["0-1-1-1-1-1-1-1"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-1-1-1-1")) {
                      $_go["0-1-1-1-1-1-1-1"] = !oldEle;
                    }
                    if (!$_go["0-1-1-1-1-1-1-1"] && !_eles["0-1-1-1-1-1-1-1"]) {
                      $_go["0-1-1-1-1-1-1-1"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _props["class"] = "nf nf-fa-bars";

                    if (
                      $_go["0-1-1-1-1-1-1-1"] &&
                      !_forgotten["0-1-1-1-1-1-1-1"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-1-1-1-1-1-1 i");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-1-1-1-1-1-1"] !== _t.$el &&
                        !_forgotten["0-1-1-1-1-1-1-1"]?.[_bbnHash || "_root"] &&
                        (!_eles["0-1-1-1-1-1-1-1"] ||
                          bbn.fn.isComment(_eles["0-1-1-1-1-1-1-1"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-1-1-1"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-1-1-1-1-1-1"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-1-1-1-1"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-1-1-1-1-1-1"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-1-1-1-1-1-1"] &&
                      _eles["0-1-1-1-1-1-1-1"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    // Taking care of the node with no tag 0-1-1-1-1-1-1-2
                    oldEle = _t.$retrieveElement("0-1-1-1-1-1-1-2", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-1-1-1-2"];
                    _eles["0-1-1-1-1-1-1-2"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-1-1-1-2")) {
                      $_go["0-1-1-1-1-1-1-2"] = !oldEle;
                    }
                    if (!$_go["0-1-1-1-1-1-1-2"] && !_eles["0-1-1-1-1-1-1-2"]) {
                      $_go["0-1-1-1-1-1-1-2"] = true;
                    }

                    _sIr(
                      "-394b55e4-2631c424",
                      `
            `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-1-1-1-1-1-2"] ||
                      _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-1-1-1-1-1-2"] &&
                        _eles["0-1-1-1-1-1-1-2"].textContent !==
                          _gIv("-394b55e4-2631c424", _bbnHash)
                      ) {
                        _eles["0-1-1-1-1-1-1-2"].textContent = _gIv(
                          "-394b55e4-2631c424",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-1-1-1-1-1-2"] = _t.$createText(
                          {
                            id: "0-1-1-1-1-1-1-2",
                            hash: "-394b55e4-2631c424",
                            text: _gIv("-394b55e4-2631c424", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-1-1-1-2"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    _parents.pop();
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-1-1-1"] &&
                    _eles["0-1-1-1-1-1-1"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  //Ending condition
                }

                // Taking care of the node span 0-1-1-1-1-1-3

                _isCondTrue = false;
                // Checking the set of conditions (if any other) on the first condition
                $_go["0-1-1-1-1-1-3"] = false;
                _isCondTrue = _sIr(
                  "CONDITION0-1-1-1-1-1-3-0497f215-5cec344b",
                  icon,
                  _bbnHash
                );
                if (
                  _gIs("CONDITION0-1-1-1-1-1-3-0497f215-5cec344b", _bbnHash) !==
                  "OK"
                ) {
                  $_go["0-1-1-1-1-1-3"] = true;
                  let _tmp = _gIv(
                    "CONDITION0-1-1-1-1-1-3-0497f215-5cec344b",
                    _bbnHash
                  );
                  let _e;
                  if (!_tmp) {
                    _e = _t.$retrieveElement("0-1-1-1-1-1-3", _bbnHash);
                    if (_e && !bbn.fn.isComment(_e)) {
                      let _cp =
                        bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                      _t.$removeDOM(_e);
                      _e = false;
                    }
                    if (!_e) {
                      _eles["0-1-1-1-1-1-3"] = await _t.$createElement(
                        {
                          id: "0-1-1-1-1-1-3",
                          hash: "CONDITION0-1-1-1-1-1-3-0497f215-5cec344b",
                          loopHash: _bbnHash,
                          conditionId: "BzjxZ68h09bx5aDp6UsGGz2VVH185cvs",
                          comment: true,
                        },
                        _parents.at(-1)
                      );
                    }
                  }
                }
                if (
                  _gIv("CONDITION0-1-1-1-1-1-3-0497f215-5cec344b", _bbnHash)
                ) {
                  oldEle = _t.$retrieveElement("0-1-1-1-1-1-3", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-1-3"];
                  _eles["0-1-1-1-1-1-3"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-1-3")) {
                    $_go["0-1-1-1-1-1-3"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-1-3"] && !_eles["0-1-1-1-1-1-3"]) {
                    $_go["0-1-1-1-1-1-3"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _props["class"] = "bbn-right-sspace bbn-lg";

                  if (
                    $_go["0-1-1-1-1-1-3"] &&
                    !_forgotten["0-1-1-1-1-1-3"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-1-1-3 span");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-1-1-3"] !== _t.$el &&
                      !_forgotten["0-1-1-1-1-1-3"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-1-1-3"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-1-1-3"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-1-3"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-1-1-3"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-1-3"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-1-3"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (_eles["0-1-1-1-1-1-3"]) {
                    _parents.push(_eles["0-1-1-1-1-1-3"]);

                    // Taking care of the node with no tag 0-1-1-1-1-1-3-0
                    oldEle = _t.$retrieveElement("0-1-1-1-1-1-3-0", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-1-1-3-0"];
                    _eles["0-1-1-1-1-1-3-0"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-1-1-3-0")) {
                      $_go["0-1-1-1-1-1-3-0"] = !oldEle;
                    }
                    if (!$_go["0-1-1-1-1-1-3-0"] && !_eles["0-1-1-1-1-1-3-0"]) {
                      $_go["0-1-1-1-1-1-3-0"] = true;
                    }

                    _sIr(
                      "-13cd70644bd9f6dc",
                      `
              `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-1-1-1-1-3-0"] ||
                      _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-1-1-1-1-3-0"] &&
                        _eles["0-1-1-1-1-1-3-0"].textContent !==
                          _gIv("-13cd70644bd9f6dc", _bbnHash)
                      ) {
                        _eles["0-1-1-1-1-1-3-0"].textContent = _gIv(
                          "-13cd70644bd9f6dc",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-1-1-1-1-3-0"] = _t.$createText(
                          {
                            id: "0-1-1-1-1-1-3-0",
                            hash: "-13cd70644bd9f6dc",
                            text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-1-1-3-0"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    // Taking care of the node i 0-1-1-1-1-1-3-1
                    oldEle = _t.$retrieveElement("0-1-1-1-1-1-3-1", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-1-1-3-1"];
                    _eles["0-1-1-1-1-1-3-1"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-1-1-3-1")) {
                      $_go["0-1-1-1-1-1-3-1"] = !oldEle;
                    }
                    if (!$_go["0-1-1-1-1-1-3-1"] && !_eles["0-1-1-1-1-1-3-1"]) {
                      $_go["0-1-1-1-1-1-3-1"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _tmp = _sIr("0497f215-5cec344b", icon, _bbnHash);
                    if (_tmp !== undefined) {
                      _props["class"] = bbn.cp.convertClasses(_tmp);
                    }
                    if (
                      !$_go["0-1-1-1-1-1-3-1"] &&
                      _node.attr["class"] &&
                      !Object.hasOwn(_node.attr["class"], "value") &&
                      _node.attr["class"].hash &&
                      _gIs(_node.attr["class"].hash, _bbnHash) !== "OK"
                    ) {
                      $_go["0-1-1-1-1-1-3-1"] = true;
                    }

                    if (
                      $_go["0-1-1-1-1-1-3-1"] &&
                      !_forgotten["0-1-1-1-1-1-3-1"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-1-1-1-1-3-1 i");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-1-1-1-1-3-1"] !== _t.$el &&
                        !_forgotten["0-1-1-1-1-1-3-1"]?.[_bbnHash || "_root"] &&
                        (!_eles["0-1-1-1-1-1-3-1"] ||
                          bbn.fn.isComment(_eles["0-1-1-1-1-1-3-1"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-1-3-1"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-1-1-1-1-3-1"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-1-1-3-1"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-1-1-1-1-3-1"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-1-1-1-1-3-1"] &&
                      _eles["0-1-1-1-1-1-3-1"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    // Taking care of the node with no tag 0-1-1-1-1-1-3-2
                    oldEle = _t.$retrieveElement("0-1-1-1-1-1-3-2", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-1-1-3-2"];
                    _eles["0-1-1-1-1-1-3-2"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-1-1-3-2")) {
                      $_go["0-1-1-1-1-1-3-2"] = !oldEle;
                    }
                    if (!$_go["0-1-1-1-1-1-3-2"] && !_eles["0-1-1-1-1-1-3-2"]) {
                      $_go["0-1-1-1-1-1-3-2"] = true;
                    }

                    _sIr(
                      "-394b55e4-2631c424",
                      `
            `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-1-1-1-1-3-2"] ||
                      _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-1-1-1-1-3-2"] &&
                        _eles["0-1-1-1-1-1-3-2"].textContent !==
                          _gIv("-394b55e4-2631c424", _bbnHash)
                      ) {
                        _eles["0-1-1-1-1-1-3-2"].textContent = _gIv(
                          "-394b55e4-2631c424",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-1-1-1-1-3-2"] = _t.$createText(
                          {
                            id: "0-1-1-1-1-1-3-2",
                            hash: "-394b55e4-2631c424",
                            text: _gIv("-394b55e4-2631c424", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-1-1-3-2"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    _parents.pop();
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-1-1-3"] &&
                    _eles["0-1-1-1-1-1-3"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  //Ending condition
                }

                // Taking care of the node span 0-1-1-1-1-1-5
                oldEle = _t.$retrieveElement("0-1-1-1-1-1-5", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-1-1-5"];
                _eles["0-1-1-1-1-1-5"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-1-1-5")) {
                  $_go["0-1-1-1-1-1-5"] = !oldEle;
                }
                if (!$_go["0-1-1-1-1-1-5"] && !_eles["0-1-1-1-1-1-5"]) {
                  $_go["0-1-1-1-1-1-5"] = true;
                }

                _props = bbn.fn.createObject();
                _tmp = _sIr("-5e7d8d0260ef8e9e", title, _bbnHash);
                if (_tmp !== undefined) {
                  _props["bbn-text"] = _tmp;
                }
                if (
                  !$_go["0-1-1-1-1-1-5"] &&
                  _node.attr["bbn-text"] &&
                  !Object.hasOwn(_node.attr["bbn-text"], "value") &&
                  _node.attr["bbn-text"].hash &&
                  _gIs(_node.attr["bbn-text"].hash, _bbnHash) !== "OK"
                ) {
                  $_go["0-1-1-1-1-1-5"] = true;
                }
                _props["style"] = "overflow: hidden";

                if (
                  $_go["0-1-1-1-1-1-5"] &&
                  !_forgotten["0-1-1-1-1-1-5"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-1-1-1-1-5 span");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-1-1-1-1-5"] !== _t.$el &&
                    !_forgotten["0-1-1-1-1-1-5"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-1-1-1-1-5"] ||
                      bbn.fn.isComment(_eles["0-1-1-1-1-1-5"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-1-5"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-1-1-1-1-5"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-1-1-5"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-1-5"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-1-1-1-1-5"] &&
                  _eles["0-1-1-1-1-1-5"] !== _t.$el
                ) {
                  $_num++;
                }

                // Taking care of the node with no tag 0-1-1-1-1-1-6
                oldEle = _t.$retrieveElement("0-1-1-1-1-1-6", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-1-1-6"];
                _eles["0-1-1-1-1-1-6"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-1-1-6")) {
                  $_go["0-1-1-1-1-1-6"] = !oldEle;
                }
                if (!$_go["0-1-1-1-1-1-6"] && !_eles["0-1-1-1-1-1-6"]) {
                  $_go["0-1-1-1-1-1-6"] = true;
                }

                _sIr(
                  "-28049b64-772aff24",
                  `
          `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-1-1-6"] ||
                  _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-1-1-6"] &&
                    _eles["0-1-1-1-1-1-6"].textContent !==
                      _gIv("-28049b64-772aff24", _bbnHash)
                  ) {
                    _eles["0-1-1-1-1-1-6"].textContent = _gIv(
                      "-28049b64-772aff24",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-1-1-6"] = _t.$createText(
                      {
                        id: "0-1-1-1-1-1-6",
                        hash: "-28049b64-772aff24",
                        text: _gIv("-28049b64-772aff24", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-1-1-6"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                _parents.pop();
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-1-1-1-1"] &&
                _eles["0-1-1-1-1-1"] !== _t.$el
              ) {
                $_num++;
              }

              // Taking care of the node with no tag 0-1-1-1-1-2
              oldEle = _t.$retrieveElement("0-1-1-1-1-2", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-1-2"];
              _eles["0-1-1-1-1-2"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-1-2")) {
                $_go["0-1-1-1-1-2"] = !oldEle;
              }
              if (!$_go["0-1-1-1-1-2"] && !_eles["0-1-1-1-1-2"]) {
                $_go["0-1-1-1-1-2"] = true;
              }

              _sIr(
                "-28049b64-772aff24",
                `
          `,
                _bbnHash
              );
              if (
                $_go["0-1-1-1-1-2"] ||
                _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
              ) {
                if (
                  _eles["0-1-1-1-1-2"] &&
                  _eles["0-1-1-1-1-2"].textContent !==
                    _gIv("-28049b64-772aff24", _bbnHash)
                ) {
                  _eles["0-1-1-1-1-2"].textContent = _gIv(
                    "-28049b64-772aff24",
                    _bbnHash
                  );
                } else {
                  _eles["0-1-1-1-1-2"] = _t.$createText(
                    {
                      id: "0-1-1-1-1-2",
                      hash: "-28049b64-772aff24",
                      text: _gIv("-28049b64-772aff24", _bbnHash),
                      loopHash: _bbnHash,
                    },
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-1-2"],
                      position: $_num,
                    });
                  }
                }
              }
              if (_parents.at(-1) === _t.$el) {
                $_num++;
              }

              // Taking care of the node div 0-1-1-1-1-3

              _isCondTrue = false;
              // Checking the set of conditions (if any other) on the first condition
              $_go["0-1-1-1-1-3"] = false;
              _isCondTrue = _sIr(
                "CONDITION0-1-1-1-1-3-65c20cb3-668aee0d",
                isVisible && fullScreen,
                _bbnHash
              );
              if (
                _gIs("CONDITION0-1-1-1-1-3-65c20cb3-668aee0d", _bbnHash) !==
                "OK"
              ) {
                $_go["0-1-1-1-1-3"] = true;
                let _tmp = _gIv(
                  "CONDITION0-1-1-1-1-3-65c20cb3-668aee0d",
                  _bbnHash
                );
                let _e;
                if (!_tmp) {
                  _e = _t.$retrieveElement("0-1-1-1-1-3", _bbnHash);
                  if (_e && !bbn.fn.isComment(_e)) {
                    let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                    _t.$removeDOM(_e);
                    _e = false;
                  }
                  if (!_e) {
                    _eles["0-1-1-1-1-3"] = await _t.$createElement(
                      {
                        id: "0-1-1-1-1-3",
                        hash: "CONDITION0-1-1-1-1-3-65c20cb3-668aee0d",
                        loopHash: _bbnHash,
                        conditionId: "H2Q9vfxH7awqJ282YdCbY39WHqHb9vRN",
                        comment: true,
                      },
                      _parents.at(-1)
                    );
                  }
                }
              }
              $_go["0-1-1-1-1-5"] = false;
              if (!_isCondTrue) {
                _isCondTrue = _sIr(
                  "CONDITION0-1-1-1-1-5-0e48bf0e1fbb758e",
                  isVisible &&
                    !isPane &&
                    !static &&
                    !pinned &&
                    !router?.visualShowAll,
                  _bbnHash
                );
              } else {
                _sIr("CONDITION0-1-1-1-1-5-0e48bf0e1fbb758e", false, _bbnHash);
              }
              if (
                _gIs("CONDITION0-1-1-1-1-5-0e48bf0e1fbb758e", _bbnHash) !== "OK"
              ) {
                $_go["0-1-1-1-1-5"] = true;
                let _tmp = _gIv(
                  "CONDITION0-1-1-1-1-5-0e48bf0e1fbb758e",
                  _bbnHash
                );
                let _e;
                if (!_tmp) {
                  _e = _t.$retrieveElement("0-1-1-1-1-5", _bbnHash);
                  if (_e && !bbn.fn.isComment(_e)) {
                    let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                    _t.$removeDOM(_e);
                    _e = false;
                  }
                  if (!_e) {
                    _eles["0-1-1-1-1-5"] = await _t.$createElement(
                      {
                        id: "0-1-1-1-1-5",
                        hash: "CONDITION0-1-1-1-1-5-0e48bf0e1fbb758e",
                        loopHash: _bbnHash,
                        conditionId: "H2Q9vfxH7awqJ282YdCbY39WHqHb9vRN",
                        comment: true,
                      },
                      _parents.at(-1)
                    );
                  }
                }
              }
              if (_gIv("CONDITION0-1-1-1-1-3-65c20cb3-668aee0d", _bbnHash)) {
                oldEle = _t.$retrieveElement("0-1-1-1-1-3", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-1-3"];
                _eles["0-1-1-1-1-3"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-1-3")) {
                  $_go["0-1-1-1-1-3"] = !oldEle;
                }
                if (!$_go["0-1-1-1-1-3"] && !_eles["0-1-1-1-1-3"]) {
                  $_go["0-1-1-1-1-3"] = true;
                }

                _props = bbn.fn.createObject();
                _props["class"] = "bbn-block bbn-p bbn-vmiddle bbn-h-100";

                if (
                  $_go["0-1-1-1-1-3"] &&
                  !_forgotten["0-1-1-1-1-3"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-1-1-1-3 div");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-1-1-1-3"] !== _t.$el &&
                    !_forgotten["0-1-1-1-1-3"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-1-1-1-3"] ||
                      bbn.fn.isComment(_eles["0-1-1-1-1-3"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-3"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-1-1-1-3"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-1-3"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-3"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                  if (isAnew) {
                    let _bbnCurrentElement = _eles["0-1-1-1-1-3"];
                    _eles["0-1-1-1-1-3"].addEventListener(
                      "click",
                      (_bbnEventObject) => {
                        let $event = _bbnEventObject;
                        let $_action = (fullScreen = false);
                        if (bbn.fn.isFunction($_action)) {
                          const args = _bbnEventObject.detail?.args || [$event];
                          args.push(_bbnEventObject);
                          $_action.bind(_t.$origin)(...args);
                        }
                        bbn.fn.iterate(
                          _bbnCurrentData,
                          (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                            //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                            if (
                              _bbnCurrentDataValue !==
                              eval(_bbnCurrentDataIndex)
                            ) {
                              if (_t[_bbnCurrentDataIndex] !== undefined) {
                                _t[_bbnCurrentDataIndex] =
                                  eval(_bbnCurrentDataIndex);
                              }
                              _bbnCurrentData[_bbnCurrentDataIndex] =
                                _t[_bbnCurrentDataIndex];
                            }
                          }
                        );
                        _t.$tick();
                      }
                    );
                  }
                }

                if (_eles["0-1-1-1-1-3"]) {
                  _parents.push(_eles["0-1-1-1-1-3"]);

                  // Taking care of the node with no tag 0-1-1-1-1-3-0
                  oldEle = _t.$retrieveElement("0-1-1-1-1-3-0", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-3-0"];
                  _eles["0-1-1-1-1-3-0"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-3-0")) {
                    $_go["0-1-1-1-1-3-0"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-3-0"] && !_eles["0-1-1-1-1-3-0"]) {
                    $_go["0-1-1-1-1-3-0"] = true;
                  }

                  _sIr(
                    "-394b55e4-2631c424",
                    `
            `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-1-3-0"] ||
                    _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-1-3-0"] &&
                      _eles["0-1-1-1-1-3-0"].textContent !==
                        _gIv("-394b55e4-2631c424", _bbnHash)
                    ) {
                      _eles["0-1-1-1-1-3-0"].textContent = _gIv(
                        "-394b55e4-2631c424",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-1-3-0"] = _t.$createText(
                        {
                          id: "0-1-1-1-1-3-0",
                          hash: "-394b55e4-2631c424",
                          text: _gIv("-394b55e4-2631c424", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-3-0"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node i 0-1-1-1-1-3-1
                  oldEle = _t.$retrieveElement("0-1-1-1-1-3-1", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-3-1"];
                  _eles["0-1-1-1-1-3-1"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-3-1")) {
                    $_go["0-1-1-1-1-3-1"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-3-1"] && !_eles["0-1-1-1-1-3-1"]) {
                    $_go["0-1-1-1-1-3-1"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _props["class"] = "nf nf-mdi-arrow_collapse bbn-lg";

                  if (
                    $_go["0-1-1-1-1-3-1"] &&
                    !_forgotten["0-1-1-1-1-3-1"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-1-3-1 i");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-1-3-1"] !== _t.$el &&
                      !_forgotten["0-1-1-1-1-3-1"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-1-3-1"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-1-3-1"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-3-1"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-1-3-1"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-3-1"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-3-1"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-1-3-1"] &&
                    _eles["0-1-1-1-1-3-1"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  // Taking care of the node with no tag 0-1-1-1-1-3-2
                  oldEle = _t.$retrieveElement("0-1-1-1-1-3-2", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-3-2"];
                  _eles["0-1-1-1-1-3-2"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-3-2")) {
                    $_go["0-1-1-1-1-3-2"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-3-2"] && !_eles["0-1-1-1-1-3-2"]) {
                    $_go["0-1-1-1-1-3-2"] = true;
                  }

                  _sIr(
                    "-28049b64-772aff24",
                    `
          `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-1-3-2"] ||
                    _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-1-3-2"] &&
                      _eles["0-1-1-1-1-3-2"].textContent !==
                        _gIv("-28049b64-772aff24", _bbnHash)
                    ) {
                      _eles["0-1-1-1-1-3-2"].textContent = _gIv(
                        "-28049b64-772aff24",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-1-3-2"] = _t.$createText(
                        {
                          id: "0-1-1-1-1-3-2",
                          hash: "-28049b64-772aff24",
                          text: _gIv("-28049b64-772aff24", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-3-2"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  _parents.pop();
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-1-1-1-3"] &&
                  _eles["0-1-1-1-1-3"] !== _t.$el
                ) {
                  $_num++;
                }

                //Ending condition
              }

              // Taking care of the node div 0-1-1-1-1-5
              else if (
                _gIv("CONDITION0-1-1-1-1-5-0e48bf0e1fbb758e", _bbnHash)
              ) {
                oldEle = _t.$retrieveElement("0-1-1-1-1-5", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-1-5"];
                _eles["0-1-1-1-1-5"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-1-5")) {
                  $_go["0-1-1-1-1-5"] = !oldEle;
                }
                if (!$_go["0-1-1-1-1-5"] && !_eles["0-1-1-1-1-5"]) {
                  $_go["0-1-1-1-1-5"] = true;
                }

                _props = bbn.fn.createObject();
                _props["class"] = "bbn-block bbn-p bbn-vmiddle bbn-h-100";

                if (
                  $_go["0-1-1-1-1-5"] &&
                  !_forgotten["0-1-1-1-1-5"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-1-1-1-5 div");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-1-1-1-5"] !== _t.$el &&
                    !_forgotten["0-1-1-1-1-5"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-1-1-1-5"] ||
                      bbn.fn.isComment(_eles["0-1-1-1-1-5"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-5"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-1-1-1-5"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-1-5"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-5"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                  if (isAnew) {
                    let _bbnCurrentElement = _eles["0-1-1-1-1-5"];
                    _eles["0-1-1-1-1-5"].addEventListener(
                      "click",
                      (_bbnEventObject) => {
                        let $event = _bbnEventObject;
                        let $_action = close;
                        if (bbn.fn.isFunction($_action)) {
                          const args = _bbnEventObject.detail?.args || [$event];
                          args.push(_bbnEventObject);
                          $_action.bind(_t.$origin)(...args);
                        }
                        bbn.fn.iterate(
                          _bbnCurrentData,
                          (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                            //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                            if (
                              _bbnCurrentDataValue !==
                              eval(_bbnCurrentDataIndex)
                            ) {
                              if (_t[_bbnCurrentDataIndex] !== undefined) {
                                _t[_bbnCurrentDataIndex] =
                                  eval(_bbnCurrentDataIndex);
                              }
                              _bbnCurrentData[_bbnCurrentDataIndex] =
                                _t[_bbnCurrentDataIndex];
                            }
                          }
                        );
                        _t.$tick();
                      }
                    );
                  }
                }

                if (_eles["0-1-1-1-1-5"]) {
                  _parents.push(_eles["0-1-1-1-1-5"]);

                  // Taking care of the node with no tag 0-1-1-1-1-5-0
                  oldEle = _t.$retrieveElement("0-1-1-1-1-5-0", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-5-0"];
                  _eles["0-1-1-1-1-5-0"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-5-0")) {
                    $_go["0-1-1-1-1-5-0"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-5-0"] && !_eles["0-1-1-1-1-5-0"]) {
                    $_go["0-1-1-1-1-5-0"] = true;
                  }

                  _sIr(
                    "-394b55e4-2631c424",
                    `
            `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-1-5-0"] ||
                    _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-1-5-0"] &&
                      _eles["0-1-1-1-1-5-0"].textContent !==
                        _gIv("-394b55e4-2631c424", _bbnHash)
                    ) {
                      _eles["0-1-1-1-1-5-0"].textContent = _gIv(
                        "-394b55e4-2631c424",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-1-5-0"] = _t.$createText(
                        {
                          id: "0-1-1-1-1-5-0",
                          hash: "-394b55e4-2631c424",
                          text: _gIv("-394b55e4-2631c424", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-5-0"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node i 0-1-1-1-1-5-1
                  oldEle = _t.$retrieveElement("0-1-1-1-1-5-1", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-5-1"];
                  _eles["0-1-1-1-1-5-1"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-5-1")) {
                    $_go["0-1-1-1-1-5-1"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-5-1"] && !_eles["0-1-1-1-1-5-1"]) {
                    $_go["0-1-1-1-1-5-1"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _props["class"] = "nf nf-fa-times bbn-lg";

                  if (
                    $_go["0-1-1-1-1-5-1"] &&
                    !_forgotten["0-1-1-1-1-5-1"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-1-5-1 i");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-1-5-1"] !== _t.$el &&
                      !_forgotten["0-1-1-1-1-5-1"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-1-5-1"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-1-5-1"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-1-5-1"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-1-5-1"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-5-1"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-1-5-1"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-1-5-1"] &&
                    _eles["0-1-1-1-1-5-1"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  // Taking care of the node with no tag 0-1-1-1-1-5-2
                  oldEle = _t.$retrieveElement("0-1-1-1-1-5-2", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-1-5-2"];
                  _eles["0-1-1-1-1-5-2"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-1-5-2")) {
                    $_go["0-1-1-1-1-5-2"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-1-5-2"] && !_eles["0-1-1-1-1-5-2"]) {
                    $_go["0-1-1-1-1-5-2"] = true;
                  }

                  _sIr(
                    "-28049b64-772aff24",
                    `
          `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-1-5-2"] ||
                    _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-1-5-2"] &&
                      _eles["0-1-1-1-1-5-2"].textContent !==
                        _gIv("-28049b64-772aff24", _bbnHash)
                    ) {
                      _eles["0-1-1-1-1-5-2"].textContent = _gIv(
                        "-28049b64-772aff24",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-1-5-2"] = _t.$createText(
                        {
                          id: "0-1-1-1-1-5-2",
                          hash: "-28049b64-772aff24",
                          text: _gIv("-28049b64-772aff24", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-1-5-2"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  _parents.pop();
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-1-1-1-5"] &&
                  _eles["0-1-1-1-1-5"] !== _t.$el
                ) {
                  $_num++;
                }

                //Ending condition
              }

              _parents.pop();
            }

            if (
              _t.$el === _parents.at(-1) &&
              _eles["0-1-1-1-1"] &&
              _eles["0-1-1-1-1"] !== _t.$el
            ) {
              $_num++;
            }

            //Ending condition
          }

          // Taking care of the node div 0-1-1-1-3
          oldEle = _t.$retrieveElement("0-1-1-1-3", _bbnHash);
          _node = _t.$currentMap["0-1-1-1-3"];
          _eles["0-1-1-1-3"] = oldEle;
          if (!Object.hasOwn($_go, "0-1-1-1-3")) {
            $_go["0-1-1-1-3"] = !oldEle;
          }
          if (!$_go["0-1-1-1-3"] && !_eles["0-1-1-1-3"]) {
            $_go["0-1-1-1-3"] = true;
          }

          _props = bbn.fn.createObject();
          _tmp = _sIr(
            "069053f0114d5670",
            {
              "bbn-background": true,
              "bbn-overlay":
                !fullScreen &&
                !router?.isVisual &&
                !isPane &&
                router?.scrollContent,
              "bbn-flex-fill":
                (fullScreen || (router?.isVisual && !isPane)) &&
                router?.scrollContent,
              "bbn-w-100": !router?.scrollContent,
              "bbn-container-visible": isVisible,
            },
            _bbnHash
          );
          if (_tmp !== undefined) {
            _props["class"] = bbn.cp.convertClasses(_tmp);
          }
          if (
            !$_go["0-1-1-1-3"] &&
            _node.attr["class"] &&
            !Object.hasOwn(_node.attr["class"], "value") &&
            _node.attr["class"].hash &&
            _gIs(_node.attr["class"].hash, _bbnHash) !== "OK"
          ) {
            $_go["0-1-1-1-3"] = true;
          }
          _props["ref"] = "canvasSource";

          if (
            $_go["0-1-1-1-3"] &&
            !_forgotten["0-1-1-1-3"]?.[_bbnHash || "_root"]
          ) {
            //  bbn.fn.log("IN TODO " + _t.$options.name);
            //  bbn.fn.log("DOING 0-1-1-1-3 div");
            _tmp = bbn.fn.clone(_node);
            if (_bbnHash) {
              _tmp.loopHash = _bbnHash;
            }
            _tmp.props = _props;
            isAnew = false;
            if (
              _eles["0-1-1-1-3"] !== _t.$el &&
              !_forgotten["0-1-1-1-3"]?.[_bbnHash || "_root"] &&
              (!_eles["0-1-1-1-3"] ||
                bbn.fn.isComment(_eles["0-1-1-1-3"]) ||
                !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3"]))
            ) {
              isAnew = true;
            }
            if (isAnew) {
              _eles["0-1-1-1-3"] = await _t.$createElement(
                _tmp,
                _parents.at(-1)
              );
              if (_parents.at(-1) === _t.$el) {
                $_final.push({ ele: _eles["0-1-1-1-3"], position: $_num });
              }
            } else {
              _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3"]);
            }
            if (_parents.at(-1) === _t.$el) {
              $_num++;
            }
          }

          if (_eles["0-1-1-1-3"]) {
            _parents.push(_eles["0-1-1-1-3"]);

            // Taking care of the node with no tag 0-1-1-1-3-0
            oldEle = _t.$retrieveElement("0-1-1-1-3-0", _bbnHash);
            _node = _t.$currentMap["0-1-1-1-3-0"];
            _eles["0-1-1-1-3-0"] = oldEle;
            if (!Object.hasOwn($_go, "0-1-1-1-3-0")) {
              $_go["0-1-1-1-3-0"] = !oldEle;
            }
            if (!$_go["0-1-1-1-3-0"] && !_eles["0-1-1-1-3-0"]) {
              $_go["0-1-1-1-3-0"] = true;
            }

            _sIr(
              "-28049b64-772aff24",
              `
          `,
              _bbnHash
            );
            if (
              $_go["0-1-1-1-3-0"] ||
              _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
            ) {
              if (
                _eles["0-1-1-1-3-0"] &&
                _eles["0-1-1-1-3-0"].textContent !==
                  _gIv("-28049b64-772aff24", _bbnHash)
              ) {
                _eles["0-1-1-1-3-0"].textContent = _gIv(
                  "-28049b64-772aff24",
                  _bbnHash
                );
              } else {
                _eles["0-1-1-1-3-0"] = _t.$createText(
                  {
                    id: "0-1-1-1-3-0",
                    hash: "-28049b64-772aff24",
                    text: _gIv("-28049b64-772aff24", _bbnHash),
                    loopHash: _bbnHash,
                  },
                  _parents.at(-1)
                );
                if (_parents.at(-1) === _t.$el) {
                  $_final.push({ ele: _eles["0-1-1-1-3-0"], position: $_num });
                }
              }
            }
            if (_parents.at(-1) === _t.$el) {
              $_num++;
            }

            // Taking care of the node bbn-scroll 0-1-1-1-3-1

            _isCondTrue = false;
            // Checking the set of conditions (if any other) on the first condition
            $_go["0-1-1-1-3-1"] = false;
            _isCondTrue = _sIr(
              "CONDITION0-1-1-1-3-1--69c31b9c-372fe65c",
              ready && isLoaded,
              _bbnHash
            );
            if (
              _gIs("CONDITION0-1-1-1-3-1--69c31b9c-372fe65c", _bbnHash) !== "OK"
            ) {
              $_go["0-1-1-1-3-1"] = true;
              let _tmp = _gIv(
                "CONDITION0-1-1-1-3-1--69c31b9c-372fe65c",
                _bbnHash
              );
              let _e;
              if (!_tmp) {
                _e = _t.$retrieveElement("0-1-1-1-3-1", _bbnHash);
                if (_e && !bbn.fn.isComment(_e)) {
                  let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                  _t.$removeDOM(_e);
                  _e = false;
                }
                if (!_e) {
                  _eles["0-1-1-1-3-1"] = await _t.$createElement(
                    {
                      id: "0-1-1-1-3-1",
                      hash: "CONDITION0-1-1-1-3-1--69c31b9c-372fe65c",
                      loopHash: _bbnHash,
                      conditionId: "E7PsWTp13YVuvtB7Z8uVq12j60kdssW2",
                      comment: true,
                    },
                    _parents.at(-1)
                  );
                }
              }
            }
            $_go["0-1-1-1-3-3"] = false;
            if (!_isCondTrue) {
              _isCondTrue = _sIr(
                "CONDITION0-1-1-1-3-3-4bbec3bc6cf8d75c",
                isVisible && errorStatus,
                _bbnHash
              );
            } else {
              _sIr("CONDITION0-1-1-1-3-3-4bbec3bc6cf8d75c", false, _bbnHash);
            }
            if (
              _gIs("CONDITION0-1-1-1-3-3-4bbec3bc6cf8d75c", _bbnHash) !== "OK"
            ) {
              $_go["0-1-1-1-3-3"] = true;
              let _tmp = _gIv(
                "CONDITION0-1-1-1-3-3-4bbec3bc6cf8d75c",
                _bbnHash
              );
              let _e;
              if (!_tmp) {
                _e = _t.$retrieveElement("0-1-1-1-3-3", _bbnHash);
                if (_e && !bbn.fn.isComment(_e)) {
                  let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                  _t.$removeDOM(_e);
                  _e = false;
                }
                if (!_e) {
                  _eles["0-1-1-1-3-3"] = await _t.$createElement(
                    {
                      id: "0-1-1-1-3-3",
                      hash: "CONDITION0-1-1-1-3-3-4bbec3bc6cf8d75c",
                      loopHash: _bbnHash,
                      conditionId: "E7PsWTp13YVuvtB7Z8uVq12j60kdssW2",
                      comment: true,
                    },
                    _parents.at(-1)
                  );
                }
              }
            }
            $_go["0-1-1-1-3-5"] = false;
            if (!_isCondTrue) {
              _isCondTrue = _sIr(
                "CONDITION0-1-1-1-3-5-53f17f73-33e4216d",
                isVisible && (!ready || !isLoaded),
                _bbnHash
              );
            } else {
              _sIr("CONDITION0-1-1-1-3-5-53f17f73-33e4216d", false, _bbnHash);
            }
            if (
              _gIs("CONDITION0-1-1-1-3-5-53f17f73-33e4216d", _bbnHash) !== "OK"
            ) {
              $_go["0-1-1-1-3-5"] = true;
              let _tmp = _gIv(
                "CONDITION0-1-1-1-3-5-53f17f73-33e4216d",
                _bbnHash
              );
              let _e;
              if (!_tmp) {
                _e = _t.$retrieveElement("0-1-1-1-3-5", _bbnHash);
                if (_e && !bbn.fn.isComment(_e)) {
                  let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                  _t.$removeDOM(_e);
                  _e = false;
                }
                if (!_e) {
                  _eles["0-1-1-1-3-5"] = await _t.$createElement(
                    {
                      id: "0-1-1-1-3-5",
                      hash: "CONDITION0-1-1-1-3-5-53f17f73-33e4216d",
                      loopHash: _bbnHash,
                      conditionId: "E7PsWTp13YVuvtB7Z8uVq12j60kdssW2",
                      comment: true,
                    },
                    _parents.at(-1)
                  );
                }
              }
            }
            if (_gIv("CONDITION0-1-1-1-3-1--69c31b9c-372fe65c", _bbnHash)) {
              oldEle = _t.$retrieveElement("0-1-1-1-3-1", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-3-1"];
              _eles["0-1-1-1-3-1"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-3-1")) {
                $_go["0-1-1-1-3-1"] = !oldEle;
              }
              if (!$_go["0-1-1-1-3-1"] && !_eles["0-1-1-1-3-1"]) {
                $_go["0-1-1-1-3-1"] = true;
              }

              _props = bbn.fn.createObject();
              _tmp = _sIr(
                "-2efdedf2-1cb81cb2",
                {
                  "bbn-overlay": router?.scrollContent,
                  "bbn-w-100": !router?.scrollContent,
                },
                _bbnHash
              );
              if (_tmp !== undefined) {
                _props["class"] = bbn.cp.convertClasses(_tmp);
              }
              if (
                !$_go["0-1-1-1-3-1"] &&
                _node.attr["class"] &&
                !Object.hasOwn(_node.attr["class"], "value") &&
                _node.attr["class"].hash &&
                _gIs(_node.attr["class"].hash, _bbnHash) !== "OK"
              ) {
                $_go["0-1-1-1-3-1"] = true;
              }
              _tmp = _sIr(
                "6badc0e9-1cb68d97",
                scrollable && router?.scrollContent,
                _bbnHash
              );
              if (_tmp !== undefined) {
                _props["scrollable"] = _tmp;
              }
              if (
                !$_go["0-1-1-1-3-1"] &&
                _node.attr["scrollable"] &&
                !Object.hasOwn(_node.attr["scrollable"], "value") &&
                _node.attr["scrollable"].hash &&
                _gIs(_node.attr["scrollable"].hash, _bbnHash) !== "OK"
              ) {
                $_go["0-1-1-1-3-1"] = true;
              }
              _props["axis"] = "y";
              _tmp = _sIr(
                "6e40a51f-4b75c5c1",
                !router?.isVisual || (router?.isVisual && !thumbnail),
                _bbnHash
              );
              if (_tmp !== undefined) {
                _props["bbn-show"] = _tmp;
              }
              if (
                !$_go["0-1-1-1-3-1"] &&
                _node.attr["bbn-show"] &&
                !Object.hasOwn(_node.attr["bbn-show"], "value") &&
                _node.attr["bbn-show"].hash &&
                _gIs(_node.attr["bbn-show"].hash, _bbnHash) !== "OK"
              ) {
                $_go["0-1-1-1-3-1"] = true;
              }
              _props["ref"] = "scroll";

              if (
                $_go["0-1-1-1-3-1"] &&
                !_forgotten["0-1-1-1-3-1"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-1-1-3-1 bbn-scroll");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-1-1-3-1"] !== _t.$el &&
                  !_forgotten["0-1-1-1-3-1"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-1-1-3-1"] ||
                    bbn.fn.isComment(_eles["0-1-1-1-3-1"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-1"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-1-1-3-1"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-3-1"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-1"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
                if (isAnew) {
                  let _bbnCurrentElement = _eles["0-1-1-1-3-1"];
                  _eles["0-1-1-1-3-1"].addEventListener(
                    "ready",
                    (_bbnEventObject) => {
                      let $event = _bbnEventObject;
                      let $_action = init;
                      if (bbn.fn.isFunction($_action)) {
                        const args = _bbnEventObject.detail?.args || [$event];
                        args.push(_bbnEventObject);
                        $_action.bind(_t.$origin)(...args);
                      }
                      bbn.fn.iterate(
                        _bbnCurrentData,
                        (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                          //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                          if (
                            _bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)
                          ) {
                            if (_t[_bbnCurrentDataIndex] !== undefined) {
                              _t[_bbnCurrentDataIndex] =
                                eval(_bbnCurrentDataIndex);
                            }
                            _bbnCurrentData[_bbnCurrentDataIndex] =
                              _t[_bbnCurrentDataIndex];
                          }
                        }
                      );
                      _t.$tick();
                    }
                  );
                }
              }

              if (_eles["0-1-1-1-3-1"]) {
                _parents.push(_eles["0-1-1-1-3-1"]);

                // Taking care of the node with no tag 0-1-1-1-3-1-0
                oldEle = _t.$retrieveElement("0-1-1-1-3-1-0", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-1-0"];
                _eles["0-1-1-1-3-1-0"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-1-0")) {
                  $_go["0-1-1-1-3-1-0"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-1-0"] && !_eles["0-1-1-1-3-1-0"]) {
                  $_go["0-1-1-1-3-1-0"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-3-1-0"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-3-1-0"] &&
                    _eles["0-1-1-1-3-1-0"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-1-1-3-1-0"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-3-1-0"] = _t.$createText(
                      {
                        id: "0-1-1-1-3-1-0",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-1-0"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node component 0-1-1-1-3-1-1

                _isCondTrue = false;
                // Checking the set of conditions (if any other) on the first condition
                $_go["0-1-1-1-3-1-1"] = false;
                _isCondTrue = _sIr(
                  "CONDITION0-1-1-1-3-1-1-198e3771442806b1",
                  isComponent && componentDefinition,
                  _bbnHash
                );
                if (
                  _gIs("CONDITION0-1-1-1-3-1-1-198e3771442806b1", _bbnHash) !==
                  "OK"
                ) {
                  $_go["0-1-1-1-3-1-1"] = true;
                  let _tmp = _gIv(
                    "CONDITION0-1-1-1-3-1-1-198e3771442806b1",
                    _bbnHash
                  );
                  let _e;
                  if (!_tmp) {
                    _e = _t.$retrieveElement("0-1-1-1-3-1-1", _bbnHash);
                    if (_e && !bbn.fn.isComment(_e)) {
                      let _cp =
                        bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                      _t.$removeDOM(_e);
                      _e = false;
                    }
                    if (!_e) {
                      _eles["0-1-1-1-3-1-1"] = await _t.$createElement(
                        {
                          id: "0-1-1-1-3-1-1",
                          hash: "CONDITION0-1-1-1-3-1-1-198e3771442806b1",
                          loopHash: _bbnHash,
                          conditionId: "A2Y8c9d94Jm6RzhG94O6ETEEEIKHmwuV",
                          comment: true,
                        },
                        _parents.at(-1)
                      );
                    }
                  }
                }
                $_go["0-1-1-1-3-1-3"] = false;
                if (!_isCondTrue) {
                  _isCondTrue = _sIr(
                    "CONDITION0-1-1-1-3-1-3--48716d07-3cbd4187",
                    component,
                    _bbnHash
                  );
                } else {
                  _sIr(
                    "CONDITION0-1-1-1-3-1-3--48716d07-3cbd4187",
                    false,
                    _bbnHash
                  );
                }
                if (
                  _gIs(
                    "CONDITION0-1-1-1-3-1-3--48716d07-3cbd4187",
                    _bbnHash
                  ) !== "OK"
                ) {
                  $_go["0-1-1-1-3-1-3"] = true;
                  let _tmp = _gIv(
                    "CONDITION0-1-1-1-3-1-3--48716d07-3cbd4187",
                    _bbnHash
                  );
                  let _e;
                  if (!_tmp) {
                    _e = _t.$retrieveElement("0-1-1-1-3-1-3", _bbnHash);
                    if (_e && !bbn.fn.isComment(_e)) {
                      let _cp =
                        bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                      _t.$removeDOM(_e);
                      _e = false;
                    }
                    if (!_e) {
                      _eles["0-1-1-1-3-1-3"] = await _t.$createElement(
                        {
                          id: "0-1-1-1-3-1-3",
                          hash: "CONDITION0-1-1-1-3-1-3--48716d07-3cbd4187",
                          loopHash: _bbnHash,
                          conditionId: "A2Y8c9d94Jm6RzhG94O6ETEEEIKHmwuV",
                          comment: true,
                        },
                        _parents.at(-1)
                      );
                    }
                  }
                }
                $_go["0-1-1-1-3-1-5"] = false;
                if (!_isCondTrue) {
                  _isCondTrue = _sIr(
                    "CONDITION0-1-1-1-3-1-5-76cc72fc-4386aa84",
                    !isComponent && currentContent,
                    _bbnHash
                  );
                } else {
                  _sIr(
                    "CONDITION0-1-1-1-3-1-5-76cc72fc-4386aa84",
                    false,
                    _bbnHash
                  );
                }
                if (
                  _gIs("CONDITION0-1-1-1-3-1-5-76cc72fc-4386aa84", _bbnHash) !==
                  "OK"
                ) {
                  $_go["0-1-1-1-3-1-5"] = true;
                  let _tmp = _gIv(
                    "CONDITION0-1-1-1-3-1-5-76cc72fc-4386aa84",
                    _bbnHash
                  );
                  let _e;
                  if (!_tmp) {
                    _e = _t.$retrieveElement("0-1-1-1-3-1-5", _bbnHash);
                    if (_e && !bbn.fn.isComment(_e)) {
                      let _cp =
                        bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                      _t.$removeDOM(_e);
                      _e = false;
                    }
                    if (!_e) {
                      _eles["0-1-1-1-3-1-5"] = await _t.$createElement(
                        {
                          id: "0-1-1-1-3-1-5",
                          hash: "CONDITION0-1-1-1-3-1-5-76cc72fc-4386aa84",
                          loopHash: _bbnHash,
                          conditionId: "A2Y8c9d94Jm6RzhG94O6ETEEEIKHmwuV",
                          comment: true,
                        },
                        _parents.at(-1)
                      );
                    }
                  }
                }
                $_go["0-1-1-1-3-1-7"] = false;
                if (!_isCondTrue) {
                  _isCondTrue = _sIr(
                    "CONDITION0-1-1-1-3-1-7-491f94ae-44f75f12",
                    true,
                    _bbnHash
                  );
                } else {
                  _sIr(
                    "CONDITION0-1-1-1-3-1-7-491f94ae-44f75f12",
                    false,
                    _bbnHash
                  );
                }
                if (
                  _gIs("CONDITION0-1-1-1-3-1-7-491f94ae-44f75f12", _bbnHash) !==
                  "OK"
                ) {
                  $_go["0-1-1-1-3-1-7"] = true;
                  let _tmp = _gIv(
                    "CONDITION0-1-1-1-3-1-7-491f94ae-44f75f12",
                    _bbnHash
                  );
                  let _e;
                  if (!_tmp) {
                  }
                }
                if (_gIv("CONDITION0-1-1-1-3-1-1-198e3771442806b1", _bbnHash)) {
                  oldEle = _t.$retrieveElement("0-1-1-1-3-1-1", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-1-1"];
                  _eles["0-1-1-1-3-1-1"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-1-1")) {
                    $_go["0-1-1-1-3-1-1"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-1-1"] && !_eles["0-1-1-1-3-1-1"]) {
                    $_go["0-1-1-1-3-1-1"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp = _sIr(
                    "-56e6b0da-12d1b91a",
                    componentDefinition,
                    _bbnHash
                  );
                  if (_tmp !== undefined) {
                    _props["is"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-3-1-1"] &&
                    _node.attr["is"] &&
                    !Object.hasOwn(_node.attr["is"], "value") &&
                    _node.attr["is"].hash &&
                    _gIs(_node.attr["is"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-1-1"] = true;
                  }
                  _tmp = _sIr("3247e1e22e7b6c62", currentSource, _bbnHash);
                  if (_tmp !== undefined) {
                    _props["source"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-3-1-1"] &&
                    _node.attr["source"] &&
                    !Object.hasOwn(_node.attr["source"], "value") &&
                    _node.attr["source"].hash &&
                    _gIs(_node.attr["source"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-1-1"] = true;
                  }
                  _props["ref"] = "component";

                  if (
                    $_go["0-1-1-1-3-1-1"] &&
                    !_forgotten["0-1-1-1-3-1-1"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-1-1 component");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    if (bbn.fn.isObject(_props.is)) {
                      _tmp.tag = _props.name
                        ? bbn.fn.camelToCss(_props.name)
                        : "bbn-anon";
                      _tmp.cfg = bbn.cp.normalizeComponent(_props.is);
                    } else {
                      _tmp.tag = bbn.fn.camelToCss(_props.is);
                    }
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-1-1"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-1-1"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-1-1"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-1-1"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-1-1"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-1-1"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-1-1"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-1-1"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-1-1"] &&
                    _eles["0-1-1-1-3-1-1"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  //Ending condition
                }

                // Taking care of the node component 0-1-1-1-3-1-3
                else if (
                  _gIv("CONDITION0-1-1-1-3-1-3--48716d07-3cbd4187", _bbnHash)
                ) {
                  oldEle = _t.$retrieveElement("0-1-1-1-3-1-3", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-1-3"];
                  _eles["0-1-1-1-3-1-3"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-1-3")) {
                    $_go["0-1-1-1-3-1-3"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-1-3"] && !_eles["0-1-1-1-3-1-3"]) {
                    $_go["0-1-1-1-3-1-3"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp =
                    _sIr("-4a8d2588-14f71268", options, _bbnHash) ||
                    bbn.fn.createObject();
                  if (
                    !$_go["0-1-1-1-3-1-3"] &&
                    _gIs("-4a8d2588-14f71268", _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-1-3"] = true;
                  }
                  _tmp2 = bbn.fn.createObject();
                  _tmp2["is"] = _sIr("-48716d07-3cbd4187", component, _bbnHash);
                  _tmp2["source"] = _sIr(
                    "3247e1e22e7b6c62",
                    currentSource,
                    _bbnHash
                  );
                  _tmp2["ref"] = "component";
                  bbn.fn.each(
                    bbn.fn.unique(Object.keys(_tmp).concat(Object.keys(_tmp2))),
                    (n) => {
                      let val = _tmp2[n] === undefined ? _tmp?.[n] : _tmp2[n];
                      if (val === undefined) {
                        return;
                      }
                      if (n === "class") {
                        _props[n] = bbn.cp.convertClasses(val);
                      } else if (n === "style") {
                        _props[n] = bbn.cp.convertStyles(val);
                      } else {
                        _props[n] = val;
                      }
                      if (
                        !$_go["0-1-1-1-3-1-3"] &&
                        _node.attr[n] &&
                        !Object.hasOwn(_node.attr[n], "value") &&
                        _node.attr[n].hash &&
                        _gIs(_node.attr[n].hash, _bbnHash) !== "OK"
                      ) {
                        $_go["0-1-1-1-3-1-3"] = true;
                      }
                    }
                  );

                  if (
                    $_go["0-1-1-1-3-1-3"] &&
                    !_forgotten["0-1-1-1-3-1-3"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-1-3 component");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    if (bbn.fn.isObject(_props.is)) {
                      _tmp.tag = _props.name
                        ? bbn.fn.camelToCss(_props.name)
                        : "bbn-anon";
                      _tmp.cfg = bbn.cp.normalizeComponent(_props.is);
                    } else {
                      _tmp.tag = bbn.fn.camelToCss(_props.is);
                    }
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-1-3"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-1-3"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-1-3"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-1-3"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-1-3"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-1-3"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-1-3"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-1-3"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-1-3"] &&
                    _eles["0-1-1-1-3-1-3"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  //Ending condition
                }

                // Taking care of the node div 0-1-1-1-3-1-5
                else if (
                  _gIv("CONDITION0-1-1-1-3-1-5-76cc72fc-4386aa84", _bbnHash)
                ) {
                  oldEle = _t.$retrieveElement("0-1-1-1-3-1-5", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-1-5"];
                  _eles["0-1-1-1-3-1-5"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-1-5")) {
                    $_go["0-1-1-1-3-1-5"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-1-5"] && !_eles["0-1-1-1-3-1-5"]) {
                    $_go["0-1-1-1-3-1-5"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp = _sIr("-73331c52-5e91932", currentContent, _bbnHash);
                  if (_tmp !== undefined) {
                    _props["bbn-html"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-3-1-5"] &&
                    _node.attr["bbn-html"] &&
                    !Object.hasOwn(_node.attr["bbn-html"], "value") &&
                    _node.attr["bbn-html"].hash &&
                    _gIs(_node.attr["bbn-html"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-1-5"] = true;
                  }

                  if (
                    $_go["0-1-1-1-3-1-5"] &&
                    !_forgotten["0-1-1-1-3-1-5"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-1-5 div");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-1-5"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-1-5"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-1-5"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-1-5"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-1-5"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-1-5"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-1-5"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-1-5"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (_eles["0-1-1-1-3-1-5"]) {
                    _parents.push(_eles["0-1-1-1-3-1-5"]);

                    // Taking care of the node with no tag 0-1-1-1-3-1-5-0
                    oldEle = _t.$retrieveElement("0-1-1-1-3-1-5-0", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-3-1-5-0"];
                    _eles["0-1-1-1-3-1-5-0"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-3-1-5-0")) {
                      $_go["0-1-1-1-3-1-5-0"] = !oldEle;
                    }
                    if (!$_go["0-1-1-1-3-1-5-0"] && !_eles["0-1-1-1-3-1-5-0"]) {
                      $_go["0-1-1-1-3-1-5-0"] = true;
                    }

                    _sIr(
                      "-394b55e4-2631c424",
                      `
            `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-1-1-3-1-5-0"] ||
                      _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-1-1-3-1-5-0"] &&
                        _eles["0-1-1-1-3-1-5-0"].textContent !==
                          _gIv("-394b55e4-2631c424", _bbnHash)
                      ) {
                        _eles["0-1-1-1-3-1-5-0"].textContent = _gIv(
                          "-394b55e4-2631c424",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-1-1-3-1-5-0"] = _t.$createText(
                          {
                            id: "0-1-1-1-3-1-5-0",
                            hash: "-394b55e4-2631c424",
                            text: _gIv("-394b55e4-2631c424", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-3-1-5-0"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    _parents.pop();
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-1-5"] &&
                    _eles["0-1-1-1-3-1-5"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  //Ending condition
                }

                // Taking care of the node slot 0-1-1-1-3-1-7
                else {
                  oldEle = _t.$retrieveElement("0-1-1-1-3-1-7", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-1-7"];
                  _eles["0-1-1-1-3-1-7"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-1-7")) {
                    $_go["0-1-1-1-3-1-7"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-1-7"] && !_eles["0-1-1-1-3-1-7"]) {
                    $_go["0-1-1-1-3-1-7"] = true;
                  }

                  _eles["0-1-1-1-3-1-7"] = _parents.at(-1);
                  if (_t.$el.bbnSlots?.["default"]?.length) {
                    bbn.fn.each(_t.$el.bbnSlots["default"], (a) => {
                      let search = { bbnId: a.bbnId };
                      if (a.bbnHash) {
                        search.bbnHash = a.bbnHash;
                      }
                      if (
                        _parents.at(-1) !== _t.$el &&
                        bbn.cp.isComponent(_parents.at(-1))
                      ) {
                        let idx = bbn.fn.search(
                          _parents.at(-1).bbnSlots["default"],
                          search
                        );
                        _parents
                          .at(-1)
                          .bbnSlots.default.splice(
                            idx > -1
                              ? idx
                              : _parents.at(-1).bbnSlots.default.length,
                            idx > -1 ? 1 : 0,
                            a
                          );
                        if (_parents.at(-1).bbn) {
                          _parents.at(-1).bbn.$tick();
                        }
                      } else if (!a.parentNode) {
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({ ele: a, position: $_num });
                        } else {
                          let idx = bbn.fn.search(
                            _parents.at(-1).childNodes,
                            search
                          );
                          if (idx > -1) {
                            _parents
                              .at(-1)
                              .replaceChild(a, _parents.at(-1).childNodes[idx]);
                          } else {
                            _parents.at(-1).appendChild(a);
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                    });
                  }

                  //Ending condition
                }

                // Taking care of the node with no tag 0-1-1-1-3-1-8
                oldEle = _t.$retrieveElement("0-1-1-1-3-1-8", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-1-8"];
                _eles["0-1-1-1-3-1-8"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-1-8")) {
                  $_go["0-1-1-1-3-1-8"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-1-8"] && !_eles["0-1-1-1-3-1-8"]) {
                  $_go["0-1-1-1-3-1-8"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-3-1-8"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-3-1-8"] &&
                    _eles["0-1-1-1-3-1-8"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-1-1-3-1-8"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-3-1-8"] = _t.$createText(
                      {
                        id: "0-1-1-1-3-1-8",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-1-8"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node component 0-1-1-1-3-1-9

                _isCondTrue = false;
                // Checking the set of conditions (if any other) on the first condition
                $_go["0-1-1-1-3-1-9"] = false;
                _isCondTrue = _sIr(
                  "CONDITION0-1-1-1-3-1-9--67297e1c25ecbb44",
                  currentCss,
                  _bbnHash
                );
                if (
                  _gIs("CONDITION0-1-1-1-3-1-9--67297e1c25ecbb44", _bbnHash) !==
                  "OK"
                ) {
                  $_go["0-1-1-1-3-1-9"] = true;
                  let _tmp = _gIv(
                    "CONDITION0-1-1-1-3-1-9--67297e1c25ecbb44",
                    _bbnHash
                  );
                  let _e;
                  if (!_tmp) {
                    _e = _t.$retrieveElement("0-1-1-1-3-1-9", _bbnHash);
                    if (_e && !bbn.fn.isComment(_e)) {
                      let _cp =
                        bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                      _t.$removeDOM(_e);
                      _e = false;
                    }
                    if (!_e) {
                      _eles["0-1-1-1-3-1-9"] = await _t.$createElement(
                        {
                          id: "0-1-1-1-3-1-9",
                          hash: "CONDITION0-1-1-1-3-1-9--67297e1c25ecbb44",
                          loopHash: _bbnHash,
                          conditionId: "Pe0mgnk1s0X0xwS2o90n673zFLS6N1h5",
                          comment: true,
                        },
                        _parents.at(-1)
                      );
                    }
                  }
                }
                if (
                  _gIv("CONDITION0-1-1-1-3-1-9--67297e1c25ecbb44", _bbnHash)
                ) {
                  oldEle = _t.$retrieveElement("0-1-1-1-3-1-9", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-1-9"];
                  _eles["0-1-1-1-3-1-9"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-1-9")) {
                    $_go["0-1-1-1-3-1-9"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-1-9"] && !_eles["0-1-1-1-3-1-9"]) {
                    $_go["0-1-1-1-3-1-9"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp = _sIr("-67297e1c25ecbb44", currentCss, _bbnHash);
                  if (_tmp !== undefined) {
                    _props["bbn-html"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-3-1-9"] &&
                    _node.attr["bbn-html"] &&
                    !Object.hasOwn(_node.attr["bbn-html"], "value") &&
                    _node.attr["bbn-html"].hash &&
                    _gIs(_node.attr["bbn-html"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-1-9"] = true;
                  }
                  _props["is"] = "style";
                  _props["scoped"] = "scoped";

                  if (
                    $_go["0-1-1-1-3-1-9"] &&
                    !_forgotten["0-1-1-1-3-1-9"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-1-9 component");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    if (bbn.fn.isObject(_props.is)) {
                      _tmp.tag = _props.name
                        ? bbn.fn.camelToCss(_props.name)
                        : "bbn-anon";
                      _tmp.cfg = bbn.cp.normalizeComponent(_props.is);
                    } else {
                      _tmp.tag = bbn.fn.camelToCss(_props.is);
                    }
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-1-9"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-1-9"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-1-9"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-1-9"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-1-9"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-1-9"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-1-9"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-1-9"]);
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-1-9"] &&
                    _eles["0-1-1-1-3-1-9"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  //Ending condition
                }

                _parents.pop();
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-1-1-3-1"] &&
                _eles["0-1-1-1-3-1"] !== _t.$el
              ) {
                $_num++;
              }

              //Ending condition
            }

            // Taking care of the node div 0-1-1-1-3-3
            else if (_gIv("CONDITION0-1-1-1-3-3-4bbec3bc6cf8d75c", _bbnHash)) {
              oldEle = _t.$retrieveElement("0-1-1-1-3-3", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-3-3"];
              _eles["0-1-1-1-3-3"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-3-3")) {
                $_go["0-1-1-1-3-3"] = !oldEle;
              }
              if (!$_go["0-1-1-1-3-3"] && !_eles["0-1-1-1-3-3"]) {
                $_go["0-1-1-1-3-3"] = true;
              }

              _props = bbn.fn.createObject();
              _props["class"] = "bbn-overlay bbn-middle bbn-lg";

              if (
                $_go["0-1-1-1-3-3"] &&
                !_forgotten["0-1-1-1-3-3"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-1-1-3-3 div");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-1-1-3-3"] !== _t.$el &&
                  !_forgotten["0-1-1-1-3-3"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-1-1-3-3"] ||
                    bbn.fn.isComment(_eles["0-1-1-1-3-3"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-3"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-1-1-3-3"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-3-3"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-3"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
              }

              if (_eles["0-1-1-1-3-3"]) {
                _parents.push(_eles["0-1-1-1-3-3"]);

                // Taking care of the node with no tag 0-1-1-1-3-3-0
                oldEle = _t.$retrieveElement("0-1-1-1-3-3-0", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-3-0"];
                _eles["0-1-1-1-3-3-0"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-3-0")) {
                  $_go["0-1-1-1-3-3-0"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-3-0"] && !_eles["0-1-1-1-3-3-0"]) {
                  $_go["0-1-1-1-3-3-0"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-3-3-0"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-3-3-0"] &&
                    _eles["0-1-1-1-3-3-0"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-1-1-3-3-0"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-3-3-0"] = _t.$createText(
                      {
                        id: "0-1-1-1-3-3-0",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-3-0"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node div 0-1-1-1-3-3-1
                oldEle = _t.$retrieveElement("0-1-1-1-3-3-1", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-3-1"];
                _eles["0-1-1-1-3-3-1"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-3-1")) {
                  $_go["0-1-1-1-3-3-1"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-3-1"] && !_eles["0-1-1-1-3-3-1"]) {
                  $_go["0-1-1-1-3-3-1"] = true;
                }

                _props = bbn.fn.createObject();
                _props["class"] =
                  "bbn-lpadded bbn-state-error bbn-block bbn-nowrap";

                if (
                  $_go["0-1-1-1-3-3-1"] &&
                  !_forgotten["0-1-1-1-3-3-1"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-1-1-3-3-1 div");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-1-1-3-3-1"] !== _t.$el &&
                    !_forgotten["0-1-1-1-3-3-1"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-1-1-3-3-1"] ||
                      bbn.fn.isComment(_eles["0-1-1-1-3-3-1"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-3-1"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-1-1-3-3-1"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-3-1"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-3-1"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                }

                if (_eles["0-1-1-1-3-3-1"]) {
                  _parents.push(_eles["0-1-1-1-3-3-1"]);

                  // Taking care of the node with no tag 0-1-1-1-3-3-1-0
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-0", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-0"];
                  _eles["0-1-1-1-3-3-1-0"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-0")) {
                    $_go["0-1-1-1-3-3-1-0"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-0"] && !_eles["0-1-1-1-3-3-1-0"]) {
                    $_go["0-1-1-1-3-3-1-0"] = true;
                  }

                  _sIr(
                    "-13cd70644bd9f6dc",
                    `
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-3-3-1-0"] ||
                    _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-3-3-1-0"] &&
                      _eles["0-1-1-1-3-3-1-0"].textContent !==
                        _gIv("-13cd70644bd9f6dc", _bbnHash)
                    ) {
                      _eles["0-1-1-1-3-3-1-0"].textContent = _gIv(
                        "-13cd70644bd9f6dc",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-3-3-1-0"] = _t.$createText(
                        {
                          id: "0-1-1-1-3-3-1-0",
                          hash: "-13cd70644bd9f6dc",
                          text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-0"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node h1 0-1-1-1-3-3-1-1
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-1", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-1"];
                  _eles["0-1-1-1-3-3-1-1"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-1")) {
                    $_go["0-1-1-1-3-3-1-1"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-1"] && !_eles["0-1-1-1-3-3-1-1"]) {
                    $_go["0-1-1-1-3-3-1-1"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp = _sIr(
                    "-264ba918-445a02f8",
                    errorStatus.status,
                    _bbnHash
                  );
                  if (_tmp !== undefined) {
                    _props["bbn-text"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-3-3-1-1"] &&
                    _node.attr["bbn-text"] &&
                    !Object.hasOwn(_node.attr["bbn-text"], "value") &&
                    _node.attr["bbn-text"].hash &&
                    _gIs(_node.attr["bbn-text"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-3-1-1"] = true;
                  }

                  if (
                    $_go["0-1-1-1-3-3-1-1"] &&
                    !_forgotten["0-1-1-1-3-3-1-1"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-3-1-1 h1");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-3-1-1"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-3-1-1"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-3-1-1"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-3-1-1"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-3-1-1"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-3-1-1"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-1"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(
                        _tmp,
                        _eles["0-1-1-1-3-3-1-1"]
                      );
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-3-1-1"] &&
                    _eles["0-1-1-1-3-3-1-1"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  // Taking care of the node with no tag 0-1-1-1-3-3-1-2
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-2", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-2"];
                  _eles["0-1-1-1-3-3-1-2"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-2")) {
                    $_go["0-1-1-1-3-3-1-2"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-2"] && !_eles["0-1-1-1-3-3-1-2"]) {
                    $_go["0-1-1-1-3-3-1-2"] = true;
                  }

                  _sIr(
                    "-13cd70644bd9f6dc",
                    `
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-3-3-1-2"] ||
                    _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-3-3-1-2"] &&
                      _eles["0-1-1-1-3-3-1-2"].textContent !==
                        _gIv("-13cd70644bd9f6dc", _bbnHash)
                    ) {
                      _eles["0-1-1-1-3-3-1-2"].textContent = _gIv(
                        "-13cd70644bd9f6dc",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-3-3-1-2"] = _t.$createText(
                        {
                          id: "0-1-1-1-3-3-1-2",
                          hash: "-13cd70644bd9f6dc",
                          text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-2"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node div 0-1-1-1-3-3-1-3
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-3", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-3"];
                  _eles["0-1-1-1-3-3-1-3"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-3")) {
                    $_go["0-1-1-1-3-3-1-3"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-3"] && !_eles["0-1-1-1-3-3-1-3"]) {
                    $_go["0-1-1-1-3-3-1-3"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp = _sIr("4a7e2fc7-156d2fd9", url, _bbnHash);
                  if (_tmp !== undefined) {
                    _props["bbn-text"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-3-3-1-3"] &&
                    _node.attr["bbn-text"] &&
                    !Object.hasOwn(_node.attr["bbn-text"], "value") &&
                    _node.attr["bbn-text"].hash &&
                    _gIs(_node.attr["bbn-text"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-3-1-3"] = true;
                  }

                  if (
                    $_go["0-1-1-1-3-3-1-3"] &&
                    !_forgotten["0-1-1-1-3-3-1-3"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-3-1-3 div");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-3-1-3"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-3-1-3"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-3-1-3"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-3-1-3"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-3-1-3"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-3-1-3"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-3"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(
                        _tmp,
                        _eles["0-1-1-1-3-3-1-3"]
                      );
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-3-1-3"] &&
                    _eles["0-1-1-1-3-3-1-3"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  // Taking care of the node with no tag 0-1-1-1-3-3-1-4
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-4", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-4"];
                  _eles["0-1-1-1-3-3-1-4"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-4")) {
                    $_go["0-1-1-1-3-3-1-4"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-4"] && !_eles["0-1-1-1-3-3-1-4"]) {
                    $_go["0-1-1-1-3-3-1-4"] = true;
                  }

                  _sIr(
                    "-13cd70644bd9f6dc",
                    `
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-3-3-1-4"] ||
                    _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-3-3-1-4"] &&
                      _eles["0-1-1-1-3-3-1-4"].textContent !==
                        _gIv("-13cd70644bd9f6dc", _bbnHash)
                    ) {
                      _eles["0-1-1-1-3-3-1-4"].textContent = _gIv(
                        "-13cd70644bd9f6dc",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-3-3-1-4"] = _t.$createText(
                        {
                          id: "0-1-1-1-3-3-1-4",
                          hash: "-13cd70644bd9f6dc",
                          text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-4"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node div 0-1-1-1-3-3-1-5
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-5", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-5"];
                  _eles["0-1-1-1-3-3-1-5"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-5")) {
                    $_go["0-1-1-1-3-3-1-5"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-5"] && !_eles["0-1-1-1-3-3-1-5"]) {
                    $_go["0-1-1-1-3-3-1-5"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _tmp = _sIr(
                    "-54b10bc5-752dc045",
                    errorStatus.statusText,
                    _bbnHash
                  );
                  if (_tmp !== undefined) {
                    _props["bbn-text"] = _tmp;
                  }
                  if (
                    !$_go["0-1-1-1-3-3-1-5"] &&
                    _node.attr["bbn-text"] &&
                    !Object.hasOwn(_node.attr["bbn-text"], "value") &&
                    _node.attr["bbn-text"].hash &&
                    _gIs(_node.attr["bbn-text"].hash, _bbnHash) !== "OK"
                  ) {
                    $_go["0-1-1-1-3-3-1-5"] = true;
                  }
                  _props["class"] = "bbn-vlpadded bbn-b";

                  if (
                    $_go["0-1-1-1-3-3-1-5"] &&
                    !_forgotten["0-1-1-1-3-3-1-5"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-3-1-5 div");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-3-1-5"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-3-1-5"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-3-1-5"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-3-1-5"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-3-1-5"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-3-1-5"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-5"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(
                        _tmp,
                        _eles["0-1-1-1-3-3-1-5"]
                      );
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-3-1-5"] &&
                    _eles["0-1-1-1-3-3-1-5"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  // Taking care of the node with no tag 0-1-1-1-3-3-1-6
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-6", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-6"];
                  _eles["0-1-1-1-3-3-1-6"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-6")) {
                    $_go["0-1-1-1-3-3-1-6"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-6"] && !_eles["0-1-1-1-3-3-1-6"]) {
                    $_go["0-1-1-1-3-3-1-6"] = true;
                  }

                  _sIr(
                    "-13cd70644bd9f6dc",
                    `
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-3-3-1-6"] ||
                    _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-3-3-1-6"] &&
                      _eles["0-1-1-1-3-3-1-6"].textContent !==
                        _gIv("-13cd70644bd9f6dc", _bbnHash)
                    ) {
                      _eles["0-1-1-1-3-3-1-6"].textContent = _gIv(
                        "-13cd70644bd9f6dc",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-3-3-1-6"] = _t.$createText(
                        {
                          id: "0-1-1-1-3-3-1-6",
                          hash: "-13cd70644bd9f6dc",
                          text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-6"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node div 0-1-1-1-3-3-1-7
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-7", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-7"];
                  _eles["0-1-1-1-3-3-1-7"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-7")) {
                    $_go["0-1-1-1-3-3-1-7"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-7"] && !_eles["0-1-1-1-3-3-1-7"]) {
                    $_go["0-1-1-1-3-3-1-7"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _props["class"] = "bbn-c";

                  if (
                    $_go["0-1-1-1-3-3-1-7"] &&
                    !_forgotten["0-1-1-1-3-3-1-7"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-1-1-3-3-1-7 div");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-1-1-3-3-1-7"] !== _t.$el &&
                      !_forgotten["0-1-1-1-3-3-1-7"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-1-1-3-3-1-7"] ||
                        bbn.fn.isComment(_eles["0-1-1-1-3-3-1-7"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-3-1-7"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-1-1-3-3-1-7"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-7"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(
                        _tmp,
                        _eles["0-1-1-1-3-3-1-7"]
                      );
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (_eles["0-1-1-1-3-3-1-7"]) {
                    _parents.push(_eles["0-1-1-1-3-3-1-7"]);

                    // Taking care of the node with no tag 0-1-1-1-3-3-1-7-0
                    oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-7-0", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-3-3-1-7-0"];
                    _eles["0-1-1-1-3-3-1-7-0"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-7-0")) {
                      $_go["0-1-1-1-3-3-1-7-0"] = !oldEle;
                    }
                    if (
                      !$_go["0-1-1-1-3-3-1-7-0"] &&
                      !_eles["0-1-1-1-3-3-1-7-0"]
                    ) {
                      $_go["0-1-1-1-3-3-1-7-0"] = true;
                    }

                    _sIr(
                      "-5632eae47db831dc",
                      `
                `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-1-1-3-3-1-7-0"] ||
                      _gIs("-5632eae47db831dc", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-1-1-3-3-1-7-0"] &&
                        _eles["0-1-1-1-3-3-1-7-0"].textContent !==
                          _gIv("-5632eae47db831dc", _bbnHash)
                      ) {
                        _eles["0-1-1-1-3-3-1-7-0"].textContent = _gIv(
                          "-5632eae47db831dc",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-1-1-3-3-1-7-0"] = _t.$createText(
                          {
                            id: "0-1-1-1-3-3-1-7-0",
                            hash: "-5632eae47db831dc",
                            text: _gIv("-5632eae47db831dc", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-3-3-1-7-0"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    // Taking care of the node bbn-button 0-1-1-1-3-3-1-7-1
                    oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-7-1", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-3-3-1-7-1"];
                    _eles["0-1-1-1-3-3-1-7-1"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-7-1")) {
                      $_go["0-1-1-1-3-3-1-7-1"] = !oldEle;
                    }
                    if (
                      !$_go["0-1-1-1-3-3-1-7-1"] &&
                      !_eles["0-1-1-1-3-3-1-7-1"]
                    ) {
                      $_go["0-1-1-1-3-3-1-7-1"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _tmp = _sIr("-4336636e21446092", _("Close"), _bbnHash);
                    if (_tmp !== undefined) {
                      _props["text"] = _tmp;
                    }
                    if (
                      !$_go["0-1-1-1-3-3-1-7-1"] &&
                      _node.attr["text"] &&
                      !Object.hasOwn(_node.attr["text"], "value") &&
                      _node.attr["text"].hash &&
                      _gIs(_node.attr["text"].hash, _bbnHash) !== "OK"
                    ) {
                      $_go["0-1-1-1-3-3-1-7-1"] = true;
                    }
                    _props["class"] = "bbn-state-error";
                    _props["icon"] = "nf nf-fa-times";

                    if (
                      $_go["0-1-1-1-3-3-1-7-1"] &&
                      !_forgotten["0-1-1-1-3-3-1-7-1"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-1-1-3-3-1-7-1 bbn-button");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-1-1-3-3-1-7-1"] !== _t.$el &&
                        !_forgotten["0-1-1-1-3-3-1-7-1"]?.[
                          _bbnHash || "_root"
                        ] &&
                        (!_eles["0-1-1-1-3-3-1-7-1"] ||
                          bbn.fn.isComment(_eles["0-1-1-1-3-3-1-7-1"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-3-1-7-1"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-1-1-3-3-1-7-1"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-3-3-1-7-1"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-1-1-3-3-1-7-1"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                      if (isAnew) {
                        let _bbnCurrentElement = _eles["0-1-1-1-3-3-1-7-1"];
                        _eles["0-1-1-1-3-3-1-7-1"].addEventListener(
                          "click",
                          (_bbnEventObject) => {
                            let $event = _bbnEventObject;
                            let $_action = close;
                            if (bbn.fn.isFunction($_action)) {
                              const args = _bbnEventObject.detail?.args || [
                                $event,
                              ];
                              args.push(_bbnEventObject);
                              $_action.bind(_t.$origin)(...args);
                            }
                            bbn.fn.iterate(
                              _bbnCurrentData,
                              (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                                //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                                if (
                                  _bbnCurrentDataValue !==
                                  eval(_bbnCurrentDataIndex)
                                ) {
                                  if (_t[_bbnCurrentDataIndex] !== undefined) {
                                    _t[_bbnCurrentDataIndex] =
                                      eval(_bbnCurrentDataIndex);
                                  }
                                  _bbnCurrentData[_bbnCurrentDataIndex] =
                                    _t[_bbnCurrentDataIndex];
                                }
                              }
                            );
                            _t.$tick();
                          }
                        );
                      }
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-1-1-3-3-1-7-1"] &&
                      _eles["0-1-1-1-3-3-1-7-1"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    // Taking care of the node with no tag 0-1-1-1-3-3-1-7-2
                    oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-7-2", _bbnHash);
                    _node = _t.$currentMap["0-1-1-1-3-3-1-7-2"];
                    _eles["0-1-1-1-3-3-1-7-2"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-7-2")) {
                      $_go["0-1-1-1-3-3-1-7-2"] = !oldEle;
                    }
                    if (
                      !$_go["0-1-1-1-3-3-1-7-2"] &&
                      !_eles["0-1-1-1-3-3-1-7-2"]
                    ) {
                      $_go["0-1-1-1-3-3-1-7-2"] = true;
                    }

                    _sIr(
                      "-13cd70644bd9f6dc",
                      `
              `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-1-1-3-3-1-7-2"] ||
                      _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-1-1-3-3-1-7-2"] &&
                        _eles["0-1-1-1-3-3-1-7-2"].textContent !==
                          _gIv("-13cd70644bd9f6dc", _bbnHash)
                      ) {
                        _eles["0-1-1-1-3-3-1-7-2"].textContent = _gIv(
                          "-13cd70644bd9f6dc",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-1-1-3-3-1-7-2"] = _t.$createText(
                          {
                            id: "0-1-1-1-3-3-1-7-2",
                            hash: "-13cd70644bd9f6dc",
                            text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-1-1-3-3-1-7-2"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    _parents.pop();
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-1-1-3-3-1-7"] &&
                    _eles["0-1-1-1-3-3-1-7"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  // Taking care of the node with no tag 0-1-1-1-3-3-1-8
                  oldEle = _t.$retrieveElement("0-1-1-1-3-3-1-8", _bbnHash);
                  _node = _t.$currentMap["0-1-1-1-3-3-1-8"];
                  _eles["0-1-1-1-3-3-1-8"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-1-1-3-3-1-8")) {
                    $_go["0-1-1-1-3-3-1-8"] = !oldEle;
                  }
                  if (!$_go["0-1-1-1-3-3-1-8"] && !_eles["0-1-1-1-3-3-1-8"]) {
                    $_go["0-1-1-1-3-3-1-8"] = true;
                  }

                  _sIr(
                    "-394b55e4-2631c424",
                    `
            `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-1-1-3-3-1-8"] ||
                    _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-1-1-3-3-1-8"] &&
                      _eles["0-1-1-1-3-3-1-8"].textContent !==
                        _gIv("-394b55e4-2631c424", _bbnHash)
                    ) {
                      _eles["0-1-1-1-3-3-1-8"].textContent = _gIv(
                        "-394b55e4-2631c424",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-1-1-3-3-1-8"] = _t.$createText(
                        {
                          id: "0-1-1-1-3-3-1-8",
                          hash: "-394b55e4-2631c424",
                          text: _gIv("-394b55e4-2631c424", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-1-1-3-3-1-8"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  _parents.pop();
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-1-1-3-3-1"] &&
                  _eles["0-1-1-1-3-3-1"] !== _t.$el
                ) {
                  $_num++;
                }

                // Taking care of the node with no tag 0-1-1-1-3-3-2
                oldEle = _t.$retrieveElement("0-1-1-1-3-3-2", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-3-2"];
                _eles["0-1-1-1-3-3-2"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-3-2")) {
                  $_go["0-1-1-1-3-3-2"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-3-2"] && !_eles["0-1-1-1-3-3-2"]) {
                  $_go["0-1-1-1-3-3-2"] = true;
                }

                _sIr(
                  "-28049b64-772aff24",
                  `
          `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-3-3-2"] ||
                  _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-3-3-2"] &&
                    _eles["0-1-1-1-3-3-2"].textContent !==
                      _gIv("-28049b64-772aff24", _bbnHash)
                  ) {
                    _eles["0-1-1-1-3-3-2"].textContent = _gIv(
                      "-28049b64-772aff24",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-3-3-2"] = _t.$createText(
                      {
                        id: "0-1-1-1-3-3-2",
                        hash: "-28049b64-772aff24",
                        text: _gIv("-28049b64-772aff24", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-3-2"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                _parents.pop();
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-1-1-3-3"] &&
                _eles["0-1-1-1-3-3"] !== _t.$el
              ) {
                $_num++;
              }

              //Ending condition
            }

            // Taking care of the node bbn-loader 0-1-1-1-3-5
            else if (_gIv("CONDITION0-1-1-1-3-5-53f17f73-33e4216d", _bbnHash)) {
              oldEle = _t.$retrieveElement("0-1-1-1-3-5", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-3-5"];
              _eles["0-1-1-1-3-5"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-3-5")) {
                $_go["0-1-1-1-3-5"] = !oldEle;
              }
              if (!$_go["0-1-1-1-3-5"] && !_eles["0-1-1-1-3-5"]) {
                $_go["0-1-1-1-3-5"] = true;
              }

              _props = bbn.fn.createObject();

              if (
                $_go["0-1-1-1-3-5"] &&
                !_forgotten["0-1-1-1-3-5"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-1-1-3-5 bbn-loader");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-1-1-3-5"] !== _t.$el &&
                  !_forgotten["0-1-1-1-3-5"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-1-1-3-5"] ||
                    bbn.fn.isComment(_eles["0-1-1-1-3-5"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-5"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-1-1-3-5"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-3-5"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-5"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-1-1-3-5"] &&
                _eles["0-1-1-1-3-5"] !== _t.$el
              ) {
                $_num++;
              }

              //Ending condition
            }

            // Taking care of the node div 0-1-1-1-3-7

            _isCondTrue = false;
            // Checking the set of conditions (if any other) on the first condition
            $_go["0-1-1-1-3-7"] = false;
            _isCondTrue = _sIr(
              "CONDITION0-1-1-1-3-7-0925ae91-5edc6a6f",
              !isVisible && visual && thumbnail,
              _bbnHash
            );
            if (
              _gIs("CONDITION0-1-1-1-3-7-0925ae91-5edc6a6f", _bbnHash) !== "OK"
            ) {
              $_go["0-1-1-1-3-7"] = true;
              let _tmp = _gIv(
                "CONDITION0-1-1-1-3-7-0925ae91-5edc6a6f",
                _bbnHash
              );
              let _e;
              if (!_tmp) {
                _e = _t.$retrieveElement("0-1-1-1-3-7", _bbnHash);
                if (_e && !bbn.fn.isComment(_e)) {
                  let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                  _t.$removeDOM(_e);
                  _e = false;
                }
                if (!_e) {
                  _eles["0-1-1-1-3-7"] = await _t.$createElement(
                    {
                      id: "0-1-1-1-3-7",
                      hash: "CONDITION0-1-1-1-3-7-0925ae91-5edc6a6f",
                      loopHash: _bbnHash,
                      conditionId: "YO3UDtVw82LiGjQ7xLT8XWHR7mhTpH6M",
                      comment: true,
                    },
                    _parents.at(-1)
                  );
                }
              }
            }
            if (_gIv("CONDITION0-1-1-1-3-7-0925ae91-5edc6a6f", _bbnHash)) {
              oldEle = _t.$retrieveElement("0-1-1-1-3-7", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-3-7"];
              _eles["0-1-1-1-3-7"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-3-7")) {
                $_go["0-1-1-1-3-7"] = !oldEle;
              }
              if (!$_go["0-1-1-1-3-7"] && !_eles["0-1-1-1-3-7"]) {
                $_go["0-1-1-1-3-7"] = true;
              }

              _props = bbn.fn.createObject();
              _props["class"] = "bbn-overlay";
              _props["style"] = "overflow: hidden";

              if (
                $_go["0-1-1-1-3-7"] &&
                !_forgotten["0-1-1-1-3-7"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-1-1-3-7 div");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-1-1-3-7"] !== _t.$el &&
                  !_forgotten["0-1-1-1-3-7"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-1-1-3-7"] ||
                    bbn.fn.isComment(_eles["0-1-1-1-3-7"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-7"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-1-1-3-7"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-3-7"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-7"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
              }

              if (_eles["0-1-1-1-3-7"]) {
                _parents.push(_eles["0-1-1-1-3-7"]);

                // Taking care of the node with no tag 0-1-1-1-3-7-0
                oldEle = _t.$retrieveElement("0-1-1-1-3-7-0", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-7-0"];
                _eles["0-1-1-1-3-7-0"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-7-0")) {
                  $_go["0-1-1-1-3-7-0"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-7-0"] && !_eles["0-1-1-1-3-7-0"]) {
                  $_go["0-1-1-1-3-7-0"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-3-7-0"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-3-7-0"] &&
                    _eles["0-1-1-1-3-7-0"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-1-1-3-7-0"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-3-7-0"] = _t.$createText(
                      {
                        id: "0-1-1-1-3-7-0",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-7-0"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node img 0-1-1-1-3-7-1
                oldEle = _t.$retrieveElement("0-1-1-1-3-7-1", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-7-1"];
                _eles["0-1-1-1-3-7-1"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-7-1")) {
                  $_go["0-1-1-1-3-7-1"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-7-1"] && !_eles["0-1-1-1-3-7-1"]) {
                  $_go["0-1-1-1-3-7-1"] = true;
                }

                _props = bbn.fn.createObject();
                _tmp = _sIr("6cb5dcea7d83b26a", thumbnail, _bbnHash);
                if (_tmp !== undefined) {
                  _props["src"] = _tmp;
                }
                if (
                  !$_go["0-1-1-1-3-7-1"] &&
                  _node.attr["src"] &&
                  !Object.hasOwn(_node.attr["src"], "value") &&
                  _node.attr["src"].hash &&
                  _gIs(_node.attr["src"].hash, _bbnHash) !== "OK"
                ) {
                  $_go["0-1-1-1-3-7-1"] = true;
                }
                _props["style"] = "width: 100%; max-height: 100%; height: auto";

                if (
                  $_go["0-1-1-1-3-7-1"] &&
                  !_forgotten["0-1-1-1-3-7-1"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-1-1-3-7-1 img");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-1-1-3-7-1"] !== _t.$el &&
                    !_forgotten["0-1-1-1-3-7-1"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-1-1-3-7-1"] ||
                      bbn.fn.isComment(_eles["0-1-1-1-3-7-1"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-7-1"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-1-1-3-7-1"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-7-1"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-7-1"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-1-1-3-7-1"] &&
                  _eles["0-1-1-1-3-7-1"] !== _t.$el
                ) {
                  $_num++;
                }

                // Taking care of the node with no tag 0-1-1-1-3-7-2
                oldEle = _t.$retrieveElement("0-1-1-1-3-7-2", _bbnHash);
                _node = _t.$currentMap["0-1-1-1-3-7-2"];
                _eles["0-1-1-1-3-7-2"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-1-1-3-7-2")) {
                  $_go["0-1-1-1-3-7-2"] = !oldEle;
                }
                if (!$_go["0-1-1-1-3-7-2"] && !_eles["0-1-1-1-3-7-2"]) {
                  $_go["0-1-1-1-3-7-2"] = true;
                }

                _sIr(
                  "-28049b64-772aff24",
                  `
          `,
                  _bbnHash
                );
                if (
                  $_go["0-1-1-1-3-7-2"] ||
                  _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-1-1-3-7-2"] &&
                    _eles["0-1-1-1-3-7-2"].textContent !==
                      _gIv("-28049b64-772aff24", _bbnHash)
                  ) {
                    _eles["0-1-1-1-3-7-2"].textContent = _gIv(
                      "-28049b64-772aff24",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-1-1-3-7-2"] = _t.$createText(
                      {
                        id: "0-1-1-1-3-7-2",
                        hash: "-28049b64-772aff24",
                        text: _gIv("-28049b64-772aff24", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-1-1-3-7-2"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                _parents.pop();
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-1-1-3-7"] &&
                _eles["0-1-1-1-3-7"] !== _t.$el
              ) {
                $_num++;
              }

              //Ending condition
            }

            // Taking care of the node bbn-popup 0-1-1-1-3-9

            _isCondTrue = false;
            // Checking the set of conditions (if any other) on the first condition
            $_go["0-1-1-1-3-9"] = false;
            _isCondTrue = _sIr(
              "CONDITION0-1-1-1-3-9--62285aed-52f8a52d",
              ready,
              _bbnHash
            );
            if (
              _gIs("CONDITION0-1-1-1-3-9--62285aed-52f8a52d", _bbnHash) !== "OK"
            ) {
              $_go["0-1-1-1-3-9"] = true;
              let _tmp = _gIv(
                "CONDITION0-1-1-1-3-9--62285aed-52f8a52d",
                _bbnHash
              );
              let _e;
              if (!_tmp) {
                _e = _t.$retrieveElement("0-1-1-1-3-9", _bbnHash);
                if (_e && !bbn.fn.isComment(_e)) {
                  let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                  _t.$removeDOM(_e);
                  _e = false;
                }
                if (!_e) {
                  _eles["0-1-1-1-3-9"] = await _t.$createElement(
                    {
                      id: "0-1-1-1-3-9",
                      hash: "CONDITION0-1-1-1-3-9--62285aed-52f8a52d",
                      loopHash: _bbnHash,
                      conditionId: "DtMeXc5Z26hG039xBC0w848d8s5O0HOk",
                      comment: true,
                    },
                    _parents.at(-1)
                  );
                }
              }
            }
            if (_gIv("CONDITION0-1-1-1-3-9--62285aed-52f8a52d", _bbnHash)) {
              oldEle = _t.$retrieveElement("0-1-1-1-3-9", _bbnHash);
              _node = _t.$currentMap["0-1-1-1-3-9"];
              _eles["0-1-1-1-3-9"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-1-1-3-9")) {
                $_go["0-1-1-1-3-9"] = !oldEle;
              }
              if (!$_go["0-1-1-1-3-9"] && !_eles["0-1-1-1-3-9"]) {
                $_go["0-1-1-1-3-9"] = true;
              }

              _props = bbn.fn.createObject();
              _tmp = _sIr("-3ac3fff92eb83fa7", popups, _bbnHash);
              if (_tmp !== undefined) {
                _props["source"] = _tmp;
              }
              if (
                !$_go["0-1-1-1-3-9"] &&
                _node.attr["source"] &&
                !Object.hasOwn(_node.attr["source"], "value") &&
                _node.attr["source"].hash &&
                _gIs(_node.attr["source"].hash, _bbnHash) !== "OK"
              ) {
                $_go["0-1-1-1-3-9"] = true;
              }
              _tmp = _sIr(
                "14f656f64d5a5676",
                !hidden && isLoaded && (isVisible || cached) && popups.length,
                _bbnHash
              );
              if (_tmp !== undefined) {
                _props["bbn-show"] = _tmp;
              }
              if (
                !$_go["0-1-1-1-3-9"] &&
                _node.attr["bbn-show"] &&
                !Object.hasOwn(_node.attr["bbn-show"], "value") &&
                _node.attr["bbn-show"].hash &&
                _gIs(_node.attr["bbn-show"].hash, _bbnHash) !== "OK"
              ) {
                $_go["0-1-1-1-3-9"] = true;
              }
              _props["ref"] = "popup";

              if (
                $_go["0-1-1-1-3-9"] &&
                !_forgotten["0-1-1-1-3-9"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-1-1-3-9 bbn-popup");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-1-1-3-9"] !== _t.$el &&
                  !_forgotten["0-1-1-1-3-9"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-1-1-3-9"] ||
                    bbn.fn.isComment(_eles["0-1-1-1-3-9"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-1-1-3-9"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-1-1-3-9"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-1-1-3-9"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-1-1-3-9"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-1-1-3-9"] &&
                _eles["0-1-1-1-3-9"] !== _t.$el
              ) {
                $_num++;
              }

              //Ending condition
            }

            _parents.pop();
          }

          if (
            _t.$el === _parents.at(-1) &&
            _eles["0-1-1-1-3"] &&
            _eles["0-1-1-1-3"] !== _t.$el
          ) {
            $_num++;
          }

          // Taking care of the node with no tag 0-1-1-1-4
          oldEle = _t.$retrieveElement("0-1-1-1-4", _bbnHash);
          _node = _t.$currentMap["0-1-1-1-4"];
          _eles["0-1-1-1-4"] = oldEle;
          if (!Object.hasOwn($_go, "0-1-1-1-4")) {
            $_go["0-1-1-1-4"] = !oldEle;
          }
          if (!$_go["0-1-1-1-4"] && !_eles["0-1-1-1-4"]) {
            $_go["0-1-1-1-4"] = true;
          }

          _sIr(
            "4b76b99c-10e5f524",
            `
      `,
            _bbnHash
          );
          if (
            $_go["0-1-1-1-4"] ||
            _gIs("4b76b99c-10e5f524", _bbnHash) !== "OK"
          ) {
            if (
              _eles["0-1-1-1-4"] &&
              _eles["0-1-1-1-4"].textContent !==
                _gIv("4b76b99c-10e5f524", _bbnHash)
            ) {
              _eles["0-1-1-1-4"].textContent = _gIv(
                "4b76b99c-10e5f524",
                _bbnHash
              );
            } else {
              _eles["0-1-1-1-4"] = _t.$createText(
                {
                  id: "0-1-1-1-4",
                  hash: "4b76b99c-10e5f524",
                  text: _gIv("4b76b99c-10e5f524", _bbnHash),
                  loopHash: _bbnHash,
                },
                _parents.at(-1)
              );
              if (_parents.at(-1) === _t.$el) {
                $_final.push({ ele: _eles["0-1-1-1-4"], position: $_num });
              }
            }
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }

          _parents.pop();
        }

        if (
          _t.$el === _parents.at(-1) &&
          _eles["0-1-1-1"] &&
          _eles["0-1-1-1"] !== _t.$el
        ) {
          $_num++;
        }

        // Taking care of the node with no tag 0-1-1-2
        oldEle = _t.$retrieveElement("0-1-1-2", _bbnHash);
        _node = _t.$currentMap["0-1-1-2"];
        _eles["0-1-1-2"] = oldEle;
        if (!Object.hasOwn($_go, "0-1-1-2")) {
          $_go["0-1-1-2"] = !oldEle;
        }
        if (!$_go["0-1-1-2"] && !_eles["0-1-1-2"]) {
          $_go["0-1-1-2"] = true;
        }

        _sIr(
          "-6304abe4-7727b024",
          `
    `,
          _bbnHash
        );
        if ($_go["0-1-1-2"] || _gIs("-6304abe4-7727b024", _bbnHash) !== "OK") {
          if (
            _eles["0-1-1-2"] &&
            _eles["0-1-1-2"].textContent !==
              _gIv("-6304abe4-7727b024", _bbnHash)
          ) {
            _eles["0-1-1-2"].textContent = _gIv("-6304abe4-7727b024", _bbnHash);
          } else {
            _eles["0-1-1-2"] = _t.$createText(
              {
                id: "0-1-1-2",
                hash: "-6304abe4-7727b024",
                text: _gIv("-6304abe4-7727b024", _bbnHash),
                loopHash: _bbnHash,
              },
              _parents.at(-1)
            );
            if (_parents.at(-1) === _t.$el) {
              $_final.push({ ele: _eles["0-1-1-2"], position: $_num });
            }
          }
        }
        if (_parents.at(-1) === _t.$el) {
          $_num++;
        }

        _parents.pop();
      }

      if (
        _t.$el === _parents.at(-1) &&
        _eles["0-1-1"] &&
        _eles["0-1-1"] !== _t.$el
      ) {
        $_num++;
      }

      // Taking care of the node with no tag 0-1-2
      oldEle = _t.$retrieveElement("0-1-2", _bbnHash);
      _node = _t.$currentMap["0-1-2"];
      _eles["0-1-2"] = oldEle;
      if (!Object.hasOwn($_go, "0-1-2")) {
        $_go["0-1-2"] = !oldEle;
      }
      if (!$_go["0-1-2"] && !_eles["0-1-2"]) {
        $_go["0-1-2"] = true;
      }

      _sIr(
        "-6304abe4-7727b024",
        `
    `,
        _bbnHash
      );
      if ($_go["0-1-2"] || _gIs("-6304abe4-7727b024", _bbnHash) !== "OK") {
        if (
          _eles["0-1-2"] &&
          _eles["0-1-2"].textContent !== _gIv("-6304abe4-7727b024", _bbnHash)
        ) {
          _eles["0-1-2"].textContent = _gIv("-6304abe4-7727b024", _bbnHash);
        } else {
          _eles["0-1-2"] = _t.$createText(
            {
              id: "0-1-2",
              hash: "-6304abe4-7727b024",
              text: _gIv("-6304abe4-7727b024", _bbnHash),
              loopHash: _bbnHash,
            },
            _parents.at(-1)
          );
          if (_parents.at(-1) === _t.$el) {
            $_final.push({ ele: _eles["0-1-2"], position: $_num });
          }
        }
      }
      if (_parents.at(-1) === _t.$el) {
        $_num++;
      }

      // Taking care of the node div 0-1-3

      _isCondTrue = false;
      // Checking the set of conditions (if any other) on the first condition
      $_go["0-1-3"] = false;
      _isCondTrue = _sIr(
        "CONDITION0-1-3--44dc4b9b27a99065",
        router?.isVisual && (!isVisible || router?.visualShowAll) && !isPane,
        _bbnHash
      );
      if (_gIs("CONDITION0-1-3--44dc4b9b27a99065", _bbnHash) !== "OK") {
        $_go["0-1-3"] = true;
        let _tmp = _gIv("CONDITION0-1-3--44dc4b9b27a99065", _bbnHash);
        let _e;
        if (!_tmp) {
          _e = _t.$retrieveElement("0-1-3", _bbnHash);
          if (_e && !bbn.fn.isComment(_e)) {
            let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
            _t.$removeDOM(_e);
            _e = false;
          }
          if (!_e) {
            _eles["0-1-3"] = await _t.$createElement(
              {
                id: "0-1-3",
                hash: "CONDITION0-1-3--44dc4b9b27a99065",
                loopHash: _bbnHash,
                conditionId: "UELHWaRtSGHO3tY1TDxEKp0k01y3G7O9",
                comment: true,
              },
              _parents.at(-1)
            );
          }
        }
      }
      if (_gIv("CONDITION0-1-3--44dc4b9b27a99065", _bbnHash)) {
        oldEle = _t.$retrieveElement("0-1-3", _bbnHash);
        _node = _t.$currentMap["0-1-3"];
        _eles["0-1-3"] = oldEle;
        if (!Object.hasOwn($_go, "0-1-3")) {
          $_go["0-1-3"] = !oldEle;
        }
        if (!$_go["0-1-3"] && !_eles["0-1-3"]) {
          $_go["0-1-3"] = true;
        }

        _props = bbn.fn.createObject();
        _props["class"] = "bbn-overlay";
        _props["style"] = "z-index: 12; background-color: black; opacity: 0.2;";

        if ($_go["0-1-3"] && !_forgotten["0-1-3"]?.[_bbnHash || "_root"]) {
          //  bbn.fn.log("IN TODO " + _t.$options.name);
          //  bbn.fn.log("DOING 0-1-3 div");
          _tmp = bbn.fn.clone(_node);
          if (_bbnHash) {
            _tmp.loopHash = _bbnHash;
          }
          _tmp.props = _props;
          isAnew = false;
          if (
            _eles["0-1-3"] !== _t.$el &&
            !_forgotten["0-1-3"]?.[_bbnHash || "_root"] &&
            (!_eles["0-1-3"] ||
              bbn.fn.isComment(_eles["0-1-3"]) ||
              !bbn.cp.isTag(_tmp.tag, _eles["0-1-3"]))
          ) {
            isAnew = true;
          }
          if (isAnew) {
            _eles["0-1-3"] = await _t.$createElement(_tmp, _parents.at(-1));
            if (_parents.at(-1) === _t.$el) {
              $_final.push({ ele: _eles["0-1-3"], position: $_num });
            }
          } else {
            _t.$updateElementFromProps(_tmp, _eles["0-1-3"]);
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }
        }

        if (_eles["0-1-3"]) {
          _parents.push(_eles["0-1-3"]);

          // Taking care of the node with no tag 0-1-3-0
          oldEle = _t.$retrieveElement("0-1-3-0", _bbnHash);
          _node = _t.$currentMap["0-1-3-0"];
          _eles["0-1-3-0"] = oldEle;
          if (!Object.hasOwn($_go, "0-1-3-0")) {
            $_go["0-1-3-0"] = !oldEle;
          }
          if (!$_go["0-1-3-0"] && !_eles["0-1-3-0"]) {
            $_go["0-1-3-0"] = true;
          }

          _sIr(
            "-6304abe4-7727b024",
            `
    `,
            _bbnHash
          );
          if (
            $_go["0-1-3-0"] ||
            _gIs("-6304abe4-7727b024", _bbnHash) !== "OK"
          ) {
            if (
              _eles["0-1-3-0"] &&
              _eles["0-1-3-0"].textContent !==
                _gIv("-6304abe4-7727b024", _bbnHash)
            ) {
              _eles["0-1-3-0"].textContent = _gIv(
                "-6304abe4-7727b024",
                _bbnHash
              );
            } else {
              _eles["0-1-3-0"] = _t.$createText(
                {
                  id: "0-1-3-0",
                  hash: "-6304abe4-7727b024",
                  text: _gIv("-6304abe4-7727b024", _bbnHash),
                  loopHash: _bbnHash,
                },
                _parents.at(-1)
              );
              if (_parents.at(-1) === _t.$el) {
                $_final.push({ ele: _eles["0-1-3-0"], position: $_num });
              }
            }
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }

          _parents.pop();
        }

        if (
          _t.$el === _parents.at(-1) &&
          _eles["0-1-3"] &&
          _eles["0-1-3"] !== _t.$el
        ) {
          $_num++;
        }

        //Ending condition
      }

      // Taking care of the node div 0-1-5

      _isCondTrue = false;
      // Checking the set of conditions (if any other) on the first condition
      $_go["0-1-5"] = false;
      _isCondTrue = _sIr(
        "CONDITION0-1-5-3fdc202c27d6f0ac",
        router?.isVisual && (!isVisible || router?.visualShowAll),
        _bbnHash
      );
      if (_gIs("CONDITION0-1-5-3fdc202c27d6f0ac", _bbnHash) !== "OK") {
        $_go["0-1-5"] = true;
        let _tmp = _gIv("CONDITION0-1-5-3fdc202c27d6f0ac", _bbnHash);
        let _e;
        if (!_tmp) {
          _e = _t.$retrieveElement("0-1-5", _bbnHash);
          if (_e && !bbn.fn.isComment(_e)) {
            let _cp = bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
            _t.$removeDOM(_e);
            _e = false;
          }
          if (!_e) {
            _eles["0-1-5"] = await _t.$createElement(
              {
                id: "0-1-5",
                hash: "CONDITION0-1-5-3fdc202c27d6f0ac",
                loopHash: _bbnHash,
                conditionId: "Gu6Ig9Mf4T0H4R5zrREV0w70JPdES9L7",
                comment: true,
              },
              _parents.at(-1)
            );
          }
        }
      }
      if (_gIv("CONDITION0-1-5-3fdc202c27d6f0ac", _bbnHash)) {
        oldEle = _t.$retrieveElement("0-1-5", _bbnHash);
        _node = _t.$currentMap["0-1-5"];
        _eles["0-1-5"] = oldEle;
        if (!Object.hasOwn($_go, "0-1-5")) {
          $_go["0-1-5"] = !oldEle;
        }
        if (!$_go["0-1-5"] && !_eles["0-1-5"]) {
          $_go["0-1-5"] = true;
        }

        _props = bbn.fn.createObject();
        _props["class"] = "bbn-overlay";
        _props["style"] = "z-index: 12";

        if ($_go["0-1-5"] && !_forgotten["0-1-5"]?.[_bbnHash || "_root"]) {
          //  bbn.fn.log("IN TODO " + _t.$options.name);
          //  bbn.fn.log("DOING 0-1-5 div");
          _tmp = bbn.fn.clone(_node);
          if (_bbnHash) {
            _tmp.loopHash = _bbnHash;
          }
          _tmp.props = _props;
          isAnew = false;
          if (
            _eles["0-1-5"] !== _t.$el &&
            !_forgotten["0-1-5"]?.[_bbnHash || "_root"] &&
            (!_eles["0-1-5"] ||
              bbn.fn.isComment(_eles["0-1-5"]) ||
              !bbn.cp.isTag(_tmp.tag, _eles["0-1-5"]))
          ) {
            isAnew = true;
          }
          if (isAnew) {
            _eles["0-1-5"] = await _t.$createElement(_tmp, _parents.at(-1));
            if (_parents.at(-1) === _t.$el) {
              $_final.push({ ele: _eles["0-1-5"], position: $_num });
            }
          } else {
            _t.$updateElementFromProps(_tmp, _eles["0-1-5"]);
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }
          if (isAnew) {
            let _bbnCurrentElement = _eles["0-1-5"];
            _eles["0-1-5"].addEventListener("click", (_bbnEventObject) => {
              let $event = _bbnEventObject;
              let $_action = router?.activateIndex(currentIndex);
              if (bbn.fn.isFunction($_action)) {
                const args = _bbnEventObject.detail?.args || [$event];
                args.push(_bbnEventObject);
                $_action.bind(_t.$origin)(...args);
              }
              bbn.fn.iterate(
                _bbnCurrentData,
                (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                  //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                  if (_bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)) {
                    if (_t[_bbnCurrentDataIndex] !== undefined) {
                      _t[_bbnCurrentDataIndex] = eval(_bbnCurrentDataIndex);
                    }
                    _bbnCurrentData[_bbnCurrentDataIndex] =
                      _t[_bbnCurrentDataIndex];
                  }
                }
              );
              _t.$tick();
            });
            _eles["0-1-5"].addEventListener("mouseenter", (_bbnEventObject) => {
              let $event = _bbnEventObject;
              let $_action = (isOver = true);
              if (bbn.fn.isFunction($_action)) {
                const args = _bbnEventObject.detail?.args || [$event];
                args.push(_bbnEventObject);
                $_action.bind(_t.$origin)(...args);
              }
              bbn.fn.iterate(
                _bbnCurrentData,
                (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                  //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                  if (_bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)) {
                    if (_t[_bbnCurrentDataIndex] !== undefined) {
                      _t[_bbnCurrentDataIndex] = eval(_bbnCurrentDataIndex);
                    }
                    _bbnCurrentData[_bbnCurrentDataIndex] =
                      _t[_bbnCurrentDataIndex];
                  }
                }
              );
              _t.$tick();
            });
            _eles["0-1-5"].addEventListener("mouseleave", (_bbnEventObject) => {
              let $event = _bbnEventObject;
              let $_action = (isOver = false);
              if (bbn.fn.isFunction($_action)) {
                const args = _bbnEventObject.detail?.args || [$event];
                args.push(_bbnEventObject);
                $_action.bind(_t.$origin)(...args);
              }
              bbn.fn.iterate(
                _bbnCurrentData,
                (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                  //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                  if (_bbnCurrentDataValue !== eval(_bbnCurrentDataIndex)) {
                    if (_t[_bbnCurrentDataIndex] !== undefined) {
                      _t[_bbnCurrentDataIndex] = eval(_bbnCurrentDataIndex);
                    }
                    _bbnCurrentData[_bbnCurrentDataIndex] =
                      _t[_bbnCurrentDataIndex];
                  }
                }
              );
              _t.$tick();
            });
          }
        }

        if (_eles["0-1-5"]) {
          _parents.push(_eles["0-1-5"]);

          // Taking care of the node with no tag 0-1-5-0
          oldEle = _t.$retrieveElement("0-1-5-0", _bbnHash);
          _node = _t.$currentMap["0-1-5-0"];
          _eles["0-1-5-0"] = oldEle;
          if (!Object.hasOwn($_go, "0-1-5-0")) {
            $_go["0-1-5-0"] = !oldEle;
          }
          if (!$_go["0-1-5-0"] && !_eles["0-1-5-0"]) {
            $_go["0-1-5-0"] = true;
          }

          _sIr(
            "4b76b99c-10e5f524",
            `
      `,
            _bbnHash
          );
          if ($_go["0-1-5-0"] || _gIs("4b76b99c-10e5f524", _bbnHash) !== "OK") {
            if (
              _eles["0-1-5-0"] &&
              _eles["0-1-5-0"].textContent !==
                _gIv("4b76b99c-10e5f524", _bbnHash)
            ) {
              _eles["0-1-5-0"].textContent = _gIv(
                "4b76b99c-10e5f524",
                _bbnHash
              );
            } else {
              _eles["0-1-5-0"] = _t.$createText(
                {
                  id: "0-1-5-0",
                  hash: "4b76b99c-10e5f524",
                  text: _gIv("4b76b99c-10e5f524", _bbnHash),
                  loopHash: _bbnHash,
                },
                _parents.at(-1)
              );
              if (_parents.at(-1) === _t.$el) {
                $_final.push({ ele: _eles["0-1-5-0"], position: $_num });
              }
            }
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }

          // Taking care of the node transition 0-1-5-1
          oldEle = _t.$retrieveElement("0-1-5-1", _bbnHash);
          _node = _t.$currentMap["0-1-5-1"];
          _eles["0-1-5-1"] = oldEle;
          if (!Object.hasOwn($_go, "0-1-5-1")) {
            $_go["0-1-5-1"] = !oldEle;
          }
          _eles["0-1-5-1"] = _parents.at(-1);
          $_go["0-1-5-1"] = false;

          _props = bbn.fn.createObject();
          _props["name"] = "fade";

          if (_eles["0-1-5-1"]) {
            _parents.push(_eles["0-1-5-1"]);

            // Taking care of the node with no tag 0-1-5-1-0
            oldEle = _t.$retrieveElement("0-1-5-1-0", _bbnHash);
            _node = _t.$currentMap["0-1-5-1-0"];
            _eles["0-1-5-1-0"] = oldEle;
            if (!Object.hasOwn($_go, "0-1-5-1-0")) {
              $_go["0-1-5-1-0"] = !oldEle;
            }
            if (!$_go["0-1-5-1-0"] && !_eles["0-1-5-1-0"]) {
              $_go["0-1-5-1-0"] = true;
            }

            _sIr(
              "48aebf1c5a2e45dc",
              `
        `,
              _bbnHash
            );
            if (
              $_go["0-1-5-1-0"] ||
              _gIs("48aebf1c5a2e45dc", _bbnHash) !== "OK"
            ) {
              if (
                _eles["0-1-5-1-0"] &&
                _eles["0-1-5-1-0"].textContent !==
                  _gIv("48aebf1c5a2e45dc", _bbnHash)
              ) {
                _eles["0-1-5-1-0"].textContent = _gIv(
                  "48aebf1c5a2e45dc",
                  _bbnHash
                );
              } else {
                _eles["0-1-5-1-0"] = _t.$createText(
                  {
                    id: "0-1-5-1-0",
                    hash: "48aebf1c5a2e45dc",
                    text: _gIv("48aebf1c5a2e45dc", _bbnHash),
                    loopHash: _bbnHash,
                  },
                  _parents.at(-1)
                );
                if (_parents.at(-1) === _t.$el) {
                  $_final.push({ ele: _eles["0-1-5-1-0"], position: $_num });
                }
              }
            }
            if (_parents.at(-1) === _t.$el) {
              $_num++;
            }

            // Taking care of the node div 0-1-5-1-1
            oldEle = _t.$retrieveElement("0-1-5-1-1", _bbnHash);
            _node = _t.$currentMap["0-1-5-1-1"];
            _eles["0-1-5-1-1"] = oldEle;
            if (!Object.hasOwn($_go, "0-1-5-1-1")) {
              $_go["0-1-5-1-1"] = !oldEle;
            }
            if (!$_go["0-1-5-1-1"] && !_eles["0-1-5-1-1"]) {
              $_go["0-1-5-1-1"] = true;
            }

            _props = bbn.fn.createObject();
            _tmp = _sIr(
              "-2f81c8b872cc7e88",
              {
                fontSize: isVisible && !router?.visualShowAll ? null : "10rem",
              },
              _bbnHash
            );
            if (_tmp !== undefined) {
              _props["style"] = bbn.cp.convertStyles(_tmp);
            }
            if (
              !$_go["0-1-5-1-1"] &&
              _node.attr["style"] &&
              !Object.hasOwn(_node.attr["style"], "value") &&
              _node.attr["style"].hash &&
              _gIs(_node.attr["style"].hash, _bbnHash) !== "OK"
            ) {
              $_go["0-1-5-1-1"] = true;
            }
            _tmp = _sIr("57f3071013e025f0", isOver, _bbnHash);
            if (_tmp !== undefined) {
              _props["bbn-show"] = _tmp;
            }
            if (
              !$_go["0-1-5-1-1"] &&
              _node.attr["bbn-show"] &&
              !Object.hasOwn(_node.attr["bbn-show"], "value") &&
              _node.attr["bbn-show"].hash &&
              _gIs(_node.attr["bbn-show"].hash, _bbnHash) !== "OK"
            ) {
              $_go["0-1-5-1-1"] = true;
            }
            _props["class"] = "bbn-bottom-left bbn-w-100";

            if (
              $_go["0-1-5-1-1"] &&
              !_forgotten["0-1-5-1-1"]?.[_bbnHash || "_root"]
            ) {
              //  bbn.fn.log("IN TODO " + _t.$options.name);
              //  bbn.fn.log("DOING 0-1-5-1-1 div");
              _tmp = bbn.fn.clone(_node);
              if (_bbnHash) {
                _tmp.loopHash = _bbnHash;
              }
              _tmp.props = _props;
              isAnew = false;
              if (
                _eles["0-1-5-1-1"] !== _t.$el &&
                !_forgotten["0-1-5-1-1"]?.[_bbnHash || "_root"] &&
                (!_eles["0-1-5-1-1"] ||
                  bbn.fn.isComment(_eles["0-1-5-1-1"]) ||
                  !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1"]))
              ) {
                isAnew = true;
              }
              if (isAnew) {
                _eles["0-1-5-1-1"] = await _t.$createElement(
                  _tmp,
                  _parents.at(-1)
                );
                if (_parents.at(-1) === _t.$el) {
                  $_final.push({ ele: _eles["0-1-5-1-1"], position: $_num });
                }
              } else {
                _t.$updateElementFromProps(_tmp, _eles["0-1-5-1-1"]);
              }
              if (_parents.at(-1) === _t.$el) {
                $_num++;
              }
            }

            if (_eles["0-1-5-1-1"]) {
              _parents.push(_eles["0-1-5-1-1"]);

              // Taking care of the node with no tag 0-1-5-1-1-0
              oldEle = _t.$retrieveElement("0-1-5-1-1-0", _bbnHash);
              _node = _t.$currentMap["0-1-5-1-1-0"];
              _eles["0-1-5-1-1-0"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-5-1-1-0")) {
                $_go["0-1-5-1-1-0"] = !oldEle;
              }
              if (!$_go["0-1-5-1-1-0"] && !_eles["0-1-5-1-1-0"]) {
                $_go["0-1-5-1-1-0"] = true;
              }

              _sIr(
                "-28049b64-772aff24",
                `
          `,
                _bbnHash
              );
              if (
                $_go["0-1-5-1-1-0"] ||
                _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
              ) {
                if (
                  _eles["0-1-5-1-1-0"] &&
                  _eles["0-1-5-1-1-0"].textContent !==
                    _gIv("-28049b64-772aff24", _bbnHash)
                ) {
                  _eles["0-1-5-1-1-0"].textContent = _gIv(
                    "-28049b64-772aff24",
                    _bbnHash
                  );
                } else {
                  _eles["0-1-5-1-1-0"] = _t.$createText(
                    {
                      id: "0-1-5-1-1-0",
                      hash: "-28049b64-772aff24",
                      text: _gIv("-28049b64-772aff24", _bbnHash),
                      loopHash: _bbnHash,
                    },
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-5-1-1-0"],
                      position: $_num,
                    });
                  }
                }
              }
              if (_parents.at(-1) === _t.$el) {
                $_num++;
              }

              // Taking care of the node div 0-1-5-1-1-1
              oldEle = _t.$retrieveElement("0-1-5-1-1-1", _bbnHash);
              _node = _t.$currentMap["0-1-5-1-1-1"];
              _eles["0-1-5-1-1-1"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-5-1-1-1")) {
                $_go["0-1-5-1-1-1"] = !oldEle;
              }
              if (!$_go["0-1-5-1-1-1"] && !_eles["0-1-5-1-1-1"]) {
                $_go["0-1-5-1-1-1"] = true;
              }

              _props = bbn.fn.createObject();
              _props["class"] = "bbn-bottom-left bbn-w-100 bbn-bg-black";
              _props["style"] = "opacity: 0.6; color: transparent";

              if (
                $_go["0-1-5-1-1-1"] &&
                !_forgotten["0-1-5-1-1-1"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-5-1-1-1 div");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-5-1-1-1"] !== _t.$el &&
                  !_forgotten["0-1-5-1-1-1"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-5-1-1-1"] ||
                    bbn.fn.isComment(_eles["0-1-5-1-1-1"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-5-1-1-1"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-5-1-1-1"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-5-1-1-1"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
              }

              if (_eles["0-1-5-1-1-1"]) {
                _parents.push(_eles["0-1-5-1-1-1"]);

                // Taking care of the node with no tag 0-1-5-1-1-1-0
                oldEle = _t.$retrieveElement("0-1-5-1-1-1-0", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-1-0"];
                _eles["0-1-5-1-1-1-0"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-1-0")) {
                  $_go["0-1-5-1-1-1-0"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-1-0"] && !_eles["0-1-5-1-1-1-0"]) {
                  $_go["0-1-5-1-1-1-0"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-5-1-1-1-0"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-5-1-1-1-0"] &&
                    _eles["0-1-5-1-1-1-0"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-5-1-1-1-0"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-5-1-1-1-0"] = _t.$createText(
                      {
                        id: "0-1-5-1-1-1-0",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-1-0"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node div 0-1-5-1-1-1-1
                oldEle = _t.$retrieveElement("0-1-5-1-1-1-1", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-1-1"];
                _eles["0-1-5-1-1-1-1"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-1-1")) {
                  $_go["0-1-5-1-1-1-1"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-1-1"] && !_eles["0-1-5-1-1-1-1"]) {
                  $_go["0-1-5-1-1-1-1"] = true;
                }

                _props = bbn.fn.createObject();
                _props["class"] = "bbn-w-50 bbn-spadded";

                if (
                  $_go["0-1-5-1-1-1-1"] &&
                  !_forgotten["0-1-5-1-1-1-1"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-5-1-1-1-1 div");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-5-1-1-1-1"] !== _t.$el &&
                    !_forgotten["0-1-5-1-1-1-1"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-5-1-1-1-1"] ||
                      bbn.fn.isComment(_eles["0-1-5-1-1-1-1"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-1"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-5-1-1-1-1"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-1-1"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-5-1-1-1-1"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                }

                if (_eles["0-1-5-1-1-1-1"]) {
                  _parents.push(_eles["0-1-5-1-1-1-1"]);

                  // Taking care of the node with no tag 0-1-5-1-1-1-1-0
                  oldEle = _t.$retrieveElement("0-1-5-1-1-1-1-0", _bbnHash);
                  _node = _t.$currentMap["0-1-5-1-1-1-1-0"];
                  _eles["0-1-5-1-1-1-1-0"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-5-1-1-1-1-0")) {
                    $_go["0-1-5-1-1-1-1-0"] = !oldEle;
                  }
                  if (!$_go["0-1-5-1-1-1-1-0"] && !_eles["0-1-5-1-1-1-1-0"]) {
                    $_go["0-1-5-1-1-1-1-0"] = true;
                  }

                  _sIr(
                    "-13cd70644bd9f6dc",
                    `
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-5-1-1-1-1-0"] ||
                    _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-5-1-1-1-1-0"] &&
                      _eles["0-1-5-1-1-1-1-0"].textContent !==
                        _gIv("-13cd70644bd9f6dc", _bbnHash)
                    ) {
                      _eles["0-1-5-1-1-1-1-0"].textContent = _gIv(
                        "-13cd70644bd9f6dc",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-5-1-1-1-1-0"] = _t.$createText(
                        {
                          id: "0-1-5-1-1-1-1-0",
                          hash: "-13cd70644bd9f6dc",
                          text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-5-1-1-1-1-0"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  _parents.pop();
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-5-1-1-1-1"] &&
                  _eles["0-1-5-1-1-1-1"] !== _t.$el
                ) {
                  $_num++;
                }

                // Taking care of the node with no tag 0-1-5-1-1-1-2
                oldEle = _t.$retrieveElement("0-1-5-1-1-1-2", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-1-2"];
                _eles["0-1-5-1-1-1-2"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-1-2")) {
                  $_go["0-1-5-1-1-1-2"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-1-2"] && !_eles["0-1-5-1-1-1-2"]) {
                  $_go["0-1-5-1-1-1-2"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-5-1-1-1-2"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-5-1-1-1-2"] &&
                    _eles["0-1-5-1-1-1-2"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-5-1-1-1-2"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-5-1-1-1-2"] = _t.$createText(
                      {
                        id: "0-1-5-1-1-1-2",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-1-2"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node div 0-1-5-1-1-1-3
                oldEle = _t.$retrieveElement("0-1-5-1-1-1-3", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-1-3"];
                _eles["0-1-5-1-1-1-3"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-1-3")) {
                  $_go["0-1-5-1-1-1-3"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-1-3"] && !_eles["0-1-5-1-1-1-3"]) {
                  $_go["0-1-5-1-1-1-3"] = true;
                }

                _props = bbn.fn.createObject();
                _props["class"] = "bbn-w-50 bbn-right bbn-spadded";

                if (
                  $_go["0-1-5-1-1-1-3"] &&
                  !_forgotten["0-1-5-1-1-1-3"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-5-1-1-1-3 div");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-5-1-1-1-3"] !== _t.$el &&
                    !_forgotten["0-1-5-1-1-1-3"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-5-1-1-1-3"] ||
                      bbn.fn.isComment(_eles["0-1-5-1-1-1-3"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-3"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-5-1-1-1-3"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-1-3"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-5-1-1-1-3"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                }

                if (_eles["0-1-5-1-1-1-3"]) {
                  _parents.push(_eles["0-1-5-1-1-1-3"]);

                  // Taking care of the node with no tag 0-1-5-1-1-1-3-0
                  oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-0", _bbnHash);
                  _node = _t.$currentMap["0-1-5-1-1-1-3-0"];
                  _eles["0-1-5-1-1-1-3-0"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-0")) {
                    $_go["0-1-5-1-1-1-3-0"] = !oldEle;
                  }
                  if (!$_go["0-1-5-1-1-1-3-0"] && !_eles["0-1-5-1-1-1-3-0"]) {
                    $_go["0-1-5-1-1-1-3-0"] = true;
                  }

                  _sIr(
                    "-13cd70644bd9f6dc",
                    `
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-5-1-1-1-3-0"] ||
                    _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-5-1-1-1-3-0"] &&
                      _eles["0-1-5-1-1-1-3-0"].textContent !==
                        _gIv("-13cd70644bd9f6dc", _bbnHash)
                    ) {
                      _eles["0-1-5-1-1-1-3-0"].textContent = _gIv(
                        "-13cd70644bd9f6dc",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-5-1-1-1-3-0"] = _t.$createText(
                        {
                          id: "0-1-5-1-1-1-3-0",
                          hash: "-13cd70644bd9f6dc",
                          text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-5-1-1-1-3-0"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node span 0-1-5-1-1-1-3-1

                  _isCondTrue = false;
                  // Checking the set of conditions (if any other) on the first condition
                  $_go["0-1-5-1-1-1-3-1"] = false;
                  _isCondTrue = _sIr(
                    "CONDITION0-1-5-1-1-1-3-1-7cab3b78-5b2e2168",
                    !pinned && !static,
                    _bbnHash
                  );
                  if (
                    _gIs(
                      "CONDITION0-1-5-1-1-1-3-1-7cab3b78-5b2e2168",
                      _bbnHash
                    ) !== "OK"
                  ) {
                    $_go["0-1-5-1-1-1-3-1"] = true;
                    let _tmp = _gIv(
                      "CONDITION0-1-5-1-1-1-3-1-7cab3b78-5b2e2168",
                      _bbnHash
                    );
                    let _e;
                    if (!_tmp) {
                      _e = _t.$retrieveElement("0-1-5-1-1-1-3-1", _bbnHash);
                      if (_e && !bbn.fn.isComment(_e)) {
                        let _cp =
                          bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                        _t.$removeDOM(_e);
                        _e = false;
                      }
                      if (!_e) {
                        _eles["0-1-5-1-1-1-3-1"] = await _t.$createElement(
                          {
                            id: "0-1-5-1-1-1-3-1",
                            hash: "CONDITION0-1-5-1-1-1-3-1-7cab3b78-5b2e2168",
                            loopHash: _bbnHash,
                            conditionId: "D6J5aS7IaBip9YY91U9N2kv6XKwt4j5f",
                            comment: true,
                          },
                          _parents.at(-1)
                        );
                      }
                    }
                  }
                  $_go["0-1-5-1-1-1-3-3"] = false;
                  if (!_isCondTrue) {
                    _isCondTrue = _sIr(
                      "CONDITION0-1-5-1-1-1-3-3--45209c6a-2954294a",
                      pinned,
                      _bbnHash
                    );
                  } else {
                    _sIr(
                      "CONDITION0-1-5-1-1-1-3-3--45209c6a-2954294a",
                      false,
                      _bbnHash
                    );
                  }
                  if (
                    _gIs(
                      "CONDITION0-1-5-1-1-1-3-3--45209c6a-2954294a",
                      _bbnHash
                    ) !== "OK"
                  ) {
                    $_go["0-1-5-1-1-1-3-3"] = true;
                    let _tmp = _gIv(
                      "CONDITION0-1-5-1-1-1-3-3--45209c6a-2954294a",
                      _bbnHash
                    );
                    let _e;
                    if (!_tmp) {
                      _e = _t.$retrieveElement("0-1-5-1-1-1-3-3", _bbnHash);
                      if (_e && !bbn.fn.isComment(_e)) {
                        let _cp =
                          bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                        _t.$removeDOM(_e);
                        _e = false;
                      }
                      if (!_e) {
                        _eles["0-1-5-1-1-1-3-3"] = await _t.$createElement(
                          {
                            id: "0-1-5-1-1-1-3-3",
                            hash: "CONDITION0-1-5-1-1-1-3-3--45209c6a-2954294a",
                            loopHash: _bbnHash,
                            conditionId: "D6J5aS7IaBip9YY91U9N2kv6XKwt4j5f",
                            comment: true,
                          },
                          _parents.at(-1)
                        );
                      }
                    }
                  }
                  if (
                    _gIv("CONDITION0-1-5-1-1-1-3-1-7cab3b78-5b2e2168", _bbnHash)
                  ) {
                    oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-1", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-1-3-1"];
                    _eles["0-1-5-1-1-1-3-1"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-1")) {
                      $_go["0-1-5-1-1-1-3-1"] = !oldEle;
                    }
                    if (!$_go["0-1-5-1-1-1-3-1"] && !_eles["0-1-5-1-1-1-3-1"]) {
                      $_go["0-1-5-1-1-1-3-1"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _props["class"] = "bbn-spadded bbn-p";

                    if (
                      $_go["0-1-5-1-1-1-3-1"] &&
                      !_forgotten["0-1-5-1-1-1-3-1"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-5-1-1-1-3-1 span");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-5-1-1-1-3-1"] !== _t.$el &&
                        !_forgotten["0-1-5-1-1-1-3-1"]?.[_bbnHash || "_root"] &&
                        (!_eles["0-1-5-1-1-1-3-1"] ||
                          bbn.fn.isComment(_eles["0-1-5-1-1-1-3-1"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-3-1"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-5-1-1-1-3-1"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-1-3-1"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-5-1-1-1-3-1"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                    }

                    if (_eles["0-1-5-1-1-1-3-1"]) {
                      _parents.push(_eles["0-1-5-1-1-1-3-1"]);

                      // Taking care of the node with no tag 0-1-5-1-1-1-3-1-0
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-1-3-1-0",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-1-3-1-0"];
                      _eles["0-1-5-1-1-1-3-1-0"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-1-0")) {
                        $_go["0-1-5-1-1-1-3-1-0"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-1-3-1-0"] &&
                        !_eles["0-1-5-1-1-1-3-1-0"]
                      ) {
                        $_go["0-1-5-1-1-1-3-1-0"] = true;
                      }

                      _sIr(
                        "-5632eae47db831dc",
                        `
                `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-1-3-1-0"] ||
                        _gIs("-5632eae47db831dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-1-3-1-0"] &&
                          _eles["0-1-5-1-1-1-3-1-0"].textContent !==
                            _gIv("-5632eae47db831dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-1-3-1-0"].textContent = _gIv(
                            "-5632eae47db831dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-1-3-1-0"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-1-3-1-0",
                              hash: "-5632eae47db831dc",
                              text: _gIv("-5632eae47db831dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-1-3-1-0"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      // Taking care of the node i 0-1-5-1-1-1-3-1-1
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-1-3-1-1",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-1-3-1-1"];
                      _eles["0-1-5-1-1-1-3-1-1"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-1-1")) {
                        $_go["0-1-5-1-1-1-3-1-1"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-1-3-1-1"] &&
                        !_eles["0-1-5-1-1-1-3-1-1"]
                      ) {
                        $_go["0-1-5-1-1-1-3-1-1"] = true;
                      }

                      _props = bbn.fn.createObject();
                      _props["class"] = "nf nf-fa-times";

                      if (
                        $_go["0-1-5-1-1-1-3-1-1"] &&
                        !_forgotten["0-1-5-1-1-1-3-1-1"]?.[_bbnHash || "_root"]
                      ) {
                        //  bbn.fn.log("IN TODO " + _t.$options.name);
                        //  bbn.fn.log("DOING 0-1-5-1-1-1-3-1-1 i");
                        _tmp = bbn.fn.clone(_node);
                        if (_bbnHash) {
                          _tmp.loopHash = _bbnHash;
                        }
                        _tmp.props = _props;
                        isAnew = false;
                        if (
                          _eles["0-1-5-1-1-1-3-1-1"] !== _t.$el &&
                          !_forgotten["0-1-5-1-1-1-3-1-1"]?.[
                            _bbnHash || "_root"
                          ] &&
                          (!_eles["0-1-5-1-1-1-3-1-1"] ||
                            bbn.fn.isComment(_eles["0-1-5-1-1-1-3-1-1"]) ||
                            !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-3-1-1"]))
                        ) {
                          isAnew = true;
                        }
                        if (isAnew) {
                          _eles["0-1-5-1-1-1-3-1-1"] = await _t.$createElement(
                            _tmp,
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-1-3-1-1"],
                              position: $_num,
                            });
                          }
                        } else {
                          _t.$updateElementFromProps(
                            _tmp,
                            _eles["0-1-5-1-1-1-3-1-1"]
                          );
                        }
                        if (_parents.at(-1) === _t.$el) {
                          $_num++;
                        }
                      }

                      if (
                        _t.$el === _parents.at(-1) &&
                        _eles["0-1-5-1-1-1-3-1-1"] &&
                        _eles["0-1-5-1-1-1-3-1-1"] !== _t.$el
                      ) {
                        $_num++;
                      }

                      // Taking care of the node with no tag 0-1-5-1-1-1-3-1-2
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-1-3-1-2",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-1-3-1-2"];
                      _eles["0-1-5-1-1-1-3-1-2"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-1-2")) {
                        $_go["0-1-5-1-1-1-3-1-2"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-1-3-1-2"] &&
                        !_eles["0-1-5-1-1-1-3-1-2"]
                      ) {
                        $_go["0-1-5-1-1-1-3-1-2"] = true;
                      }

                      _sIr(
                        "-13cd70644bd9f6dc",
                        `
              `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-1-3-1-2"] ||
                        _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-1-3-1-2"] &&
                          _eles["0-1-5-1-1-1-3-1-2"].textContent !==
                            _gIv("-13cd70644bd9f6dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-1-3-1-2"].textContent = _gIv(
                            "-13cd70644bd9f6dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-1-3-1-2"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-1-3-1-2",
                              hash: "-13cd70644bd9f6dc",
                              text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-1-3-1-2"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      _parents.pop();
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-5-1-1-1-3-1"] &&
                      _eles["0-1-5-1-1-1-3-1"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    //Ending condition
                  }

                  // Taking care of the node span 0-1-5-1-1-1-3-3
                  else if (
                    _gIv(
                      "CONDITION0-1-5-1-1-1-3-3--45209c6a-2954294a",
                      _bbnHash
                    )
                  ) {
                    oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-3", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-1-3-3"];
                    _eles["0-1-5-1-1-1-3-3"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-3")) {
                      $_go["0-1-5-1-1-1-3-3"] = !oldEle;
                    }
                    if (!$_go["0-1-5-1-1-1-3-3"] && !_eles["0-1-5-1-1-1-3-3"]) {
                      $_go["0-1-5-1-1-1-3-3"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _props["class"] = "bbn-spadded bbn-p";

                    if (
                      $_go["0-1-5-1-1-1-3-3"] &&
                      !_forgotten["0-1-5-1-1-1-3-3"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-5-1-1-1-3-3 span");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-5-1-1-1-3-3"] !== _t.$el &&
                        !_forgotten["0-1-5-1-1-1-3-3"]?.[_bbnHash || "_root"] &&
                        (!_eles["0-1-5-1-1-1-3-3"] ||
                          bbn.fn.isComment(_eles["0-1-5-1-1-1-3-3"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-3-3"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-5-1-1-1-3-3"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-1-3-3"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-5-1-1-1-3-3"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                    }

                    if (_eles["0-1-5-1-1-1-3-3"]) {
                      _parents.push(_eles["0-1-5-1-1-1-3-3"]);

                      // Taking care of the node with no tag 0-1-5-1-1-1-3-3-0
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-1-3-3-0",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-1-3-3-0"];
                      _eles["0-1-5-1-1-1-3-3-0"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-3-0")) {
                        $_go["0-1-5-1-1-1-3-3-0"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-1-3-3-0"] &&
                        !_eles["0-1-5-1-1-1-3-3-0"]
                      ) {
                        $_go["0-1-5-1-1-1-3-3-0"] = true;
                      }

                      _sIr(
                        "-5632eae47db831dc",
                        `
                `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-1-3-3-0"] ||
                        _gIs("-5632eae47db831dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-1-3-3-0"] &&
                          _eles["0-1-5-1-1-1-3-3-0"].textContent !==
                            _gIv("-5632eae47db831dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-1-3-3-0"].textContent = _gIv(
                            "-5632eae47db831dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-1-3-3-0"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-1-3-3-0",
                              hash: "-5632eae47db831dc",
                              text: _gIv("-5632eae47db831dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-1-3-3-0"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      // Taking care of the node i 0-1-5-1-1-1-3-3-1
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-1-3-3-1",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-1-3-3-1"];
                      _eles["0-1-5-1-1-1-3-3-1"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-3-1")) {
                        $_go["0-1-5-1-1-1-3-3-1"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-1-3-3-1"] &&
                        !_eles["0-1-5-1-1-1-3-3-1"]
                      ) {
                        $_go["0-1-5-1-1-1-3-3-1"] = true;
                      }

                      _props = bbn.fn.createObject();
                      _props["class"] = "nf nf-mdi-pin";

                      if (
                        $_go["0-1-5-1-1-1-3-3-1"] &&
                        !_forgotten["0-1-5-1-1-1-3-3-1"]?.[_bbnHash || "_root"]
                      ) {
                        //  bbn.fn.log("IN TODO " + _t.$options.name);
                        //  bbn.fn.log("DOING 0-1-5-1-1-1-3-3-1 i");
                        _tmp = bbn.fn.clone(_node);
                        if (_bbnHash) {
                          _tmp.loopHash = _bbnHash;
                        }
                        _tmp.props = _props;
                        isAnew = false;
                        if (
                          _eles["0-1-5-1-1-1-3-3-1"] !== _t.$el &&
                          !_forgotten["0-1-5-1-1-1-3-3-1"]?.[
                            _bbnHash || "_root"
                          ] &&
                          (!_eles["0-1-5-1-1-1-3-3-1"] ||
                            bbn.fn.isComment(_eles["0-1-5-1-1-1-3-3-1"]) ||
                            !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-3-3-1"]))
                        ) {
                          isAnew = true;
                        }
                        if (isAnew) {
                          _eles["0-1-5-1-1-1-3-3-1"] = await _t.$createElement(
                            _tmp,
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-1-3-3-1"],
                              position: $_num,
                            });
                          }
                        } else {
                          _t.$updateElementFromProps(
                            _tmp,
                            _eles["0-1-5-1-1-1-3-3-1"]
                          );
                        }
                        if (_parents.at(-1) === _t.$el) {
                          $_num++;
                        }
                      }

                      if (
                        _t.$el === _parents.at(-1) &&
                        _eles["0-1-5-1-1-1-3-3-1"] &&
                        _eles["0-1-5-1-1-1-3-3-1"] !== _t.$el
                      ) {
                        $_num++;
                      }

                      // Taking care of the node with no tag 0-1-5-1-1-1-3-3-2
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-1-3-3-2",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-1-3-3-2"];
                      _eles["0-1-5-1-1-1-3-3-2"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-3-2")) {
                        $_go["0-1-5-1-1-1-3-3-2"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-1-3-3-2"] &&
                        !_eles["0-1-5-1-1-1-3-3-2"]
                      ) {
                        $_go["0-1-5-1-1-1-3-3-2"] = true;
                      }

                      _sIr(
                        "-13cd70644bd9f6dc",
                        `
              `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-1-3-3-2"] ||
                        _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-1-3-3-2"] &&
                          _eles["0-1-5-1-1-1-3-3-2"].textContent !==
                            _gIv("-13cd70644bd9f6dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-1-3-3-2"].textContent = _gIv(
                            "-13cd70644bd9f6dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-1-3-3-2"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-1-3-3-2",
                              hash: "-13cd70644bd9f6dc",
                              text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-1-3-3-2"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      _parents.pop();
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-5-1-1-1-3-3"] &&
                      _eles["0-1-5-1-1-1-3-3"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    //Ending condition
                  }

                  // Taking care of the node span 0-1-5-1-1-1-3-5
                  oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-5", _bbnHash);
                  _node = _t.$currentMap["0-1-5-1-1-1-3-5"];
                  _eles["0-1-5-1-1-1-3-5"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-5")) {
                    $_go["0-1-5-1-1-1-3-5"] = !oldEle;
                  }
                  if (!$_go["0-1-5-1-1-1-3-5"] && !_eles["0-1-5-1-1-1-3-5"]) {
                    $_go["0-1-5-1-1-1-3-5"] = true;
                  }

                  _props = bbn.fn.createObject();
                  _props["class"] = "bbn-spadded bbn-p";

                  if (
                    $_go["0-1-5-1-1-1-3-5"] &&
                    !_forgotten["0-1-5-1-1-1-3-5"]?.[_bbnHash || "_root"]
                  ) {
                    //  bbn.fn.log("IN TODO " + _t.$options.name);
                    //  bbn.fn.log("DOING 0-1-5-1-1-1-3-5 span");
                    _tmp = bbn.fn.clone(_node);
                    if (_bbnHash) {
                      _tmp.loopHash = _bbnHash;
                    }
                    _tmp.props = _props;
                    isAnew = false;
                    if (
                      _eles["0-1-5-1-1-1-3-5"] !== _t.$el &&
                      !_forgotten["0-1-5-1-1-1-3-5"]?.[_bbnHash || "_root"] &&
                      (!_eles["0-1-5-1-1-1-3-5"] ||
                        bbn.fn.isComment(_eles["0-1-5-1-1-1-3-5"]) ||
                        !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-3-5"]))
                    ) {
                      isAnew = true;
                    }
                    if (isAnew) {
                      _eles["0-1-5-1-1-1-3-5"] = await _t.$createElement(
                        _tmp,
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-5-1-1-1-3-5"],
                          position: $_num,
                        });
                      }
                    } else {
                      _t.$updateElementFromProps(
                        _tmp,
                        _eles["0-1-5-1-1-1-3-5"]
                      );
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }
                  }

                  if (_eles["0-1-5-1-1-1-3-5"]) {
                    _parents.push(_eles["0-1-5-1-1-1-3-5"]);

                    // Taking care of the node with no tag 0-1-5-1-1-1-3-5-0
                    oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-5-0", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-1-3-5-0"];
                    _eles["0-1-5-1-1-1-3-5-0"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-5-0")) {
                      $_go["0-1-5-1-1-1-3-5-0"] = !oldEle;
                    }
                    if (
                      !$_go["0-1-5-1-1-1-3-5-0"] &&
                      !_eles["0-1-5-1-1-1-3-5-0"]
                    ) {
                      $_go["0-1-5-1-1-1-3-5-0"] = true;
                    }

                    _sIr(
                      "-5632eae47db831dc",
                      `
                `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-5-1-1-1-3-5-0"] ||
                      _gIs("-5632eae47db831dc", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-5-1-1-1-3-5-0"] &&
                        _eles["0-1-5-1-1-1-3-5-0"].textContent !==
                          _gIv("-5632eae47db831dc", _bbnHash)
                      ) {
                        _eles["0-1-5-1-1-1-3-5-0"].textContent = _gIv(
                          "-5632eae47db831dc",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-5-1-1-1-3-5-0"] = _t.$createText(
                          {
                            id: "0-1-5-1-1-1-3-5-0",
                            hash: "-5632eae47db831dc",
                            text: _gIv("-5632eae47db831dc", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-1-3-5-0"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    // Taking care of the node i 0-1-5-1-1-1-3-5-1
                    oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-5-1", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-1-3-5-1"];
                    _eles["0-1-5-1-1-1-3-5-1"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-5-1")) {
                      $_go["0-1-5-1-1-1-3-5-1"] = !oldEle;
                    }
                    if (
                      !$_go["0-1-5-1-1-1-3-5-1"] &&
                      !_eles["0-1-5-1-1-1-3-5-1"]
                    ) {
                      $_go["0-1-5-1-1-1-3-5-1"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _props["class"] = "nf nf-oct-pin";

                    if (
                      $_go["0-1-5-1-1-1-3-5-1"] &&
                      !_forgotten["0-1-5-1-1-1-3-5-1"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-5-1-1-1-3-5-1 i");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-5-1-1-1-3-5-1"] !== _t.$el &&
                        !_forgotten["0-1-5-1-1-1-3-5-1"]?.[
                          _bbnHash || "_root"
                        ] &&
                        (!_eles["0-1-5-1-1-1-3-5-1"] ||
                          bbn.fn.isComment(_eles["0-1-5-1-1-1-3-5-1"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-1-3-5-1"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-5-1-1-1-3-5-1"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-1-3-5-1"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-5-1-1-1-3-5-1"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-5-1-1-1-3-5-1"] &&
                      _eles["0-1-5-1-1-1-3-5-1"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    // Taking care of the node with no tag 0-1-5-1-1-1-3-5-2
                    oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-5-2", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-1-3-5-2"];
                    _eles["0-1-5-1-1-1-3-5-2"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-5-2")) {
                      $_go["0-1-5-1-1-1-3-5-2"] = !oldEle;
                    }
                    if (
                      !$_go["0-1-5-1-1-1-3-5-2"] &&
                      !_eles["0-1-5-1-1-1-3-5-2"]
                    ) {
                      $_go["0-1-5-1-1-1-3-5-2"] = true;
                    }

                    _sIr(
                      "-13cd70644bd9f6dc",
                      `
              `,
                      _bbnHash
                    );
                    if (
                      $_go["0-1-5-1-1-1-3-5-2"] ||
                      _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                    ) {
                      if (
                        _eles["0-1-5-1-1-1-3-5-2"] &&
                        _eles["0-1-5-1-1-1-3-5-2"].textContent !==
                          _gIv("-13cd70644bd9f6dc", _bbnHash)
                      ) {
                        _eles["0-1-5-1-1-1-3-5-2"].textContent = _gIv(
                          "-13cd70644bd9f6dc",
                          _bbnHash
                        );
                      } else {
                        _eles["0-1-5-1-1-1-3-5-2"] = _t.$createText(
                          {
                            id: "0-1-5-1-1-1-3-5-2",
                            hash: "-13cd70644bd9f6dc",
                            text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                            loopHash: _bbnHash,
                          },
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-1-3-5-2"],
                            position: $_num,
                          });
                        }
                      }
                    }
                    if (_parents.at(-1) === _t.$el) {
                      $_num++;
                    }

                    _parents.pop();
                  }

                  if (
                    _t.$el === _parents.at(-1) &&
                    _eles["0-1-5-1-1-1-3-5"] &&
                    _eles["0-1-5-1-1-1-3-5"] !== _t.$el
                  ) {
                    $_num++;
                  }

                  // Taking care of the node with no tag 0-1-5-1-1-1-3-6
                  oldEle = _t.$retrieveElement("0-1-5-1-1-1-3-6", _bbnHash);
                  _node = _t.$currentMap["0-1-5-1-1-1-3-6"];
                  _eles["0-1-5-1-1-1-3-6"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-5-1-1-1-3-6")) {
                    $_go["0-1-5-1-1-1-3-6"] = !oldEle;
                  }
                  if (!$_go["0-1-5-1-1-1-3-6"] && !_eles["0-1-5-1-1-1-3-6"]) {
                    $_go["0-1-5-1-1-1-3-6"] = true;
                  }

                  _sIr(
                    "-394b55e4-2631c424",
                    `
            `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-5-1-1-1-3-6"] ||
                    _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-5-1-1-1-3-6"] &&
                      _eles["0-1-5-1-1-1-3-6"].textContent !==
                        _gIv("-394b55e4-2631c424", _bbnHash)
                    ) {
                      _eles["0-1-5-1-1-1-3-6"].textContent = _gIv(
                        "-394b55e4-2631c424",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-5-1-1-1-3-6"] = _t.$createText(
                        {
                          id: "0-1-5-1-1-1-3-6",
                          hash: "-394b55e4-2631c424",
                          text: _gIv("-394b55e4-2631c424", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-5-1-1-1-3-6"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  _parents.pop();
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-5-1-1-1-3"] &&
                  _eles["0-1-5-1-1-1-3"] !== _t.$el
                ) {
                  $_num++;
                }

                // Taking care of the node with no tag 0-1-5-1-1-1-4
                oldEle = _t.$retrieveElement("0-1-5-1-1-1-4", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-1-4"];
                _eles["0-1-5-1-1-1-4"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-1-4")) {
                  $_go["0-1-5-1-1-1-4"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-1-4"] && !_eles["0-1-5-1-1-1-4"]) {
                  $_go["0-1-5-1-1-1-4"] = true;
                }

                _sIr(
                  "-28049b64-772aff24",
                  `
          `,
                  _bbnHash
                );
                if (
                  $_go["0-1-5-1-1-1-4"] ||
                  _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-5-1-1-1-4"] &&
                    _eles["0-1-5-1-1-1-4"].textContent !==
                      _gIv("-28049b64-772aff24", _bbnHash)
                  ) {
                    _eles["0-1-5-1-1-1-4"].textContent = _gIv(
                      "-28049b64-772aff24",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-5-1-1-1-4"] = _t.$createText(
                      {
                        id: "0-1-5-1-1-1-4",
                        hash: "-28049b64-772aff24",
                        text: _gIv("-28049b64-772aff24", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-1-4"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                _parents.pop();
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-5-1-1-1"] &&
                _eles["0-1-5-1-1-1"] !== _t.$el
              ) {
                $_num++;
              }

              // Taking care of the node with no tag 0-1-5-1-1-2
              oldEle = _t.$retrieveElement("0-1-5-1-1-2", _bbnHash);
              _node = _t.$currentMap["0-1-5-1-1-2"];
              _eles["0-1-5-1-1-2"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-5-1-1-2")) {
                $_go["0-1-5-1-1-2"] = !oldEle;
              }
              if (!$_go["0-1-5-1-1-2"] && !_eles["0-1-5-1-1-2"]) {
                $_go["0-1-5-1-1-2"] = true;
              }

              _sIr(
                "-28049b64-772aff24",
                `
          `,
                _bbnHash
              );
              if (
                $_go["0-1-5-1-1-2"] ||
                _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
              ) {
                if (
                  _eles["0-1-5-1-1-2"] &&
                  _eles["0-1-5-1-1-2"].textContent !==
                    _gIv("-28049b64-772aff24", _bbnHash)
                ) {
                  _eles["0-1-5-1-1-2"].textContent = _gIv(
                    "-28049b64-772aff24",
                    _bbnHash
                  );
                } else {
                  _eles["0-1-5-1-1-2"] = _t.$createText(
                    {
                      id: "0-1-5-1-1-2",
                      hash: "-28049b64-772aff24",
                      text: _gIv("-28049b64-772aff24", _bbnHash),
                      loopHash: _bbnHash,
                    },
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-5-1-1-2"],
                      position: $_num,
                    });
                  }
                }
              }
              if (_parents.at(-1) === _t.$el) {
                $_num++;
              }

              // Taking care of the node div 0-1-5-1-1-3
              oldEle = _t.$retrieveElement("0-1-5-1-1-3", _bbnHash);
              _node = _t.$currentMap["0-1-5-1-1-3"];
              _eles["0-1-5-1-1-3"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-5-1-1-3")) {
                $_go["0-1-5-1-1-3"] = !oldEle;
              }
              if (!$_go["0-1-5-1-1-3"] && !_eles["0-1-5-1-1-3"]) {
                $_go["0-1-5-1-1-3"] = true;
              }

              _props = bbn.fn.createObject();
              _props["class"] = "bbn-bottom-left bbn-w-100 bbn-white";

              if (
                $_go["0-1-5-1-1-3"] &&
                !_forgotten["0-1-5-1-1-3"]?.[_bbnHash || "_root"]
              ) {
                //  bbn.fn.log("IN TODO " + _t.$options.name);
                //  bbn.fn.log("DOING 0-1-5-1-1-3 div");
                _tmp = bbn.fn.clone(_node);
                if (_bbnHash) {
                  _tmp.loopHash = _bbnHash;
                }
                _tmp.props = _props;
                isAnew = false;
                if (
                  _eles["0-1-5-1-1-3"] !== _t.$el &&
                  !_forgotten["0-1-5-1-1-3"]?.[_bbnHash || "_root"] &&
                  (!_eles["0-1-5-1-1-3"] ||
                    bbn.fn.isComment(_eles["0-1-5-1-1-3"]) ||
                    !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3"]))
                ) {
                  isAnew = true;
                }
                if (isAnew) {
                  _eles["0-1-5-1-1-3"] = await _t.$createElement(
                    _tmp,
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-5-1-1-3"],
                      position: $_num,
                    });
                  }
                } else {
                  _t.$updateElementFromProps(_tmp, _eles["0-1-5-1-1-3"]);
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }
              }

              if (_eles["0-1-5-1-1-3"]) {
                _parents.push(_eles["0-1-5-1-1-3"]);

                // Taking care of the node with no tag 0-1-5-1-1-3-0
                oldEle = _t.$retrieveElement("0-1-5-1-1-3-0", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-3-0"];
                _eles["0-1-5-1-1-3-0"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-3-0")) {
                  $_go["0-1-5-1-1-3-0"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-3-0"] && !_eles["0-1-5-1-1-3-0"]) {
                  $_go["0-1-5-1-1-3-0"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-5-1-1-3-0"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-5-1-1-3-0"] &&
                    _eles["0-1-5-1-1-3-0"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-5-1-1-3-0"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-5-1-1-3-0"] = _t.$createText(
                      {
                        id: "0-1-5-1-1-3-0",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-3-0"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node div 0-1-5-1-1-3-1
                oldEle = _t.$retrieveElement("0-1-5-1-1-3-1", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-3-1"];
                _eles["0-1-5-1-1-3-1"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-3-1")) {
                  $_go["0-1-5-1-1-3-1"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-3-1"] && !_eles["0-1-5-1-1-3-1"]) {
                  $_go["0-1-5-1-1-3-1"] = true;
                }

                _props = bbn.fn.createObject();
                _props["class"] = "bbn-w-50 bbn-spadded";

                if (
                  $_go["0-1-5-1-1-3-1"] &&
                  !_forgotten["0-1-5-1-1-3-1"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-5-1-1-3-1 div");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-5-1-1-3-1"] !== _t.$el &&
                    !_forgotten["0-1-5-1-1-3-1"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-5-1-1-3-1"] ||
                      bbn.fn.isComment(_eles["0-1-5-1-1-3-1"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-1"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-5-1-1-3-1"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-3-1"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-5-1-1-3-1"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                }

                if (_eles["0-1-5-1-1-3-1"]) {
                  _parents.push(_eles["0-1-5-1-1-3-1"]);

                  // Taking care of the node with no tag 0-1-5-1-1-3-1-0
                  oldEle = _t.$retrieveElement("0-1-5-1-1-3-1-0", _bbnHash);
                  _node = _t.$currentMap["0-1-5-1-1-3-1-0"];
                  _eles["0-1-5-1-1-3-1-0"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-5-1-1-3-1-0")) {
                    $_go["0-1-5-1-1-3-1-0"] = !oldEle;
                  }
                  if (!$_go["0-1-5-1-1-3-1-0"] && !_eles["0-1-5-1-1-3-1-0"]) {
                    $_go["0-1-5-1-1-3-1-0"] = true;
                  }

                  _sIr(
                    "6b31e976-1c25a44a",
                    `
               
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-5-1-1-3-1-0"] ||
                    _gIs("6b31e976-1c25a44a", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-5-1-1-3-1-0"] &&
                      _eles["0-1-5-1-1-3-1-0"].textContent !==
                        _gIv("6b31e976-1c25a44a", _bbnHash)
                    ) {
                      _eles["0-1-5-1-1-3-1-0"].textContent = _gIv(
                        "6b31e976-1c25a44a",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-5-1-1-3-1-0"] = _t.$createText(
                        {
                          id: "0-1-5-1-1-3-1-0",
                          hash: "6b31e976-1c25a44a",
                          text: _gIv("6b31e976-1c25a44a", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-5-1-1-3-1-0"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  _parents.pop();
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-5-1-1-3-1"] &&
                  _eles["0-1-5-1-1-3-1"] !== _t.$el
                ) {
                  $_num++;
                }

                // Taking care of the node with no tag 0-1-5-1-1-3-2
                oldEle = _t.$retrieveElement("0-1-5-1-1-3-2", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-3-2"];
                _eles["0-1-5-1-1-3-2"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-3-2")) {
                  $_go["0-1-5-1-1-3-2"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-3-2"] && !_eles["0-1-5-1-1-3-2"]) {
                  $_go["0-1-5-1-1-3-2"] = true;
                }

                _sIr(
                  "-394b55e4-2631c424",
                  `
            `,
                  _bbnHash
                );
                if (
                  $_go["0-1-5-1-1-3-2"] ||
                  _gIs("-394b55e4-2631c424", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-5-1-1-3-2"] &&
                    _eles["0-1-5-1-1-3-2"].textContent !==
                      _gIv("-394b55e4-2631c424", _bbnHash)
                  ) {
                    _eles["0-1-5-1-1-3-2"].textContent = _gIv(
                      "-394b55e4-2631c424",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-5-1-1-3-2"] = _t.$createText(
                      {
                        id: "0-1-5-1-1-3-2",
                        hash: "-394b55e4-2631c424",
                        text: _gIv("-394b55e4-2631c424", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-3-2"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                // Taking care of the node div 0-1-5-1-1-3-3
                oldEle = _t.$retrieveElement("0-1-5-1-1-3-3", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-3-3"];
                _eles["0-1-5-1-1-3-3"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-3-3")) {
                  $_go["0-1-5-1-1-3-3"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-3-3"] && !_eles["0-1-5-1-1-3-3"]) {
                  $_go["0-1-5-1-1-3-3"] = true;
                }

                _props = bbn.fn.createObject();
                _props["class"] = "bbn-w-50 bbn-right bbn-spadded";

                if (
                  $_go["0-1-5-1-1-3-3"] &&
                  !_forgotten["0-1-5-1-1-3-3"]?.[_bbnHash || "_root"]
                ) {
                  //  bbn.fn.log("IN TODO " + _t.$options.name);
                  //  bbn.fn.log("DOING 0-1-5-1-1-3-3 div");
                  _tmp = bbn.fn.clone(_node);
                  if (_bbnHash) {
                    _tmp.loopHash = _bbnHash;
                  }
                  _tmp.props = _props;
                  isAnew = false;
                  if (
                    _eles["0-1-5-1-1-3-3"] !== _t.$el &&
                    !_forgotten["0-1-5-1-1-3-3"]?.[_bbnHash || "_root"] &&
                    (!_eles["0-1-5-1-1-3-3"] ||
                      bbn.fn.isComment(_eles["0-1-5-1-1-3-3"]) ||
                      !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-3"]))
                  ) {
                    isAnew = true;
                  }
                  if (isAnew) {
                    _eles["0-1-5-1-1-3-3"] = await _t.$createElement(
                      _tmp,
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-3-3"],
                        position: $_num,
                      });
                    }
                  } else {
                    _t.$updateElementFromProps(_tmp, _eles["0-1-5-1-1-3-3"]);
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }
                }

                if (_eles["0-1-5-1-1-3-3"]) {
                  _parents.push(_eles["0-1-5-1-1-3-3"]);

                  // Taking care of the node with no tag 0-1-5-1-1-3-3-0
                  oldEle = _t.$retrieveElement("0-1-5-1-1-3-3-0", _bbnHash);
                  _node = _t.$currentMap["0-1-5-1-1-3-3-0"];
                  _eles["0-1-5-1-1-3-3-0"] = oldEle;
                  if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-0")) {
                    $_go["0-1-5-1-1-3-3-0"] = !oldEle;
                  }
                  if (!$_go["0-1-5-1-1-3-3-0"] && !_eles["0-1-5-1-1-3-3-0"]) {
                    $_go["0-1-5-1-1-3-3-0"] = true;
                  }

                  _sIr(
                    "-13cd70644bd9f6dc",
                    `
              `,
                    _bbnHash
                  );
                  if (
                    $_go["0-1-5-1-1-3-3-0"] ||
                    _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                  ) {
                    if (
                      _eles["0-1-5-1-1-3-3-0"] &&
                      _eles["0-1-5-1-1-3-3-0"].textContent !==
                        _gIv("-13cd70644bd9f6dc", _bbnHash)
                    ) {
                      _eles["0-1-5-1-1-3-3-0"].textContent = _gIv(
                        "-13cd70644bd9f6dc",
                        _bbnHash
                      );
                    } else {
                      _eles["0-1-5-1-1-3-3-0"] = _t.$createText(
                        {
                          id: "0-1-5-1-1-3-3-0",
                          hash: "-13cd70644bd9f6dc",
                          text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                          loopHash: _bbnHash,
                        },
                        _parents.at(-1)
                      );
                      if (_parents.at(-1) === _t.$el) {
                        $_final.push({
                          ele: _eles["0-1-5-1-1-3-3-0"],
                          position: $_num,
                        });
                      }
                    }
                  }
                  if (_parents.at(-1) === _t.$el) {
                    $_num++;
                  }

                  // Taking care of the node span 0-1-5-1-1-3-3-1

                  _isCondTrue = false;
                  // Checking the set of conditions (if any other) on the first condition
                  $_go["0-1-5-1-1-3-3-1"] = false;
                  _isCondTrue = _sIr(
                    "CONDITION0-1-5-1-1-3-3-1-7cab3b78-5b2e2168",
                    !pinned && !static,
                    _bbnHash
                  );
                  if (
                    _gIs(
                      "CONDITION0-1-5-1-1-3-3-1-7cab3b78-5b2e2168",
                      _bbnHash
                    ) !== "OK"
                  ) {
                    $_go["0-1-5-1-1-3-3-1"] = true;
                    let _tmp = _gIv(
                      "CONDITION0-1-5-1-1-3-3-1-7cab3b78-5b2e2168",
                      _bbnHash
                    );
                    let _e;
                    if (!_tmp) {
                      _e = _t.$retrieveElement("0-1-5-1-1-3-3-1", _bbnHash);
                      if (_e && !bbn.fn.isComment(_e)) {
                        let _cp =
                          bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                        _t.$removeDOM(_e);
                        _e = false;
                      }
                      if (!_e) {
                        _eles["0-1-5-1-1-3-3-1"] = await _t.$createElement(
                          {
                            id: "0-1-5-1-1-3-3-1",
                            hash: "CONDITION0-1-5-1-1-3-3-1-7cab3b78-5b2e2168",
                            loopHash: _bbnHash,
                            conditionId: "II2Jotb0LB1IQ0rgDZX819zePT733WbG",
                            comment: true,
                          },
                          _parents.at(-1)
                        );
                      }
                    }
                  }
                  if (
                    _gIv("CONDITION0-1-5-1-1-3-3-1-7cab3b78-5b2e2168", _bbnHash)
                  ) {
                    oldEle = _t.$retrieveElement("0-1-5-1-1-3-3-1", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-3-3-1"];
                    _eles["0-1-5-1-1-3-3-1"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-1")) {
                      $_go["0-1-5-1-1-3-3-1"] = !oldEle;
                    }
                    if (!$_go["0-1-5-1-1-3-3-1"] && !_eles["0-1-5-1-1-3-3-1"]) {
                      $_go["0-1-5-1-1-3-3-1"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _props["class"] = "bbn-spadded bbn-p";

                    if (
                      $_go["0-1-5-1-1-3-3-1"] &&
                      !_forgotten["0-1-5-1-1-3-3-1"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-5-1-1-3-3-1 span");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-5-1-1-3-3-1"] !== _t.$el &&
                        !_forgotten["0-1-5-1-1-3-3-1"]?.[_bbnHash || "_root"] &&
                        (!_eles["0-1-5-1-1-3-3-1"] ||
                          bbn.fn.isComment(_eles["0-1-5-1-1-3-3-1"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-3-1"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-5-1-1-3-3-1"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-3-3-1"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-5-1-1-3-3-1"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                      if (isAnew) {
                        let _bbnCurrentElement = _eles["0-1-5-1-1-3-3-1"];
                        _eles["0-1-5-1-1-3-3-1"].addEventListener(
                          "click",
                          (_bbnEventObject) => {
                            let $event = _bbnEventObject;
                            $event.stopImmediatePropagation();
                            let $_action = pin;
                            if (bbn.fn.isFunction($_action)) {
                              const args = _bbnEventObject.detail?.args || [
                                $event,
                              ];
                              args.push(_bbnEventObject);
                              $_action.bind(_t.$origin)(...args);
                            }
                            bbn.fn.iterate(
                              _bbnCurrentData,
                              (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                                //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                                if (
                                  _bbnCurrentDataValue !==
                                  eval(_bbnCurrentDataIndex)
                                ) {
                                  if (_t[_bbnCurrentDataIndex] !== undefined) {
                                    _t[_bbnCurrentDataIndex] =
                                      eval(_bbnCurrentDataIndex);
                                  }
                                  _bbnCurrentData[_bbnCurrentDataIndex] =
                                    _t[_bbnCurrentDataIndex];
                                }
                              }
                            );
                            _t.$tick();
                          }
                        );
                      }
                    }

                    if (_eles["0-1-5-1-1-3-3-1"]) {
                      _parents.push(_eles["0-1-5-1-1-3-3-1"]);

                      // Taking care of the node with no tag 0-1-5-1-1-3-3-1-0
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-1-0",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-1-0"];
                      _eles["0-1-5-1-1-3-3-1-0"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-1-0")) {
                        $_go["0-1-5-1-1-3-3-1-0"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-1-0"] &&
                        !_eles["0-1-5-1-1-3-3-1-0"]
                      ) {
                        $_go["0-1-5-1-1-3-3-1-0"] = true;
                      }

                      _sIr(
                        "-5632eae47db831dc",
                        `
                `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-3-3-1-0"] ||
                        _gIs("-5632eae47db831dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-3-3-1-0"] &&
                          _eles["0-1-5-1-1-3-3-1-0"].textContent !==
                            _gIv("-5632eae47db831dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-3-3-1-0"].textContent = _gIv(
                            "-5632eae47db831dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-3-3-1-0"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-3-3-1-0",
                              hash: "-5632eae47db831dc",
                              text: _gIv("-5632eae47db831dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-1-0"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      // Taking care of the node i 0-1-5-1-1-3-3-1-1
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-1-1",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-1-1"];
                      _eles["0-1-5-1-1-3-3-1-1"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-1-1")) {
                        $_go["0-1-5-1-1-3-3-1-1"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-1-1"] &&
                        !_eles["0-1-5-1-1-3-3-1-1"]
                      ) {
                        $_go["0-1-5-1-1-3-3-1-1"] = true;
                      }

                      _props = bbn.fn.createObject();
                      _props["class"] = "nf nf-oct-pin";

                      if (
                        $_go["0-1-5-1-1-3-3-1-1"] &&
                        !_forgotten["0-1-5-1-1-3-3-1-1"]?.[_bbnHash || "_root"]
                      ) {
                        //  bbn.fn.log("IN TODO " + _t.$options.name);
                        //  bbn.fn.log("DOING 0-1-5-1-1-3-3-1-1 i");
                        _tmp = bbn.fn.clone(_node);
                        if (_bbnHash) {
                          _tmp.loopHash = _bbnHash;
                        }
                        _tmp.props = _props;
                        isAnew = false;
                        if (
                          _eles["0-1-5-1-1-3-3-1-1"] !== _t.$el &&
                          !_forgotten["0-1-5-1-1-3-3-1-1"]?.[
                            _bbnHash || "_root"
                          ] &&
                          (!_eles["0-1-5-1-1-3-3-1-1"] ||
                            bbn.fn.isComment(_eles["0-1-5-1-1-3-3-1-1"]) ||
                            !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-3-1-1"]))
                        ) {
                          isAnew = true;
                        }
                        if (isAnew) {
                          _eles["0-1-5-1-1-3-3-1-1"] = await _t.$createElement(
                            _tmp,
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-1-1"],
                              position: $_num,
                            });
                          }
                        } else {
                          _t.$updateElementFromProps(
                            _tmp,
                            _eles["0-1-5-1-1-3-3-1-1"]
                          );
                        }
                        if (_parents.at(-1) === _t.$el) {
                          $_num++;
                        }
                      }

                      if (
                        _t.$el === _parents.at(-1) &&
                        _eles["0-1-5-1-1-3-3-1-1"] &&
                        _eles["0-1-5-1-1-3-3-1-1"] !== _t.$el
                      ) {
                        $_num++;
                      }

                      // Taking care of the node with no tag 0-1-5-1-1-3-3-1-2
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-1-2",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-1-2"];
                      _eles["0-1-5-1-1-3-3-1-2"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-1-2")) {
                        $_go["0-1-5-1-1-3-3-1-2"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-1-2"] &&
                        !_eles["0-1-5-1-1-3-3-1-2"]
                      ) {
                        $_go["0-1-5-1-1-3-3-1-2"] = true;
                      }

                      _sIr(
                        "-13cd70644bd9f6dc",
                        `
              `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-3-3-1-2"] ||
                        _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-3-3-1-2"] &&
                          _eles["0-1-5-1-1-3-3-1-2"].textContent !==
                            _gIv("-13cd70644bd9f6dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-3-3-1-2"].textContent = _gIv(
                            "-13cd70644bd9f6dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-3-3-1-2"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-3-3-1-2",
                              hash: "-13cd70644bd9f6dc",
                              text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-1-2"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      _parents.pop();
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-5-1-1-3-3-1"] &&
                      _eles["0-1-5-1-1-3-3-1"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    //Ending condition
                  }

                  // Taking care of the node span 0-1-5-1-1-3-3-3

                  _isCondTrue = false;
                  // Checking the set of conditions (if any other) on the first condition
                  $_go["0-1-5-1-1-3-3-3"] = false;
                  _isCondTrue = _sIr(
                    "CONDITION0-1-5-1-1-3-3-3-7cab3b78-5b2e2168",
                    !pinned && !static,
                    _bbnHash
                  );
                  if (
                    _gIs(
                      "CONDITION0-1-5-1-1-3-3-3-7cab3b78-5b2e2168",
                      _bbnHash
                    ) !== "OK"
                  ) {
                    $_go["0-1-5-1-1-3-3-3"] = true;
                    let _tmp = _gIv(
                      "CONDITION0-1-5-1-1-3-3-3-7cab3b78-5b2e2168",
                      _bbnHash
                    );
                    let _e;
                    if (!_tmp) {
                      _e = _t.$retrieveElement("0-1-5-1-1-3-3-3", _bbnHash);
                      if (_e && !bbn.fn.isComment(_e)) {
                        let _cp =
                          bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                        _t.$removeDOM(_e);
                        _e = false;
                      }
                      if (!_e) {
                        _eles["0-1-5-1-1-3-3-3"] = await _t.$createElement(
                          {
                            id: "0-1-5-1-1-3-3-3",
                            hash: "CONDITION0-1-5-1-1-3-3-3-7cab3b78-5b2e2168",
                            loopHash: _bbnHash,
                            conditionId: "AGEwW0WKPOhw5X74MK82xUN9jUlQ7q2I",
                            comment: true,
                          },
                          _parents.at(-1)
                        );
                      }
                    }
                  }
                  $_go["0-1-5-1-1-3-3-5"] = false;
                  if (!_isCondTrue) {
                    _isCondTrue = _sIr(
                      "CONDITION0-1-5-1-1-3-3-5-11c2537f30d6175f",
                      pinned && !static,
                      _bbnHash
                    );
                  } else {
                    _sIr(
                      "CONDITION0-1-5-1-1-3-3-5-11c2537f30d6175f",
                      false,
                      _bbnHash
                    );
                  }
                  if (
                    _gIs(
                      "CONDITION0-1-5-1-1-3-3-5-11c2537f30d6175f",
                      _bbnHash
                    ) !== "OK"
                  ) {
                    $_go["0-1-5-1-1-3-3-5"] = true;
                    let _tmp = _gIv(
                      "CONDITION0-1-5-1-1-3-3-5-11c2537f30d6175f",
                      _bbnHash
                    );
                    let _e;
                    if (!_tmp) {
                      _e = _t.$retrieveElement("0-1-5-1-1-3-3-5", _bbnHash);
                      if (_e && !bbn.fn.isComment(_e)) {
                        let _cp =
                          bbn.cp.getComponent(_e.bbnComponentId)?.bbn || _t;
                        _t.$removeDOM(_e);
                        _e = false;
                      }
                      if (!_e) {
                        _eles["0-1-5-1-1-3-3-5"] = await _t.$createElement(
                          {
                            id: "0-1-5-1-1-3-3-5",
                            hash: "CONDITION0-1-5-1-1-3-3-5-11c2537f30d6175f",
                            loopHash: _bbnHash,
                            conditionId: "AGEwW0WKPOhw5X74MK82xUN9jUlQ7q2I",
                            comment: true,
                          },
                          _parents.at(-1)
                        );
                      }
                    }
                  }
                  if (
                    _gIv("CONDITION0-1-5-1-1-3-3-3-7cab3b78-5b2e2168", _bbnHash)
                  ) {
                    oldEle = _t.$retrieveElement("0-1-5-1-1-3-3-3", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-3-3-3"];
                    _eles["0-1-5-1-1-3-3-3"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-3")) {
                      $_go["0-1-5-1-1-3-3-3"] = !oldEle;
                    }
                    if (!$_go["0-1-5-1-1-3-3-3"] && !_eles["0-1-5-1-1-3-3-3"]) {
                      $_go["0-1-5-1-1-3-3-3"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _props["class"] = "bbn-spadded bbn-p";

                    if (
                      $_go["0-1-5-1-1-3-3-3"] &&
                      !_forgotten["0-1-5-1-1-3-3-3"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-5-1-1-3-3-3 span");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-5-1-1-3-3-3"] !== _t.$el &&
                        !_forgotten["0-1-5-1-1-3-3-3"]?.[_bbnHash || "_root"] &&
                        (!_eles["0-1-5-1-1-3-3-3"] ||
                          bbn.fn.isComment(_eles["0-1-5-1-1-3-3-3"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-3-3"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-5-1-1-3-3-3"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-3-3-3"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-5-1-1-3-3-3"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                      if (isAnew) {
                        let _bbnCurrentElement = _eles["0-1-5-1-1-3-3-3"];
                        _eles["0-1-5-1-1-3-3-3"].addEventListener(
                          "click",
                          (_bbnEventObject) => {
                            let $event = _bbnEventObject;
                            $event.stopImmediatePropagation();
                            let $_action = close;
                            if (bbn.fn.isFunction($_action)) {
                              const args = _bbnEventObject.detail?.args || [
                                $event,
                              ];
                              args.push(_bbnEventObject);
                              $_action.bind(_t.$origin)(...args);
                            }
                            bbn.fn.iterate(
                              _bbnCurrentData,
                              (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                                //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                                if (
                                  _bbnCurrentDataValue !==
                                  eval(_bbnCurrentDataIndex)
                                ) {
                                  if (_t[_bbnCurrentDataIndex] !== undefined) {
                                    _t[_bbnCurrentDataIndex] =
                                      eval(_bbnCurrentDataIndex);
                                  }
                                  _bbnCurrentData[_bbnCurrentDataIndex] =
                                    _t[_bbnCurrentDataIndex];
                                }
                              }
                            );
                            _t.$tick();
                          }
                        );
                      }
                    }

                    if (_eles["0-1-5-1-1-3-3-3"]) {
                      _parents.push(_eles["0-1-5-1-1-3-3-3"]);

                      // Taking care of the node with no tag 0-1-5-1-1-3-3-3-0
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-3-0",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-3-0"];
                      _eles["0-1-5-1-1-3-3-3-0"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-3-0")) {
                        $_go["0-1-5-1-1-3-3-3-0"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-3-0"] &&
                        !_eles["0-1-5-1-1-3-3-3-0"]
                      ) {
                        $_go["0-1-5-1-1-3-3-3-0"] = true;
                      }

                      _sIr(
                        "-5632eae47db831dc",
                        `
                `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-3-3-3-0"] ||
                        _gIs("-5632eae47db831dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-3-3-3-0"] &&
                          _eles["0-1-5-1-1-3-3-3-0"].textContent !==
                            _gIv("-5632eae47db831dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-3-3-3-0"].textContent = _gIv(
                            "-5632eae47db831dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-3-3-3-0"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-3-3-3-0",
                              hash: "-5632eae47db831dc",
                              text: _gIv("-5632eae47db831dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-3-0"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      // Taking care of the node i 0-1-5-1-1-3-3-3-1
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-3-1",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-3-1"];
                      _eles["0-1-5-1-1-3-3-3-1"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-3-1")) {
                        $_go["0-1-5-1-1-3-3-3-1"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-3-1"] &&
                        !_eles["0-1-5-1-1-3-3-3-1"]
                      ) {
                        $_go["0-1-5-1-1-3-3-3-1"] = true;
                      }

                      _props = bbn.fn.createObject();
                      _props["class"] = "nf nf-fa-times";

                      if (
                        $_go["0-1-5-1-1-3-3-3-1"] &&
                        !_forgotten["0-1-5-1-1-3-3-3-1"]?.[_bbnHash || "_root"]
                      ) {
                        //  bbn.fn.log("IN TODO " + _t.$options.name);
                        //  bbn.fn.log("DOING 0-1-5-1-1-3-3-3-1 i");
                        _tmp = bbn.fn.clone(_node);
                        if (_bbnHash) {
                          _tmp.loopHash = _bbnHash;
                        }
                        _tmp.props = _props;
                        isAnew = false;
                        if (
                          _eles["0-1-5-1-1-3-3-3-1"] !== _t.$el &&
                          !_forgotten["0-1-5-1-1-3-3-3-1"]?.[
                            _bbnHash || "_root"
                          ] &&
                          (!_eles["0-1-5-1-1-3-3-3-1"] ||
                            bbn.fn.isComment(_eles["0-1-5-1-1-3-3-3-1"]) ||
                            !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-3-3-1"]))
                        ) {
                          isAnew = true;
                        }
                        if (isAnew) {
                          _eles["0-1-5-1-1-3-3-3-1"] = await _t.$createElement(
                            _tmp,
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-3-1"],
                              position: $_num,
                            });
                          }
                        } else {
                          _t.$updateElementFromProps(
                            _tmp,
                            _eles["0-1-5-1-1-3-3-3-1"]
                          );
                        }
                        if (_parents.at(-1) === _t.$el) {
                          $_num++;
                        }
                      }

                      if (
                        _t.$el === _parents.at(-1) &&
                        _eles["0-1-5-1-1-3-3-3-1"] &&
                        _eles["0-1-5-1-1-3-3-3-1"] !== _t.$el
                      ) {
                        $_num++;
                      }

                      // Taking care of the node with no tag 0-1-5-1-1-3-3-3-2
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-3-2",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-3-2"];
                      _eles["0-1-5-1-1-3-3-3-2"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-3-2")) {
                        $_go["0-1-5-1-1-3-3-3-2"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-3-2"] &&
                        !_eles["0-1-5-1-1-3-3-3-2"]
                      ) {
                        $_go["0-1-5-1-1-3-3-3-2"] = true;
                      }

                      _sIr(
                        "-13cd70644bd9f6dc",
                        `
              `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-3-3-3-2"] ||
                        _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-3-3-3-2"] &&
                          _eles["0-1-5-1-1-3-3-3-2"].textContent !==
                            _gIv("-13cd70644bd9f6dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-3-3-3-2"].textContent = _gIv(
                            "-13cd70644bd9f6dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-3-3-3-2"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-3-3-3-2",
                              hash: "-13cd70644bd9f6dc",
                              text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-3-2"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      _parents.pop();
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-5-1-1-3-3-3"] &&
                      _eles["0-1-5-1-1-3-3-3"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    //Ending condition
                  }

                  // Taking care of the node span 0-1-5-1-1-3-3-5
                  else if (
                    _gIv("CONDITION0-1-5-1-1-3-3-5-11c2537f30d6175f", _bbnHash)
                  ) {
                    oldEle = _t.$retrieveElement("0-1-5-1-1-3-3-5", _bbnHash);
                    _node = _t.$currentMap["0-1-5-1-1-3-3-5"];
                    _eles["0-1-5-1-1-3-3-5"] = oldEle;
                    if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-5")) {
                      $_go["0-1-5-1-1-3-3-5"] = !oldEle;
                    }
                    if (!$_go["0-1-5-1-1-3-3-5"] && !_eles["0-1-5-1-1-3-3-5"]) {
                      $_go["0-1-5-1-1-3-3-5"] = true;
                    }

                    _props = bbn.fn.createObject();
                    _props["class"] = "bbn-spadded bbn-p";

                    if (
                      $_go["0-1-5-1-1-3-3-5"] &&
                      !_forgotten["0-1-5-1-1-3-3-5"]?.[_bbnHash || "_root"]
                    ) {
                      //  bbn.fn.log("IN TODO " + _t.$options.name);
                      //  bbn.fn.log("DOING 0-1-5-1-1-3-3-5 span");
                      _tmp = bbn.fn.clone(_node);
                      if (_bbnHash) {
                        _tmp.loopHash = _bbnHash;
                      }
                      _tmp.props = _props;
                      isAnew = false;
                      if (
                        _eles["0-1-5-1-1-3-3-5"] !== _t.$el &&
                        !_forgotten["0-1-5-1-1-3-3-5"]?.[_bbnHash || "_root"] &&
                        (!_eles["0-1-5-1-1-3-3-5"] ||
                          bbn.fn.isComment(_eles["0-1-5-1-1-3-3-5"]) ||
                          !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-3-5"]))
                      ) {
                        isAnew = true;
                      }
                      if (isAnew) {
                        _eles["0-1-5-1-1-3-3-5"] = await _t.$createElement(
                          _tmp,
                          _parents.at(-1)
                        );
                        if (_parents.at(-1) === _t.$el) {
                          $_final.push({
                            ele: _eles["0-1-5-1-1-3-3-5"],
                            position: $_num,
                          });
                        }
                      } else {
                        _t.$updateElementFromProps(
                          _tmp,
                          _eles["0-1-5-1-1-3-3-5"]
                        );
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }
                      if (isAnew) {
                        let _bbnCurrentElement = _eles["0-1-5-1-1-3-3-5"];
                        _eles["0-1-5-1-1-3-3-5"].addEventListener(
                          "click",
                          (_bbnEventObject) => {
                            let $event = _bbnEventObject;
                            $event.stopImmediatePropagation();
                            let $_action = unpin;
                            if (bbn.fn.isFunction($_action)) {
                              const args = _bbnEventObject.detail?.args || [
                                $event,
                              ];
                              args.push(_bbnEventObject);
                              $_action.bind(_t.$origin)(...args);
                            }
                            bbn.fn.iterate(
                              _bbnCurrentData,
                              (_bbnCurrentDataValue, _bbnCurrentDataIndex) => {
                                //bbn.fn.log('_bbnCurrentDataValue, _bbnCurrentDataIndex', _bbnCurrentDataValue, _bbnCurrentDataIndex, eval(_bbnCurrentDataIndex), _t[_bbnCurrentDataIndex], '++++');
                                if (
                                  _bbnCurrentDataValue !==
                                  eval(_bbnCurrentDataIndex)
                                ) {
                                  if (_t[_bbnCurrentDataIndex] !== undefined) {
                                    _t[_bbnCurrentDataIndex] =
                                      eval(_bbnCurrentDataIndex);
                                  }
                                  _bbnCurrentData[_bbnCurrentDataIndex] =
                                    _t[_bbnCurrentDataIndex];
                                }
                              }
                            );
                            _t.$tick();
                          }
                        );
                      }
                    }

                    if (_eles["0-1-5-1-1-3-3-5"]) {
                      _parents.push(_eles["0-1-5-1-1-3-3-5"]);

                      // Taking care of the node with no tag 0-1-5-1-1-3-3-5-0
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-5-0",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-5-0"];
                      _eles["0-1-5-1-1-3-3-5-0"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-5-0")) {
                        $_go["0-1-5-1-1-3-3-5-0"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-5-0"] &&
                        !_eles["0-1-5-1-1-3-3-5-0"]
                      ) {
                        $_go["0-1-5-1-1-3-3-5-0"] = true;
                      }

                      _sIr(
                        "-5632eae47db831dc",
                        `
                `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-3-3-5-0"] ||
                        _gIs("-5632eae47db831dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-3-3-5-0"] &&
                          _eles["0-1-5-1-1-3-3-5-0"].textContent !==
                            _gIv("-5632eae47db831dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-3-3-5-0"].textContent = _gIv(
                            "-5632eae47db831dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-3-3-5-0"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-3-3-5-0",
                              hash: "-5632eae47db831dc",
                              text: _gIv("-5632eae47db831dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-5-0"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      // Taking care of the node i 0-1-5-1-1-3-3-5-1
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-5-1",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-5-1"];
                      _eles["0-1-5-1-1-3-3-5-1"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-5-1")) {
                        $_go["0-1-5-1-1-3-3-5-1"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-5-1"] &&
                        !_eles["0-1-5-1-1-3-3-5-1"]
                      ) {
                        $_go["0-1-5-1-1-3-3-5-1"] = true;
                      }

                      _props = bbn.fn.createObject();
                      _props["class"] = "nf nf-mdi-pin_off";

                      if (
                        $_go["0-1-5-1-1-3-3-5-1"] &&
                        !_forgotten["0-1-5-1-1-3-3-5-1"]?.[_bbnHash || "_root"]
                      ) {
                        //  bbn.fn.log("IN TODO " + _t.$options.name);
                        //  bbn.fn.log("DOING 0-1-5-1-1-3-3-5-1 i");
                        _tmp = bbn.fn.clone(_node);
                        if (_bbnHash) {
                          _tmp.loopHash = _bbnHash;
                        }
                        _tmp.props = _props;
                        isAnew = false;
                        if (
                          _eles["0-1-5-1-1-3-3-5-1"] !== _t.$el &&
                          !_forgotten["0-1-5-1-1-3-3-5-1"]?.[
                            _bbnHash || "_root"
                          ] &&
                          (!_eles["0-1-5-1-1-3-3-5-1"] ||
                            bbn.fn.isComment(_eles["0-1-5-1-1-3-3-5-1"]) ||
                            !bbn.cp.isTag(_tmp.tag, _eles["0-1-5-1-1-3-3-5-1"]))
                        ) {
                          isAnew = true;
                        }
                        if (isAnew) {
                          _eles["0-1-5-1-1-3-3-5-1"] = await _t.$createElement(
                            _tmp,
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-5-1"],
                              position: $_num,
                            });
                          }
                        } else {
                          _t.$updateElementFromProps(
                            _tmp,
                            _eles["0-1-5-1-1-3-3-5-1"]
                          );
                        }
                        if (_parents.at(-1) === _t.$el) {
                          $_num++;
                        }
                      }

                      if (
                        _t.$el === _parents.at(-1) &&
                        _eles["0-1-5-1-1-3-3-5-1"] &&
                        _eles["0-1-5-1-1-3-3-5-1"] !== _t.$el
                      ) {
                        $_num++;
                      }

                      // Taking care of the node with no tag 0-1-5-1-1-3-3-5-2
                      oldEle = _t.$retrieveElement(
                        "0-1-5-1-1-3-3-5-2",
                        _bbnHash
                      );
                      _node = _t.$currentMap["0-1-5-1-1-3-3-5-2"];
                      _eles["0-1-5-1-1-3-3-5-2"] = oldEle;
                      if (!Object.hasOwn($_go, "0-1-5-1-1-3-3-5-2")) {
                        $_go["0-1-5-1-1-3-3-5-2"] = !oldEle;
                      }
                      if (
                        !$_go["0-1-5-1-1-3-3-5-2"] &&
                        !_eles["0-1-5-1-1-3-3-5-2"]
                      ) {
                        $_go["0-1-5-1-1-3-3-5-2"] = true;
                      }

                      _sIr(
                        "-13cd70644bd9f6dc",
                        `
              `,
                        _bbnHash
                      );
                      if (
                        $_go["0-1-5-1-1-3-3-5-2"] ||
                        _gIs("-13cd70644bd9f6dc", _bbnHash) !== "OK"
                      ) {
                        if (
                          _eles["0-1-5-1-1-3-3-5-2"] &&
                          _eles["0-1-5-1-1-3-3-5-2"].textContent !==
                            _gIv("-13cd70644bd9f6dc", _bbnHash)
                        ) {
                          _eles["0-1-5-1-1-3-3-5-2"].textContent = _gIv(
                            "-13cd70644bd9f6dc",
                            _bbnHash
                          );
                        } else {
                          _eles["0-1-5-1-1-3-3-5-2"] = _t.$createText(
                            {
                              id: "0-1-5-1-1-3-3-5-2",
                              hash: "-13cd70644bd9f6dc",
                              text: _gIv("-13cd70644bd9f6dc", _bbnHash),
                              loopHash: _bbnHash,
                            },
                            _parents.at(-1)
                          );
                          if (_parents.at(-1) === _t.$el) {
                            $_final.push({
                              ele: _eles["0-1-5-1-1-3-3-5-2"],
                              position: $_num,
                            });
                          }
                        }
                      }
                      if (_parents.at(-1) === _t.$el) {
                        $_num++;
                      }

                      _parents.pop();
                    }

                    if (
                      _t.$el === _parents.at(-1) &&
                      _eles["0-1-5-1-1-3-3-5"] &&
                      _eles["0-1-5-1-1-3-3-5"] !== _t.$el
                    ) {
                      $_num++;
                    }

                    //Ending condition
                  }

                  _parents.pop();
                }

                if (
                  _t.$el === _parents.at(-1) &&
                  _eles["0-1-5-1-1-3-3"] &&
                  _eles["0-1-5-1-1-3-3"] !== _t.$el
                ) {
                  $_num++;
                }

                // Taking care of the node with no tag 0-1-5-1-1-3-4
                oldEle = _t.$retrieveElement("0-1-5-1-1-3-4", _bbnHash);
                _node = _t.$currentMap["0-1-5-1-1-3-4"];
                _eles["0-1-5-1-1-3-4"] = oldEle;
                if (!Object.hasOwn($_go, "0-1-5-1-1-3-4")) {
                  $_go["0-1-5-1-1-3-4"] = !oldEle;
                }
                if (!$_go["0-1-5-1-1-3-4"] && !_eles["0-1-5-1-1-3-4"]) {
                  $_go["0-1-5-1-1-3-4"] = true;
                }

                _sIr(
                  "-28049b64-772aff24",
                  `
          `,
                  _bbnHash
                );
                if (
                  $_go["0-1-5-1-1-3-4"] ||
                  _gIs("-28049b64-772aff24", _bbnHash) !== "OK"
                ) {
                  if (
                    _eles["0-1-5-1-1-3-4"] &&
                    _eles["0-1-5-1-1-3-4"].textContent !==
                      _gIv("-28049b64-772aff24", _bbnHash)
                  ) {
                    _eles["0-1-5-1-1-3-4"].textContent = _gIv(
                      "-28049b64-772aff24",
                      _bbnHash
                    );
                  } else {
                    _eles["0-1-5-1-1-3-4"] = _t.$createText(
                      {
                        id: "0-1-5-1-1-3-4",
                        hash: "-28049b64-772aff24",
                        text: _gIv("-28049b64-772aff24", _bbnHash),
                        loopHash: _bbnHash,
                      },
                      _parents.at(-1)
                    );
                    if (_parents.at(-1) === _t.$el) {
                      $_final.push({
                        ele: _eles["0-1-5-1-1-3-4"],
                        position: $_num,
                      });
                    }
                  }
                }
                if (_parents.at(-1) === _t.$el) {
                  $_num++;
                }

                _parents.pop();
              }

              if (
                _t.$el === _parents.at(-1) &&
                _eles["0-1-5-1-1-3"] &&
                _eles["0-1-5-1-1-3"] !== _t.$el
              ) {
                $_num++;
              }

              // Taking care of the node with no tag 0-1-5-1-1-4
              oldEle = _t.$retrieveElement("0-1-5-1-1-4", _bbnHash);
              _node = _t.$currentMap["0-1-5-1-1-4"];
              _eles["0-1-5-1-1-4"] = oldEle;
              if (!Object.hasOwn($_go, "0-1-5-1-1-4")) {
                $_go["0-1-5-1-1-4"] = !oldEle;
              }
              if (!$_go["0-1-5-1-1-4"] && !_eles["0-1-5-1-1-4"]) {
                $_go["0-1-5-1-1-4"] = true;
              }

              _sIr(
                "48aebf1c5a2e45dc",
                `
        `,
                _bbnHash
              );
              if (
                $_go["0-1-5-1-1-4"] ||
                _gIs("48aebf1c5a2e45dc", _bbnHash) !== "OK"
              ) {
                if (
                  _eles["0-1-5-1-1-4"] &&
                  _eles["0-1-5-1-1-4"].textContent !==
                    _gIv("48aebf1c5a2e45dc", _bbnHash)
                ) {
                  _eles["0-1-5-1-1-4"].textContent = _gIv(
                    "48aebf1c5a2e45dc",
                    _bbnHash
                  );
                } else {
                  _eles["0-1-5-1-1-4"] = _t.$createText(
                    {
                      id: "0-1-5-1-1-4",
                      hash: "48aebf1c5a2e45dc",
                      text: _gIv("48aebf1c5a2e45dc", _bbnHash),
                      loopHash: _bbnHash,
                    },
                    _parents.at(-1)
                  );
                  if (_parents.at(-1) === _t.$el) {
                    $_final.push({
                      ele: _eles["0-1-5-1-1-4"],
                      position: $_num,
                    });
                  }
                }
              }
              if (_parents.at(-1) === _t.$el) {
                $_num++;
              }

              _parents.pop();
            }

            if (
              _t.$el === _parents.at(-1) &&
              _eles["0-1-5-1-1"] &&
              _eles["0-1-5-1-1"] !== _t.$el
            ) {
              $_num++;
            }

            // Taking care of the node with no tag 0-1-5-1-2
            oldEle = _t.$retrieveElement("0-1-5-1-2", _bbnHash);
            _node = _t.$currentMap["0-1-5-1-2"];
            _eles["0-1-5-1-2"] = oldEle;
            if (!Object.hasOwn($_go, "0-1-5-1-2")) {
              $_go["0-1-5-1-2"] = !oldEle;
            }
            if (!$_go["0-1-5-1-2"] && !_eles["0-1-5-1-2"]) {
              $_go["0-1-5-1-2"] = true;
            }

            _sIr(
              "4b76b99c-10e5f524",
              `
      `,
              _bbnHash
            );
            if (
              $_go["0-1-5-1-2"] ||
              _gIs("4b76b99c-10e5f524", _bbnHash) !== "OK"
            ) {
              if (
                _eles["0-1-5-1-2"] &&
                _eles["0-1-5-1-2"].textContent !==
                  _gIv("4b76b99c-10e5f524", _bbnHash)
              ) {
                _eles["0-1-5-1-2"].textContent = _gIv(
                  "4b76b99c-10e5f524",
                  _bbnHash
                );
              } else {
                _eles["0-1-5-1-2"] = _t.$createText(
                  {
                    id: "0-1-5-1-2",
                    hash: "4b76b99c-10e5f524",
                    text: _gIv("4b76b99c-10e5f524", _bbnHash),
                    loopHash: _bbnHash,
                  },
                  _parents.at(-1)
                );
                if (_parents.at(-1) === _t.$el) {
                  $_final.push({ ele: _eles["0-1-5-1-2"], position: $_num });
                }
              }
            }
            if (_parents.at(-1) === _t.$el) {
              $_num++;
            }

            _parents.pop();
          }

          if (
            _t.$el === _parents.at(-1) &&
            _eles["0-1-5-1"] &&
            _eles["0-1-5-1"] !== _t.$el
          ) {
            $_num++;
          }

          // Taking care of the node with no tag 0-1-5-2
          oldEle = _t.$retrieveElement("0-1-5-2", _bbnHash);
          _node = _t.$currentMap["0-1-5-2"];
          _eles["0-1-5-2"] = oldEle;
          if (!Object.hasOwn($_go, "0-1-5-2")) {
            $_go["0-1-5-2"] = !oldEle;
          }
          if (!$_go["0-1-5-2"] && !_eles["0-1-5-2"]) {
            $_go["0-1-5-2"] = true;
          }

          _sIr(
            "-6304abe4-7727b024",
            `
    `,
            _bbnHash
          );
          if (
            $_go["0-1-5-2"] ||
            _gIs("-6304abe4-7727b024", _bbnHash) !== "OK"
          ) {
            if (
              _eles["0-1-5-2"] &&
              _eles["0-1-5-2"].textContent !==
                _gIv("-6304abe4-7727b024", _bbnHash)
            ) {
              _eles["0-1-5-2"].textContent = _gIv(
                "-6304abe4-7727b024",
                _bbnHash
              );
            } else {
              _eles["0-1-5-2"] = _t.$createText(
                {
                  id: "0-1-5-2",
                  hash: "-6304abe4-7727b024",
                  text: _gIv("-6304abe4-7727b024", _bbnHash),
                  loopHash: _bbnHash,
                },
                _parents.at(-1)
              );
              if (_parents.at(-1) === _t.$el) {
                $_final.push({ ele: _eles["0-1-5-2"], position: $_num });
              }
            }
          }
          if (_parents.at(-1) === _t.$el) {
            $_num++;
          }

          _parents.pop();
        }

        if (
          _t.$el === _parents.at(-1) &&
          _eles["0-1-5"] &&
          _eles["0-1-5"] !== _t.$el
        ) {
          $_num++;
        }

        //Ending condition
      }

      _parents.pop();
    }

    if (_t.$el === _parents.at(-1) && _eles["0-1"] && _eles["0-1"] !== _t.$el) {
      $_num++;
    }

    // Taking care of the node with no tag 0-2
    oldEle = _t.$retrieveElement("0-2", _bbnHash);
    _node = _t.$currentMap["0-2"];
    _eles["0-2"] = oldEle;
    if (!Object.hasOwn($_go, "0-2")) {
      $_go["0-2"] = !oldEle;
    }
    if (!$_go["0-2"] && !_eles["0-2"]) {
      $_go["0-2"] = true;
    }

    _sIr(
      "-2f2596e4-1033a624",
      `
`,
      _bbnHash
    );
    if ($_go["0-2"] || _gIs("-2f2596e4-1033a624", _bbnHash) !== "OK") {
      if (
        _eles["0-2"] &&
        _eles["0-2"].textContent !== _gIv("-2f2596e4-1033a624", _bbnHash)
      ) {
        _eles["0-2"].textContent = _gIv("-2f2596e4-1033a624", _bbnHash);
      } else {
        _eles["0-2"] = _t.$createText(
          {
            id: "0-2",
            hash: "-2f2596e4-1033a624",
            text: _gIv("-2f2596e4-1033a624", _bbnHash),
            loopHash: _bbnHash,
          },
          _parents.at(-1)
        );
        if (_parents.at(-1) === _t.$el) {
          $_final.push({ ele: _eles["0-2"], position: $_num });
        }
      }
    }
    if (_parents.at(-1) === _t.$el) {
      $_num++;
    }

    bbn.fn.each($_final, (a) => {
      if (_t.$el.childNodes[a.position]) {
        _t.$insertElement(a.ele, _t.$el, _t.$el.childNodes[a.position]);
      } else {
        _t.$insertElement(a.ele, _t.$el);
      }
    });
  })(
    _t["$props"],
    _t["$el"],
    _t["$root"],
    _t["$attr"],
    _t["$event"],
    _t["$parent"],
    _t["$options"],
    _t["$namespaces"],
    _t["$children"],
    _t["$refs"],
    _t["$slots"],
    _t["$isCreated"],
    _t["$isMounted"],
    _t["_self"],
    _t["_"].bind(_t),
    _t["$emit"].bind(_t),
    _t["$is"].bind(_t),
    _t["$isComponent"].bind(_t),
    _t["$nextTick"].bind(_t),
    _t["$off"].bind(_t),
    _t["$on"].bind(_t),
    _t["$once"].bind(_t),
    _t["$retrieveComponent"].bind(_t),
    _t["$retrieveElement"].bind(_t),
    _t["ancestors"].bind(_t),
    _t["closest"].bind(_t),
    _t["extend"].bind(_t),
    _t["find"].bind(_t),
    _t["findAll"].bind(_t),
    _t["findAllByKey"].bind(_t),
    _t["findByKey"].bind(_t),
    _t["getChildByKey"].bind(_t),
    _t["getComponentName"].bind(_t),
    _t["getComponents"].bind(_t),
    _t["getRef"].bind(_t),
    _t["source"],
    _t["observer"],
    _t["idx"],
    _t["last"],
    _t["uid"],
    _t["visual"],
    _t["screenshotDelay"],
    _t["pane"],
    _t["error"],
    _t["component"],
    _t["title"],
    _t["options"],
    _t["cached"],
    _t["scrollable"],
    _t["icon"],
    _t["notext"],
    _t["content"],
    _t["menu"],
    _t["loaded"],
    _t["loading"],
    _t["fcolor"],
    _t["bcolor"],
    _t["load"],
    _t["selected"],
    _t["css"],
    _t["advert"],
    _t["help"],
    _t["imessages"],
    _t["script"],
    _t["static"],
    _t["pinned"],
    _t["url"],
    _t["current"],
    _t["real"],
    _t["cfg"],
    _t["events"],
    _t["disabled"],
    _t["hidden"],
    _t["portal"],
    _t["_retrievePopup"].bind(_t),
    _t["exportComponent"].bind(_t),
    _t["getPopup"].bind(_t),
    _t["confirm"].bind(_t),
    _t["alert"].bind(_t),
    _t["post"].bind(_t),
    _t["postOut"].bind(_t),
    _t["isActiveResizer"].bind(_t),
    _t["onResize"].bind(_t),
    _t["setResizeMeasures"].bind(_t),
    _t["setContainerMeasures"].bind(_t),
    _t["getParentResizer"].bind(_t),
    _t["setResizeEvent"].bind(_t),
    _t["unsetResizeEvent"].bind(_t),
    _t["selfEmit"].bind(_t),
    _t["formatSize"].bind(_t),
    _t["setComputedStyle"].bind(_t),
    _t["observerCheck"].bind(_t),
    _t["isObserved"].bind(_t),
    _t["observerWatch"].bind(_t),
    _t["observerRelay"].bind(_t),
    _t["observerEmit"].bind(_t),
    _t["observerClear"].bind(_t),
    _t["getFullCurrentURL"].bind(_t),
    _t["getFullURL"].bind(_t),
    _t["setLoaded"].bind(_t),
    _t["randomName"].bind(_t),
    _t["show"].bind(_t),
    _t["close"].bind(_t),
    _t["setCurrent"].bind(_t),
    _t["setTitle"].bind(_t),
    _t["setIcon"].bind(_t),
    _t["setColor"].bind(_t),
    _t["popup"].bind(_t),
    _t["getComponent"].bind(_t),
    _t["enter"].bind(_t),
    _t["pin"].bind(_t),
    _t["unpin"].bind(_t),
    _t["reload"].bind(_t),
    _t["addMenu"].bind(_t),
    _t["deleteMenu"].bind(_t),
    _t["init"].bind(_t),
    _t["showMenu"].bind(_t),
    _t["setScreenshot"].bind(_t),
    _t["unsetScreenshot"].bind(_t),
    _t["saveScreenshot"].bind(_t),
    _t["takeScreenshot"].bind(_t),
    _t["updateScreenshot"].bind(_t),
    _t["registerRouter"].bind(_t),
    _t["unregisterRouter"].bind(_t),
    _t["currentPopup"],
    _t["resizerObserved"],
    _t["currentCss"],
    _t["currentSource"],
    _t["currentTitle"],
    _t["currentOptions"],
    _t["currentCached"],
    _t["currentScrollable"],
    _t["currentComponent"],
    _t["currentIcon"],
    _t["currentNotext"],
    _t["currentContent"],
    _t["currentMenu"],
    _t["currentFcolor"],
    _t["currentBcolor"],
    _t["currentAdvert"],
    _t["currentHelp"],
    _t["currentImessages"],
    _t["currentScript"],
    _t["currentCurrent"],
    _t["currentCfg"],
    _t["currentEvents"],
    _t["currentDisabled"],
    _t["currentHidden"],
    _t["isPane"],
    _t["currentView"],
    _t["isVisible"],
    _t["isVisualVisible"],
    _t["visualStyle"],
    _t["anonComponent"],
    _t["ready"],
    _t["bbnUid"],
    _t["componentClass"],
    _t["isMobile"],
    _t["isTablet"],
    _t["_currentPopup"],
    _t["parentResizer"],
    _t["onParentResizerEmit"],
    _t["ResizerObserver"],
    _t["lastKnownHeight"],
    _t["lastKnownWidth"],
    _t["lastKnownCtHeight"],
    _t["lastKnownCtWidth"],
    _t["isResizing"],
    _t["computedStyle"],
    _t["observersCopy"],
    _t["observerDirty"],
    _t["observerValue"],
    _t["observers"],
    _t["observerID"],
    _t["observationTower"],
    _t["observerUID"],
    _t["router"],
    _t["dirty"],
    _t["isComponent"],
    _t["fullScreen"],
    _t["componentName"],
    _t["popups"],
    _t["routers"],
    _t["currentScreenshotDelay"],
    _t["isComponentActive"],
    _t["isLoaded"],
    _t["isPinned"],
    _t["isStatic"],
    _t["currentURL"],
    _t["isOver"],
    _t["_bbn_container"],
    _t["thumbnail"],
    _t["forms"],
    _t["errorStatus"],
    _t["componentDefinition"],
    _t["componentTemplate"],
    _t["componentCSS"],
    _t["currentIndex"]
  );
  bbn.fn.iterate(_r, (a) => {
    bbn.fn.iterate(a, (b) => {
      if (b.state === "TMP") {
        b.state = "DEL";
      }
    });
  });
  return _r;
};
