import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-list/item/start-detail', 'Integration | Component | mdc list/item/start detail', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-list/item/start-detail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-list/item/start-detail}}
      template block text
    {{/mdc-list/item/start-detail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
