import Ember from 'ember';
import layout from '../../templates/components/mdc-textfield/helptext';
import { MDCTextfieldFoundation } from '@material/textfield';

const { get, computed } = Ember;
const { strings: { ROLE, ARIA_HIDDEN } } = MDCTextfieldFoundation;
const mdcAttrs = [ROLE, ARIA_HIDDEN];

const MDCTextfieldHelptextComponent = Ember.Component.extend({
  //region Attributes
  /**
   * @type {String[][]}
   */
  'attribute-pairs': null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'p',
  classNames: ['mdc-textfield-helptext'],
  classNameBindings: ['class-names'],
  attributeBindings: mdcAttrs
  //endregion
});

mdcAttrs.forEach(attr => {
  MDCTextfieldHelptextComponent.reopen({
    [attr]: computed('attribute-pairs.[]', function() {
      const found = get(this, 'attribute-pairs').find(x => x[0] === attr);
      if (!found) { return null; }
      return found[1];
    })
  });
});

export default MDCTextfieldHelptextComponent;
