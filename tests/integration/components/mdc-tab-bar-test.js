import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-tab-bar', 'Integration | Component | mdc tab bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mdc-tab-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mdc-tab-bar links=false additional-indicator-classes="foo" as |bar|}}
      {{#bar.tab}}template block text{{/bar.tab}}
    {{/mdc-tab-bar}}
    {{mdc-tab-bar/indicator}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
  assert.ok(this.$('.mdc-tab-bar .mdc-tab-bar__indicator'), 'tab bar indicator appears');

  assert.ok(this.$('.mdc-tab-bar .mdc-tab-bar__indicator').hasClass('foo'), 'custom class names can be passed into the indicator');
});
