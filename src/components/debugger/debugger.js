/**
 * @file bbn-debugger component
 *
 * @description bbn-debugger is a component that allows the user to debug another component by showing in real time its different props/data/computed.
 *
 * @copyright BBN Solutions
 *
 * @author Thomas Nabet
 */
const cpDef = {
    /**
     * @mixin bbn.cp.mixins.basic
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.localStorage,
    ],
    props: {
      origin: {
        type: HTMLElement,
        default() {
          return this.$origin;
        }
      },
      storage: {
        default: true,
        type: Boolean
      },
      storageFullName: {
        type: String,
        default() {
          return 'bbn-debugger-' + this.$node.uid;
        }
      }
    },
    data(){
      return {
        availableKeys: {
          props: [],
          data: [],
          computed: []
        },
        selectedKeys: [],
        isVisible: false,
        isRunning: false,
        isSetting: false,
        json: ''
      }
    },
    computed: {
      currentStyle() {
        return {
          position: 'absolute',
          top: '20px',
          left: '20px',
          overflow: 'visible',
          'z-index': 999
        }
      }
    },
    methods: {
      toggle() {
        if (this.isVisible) {
          this.isVisible = false;
          //bbn.fn.iterate(this.availableKeys, a => a.splice(0));
        }
        else {
          if (!this.isRunning) {
            this.isRunning = true;
            this.setAvailableKeys();
          }

          this.isVisible = true;
        }
      },
      setAvailableKeys() {
        if (this.origin) {
          const listsAZ = {};
          this.isSetting = true;
          bbn.fn.iterate(Object.keys(this.origin.$namespaces).sort(), name => {
            const type = this.origin.$namespaces[name];
            if (type in this.availableKeys) {
              if (!listsAZ[type]) {
                listsAZ[type] = [];
              }
              listsAZ[type].push(name);
            }
          });

          bbn.fn.iterate(listsAZ, (names, type) => {
            this.availableKeys[type].splice(0);
            this.availableKeys[type].push(...names);
          });
          const data = this.getStorage();
          if (data?.length) {
            this.selectedKeys.splice(0);
            this.selectedKeys.push(...data);
            this.updateData();
          }
          this.isSetting = false;
        }
      },
      updateData() {
        bbn.fn.log("UPDATE DATA", this.selectedKeys);
        const data = {};
        const arr = this.selectedKeys.slice().sort();
        bbn.fn.each(arr, k => {
          if (bbn.fn.isPrimitive(this.origin[k]) || !(this.origin[k] instanceof Element)) {
            data[k] = this.origin[k];
          }
        });
        if (bbn.fn.numProperties(data)) {
          this.json = JSON.stringify(data);
          this.setStorage(arr);
        }
        else {
          this.unsetStorage();
          this.json = '';
        }
      },
      select(name) {
        bbn.fn.log("SELECT", name, this.selectedKeys);
        if (this.selectedKeys.includes(name)) {
          this.selectedKeys.splice(this.selectedKeys.indexOf(name), 1);
        }
        else {
          this.selectedKeys.push(name);
        }
        this.updateData();
      }
    },
    /**
     * @event beforeCreate
     */
    beforeCreate() {
      if (this.origin) {


      }
    },
    /**
     * @event mounted
     *
     */
    mounted() {
      this.ready = true;
    },
  };

import cpHtml from './debugger.html';
import cpStyle from './debugger.less';
import cpLang from './_i18n/index.js';
import position from '../../mixins/position.js';

export default {
  name: 'bbn-debugger',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
