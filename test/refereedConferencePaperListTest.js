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

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed articles".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "conferencePaper"
  // publicationSubTypeCode: ""
  describe('Rules for adding a publication to list of refereed conference papers.', () => {
    it('should add one publication to the list of refereedConferencePapers when refereed, conferencePaper, and correct subtype = ""', (done) => {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
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

    it('should add a publication to the list of refereedConferencePapers regardless of publicationSubTypeCode', (done) => {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'newsItem',
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
  })
})
