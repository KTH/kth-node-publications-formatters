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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science chapters".
  // För att lägga till en publikation:
  // contentTypeCode: "science" eller "other"
  // publicationTypeCode: "chapters"
  describe('Rules for adding a publication to list of science chapters.', () => {
    it('should add one publication to the list of scienceChapters when science, and correct type code chapter', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
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
    })

    it('should add one publication to the list of scienceChapters when other, and correct type code chapter', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
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
    })

    it('should NOT add a publication to the list of scienceChapters when science and publication type code has BAD casing', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'Chapter',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceChapter)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)
    })

    it('should NOT add a publication to the list of scienceChapters when other and publication type code has BAD casing', () => {
      const userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'Chapter',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      const jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceChapter)
      const numPublications = jsonResult.length

      expect(numPublications).toBe(0)
    })
  })
})
