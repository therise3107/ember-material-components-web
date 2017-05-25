import Ember from 'ember';
import layout from '../templates/components/mdc-toolbar';
import { MDCToolbarFoundation, util } from '@material/toolbar';
import { MDCComponent } from '../mixins/mdc-component';
import styleComputed from '../utils/style-computed';

const { get, set } = Ember;

const { cssClasses, strings } = MDCToolbarFoundation;

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  fixed: false,
  /**
   * @type {Boolean}
   */
  waterfall: false,
  /**
   * @type {Boolean}
   */
  flexible: false,
  /**
   * @type {Boolean}
   */
  'fixed-lastrow-only': false,
  /**
   * @type {Function<Object>}
   */
  'onchange': x => x,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-toolbar'],
  classNameBindings: [
      `fixed:${cssClasses.FIXED}`,
      'waterfall:mdc-toolbar--waterfall',
      `flexible:${cssClasses.TOOLBAR_ROW_FLEXIBLE}`,
      `fixed-lastrow-only:${cssClasses.FIXED_LASTROW}`
  ],
  init() {
    this._super(...arguments);
    set(this, 'mdcStyles', {});
    set(this, 'mdcTitleStyles', {});
    set(this, 'mdcFirstRowStyles', {});
    set(this, 'rows', Ember.A([]));
  },
  attributeBindings: ['style'],
  //endregion

  //region Properties
  /**
   * @type {Ember.Component[]}
   */
  rows: null,
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcStyles: null,
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcTitleStyles: null,
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcFirstRowStyles: null,
  //endregion

  //region Computed Properties
  style: styleComputed('mdcStyles'),
  titleStyle: styleComputed('mdcTitleStyles'),
  firstRowStyle: styleComputed('mdcFirstRowStyles'),
  firstRow: Ember.computed.readOnly('rows.firstObject'),
  //endregion

  //region Methods
  createFoundation() {
    return new MDCToolbarFoundation({
      hasClass: (className) => get(this, 'element').classList.contains(className),
      addClass: (className) => Ember.run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: (className) => Ember.run(() => get(this, 'mdcClasses').removeObject(className)),
      registerScrollHandler: (handler) => window.addEventListener('scroll', handler, util.applyPassive()),
      deregisterScrollHandler: (handler) => window.removeEventListener('scroll', handler, util.applyPassive()),
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      getViewportWidth: () => window.innerWidth,
      getViewportScrollY: () => window.pageYOffset,
      getOffsetHeight: () => get(this, 'element').offsetHeight,
      getFlexibleRowElementOffsetHeight: () => get(this, 'element').querySelector(strings.FLEXIBLE_ROW_SELECTOR).offsetHeight,
      notifyChange: (evtData) => Ember.run(() => get(this, 'onchange')(evtData)),
      setStyle: (property, value) => this.setStyleFor('mdcStyles', property, value),
      setStyleForTitleElement: (property, value) => this.setStyleFor('mdcTitleStyles', property, value),
      setStyleForFlexibleRowElement: (property, value) => this.setStyleFor('mdcFirstRowStyles', property, value),
      setStyleForFixedAdjustElement: () => null, // no-op
    });
  },
  //endregion

  //region Actions
  actions: {
    /**
     * @param {Ember.Component} row
     */
    registerRow(row) {
      get(this, 'rows').addObject(row);
    },
    /**
     * @param {Ember.Component} row
     */
    deregisterRow(row) {
      get(this, 'rows').removeObject(row);
    }
  }
  //endregion
});
