import bbn from '@bbn/bbn';

const list = {
  props: {
    /**
     * A function to transform the data.
     * @prop {Function} map
     * @memberof listComponent
     */
    map: {
      type: Function
    },
    /**
     * The limit of rows to be shown in a page of the list.
     * @prop {Number} [25] limit
     * @memberof listComponent
     */
    limit: {
      type: Number,
      default: 25
    },
    /**
     * The array of predefined limits.
     * @data {Array} {[10, 25, 50, 100, 250, 500]} limits
     * @memberof listComponent
     */
    limits: {
      type: Array,
      default() {
        return [10, 25, 50, 100, 250, 500];
      },
    },
    /**
     * Set to true will automatically update the data before mount.
     * @prop {Boolean} [false] autobind
     * @memberof listComponent
     */
    autobind: {
      type: Boolean,
      default: true
    },
    /**
     * Set to true allows the list to divide itself in different pages basing on the property limit.
     * @prop {Boolean} [false] pageable
     * @memberof listComponent
     */
    pageable: {
      type: Boolean,
      default: false
    },
    /**
     * Set to true allows list's columns to be sortable.
     * @prop {Boolean} [false] sortable
     * @memberof listComponent
     */
    sortable: {
      type: Boolean,
      default: false
    },
    /**
     * Set to true allows the columns of the list to be filtered. A filter icon will appear at the top of each column.The property can be given to each column to define different behaviour.
     * @prop {Boolean} [false] filterable
     * @memberof listComponent
     */
    filterable: {
      type: Boolean,
      default: false
    },
    /**
     * Set to true enable the multifilter of the component. An icon will appear on the bottom right of the list. By clicking on the icon a popup with the multifilter will open.
     * @prop {Boolean} [false] multifilter
     * @memberof listComponent
     */
    multifilter: {
      type: Boolean,
      default: false
    },
    /**
     * In case of Ajax source, set to true will make an Ajax call for the data when changing page of the list.
     * @prop {Boolean} [true] serverPaging
     * @memberof listComponent
     */
    serverPaging: {
      type: Boolean,
      default: true
    },
    /**
     * In case of Ajax source, set to true will make an Ajax call for the sorting of the list.
     * @prop {Boolean} [true] serverSorting
     * @memberof listComponent
     */
    serverSorting: {
      type: Boolean,
      default: true
    },
    /**
     * In case of Ajax source, set to true will make an Ajax call for the filter of the list.
     * @prop {Boolean} [true] serverFiltering
     * @memberof listComponent
     */
    serverFiltering: {
      type: Boolean,
      default: true
    },
    /**
     * Defines the order of the columns in the component.
     * @prop {Array|Object} [[]] order
     * @memberof listComponent
     */
    order: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    /**
     * Defines the filters of the component.
     * @prop {Object} [{logic: 'AND',conditions: []}] filters
     * @memberof listComponent
     */
    filters: {
      type: Object,
      default() {
        return {
          logic: 'AND',
          conditions: []
        };
      }
    },
    /**
     * If the prop selection is set to true defines which items has to be selected.
     * @prop {Array} selected
     * @memberof listComponent
     */
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * Set to true shows a checkbox in each rows in the first column of the list.
     * @prop {Boolean|Function} selection
     * @memberof listComponent
     */
    selection: {
      type: [Boolean, Function],
      default: false
    },
    /**
     * Set to true selecting an item will unselect any other selected item.
     * @prop {Boolean} multiple
     * @memberof listComponent
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Given to a column that has the property type set to 'money' defines the currency.
     * @prop {String} currency
     * @memberof listComponent
     */
    currency: {
      type: String
    },
    /**
     * The data sent in the ajax call.
     * @prop {String|Function} [{}] data
     * @memberof listComponent
     */
    data: {
      type: [Object, Function],
      default() {
        return {};
      }
    },
    /**
     * Defines the message to show when the list has no data.
     * @prop {String} ['No data...'] noData
     * @memberof listComponent
     */
    noData: {
      type: String,
      default(){
        return bbn._('No data') + '...';
      }
    },
    /**
     * The uid of the list.
     * @prop {String} uid
     */
    uid: {
      type: String
    },
    /**
     * The source of the component.
     * @prop {Array|Object|String|Function} source
     * @memberof listComponent
     */
    source: {
      type: [Array, Object, String, Function]
    },
    /**
     * The name of the property to be used as text.
     * @prop {String} ['text'] sourceText
     * @memberof listComponent
     */
    sourceText: {
      type: String,
      default: "text"
    },
    /**
     * The name of the property to be used as value.
     * @prop {String} ['value'] sourceValue
     * @memberof listComponent
     */
    sourceValue: {
      type: String,
      default: "value"
    },
    /**
     * If source is a function this index can be passed to the function.
     * @prop {Number} sourceIndex
     * @memberof listComponent
     */
    sourceIndex: {
      type: Number
    },
    /**
     * The name of the property to be used as icon.
     * @prop {String} sourceIcon
     * @memberof listComponent
     */
    sourceIcon: {
      type: String
    },
    /**
     * The name of the property to be used as image.
     * @prop {String} sourceImg
     * @memberof listComponent
     */
    sourceImg: {
      type: String
    },
    /**
     * The name of the property to be used as class.
     * @prop {String} sourceCls
     * @memberof listComponent
     */
    sourceCls: {
      type: String
    },
    /**
     * The name of the property to be used as action to execute when selected.
     * @prop {String} sourceAction
     * @memberof listComponent
     */
    sourceAction: {
      type: [String, Function]
    },
    /**
     * The name of the property to be used as URL to go to when selected.
     * @prop {String} sourceVisible
     * @memberof listComponent
     */
    sourceVisible: {
      type: [String, Boolean],
      default: false
    },
    /**
     * The name of the property to be used as URL to go to when selected.
     * @prop {String} sourceUrl
     * @memberof listComponent
     */
    sourceUrl: {
      type: [String, Boolean],
      default: 'url'
    },
    /**
     * The name of the property to use for children of hierarchical source
     * @prop {String} [items] children
     * @memberof listComponent
     */
    sourceItems: {
      type: String,
      default: 'items'
    },
    /**
     * The mode of the component.
     * Possible values: 'free', 'options', 'selection'.
     * @prop {String} ['free'] mode
     */
    mode: {
      type: String,
      default: "free",
      validator: m => ['free', 'options', 'selection'].includes(m)
    },
    /**
     * A component for each element of the list.
     * @memberof listComponent
     * @prop {String|Object|HTMLElement} component
     */
    component: {
      type: [String, Object, HTMLElement]
    },
    /**
     * A component to show if items is empty
     * @prop {String|Object} noDataComponent
     */
    noDataComponent: {
      type: [String, Object]
    },
    /**
     * The template to costumize the dropdown menu.
     * @memberof listComponent
     * @prop template
     */
    template: {},
    /**
     * @prop {String} query
     * @memberof listComponent
     */
    query: {
      type: String
    },
    /**
     * The query values object.
     * @prop {Object} queryValues
     * @memberof listComponent
     */
    queryValues: {
      type: Object
    },
    /**
     * @prop {Object} hierarchy
     * @memberof listComponent
     */
    hierarchy: {
      type: Boolean,
      default: false
    },
    /** 
     *  The tree will be shown on one level, with .. at the top, clicking an element with children will enter it
     */
    flat: {
      type: Boolean,
      default: false
    },
    /**
     * Enables the search mode
     * @prop {Boolean} [false] search
     */
    search: {
      type: Boolean,
      default: false
    },
    /**
     * Sets the placeholder in the search field
     * @prop {String} ["Search"] searchPlaceholder
     */
    searchPlaceholder: {
      type: String,
      default: bbn._("Search")
    },
    /**
     * @todo not used in the component
     */
    searchFields: {
      type: Array
    },
    /**
     * The operator used by filterString filter
     * @prop {String} ['startswith'] searchOperator
     */
    searchOperator: {
      type: String,
      default: 'startswith'
    }
  },
  data() {
    let order = this.order;
    if (this.sortable && this.order && (typeof this.order === 'object') && !Array.isArray(this.order)) {
      order = [];
      for (let n in this.order) {
        order.push({
          field: n,
          dir: this.order[n]
        });
      }
    }
    return {
      /**
       * If true it's the first time the data is loaded.
       * @data {Boolean} [false] _1strun
       * @memberof listComponent
       */
      _1strun: false,
      /**
       * _dataPromise
       * @memberof listComponent
       * @data {Boolean, Promise} [false] _dataPromise
       */
      _dataPromise: false,
      /**
       * If source is a URL and auto is set to true, component will fetch data at mount.
       * @data {Boolean} [false] auto 
       * @memberof listComponent
       */
      auto: true,
      /**
       * The current template of the component.
       * @data {String} [false] currentTemplate
       * @memberof listComponent
       */
      currentTemplate: this.template,
      /**
       * The current component of the component.
       * @data {String|HTMLElement|Object} [false] currentComponent
       * @memberof listComponent
       */
      currentComponent: this.component || null,
      /**
       * 
       * @data {Boolean} [false] currentIndex
       * @memberof listComponent
       */
      currentIndex: false,
      /**
       * @data {Boolean} [false] currentFilter
       * @memberof listComponent
       */
      currentFilter: false,
      /**
       * The current filters of the list.
       * @memberof listComponent
       * @data {Object} currentFilters
       */
      currentFilters: bbn.fn.clone(this.filters),
      /**
       * The current limit of items in the list.
       * @memberof listComponent
       * @data {Number} [25] currentLimit
       */
      currentLimit: this.limit,
      /**
       * The current start index of the list.
       * @memberof listComponent
       * @data {Number} [0] currentStart
       */
      currentStart: this.start,
      /**
       * The current order of the list.
       * @memberof listComponent
       * @data {Object} currentOrder
       */
      currentOrder: order,
      /**
       * The current data of the list.
       * @memberof listComponent
       * @data {Array} [[]] currentData
       */
      currentData: [],
      /**
       * The current total of items in the list.
       * @memberof listComponent
       * @data {Number} [0] currentTotal
       */
      currentTotal: 0,
      /**
       * The start index.
       * @data {Number} [0] start
       * @memberof listComponent
       */
      start: 0,
      /**
       * The total of items in the list. 
       * @data {Number} [0] total
       * @memberof listComponent
       */
      total: 0,
      /**
       * True if the list is loading data.
       * @data {Boolean} [false] isLoading
       * @memberof listComponent 
       */
      isLoading: false,
      /**
       * True if the list has been loaded.
       * @data {Boolean} [false] isLoaded
       * @memberof listComponent 
       */
      isLoaded: typeof this.source !== 'string',
      /**
       * True if the source of the list is a string.
       * @data {Boolean} isAjax
       * @memberof listComponent 
       */
      isAjax: typeof this.source === 'string',
      /**
       * @todo change name
       * @data {Array} [[]] selectedRows
       */
      currentSelected: this.selected.slice(),
      /**
       * True if the list is filterable.
       * @data {Boolean} [false] isFilterable
       * @memberof listComponent
       */
      isFilterable: this.filterable,
      /**
       * True if the list has selection enabled.
       * @data {Boolean} [false] hasSelection
       */
      hasSelection: !!this.selection,
      /**
       * The original data of the list.
       * @data [null] originalData
       * @memberof listComponent
       */
      originalData: null,
      /**
       * @data {String} filterString
       * @memberof listComponent
       */
      filterString: this.textValue || '',
      /**
       * @memberof listComponent
       * @data {false, Number} filterTimeout
       */
      filterTimeout: false,
      /**
       * The current query.
       * @data {String} currentQuery
       * @memberof listComponent
       */
      currentQuery: this.query,
      /**
       * The current query values.
       * @data {Object} currentQueryValues
       * @memberof listComponent 
       */
      currentQueryValues: this.queryValues || {},
      /**
       * The id of the loading request.
       * @data {Boolean} [false] loadingRequestID
       * @memberof listComponent 
       */
      loadingRequestID: false,
      /**
       * If hirarchy and uid and flat will be set to the last entered node UID
       * @data {false|String} the UID of the last entered node
       */
      parentUid: false,
      /**
       * @data {null|String} An ID given with the search results
       */
      searchId: null,
      /**
       * @data {String} [''] searchValue
       */
      searchValue: ''
    };
  },
  computed: {
    /**
     * The current limits.
     * @computed currentLimits
     * @memberof listComponent
     */
    currentLimits() {
      if (!this.pageable) {
        return [];
      }

      let pass = false;
      return bbn.fn.filter(this.limits.sort(), a => {
        if (a > this.total) {
          if (!pass) {
            pass = true;
            return true;
          }
          return false;
        }
        return true;
      });
    },
    /**
     * Returns true if a component has been defined for the list.
     * @computed hasComponent
     * @memberof listComponent
     */
    hasComponent() {
      return (bbn.fn.isString(this.component) || (bbn.fn.isObject(this.component) && Object.keys(this.component).length)) || this.currentTemplate ? true : false;
    },
    /**
     * Returns the component object. 
     * @computed realComponent
     * @memberof listComponent
     */
    realComponent() {
      let cp = bbn.fn.isString(this.component) || (bbn.fn.isObject(this.component) && Object.keys(this.component).length) ? this.component : null;
      if (!cp && this.currentTemplate) {
        cp = bbn.cp.normalizeComponent({
          props: ['source'],
          template: this.currentTemplate
        });
      }

      return cp;
    },
    /**
     * Return the number of pages of the list.
     * @computed numPages
     * @memberof listComponent
     * @return {number}
     */
    numPages() {
      if (this.isAjax) {
        return Math.ceil(this.total / this.currentLimit);
      }

      return Math.ceil(this.filteredTotal / this.currentLimit);
    },
    /**
     * Return the current page of the list.
     * @computed currentPage
     * @memberof listComponent
     * @fires updateData
     * @return {Number}
     */
    currentPage: {
      get() {
        return Math.ceil((this.start + 1) / this.currentLimit);
      },
      set(val) {
        if (this.ready) {
          this.start = val > 1 ? (val - 1) * this.currentLimit : 0;
          this.updateData(!this.serverPaging);
        }
      }
    },
    filteredData() {
      if (this.currentData.length && this.currentFilters &&
        this.currentFilters.conditions &&
        this.currentFilters.conditions.length &&
        (!this.serverFiltering || !this.isAjax)
      ) {
        return bbn.fn.filter(this.currentData, a => {
          return this._checkConditionsOnItem(this.currentFilters, a.data);
        });
      }
      else {
        return this.currentData;
      }
    },
    filteredTotal() {
      return this.filteredData.length;
    },
    /** @todo Remove: no sense and not used in any component */
    valueIndex() {
      if (this.value || (this.selected && this.selected.length)) {
        let v = this.value || this.selected[0];
        if (this.uid) {
          return bbn.fn.search(this.filteredData, a => {
            return a.data[this.uid] === v;
          });
        }
        else if (this.sourceValue) {
          return bbn.fn.search(this.filteredData, a => {
            return a.data[this.sourceValue] === v;
          });
        }
      }
      return -1;
    },
    isAutobind() {
      if (
        (this.autobind === false) ||
        (this.isAjax && this.autocomplete && (this.filterString.length < this.minLength))
      ) {
        return false;
      }
      return true;
    },
    hashCfg() {
      return bbn.fn.hash(JSON.stringify(this.currentFilters) + JSON.stringify(this.currentLimit) + JSON.stringify(this.start) + JSON.stringify(this.currentOrder));
    },
    /**
     * Returns the current item icon
     * @computed currentItemIcon
     * @memberof listComponent
     * @return {String}
     */
    currentItem() {
      if ((this.value !== undefined)
        && !bbn.fn.isNull(this.value)
        && this.sourceValue
        && this.currentData.length
      ) {
        let idx = bbn.fn.search(this.currentData, a => {
          return bbn.fn.getProperty(a.data, this.sourceValue) === this.value;
        });
        if (idx > -1) {
          return this.currentData[idx].data;
        }
      }

      return null;
    },
    /**
     * Returns the current item icon
     * @computed currentItemIcon
     * @memberof listComponent
     * @return {String}
     */
    currentItemIcon() {
      if (this.currentItem && this.sourceIcon) {
        return this.currentItem[this.sourceIcon];
      }

      return '';
    },
    /**
     * Returns the current item image
     * @computed currentItemImg
     * @memberof listComponent
     * @return {String}
     */
    currentItemImg() {
      if (this.currentItem && this.sourceImg) {
        return this.currentItem[this.sourceImg];
      }

      return '';
    },
    /**
     * Returns the current item class
     * @computed currentItemCls
     * @memberof listComponent
     * @return {String}
     */
    currentItemCls() {
      if (this.currentItem && this.sourceCls) {
        return this.currentItem[this.sourceCls];
      }

      return '';
    }
  },
  methods: {
    /**
     * Returns the data changed using the function given in the prop map.
     * @method _map
     * @param data
     */
    _map(data) {
      if ( bbn.fn.isArray(data) ){
        if ( data.length && !bbn.fn.isObject(data[0]) && !bbn.fn.isArray(data[0]) && this.sourceValue && this.sourceText ){
          data = data.map(a => {
            let o = {};
            o[this.sourceValue] = a;
                o[this.sourceText] = a;
            return o;
          });
        }

        return (this.map ? data.map(this.map) : data).slice();
      }
      return [];
    },
    /**
     * Compares the values of the given row basing on the where operator and value.
     *  
     * @method _checkConditionsOnItem
     * @param {Object} where 
     * @param {Object} row 
     * @return {Boolean}
     */
    _checkConditionsOnItem(where, row) {
      let pass = false;
      if (where.conditions && where.logic && (typeof row === 'object')) {
        pass = where.logic !== 'OR';
        for (let i = 0; i < where.conditions.length; i++) {
          let cond = where.conditions[i],
            res = true;
          if (cond.conditions && cond.logic) {
            res = this._checkConditionsOnItem(cond, row);
          }
          else if (cond.field && cond.operator) {
            res = bbn.fn.compare(row[cond.field], cond.value !== undefined ? cond.value : null, cond.operator);
          }
          if (!res && where.logic !== 'OR') {
            pass = false;
            break;
          }
          else if (res && where.logic === 'OR') {
            pass = true;
            break;
          }
        }
      }
      return pass;
    },
    /**
     * Checks if the field's name is valid (0 must be accepted)
     *
     * @param {*} field
     * @return {*} 
     */
    isValidField(field) {
      return bbn.fn.isString(field) || bbn.fn.isNumber(field);
    },
    /**
      * @method select
      */
    select() {
      //this.$emit('select', this.currentIndex);
    },
    /**
      * Pushes the given filter in the currentFilters of the list.
      * @method onSetFilter
      * @param {Object} filter 
      */
    onSetFilter(filter) {
      if (filter && filter.field && filter.operator) {
        if (this.multi) {
          this.currentFilters.conditions.push(filter);
        }
        else if (filter.field) {
          let idx = bbn.fn.search(this.currentFilters.conditions, {
            field: filter.field
          });
          if (idx > -1) {
            this.currentFilters.conditions.splice(idx, 1, filter);
          }
          else {
            this.currentFilters.conditions.push(filter);
          }
        }
      }
    },
    /**
      * Fires the method removeFilter to remove a group of conditions from currentFilters.
      * @method onUnsetFilter
      * @param {Object} filter
      * @fires removeFilter
      */
    onUnsetFilter(filter) {
      //bbn.fn.log("onUnset", filter);
      this.removeFilter(filter);
    },
    /**
      * Removes a group of conditions from currentFilters.
      * @method removeFilter
      * @param {Object} condition
      * @fires getPopup
      */
    removeFilter(condition) {
      if (condition.time) {
        //bbn.fn.log("There is the time", condition);
        let del = arr => {
          let idx = bbn.fn.search(arr, {
            time: condition.time
          });
          //bbn.fn.log("Is there the index?", idx);
          if (idx > -1) {
            if (arr[idx].conditions && arr[idx].conditions.length) {
              this.getPopup().confirm(bbn._("Are you sure you want to delete this group of conditions?"), () => {
                arr.splice(idx, 1);
                if (window.appui) {
                  window.appui.success();
                }
              })
            }
            else {
              arr.splice(idx, 1);
              if (window.appui) {
                window.appui.success();
              }
            }
            return true;
          }
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].conditions) {
              if (del(arr[i].conditions)) {
                return true;
              }
            }
          }
        };
        if (del(this.currentFilters.conditions)) {
          this.$forceUpdate();
        }
      }
    },
    /**
      * Unsets the current filter.
      * @method unsetFilter
      */
    unsetFilter() {
      this.currentFilters = bbn.fn.clone(this.filters);
      this.currentFilter = false;
      this.editedFilter = false;
    },
    /**
      * Unsets the current filter.
      * @method unsetCurrentFilter
      * 
      */
    unsetCurrentFilter() {
      if (this.editedFilter) {
        let idx = bbn.fn.search(this.currentFilters.conditions, {
          time: this.editedFilter.time
        });
        if (idx > -1) {
          this.currentFilters.conditions.splice(idx, 1)
        }
      }
    },
    getPostData() {
      if (this.data) {
        return bbn.fn.isFunction(this.data) ? this.data() : this.data;
      }
      return {};
    },
    beforeUpdate() {
      let e = new Event('beforeupdate', { cancelable: true });
      this.$emit('beforeupdate', e);
      return e.defaultPrevented ? false : true;
    },
    afterUpdate() {
      return true;
    },
    getData() {
      let data = {
        limit: this.currentLimit,
        start: this.start,
        data: this.getPostData()
      };
      if (this.sortable) {
        data.order = this.currentOrder;
      }
      if (this.isFilterable) {
        data.filters = this.currentFilters;
      }
      if (this.showable) {
        data.fields = this.shownFields;
      }
      return data;
    },
    treatData(data) {
      if (this.parentUid && this.hierarchy && this.flat && this.uid) {
        data.unshift({
          [this.uid]: this.parentUid,
          [this.sourceText]: ".."
        });
      }
      data = this._map(data);
      return bbn.fn.map(data, (a, i) => {
        /** @todo Is it compatible with the fact of updating the source when given an array */
        let o = this.hierarchy ? bbn.fn.extend(a, {
          index: i,
          key: this.uid ? a[this.uid] : (this.isAjax ? (i.toString() + '-' + this.hashCfg) : i),
          _bbn: true
        }) : {
          data: a,
          index: i,
          key: this.uid ? a[this.uid] : (this.isAjax ? (i.toString() + '-' + this.hashCfg) : i),
          _bbn: true
        };

        if (this.sourceItems && a[this.sourceItems] && a[this.sourceItems].length) {
          o.opened = true;
        }
        if (this.hasSelection) {
          if (this.uid) {
            o.selected = this.selected.includes(a[this.uid]);
          }
          else if ( this.sourceValue ){
            o.selected = this.selected.includes(a[this.sourceValue]);
          }
        }
        return o;
      });
    },
    async updateData(preventLoad) {
      if (this.beforeUpdate() !== false) {
        this._dataPromise = new Promise(resolve => {
          let prom;
          let loadingRequestID;
          if (this.currentData.length) {
            this.currentData.splice(0);
          }

          if (this.isAjax) {
            if (this.loadingRequestID) {
              bbn.fn.abort(this.loadingRequestID);
              setTimeout(() => {
                this.loadingRequestID = false;
                this.updateData().then(() => {
                  resolve();
                })
              }, 50);
              return;
            }

            if (this._1strun && (preventLoad === true)) {
              prom = new Promise((resolve) => {
                setTimeout(() => {
                  resolve({
                    data: this.currentData,
                    total: this.currentTotal
                  })
                })
              })

            }
            else {
              this.isLoading = true;
              this.$emit('startloading');
              let data = this.getData();
              loadingRequestID = bbn.fn.getRequestId(this.source, data);
              this.loadingRequestID = loadingRequestID;
              prom = this.post(this.source, data);
            }

          }
          else {
            prom = new Promise((resolve2) => {
              let data = [];
              if (bbn.fn.isArray(this.source)) {
                data = this.source;
              }
              else if (bbn.fn.isFunction(this.source)) {
                data = this.source(this.sourceIndex, this.data);
              }
              else if (bbn.fn.isObject(this.source)) {
                bbn.fn.iterate(this.source, (a, n) => {
                  let o = {};
                  o[this.sourceValue] = n;
                      o[this.sourceText] = a;
                  data.push(o);
                });
              }
              resolve2({
                data: data,
                total: data.length
              });
            });
          }
          prom.then(d => {
            if (this.isAjax) {
              if (!this.loadingRequestID || (this.loadingRequestID !== loadingRequestID)) {
                return;
                this.isLoading = false;
                this.loadingRequestID = false;
                throw new Error("No loading request");
              }

              this.isLoading = false;
              this.loadingRequestID = false;

              if (!d) {
                return;
              }

              if (d.status !== 200) {
                d.data = undefined;
              }
              else {
                d = d.data;
              }

              this.$emit('datareceived', d);
            }

            if (d && bbn.fn.isArray(d.data)) {
              if (d.data.length && d.data[0]._bbn) {
                this.currentData = d.data;
                this.updateIndexes();
              }
              else {
                this.currentData = this.treatData(d.data);
              }
              if (d.query) {
                this.currentQuery = d.query;
                this.currentQueryValues = d.queryValues || {};
              }
              if (d.order) {
                this.currentOrder.splice(0, this.currentOrder.length);
                this.currentOrder.push({
                  field: d.order,
                  dir: (d.dir || '').toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
                });
              }
              this.total = d.total || this.filteredData.length;
              /** @todo Observer part to dissociate */
              if (d.observer && bbn.fn.isFunction(this.observerCheck) && this.observerCheck()) {
                this._observerReceived = d.observer.value;
                this.observerID = d.observer.id;
                this.observerValue = d.observer.value;
                if (!this._1strun) {
                  this.observerWatch();
                }
              }
              if (!this._1strun) {
                this._1strun = true;
                this.$emit('firstrun');
              }
            }
            this.afterUpdate();
            resolve(this.currentData);
            if (!this.isLoaded) {
              this.isLoaded = true;
            }

            this.$emit('dataloaded', d);
          });
        }).catch(e => {
          bbn.fn.log("Better catching should be done here");
          this.isLoading = false;
          this.loadingRequestID = false;
        });
        return this._dataPromise;
      }
    },
    updateIndexes() {
      if (this.currentData.length) {
        bbn.fn.each(this.currentData, (a, i) => {
          if (a.index !== i) {
            this.$set(this.currentData[i], 'index', i);
            //a.index = i;
          }
        });
      }
    },
    /**
      * Deletes all the current data from the view.
      * @method realDelete
      * @emit delete
      * @param {Number} index
      */
    emptyData() {
      if (this.currentData) {
        this.currentData.splice(0, this.currentData.length);
      }
    },
    /**
      * Deletes the row defined by param index.
      * @method realDelete
      * @emit delete
      * @param {Number} index
      */
    realDelete(index) {
      if (this.currentData[index]) {
        let ev = new Event('delete');
        if (this.url) {
          this.post(this.url, bbn.fn.extend({}, this.data, this.currentData[index].data, {
            action: 'delete'
          }), d => {
            if (d.success) {
              let data = this.currentData[index].data;
              this.currentData.splice(index, 1);
              if (!this.isAjax && bbn.fn.isArray(this.source)) {
                let idx = bbn.fn.search(this.source, data);
                if (idx > -1) {
                  this.source.splice(idx, 1);
                }
              }

              this.total--;
              this.updateIndexes();
              this.$emit('delete', data, ev);
              if (window.appui) {
                window.appui.success(bbn._('Deleted successfully'))
              }
            }
            else {
              this.alert(bbn._("Impossible to delete the row"))
            }
          })
        }
        else {
          let data = this.currentData[index].data;
          this.currentData.splice(index, 1);
          if (!this.isAjax && bbn.fn.isArray(this.source)) {
            let idx = bbn.fn.search(this.source, data);
            if (idx > -1) {
              this.source.splice(idx, 1);
            }
          }

          this.total--;
          if (this.originalData) {
            this.originalData.splice(index, 1);
          }
          this.updateIndexes();
          this.$emit('delete', data, ev);
        }
      }
    },
    /**
      * Add the given row to currentData
      * @method add
      * @param {Object} data
      * @todo
      *
      */
    add(data) {
      this.currentData.push({
        data: data,
        index: this.currentData.length
      });
      if (!this.isAjax && bbn.fn.isArray(this.source)) {
        this.source.push(data);
      }
    },
    /**
      * Fires the method realDelete to delete the row.
      * @method delete
      * @param {Number} index
      * @param {String} confirm
      * @fires realDelete
      * @emit beforedelete
      */
    deleteItem(index, confirm) {
      if (this.filteredData[index]) {
        let ev = new Event('delete', { cancelable: true });
        this.$emit('beforedelete', index, this.filteredData[index].data, this, ev);
        if (!ev.defaultPrevented) {
          if (confirm === undefined) {
            confirm = this.confirmMessage;
          }
          if (confirm) {
            this.confirm(confirm, () => {
              this.realDelete(this.filteredData[index].index);
            });
          }
          else {
            this.realDelete(this.filteredData[index].index);
          }
        }
      }
    },
    /**
      * Fires the metod updateData to refresh the current data set.
      * @method reload
      * @fires updateData
      */
    reload() {
      return this.updateData();
    },
    getIndex(filter) {
      if (!bbn.fn.isObject(filter) && this.uid) {
        filter = { [this.uid]: filter };
      }
      let fltr = bbn.fn.filterToConditions(filter);
      let idx = -1;

      bbn.fn.each(this.filteredData, (a, i) => {
        if (bbn.fn.compareConditions(a.data, fltr)) {
          idx = i;
          return false;
        }
      });
      return idx;
    },
    /**
      * Removes the row defined by the where param from currentData
      * @method remove
      * @param {Object} where
      */
    removeItem(where) {
      let idx;
      while ((idx = bbn.fn.search(this.filteredData, a => {
        return bbn.fn.compareConditions(a.data, where);
      })) > -1) {
        this.realDelete(this.filteredData[idx].index, 1);
      }
      this.$forceUpdate();
    },
    listOnBeforeMount() {
      if (this.isAutobind) {
        this.updateData();
      }
    }
  },
  beforeMount() {
    this.listOnBeforeMount();
  },
  created() {
    if (!this.component && !this.template && this.$slots.default.length) {
      if (this.$slots.default[0].bbnSchema.pre) {
        this.currentTemplate = this.$slots.default[0].bbnSchema.pre.content;
      }
    }

    this.currentComponent = this.realComponent;
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.currentFilters = bbn.fn.clone(this.filters)
      }
    },
    /**
      * @watch currentLimit
      * @fires setConfig
      */
    currentLimit() {
      if (this.ready && bbn.fn.isFunction(this.setConfig)) {
        this.setConfig(true);
      }
    },
    /**
      * @watch currentFilters
      * @fires updateData
      * @fires setConfig
      */
    currentFilters: {
      deep: true,
      handler() {
        if (this.ready) {
          this.currentFilter = false;
          if (this.pageable && this.start) {
            this.start = 0;
          }

          if (this.autobind) {
            this.updateData();
          }

          if (bbn.fn.isFunction(this.setConfig)) {
            this.setConfig(true);
          }
        }
      }
    },
    /**
      * @watch currentOrder
      * @fires setConfig
      */
    currentOrder: {
      deep: true,
      handler() {
        if (this.ready) {
          if (bbn.fn.isFunction(this.setConfig)) {
            this.setConfig(true);
          }
          this.$forceUpdate();
        }
      }
    },
    source() {
      if (this.ready && !this.editable) {
        //bbn.fn.log("WATCH SOURce from list")
        this.updateData();
      }
    },
    /**
      * 
      */
    searchValue(v) {
      if (this.search) {
        this.unsetFilter();
        if (v) {
          let cond = [];
          if (this.searchFields) {
            bbn.fn.each(this.searchFields, a => {
              cond.push({
                field: a,
                operator: 'contains',
                value: v
              });
            });
          }
          else {
            bbn.fn.each(this.cols, a => {
              if (a.field && !bbn.fn.getRow(cond, { field: a.field })) {
                cond.push({
                  field: a.field,
                  operator: 'contains',
                  value: v
                });
              }
            });
          }
          this.currentFilters.conditions.push({
            logic: 'OR',
            conditions: cond
          });
        }
      }
    }
  }
};

export default list;
