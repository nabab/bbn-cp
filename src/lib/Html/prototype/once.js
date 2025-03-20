import bbnProtoHtml from "../../Html/Proto.js";

bbnProtoHtml.$once = function(event, handler){
    this.$off(event, handler);
    this.$on(event, handler, true);
  }