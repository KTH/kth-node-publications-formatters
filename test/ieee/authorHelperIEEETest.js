/* eslint-env mocha */
require('chai').should()

describe('AuthorHelper', function () {
  var helper

  before(function (done) {
    helper = require('../../helpers/AuthorHelper')
    done()
  })

  describe('IEEE Authors', function () {
    it('should correctly format the authors of an article in IEEE and Swedish', function () {
      var pub = require('../testArticle.json')
      helper.getAuthors('article', pub, 'sv', 'ieee').should.equal('P. Test, O. Mule och H. Wåffel, ')
    })
    it('should correctly format the authors of an article in IEEE and English', function () {
      var pub = require('../testArticle.json')
      helper.getAuthors('article', pub, 'en', 'ieee').should.equal('P. Test, O. Mule and H. Wåffel, ')
    })
    it('should correctly format the authors of a conference proceeding article in IEEE and Swedish', function () {
      var pub = require('../testConferenceProceedings.json')
      helper.getAuthors('scienceConferenceProceedings', pub, 'sv', 'ieee').should.equal('P. Test, O. Mule och H. Wåffel, Eds.')
    })
    it('should correctly format the authors of a conference proceeding in IEEE and English', function () {
      var pub = require('../testConferenceProceedings.json')
      helper.getAuthors('scienceConferenceProceedings', pub, 'en', 'ieee').should.equal('P. Test, O. Mule and H. Wåffel, Eds.')
    })
    it('should correctly format the authors of a book in IEEE and English', function () {
      var pub = require('../testBook.json')
      helper.getAuthors('book', pub, 'en', 'ieee').should.equal('P. Test, O. Mule and H. Wåffel, ')
    })
  })
})
