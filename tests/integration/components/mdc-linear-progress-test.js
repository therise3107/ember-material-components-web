import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-linear-progress', 'Integration | Component | mdc linear progress', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(5);
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('isAccent', false);
  this.set('myProgress', 0.5);
  this.set('isIndeterminate', false);
  this.set('mdcFoundation', {
    setProgress: (x) => {
      assert.equal(x, this.get('myProgress'));
    }
  });
  this.render(hbs`{{mdc-linear-progress accent=isAccent progress=myProgress indeterminate=isIndeterminate foundation=mdcFoundation}}`);

  assert.equal(this.$().text().trim(), '');

  assert.notOk(this.$('.mdc-linear-progress').hasClass('mdc-linear-progress--indeterminate'), 'Progress bar is not in indeterminate state');

  this.set('myProgress', 0.8);

  this.set('isAccent', true);
  this.set('isIndeterminate', true);
  assert.ok(this.$('.mdc-linear-progress').hasClass('mdc-linear-progress--indeterminate'), 'Progress bar is in indeterminate state');
  assert.ok(this.$('.mdc-linear-progress').hasClass('mdc-linear-progress--accent'), 'Progress bar is in accented variation');
});
