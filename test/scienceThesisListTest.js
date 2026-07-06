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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science thesis".
  // För att lägga till en publikation:
  // contentTypeCode: "science"
  // publicationTypeCode: "comprehensiveDoctoralThesis", "monographDoctoralThesis", "monographLicentiateThesis" eller "comprehensiveLicentiateThesis"
  describe('Rules for adding a publication to list of science thesis.', () => {
    it('should add one publication to the list of scienceThesis when science, and publication type comprehensiveDoctoralThesis', () => {
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
    })

    it('should add one publication to the list of scienceThesis when science, and publication type monographDoctoralThesis', () => {
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
    })

    it('should add one publication to the list of scienceThesis when science, and publication type monographLicentiateThesis', () => {
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
    })

    it('should add one publication to the list of scienceThesis when science, and publication type comprehensiveLicentiateThesis', () => {
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
    })

    it('should NOT add a publication to the list of scienceThesis when publication type code casing is BAD', () => {
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
    })
  })
})
