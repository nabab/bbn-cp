/**
 * @file bbn-dropdown component
 *
 * @description The easy-to-implement bbn-dropdown component allows you to choose a single value from a user-supplied list.
 *
 * @copyright BBN Solutions
 *
 * @author BBN Solutions
 *
 * @created 10/02/2017.
 */

const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.events
   * @mixin bbn.cp.mixins.input
   * @mixin bbn.cp.mixins.resizer
   * @mixin bbn.cp.mixins.list
   * @mixin bbn.cp.mixins.keynav
   * @mixin bbn.cp.mixins.url
   * @mixin bbn.cp.mixins.dropdown
   * @mixin bbn.cp.mixins.localStorage
    */
  mixins:
    [
      bbn.cp.mixins.basic,
      bbn.cp.mixins.events,
      bbn.cp.mixins.input,
      bbn.cp.mixins.resizer,
      bbn.cp.mixins.list,
      bbn.cp.mixins.keynav,
      bbn.cp.mixins.url,
      bbn.cp.mixins.dropdown,
      bbn.cp.mixins.localStorage
    ],
  props: {
    /**
     * @prop {Boolean} [false] notext
     */
    notext: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      startingTmpValue: '',
      startingTmpTimeout: null
    };
  },
  /**
   * The current icon.
   *
   * @computed currentIcon
   * @return {String}
  */
  beforeMount() {
    if (this.hasStorage) {
      let v = this.getStorage();
      if (v && (v !== this.value)) {
        this.emitInput(v);
      }
    }
  },
  methods: {
    /**
     * States the role of the enter key on the dropdown menu.
     *
     * @method keydown
     * @param {Event} e
     * @fires widget.select
     * @fires widget.open
     * @fires commonKeydown
     * @fires resetDropdown
     * @fires keynav
     */
    onKeydown(e) {
      if (this.commonKeydown(e)) {
        return;
      }
      else if (this.isOpened && (e.key === 'Escape')) {
        e.stopPropagation();
        e.preventDefault();
        this.resetDropdown();
      }
      else if (bbn.var.keys.dels.includes(e.which) && !this.filterString) {
        e.preventDefault();
        this.resetDropdown();
      }
      else if (bbn.var.keys.upDown.includes(e.keyCode)) {
        e.preventDefault();
        this.keynav(e);
      }
      else if (!this.isSearching && (e.key === ' ')) {
        e.preventDefault();
        this.isOpened = !this.isOpened;
      }
      else if (this.isOpened && (e.key === 'Enter')) {
        e.preventDefault();
        this.selectOver();
      }
    },
    paste() {
      //alert("PASTE");
    },
    onKeyup(e) {
      if (e.key.match(/^[A-z0-9\s]{1}$/)) {
        this.startingTmpValue += e.key;
        if (!this.isOpened) {
          this.isOpened = true;
        }
      }
    },
    selectOnNative(ev) {
      if (!ev.defaultPrevented) {
        if (ev.target.value === '') {
          this.emitInput(this.isNullable && (this.nullable !== null) ? this.nullValue : '');
          this.$emit('change', this.isNullable && (this.nullable !== null) ? this.nullValue : '', -1, -1, ev);
        }
        else {
          let idx = bbn.fn.search(this.filteredData, 'data.' + this.sourceValue, ev.target.value);
          if (idx > -1) {
            let item = this.filteredData[idx].data;
            if (this.sourceAction && item[this.sourceAction] && bbn.fn.isFunction(item[this.sourceAction])) {
              item[this.sourceAction](item);
            }
            else if ((this.sourceUrl !== undefined) && item[this.sourceUrl]) {
              bbn.fn.link(item[this.sourceUrl]);
            }
            else if (item[this.uid || this.sourceValue] !== undefined) {
              this.emitInput(item[this.uid || this.sourceValue]);
              this.$emit('change', item[this.uid || this.sourceValue], idx, this.filteredData[idx].index, ev);
            }
          }
        }
      }
      this.isOpened = false;
    }
  },
  /**
   * @event created
   */
  beforeCreate() {
    this.$on('dataloaded', () => {
      if ((this.value !== undefined) && !this.currentText.length) {
        let row = bbn.fn.getRow(this.currentData, a => {
          return a.data[this.sourceValue] === this.value;
        });
        if (row) {
          let txt = row.data[this.sourceText];
          if (this.selectedText) {
            txt = bbn.fn.isFunction(this.selectedText) ?
              this.selectedText(row.data) :
              row.data[this.selectedText];
          }
          this.currentText = this.clearHtml ? bbn.fn.html2text(txt) : txt;
        }
      }
    })
  },
  watch: {
    startingTmpValue(v) {
      if (v) {
        let fl = this.getRef('list');
        if (fl) {
          let lst = fl.getRef('list');
          if (lst) {
            lst.overByString(v);
          }
        }
        if (this.startingTmpTimeout) {
          clearTimeout(this.startingTmpTimeout);
        }
        this.startingTmpTimeout = setTimeout(() => {
          this.startingTmpValue = '';
        }, 1000)
      }
    },
    /**
     * @watch  isOpened
     */
    isOpened(val) {
      if (this.popup && val && !this.native) {
        this.popupComponent.open({
          label: false,
          element: this.$el,
          maxHeight: this.maxHeight,
          minWidth: this.$el.clientWidth,
          autoHide: true,
          uid: this.sourceValue,
          itemComponent: this.realComponent,
          onSelect: this.select,
          position: 'bottom',
          suggest: true,
          modal: false,
          selected: [this.value],
          onClose: () => {
            this.isOpened = false;
          },
          source: this.filteredData.map(a => bbn.fn.extend({ value: a.data.text }, a.data)),
          sourceAction: this.sourceAction,
          sourceText: this.sourceText,
          sourceValue: this.sourceValue
        });
      }

      if (!val && this.preload && !this.native) {
        this.getRef('list').currentVisible = true;
      }
    },
    /**
     * @watch  currentText
     */
    currentText(newVal, oldVal) {
      if (this.ready) {
        if (!newVal && this.value) {
          this.emitInput(this.isNullable && (this.nullable !== null) ? this.nullValue : '');
          this.filterString = '';
        }
        else {
          this.filterString = newVal === this.currentTextValue ? '' : newVal;
        }
      }
    },
    /**
     * @watch  currentSelectValue
     */
    currentSelectValue(newVal) {
      if (bbn.fn.isString(newVal) && !newVal.length) {
        newVal = this.isNullable && (this.nullable !== null) ? this.nullValue : '';
      }
      else if (bbn.fn.isNull(newVal) && this.isNullable && (this.nullable !== null)) {
        newVal = this.nullValue;
      }

      if (this.ready && (newVal !== this.value)) {
        this.emitInput(newVal);
        this.$emit('change', newVal);
      }
    },
    filterString(v) {
      let args = [0, this.currentFilters.conditions.length ? 1 : 0];
      if (v && this.isActive) {
        args.push({
          field: this.sourceText,
          operator: 'startswith',
          value: v
        })
      }
      this.currentFilters.conditions.splice(...args);
    },
    value(v) {
      if (v !== this.currentSelectValue) {
        this.currentSelectValue = v;
      }

      this.$nextTick(() => {
        this.currentText = this.currentTextValue;
      });

      if (this.storage) {
        if (v) {
          this.setStorage(v);
        }
        else {
          this.unsetStorage()
        }
      }
    }
  }
};

import cpHtml from './dropdown.html';
import cpStyle from './dropdown.less';

let cpLang = {};
if (bbn.env.lang) {
  try {
    const lang = bbn.env.lang || 'en';
    cpLang = await import(`./_i18n/dropdown.${lang}.lang`);
    if (cpLang.default) {
      cpLang = cpLang.default;
    }
  }
  catch (err) { }
}

export default {
  name: 'bbn-dropdown',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
