import Ember from 'ember';
import layout from '../../templates/components/mdc-card/supporting-text';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'section',
  classNames: ['mdc-card__supporting-text']
  //endregion
});
