/*global describe, it*/
'use strict';
var superagent = require('supertest');
var app = require('../app');

function request() {
	return superagent(app.listen());
}

describe('Routes', function () {
  describe('GET /', function () {
    it('should return 200', function (done) {
      request()
        .get('/')
        .expect(200, done);
    });
  });
  describe('GET /players', function () {
    it('should return 200', function (done) {
      request()
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
  describe('GET /players/notfound', function () {
    it('should return 404', function (done) {
      request()
        .get('/players/notfound')
        .expect(404, done);
    });
  });
});