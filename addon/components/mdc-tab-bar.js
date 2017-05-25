import Ember from 'ember';
import layout from '../templates/components/mdc-tab-bar';
import { MDCTabBarFoundation } from '@material/tabs';
import { MDCComponent } from '../mixins/mdc-component';

const { computed, get, set } = Ember;
const { strings } = MDCTabBarFoundation;

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  links: true,
  /**
   * @type {Function}
   * @param {Object} evtData
   */
  onchange: x => x,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-tab-bar'],
  classNameBindings: ['isIconsOnly:mdc-tab-bar--icon-tab-bar', 'isIconsWithText:mdc-tab-bar--icons-with-text'],
  init() {
    this._super(...arguments);
    set(this, 'tabs', Ember.A([]));
    set(this, 'mdcIndicatorStyles', {});
  },
  //endregion

  //region Properties
  /**
   * @type {Ember.Component[]}
   */
  tabs: null,
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcIndicatorStyles: null,
  //endregion

  //region Computed Properties
  isIconsOnly: computed('', function() {
    // TODO
  }),
  isIconsWithText: computed('', function() {
    // TODO
  }),
  //endregion

  //region Method
  createFoundation() {
    return new MDCTabBarFoundation({
      addClass: (className) => Ember.run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: (className) => Ember.run(() => get(this, 'mdcClasses').removeObject(className)),
      bindOnMDCTabSelectedEvent: () => null, // no-op because this is bound with Ember actions
      unbindOnMDCTabSelectedEvent: () => null, // no-op because this is bound with Ember actions
      registerResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterResizeHandler: (handler) => window.removeEventListener('resize', handler),
      getOffsetWidth: () => get(this, 'element').offsetWidth,
      setStyleForIndicator: (propertyName, value) => this.setStyleFor('mdcIndicatorStyles', propertyName, value),
      getOffsetWidthForIndicator: () => get(this, 'element').querySelector(strings.INDICATOR_SELECTOR).offsetWidth,
      notifyChange: (evtData) => get(this, 'onchange')(evtData), // TODO
      getNumberOfTabs: () => get(this, 'tabs.length'),
      isTabActiveAtIndex: (index) => this.isTabActiveAtIndex(index),
      setTabActiveAtIndex: (index, isActive) => this.setTabActiveAtIndex(index, isActive),
      isDefaultPreventedOnClickForTabAtIndex: (index) => get(this.tabAt(index), 'preventDefaultOnClick'),
      setPreventDefaultOnClickForTabAtIndex: (index, preventDefaultOnClick) => Ember.run(() => set(this.tabAt(index), 'preventDefaultOnClick', preventDefaultOnClick)),
      measureTabAtIndex: (index) => this.tabAt(index).measureSelf(),
      getComputedWidthForTabAtIndex: (index) => get(this.tabAt(index), 'computedWidth'),
      getComputedLeftForTabAtIndex: (index) => get(this.tabAt(index), 'computedLeft'),
    });
  },
  tabAt(index) {
    return get(this, 'tabs').objectAt(index);
  },
  setTabActiveAtIndex(index, isActive) {
    if (get(this, 'links')) {
      this.tabAt(index)._invoke({ stopPropagation() {}, preventDefault() {} }); // TODO: Probably shouldn't be calling private APIs or stubbing events
    }
    else {
      get(this.tabAt(index), 'become-active')(isActive);
    }
  },
  isTabActiveAtIndex(index) {
    return !!get(this.tabAt(index), 'active');
  },
  //endregion

  //region Actions
  actions: {
    tabSelected({ tab }, shouldNotifyChange) {
      const index = get(this, 'tabs').indexOf(tab);
      Ember.run(() => get(this, 'foundation').switchToTabAtIndex(index, shouldNotifyChange));
    },
    registerTab(tab) {
      get(this, 'tabs').addObject(tab);
    },
    deregisterTab(tab) {
      get(this, 'tabs').removeObject(tab);
    },
    switchToTab(tab) {
      Ember.run.next(() => get(this, 'foundation').switchToTabAtIndex(get(this, 'tabs').indexOf(tab), true));
    }
  }
  //endregion
});
