import Ember from 'ember';
import layout from '../templates/components/mdc-checkbox';
import { addClass, removeClass, MDCComponent } from '../mixins/mdc-component';
import { MDCCheckboxFoundation } from '@material/checkbox';

const { ANIM_END_EVENT_NAME } = MDCCheckboxFoundation.strings;
const { get, set } = Ember;

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `onchange` to handle user actions.
   * @type {Boolean}
   */
  checked: false,
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action.
   * @type {Boolean}
   */
  indeterminate: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * This will be called when the user indicates they want to change the value
   * of the checkbox. If you want to simulate two-way binding, you can use the
   * checkbox like this:
   *
   * {{mdc-checkbox checked=isChecked onchange=(action (mut isChecked))}}
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
  'input-id': null,
  //endregion

  //region Ember Hooks
  classNames: ['mdc-checkbox'],
  classNameBindings: ['mdcClassNames'],
  attributeBindings: ['style'],
  layout,
  init() {
    this._super(...arguments);
    set(this, 'changeHandlers', Ember.A([]));
  },
  didRender() {
    this.sync('checked');
    this.sync('indeterminate');
    this.sync('disabled');
  },
  //endregion

  //region Properties
  /**
   * @type {EventListener[]}
   */
  changeHandlers: null,
  ripple: true,
  //endregion

  //region Methods
  /**
   * @returns {MDCCheckboxFoundation}
   */
  createFoundation() {
    const component = this;
    return new MDCCheckboxFoundation({
      addClass(className) {
        addClass(className, component);
      },
      removeClass(className) {
        removeClass(className, component);
      },
      registerAnimationEndHandler(handler) {
        component.get('element').addEventListener(ANIM_END_EVENT_NAME, handler);
      },
      deregisterAnimationEndHandler(handler) {
        component.get('element').removeEventListener(ANIM_END_EVENT_NAME, handler);
      },
      registerChangeHandler(handler) {
        component.get('changeHandlers').addObject(handler);
      },
      deregisterChangeHandler(handler) {
        component.get('changeHandlers').removeObject(handler);
      },
      getNativeControl() {
        return component.$('input').get(0);
      },
      forceLayout() {
        return;
      },
      isAttachedToDOM() {
        return !!component.get('element');
      }
    });
  },
  //endregion

  //region Actions
  actions: {
    inputChanged(ev) {
      const checked = ev.target.checked;
      get(this, 'changeHandlers').forEach(handler => handler(ev));
      get(this, 'onchange')(checked);
    }
  }
  //endregion
});
