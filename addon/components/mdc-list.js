import Ember from 'ember';
import layout from '../templates/components/mdc-list';

export default Ember.Component.extend({
  //region Attribute
  /**
   * Make the list more visually compact
   * @type {Boolean}
   */
  dense: false,
  /*
   * Make the list confrom to the two-line list spec
   * @type {Boolean}
   * @see {@link https://material.io/guidelines/components/lists.html#lists-actions}
   */
  'two-line': false,
  /**
   * Styles the detail elements as what the spec calls "avatars" -- large, circular details
   * @type {Boolean}
   */
  'avatar-list': false,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'ul',
  classNameBindings: ['dense:mdc-list--dense', 'two-line:mdc-list--two-line', 'avatar-list:mdc-list--avatar-list'],
  classNames: ['mdc-list']
  //endregion
});
