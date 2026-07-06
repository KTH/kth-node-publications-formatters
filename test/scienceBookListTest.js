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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science books".
  // För att lägga till en publikation:
  // contentTypeCode: "science" eller "other"
  // publicationTypeCode: "book"
  describe('Rules for adding a publication to list of science books.', () => {
    it('should add one publication to the list of scienceBooks when science, and publication type code book', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
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
    })

    it('should add one publication to the list of scienceBooks when other, and publication type code book', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
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
    })

    it('should NOT add a publication to the list of scienceBooks when science and publication type code has BAD casing', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'Book',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceBook)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)
    })

    it('should NOT add a publication to the list of scienceBooks when other publication type code has BAD casing', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'Book',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceBook)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)
    })
  })
})
