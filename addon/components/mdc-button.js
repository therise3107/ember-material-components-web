import Ember from 'ember';
import layout from '../templates/components/mdc-button';

export default Ember.Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  accent: false,
  /**
   * @type {Boolean}
   */
  raised: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * @type {Function}
   * @param {MouseEvent}
   */
  onclick: x => x,
  /**
   * @type {?String}
   */
  type: null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'button',
  classNames: 'mdc-button',
  classNameBindings: ['accent:mdc-button--accent', 'raised:mdc-button--raised'],
  attributeBindings: ['disabled', 'onclick', 'type'],
  //endregion
});
