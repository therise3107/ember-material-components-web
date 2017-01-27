import Ember from 'ember';
import layout from '../templates/components/mdc-menu-anchor';

const { get } = Ember;

export default Ember.Component.extend({
  //region Ember Hooks
  layout,
  classNames: ['mdc-menu-anchor'],
  //endregion

  //region Methods
  /**
   * @public
   * @returns {DOMRect|null}
   */
  getAnchorDimensions() {
    const el = get(this, 'element');
    if (!el) { return null; }
    return el.getBoundingClientRect();
  }
  //endregion
});
