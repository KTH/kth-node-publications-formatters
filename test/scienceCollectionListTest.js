/* eslint-env mocha */
const mockery = require('mockery')
const mockLogger = {}
// mockLogger.debug = mockLogger.info = mockLogger.warn = mockLogger.error = console.log
mockLogger.debug = mockLogger.info = mockLogger.warn = mockLogger.error = () => {}

mockery.registerMock('@kth/log', mockLogger)
mockery.enable({
  warnOnUnregistered: false,
  warnOnReplace: false,
})
const filters = require('../helpers/filters')

require('chai').should()

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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science collections".
  // För att lägga till en publikation:
  // contentTypeCode: "science", "refereed" eller "other"
  // publicationTypeCode: "collection"
  describe('Rules for adding a publication to list of science collections.', function () {
    it('should add one publication to the list of scienceCollections when science, and publication type collection', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'collection',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceCollections when refereed, and publication type collection', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'collection',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceCollections when other, and publication type collection', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'collection',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should NOT add a publication to the list of scienceCollections when publication type code casing is BAD', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'Collection',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceCollection)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
