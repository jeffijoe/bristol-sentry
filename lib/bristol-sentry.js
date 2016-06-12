'use strict';
const isString = require('lodash/isString');
const isNumber = require('lodash/isNumber');
const isDate = require('lodash/isDate');
const isBoolean = require('lodash/isBoolean');
const isRegExp = require('lodash/isRegExp');
const isError = require('lodash/isError');
const anyOf = require('./anyOf');
const bristolSeverityToSentryLevel = require('./bristolSeverityToSentryLevel');

const isFormattable = anyOf([isString, isNumber, isDate, isBoolean, isRegExp]);

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
        extra: elems.extra,
        level: bristolSeverityToSentryLevel(severity)
      }
    );
  }

  /**
   * Formats log input so we can send it to sentry.
   */
  function sentryFormatter(opts, severity, date, elems) {
    // First item should always be the message.
    const messageParts = [];
    let skip = 0;
    let error;
    for (const elem of elems) {
      // Sentry does not allow passing a message to captureException,
      // so we need to decide here if it's going to be treated
      // as such or not.
      if (skip === 0 && isError(elem)) {
        error = elem;
        skip++;
        break;
      }

      if (!isFormattable(elem)) {
        break;
      }

      messageParts.push(elem);
      skip++;
    }

    const message = messageParts.join(' ');
    return {
      message: message,
      error: error,
      extra: elems.slice(skip)
    };
  }

  return {
    target: logToSentry,
    formatter: sentryFormatter
  };
};