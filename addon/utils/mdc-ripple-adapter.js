import Ember from 'ember';
import getElementProperty from '../utils/get-element-property';
//import { util } from '@material/ripple'; // TODO: //import { util } from '@material/ripple'; // TODO: URL
//region FIXME: Delete this once util can be imported.
/**
 * supportsCssVariables and getMatchesProperty are
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const util = {};
util.supportsCssVariables = (windowObj) => {
  const supportsFunctionPresent = windowObj.CSS && typeof windowObj.CSS.supports === 'function';
  if (!supportsFunctionPresent) {
    return;
  }

  const explicitlySupportsCssVars = windowObj.CSS.supports('--css-vars', 'yes');
  // See: https://bugs.webkit.org/show_bug.cgi?id=154669
  // See: README section on Safari
  const weAreFeatureDetectingSafari10plus = (
    windowObj.CSS.supports('(--css-vars: yes)') &&
    windowObj.CSS.supports('color', '#00000000')
  );
  return explicitlySupportsCssVars || weAreFeatureDetectingSafari10plus;
};
util.getMatchesProperty = (HTMLElementPrototype) => {
  return [
    'webkitMatchesSelector', 'msMatchesSelector', 'matches',
  ].filter((p) => p in HTMLElementPrototype).pop();
};
//endregion

const { get, run } = Ember;
const MATCHES = util.getMatchesProperty(HTMLElement.prototype);

/**
 * @param {Ember.Component} component - The component must mix in {@link MDCComponent}
 * @param {Object} overrides
 * @returns {Object}
 */
export const createRippleAdapter = (component, overrides) => Object.assign({
  browserSupportsCssVars: () => util.supportsCssVariables(window),
  isUnbounded: () => false,
  isSurfaceActive: () => get(component, 'element')[MATCHES](':active'),
  isSurfaceDisabled: () => get(component, 'disabled'),
  addClass: className => run(() => get(component, 'mdcClasses').addObject(className)),
  removeClass: className => run(() => get(component, 'mdcClasses').removeObject(className)),
  registerInteractionHandler: (evtType, handler) => component.registerMdcInteractionHandler(evtType, handler),
  deregisterInteractionHandler: (evtType, handler) => component.deregisterMdcInteractionHandler(evtType, handler),
  registerResizeHandler: handler => window.addEventListener('resize', handler),
  deregisterResizeHandler: handler => window.removeEventListener('resize', handler),
  updateCssVariable: (varName, value) => component.setStyleFor('mdcStyles', varName, value),
  computeBoundingRect: () => getElementProperty(this, 'getBoundingClientRect', () => ({ top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 }))(),
  getWindowPageOffset: () => ({ x: window.pageXOffset, y: window.pageYOffset })
}, overrides);

export default createRippleAdapter;
