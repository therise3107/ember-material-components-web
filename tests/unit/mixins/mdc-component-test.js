import Ember from 'ember';
import MdcComponentMixin from 'ember-material-components-web/mixins/mdc-component';
import { module, test } from 'qunit';

module('Unit | Mixin | mdc component');

// Replace this with your real tests.
test('it works', function(assert) {
  let MdcComponentObject = Ember.Object.extend(MdcComponentMixin);
  let subject = MdcComponentObject.create();
  assert.ok(subject);
});
