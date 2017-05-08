/* eslint-env mocha */
const mockery = require('mockery')

const mockLogger = {}
// mockLogger.debug = mockLogger.info = mockLogger.warn = mockLogger.error = console.log
mockLogger.debug = mockLogger.info = mockLogger.warn = mockLogger.error = () => {}

mockery.registerMock('kth-node-log', mockLogger)
mockery.enable({
  warnOnUnregistered: false,
  warnOnReplace: false
})

require('chai').should()
const assert = require('chai').assert
var { groupPublications } = require('../')
describe('PublicationUtil', function () {
  var publicationUtil
  var json
  if (!json) {
    json = ''
  }

  before(function (done) {
    json = require('./data.json')

    publicationUtil = require('../helpers/publicationUtil')
    done()
  })

  describe('Test itemCounter', function () {
    it('should count 3', function (done) {
      var json = { list: [1, 2], list2: [1], name: 'Jon' }
      itemCounter(json).should.equal(3)
      done()
    })
  })

  // Kontrollera att alla publikationer i listan skrivs ut
  describe('No publications should be lost after filtering', function () {
    it('should be the same amount of publications if includeHidden is true.', function (
      done
    ) {
      var publicationsBefore = json.publications.length

      var jsonResult = publicationUtil.filterList(json, true)
      // var publicationsAfter = itemCounter(jsonResult)
      var publicationsAfter = jsonResult.length

      publicationsBefore.should.equal(publicationsAfter)

      done()
    })
  })

  // Kontrollera att om publications är hidden så skall den ej visas i publication-vyn
  describe('Publications have to be hidden in Publication view if they are hidden in edit view', function () {
    it('blabla', function (done) {
      var publicationsBefore = json.publications.length

      var jsonResult = publicationUtil.filterList(json, false)
      // var publicationsAfter = itemCounter(jsonResult)
      var publicationsAfter = jsonResult.length

      publicationsBefore.should.not.equal(publicationsAfter)
      publicationsBefore.should.equal(publicationsAfter + 4)

      done()
    })
  })

  describe('For publications not filterable to any list, discard them.', function () {
    it('should be 3 discarded publications.', function (done) {
      var jsonWithHiddenPub = require('./dataWithHiddenPublications.json')
      var publicationsBefore = jsonWithHiddenPub.publications.length

      var jsonResult = groupPublications(publicationUtil.filterList(jsonWithHiddenPub, false))
      var publicationsAfter = itemCounter(jsonResult)

      assert(
        publicationsBefore === 24,
        'Test data should contain 24 publications'
      )
      publicationsAfter.should.be.equal(21)

      done()
    })
  })

  // Kontrollera att properties: Author/description/diva-helper finns på publikationen

  function itemCounter (json) {
    var counter = 0
    for (var list in json) {
      var item = json[list]
      if (Array.isArray(item)) {
        counter += item.length
      }
    }
    return counter
  }
})
