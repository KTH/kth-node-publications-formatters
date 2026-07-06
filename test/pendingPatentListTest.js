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

  // Kontrollera reglerna för att lägga till en publikation i listan för "pendingPatents".
  // För att lägga till en publikation:
  // contentTypeCode: "other"
  // publicationTypeCode: "patent"
  // dateIssued: null dvs saknar värde
  describe('Rules for adding a publication to list of pendingPatents.', () => {
    it('should add one publication to the list of pendingPatents when other, publication type patent and dateIssued set', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'patent',
            publicationSubTypeCode: '',
            dateIssued: null,
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(1)
    })

    it('should NOT add a publication to the list of pendingPatents when publication issuedDate is missing', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'patent',
            publicationSubTypeCode: '',
            dateIssued: '2015-01-01',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isPendingPatent)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)
    })
  })
})
