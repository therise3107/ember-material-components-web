import Ember from 'ember';
import layout from '../../templates/components/mdc-menu/item';

const { get } = Ember;

/**
 * @typedef {Ember.Component} MDCMenuItemComponent
 */
export default Ember.Component.extend({
  //region Attributes
  /**
   * @type {MDCMenuComponent}
   */
  menu: null,
  /**
   * Pass an action to call when the item is selected.
   * @type {?Function}
   * @param {Number} index
   */
  'selected': x => x,
  //endregion

  //region Ember Hooks
  didUpdateAttrs() {
    this.registerWithMenu();
  },
  willDestroyElement() {
    this.unregisterWithMenu();
  },
  layout,
  tagName: 'li',
  classNames: ['mdc-list-item'],
  attributeBindings: ['role', 'tabindex'],
  //endregion

  //region Properties
  role: 'menuitem',
  tabindex: 0,
  //endregion

  //region Methods
  notifySelected(index) {
    get(this, 'selected')(index);
  },
  /**
   * @returns {MDCMenuComponent}
   */
  assertMenu() {
    const menu = get(this, 'menu');
    if (!menu) { throw new Error(`Missing 'menu' attribute from ${this.toString()}`); }
    return menu;
  },
  registerWithMenu() {
    this.assertMenu().registerItem(this);
  },
  unregisterWithMenu() {
    this.assertMenu().unregisterItem(this);
  },
  /**
   * @public
   * @returns {Object} with `top` and `height`
   */
  getYParams() {
    const { offsetTop: top, offsetHeight: height } = get(this, 'element');
    return { top, height };
  },
  /**
   * @public
   * @param {String} value
   */
  setTransitionDelay(value) {
    this.$().css('transition-delay', value);
  },
  //endregion
});
