import Ember from 'ember';
import layout from '../../templates/components/mdc-card/primary';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'section',
  classNames: ['mdc-card__primary']
  //endregion
});
