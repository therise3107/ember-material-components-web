/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var materialPackages = [
  { name: '@material/checkbox', css: true, js: true },
  { name: '@material/radio', css: true, js: true },
  { name: '@material/button', css: true, js: false },
  { name: '@material/fab', css: true, js: false },
  { name: '@material/card', css: true, js: false },
  { name: '@material/icon-toggle', css: true, js: true },
  { name: '@material/elevation', css: true, js: false },
  { name: '@material/list', css: true, js: false },
  { name: '@material/form-field', css: true, js: false },
  { name: '@material/textfield', css: true, js: true },
  { name: '@material/menu', css: true, js: true },
  { name: '@material/toolbar', css: true, js: true },
  { name: '@material/tabs', css: true, js: true }
];

/**
 * The `index.js` file is the main entry point for all Ember CLI addons. The
 * object we export from this file is turned into an Addon class
 * (https://github.com/ember-cli/ember-cli/blob/master/lib/models/addon.js) by
 * Ember CLI.
 *
 * This addon does a number of things all in service of one goal: it makes
 * Google's Material Design web components available in your Ember app.
 *
 *
 * At a high level, the flow for the addon is:
 *
 * 1. When a build starts and the addon is included, tell Ember CLI to import
 *    `vendor/@material/componentname.js` into the vendor.js file for each of
 *    the Material Design Components published by Google. These files don't
 *    actually exist yet; we'll create them later.
 * 2. When Ember CLI asks for the addon's vendor tree, we'll return a Broccoli
 *    tree that contains all of the MDC JavaScript, made compatible with
 *    Ember's module system.
 */
module.exports = {
  name: 'ember-material-components-web',
  isDevelopingAddon: function() { return true; }, // Remove this once we're stable
  /**
   * Invoked at the beginning of the build process, this hook allows us to
   * use the `import()` method to include files from our `vendor` tree into
   * the built app.
   */
  included: function(app) {
    materialPackages.forEach(function(pkg) {
      var pkgBaseName = pkg.name.replace('@material/', '');
      if (pkg.js) {
        app.import('vendor/ember-material-components-web/dist/mdc.' + camelize(pkgBaseName) + '.min.js', {
          using: [{ transformation: 'amd', as: pkg.name }]
        });
      }
      if (pkg.css) {
        app.import('vendor/ember-material-components-web/dist/mdc.' + pkgBaseName + '.min.css');
      }
    });
  },
  /**
   * Returns a Broccoli tree for the addon's `vendor` directory. The `vendor`
   * directory isn't explicitly used for anything, but files can be `import()`ed
   * which we do in the `included` hook above.
   *
   * This is necessary because Ember CLI doesn't currently support `import()`ing
   * anything directly from a `node_modules/` folder.
   */
  treeForVendor: function() {
    var trees = materialPackages.map(function(pkg) {
      var include = [];
      if (pkg.css) { include.push('dist/mdc.*.min.css'); }
      if (pkg.js) { include.push('dist/mdc.*.min.js'); }
      return new Funnel('node_modules/' + pkg.name, {
        destDir: 'ember-material-components-web',
        include: include
      });
    });

    return this._super(mergeTrees(trees, { overwrite: true }));
  }
};

/*!
 * The camelize function and its RegExps are under the MIT License
 * Copyright (c) 2016 Yehuda Katz, Tom Dale and Ember.js contributors
 * https://github.com/emberjs/ember.js/blob/v2.10.0/packages/ember-runtime/lib/system/string.js#L25-L29
 */
var STRING_CAMELIZE_REGEXP_1 = (/(\-|\_|\.|\s)+(.)?/g);
var STRING_CAMELIZE_REGEXP_2 = (/(^|\/)([A-Z])/g);
function camelize(str) {
  return str.replace(STRING_CAMELIZE_REGEXP_1, function(match, separator, chr) {
    return chr ? chr.toUpperCase() : '';
  }).replace(STRING_CAMELIZE_REGEXP_2, function(match, separator, chr) {
    return match.toLowerCase();
  });
};
