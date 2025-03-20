export default {
  props: {
    /**
     * True if the columns has to have titles.
     * @prop {Boolean} [true] titles
     */
    titles: {
      type: Boolean,
      default: true
    },
    /**
     * If the property 'group' is given to one or more columns in the table (ex: group="test"), it defines the title of a group of columns. (ex: titleGroups="[{value: 'test', text: 'My group'}]").
     * @prop {Array|Function} titleGroups
     */
    titleGroups: {
      type: [Array, Function]
    },
  }
}

