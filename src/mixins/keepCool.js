import bbnData from '../lib/Data.js';

const run = (fn, timer, resolve, reject) => {
  timer.to = false;
  let out;
  try {
    out = fn(); // can be sync or async
  } catch (err) {
    // even on error, mark finish time
    timer.time = Date.now();
    timer.promise = false;
    reject(err);
    return;
  }

  Promise.resolve(out)
    .then(res => {
      timer.time = Date.now(); // set when fn FINISHES
      timer.promise = false;
      resolve(res);
    })
    .catch(err => {
      timer.time = Date.now(); // also on failure
      timer.promise = false;
      reject(err);
    });
};

const keepCool =  {
  data(){
    return {
      /**
       * The obejct containing the cool's timers.
       * @data {Number} [0] coolTimer
       * @memberof keepCoolComponent
       */
      coolTimers: bbn.cp.immunizeValue({}),
      /**
       * The interval.
       * @data {Number} [40] coolInterval
       * @memberof keepCoolComponent
       */
      coolInterval: 40
    }
  },
  methods: {
    /**
     * Prevents the same action from running too frequently.
     * - If last finish was > timeout ago: run immediately.
     * - If last finish was X < timeout ago: schedule in (timeout - X).
     * - If already running or scheduled: return the existing promise.
     */
    keepCool(fn, idx, timeout) {
      if (!idx) {
        idx = 'default';
      }
      if (!this.coolTimers) {
        this.coolTimers = {};
      }
      if (!this.coolTimers[idx]) {
        this.coolTimers[idx] = {
          time: 0,        // last FINISH time
          promise: false, // current pending/scheduled promise (if any)
          to: false       // timer id (if scheduled)
        };
      }

      const now = Date.now();
      const delay = typeof timeout === 'number' ? timeout : this.coolInterval;

      // If there's already a pending/scheduled run, return its promise
      if (this.coolTimers[idx].promise) {
        return this.coolTimers[idx].promise;
      }

      // Time remaining until we can run again, based on FINISH time
      const wait = Math.max(0, (this.coolTimers[idx].time + delay) - now);

      // Schedule or run immediately, and return the shared promise
      //bbn.fn.log("Executing keepCoolExec with delay " + delay + " for idx " + idx + ' on ' + this.$options.name);
      // Create one shared promise for this run (scheduled or immediate)
      this.coolTimers[idx].promise = new Promise((resolve, reject) => {
        if (delay && delay > 0) {
          this.coolTimers[idx].to = setTimeout(() => run(fn, this.coolTimers[idx], resolve, reject), delay);
        } else {
          run(fn, this.coolTimers[idx], resolve, reject);
        }
      });

      return this.coolTimers[idx].promise;
    },
  }
};

export default keepCool;
