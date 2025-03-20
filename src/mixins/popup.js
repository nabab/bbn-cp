const popup = {
  props: {
    /**
     * The object popup of the table.
     * @prop {HTMLElement}
     */
    popup: {
      type: HTMLElement
    }
  },
  methods: {
    /**
     * Retuns the popup object.
     * @method getPopup
     * @returns {HTMLElement}
     */
    /*
    getPopup(cfg){
      let popup = this.popup || bbn.cp.getPopup(this);
      // If no config we return the popup object
      if (!cfg) {
        return popup;
      }

      if (popup) {
        // Adding opener to the config
        cfg.opener = this;
        return popup.open(cfg);
      }

    },
    */
    
  }
};

export default popup;
