> Hello! Thanks for stopping by, but this module is not ready yet. Come back later! :D

# [Sentry](https://getsentry.com) transport + formatter for [Bristol](https://github.com/TomFrost/bristol)

[![npm version](https://badge.fury.io/js/bristol-sentry.svg)](https://badge.fury.io/js/bristol-sentry)
[![Dependency Status](https://david-dm.org/jeffijoe/bristol-sentry.svg)](https://david-dm.org/jeffijoe/bristol-sentry)
[![devDependency Status](https://david-dm.org/jeffijoe/bristol-sentry/dev-status.svg)](https://david-dm.org/jeffijoe/bristol-sentry#info=devDependencies)
[![Build Status](https://travis-ci.org/jeffijoe/bristol-sentry.svg?branch=master)](https://travis-ci.org/jeffijoe/bristol-sentry)
[![Coverage Status](https://coveralls.io/repos/github/jeffijoe/bristol-sentry/badge.svg?branch=master)](https://coveralls.io/github/jeffijoe/bristol-sentry?branch=master)
[![Code Climate](https://codeclimate.com/github/jeffijoe/bristol-sentry/badges/gpa.svg)](https://codeclimate.com/github/jeffijoe/bristol-sentry)

Bristol transport + formatter to send events and errors to Sentry.

## Installation

You will need to install this package, as well as `raven`, which is the Sentry node.js client.

```
npm install --save bristol-sentry raven bristol
```

## Getting started

```js
const bristol = require('bristol');
const raven = require('raven');
const bristolSentry = require('bristol-sentry');

const target = bristolSentry({ client: new raven.Client('<your sentry dsn>') });

// Add as a target with the included formatter.
bristol.addTarget(target).withFormatter(bristolSentry.formatter);

// Try it out
bristol.debug('here come dat boi');
bristol.info('watch him rollin watch him go');
bristol.warn('he be rollin', { rollinWhere: 'down the street' });
bristol.error(new Error('o shit waddup'));
```

> **IMPORTANT!** Sentry differentiates between errors and messages. An attempt to log an `Error` object will trigger a `captureException`, whereas anything else triggers a `captureMessage`.
> Since `captureException` does not store any message other than the one from the error, `bristol-sentry` will prepend the message (if any) to the `extra` array.

## Contributing

**You will need a Sentry DSN to run the tests!** Sign up for an account at [Sentry](https://getsentry.com).

You can either add it to your own environment (`SENTRY_DSN`), or you can create an `env.yaml` in the repository root, and add the following:

```yaml
test:
  SENTRY_DSN: <your dsn>
```

Usefull npm run scripts:

* `npm run test`: Runs tests once
* `npm run test-watch`: Runs tests in watch-mode
* `npm run lint`: Lints the code once
* `npm run lint-watch`: Lints the code in watch-mode
* `npm run cover`: Runs code coverage using `istanbul`
* `npm run coveralls`: Used by coveralls

# Author

Jeff Hansen - [@Jeffijoe](https://twitter.com/Jeffijoe)
