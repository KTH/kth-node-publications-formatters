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

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed books".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "book"
  describe('Rules for adding a publication to list of refereed books.', () => {
    it('should add one publication to the list of refereedBooks when refereed, book', (done) => {
      const userPublications = {
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

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should NOT add a publication to the list of refereedBooks when publication type code has BAD casing', (done) => {
      const userPublications = {
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

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedBook)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)

      done()
    })
  })
})
