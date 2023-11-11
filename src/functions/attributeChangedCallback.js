export default function attributeChangedCallback(cp, name, oldValue, newValue) {
  if ((oldValue !== newValue) && cp.bbn) {
    cp.bbn.$attributeChange(name, oldValue, newValue);
  }
}
