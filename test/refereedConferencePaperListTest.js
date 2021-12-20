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

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed articles".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "conferencePaper"
  // publicationSubTypeCode: ""
  describe('Rules for adding a publication to list of refereed conference papers.', function () {
    it('should add one publication to the list of refereedConferencePapers when refereed, conferencePaper, and correct subtype = ""', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
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

    it('should add a publication to the list of refereedConferencePapers regardless of publicationSubTypeCode', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'newsItem',
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
  })
})
