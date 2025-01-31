const browserNotification = {
  /**
   * @mixin bbn.cp.mixins.serviceWorker
   * @memberof browserNotificationComponent
   */
  props: {
    /**
     * @prop {Boolean} [false] browserNotification
     */
    browserNotification: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      /**
       * @data {Boolean} [false] hasBrowserPermission
       * @memberof browserNotificationComponent
       */
      hasBrowserPermission: false,
      /**
       * @data {Object} [{}] browserNotifications
       * @memberof browserNotificationComponent
       */
      browserNotifications: {},
      /**
       * @data {String} [''] browserNotificationURL
       * @memberof browserNotificationComponent
       */
      browserNotificationURL: '',
      /**
       * @data {Boolean} [false] browserNotificationSW
       * @memberof browserNotificationComponent
       */
      browserNotificationSW: false
    }
  },
  methods: {
    /**
       * @method browserNotify
       * @memberof browserNotificationComponent
       * @param {String} title
       * @param {String} text,
       * @param {Object} options
       * @fires _postMessage
       * @fires $set
       */
    browserNotify(title, text, options){
      if (this.ready
        && this.browserNotification
        && this.hasBrowserPermission
        && title
        && text
      ) {
        if (bbn.fn.isObject(text)) {
          options = text;
        }
        else if (bbn.fn.isString(text)) {
          if (!bbn.fn.isObject(options)) {
            options = {};
          }
          if (!options.body || (options.body !== text)) {
            options.body = text;
          }
        }
        let date = bbn.fn.date();
        options.tag = options.tag || options.timestamp || date.getTime();
        options.timestamp = options.timestamp || date.getTime();
        if (this.browserNotificationSW && bbn.fn.isFunction(this._postMessage)) {
          this._postMessage({
            type: 'notification',
            data: {
              title: title,
              options: options
            }
          })
        }
        else {
          options.onclick = this.browserNotificationClick;
          let n = new Notification(title, options);
          this.$set(this.browserNotifications, options.tag, n);
        }
      }
    },
    /**
     * @method browserNotificationClick
     * @memberof browserNotificationComponent
     * @param {Object} options
     * @fires post
     * @fires removeBrowserNotification
     * @fires messageToChannel
     */
    browserNotificationClick(options){
      if (this.browserNotificationURL) {
        this.post(this.browserNotificationURL + '/actions/read', {id: options.tag}, d => {
          if (d.success) {
            this.removeBrowserNotification(options.tag);
            this.messageToChannel({
              method: 'removeBrowserNotification',
              params: [options.tag]
            });
          }
        })
      }
      else {
        this.removeBrowserNotification(options.tag);
      }
    },
    /**
     * @method removeBrowserNotification
     * @memberof browserNotificationComponent
     * @param {String} id
     */
    removeBrowserNotification(id){
      if (id && (id in this.browserNotifications)){
        delete this.browserNotifications[id];
      }
    }
  },
  /**
   * Adds the class 'bbn-browser-notification-component' to the component.
   * @event created
   * @memberof browserNotificationComponent
   */
    created(){
    this.componentClass.push('bbn-browser-notification-component');
  },
  /**
   * @event mounted
   */
  mounted(){
    if (this.browserNotification) {
      Notification.requestPermission(perms => {
        this.hasBrowserPermission = perms === 'granted';
      })
    }
  }
};

export default browserNotification;
