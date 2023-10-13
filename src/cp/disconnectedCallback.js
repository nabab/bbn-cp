export default function disconnectedCallback(cp) {
  if (cp.bbn) {
    cp.bbn.$disconnectedCallback()
  }
}
