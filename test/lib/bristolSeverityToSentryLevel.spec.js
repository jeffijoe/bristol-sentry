'use strict';
const bristolSeverityToSentryLevel = require('../../lib/bristolSeverityToSentryLevel');

describe('bristolSeverityToSentryLevel', function() {
  it('works', function() {
    bristolSeverityToSentryLevel('error').should.equal('error');
    bristolSeverityToSentryLevel('warning').should.equal('warn');
    bristolSeverityToSentryLevel('info').should.equal('info');
    bristolSeverityToSentryLevel('debug').should.equal('info');
    bristolSeverityToSentryLevel('trace').should.equal('info');
    bristolSeverityToSentryLevel('unknown').should.equal('error');
  });
});