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

  // Kontrollera reglerna för att lägga till en publikation i listan för "refereed others".
  // För att lägga till en publikation:
  // contentTypeCode: "refereed"
  // publicationTypeCode: "other"
  describe('Rules for adding a publication to list of refereed others.', function () {
    it('should add one publication to the list of refereedOthers when refereed, other', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'other',
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

    it('should NOT add a publication to the list of refereedOthers when publication type code has BAD casing', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'Other',
            publicationSubTypeCode: '',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isRefereedOthers)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
