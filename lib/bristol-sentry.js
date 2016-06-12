'use strict';
const sentryFormatter = require('./formatter');
const bristolSeverityToSentryLevel = require('./bristolSeverityToSentryLevel');

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
  const client = config.client;

  /**
   * Function that actually does the logging.
   */
  function logToSentry(opts, severity, date, elems) {
    const method = elems.error ? 'captureException' : 'captureMessage';
    client[method](
      elems.error ? elems.error : elems.message,
      {
        // If logging an error, we want to add the message to the extra array, so
        // it does not get lost.
        extra: elems.error && elems.message ? [elems.message].concat(elems.extra) : elems.extra,
        level: bristolSeverityToSentryLevel(severity)
      }
    );
  }

  return logToSentry;
};

module.exports.formatter = sentryFormatter;