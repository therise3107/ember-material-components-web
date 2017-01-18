import Ember from 'ember';
import layout from '../templates/components/mdc-card';

export default Ember.Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  'horizontal-block': false,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-card'],
  classNameBindings: ['horizontal-block:mdc-card__horizontal-block']
  //endregion
});
