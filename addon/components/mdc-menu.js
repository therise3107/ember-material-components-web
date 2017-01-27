import Ember from 'ember';
import layout from '../templates/components/mdc-menu';
import { MDCComponent, addClass, removeClass } from '../mixins/mdc-component';
import { MDCSimpleMenuFoundation } from '@material/menu';

const { get, set } = Ember;
const { strings } = MDCSimpleMenuFoundation;
const TRANSFORM_PROPERTY = ('transform' in document.createElement('span')) ? 'transform' : 'webkitTransform';

/**
 * @typedef {Ember.Component} MDCMenuComponent
 */
export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  open: false,
  /**
   * If you are using this component within an instance of `mdc-menu-anchor`,
   * that will yield its component instance. Pass it to here as `anchor`.
   * @type {?Ember.Component}
   */
  anchor: null,
  /**
   * Pass an action to call when the menu is canceled without selection.
   * @type {?Function}
   */
  cancel: x => x,
  //endregion

  //region Ember Hooks
  init() {
    this._super(...arguments);
    set(this, 'items', []);
  },
  didInsertElement() {
    this._super(...arguments);
    this.updateOpenness();
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.updateOpenness();
  },
  layout,
  classNames: ['mdc-simple-menu'],
  classNameBindings: ['mdcClassnames', 'open:mdc-simple-menu--open'],
  //endregion

  //region Properties
  /**
   * @type {MDCMenuItemComponent[]}
   */
  items: null,
  /**
   * @private
   * @type {HTMLElement}
   */
  previousFocus: null,
  //endregion

  //region Methods
  /**
   * @public
   * @param {MDCMenuItemComponent} item
   */
  registerItem(item) {
    get(this, 'items').addObject(item);
  },
  /**
   * @public
   * @param {MDCMenuItemComponent} item
   */
  unregisterItem(item) {
    get(this, 'items').removeObject(item);
  },
  updateOpenness() {
    const foundation = get(this, 'foundation');
    if (!foundation) { return; }
    //foundation[get(this, 'open') ? 'open' : 'close']();
  },
  createFoundation() {
    const component = this;
    return new MDCSimpleMenuFoundation({
      addClass(className) {
        addClass(className, component);
      },
      removeClass(className) {
        removeClass(className, component);
      },
      hasClass(className) {
        return get(component, 'element.classList').contains(className);
      },
      hasNecessaryDom() {
        if (!get(component, 'element')) { return false; }
        return !!component.$(strings.ITEMS_SELECTOR).length;
      },
      getInnerDimensions() {
        const $items = component.$(strings.ITEMS_SELECTOR);
        return {
          width: $items.width(),
          height: $items.height(),
        };
      },
      hasAnchor() {
        return !!get(component, 'anchor');
      },
      getAnchorDimensions() {
        return get(component, 'anchor').getAnchorDimensions();
      },
      getWindowDimensions() {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      setScale(x, y) {
        component.$().css(TRANSFORM_PROPERTY, `scale(${x}, ${y})`);
      },
      setInnerScale(x, y) {
        component.$(strings.ITEMS_SELECTOR).css(TRANSFORM_PROPERTY, `scale(${x}, ${y})`);
      },
      getNumberOfItems() {
        return get(component, 'items.length');
      },
      registerInteractionHandler(type, handler) {
        component.on(type, handler);
      },
      deregisterInteractionHandler(type, handler) {
        component.off(type, handler);
      },
      registerDocumentClickHandler(handler) {
        document.addEventListener('click', handler);
      },
      deregisterDocumentClickHandler(handler) {
        document.removeEventListener('click', handler);
      },
      getYParamsForItemAtIndex(index) {
        return get(component, 'items').objectAt(index).getYParams();
      },
      setTransitionDelayForItemAtIndex(index, value) {
        return get(component, 'items').objectAt(index).setTransitionDelay(value);
      },
      getIndexForEventTarget(target) {
        return get(component, 'items').mapBy('element').indexOf(target);
      },
      notifySelected({ index }) {
        get(component, 'items').objectAt(index).notifySelected(index);
      },
      notifyCancel() {
        get(component, 'cancel')();
      },
      saveFocus() {
        set(component, 'previousFocus', document.activeElement);
      },
      restoreFocus() {
        const previous = get(component, 'previousFocus');
        if (previous) {
          previous.focus();
        }
      },
      isFocused() {
        return document.activeElement === get(component, 'element');
      },
      focus() {
        get(component, 'element').focus();
      },
      getFocusedItemIndex() {
        get(component, 'items').mapBy('element').indexOf(document.activeElement);
      },
      focusItemAtIndex(index) {
        get(get(component, 'items').objectAt(index), 'element').focus();
      },
      isRtl() {
        return window.getComputedStyle(get(component, 'element')).getPropertyValue('direction') === 'rtl';
      },
      setTransformOrigin(value) {
        component.$().css(`${TRANSFORM_PROPERTY}-origin`, value);
      },
      setPosition({ top, right, bottom, left }) {
        component.$().css({
          top: top || null,
          right: right || null,
          bottom: bottom || null,
          left: left || null
        });
      }
    });
  }
  //endregion
});
