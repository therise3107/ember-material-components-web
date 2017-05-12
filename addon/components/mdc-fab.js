import Ember from 'ember';
import layout from '../templates/components/mdc-fab';

export default Ember.Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  mini: false,
  /**
   * @type {Boolean}
   */
  plain: false,
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
  'aria-label': null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'button',
  classNames: ['mdc-fab'],
  attributeBindings: ['aria-label', 'disabled', 'onclick', 'type'],
  classNameBindings: ['mini:mdc-fab--mini', 'plain:mdc-fab--plain']
  //endregion
});
