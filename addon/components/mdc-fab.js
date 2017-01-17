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
   * @type {?String}
   */
  'aria-label': null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'button',
  classNames: ['mdc-fab'],
  attributeBindings: ['aria-label'],
  classNameBindings: ['mini:mdc-fab--mini', 'plain:mdc-fab--plain']
  //endregion
});
