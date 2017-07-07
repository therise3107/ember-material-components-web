import Ember from 'ember';
import layout from '../templates/components/mdc-linear-progress';
import { MDCLinearProgressFoundation } from '@material/linear-progress';
import { MDCComponent } from '../mixins/mdc-component';

const { get, set } = Ember;

const { cssClasses, strings } = MDCLinearProgressFoundation;

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  role: 'progressbar',

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
  didReceiveAttrs() {
    this._super(...arguments);
    this.sync('progress');
  },
  //endregion

  //region Properties
  mdcLinearProgress: null,
  //endregion

  //region Methods
  createFoundation() {
    return new MDCLinearProgressFoundation({
      hasClass: (className) => get(this, 'element').classList.contains(className),
      addClass: (className) => Ember.run(() => get(this, 'mdcClasses').addObject(className)),
      removeClass: (className) => Ember.run(() => get(this, 'mdcClasses').addObject(className)),
      getPrimaryBar: () => this.$(strings.PRIMARY_BAR_SELECTOR),
      getBuffer: () => this.$(strings.BUFFER_SELECTOR),
      setStyle: (el, property, value) => el.css(property, value)
    });
  },
  afterFoundationCreation() {
    this.sync('progress');
  }
  //endregion
});
