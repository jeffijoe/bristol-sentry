'use strict';


/**
 * Factory to make a Bristol target.
 * Installs it's own formatter.
 *
 * @param  {object} config
 * A configuration object.
 *
 * @return {Function}
 * A Bristol-compatible target function.
 */
module.exports = function makeSentryTarget(config) {
  function logToSentry(opts, severity, date, elems) {
    console.log('I do stuff.', severity, date, elems);
  }

  logToSentry.formatter = function sentryFormatter(severity, date, elems) {
    // body...
  }

  return logToSentry;
};