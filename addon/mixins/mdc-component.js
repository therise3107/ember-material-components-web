import Ember from 'ember';

const { get, set, computed } = Ember;

export const addClass = (className, component) => {
  get(component, 'mdcClasses').addObject(className);
};

export const removeClass = (className, component) => {
  get(component, 'mdcClasses').removeObject(className);
};

export const MDCComponent = Ember.Mixin.create({
  //region Ember Hooks
  init() {
    this._super(...arguments);
    set(this, 'mdcClasses', Ember.A([]));
  },
  didInsertElement() {
    this._super(...arguments);
    // We don't want to init the foundation until the next run loop, because
    // many components rely on child components registering themselves, which
    // tend to happen in their own didInsertElement hooks that run _after_ the
    // parent's didInsertElement.
    Ember.run.scheduleOnce('afterRender', this, () => {
      const foundation = this.createFoundation();
      set(this, 'foundation', foundation);
      foundation.init();
    });
  },
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'foundation').destroy();
  },
  //endregion

  //region Properties
  /**
   * @type {MDCFoundation}
   */
  foundation: null,
  /**
   * @type {String[]}
   */
  mdcClasses: null,
  //endregion

  //region Computed Properties
  /**
   * @type {String}
   */
  mdcClassNames: computed('mdcClasses.[]', function() {
    return get(this, 'mdcClasses').join(' ');
  }),
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
  //endregion
});

export default MDCComponent;
