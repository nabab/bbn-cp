const empty = {
  template: '<template><slot></slot></template>',
  /**
   * Adds the class 'bbn-empty-component' to the component's template.
   * @event created
   * @memberof emptyComponent
   */
  created(){
    this.componentClass.push('bbn-empty-component');
  },
};

export default empty;
