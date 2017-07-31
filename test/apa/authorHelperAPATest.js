/* eslint-env mocha */
require('chai').should()

describe('AuthorHelper', function () {
  var helper

  before(function (done) {
    helper = require('../../helpers/AuthorHelper')
    done()
  })

  describe('APA Authors', function () {
    it('should correctly format the authors of an article in APA', function () {
      var pub = require('../testArticle.json')
      helper.getAuthors('article', pub, 'sv', 'apa').should.equal('Test, P., Mule, O. & Wåffel, H. (2000). ')
    })
    it('should correctly format the authors of a conference proceeding in APA', function () {
      var pub = require('../testConferenceProceedings.json')
      helper.getAuthors('scienceConferenceProceedings', pub, 'sv', 'apa').should.equal('Test, P., Mule, O., Wåffel, H. (Red.). (2016). ')
    })
    it('should correctly format the authors of a book in APA', function () {
      var pub = require('../testBook.json')
      helper.getAuthors('book', pub, 'en', 'apa').should.equal('Test, P., Mule, O. & Wåffel, H. (2016). ')
    })
  })
})
