/* eslint-env mocha */

require('chai').should()
const filters = require('../helpers/filters')

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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science reports".
  // För att lägga till en publikation:
  // contentTypeCode: "science", "refereed" eller "other"
  // publicationTypeCode: "report"
  describe('Rules for adding a publication to list of science reports.', function () {
    it('should add one publication to the list of scienceReports when science, and publication type report', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceReports when refereed, and publication type report', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should add one publication to the list of scienceReports when other, and publication type report', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true)
      var numPublications = jsonResult.length

      numPublications.should.equal(1)

      done()
    })

    it('should NOT add a publication to the list of scienceReports when publication type code casing is BAD', function (done) {
      var userPublications = {
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

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceReport)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
