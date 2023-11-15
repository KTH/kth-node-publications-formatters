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

  // Kontrollera reglerna för att lägga till en publikation i listan för "science conference paper".
  // För att lägga till en publikation:
  // publicationTypeCode: "conferencePaper"
  // OCH
  // contentTypeCode: "science" eller "other"
  // Eller
  // contentTypeCode: "refereed" OCH
  // publicationSubTypeCode: något av ["presentation", "poster", "meetingAbstract", "letter", "abstracts", "editorialMaterial", "newsItem"]
  describe('Rules for adding a publication to list of science conference papers.', function () {
    it('should add one publication to the list of scienceConferencePapers when science and publication type code conferencePaper', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'science',
            publicationTypeCode: 'conferencePaper',
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

    it('should add one publication to the list of scienceConferencePapers when other and publication type code conferencePaper', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'other',
            publicationTypeCode: 'conferencePaper',
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

    it('should NOT add one publication to the list of scienceConferencePapers when refereed and type code conferencePaper and sub type code presentation', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'presentation',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceConferencePapers when refereed and type code conferencePaper and sub type code poster', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'poster',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceConferencePapers when refereed and type code conferencePaper and sub type code meetingAbstract', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'meetingAbstract',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceConferencePapers when refereed and type code conferencePaper and sub type code letter', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'letter',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceConferencePapers when refereed and type code conferencePaper and sub type code abstracts', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'abstracts',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceConferencePapers when refereed and type code conferencePaper and sub type code editorialMaterial', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'editorialMaterial',
            publicationStatus: '',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add one publication to the list of scienceConferencePapers when refereed and type code conferencePaper and sub type code newsItem', function (done) {
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

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add a publication to the list of scienceConferencePapers when refereed, conferencePaper and publication sub type code is BAD(review)', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencePaper',
            publicationSubTypeCode: 'review',
            publicationStatus: 'Published',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })

    it('should NOT add a publication to the list of scienceConferencePapers when refereed, conferencePaper and publication sub type code has BAD casing', function (done) {
      var userPublications = {
        publications: [
          {
            contentTypeCode: 'refereed',
            publicationTypeCode: 'conferencepaper',
            publicationSubTypeCode: 'NewsItem',
            publicationStatus: 'Submitted',
          },
        ],
        hiddenPublications: [],
      }

      var jsonResult = publicationUtil.filterList(userPublications, true).filter(filters.isScienceConferencePaper)
      var numPublications = jsonResult.length

      numPublications.should.equal(0)

      done()
    })
  })
})
