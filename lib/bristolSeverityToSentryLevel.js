'use strict';

const BRISTOL_TO_SENTRY_LEVELS = {
  error: 'error',
  warning: 'warn',
  info: 'info',
  debug: 'info',
  trace: 'info'
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