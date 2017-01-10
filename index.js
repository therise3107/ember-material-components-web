/* jshint node: true */
'use strict';

var path = require('path');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var materialPackages = [
  '@material/base',
  '@material/checkbox'
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
      app.import('vendor/dist/mdc.' + pkg.replace('@material/', '') + '.min.js', {
        using: [{ transformation: 'amd', as: pkg }]
      });
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
      return new Funnel(path.dirname(require.resolve(pkg)), {
        files: [
          'dist/mdc.*.min.js'
        ]
      });
    });

    return this._super(mergeTrees(trees, { overwrite: true }));
  }
};
