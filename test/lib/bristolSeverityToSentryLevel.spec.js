'use strict';
const bristolSeverityToSentryLevel = require('../../lib/bristolSeverityToSentryLevel');

describe('bristolSeverityToSentryLevel', function() {
  it('converts levels correctly ', function() {
    bristolSeverityToSentryLevel('fatal').should.equal('fatal');
    bristolSeverityToSentryLevel('error').should.equal('error');
    bristolSeverityToSentryLevel('warn').should.equal('warning');
    bristolSeverityToSentryLevel('info').should.equal('info');
    bristolSeverityToSentryLevel('debug').should.equal('debug');
    bristolSeverityToSentryLevel('trace').should.equal('debug');
    bristolSeverityToSentryLevel('unknown').should.equal('error');
  });
});