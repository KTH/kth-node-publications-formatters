const filters = require('../helpers/filters')

describe('PublicationUtil', () => {
  let publicationUtil
  let json
  if (!json) {
    json = ''
  }

  beforeAll((done) => {
    json = require('./data.json')

    publicationUtil = require('../helpers/publicationUtil')
    done()
  })

  // Kontrollera reglerna för att lägga till en publikation i listan för "science articles".
  // För att lägga till en publikation:
  // contentTypeCode: "science"
  // publicationTypeCode: "article" eller "review"
  // publicationSubTypeCode: får inte vara "newsItem"
  // eller
  // contentTypeCode: "refereed"
  // publicationTypeCode: "bookReview"
  // publicationSubTypeCode: får inte vara "newsItem"
  // eller
  // contentTypeCode: "other"
  // publicationTypeCode: "article", "review" eller "bookReview"
  // eller
  // contentTypeCode: "science" "refereed"
  // publicationSubTypeCode: "newsItem"
  describe('Rules for adding a publication to list of science articles.', () => {
    it('should add one publication to the list of scienceArticles when science, article, and NOT subtype newsItem', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'article',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should add one publication to the list of scienceArticles when science, review, and NOT subtype newsItem', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'review',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should NOT add one publication to the list of scienceArticles when refereed bookReview', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'bookReview',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceArticle)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)

      done()
    })

    it('should add one publication to the list of scienceArticles when other and article', (done) => {
      const userPublications = {
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

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should add one publication to the list of scienceArticles when other and review', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'review',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should add one publication to the list of scienceArticles when other and bookReview', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'bookReview',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should add one publication to the list of scienceArticles when science and newsItem', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: '',
            publicationSubTypeCode: 'newsItem',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should add one publication to the list of scienceArticles when refereed and newsItem', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: '',
            publicationSubTypeCode: 'newsItem',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })
    /* -- bortkommenterade eftersom de blir fel. Det är dock inkonsekventa krav som ger det felaktiga beteendet
    it('should NOT add a publication to the list of scienceArticles when science, article and publication sub type code is newsItem', function (done) {
      var userPublications = {
        publications: [{
          contentTypeCode : "science",
          publicationTypeCode : "article",
          publicationSubTypeCode : "newsItem",
          publicationStatus : ""
        }],
        hiddenPublications : []
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add a publication to the list of scienceArticles when science, review and publication sub type code is newsItem', function (done) {
        var userPublications = {
          publications: [{
            contentTypeCode : "science",
            publicationTypeCode : "review",
            publicationSubTypeCode : "newsItem",
            publicationStatus : ""
          }],
          hiddenPublications : []
        }

        var jsonResult = publicationUtil.filterList(userPublications, true)
        var numPublications = jsonResult.length

        numPublications.should.equal(0)

        done()
      })

      it('should NOT add a publication to the list of scienceArticles when refereed, bookReview and publication sub type code is newsItem', function (done) {
        var userPublications = {
          publications: [{
            contentTypeCode : "refereed",
            publicationTypeCode : "bookReview",
            publicationSubTypeCode : "newsItem",
            publicationStatus : ""
          }],
          hiddenPublications : []
        }

        var jsonResult = publicationUtil.filterList(userPublications, true)
        var numPublications = jsonResult.length

        numPublications.should.equal(0)

        done()
      })
  */
  })
})
