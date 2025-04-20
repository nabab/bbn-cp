import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$once = function(event, handler, bound){
    this.$off(event, handler, bound);
    this.$on(event, handler, true, bound);
  }