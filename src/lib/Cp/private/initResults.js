export default function initResults(cp) {
  //bbn.fn.warning("Init result on " + cp.$options.name)
  cp.$numBuild++;
  for (let n1 in cp.$expResults) {
    for (let n2 in cp.$expResults[n1]) {
      if ((cp.$expResults[n1][n2].state !== 'DEL') && (cp.$expResults[n1][n2].num <= cp.$numBuild)) {
        cp.$expResults[n1][n2].state = 'TMP';
      }
    }
  }
}
