import Ember from 'ember';
import layout from '../../templates/components/mdc-toolbar/section';

export default Ember.Component.extend({
  //region Attributes
  /**
   * Must be one of `start`,`center`, or `end`
   * @type {String}
   */
  align: 'center',
  /**
   * @type {Boolean}
   */
  'shrink-to-fit': false,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-toolbar__section'],
  classNameBindings: [
      'isAlignStart:mdc-toolbar__section--align-start',
      'isAlignEnd:mdc-toolbar__section--align-end',
      'shrink-to-fit:mdc-toolbar__section--shrink-to-fit'
  ],
  //endregion

  //region Computed Properties
  isAlignStart: Ember.computed.equal('align', 'start'),
  isAlignEnd: Ember.computed.equal('align', 'end')
  //endregion
});
