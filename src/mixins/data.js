const data = {
  methods: {
    getProp(obj, prop) {
      return bbn.fn.getProperty(obj, prop);
    },
    /**
     * Defines how to render the data.
     * @method renderData
     * @param {Object} data
     * @param {Object} cfg
     * @memberof dataComponent
     * @returns {String}
     */
    renderData(data, cfg){
      if (!cfg || !cfg.field || (!bbn.fn.isString(cfg.field) && !bbn.fn.isNumber(cfg.field)) || !data) {
        return '';
      }

      if (cfg.field.indexOf('.') > -1) {
        //debugger;
      }

      let v = this.getProp(data, cfg.field) || '';
      if ( cfg.icon ){
        return '<i class="' + cfg.icon + '"> </i>'
      }
      else if ( cfg.type ){
        switch ( cfg.type ){
          case "datetime":
            if ( window.dayjs && cfg.format ){
              return v ? (new window.dayjs(v)).format(cfg.format) : '-';
            }
            else{
              return bbn.fn.fdatetime(v, '-');
            }
          case "date":
            if ( window.dayjs && cfg.format ){
              return v ? (new window.dayjs(v)).format(cfg.format) : '-';
            }
            else{
              return bbn.fn.fdate(v, '-');
            }
          case "time":
            if ( cfg.format && window.dayjs ){
              return v ? (new window.dayjs(v)).format(cfg.format) : '-';
            }
            else{
              return v ? bbn.fn.ftime(v) : '-';
            }
          case "email":
            return v ? '<a href="mailto:' + v + '">' + v + '</a>' : '-';
          case "url":
            return v ? '<a href="' + v + '">' + v + '</a>' : '-';
          case "percent":
            return v ? bbn.fn.money(v * 100, false, "%", '-', '.', ' ', 2) : '-';
          case "number":
            return bbn.fn.money(
              v,
              (cfg.precision === -4) || (cfg.format && (cfg.format.toLowerCase() === 'k')),
              cfg.unit || "",
              '-',
              '.',
              ' ',
              cfg.precision === -4 ? 3 : (cfg.precision || cfg.decimals || 0)
            );
          case "money":
            //bbn.fn.log(cfg)
            return bbn.fn.money(
              v,
              (cfg.precision === -4) || (cfg.format && (cfg.format.toLowerCase() === 'k')),
              cfg.currency || cfg.unit || "",
              !!cfg.novalue ? (bbn.fn.isFunction(cfg.novalue) ? cfg.novalue(data[cfg.field], cfg) : cfg.novalue) : '-',
              bbn.env?.money?.decimal || ',',
              bbn.env?.money?.thousands || ' ',
              cfg.precision === -4 ? 3 : (cfg.precision || cfg.decimals || 0)
            );
          case "bool":
          case "boolean":
            return '<i class="nf nf-fa-'
              + (((v && (v !== 'false') && (v !== '0')) && ((cfg.yesvalue === undefined) || (v === cfg.yesvalue))) ? 'check' : 'times')
              + '" title="'
              + (((v && (v !== 'false') && (v !== '0')) && ((cfg.yesvalue === undefined) || (v === cfg.yesvalue))) ? bbn._("Yes") : bbn._("No"))
              + '"></i>';
        }
      }
      else if ( cfg.source ){
        if (cfg.source.length) {
          if (!bbn.fn.isObject(cfg.source[0])) {
            let idx = cfg.source.indexOf(v);
            return idx > -1 ? cfg.source[idx] : '-';
          }
          else {
            let filter = {};
            filter[this.sourceValue || 'value'] = v;
            let idx = bbn.fn.search(bbn.fn.isFunction(cfg.source) ? cfg.source() : cfg.source, filter);
            return idx > -1 ? cfg.source[idx][this.sourceText || 'text'] : '-';
          }
        }
      }
      else {
        if (bbn.fn.isString(v) && v && cfg.maxVisible) {
          return bbn.fn.shorten(v, cfg.maxVisible);
        }
        return v || '';
      }          
    },
    // For preventing default autobind
    listOnBeforeMount() {

    },
    getDataIndex(itemIndex) {
      return this.items[itemIndex] ? this.items[itemIndex].index : -1;
    },

  }
};

export default data;
