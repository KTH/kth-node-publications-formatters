/* eslint-env mocha */

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
    it('should add one publication to the list of refereedArticles when refereed, article, and correct subtype and status', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'article',
            publicationSubTypeCode: 'bookReview',
            publicationStatus: 'Published',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of refereedArticles when refereed, review, and correct subtype and status', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'review',
            publicationSubTypeCode: 'bookReview',
            publicationStatus: 'Published',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should NOT add a publication to the list of refereedArticles when publication sub type code is BAD', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'article',
            publicationSubTypeCode: 'newsItem',
            publicationStatus: 'Published',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedArticle)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add a publication to the list of refereedArticles when publication status is BAD', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'review',
            publicationSubTypeCode: 'bookReview',
            publicationStatus: 'Submitted',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedArticle)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
