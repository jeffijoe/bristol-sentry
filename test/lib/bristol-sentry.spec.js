'use strict';
const bristolSentry = require('../../lib/bristol-sentry');

describe('bristol-sentry', function() {
  it('exists', function() {
    expect(bristolSentry).to.exist;
  });

  it('creates a function that has a formatter', function() {
    const fn = bristolSentry({ });
    fn.should.be.a.function;
    fn.formatter.should.be.a.function;
  });
});