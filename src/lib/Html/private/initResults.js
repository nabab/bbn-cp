export default function initResults(cp) {
  //bbn.fn.warning("Init result on " + cp.$options.name)
  cp.$numBuild = bbn.cp.numTicks;
  return;
  for (let n1 in cp.$nodes) {
    if (cp.$nodes[n1] instanceof bbnNode) {
      bbn.fn.each(cp.$nodes[n1].attributes, a => {
        if ((a.state !== 'DEL') && (a.result.num <= cp.$numBuild)) {
          a.result.state = 'TMP';
        }
      });
    }
    else {
      for (let n2 in cp.$nodes[n1]) {
        bbn.fn.each(cp.$nodes[n1][n2].attributes, a => {
          if ((a.state !== 'DEL') && (a.result.num <= cp.$numBuild)) {
            a.result.state = 'TMP';
          }
        });
      }
    }
  }
}
