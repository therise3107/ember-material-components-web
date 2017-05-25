import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-tab-bar/tab/icon', 'Integration | Component | mdc tab bar/tab/icon', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-tab-bar/tab/icon}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-tab-bar/tab/icon}}
      template block text
    {{/mdc-tab-bar/tab/icon}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
