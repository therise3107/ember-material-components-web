import Ember from 'ember';
import { MDCRippleFoundation } from '@material/ripple';
import { createRippleAdapter } from '../utils/mdc-ripple-adapter';
import styleComputed from '../utils/style-computed';

const { get, set, computed } = Ember;

export const addClass = (className, component) => {
  get(component, 'mdcClasses').addObject(className);
};

export const removeClass = (className, component) => {
  get(component, 'mdcClasses').removeObject(className);
};

/**
 * @typedef {Ember.Mixin} MDCComponent
 */
export const MDCComponent = Ember.Mixin.create({
  //region Ember Hooks
  init() {
    this._super(...arguments);
    set(this, 'mdcClasses', Ember.A([]));
    set(this, 'mdcInteractionHandlers', Ember.A([]));
    set(this, 'mdcStyles', {});
  },

  didInsertElement() {
    this._super(...arguments);
    // We don't want to init the foundation until the next run loop, because
    // many components rely on child components registering themselves, which
    // tend to happen in their own didInsertElement hooks that run _after_ the
    // parent's didInsertElement.
    Ember.run.scheduleOnce('afterRender', this, () => {
      if (get(this, 'createFoundation')) {
        const foundation = this.createFoundation();
        set(this, 'foundation', foundation);
        foundation.init();
      }
      if (get(this, 'ripple')) {
        const rippleFoundation = new MDCRippleFoundation(
          createRippleAdapter(this, this.rippleOptions())
        );
        set(this, 'rippleFoundation', rippleFoundation);
        rippleFoundation.init();
      }
    });
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._detachMdcInteractionHandlers();
  },

  didRender() {
    this._super(...arguments);
    this._attachMdcInteractionHandlers();
  },

  willDestroyElement() {
    this._super(...arguments);
    const foundation = get(this, 'foundation');
    const rippleFoundation = get(this, 'rippleFoundation');
    if (foundation) {
      foundation.destroy();
    }
    if (rippleFoundation) {
      rippleFoundation.destroy();
    }
  },
  //endregion

  //region Properties
  /**
   * This only works for components that are _not_ tagless, and requires that
   * `mdcClassNames` is in `classNameBindings` and `style` is in `attributeBindings`.
   * @type {Boolean}
   */
  ripple: false,

  /**
   * @type {Function}
   * @returns {Object}
   */
  rippleOptions: () => ({}),

  /**
   * @type {MDCFoundation}
   */
  foundation: null,

  /**
   * @type {String[]}
   */
  mdcClasses: null,

  /**
   * @type {Array<String,Function>[]}
   */
  mdcInteractionHandlers: null,

  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcStyles: null,
  //endregion

  //region Computed Properties
  /**
   * If the MDC Component is _not_ tagless, it should have this in its `classNameBindings`.
   * @returns {String}
   */
  mdcClassNames: computed('mdcClasses.[]', function() {
    return get(this, 'mdcClasses').join(' ');
  }),

  /**
   * If the MDC Component is _not_ tagless, it should have this in its `attributeBindings`.
   * @returns {String}
   */
  style: styleComputed('mdcStyles'),
  //endregion

  //region Methods
  /**
   * Syncs the Ember Component properties with the MDC Foundation properties
   * @param {String} prop - A property name that exists on the Foundation
   *                        (as prop and setProp) and on the component
   */
  sync(prop) {
    const foundation = get(this, 'foundation');
    if (!foundation) { return; }
    const value = get(this, prop);
    const Prop = Ember.String.capitalize(prop);
    if (foundation[`is${Prop}`]() !== value) {
      foundation[`set${Prop}`](value);
    }
  },

  setStyleFor(key, property, value) {
    Ember.run(() => {
      set(this, `${key}.${property}`, value);
      // Setting properties on the object doesn't cause computed properties to recompute
      // (and we can't put every possible CSS property in the dependent keys),
      // so we'll just trigger the change notification manually.
      this.notifyPropertyChange(key);
    });
  },

  _attachMdcInteractionHandlers() {
    get(this, 'mdcInteractionHandlers').forEach(([type, handler]) => get(this, 'element').addEventListener(type, handler));
  },

  _detachMdcInteractionHandlers() {
    get(this, 'mdcInteractionHandlers').forEach(([type, handler]) => get(this, 'element').removeEventListener(type, handler));
  },

  registerMdcInteractionHandler(type, handler) {
    Ember.run(() => {
      this._detachMdcInteractionHandlers();
      get(this, 'mdcInteractionHandlers').addObject([type, handler]);
      this._attachMdcInteractionHandlers();
    });
  },

  deregisterMdcInteractionHandler(type, handler) {
    Ember.run(() => {
      this._detachMdcInteractionHandlers();
      get(this, 'mdcInteractionHandlers').removeObject([type, handler]);
      this._attachMdcInteractionHandlers();
    });
  },
  //endregion
});

export default MDCComponent;
