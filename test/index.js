'use strict';
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const fs = require('fs');
const yenv = require('yenv');

if (fs.existsSync('env.yaml')) {
  Object.assign(process.env, yenv('env.yaml', { env: 'test' }));
}

if (!process.env.SENTRY_DSN) {
  throw new Error('Please set a SENTRY_DSN environment variable when running the tests.');
}

chai.use(sinonChai);
chai.should();

global.expect = chai.expect;
global.sinon = sinon;