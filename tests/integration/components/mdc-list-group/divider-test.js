import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-list-group/divider', 'Integration | Component | mdc list group/divider', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-list-group/divider}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-list-group/divider}}
      template block text
    {{/mdc-list-group/divider}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
