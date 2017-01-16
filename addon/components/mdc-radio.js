import Ember from 'ember';
import layout from '../templates/components/mdc-radio';
import { addClass, removeClass, MDCComponent } from '../mixins/mdc-component';
import { MDCRadioFoundation } from '@material/radio';

const { get } = Ember;

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `onchange` to handle user actions.
   * @type {Boolean}
   */
  checked: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * This will be called when the user indicates they want to change the value
   * of the checkbox. If you want to simulate two-way binding, you can use the
   * checkbox like this:
   *
   * {{mdc-radio checked=(eq radioValue "one") onchange=(action "setRadioValue" "one")}}
   *
   * @type {Function}
   * @param {Boolean} checked
   */
  onchange: x => x,
  /**
   * @type {?String}
   */
  name: null,
  /**
   * @type {?String}
   */
  id: null,
  //endregion

  //region Ember Hooks
  classNames: ['mdc-radio'],
  layout,
  didRender() {
    this.sync('checked');
    this.sync('disabled');
  },
  //endregion

  //region Methods
  /**
   * @returns {MDCRadioFoundation}
   */
  createFoundation() {
    const component = this;
    return new MDCRadioFoundation({
      addClass(className) {
        addClass(className, component);
      },
      removeClass(className) {
        removeClass(className, component);
      },
      getNativeControl() {
        return component.$('input').get(0);
      }
    });
  },
  //endregion

  //region Actions
  actions: {
    inputChanged(ev) {
      const checked = ev.target.checked;
      get(this, 'onchange')(checked);
    }
  }
  //endregion
});
