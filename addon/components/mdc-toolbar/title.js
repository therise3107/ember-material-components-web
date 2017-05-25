import Ember from 'ember';
import layout from '../../templates/components/mdc-toolbar/title';
import { MDCToolbarFoundation } from '@material/toolbar';

const { strings } = MDCToolbarFoundation;

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  classNames: [`${strings.TITLE_SELECTOR}`],
  attributeBindings: ['style'],
  //endregion

  //region Computed Properties
  style: Ember.computed.readOnly('title-style')
  //endregion
});
