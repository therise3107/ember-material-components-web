import Ember from 'ember';
import layout from '../templates/components/mdc-textfield';
import { MDCComponent, addClass, removeClass } from '../mixins/mdc-component';
import { MDCTextfieldFoundation } from '@material/textfield';

const { cssClasses } = MDCTextfieldFoundation;
const { get, set, computed } = Ember;

export default Ember.Component.extend(MDCComponent, {
  //region Attributes
  /**
   * This property is considered read-only by the component, and will not be
   * updated by user action. Please see `onchange` to handle user actions.
   * @type {String}
   */
  value: '',
  /**
   * @type {Boolean}
   */
  disabled: false,
  /**
   * Only used if `multiline` is false.
   * @type {String}
   */
  type: 'text',
  /**
   * This will be called when the user indicates they want to change the value
   * of the input. If you want to simulate two-way binding, you can use the
   * input like this:
   *
   * {{#mdc-textfield value=myValue onchange=(action (mut myValue)) as |tf|}}
   *   {{tf.input type="text"}}
   * {{/mdc-textfield}}
   *
   * @type {Function}
   * @param {Boolean} checked
   */
  onchange: x => x,
  /**
   * @type {Boolean}
   */
  valid: true,
  /**
   * @type {Boolean}
   */
  'helptext-persistent': false,
  /**
   * @type {Boolean}
   */
  'helptext-validation-msg': false,
  /**
   * @type {Boolean}
   */
  fullwidth: false,
  /**
   * @type {Boolean}
   */
  multiline: false,
  /**
   * Only if `multiline` is `true`.
   * @type {?Number}
   */
  rows: null,
  /**
   * Only if `multiline` is `true`.
   * @type {?Number}
   */
  cols: null,
  //endregion

  //region Ember Hooks
  layout,
  tagName: '',
  init() {
    [
      'labelClasses',
      'helpTextAttrs',
      'inputFocusHandlers',
      'inputBlurHandlers',
      'inputInputHandlers',
      'inputKeydownHandlers',
    ].forEach(prop => set(this, prop, []));
    this._super(...arguments);
  },
  //endregion

  //region Properties
  /**
   * @type {String[]}
   */
  labelClasses: null,
  /**
   * An array of name/value pairs that should be HTML attributes of the help text element.
   * @type {String[][]}
   */
  helpTextAttrs: null,
  /**
   * @type {EventListener[]}
   */
  inputFocusHandlers: null,
  /**
   * @type {EventListener[]}
   */
  inputBlurHandlers: null,
  /**
   * @type {EventListener[]}
   */
  inputInputHandlers: null,
  /**
   * @type {EventListener[]}
   */
  inputKeydownHandlers: null,
  //endregion

  //region Computed Properties
  /**
   * @type {String}
   */
  labelClassnames: computed('value', 'labelClasses.[]', function() {
    const classnames = [];
    if (get(this, 'value')) {
      classnames.addObject('mdc-textfield__label--float-above');
    }
    return classnames.concat(get(this, 'labelClasses')).join(' ');
  }),
  helptextClassnames: computed('helptext-persistent', 'helptext-validation-msg', function() {
    const classnames = [];
    if (get(this, 'helptext-persistent')) {
      classnames.addObject(cssClasses.HELPTEXT_PERSISTENT);
    }
    if (get(this, 'helptext-validation-msg')) {
      classnames.addObject(cssClasses.HELPTEXT_VALIDATION_MSG);
    }
    return classnames.join(' ');
  }),
  //endregion

  //region Methods
  existingHelpTextAttr(name) {
    return get(this, 'helpTextAttrs').find(attr => attr[0] === name);
  },
  createFoundation() {
    const component = this;
    return new MDCTextfieldFoundation({
      addClass(className) {
        return addClass(className, component);
      },
      removeClass(className) {
        return removeClass(className, component);
      },
      addClassToLabel(className) {
        get(component, 'labelClasses').addObject(className);
      },
      removeClassFromLabel(className) {
        get(component, 'labelClasses').removeObject(className);
      },
      helptextHasClass(className) {
        return get(component, 'helptextClassnames').split(' ').includes(className);
      },
      setHelptextAttr(name, value) {
        const existing = component.existingHelpTextAttr(name);
        const attrs = get(component, 'helpTextAttrs');
        if (existing) {
          // Here we do a removeObject instead of simply changing the value,
          // because Ember does not support computed property dependent keys
          // watching changes to arrays within arrays.
          attrs.removeObject(existing);
        }
        attrs.addObject([name, value]);
      },
      removeHelptextAttr(name) {
        const existing = component.existingHelpTextAttr(name);
        if (existing) {
          get(component, 'helpTextAttrs').removeObject(existing);
        }
      },
      registerInputFocusHandler(handler) {
        get(component, 'inputFocusHandlers').addObject(handler);
      },
      deregisterInputFocusHandler(handler) {
        get(component, 'inputFocusHandlers').removeObject(handler);
      },
      registerInputBlurHandler(handler) {
        get(component, 'inputBlurHandlers').addObject(handler);
      },
      deregisterInputBlurHandler(handler) {
        get(component, 'inputBlurHandlers').removeObject(handler);
      },
      registerInputInputHandler(handler) {
        get(component, 'inputInputHandlers').addObject(handler);
      },
      deregisterInputInputHandler(handler) {
        get(component, 'inputInputHandlers').removeObject(handler);
      },
      registerInputKeydownHandler(handler) {
        get(component, 'inputKeydownHandlers').addObject(handler);
      },
      deregisterInputKeydownHandler(handler) {
        get(component, 'inputKeydownHandlers').removeObject(handler);
      },
      getNativeInput() {
        const  value = get(component, 'value');
        return {
          value,
          disabled: get(component, 'disabled'),
          checkValidity: () => get(component, 'valid')
        };
      }
    });
  },
  //endregion
  //region Actions
  actions: {
    handle(type, ev) {
      get(this, `input ${type} handlers`.camelize()).forEach(handler => handler(ev));
    },
    handleInput(ev) {
      this.send('handle', 'input', ev);
      get(this, 'onchange')(ev.target.value);
    }
  }
  //endregion
});
