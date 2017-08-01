import Ember from 'ember';
import { MDCTabBarScrollerFoundation } from '@material/tabs';
import { getCorrectPropertyName } from '@material/animation';
import { MDCComponent } from '../mixins/mdc-component';
import layout from '../templates/components/mdc-tab-bar-scroller';
import getElementProperty from '../utils/get-element-property';
import getComponentProperty from '../utils/get-component-property';
import styleComputed from '../utils/style-computed';

const { get, computed, set, run } = Ember;
const { cssClasses, strings } = MDCTabBarScrollerFoundation;

export default Ember.Component.extend(MDCComponent, {
  //region Ember Hooks
  classNames: ['mdc-tab-bar-scroller'],
  layout,
  init() {
    this._super(...arguments);
    set(this, 'backIndicatorClasses', Ember.A([]));
    set(this, 'forwardIndicatorClasses', Ember.A([]));
    set(this, 'mdcScrollFrameStyles', {});
  },
  didInsertElement() {
    this._super(...arguments);
    set(this, 'scrollFrameElement', getElementProperty(this, 'querySelector')(strings.FRAME_SELECTOR));
    set(this, 'tabBarElement', getElementProperty(this, 'querySelector')(strings.TABS_SELECTOR));
    set(this, 'forwardIndicatorElement', getElementProperty(this, 'querySelector')(strings.INDICATOR_FORWARD_SELECTOR));
    set(this, 'backIndicatorElement', getElementProperty(this, 'querySelector')(strings.INDICATOR_BACK_SELECTOR));
  },
  //endregion

  //region Properties
  /**
   * @type {Object}
   */
  CLASS_NAMES: cssClasses,

  /**
   * @type {Object}
   */
  scrollFrameElement: null,

  /**
   * @type {Object}
   */
  tabBarElement: null,

  /**
   * @type {Object}
   */
  forwardIndicatorElement: null,

  /**
   * @type {Object}
   */
  backIndicatorElement: null,

  /**
   * @type {String[]}
   */
  backIndicatorClasses: null,

  /**
   * @type {String[]}
   */
  forwardIndicatorClasses: null,

  /**
   * @type {Ember.Component}
   */
  'tab-bar': null,

  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcScrollFrameStyles: null,
  //endregion

  //region Methods
  createFoundation() {
    return new MDCTabBarScrollerFoundation({
      addClass: (className) => run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: (className) => run(() => get(this, 'mdcClasses').removeObject(className)),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      addClassToForwardIndicator: (className) => run(() => get(this, 'forwardIndicatorClasses').addObject(className)),
      removeClassFromForwardIndicator: (className) => run(() => get(this, 'forwardIndicatorClasses').removeObject(className)),
      addClassToBackIndicator: (className) => run(() => get(this, 'backIndicatorClasses').addObject(className)),
      removeClassFromBackIndicator: (className) => run(() => get(this, 'backIndicatorClasses').removeObject(className)),
      isRTL: () => getElementProperty(this, 'direction') === 'rtl',
      registerBackIndicatorClickHandler: (handler) => get(this, 'backIndicatorElement').addEventListener('click', handler),
      deregisterBackIndicatorClickHandler: (handler) => get(this, 'backIndicatorElement').removeEventListener('click', handler),
      registerForwardIndicatorClickHandler: (handler) => get(this, 'forwardIndicatorElement').addEventListener('click', handler),
      deregisterForwardIndicatorClickHandler: (handler) => get(this, 'forwardIndicatorElement').removeEventListener('click', handler),
      registerCapturedInteractionHandler: (evt, handler) => get(this, 'element').addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) => get(this, 'element').removeEventListener(evt, handler, true),
      registerWindowResizeHandler: (handler) => window.addEventListener('resize', handler),
      deregisterWindowResizeHandler: (handler) => window.removeEventListener('resize', handler),
      getNumberOfTabs: () => get(this, 'tab-bar.tabs.length'),
      getComputedWidthForTabAtIndex:  (index) => getComponentProperty(get(this, 'tab-bar').tabAt(index), 'computedWidth', 0),
      getComputedLeftForTabAtIndex: (index) => getComponentProperty(get(this, 'tab-bar').tabAt(index), 'computedLeft', 0),
      getOffsetWidthForScrollFrame: () => get(this, 'scrollFrameElement').offsetWidth,
      getScrollLeftForScrollFrame: () => get(this, 'scrollFrameElement').scrollLeft,
      setScrollLeftForScrollFrame: (scrollLeftAmount) =>  get(this, 'scrollFrameElement').scrollLeft = scrollLeftAmount,
      getOffsetWidthForTabBar: () => get(this, 'tabBarElement').offsetWidth,
      setTransformStyleForTabBar: (value) => {
        this.setStyleFor('mdcScrollFrameStyles', getCorrectPropertyName(window, 'transform'), value);
      },
      getOffsetLeftForEventTarget: (target) => target.offsetLeft,
      getOffsetWidthForEventTarget: (target) => target.offsetWidth
    });
  },
  //endregion

  //region Computed Properties
  scrollFrameStyles: styleComputed('mdcScrollFrameStyles'),
  /**
   * @returns {String}
   */
  backIndicatorClassNames: computed('backIndicatorClasses.[]', function() {
    return get(this, 'backIndicatorClasses').join(' ');
  }),
  /**
   * @returns {String}
   */
  forwardIndicatorClassNames: computed('forwardIndicatorClasses.[]', function() {
    return get(this, 'forwardIndicatorClasses').join(' ');
  }),
  //endregion

  //region Actions
  actions: {
    registerTabBar(tabBar) {
      set(this, 'tab-bar', tabBar);
    },
    deregisterTabBar() {
      set(this, 'tab-bar', null);
    }
  }
  //endregion
});
