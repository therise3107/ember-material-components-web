import Ember from 'ember';
import layout from '../../templates/components/mdc-tab-bar/indicator';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-tab-bar__indicator'],
  attributeBindings: ['style']
  //endregion
});
