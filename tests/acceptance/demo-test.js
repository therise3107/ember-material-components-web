import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | demo');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    click('.toggle-demo-visibility');
    assert.ok(true);
  });
});
