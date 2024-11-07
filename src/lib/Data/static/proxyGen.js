bbnData.proxyGen = (mutableTarget, mutableHandler = Reflect) => ({
  setTarget(target) {
    new Proxy(target, {});  // test target validity
    mutableTarget = target;
  },
  setHandler(handler) {
    new Proxy({}, handler);  // test handler validity
    Object.keys(handler).forEach(key => {
      const value = handler[key];
      if (Reflect[key] && typeof value !== 'function') {
        throw new Error(`Trap "${key}: ${value}" is not a function`);
      }
    });
    mutableHandler = handler;
  },
  getTarget() {
    return mutableTarget;
  },
  getHandler() {
    return mutableHandler;
  },
  proxy: new Proxy(
    mutableTarget,
    new Proxy({}, {
      // Dynamically forward all the traps to the associated methods on the mutable handler
      get(target, property) {
        return (_target, ...args) => mutableHandler[property].apply(mutableHandler, [mutableTarget, ...args]);
      }
    }),
  )
});
  
const myObj = bbnData.proxyGen({d: 1});

bbn.fn.log(myObj.proxy);

myObj.setTarget({ val: 1 });
bbn.fn.log(`val is: ${myObj.proxy.val}`);

myObj.setTarget({ val: 2 });
bbn.fn.log(`val is: ${myObj.proxy.val}`);

bbn.fn.log(myObj.proxy);
