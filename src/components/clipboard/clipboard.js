/**
 * @file bbn-clipboard component
 *
 * @description bbn-clipboard Classic input with normalized appearance.
 *
 * @author BBN Solutions
 *
 * @copyright BBN Solutions
 *
 * @created 15/08/2019.
 */
const cpDef = {
  /**
   * @mixin bbn.cp.mixins.basic
   * @mixin bbn.cp.mixins.localStorage
   */
  mixins: [bbn.cp.mixins.basic],
  statics() {
    // IndexedDb access for storing thumbnails in visual mode
    let db = false;
    if (bbn.db && bbn.db.ok) {
      db = true;
      if (!bbn.db._structures?.bbn?.clipboard) {
        bbn.db.add('bbn', 'clipboard', {
          keys: {
            PRIMARY: {
              columns: ['uid'],
              unique: true
            },
            MD5: {
              columns: ['md5'],
              unique: false
            },
            TYPE: {
              columns: ['type'],
              unique: false
            }
          },
          fields: {
            uid: {},
            preview: {},
            content: {},
            len: {},
            type: {},
            time: {},
            md5: {}            
          },
          num: 2
        });
      }
    }
    return {
      db
    };
  },
  props: {
    /**
     * @prop {String} ['right'] orientation
     */
    orientation: {
      type: String,
      default: 'right'
    },
    /**
     * @prop {Array} [[]] source
     */
    source: {
      type: Array
    },
    /**
     * @prop {Array} [[]] max The maximum number of items kept in the clipboard
     */
    max: {
      type: Number,
      default: 20
    },
    zIndex: {
      type: Number
    },
    /**
     * @prop {Array} [[]] max The maximum number of items kept in the clipboard
     */
    maxSize: {
      type: Number,
      default: 1000000
    }
  },
  data() {
    return {
      /**
       * @data {Number} [0] opacity
       */
      opacity: 0,
      /**
       * @data {Array} items
       */
      items: this.source ? this.source.slice() : [],
      /**
       * @data {String} [''] search
       */
      search: '',
      /**
       * @data {Boolean} [false] isSetting
       */
      isSetting: false,
      /**
       * @data {String} [null] uid
       */
      uid: null,
      /**
       * @data {Boolean} [false] isOpened
       */
      isOpened: false,
      /**
       * @data {Boolean} [false] isUpdatingClipboard
       */
      isUpdatingClipboard: false
    };
  },
  computed: {
    orderedItems() {
      return bbn.fn.multiorder(this.items, [
        {field: 'pinned', dir: 'desc'},
        {field: 'dt', dir: 'desc'}
      ]);
    }
  },
  methods: {
    /**
     * Emits a change when the state of the checkbox changes.
     *
     * @method unsearch
     */
    unsearch() {
      if (this.search.length) {
        this.search = '';
        this.items = this.source;
      }
    },
    /**
     * @todo empty function
     *
     * @method test
     */
    test(uid) {
      bbn.fn.log("TEST", uid);
    },
    /**
     *
     *
     * @method togle
     *
     */
    toggle() {
      return this.getRef('slider').toggle();
    },
    /**
     *
     * @fires getRef
     * @method show
     */
    show() {
      return this.getRef('slider').show();
    },
    /**
     *
     * @fires getRef
     * @method hide
     */
    hide() {
      return this.getRef('slider').hide();
    },
    /**
     *
     * @fires getItem
     * @method save
     */
    save(uid, title) {
      let item = this.getItem(uid);
      if (item) {
        let content = item.file || item.text;
        if (!title) {
          bbn.fn.log("NO TITLE", item);
          title = item.text;
          if (!item.file && (title.length > 15)) {
            title = bbn.fn.sanitize(bbn.fn.substr(title, 0, 50)).substr(15);
          }
        }
        bbn.fn.download(title, content, item.type);
      }
    },
    /**
     *
     * @fires getItem
     * @fires save
     * @method saveAs
     */
    saveAs(uid) {
      let item = this.getItem(uid);
      if (item) {
        let bits = item.text.split('.');
        let title = prompt(bbn._('Enter the file name'), bits.length > 1 ? '.' + bits.pop().toLowerCase() : item.text);
        if (title) {
          this.save(uid, title);
        }
      }
    },
    async pin(uid, unpin) {
      const item = this.getItem(uid);
      if (!item) {
        return 0;
      }

      const res = await this.db.update('clipboard', {pinned: unpin ? 0 : 1}, {uid});
      bbn.fn.log("UPDATING", unpin, res, {pinned: unpin ? 0 : 1, uid})
      item.pinned = unpin ? 0 : 1;
      return res;
    },
    itemMenu(source) {
      const uid = source.uid;
      return [
        {
          text: bbn._('Copy plain text'),
          icon: 'nf nf-md-cursor_text',
          action: a => bbn.fn.log(a)
        },
        {
          text: bbn._('Copy rich text'),
          icon: 'nf nf-md-code_tags',
          disabled: !source.content,
          action: () => this.setClipboard(uid, 'html')
        },
        {
          text: bbn._('Copy as image'),
          icon: 'nf nf-fa-image',
          disabled: !source.type || (source.type.indexOf('image/')) !== 0,
          action: () => this.setClipboard(uid, 'image')
        },
        {
          text: bbn._('Save'),
          icon: 'nf nf-fa-file_o',
          action: () => this.save(uid)
        },
        {
          text: bbn._('Save as...'),
          icon: 'nf nf-fa-file_o',
          action: () => this.saveAs(uid)
        },
        {
          text: bbn._('Pin'),
          icon: 'nf nf-md-pin',
          action: () => this.pin(uid),
          disabled: source.pinned
        },
        {
          text: bbn._('Unpin'),
          icon: 'nf nf-md-pin_off',
          action: () => this.pin(uid, true),
          disabled: !source.pinned
        },
        {
          text: bbn._('Share'),
          icon: 'nf nf-fa-share',
          action: () => null
        },
        {
          text: bbn._('Remove'),
          icon: 'nf nf-fa-trash_o',
          action: () => this.removeItem({uid})
        },
      ];
    },
    /**
     * @method add
     * @param data
     * @emits add
     */
    async add(data) {
      let dt = bbn.fn.timestamp();
      let uid = dt;
      let ar = [{
        dt: dt,
        uid: uid,
        text: data.raw,
        type: 'text/plain',
        stype: 'text',
        size: data.raw.length,
        md5: bbn.fn.md5(data.raw),
        mdate: null,
        content: '',
        file: '',
        pinned: false
      }];
      if (data.files && data.files.length) {
        // No need for a list of files if there is only one
        if (data.files.length === 1) {
          ar = [];
        }
        bbn.fn.each(data.files, o => {
          uid++;
          let stype = 'text';
          if (o.type !== 'text/plain') {
            if (o.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
              stype = 'ms.word';
            } else if (o.type === 'application/vnd.oasis.opendocument.text') {
              stype = 'oo.text';
            } else if (o.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
              stype = 'oo.sheet';
            } else if (o.type.indexOf('image/') !== 0) {
              let bits = o.type.split('/');
              stype = bits[1] || bits[0];
            } else {
              stype = o.type.length > 15 ? bbn._('Other') : o.type;
            }
          }
          ar.push({
            dt: dt,
            uid: uid,
            text: o.name,
            type: o.type,
            stype: stype,
            md5: bbn.fn.md5(o.name),
            size: o.size,
            mdate: o.mdate,
            content: '',
            file: o.data
          });
        });
      } else if (data.str && data.str.length) {
        bbn.fn.each(data.str, o => {
          if (o.type === 'text/plain') {
            ar[0].text = o.data;
            ar[0].md5 = bbn.fn.md5(o.data);
          } else {
            ar[0].type = o.type;
            if (o.type.indexOf('image/') !== 0) {
              let bits = o.type.split('/');
              ar[0].stype = bits[1] || bits[0];
            } else {
              stype = o.type;
            }
            ar[0].content = o.data;
          }
        });
      }

      let added = [];

      for (let i = 0; i < ar.length; i++) {
        const row = await this.db.select('clipboard', ['uid'], {type: ar[i].type, md5: ar[i].md5});
        if (row?.uid) {
          ar[i].dt = bbn.fn.timestamp();
        }
        else {
          const res = await this.db.insert('clipboard', ar[i]);
          bbn.fn.log("INSERTED", res);
        }

        this.items.unshift(ar[i]);
      }

      /*
      if (added.length) {
        bbn.fn.each(added, o => {
          bbn.fn.upload(
            'core/upload', {
              type: 'clipboard',
              file: o.data
            },
            // success
            res => bbn.fn.log("CLIPBOARD success", res),
            // failure
            res => bbn.fn.log("CLIPBOARD failure", res),
            // progress
            res => bbn.fn.log("CLIPBOARD progress", res)
          );
        });
        this.$emit('add', added);
      }
      */
      //this.$forceUpdate();
    },
    /**
     *
     * @method remove
     * @emits remove
     */
    removeItem(src) {
      let idx = bbn.fn.search(this.items, {
        uid: src.uid
      });
      if (idx > -1) {
        let e = new Event('remove', {
          cancelable: true
        });
        this.$emit('remove', e, this.items[idx]);
        if (!e.defaultPrevented) {
          this.items.splice(idx, 1);
          this.db.delete('clipboard', {uid: src.uid});
        }
      }
    },
    /**
     *
     *
     * @method getItem
     *
     */
    getItem(uid) {
      return bbn.fn.getRow(this.items, {
        uid: uid
      });
    },
    /**
     *
     * @fires getRef
     * @method updateSlider
     */
    updateSlider() {
      this.$nextTick(() => {
        this.getRef('slider').onResize();
      });
    },
    /**
     *
     * @fires remove
     * @method clear
     */
    clear() {
      this.confirm(bbn._('Are you sure you want to delete the whole content of the clipboard?'), () => {
        while (this.items.length) {
          this.removeItem(this.items[this.items.length - 1]);
        }
      });
    },
    /**
     *
     * @fires add
     * @fires updateSlider
     * @method copy
     * @return {Boolean}
     */
    copy(e) {
      let type = e.type;
      bbn.fn.getEventData(e).then(data => {
        this.add(data);
        this.updateSlider();
        bbn.fn.log("DATA FROM " + type, data);
      });
      return true;
    },
    /**
     *
     * @fires getRef
     * @fires getItem
     * @method setClipboard
     */
    setClipboard(uid, mode) {
      let item = this.getItem(uid);
      if (item) {
        let doIt = () => {
          this.uid = uid;
          this.mode = mode;
          this.isSetting = true;
          this.getRef('textarea').value = ' ';
          this.getRef('textarea').select();
          document.execCommand('copy');
        };
        if (item.file) {
          let reader = new FileReader();
          reader.onloadend = () => {
            this.file = reader.result;
            doIt();
          };
          reader.readAsBinaryString(item.file);
        } else {
          doIt();
        }
      }
    },
    /**
     * @fires getItem
     * @fires copy
     * @param {Object} e
     */
    onCopy(e) {
      bbn.fn.log("COPYYING", e, e.clipboardData);
      if (e.clipboardData && this.isSetting && this.uid) {
        let item = this.getItem(this.uid);
        if (item) {
          e.clipboardData.setData('text/plain', this.mode === 'html' ? item.content : item.text);
          //bbn.fn.log("ITEM IS FOUND");
          let v;
          switch (this.mode) {
            case 'html':
              e.clipboardData.setData('text/html', item.content);
              e.clipboardData.setData('text/plain', item.text || item.content);
              break;
            case 'image':
              //bbn.fn.log("IMAGE!", item.type);
              if (item.file) {
                e.clipboardData.setData(item.type, item.file);
                e.clipboardData.setData('text/html', '<img src="data:' + item.type + ';base64, ' + btoa(item.file) + '" alt="' + item.text + '">');
                e.clipboardData.setData('text/plain', item.text);
              }
              break;
            case 'file':
              //bbn.fn.log(this.file);
              if (this.file) {
                e.clipboardData.setData(item.type, this.file);
              }
              break;
          }
          //bbn.fn.log("SETTING " + item.text);
          //bbn.fn.log(e.clipboardData.items, e.clipboardData.items[0], e.clipboardData.items.length);
          //e.preventDefault();
          /*
          bbn.fn.each(e.clipboardData.items, item => {
            bbn.fn.log("ITEM FROM THE CLIPBOARD OFFICIAL", item);
            navigator.clipboard.write(item).then(() => {
              bbn.fn.log("WRITE OPERATION ON CLIPBOARD OK");
            });
          });
          */
        }
        this.isSetting = false;
        this.uid = null;
        this.file = null;
      } else {
        this.copy(e);
      }
    },
    /**
     * @method addInput
     * @fires getRed
     * @fires add
     */
    addInput() {
      let input = this.getRef('paster');
      if (input && input.value) {
        this.add({
          raw: input.value
        });
        input.value = '';
      }
    }
  },
  /**
   * @method created
   */
  async created() {
    const items = [];
    if (bbnClipboard.db) {
      this.db = await bbn.db.open('bbn');
      const dbItems = await this.db.selectAll('clipboard');
      if (dbItems?.length) {
        items.push(...dbItems.reverse());
      }
    }

    if (items.length && !this.items?.length) {
      this.items = items;
    }
  },
  /**
   * @event mounted
   */
  mounted() {
    document.addEventListener('copy', this.onCopy);
  },
  /**
   * @event beforeDestroy
   */
  beforeDestroy() {
    document.removeEventListener('copy', this.onCopy);
  },
  watch: {
    /**
     * @watch items
     * @fires remove
     * @fires alert
     * @emits copy
     */
    items() {
      if (this.ready && !this.isUpdatingClipboard) {
        this.isUpdatingClipboard = true;
        if (this.items.length > this.max) {
          let i;
          for (i = this.items.length - 1; i >= 0; i--) {
            if (!this.items[i].pinned) {
              this.removeItem({
                uid: this.items[i].uid
              });
              if (this.items.length === this.max) {
                break;
              }
            }
          }

          if (!i && (this.items.length > this.max)) {
            this.removeItem({
              uid: this.items[0].uid
            });
            this.alert(bbn._("Limit reached, unpin elements to add new ones"));
            return;
          }
        }

        this.$emit('copy');
        this.isUpdatingClipboard = false;
      }
    },
    /**
     * @watch search
     */
    search(val) {
      if (val.length >= 3) {
        let res = [];
        res = bbn.fn.filter(this.items, a => {
          if (a.text.toLowerCase().indexOf(this.search.toLowerCase()) >= 0) {
            return a
          }
        })
        this.items = res;
      } else {
        this.items = this.source;
      }
    }
  }
};

import cpHtml from './clipboard.html';
import cpStyle from './clipboard.less';
import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-clipboard',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
