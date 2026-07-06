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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science thesis".
  // För att lägga till en publikation:
  // contentTypeCode: "science"
  // publicationTypeCode: "comprehensiveDoctoralThesis", "monographDoctoralThesis", "monographLicentiateThesis" eller "comprehensiveLicentiateThesis"
  describe('Rules for adding a publication to list of science thesis.', () => {
    it('should add one publication to the list of scienceThesis when science, and publication type comprehensiveDoctoralThesis', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'comprehensiveDoctoralThesis',
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

    it('should add one publication to the list of scienceThesis when science, and publication type monographDoctoralThesis', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'monographDoctoralThesis',
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

    it('should add one publication to the list of scienceThesis when science, and publication type monographLicentiateThesis', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'monographLicentiateThesis',
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

    it('should add one publication to the list of scienceThesis when science, and publication type comprehensiveLicentiateThesis', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'comprehensiveLicentiateThesis',
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

    it('should NOT add a publication to the list of scienceThesis when publication type code casing is BAD', (done) => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'ComprehensiveDoctoralThesis',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceThesis)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)

      done()
    })
  })
})
