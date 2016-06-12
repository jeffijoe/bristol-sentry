'use strict';

const anyOf = require('../../lib/anyOf');

describe('anyOf', function() {
  it('returns a function', function() {
    anyOf([]).should.be.a.function;
  });


  describe('the function', function() {
    it('returns true if one predicate returns true', function() {
      anyOf([() => false, () => true])().should.be.true;
    });

    it('returns false if no predicate returns true', function() {
      anyOf([() => false, () => false])().should.be.false;
    });
  });
});