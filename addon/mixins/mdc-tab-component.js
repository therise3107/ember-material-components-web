import Ember from 'ember';
import { MDCTabFoundation } from '@material/tabs';
import { MDCComponent } from '../mixins/mdc-component';
import layout from '../templates/components/mdc-tab-bar/tab';

const { get } = Ember;

export default Ember.Mixin.create(MDCComponent, {
  //region Ember Hooks
  layout,
  classNames: ['mdc-tab'],
  classNameBindings: ['has-icon-and-text:mdc-tab--with-icon-and-text', 'mdcClassNames'],
  attributeBindings: ['style'],
  didInsertElement() {
    this._super(...arguments);
    get(this, 'register-tab')(this);
  },
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'deregister-tab')(this);
  },
  didReceiveAttrs() {
    this._super(...arguments);
    const active = get(this, 'active');
    const foundation = get(this, 'foundation');
    if (foundation) {
      foundation.setActive(active);
    }
    if (active) {
      get(this, 'switch-to-tab')(this);
    }
  },
  //endregion

  //region Properties
  ripple: true,
  //endregion

  //region Computed Properties
  /**
   * @returns {Boolean}
   */
  preventDefaultOnClick: Ember.computed({
    get() {
      return get(this, 'foundation').preventsDefaultOnClick();
    },
    set(key, value) {
      get(this, 'foundation').setPreventDefaultOnClick(value);
      return value;
    }
  }).volatile(),
  /**
   * @returns {Number}
   */
  computedWidth: Ember.computed(function() {
    const foundation = get(this, 'foundation');
    if (foundation) {
      return foundation.getComputedWidth();
    }
  }).volatile(),
  /**
   * @returns {Number}
   */
  computedLeft: Ember.computed(function() {
    const foundation = get(this, 'foundation');
    if (foundation) {
      return foundation.getComputedLeft();
    }
  }).volatile(),
  //endregion

  //region Methods
  createFoundation() {
    return new MDCTabFoundation({
      addClass: (className) => Ember.run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: (className) => Ember.run(() => get(this, 'mdcClasses').removeObject(className)),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      getOffsetWidth: () => get(this, 'element').offsetWidth,
      getOffsetLeft: () => get(this, 'element').offsetLeft,
      notifySelected: () => get(this, 'tab-selected')({ tab: this }, true),
    });
  },
  measureSelf() {
    const foundation = get(this, 'foundation');
    if(foundation) {
      return foundation.measureSelf();
    }
  }
  //endregion
});
