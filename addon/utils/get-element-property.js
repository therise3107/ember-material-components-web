import Ember from 'ember';

const { get } = Ember;

/**
 * Safely attempts to read a property from the component's DOM element,
 * or returns the fallback if the element or component aren't around.
 * @param {Ember.Component} component
 * @param {String} property
 * @param {*} [fallback]
 * @returns {*}
 */
export default (component, property, fallback = null) => {
  if (!component || get(component, 'isDestroyed') || !get(component, 'element')) {
    return fallback;
  }

  const element = get(component, 'element');
  const value = get(element, property);

  if (typeof value === 'function') {
    return value.bind(element);
  }

  return value;
};
