import Ember from 'ember';
import layout from '../../templates/components/mdc-card/media-item';

const { get, computed } = Ember;
const MDC_1x_PIXELS = 80;

export default Ember.Component.extend({
  //region Attributes
  /**
   * Must be one of `1`, `1.5`, `2`, or `3`.
   * @type {Number}
   */
  size: 1,
  /**
   * @type {String}
   */
  src: null,
  /**
   * @type {String}
   */
  alt: null,
  /**
   * @type {?Number}
   */
  width: null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: 'img',
  attributeBindings: ['src', 'alt', 'width', 'height'],
  classNames: ['mdc-card__media-item'],
  classNameBindings: [
    'isOne:mdc-card__media-item--1x',
    'isOneDotFive:mdc-card__media-item--1dot5x',
    'isTwo:mdc-card__media-item--2x',
    'isThree:mdc-card__media-item--3x'
  ],
  //endregion

  //region Computed Properties
  isOne: computed.equal('size', 1),
  isOneDotFive: computed.equal('size', 1.5),
  isTwo: computed.equal('size', 2),
  isThree: computed.equal('size', 3),
  height: computed('size', function() {
    return MDC_1x_PIXELS * get(this, 'size');
  })
  //endregion
});
