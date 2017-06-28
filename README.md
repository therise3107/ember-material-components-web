# ember-material-components-web

[![Travis branch](https://img.shields.io/travis/secondstreet/ember-material-components-web/master.svg)](https://travis-ci.org/secondstreet/ember-material-components-web)
[![npm](https://img.shields.io/npm/dw/ember-material-components-web.svg)](https://www.npmjs.com/package/ember-material-components-web)
[![npm](https://img.shields.io/npm/v/ember-material-components-web.svg)](https://www.npmjs.com/package/ember-material-components-web)
[![npm](https://img.shields.io/npm/l/ember-material-components-web.svg)](https://choosealicense.com/licenses/mit/)
[![GitHub issues](https://img.shields.io/github/issues/secondstreet/ember-material-components-web.svg)](https://github.com/secondstreet/ember-material-components-web/issues)
[![David](https://img.shields.io/david/dev/secondstreet/ember-material-components-web.svg)](https://david-dm.org/secondstreet/ember-material-components-web?type=dev)
[![David](https://img.shields.io/david/secondstreet/ember-material-components-web.svg)](https://david-dm.org/secondstreet/ember-material-components-web)

`ember-material-components-web`, or MDC-Ember, is an Ember CLI addon that provides the Ember way to use [`material-components-web` (MDC-Web)](https://material.io/components/web/). It installs and uses the CSS and JavaScript directly from Google's packages, and provides components you can drop right into your application.

Until proper documentation can be written, please refer to the extensive JSDoc comments in the addon/ directory.

## Demo

A demo app can be found at [secondstreet.github.io/ember-material-components-web](https://secondstreet.github.io/ember-material-components-web/). Its source code is in [`tests/dummy/app`](https://github.com/secondstreet/ember-material-components-web/tree/master/tests/dummy/app) in this repo.


## Installation

```sh
ember install ember-material-components-web
```

## Upgrading

It's advisable to run `ember g ember-material-components-web` between upgrades as dependencies may have been added, removed, or upgraded between releases. Please try this, along with clearing node_modules and bower_components before reporting issues after upgrading.

Also please note that independently upgrading any of the `@material/[...]` packages in your `package.json`'s `devDependencies` _may_ introduce bugs, as Google is quickly iterating and introducing breaking chanegs on [MDC-Web](https://material.io/components/web/).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
