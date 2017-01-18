import Ember from 'ember';
import layout from '../../templates/components/mdc-card/title';

export default Ember.Component.extend({
  //region Attributes
  /**
   * @type {Boolean}
   */
  large: false,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-card__title'],
  classNameBindings: ['large:mdc-card__title--large']
  //endregion
});
