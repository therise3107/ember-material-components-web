import Ember from 'ember';
import layout from '../../../templates/components/mdc-tab-bar/tab/icon-text';

const { get } = Ember;

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-tab__icon-text']
  //endregion
});
