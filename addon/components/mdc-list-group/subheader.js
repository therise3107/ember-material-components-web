import Ember from 'ember';
import layout from '../../templates/components/mdc-list-group/subheader';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'h3',
  classNames: ['mdc-list-group__subheader']
  //endregion
});
