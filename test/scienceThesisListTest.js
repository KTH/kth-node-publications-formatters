/* eslint-env mocha */

const filters = require('../helpers/filters')

require('chai').should()

describe('PublicationUtil', function () {
  var publicationUtil
  var json
  if (!json) {
    json = ''
  }

  before(function (done) {
    json = require('./data.json')

    publicationUtil = require('../helpers/publicationUtil')
    done()
  })

  // Kontrollera reglerna för att lägga till en publikation i listan för "science thesis".
  // För att lägga till en publikation:
  // contentTypeCode: "science"
  // publicationTypeCode: "comprehensiveDoctoralThesis", "monographDoctoralThesis", "monographLicentiateThesis" eller "comprehensiveLicentiateThesis"
  describe('Rules for adding a publication to list of science thesis.', function () {
    it('should add one publication to the list of scienceThesis when science, and publication type comprehensiveDoctoralThesis', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceThesis when science, and publication type monographDoctoralThesis', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceThesis when science, and publication type monographLicentiateThesis', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceThesis when science, and publication type comprehensiveLicentiateThesis', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should NOT add a publication to the list of scienceThesis when publication type code casing is BAD', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceThesis)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
