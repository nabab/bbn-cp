export default {
  template: `
<div class="bbn-router-search-result bbn-w-100 bbn-spadded bbn-default-alt-background bbn-p bbn-hover-effect-element"
 :style="{backgroundColor: source.bcolor, color: source.fcolor}">
<div class="bbn-flex-width">
<div class="bbn-flex-fill bbn-nowrap bbn-ellipsis">
  <span class="bbn-s bbn-badge bbn-bg-blue"
        bbn-text="source.score"/>
  <span bbn-text="_('Opened container')"/>
  <em bbn-text="'URL: ' + source.url"></em><br>
  <span class="bbn-lg" bbn-text="source.title"></span>
</div>
<div class="bbn-hlpadded bbn-h-100 bbn-r"
      style="vertical-align: middle"
      bbn-html="source.match">
</div>
</div>
</div>
`,
  props: {
    source: {
      type: Object,
      required: true
    }
  }
};
