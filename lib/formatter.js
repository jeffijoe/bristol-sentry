'use strict';
const isString = require('lodash/isString');
const isNumber = require('lodash/isNumber');
const isDate = require('lodash/isDate');
const isBoolean = require('lodash/isBoolean');
const isRegExp = require('lodash/isRegExp');
const isError = require('lodash/isError');
const anyOf = require('./anyOf');

const isFormattable = anyOf([isString, isNumber, isDate, isBoolean, isRegExp]);

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
    if (isError(elem)) {
      error = elem;
    } else if (isFormattable(elem)) {
      messageParts.push(elem);
    } else {
      break;
    }

    skip++;
  }

  const message = messageParts.join(' ');
  return {
    message: message,
    error: error,
    extra: elems.slice(skip)
  };
}

module.exports = sentryFormatter;