/* eslint-env mocha */
require('chai').should()

describe('AuthorHelper', function () {
  var helper

  before(function (done) {
    helper = require('../helpers/AuthorHelper')
    done()
  })

  describe('Eva', function () {
    it('should be E.', function (done) {
      helper.splitAndFixNameParts('Eva', ' ').should.equal('E.')
      done()
    })
  })

  describe('Jon-Olov', function () {
    it('should be J.-O.', function (done) {
      helper.splitAndFixNameParts('Jon-Olov', '-').should.equal('J.-O.')
      done()
    })
  })

  describe('Jon Olov', function () {
    it('should be J. O.', function (done) {
      helper.splitAndFixNameParts('Jon Olov', ' ').should.equal('J. O.')
      done()
    })
  })

  describe('Candice L.', function () {
    it('should be C. L.', function (done) {
      helper.splitAndFixNameParts('Candice L.', ' ').should.equal('C. L.')
      done()
    })
  })

  describe('Gerald Q. Jr.', function () {
    it('should be G. Q. Jr.', function (done) {
      helper.splitAndFixNameParts('Gerald Q. Jr.', ' ').should.equal('G. Q. Jr.')
      done()
    })
  })

  describe('Joakim Von Anka', function () {
    it('should be J. Von A.', function (done) {
      helper.splitAndFixNameParts('Joakim Von Anka', ' ').should.equal('J. Von A.')
      done()
    })
  })
})
