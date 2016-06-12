'use strict';

/**
 * Creates a function that takes a single parameter
 * that is passed to the array of functions until
 * one returns true or all have been called, returning false.
 *
 * @param  {Function[]} funcs
 * @return {Function}
 */
module.exports = function makeAnyOf(funcs) {
  return function anyOf(obj) {
    return funcs.some(fn => fn(obj));
  };
};