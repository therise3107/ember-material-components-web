import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-toolbar/row', 'Integration | Component | mdc toolbar/row', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-toolbar/row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-toolbar/row}}
      template block text
    {{/mdc-toolbar/row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
