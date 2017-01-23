import Ember from 'ember';
import layout from '../../../templates/components/mdc-list/item/start-detail';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  /**
   * This is currently a tagless component, meant only to yield the correct CSS class.
   * @type {String}
   */
  tagName: '',
  //endregion
});
