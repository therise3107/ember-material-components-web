import Ember from 'ember';
import layout from '../../templates/components/mdc-list/item';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'li',
  classNames: ['mdc-list-item']
  //endregion
});
