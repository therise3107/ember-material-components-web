import Ember from 'ember';
import MDCComponent from '../mixins/mdc-component';
import layout from '../templates/components/mdc-button';

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  accent: false,
  /**
   * @type {Boolean}
   */
  raised: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * @type {?String}
   */
  type: null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'button',
  classNames: 'mdc-button',
  classNameBindings: ['accent:mdc-button--accent', 'raised:mdc-button--raised', 'mdcClassNames'],
  attributeBindings: ['disabled', 'type', 'style'],
  //endregion

  //region Properties
  ripple: true
  //endregion
});
