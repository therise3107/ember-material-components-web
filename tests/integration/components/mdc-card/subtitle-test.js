import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-card/subtitle', 'Integration | Component | mdc card/subtitle', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-card/subtitle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-card/subtitle}}
      template block text
    {{/mdc-card/subtitle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
