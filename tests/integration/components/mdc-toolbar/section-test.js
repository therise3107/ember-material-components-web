import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-toolbar/section', 'Integration | Component | mdc toolbar/section', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-toolbar/section}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-toolbar/section}}
      template block text
    {{/mdc-toolbar/section}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
