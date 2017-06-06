import Ember from 'ember';

const { get } = Ember;

/**
 * Safely attempts to read a property from the component,
 * or returns the fallback if the component is not around.
 * @param {Ember.Component} component
 * @param {String} property
 * @param {*} [fallback]
 * @returns {*}
 */
export default (component, property, fallback = null) => {
  if (!component || get(component, 'isDestroyed') || !get(component, 'element')) {
    return fallback;
  }

  return get(component, property);
};
