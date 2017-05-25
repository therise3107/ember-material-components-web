import Ember from 'ember';

const { get } = Ember;

export default prop => Ember.computed(`${prop}`, function() {
  return Ember.String.htmlSafe(Object.keys(get(this, prop)).reduce((acc, key) => `${acc} ${key}: ${get(this, `${prop}.${key}`)};`, ''));
});
