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

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed chapters".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "chapter"
  describe('Rules for adding a publication to list of refereed chapters.', () => {
    it('should add one publication to the list of refereedChapters when refereed, chapter', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'chapter',
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

    it('should NOT add a publication to the list of refereedChapters when publication type code has BAD casing', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'Chapter',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedChapter)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)

      done()
    })
  })
})
