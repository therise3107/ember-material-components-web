import Ember from 'ember';
import layout from '../templates/components/mdc-icon-toggle';
import { MDCComponent, addClass, removeClass } from '../mixins/mdc-component';
import { MDCIconToggleFoundation } from '@material/icon-toggle';

const { get, set } = Ember;
const { strings } = MDCIconToggleFoundation;
const mdcAttrs = Object.keys(strings).map(x => strings[x]);

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `onchange` to handle user actions.
   * @type {Boolean}
   */
  pressed: false,
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * This will be called when the user indicates they want to change the value
   * of the toggle. If you want to simulate two-way binding, you can use the
   * checkbox like this:
   *
   * {{mdc-icon-toggle pressed=isThingOn onchange=(action (mut isThingOn))}}
   *
   * @type {Function}
   * @param {Boolean} isOn
   */
  onchange: x => x,
  /**
   * @type {?String}
   */
  label: null,
  //endregion

  //region Ember Hooks
  tagName: 'i',
  classNames: ['mdc-icon-toggle'],
  layout,
  didRender() {
    this._super(...arguments);
    this.sync('disabled');
    this.syncPressed();
  },
  attributeBindings: mdcAttrs.concat(['tabindex', 'style']),
  classNameBindings: ['mdcClassNames', 'aria-disabled:mdc-icon-toggle--disabled'],
  //endregion

  //region Properties
  ripple: true,
  rippleOptions() {
    return {
      isUnbounded: () => true,
      isSurfaceActive: () => get(this, 'foundation').isKeyboardActivated(),
      computeBoundingRect: () => {
        const size = 48; // In case the icon font hasn't loaded yet
        const { left, top } = get(this, 'element').getBoundingClientRect();
        return {
          top,
          left,
          bottom: left + size,
          right: left + size,
          width: size,
          height: size
        };
      }
    };
  },
  //endregion

  //region Methods
  createFoundation() {
    const component = this;
    return new MDCIconToggleFoundation({
      addClass(className) {
        addClass(className, component);
      },
      removeClass(className) {
        removeClass(className, component);
      },
      registerInteractionHandler(type, handler) {
        component.on(type, handler);
      },
      deregisterInteractionHandler(type, handler) {
        component.off(type, handler);
      },
      setText(text) {
        set(component, 'text', text);
      },
      getTabIndex() {
        return get(component, 'tabindex');
      },
      setTabIndex(tabIndex) {
        set(component, 'tabindex', tabIndex);
      },
      getAttr(name) {
        // Note that this only actually works for attribute names that are in
        // `attributeBindings`, but currently the foundation class exposes
        // every name it might use so that we can make that happen.
        return get(component, name);
      },
      setAttr(name, value) {
        set(component, name, value);
      },
      rmAttr(name) {
        set(component, name, null);
      },
      notifyChange(evtData) {
        get(component, 'onchange')(evtData.isOn);
      }
    });
  },
  syncPressed() {
    const foundation = get(this, 'foundation');
    if (!foundation) { return; }
    const pressed = !!get(this, 'pressed');
    if (foundation && foundation.isOn() !== pressed) {
      foundation.toggle(pressed);
    }
  }
  //endregion
});
