import Ember from 'ember';
import MDCTabComponent from '../../mixins/mdc-tab-component';

export default Ember.LinkComponent.extend(MDCTabComponent, {
  //region Ember Hooks
  activeClass: 'mdc-tab--active'
  //endregion
});
