import treatElement from "./treatElement.js";

/**
 * Adds a new component to the static global #components property
 */
export default function sr(cp, attr, hash) {
  return cp.$_setInternalResult(
    attr.id,
    attr.fn.bind(cp)(...attr.args.map(a => {
      let r;
      try {
        r = treatArgument(a, cp, hash)
      }
      catch(e) {
        bbn.fn.log(["ERROR IN TREAT ARGUMENT", e, a, cp, hash, attr])
        throw e;
      }
      return r;
    })),
    hash
  );
}
