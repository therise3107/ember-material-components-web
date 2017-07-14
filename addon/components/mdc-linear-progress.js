import Ember from 'ember';
import layout from '../templates/components/mdc-linear-progress';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { MDCComponent } from '../mixins/mdc-component';
import getElementProperty from '../utils/get-element-property';
import styleComputed from '../utils/style-computed';

const { get, set } = Ember;

const { cssClasses, strings } = MDCLinearProgressFoundation;

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * @type {Boolean}
   */
  closed: false,

  /**
   * @type {Boolean}
   */
  indeterminate: false,

  /**
   * @type {Boolean}
   */
  reversed: false,

  /**
   * @type {Boolean}
   */
  accent: false,

  /**
   * @type {Number}
   * Must be a value between 0 and 1
   */
  progress: 1,
  //endregion

  //region Ember Hooks
  layout,
  classNames: ['mdc-linear-progress'],
  classNameBindings: [
    `indeterminate:${cssClasses.INDETERMINATE_CLASS}`,
    `closed:${cssClasses.CLOSED_CLASS}`,
    `reversed:${cssClasses.REVERSED_CLASS}`,
    'accent:mdc-linear-progress--accent'
  ],
  attributeBindings: ['role'],
  init() {
    this._super(...arguments);
    set(this, 'mdcPrimaryBarStyles', {});
    set(this, 'mdcBufferStyles', {});
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.sync('progress');
  },
  //endregion

  //region Properties
  role: 'progressbar',
  /**
   * Key value pairs for CSS styles
   * @type {Object}
   */
  mdcPrimaryBarStyles: null,
  mdcBufferStyles: null,
  //endregion

  //region Computed Properties
  primaryBarStyles: styleComputed('mdcPrimaryBarStyles'),
  bufferStyles: styleComputed('mdcBufferStyles'),
  //endregion

  //region Methods
  createFoundation() {
    return new MDCLinearProgressFoundation({
      hasClass: (className) => get(this, 'mdcClasses').includes(className),
      addClass: (className) => Ember.run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: (className) => Ember.run(() => get(this, 'mdcClasses').removeObject(className)),
      getPrimaryBar: () => getElementProperty(this, 'querySelector')(strings.PRIMARY_BAR_SELECTOR),
      getBuffer: () => getElementProperty(this, 'querySelector')(strings.BUFFER_SELECTOR),
      setStyle: (el, property, value) => {
        let elementStyles;
        if (el.classList.contains(strings.PRIMARY_BAR_SELECTOR.slice(1))) {
          elementStyles = 'mdcPrimaryBarStyles';
        }
        else if (el.classList.contains(strings.BUFFER_SELECTOR.slice(1))) {
          elementStyles = 'mdcBufferStyles';
        }
        this.setStyleFor(elementStyles, property, value);
      }
    });
  },
  afterFoundationCreation() {
    this.sync('progress');
  }
  //endregion
});
