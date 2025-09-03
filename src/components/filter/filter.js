 /**
  * @file bbn-filter component
  *
  * @description The purpose of this component is to apply filters to a complex structure of data.
  * Used on the "bbn-table" component.
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
     * @mixin bbn.cp.mixins.dataEditor
     */
    mixins: 
    [
      bbn.cp.mixins.basic, 
      bbn.cp.mixins.dataEditor
    ],
    statics() {
      const get_operator_type = function(field){
        if ( typeof field === 'object' ){
          switch ( field.type ){
            case 'int':
              // maxlength is a string!
              if ( field.maxlength == 1 ){
                return 'boolean';
              }
              if ( (field.maxlength == 10) && field.keys ){
                return 'enums';
              }
              return 'number';
            case 'boolean':
            case 'bool':
              return 'boolean';
            case 'float':
            case 'decimal':
            case 'number':
            case 'money':
              return 'number';
            case 'date':
              return 'date';
            case 'datetime':
              return 'date';
            case 'time':
              return 'date';
            case 'enum':
            case 'enums':
              return 'enums';
            default:
              return 'string';
          }
        }
      };
    const get_component_type = function(sqlType){
      switch ( sqlType ){
        case 'int':
        case 'float':
        case 'decimal':
          return 'numeric';
        case 'date':
          return 'datepicker';
        case 'datetime':
          return 'datetimepicker';
        case 'time':
          return 'timepicker';
        default:
          return 'input';
      }
    };

   // var  borders = ['#414d40', '#5a6559', '#7f897e', '#6c7a78', '#515963']
   // var  borders = ['red', 'green', 'yellow', 'pink', 'blue']
  const borders = ['#e47777','#fa4a4a', '#8d0e0e','#b44f4f','#c16262'];
  const bg_colors = ['rgba(228,119,119,0.2)', 'rgba(250,74,74,0.2)', 'rgba(141,14,14,0.2)', 'rgba(180,79,79,0.2)', 'rgba(193,98,98,0.2)'];
      return {
        get_operator_type,
        get_component_type,
        borders,
        bg_colors
      }
    },
    name: 'bbn-filter',
    props: {
      /**
       * The value of the filter.
       * @prop {Object} value
       */
      value: {},
      /**
       * The operator of the filter.
       * @prop operator
       */
      operator: {},
      /**
       * @prop operators
       */
      operators: {},
      /**
       * The pre-existing conditions.
       * @prop {Array} [[]] conditions
       */
      source: {
        type: Object,
        required: true
      },
      /**
       * The list of fields given to the filter.
       * @prop {(Object|Array)} [{}] fields
       */
      fields: {
        type: [Object,Array],
        default(){
          return {}
        }
      },
      /**
       * @prop {Number} [0] num
       */
      num: {
        type: Number,
        default: 0
      },
      /**
       * @prop {} index
       */
      index: {},
      // @todo not used
      first: {},
      /**
       * The component used for a single filter.
       * @prop {Object} [{}] component
       */
      component: {
        type: [String, Object, Function]
      },
      /**
       * The component options used for a single filter.
       * @prop {Object} [{}] componentOptions
       *
       */
      componentOptions: {
        type: [Object, String]
      },
      /**
       * The column's value for a single column filter.
       * @prop {String} field
       */
      field: {
        type: String
      },
      /**
       * True if the component is multi-filter.
       * @prop {Boolean} [false] multi
       */
      multi: {
        type: Boolean,
        default: false
      },
      /**
       * The type of data for the operators.
       * @prop {String} ['string'] type
       */
      type: {
        type: String,
        default: 'string'
      }
    },
    data(){
      return {
        /**
         * The current value of the filter.
         * @data currentValue
         */
        currentValue: this.value !== undefined ? this.value : null,
        /**
         * The current operator.
         * @data currentOperator
         */
        currentOperator: this.operator !== undefined ? this.value : null,
        showForm: true
      };
    },
    computed: {
      /**
       * Returns the border color.
       * @computed border_color
       * @return {String}
       */
      border_color(){
        if ( this.num > bbnFilter.borders.length ){
          return bbnFilter.borders[this.num % bbnFilter.borders.length]
        }
        else{
          return bbnFilter.borders[this.num]
        }
      },
      /**
       * @todo not used
       * @return {HTMLElement}
       */
      is_not_root(){
        return this.$parent.$el.classList.contains("bbn-filter-control");
      },
    },
    methods: {
      /**
       * Alters the filter's style on mouseover event.
       *
       * @method over
       * @param {Event} e
       */
      over(e){
        e.target.style.color = 'red';
        e.target.parentElement.parentElement.querySelector('.bbn-filter-main').style.backgroundColor = 'rgba(158,158,158, 0.3)';
      },
      /**
       * Alters the filter's style on mouseout event.
       *
       * @method out
       * @param {Event} e
       */
      out(e){
        e.target.style.color = null;
        e.target.parentElement.parentElement.querySelector('.bbn-filter-main').style.backgroundColor = 'inherit';
      },
      /**
       * Sets the conditions for the filter.
       *
       * @method setCondition
       * @param {Object} obj
       * @emits set
       * @return {Object}
       */
      setCondition(obj){
        if ( obj.field && obj.operator ) {
          //bbn.fn.log("setCondition", obj, this.multi);
          obj.time = (new Date()).getTime();
          if ( this.multi ){
            this.source.conditions.push(obj);
            this.$forceUpdate();
          }
          else{
            this.source.conditions.splice(0);
            this.source.conditions.push(obj);
          }
          this.$emit('set', obj)
        }

        this.showForm = false;
        setTimeout(() => {
          this.showForm = true;
        }, 250);

        return obj;
      },
      /**
       * Removes the set filter conditions.
       *
       * @method unsetCondition
       * @param {Object} obj
       * @emits set
       * @return {Object}
       */
      unsetCondition(obj){
        if ( obj.field && obj.operator && obj.time ){
          if ( this.multi ){
            this.source.conditions.push(obj);
          }
          else{
            this.$emit('set', obj)
          }
        }
        return obj;
      },
      onChange(d, idx) {
        bbn.fn.log("onChange", d, arguments)
      },
      /**
       * Returns the number of fields.
       *
       * @method hasFields
       * @return {Boolean}
       */
      hasFields(){
        return this.fields && Object.keys(this.fields).length;
      },
      /**
       * Styles the text based on the given condition.
       *
       * @method condition_text
       * @param {Object} cd
       * @return {String}
       */
      operatorText(operator, field) {
        const type = bbnFilter.get_operator_type(field);
        if (type) {
          const operators = this.editorOperators[type];
          if (field.nullable) {
            if (!operators.isnull) {
              operators.isnull = this.editorNullOps.isnull;
              operators.isnotnull = this.editorNullOps.isnotnull;
            }
          }

          if (operators?.[operator]) {
            return operators[operator];
          }
        }

        return '';
      },
      condition_text(cd){
        let st = '';
        if ( cd && cd.field ){
          let index = bbn.fn.search(this.fields, {field: cd.field});
          if ( index > -1 ){
            let f = this.fields[index];
            st += '<strong>' +
              (f.flabel ? f.flabel : (f.label ? f.label : cd.field)) +
              '</strong> ' +
              this.operatorText(cd.operator, f) +
              ' <em>';
              
            if ( cd.value ){
              if ( cd.value === true ){
                st += 'true';
              }
              else if ( f.source ){
                if (bbn.fn.isArray(f.source) ){
                  st += bbn.fn.getField(f.source, 'text', 'value', cd.value);
                }
                else if ( typeof f.source === 'object' ){
                  st += f.source[cd.value];
                }
              }
              else{
                st += cd.value;
              }
            }
            else if ( cd.value === 0 ){
              st += '0';
            }
            else if ( cd.value === false ){
              st += 'false';
            }
            st += '</em>';
          }
        }
        return st;
      },
      /**
       * Completely deletes the conditions of the given index.
       * @method delete_full_condition
       * @param {Number} idx
       * @emits unset
       */
      delete_full_condition(idx){
        this.$emit('unset', this.source.conditions.splice(idx, 1));
      },
      /**
       * Deletes the given condition.
       *
       * @method delete_condition
       * @param {Object} condition
       * @fires confirm
       * @emits unset
       */
      delete_condition(condition){
        let del = arr => {
          let idx = bbn.fn.search(arr, {time: condition.time});
          //bbn.fn.log("Is there the index?", idx);
          if ( idx > -1 ){
            if ( arr[idx].conditions && arr[idx].conditions.length ){
              this.confirm(bbn._("Are you sure you want to delete this group of conditions?"), () => {
                arr.splice(idx, 1);
              })
            }
            else{
              arr.splice(idx, 1);
            }
            return true;
          }
          for ( let i = 0; i < arr.length; i++ ){
            if ( arr[i].conditions ){
              if ( del(arr[i].conditions) ){
                return true;
              }
            }
          }
        };
        if ( del(this.source.conditions) ){
          this.$forceUpdate();
          this.$emit('unset', condition);
        }

      },
      /**
       * Adds a condition to the given index.
       * @method add_group
       * @param {Number} idx
       */
      add_group(idx){
        const cond = bbn.fn.extend(true, {}, ...this.source.conditions.splice(idx, 1));
        this.$nextTick(() => {
          this.source.conditions.splice(idx, 0, {
            logic: this.source.logic,
            conditions: [cond]
          });
        })

      },
      /**
       * Deletes a condition.
       * @method delete_group
       */
      delete_group() {
        this.$parent.source.conditions.splice(idx, 1);
      },
    },
    components: {
      /**
       * @component filter-form
       */
      'filter-form': {
        name: 'filter-form',
        template: `
          <div class="bbn-w-100 filter-form bbn-flex">
            <div class="bbn-flex bbn-right-sspace" style="flex-direction: column">
              <!-- Condition creation line -->
              <div bbn-if="columns.length > 1"
                   class="bbn-block bbn-filter-padding bbn-db-column">
                <bbn-dropdown :source="columns"
                                  bbn-model="currentField"
                                  name="field[]"
                                  :placeholder="_('Pick a field')"
                                  ref="column"/>
              </div>
              <div bbn-elseif="field"
                   class="bbn-block bbn-filter-padding bbn-db-column bbn-right-sspace"
                   bbn-html="currentTitle"/>
              <div class="bbn-block bbn-filter-padding bbn-db-operator bbn-top-xsspace">
                <bbn-dropdown name="operator[]"
                              :disabled="!currentField"
                              bbn-model="currentOperator"
                              :suggest="true"
                              :required="true"
                              :source="operators"
                              ref="operator"
                              :placeholder="_('Pick an operator')"/>
              </div>
              <div :class="[{'bbn-hidden': !!no_value}, 'bbn-block', 'bbn-filter-padding', 'bbn-db-value', 'bbn-top-xsspace']">
                <component bbn-if="type && currentComponent"
                           :is="currentComponent"
                           :disabled="no_value"
                           name="value"
                           bbn-model="currentValue"
                           ref="value"
                           bbn-bind="currentComponentOptions"
                           @keyup.enter="validate"/>
              </div>
            </div>
            <div class="bbn-flex bbn-filter-padding bbn-db-column">
              <bbn-button :disabled="!currentOperator"
                          @click="validate"
                          :title="_('Validate')"
                          ref="check"
                          icon="nf nf-fa-check"
                          :notext="true"/>
              <bbn-button bbn-if="buttonDelete"
                          :disabled="!currentOperator"
                          @click="unset"
                          :title="_('Unset condition')"
                          ref="unset"
                          icon="nf nf-fa-times"
                          :notext="true"
                          class="bbn-left-xsspace"/>
            </div>
          </div>
        `,
        /**
         * @mixin bbn.cp.mixins.dataEditor
         * @memberof filter-form
         */
        mixins: [bbn.cp.mixins.basic, bbn.cp.mixins.dataEditor],
        props: {
          /**
           * The list of fields available for the filter.
           * @prop {Object|Array} [{}] fields
           * @memberof filter-form
           */
          fields: {},
          /**
           * The column's value for a single column filter.
           * @prop {String} field
           * @memberof filter-form
           */
          field: {
            type: String
          },
          /**
           * The type of data of the operators.
           * @prop {String} ['string'] type
           * @memberof filter-form
           */
          type: {
            type: String
          },
          /**
           * The operator of the filter.
           * @prop operator
           * @memberof filter-form
           */
          operator: {
            type: String
          },
          /**
           * The value of the filter.
           * @prop value
           * @memberof filter-form
           */
          value: {},
          /**
           * The component used for a single filter.
           * @prop component
           * @memberof filter-form
           *
           */
          component: {
            type: [String, Object, Function]
          },
           /**
           * The component options used for a single filter.
           * @prop {Object} [{}] componentOptions
           * @memberof filter-form
           */
          componentOptions: {
            type: Object
          },
          /**
           * Set to true to show the button to delete a condition.
           * @prop {Boolean} [false] buttonDelete
           * @memberof filter-form
           */
          buttonDelete: {
            type: Boolean,
            default: false
          }
        },
        data(){
          return {
            /**
             * The current field.
             * @data {String} currentField
             * @memberof filter-form
             */
            currentField: this.field || '',
            /**
             * The current type.
             * @data currentType
             * @memberof filter-form
             */
            currentType: this.type || '',
            /**
             * The current value.
             * @data currentValue
             * @memberof filter-form
             */
            currentValue: this.value !== undefined ? this.value : '',
            /**
             * The current component.
             * @data {String} currentComponent
             * @memberof filter-form
             */
            currentComponent: this.component || false,
            /**
             * The current component's options.
             * @data {Object} currentComponentOptions
             * @memberof filter-form
             */
            currentComponentOptions: this.componentOptions,
            /**
             * The current operator.
             * @data {String} currentOperator
             * @memberof filter-form
             */
            currentOperator: this.operator || '',
            /**
             * The current operators.
             * @data {Array} [[]] currentOperators
             * @memberof filter-form
             */
            currentOperators: [],
            /**
             * The current condition.
             * @data {Boolean} [false] currentCondition
             * @memberof filter-form
             */
            currentCondition: false,
            /**
             * @todo not used
             */
            has_group: false,
            /**
             * @todo not used
             */
            has_condition: true,
            /**
             * @prop {Array} [[]] items
             * @memberof filter-form
             */
            items: [],
            /**
             * @prop cfg
             * @memberof filter-form
             */
            cfg: {}
          };
        },
        computed: {
          /**
           * Returns the object containing the operators.
           * @computed operators
           * @fires currentFullField
           * @memberof filter-form
           * @return {Object}
           */
          operators(){
            let ops = this.currentField && this.currentType && this.editorOperators[this.currentType] ? this.editorOperators[this.currentType] : [];
            if ( this.currentFullField.nullable ){
              bbn.fn.extend(true, ops, this.editorNullOps);
            }
            return ops;
          },
          /**
           * True if the filter form has no value.
           * @computed no_value
           * @fires editorHasNoValue
           * @memberof filter-form
           * @return {Boolean}
           */
          no_value(){
            return this.editorHasNoValue(this.operator);
          },
          /**
           * Normalizes the array 'fields' to use as the source of the form's dropdown.
           * @computed columns
           * @return {Array}
           * @memberof filter-form
           */
          columns(){
            let r = [];
            if (bbn.fn.isArray(this.fields) ){
              bbn.fn.each(this.fields, (a, i) => {
                if ( a.field ){
                  r.push({
                    text: a.flabel || a.label || a.field || '',
                    value: a.field
                  });
                }
              })
            }
            else{
              for ( let n in this.fields ){
                r.push(n);
              }
            }
            return r;
          },
          /**
           * Returns the object 'field' of the corresponding current field.
           * @computed currentFullField
           * @memberof filter-form
           * @return {Object}
           */
          currentFullField(){
            if ( this.currentField ){
              let idx = bbn.fn.search(this.fields, {field: this.currentField});
              if ( idx > -1 ){
                return this.fields[idx];
              }
            }
            return {};
          },
          /**
           * Returns the label of the current field.
           * @computed currentTitle
           * @memberof filter-form
           * @return {String}
           */
          currentTitle(){
            if ( this.currentField ){
              let idx = bbn.fn.search(this.fields, {field: this.currentField});
              if ( idx > -1 ){
                return this.fields[idx].flabel || this.fields[idx].label || this.fields[idx].field || '';
              }
            }
            return '';
          }
        },
        methods: {
          /**
           * Resets the current operator, the current value and the current field value (if the number of columns is greater than) to their default.
           * @method _unset
           * @memberof filter-form
           */
          _unset(){
            this.currentOperator = '';
            this.currentValue = '';
            if ( this.columns.length > 1 ){
              this.currentField = '';
            }
          },
          /**
           * Validates the form.
           * @method validate
           * @param {Boolean} cancel
           * @fires editorHasNoValue
           * @fires _unset
           * @emits validate
           * @emits invalidate
           * @emits error
           * @memberof filter-form
           */
          validate(cancel){
            if (this.currentField
              && this.currentOperator
              && (this.currentValue
                || bbn.fn.isNumber(this.currentValue)
                || (bbn.fn.isString(this.currentValue) && this.currentValue.length)
                || this.editorHasNoValue(this.currentOperator))
            ) {
              var tmp = {
                field: this.currentField,
                operator: this.currentOperator
              };
              if ( !this.editorHasNoValue(this.currentOperator) ){
                tmp.value = this.currentValue;
              }
              if ( (cancel === true) && this.currentCondition){
                this.$parent.unsetCondition(this.currentCondition);
              }
              else{
                this.currentCondition = this.$parent.setCondition(tmp);
                if ( this.$parent.multi ){
                  this._unset();
                }
                //bbn.fn.log("CONDI", this.currentCondition);
              }
              this.$emit(cancel ? 'invalidate' : 'validate', tmp, cancel);
            }
            else{
              this.$emit('error', bbn._("Value is required. You should choose another operator if you want to look for an element empty or null"));
            }
          },
          /**
           * Calls the "_unset" method and emits "unset" event
           * @method unset
           * @memberof filter-form
           * @fires _unset
           * @emit $parent.unset
           */
          unset(){
            this._unset();
            this.$parent.$emit('unset')
          }
        },
        /**
         * @event created
         * @memberof filter-form
         */
        created(){
          if ( this.type && this.editorOperators[this.type] ){
            this.currentOperators = this.editorOperators[this.type];
          }
          if ( this.field && bbn.fn.isArray(this.fields) && this.fields.length && !this.component ){
            let fieldObj = bbn.fn.getRow(this.fields, {field: this.field});
            if ( fieldObj ){
              let o = this.editorGetComponentOptions(fieldObj);
              if ( o ){
                if ( o.type !== this.currentType ){
                  this.currentType = o.type;
                }
                this.currentComponent = o.component;
                this.currentComponentOptions = o.componentOptions;
              }
            }
          }
        },
        /**
         * @event mounted
         * @memberof filter-form
         */
        mounted(){
          this.ready = true;
          /*if ( this.columns.length === 1 ){
            this.currentField = this.fields[0].field;
          }*/
          //bbn.fn.log("FILTER FORM MOUNTED", this);
        },
        watch: {
          /**
           *
           * @watch currentField
           * @param {} newVal
           * @fires editorGetComponentOptions
           * @memberof filter-form
           */
          currentField(newVal){
            let fieldObj = bbn.fn.getRow(this.fields, {field: newVal});
            if ( fieldObj ){
              let o = this.editorGetComponentOptions(fieldObj);
              if ( o ){
                this.currentType = o.type;
                this.currentComponent = o.component;
                this.currentComponentOptions = o.componentOptions;
              }
            }
          }
        }
      }
    }
  };

import cpHtml from './filter.html';
import cpStyle from './filter.less';
import cpLang from './_i18n/index.js';

export default {
  name: 'bbn-filter',
  definition: cpDef,
  template: cpHtml,
  style: cpStyle,
  lang: cpLang
};
