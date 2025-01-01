import bbnParser from "../lib/Parser.js";

/**
 * Remove the self closing tags and return an HTML string
 * @return {String}
 */
export default function removeSelfClosing(html) {
  const pp = new bbnParser(html);
  return pp.html;
}
