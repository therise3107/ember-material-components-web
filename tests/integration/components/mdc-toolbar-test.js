import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-toolbar', 'Integration | Component | mdc toolbar', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`
    {{#mdc-toolbar as |toolbar|}}
      {{#toolbar.row as |row|}}
        {{#row.section}}
          template block text
        {{/row.section}}
      {{/toolbar.row}}
    {{/mdc-toolbar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
