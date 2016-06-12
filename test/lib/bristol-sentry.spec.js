'use strict';
const bristolSentry = require('../../lib/bristol-sentry');
const bristol = require('bristol');
const raven = require('raven');
const formatter = bristolSentry.formatter;

describe('bristol-sentry', function() {
  it('exists', function() {
    expect(bristolSentry).to.exist;
  });

  it('creates an object that has a formatter and a target', function() {
    const subject = bristolSentry({ });
    subject.should.be.a.function;
    formatter.should.be.a.function;
  });

  describe('formatter', function() {
    it('returns an object with a message and extras', function() {
      const subject = bristolSentry({ });
      const result = formatter({}, 'error', new Date(), ['Some', 'message', 123, 'cool', {some: 'object'}]);
      result.message.should.equal('Some message 123 cool');
      result.extra[0].some.should.equal('object');
    });

    it('returns an object with error set if an elem is an error', function() {
      const error = new Error();
      const subject = bristolSentry({ });
      const result = formatter({}, 'error', new Date(), [error, 'nope']);
      result.error.should.equal(error);
      result.message.should.equal('nope');
    });

    it('returns an object with an error set if elem is an error even if not the first', function() {
      const error = new Error();
      const subject = bristolSentry({ });
      const result = formatter({}, 'error', new Date(), ['nope', error]);
      result.error.should.equal(error);
      result.message.should.equal('nope');
    });

    it('handles funky ordering', function() {
      const error = new Error('dat boi');
      const subject = bristolSentry({ });
      const result = formatter({}, 'error', new Date(), ['here come', error.message, error, 'shit waddup', { rollin: 'down the street' }]);
      result.error.should.equal(error);
      result.message.should.equal('here come dat boi shit waddup');
      result.extra[0].rollin.should.equal('down the street');
    });
  });

  describe('target', function() {
    let client, subject;

    beforeEach(function () {
      client = {
        captureMessage: sinon.spy(),
        captureException: sinon.spy()
      };

      subject = bristolSentry({ client: client });
    });

    it('calls captureMessage when there is no error', function() {
      subject({}, 'error', new Date(), { message: 'Hello!', extra: { hello: 'world' }});
      client.captureMessage.should.have.been.calledWith('Hello!', { level: 'error', extra: { hello: 'world' }});
    });

    it('calls captureException when there is an error', function() {
      const error = new Error();
      subject({}, 'error', new Date(), { error: error, extra: [{ hello: 'world' }]});
      client.captureException.should.have.been.calledWith(error, { level: 'error', extra: [{ hello: 'world' }]});
    });

    it('adds message to extra when capturing error', function() {
      const error = new Error('aww yiss');
      const message = 'mother fuckin bread crumbs';
      subject({}, 'error', new Date(), { message: message, error: error, extra: [{ hello: 'world' }]});
      client.captureException.should.have.been.calledWith(error, { level: 'error', extra: [message, { hello: 'world' }]});
    });
  });

  describe('with bristol', function() {
    let client, subject, logger;

    beforeEach(function () {
      client = {
        captureMessage: sinon.spy(),
        captureException: sinon.spy()
      };

      subject = bristolSentry({ client: client });
      logger = new bristol.Bristol();
      logger.addTarget(subject).withFormatter(formatter);
    });

    it('calls the correct client methods', function() {
      const error = new Error();
      logger.error(error, { hello: 'world' });
      logger.error('Hah!', { hello: 'world' });
      client.captureException.should.have.been.calledWith(error, { level: 'error', extra: [sinon.match({ hello: 'world' })] });
      client.captureMessage.should.have.been.calledWith('Hah!', { level: 'error', extra: [sinon.match({ hello: 'world' })] });
    });
  });

  describe('integration', function() {
    it('does not fail, heh', function() {
      const logger = new bristol.Bristol();
      const bs = bristolSentry({ client: new raven.Client(process.env.SENTRY_DSN)});
      logger.addTarget(bs).withFormatter(formatter);

      logger.debug('Debug log', 42, { more: 'stuff' });
      logger.info('Info log', { more: 'stuff' });
      logger.warn('Warning log', { more: 'stuff' });
      logger.error('Error log, here come dat boi', { more: 'stuff' });
      const error = new Error('shit waddup');
      logger.error('he be rollin to the beat', error);
    });
  });
});