// Javascript Document

const cpDef = {
  mixins: [
    bbn.cp.mixins.basic,
    bbn.cp.mixins.input,
    bbn.cp.mixins.list,
    bbn.cp.mixins.dropdown
  ],
  props: {
    asArray: {
      type: Boolean,
      default: false
    }
  },
  data() {
    let items = [];
    if (bbn.fn.isString(this.value)
      && this.value.length
    ) {
      items = this.value.split(',');
    }
    else if (bbn.fn.isArray(this.value)) {
      items.push(...this.value);
    }

    return {
      items,
      currentText: "",
    }
  },
  methods: {
    setEvent() {
      let element = this.getRef('autocomplete').getRef('element');
      bbn.fn.log("EVENT", element);
    },
    onPressBackspace(e) {
      bbn.fn.log("BACKSPACE", e.target);
      if (!e.target.value && this.items.length) {
        this.items.pop();
      }
    },
    select(data) {
      if (!this.items.includes(data.email)) {
        this.items.push(data.email);
        this.emitInput(this.asArray ? this.items : this.items.join(','));
      }
      this.$nextTick(() => {
        this.getRef('autocomplete').resetDropdown();
      });
    },
    close(item) {
      const idx = this.items.indexOf(item);
      if (idx > -1) {
        this.items.splice(idx, 1);
        this.emitInput(this.asArray ? this.items : this.items.join(','));
      }
    },
    clickContainer() {
      const autocomplete = this.getRef('autocomplete');
      if (autocomplete) {
        autocomplete.$refs.input.$refs.element.focus();
      }
    }
  }
};


import cpHtml from './multiinput.html';
import cpStyle from './multiinput.less';
let cpLang = {};
if (bbn.env.lang) {
  try {
    cpLang = await import(`./_i18n/multiinput.${bbn.env.lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) {}
}

export default {
  name: 'bbn-multiinput',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
