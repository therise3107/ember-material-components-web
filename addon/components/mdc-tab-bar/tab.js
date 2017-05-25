import Ember from 'ember';
import MDCTabComponent from '../../mixins/mdc-tab-component';

export default Ember.Component.extend(MDCTabComponent, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `become-active` to handle user actions.
   * @type {Boolean}
   */
  active: false,
  /**
   * This will be called when the user indicates they want to change the active tab.
   * If you want to simulate two-way binding, you can use the tab like this:
   *
   * {{#tab-bar.tab active=isSecondTabActive become-active=(action (mut isSecondTabActive))}}
   *
   * @type {Function}
   * @param {Boolean} isActive
   */
  'become-active': x => x,
  //endregion

  //region Ember Hooks
  classNameBindings: ['active:mdc-tab--active']
  //endregion
});
