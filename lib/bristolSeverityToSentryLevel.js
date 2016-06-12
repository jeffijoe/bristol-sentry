'use strict';

const BRISTOL_TO_SENTRY_LEVELS = {
  fatal: 'fatal',
  error: 'error',
  warning: 'warning',
  info: 'info',
  debug: 'debug',
  trace: 'debug'
};

/**
 * Converts a Bristol default severity to a Sentry level.
 *
 * @param  {string} severity
 * The Bristol severity. Only works with defaults.
 *
 * @return {string}
 * The Sentry equivelant, or whatever is closest.
 * If not found, defaults to error.
 */
function bristolSeverityToSentryLevel(severity) {
  return BRISTOL_TO_SENTRY_LEVELS[severity] || 'error';
}

module.exports = bristolSeverityToSentryLevel;