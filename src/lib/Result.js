import bbnData from "./Data.js";
export default class bbnResult {
  num = 0;
  state = 'NEW';
  hash;
  value;

  constructor(value) {
    this.value = value;
    this.hash = bbnData.hash(value);
  }
}
