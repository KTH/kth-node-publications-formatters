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

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed articles".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "article" eller "review"
  // publicationSubTypeCode: får inte vara "newsItem"
  // publicationStatus: får inte vara någon av ["In press", "Accepted", "Submitted"]
  describe('Rules for adding a publication to list of refereed articles.', function () {
    it('should add one publication to the list of scienceArticles when other, article, and published', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'article',
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

    it('should add one publication to the list of scienceArticles when other, article, regardless of subtype and published', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'article',
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

    it('should add one publication to the list of scienceArticles when refereed, article, subtype newsItem and published', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'article',
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

    it('should add one publication to the list of scienceArticles when science, article, subtype newsItem and published', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'article',
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

    it('should NOT add one publication to the list of scienceArticles when other, article, and NOT published', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'article',
            publicationSubTypeCode: '',
            publicationStatus: 'In press',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceArticle)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceArticles when refereed, article, subtype is NOT newsItem and published', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'article',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceArticle)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceArticles when science, article, subtype newsItem and NOT published', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'article',
            publicationSubTypeCode: 'newsItem',
            publicationStatus: 'In press',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceArticle)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
