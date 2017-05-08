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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science other".
  // För att lägga till en publikation:
  // contentTypeCode: "science" eller "other"
  // publicationTypeCode: "other"
  describe('Rules for adding a publication to list of science other.', function () {
    it('should add one publication to the list of scienceOthers when science, and publication type other', function (
      done
    ) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'other',
            publicationSubTypeCode: '',
            publicationStatus: ''
          }
        ],
        hiddenPublications: []
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceOthers when other, and publication type other', function (
      done
    ) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'other',
            publicationSubTypeCode: '',
            publicationStatus: ''
          }
        ],
        hiddenPublications: []
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should NOT add a publication to the list of scienceOthers when publication type code casing is BAD', function (
      done
    ) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'Other',
            publicationSubTypeCode: '',
            publicationStatus: ''
          }
        ],
        hiddenPublications: []
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceOthers)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
