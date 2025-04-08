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

  // Kontrollera reglerna för att lägga till en publikation i listan för "patents".
  // För att lägga till en publikation:
  // contentTypeCode: "other"
  // publicationTypeCode: "patent"
  // dateIssued: "2015-07-30" har värde satt
  describe('Rules for adding a publication to list of patents.', () => {
    it('should add one publication to the list of patents when other, publication type patent and dateIssued set', (done) => {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      expect(numPublications).toBe(1)

      done()
    })

    it('should NOT add a publication to the list of patents when publication issuedDate is missing', (done) => {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isPatent)
      var numPublications = jsonResult.length

      expect(numPublications).toBe(0)

      done()
    })
  })
})
