import Ember from 'ember';
import layout from '../templates/components/mdc-checkbox';
import { MDCCheckbox, MDCCheckboxFoundation} from '@material/checkbox';

console.log('imported: ', MDCCheckbox, MDCCheckboxFoundation);

export default Ember.Component.extend({
  layout,
});
