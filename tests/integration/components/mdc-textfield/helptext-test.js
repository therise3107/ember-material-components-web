import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-textfield/helptext', 'Integration | Component | mdc textfield/helptext', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-textfield/helptext}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-textfield/helptext}}
      template block text
    {{/mdc-textfield/helptext}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
