import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdc-tab-bar-scroller', 'Integration | Component | mdc tab bar scroller', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{#mdc-tab-bar-scroller as |scroller|}}
    {{#scroller.tab-bar links=false as |bar|}}
      {{#bar.tab}}
        One 
      {{/bar.tab}}
      {{#bar.tab}}
        Two 
      {{/bar.tab}}
      {{#bar.tab}}
        Three 
      {{/bar.tab}}
    {{/scroller.tab-bar}}
  {{/mdc-tab-bar-scroller}}`);

  assert.ok(this.$());

  //TODO: Add better tests!
});
