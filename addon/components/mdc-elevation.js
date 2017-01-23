import Ember from 'ember';
import layout from '../templates/components/mdc-elevation';

const { get, computed } = Ember;

export default Ember.Component.extend({
  //region Attributes
  /*
   * A number between 0 and 24
   * @type {Number}
   */
  z: 0,
  //endregion

  //region Ember Hooks
  layout,
  classNameBindings: ['elevationClass'],
  classNames: ['mdc-elevation-transition'],
 //endregion

 //region Computed Properties
 elevationClass: computed('z', function() {
   return `mdc-elevation--z${get(this, 'z')}`;
 })
 //endregion
});
