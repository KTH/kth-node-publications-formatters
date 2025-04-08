const filters = require('../helpers/filters')

describe('PublicationUtil', () => {
  var publicationUtil
  var json
  if (!json) {
    json = ''
  }

  beforeAll((done) => {
    json = require('./data.json')

    publicationUtil = require('../helpers/publicationUtil')
    done()
  })

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed books".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "book"
  describe('Rules for adding a publication to list of refereed books.', () => {
    it('should add one publication to the list of refereedBooks when refereed, book', (done) => {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'book',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should NOT add a publication to the list of refereedBooks when publication type code has BAD casing', (done) => {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'Book',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedBook)
      var numPublications = jsonResult.length

      expect(numPublications).toBe(0)

      done()
    })
  })
})
