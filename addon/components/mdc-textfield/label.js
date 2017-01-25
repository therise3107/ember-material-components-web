import Ember from 'ember';
import layout from '../../templates/components/mdc-textfield/label';

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  tagName: 'span',
  classNames: ['mdc-textfield__label'],
  classNameBindings: ['class-names']
  //endregion
});
