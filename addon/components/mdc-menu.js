import Ember from 'ember';
import layout from '../templates/components/mdc-menu';
import { MDCComponent } from '../mixins/mdc-component';
import styleComputed from '../utils/style-computed';
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
    set(this, 'items', Ember.A([]));
    set(this, 'itemStyles', Ember.A([]));
  },
  didInsertElement() {
    this._super(...arguments);
    this.updateOpenness();
  },
  didUpdateAttrs() {
    this._super(...arguments);
    this.updateOpenness();
  },
  layout,
  classNames: ['mdc-simple-menu'],
  classNameBindings: ['mdcClassNames', 'open:mdc-simple-menu--open'],
  attributeBindings: ['style'],
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

  //region Computed Properties
  itemStyle: styleComputed('itemStyles'),
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
    const open = get(this, 'open');
    if (foundation.isOpen() && !open) {
      foundation.close();
    }
    if (!foundation.isOpen() && open) {
      foundation.open();
    }
  },
  itemAt(index) {
    return get(this, 'items').objectAt(index);
  },
  createFoundation() {
    return new MDCSimpleMenuFoundation({
      addClass: className => get(this, 'mdcClasses').addObject(className),
      removeClass: className => get(this, 'mdcClasses').removeObject(className),
      hasClass: className => get(this, 'element.classList').contains(className),
      hasNecessaryDom: () => !!get(this , 'element') && !!this.$(strings.ITEMS_SELECTOR).length,
      getInnerDimensions: () => {
        const $items = this.$(strings.ITEMS_SELECTOR);
        return { width: $items.width(), height: $items.height(), };
      },
      hasAnchor: () => get(this, 'anchor'),
      getAnchorDimensions: () => get(this, 'anchor').getAnchorDimensions(),
      getWindowDimensions: () => ({ width: window.innerWidth, height: window.innerHeight }),
      setScale: (x, y) => this.setStyleFor('mdcStyles', TRANSFORM_PROPERTY, `scale(${x}, ${y}`),
      setInnerScale: (x, y)  => this.setStyleFor('itemStyles', TRANSFORM_PROPERTY, `scale(${x}, ${y}`),
      getNumberOfItems: () => get(this, 'items.length'),
      registerInteractionHandler: (type, handler) => this.registerMdcInteractionHandler(type, handler),
      deregisterInteractionHandler: (type, handler) => this.deregisterMdcInteractionHandler(type, handler),
      registerBodyClickHandler: handler => document.body.addEventListener('click', handler),
      deregisterBodyClickHandler: handler => document.body.removeEventListener('click', handler),
      getYParamsForItemAtIndex: index => this.itemAt(index).getYParams(),
      setTransitionDelayForItemAtIndex: (index, value) => this.itemAt(index).setTransitionDelay(value),
      getIndexForEventTarget: target => get(this, 'items').mapBy('element').indexOf(target),
      notifySelected: ({ index }) => this.itemAt(index).notifySelected(index),
      notifyCancel: () => get(this, 'cancel')(false), // False is provided as a convenience for the {{mut}} helper
      saveFocus: () => set(this, 'previousFocus', document.activeElement),
      restoreFocus: () => get(this, 'previousFocus') && get(this, 'previousFocus').focus(),
      isFocused: () => document.activeElement === get(this, 'element'),
      focus: ()  => get(this, 'element').focus(),
      getFocusedItemIndex: () => get(this, 'items').mapBy('element').indexOf(document.activeElement),
      focusItemAtIndex: index => get(this.itemAt(index), 'element').focus(),
      isRtl: ()  => window.getComputedStyle(get(this, 'element')).getPropertyValue('direction') === 'rtl',
      setTransformOrigin: value => this.setStyleFor('mdcStyles', `${TRANSFORM_PROPERTY}-origin`, value),
      setPosition: ({ top, right, bottom, left }) => {
        this.setStyleFor('mdcStyles', 'top', top || null);
        this.setStyleFor('mdcStyles', 'right', right || null);
        this.setStyleFor('mdcStyles', 'bottom', bottom || null);
        this.setStyleFor('mdcStyles', 'left', left || null);
      },
      getAccurateTime: () => window.performance.now()
    });
  }
  //endregion
});
