/* eslint-env mocha */
require('chai').should()

describe('AuthorHelper', function () {
  var helper

  before(function (done) {
    helper = require('../../helpers/AuthorHelper')
    done()
  })

  describe('blaba', function () {
    it('blablabla', function () {
      var pub = require('../testArticle.json')
      helper.getAuthors('article', pub, 'sv', 'apa').should.equal('Test, P., Mule, O. & Wåffel, H. (2000). ')
    })
  })
})
