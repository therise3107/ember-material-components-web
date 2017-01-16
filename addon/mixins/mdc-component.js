import Ember from 'ember';

const { get, set, computed } = Ember;

export const addClass = (className, component) => {
  const classNames = get(component, 'mdcClasses');
  if (classNames.includes(className)) { return; }
  classNames.addObject(className);
  component.notifyPropertyChange('mdcClasses');
};

export const removeClass = (className, component) => {
  const classNames = get(component, 'mdcClasses');
  if (!classNames.includes(className)) { return; }
  classNames.removeObject(className);
  component.notifyPropertyChange('mdcClasses');
};

export const MDCComponent = Ember.Mixin.create({
  //region Ember Hooks
  classNameBindings: ['mdcClassNames'],
  init() {
    this._super(...arguments);
    set(this, 'mdcClasses', []);
  },
  didInsertElement() {
    this._super(...arguments);
    const foundation = this.createFoundation();
    set(this, 'foundation', foundation);
    foundation.init();
  },
  willDestroyElement() {
    this._super(...arguments);
    get(this, 'foundation').destroy();
  },
  //endregion

  //region Properties
  /**
   * @type {MDCRadioFoundation}
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
  mdcClassNames: computed('mdcClasses', function() {
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
    const Prop = prop.capitalize();
    if (foundation[`is${Prop}`]() !== value) {
      foundation[`set${Prop}`](value);
    }
  },
  //endregion
});

export default MDCComponent;
