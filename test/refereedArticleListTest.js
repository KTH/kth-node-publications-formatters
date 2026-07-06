const filters = require('../helpers/filters')

describe('PublicationUtil', () => {
  let publicationUtil
  let json
  if (!json) {
    json = ''
  }

  beforeAll(() => {
    json = require('./data.json')

    publicationUtil = require('../helpers/publicationUtil')
  })

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed articles".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "article" eller "review"
  // publicationSubTypeCode: får inte vara "newsItem"
  // publicationStatus: får inte vara någon av ["In press", "Accepted", "Submitted"]
  describe('Rules for adding a publication to list of refereed articles.', () => {
    it('should add one publication to the list of refereedArticles when refereed, article, and correct subtype and status', () => {
      const userPublications = {
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

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)
    })

    it('should add one publication to the list of refereedArticles when refereed, review, and correct subtype and status', () => {
      const userPublications = {
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

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)
    })

    it('should NOT add a publication to the list of refereedArticles when publication sub type code is BAD', () => {
      const userPublications = {
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

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedArticle)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)
    })

    it('should NOT add a publication to the list of refereedArticles when publication status is BAD', () => {
      const userPublications = {
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

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedArticle)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)
    })
  })
})
