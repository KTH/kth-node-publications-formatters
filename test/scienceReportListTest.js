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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science reports".
  // För att lägga till en publikation:
  // contentTypeCode: "science", "refereed" eller "other"
  // publicationTypeCode: "report"
  describe('Rules for adding a publication to list of science reports.', () => {
    it('should add one publication to the list of scienceReports when science, and publication type report', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'report',
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

    it('should add one publication to the list of scienceReports when refereed, and publication type report', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'report',
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

    it('should add one publication to the list of scienceReports when other, and publication type report', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'report',
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

    it('should NOT add a publication to the list of scienceReports when publication type code casing is BAD', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'Report',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceReport)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)

      done()
    })
  })
})
